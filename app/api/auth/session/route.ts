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

/** Consistent unauthenticated response — never leaks why auth failed. */
function unauthResponse(status: 401 | 403 = 401) {
    return NextResponse.json(
        { success: false, authenticated: false, user: null },
        { status }
    );
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
}) {
    return {
        ...user,
        emailVerified: user.emailVerified?.toISOString() ?? null,
        createdAt: user.createdAt.toISOString(),
    };
}

// ─────────────────────────────────────────────
// HANDLER
// ─────────────────────────────────────────────

export async function GET(request: NextRequest) {
    // ── 1. Extract token ──────────────────────
    const rawToken = extractBearer(request);
    if (!rawToken) return unauthResponse();

    // ── 2. Verify JWT ─────────────────────────
    let payload: { userId: string } | null = null;
    try {
        payload = verifyToken(rawToken) as { userId: string } | null;
    } catch {
        // Expired or malformed — not authenticated
        return unauthResponse();
    }

    if (!payload?.userId) return unauthResponse();

    // ── 3. Validate session in DB ─────────────
    // Rejects tokens that were explicitly invalidated via logout,
    // even if the JWT signature is still valid.
    const [session, user] = await Promise.all([
        db.session.findFirst({
            where: {
                userId: payload.userId,
                token: rawToken,
                expiresAt: { gt: new Date() },
            },
            select: { id: true },
        }),
        db.user.findUnique({
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
            },
        }),
    ]);

    // ── 4. Guard checks ───────────────────────
    if (!session) return unauthResponse();
    if (!user) return unauthResponse();
    if (!user.isActive) return unauthResponse(403);

    // ── 5. Respond ────────────────────────────
    return NextResponse.json(
        { success: true, authenticated: true, user: serializeUser(user) },
        { status: 200 }
    );
}