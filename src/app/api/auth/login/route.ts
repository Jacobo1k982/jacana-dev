import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { verifyPassword } from "@/lib/auth/password"
import { createToken } from "@/lib/auth/jwt"
import { z } from "zod"

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
})

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined. Set it in your environment variables.');
  }
  return secret;
}

export async function POST(req:
 const jwtSecret = getJwtSecret();
NextRequest) {
    try {
        const body = await req.json()
        const parsed = loginSchema.safeParse(body)

        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten() },
                { status: 400 }
            )
        }

        const { email, password } = parsed.data

        const user = await db.user.findUnique({
            where: { email },
        })

        if (!user) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            )
        }

        const isValid = await verifyPassword(
            password,
            user.password
        )

        if (!isValid) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 401 }
            )
        }

        const token = createToken({
            userId: user.id,
            email: user.email,
        })

        const expires = new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
        )

        await db.session.create({
            data: {
                userId: user.id,
                sessionToken: token,
                expires,
            },
        })

        const response = NextResponse.json(
            {
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 200 }
        )

        response.cookies.set("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            expires,
            path: "/",
        })

        return response
    } catch (error) {
        console.error("LOGIN ERROR:", error)
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        )
    }
}
