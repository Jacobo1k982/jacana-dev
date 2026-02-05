// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        avatar?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        avatar?: string;
    }
}