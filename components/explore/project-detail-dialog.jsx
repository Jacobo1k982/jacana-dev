'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    X, CheckCircle2, Star, Clock, Users, Calendar, Building2,
    ArrowRight, Code, Server, Smartphone, Cloud, Database, Brain,
    ShoppingCart, Wallet, Heart, Truck, ExternalLink, MapPin,
    TrendingUp, Award, Target, Layers
} from 'lucide-react';
import projectDetailsData from '@/data/projectDetails.json';

// Icon map
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Monitor: Code, Server, Smartphone, Cloud, Database, Brain,
    ShoppingCart, Wallet, Heart, Truck
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
    }
};

interface ProjectDetailDialogProps {
    projectId: string | null;
    onClose: () => void;
}

export function ProjectDetailDialog({ projectId, onClose }: ProjectDetailDialogProps) {
    if (!projectId) return null;

    const project = projectDetailsData[projectId as keyof typeof projectDetailsData];
    if (!project) return null;

    const Icon = iconMap[project.icon] || Code;
    const theme = colorThemes[project.color] || colorThemes.cyan;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-[#0a0a1f] border border-white/10 rounded-3xl shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>

                    {/* Scrollable content */}
                    <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                        {/* Header */}
                        <div className={`relative h-56 bg-gradient-to-br ${theme.gradient} p-8`}>
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
                            <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

                            <div className="relative h-full flex flex-col justify-end">
                                <div className="flex items-end gap-4">
                                    <div className={`w-16 h-16 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center`}>
                                        <Icon className={`w-8 h-8 ${theme.text}`} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm text-white/70">{project.category}</span>
                                            <span className="text-white/40">•</span>
                                            <span className="text-sm text-white/70">{project.year}</span>
                                        </div>
                                        <h2 className="text-3xl font-bold text-white">{project.title}</h2>
                                        <p className="text-white/80">{project.subtitle}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Project info bar */}
                        <div className="flex flex-wrap items-center gap-6 px-8 py-4 border-b border-white/5 bg-white/5">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-400">{project.client}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-400">{project.industry}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-400">{project.duration}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-400">{project.team}</span>
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Sobre el Proyecto</h3>
                                <p className="text-gray-400 leading-relaxed">{project.longDescription}</p>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                                {Object.entries(project.stats).slice(0, 6).map(([key, value]) => (
                                    <div key={key} className={`p-4 rounded-xl ${theme.bg} border ${theme.border} text-center`}>
                                        <div className={`text-xl font-bold ${theme.text}`}>{value}</div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{key}</div>
                                    </div>
                                ))}
                            </div>

                            {/* Highlights */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Resultados Destacados</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {project.highlights.map((highlight, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                                        >
                                            <div className={`w-8 h-8 rounded-lg ${theme.bg} flex items-center justify-center`}>
                                                <TrendingUp className={`w-4 h-4 ${theme.text}`} />
                                            </div>
                                            <span className="text-sm text-gray-300">{highlight}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Características Principales</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {project.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className={`p-4 rounded-xl ${theme.bg} border ${theme.border}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <CheckCircle2 className={`w-5 h-5 ${theme.text} shrink-0 mt-0.5`} />
                                                <div>
                                                    <h4 className="font-medium text-white">{feature.name}</h4>
                                                    <p className="text-sm text-gray-500">{feature.description}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Stack Tecnológico</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {project.technologies.map((tech, idx) => (
                                        <div
                                            key={idx}
                                            className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors"
                                        >
                                            <div className={`text-sm font-medium ${theme.text}`}>{tech.name}</div>
                                            <div className="text-xs text-gray-500">{tech.category}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Architecture */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Arquitectura del Sistema</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                                    {Object.entries(project.architecture).map(([key, value], idx) => (
                                        <div
                                            key={key}
                                            className="p-4 rounded-xl bg-white/5 border border-white/10"
                                        >
                                            <div className="flex items-center gap-2 mb-2">
                                                <Layers className={`w-4 h-4 ${theme.text}`} />
                                                <span className="text-sm font-medium text-white capitalize">{key}</span>
                                            </div>
                                            <p className="text-xs text-gray-500">{value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial */}
                            {project.testimonials && project.testimonials.length > 0 && (
                                <div className={`p-6 rounded-xl ${theme.bg} border ${theme.border}`}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
                                            {project.testimonials[0].author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="text-gray-300 italic mb-3">&ldquo;{project.testimonials[0].quote}&rdquo;</p>
                                            <div className="font-medium text-white">{project.testimonials[0].author}</div>
                                            <div className="text-sm text-gray-500">{project.testimonials[0].role}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/5">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${theme.gradient} text-white font-bold rounded-xl`}
                                >
                                    <span>Ver Sitio en Vivo</span>
                                    <ExternalLink className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
                                >
                                    <span>Proyecto Similar</span>
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
