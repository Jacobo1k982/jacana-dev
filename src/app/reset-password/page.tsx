// app/reset-password/page.tsx
import { Suspense } from "react";
import ResetPasswordClient from "./ResetPasswordClient";

// Componente de carga simple (opcional, pero buena práctica)
function ResetPasswordFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d1117]">
            <div className="text-[#8b949e]">Cargando formulario...</div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        // Suspense es necesario para useSearchParams en Next.js App Router
        <Suspense fallback={<ResetPasswordFallback />}>
            <ResetPasswordClient />
        </Suspense>
    );
}