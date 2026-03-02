// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { db } from "@/lib/db";
import { verifyToken } from "@/lib/auth/jwt";

// Validación de entorno (Solo para advertencia, no rompe el build)
if (!process.env.JWT_SECRET) {
    console.warn("[AUTH_WARN] JWT_SECRET no está definido en las variables de entorno.");
}

export async function GET(req: NextRequest) {
    try {
        // 1. Obtener token
        const token = req.cookies.get("auth-token")?.value;

        if (!token) {
            return NextResponse.json(
                { user: null, authenticated: false, message: "No autenticado" },
                { status: 401 }
            );
        }

        // 2. Verificar y decodificar token
        let payload;
        try {
            // Asegúrate que verifyToken maneja errores internos o usa try/catch aquí
            payload = verifyToken(token) as { userId: number; email: string };
        } catch (error) {
            console.warn("[AUTH_WARN] Token inválido:", error);
            const response = NextResponse.json(
                { user: null, authenticated: false, message: "Sesión expirada" },
                { status: 401 }
            );
            response.cookies.delete("auth-token");
            return response;
        }

        // 3. Buscar usuario en base de datos
        // NOTA: Eliminamos 'image' porque no existe en tu schema.prisma actual
        const user = await db.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                name: true,
                email: true,
                // image: true, // <--- ELIMINADO para solucionar el error de build
            },
        });

        if (!user) {
            return NextResponse.json(
                { user: null, authenticated: false, message: "Usuario no encontrado" },
                { status: 401 }
            );
        }

        // 4. Retornar respuesta exitosa
        return NextResponse.json(
            { user, authenticated: true },
            { status: 200 }
        );

    } catch (error) {
        console.error("[ME_ERROR]", error);
        return NextResponse.json(
            { user: null, authenticated: false, error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}