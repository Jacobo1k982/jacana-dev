// app/api/contact/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 600;
const CONTACT_TO = process.env.CONTACT_TO_EMAIL || 'jgutierrez@jacana-dev.com';

const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export async function POST(req: Request) {
    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 });
    }

    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const company = String(body.company ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const service = String(body.service ?? '').trim();
    const budget = String(body.budget ?? '').trim();
    const message = String(body.message ?? '').trim();
    // Honeypot: campo oculto en el form que un humano nunca llena.
    const website = String(body.website ?? '').trim();

    if (website) {
        // No delatamos el honeypot: respondemos como si todo hubiera salido bien.
        return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
        return NextResponse.json({ error: 'Nombre, email y mensaje son requeridos.' }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
        return NextResponse.json({ error: 'El email no es válido.' }, { status: 400 });
    }
    if (message.length > MESSAGE_MAX) {
        return NextResponse.json({ error: `El mensaje no puede superar ${MESSAGE_MAX} caracteres.` }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
        console.error('[api/contact] Falta RESEND_API_KEY en el entorno.');
        return NextResponse.json({ error: 'El servicio de email no está configurado.' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const rows: [string, string][] = [
        ['Nombre', name],
        ['Email', email],
        ['Empresa', company || '—'],
        ['Teléfono', phone || '—'],
        ['Servicio de interés', service || '—'],
        ['Presupuesto estimado', budget || '—'],
    ];

    try {
        await resend.emails.send({
            from: 'Jacana Dev <onboarding@resend.dev>',
            to: CONTACT_TO,
            replyTo: email,
            subject: `Nuevo contacto: ${name}${service ? ` — ${service}` : ''}`,
            html: `
                <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #080810; color: #fff;">
                    <h2 style="font-weight: 300; margin-bottom: 24px;">Nuevo mensaje desde jacana-dev.com</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                        ${rows.map(([label, value]) => `
                            <tr>
                                <td style="padding: 6px 16px 6px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; vertical-align: top; white-space: nowrap;">${label}</td>
                                <td style="padding: 6px 0; color: #e2e8f0; font-size: 14px;">${escapeHtml(value)}</td>
                            </tr>
                        `).join('')}
                    </table>
                    <p style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px;">Mensaje</p>
                    <p style="color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${escapeHtml(message)}</p>
                </div>
            `,
        });
    } catch (err) {
        console.error('[api/contact] Error enviando email con Resend:', err);
        return NextResponse.json({ error: 'No se pudo enviar el mensaje. Intenta de nuevo en unos minutos.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
}
