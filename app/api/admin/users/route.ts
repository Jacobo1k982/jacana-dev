// app/api/admin/users/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await auth()
    if ((session?.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            role: true,
            isActive: true,
            image: true,
            createdAt: true,
            _count: { select: { projects: true } }
        },
        orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ users })
}

export async function PUT(req: Request) {
    const session = await auth()
    if ((session?.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    const { id, isActive } = await req.json()
    const user = await prisma.user.update({
        where: { id },
        data: { isActive },
        select: { id: true, isActive: true }
    })

    return NextResponse.json({ user })
}