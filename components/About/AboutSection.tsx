'use client';

import { motion } from 'framer-motion';
import {
    MapPin, Clock, Target, Eye, Rocket, Code, CheckCircle,
    Search, ClipboardList, HeadphonesIcon, ArrowRight
} from 'lucide-react';
import TeamCard from './TeamCard';
import ValueCard from './ValueCard';
import StatsCounter from './StatsCounter';
import aboutData from '@/data/about.json';

// ─────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────

const processIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Search, ClipboardList, Code, CheckCircle, Rocket, HeadphonesIcon,
};

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────

function SectionLabel({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div className="w-6 h-px bg-amber-400/60" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400/70">{label}</span>
        </div>
    );
}

function SectionHeader({ title, subtitle, center = false }: { title: React.ReactNode; subtitle?: string; center?: boolean }) {
    return (
        <div className={`mb-12 ${center ? 'text-center' : ''}`}>
            <h3
                className="text-3xl md:text-4xl font-light text-white leading-snug mb-3"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
                {title}
            </h3>
            {subtitle && (
                <p className="text-slate-500 text-sm max-w-xl leading-relaxed mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function AboutSection() {
    const { company, values, stats, team, timeline, process } = aboutData;

    return (
        <section className="relative py-24 md:py-36 bg-[#080810] overflow-hidden">

            {/* Grain */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full bg-amber-900/8 blur-[140px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 md:px-8">

                {/* ── HEADER ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20"
                >
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/70 mb-5">
                        — Sobre nosotros
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            El equipo detrás de<br />
                            <em className="text-slate-400 not-italic">{company.name}</em>
                        </h2>
                        <div className="space-y-3 md:text-right">
                            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                                {company.description}
                            </p>
                            <div className="flex items-center md:justify-end gap-5">
                                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                    <MapPin className="w-3 h-3 text-amber-400/50" />
                                    {company.location}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                    <Clock className="w-3 h-3 text-amber-400/50" />
                                    {company.timezone}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 h-px bg-gradient-to-r from-slate-700/60 via-amber-400/20 to-transparent" />
                </motion.div>

                {/* ── STATS ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-24"
                >
                    <StatsCounter stats={stats} />
                </motion.div>

                {/* ── MISSION & VISION ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <SectionLabel label="Propósito" />
                    <div className="grid md:grid-cols-2 gap-px bg-slate-800/40">
                        {/* Mission */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="group bg-[#080810] px-8 py-8 hover:bg-slate-900/40 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 flex items-center justify-center border border-slate-700/60 group-hover:border-amber-400/40 transition-colors">
                                    <Target className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400/70 transition-colors" />
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600">Misión</p>
                            </div>
                            <p
                                className="text-xl font-light text-white leading-snug mb-4"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                {company.mission}
                            </p>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="group bg-[#080810] px-8 py-8 hover:bg-slate-900/40 transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-8 h-8 flex items-center justify-center border border-slate-700/60 group-hover:border-amber-400/40 transition-colors">
                                    <Eye className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400/70 transition-colors" />
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600">Visión</p>
                            </div>
                            <p
                                className="text-xl font-light text-white leading-snug mb-4"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                {company.vision}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* ── VALUES ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <SectionLabel label="Valores" />
                    <SectionHeader
                        title={<>Nuestros<br /><em className="text-slate-400 not-italic">valores</em></>}
                        subtitle="Los principios que guían cada decisión y línea de código que escribimos."
                    />
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-slate-800/30">
                        {values.map((value, index) => (
                            <ValueCard key={value.id} value={value} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* ── TEAM ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <SectionLabel label="Equipo" />
                    <SectionHeader
                        title={<>Nuestro<br /><em className="text-slate-400 not-italic">equipo</em></>}
                        subtitle="Profesionales apasionados que hacen posible cada proyecto."
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/30">
                        {team.map((member, index) => (
                            <TeamCard key={member.id} member={member} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* ── PROCESS ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <SectionLabel label="Metodología" />
                    <SectionHeader
                        title={<>Nuestro<br /><em className="text-slate-400 not-italic">proceso</em></>}
                        subtitle="Una metodología probada para entregar proyectos exitosos."
                    />

                    <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-px bg-slate-800/30">
                        {process.map((step, index) => {
                            const Icon = processIcons[step.icon] ?? Code;
                            return (
                                <motion.div
                                    key={step.step}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                    className="group bg-[#080810] px-5 py-6 hover:bg-slate-900/40 transition-colors flex flex-col items-center text-center"
                                >
                                    {/* Step number */}
                                    <span
                                        className="text-4xl font-light text-slate-800 group-hover:text-slate-700 transition-colors leading-none mb-4 select-none"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {String(step.step).padStart(2, '0')}
                                    </span>

                                    <div className="w-8 h-8 flex items-center justify-center border border-slate-700/60 group-hover:border-amber-400/40 transition-colors mb-3">
                                        <Icon className="w-3.5 h-3.5 text-slate-600 group-hover:text-amber-400/70 transition-colors" />
                                    </div>

                                    <h4 className="text-xs font-medium uppercase tracking-[0.1em] text-white mb-2">
                                        {step.title}
                                    </h4>
                                    <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                                        {step.description}
                                    </p>
                                    <span className="text-[9px] uppercase tracking-[0.2em] text-amber-400/50">
                                        {step.duration}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* ── TIMELINE ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-24"
                >
                    <SectionLabel label="Historia" />
                    <SectionHeader
                        title={<>Nuestra<br /><em className="text-slate-400 not-italic">historia</em></>}
                        subtitle="El camino que nos ha traído hasta aquí."
                    />

                    <div className="max-w-3xl space-y-0 border-l border-slate-800/60 ml-3">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: -16 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative flex gap-8 pb-8 last:pb-0 pl-8"
                            >
                                {/* Year dot */}
                                <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] flex items-center justify-center border border-slate-700/60 bg-[#080810] group-hover:border-amber-400/40 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400/60 transition-colors" />
                                </div>

                                <div className="flex-1">
                                    <p
                                        className="text-2xl font-light text-amber-400/70 leading-none mb-2"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {item.year}
                                    </p>
                                    <h4 className="text-sm font-medium text-white mb-1">{item.title}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ── CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent mb-16" />

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/70 mb-4">
                                — Siguiente paso
                            </p>
                            <h3
                                className="text-3xl md:text-4xl font-light text-white leading-snug"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                ¿Listo para<br />
                                <em className="text-slate-400 not-italic">trabajar juntos?</em>
                            </h3>
                        </div>
                        <div className="flex flex-wrap gap-3 shrink-0">
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="group flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors"
                            >
                                Contactar ahora
                                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </motion.a>
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex items-center gap-2 px-6 py-3.5 border border-slate-700/60 hover:border-amber-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all"
                            >
                                Ver proyectos
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}