// app/api/register/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
    const { name, email, password, username } = await req.json()

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return NextResponse.json({ error: "Email ya registrado" }, { status: 400 })

    if (username) {
        const taken = await prisma.user.findUnique({ where: { username } })
        if (taken) return NextResponse.json({ error: "Username no disponible", details: { username: ["Este username ya está en uso"] } }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
        data: { name, email, password: hashed, username },
        select: { id: true, email: true, name: true, username: true }
    })

    return NextResponse.json({ user })
}