'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    X, CheckCircle2, Users, Calendar, Building2,
    ArrowRight, Code, Server, Smartphone, Cloud, Database, Brain,
    ShoppingCart, Wallet, Heart, Truck, ExternalLink, MapPin,
    TrendingUp, Layers, Quote
} from 'lucide-react';
import projectDetailsData from '@/data/projectDetails.json';

// ─────────────────────────────────────────────
// MAPS
// ─────────────────────────────────────────────

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Monitor: Code, Server, Smartphone, Cloud, Database, Brain,
    ShoppingCart, Wallet, Heart, Truck,
};

const accentMap: Record<string, { text: string; border: string; bar: string }> = {
    cyan: { text: 'text-sky-400', border: 'border-sky-400/30', bar: 'bg-sky-400/60' },
    blue: { text: 'text-indigo-400', border: 'border-indigo-400/30', bar: 'bg-indigo-400/60' },
    purple: { text: 'text-violet-400', border: 'border-violet-400/30', bar: 'bg-violet-400/60' },
    orange: { text: 'text-orange-400', border: 'border-orange-400/30', bar: 'bg-orange-400/60' },
    green: { text: 'text-emerald-400', border: 'border-emerald-400/30', bar: 'bg-emerald-400/60' },
    pink: { text: 'text-rose-400', border: 'border-rose-400/30', bar: 'bg-rose-400/60' },
};

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface ProjectDetailDialogProps {
    projectId: string | null;
    onClose: () => void;
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export function ProjectDetailDialog({ projectId, onClose }: ProjectDetailDialogProps) {
    if (!projectId) return null;

    const project = projectDetailsData[projectId as keyof typeof projectDetailsData];
    if (!project) return null;

    const Icon = iconMap[project.icon] ?? Code;
    const accent = accentMap[project.color] ?? accentMap.cyan;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#06051d]/85 backdrop-blur-md"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-[#080810] border border-slate-800/80 shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Top accent */}
                    <div className={`shrink-0 h-px ${accent.bar}`} />

                    {/* Grain */}
                    <div
                        className="absolute inset-0 opacity-[0.025] pointer-events-none"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                            backgroundSize: '128px 128px',
                        }}
                    />

                    {/* ── HEADER ── */}
                    <div className="relative px-8 pt-8 pb-6 border-b border-slate-800/60 shrink-0">
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 text-slate-600 hover:text-slate-300 transition-all"
                        >
                            <X className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex items-start gap-4 pr-12">
                            <div className={`w-11 h-11 flex items-center justify-center border ${accent.border} shrink-0`}>
                                <Icon className={`w-5 h-5 ${accent.text}`} />
                            </div>
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-1">
                                    {project.category} · {project.year}
                                </p>
                                <h2
                                    className="text-2xl md:text-3xl font-light text-white leading-tight"
                                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                >
                                    {project.title}
                                </h2>
                                {project.subtitle && (
                                    <p className="text-sm text-slate-500 mt-1">{project.subtitle}</p>
                                )}
                            </div>
                        </div>

                        {/* Meta row */}
                        <div className="flex flex-wrap gap-6 mt-5">
                            {[
                                { icon: Building2, value: project.client },
                                { icon: MapPin, value: project.industry },
                                { icon: Calendar, value: project.duration },
                                { icon: Users, value: project.team },
                            ].map(({ icon: MetaIcon, value }) => value && (
                                <div key={value} className="flex items-center gap-2">
                                    <MetaIcon className="w-3.5 h-3.5 text-slate-600" />
                                    <span className="text-xs text-slate-500">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── SCROLLABLE BODY ── */}
                    <div className="overflow-y-auto flex-1">
                        <div className="px-8 py-8 space-y-10">

                            {/* Description */}
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-3">Sobre el proyecto</p>
                                <p className="text-sm text-slate-400 leading-relaxed">{project.longDescription}</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-slate-800/40">
                                {Object.entries(project.stats).slice(0, 6).map(([key, value]) => (
                                    <div key={key} className="bg-[#080810] px-3 py-4 text-center">
                                        <p
                                            className={`text-xl font-light ${accent.text} leading-none mb-1`}
                                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                        >
                                            {value as string}
                                        </p>
                                        <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600">
                                            {key}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Highlights */}
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Resultados destacados</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/30">
                                    {project.highlights.map((highlight, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="bg-[#080810] flex items-center gap-3 px-4 py-3"
                                        >
                                            <TrendingUp className={`w-3.5 h-3.5 ${accent.text} shrink-0 opacity-70`} />
                                            <span className="text-xs text-slate-400">{highlight}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Características principales</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/30">
                                    {project.features.map((feature: { name: string; description: string }, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="bg-[#080810] px-5 py-4"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-1 h-4 shrink-0 mt-0.5 ${accent.bar}`} />
                                                <div>
                                                    <p className="text-xs font-medium text-white mb-0.5">{feature.name}</p>
                                                    <p className="text-xs text-slate-600 leading-relaxed">{feature.description}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Tech stack */}
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Stack tecnológico</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.technologies.map((tech: { name: string; category: string }, i: number) => (
                                        <div
                                            key={i}
                                            className={`px-3 py-1.5 border ${accent.border} flex items-center gap-2`}
                                        >
                                            <span className={`text-xs ${accent.text}`}>{tech.name}</span>
                                            <span className="text-[9px] text-slate-700 uppercase tracking-[0.1em]">{tech.category}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Architecture */}
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Arquitectura del sistema</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/30">
                                    {Object.entries(project.architecture).map(([key, value], i) => (
                                        <div key={key} className="bg-[#080810] px-4 py-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Layers className={`w-3 h-3 ${accent.text} opacity-70`} />
                                                <span className="text-[10px] uppercase tracking-[0.15em] text-slate-500 capitalize">{key}</span>
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed">{value as string}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial */}
                            {project.testimonials && project.testimonials.length > 0 && (
                                <div className="border-l-2 border-amber-400/30 pl-6">
                                    <Quote className="w-4 h-4 text-amber-400/40 mb-3" />
                                    <p className="text-sm text-slate-400 italic leading-relaxed mb-4">
                                        "{project.testimonials[0].quote}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 flex items-center justify-center border ${accent.border} text-[10px] font-medium ${accent.text}`}>
                                            {project.testimonials[0].author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-xs text-white font-medium leading-none mb-0.5">
                                                {project.testimonials[0].author}
                                            </p>
                                            <p className="text-[10px] text-slate-600">
                                                {project.testimonials[0].role}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800/60">
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors"
                                >
                                    Ver sitio en vivo
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 border border-slate-700/60 hover:border-amber-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all"
                                >
                                    Proyecto similar
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom accent */}
                    <div className={`shrink-0 h-px ${accent.bar} opacity-30`} />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}