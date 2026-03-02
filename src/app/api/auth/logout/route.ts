// src/app/api/auth/logout/route.ts
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: NextRequest) {
    try {
        // 1. Obtener el token de la cookie
        const token = request.cookies.get('auth-token')?.value;

        // 2. Invalidar sesión en la base de datos (si existe el token)
        if (token) {
            try {
                await db.session.deleteMany({
                    where: { sessionToken: token },
                });
            } catch (dbError) {
                // Si falla la DB, lo registramos pero no interrumpimos el flujo de logout local
                console.error("[LOGOUT_ERROR] No se pudo eliminar la sesión en BD:", dbError);
            }
        }

        // 3. Construir respuesta exitosa
        const response = NextResponse.json(
            {
                success: true,
                message: "Sesión cerrada correctamente"
            },
            { status: 200 }
        );

        // 4. Limpiar la cookie de forma segura
        // Sobrescribimos la cookie con una fecha de expiración en el pasado
        // Esto es más confiable que .delete() en algunos navegadores antiguos
        response.cookies.set('auth-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0), // Fecha en el pasado (1970)
            path: '/',
            sameSite: 'lax',
        });

        return response;

    } catch (error) {
        console.error("[LOGOUT_FATAL_ERROR]", error);

        return NextResponse.json(
            {
                success: false,
                error: "Error interno al cerrar sesión"
            },
            { status: 500 }
        );
    }
}