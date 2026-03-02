'use client'

import React from 'react';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/digital-marketing.json'; // Nota: Consideramos que este archivo contiene la animación correcta para DevOps
import { GitMerge, Server, ArrowRight, Cpu, Layers, Activity, Workflow } from 'lucide-react';

// ============================================
// CONFIGURACIÓN ESTILO CYBER/DEVOPS
// ============================================
const CYBER_THEME = {
    colors: {
        bgCanvas: '#0d1117',
        bgCard: '#161b22',
        border: '#30363d',
        textMain: '#e6edf3',
        textMuted: '#8b949e',
        accentBlue: '#58a6ff', // CI/CD
        accentAmber: '#f0883e', // Infra
        accentGreen: '#00FF9D',
        glowBlue: 'rgba(88, 166, 255, 0.15)',
        glowAmber: 'rgba(240, 136, 62, 0.15)',
    }
};

// Datos refinados
const ciCdData = {
    title: "CI/CD Moderno",
    description: "Automatización de pipelines de integración y entrega continua. Cada commit se prueba, construye, escanea y despliega de forma confiable, rápida y segura.",
    technologies: [
        { name: "GitHub Actions", color: "bg-[#58a6ff]" },
        { name: "GitLab CI", color: "bg-[#f0883e]" },
        { name: "CircleCI", color: "bg-white" },
        { name: "Argo CD", color: "bg-[#f85149]" },
        { name: "Docker", color: "bg-[#58a6ff]" },
        { name: "Terraform", color: "bg-[#a371f7]" },
    ],
    icon: <GitMerge size={24} strokeWidth={1.5} />,
    accentColor: "border-[#58a6ff]",
    accentText: "text-[#58a6ff]",
    bgAccent: "bg-[#58a6ff]/10",
    glowColor: CYBER_THEME.colors.glowBlue,
    status: "PIPELINE_ACTIVE"
};

const infraData = {
    title: "Infraestructura como Código",
    description: "Gestión de entornos escalables y seguros mediante IaC, contenedores y orquestación. Entornos reproducibles versionados desde cero en minutos.",
    technologies: [
        { name: "Docker", color: "bg-[#58a6ff]" },
        { name: "Kubernetes", color: "bg-[#58a6ff]" },
        { name: "AWS", color: "bg-[#f0883e]" },
        { name: "Azure", color: "bg-[#58a6ff]" },
        { name: "Helm", color: "bg-[#00FF9D]" },
        { name: "Terraform", color: "bg-[#a371f7]" },
    ],
    icon: <Layers size={24} strokeWidth={1.5} />,
    accentColor: "border-[#f0883e]",
    accentText: "text-[#f0883e]",
    bgAccent: "bg-[#f0883e]/10",
    glowColor: CYBER_THEME.colors.glowAmber,
    status: "SCALABLE_ARCH"
};

// Componente Tarjeta Estilo Pipeline Node
const TechCard = ({ data }: { data: typeof ciCdData }) => {
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
                        <Server size={12} /> Stack
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

const DevOpsCICDDescription = () => {
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
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-orange-500/5 blur-[150px] rounded-full" />

            <div className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto w-full">

                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

                        {/* Visual / Lottie Container */}
                        <div className="relative group">
                            {/* Container estilo Pipeline Monitor */}
                            <div className="relative rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden backdrop-blur-sm">
                                {/* Barra superior */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d] bg-[#161b22]/80">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#f85149]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#f0883e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#3fb950]"></div>
                                    </div>
                                    <div className="flex-1 flex justify-center ml-4">
                                        <div className="flex items-center gap-2 px-3 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs text-[#f0883e] font-mono">
                                            <Activity size={12} className="animate-pulse" />
                                            <span>pipeline-runner.log</span>
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
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" /> DEPLOYMENT: READY</span>
                                    <span>CLUSTER: HEALTHY</span>
                                </div>
                            </div>

                            {/* Efecto de brillo detrás (Glow) */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#58a6ff] to-[#f0883e] rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                        </div>

                        {/* Texto Principal */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#30363d] bg-[#161b22] text-xs text-[#58a6ff] font-mono uppercase tracking-wider">
                                <Workflow size={12} />
                                Automation Ops
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                                DevOps & <br />
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#58a6ff] to-[#f0883e]">
                                    CI/CD
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#58a6ff] to-[#f0883e] opacity-50 blur-sm" />
                                </span>.
                            </h2>

                            <p className="text-lg text-[#8b949e] leading-relaxed max-w-lg">
                                Automatizo el ciclo de vida completo del software. Del commit al despliegue, garantizando calidad, seguridad y velocidad de entrega.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="group flex items-center gap-2 px-6 py-3 bg-[#00FF9D] text-black text-sm font-semibold rounded-md transition-all shadow-[0_0_10px_rgba(0,255,157,0.1)] hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] active:scale-95">
                                    Ver Pipeline
                                    <Cpu size={16} className="group-hover:rotate-12 transition-transform" />
                                </button>
                                <button className="group flex items-center gap-2 px-6 py-3 bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] text-sm font-semibold rounded-md transition-all border border-[#30363d] hover:border-[#58a6ff]/50">
                                    Documentación
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tech Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        <TechCard data={ciCdData} />
                        <TechCard data={infraData} />
                    </div>

                    {/* Elegant Bottom CTA (Terminal Style) */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-xl border border-[#30363d] bg-[#161b22]/90 backdrop-blur-md p-8 md:p-12 text-center overflow-hidden group">

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#58a6ff]" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#f0883e]" />

                            <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 rotate-12">
                                <Server size={150} strokeWidth={0.5} />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
                                Automatización Inteligente
                            </h3>
                            <p className="text-[#8b949e] mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed">
                                No solo scripts, sino sistemas resilientes. Infraestructura reproducible y despliegues seguros con código.
                            </p>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-[#58a6ff] border border-[#30363d] rounded-lg hover:bg-[#58a6ff]/10 hover:border-[#58a6ff] transition-all relative z-10 group"
                            >
                                Consultar Arquitectura
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default DevOpsCICDDescription