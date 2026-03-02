import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const data: ContactFormData = await request.json();

        // Validación básica
        if (!data.name || !data.email || !data.message) {
            return NextResponse.json(
                { error: "Todos los campos son requeridos" },
                { status: 400 }
            );
        }

        // Validar formato de email
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(data.email)) {
            return NextResponse.json(
                { error: "Formato de email inválido" },
                { status: 400 }
            );
        }

        // Validar longitud mínima del mensaje
        if (data.message.length < 10) {
            return NextResponse.json(
                { error: "El mensaje debe tener al menos 10 caracteres" },
                { status: 400 }
            );
        }

        // Aquí podrías integrar con:
        // - SendGrid, Resend, Nodemailer para emails
        // - Base de datos para guardar los mensajes
        // - Slack/Discord webhooks para notificaciones

        // Por ahora, simulamos el procesamiento
        console.log("[CONTACT] Nuevo mensaje recibido:", {
            name: data.name,
            email: data.email,
            message: data.message.substring(0, 100) + "...",
            timestamp: new Date().toISOString(),
        });

        // Simular delay de procesamiento
        await new Promise((resolve) => setTimeout(resolve, 500));

        return NextResponse.json(
            {
                success: true,
                message: "Mensaje enviado correctamente",
                timestamp: new Date().toISOString()
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("[CONTACT] Error procesando mensaje:", error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
