'use client';

import { motion } from 'framer-motion';
import { Sparkles, Award, Users, Eye, Heart, TrendingUp, LucideIcon } from 'lucide-react';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

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

// ─────────────────────────────────────────────
// MAPS
// ─────────────────────────────────────────────

const iconMap: Record<string, LucideIcon> = {
    Sparkles,
    Award,
    Users,
    Eye,
    Heart,
    TrendUp: TrendingUp,
};

const accentMap: Record<string, { text: string; border: string; bar: string }> = {
    cyan: { text: 'text-sky-400', border: 'border-sky-400/30', bar: 'bg-sky-400/60' },
    blue: { text: 'text-indigo-400', border: 'border-indigo-400/30', bar: 'bg-indigo-400/60' },
    purple: { text: 'text-violet-400', border: 'border-violet-400/30', bar: 'bg-violet-400/60' },
    green: { text: 'text-emerald-400', border: 'border-emerald-400/30', bar: 'bg-emerald-400/60' },
    pink: { text: 'text-rose-400', border: 'border-rose-400/30', bar: 'bg-rose-400/60' },
    orange: { text: 'text-orange-400', border: 'border-orange-400/30', bar: 'bg-orange-400/60' },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function ValueCard({ value, index }: ValueCardProps) {
    const Icon = iconMap[value.icon] ?? Sparkles;
    const accent = accentMap[value.color] ?? accentMap.cyan;

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group relative bg-[#080810] border border-slate-800/70 hover:border-slate-700/80 transition-colors duration-300 overflow-hidden flex flex-col"
        >
            {/* Top accent line on hover */}
            <div className={`absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${accent.bar}`} />

            <div className="px-5 py-6 flex flex-col items-center text-center gap-4 flex-1">
                {/* Step number — decorative, behind content */}
                <span
                    className="absolute top-3 right-3 text-[10px] font-medium text-slate-800 group-hover:text-slate-700 transition-colors select-none"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                    {String(index + 1).padStart(2, '0')}
                </span>

                {/* Icon */}
                <div className={`w-10 h-10 flex items-center justify-center border ${accent.border} group-hover:border-opacity-60 transition-colors`}>
                    <Icon className={`w-4 h-4 ${accent.text}`} />
                </div>

                {/* Title */}
                <h3
                    className="text-base font-light text-white leading-tight"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                    {value.title}
                </h3>

                {/* Description */}
                <p className="text-[11px] text-slate-600 leading-relaxed group-hover:text-slate-500 transition-colors">
                    {value.description}
                </p>
            </div>
        </motion.article>
    );
}