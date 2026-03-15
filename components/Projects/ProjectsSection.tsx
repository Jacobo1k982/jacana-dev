'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FolderKanban, TrendingUp, Users, Globe, Award,
    ArrowRight, Sparkles, Filter
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

    return (
        <section className="relative py-20 md:py-32 bg-[#06051d] overflow-hidden min-h-screen pt-24">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/3 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6 md:px-8">
                {/* ============================================ */}
                {/* SECTION HEADER */}
                {/* ============================================ */}
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
                        <FolderKanban className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400 font-medium">Portafolio</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Proyectos que{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Transforman Negocios
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        Cada proyecto es una historia de éxito. Descubre cómo hemos ayudado a empresas
                        a alcanzar sus objetivos digitales con soluciones innovadoras.
                    </p>
                </motion.div>

                {/* ============================================ */}
                {/* STATS BAR */}
                {/* ============================================ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
                >
                    {[
                        { label: 'Proyectos', value: stats.totalProjects, icon: FolderKanban },
                        { label: 'Clientes', value: stats.clientsServed, icon: Users },
                        { label: 'Países', value: stats.countriesReached, icon: Globe },
                        { label: 'Equipo', value: stats.teamSize, icon: Users },
                        { label: 'Experiencia', value: stats.yearsExperience, icon: TrendingUp },
                        { label: 'Satisfacción', value: stats.satisfactionRate, icon: Award },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="relative group"
                        >
                            <div className="p-4 rounded-xl border border-gray-700/30 bg-[#0a0a1a]/60 backdrop-blur-sm text-center hover:border-cyan-500/30 transition-all duration-300">
                                <stat.icon className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                                <div className="text-xl font-bold text-white">{stat.value}</div>
                                <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* ============================================ */}
                {/* FEATURED PROJECTS */}
                {/* ============================================ */}
                {activeCategory === 'all' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-5 h-5 text-cyan-400" />
                            <h3 className="text-xl font-bold text-white">Proyectos Destacados</h3>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            {featuredProjects.slice(0, 4).map((project, index) => (
                                <ProjectCard key={project.id} project={project} index={index} />
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ============================================ */}
                {/* CATEGORY FILTERS */}
                {/* ============================================ */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10"
                >
                    <div className="flex items-center gap-2 text-sm text-gray-400 mr-2">
                        <Filter className="w-4 h-4" />
                        <span>Filtrar:</span>
                    </div>

                    {categories.map((category) => {
                        const isActive = activeCategory === category.id;
                        return (
                            <motion.button
                                key={category.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveCategory(category.id)}
                                className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${isActive
                                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                                    : 'bg-gray-800/30 text-gray-400 border border-gray-700/30 hover:text-white hover:bg-gray-800/50'
                                    }`}
                            >
                                <span>{category.label}</span>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-700/50 text-gray-500'
                                    }`}>
                                    {category.count}
                                </span>

                                {isActive && (
                                    <motion.div
                                        layoutId="activeFilter"
                                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </motion.button>
                        );
                    })}
                </motion.div>

                {/* ============================================ */}
                {/* PROJECTS GRID */}
                {/* ============================================ */}
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {(activeCategory === 'all' ? projects.slice(4) : filteredProjects).map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <FolderKanban className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-white mb-2">No hay proyectos en esta categoría</h3>
                        <p className="text-gray-400">Explora otras categorías para ver más proyectos.</p>
                    </div>
                )}

                {/* ============================================ */}
                {/* CTA SECTION */}
                {/* ============================================ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-20"
                >
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-xl" />

                        <div className="relative p-8 md:p-12 rounded-2xl border border-gray-700/30 bg-[#0a0a1a]/80 backdrop-blur-sm">
                            <div className="grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                        ¿Tienes un Proyecto en Mente?
                                    </h3>
                                    <p className="text-gray-400 leading-relaxed mb-6">
                                        Convierte tu visión en realidad. Nuestro equipo está listo para
                                        ayudarte a construir la solución digital perfecta para tu negocio.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                                        >
                                            Iniciar Proyecto
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-6 py-3 rounded-xl border border-gray-700 text-gray-300 font-medium hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
                                        >
                                            Ver Servicios
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4">
                                    {[
                                        { label: 'Tiempo promedio de entrega', value: '1-6 meses' },
                                        { label: 'Tasa de satisfacción', value: '98%' },
                                        { label: 'Soporte post-lanzamiento', value: '24/7' },
                                        { label: 'Metodología', value: 'Ágil' },
                                    ].map((item, index) => (
                                        <div key={index} className="p-4 rounded-xl border border-gray-700/30 bg-gray-800/20">
                                            <div className="text-sm text-white font-medium">{item.value}</div>
                                            <div className="text-xs text-gray-500 mt-0.5">{item.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
