// src/app/precios/page.tsx (o la ruta correspondiente)

import PricingSection from "@/components/page/PricingSection";
import { Zap, Package, Rocket, ShieldCheck, ArrowRight, Check, Code2 } from "lucide-react";

export default function PricingPage() {
    return (
        <main className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">

            {/* 1. Fondo Ambiental (Grid Hexagonal sutil) */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#8b949e 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Glow Effects */}
            <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-[#00FF9D]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                {/* ========================================== */}
                {/* HEADER: ESTILO SYSTEM UPGRADE            */}
                {/* ========================================== */}
                <header className="mb-12 border-b border-[#30363d] pb-8">

                    {/* Ruta tipo breadcrumb (System Path) */}
                    <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-4 font-mono">
                        <span className="text-[#30363d]">~</span>
                        <span className="text-[#30363d]">/</span>
                        <span className="hover:text-[#00FF9D] cursor-pointer transition-colors">system</span>
                        <span className="text-[#30363d]">/</span>
                        <span className="text-white font-medium flex items-center gap-1.5">
                            <Package className="w-4 h-4 text-[#a371f7]" />
                            resource-plans
                        </span>
                        <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold rounded-full border border-[#a371f7] text-[#a371f7] bg-[#a371f7]/10 uppercase">
                            Plans
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                                Planes de Desarrollo
                                <span className="text-xs font-mono px-2 py-1 bg-[#238636]/20 text-[#3fb950] rounded border border-[#238636]/30">
                                    AVAILABLE
                                </span>
                            </h1>
                            <p className="text-[#8b949e] max-w-xl text-sm">
                                Selecciona el nivel de recursos y soporte adecuado para tu misión.
                                Infraestructura preparada para escalar.
                            </p>
                        </div>

                        {/* Status Indicator */}
                        <div className="flex items-center gap-4 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-md">
                            <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#3fb950]" />
                                <span>Pagos Seguros</span>
                            </div>
                            <div className="h-4 w-px bg-[#30363d]" />
                            <div className="flex items-center gap-1 text-xs text-[#58a6ff]">
                                <Zap size={12} />
                                <span>Activación Inmediata</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ========================================== */}
                {/* MAIN CONTENT WRAPPER                      */}
                {/* ========================================== */}
                <div className="relative">

                    {/* Decorative Terminal Lines */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 border-l-2 border-t-2 border-[#30363d] opacity-50 pointer-events-none" />
                    <div className="absolute -bottom-4 -right-4 w-8 h-8 border-r-2 border-b-2 border-[#30363d] opacity-50 pointer-events-none" />

                    {/* Pricing Section Container */}
                    <article className="relative bg-[#0d1117]/50 border border-[#30363d] rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">

                        {/* Header Bar */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363d] bg-[#161b22]/50">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9D]" />
                                </div>
                                <span className="text-xs text-[#8b949e] font-mono ml-2">pricing.module</span>
                            </div>

                            <div className="hidden sm:flex items-center gap-2 text-xs text-[#8b949e]">
                                <Code2 size={12} />
                                <span>version 2.0.0</span>
                            </div>
                        </div>

                        {/* Dynamic Pricing Content */}
                        <div className="p-6 sm:p-8 lg:p-12">
                            <PricingSection />
                        </div>

                        {/* Footer Info */}
                        <div className="px-6 py-4 border-t border-[#30363d] bg-[#161b22]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8b949e]">
                            <div className="flex items-center gap-2">
                                <Check className="w-3.5 h-3.5 text-[#3fb950]" />
                                <span>Garantía de satisfacción 100%</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="hover:text-white cursor-pointer transition-colors">Términos de Servicio</span>
                                <span className="text-[#30363d]">|</span>
                                <span className="hover:text-white cursor-pointer transition-colors">FAQ</span>
                            </div>
                        </div>
                    </article>
                </div>

                {/* Bottom CTA (Enterprise) */}
                <div className="mt-12 text-center">
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-lg border border-dashed border-[#30363d] bg-[#161b22]/30">
                        <div className="flex items-center gap-2 text-[#8b949e]">
                            <Rocket className="w-5 h-5 text-[#a371f7]" />
                            <span className="text-sm font-medium text-white">¿Necesitas una flota completa?</span>
                            <span className="text-sm hidden sm:inline">Planes Enterprise disponibles.</span>
                        </div>
                        <a
                            href="/contacto"
                            className="flex items-center gap-1 text-sm font-semibold text-[#a371f7] hover:text-[#8957e5] transition-colors group"
                        >
                            Contactar Ventas
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}