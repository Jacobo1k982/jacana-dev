import { useEffect, useState } from "react";

export interface User {
    id: string;
    email: string;
    name: string | null;
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch("/api/auth/me");
                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                console.error("Failed to fetch user:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, []);

    const logout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            setUser(null);
        } catch (error) {
            console.error("Failed to logout:", error);
        }
    };

    return { user, loading, logout };
}
