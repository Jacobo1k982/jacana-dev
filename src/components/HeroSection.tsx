'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, GitBranch, ShieldCheck, Zap, ExternalLink } from 'lucide-react';
import Lottie from 'lottie-react';
import WebDevelopmentAnimation from './Lottie/code-dark.json';

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);

    const features = [
        { icon: GitBranch, label: 'Git Workflow', desc: 'Infraestructura robusta de control de versiones' },
        { icon: ShieldCheck, label: 'Enterprise Security', desc: 'Protección de grado bancario y cumplimiento' },
        { icon: Zap, label: 'High Performance', desc: 'Optimización Core Web Vitals al máximo' },
    ];

    const stats = [
        { value: '99.9%', label: 'Uptime' },
        { value: '50ms', label: 'Latency' },
        { value: '100%', label: 'TypeScript' },
    ];

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0d1117] text-[#c9d1d9]">

            {/* Fondo Grid de Puntos (Estilo Técnico) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'radial-gradient(#30363d 1.5px, transparent 1.5px)',
                    backgroundSize: '32px 32px'
                }}
            />

            <div className="relative z-10 max-w-7xl w-full mx-auto pt-10 pb-20">

                <div className="flex flex-col items-center text-center space-y-8 md:space-y-12">

                    {/* Contenedor Principal: Visual + Texto */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">

                        {/* Columna Izquierda: Texto y CTA */}
                        <div className="space-y-8 text-left lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f0f6fc] tracking-tight leading-[1.1]">
                                    Construimos software <br className="hidden lg:block" />
                                    <span className="text-[#58a6ff]">a escala industrial.</span>
                                </h1>
                                <p className="mt-6 text-lg text-[#8b949e] max-w-xl leading-relaxed">
                                    Desarrollamos aplicaciones Full-Stack seguras, escalables y mantenibles.
                                    Arquitectura moderna inspirada en los estándares más altos de la industria.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                className="flex flex-col sm:flex-row gap-4"
                            >
                                <button className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white transition-colors bg-[#238636] hover:bg-[#2ea043] border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#0d1117]">
                                    <Terminal className="w-4 h-4" />
                                    Iniciar Proyecto
                                </button>

                                <button className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#c9d1d9] transition-colors bg-[#161b22] hover:text-white border border-[#30363d] hover:border-[#8b949e] rounded-md">
                                    <ExternalLink className="w-4 h-4" />
                                    Ver Documentación
                                </button>
                            </motion.div>

                            {/* Stats minimalistas */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : {}}
                                transition={{ delay: 0.6 }}
                                className="flex gap-8 pt-6 border-t border-[#21262d]"
                            >
                                {stats.map((stat, i) => (
                                    <div key={i} className="flex flex-col">
                                        <span className="text-2xl font-bold text-[#f0f6fc]">{stat.value}</span>
                                        <span className="text-xs text-[#8b949e] uppercase tracking-wide font-mono">{stat.label}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Columna Derecha: Visual (Terminal + Lottie) */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="relative group"
                        >
                            {/* Contenedor estilo VS Code / GitHub Codespaces */}
                            <div className="relative rounded-md border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden">
                                {/* Barra de titulo */}
                                <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                                    <div className="flex items-center gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                                            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                                        </div>
                                        <div className="ml-4 px-3 py-1 rounded bg-[#0d1117] border border-[#30363d] text-xs text-[#8b949e] font-mono flex items-center gap-2">
                                            <Terminal className="w-3 h-3" /> jacana-cli
                                        </div>
                                    </div>
                                    <div className="flex gap-3 text-[#8b949e]">
                                        {/* CORRECCIÓN APLICADA AQUÍ: className="w-4 h-4 cursor-pointer" */}
                                        <GitBranch className="w-4 h-4 cursor-pointer" />
                                        <ExternalLink className="w-4 h-4 cursor-pointer" />
                                    </div>
                                </div>

                                {/* Cuerpo del editor */}
                                <div className="relative flex min-h-[300px] bg-[#0d1117]">
                                    {/* Sidebar Falso */}
                                    <div className="hidden sm:flex w-12 border-r border-[#21262d] bg-[#0d1117] flex-col items-center py-4 gap-6">
                                        <div className="w-8 h-8 rounded bg-[#21262d] text-[#c9d1d9] flex items-center justify-center">
                                            <Zap className="w-4 h-4" />
                                        </div>
                                    </div>

                                    {/* Área de contenido (Lottie + Code Overlay) */}
                                    <div className="flex-1 p-6 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d1117]/50 to-[#0d1117] z-10 pointer-events-none" />

                                        {/* Líneas de código simuladas */}
                                        <div className="relative z-0 font-mono text-sm space-y-1 opacity-40 pointer-events-none select-none">
                                            <div><span className="text-[#ff7b72]">import</span> {`{ JacanaCore }`} <span className="text-[#ff7b72]">from</span> <span className="text-[#a5d6ff]">'@jacana/core'</span>;</div>
                                            <div className="mt-4"><span className="text-[#8b949e]">// Initializing secure connection...</span></div>
                                            <div><span className="text-[#d2a8ff]">const</span> app = <span className="text-[#ff7b72]">new</span> <span className="text-[#d2a8ff]">JacanaCore</span>({`{`}</div>
                                            <div className="pl-4"><span className="text-[#79c0ff]">mode</span>: <span className="text-[#a5d6ff]">'production'</span>,</div>
                                            <div className="pl-4"><span className="text-[#79c0ff]">optimize</span>: <span className="text-[#79c0ff]">true</span>,</div>
                                            <div className="pl-4"><span className="text-[#79c0ff]">security</span>: <span className="text-[#79c0ff]">'enterprise'</span></div>
                                            <div>{`})`};</div>
                                        </div>

                                        {/* Lottie Animation centrado */}
                                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-80">
                                            <div className="w-48 h-48 sm:w-64 sm:h-64">
                                                <Lottie
                                                    animationData={WebDevelopmentAnimation}
                                                    loop={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Grid de Características (Cards estilo GitHub) */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl"
                    >
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <div
                                    key={i}
                                    className="group relative rounded-md border border-[#30363d] bg-[#161b22] p-6 hover:border-[#8b949e] transition-colors"
                                >
                                    <div className="mb-4 inline-flex p-2 rounded bg-[#0d1117] border border-[#30363d] group-hover:border-[#58a6ff] group-hover:text-[#58a6ff] text-[#8b949e] transition-colors">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-base font-semibold text-[#f0f6fc] mb-2">{feature.label}</h3>
                                    <p className="text-sm text-[#8b949e] leading-relaxed">
                                        {feature.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* CTA Final estilo Footer de Repo */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : {}}
                        transition={{ delay: 1 }}
                        className="w-full max-w-3xl rounded-lg border border-dashed border-[#30363d] bg-[#0d1117]/50 p-8 text-center"
                    >
                        <h4 className="text-[#f0f6fc] font-semibold mb-2">¿Listo para escalar?</h4>
                        <p className="text-sm text-[#8b949e] mb-4">
                            Únete a los desarrolladores que construyen el futuro con nuestra plataforma.
                        </p>
                        <a href="/contact" className="text-sm text-[#58a6ff] hover:underline flex items-center justify-center gap-1">
                            Contactar equipo de ventas <ArrowRight size={14} />
                        </a>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}