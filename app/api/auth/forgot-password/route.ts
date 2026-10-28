// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendPasswordResetEmail } from "@/lib/email"
import crypto from "crypto"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const OK = { message: "Te enviamos un correo con las instrucciones para restablecer tu contraseña." }

// Límite simple por conexión: evita que alguien use este formulario para averiguar
// qué correos tienen cuenta o para llenar de correos a otra persona.
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 5
const attempts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(key: string): boolean {
    const now = Date.now()
    const entry = attempts.get(key)
    if (!entry || entry.resetAt < now) {
        attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
        return false
    }
    entry.count += 1
    return entry.count > MAX_ATTEMPTS
}

export async function POST(req: Request) {
    let body: { email?: unknown }
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 })
    }

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    if (isRateLimited(ip)) {
        return NextResponse.json(
            { error: "Demasiados intentos. Espera unos minutos e inténtalo de nuevo." },
            { status: 429 }
        )
    }

    const email = String(body.email ?? "").trim()
    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ error: "Ingresa un email válido." }, { status: 400 })
    }

    // Sin distinguir mayúsculas/minúsculas ("Ana@x.com" == "ana@x.com")
    const user = await prisma.user.findFirst({
        where: { email: { equals: email, mode: "insensitive" } },
    })

    // Si no hay cuenta con ese correo, se avisa y NO se envía nada
    if (!user) {
        return NextResponse.json(
            { error: "No encontramos una cuenta con ese correo. Revisa que esté bien escrito o crea una cuenta." },
            { status: 404 }
        )
    }

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

    return NextResponse.json(OK)
}
