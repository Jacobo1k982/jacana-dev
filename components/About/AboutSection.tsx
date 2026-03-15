'use client';

import { motion } from 'framer-motion';
import {
    MapPin, Clock, Target, Eye, Rocket, Code, CheckCircle,
    Search, ClipboardList, HeadphonesIcon, ArrowRight, Sparkles
} from 'lucide-react';
import TeamCard from './TeamCard';
import ValueCard from './ValueCard';
import StatsCounter from './StatsCounter';
import aboutData from '@/data/about.json';

const processIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Search,
    ClipboardList,
    Code,
    CheckCircle,
    Rocket,
    HeadphonesIcon,
};

export default function AboutSection() {
    const { company, values, stats, team, timeline, process } = aboutData;

    return (
        <section className="relative py-20 md:py-32 bg-[#06051d] overflow-hidden min-h-screen pt-24">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl" />
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
                    className="text-center mb-16 md:mb-20"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 mb-6"
                    >
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400 font-medium">Sobre Nosotros</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        El Equipo Detrás de{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {company.name}
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
                        {company.description}
                    </p>

                    {/* Location & Timezone */}
                    <div className="flex items-center justify-center gap-6 mt-6">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <MapPin className="w-4 h-4 text-cyan-400" />
                            <span>{company.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <span>{company.timezone}</span>
                        </div>
                    </div>
                </motion.div>

                {/* ============================================ */}
                {/* STATS COUNTER */}
                {/* ============================================ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-20"
                >
                    <StatsCounter stats={stats} />
                </motion.div>

                {/* ============================================ */}
                {/* MISSION & VISION */}
                {/* ============================================ */}
                <div className="grid md:grid-cols-2 gap-6 mb-20">
                    {/* Mission */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative group"
                    >
                        <div className="relative h-full p-8 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/5 to-transparent backdrop-blur-sm overflow-hidden hover:border-cyan-400/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:opacity-75 transition-opacity" />

                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                                    <Target className="w-6 h-6 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Nuestra Misión</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {company.mission}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Vision */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative group"
                    >
                        <div className="relative h-full p-8 rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-transparent backdrop-blur-sm overflow-hidden hover:border-purple-400/40 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:opacity-75 transition-opacity" />

                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                                    <Eye className="w-6 h-6 text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Nuestra Visión</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {company.vision}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* ============================================ */}
                {/* VALUES */}
                {/* ============================================ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Nuestros Valores
                        </h3>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Los principios que guían cada decisión y línea de código que escribimos.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {values.map((value, index) => (
                            <ValueCard key={value.id} value={value} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* ============================================ */}
                {/* TEAM */}
                {/* ============================================ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Nuestro Equipo
                        </h3>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Profesionales apasionados que hacen posible cada proyecto.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {team.map((member, index) => (
                            <TeamCard key={member.id} member={member} index={index} />
                        ))}
                    </div>
                </motion.div>

                {/* ============================================ */}
                {/* PROCESS */}
                {/* ============================================ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Nuestro Proceso
                        </h3>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            Una metodología probada para entregar proyectos exitosos.
                        </p>
                    </div>

                    <div className="relative">
                        {/* Connection line */}
                        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent transform -translate-y-1/2" />

                        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
                            {process.map((step, index) => {
                                const Icon = processIcons[step.icon] || Code;
                                return (
                                    <motion.div
                                        key={step.step}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                        className="relative group"
                                    >
                                        <div className="relative p-5 rounded-xl border border-gray-700/30 bg-[#0a0a1a]/80 backdrop-blur-sm hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-300">
                                            {/* Step number */}
                                            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
                                                {step.step}
                                            </div>

                                            {/* Icon */}
                                            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform">
                                                <Icon className="w-5 h-5 text-cyan-400" />
                                            </div>

                                            {/* Content */}
                                            <h4 className="text-base font-semibold text-white text-center mb-1">
                                                {step.title}
                                            </h4>
                                            <p className="text-xs text-gray-400 text-center mb-2">
                                                {step.description}
                                            </p>
                                            <div className="text-[10px] text-cyan-400/60 text-center font-medium">
                                                {step.duration}
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>

                {/* ============================================ */}
                {/* TIMELINE */}
                {/* ============================================ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20"
                >
                    <div className="text-center mb-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                            Nuestra Historia
                        </h3>
                        <p className="text-gray-400 max-w-xl mx-auto">
                            El camino que nos ha traído hasta aquí.
                        </p>
                    </div>

                    <div className="relative max-w-3xl mx-auto">
                        {/* Timeline line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 via-blue-500/50 to-purple-500/50 transform md:-translate-x-1/2" />

                        {timeline.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`relative flex items-center mb-8 last:mb-0 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Year bubble */}
                                <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-white transform -translate-x-1/2 z-10 shadow-lg shadow-cyan-500/30">
                                    {item.year.toString().slice(-2)}
                                </div>

                                {/* Content */}
                                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'
                                    }`}>
                                    <div className="p-4 rounded-xl border border-gray-700/30 bg-[#0a0a1a]/80 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300">
                                        <div className="text-lg font-bold text-cyan-400 mb-1">
                                            {item.year}
                                        </div>
                                        <h4 className="text-base font-semibold text-white mb-1">
                                            {item.title}
                                        </h4>
                                        <p className="text-sm text-gray-400">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* ============================================ */}
                {/* CTA */}
                {/* ============================================ */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl" />
                        <div className="relative p-8 md:p-12 rounded-2xl border border-gray-700/30 bg-[#0a0a1a]/80 backdrop-blur-sm">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                                ¿Listo para Trabajar Juntos?
                            </h3>
                            <p className="text-gray-400 max-w-xl mx-auto mb-6">
                                Contáctanos y descubre cómo podemos transformar tu visión en realidad digital.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all flex items-center gap-2"
                                >
                                    Contactar Ahora
                                    <ArrowRight className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-8 py-3.5 rounded-xl border border-gray-700 text-gray-300 font-medium hover:border-cyan-500/30 hover:text-cyan-400 transition-all"
                                >
                                    Ver Proyectos
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
