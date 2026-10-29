// lib/email.ts
import { Resend } from 'resend'

const DEFAULT_BASE_URL = 'https://jacana-dev.com'

/**
 * Remitente de los correos transaccionales.
 * Debe ser una dirección de un dominio verificado en Resend (jacana-dev.com).
 * El remitente de pruebas "onboarding@resend.dev" SOLO entrega al dueño de la cuenta de Resend.
 * Se puede cambiar con la variable de entorno MAIL_FROM.
 */
export const MAIL_FROM = process.env.MAIL_FROM || 'Jacana Dev <soporte@jacana-dev.com>'

/** URL pública del sitio. NEXT_PUBLIC_* se fija al compilar, por eso hay APP_URL y un valor por defecto. */
export function getBaseUrl(): string {
    const raw = process.env.APP_URL || process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE_URL
    return raw.replace(/\/+$/, '')
}

export type SendResult = { ok: true } | { ok: false; error: string }

export async function sendPasswordResetEmail(email: string, token: string): Promise<SendResult> {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
        return { ok: false, error: 'RESEND_API_KEY no está configurada' }
    }

    const resend = new Resend(apiKey) // se crea aquí, no al importar: evita fallos durante el build
    const resetUrl = `${getBaseUrl()}/reset-password?token=${encodeURIComponent(token)}`

    try {
        // Resend NO lanza excepción ante un rechazo: devuelve { error }
        const { error } = await resend.emails.send({
            from: MAIL_FROM,
            to: email,
            subject: 'Recupera tu contraseña — Jacana Dev',
            html: `
            <!DOCTYPE html>
            <html>
            <head><meta charset="utf-8"></head>
            <body style="background:#0d1117;font-family:Georgia,serif;margin:0;padding:40px 20px;">
                <div style="max-width:480px;margin:0 auto;background:#161b22;border:1px solid #2b3543;padding:48px;">
                    <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(176,208,0,0.6),transparent);margin-bottom:40px;"></div>
                    <p style="font-size:10px;text-transform:uppercase;letter-spacing:0.35em;color:#b0d000;margin:0 0 16px;">— Jacana Developers</p>
                    <h1 style="font-size:28px;font-weight:300;color:#ffffff;margin:0 0 8px;line-height:1.2;">Recupera tu<br><span style="color:#9aa9bd;">contraseña</span></h1>
                    <p style="font-size:14px;color:#9aa9bd;margin:24px 0 32px;line-height:1.7;">
                        Recibimos una solicitud para restablecer la contraseña de tu cuenta. Si no fuiste tú, ignora este correo.
                    </p>
                    <a href="${resetUrl}" style="display:inline-block;padding:14px 32px;background:#b0d000;color:#0d1117;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.15em;text-decoration:none;">
                        Restablecer contraseña →
                    </a>
                    <p style="font-size:12px;color:#7d8da3;margin:32px 0 0;line-height:1.6;">
                        Este enlace expira en <strong style="color:#b4c0cf;">1 hora</strong>.<br>
                        Si tienes problemas con el botón, copia este enlace:<br>
                        <span style="color:#9aa9bd;word-break:break-all;">${resetUrl}</span>
                    </p>
                    <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(176,208,0,0.25),transparent);margin-top:40px;"></div>
                </div>
            </body>
            </html>
        `,
        })
        if (error) return { ok: false, error: `${error.name ?? 'resend'}: ${error.message}` }
        return { ok: true }
    } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) }
    }
}

const escapeHtml = (v: string) =>
    v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Aviso interno: alguien creó una cuenta. Nunca debe romper el registro, por eso devuelve el resultado en vez de lanzar. */
export async function sendNewSignupNotification(user: { email: string; name?: string | null; username?: string | null }): Promise<SendResult> {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) return { ok: false, error: 'RESEND_API_KEY no está configurada' }

    const to = process.env.CONTACT_TO_EMAIL || 'jgutierrez@jacana-dev.com'
    const resend = new Resend(apiKey)
    try {
        const { error } = await resend.emails.send({
            from: MAIL_FROM,
            to,
            subject: `Nueva cuenta: ${user.name || user.email}`,
            html: `
            <div style="font-family:Georgia,serif;background:#0d1117;padding:32px;color:#e6edf3;">
                <p style="color:#b0d000;font-size:11px;letter-spacing:0.3em;margin:0 0 12px;">NUEVO REGISTRO</p>
                <p style="margin:0 0 6px;font-size:18px;">${escapeHtml(user.name || 'Sin nombre')}</p>
                <p style="margin:0 0 6px;color:#9aa9bd;">${escapeHtml(user.email)}</p>
                ${user.username ? `<p style="margin:0 0 6px;color:#9aa9bd;">@${escapeHtml(user.username)}</p>` : ''}
                <p style="margin:20px 0 0;"><a href="${getBaseUrl()}/admin/users" style="color:#b0d000;">Ver usuarios en el panel</a></p>
            </div>`,
        })
        if (error) return { ok: false, error: `${error.name ?? 'resend'}: ${error.message}` }
        return { ok: true }
    } catch (err) {
        return { ok: false, error: err instanceof Error ? err.message : String(err) }
    }
}
