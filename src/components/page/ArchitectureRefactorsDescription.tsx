'use client'

import React from 'react';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/Webdeveloper.json';
import { Building2, RefreshCw, ArrowRight, Cpu, Layers, Activity, Binary } from 'lucide-react';

// ============================================
// CONFIGURACIÓN ESTILO CYBER/ARCHITECTURE
// ============================================
const CYBER_THEME = {
    colors: {
        bgCanvas: '#0d1117',
        bgCard: '#161b22',
        border: '#30363d',
        textMain: '#e6edf3',
        textMuted: '#8b949e',
        accentStructure: '#f85149', // Rojo para Arquitectura
        accentRefactor: '#00FF9D', // Verde Neón para Refactor
        glowRed: 'rgba(248, 81, 73, 0.15)',
        glowGreen: 'rgba(0, 255, 157, 0.15)',
    }
};

// Datos refinados
const architectureData = {
    title: "Arquitectura Escalable",
    description: "Diseño de sistemas modulares y mantenibles. Aplico patrones modernos como Clean Architecture, Hexagonal y Event-Driven para asegurar que el código evolucione con el negocio.",
    technologies: [
        { name: "DDD", color: "bg-[#a371f7]" },
        { name: "Clean Arch", color: "bg-[#58a6ff]" },
        { name: "CQRS", color: "bg-[#f85149]" },
        { name: "Event Sourcing", color: "bg-[#a371f7]" },
        { name: "Microservicios", color: "bg-[#00FF9D]" },
        { name: "Monolito Modular", color: "bg-[#f0883e]" },
    ],
    icon: <Building2 size={24} strokeWidth={1.5} />,
    accentColor: "border-[#f85149]",
    accentText: "text-[#f85149]",
    bgAccent: "bg-[#f85149]/10",
    glowColor: CYBER_THEME.colors.glowRed,
    status: "SYSTEM_CORE"
};

const refactoringData = {
    title: "Refactores Estratégicos",
    description: "Transformación de código heredado mediante refactores seguros y tests automatizados. Uso patrones como Strangler Fig y migraciones incrementales sin detener producción.",
    technologies: [
        { name: "TDD", color: "bg-[#58a6ff]" },
        { name: "Strangler Fig", color: "bg-[#3fb950]" },
        { name: "Golden Master", color: "bg-[#d29922]" },
        { name: "SOLID", color: "bg-[#58a6ff]" },
        { name: "Feature Toggles", color: "bg-[#db61a2]" },
        { name: "Observability", color: "bg-[#a371f7]" },
    ],
    icon: <RefreshCw size={24} strokeWidth={1.5} />,
    accentColor: "border-[#00FF9D]",
    accentText: "text-[#00FF9D]",
    bgAccent: "bg-[#00FF9D]/10",
    glowColor: CYBER_THEME.colors.glowGreen,
    status: "CODE_EVOLUTION"
};

// Componente Tarjeta Estilo Structure Node
const ArchitectureCard = ({ data }: { data: typeof architectureData }) => {
    return (
        <div className={`
            relative flex flex-col h-full rounded-xl border border-[#30363d] bg-[#161b22]/80 backdrop-blur-md
            transition-all duration-500 group overflow-hidden
        `}
            style={{
                boxShadow: `0 0 0 1px rgba(48, 54, 61, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3)`
            }}
        >
            {/* Hover Glow Effect */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                style={{ background: `radial-gradient(circle at 50% 0%, ${data.glowColor}, transparent 70%)` }}
            />

            {/* Scanline effect */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

            {/* Top Accent Line */}
            <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent ${data.accentText} opacity-80`} />

            <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`
                            p-3 rounded-lg border ${data.accentColor} bg-[#0d1117]/50
                            flex items-center justify-center transition-all duration-300
                            group-hover:shadow-[0_0_15px_${data.glowColor}]
                        `}>
                            <span className={data.accentText}>
                                {data.icon}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white tracking-tight">{data.title}</h3>
                            <span className={`text-[9px] font-mono uppercase tracking-widest ${data.accentText} opacity-80`}>
                                {data.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Descripción */}
                <p className="text-[#8b949e] text-sm leading-relaxed mb-8 flex-1">
                    {data.description}
                </p>

                {/* Tecnologías estilo Tags */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Layers size={12} /> Patterns
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {data.technologies.map((tech) => (
                            <span
                                key={tech.name}
                                className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0d1117] border border-[#30363d] text-xs text-[#c9d1d9] hover:border-[#8b949e] transition-colors cursor-default font-mono group/tag"
                            >
                                <span className={`w-1.5 h-1.5 rounded-full ${tech.color} shadow-[0_0_4px_currentColor] group-hover/tag:animate-pulse`}></span>
                                {tech.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ArchitectureRefactorsDescription = () => {
    return (
        <section className="relative min-h-screen flex flex-col bg-[#0d1117] border-t border-[#30363d]">

            {/* Patrón de fondo Dot Grid */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: 'radial-gradient(#8b949e 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-red-500/5 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#00FF9D]/5 blur-[150px] rounded-full" />

            <div className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto w-full">

                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

                        {/* Visual / Lottie Container */}
                        <div className="relative group">
                            {/* Container estilo Blueprint / Hologram */}
                            <div className="relative rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden backdrop-blur-sm">
                                {/* Barra superior */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d] bg-[#161b22]/80">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#f85149]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#f0883e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#00FF9D]"></div>
                                    </div>
                                    <div className="flex-1 flex justify-center ml-4">
                                        <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs text-[#f85149] font-mono">
                                            <Binary size={12} className="animate-pulse" />
                                            <span>structure.matrix</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Lottie */}
                                <div className="p-4 bg-[#0d1117] flex items-center justify-center min-h-[300px] relative">
                                    {/* Grid lines inside canvas */}
                                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#30363d 1px, transparent 1px)', backgroundSize: '10px 10px' }} />
                                    <Lottie
                                        animationData={codingAnimation}
                                        loop={true}
                                        autoplay={true}
                                        className="w-full max-w-sm h-auto relative z-10"
                                    />
                                </div>

                                {/* Bottom Status Bar */}
                                <div className="px-4 py-2 border-t border-[#30363d] bg-[#161b22]/50 flex justify-between text-[10px] text-[#8b949e] font-mono">
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#f85149] animate-pulse" /> ANALYSIS: DEEP_SCAN</span>
                                    <span>LAYERS: 4</span>
                                </div>
                            </div>

                            {/* Efecto de brillo detrás (Glow) */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#f85149] to-[#00FF9D] rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                        </div>

                        {/* Texto Principal */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#30363d] bg-[#161b22] text-xs text-[#f85149] font-mono uppercase tracking-wider">
                                <Activity size={12} />
                                Structural Engineering
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                                Architecture & <br />
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#f85149] to-[#f0883e]">
                                    Refactors
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#f85149] to-[#f0883e] opacity-50 blur-sm" />
                                </span>.
                            </h2>

                            <p className="text-lg text-[#8b949e] leading-relaxed max-w-lg">
                                Diseño sistemas sólidos desde el inicio y rescato aplicaciones heredadas mediante estrategias técnicas que reducen el riesgo técnico.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="group flex items-center gap-2 px-6 py-3 bg-[#00FF9D] text-black text-sm font-semibold rounded-md transition-all shadow-[0_0_10px_rgba(0,255,157,0.1)] hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] active:scale-95">
                                    Ver Diagramas
                                    <Cpu size={16} className="group-hover:rotate-12 transition-transform" />
                                </button>
                                <button className="group flex items-center gap-2 px-6 py-3 bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] text-sm font-semibold rounded-md transition-all border border-[#30363d] hover:border-[#f85149]/50">
                                    Guía de Patrones
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tech Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        <ArchitectureCard data={architectureData} />
                        <ArchitectureCard data={refactoringData} />
                    </div>

                    {/* Elegant Bottom CTA (Terminal Style) */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-xl border border-[#30363d] bg-[#161b22]/90 backdrop-blur-md p-8 md:p-12 text-center overflow-hidden group">

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#f85149]" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00FF9D]" />

                            <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 rotate-12">
                                <Binary size={150} strokeWidth={0.5} />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
                                Código que perdura
                            </h3>
                            <p className="text-[#8b949e] mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed">
                                La arquitectura no es solo dibujar diagramas, es tomar decisiones técnicas fundamentadas que permiten a tu software evolucionar.
                            </p>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-[#f85149] border border-[#30363d] rounded-lg hover:bg-[#f85149]/10 hover:border-[#f85149] transition-all relative z-10 group"
                            >
                                Auditar Código
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default ArchitectureRefactorsDescription