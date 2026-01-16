import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { verifyToken } from '@/lib/auth/jwt';

export async function POST(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value;

        if (token) {
            // Delete session from database
            await db.session.deleteMany({
                where: { sessionToken: token },
            });
        }

        // Clear cookie
        const response = NextResponse.json(
            { message: 'Logged out successfully' },
            { status: 200 }
        );

        response.cookies.delete('auth-token');

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}