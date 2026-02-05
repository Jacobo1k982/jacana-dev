'use client'

import React from 'react';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/UIUX-Designer.json';
import { Layout, Code2, CheckCircle, ArrowRight, PenTool, Monitor } from 'lucide-react';

// Datos refinados
const designData = {
    title: "Diseño Centrado en el Usuario",
    description: "Creación de flujos intuitivos basados en investigación y accesibilidad. Diseño sistemas escalables y valido cada interacción con usuarios reales.",
    technologies: [
        { name: "Figma", color: "bg-purple-500" },
        { name: "User Testing", color: "bg-pink-500" },
        { name: "Wireframing", color: "bg-gray-500" },
        { name: "Design Systems", color: "bg-blue-500" },
        { name: "WCAG 2.2", color: "bg-green-500" },
        { name: "Prototyping", color: "bg-indigo-500" },
    ],
    icon: <Layout size={28} />,
    accentColor: "border-[#8957e5]", // GitHub Purple
    accentText: "text-[#8957e5]",
    bgAccent: "bg-[#8957e5]/10",
};

const implementationData = {
    title: "Implementación Técnica de UI",
    description: "Traducción de diseños en código funcional y accesible. Uso componentes reutilizables, animaciones performantes y patrones de interacción probados.",
    technologies: [
        { name: "React", color: "bg-blue-500" },
        { name: "Next.js", color: "bg-white" },
        { name: "Tailwind CSS", color: "bg-cyan-400" },
        { name: "ShadCN/UI", color: "bg-slate-800" },
        { name: "Framer Motion", color: "bg-pink-500" },
        { name: "Radix UI", color: "bg-indigo-600" },
    ],
    icon: <Code2 size={28} />,
    accentColor: "border-[#db61a2]", // Pink for Implementation
    accentText: "text-[#db61a2]",
    bgAccent: "bg-[#db61a2]/10",
};

// Componente Tarjeta Estilo GitHub (Nativo)
const TechCard = ({ data }: { data: typeof designData }) => {
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
                    <h4 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Tools</h4>
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

const UXUIDescription = () => {
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
                            {/* Container estilo Figma / Design Tool */}
                            <div className="relative rounded-lg border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden">
                                {/* Barra superior falsa */}
                                <div className="flex items-center px-4 py-3 border-b border-[#30363d] bg-[#161b22]">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                    </div>
                                    <div className="ml-4 px-3 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-xs text-[#8b949e] font-mono">
                                        ui-design-preview
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
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#8957e5] to-[#db61a2] rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                        </div>

                        {/* Texto Principal */}
                        <div className="space-y-6"> 

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f0f6fc] tracking-tight leading-[1.1]">
                                Technical <br />
                                <span className="text-[#8957e5]">UX / UI</span>.
                            </h2>

                            <p className="text-lg text-[#8b949e] leading-relaxed max-w-lg">
                                Combino empatía por el usuario con rigor técnico para crear interfaces que no solo se ven bien, sino que funcionan perfectamente y son accesibles para todos.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="flex items-center gap-2 px-6 py-3 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold rounded-md transition-all border border-transparent focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#0d1117]">
                                    Ver Prototipos
                                    <Monitor size={16} />
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] text-sm font-semibold rounded-md transition-all border border-[#30363d] hover:border-[#8b949e]">
                                    <PenTool size={16} />
                                    Design System
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Tech Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        <TechCard data={designData} />
                        <TechCard data={implementationData} />
                    </div>

                    {/* Elegant Bottom CTA (Alert/Note Style) */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-md border border-[#30363d] bg-[#161b22] p-8 md:p-12 text-center overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10 transform scale-150 -rotate-12">
                                <PenTool size={200} strokeWidth={1} />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-[#f0f6fc] mb-4 relative z-10">
                                Diseño que se siente natural
                            </h3>
                            <p className="text-[#8b949e] mb-8 max-w-2xl mx-auto relative z-10">
                                El mejor diseño es el que nadie nota porque simplemente funciona. Un equilibrio perfecto entre estética y funcionalidad técnica.
                            </p>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-[#58a6ff] border border-[#30363d] rounded-md hover:bg-[#161b22] hover:border-[#8b949e] hover:text-[#79c0ff] transition-all relative z-10"
                            >
                                Proyecto UI/UX
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default UXUIDescription