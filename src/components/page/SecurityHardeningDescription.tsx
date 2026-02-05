'use client'

import React from 'react';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/Data-Security.json';
import { Lock, ShieldCheck, CheckCircle, ArrowRight, Shield, ServerCrash } from 'lucide-react';

// Datos refinados
const appSecurityData = {
    title: "Seguridad en la Aplicación",
    description: "Protección activa contra vulnerabilidades OWASP Top 10. Implemento validación estricta, autenticación robusta y manejo seguro de secrets para blindar el código.",
    technologies: [
        { name: "OWASP Top 10", color: "bg-red-600" },
        { name: "JWT/OAuth 2.0", color: "bg-blue-500" },
        { name: "Helmet.js", color: "bg-gray-500" },
        { name: "CSP", color: "bg-purple-500" },
        { name: "Argon2", color: "bg-red-500" },
        { name: "Rate Limiting", color: "bg-orange-500" },
    ],
    icon: <Lock size={28} />,
    accentColor: "border-[#f85149]", // GitHub Red
    accentText: "text-[#f85149]",
    bgAccent: "bg-[#f85149]/10",
};

const infraSecurityData = {
    title: "Hardening de Infraestructura",
    description: "Fortalecimiento de entornos mediante principios de mínimo privilegio, cifrado en tránsito/reposo y monitoreo continuo de amenazas en la nube.",
    technologies: [
        { name: "Docker Bench", color: "bg-blue-500" },
        { name: "K8s RBAC", color: "bg-blue-600" },
        { name: "Terraform Sentinel", color: "bg-purple-600" },
        { name: "Vault", color: "bg-red-500" },
        { name: "TLS 1.3", color: "bg-green-500" },
        { name: "WAF", color: "bg-orange-500" },
    ],
    icon: <ShieldCheck size={28} />,
    accentColor: "border-[#3fb950]", // GitHub Green
    accentText: "text-[#3fb950]",
    bgAccent: "bg-[#3fb950]/10",
};

// Componente Tarjeta Estilo GitHub (Nativo)
const TechCard = ({ data }: { data: typeof appSecurityData }) => {
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
                    <h4 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Tools & Protocols</h4>
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

const SecurityHardeningDescription = () => {
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
                            {/* Container estilo Monitor de Seguridad */}
                            <div className="relative rounded-lg border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden">
                                {/* Barra superior falsa con estado de seguridad */}
                                <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d] bg-[#161b22]">
                                    <div className="flex items-center gap-3">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                        </div>
                                        <div className="ml-4 px-3 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-xs text-[#8b949e] font-mono">
                                            security-monitor
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-[#3fb950] font-mono">
                                        <div className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
                                        SECURE
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
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#f85149] to-[#3fb950] rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                        </div>

                        {/* Texto Principal */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f85149]/10 border border-[#f85149]/30 text-[#f85149] text-xs font-medium">
                                <CheckCircle size={12} />
                                Secure by Design
                            </div>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f0f6fc] tracking-tight leading-[1.1]">
                                Security & <br />
                                <span className="text-[#f85149]">Hardening</span>.
                            </h2>

                            <p className="text-lg text-[#8b949e] leading-relaxed max-w-lg">
                                Integro prácticas de seguridad en cada capa. Protección contra vulnerabilidades, blindaje de infraestructura y monitoreo de amenazas 24/7.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="flex items-center gap-2 px-6 py-3 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold rounded-md transition-all border border-transparent focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#0d1117]">
                                    Auditoría
                                    <ServerCrash size={16} />
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] text-sm font-semibold rounded-md transition-all border border-[#30363d] hover:border-[#8b949e]">
                                    <Shield size={16} />
                                    Protocolos
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tech Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        <TechCard data={appSecurityData} />
                        <TechCard data={infraSecurityData} />
                    </div>

                    {/* Elegant Bottom CTA (Alert/Note Style) */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-md border border-[#30363d] bg-[#161b22] p-8 md:p-12 text-center overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 transform rotate-12">
                                <Shield size={200} strokeWidth={1} />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-[#f0f6fc] mb-4 relative z-10">
                                Confianza en cada línea
                            </h3>
                            <p className="text-[#8b949e] mb-8 max-w-2xl mx-auto relative z-10">
                                La seguridad no es una fase final del proyecto; es una responsabilidad continua y fundamental desde el primer commit.
                            </p>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-[#58a6ff] border border-[#30363d] rounded-md hover:bg-[#161b22] hover:border-[#8b949e] hover:text-[#79c0ff] transition-all relative z-10"
                            >
                                Solicitar Pentest
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default SecurityHardeningDescription