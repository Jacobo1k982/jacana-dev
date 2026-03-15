'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ExternalLink, Users, Calendar, Clock, TrendingUp,
    Award, Quote, ChevronRight, Star, Building2
} from 'lucide-react';

interface ProjectMetrics {
    users?: string;
    transactions?: string;
    uptime?: string;
    performance?: string;
    satisfaction?: string;
    downloads?: string;
    consultations?: string;
    rating?: string;
    responseTime?: string;
    retention?: string;
    savings?: string;
    vendors?: string;
    products?: string;
    monthlySales?: string;
    conversion?: string;
    avgOrderValue?: string;
    growth?: string;
    dataProcessed?: string;
    predictions?: string;
    accuracy?: string;
    timeSaved?: string;
    insights?: string;
    roi?: string;
    drivers?: string;
    deliveries?: string;
    avgDeliveryTime?: string;
    coverage?: string;
    efficiency?: string;
    students?: string;
    courses?: string;
    completion?: string;
    hoursTaught?: string;
    schools?: string;
    properties?: string;
    agents?: string;
    sales?: string;
    avgTimeToSell?: string;
    leads?: string;
    restaurants?: string;
    ordersProcessed?: string;
    revenue?: string;
    avgServiceTime?: string;
    customerSatisfaction?: string;
    automation?: string;
    avgResponse?: string;
    queriesHandled?: string;
    costReduction?: string;
    availability?: string;
    bookings?: string;
    destinations?: string;
    partners?: string;
    nps?: string;
    repeat?: string;
    activeUsers?: string;
    workouts?: string;
    premium?: string;
    employees?: string;
    companies?: string;
    hires?: string;
    timeToHire?: string;
    fraudReduction?: string;
}

interface ProjectClient {
    name: string;
    industry: string;
    logo: string;
    website: string;
}

interface ProjectTimeline {
    duration: string;
    start: string;
    end: string;
}

interface ProjectTeam {
    size: number;
    roles: string[];
}

interface ProjectTestimonial {
    quote: string;
    author: string;
    role: string;
    avatar: string;
}

interface Project {
    id: string;
    title: string;
    slug: string;
    category: string;
    client: ProjectClient;
    shortDescription: string;
    fullDescription: string;
    technologies: string[];
    features: string[];
    metrics: ProjectMetrics;
    timeline: ProjectTimeline;
    team: ProjectTeam;
    testimonial: ProjectTestimonial;
    awards?: string[];
    featured: boolean;
    color: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

const colorVariants = {
    cyan: {
        border: 'border-cyan-500/30',
        borderHover: 'hover:border-cyan-400/60',
        glow: 'shadow-cyan-500/20',
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        bgSubtle: 'bg-cyan-500/5',
        gradient: 'from-cyan-500/30 to-cyan-600/10',
        badge: 'bg-cyan-500/20 text-cyan-400',
    },
    blue: {
        border: 'border-blue-500/30',
        borderHover: 'hover:border-blue-400/60',
        glow: 'shadow-blue-500/20',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        bgSubtle: 'bg-blue-500/5',
        gradient: 'from-blue-500/30 to-blue-600/10',
        badge: 'bg-blue-500/20 text-blue-400',
    },
    purple: {
        border: 'border-purple-500/30',
        borderHover: 'hover:border-purple-400/60',
        glow: 'shadow-purple-500/20',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        bgSubtle: 'bg-purple-500/5',
        gradient: 'from-purple-500/30 to-purple-600/10',
        badge: 'bg-purple-500/20 text-purple-400',
    },
    green: {
        border: 'border-emerald-500/30',
        borderHover: 'hover:border-emerald-400/60',
        glow: 'shadow-emerald-500/20',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        bgSubtle: 'bg-emerald-500/5',
        gradient: 'from-emerald-500/30 to-emerald-600/10',
        badge: 'bg-emerald-500/20 text-emerald-400',
    },
    orange: {
        border: 'border-orange-500/30',
        borderHover: 'hover:border-orange-400/60',
        glow: 'shadow-orange-500/20',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        bgSubtle: 'bg-orange-500/5',
        gradient: 'from-orange-500/30 to-orange-600/10',
        badge: 'bg-orange-500/20 text-orange-400',
    },
    pink: {
        border: 'border-pink-500/30',
        borderHover: 'hover:border-pink-400/60',
        glow: 'shadow-pink-500/20',
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        bgSubtle: 'bg-pink-500/5',
        gradient: 'from-pink-500/30 to-pink-600/10',
        badge: 'bg-pink-500/20 text-pink-400',
    },
};

const categoryLabels: Record<string, string> = {
    web: 'Aplicación Web',
    mobile: 'App Móvil',
    ai: 'IA & ML',
    ecommerce: 'E-commerce',
};

export default function ProjectCard({ project, index }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const colors = colorVariants[project.color as keyof typeof colorVariants] || colorVariants.cyan;

    // Get key metrics (first 3)
    const keyMetrics = Object.entries(project.metrics).slice(0, 3);

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative group rounded-2xl border ${colors.border} ${colors.borderHover} bg-[#0a0a1a]/90 backdrop-blur-sm transition-all duration-300 overflow-hidden ${isHovered ? `shadow-xl ${colors.glow}` : ''}`}
        >
            {/* Featured Badge */}
            {project.featured && (
                <div className="absolute top-4 left-4 z-20">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${colors.badge} text-xs font-semibold backdrop-blur-sm`}>
                        <Star className="w-3 h-3 fill-current" />
                        <span>Destacado</span>
                    </div>
                </div>
            )}

            {/* Header with Client Info */}
            <div className={`relative p-6 border-b border-gray-800/50`}>
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative">
                    {/* Category & Duration */}
                    <div className="flex items-center justify-between mb-3">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${colors.bgSubtle} ${colors.text} border ${colors.border}`}>
                            {categoryLabels[project.category]}
                        </span>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{project.timeline.duration}</span>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                        {project.title}
                    </h3>

                    {/* Client */}
                    <div className="flex items-center gap-2 mb-3">
                        <Building2 className={`w-4 h-4 ${colors.text}`} />
                        <div>
                            <span className="text-sm font-medium text-gray-300">{project.client.name}</span>
                            <span className="text-xs text-gray-500 ml-2">• {project.client.industry}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                        {project.shortDescription}
                    </p>
                </div>
            </div>

            {/* Metrics Section */}
            <div className="p-4 border-b border-gray-800/50">
                <div className="grid grid-cols-3 gap-2">
                    {keyMetrics.map(([key, value]) => (
                        <div key={key} className={`p-3 rounded-xl ${colors.bgSubtle} text-center`}>
                            <div className={`text-lg font-bold ${colors.text}`}>
                                {value}
                            </div>
                            <div className="text-[10px] text-gray-500 uppercase tracking-wider mt-0.5">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Technologies */}
            <div className="p-4 border-b border-gray-800/50">
                <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 5).map((tech, i) => (
                        <span
                            key={i}
                            className={`px-2 py-0.5 text-[10px] ${colors.bgSubtle} ${colors.text} rounded-full border ${colors.border}`}
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 5 && (
                        <span className={`px-2 py-0.5 text-[10px] ${colors.bgSubtle} text-gray-400 rounded-full border border-gray-700/50`}>
                            +{project.technologies.length - 5}
                        </span>
                    )}
                </div>
            </div>

            {/* Testimonial Preview */}
            {project.testimonial && (
                <div className="p-4 bg-gradient-to-r from-gray-900/50 to-transparent">
                    <div className="flex items-start gap-2">
                        <Quote className={`w-4 h-4 ${colors.text} mt-1 shrink-0`} />
                        <p className="text-xs text-gray-400 italic line-clamp-2">
                            &ldquo;{project.testimonial.quote}&rdquo;
                        </p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 ml-6">
                        <div className={`w-5 h-5 rounded-full ${colors.bg} flex items-center justify-center`}>
                            <span className={`text-[8px] font-bold ${colors.text}`}>
                                {project.testimonial.author.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                        <div>
                            <span className="text-[10px] text-gray-300">{project.testimonial.author}</span>
                            <span className="text-[10px] text-gray-500 ml-1">• {project.testimonial.role.split(',')[0]}</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Awards */}
            {project.awards && project.awards.length > 0 && (
                <div className="px-4 py-3 border-t border-gray-800/30 flex items-center gap-2">
                    <Award className={`w-4 h-4 ${colors.text}`} />
                    <span className="text-[10px] text-gray-400">{project.awards[0]}</span>
                </div>
            )}

            {/* Action Buttons */}
            <div className="p-4 flex gap-2">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowDetails(!showDetails)}
                    className={`flex-1 py-2.5 rounded-xl ${colors.bg} border ${colors.border} text-sm font-medium ${colors.text} flex items-center justify-center gap-2 hover:shadow-lg transition-all`}
                >
                    Ver Detalles
                    <ChevronRight className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-90' : ''}`} />
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2.5 rounded-xl border border-gray-700 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                >
                    <ExternalLink className="w-4 h-4" />
                </motion.button>
            </div>

            {/* Expandable Details */}
            <AnimatePresence>
                {showDetails && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 border-t border-gray-800/50 bg-gray-900/30">
                            {/* Full Description */}
                            <div className="mb-4">
                                <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                    Descripción
                                </h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    {project.fullDescription}
                                </p>
                            </div>

                            {/* Features */}
                            <div className="mb-4">
                                <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                                    Características
                                </h4>
                                <ul className="grid grid-cols-2 gap-1.5">
                                    {project.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-1.5 text-xs text-gray-400">
                                            <div className={`w-1 h-1 rounded-full ${colors.text.replace('text-', 'bg-')} mt-1.5 shrink-0`} />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Team & Timeline */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <Users className="w-3 h-3" />
                                        Equipo
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        {project.team.size} personas
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {project.team.roles.join(', ')}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" />
                                        Timeline
                                    </h4>
                                    <p className="text-sm text-gray-400">
                                        {project.timeline.start} - {project.timeline.end}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative corner accent */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${colors.gradient} blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
        </motion.div>
    );
}
