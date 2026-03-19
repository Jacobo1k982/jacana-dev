// app/api/projects/[id]/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })

    const { name, description, status, techs, url, image } = await req.json()

    const project = await prisma.project.updateMany({
        where: { id: params.id, userId: user.id },
        data: { name, description, status, techs: techs ?? [], url, image }
    })

    return NextResponse.json({ project })
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })

    await prisma.project.deleteMany({ where: { id: params.id, userId: user.id } })

    return NextResponse.json({ success: true })
}