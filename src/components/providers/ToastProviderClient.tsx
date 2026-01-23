"use client";

import { ToastProvider } from "@/hooks/use-toast";

export default function ToastProviderClient({
    children,
}: {
    children: React.ReactNode;
}) {
    return <ToastProvider>{children}</ToastProvider>;
}
