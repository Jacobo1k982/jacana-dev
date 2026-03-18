// lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`

    await resend.emails.send({
        from: 'Jacana Dev <onboarding@resend.dev>',
        to: email,
        subject: 'Recupera tu contraseña — Jacana Dev',
        html: `
            <!DOCTYPE html>
            <html>
            <head><meta charset="utf-8"></head>
            <body style="background:#06051d;font-family:Georgia,serif;margin:0;padding:40px 20px;">
                <div style="max-width:480px;margin:0 auto;background:#080810;border:1px solid rgba(255,255,255,0.08);padding:48px;">
                    <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.4),transparent);margin-bottom:40px;"></div>
                    <p style="font-size:10px;text-transform:uppercase;letter-spacing:0.35em;color:rgba(251,191,36,0.6);margin:0 0 16px;">— Jacana Developers</p>
                    <h1 style="font-size:28px;font-weight:300;color:#ffffff;margin:0 0 8px;line-height:1.2;">Recupera tu<br><em style="color:#94a3b8;font-style:normal;">contraseña</em></h1>
                    <p style="font-size:13px;color:#475569;margin:24px 0 32px;line-height:1.7;">
                        Recibimos una solicitud para restablecer la contraseña de tu cuenta. Si no fuiste tú, ignora este email.
                    </p>
                    <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background:#ffffff;color:#080810;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.15em;text-decoration:none;">
                        Restablecer contraseña →
                    </a>
                    <p style="font-size:11px;color:#334155;margin:32px 0 0;line-height:1.6;">
                        Este enlace expira en <strong style="color:#475569;">1 hora</strong>.<br>
                        Si tienes problemas con el botón, copia este enlace:<br>
                        <span style="color:#475569;word-break:break-all;">${resetUrl}</span>
                    </p>
                    <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(251,191,36,0.15),transparent);margin-top:40px;"></div>
                </div>
            </body>
            </html>
        `,
    })
}