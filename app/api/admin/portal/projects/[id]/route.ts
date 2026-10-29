// PATCH /api/admin/portal/projects/:id — cambiar fase, estado o datos básicos
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPortalUser, readJson, cleanText, cleanHttpUrl, isOneOf, fail, PHASES, PROJECT_STATUSES } from '@/lib/portal'

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const admin = await getPortalUser()
    if (admin?.role !== 'ADMIN') return fail('No autorizado', 403)
    const { id } = await params
    const body = await readJson(req)
    if (!body) return fail('Solicitud inválida.', 400)

    const data: Record<string, unknown> = {}
    if (body.name !== undefined) {
        const v = cleanText(body.name, 120)
        if (!v) return fail('Nombre inválido.', 400)
        data.name = v
    }
    if (body.description !== undefined) {
        data.description = body.description === '' ? null : cleanText(body.description, 2000)
        if (body.description !== '' && !data.description) return fail('Descripción inválida.', 400)
    }
    if (body.url !== undefined) {
        data.url = body.url === '' ? null : cleanHttpUrl(body.url)
        if (body.url !== '' && !data.url) return fail('La URL debe empezar con http:// o https://', 400)
    }
    if (body.phase !== undefined) {
        if (!isOneOf(PHASES, body.phase)) return fail('Fase inválida.', 400)
        data.phase = body.phase
    }
    if (body.status !== undefined) {
        if (!isOneOf(PROJECT_STATUSES, body.status)) return fail('Estado inválido.', 400)
        data.status = body.status
    }
    if (Object.keys(data).length === 0) return fail('No hay cambios.', 400)

    const exists = await prisma.project.findFirst({ where: { id, isClientProject: true }, select: { id: true } })
    if (!exists) return fail('Proyecto no encontrado', 404)

    const project = await prisma.project.update({
        where: { id },
        data,
        select: { id: true, name: true, description: true, url: true, phase: true, status: true },
    })
    return NextResponse.json({ project })
}
