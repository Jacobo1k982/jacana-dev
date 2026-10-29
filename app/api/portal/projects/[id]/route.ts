// GET /api/portal/projects/:id — detalle completo de un proyecto del cliente
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPortalUser, projectScope, fail } from '@/lib/portal'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const user = await getPortalUser()
    if (!user) return fail('No autorizado', 401)
    const { id } = await params

    const project = await prisma.project.findFirst({
        where: projectScope(user, id),
        select: {
            id: true, name: true, description: true, status: true, phase: true, url: true, techs: true, createdAt: true, updatedAt: true,
            updates: {
                orderBy: { createdAt: 'desc' }, take: 100,
                select: { id: true, title: true, body: true, phase: true, createdAt: true, author: { select: { name: true } } },
            },
            comments: {
                orderBy: { createdAt: 'asc' }, take: 300,
                select: { id: true, body: true, createdAt: true, author: { select: { name: true, role: true } } },
            },
            links: { orderBy: { createdAt: 'asc' }, select: { id: true, label: true, url: true, kind: true } },
            approvals: {
                orderBy: { createdAt: 'desc' },
                select: { id: true, title: true, description: true, status: true, response: true, decidedAt: true, createdAt: true },
            },
        },
    })

    // Mismo mensaje exista o no: no revela proyectos de otros clientes
    if (!project) return fail('Proyecto no encontrado', 404)
    return NextResponse.json({ project })
}
