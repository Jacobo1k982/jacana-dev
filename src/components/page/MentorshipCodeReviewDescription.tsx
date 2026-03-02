'use client'

import React from 'react';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/Meeting.json';
import { Users, GitPullRequest, ArrowRight, Video, MessageSquare, Layers, Radio, UserCheck } from 'lucide-react';

// ============================================
// CONFIGURACIÓN ESTILO CYBER/MENTORSHIP
// ============================================
const CYBER_THEME = {
    colors: {
        bgCanvas: '#0d1117',
        bgCard: '#161b22',
        border: '#30363d',
        textMain: '#e6edf3',
        textMuted: '#8b949e',
        accentMentor: '#d29922', // Dorado/Naranja para Mentoría
        accentReview: '#00FF9D', // Verde Neón para Code Review
        glowGold: 'rgba(210, 153, 34, 0.15)',
        glowGreen: 'rgba(0, 255, 157, 0.15)',
    }
};

// Datos refinados
const mentorshipData = {
    title: "Mentoría Técnica",
    description: "Acompaño a desarrolladores y equipos en su evolución profesional mediante sesiones de pair programming, guías de carrera y liderazgo técnico.",
    technologies: [
        { name: "Pair Programming", color: "bg-[#58a6ff]" },
        { name: "Career Coaching", color: "bg-[#a371f7]" },
        { name: "Tech Leadership", color: "bg-[#f85149]" },
        { name: "Onboarding", color: "bg-[#3fb950]" },
        { name: "System Design", color: "bg-[#f0883e]" },
        { name: "Soft Skills", color: "bg-[#db61a2]" },
    ],
    icon: <Users size={24} strokeWidth={1.5} />,
    accentColor: "border-[#d29922]",
    accentText: "text-[#d29922]",
    bgAccent: "bg-[#d29922]/10",
    glowColor: CYBER_THEME.colors.glowGold,
    status: "LIVE SESSION"
};

const codeReviewData = {
    title: "Code Review Estratégico",
    description: "Revisión de código centrada en legibilidad, seguridad y mantenibilidad. No solo corrigo bugs, sino que educo sobre arquitectura y mejores prácticas.",
    technologies: [
        { name: "Pull Requests", color: "bg-[#3fb950]" },
        { name: "Static Analysis", color: "bg-[#58a6ff]" },
        { name: "SonarQube", color: "bg-[#f85149]" },
        { name: "ESLint", color: "bg-[#a371f7]" },
        { name: "Testing", color: "bg-[#d29922]" },
        { name: "Tech Debt", color: "bg-[#f0883e]" },
    ],
    icon: <GitPullRequest size={24} strokeWidth={1.5} />,
    accentColor: "border-[#00FF9D]",
    accentText: "text-[#00FF9D]",
    bgAccent: "bg-[#00FF9D]/10",
    glowColor: CYBER_THEME.colors.glowGreen,
    status: "QUALITY CHECK"
};

// Componente Tarjeta Estilo Session Node
const TechCard = ({ data }: { data: typeof mentorshipData }) => {
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
                        <Layers size={12} /> Skills
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

const MentorshipCodeReviewDescription = () => {
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
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#d29922]/5 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#00FF9D]/5 blur-[150px] rounded-full" />

            <div className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto w-full">

                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

                        {/* Visual / Lottie Container */}
                        <div className="relative group">
                            {/* Container estilo Video Conference / Live Stream */}
                            <div className="relative rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden backdrop-blur-sm">
                                {/* Barra superior */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d] bg-[#161b22]/80">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#f85149]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#f0883e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#d29922]"></div>
                                    </div>
                                    <div className="flex-1 flex justify-center ml-4">
                                        <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs text-[#d29922] font-mono">
                                            <Radio size={12} className="animate-pulse" />
                                            <span>live-session.v2</span>
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
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#d29922] animate-pulse" /> MENTOR_MODE: ACTIVE</span>
                                    <span>RECORDING: OPT-IN</span>
                                </div>
                            </div>

                            {/* Efecto de brillo detrás (Glow) */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#d29922] to-[#00FF9D] rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                        </div>

                        {/* Texto Principal */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#30363d] bg-[#161b22] text-xs text-[#d29922] font-mono uppercase tracking-wider">
                                <UserCheck size={12} />
                                Knowledge Transfer
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                                Mentorship & <br />
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#d29922] to-[#f0883e]">
                                    Code Review
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#d29922] to-[#f0883e] opacity-50 blur-sm" />
                                </span>.
                            </h2>

                            <p className="text-lg text-[#8b949e] leading-relaxed max-w-lg">
                                Comparto conocimiento para construir equipos autónomos y resilientes. Elevando el estándar técnico a través de retroalimentación continua.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="group flex items-center gap-2 px-6 py-3 bg-[#00FF9D] text-black text-sm font-semibold rounded-md transition-all shadow-[0_0_10px_rgba(0,255,157,0.1)] hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] active:scale-95">
                                    Agendar Sesión
                                    <Video size={16} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <button className="group flex items-center gap-2 px-6 py-3 bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] text-sm font-semibold rounded-md transition-all border border-[#30363d] hover:border-[#d29922]/50">
                                    <MessageSquare size={16} className="text-[#d29922]" />
                                    Ver Reviews
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tech Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        <TechCard data={mentorshipData} />
                        <TechCard data={codeReviewData} />
                    </div>

                    {/* Elegant Bottom CTA (Terminal Style) */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-xl border border-[#30363d] bg-[#161b22]/90 backdrop-blur-md p-8 md:p-12 text-center overflow-hidden group">

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#d29922]" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00FF9D]" />

                            <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 rotate-12">
                                <MessageSquare size={150} strokeWidth={0.5} />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
                                Calidad compartida
                            </h3>
                            <p className="text-[#8b949e] mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed">
                                El mejor código es aquel que otros pueden entender, mantener y mejorar. Fomento una cultura de excelencia técnica sostenible.
                            </p>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-[#d29922] border border-[#30363d] rounded-lg hover:bg-[#d29922]/10 hover:border-[#d29922] transition-all relative z-10 group"
                            >
                                Iniciar Mentoria
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default MentorshipCodeReviewDescription