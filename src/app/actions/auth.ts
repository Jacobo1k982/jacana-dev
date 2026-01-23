"use server";

import { prisma } from "@/lib/prisma"; // tu cliente Prisma
import crypto from "crypto";
import bcrypt from "bcryptjs";
import { Resend } from "resend"; // o nodemailer

const resend = new Resend(process.env.RESEND_API_KEY!);
// Alternativa: configura nodemailer con Mailtrap/Resend/SMTP

export async function requestPasswordReset(formData: FormData) {
    const email = formData.get("email") as string;

    if (!email) return { error: "Email requerido" };

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        // No revelar si existe o no (seguridad)
        return { success: true, message: "Si el email existe, recibirás un enlace" };
    }

    // Generar token seguro
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, 12);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            resetToken: hashedToken,
            resetTokenExpires: new Date(Date.now() + 60 * 60 * 1000), // 1 hora
        },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    try {
        await resend.emails.send({
            from: "Tu App <no-reply@tudominio.com>",
            to: email,
            subject: "Recupera tu contraseña",
            html: `
        <p>Haz clic en el enlace para restablecer tu contraseña:</p>
        <a href="${resetUrl}">Restablecer contraseña</a>
        <p>Este enlace expira en 1 hora.</p>
        <p>Si no solicitaste esto, ignora el email.</p>
      `,
        });

        return { success: true, message: "Enlace enviado" };
    } catch (err) {
        console.error(err);
        return { error: "Error al enviar email" };
    }
}

export async function resetPassword(formData: FormData) {
    const token = formData.get("token") as string;
    const email = formData.get("email") as string;
    const newPassword = formData.get("password") as string;

    if (!token || !email || !newPassword) return { error: "Datos incompletos" };

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user || !user.resetToken || !user.resetTokenExpires) {
        return { error: "Token inválido" };
    }

    if (user.resetTokenExpires < new Date()) {
        return { error: "El enlace ha expirado" };
    }

    const isValid = await bcrypt.compare(token, user.resetToken);
    if (!isValid) return { error: "Token inválido" };

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpires: null,
        },
    });

    return { success: true, message: "Contraseña actualizada" };
}