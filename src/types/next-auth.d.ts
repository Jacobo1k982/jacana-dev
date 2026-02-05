// src/types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface User {
        // add any custom user fields you use
        avatar?: string | null;
    }

    interface Session {
        user: {
            // keep standard fields and add avatar
            avatar?: string | null;
        } & DefaultSession["user"];
    }
}