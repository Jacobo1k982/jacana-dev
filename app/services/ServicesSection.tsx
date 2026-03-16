'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import FrontendService from '@/app/services/FrontendService/page';
import BackendService from '@/app/services/BackendService/page';
import MobileService from '@/app/services/MobileService/page';
import CloudService from '@/app/services/CloudService/page';
import DatabaseService from '@/app/services/DatabaseService/page';
import AIService from '@/app/services/AIService/page';
import APIService from '@/app/services/APIService/page';
import ConsultingService from '@/app/services/ConsultingService/page';

export default function ServicesSection() {
    return (
        <section id="services" className="relative py-24 md:py-36 overflow-hidden bg-[#080810]">

            {/* Grain */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0  w-[400px] h-[400px] rounded-full bg-amber-900/8  blur-[140px] pointer-events-none" />

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
                        — Nuestros servicios
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            Soluciones<br />
                            <em className="text-slate-400 not-italic">fullstack completas</em>
                        </h2>
                        <p className="text-slate-500 text-sm max-w-xs leading-relaxed md:text-right">
                            Un ecosistema completo de servicios de desarrollo para transformar tu visión en realidad.
                            Cada servicio puede contratarse de forma independiente.
                        </p>
                    </div>
                    <div className="mt-10 h-px bg-gradient-to-r from-slate-700/60 via-amber-400/20 to-transparent" />
                </motion.div>

                {/* ── GRID ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800/30">
                    <FrontendService />
                    <BackendService />
                    <MobileService />
                    <CloudService />
                    <DatabaseService />
                    <AIService />
                    <APIService />
                    <ConsultingService />
                </div>

                {/* ── CTA ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="mt-16"
                >
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent mb-12" />

                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                        <p className="text-slate-600 text-sm max-w-sm leading-relaxed">
                            ¿No encuentras lo que buscas? Podemos crear soluciones personalizadas para tu negocio.
                        </p>
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="group flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors shrink-0"
                        >
                            Contactar ahora
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </motion.a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}