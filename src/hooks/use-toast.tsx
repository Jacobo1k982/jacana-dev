"use client";

import * as React from "react";

type Toast = {
    id: string;
    title?: string;
    description?: string;
};

type ToastContextType = {
    toast: (toast: Omit<Toast, "id">) => void;
};

const ToastContext = React.createContext<ToastContextType | undefined>(
    undefined
);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = React.useState<Toast[]>([]);

    const toast = React.useCallback((toast: Omit<Toast, "id">) => {
        setToasts((prev) => [
            ...prev,
            { ...toast, id: crypto.randomUUID() },
        ]);
    }, []);

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            {/* UI de toast aquí si luego la agregas */}
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
