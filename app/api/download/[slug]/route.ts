// GET /api/download/<slug> — cuenta la descarga y entrega el archivo.
// Reglas: una descarga por visitante (IP hasheada) cada 24 h, sin bots, con límite de ritmo.
// Si la base de datos falla, la descarga igual continúa (el conteo nunca bloquea al usuario).
// HEAD y las peticiones de reanudación no suman por separado gracias a la ventana de 24 h.
import { createHash } from 'node:crypto'
import { createReadStream } from 'node:fs'
import { readFile, stat } from 'node:fs/promises'
import { Readable } from 'node:stream'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimited } from '@/lib/portal'
import { DOWNLOADS, downloadTarget, isBot, isDownloadSlug, type DownloadSlug } from '@/lib/downloads'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const DAY_MS = 24 * 60 * 60 * 1000
const APK_TYPE = 'application/vnd.android.package-archive'

function clientIp(req: Request): string {
    const fwd = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    return fwd || req.headers.get('x-real-ip') || 'unknown'
}

async function localFile(slug: DownloadSlug) {
    try {
        const cfg = DOWNLOADS[slug]
        const st = await stat(cfg.file)
        return st.isFile() && st.size > 0 ? { path: cfg.file, size: st.size, mtime: st.mtime } : null
    } catch {
        return null
    }
}

async function versionOf(slug: DownloadSlug): Promise<string | null> {
    try {
        const json = JSON.parse(await readFile(DOWNLOADS[slug].versionFile, 'utf8'))
        const v = json?.version ?? json?.latestVersion ?? json?.versionName
        return typeof v === 'string' && /^[\w.\-+]{1,20}$/.test(v) ? v : null
    } catch {
        return null
    }
}

async function countDownload(slug: DownloadSlug, ip: string, userAgent: string | null) {
    try {
        const salt = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'jacana'
        const ipHash = createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32)
        const recent = await prisma.downloadEvent.findFirst({
            where: { slug, ipHash, createdAt: { gte: new Date(Date.now() - DAY_MS) } },
            select: { id: true },
        })
        if (recent) return
        await prisma.$transaction([
            prisma.downloadEvent.create({ data: { slug, ipHash, userAgent: userAgent?.slice(0, 200) } }),
            prisma.appDownload.upsert({
                where: { slug },
                create: { slug, count: 1 },
                update: { count: { increment: 1 } },
            }),
        ])
    } catch (err) {
        console.error('[download] no se pudo contar:', err)
    }
}

function fileHeaders(file: { size: number; mtime: Date }, name: string) {
    return {
        'Content-Type': APK_TYPE,
        'Content-Disposition': `attachment; filename="${name}"`,
        'Accept-Ranges': 'bytes',
        'Last-Modified': file.mtime.toUTCString(),
        'Cache-Control': 'no-store',
        'X-Content-Type-Options': 'nosniff',
    } as Record<string, string>
}

export async function HEAD(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
    const { slug } = await ctx.params
    if (!isDownloadSlug(slug)) return new Response(null, { status: 404 })
    const file = await localFile(slug)
    if (!file) return new Response(null, { status: downloadTarget(slug) ? 302 : 503 })
    return new Response(null, { status: 200, headers: { ...fileHeaders(file, DOWNLOADS[slug].downloadName), 'Content-Length': String(file.size) } })
}

export async function GET(req: Request, ctx: { params: Promise<{ slug: string }> }) {
    const { slug } = await ctx.params
    if (!isDownloadSlug(slug)) {
        return NextResponse.json({ error: 'Descarga no encontrada.' }, { status: 404 })
    }

    const file = await localFile(slug)
    const target = file ? null : downloadTarget(slug)
    if (!file && !target) {
        return NextResponse.json(
            { error: `La descarga de ${DOWNLOADS[slug].name} aún no está disponible. Escríbenos a soporte@jacana-dev.com.` },
            { status: 503 },
        )
    }

    const ip = clientIp(req)
    if (rateLimited(`download:${ip}`, 20, 10 * 60 * 1000)) {
        return NextResponse.json({ error: 'Demasiados intentos. Prueba de nuevo en unos minutos.' }, { status: 429 })
    }

    const userAgent = req.headers.get('user-agent')
    if (!isBot(userAgent)) await countDownload(slug, ip, userAgent)

    if (!file) {
        const res = NextResponse.redirect(target!, 302)
        res.headers.set('Cache-Control', 'no-store')
        return res
    }

    const version = await versionOf(slug)
    const base = DOWNLOADS[slug].downloadName.replace(/\.apk$/i, '')
    const name = version ? `${base}-${version}.apk` : DOWNLOADS[slug].downloadName
    const headers = fileHeaders(file, name)

    // Reanudar descargas (Range) — útil en celulares con conexión inestable
    const range = req.headers.get('range')
    let start = 0
    let end = file.size - 1
    let status = 200
    if (range) {
        const m = /^bytes=(\d*)-(\d*)$/.exec(range.trim())
        if (m && (m[1] || m[2])) {
            if (m[1]) {
                start = parseInt(m[1], 10)
                if (m[2]) end = Math.min(parseInt(m[2], 10), file.size - 1)
            } else {
                start = Math.max(file.size - parseInt(m[2], 10), 0)
            }
            if (start > end || start >= file.size) {
                return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${file.size}` } })
            }
            status = 206
            headers['Content-Range'] = `bytes ${start}-${end}/${file.size}`
        }
    }
    headers['Content-Length'] = String(end - start + 1)

    const stream = Readable.toWeb(createReadStream(file.path, { start, end })) as unknown as ReadableStream
    return new Response(stream, { status, headers })
}
