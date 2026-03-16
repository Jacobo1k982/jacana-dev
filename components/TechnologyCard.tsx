'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Zap, Users, BookOpen, Plus } from 'lucide-react';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface TechnologyStats {
    performance: number;
    popularity: number;
    learning: number;
}

interface Technology {
    id: string;
    name: string;
    icon: string;
    description: string;
    features: string[];
    stats: TechnologyStats;
    version: string;
    category: string;
}

interface TechnologyCardProps {
    technology: Technology;
    color: string;
    index: number;
}

// ─────────────────────────────────────────────
// ACCENT MAP
// ─────────────────────────────────────────────

const accentMap: Record<string, { text: string; border: string; bar: string }> = {
    cyan: { text: 'text-sky-400', border: 'border-sky-400/30', bar: 'bg-sky-400/70' },
    blue: { text: 'text-indigo-400', border: 'border-indigo-400/30', bar: 'bg-indigo-400/70' },
    purple: { text: 'text-violet-400', border: 'border-violet-400/30', bar: 'bg-violet-400/70' },
    green: { text: 'text-emerald-400', border: 'border-emerald-400/30', bar: 'bg-emerald-400/70' },
    orange: { text: 'text-orange-400', border: 'border-orange-400/30', bar: 'bg-orange-400/70' },
    pink: { text: 'text-rose-400', border: 'border-rose-400/30', bar: 'bg-rose-400/70' },
};

const statMeta: Record<string, { icon: React.ElementType; label: string }> = {
    performance: { icon: Zap, label: 'Rendimiento' },
    popularity: { icon: Users, label: 'Popularidad' },
    learning: { icon: BookOpen, label: 'Aprendizaje' },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function TechnologyCard({ technology, color, index }: TechnologyCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const accent = accentMap[color] ?? accentMap.cyan;

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col bg-[#080810] border border-slate-800/70 hover:border-slate-700/80 transition-colors duration-300 overflow-hidden"
        >
            {/* Top accent on hover */}
            <div className={`absolute top-0 left-0 right-0 h-px ${accent.bar} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />

            {/* ── HEADER ── */}
            <div className="px-5 pt-5 pb-4 border-b border-slate-800/60">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        {/* Initial badge */}
                        <div className={`w-10 h-10 flex items-center justify-center border ${accent.border} shrink-0`}>
                            <span
                                className={`text-lg font-light ${accent.text}`}
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                {technology.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-base font-light text-white leading-tight"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                {technology.name}
                            </h3>
                            <div className="flex items-center gap-1.5 mt-0.5">
                                <span className={`text-[9px] uppercase tracking-[0.2em] ${accent.text}`}>
                                    {technology.category}
                                </span>
                                {technology.version !== 'N/A' && (
                                    <>
                                        <span className="text-slate-700">·</span>
                                        <span className="text-[9px] text-slate-600">v{technology.version}</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Expand toggle */}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`w-7 h-7 flex items-center justify-center border transition-colors shrink-0 ${isExpanded
                                ? `${accent.border} ${accent.text}`
                                : 'border-slate-700/60 text-slate-600 hover:border-slate-600 hover:text-slate-400'
                            }`}
                    >
                        <motion.span
                            animate={{ rotate: isExpanded ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Plus className="w-3 h-3" />
                        </motion.span>
                    </motion.button>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 leading-relaxed mt-3">
                    {technology.description}
                </p>
            </div>

            {/* ── STATS ── */}
            <div className="grid grid-cols-3 divide-x divide-slate-800/60 border-b border-slate-800/60">
                {Object.entries(technology.stats).map(([key, value]) => {
                    const meta = statMeta[key];
                    const Icon = meta?.icon ?? Zap;
                    return (
                        <div key={key} className="px-3 py-3">
                            <div className="flex items-center gap-1.5 mb-2">
                                <Icon className={`w-2.5 h-2.5 ${accent.text} opacity-70`} />
                                <span className="text-[9px] uppercase tracking-[0.15em] text-slate-600">
                                    {meta?.label ?? key}
                                </span>
                            </div>
                            {/* Segmented bar — same pattern as RegisterDialog strength */}
                            <div className="flex gap-0.5 mb-1">
                                {[...Array(10)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.07 + i * 0.03 + 0.3 }}
                                        className={`h-0.5 flex-1 transition-colors ${i < Math.round(value / 10)
                                                ? accent.bar
                                                : 'bg-slate-800'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className={`text-[10px] font-medium ${accent.text}`}>{value}</span>
                        </div>
                    );
                })}
            </div>

            {/* ── FEATURE PILLS (collapsed) ── */}
            {!isExpanded && (
                <div className="px-5 py-4 flex flex-wrap gap-1.5">
                    {technology.features.slice(0, 3).map((feature, i) => (
                        <span
                            key={i}
                            className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border ${accent.border} ${accent.text}`}
                        >
                            {feature.split(' ').slice(0, 3).join(' ')}
                        </span>
                    ))}
                    {technology.features.length > 3 && (
                        <span className="px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border border-slate-800/60 text-slate-600">
                            +{technology.features.length - 3}
                        </span>
                    )}
                </div>
            )}

            {/* ── EXPANDED FEATURES ── */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 py-5">
                            <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-3">
                                Características
                            </p>
                            <ul className="space-y-0 border-l border-amber-400/20 pl-4 ml-1">
                                {technology.features.map((feature, i) => (
                                    <motion.li
                                        key={i}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.04 }}
                                        className="flex items-center gap-2 py-1.5 border-b border-slate-800/30 last:border-b-0"
                                    >
                                        <span className={`w-1 h-1 rounded-full shrink-0 ${accent.bar}`} />
                                        <span className="text-xs text-slate-400">{feature}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <motion.a
                                href="#"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-5 w-full flex items-center justify-center gap-2 py-3 border border-slate-700/60 hover:border-amber-400/40 text-slate-500 hover:text-slate-300 text-xs font-medium uppercase tracking-[0.12em] transition-all"
                            >
                                Ver documentación
                                <ExternalLink className="w-3 h-3" />
                            </motion.a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
}