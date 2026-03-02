"use client";

import { Toaster } from "sonner";

export default function ToastProviderClient({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <Toaster position="top-right" richColors />
        </>
    );
}