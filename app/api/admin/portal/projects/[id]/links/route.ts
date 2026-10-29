// POST/DELETE /api/admin/portal/projects/:id/links — enlaces compartidos con el cliente
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getPortalUser, readJson, cleanText, cleanHttpUrl, isOneOf, fail, LINK_KINDS } from '@/lib/portal'

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const admin = await getPortalUser()
    if (admin?.role !== 'ADMIN') return fail('No autorizado', 403)
    const { id } = await params
    const body = await readJson(req)

    const label = cleanText(body?.label, 80)
    const url = cleanHttpUrl(body?.url)
    const kind = body?.kind ?? 'OTHER'
    if (!label) return fail('Ponle un nombre al enlace.', 400)
    if (!url) return fail('La URL debe empezar con http:// o https://', 400)
    if (!isOneOf(LINK_KINDS, kind)) return fail('Tipo de enlace inválido.', 400)

    const exists = await prisma.project.findFirst({ where: { id, isClientProject: true }, select: { id: true } })
    if (!exists) return fail('Proyecto no encontrado', 404)

    const link = await prisma.projectLink.create({
        data: { projectId: id, label, url, kind: kind as never },
        select: { id: true, label: true, url: true, kind: true },
    })
    return NextResponse.json({ link }, { status: 201 })
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const admin = await getPortalUser()
    if (admin?.role !== 'ADMIN') return fail('No autorizado', 403)
    const { id } = await params
    const body = await readJson(req)
    const linkId = typeof body?.linkId === 'string' ? body.linkId : ''
    if (!linkId) return fail('Falta el enlace.', 400)

    // deleteMany con projectId: solo borra si el enlace pertenece a este proyecto
    const { count } = await prisma.projectLink.deleteMany({ where: { id: linkId, projectId: id } })
    if (count === 0) return fail('Enlace no encontrado', 404)
    return NextResponse.json({ success: true })
}
