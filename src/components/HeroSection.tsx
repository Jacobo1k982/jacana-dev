'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Code2, Globe, Shield } from 'lucide-react';
import Lottie from 'lottie-react';
import WebDevelopmentAnimation from './Lottie/code-dark.json';

export default function HeroSection() {
    const [isVisible, setIsVisible] = useState(false);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 50, stiffness: 300 };
    const rotateX = useSpring(useTransform(mouseY, [-1, 1], [4, -4]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-6, 6]), springConfig);

    const tabs = [
        { icon: Code2, label: 'Desarrollo Web', desc: 'Aplicaciones escalables y de alto rendimiento' },
        { icon: Globe, label: 'E-commerce', desc: 'Experiencias de compra conversion-focused' },
        { icon: Shield, label: 'Seguridad', desc: 'Protección avanzada y cumplimiento normativo' },
        { icon: Rocket, label: 'Innovación', desc: 'Soluciones impulsadas por IA y edge computing' },
    ];

    const stats = [
        { value: '5+', label: 'Proyectos Completados' },
        { value: '98%', label: 'Tasa de Satisfacción' },
        { value: '5+', label: 'Expertos Senior' },
        { value: '24/7', label: 'Soporte Dedicado' },
    ];

    useEffect(() => {
        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouseX.set((clientX - centerX) / centerX);
            mouseY.set((clientY - centerY) / centerY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <section className="relative min-h-screen flex items-center justify-center px-5 sm:px-8 lg:px-12 overflow-hidden bg-slate-950">
            {/* Fondo sutil glassmorphism + grid muy tenue */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.08)_0%,transparent_60%)]" />
                <div className="absolute inset-0 bg-grid-slate-800/30 bg-[size:60px_60px]" />
            </div>

            <div className="relative z-10 max-w-7xl w-full mx-auto text-center py-16 md:py-24 lg:py-32">
                {/* Badge premium */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-sm font-medium text-cyan-300/90 mb-10"
                >
                    <Sparkles className="w-4 h-4" />
                    Soluciones Digitales Impulsadas por IA
                </motion.div>

                {/* Lottie con efecto tilt sutil y glow */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="relative max-w-sm sm:max-w-md md:max-w-lg mx-auto mb-12 md:mb-16"
                    style={{ perspective: 1200 }}
                >
                    <motion.div
                        style={{ rotateX, rotateY }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-transparent rounded-3xl blur-2xl opacity-70" />
                        <div className="absolute inset-4 backdrop-blur-sm bg-white/2 rounded-3xl border border-white/5" />
                        <Lottie
                            animationData={WebDevelopmentAnimation}
                            loop
                            autoplay
                            className="relative z-10 drop-shadow-2xl"
                        />
                    </motion.div>
                </motion.div>

                {/* Título grande – tipografía hero 2026 */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-none mb-6"
                >
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-white to-slate-300">
                        Construimos el
                    </span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 animate-gradient-x">
                        Futuro Digital
                    </span>
                </motion.h1>

                {/* Subtítulo serio y confiable */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.7 }}
                    className="text-lg md:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-12"
                >
                    En <span className="text-white font-semibold">JACANA DEV</span> transformamos visión estratégica en productos digitales
                    de alto impacto, con arquitectura moderna, seguridad enterprise y rendimiento extremo.
                </motion.p>

                {/* CTA principal – más limpio y premium */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.9 }}
                    className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
                >
                    <button className="group relative px-10 py-5 rounded-xl font-semibold text-white overflow-hidden transition-all duration-500 hover:scale-[1.03] active:scale-95">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-teal-600 to-emerald-600 transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <span className="relative flex items-center gap-3">
                            Iniciar Proyecto
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
                        </span>
                    </button>

                    <button className="group px-10 py-5 rounded-xl font-semibold text-slate-300 border border-slate-700/60 hover:border-cyan-500/40 hover:text-white bg-white/3 backdrop-blur-md transition-all duration-400 hover:shadow-[0_0_30px_-10px] hover:shadow-cyan-500/20">
                        Explorar Portafolio
                    </button>
                </motion.div>

                {/* Servicios – glass cards sutiles */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 1.1 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-5 max-w-5xl mx-auto mb-20"
                >
                    {tabs.map((tab, i) => {
                        const Icon = tab.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.1 + i * 0.1 }}
                                className="group relative p-6 rounded-2xl bg-white/4 backdrop-blur-xl border border-white/8 hover:border-cyan-500/30 transition-all duration-400 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-950/30"
                            >
                                <Icon className="w-7 h-7 mb-4 text-cyan-400/70 group-hover:text-cyan-300 transition-colors" />
                                <h3 className="text-base font-semibold text-white mb-1">{tab.label}</h3>
                                <p className="text-sm text-slate-400">{tab.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Stats – minimal y elegante */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isVisible ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 1.3 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-20"
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center p-6 rounded-2xl bg-white/3 backdrop-blur-lg border border-white/8">
                            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
                                {stat.value}
                            </div>
                            <div className="text-sm text-slate-400 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Terminal minimalista y profesional */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, delay: 1.5 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-slate-950/70 backdrop-blur-2xl shadow-2xl shadow-black/40">
                        {/* Header */}
                        <div className="flex items-center px-5 py-3 bg-slate-900/60 border-b border-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                            </div>
                            <div className="flex-1 text-center text-sm text-slate-500 font-mono">
                                jacana-dev • secure-terminal
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="p-6 md:p-8 font-mono text-sm md:text-base text-slate-300 leading-relaxed">
                            <div className="space-y-4">
                                <div><span className="text-emerald-400">→</span> <span className="text-cyan-300">init</span> project --ai-enhanced</div>
                                <div className="text-slate-500 ml-6">Building secure, scalable architecture...</div>

                                <div><span className="text-emerald-400">→</span> <span className="text-cyan-300">optimize</span> performance --edge</div>
                                <div className="text-slate-500 ml-6">Latency reduced • Core Web Vitals 98+</div>

                                <div><span className="text-emerald-400">→</span> <span className="text-cyan-300">deploy</span> production --zero-downtime</div>
                                <div className="text-slate-300 ml-6 animate-pulse">Ready. <span className="text-cyan-400 font-semibold">Launch</span> when you are.</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator elegante */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500">
                <span className="text-xs uppercase tracking-widest">Explorar</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="w-6 h-10 rounded-full border border-slate-700 flex items-start justify-center p-2"
                >
                    <div className="w-1.5 h-3 bg-cyan-500/70 rounded-full" />
                </motion.div>
            </div>

            <style jsx global>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 12s ease infinite;
        }
      `}</style>
        </section>
    );
}