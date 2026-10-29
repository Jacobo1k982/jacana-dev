// GET/PATCH /api/admin/portal/requests — solicitudes iniciales de clientes nuevos
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPortalUser, readJson, isOneOf, fail, REQUEST_STATUSES } from '@/lib/portal'

export async function GET() {
    const admin = await getPortalUser()
    if (admin?.role !== 'ADMIN') return fail('No autorizado', 403)
    const requests = await prisma.projectRequest.findMany({
        orderBy: { createdAt: 'desc' },
        take: 200,
        select: {
            id: true, kind: true, description: true, timeline: true, links: true, status: true, createdAt: true,
            user: { select: { id: true, name: true, email: true } },
        },
    })
    return NextResponse.json({ requests })
}

export async function PATCH(req: Request) {
    const admin = await getPortalUser()
    if (admin?.role !== 'ADMIN') return fail('No autorizado', 403)
    const body = await readJson(req)
    const id = typeof body?.id === 'string' ? body.id : ''
    if (!id || !isOneOf(REQUEST_STATUSES, body?.status)) return fail('Datos inválidos.', 400)

    const { count } = await prisma.projectRequest.updateMany({ where: { id }, data: { status: body!.status as never } })
    if (count === 0) return fail('Solicitud no encontrada', 404)
    return NextResponse.json({ success: true })
}
