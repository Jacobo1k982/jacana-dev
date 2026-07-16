'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ExternalLink, ChevronRight, Star, Tag, Plus, Minus
} from 'lucide-react';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface Project {
    id: string;
    title: string;
    slug: string;
    category: string;
    type: string;
    shortDescription: string;
    fullDescription: string;
    technologies: string[];
    features: string[];
    link?: string;
    featured: boolean;
    color: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

// ─────────────────────────────────────────────
// ACCENT MAP — single color per category
// ─────────────────────────────────────────────

const accentMap: Record<string, { text: string; border: string; bg: string }> = {
    cyan: { text: 'text-sky-400', border: 'border-sky-400/30', bg: 'bg-sky-400/6' },
    blue: { text: 'text-indigo-400', border: 'border-indigo-400/30', bg: 'bg-indigo-400/6' },
    purple: { text: 'text-violet-400', border: 'border-violet-400/30', bg: 'bg-violet-400/6' },
    green: { text: 'text-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-400/6' },
    orange: { text: 'text-orange-400', border: 'border-orange-400/30', bg: 'bg-orange-400/6' },
    pink: { text: 'text-rose-400', border: 'border-rose-400/30', bg: 'bg-rose-400/6' },
};

const categoryLabels: Record<string, string> = {
    web: 'Web App',
    mobile: 'Móvil',
    pos: 'Sistema POS',
    ecommerce: 'E-commerce',
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const [showDetails, setShowDetails] = useState(false);
    const accent = accentMap[project.color] ?? accentMap.cyan;

    return (
        <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col bg-[#080810] border border-slate-800/70 hover:border-slate-700/80 transition-colors duration-300 overflow-hidden"
        >
            {/* Top accent line — colored, appears on hover */}
            <div className={`absolute top-0 left-0 right-0 h-px ${accent.border.replace('border-', 'bg-').replace('/30', '/60')} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* ── HEADER ── */}
            <div className="px-6 pt-6 pb-5 border-b border-slate-800/60">
                {/* Row: category + type + featured */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className={`text-[9px] uppercase tracking-[0.25em] font-medium ${accent.text}`}>
                            {categoryLabels[project.category] ?? project.category}
                        </span>
                        {project.featured && (
                            <>
                                <span className="text-slate-700">·</span>
                                <span className="flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] text-amber-400/70">
                                    <Star className="w-2.5 h-2.5 fill-current" />
                                    Destacado
                                </span>
                            </>
                        )}
                    </div>
                </div>

                {/* Title */}
                <h3
                    className="text-xl font-light text-white mb-3 leading-snug group-hover:text-white transition-colors"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                    {project.title}
                </h3>

                {/* Type tag — honesto: producto propio / freelance / personal, sin inventar cliente */}
                <div className="flex items-center gap-2 mb-4">
                    <Tag className={`w-3.5 h-3.5 ${accent.text} shrink-0`} />
                    <span className="text-xs text-slate-400">{project.type}</span>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">
                    {project.shortDescription}
                </p>
            </div>

            {/* ── TECHNOLOGIES ── */}
            <div className="px-6 py-4 border-b border-slate-800/60 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 5).map((tech, i) => (
                    <span
                        key={i}
                        className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border ${accent.border} ${accent.text} transition-colors`}
                    >
                        {tech}
                    </span>
                ))}
                {project.technologies.length > 5 && (
                    <span className="px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border border-slate-800/60 text-slate-600">
                        +{project.technologies.length - 5}
                    </span>
                )}
            </div>

            {/* ── ACTIONS ── */}
            <div className="px-6 py-4 flex items-center gap-3 mt-auto">
                <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDetails(!showDetails)}
                    className={`flex-1 flex items-center justify-between px-4 py-2.5 border ${showDetails
                            ? `${accent.border} ${accent.text}`
                            : 'border-slate-700/60 text-slate-400 hover:text-white hover:border-slate-600'
                        } text-xs font-medium uppercase tracking-[0.1em] transition-all`}
                >
                    {showDetails ? 'Ocultar' : 'Ver detalles'}
                    <motion.span
                        animate={{ rotate: showDetails ? 45 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Plus className="w-3.5 h-3.5" />
                    </motion.span>
                </motion.button>

                {project.link && (
                    <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-10 h-10 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 text-slate-600 hover:text-slate-300 transition-all"
                        title="Ver proyecto en vivo"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                    </motion.a>
                )}
            </div>

            {/* ── EXPANDABLE DETAILS ── */}
            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="border-t border-slate-800/60">
                            {/* Colored top bar */}
                            <div className={`h-px bg-gradient-to-r from-transparent ${accent.border.replace('border-', 'via-').replace('/30', '/40')} to-transparent`} />

                            <div className="px-6 py-6 space-y-6">
                                {/* Full description */}
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-2">Descripción</p>
                                    <p className="text-sm text-slate-400 leading-relaxed">
                                        {project.fullDescription}
                                    </p>
                                </div>

                                {/* Features */}
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-3">Características</p>
                                    <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                                        {project.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                                                <span className={`w-px h-3 mt-0.5 shrink-0 ${accent.border.replace('border-', 'bg-').replace('/30', '/60')}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {project.link && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`inline-flex items-center gap-1.5 text-xs ${accent.text} hover:opacity-70 transition-opacity`}
                                    >
                                        Ver en vivo
                                        <ChevronRight className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.article>
    );
}
