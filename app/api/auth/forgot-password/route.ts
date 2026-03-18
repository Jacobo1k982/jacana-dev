// app/api/auth/forgot-password/route.ts
import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { Resend } from "resend"
import crypto from "crypto"

export async function POST(req: Request) {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const { email } = await req.json()

    const user = await prisma.user.findUnique({ where: { email } })

    // Siempre responde OK aunque el email no exista (seguridad)
    if (!user) {
        return NextResponse.json({ message: "Si el email existe recibirás un correo" })
    }

    // Elimina tokens anteriores del mismo email
    await prisma.passwordResetToken.deleteMany({ where: { email } })

    // Genera token seguro
    const token = crypto.randomBytes(32).toString("hex")
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60) // 1 hora

    await prisma.passwordResetToken.create({
        data: { email, token, expiresAt }
    })

    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`

    await resend.emails.send({
        from: "Jacana Dev <onboarding@resend.dev>",
        to: email,
        subject: "Recupera tu contraseña",
        html: `
            <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #080810; color: #fff;">
                <h2 style="font-weight: 300; margin-bottom: 8px;">Recuperar contraseña</h2>
                <p style="color: #94a3b8; font-size: 14px; margin-bottom: 32px;">
                    Recibimos una solicitud para restablecer tu contraseña. El link expira en 1 hora.
                </p>
                <a href="${resetUrl}"
                    style="display: inline-block; padding: 12px 24px; background: #fff; color: #080810; text-decoration: none; font-size: 12px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;">
                    Restablecer contraseña
                </a>
                <p style="color: #475569; font-size: 12px; margin-top: 32px;">
                    Si no solicitaste esto, ignora este correo.
                </p>
            </div>
        `,
    })

    return NextResponse.json({ message: "Si el email existe recibirás un correo" })
}