'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface Stat {
    id: string;
    value: number;
    suffix: string;
    label: string;
    description: string;
}

interface StatsCounterProps {
    stats: Stat[];
}

// ─────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────

function AnimatedCounter({ value, suffix, inView }: {
    value: number;
    suffix: string;
    inView: boolean;
}) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!inView) return;

        const startTime = Date.now();
        const duration = 1800;

        const tick = () => {
            const progress = Math.min((Date.now() - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
            setCount(Math.floor(value * eased));
            if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
    }, [inView, value]);

    return <>{count}{suffix}</>;
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function StatsCounter({ stats }: StatsCounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <div
            ref={ref}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800/40"
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="group bg-[#080810] px-6 py-8 md:px-8 md:py-10 text-center hover:bg-slate-900/40 transition-colors relative overflow-hidden"
                >
                    {/* Hover top line */}
                    <div className="absolute top-0 left-0 right-0 h-px bg-amber-400/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />

                    {/* Value */}
                    <div
                        className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-none mb-3"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={inView} />
                    </div>

                    {/* Label */}
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-slate-400 mb-1">
                        {stat.label}
                    </p>

                    {/* Description */}
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                        {stat.description}
                    </p>
                </motion.div>
            ))}
        </div>
    );
}