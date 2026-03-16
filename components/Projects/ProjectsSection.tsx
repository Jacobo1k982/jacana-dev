'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FolderKanban, TrendingUp, Users, Globe, Award,
    ArrowRight, Star
} from 'lucide-react';
import ProjectCard from './ProjectCard';
import projectsData from '@/data/projects.json';

export default function ProjectsSection() {
    const [activeCategory, setActiveCategory] = useState('all');
    const { categories, projects, stats } = projectsData;

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const featuredProjects = projects.filter(p => p.featured);

    const statsRow = [
        { label: 'Proyectos', value: stats.totalProjects, icon: FolderKanban },
        { label: 'Clientes', value: stats.clientsServed, icon: Users },
        { label: 'Países', value: stats.countriesReached, icon: Globe },
        { label: 'Equipo', value: stats.teamSize, icon: Users },
        { label: 'Experiencia', value: stats.yearsExperience, icon: TrendingUp },
        { label: 'Satisfacción', value: stats.satisfactionRate, icon: Award },
    ];

    return (
        <section className="relative py-24 md:py-36 bg-[#080810] overflow-hidden">

            {/* Grain */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />
            {/* Ambient left */}
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[140px] pointer-events-none" />
            {/* Ambient right */}
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-amber-900/8 blur-[140px] pointer-events-none" />

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
                        — Portafolio
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            Proyectos que<br />
                            <em className="text-slate-400 not-italic">transforman negocios</em>
                        </h2>
                        <p className="text-slate-500 text-sm max-w-xs leading-relaxed md:text-right">
                            Cada proyecto es una historia de éxito construida con precisión técnica y visión estratégica.
                        </p>
                    </div>
                    <div className="mt-10 h-px bg-gradient-to-r from-slate-700/60 via-amber-400/20 to-transparent" />
                </motion.div>

                {/* ── STATS BAR ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="grid grid-cols-3 md:grid-cols-6 gap-px bg-slate-800/40 mb-20"
                >
                    {statsRow.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 + 0.15 }}
                            className="bg-[#080810] px-4 py-5 text-center"
                        >
                            <p
                                className="text-2xl font-light text-white leading-none mb-1"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                {stat.value}
                            </p>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ── FEATURED PROJECTS ── */}
                <AnimatePresence>
                    {activeCategory === 'all' && (
                        <motion.div
                            key="featured"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.4 }}
                            className="mb-20"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="flex items-center gap-2">
                                    <Star className="w-3.5 h-3.5 text-amber-400/70 fill-current" />
                                    <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400/70">
                                        Destacados
                                    </span>
                                </div>
                                <div className="flex-1 h-px bg-slate-800/60" />
                            </div>
                            <div className="grid md:grid-cols-2 gap-px bg-slate-800/30">
                                {featuredProjects.slice(0, 4).map((project, index) => (
                                    <ProjectCard key={project.id} project={project} index={index} />
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── CATEGORY FILTERS ── */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap items-center gap-0 mb-10 border border-slate-800/60"
                >
                    {[
                        { id: 'all', label: 'Todos', count: projects.length },
                        ...categories.filter((c: { id: string }) => c.id !== 'all'),
                    ].map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`relative flex items-center gap-2.5 px-5 py-3 text-xs font-medium uppercase tracking-[0.12em] transition-all border-r border-slate-800/60 last:border-r-0 ${isActive
                                        ? 'text-white bg-slate-900/60'
                                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
                                    }`}
                            >
                                {isActive && (
                                    <motion.span
                                        layoutId="filterIndicator"
                                        className="absolute top-0 left-0 right-0 h-px bg-amber-400/50"
                                        transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
                                    />
                                )}
                                {cat.label}
                                <span className={`text-[9px] px-1.5 py-0.5 border ${isActive
                                        ? 'border-amber-400/30 text-amber-400/70'
                                        : 'border-slate-700/60 text-slate-600'
                                    }`}>
                                    {cat.count}
                                </span>
                            </button>
                        );
                    })}
                </motion.div>

                {/* ── PROJECTS GRID ── */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/30"
                >
                    {(activeCategory === 'all' ? projects.slice(4) : filteredProjects).map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center py-24 border border-slate-800/60"
                    >
                        <FolderKanban className="w-10 h-10 text-slate-700 mb-4" />
                        <p className="text-sm text-slate-500 mb-1">Sin proyectos en esta categoría</p>
                        <button
                            onClick={() => setActiveCategory('all')}
                            className="mt-4 text-xs uppercase tracking-[0.15em] text-amber-400/60 hover:text-amber-400/80 transition-colors"
                        >
                            Ver todos
                        </button>
                    </motion.div>
                )}

                {/* ── CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="mt-24"
                >
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent mb-16" />

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Left: copy */}
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/70 mb-5">
                                — Siguiente paso
                            </p>
                            <h3
                                className="text-3xl md:text-4xl font-light text-white leading-snug mb-5"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                ¿Tienes un proyecto<br />
                                <em className="text-slate-400 not-italic">en mente?</em>
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-sm">
                                Convierte tu visión en realidad. Nuestro equipo está listo para construir
                                la solución digital perfecta para tu negocio.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <motion.a
                                    href="#contact"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors"
                                >
                                    Iniciar proyecto
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </motion.a>
                                <motion.a
                                    href="#services"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-2 px-6 py-3.5 border border-slate-700/60 hover:border-amber-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all"
                                >
                                    Ver servicios
                                </motion.a>
                            </div>
                        </div>

                        {/* Right: quick stats grid */}
                        <div className="grid grid-cols-2 gap-px bg-slate-800/40">
                            {[
                                { label: 'Tiempo de entrega', value: '1–6 meses' },
                                { label: 'Satisfacción', value: '98%' },
                                { label: 'Soporte post-lanzamiento', value: '24/7' },
                                { label: 'Metodología', value: 'Ágil' },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 + 0.2 }}
                                    className="bg-[#080810] p-6"
                                >
                                    <p
                                        className="text-2xl font-light text-white mb-1 leading-none"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {item.value}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
                                        {item.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}