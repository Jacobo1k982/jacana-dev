import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyPassword, generateToken, generateRandomToken, generateSessionExpiry } from '@/lib/auth';
import { z } from 'zod';

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const MAX_ATTEMPTS = 5;          // failed attempts before lockout
const WINDOW_MS = 15 * 60 * 1000; // 15 min sliding window
const LOCKOUT_MS = 15 * 60 * 1000; // 15 min lockout
const SESSION_DAYS = { normal: 7, rememberMe: 30 };

// In-memory store — swap for Redis in production
const attemptStore = new Map<string, { count: number; firstAttempt: number; lockedUntil?: number }>();

// ─────────────────────────────────────────────
// VALIDATION
// ─────────────────────────────────────────────

const loginSchema = z.object({
    email: z.string().email('Email inválido').max(254),
    password: z.string().min(1, 'La contraseña es requerida').max(128),
    rememberMe: z.boolean().optional().default(false),
});

// ─────────────────────────────────────────────
// RATE LIMITING
// ─────────────────────────────────────────────

function getRateLimitKey(req: NextRequest, email: string): string {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        ?? req.headers.get('x-real-ip')
        ?? 'unknown';
    // Key combines IP + email so neither alone can exhaust the other's budget
    return `${ip}::${email.toLowerCase()}`;
}

type RateLimitResult =
    | { allowed: true }
    | { allowed: false; retryAfterMs: number };

function checkRateLimit(key: string): RateLimitResult {
    const now = Date.now();
    const entry = attemptStore.get(key);

    // Still locked out
    if (entry?.lockedUntil && now < entry.lockedUntil) {
        return { allowed: false, retryAfterMs: entry.lockedUntil - now };
    }

    // Window expired — reset
    if (!entry || now - entry.firstAttempt > WINDOW_MS) {
        attemptStore.set(key, { count: 1, firstAttempt: now });
        return { allowed: true };
    }

    // Within window and under limit
    if (entry.count < MAX_ATTEMPTS) {
        entry.count++;
        return { allowed: true };
    }

    // Limit exceeded — apply lockout
    entry.lockedUntil = now + LOCKOUT_MS;
    return { allowed: false, retryAfterMs: LOCKOUT_MS };
}

function resetRateLimit(key: string): void {
    attemptStore.delete(key);
}

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/** Uniform error response — never reveals whether email exists */
function unauthorizedResponse() {
    return NextResponse.json(
        { success: false, error: 'Credenciales inválidas' },
        { status: 401 }
    );
}

function rateLimitResponse(retryAfterMs: number) {
    const retryAfterSec = Math.ceil(retryAfterMs / 1000);
    return NextResponse.json(
        {
            success: false,
            error: `Demasiados intentos fallidos. Intenta de nuevo en ${Math.ceil(retryAfterSec / 60)} minutos.`,
        },
        {
            status: 429,
            headers: { 'Retry-After': String(retryAfterSec) },
        }
    );
}

// ─────────────────────────────────────────────
// HANDLER
// ─────────────────────────────────────────────

export async function POST(request: NextRequest) {
    // ── 1. Parse & validate body ──────────────
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { success: false, error: 'Cuerpo de solicitud inválido' },
            { status: 400 }
        );
    }

    const parsed = loginSchema.safeParse(body);
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

    const { email, password, rememberMe } = parsed.data;

    // ── 2. Rate limiting ──────────────────────
    const rateLimitKey = getRateLimitKey(request, email);
    const rateLimit = checkRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
        return rateLimitResponse(rateLimit.retryAfterMs);
    }

    // ── 3. Lookup user ────────────────────────
    const user = await db.user.findUnique({
        where: { email: email.toLowerCase() },
        select: {
            id: true,
            email: true,
            name: true,
            username: true,
            avatar: true,
            role: true,
            isActive: true,
            password: true,
            createdAt: true,
        },
    });

    // User not found — still run verifyPassword to prevent timing attacks
    if (!user) {
        await verifyPassword(password, '$2b$12$dummyhashtopreventtimingattacks00000000000000000000000');
        return unauthorizedResponse();
    }

    // ── 4. Account status ─────────────────────
    if (!user.isActive) {
        return NextResponse.json(
            { success: false, error: 'Tu cuenta ha sido desactivada. Contacta con soporte.' },
            { status: 403 }
        );
    }

    // ── 5. Verify password ────────────────────
    const isValidPassword = await verifyPassword(password, user.password);

    if (!isValidPassword) {
        return unauthorizedResponse();
    }

    // ── 6. Password OK — reset rate limit ─────
    resetRateLimit(rateLimitKey);

    // ── 7. Create session + JWT (transaction) ─
    const expiryDays = rememberMe ? SESSION_DAYS.rememberMe : SESSION_DAYS.normal;

    const { token } = await db.$transaction(async (tx: typeof db) => {
        // Purge expired sessions for this user
        await tx.session.deleteMany({
            where: {
                userId: user.id,
                expiresAt: { lt: new Date() },
            },
        });

        // New session
        await tx.session.create({
            data: {
                userId: user.id,
                token: generateRandomToken(),
                expiresAt: generateSessionExpiry(expiryDays),
            },
        });

        // JWT
        return {
            token: generateToken({
                userId: user.id,
                email: user.email,
                role: user.role,
            }),
        };
    });

    // ── 8. Return — strip password ────────────
    const { password: _pw, ...safeUser } = user;

    return NextResponse.json(
        {
            success: true,
            message: 'Sesión iniciada exitosamente',
            user: safeUser,
            token,
        },
        { status: 200 }
    );
}