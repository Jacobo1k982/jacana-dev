import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import {
    hashPassword,
    validateEmail,
    validatePassword,
    validateUsername,
    validateName,
    generateToken,
    generateRandomToken,
    generateSessionExpiry,
} from '@/lib/auth';
import { z } from 'zod';

// ============================================
// VALIDATION SCHEMA
// ============================================

const registerSchema = z.object({
    email: z.string().email('Email inválido'),
    password: z.string().min(1, 'La contraseña es requerida'),
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').optional(),
    username: z.string().min(3, 'El username debe tener al menos 3 caracteres').optional(),
});

// ============================================
// REGISTER HANDLER
// ============================================

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input schema
        const validationResult = registerSchema.safeParse(body);
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

        const { email, password, name, username } = validationResult.data;

        // Validate email
        if (!validateEmail(email)) {
            return NextResponse.json(
                { success: false, error: 'Formato de email inválido' },
                { status: 400 }
            );
        }

        // Validate password strength
        const passwordValidation = validatePassword(password);
        if (!passwordValidation.valid) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Contraseña insegura',
                    details: { password: passwordValidation.errors },
                },
                { status: 400 }
            );
        }

        // Validate name if provided
        if (name) {
            const nameValidation = validateName(name);
            if (!nameValidation.valid) {
                return NextResponse.json(
                    { success: false, error: nameValidation.error },
                    { status: 400 }
                );
            }
        }

        // Validate username if provided
        if (username) {
            const usernameValidation = validateUsername(username);
            if (!usernameValidation.valid) {
                return NextResponse.json(
                    { success: false, error: usernameValidation.error },
                    { status: 400 }
                );
            }
        }

        // Check if user already exists
        const existingUser = await db.user.findUnique({
            where: { email: email.toLowerCase() },
        });

        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'Ya existe una cuenta con este email' },
                { status: 409 }
            );
        }

        // Check if username is taken
        if (username) {
            const existingUsername = await db.user.findUnique({
                where: { username: username.toLowerCase() },
            });

            if (existingUsername) {
                return NextResponse.json(
                    { success: false, error: 'Este username ya está en uso' },
                    { status: 409 }
                );
            }
        }

        // Hash password
        const hashedPassword = await hashPassword(password);

        // Create user in transaction
        const user = await db.$transaction(async (tx) => {
            const newUser = await tx.user.create({
                data: {
                    email: email.toLowerCase(),
                    password: hashedPassword,
                    name: name || null,
                    username: username ? username.toLowerCase() : null,
                    role: 'USER',
                    isActive: true,
                },
            });

            // Create session
            const sessionToken = generateRandomToken();
            await tx.session.create({
                data: {
                    userId: newUser.id,
                    token: sessionToken,
                    expiresAt: generateSessionExpiry(7),
                },
            });

            // Generate JWT
            const jwtToken = generateToken({
                userId: newUser.id,
                email: newUser.email,
                role: newUser.role,
            });

            return { user: newUser, token: jwtToken };
        });

        // Return user without password
        const { password: _, ...userWithoutPassword } = user.user;

        return NextResponse.json(
            {
                success: true,
                message: 'Cuenta creada exitosamente',
                user: userWithoutPassword,
                token: user.token,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { success: false, error: 'Error interno del servidor' },
            { status: 500 }
        );
    }
}
