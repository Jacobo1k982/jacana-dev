import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

/** Extracts the raw JWT from the Authorization header, if present. */
function extractBearer(req: NextRequest): string | null {
    const header = req.headers.get('authorization') ?? '';
    if (!header.startsWith('Bearer ')) return null;
    const token = header.slice(7).trim();
    return token.length > 0 ? token : null;
}

// ─────────────────────────────────────────────
// HANDLER
// ─────────────────────────────────────────────

export async function POST(request: NextRequest) {
    // ── 1. Extract token ──────────────────────
    const rawToken = extractBearer(request);

    // Logout is always "successful" from the client's perspective —
    // we never reveal whether the token was valid or which session existed.
    if (!rawToken) {
        return loggedOutResponse();
    }

    // ── 2. Verify JWT ─────────────────────────
    let payload: { userId: string } | null = null;
    try {
        payload = verifyToken(rawToken) as { userId: string } | null;
    } catch {
        // Expired or malformed token — still proceed to clear any sessions
        // that may exist for this token in the DB (best-effort).
    }

    // ── 3. Invalidate session ─────────────────
    if (payload?.userId) {
        try {
            // Delete only the session tied to this specific token, not all
            // sessions for the user (preserves other devices/tabs).
            await db.session.deleteMany({
                where: {
                    userId: payload.userId,
                    token: rawToken,
                },
            });
        } catch (dbError) {
            // Log but don't surface — the client should clear its token
            // regardless of whether the DB call succeeded.
            console.error('[logout] session delete failed:', dbError);
        }
    }

    // ── 4. Respond ────────────────────────────
    return loggedOutResponse();
}

// ─────────────────────────────────────────────
// SHARED RESPONSE
// ─────────────────────────────────────────────

/** Always returns 200 — prevents enumeration of valid tokens. */
function loggedOutResponse() {
    return NextResponse.json(
        { success: true, message: 'Sesión cerrada exitosamente' },
        { status: 200 }
    );
}