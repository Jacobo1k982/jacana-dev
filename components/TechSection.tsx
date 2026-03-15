'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Monitor, Server, Cloud, GitBranch, Database, Brain,
    ChevronDown
} from 'lucide-react';
import TechnologyCard from '@/components/TechnologyCard';
import technologiesData from '@/data/technologies.json';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Monitor,
    Server,
    Cloud,
    GitBranch,
    Database,
    Brain,
};

const colorVariants = {
    cyan: {
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        border: 'border-cyan-500/30',
        gradient: 'from-cyan-400 to-cyan-600',
        glow: 'shadow-cyan-500/30',
    },
    blue: {
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        border: 'border-blue-500/30',
        gradient: 'from-blue-400 to-blue-600',
        glow: 'shadow-blue-500/30',
    },
    purple: {
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        border: 'border-purple-500/30',
        gradient: 'from-purple-400 to-purple-600',
        glow: 'shadow-purple-500/30',
    },
    green: {
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        gradient: 'from-emerald-400 to-emerald-600',
        glow: 'shadow-emerald-500/30',
    },
    orange: {
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        gradient: 'from-orange-400 to-orange-600',
        glow: 'shadow-orange-500/30',
    },
    pink: {
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        border: 'border-pink-500/30',
        gradient: 'from-pink-400 to-pink-600',
        glow: 'shadow-pink-500/30',
    },
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
        stats: {
            performance: number;
            popularity: number;
            learning: number;
        };
        version: string;
        category: string;
    }>;
}

export default function TechSection() {
    const [activeCategory, setActiveCategory] = useState<string>('frontend');
    const categories = Object.entries(technologiesData) as [string, TechCategory][];

    return (
        <section id="tech" className="relative py-20 md:py-32 bg-[#06051d]">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/3 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 md:mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6"
                    >
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-sm text-cyan-400 font-medium">
                            Stack Tecnológico
                        </span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Tecnologías que{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Dominamos
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Utilizamos las herramientas más modernas y eficientes para construir
                        soluciones tecnológicas de alto rendimiento y escalabilidad.
                    </p>
                </motion.div>

                {/* Category Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-12"
                >
                    {categories.map(([key, category]) => {
                        const Icon = iconMap[category.icon] || Monitor;
                        const colors = colorVariants[category.color as keyof typeof colorVariants] || colorVariants.cyan;
                        const isActive = activeCategory === key;

                        return (
                            <motion.button
                                key={key}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveCategory(key)}
                                className={`relative flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${isActive
                                        ? `${colors.bg} ${colors.text} border ${colors.border} shadow-lg ${colors.glow}`
                                        : 'bg-gray-800/30 text-gray-400 border border-gray-700/30 hover:text-white hover:bg-gray-800/50'
                                    }`}
                            >
                                <Icon className="w-4 h-4 md:w-5 md:h-5" />
                                <span className="hidden sm:inline">{category.title}</span>
                                <span className="sm:hidden">{category.title.slice(0, 3)}</span>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colors.gradient} opacity-10`}
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* Category Description */}
                {categories.map(([key, category]) => {
                    const colors = colorVariants[category.color as keyof typeof colorVariants] || colorVariants.cyan;

                    if (activeCategory !== key) return null;

                    return (
                        <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="mb-8 text-center"
                        >
                            <p className={`${colors.text} text-sm md:text-base`}>
                                {category.description}
                            </p>
                        </motion.div>
                    );
                })}

                {/* Technology Cards Grid */}
                <div className="relative">
                    {categories.map(([key, category]) => {
                        if (activeCategory !== key) return null;

                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
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
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <div className="inline-flex flex-col sm:flex-row items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-sm md:text-base shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all"
                        >
                            Ver Todas las Tecnologías
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 font-medium text-sm md:text-base hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
                        >
                            Solicitar Consulta Técnica
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
