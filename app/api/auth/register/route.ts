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

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const SESSION_DAYS = 7;

// ─────────────────────────────────────────────
// VALIDATION SCHEMA
// ─────────────────────────────────────────────

const registerSchema = z.object({
    email: z.string().email('Email inválido').max(254),
    password: z.string().min(1, 'La contraseña es requerida').max(128),
    name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(100).optional(),
    username: z.string().min(3, 'El username debe tener al menos 3 caracteres').max(30).optional(),
});

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/** Collect all field-level validation errors before hitting the DB. */
function validateFields(data: {
    email: string;
    password: string;
    name?: string;
    username?: string;
}): Record<string, string[]> | null {
    const errors: Record<string, string[]> = {};

    if (!validateEmail(data.email)) {
        errors.email = ['Formato de email inválido'];
    }

    const pwValidation = validatePassword(data.password);
    if (!pwValidation.valid) {
        errors.password = pwValidation.errors;
    }

    if (data.name) {
        const nameValidation = validateName(data.name);
        if (!nameValidation.valid) {
            errors.name = [nameValidation.error ?? 'Nombre inválido'];
        }
    }

    if (data.username) {
        const usernameValidation = validateUsername(data.username);
        if (!usernameValidation.valid) {
            errors.username = [usernameValidation.error ?? 'Username inválido'];
        }
    }

    return Object.keys(errors).length > 0 ? errors : null;
}

// ─────────────────────────────────────────────
// HANDLER
// ─────────────────────────────────────────────

export async function POST(request: NextRequest) {
    // ── 1. Parse body ─────────────────────────
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { success: false, error: 'Cuerpo de solicitud inválido' },
            { status: 400 }
        );
    }

    // ── 2. Schema validation ──────────────────
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json(
            {
                success: false,
                error: 'Datos inválidos',
                details: parsed.error.flatten().fieldErrors,
            },
            { status: 400 }
        );
    }

    const { email, password, name, username } = parsed.data;

    // ── 3. Business rule validation ───────────
    // Run all field validators in one pass — return every error at once
    // so the client can fix all problems before re-submitting.
    const fieldErrors = validateFields({ email, password, name, username });
    if (fieldErrors) {
        return NextResponse.json(
            { success: false, error: 'Datos inválidos', details: fieldErrors },
            { status: 400 }
        );
    }

    // ── 4. Uniqueness checks (parallel) ───────
    // Run both DB lookups concurrently to reduce round-trips.
    const normalizedEmail = email.toLowerCase();
    const normalizedUsername = username?.toLowerCase() ?? null;

    const [existingEmail, existingUsername] = await Promise.all([
        db.user.findUnique({
            where: { email: normalizedEmail },
            select: { id: true },
        }),
        normalizedUsername
            ? db.user.findUnique({
                where: { username: normalizedUsername },
                select: { id: true },
            })
            : Promise.resolve(null),
    ]);

    // Return both conflicts at once if present
    const conflictErrors: Record<string, string[]> = {};
    if (existingEmail) conflictErrors.email = ['Ya existe una cuenta con este email'];
    if (existingUsername) conflictErrors.username = ['Este username ya está en uso'];

    if (Object.keys(conflictErrors).length > 0) {
        return NextResponse.json(
            { success: false, error: 'Datos en conflicto', details: conflictErrors },
            { status: 409 }
        );
    }

    // ── 5. Hash password ──────────────────────
    // Done before the transaction to keep tx duration minimal.
    const hashedPassword = await hashPassword(password);

    // ── 6. Create user + session (transaction) ─
    const { safeUser, token } = await db.$transaction(async (tx: typeof db) => {
        const newUser = await tx.user.create({
            data: {
                email: normalizedEmail,
                password: hashedPassword,
                name: name ?? null,
                username: normalizedUsername,
                role: 'USER',
                isActive: true,
            },
            // Select only what we need — never pull the hashed password out
            select: {
                id: true,
                email: true,
                name: true,
                username: true,
                avatar: true,
                role: true,
                emailVerified: true,
                isActive: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        await tx.session.create({
            data: {
                userId: newUser.id,
                token: generateRandomToken(),
                expiresAt: generateSessionExpiry(SESSION_DAYS),
            },
        });

        return {
            safeUser: newUser,
            token: generateToken({
                userId: newUser.id,
                email: newUser.email,
                role: newUser.role,
            }),
        };
    });

    // ── 7. Respond ────────────────────────────
    return NextResponse.json(
        {
            success: true,
            message: 'Cuenta creada exitosamente',
            user: safeUser,
            token,
        },
        { status: 201 }
    );
}