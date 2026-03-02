"use client";

import LogoGlitch from "@/components/Logo/LogoGlitch";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-4">
            <LogoGlitch
                intensity="high"
                duration={5000}
                text="500 - CRITICAL FAILURE"
                subText="Error interno del servidor detectado"
            />

            <button
                onClick={reset}
                className="mt-8 px-6 py-3 border border-[#f85149] text-[#f85149] font-semibold rounded-lg hover:bg-[#f85149]/10 transition-all"
            >
                ↻ Reintentar Conexión
            </button>
        </div>
    );
}