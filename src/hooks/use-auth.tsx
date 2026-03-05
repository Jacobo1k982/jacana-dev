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

const defaultAuthState: AuthContextType = {
    user: null,
    loading: true,
    login: async () => { },
    logout: async () => { },
    register: async () => { },
};

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        const newUser = { id: "1", name: email.split("@")[0], email, image: "/perfil.png" };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        setLoading(false);
    };

    const logout = async () => {
        setLoading(true);
        setUser(null);
        localStorage.removeItem("user");
        setLoading(false);
    };

    const register = async (name: string, email: string, password: string) => {
        setLoading(true);
        const newUser = { id: Date.now().toString(), name, email, image: "/perfil.png" };
        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
        setLoading(false);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (context === undefined) return defaultAuthState;
    return context;
}
