'use client'

import React from 'react';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/digital-marketing.json';
import { GitMerge, Server, CheckCircle, ArrowRight, Cpu, Layers } from 'lucide-react';

// Datos refinados
const ciCdData = {
    title: "CI/CD Moderno",
    description: "Automatización de pipelines de integración y entrega continua. Cada commit se prueba, construye, escanea y despliega de forma confiable, rápida y segura.",
    technologies: [
        { name: "GitHub Actions", color: "bg-blue-500" },
        { name: "GitLab CI", color: "bg-orange-500" },
        { name: "CircleCI", color: "bg-white" },
        { name: "Argo CD", color: "bg-orange-600" },
        { name: "Docker", color: "bg-blue-400" },
        { name: "Terraform", color: "bg-purple-600" },
    ],
    icon: <GitMerge size={28} />,
    accentColor: "border-[#58a6ff]", // Blue for CI
    accentText: "text-[#58a6ff]",
    bgAccent: "bg-[#58a6ff]/10",
};

const infraData = {
    title: "Infraestructura como Código",
    description: "Gestión de entornos escalables y seguros mediante IaC, contenedores y orquestación. Entornos reproducibles versionados desde cero en minutos.",
    technologies: [
        { name: "Docker", color: "bg-blue-500" },
        { name: "Kubernetes", color: "bg-blue-600" },
        { name: "AWS", color: "bg-yellow-500" },
        { name: "Azure", color: "bg-blue-400" },
        { name: "Helm", color: "bg-cyan-500" },
        { name: "Terraform", color: "bg-purple-600" },
    ],
    icon: <Layers size={28} />,
    accentColor: "border-[#d29922]", // Orange/Amber for Infra
    accentText: "text-[#d29922]",
    bgAccent: "bg-[#d29922]/10",
};

// Componente Tarjeta Estilo GitHub
const TechCard = ({ data }: { data: typeof ciCdData }) => {
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
                    <h4 className="text-xs font-semibold text-[#8b949e] uppercase tracking-wider">Stack & Tools</h4>
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

const DevOpsCICDDescription = () => {
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center mb-24">

                        {/* Visual / Lottie Container */}
                        <div className="relative group">
                            {/* Container estilo Pipeline / Workflow */}
                            <div className="relative rounded-lg border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden">
                                {/* Barra superior falsa */}
                                <div className="flex items-center px-4 py-3 border-b border-[#30363d] bg-[#161b22]">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                        <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                    </div>
                                    <div className="ml-4 px-3 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-xs text-[#8b949e] font-mono">
                                        workflow-runner
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
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#58a6ff] to-[#d29922] rounded-lg blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 -z-10" />
                        </div>

                        {/* Texto Principal */}
                        <div className="space-y-6">

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#f0f6fc] tracking-tight leading-[1.1]">
                                DevOps & <br />
                                <span className="text-[#58a6ff]">CI/CD</span>.
                            </h2>

                            <p className="text-lg text-[#8b949e] leading-relaxed max-w-lg">
                                Automatizo el ciclo de vida completo del software. Del commit al despliegue, garantizando calidad, seguridad y velocidad de entrega.
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <button className="flex items-center gap-2 px-6 py-3 bg-[#238636] hover:bg-[#2ea043] text-white text-sm font-semibold rounded-md transition-all border border-transparent focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#0d1117]">
                                    Ver Pipeline
                                    <Cpu size={16} />
                                </button>
                                <button className="flex items-center gap-2 px-6 py-3 bg-[#161b22] hover:bg-[#21262d] text-[#c9d1d9] text-sm font-semibold rounded-md transition-all border border-[#30363d] hover:border-[#8b949e]">
                                    Documentación
                                </button>
                            </div>
                        </div>


                    </div>

                    {/* Tech Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
                        <TechCard data={ciCdData} />
                        <TechCard data={infraData} />
                    </div>

                    {/* Elegant Bottom CTA (Alert/Note Style) */}
                    <div className="max-w-4xl mx-auto">
                        <div className="relative rounded-md border border-[#30363d] bg-[#161b22] p-8 md:p-12 text-center overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Server size={200} strokeWidth={1} />
                            </div>

                            <h3 className="text-2xl md:text-3xl font-bold text-[#f0f6fc] mb-4 relative z-10">
                                Automatización Inteligente
                            </h3>
                            <p className="text-[#8b949e] mb-8 max-w-2xl mx-auto relative z-10">
                                No solo scripts, sino sistemas resilientes. Infraestructura reproducible y despliegues seguros con código.
                            </p>

                            <a
                                href="/contact"
                                className="inline-flex items-center gap-2 px-8 py-3 text-sm font-semibold text-[#58a6ff] border border-[#30363d] rounded-md hover:bg-[#161b22] hover:border-[#8b949e] hover:text-[#79c0ff] transition-all relative z-10"
                            >
                                Consultar Arquitectura
                                <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default DevOpsCICDDescription