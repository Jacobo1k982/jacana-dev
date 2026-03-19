// app/api/profile/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function PUT(req: Request) {
    const session = await auth()
    if (!session?.user?.email) {
        return NextResponse.json({ error: "No autorizado" }, { status: 401 })
    }

    const { name, username, bio, website, twitter, github, linkedin } = await req.json()

    if (username) {
        const taken = await prisma.user.findFirst({
            where: { username, NOT: { email: session.user.email } }
        })
        if (taken) return NextResponse.json({ error: "Username no disponible" }, { status: 400 })
    }

    const user = await prisma.user.update({
        where: { email: session.user.email },
        data: { name, username, bio, website, twitter, github, linkedin },
        select: { id: true, name: true, username: true, bio: true, website: true, twitter: true, github: true, linkedin: true }
    })

    return NextResponse.json({ user })
}