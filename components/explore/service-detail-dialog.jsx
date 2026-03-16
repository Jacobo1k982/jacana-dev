'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    X, Star, ArrowRight, Code, Server, Smartphone,
    Cloud, Database, Brain, ChevronRight, Quote
} from 'lucide-react';
import serviceDetailsData from '@/data/serviceDetails.json';

// ─────────────────────────────────────────────
// MAPS
// ─────────────────────────────────────────────

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Monitor: Code, Server, Smartphone, Cloud, Database, Brain,
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

interface ServiceDetailDialogProps {
    serviceId: string | null;
    onClose: () => void;
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export function ServiceDetailDialog({ serviceId, onClose }: ServiceDetailDialogProps) {
    if (!serviceId) return null;

    const service = serviceDetailsData[serviceId as keyof typeof serviceDetailsData];
    if (!service) return null;

    const Icon = iconMap[service.icon] ?? Code;
    const accent = accentMap[service.color] ?? accentMap.cyan;

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
                                <div className="flex items-center gap-3 mb-1">
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60">
                                        {service.category}
                                    </p>
                                    {service.popular && (
                                        <>
                                            <span className="text-slate-700">·</span>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-2.5 h-2.5 text-amber-400/70 fill-current" />
                                                <span className="text-[9px] uppercase tracking-[0.2em] text-amber-400/70">Popular</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <h2
                                    className="text-2xl md:text-3xl font-light text-white leading-tight"
                                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                >
                                    {service.title}
                                </h2>
                                {service.subtitle && (
                                    <p className="text-sm text-slate-500 mt-1">{service.subtitle}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ── SCROLLABLE BODY ── */}
                    <div className="overflow-y-auto flex-1">
                        <div className="px-8 py-8 space-y-10">

                            {/* Description */}
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-3">Descripción</p>
                                <p className="text-sm text-slate-400 leading-relaxed">{service.longDescription}</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-5 gap-px bg-slate-800/40">
                                {[
                                    { label: 'Proyectos', value: service.stats.projects },
                                    { label: 'Clientes', value: service.stats.clients },
                                    { label: 'Satisfacción', value: `${service.stats.satisfaction}%` },
                                    { label: 'Entrega', value: service.stats.avgDelivery },
                                    { label: 'Equipo', value: service.stats.teamSize },
                                ].map(stat => (
                                    <div key={stat.label} className="bg-[#080810] px-3 py-4 text-center">
                                        <p
                                            className={`text-xl font-light ${accent.text} leading-none mb-1`}
                                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                        >
                                            {stat.value}
                                        </p>
                                        <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600">
                                            {stat.label}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Technologies */}
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Tecnologías</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.technologies.map((tech: { name: string; level: number }) => (
                                        <div key={tech.name}>
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className="text-xs text-slate-400">{tech.name}</span>
                                                <span className={`text-[10px] ${accent.text}`}>{tech.level}</span>
                                            </div>
                                            {/* Segmented bar */}
                                            <div className="flex gap-0.5">
                                                {[...Array(10)].map((_, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: i * 0.03 + 0.15 }}
                                                        className={`h-0.5 flex-1 transition-colors ${i < Math.round(tech.level / 10)
                                                                ? accent.bar
                                                                : 'bg-slate-800'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Características</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/30">
                                    {service.features.map((feature: { name: string; description: string }, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -12 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="bg-[#080810] px-5 py-4 flex items-start gap-3"
                                        >
                                            <div className={`w-1 h-4 shrink-0 mt-0.5 ${accent.bar}`} />
                                            <div>
                                                <p className="text-xs font-medium text-white mb-0.5">{feature.name}</p>
                                                <p className="text-xs text-slate-600 leading-relaxed">{feature.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Process */}
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-6">Proceso de trabajo</p>
                                <div className="space-y-0 border-l border-slate-800/60 ml-3">
                                    {service.process.map((step: { step: number; title: string; description: string }, i: number) => (
                                        <div key={i} className="relative flex gap-5 pb-6 last:pb-0 pl-6">
                                            {/* Step dot */}
                                            <div className={`absolute -left-[9px] top-0 w-[18px] h-[18px] flex items-center justify-center border ${accent.border} bg-[#080810]`}>
                                                <span className={`text-[9px] font-medium ${accent.text}`}>{step.step}</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-white mb-0.5">{step.title}</p>
                                                <p className="text-xs text-slate-600 leading-relaxed">{step.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing */}
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Planes y precios</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/30">
                                    {service.pricing.ranges.map((plan: { type: string; price: string; time: string }, i: number) => (
                                        <div key={i} className="bg-[#080810] px-6 py-5">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-2">{plan.type}</p>
                                            <p
                                                className={`text-2xl font-light ${accent.text} mb-1`}
                                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                            >
                                                {plan.price}
                                            </p>
                                            <p className="text-xs text-slate-600">Entrega estimada: {plan.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial */}
                            {service.testimonials && service.testimonials.length > 0 && (
                                <div className="border-l-2 border-amber-400/30 pl-6">
                                    <Quote className="w-4 h-4 text-amber-400/40 mb-3" />
                                    <p className="text-sm text-slate-400 italic leading-relaxed mb-4">
                                        "{service.testimonials[0].quote}"
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-8 h-8 flex items-center justify-center border ${accent.border} text-[10px] font-medium ${accent.text}`}>
                                            {service.testimonials[0].author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-xs text-white font-medium leading-none mb-0.5">
                                                {service.testimonials[0].author}
                                            </p>
                                            <p className="text-[10px] text-slate-600">
                                                {service.testimonials[0].role}
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
                                    Solicitar servicio
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 border border-slate-700/60 hover:border-amber-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all"
                                >
                                    Ver ejemplos
                                    <ChevronRight className="w-3.5 h-3.5" />
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