'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Terminal, GitBranch, ShieldCheck, Zap, ExternalLink, Code2, Sparkles } from 'lucide-react';
import Lottie from 'lottie-react';
import Link from 'next/link';
import WebDevelopmentAnimation from '@/components/Lottie/code-dark.json';

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width);
            const y = ((e.clientY - rect.top) / rect.height);
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
        },
    };

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0d1117] text-[#e6edf3]"
        >
            {/* VIDEO DE FONDO */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-30"
                src="/video/medium.mp4"
            >
                Tu navegador no soporta video HTML5.
            </video>

            {/* OVERLAY GRADIENTE */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-br from-[#0d1117] via-[#0d1117]/80 to-transparent pointer-events-none" />

            {/* Mouse Spotlight Gradient */}
            <motion.div
                className="absolute z-[1] pointer-events-none opacity-40"
                style={{
                    left: `${mousePosition.x * 100}%`,
                    top: `${mousePosition.y * 100}%`,
                    width: '800px',
                    height: '800px',
                    background: 'radial-gradient(circle, rgba(56, 139, 253, 0.15) 0%, transparent 60%)',
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Grid Pattern */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                    backgroundSize: '50px 50px',
                }}
            />

            {/* CONTENT */}
            <motion.div
                style={{ y }}
                className="relative z-20 max-w-7xl w-full mx-auto pt-10 pb-20"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="flex flex-col items-center text-center"
                >
                    {/* Top Badge */}
                    <motion.div variants={itemVariants} className="mb-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#30363d] bg-[#161b22]/60 backdrop-blur-md text-xs font-medium text-[#8b949e]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3fb950]"></span>
                            </span>
                            Plataforma Enterprise lista para producción
                        </div>
                    </motion.div>

                    {/* SPLIT LAYOUT: TERMINAL & LOTTIE */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6"
                    >
                    </motion.div>
                    {/* Lottie Area */}
                    <Lottie
                        animationData={WebDevelopmentAnimation}
                        loop={true}
                        className="w-4/5 h-4/5"
                    />
                    {/* Main Headline */}
                    <motion.div variants={itemVariants} className="mb-6">
                        <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-bold tracking-tighter leading-[1.05]">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#8b949e]">
                                Construye el futuro,
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-[#0852c9] to-[#020d62] bg-clip-text text-transparent">
                                sin fricción.
                            </span>
                        </h1>
                    </motion.div>

                    {/* Subheadline */}
                    <motion.p
                        variants={itemVariants}
                        className="text-lg sm:text-xl text-[#8b949e] max-w-2xl mb-10 leading-relaxed"
                    >
                        Infraestructura de código a producción. Diseñado para equipos que exigen
                        <span className="text-[#e6edf3] font-medium"> rendimiento </span>,
                        seguridad y flujo de trabajo integrado.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 mb-16"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white transition-all bg-gradient-to-b from-[#3fb950] to-[#238636] rounded-lg border border-[#2ea043] shadow-[0_0_15px_-3px_rgba(63,185,80,0.4)] hover:shadow-[#3fb950]/40 overflow-hidden"
                        >
                            <span className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/10" />
                            <Terminal className="w-4 h-4" />
                            Iniciar Proyecto
                            <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </motion.button>

                        <Link
                            href="/docs"
                            className="group flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-[#e6edf3] bg-[#21262d]/80 hover:bg-[#30363d] rounded-lg border border-[#30363d] backdrop-blur-sm transition-colors"
                        >
                            <ExternalLink className="w-4 h-4 text-[#8b949e] group-hover:text-[#58a6ff] transition-colors" />
                            Ver Documentación
                        </Link>
                    </motion.div>

                    {/* FOOTER FEATURES */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-[#21262d] pt-8 w-full max-w-5xl"
                    >
                        {[
                            { label: 'Latencia Ultra Baja', icon: Zap },
                            { label: 'SSL por Defecto', icon: ShieldCheck },
                            { label: 'CI/CD Integrado', icon: GitBranch },
                            { label: '100% TypeScript', icon: Code2 },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 1 + i * 0.1 }}
                                className="flex items-center gap-2 text-[#8b949e] text-xs sm:text-sm justify-center md:justify-start group cursor-default"
                            >
                                <item.icon className="w-4 h-4 text-[#3fb950] transition-colors group-hover:text-[#58a6ff]" />
                                <span>{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                </motion.div>
            </motion.div>
        </section>
    );
}