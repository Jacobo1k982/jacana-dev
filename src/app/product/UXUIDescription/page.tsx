// src/app/servicios/ux-ui/page.tsx (o la ruta correspondiente)

import UXUIDescription from "@/components/page/UXUIDescription";
import { Palette, Figma, Layers, Box, Grid, Wand2, ArrowRight } from "lucide-react";

export default function UXUIDescriptionPage() {
    return (
        <main className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">

            {/* 1. Fondo Ambiental (Dot Grid Pattern - típico de herramientas de diseño) */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#8b949e 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Glow Effects */}
            <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00FF9D]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                {/* ========================================== */}
                {/* HEADER: ESTILO UI INSPECTOR              */}
                {/* ========================================== */}
                <header className="mb-8 border-b border-[#30363d] pb-6">

                    {/* Ruta tipo breadcrumb (Design System) */}
                    <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-4 font-mono">
                        <span className="text-[#30363d]">~</span>
                        <span className="text-[#30363d]">/</span>
                        <span className="hover:text-[#00FF9D] cursor-pointer transition-colors">design-system</span>
                        <span className="text-[#30363d]">/</span>
                        <span className="text-white font-medium flex items-center gap-1.5">
                            <Palette className="w-4 h-4 text-[#a371f7]" />
                            ux-ui-specs
                        </span>
                        <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold rounded-full border border-[#a371f7] text-[#a371f7] bg-[#a371f7]/10 uppercase">
                            Design
                        </span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                                UX/UI Técnico
                                <span className="text-xs font-mono px-2 py-1 bg-[#238636]/20 text-[#3fb950] rounded border border-[#238636]/30">
                                    LATEST
                                </span>
                            </h1>
                            <p className="text-[#8b949e] max-w-xl">
                                Diseño de interfaces centrado en la experiencia y la implementación técnica.
                                Pixel perfect meets code.
                            </p>
                        </div>

                        {/* Tools Indicator */}
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#161b22] border border-[#30363d] rounded-md text-xs text-[#c9d1d9]">
                                <Figma className="w-3.5 h-3.5" />
                                <span>Connected</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ========================================== */}
                {/* LAYOUT PRINCIPAL (INSPECTOR + LAYERS)    */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Columna Izquierda: Sidebar (Design Layers) */}
                    <aside className="lg:col-span-1 space-y-4 order-2 lg:order-1">

                        {/* Card: Layers */}
                        <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
                            <div className="px-4 py-3 border-b border-[#30363d] bg-[#0d1117] flex items-center gap-2">
                                <Layers className="w-3.5 h-3.5 text-[#8b949e]" />
                                <span className="text-xs font-semibold text-white uppercase tracking-wider">Layers</span>
                            </div>
                            <div className="p-2 space-y-1 font-mono text-xs">
                                {[
                                    { name: 'Header', icon: Box, level: 0 },
                                    { name: 'Hero Section', icon: Grid, level: 1 },
                                    { name: 'Components', icon: Box, level: 1 },
                                    { name: 'Color System', icon: Palette, level: 2 },
                                ].map((layer, i) => (
                                    <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer group transition-colors`}
                                        style={{ paddingLeft: `${layer.level * 8 + 8}px` }}>
                                        <layer.icon className="w-3 h-3 text-[#8b949e] group-hover:text-[#a371f7] transition-colors" />
                                        <span className="text-[#c9d1d9] group-hover:text-white transition-colors">{layer.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card: Design Tools */}
                        <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
                            <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                                <Wand2 className="w-3.5 h-3.5 text-[#00FF9D]" />
                                Herramientas
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Figma', 'Framer', 'Tailwind', 'React'].map(tool => (
                                    <span key={tool} className="px-2 py-0.5 text-[10px] rounded-full bg-[#21262d] border border-[#30363d] text-[#8b949e] hover:border-[#a371f7] transition-colors cursor-default">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card: Color Palette */}
                        <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
                            <h3 className="text-xs font-semibold text-white mb-3">Paleta de Color</h3>
                            <div className="flex gap-1">
                                <div className="w-6 h-6 rounded bg-[#00FF9D] shadow-sm" title="Primary" />
                                <div className="w-6 h-6 rounded bg-[#58a6ff] shadow-sm" title="Info" />
                                <div className="w-6 h-6 rounded bg-[#a371f7] shadow-sm" title="Accent" />
                                <div className="w-6 h-6 rounded bg-[#f85149] shadow-sm" title="Danger" />
                                <div className="w-6 h-6 rounded bg-[#161b22] border border-[#30363d]" title="Surface" />
                            </div>
                        </div>
                    </aside>

                    {/* Columna Derecha: Contenido Principal (Artboard) */}
                    <div className="lg:col-span-3 order-1 lg:order-2">
                        <article className="relative bg-[#0d1117] border border-[#30363d] rounded-md shadow-lg overflow-hidden group">

                            {/* Header estilo "canvas" o inspector */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9D]" />
                                    </div>
                                    <span className="text-xs text-[#8b949e] font-mono">Canvas / Main.ui</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
                                    <span className="text-[#a371f7]">1440px</span>
                                    <span className="text-[#30363d]">×</span>
                                    <span className="text-white">Auto</span>
                                </div>
                            </div>

                            {/* Contenido Dinámico */}
                            <div className="p-6 sm:p-8">
                                <UXUIDescription />
                            </div>

                            {/* Footer Actions */}
                            <div className="px-6 py-4 border-t border-[#30363d] bg-[#161b22]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                                    <div className="w-2 h-2 rounded-full bg-[#a371f7] shadow-[0_0_5px_rgba(163,113,247,0.5)]" />
                                    <span>Última actualización: hace 1 hora</span>
                                </div>
                                <a
                                    href="/contacto"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#a371f7] px-4 py-2 rounded-md hover:bg-[#8957e5] shadow-[0_0_10px_rgba(163,113,247,0.2)] transition-all group"
                                >
                                    Solicitar Diseño
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