// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        // add the properties you expect to be present
        id?: string;
        image?: string | null;
    }

    interface Session {
        user: User;
    }
}

export { };