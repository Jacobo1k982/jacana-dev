// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        // allow image to be undefined or null depending on your data
        image?: string | null;
    }

    interface Session {
        user?: User;
    }
}