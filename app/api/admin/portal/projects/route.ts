// /api/admin/portal/projects — el equipo crea y lista proyectos de cliente
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendPortalEmail } from '@/lib/email'
import { getPortalUser, readJson, cleanText, cleanHttpUrl, isOneOf, background, fail, PHASES } from '@/lib/portal'

export async function GET() {
    const admin = await getPortalUser()
    if (admin?.role !== 'ADMIN') return fail('No autorizado', 403)

    const projects = await prisma.project.findMany({
        where: { isClientProject: true },
        select: {
            id: true, name: true, status: true, phase: true, updatedAt: true,
            user: { select: { id: true, name: true, email: true } },
            approvals: { where: { status: 'PENDING' }, select: { id: true } },
        },
        orderBy: { updatedAt: 'desc' },
    })
    return NextResponse.json({
        projects: projects.map(({ approvals, ...p }) => ({ ...p, pendingApprovals: approvals.length })),
    })
}

export async function POST(req: Request) {
    const admin = await getPortalUser()
    if (admin?.role !== 'ADMIN') return fail('No autorizado', 403)

    const body = await readJson(req)
    const name = cleanText(body?.name, 120)
    if (!name) return fail('El nombre del proyecto es obligatorio.', 400)
    const description = body?.description ? cleanText(body.description, 2000) : null
    const url = body?.url ? cleanHttpUrl(body.url) : null
    if (body?.url && !url) return fail('La URL debe empezar con http:// o https://', 400)
    const phase = body?.phase === undefined ? 'DISCOVERY' : body.phase
    if (!isOneOf(PHASES, phase)) return fail('Fase inválida.', 400)

    // El cliente se identifica por correo o por id
    const email = typeof body?.clientEmail === 'string' ? body.clientEmail.trim() : ''
    const clientId = typeof body?.clientId === 'string' ? body.clientId : ''
    if (!email && !clientId) return fail('Indica el correo del cliente.', 400)
    const client = await prisma.user.findFirst({
        where: clientId ? { id: clientId } : { email: { equals: email, mode: 'insensitive' } },
        select: { id: true, email: true, name: true, notifyEmail: true },
    })
    if (!client) return fail('No existe una cuenta con ese correo. El cliente debe registrarse primero.', 404)

    const project = await prisma.project.create({
        data: { userId: client.id, name, description, url, phase, isClientProject: true },
        select: { id: true, name: true, phase: true },
    })

    if (client.notifyEmail) {
        background('aviso de proyecto nuevo al cliente', sendPortalEmail({
            to: client.email,
            subject: `Ya puedes ver tu proyecto: ${name}`,
            title: 'Tu proyecto ya está en el portal',
            message: `Creamos "${name}" en tu cuenta. Ahí verás en qué etapa vamos, los avances, y podrás escribirnos y aprobar entregas.`,
            ctaLabel: 'Abrir mi proyecto',
            ctaPath: `/dashboard/projects/${project.id}`,
        }))
    }
    return NextResponse.json({ project }, { status: 201 })
}
