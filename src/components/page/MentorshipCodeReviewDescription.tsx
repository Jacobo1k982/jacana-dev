'use client'

import React from 'react';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/Meeting.json';
import { Users, GitPullRequest, CheckCircle, ArrowRight, Video, MessageSquare } from 'lucide-react';

// Datos refinados
const mentorshipData = {
    title: "Mentoría Técnica",
    description: "Acompaño a desarrolladores y equipos en su evolución profesional mediante sesiones de pair programming, guías de carrera y liderazgo técnico.",
    technologies: [
        { name: "Pair Programming", color: "bg-blue-500" },
        { name: "Career Coaching", color: "bg-purple-500" },
        { name: "Tech Leadership", color: "bg-red-500" },
        { name: "Onboarding", color: "bg-green-500" },
        { name: "System Design", color: "bg-orange-500" },
        { name: "Soft Skills", color: "bg-pink-500" },
    ],
    icon: <Users size={28} />,
    accentColor: "border-[#d29922]", // GitHub Gold/Orange for Mentorship
    accentText: "text-[#d29922]",
    bgAccent: "bg-[#d29922]/10",
};

const codeReviewData = {
    title: "Code Review Estratégico",
    description: "Revisión de código centrada en legibilidad, seguridad y mantenibilidad. No solo corrigo bugs, sino que educo sobre arquitectura y mejores prácticas.",
    technologies: [
        { name: "Pull Requests", color: "bg-green-500" },
        { name: "Static Analysis", color: "bg-blue-600" },
        { name: "SonarQube", color: "bg-red-500" },
        { name: "ESLint", color: "bg-purple-600" },
        { name: "Testing Coverage", color: "bg-yellow-500" },
        { name: "Tech Debt", color: "bg-orange-500" },
    ],
    icon: <GitPullRequest size={28} />,
    accentColor: "border-[#3fb950]", // GitHub Green for Reviews
    accentText: "text-[#3fb950]",
    bgAccent: "bg-[#3fb950]/10",
};

// Componente Tarjeta Estilo GitHub (Nativo)
const TechCard = ({ data }: { data: typeof mentorshipData }) => {
    return (
        <div className={`
            relative flex flex-col h-full rounded-md border border-[#30363d] bg-[#161b22] 
            transition-all duration-300 hover:border-[#8b949e] hover:shadow-lg
        `}>
            {/* Borde superior de color */}
            <div className={`h-1 w-full rounded-t-sm ${data.bgAccent.replace('/10', '')} opacity-80`} />

            <div className="p-6 md:p-8 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <div className={`
                        p-3 rounded-md border ${data.accentColor} bg-[#0d1117] ${data.bgAccent}
                        flex items-center justify-center
                    `}>
                        <span className={data.accentText}>
                            {data.icon}
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold text-[#f0f6fc]">{data.title}</h3>
                </div>

                {/* Descripción */}
                <p className="text-[#8b949e] text-sm leading-relaxed mb-8 flex-1">
                    {data.description}
                </p>

                {/* Tecnologías estilo GitHub */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                        {data.technologies.map((tech) => (
                            <span
                                key={tech.name}
                                className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-[#0d1117] border border-[#30363d] text-xs text-[#c9d1d9] hover:border-[#8b949e] transition-colors cursor-default"
                            >
                                <span className={`w-2 h-2 rounded-full ${tech.color}`}></span>
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

            {/* Patrón de fondo sutil */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-15">
                <div className="max-w-7xl mx-auto w-full">

                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

                        {/* Visual / Lottie Container */}
                        <div className="relative group">
                            {/* Container estilo Video Call / Meeting */}
                            <div className="relative rounded-lg border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden">
                                {/* Barra superior falsa */}
                                <div className="flex items-center px-4 py-3 border-b border-[#30363d] bg-[#161b22]">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                    </div>
                                    <div className="ml-4 px-3 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-xs text-[#8b949e] font-mono">
                                        mentorship-session
                                    </div>
                                </div>

                                {/* Lottie */}
                                <div className="p-4 bg-[#0d1117] flex items-center justify-center min-h-[300px]">
                                    <Lottie
                                        animationData={codingAnimation}
                                        loop={true}
                                        autoplay={true}
                                        className="w-full max-w-sm h-auto opacity-90"
                                    />
                                </div>
                            </div>

                            {/* Efecto de sutil brillo detrás */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#d29922] to-[#3fb950] rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                        </div>

                        {/* Texto Principal */}
                        <div className="space-y-6">

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f0f6fc] tracking-tight leading-[1.1]">
                                Mentorship & <br />
                                <span className="text-[#3fb950]">Code Review</span>.
                            </h2>

                            <p className="text-lg text-[#8b949e] leading-relaxed max-w-lg">
                                Comparto conocimiento para construir equipos autónomos y resilientes. Elevando el estándar técnico a través de retroalimentación continua.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="flex items-center gap-2 px-6 py-3 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold rounded-md transition-all border border-transparent focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#0d1117]">
                                    Agendar Sesión
                                    <Video size={16} />
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] text-sm font-semibold rounded-md transition-all border border-[#30363d] hover:border-[#8b949e]">
                                    <MessageSquare size={16} />
                                    Ver Reviews
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tech Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        <TechCard data={mentorshipData} />
                        <TechCard data={codeReviewData} />
                    </div>

                    {/* Elegant Bottom CTA (Alert/Note Style) */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-md border border-[#30363d] bg-[#161b22] p-8 md:p-12 text-center overflow-hidden">
                            <div className="absolute top-0 left-0 p-4 opacity-10 transform -scale-x-100">
                                <MessageSquare size={200} strokeWidth={1} />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-[#f0f6fc] mb-4 relative z-10">
                                Calidad compartida
                            </h3>
                            <p className="text-[#8b949e] mb-8 max-w-2xl mx-auto relative z-10">
                                El mejor código es aquel que otros pueden entender, mantener y mejorar. Fomento una cultura de excelencia técnica sostenible.
                            </p>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-[#58a6ff] border border-[#30363d] rounded-md hover:bg-[#161b22] hover:border-[#8b949e] hover:text-[#79c0ff] transition-all relative z-10"
                            >
                                Iniciar Mentoria
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default MentorshipCodeReviewDescription