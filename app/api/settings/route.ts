// app/api/settings/route.ts
import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function PUT(req: Request) {
    const session = await auth()
    if (!session?.user?.email) return NextResponse.json({ error: "No autorizado" }, { status: 401 })

    const { type, ...data } = await req.json()

    if (type === 'password') {
        const { currentPassword, newPassword } = data
        const user = await prisma.user.findUnique({ where: { email: session.user.email } })
        if (!user?.password) return NextResponse.json({ error: "No puedes cambiar la contrasena en cuentas OAuth" }, { status: 400 })
        const valid = await bcrypt.compare(currentPassword, user.password)
        if (!valid) return NextResponse.json({ error: "Contrasena actual incorrecta" }, { status: 400 })
        const hashed = await bcrypt.hash(newPassword, 12)
        await prisma.user.update({ where: { email: session.user.email }, data: { password: hashed } })
        return NextResponse.json({ success: true })
    }

    if (type === 'notifications') {
        const { notifyEmail, notifyProduct } = data
        await prisma.user.update({ where: { email: session.user.email }, data: { notifyEmail, notifyProduct } })
        return NextResponse.json({ success: true })
    }

    if (type === 'privacy') {
        const { profilePublic, showEmail } = data
        await prisma.user.update({ where: { email: session.user.email }, data: { profilePublic, showEmail } })
        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Tipo invalido" }, { status: 400 })
}