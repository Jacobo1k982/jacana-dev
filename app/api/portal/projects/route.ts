// GET /api/portal/projects — proyectos del cliente autenticado (el admin ve todos los de cliente)
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPortalUser, fail } from '@/lib/portal'

export async function GET() {
    const user = await getPortalUser()
    if (!user) return fail('No autorizado', 401)

    const projects = await prisma.project.findMany({
        where: user.role === 'ADMIN' ? { isClientProject: true } : { userId: user.id, isClientProject: true },
        select: {
            id: true, name: true, description: true, status: true, phase: true, url: true, createdAt: true, updatedAt: true,
            _count: { select: { updates: true, comments: true } },
            approvals: { where: { status: 'PENDING' }, select: { id: true } },
        },
        orderBy: { updatedAt: 'desc' },
    })

    return NextResponse.json({
        projects: projects.map(({ approvals, ...p }) => ({ ...p, pendingApprovals: approvals.length })),
    })
}
