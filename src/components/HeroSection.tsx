'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, GitBranch, ShieldCheck, Zap, ExternalLink, Code2, Rocket, Sparkles, Star } from 'lucide-react';
import Lottie from 'lottie-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import WebDevelopmentAnimation from '@/components/Lottie/code-dark.json';

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isClient, setIsClient] = useState(false);
    const heroRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 150]);

    // Set isClient to true when component mounts on client
    useEffect(() => {
        setIsClient(true);
    }, []);

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

    // Mouse parallax effect
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!heroRef.current) return;
            const rect = heroRef.current.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
            },
        },
    };

    const glowVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut",
            },
        },
    };

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0d1117] text-[#c9d1d9]"
        >
            {/* ── VIDEO DE FONDO ──────────────────────────────────────────────── */}
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

            {/* ── OVERLAY MEJORADO CON GRADIENTE ──────────────────────────────────── */}
            <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#0d1117] via-[#0d1117]/90 to-[#0d1117]/70 pointer-events-none" />

            {/* ── GLOW EFFECTS ANIMADOS ───────────────────────────────────────────── */}
            <motion.div
                variants={glowVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="absolute top-20 left-1/4 w-96 h-96 bg-[#58a6ff]/20 rounded-full blur-[120px] z-10 pointer-events-none"
                style={{
                    x: mousePosition.x * 30,
                    y: mousePosition.y * 30,
                }}
            />
            <motion.div
                variants={glowVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                transition={{ delay: 0.3 }}
                className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#238636]/15 rounded-full blur-[120px] z-10 pointer-events-none"
                style={{
                    x: mousePosition.x * -20,
                    y: mousePosition.y * -20,
                }}
            />

            {/* ── GRID PATTERN OVERLAY ───────────────────────────────────────────── */}
            <div
                className="absolute inset-0 z-10 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                }}
            />

            {/* ── PARTICLES FLOTANTES ─────────────────────────────────────────────── */}
            {isClient && (
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-[#58a6ff] rounded-full"
                            initial={{
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                                opacity: 0,
                            }}
                            animate={{
                                y: [null, -100 - Math.random() * 200],
                                opacity: [0, 1, 0],
                            }}
                            transition={{
                                duration: 4 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 4,
                                ease: "linear",
                            }}
                            style={{
                                left: `${Math.random() * 100}%`,
                                bottom: -20,
                            }}
                        />
                    ))}
                </div>
            )}

            <motion.div
                style={{ y }}
                className="relative z-20 max-w-7xl w-full mx-auto pt-10 pb-20"
            >
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                    className="flex flex-col items-center text-center space-y-8 md:space-y-12"
                >
                    {/* Badge con animación */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#161b22]/80 border border-[#30363d]/50 backdrop-blur-sm"
                    >
                        <Sparkles className="w-4 h-4 text-[#58a6ff]" />
                        <span className="text-sm text-[#8b949e]">
                            Potencia industrial para proyectos ambiciosos
                        </span>
                        <Star className="w-4 h-4 text-[#e3b341] fill-[#e3b341]" />
                    </motion.div>

                    {/* Contenedor Principal */}
                    <div className="w-full">
                        {/* Título y descripción */}
                        <motion.div variants={itemVariants} className="text-center max-w-4xl mx-auto space-y-8 mb-12">
                            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#f0f6fc] tracking-tight leading-[1.05]">
                                Construimos{' '}
                                <span className="relative inline-block">
                                    <span className="relative z-10 bg-gradient-to-r from-[#58a6ff] to-[#238636] bg-clip-text text-transparent">
                                        software
                                    </span>
                                    <motion.span
                                        className="absolute bottom-0 left-0 w-full h-3 bg-[#58a6ff]/20 -skew-x-12"
                                        initial={{ scaleX: 0 }}
                                        animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
                                        transition={{ duration: 0.8, delay: 0.6 }}
                                    />
                                </span>
                                <br className="hidden lg:block" />
                                a escala{' '}
                                <span className="text-[#238636]">industrial.</span>
                            </h1>
                            <p className="text-lg sm:text-xl text-[#8b949e] max-w-2xl mx-auto leading-relaxed">
                                Desarrollamos aplicaciones Full-Stack seguras, escalables y mantenibles.
                                Arquitectura moderna inspirada en los estándares más altos de la industria.
                            </p>
                        </motion.div>

                        {/* Botones CTA */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
                        >
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-white transition-all bg-gradient-to-r from-[#238636] to-[#2ea043] hover:from-[#2ea043] hover:to-[#3fb950] rounded-lg shadow-lg shadow-[#238636]/25 hover:shadow-[#238636]/40 overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                                <Terminal className="w-4 h-4" />
                                Iniciar Proyecto
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href="/docs"
                                    className="group flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold text-[#c9d1d9] transition-all bg-[#161b22]/80 hover:bg-[#1c2128] border border-[#30363d] hover:border-[#8b949e] rounded-lg backdrop-blur-sm"
                                >
                                    <ExternalLink className="w-4 h-4 group-hover:text-[#58a6ff] transition-colors" />
                                    Ver Documentación
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Grid de dos columnas: Terminal y Lottie */}
                        <motion.div
                            variants={itemVariants}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl mx-auto"
                        >
                            {/* Terminal VS Code */}
                            <div className="relative group">
                                {/* Glow detrás del terminal */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-[#58a6ff]/20 to-[#238636]/20 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />

                                {/* Contenedor estilo VS Code mejorado */}
                                <div className="relative rounded-xl border border-[#30363d] bg-[#0d1117]/95 shadow-2xl overflow-hidden backdrop-blur-xl h-full">
                                    {/* Barra de título mejorada */}
                                    <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff7b7b] transition-colors cursor-pointer" />
                                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffc93c] transition-colors cursor-pointer" />
                                                <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#4ade80] transition-colors cursor-pointer" />
                                            </div>
                                            <div className="ml-6 px-4 py-1.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-xs text-[#8b949e] font-mono flex items-center gap-2 shadow-inner">
                                                <Terminal className="w-3.5 h-3.5" />
                                                <span className="text-[#58a6ff]">jacana-cli</span>
                                                <span className="text-[#30363d]">—</span>
                                                <span>zsh</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 text-[#8b949e]">
                                            <GitBranch className="w-4 h-4 cursor-pointer hover:text-[#58a6ff] transition-colors" />
                                            <ExternalLink className="w-4 h-4 cursor-pointer hover:text-[#58a6ff] transition-colors" />
                                        </div>
                                    </div>

                                    {/* Cuerpo del editor con código animado */}
                                    <div className="relative flex min-h-[280px] bg-[#0d1117]">
                                        {/* Sidebar mejorado */}
                                        <div className="hidden sm:flex w-14 border-r border-[#21262d] bg-[#0d1117] flex-col items-center py-4 gap-4">
                                            {[
                                                { icon: Files, color: 'text-[#8b949e]' },
                                                { icon: Search, color: 'text-[#8b949e]' },
                                                { icon: GitBranch, color: 'text-[#8b949e]' },
                                                { icon: Zap, color: 'text-[#58a6ff]' },
                                            ].map((item, i) => (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ scale: 1.1 }}
                                                    className="w-10 h-10 rounded-lg bg-[#21262d] text-[#c9d1d9] flex items-center justify-center cursor-pointer transition-all hover:bg-[#30363d]"
                                                >
                                                    <item.icon className="w-5 h-5" />
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Área de código con animación */}
                                        <div className="flex-1 p-6 relative overflow-hidden">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={isVisible ? { opacity: 1 } : {}}
                                                transition={{ delay: 1, duration: 0.5 }}
                                                className="font-mono text-sm space-y-2"
                                            >
                                                {[
                                                    { text: '> jacana init --fullstack', color: 'text-[#58a6ff]', delay: 0 },
                                                    { text: '✓ Initializing project structure...', color: 'text-[#238636]', delay: 100 },
                                                    { text: '✓ Setting up TypeScript config...', color: 'text-[#238636]', delay: 200 },
                                                    { text: '✓ Configuring Prisma database...', color: 'text-[#238636]', delay: 300 },
                                                    { text: '✓ Installing dependencies...', color: 'text-[#238636]', delay: 400 },
                                                    { text: '⚡ Your project is ready!', color: 'text-[#e3b341]', delay: 500 },
                                                    { text: '> ', color: 'text-[#c9d1d9]', delay: 600, cursor: true },
                                                ].map((line, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                                        transition={{ delay: 1 + (line.delay || 0) / 1000, duration: 0.3 }}
                                                        className={cn('flex items-center gap-2', line.color)}
                                                    >
                                                        {line.cursor && (
                                                            <motion.span
                                                                animate={{ opacity: [1, 0] }}
                                                                transition={{ duration: 0.8, repeat: Infinity }}
                                                                className="w-2 h-5 bg-[#58a6ff]"
                                                            />
                                                        )}
                                                        <span>{line.text}</span>
                                                    </motion.div>
                                                ))}
                                            </motion.div>

                                            {/* Decorative elements */}
                                            <motion.div
                                                className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#238636]/20 border border-[#238636]/30 text-[#238636] text-xs font-medium"
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                                transition={{ delay: 1.5 }}
                                            >
                                                <Rocket className="w-3 h-3 inline mr-1" />
                                                Production Ready
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating badge */}
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 1.4, duration: 0.5 }}
                                    className="absolute -left-4 bottom-1/4 px-4 py-2 rounded-lg bg-[#161b22]/95 border border-[#30363d] shadow-xl backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4 text-[#238636]" />
                                        <span className="text-xs text-[#8b949e]">Secured</span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Lottie Animation Container */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="relative group h-full"
                            >
                                {/* Glow detrás del Lottie */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-br from-[#238636]/20 to-[#58a6ff]/20 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                />

                                {/* Contenedor del Lottie */}
                                <div className="relative rounded-xl border border-[#30363d] bg-[#0d1117]/95 shadow-2xl overflow-hidden backdrop-blur-xl h-full min-h-[340px] flex items-center justify-center">
                                    {/* Barra de título estilo editor */}
                                    <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                                        <div className="flex items-center gap-2">
                                            <div className="flex gap-2">
                                                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                                                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                                            </div>
                                            <div className="ml-6 px-4 py-1.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-xs text-[#8b949e] font-mono flex items-center gap-2 shadow-inner">
                                                <Code2 className="w-3.5 h-3.5" />
                                                <span className="text-[#58a6ff]">animation</span>
                                                <span className="text-[#30363d]">—</span>
                                                <span>preview</span>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 text-[#8b949e]">
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                className="cursor-pointer hover:text-[#58a6ff] transition-colors"
                                            >
                                                <GitBranch className="w-4 h-4" />
                                            </motion.div>
                                            <motion.div
                                                whileHover={{ scale: 1.1 }}
                                                className="cursor-pointer hover:text-[#58a6ff] transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </motion.div>
                                        </div>
                                    </div>

                                    {/* Área del Lottie */}
                                    <div className="relative w-full h-full pt-14 pb-6 px-6 flex items-center justify-center">
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Lottie
                                                animationData={WebDevelopmentAnimation}
                                                loop={true}
                                                className="w-full h-full max-h-[280px]"
                                            />
                                        </div>
                                    </div>

                                    {/* Decorative badge */}
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 1.6 }}
                                        className="absolute top-16 right-4 px-3 py-1 rounded-full bg-[#58a6ff]/20 border border-[#58a6ff]/30 text-[#58a6ff] text-xs font-medium"
                                    >
                                        <Sparkles className="w-3 h-3 inline mr-1" />
                                        Interactive
                                    </motion.div>
                                </div>

                                {/* Floating badge */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                                    transition={{ delay: 1.2, duration: 0.5 }}
                                    className="absolute -right-4 top-1/4 px-4 py-2 rounded-lg bg-[#161b22]/95 border border-[#30363d] shadow-xl backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full bg-[#238636] animate-pulse" />
                                        <span className="text-xs text-[#8b949e]">Live Preview</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        {/* Stats mejorados */}
                        <motion.div
                            variants={itemVariants}
                            className="flex gap-8 sm:gap-12 pt-12 justify-center border-t border-[#30363d]/50"
                        >
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                    className="flex flex-col"
                                >
                                    <span className="text-3xl sm:text-4xl font-bold text-[#f0f6fc]">
                                        {stat.value}
                                    </span>
                                    <span className="text-xs text-[#8b949e] uppercase tracking-widest font-mono mt-1">
                                        {stat.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Grid de Características mejorado */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
                    >
                        {features.map((feature, i) => {
                            const Icon = feature.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.9 + i * 0.1 }}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    className="group relative rounded-xl border border-[#30363d] bg-[#161b22]/90 p-6 hover:border-[#58a6ff]/50 transition-all duration-300 backdrop-blur-md overflow-hidden"
                                >
                                    {/* Hover glow effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-[#58a6ff]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                    <div className="relative z-10">
                                        <motion.div
                                            className="mb-4 inline-flex p-3 rounded-xl bg-[#0d1117] border border-[#30363d] group-hover:border-[#58a6ff]/50 group-hover:text-[#58a6ff] text-[#8b949e] transition-all duration-300"
                                            whileHover={{ rotate: [0, -5, 5, 0] }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <Icon size={24} />
                                        </motion.div>
                                        <h3 className="text-lg font-semibold text-[#f0f6fc] mb-2">
                                            {feature.label}
                                        </h3>
                                        <p className="text-sm text-[#8b949e] leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* CTA Final mejorado */}
                    <motion.div
                        variants={itemVariants}
                        className="w-full max-w-3xl relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-[#58a6ff]/20 to-[#238636]/20 rounded-2xl blur-2xl opacity-50" />
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="relative rounded-2xl border border-[#30363d]/70 bg-[#0d1117]/90 p-8 sm:p-10 text-center backdrop-blur-xl shadow-2xl overflow-hidden"
                        >
                            {/* Animated gradient border */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#58a6ff]/20 via-transparent to-[#238636]/20" />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-[#58a6ff]/20 via-transparent to-[#238636]/20"
                                animate={{
                                    x: ['0%', '200%'],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            <div className="relative z-10">
                                <h4 className="text-2xl sm:text-3xl font-bold text-[#f0f6fc] mb-3">
                                    ¿Listo para escalar?
                                </h4>
                                <p className="text-[#8b949e] mb-6 max-w-xl mx-auto">
                                    Únete a los desarrolladores que construyen el futuro con nuestra plataforma
                                    enterprise-grade.
                                </p>
                                <motion.a
                                    href="/contact"
                                    whileHover={{ x: 4 }}
                                    className="inline-flex items-center gap-2 text-[#58a6ff] hover:text-[#79c0ff] font-medium transition-colors group"
                                >
                                    Contactar equipo de ventas
                                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                </motion.a>
                            </div>
                        </motion.div>
                    </motion.div>

                </motion.div>
            </motion.div>
        </section>
    );
}

// Iconos adicionales para el sidebar
function Files({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    );
}

function Search({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
        </svg>
    );
}
