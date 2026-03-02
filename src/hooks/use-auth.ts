"use client";

import { useSession, signOut } from "next-auth/react";
import { useCallback } from "react";

export interface User {
  id: string;
  email: string;
  name: string | null;
  image?: string | null;
}

export function useAuth() {
  const { data: session, status } = useSession();

  const loading = status === "loading";
  const user: User | null = session?.user
    ? {
        id: session.user.id,
        email: session.user.email || "",
        name: session.user.name || null,
        image: session.user.image,
      }
    : null;

  const logout = useCallback(async () => {
    await signOut({ redirect: false });
  }, []);

  return { user, loading, logout };
}