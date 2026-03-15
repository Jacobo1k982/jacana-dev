'use client';

import { motion } from 'framer-motion';
import {
    Sparkles, Award, Users, Eye, Heart, TrendingUp,
    LucideIcon
} from 'lucide-react';

interface Value {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
}

interface ValueCardProps {
    value: Value;
    index: number;
}

const iconMap: Record<string, LucideIcon> = {
    Sparkles,
    Award,
    Users,
    Eye,
    Heart,
    TrendUp: TrendingUp,
};

const colorVariants = {
    cyan: {
        border: 'border-cyan-500/30',
        borderHover: 'group-hover:border-cyan-400/60',
        glow: 'shadow-cyan-500/20',
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        bgSubtle: 'bg-cyan-500/5',
        gradient: 'from-cyan-500/20 to-cyan-600/5',
    },
    blue: {
        border: 'border-blue-500/30',
        borderHover: 'group-hover:border-blue-400/60',
        glow: 'shadow-blue-500/20',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        bgSubtle: 'bg-blue-500/5',
        gradient: 'from-blue-500/20 to-blue-600/5',
    },
    purple: {
        border: 'border-purple-500/30',
        borderHover: 'group-hover:border-purple-400/60',
        glow: 'shadow-purple-500/20',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        bgSubtle: 'bg-purple-500/5',
        gradient: 'from-purple-500/20 to-purple-600/5',
    },
    green: {
        border: 'border-emerald-500/30',
        borderHover: 'group-hover:border-emerald-400/60',
        glow: 'shadow-emerald-500/20',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        bgSubtle: 'bg-emerald-500/5',
        gradient: 'from-emerald-500/20 to-emerald-600/5',
    },
    pink: {
        border: 'border-pink-500/30',
        borderHover: 'group-hover:border-pink-400/60',
        glow: 'shadow-pink-500/20',
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        bgSubtle: 'bg-pink-500/5',
        gradient: 'from-pink-500/20 to-pink-600/5',
    },
    orange: {
        border: 'border-orange-500/30',
        borderHover: 'group-hover:border-orange-400/60',
        glow: 'shadow-orange-500/20',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        bgSubtle: 'bg-orange-500/5',
        gradient: 'from-orange-500/20 to-orange-600/5',
    },
};

export default function ValueCard({ value, index }: ValueCardProps) {
    const Icon = iconMap[value.icon] || Sparkles;
    const colors = colorVariants[value.color as keyof typeof colorVariants] || colorVariants.cyan;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
        >
            <div className={`relative h-full rounded-2xl border ${colors.border} ${colors.borderHover} bg-[#0a0a1a]/60 backdrop-blur-sm transition-all duration-300 overflow-hidden hover:shadow-xl ${colors.glow}`}>
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative p-6 text-center">
                    {/* Icon */}
                    <div className={`w-14 h-14 mx-auto mb-4 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className={`w-7 h-7 ${colors.text}`} />
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                        {value.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {value.description}
                    </p>
                </div>
            </div>

            {/* Number indicator */}
            <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-lg ${colors.bg} border ${colors.border} flex items-center justify-center text-sm font-bold ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                {String(index + 1).padStart(2, '0')}
            </div>
        </motion.div>
    );
}
