import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth';

// ============================================
// SESSION CHECK HANDLER
// ============================================

export async function GET(request: NextRequest) {
    try {
        // Get token from Authorization header
        const authHeader = request.headers.get('authorization');
        const token = authHeader?.replace('Bearer ', '');

        if (!token) {
            return NextResponse.json(
                { success: false, authenticated: false, user: null },
                { status: 401 }
            );
        }

        // Verify JWT token
        const payload = verifyToken(token);

        if (!payload?.userId) {
            return NextResponse.json(
                { success: false, authenticated: false, user: null },
                { status: 401 }
            );
        }

        // Find user
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
            },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, authenticated: false, user: null },
                { status: 401 }
            );
        }

        // Check if user is active
        if (!user.isActive) {
            return NextResponse.json(
                { success: false, authenticated: false, user: null, error: 'Cuenta desactivada' },
                { status: 403 }
            );
        }

        return NextResponse.json({
            success: true,
            authenticated: true,
            user: {
                ...user,
                createdAt: user.createdAt.toISOString(),
                emailVerified: user.emailVerified?.toISOString() || null,
            },
        });
    } catch (error) {
        console.error('Session check error:', error);
        return NextResponse.json(
            { success: false, authenticated: false, user: null },
            { status: 500 }
        );
    }
}
