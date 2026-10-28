'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import SocialIcon from '@/components/SocialIcon';
import { SOCIALS } from '@/lib/socials';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface TeamMember {
    id: string;
    name: string;
    role: string;
    specialty: string;
    bio: string;
    avatar: string;
    socials: {
        linkedin?: string;
        github?: string;
        twitter?: string;
        dribbble?: string;
        facebook?: string;
    };
    skills: string[];
    color: string;
}

interface TeamCardProps {
    member: TeamMember;
    index: number;
}

// ─────────────────────────────────────────────
// MAPS
// ─────────────────────────────────────────────

const accentMap: Record<string, { text: string; border: string }> = {
    cyan: { text: 'text-sky-400', border: 'border-sky-400/30' },
    blue: { text: 'text-indigo-400', border: 'border-indigo-400/30' },
    purple: { text: 'text-violet-400', border: 'border-violet-400/30' },
    green: { text: 'text-emerald-400', border: 'border-emerald-400/30' },
    pink: { text: 'text-rose-400', border: 'border-rose-400/30' },
    orange: { text: 'text-orange-400', border: 'border-orange-400/30' },
};

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function TeamCard({ member, index }: TeamCardProps) {
    const accent = accentMap[member.color] ?? accentMap.cyan;
    const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group relative flex flex-col bg-[#080810] border border-slate-800/70 hover:border-slate-700/80 transition-colors duration-300 overflow-hidden"
        >
            {/* Top accent line on hover */}
            <div className={`absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${accent.border.replace('border-', 'bg-').replace('/30', '/60')}`} />

            {/* ── HEADER ── */}
            <div className="px-6 pt-6 pb-5 border-b border-slate-800/60">
                <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className={`w-12 h-12 flex items-center justify-center border ${accent.border} shrink-0`}>
                        <span
                            className={`text-lg font-light ${accent.text}`}
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            {initials}
                        </span>
                    </div>

                    {/* Name + role */}
                    <div className="flex-1 min-w-0">
                        <h3
                            className="text-base font-light text-white leading-tight truncate"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            {member.name}
                        </h3>
                        <p className={`text-[10px] uppercase tracking-[0.2em] ${accent.text} mt-0.5 truncate`}>
                            {member.role}
                        </p>
                        <p className="text-[10px] text-slate-600 mt-0.5 truncate">
                            {member.specialty}
                        </p>
                    </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-500 leading-relaxed mt-4 line-clamp-3">
                    {member.bio}
                </p>
            </div>

            {/* ── SKILLS ── */}
            <div className="px-6 py-4 border-b border-slate-800/60 flex flex-wrap gap-1.5">
                {member.skills.map((skill, i) => (
                    <span
                        key={i}
                        className={`px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border ${accent.border} ${accent.text}`}
                    >
                        {skill}
                    </span>
                ))}
            </div>

            {/* ── SOCIALS + CTA ── */}
            <div className="px-6 py-4 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                    {SOCIALS.map((s) => (
                        <motion.a
                            key={s.key}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${s.label}: ${s.handle}`}
                            title={`${s.label} · ${s.handle}`}
                            whileHover={{ y: -2 }}
                            className="w-8 h-8 flex items-center justify-center border border-slate-800/60 hover:border-lime-400/40 text-slate-600 hover:text-slate-300 transition-all"
                        >
                            <SocialIcon name={s.key} className="w-3.5 h-3.5" />
                        </motion.a>
                    ))}
                </div>

                <Link
                    href="/Contact"
                    className={`text-xs font-medium uppercase tracking-[0.1em] ${accent.text} hover:opacity-70 transition-opacity`}
                >
                    Hablemos →
                </Link>
            </div>
        </motion.article>
    );
}