'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Monitor, Server, Smartphone, Cloud, Database, Brain, Plug, Users,
    ChevronRight, Star, TrendingUp, Clock, DollarSign, CheckCircle2,
    X, Search, Filter, Grid3X3, LayoutList, Sparkles, Zap, ArrowRight,
    Heart, Truck, ShoppingCart, Gamepad2, BookOpen, PenTool, Code2, Wallet
} from 'lucide-react';
import exploreItemsData from '@/data/exploreItems.json';
import { ServiceDetailDialog } from './service-detail-dialog';
import { ProjectDetailDialog } from './project-detail-dialog';

// Icon map
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Monitor, Server, Smartphone, Cloud, Database, Brain, Plug, Users,
    Heart, Truck, ShoppingCart, Gamepad2, BookOpen, PenTool, Code2, Wallet
};

// Color themes
const colorThemes: Record<string, { gradient: string; border: string; text: string; bg: string; glow: string }> = {
    cyan: {
        gradient: 'from-cyan-500 to-blue-500',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        glow: 'shadow-cyan-500/20'
    },
    blue: {
        gradient: 'from-blue-500 to-indigo-500',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        glow: 'shadow-blue-500/20'
    },
    purple: {
        gradient: 'from-purple-500 to-pink-500',
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        glow: 'shadow-purple-500/20'
    },
    orange: {
        gradient: 'from-orange-500 to-red-500',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        glow: 'shadow-orange-500/20'
    },
    green: {
        gradient: 'from-green-500 to-emerald-500',
        border: 'border-green-500/30',
        text: 'text-green-400',
        bg: 'bg-green-500/10',
        glow: 'shadow-green-500/20'
    },
    pink: {
        gradient: 'from-pink-500 to-rose-500',
        border: 'border-pink-500/30',
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        glow: 'shadow-pink-500/20'
    },
    yellow: {
        gradient: 'from-yellow-500 to-amber-500',
        border: 'border-yellow-500/30',
        text: 'text-yellow-400',
        bg: 'bg-yellow-500/10',
        glow: 'shadow-yellow-500/20'
    }
};

const getTheme = (color: string) => colorThemes[color] || colorThemes.cyan;

// Transform data
const exploreItems = exploreItemsData.map(item => ({
    ...item,
    icon: iconMap[item.icon] || Monitor,
    theme: getTheme(item.color)
}));

// Categories
const categories = [
    { id: 'all', label: 'Todos', icon: Grid3X3 },
    { id: 'Servicios', label: 'Servicios', icon: Sparkles },
    { id: 'Proyectos', label: 'Proyectos', icon: Code2 },
];

// Stats Card Component
function StatsCard({ stats, theme }: { stats: Record<string, string | number>; theme: typeof colorThemes.cyan }) {
    const statEntries = Object.entries(stats);

    return (
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/5">
            {statEntries.slice(0, 3).map(([key, value], idx) => (
                <div key={key} className="text-center">
                    <div className={`text-lg font-bold ${theme.text}`}>{value}</div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wider">{key}</div>
                </div>
            ))}
        </div>
    );
}

// Feature Tag Component
function FeatureTag({ feature, theme }: { feature: string; theme: typeof colorThemes.cyan }) {
    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium ${theme.text} ${theme.bg} rounded-full border ${theme.border}`}>
            <CheckCircle2 className="w-3 h-3" />
            {feature}
        </span>
    );
}

// Service Card
function ServiceCard({ item, index, onViewDetails }: { item: typeof exploreItems[0]; index: number; onViewDetails: () => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = item.icon;
    const theme = item.theme;

    return (
        <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="group relative"
        >
            {/* Glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />

            <div className="relative h-full bg-[#0a0a1f]/90 backdrop-blur-xl border border-white/5 group-hover:border-cyan-500/20 rounded-3xl overflow-hidden transition-all duration-300">
                {/* Header with gradient */}
                <div className={`relative h-32 bg-gradient-to-br ${theme.gradient} p-6`}>
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                    <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center`}>
                                <Icon className={`w-6 h-6 ${theme.text}`} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                <span className="text-xs text-gray-400">{item.category}</span>
                            </div>
                        </div>
                        {item.popular && (
                            <span className={`px-3 py-1 text-xs font-bold ${theme.text} ${theme.bg} rounded-full border ${theme.border} flex items-center gap-1`}>
                                <Star className="w-3 h-3 fill-current" />
                                Popular
                            </span>
                        )}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <p className="text-sm text-gray-400 mb-4">{item.description}</p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.features.slice(0, 4).map((feature, idx) => (
                            <FeatureTag key={idx} feature={feature} theme={theme} />
                        ))}
                        {item.features.length > 4 && (
                            <span className="text-[10px] text-gray-500 flex items-center">
                                +{item.features.length - 4} más
                            </span>
                        )}
                    </div>

                    {/* Stats */}
                    <StatsCard stats={item.stats} theme={theme} />

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                        {item.price && (
                            <div className="flex items-center gap-1">
                                <DollarSign className={`w-4 h-4 ${theme.text}`} />
                                <span className="text-lg font-bold text-white">{item.price}</span>
                            </div>
                        )}
                        <motion.button
                            whileHover={{ x: 5 }}
                            onClick={onViewDetails}
                            className={`flex items-center gap-1 text-sm font-medium ${theme.text} hover:underline underline-offset-4`}
                        >
                            Ver detalles
                            <ChevronRight className="w-4 h-4" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Project Card
function ProjectCard({ item, index, onViewDetails }: { item: typeof exploreItems[0]; index: number; onViewDetails: () => void }) {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = item.icon;
    const theme = item.theme;

    return (
        <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onViewDetails}
            className="group relative cursor-pointer"
        >
            {/* Glow */}
            <div className={`absolute -inset-1 bg-gradient-to-r ${theme.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />

            <div className="relative flex gap-4 p-4 bg-[#0a0a1f]/90 backdrop-blur-xl border border-white/5 group-hover:border-cyan-500/20 rounded-2xl transition-all duration-300">
                {/* Icon */}
                <div className={`shrink-0 w-16 h-16 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center group-hover:scale-105 transition-transform duration-200`}>
                    <Icon className={`w-8 h-8 ${theme.text}`} />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                        <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.client} • {item.year}</p>
                        </div>
                        <span className={`px-2 py-0.5 text-xs font-medium ${theme.text} ${theme.bg} rounded-full border ${theme.border}`}>
                            {item.category}
                        </span>
                    </div>

                    <p className="text-sm text-gray-400 mb-3">{item.description}</p>

                    {/* Features inline */}
                    <div className="flex flex-wrap gap-1.5">
                        {item.features.slice(0, 5).map((feature, idx) => (
                            <span key={idx} className={`px-2 py-0.5 text-[10px] font-medium ${theme.text} ${theme.bg} rounded border ${theme.border}`}>
                                {feature}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Arrow */}
                <div className="shrink-0 flex items-center">
                    <motion.div animate={{ x: isHovered ? 5 : 0 }}>
                        <ArrowRight className={`w-5 h-5 text-gray-600 group-hover:text-cyan-400 transition-colors`} />
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

export default function ExploreSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // Modal states
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [selectedProject, setSelectedProject] = useState<string | null>(null);

    // Filter items
    const filteredItems = useMemo(() => {
        return exploreItems.filter(item => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
            const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    return (
        <section id="explore" className="relative py-20 bg-[#06051d] overflow-hidden">
            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-400">Descubre todo lo que ofrecemos</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Explora Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Servicios y Proyectos</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Soluciones completas de desarrollo y ejemplos de proyectos exitosos que demuestran nuestra experiencia.
                    </p>
                </motion.div>

                {/* Search and Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row gap-4 mb-8"
                >
                    {/* Search Input */}
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar servicios, tecnologías, proyectos..."
                            className="w-full pl-12 pr-4 py-3 bg-[#0a0a1f]/50 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                        />
                    </div>

                    {/* Categories */}
                    <div className="flex items-center gap-2 p-1 bg-[#0a0a1f]/50 border border-white/10 rounded-2xl">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isActive
                                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* View Toggle */}
                    <div className="hidden sm:flex items-center gap-2 p-1 bg-[#0a0a1f]/50 border border-white/10 rounded-2xl">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'}`}
                        >
                            <Grid3X3 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'}`}
                        >
                            <LayoutList className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>

                {/* Items Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={`${activeCategory}-${viewMode}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                            : 'space-y-4'
                        }
                    >
                        {filteredItems.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-full flex flex-col items-center justify-center py-20"
                            >
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                                    <Search className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-xl text-gray-500 mb-2">No se encontraron resultados</h3>
                                <p className="text-gray-600">Intenta con otra búsqueda o categoría</p>
                            </motion.div>
                        ) : viewMode === 'grid' ? (
                            filteredItems.map((item, index) => (
                                <ServiceCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onViewDetails={() => {
                                        if (item.category === 'Servicios') {
                                            setSelectedService(item.id);
                                        } else {
                                            setSelectedProject(item.id);
                                        }
                                    }}
                                />
                            ))
                        ) : (
                            filteredItems.map((item, index) => (
                                <ProjectCard
                                    key={item.id}
                                    item={item}
                                    index={index}
                                    onViewDetails={() => {
                                        if (item.category === 'Servicios') {
                                            setSelectedService(item.id);
                                        } else {
                                            setSelectedProject(item.id);
                                        }
                                    }}
                                />
                            ))
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
                >
                    {[
                        { value: '150+', label: 'Proyectos Completados', icon: CheckCircle2, color: 'cyan' },
                        { value: '98%', label: 'Satisfacción Cliente', icon: Star, color: 'yellow' },
                        { value: '24/7', label: 'Soporte Disponible', icon: Clock, color: 'green' },
                        { value: '5+', label: 'Años de Experiencia', icon: TrendingUp, color: 'purple' }
                    ].map((stat, index) => {
                        const Icon = stat.icon;
                        const theme = colorThemes[stat.color];
                        return (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group relative p-6 bg-[#0a0a1f]/50 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                                <div className="relative flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl ${theme.bg} border ${theme.border} flex items-center justify-center`}>
                                        <Icon className={`w-6 h-6 ${theme.text}`} />
                                    </div>
                                    <div>
                                        <div className={`text-2xl font-bold ${theme.text}`}>{stat.value}</div>
                                        <div className="text-sm text-gray-500">{stat.label}</div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 mb-6">¿Tienes un proyecto en mente? Hablemos sobre cómo podemos ayudarte.</p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/20"
                    >
                        <span>Contáctanos</span>
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </div>

            {/* Detail Dialogs */}
            <ServiceDetailDialog
                serviceId={selectedService}
                onClose={() => setSelectedService(null)}
            />
            <ProjectDetailDialog
                projectId={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
}
