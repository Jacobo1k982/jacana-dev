// src/types/next-auth.d.ts
import "next-auth";

declare module "next-auth" {
    /**
     * Extensión de la interfaz User para TypeScript.
     * Esto corrige el error: "La propiedad 'image' no existe en el tipo 'User'".
     */
    interface User {
        image?: string | null;
        // Si tu código usa 'avatar' en lugar de 'image', descomenta la siguiente línea:
        // avatar?: string | null;
    }

    interface Session {
        user: User;
    }
}