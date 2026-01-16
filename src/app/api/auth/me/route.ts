import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '../../../../lib/auth/jwt';

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json(
                { user: null },
                { status: 200 }
            );
        }

        // Verify token
        const payload = await verifyToken(token);

        if (!payload) {
            return NextResponse.json(
                { user: null },
                { status: 200 }
            );
        }

        // Get user from database
        const user = await db.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                email: true,
                name: true,
                emailVerified: true,
                createdAt: true,
            },
        });

        if (!user) {
            return NextResponse.json(
                { user: null },
                { status: 200 }
            );
        }

        return NextResponse.json(
            { user },
            { status: 200 }
        );
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
