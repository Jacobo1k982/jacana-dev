// POST /api/portal/approvals/:id — el cliente aprueba o pide cambios en una entrega
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPortalEmail, TEAM_EMAIL } from '@/lib/email'
import { getPortalUser, readJson, cleanText, isOneOf, rateLimited, background, fail } from '@/lib/portal'

const DECISIONS = ['APPROVED', 'CHANGES_REQUESTED'] as const

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getPortalUser()
    if (!user) return fail('No autorizado', 401)
    if (rateLimited(`approval:${user.id}`, 20, 10 * 60 * 1000)) return fail('Demasiados intentos. Espera unos minutos.', 429)

    const { id } = await params
    const body = await readJson(req)
    if (!isOneOf(DECISIONS, body?.decision)) return fail('Decisión inválida.', 400)
    const decision = body!.decision as (typeof DECISIONS)[number]

    const response = body?.response ? cleanText(body.response, 2000) : null
    if (body?.response && !response) return fail('El comentario es demasiado largo.', 400)
    if (decision === 'CHANGES_REQUESTED' && !response) return fail('Cuéntanos qué hay que cambiar.', 400)

    // Solo el dueño del proyecto decide (el equipo publica las entregas, no las aprueba)
    const approval = await prisma.projectApproval.findFirst({
        where: { id, status: 'PENDING', project: { userId: user.id, isClientProject: true } },
        select: { id: true, title: true, project: { select: { id: true, name: true } } },
    })
    if (!approval) return fail('Entrega no encontrada o ya respondida.', 404)

    const updated = await prisma.projectApproval.update({
        where: { id: approval.id },
        data: { status: decision, response, decidedAt: new Date() },
        select: { id: true, title: true, status: true, response: true, decidedAt: true },
    })

    background('aviso de decisión al equipo', sendPortalEmail({
        to: TEAM_EMAIL,
        subject: `${decision === 'APPROVED' ? 'Aprobado' : 'Cambios solicitados'}: ${approval.title}`,
        title: decision === 'APPROVED' ? `${user.name || user.email} aprobó una entrega` : `${user.name || user.email} pidió cambios`,
        message: `Proyecto: ${approval.project.name}\nEntrega: ${approval.title}${response ? `\n\n${response}` : ''}`,
        ctaLabel: 'Ver en el panel',
        ctaPath: `/admin/portal/${approval.project.id}`,
    }))

    return NextResponse.json({ approval: updated })
}
