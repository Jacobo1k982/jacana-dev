// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
    interface User {
        // add image as optional — adjust type if you expect null
        image?: string | null;
    }
    // if you use Session.user, you may also extend Session if needed:
    // interface Session {
    //   user?: User;
    // }
}