// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPasswordResetEmail } from "@/lib/email"
import crypto from "crypto"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const GENERIC_OK = { message: "Si el email existe recibirás un correo" }

export async function POST(req: Request) {
    let body: { email?: unknown }
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
    }

    const email = String(body.email ?? "").trim()
    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "Ingresa un email válido." }, { status: 400 })
    }

    // Sin distinguir mayúsculas/minúsculas ("Ana@x.com" == "ana@x.com")
    const user = await prisma.user.findFirst({
        where: { email: { equals: email, mode: "insensitive" } },
    })

    // Siempre responde OK aunque el email no exista (seguridad)
    if (!user) return NextResponse.json(GENERIC_OK)

    // El token se guarda con el email tal como está en la cuenta
    await prisma.passwordResetToken.deleteMany({ where: { email: user.email } })

    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 hora

    await prisma.passwordResetToken.create({
        data: { email: user.email, token, expiresAt },
    })

    const result = await sendPasswordResetEmail(user.email, token)

    if (!result.ok) {
        // Queda en los logs del servidor (docker logs) para diagnosticar
        console.error("[api/auth/forgot-password] No se pudo enviar el correo:", result.error)
        await prisma.passwordResetToken.deleteMany({ where: { token } })
        return NextResponse.json(
            { error: "No pudimos enviar el correo en este momento. Intenta de nuevo más tarde." },
            { status: 502 }
        )
    }

    return NextResponse.json(GENERIC_OK)
}
