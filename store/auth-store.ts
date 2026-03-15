'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// ============================================
// TYPES
// ============================================

export interface User {
    id: string;
    email: string;
    name: string | null;
    username: string | null;
    avatar: string | null;
    bio: string | null;
    role: 'USER' | 'ADMIN' | 'MODERATOR';
    emailVerified: string | null;
    isActive: boolean;
    createdAt: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setLoading: (loading: boolean) => void;
    login: (user: User, token: string) => void;
    logout: () => void;
    updateUser: (data: Partial<User>) => void;
    reset: () => void;
}

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
};

// ============================================
// STORE
// ============================================

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            ...initialState,

            setUser: (user) => set({ user, isAuthenticated: !!user }),
            setToken: (token) => set({ token }),
            setLoading: (isLoading) => set({ isLoading }),

            login: (user, token) => set({
                user,
                token,
                isAuthenticated: true,
                isLoading: false,
            }),

            logout: () => set({
                ...initialState,
                isLoading: false,
            }),

            updateUser: (data) => set((state) => ({
                user: state.user ? { ...state.user, ...data } : null,
            })),

            reset: () => set(initialState),
        }),
        {
            name: 'jacana-auth',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.setLoading(false);
                }
            },
        }
    )
);

// ============================================
// SELECTORS
// ============================================

export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated);
export const useIsLoading = () => useAuthStore((state) => state.isLoading);
export const useToken = () => useAuthStore((state) => state.token);