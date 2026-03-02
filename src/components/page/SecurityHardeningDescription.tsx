'use client'

import React from 'react';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/Data-Security.json';
import { Lock, ShieldCheck, ArrowRight, Shield, ServerCrash, Terminal, Layers, ScanLine } from 'lucide-react';

// ============================================
// CONFIGURACIÓN ESTILO CYBER/SECURITY
// ============================================
const CYBER_THEME = {
    colors: {
        bgCanvas: '#0d1117',
        bgCard: '#161b22',
        border: '#30363d',
        textMain: '#e6edf3',
        textMuted: '#8b949e',
        accentDanger: '#f85149', // Rojo GitHub
        accentSuccess: '#00FF9D', // Verde Neón
        accentWarning: '#f0883e', // Naranja
        glowRed: 'rgba(248, 81, 73, 0.15)',
        glowGreen: 'rgba(0, 255, 157, 0.15)',
    }
};

// Datos refinados con colores de estado
const appSecurityData = {
    title: "Seguridad en la Aplicación",
    description: "Protección activa contra vulnerabilidades OWASP Top 10. Implemento validación estricta, autenticación robusta y manejo seguro de secrets para blindar el código.",
    technologies: [
        { name: "OWASP Top 10", color: "bg-[#f85149]" },
        { name: "JWT/OAuth 2.0", color: "bg-[#58a6ff]" },
        { name: "Helmet.js", color: "bg-[#8b949e]" },
        { name: "CSP", color: "bg-[#a371f7]" },
        { name: "Argon2", color: "bg-[#db61a2]" },
        { name: "Rate Limiting", color: "bg-[#f0883e]" },
    ],
    icon: <Lock size={24} strokeWidth={1.5} />,
    accentColor: "border-[#f85149]",
    accentText: "text-[#f85149]",
    bgAccent: "bg-[#f85149]/10",
    glowColor: CYBER_THEME.colors.glowRed,
    status: "CRITICAL PROTECTION"
};

const infraSecurityData = {
    title: "Hardening de Infraestructura",
    description: "Fortalecimiento de entornos mediante principios de mínimo privilegio, cifrado en tránsito/reposo y monitoreo continuo de amenazas en la nube.",
    technologies: [
        { name: "Docker Bench", color: "bg-[#58a6ff]" },
        { name: "K8s RBAC", color: "bg-[#58a6ff]" },
        { name: "Terraform", color: "bg-[#a371f7]" },
        { name: "Vault", color: "bg-[#f85149]" },
        { name: "TLS 1.3", color: "bg-[#00FF9D]" },
        { name: "WAF", color: "bg-[#f0883e]" },
    ],
    icon: <ShieldCheck size={24} strokeWidth={1.5} />,
    accentColor: "border-[#00FF9D]",
    accentText: "text-[#00FF9D]",
    bgAccent: "bg-[#00FF9D]/10",
    glowColor: CYBER_THEME.colors.glowGreen,
    status: "INTEGRITY VERIFIED"
};

// Componente Tarjeta Estilo Security Node
const TechCard = ({ data }: { data: typeof appSecurityData }) => {
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

const SecurityHardeningDescription = () => {
    return (
        <section className="relative min-h-screen flex flex-col bg-[#0d1117] border-t border-[#30363d]">

            {/* Patrón de fondo Grid Técnico */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: 'linear-gradient(#8b949e 1px, transparent 1px), linear-gradient(90deg, #8b949e 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Ambient Glow */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-[#f85149]/5 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[#00FF9D]/5 blur-[150px] rounded-full" />

            <div className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-7xl mx-auto w-full">

                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">

                        {/* Visual / Lottie Container */}
                        <div className="relative group">
                            {/* Container estilo Security Terminal */}
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
                                            <ScanLine size={12} className="animate-pulse" />
                                            <span>threat-detection.sys</span>
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
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse" /> SYSTEM_SECURE</span>
                                    <span>LATEST_SCAN: 0_VULNS</span>
                                </div>
                            </div>

                            {/* Efecto de brillo detrás (Glow) */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-[#f85149] to-[#00FF9D] rounded-2xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                        </div>

                        {/* Texto Principal */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#f85149]/30 bg-[#f85149]/10 text-[#f85149] text-xs font-mono uppercase tracking-wider">
                                <Shield size={12} />
                                Zero Trust Architecture
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                                Security & <br />
                                <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#f85149] to-[#f0883e]">
                                    Hardening
                                    <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#f85149] to-[#f0883e] opacity-50 blur-sm" />
                                </span>.
                            </h2>

                            <p className="text-lg text-[#8b949e] leading-relaxed max-w-lg">
                                Integro prácticas de seguridad en cada capa. Protección contra vulnerabilidades, blindaje de infraestructura y monitoreo de amenazas 24/7.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="group flex items-center gap-2 px-6 py-3 bg-[#f85149] text-white text-sm font-semibold rounded-md transition-all shadow-[0_0_10px_rgba(248,81,73,0.1)] hover:shadow-[0_0_20px_rgba(248,81,73,0.3)] active:scale-95">
                                    Iniciar Auditoría
                                    <ServerCrash size={16} className="group-hover:rotate-12 transition-transform" />
                                </button>
                                <button className="group flex items-center gap-2 px-6 py-3 bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] text-sm font-semibold rounded-md transition-all border border-[#30363d] hover:border-[#00FF9D]/50">
                                    <Terminal size={16} className="text-[#00FF9D]" />
                                    Ver Protocolos
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tech Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
                        <TechCard data={appSecurityData} />
                        <TechCard data={infraSecurityData} />
                    </div>

                    {/* Elegant Bottom CTA (Terminal Style) */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-xl border border-[#30363d] bg-[#161b22]/90 backdrop-blur-md p-8 md:p-12 text-center overflow-hidden group">

                            {/* Corner Accents */}
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#f85149]" />
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#00FF9D]" />

                            <div className="absolute top-0 right-0 p-6 opacity-10 transform scale-125 rotate-12">
                                <Shield size={150} strokeWidth={0.5} />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">
                                Confianza en cada línea
                            </h3>
                            <p className="text-[#8b949e] mb-8 max-w-2xl mx-auto relative z-10 leading-relaxed">
                                La seguridad no es una fase final del proyecto; es una responsabilidad continua y fundamental desde el primer commit.
                            </p>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-[#00FF9D] border border-[#30363d] rounded-lg hover:bg-[#00FF9D]/10 hover:border-[#00FF9D] transition-all relative z-10 group"
                            >
                                Solicitar Pentest
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default SecurityHardeningDescription