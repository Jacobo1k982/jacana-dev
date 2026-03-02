import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message } = body;

        // Validación básica
        if (!name || !email || !message) {
            return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
        }

        // Guardar en la base de datos
        const newMessage = await prisma.contactMessage.create({
            data: { name, email, message },
        });

        return NextResponse.json({ success: true, data: newMessage }, { status: 201 });
    } catch (error) {
        console.error("Error en API Contact:", error);
        return NextResponse.json({ error: "Error interno" }, { status: 500 });
    }
}