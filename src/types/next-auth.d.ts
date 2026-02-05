// src/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
    interface User {
        avatar?: string | null;
    }
    // optionally ensure Session.user includes this User shape
    interface Session {
        user?: User;
    }
}