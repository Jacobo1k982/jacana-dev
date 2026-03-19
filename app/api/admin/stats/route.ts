// app/api/admin/stats/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
    const session = await auth()
    if ((session?.user as any)?.role !== 'ADMIN') {
        return NextResponse.json({ error: "No autorizado" }, { status: 403 })
    }

    const [totalUsers, totalProjects, activeProjects, newUsersThisMonth] = await Promise.all([
        prisma.user.count(),
        prisma.project.count(),
        prisma.project.count({ where: { status: 'ACTIVE' } }),
        prisma.user.count({
            where: {
                createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
            }
        }),
    ])

    return NextResponse.json({ totalUsers, totalProjects, activeProjects, newUsersThisMonth })
}