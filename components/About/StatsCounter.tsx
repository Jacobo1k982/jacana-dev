'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

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

function AnimatedCounter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const duration = 2000; // 2 seconds

    useEffect(() => {
        if (!inView) return;

        const startTime = Date.now();
        const startValue = 0;
        const endValue = value;

        const animate = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);

        return () => {
            countRef.current = 0;
        };
    }, [inView, value]);

    return (
        <span>
            {count}
            {suffix}
        </span>
    );
}

export default function StatsCounter({ stats }: StatsCounterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.id}
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group"
                >
                    <div className="relative p-6 md:p-8 rounded-2xl border border-gray-700/30 bg-gradient-to-br from-gray-800/20 to-gray-900/20 backdrop-blur-sm overflow-hidden hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300">
                        {/* Background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="relative text-center">
                            {/* Value */}
                            <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                                <AnimatedCounter value={stat.value} suffix={stat.suffix} inView={isInView} />
                            </div>

                            {/* Label */}
                            <div className="text-sm md:text-base font-medium text-white mb-1">
                                {stat.label}
                            </div>

                            {/* Description */}
                            <div className="text-xs text-gray-500">
                                {stat.description}
                            </div>
                        </div>

                        {/* Decorative line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    </div>
                </motion.div>
            ))}
        </div>
    );
}
