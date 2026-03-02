'use client'

import React from 'react';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/UIUX-Designer.json';
import { Layout, Code2, ArrowRight, PenTool, Monitor, Layers, Grid, Sparkles } from 'lucide-react';

// ============================================
// CONFIGURACIÓN ESTILO CYBER/FUTURISTA
// ============================================
const CYBER_THEME = {
    colors: {
        bgCanvas: '#0d1117',
        bgCard: '#161b22',
        border: '#30363d',
        textMain: '#e6edf3',
        textMuted: '#8b949e',
        accentPrimary: '#a371f7', // Púrpura GitHub
        accentSecondary: '#db61a2', // Rosa GitHub
        accentGreen: '#00FF9D', // Neón
        glowPurple: 'rgba(163, 113, 247, 0.15)',
        glowPink: 'rgba(219, 97, 162, 0.15)',
    }
};

// Datos refinados con colores neón
const designData = {
    title: "Diseño Centrado en el Usuario",
    description: "Creación de flujos intuitivos basados en investigación y accesibilidad. Diseño sistemas escalables y valido cada interacción con usuarios reales.",
    technologies: [
        { name: "Figma", color: "bg-[#a371f7]" },
        { name: "User Testing", color: "bg-[#db61a2]" },
        { name: "Wireframing", color: "bg-[#8b949e]" },
        { name: "Design Systems", color: "bg-[#58a6ff]" },
        { name: "WCAG 2.2", color: "bg-[#3fb950]" },
        { name: "Prototyping", color: "bg-[#f0883e]" },
    ],
    icon: <Layout size={24} strokeWidth={1.5} />,
    accentColor: "border-[#a371f7]",
    accentText: "text-[#a371f7]",
    bgAccent: "bg-[#a371f7]/10",
    glowColor: CYBER_THEME.colors.glowPurple,
};

const implementationData = {
    title: "Implementación Técnica de UI",
    description: "Traducción de diseños en código funcional y accesible. Uso componentes reutilizables, animaciones performantes y patrones de interacción probados.",
    technologies: [
        { name: "React", color: "bg-[#58a6ff]" },
        { name: "Next.js", color: "bg-white" },
        { name: "Tailwind CSS", color: "bg-[#00FF9D]" },
        { name: "ShadCN/UI", color: "bg-[#e6edf3]" },
        { name: "Framer Motion", color: "bg-[#db61a2]" },
        { name: "Radix UI", color: "bg-[#a371f7]" },
    ],
    icon: <Code2 size={24} strokeWidth={1.5} />,
    accentColor: "border-[#db61a2]",
    accentText: "text-[#db61a2]",
    bgAccent: "bg-[#db61a2]/10",
    glowColor: CYBER_THEME.colors.glowPink,
};

// Componente Tarjeta Estilo Cyber Card
const TechCard = ({ data }: { data: typeof designData }) => {
    return (
        <div className={`
            relative flex flex-col h-full rounded-xl border border-[#30363d] bg-[#161b22]/80 backdrop-blur-md
            transition-all duration-500 group overflow-hidden
            hover:border-transparent
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
                <div className="flex items-center gap-4 mb-6">
                    <div className={`
                        p-3 rounded-lg border ${data.accentColor} bg-[#0d1117]/50
                        flex items-center justify-center transition-all duration-300
                        group-hover:shadow-[0_0_15px_${data.glowColor}]
                    `}>
                        <span className={data.accentText}>
                            {data.icon}
                        </span>
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight">{data.title}</h3>
                </div>

                {/* Descripción */}
                <p className="text-[#8b949e] text-sm leading-relaxed mb-8 flex-1">
                    {data.description}
                </p>

                {/* Tecnologías estilo Tags */}
                <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-[0.2em] flex items-center gap-2">
                        <Layers size={12} /> Stack
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

const UXUIDescription = () => {
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
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-purple-500/5 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-pink-500/5 blur-[150px] rounded-full" />

            <div className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto w-full">

                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

                        {/* Visual / Lottie Container */}
                        <div className="relative group">
                            {/* Container estilo Design Software */}
                            <div className="relative rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden backdrop-blur-sm">
                                {/* Barra superior falsa */}
                                <div className="flex items-center px-4 py-3 border-b border-[#30363d] bg-[#161b22]/80">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#f85149]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#f0883e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#00FF9D]"></div>
                                    </div>
                                    <div className="flex-1 flex justify-center ml-4">
                                        <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs text-[#a371f7] font-mono">
                                            <Grid size={12} />
                                            <span>canvas.view</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Lottie */}
                                <div className="p-4 bg-[#0d1117] flex items-center justify-center min-h-[300px] relative">
                                    {/* Grid lines inside canvas */}
                                    <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#30363d 1px, transparent 1px), linear-gradient(90deg, #30363d 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                                    <Lottie
                                        animationData={codingAnimation}
                                        loop={true}
                                        autoplay={true}
                                        className="w-full max-w-sm h-auto relative z-10"
                                    />
                                </div>

                                {/* Bottom Status Bar */}
                                <div className="px-4 py-2 border-t border-[#30363d] bg-[#161b22]/50 flex justify-between text-[10px] text-[#8b949e] font-mono">
                                    <span>1920 × 1080</span>
                                    <span className="text-[#00FF9D]">Render: 60fps</span>
                                </div>
                            </div>

                            {/* Efecto de brillo detrás (Glow) */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#a371f7] to-[#db61a2] rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                        </div>

                        {/* Texto Principal */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#30363d] bg-[#161b22] text-xs text-[#a371f7] font-mono uppercase tracking-wider">
                                <Sparkles size={12} />
                                User Experience
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                                Technical <br />
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#a371f7] to-[#db61a2]">
                                    UX / UI
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#a371f7] to-[#db61a2] opacity-50 blur-sm" />
                                </span>.
                            </h2>

                            <p className="text-lg text-[#8b949e] leading-relaxed max-w-lg">
                                Combino empatía por el usuario con rigor técnico para crear interfaces que no solo se ven bien, sino que funcionan perfectamente.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="group flex items-center gap-2 px-6 py-3 bg-[#00FF9D] text-black text-sm font-semibold rounded-md transition-all shadow-[0_0_10px_rgba(0,255,157,0.1)] hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] active:scale-95">
                                    Ver Prototipos
                                    <Monitor size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button className="group flex items-center gap-2 px-6 py-3 bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] text-sm font-semibold rounded-md transition-all border border-[#30363d] hover:border-[#a371f7]/50">
                                    <PenTool size={16} className="text-[#a371f7]" />
                                    Design System
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tech Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        <TechCard data={designData} />
                        <TechCard data={implementationData} />
                    </div>

                    {/* Elegant Bottom CTA (Terminal Style) */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-xl border border-[#30363d] bg-[#161b22]/90 backdrop-blur-md p-8 md:p-12 text-center overflow-hidden group">

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#a371f7]" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#db61a2]" />

                            {/* Grid Background */}
                            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

                            <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 rotate-12">
                                <PenTool size={150} strokeWidth={0.5} />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
                                Diseño que se siente natural
                            </h3>
                            <p className="text-[#8b949e] mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed">
                                El mejor diseño es el que nadie nota porque simplemente funciona. Un equilibrio perfecto entre estética y funcionalidad técnica.
                            </p>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-[#a371f7] border border-[#30363d] rounded-lg hover:bg-[#a371f7]/10 hover:border-[#a371f7] transition-all relative z-10 group"
                            >
                                Iniciar proyecto de Diseño
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default UXUIDescription