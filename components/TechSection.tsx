'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Monitor, Server, Cloud, GitBranch, Database, Brain, ArrowRight
} from 'lucide-react';
import TechnologyCard from '@/components/TechnologyCard';
import technologiesData from '@/data/technologies.json';

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Monitor, Server, Cloud, GitBranch, Database, Brain,
};

const accentMap: Record<string, { text: string; border: string; bar: string }> = {
    cyan: { text: 'text-sky-400', border: 'border-sky-400/30', bar: 'bg-sky-400/60' },
    blue: { text: 'text-indigo-400', border: 'border-indigo-400/30', bar: 'bg-indigo-400/60' },
    purple: { text: 'text-violet-400', border: 'border-violet-400/30', bar: 'bg-violet-400/60' },
    green: { text: 'text-emerald-400', border: 'border-emerald-400/30', bar: 'bg-emerald-400/60' },
    orange: { text: 'text-orange-400', border: 'border-orange-400/30', bar: 'bg-orange-400/60' },
    pink: { text: 'text-rose-400', border: 'border-rose-400/30', bar: 'bg-rose-400/60' },
};

interface TechCategory {
    title: string;
    description: string;
    icon: string;
    color: string;
    technologies: Array<{
        id: string;
        name: string;
        icon: string;
        description: string;
        features: string[];
        stats: { performance: number; popularity: number; learning: number };
        version: string;
        category: string;
    }>;
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function TechSection() {
    const [activeCategory, setActiveCategory] = useState<string>('frontend');
    const categories = Object.entries(technologiesData) as [string, TechCategory][];
    const active = categories.find(([key]) => key === activeCategory);

    return (
        <section id="tech" className="relative py-24 md:py-36 bg-[#080810] overflow-hidden">

            {/* Grain */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full bg-amber-900/8 blur-[140px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 md:px-8">

                {/* ── HEADER ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-16"
                >
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/70 mb-5">
                        — Stack Tecnológico
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            Tecnologías que<br />
                            <em className="text-slate-400 not-italic">dominamos</em>
                        </h2>
                        <p className="text-slate-500 text-sm max-w-xs leading-relaxed md:text-right">
                            Herramientas modernas para construir soluciones de alto rendimiento y escalabilidad.
                        </p>
                    </div>
                    <div className="mt-10 h-px bg-gradient-to-r from-slate-700/60 via-amber-400/20 to-transparent" />
                </motion.div>

                {/* ── CATEGORY TABS — horizontal bar ── */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="flex flex-wrap border border-slate-800/60 mb-12"
                >
                    {categories.map(([key, category], i) => {
                        const Icon = iconMap[category.icon] ?? Monitor;
                        const accent = accentMap[category.color] ?? accentMap.cyan;
                        const isActive = activeCategory === key;

                        return (
                            <button
                                key={key}
                                onClick={() => setActiveCategory(key)}
                                className={`relative flex items-center gap-2.5 px-5 py-3.5 text-xs font-medium uppercase tracking-[0.12em] transition-all border-r border-slate-800/60 last:border-r-0 ${isActive
                                        ? 'text-white bg-slate-900/60'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
                                    }`}
                            >
                                {/* Active top line */}
                                {isActive && (
                                    <motion.span
                                        layoutId="techTabIndicator"
                                        className={`absolute top-0 left-0 right-0 h-px ${accent.bar}`}
                                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? accent.text : 'text-slate-600'}`} />
                                <span className="hidden sm:inline">{category.title}</span>
                                <span className="sm:hidden">{category.title.slice(0, 3)}</span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* ── ACTIVE CATEGORY DESCRIPTION ── */}
                <AnimatePresence mode="wait">
                    {active && (
                        <motion.div
                            key={activeCategory + '-desc'}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25 }}
                            className="mb-8 flex items-center gap-4"
                        >
                            <div className={`w-1 h-4 shrink-0 ${accentMap[active[1].color]?.bar ?? 'bg-amber-400/60'}`} />
                            <p className="text-sm text-slate-500 leading-relaxed">
                                {active[1].description}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── TECHNOLOGY CARDS GRID ── */}
                <AnimatePresence mode="wait">
                    {categories.map(([key, category]) => {
                        if (activeCategory !== key) return null;
                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/30"
                            >
                                {category.technologies.map((tech, index) => (
                                    <TechnologyCard
                                        key={tech.id}
                                        technology={tech}
                                        color={category.color}
                                        index={index}
                                    />
                                ))}
                            </motion.div>
                        );
                    })}
                </AnimatePresence>

                {/* ── CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-16 pt-12 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-amber-400/60 mb-1">
                            — ¿Necesitas asesoría?
                        </p>
                        <p className="text-sm text-slate-500">
                            Hablemos sobre cuál stack es el adecuado para tu proyecto.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors"
                        >
                            Consulta técnica
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </motion.a>
                        <motion.a
                            href="#projects"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex items-center gap-2 px-6 py-3.5 border border-slate-700/60 hover:border-amber-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all"
                        >
                            Ver proyectos
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}