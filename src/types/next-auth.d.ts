// src/types/next-auth.d.ts
import "next-auth";

// Esta declaración "mezcla" (Augmentation) le dice a TypeScript que el objeto User de NextAuth
// tiene una propiedad opcional 'image'.
declare module "next-auth" {
    interface User {
        image?: string | null;
    }

    interface Session {
        user?: User;
    }
}