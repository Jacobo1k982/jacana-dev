// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        avatar?: string;
    }

    // If you want Session.user to include it as well
    interface Session {
        user?: User;
    }
}