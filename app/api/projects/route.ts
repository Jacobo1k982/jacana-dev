// app/api/projects/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })

    const projects = await prisma.project.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ projects })
}

export async function POST(req: Request) {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const user = await prisma.user.findUnique({ where: { email: session.user.email } })
    if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })

    const { name, description, status, techs, url, image } = await req.json()
    if (!name) return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 })

    const project = await prisma.project.create({
        data: { userId: user.id, name, description, status, techs: techs ?? [], url, image }
    })

    return NextResponse.json({ project })
}