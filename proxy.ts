// proxy.ts
import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { pathname } = req.nextUrl

    const isPrivate = pathname.startsWith("/dashboard") ||
        pathname.startsWith("/profile") ||
        pathname.startsWith("/settings")

    const isAuthRoute = pathname.startsWith("/login") ||
        pathname.startsWith("/register")

    if (isPrivate && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.url))
    }

    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    }
})

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}