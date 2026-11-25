// GET /api/download/<slug> — cuenta la descarga y redirige al archivo.
// Reglas: una descarga por visitante (IP hasheada) cada 24 h, sin bots, con límite de ritmo.
// Si la base de datos falla, la descarga igual continúa (el conteo nunca bloquea al usuario).
import { createHash } from 'node:crypto'
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { rateLimited } from '@/lib/portal'
import { DOWNLOADS, downloadTarget, isBot, isDownloadSlug } from '@/lib/downloads'

export const dynamic = 'force-dynamic'

const DAY_MS = 24 * 60 * 60 * 1000

function clientIp(req: Request): string {
    const fwd = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    return fwd || req.headers.get('x-real-ip') || 'unknown'
}

export async function GET(req: Request, ctx: { params: Promise<{ slug: string }> }) {
    const { slug } = await ctx.params
    if (!isDownloadSlug(slug)) {
        return NextResponse.json({ error: 'Descarga no encontrada.' }, { status: 404 })
    }

    const target = downloadTarget(slug)
    if (!target) {
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
    if (!isBot(userAgent)) {
        try {
            const salt = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'jacana'
            const ipHash = createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32)
            const since = new Date(Date.now() - DAY_MS)
            const recent = await prisma.downloadEvent.findFirst({
                where: { slug, ipHash, createdAt: { gte: since } },
                select: { id: true },
            })
            if (!recent) {
                await prisma.$transaction([
                    prisma.downloadEvent.create({ data: { slug, ipHash, userAgent: userAgent?.slice(0, 200) } }),
                    prisma.appDownload.upsert({
                        where: { slug },
                        create: { slug, count: 1 },
                        update: { count: { increment: 1 } },
                    }),
                ])
            }
        } catch (err) {
            console.error('[download] no se pudo contar:', err)
        }
    }

    const res = NextResponse.redirect(target, 302)
    res.headers.set('Cache-Control', 'no-store')
    return res
}
