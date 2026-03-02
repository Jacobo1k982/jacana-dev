// src/app/servicios/page.tsx
import FullStackServices from "@/components/page/FullStackServices";
import { Layers, Terminal } from "lucide-react";

export default function ServiciosPage() {
    return (
        <main className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">

            {/* Fondos Ambiente */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#8b949e 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="fixed top-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[150px] rounded-full" />
            <div className="fixed bottom-0 right-0 w-1/2 h-1/2 bg-purple-500/5 blur-[150px] rounded-full" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">

                {/* Encabezado Estilo GitHub/Futurista */}
                <header className="mb-12 border-b border-[#30363d] pb-8">
                    <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-4 font-mono">
                        <span className="text-[#30363d]">~</span>
                        <span className="text-[#30363d]">/</span>
                        <span className="text-white font-medium flex items-center gap-1.5">
                            <Layers className="w-4 h-4 text-[#a371f7]" />
                            system-modules
                        </span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mb-4">
                        Servicios <span className="text-[#a371f7]">&</span> Capacidades
                    </h1>

                    <p className="text-lg text-[#8b949e] max-w-2xl leading-relaxed">
                        Diseño, construyo y despliego aplicaciones completas. Desde la arquitectura inicial hasta el despliegue final.
                    </p>
                </header>

                {/* Componente de Servicios (Grid Asimétrico y Animado) */}
                <FullStackServices />

            </div>
        </main>
    );
}