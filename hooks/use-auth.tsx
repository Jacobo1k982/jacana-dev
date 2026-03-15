"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface User {
    id: string;
    name?: string;
    email?: string;
    image?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default auth state for SSR/SSG compatibility
const defaultAuthState: AuthContextType = {
    user: null,
    loading: true,
    login: async () => {
        console.warn("Auth not available during SSR");
    },
    logout: async () => {
        console.warn("Auth not available during SSR");
    },
    register: async () => {
        console.warn("Auth not available during SSR");
    },
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular verificación de sesión existente
        const checkAuth = async () => {
            try {
                const savedUser = localStorage.getItem("user");
                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error("Error checking auth:", error);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            // Simular login - en producción esto sería una llamada a API
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const newUser = {
                id: "1",
                name: email.split("@")[0],
                email,
                image: "/perfil.png",
            };
            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            setUser(null);
            localStorage.removeItem("user");
        } catch (error) {
            console.error("Logout error:", error);
        } finally {
            setLoading(false);
        }
    };

    const register = async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                image: "/perfil.png",
            };
            setUser(newUser);
            localStorage.setItem("user", JSON.stringify(newUser));
        } catch (error) {
            console.error("Register error:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    // During SSR/SSG, return default value instead of throwing
    if (context === undefined) {
        return defaultAuthState;
    }

    return context;
}
