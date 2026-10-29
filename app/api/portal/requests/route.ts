// POST /api/portal/requests — "cuéntanos qué necesitas": el brief inicial de un cliente nuevo
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPortalEmail, TEAM_EMAIL } from '@/lib/email'
import { getPortalUser, readJson, cleanText, isOneOf, rateLimited, background, fail, REQUEST_KINDS } from '@/lib/portal'

export async function GET() {
    const user = await getPortalUser()
    if (!user) return fail('No autorizado', 401)
    const requests = await prisma.projectRequest.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 20,
        select: { id: true, kind: true, description: true, timeline: true, status: true, createdAt: true },
    })
    return NextResponse.json({ requests })
}

export async function POST(req: Request) {
    const user = await getPortalUser()
    if (!user) return fail('No autorizado', 401)
    if (rateLimited(`request:${user.id}`, 5, 60 * 60 * 1000)) return fail('Ya enviaste varias solicitudes. Te escribiremos pronto.', 429)

    const body = await readJson(req)
    if (!isOneOf(REQUEST_KINDS, body?.kind)) return fail('Elige qué tipo de proyecto necesitas.', 400)
    const description = cleanText(body?.description, 3000, { min: 20 })
    if (!description) return fail('Cuéntanos un poco más (mínimo 20 caracteres, máximo 3000).', 400)
    const timeline = body?.timeline ? cleanText(body.timeline, 120) : null
    const links = body?.links ? cleanText(body.links, 600) : null

    const request = await prisma.projectRequest.create({
        data: { userId: user.id, kind: body!.kind as string, description, timeline, links },
        select: { id: true, kind: true, status: true, createdAt: true },
    })

    background('aviso de solicitud nueva', sendPortalEmail({
        to: TEAM_EMAIL,
        subject: `Nueva solicitud: ${body!.kind} — ${user.name || user.email}`,
        title: `Nueva solicitud de ${user.name || user.email}`,
        message: `Tipo: ${body!.kind}\nPlazo: ${timeline ?? 'No indicó'}\nCorreo: ${user.email}\n\n${description}${links ? `\n\nEnlaces: ${links}` : ''}`,
        ctaLabel: 'Ver solicitudes',
        ctaPath: '/admin/portal',
    }))

    return NextResponse.json({ request }, { status: 201 })
}
