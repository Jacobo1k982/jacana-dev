'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Monitor, Server, Smartphone, Cloud, Database, Brain, Plug, Users,
    ChevronRight, Star, TrendingUp, Clock, CheckCircle2,
    Search, Grid3X3, LayoutList, Sparkles, ArrowRight,
    Heart, Truck, ShoppingCart, Gamepad2, BookOpen, PenTool, Code2, Wallet,
    Plus
} from 'lucide-react';
import exploreItemsData from '@/data/exploreItems.json';
import { ServiceDetailDialog } from './service-detail-dialog';
import { ProjectDetailDialog } from './project-detail-dialog';

// ─────────────────────────────────────────────
// ICON MAP
// ─────────────────────────────────────────────

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Monitor, Server, Smartphone, Cloud, Database, Brain, Plug, Users,
    Heart, Truck, ShoppingCart, Gamepad2, BookOpen, PenTool, Code2, Wallet,
};

// ─────────────────────────────────────────────
// ACCENT MAP — single hue, no gradients
// ─────────────────────────────────────────────

const accentMap: Record<string, { text: string; border: string }> = {
    cyan: { text: 'text-sky-400', border: 'border-sky-400/30' },
    blue: { text: 'text-indigo-400', border: 'border-indigo-400/30' },
    purple: { text: 'text-violet-400', border: 'border-violet-400/30' },
    orange: { text: 'text-orange-400', border: 'border-orange-400/30' },
    green: { text: 'text-emerald-400', border: 'border-emerald-400/30' },
    pink: { text: 'text-rose-400', border: 'border-rose-400/30' },
    yellow: { text: 'text-amber-400', border: 'border-amber-400/30' },
};

const getAccent = (color: string) => accentMap[color] ?? accentMap.cyan;

// ─────────────────────────────────────────────
// DATA TRANSFORM
// ─────────────────────────────────────────────

const exploreItems = exploreItemsData.map(item => ({
    ...item,
    icon: iconMap[item.icon] ?? Monitor,
    accent: getAccent(item.color),
}));

// ─────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────

const categories = [
    { id: 'all', label: 'Todos', icon: Grid3X3 },
    { id: 'Servicios', label: 'Servicios', icon: Sparkles },
    { id: 'Proyectos', label: 'Proyectos', icon: Code2 },
];

// ─────────────────────────────────────────────
// SERVICE CARD
// ─────────────────────────────────────────────

function ServiceCard({ item, index, onViewDetails }: {
    item: typeof exploreItems[0];
    index: number;
    onViewDetails: () => void;
}) {
    const Icon = item.icon;
    const accent = item.accent;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col bg-[#080810] border border-slate-800/70 hover:border-slate-700/80 transition-colors duration-300 overflow-hidden"
        >
            {/* Top accent on hover */}
            <div className={`absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${accent.border.replace('border-', 'bg-').replace('/30', '/60')}`} />

            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-slate-800/60">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 flex items-center justify-center border ${accent.border} shrink-0`}>
                            <Icon className={`w-4 h-4 ${accent.text}`} />
                        </div>
                        <div>
                            <h3
                                className="text-base font-light text-white leading-tight"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                {item.title}
                            </h3>
                            <span className={`text-[9px] uppercase tracking-[0.2em] ${accent.text}`}>
                                {item.category}
                            </span>
                        </div>
                    </div>
                    {item.popular && (
                        <div className="flex items-center gap-1 shrink-0">
                            <Star className="w-2.5 h-2.5 text-amber-400/70 fill-current" />
                            <span className="text-[9px] uppercase tracking-[0.2em] text-amber-400/70">Popular</span>
                        </div>
                    )}
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
            </div>

            {/* Features */}
            <div className="px-5 py-4 border-b border-slate-800/60 flex flex-wrap gap-1.5">
                {item.features.slice(0, 4).map((feature, i) => (
                    <span
                        key={i}
                        className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border ${accent.border} ${accent.text}`}
                    >
                        {feature}
                    </span>
                ))}
                {item.features.length > 4 && (
                    <span className="px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border border-slate-800/60 text-slate-600">
                        +{item.features.length - 4}
                    </span>
                )}
            </div>

            {/* Stats */}
            {item.stats && (
                <div className="grid grid-cols-3 divide-x divide-slate-800/60 border-b border-slate-800/60">
                    {Object.entries(item.stats).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="px-3 py-3 text-center">
                            <p
                                className={`text-lg font-light ${accent.text} leading-none mb-1`}
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                {value as string}
                            </p>
                            <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600 leading-tight">
                                {key}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Footer */}
            <div className="px-5 py-4 flex items-center justify-between mt-auto">
                {item.price && (
                    <span
                        className="text-xl font-light text-white"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                        {item.price}
                    </span>
                )}
                <button
                    onClick={onViewDetails}
                    className={`ml-auto flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.1em] ${accent.text} hover:opacity-80 transition-opacity`}
                >
                    Ver detalles
                    <ChevronRight className="w-3.5 h-3.5" />
                </button>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// PROJECT / LIST CARD
// ─────────────────────────────────────────────

function ProjectCard({ item, index, onViewDetails }: {
    item: typeof exploreItems[0];
    index: number;
    onViewDetails: () => void;
}) {
    const Icon = item.icon;
    const accent = item.accent;

    return (
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={onViewDetails}
            className="group flex items-start gap-4 px-5 py-4 bg-[#080810] border border-slate-800/70 hover:border-slate-700/80 transition-colors cursor-pointer"
        >
            {/* Icon */}
            <div className={`w-10 h-10 flex items-center justify-center border ${accent.border} shrink-0 mt-0.5`}>
                <Icon className={`w-4 h-4 ${accent.text}`} />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4 mb-1">
                    <h3
                        className="text-base font-light text-white leading-tight group-hover:text-white transition-colors"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                        {item.title}
                    </h3>
                    <span className={`text-[9px] uppercase tracking-[0.2em] ${accent.text} shrink-0`}>
                        {item.category}
                    </span>
                </div>
                {item.client && (
                    <p className="text-[10px] text-slate-600 mb-2 uppercase tracking-[0.15em]">
                        {item.client} · {item.year}
                    </p>
                )}
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1.5">
                    {item.features.slice(0, 5).map((feature, i) => (
                        <span
                            key={i}
                            className={`px-2 py-0.5 text-[9px] uppercase tracking-[0.1em] border ${accent.border} ${accent.text}`}
                        >
                            {feature}
                        </span>
                    ))}
                </div>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-amber-400/60 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// MAIN SECTION
// ─────────────────────────────────────────────

export default function ExploreSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    const filteredItems = useMemo(() => {
        const q = searchQuery.toLowerCase();
        return exploreItems.filter(item => {
            const matchesSearch = !q
                || item.title.toLowerCase().includes(q)
                || item.description.toLowerCase().includes(q)
                || item.features.some(f => f.toLowerCase().includes(q));
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    const handleDetails = (item: typeof exploreItems[0]) => {
        if (item.category === 'Servicios') setSelectedService(item.id);
        else setSelectedProject(item.id);
    };

    return (
        <section id="explore" className="relative py-24 md:py-36 bg-[#080810] overflow-hidden">

            {/* Grain */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[140px] pointer-events-none" />
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
                        — Descubre lo que ofrecemos
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            Servicios &<br />
                            <em className="text-slate-400 not-italic">proyectos</em>
                        </h2>
                        <p className="text-slate-500 text-sm max-w-xs leading-relaxed md:text-right">
                            Soluciones de desarrollo y ejemplos de trabajo real que demuestran nuestra experiencia.
                        </p>
                    </div>
                    <div className="mt-10 h-px bg-gradient-to-r from-slate-700/60 via-amber-400/20 to-transparent" />
                </motion.div>

                {/* ── CONTROLS ── */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-3 mb-10"
                >
                    {/* Search */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Buscar servicios, tecnologías, proyectos…"
                            className="w-full pl-10 pr-4 py-3 bg-transparent border border-slate-800/60 text-white text-sm placeholder-slate-700
                                focus:border-amber-400/40 focus:outline-none transition-colors hover:border-slate-700/80"
                        />
                    </div>

                    {/* Category tabs */}
                    <div className="flex border border-slate-800/60">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`relative flex items-center gap-2 px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] border-r border-slate-800/60 last:border-r-0 transition-all ${isActive
                                            ? 'text-white bg-slate-900/60'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="exploreTabIndicator"
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

                    {/* View toggle */}
                    <div className="hidden sm:flex border border-slate-800/60">
                        {([['grid', Grid3X3], ['list', LayoutList]] as const).map(([mode, Icon]) => (
                            <button
                                key={mode}
                                onClick={() => setViewMode(mode)}
                                className={`px-3 py-3 border-r border-slate-800/60 last:border-r-0 transition-all ${viewMode === mode
                                        ? 'text-white bg-slate-900/60'
                                        : 'text-slate-600 hover:text-slate-400 hover:bg-slate-900/30'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* ── ITEMS ── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeCategory}-${viewMode}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/30'
                            : 'space-y-px bg-slate-800/30'
                        }
                    >
                        {filteredItems.length === 0 ? (
                            <div className="col-span-full flex flex-col items-center py-24 bg-[#080810]">
                                <Search className="w-8 h-8 text-slate-700 mb-3" />
                                <p className="text-sm text-slate-500 mb-1">Sin resultados</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}
                                    className="mt-3 text-xs uppercase tracking-[0.15em] text-amber-400/60 hover:text-amber-400/80 transition-colors"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        ) : viewMode === 'grid' ? (
                            filteredItems.map((item, i) => (
                                <ServiceCard key={item.id} item={item} index={i} onViewDetails={() => handleDetails(item)} />
                            ))
                        ) : (
                            filteredItems.map((item, i) => (
                                <ProjectCard key={item.id} item={item} index={i} onViewDetails={() => handleDetails(item)} />
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* ── STATS ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800/40"
                >
                    {[
                        { value: '150+', label: 'Proyectos completados', icon: CheckCircle2 },
                        { value: '98%', label: 'Satisfacción cliente', icon: Star },
                        { value: '24/7', label: 'Soporte disponible', icon: Clock },
                        { value: '5+', label: 'Años de experiencia', icon: TrendingUp },
                    ].map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07 }}
                                className="bg-[#080810] px-6 py-6 flex items-center gap-4"
                            >
                                <Icon className="w-4 h-4 text-amber-400/50 shrink-0" />
                                <div>
                                    <p
                                        className="text-2xl font-light text-white leading-none mb-1"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600">
                                        {stat.label}
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* ── CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-16 pt-12 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
                >
                    <p className="text-sm text-slate-500 max-w-sm">
                        ¿Tienes un proyecto en mente? Hablemos sobre cómo podemos ayudarte.
                    </p>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="group flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors shrink-0"
                    >
                        Contáctanos
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </motion.a>
                </motion.div>
            </div>

            {/* Dialogs */}
            <ServiceDetailDialog serviceId={selectedService} onClose={() => setSelectedService(null)} />
            <ProjectDetailDialog projectId={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
}