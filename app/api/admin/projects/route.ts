// app/api/admin/projects/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await auth()
    if ((session?.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    const projects = await prisma.project.findMany({
        include: {
            user: { select: { name: true, email: true } }
        },
        orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ projects })
}

export async function DELETE(req: Request) {
    const session = await auth()
    if ((session?.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    const { id } = await req.json()
    await prisma.project.delete({ where: { id } })

    return NextResponse.json({ success: true })
}