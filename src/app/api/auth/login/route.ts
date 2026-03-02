// src/app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createToken } from "@/lib/auth/jwt";
import { z } from "zod";
import { NextRequest } from "next/server";

// ============================================
// Configuración y Validación de Entorno
// ============================================
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    // Nota: En producción es mejor que esto falle rápido si falta el secret
    // console.error("[FATAL] JWT_SECRET no está definido."); 
    // throw new Error("JWT_SECRET no está definido en las variables de entorno.");
}

// ============================================
// Esquema de Validación (Zod)
// ============================================
const loginSchema = z.object({
    email: z.string().email({ message: "Formato de correo inválido" }),
    password: z.string().min(1, { message: "La contraseña es obligatoria" }),
});

// ============================================
// Handler POST
// ============================================
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // 1. Validación de entrada
        const parsed = loginSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                {
                    error: "Datos de entrada inválidos",
                    details: parsed.error.flatten()
                },
                { status: 400 }
            );
        }

        const { email, password } = parsed.data;

        // 2. Búsqueda de usuario
        const user = await db.user.findUnique({
            where: { email },
        });

        // 3. Seguridad: Prevención de Timing Attacks
        // Si el usuario no existe, hasheamos una contraseña ficticia para igualar tiempos.
        const hashedPasswordToCompare = user?.password ?? "$2a$10$dummyhashtopreventtimingattacks";

        const isValid = await verifyPassword(password, hashedPasswordToCompare);

        // Si no hay usuario o la contraseña es inválida (mensaje genérico por seguridad)
        if (!user || !isValid) {
            return NextResponse.json(
                { error: "Credenciales inválidas" },
                { status: 401 }
            );
        }

        // 4. Generación de Token
        const token = createToken({
            userId: user.id,
            email: user.email,
        });

        const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 días

        // 5. Creación de Sesión en Base de Datos
        await db.session.create({
            data: {
                userId: user.id,
                sessionToken: token,
                expires,
            },
        });

        // 6. Construcción de Respuesta Segura
        // CORRECCIÓN: Eliminada la propiedad 'image' que no existe en tu schema
        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            // image: user.image, // <--- ELIMINADO
        };

        const response = NextResponse.json(
            { user: safeUser, message: "Inicio de sesión exitoso" },
            { status: 200 }
        );

        // 7. Cookie HTTPOnly
        response.cookies.set("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires,
            path: "/",
        });

        return response;

    } catch (error) {
        console.error("[LOGIN_ERROR]", error);

        // Manejo de errores interno sin exponer detalles al cliente
        return NextResponse.json(
            { error: "Error interno del servidor. Inténtelo más tarde." },
            { status: 500 }
        );
    }
}