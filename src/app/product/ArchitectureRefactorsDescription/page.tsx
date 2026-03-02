// src/app/servicios/arquitectura/page.tsx (o la ruta correspondiente)

import ArchitectureRefactorsDescription from "@/components/page/ArchitectureRefactorsDescription";
import { GitBranch, Layers, Cpu, Code2, ArrowRight, CheckCircle, AlertTriangle, Network, Sparkles } from "lucide-react";

export default function ArchitectureRefactorsPage() {
    return (
        <main className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">

            {/* 1. Fondo Ambiental (Grid Hexagonal/Técnico) */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: 'radial-gradient(#8b949e 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Glow Effects (Tono púrpura/azulado para arquitectura) */}
            <div className="fixed top-0 left-1/3 w-[600px] h-[600px] bg-[#a371f7]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#58a6ff]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                {/* ========================================== */}
                {/* HEADER: ESTILO BLUEPRINT / SYSTEM DECOMP  */}
                {/* ========================================== */}
                <header className="mb-8 border-b border-[#30363d] pb-6">

                    {/* Ruta técnica (Namespace style) */}
                    <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-4 font-mono bg-[#161b22] px-3 py-2 rounded-md border border-[#30363d] w-fit">
                        <Layers className="w-3.5 h-3.5 text-[#a371f7]" />
                        <span className="text-[#30363d]">system</span>
                        <span className="text-[#30363d]">::</span>
                        <span className="text-[#c9d1d9]">architecture</span>
                        <span className="text-[#30363d]">/</span>
                        <span className="text-[#a371f7]">refactors</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                                Arquitectura & Refactors
                                <span className="text-xs font-mono px-2 py-1 bg-[#a371f7]/20 text-[#a371f7] rounded border border-[#a371f7]/30 flex items-center gap-1">
                                    <Sparkles size={10} /> SCALABLE
                                </span>
                            </h1>
                            <p className="text-[#8b949e] max-w-xl">
                                Diseño estructural sólido y modernización de código heredado. Deuda técnica cero.
                            </p>
                        </div>

                        {/* Architecture Status Indicator */}
                        <div className="flex items-center gap-4 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-md">
                            <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                                <Network className="w-3.5 h-3.5 text-[#a371f7]" />
                                <span>Design Patterns</span>
                            </div>
                            <div className="h-4 w-px bg-[#30363d]" />
                            <div className="flex items-center gap-2">
                                <AlertTriangle size={12} className="text-[#f0883e]" />
                                <span className="text-[10px] font-mono text-[#f0883e]">DEBT DETECTED</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ========================================== */}
                {/* LAYOUT PRINCIPAL (CANVAS + INSPECTOR)     */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Columna Izquierda: Sidebar (Structure Tree) */}
                    <aside className="lg:col-span-1 space-y-4 order-2 lg:order-1">

                        {/* Card: Layers */}
                        <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
                            <div className="px-4 py-3 border-b border-[#30363d] bg-[#0d1117] flex items-center gap-2">
                                <Code2 className="w-3.5 h-3.5 text-[#a371f7]" />
                                <span className="text-xs font-semibold text-white uppercase tracking-wider">Layers</span>
                            </div>
                            <div className="p-2 space-y-1 font-mono text-xs">
                                {[
                                    { name: 'Domain', status: 'VALID' },
                                    { name: 'Application', status: 'VALID' },
                                    { name: 'Infrastructure', status: 'REFACTOR' },
                                    { name: 'Presentation', status: 'VALID' },
                                ].map((layer) => (
                                    <div key={layer.name} className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer group transition-colors">
                                        <span className="text-[#c9d1d9] group-hover:text-white transition-colors flex items-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full ${layer.status === 'VALID' ? 'bg-[#3fb950]' : 'bg-[#f0883e] animate-pulse'}`} />
                                            {layer.name}
                                        </span>
                                        <span className={`text-[9px] uppercase ${layer.status === 'VALID' ? 'text-[#8b949e]' : 'text-[#f0883e]'}`}>{layer.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card: Principles */}
                        <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
                            <h3 className="text-xs font-semibold text-white mb-3">Principios</h3>
                            <div className="flex flex-wrap gap-2">
                                {['SOLID', 'Clean Arch', 'DDD', 'KISS'].map(p => (
                                    <span key={p} className="px-2 py-0.5 text-[10px] rounded-full bg-[#21262d] border border-[#30363d] text-[#8b949e]">
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card: Metrics */}
                        <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
                            <h3 className="text-xs font-semibold text-white mb-3">Métricas</h3>
                            <div className="space-y-2 text-xs text-[#8b949e]">
                                <div className="flex justify-between"><span>Coupling</span><span className="text-[#3fb950] font-mono">Low</span></div>
                                <div className="flex justify-between"><span>Cohesion</span><span className="text-[#3fb950] font-mono">High</span></div>
                                <div className="flex justify-between"><span>Complexity</span><span className="text-[#f0883e] font-mono">Medium</span></div>
                            </div>
                        </div>
                    </aside>

                    {/* Columna Derecha: Contenido Principal (Main Canvas) */}
                    <div className="lg:col-span-3 order-1 lg:order-2">
                        <article className="relative bg-[#0d1117] border border-[#30363d] rounded-md shadow-lg overflow-hidden group">

                            {/* Header estilo blueprint view */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#a371f7]" />
                                    </div>
                                    <span className="text-xs text-[#8b949e] font-mono">structure.blueprint</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
                                    <GitBranch className="w-3.5 h-3.5 text-[#a371f7]" />
                                    <span>Main Branch</span>
                                </div>
                            </div>

                            {/* Contenido Dinámico */}
                            <div className="p-6 sm:p-8">
                                <ArchitectureRefactorsDescription />
                            </div>

                            {/* Footer Actions */}
                            <div className="px-6 py-4 border-t border-[#30363d] bg-[#161b22]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
                                    <CheckCircle className="w-3.5 h-3.5 text-[#3fb950]" />
                                    <span>Arquitectura validada: Listo para implementar</span>
                                </div>
                                <a
                                    href="/contacto"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#a371f7] px-4 py-2 rounded-md hover:bg-[#8957e5] shadow-[0_0_10px_rgba(163,113,247,0.2)] transition-all group"
                                >
                                    Solicitar Auditoría
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </main>
    );
}