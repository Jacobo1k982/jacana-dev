// POST /api/admin/portal/projects/:id/updates — publicar un avance (y opcionalmente cambiar la fase)
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPortalEmail } from '@/lib/email'
import { getPortalUser, readJson, cleanText, isOneOf, background, fail, PHASES, PHASE_LABELS } from '@/lib/portal'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const admin = await getPortalUser()
    if (admin?.role !== 'ADMIN') return fail('No autorizado', 403)
    const { id } = await params
    const body = await readJson(req)

    const title = cleanText(body?.title, 120)
    const text = cleanText(body?.body, 5000)
    if (!title || !text) return fail('Escribe un título y el detalle del avance.', 400)
    const phase = body?.phase ? body.phase : null
    if (phase !== null && !isOneOf(PHASES, phase)) return fail('Fase inválida.', 400)
    const notify = body?.notify !== false

    const project = await prisma.project.findFirst({
        where: { id, isClientProject: true },
        select: { id: true, name: true, user: { select: { email: true, notifyEmail: true } } },
    })
    if (!project) return fail('Proyecto no encontrado', 404)

    // Avance + cambio de fase en una sola operación: nunca quedan desincronizados
    const [update] = await prisma.$transaction([
        prisma.projectUpdate.create({
            data: { projectId: project.id, authorId: admin.id, title, body: text, phase: phase as never },
            select: { id: true, title: true, body: true, phase: true, createdAt: true },
        }),
        ...(phase ? [prisma.project.update({ where: { id: project.id }, data: { phase: phase as never } })] : [prisma.project.update({ where: { id: project.id }, data: {} })]),
    ])

    if (notify && project.user.notifyEmail) {
        background('aviso de avance al cliente', sendPortalEmail({
            to: project.user.email,
            subject: `Avance en ${project.name}: ${title}`,
            title,
            message: `${text}${phase ? `\n\nEtapa actual: ${PHASE_LABELS[phase as keyof typeof PHASE_LABELS]}` : ''}`,
            ctaLabel: 'Ver mi proyecto',
            ctaPath: `/dashboard/projects/${project.id}`,
        }))
    }
    return NextResponse.json({ update }, { status: 201 })
}
