// POST /api/portal/projects/:id/comments — comentario del cliente o del equipo
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPortalEmail, TEAM_EMAIL } from '@/lib/email'
import { getPortalUser, projectScope, readJson, cleanText, rateLimited, background, fail } from '@/lib/portal'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getPortalUser()
    if (!user) return fail('No autorizado', 401)
    if (rateLimited(`comment:${user.id}`, 20, 10 * 60 * 1000)) return fail('Demasiados mensajes seguidos. Espera unos minutos.', 429)

    const { id } = await params
    const body = await readJson(req)
    const text = cleanText(body?.body, 2000)
    if (!text) return fail('Escribe un mensaje (máximo 2000 caracteres).', 400)

    const project = await prisma.project.findFirst({
        where: projectScope(user, id),
        select: { id: true, name: true, user: { select: { email: true, name: true, notifyEmail: true } } },
    })
    if (!project) return fail('Proyecto no encontrado', 404)

    const comment = await prisma.projectComment.create({
        data: { projectId: project.id, authorId: user.id, body: text },
        select: { id: true, body: true, createdAt: true, author: { select: { name: true, role: true } } },
    })

    if (user.role === 'ADMIN') {
        // El equipo responde: avisar al cliente si no desactivó los correos
        if (project.user.notifyEmail) {
            background('aviso de comentario al cliente', sendPortalEmail({
                to: project.user.email,
                subject: `Nuevo mensaje en ${project.name}`,
                title: 'Tienes un mensaje nuevo',
                message: `${text}`,
                ctaLabel: 'Responder en el portal',
                ctaPath: `/dashboard/projects/${project.id}`,
            }))
        }
    } else {
        background('aviso de comentario al equipo', sendPortalEmail({
            to: TEAM_EMAIL,
            subject: `Comentario de ${user.name || user.email} en ${project.name}`,
            title: `${user.name || user.email} escribió en ${project.name}`,
            message: text,
            ctaLabel: 'Ver en el panel',
            ctaPath: `/admin/portal/${project.id}`,
        }))
    }

    return NextResponse.json({ comment }, { status: 201 })
}
