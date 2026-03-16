'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, ExternalLink, Github, Globe, Code2,
    Smartphone, Cloud, Cpu
} from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const categories = [
    { id: 'all', label: 'Todos', icon: Code2 },
    { id: 'web', label: 'Web Apps', icon: Globe },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'ai', label: 'AI / ML', icon: Cpu },
    { id: 'cloud', label: 'Cloud', icon: Cloud },
];

const projects = [
    { id: 1, title: 'E-Commerce Platform', description: 'Plataforma de comercio electrónico con pagos integrados.', category: 'web', image: '/gallery/eye.png', tech: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'], github: '#', demo: '#' },
    { id: 2, title: 'AI Image Generator', description: 'Aplicación de generación de imágenes con IA.', category: 'ai', image: '/gallery/pen.png', tech: ['Python', 'TensorFlow', 'FastAPI', 'React'], github: '#', demo: '#' },
    { id: 3, title: 'Social Media App', description: 'Red social con chat en tiempo real.', category: 'mobile', image: '/gallery/people.png', tech: ['React Native', 'Node.js', 'Socket.io'], github: '#', demo: '#' },
    { id: 4, title: 'Cloud Dashboard', description: 'Panel de administración para infraestructura cloud.', category: 'cloud', image: '/gallery/face.png', tech: ['Vue.js', 'AWS', 'Docker', 'Kubernetes'], github: '#', demo: '#' },
    { id: 5, title: 'Analytics Platform', description: 'Plataforma de analíticas con datos en tiempo real.', category: 'web', image: '/gallery/img5.png', tech: ['React', 'D3.js', 'PostgreSQL', 'Redis'], github: '#', demo: '#' },
    { id: 6, title: 'ML Model Trainer', description: 'Interfaz para entrenamiento de modelos ML.', category: 'ai', image: '/gallery/img3.png', tech: ['Python', 'PyTorch', 'MLflow', 'Streamlit'], github: '#', demo: '#' },
    { id: 7, title: 'Fitness Tracker', description: 'App de seguimiento de ejercicios personalizados.', category: 'mobile', image: '/gallery/img1.png', tech: ['Flutter', 'Firebase', 'HealthKit'], github: '#', demo: '#' },
    { id: 8, title: 'DevOps Pipeline', description: 'Sistema de CI/CD automatizado con monitoreo.', category: 'cloud', image: '/gallery/img2.png', tech: ['GitHub Actions', 'Terraform', 'Prometheus'], github: '#', demo: '#' },
];

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface ExplorePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function ExplorePanel({ isOpen, onClose }: ExplorePanelProps) {
    const [activeCategory, setActiveCategory] = useState('all');

    const filtered = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const activeCat = categories.find(c => c.id === activeCategory);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#06051d]/90 backdrop-blur-md z-50"
                    />

                    {/* Panel */}
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 280 }}
                        className="fixed inset-0 md:inset-8 lg:inset-12 bg-[#080810] border-0 md:border md:border-slate-800/70 z-50 overflow-hidden flex flex-col shadow-2xl shadow-black/60"
                    >
                        {/* Top accent */}
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent shrink-0" />

                        {/* ── HEADER ── */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/60 shrink-0">
                            <div>
                                <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-0.5">
                                    — Portafolio
                                </p>
                                <h2
                                    className="text-xl font-light text-white leading-none"
                                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                >
                                    Explorar proyectos
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 text-slate-500 hover:text-slate-300 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                        </div>

                        {/* ── CATEGORY TABS ── */}
                        <div className="flex border-b border-slate-800/60 overflow-x-auto shrink-0 scrollbar-hide">
                            {categories.map((cat) => {
                                const isActive = activeCategory === cat.id;
                                const Icon = cat.icon;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setActiveCategory(cat.id)}
                                        className={`relative flex items-center gap-2 px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] whitespace-nowrap shrink-0 border-r border-slate-800/60 last:border-r-0 transition-all ${isActive
                                                ? 'text-white bg-slate-900/60'
                                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
                                            }`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="exploreCatIndicator"
                                                className="absolute top-0 left-0 right-0 h-px bg-amber-400/50"
                                                transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                                            />
                                        )}
                                        <Icon className="w-3.5 h-3.5 shrink-0" />
                                        <span className="hidden sm:inline">{cat.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* ── PROJECTS GRID ── */}
                        <div className="flex-1 overflow-y-auto overscroll-contain">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeCategory}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-slate-800/30 p-px"
                                >
                                    {filtered.map((project, index) => {
                                        const catIcon = categories.find(c => c.id === project.category);
                                        const CatIcon = catIcon?.icon ?? Code2;
                                        return (
                                            <motion.div
                                                key={project.id}
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                                                className="group relative bg-[#080810] overflow-hidden flex flex-col hover:bg-slate-900/40 transition-colors"
                                            >
                                                {/* Image */}
                                                <div className="aspect-video relative overflow-hidden shrink-0">
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        loading="lazy"
                                                        decoding="async"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent" />

                                                    {/* Category chip */}
                                                    <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-[#080810]/80 backdrop-blur-sm border border-slate-800/60">
                                                        <CatIcon className="w-3 h-3 text-amber-400/70" />
                                                        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500 hidden sm:inline">
                                                            {catIcon?.label}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Info */}
                                                <div className="flex flex-col flex-1 px-4 py-4">
                                                    <h3 className="text-sm font-light text-white mb-1 line-clamp-1 group-hover:text-white transition-colors"
                                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                                    >
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-xs text-slate-500 mb-3 line-clamp-2 leading-relaxed flex-1">
                                                        {project.description}
                                                    </p>

                                                    {/* Tech tags */}
                                                    <div className="flex flex-wrap gap-1 mb-3">
                                                        {project.tech.slice(0, 2).map(tech => (
                                                            <span
                                                                key={tech}
                                                                className="px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] border border-slate-800/60 text-slate-600"
                                                            >
                                                                {tech}
                                                            </span>
                                                        ))}
                                                        {project.tech.length > 2 && (
                                                            <span className="px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] border border-slate-800/60 text-slate-700">
                                                                +{project.tech.length - 2}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Actions */}
                                                    <div className="flex items-center gap-2">
                                                        <a
                                                            href={project.github}
                                                            className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-700/60 hover:border-slate-600 text-slate-500 hover:text-slate-300 text-xs font-medium uppercase tracking-[0.1em] transition-all"
                                                        >
                                                            <Github className="w-3 h-3" />
                                                            <span>Código</span>
                                                        </a>
                                                        <a
                                                            href={project.demo}
                                                            className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-white text-[#080810] hover:bg-amber-50 text-xs font-medium uppercase tracking-[0.1em] transition-colors"
                                                        >
                                                            <ExternalLink className="w-3 h-3" />
                                                            <span>Demo</span>
                                                        </a>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* ── FOOTER ── */}
                        <div className="px-6 py-3 border-t border-slate-800/60 flex items-center justify-between shrink-0">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">
                                {filtered.length} {filtered.length === 1 ? 'proyecto' : 'proyectos'}
                                {activeCat && activeCategory !== 'all' && (
                                    <span className="text-amber-400/50 ml-1">· {activeCat.label}</span>
                                )}
                            </span>
                            <button
                                onClick={onClose}
                                className="text-[10px] uppercase tracking-[0.2em] text-slate-600 hover:text-amber-400/70 transition-colors"
                            >
                                Cerrar
                            </button>
                        </div>

                        {/* Bottom accent */}
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent shrink-0" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}