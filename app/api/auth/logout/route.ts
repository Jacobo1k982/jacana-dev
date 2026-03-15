import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// ============================================
// LOGOUT HANDLER
// ============================================

export async function POST(request: NextRequest) {
    try {
        // Get token from Authorization header
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (token) {
            // Verify token and get user ID
            const payload = verifyToken(token);

            if (payload?.userId) {
                // Delete all sessions for this user (optional: only delete current session)
                await db.session.deleteMany({
                    where: { userId: payload.userId },
                }).catch(() => {
                    // Ignore errors if session doesn't exist
                });
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Sesión cerrada exitosamente',
        });
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { success: false, error: 'Error al cerrar sesión' },
            { status: 500 }
        );
    }
}
