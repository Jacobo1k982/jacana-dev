'use client'

import React from 'react';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/Developer-Front-End.json';
import { Monitor, Server, CheckCircle, ArrowRight, Terminal } from 'lucide-react';

// Datos refinados
const frontendData = {
    title: "Frontend Moderno",
    description: "Desarrollo interfaces rápidas, accesibles y SEO-friendly. Implemento arquitecturas basadas en componentes (Atomic Design) y patrones reactivos para máxima mantenibilidad.",
    technologies: [
        { name: "React", color: "bg-blue-500" },
        { name: "Next.js 15", color: "bg-white" },
        { name: "TypeScript", color: "bg-blue-600" },
        { name: "Tailwind CSS", color: "bg-cyan-400" },
        { name: "ShadCN/UI", color: "bg-slate-800" },
        { name: "Zod", color: "bg-indigo-600" },
        { name: "TanStack Query", color: "bg-orange-500" },
        { name: "Framer Motion", color: "bg-pink-500" },
    ],
    icon: <Monitor size={28} />,
    accentColor: "border-[#58a6ff]",
    accentText: "text-[#58a6ff]",
    bgAccent: "bg-[#58a6ff]/10",
};

const backendData = {
    title: "Backend Robusto",
    description: "Construcción de APIs REST y GraphQL seguras. Arquitectura limpia (Clean Architecture), manejo de errores, validación de datos con Zod y observabilidad total.",
    technologies: [
        { name: "Node.js", color: "bg-green-600" },
        { name: "Python", color: "bg-yellow-500" },
        { name: "PostgreSQL", color: "bg-blue-700" },
        { name: "Prisma ORM", color: "bg-black dark:bg-white" },
        { name: "Redis", color: "bg-red-600" },
        { name: "NextAuth.js", color: "bg-slate-400" },
        { name: "tRPC", color: "bg-indigo-500" },
        { name: "Docker", color: "bg-blue-500" },
    ],
    icon: <Server size={28} />,
    accentColor: "border-[#8957e5]", // Purple
    accentText: "text-[#a371f7]",
    bgAccent: "bg-[#8957e5]/10",
};

// Componente Tarjeta Estilo GitHub Repo
const TechCard = ({ data }: { data: typeof frontendData }) => {
    return (
        <div className={`
            relative flex flex-col h-full rounded-md border border-[#30363d] bg-[#161b22] 
            transition-all duration-300 hover:border-[#8b949e] hover:shadow-lg
        `}>
            {/* Borde superior de color para identificar la tarjeta */}
            <div className={`h-1 w-full rounded-t-sm ${data.bgAccent.replace('/10', '')} opacity-80`} />

            <div className="p-6 md:p-8 flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
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
                </div>

                {/* Descripción */}
                <p className="text-[#8b949e] text-sm leading-relaxed mb-8 flex-1">
                    {data.description}
                </p>

                {/* Tecnologías estilo GitHub */}
                <div className="space-y-3">
                    <h4 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Tech Stack</h4>
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

const FullStackDescription = () => {
    return (
        <section className="relative min-h-screen flex flex-col bg-[#0d1117] border-t border-[#30363d]">

            {/* Patrón de fondo sutil (Dot Grid) */}
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
                            {/* Container estilo Editor de Código */}
                            <div className="relative rounded-lg border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden">
                                {/* Barra superior falsa */}
                                <div className="flex items-center px-4 py-3 border-b border-[#30363d] bg-[#161b22]">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                    </div>
                                    <div className="ml-4 px-3 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-xs text-[#8b949e] font-mono">
                                        dev-environment
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
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#58a6ff] to-[#8957e5] rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                        </div>

                        {/* Texto Principal */}
                        <div className="space-y-6">

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f0f6fc] tracking-tight leading-[1.1]">
                                Full Stack <br />
                                <span className="text-[#58a6ff]">Engineering</span>.
                            </h2>

                            <p className="text-lg text-[#8b949e] leading-relaxed max-w-lg">
                                Diseño, construyo y despliego aplicaciones completas con un enfoque riguroso en arquitectura limpia, seguridad y experiencia de usuario de alto rendimiento.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                {/* BOTÓN MODIFICADO: Ahora es un enlace a tu portafolio */}
                                <a
                                    href="https://cv-desarrolloweb.netlify.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold rounded-md transition-all border border-transparent focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#0d1117]"
                                >
                                    Ver Portafolio
                                    <ArrowRight size={16} />
                                </a>
                                <button className="flex items-center gap-2 px-6 py-3 bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] text-sm font-semibold rounded-md transition-all border border-[#30363d] hover:border-[#8b949e]">
                                    <Terminal size={16} />
                                    Ver Código
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Tech Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        <TechCard data={frontendData} />
                        <TechCard data={backendData} />
                    </div>

                    {/* Elegant Bottom CTA (Callout Style) */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-md border border-[#30363d] bg-[#161b22] p-8 md:p-12 text-center overflow-hidden">
                            {/* Decoración de fondo */}
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-[#c9d1d9]">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-[#f0f6fc] mb-4 relative z-10">
                                ¿Listo para escalar tu proyecto?
                            </h3>
                            <p className="text-[#8b949e] mb-8 max-w-2xl mx-auto relative z-10">
                                Desde la arquitectura inicial hasta el despliegue final. Entrego código limpio, documentado y optimizado para crecer contigo.
                            </p>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-[#58a6ff] border border-[#30363d] rounded-md hover:bg-[#161b22] hover:border-[#8b949e] hover:text-[#79c0ff] transition-all relative z-10"
                            >
                                Iniciar conversación
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default FullStackDescription