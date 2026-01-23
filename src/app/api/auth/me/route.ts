import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyToken } from "@/lib/auth/jwt"

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("auth-token")?.value

        if (!token) {
            return NextResponse.json(
                { user: null },
                { status: 401 }
            )
        }

        const payload = verifyToken(token) as {
            userId: number
            email: string
        }

        const user = await db.user.findUnique({
            where: { id: payload.userId },
            select: {
                id: true,
                name: true,
                email: true,
            },
        })

        if (!user) {
            return NextResponse.json(
                { user: null },
                { status: 401 }
            )
        }

        return NextResponse.json({ user })
    } catch {
        return NextResponse.json(
            { user: null },
            { status: 401 }
        )
    }
}
