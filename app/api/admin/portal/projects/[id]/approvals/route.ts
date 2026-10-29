// POST /api/admin/portal/projects/:id/approvals — pedir al cliente que apruebe una entrega
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPortalEmail } from '@/lib/email'
import { getPortalUser, readJson, cleanText, background, fail } from '@/lib/portal'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const admin = await getPortalUser()
    if (admin?.role !== 'ADMIN') return fail('No autorizado', 403)
    const { id } = await params
    const body = await readJson(req)

    const title = cleanText(body?.title, 120)
    if (!title) return fail('Ponle un título a la entrega.', 400)
    const description = body?.description ? cleanText(body.description, 2000) : null
    if (body?.description && !description) return fail('La descripción es demasiado larga.', 400)

    const project = await prisma.project.findFirst({
        where: { id, isClientProject: true },
        select: { id: true, name: true, user: { select: { email: true, notifyEmail: true } } },
    })
    if (!project) return fail('Proyecto no encontrado', 404)

    const approval = await prisma.projectApproval.create({
        data: { projectId: project.id, title, description },
        select: { id: true, title: true, description: true, status: true, createdAt: true },
    })

    if (project.user.notifyEmail) {
        background('aviso de aprobación al cliente', sendPortalEmail({
            to: project.user.email,
            subject: `Necesitamos tu aprobación: ${title}`,
            title: 'Hay una entrega para revisar',
            message: `${project.name}: ${title}${description ? `\n\n${description}` : ''}`,
            ctaLabel: 'Revisar y responder',
            ctaPath: `/dashboard/projects/${project.id}`,
        }))
    }
    return NextResponse.json({ approval }, { status: 201 })
}
