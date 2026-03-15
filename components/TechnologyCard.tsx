'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronRight, ExternalLink, Zap, Users, BookOpen,
    CheckCircle2, Circle
} from 'lucide-react';

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

const colorVariants = {
    cyan: {
        border: 'border-cyan-500/30',
        borderHover: 'hover:border-cyan-400/60',
        glow: 'shadow-cyan-500/20',
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        bgSubtle: 'bg-cyan-500/5',
        gradient: 'from-cyan-500/20 to-cyan-600/5',
        bar: 'bg-gradient-to-r from-cyan-400 to-cyan-600',
    },
    blue: {
        border: 'border-blue-500/30',
        borderHover: 'hover:border-blue-400/60',
        glow: 'shadow-blue-500/20',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        bgSubtle: 'bg-blue-500/5',
        gradient: 'from-blue-500/20 to-blue-600/5',
        bar: 'bg-gradient-to-r from-blue-400 to-blue-600',
    },
    purple: {
        border: 'border-purple-500/30',
        borderHover: 'hover:border-purple-400/60',
        glow: 'shadow-purple-500/20',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        bgSubtle: 'bg-purple-500/5',
        gradient: 'from-purple-500/20 to-purple-600/5',
        bar: 'bg-gradient-to-r from-purple-400 to-purple-600',
    },
    green: {
        border: 'border-emerald-500/30',
        borderHover: 'hover:border-emerald-400/60',
        glow: 'shadow-emerald-500/20',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        bgSubtle: 'bg-emerald-500/5',
        gradient: 'from-emerald-500/20 to-emerald-600/5',
        bar: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
    },
    orange: {
        border: 'border-orange-500/30',
        borderHover: 'hover:border-orange-400/60',
        glow: 'shadow-orange-500/20',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        bgSubtle: 'bg-orange-500/5',
        gradient: 'from-orange-500/20 to-orange-600/5',
        bar: 'bg-gradient-to-r from-orange-400 to-orange-600',
    },
    pink: {
        border: 'border-pink-500/30',
        borderHover: 'hover:border-pink-400/60',
        glow: 'shadow-pink-500/20',
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        bgSubtle: 'bg-pink-500/5',
        gradient: 'from-pink-500/20 to-pink-600/5',
        bar: 'bg-gradient-to-r from-pink-400 to-pink-600',
    },
};

const statIcons = {
    performance: Zap,
    popularity: Users,
    learning: BookOpen,
};

export default function TechnologyCard({ technology, color, index }: TechnologyCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const colors = colorVariants[color as keyof typeof colorVariants] || colorVariants.cyan;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative group rounded-2xl border ${colors.border} ${colors.borderHover} bg-[#0a0a1a]/80 backdrop-blur-sm transition-all duration-300 overflow-hidden ${isHovered ? `shadow-xl ${colors.glow}` : ''}`}
        >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Content */}
            <div className="relative p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        {/* Icon container */}
                        <div className={`w-12 h-12 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                            <span className={`text-xl font-bold ${colors.text}`}>
                                {technology.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-white transition-colors">
                                {technology.name}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs ${colors.text} font-medium`}>
                                    {technology.category}
                                </span>
                                {technology.version !== 'N/A' && (
                                    <>
                                        <span className="text-gray-600">•</span>
                                        <span className="text-xs text-gray-500">
                                            v{technology.version}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Expand button */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`w-8 h-8 rounded-lg ${colors.bgSubtle} border ${colors.border} flex items-center justify-center transition-all`}
                    >
                        <motion.div
                            animate={{ rotate: isExpanded ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronRight className={`w-4 h-4 ${colors.text}`} />
                        </motion.div>
                    </motion.button>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                    {technology.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(technology.stats).map(([key, value]) => {
                        const Icon = statIcons[key as keyof typeof statIcons];
                        return (
                            <div key={key} className={`p-2 rounded-lg ${colors.bgSubtle}`}>
                                <div className="flex items-center gap-1 mb-1">
                                    <Icon className={`w-3 h-3 ${colors.text}`} />
                                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">
                                        {key === 'learning' ? 'Learning' : key}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${value}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                                            className={`h-full ${colors.bar} rounded-full`}
                                        />
                                    </div>
                                    <span className="text-xs font-medium text-white">
                                        {value}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Expanded Features */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className={`pt-4 border-t border-gray-800/50`}>
                                <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                                    Características Principales
                                </h4>
                                <ul className="space-y-2">
                                    {technology.features.map((feature, i) => (
                                        <motion.li
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-start gap-2"
                                        >
                                            <CheckCircle2 className={`w-4 h-4 ${colors.text} mt-0.5 shrink-0`} />
                                            <span className="text-sm text-gray-300">
                                                {feature}
                                            </span>
                                        </motion.li>
                                    ))}
                                </ul>

                                {/* Action button */}
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full mt-4 py-2.5 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center gap-2 text-sm font-medium ${colors.text} hover:${colors.bg} transition-all`}
                                >
                                    Ver Documentación
                                    <ExternalLink className="w-4 h-4" />
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Quick features preview when collapsed */}
                {!isExpanded && (
                    <div className="flex flex-wrap gap-1.5">
                        {technology.features.slice(0, 3).map((feature, i) => (
                            <span
                                key={i}
                                className={`px-2 py-0.5 text-[10px] ${colors.bgSubtle} ${colors.text} rounded-full border ${colors.border}`}
                            >
                                {feature.split(' ').slice(0, 3).join(' ')}
                            </span>
                        ))}
                        {technology.features.length > 3 && (
                            <span className={`px-2 py-0.5 text-[10px] ${colors.bgSubtle} ${colors.text} rounded-full border ${colors.border}`}>
                                +{technology.features.length - 3} más
                            </span>
                        )}
                    </div>
                )}
            </div>

            {/* Decorative corner accent */}
            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colors.gradient} blur-2xl opacity-50 group-hover:opacity-75 transition-opacity`} />
        </motion.div>
    );
}
