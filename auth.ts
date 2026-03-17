// auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import type { Adapter, AdapterUser, AdapterSession } from "@auth/core/adapters"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"  // ← importa desde lib

function CustomPrismaAdapter(p: typeof prisma): Adapter {
    const base = PrismaAdapter(p)
    return {
        ...base,
        async createSession({ sessionToken, userId, expires }) {
            return p.session.create({
                data: {
                    sessionToken,
                    token: sessionToken,
                    userId,
                    expires,
                    expiresAt: expires,
                },
            }) as unknown as AdapterSession
        },
        async getSessionAndUser(sessionToken) {
            const result = await p.session.findUnique({
                where: { sessionToken },
                include: { user: true },
            })
            if (!result) return null
            const { user, ...session } = result
            return { session: session as unknown as AdapterSession, user: user as unknown as AdapterUser }
        },
        async linkAccount(account) {
            await p.account.create({
                data: {
                    ...account,
                    providerAccountId: account.providerAccountId,
                    providerId: account.providerAccountId,
                    expires_at: account.expires_at ?? null,
                },
            })
        },
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: CustomPrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        Google,
        GitHub,
        Credentials({
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string }
                const user = await prisma.user.findUnique({ where: { email } })
                if (!user || !user.password) return null
                const valid = await bcrypt.compare(password, user.password)
                return valid ? user : null
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = (user as any).role ?? "USER"
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
            }
            return session
        },
    },
    pages: { signIn: "/login" },
})