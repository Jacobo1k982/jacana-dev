import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function extractBearer(req: NextRequest): string | null {
    const header = req.headers.get('authorization') ?? '';
    if (!header.startsWith('Bearer ')) return null;
    const token = header.slice(7).trim();
    return token.length > 0 ? token : null;
}

function serializeUser(user: {
    id: string;
    email: string;
    name: string | null;
    username: string | null;
    avatar: string | null;
    bio: string | null;
    role: string;
    emailVerified: Date | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}) {
    return {
        ...user,
        emailVerified: user.emailVerified?.toISOString() ?? null,
        createdAt: user.createdAt.toISOString(),
        updatedAt: user.updatedAt.toISOString(),
    };
}

// ─────────────────────────────────────────────
// HANDLER
// ─────────────────────────────────────────────

export async function GET(request: NextRequest) {
    // ── 1. Extract & parse token ──────────────
    const rawToken = extractBearer(request);

    if (!rawToken) {
        return NextResponse.json(
            { success: false, error: 'No autorizado' },
            { status: 401 }
        );
    }

    // ── 2. Verify JWT ─────────────────────────
    let payload: { userId: string } | null = null;
    try {
        payload = verifyToken(rawToken) as { userId: string } | null;
    } catch {
        // Expired or malformed token
        return NextResponse.json(
            { success: false, error: 'Token inválido o expirado' },
            { status: 401 }
        );
    }

    if (!payload?.userId) {
        return NextResponse.json(
            { success: false, error: 'Token inválido' },
            { status: 401 }
        );
    }

    // ── 3. Validate session exists in DB ──────
    // Ensures tokens that have been explicitly logged out are rejected,
    // even if the JWT itself hasn't expired yet.
    const session = await db.session.findFirst({
        where: {
            userId: payload.userId,
            token: rawToken,
            expiresAt: { gt: new Date() },
        },
        select: { id: true },
    });

    if (!session) {
        return NextResponse.json(
            { success: false, error: 'Sesión inválida o expirada' },
            { status: 401 }
        );
    }

    // ── 4. Fetch user ─────────────────────────
    const user = await db.user.findUnique({
        where: { id: payload.userId },
        select: {
            id: true,
            email: true,
            name: true,
            username: true,
            avatar: true,
            bio: true,
            role: true,
            emailVerified: true,
            isActive: true,
            createdAt: true,
            updatedAt: true,
        },
    });

    if (!user) {
        return NextResponse.json(
            { success: false, error: 'Usuario no encontrado' },
            { status: 404 }
        );
    }

    // ── 5. Guard — inactive account ───────────
    if (!user.isActive) {
        return NextResponse.json(
            { success: false, error: 'Tu cuenta ha sido desactivada' },
            { status: 403 }
        );
    }

    // ── 6. Respond ────────────────────────────
    return NextResponse.json(
        { success: true, user: serializeUser(user) },
        { status: 200 }
    );
}