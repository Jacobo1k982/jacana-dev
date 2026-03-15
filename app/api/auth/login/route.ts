import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, generateToken, generateRandomToken, generateSessionExpiry } from '@/lib/auth';
import { z } from 'zod';

// ============================================
// VALIDATION SCHEMA
// ============================================

const loginSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'La contraseña es requerida'),
    rememberMe: z.boolean().optional(),
});

// ============================================
// LOGIN HANDLER
// ============================================

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validationResult = loginSchema.safeParse(body);
        if (!validationResult.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Datos inválidos',
                    details: validationResult.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const { email, password, rememberMe } = validationResult.data;

        // Find user
        const user = await db.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Credenciales inválidas' },
                { status: 401 }
            );
        }

        // Check if user is active
        if (!user.isActive) {
            return NextResponse.json(
                { success: false, error: 'Tu cuenta ha sido desactivada' },
                { status: 403 }
            );
        }

        // Verify password
        const isValidPassword = await verifyPassword(password, user.password);

        if (!isValidPassword) {
            return NextResponse.json(
                { success: false, error: 'Credenciales inválidas' },
                { status: 401 }
            );
        }

        // Create session and JWT in transaction
        const result = await db.$transaction(async (tx) => {
            // Clean up old sessions for this user (optional: keep only recent sessions)
            await tx.session.deleteMany({
                where: {
                    userId: user.id,
                    expiresAt: { lt: new Date() },
                },
            });

            // Create new session
            const sessionToken = generateRandomToken();
            const expiryDays = rememberMe ? 30 : 7;

            await tx.session.create({
                data: {
                    userId: user.id,
                    token: sessionToken,
                    expiresAt: generateSessionExpiry(expiryDays),
                },
            });

            // Generate JWT
            const jwtToken = generateToken({
                userId: user.id,
                email: user.email,
                role: user.role,
            });

            return { token: jwtToken };
        });

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;

        return NextResponse.json({
            success: true,
            message: 'Sesión iniciada exitosamente',
            user: userWithoutPassword,
            token: result.token,
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
