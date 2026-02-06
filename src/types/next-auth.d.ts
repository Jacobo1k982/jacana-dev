// src/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
    interface User {
        image?: string | null;
    }

    interface Session {
        user?: User;
    }
}