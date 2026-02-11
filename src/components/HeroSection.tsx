'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, GitBranch, ShieldCheck, Zap, ExternalLink } from 'lucide-react';
import Lottie from 'lottie-react';
import WebDevelopmentAnimation from './Lottie/code-dark.json';
import Link from 'next/link';

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

            {/* ── VIDEO DE FONDO (HERO VIDEO) ──────────────────────────────────────────────── */}
            {/* Nota: Asegúrate de que el video sea oscuro para mantener la legibilidad.
                  muted es obligatorio para que funcione autoplay en la mayoría de navegadores. */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
                // CAMBIA ESTA RUTA A TU ARCHIVO DE VIDEO
                src="/video/medium.mp4"
            >
                Tu navegador no soporta video HTML5.
            </video>

            {/* ── OVERLAY CRÍTICO (Para que el texto se lea bien) ──────────────────────────────── */}
            {/* Gradiente que oscurece el video, especialmente en la izquierda donde está el texto */}
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#0d1117] via-[#0d1117]/80 to-transparent pointer-events-none" />

            <div className="relative z-20 max-w-7xl w-full mx-auto pt-10 pb-20">

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
                                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f0f6fc] tracking-tight leading-[1.1] drop-shadow-sm">
                                    Construimos software <br className="hidden lg:block" />
                                    <span className="text-[#58a6ff]">a escala industrial.</span>
                                </h1>
                                <p className="mt-6 text-lg text-[#8b949e] max-w-xl leading-relaxed drop-shadow-md">
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
                                <button className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-white transition-colors bg-[#238636] hover:bg-[#2ea043] border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#0d1117] shadow-lg hover:shadow-emerald-900/20">
                                    <Terminal className="w-4 h-4" />
                                    Iniciar Proyecto
                                </button>

                                <Link
                                    href="/docs"
                                    className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#c9d1d9] transition-colors bg-[#161b22] hover:text-white border border-[#30363d] hover:border-[#8b949e] rounded-md backdrop-blur-md">
                                    <ExternalLink className="w-4 h-4" />
                                    Ver Documentación
                                </Link>
                            </motion.div>

                            {/* Stats minimalistas con fondo sutil para legibilidad sobre video */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={isVisible ? { opacity: 1 } : {}}
                                transition={{ delay: 0.6 }}
                                className="flex gap-8 pt-6 border-t border-[#30363d]/50"
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
                        {/* Nota: He añadido un fondo más oscuro al Terminal para que destaque sobre el video de fondo */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="relative group"
                        >
                            {/* Contenedor estilo VS Code / GitHub Codespaces */}
                            <div className="relative rounded-md border border-[#30363d] bg-[#0d1117] shadow-2xl overflow-hidden backdrop-blur-xl">
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

                    {/* Grid de Características (Cards estilo GitHub con fondo semisólido para legibilidad) */}
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
                                    className="group relative rounded-md border border-[#30363d] bg-[#161b22]/90 p-6 hover:border-[#8b949e] transition-colors backdrop-blur-md"
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

                    {/* CTA Final estilo Footer de Repo con fondo legible */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : {}}
                        transition={{ delay: 1 }}
                        className="w-full max-w-3xl rounded-lg border border-dashed border-[#30363d] bg-[#0d1117]/80 p-8 text-center backdrop-blur-md"
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