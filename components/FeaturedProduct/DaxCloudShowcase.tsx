'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    ShoppingCart, FileCheck2, Boxes, Calculator, Store, Workflow,
    ArrowUpRight, ArrowRight, GitBranch, ChevronDown,
} from 'lucide-react';

// Color de marca de DaxCloud (coral). El resto de la sección sigue la paleta de Jacana Dev.
const CORAL = '#FF6B5E';

const CAPABILITIES = [
    { icon: ShoppingCart, title: 'POS en la nube', body: 'Efectivo, tarjeta, pago mixto y venta a crédito.' },
    { icon: FileCheck2, title: 'Facturación electrónica', body: 'Comprobantes enviados directo a Hacienda.' },
    { icon: Boxes, title: 'Inventario', body: 'Control de stock por producto y por negocio.' },
    { icon: Calculator, title: 'Contabilidad y reportes', body: 'Números del negocio en un solo dashboard.' },
    { icon: Store, title: 'Catálogo y tienda online', body: 'Pedidos en línea que llegan al POS.' },
    { icon: Workflow, title: 'Automatizaciones', body: 'Flujos con n8n: cada pedido dispara una notificación.' },
] as const;

// Arquitectura real de producción (de arriba hacia abajo)
const LAYERS = [
    { label: 'Cliente', name: 'Aplicación web', tech: 'Next.js' },
    { label: 'Entrada', name: 'Proxy inverso y SSL', tech: 'Nginx · Certbot' },
    { label: 'Servicio', name: 'API multi-tenant', tech: 'NestJS' },
    { label: 'Datos', name: 'Base de datos', tech: 'PostgreSQL · Prisma' },
] as const;

const PIPELINE = ['git push', 'GitHub Actions', 'Imagen Docker', 'Docker Compose en VPS'] as const;

const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
};

export default function DaxCloudShowcase() {
    return (
        <section id="daxcloud" className="relative py-24 md:py-32 bg-[#06051d] overflow-hidden border-t border-slate-800/40">
            <div
                className="absolute top-1/4 right-0 w-[520px] h-[520px] rounded-full blur-[150px] pointer-events-none opacity-[0.07]"
                style={{ background: CORAL }}
            />
            <div className="absolute bottom-0 left-0 w-[420px] h-[420px] rounded-full bg-lime-900/10 blur-[140px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-6 md:px-8">

                {/* ── HEADER ── */}
                <motion.div {...fadeUp} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className="mb-14 md:mb-16">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-lime-400/70 mb-5">
                        — Producto estrella
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2
                            className="text-4xl md:text-5xl lg:text-6xl font-light text-white leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            <span className="inline-flex items-center gap-4">
                                DaxCloud
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: CORAL }} aria-hidden="true" />
                            </span>
                            <br />
                            <em className="text-slate-400 not-italic">el sistema operativo de tu negocio</em>
                        </h2>
                        <p className="text-slate-500 text-sm max-w-xs leading-relaxed md:text-right">
                            Un SaaS propio de Jacana Dev, en producción. La mejor prueba de cómo construimos software.
                        </p>
                    </div>
                    <div className="mt-10 h-px bg-gradient-to-r from-slate-700/60 via-lime-400/20 to-transparent" />
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-start">

                    {/* ── LEFT: qué hace ── */}
                    <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
                            Ventas, inventario, facturación electrónica y tienda online en una sola plataforma
                            multi-negocio, pensada para comercios de Costa Rica y Latinoamérica.
                        </p>

                        <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-800/40 border border-slate-800/60">
                            {CAPABILITIES.map(({ icon: Icon, title, body }) => (
                                <li key={title} className="bg-[#080810] p-5 group">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icon className="w-4 h-4 text-lime-400/70 group-hover:text-lime-400 transition-colors" aria-hidden="true" />
                                        <h3 className="text-sm text-white font-medium">{title}</h3>
                                    </div>
                                    <p className="text-xs text-slate-500 leading-relaxed">{body}</p>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <a
                                href="https://daxcloud.shop"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#06051d] text-xs font-medium uppercase tracking-[0.15em] hover:bg-lime-50 transition-colors"
                            >
                                Visitar DaxCloud
                                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                <span className="sr-only">(se abre en una pestaña nueva)</span>
                            </a>
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-700/60 hover:border-lime-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all"
                            >
                                Ver más proyectos
                                <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </motion.div>

                    {/* ── RIGHT: arquitectura real ── */}
                    <motion.div
                        {...fadeUp}
                        transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                        className="border border-slate-800/70 bg-[#080810]/80 backdrop-blur-sm"
                    >
                        <div className="h-px bg-gradient-to-r from-transparent via-lime-400/40 to-transparent" />
                        <div className="p-6 md:p-8">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-lime-400/60 mb-1">— Bajo el capó</p>
                            <h3
                                className="text-2xl font-light text-white mb-6"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                Arquitectura en producción
                            </h3>

                            <ol className="space-y-1.5">
                                {LAYERS.map((layer, i) => (
                                    <li key={layer.label}>
                                        <div className="flex items-center justify-between gap-4 border border-slate-800/80 bg-slate-900/30 px-4 py-3">
                                            <div className="min-w-0">
                                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600">{layer.label}</p>
                                                <p className="text-sm text-slate-300">{layer.name}</p>
                                            </div>
                                            <span
                                                className="text-[10px] uppercase tracking-[0.14em] text-lime-400/80 text-right shrink-0"
                                                style={{ fontFamily: 'var(--font-mono), monospace' }}
                                            >
                                                {layer.tech}
                                            </span>
                                        </div>
                                        {i < LAYERS.length - 1 && (
                                            <ChevronDown className="w-3.5 h-3.5 mx-auto my-1 text-slate-700" aria-hidden="true" />
                                        )}
                                    </li>
                                ))}
                            </ol>

                            <div className="mt-3 flex items-center justify-between gap-4 border border-dashed border-slate-800/80 px-4 py-3">
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600">Lateral</p>
                                    <p className="text-sm text-slate-300">Automatizaciones</p>
                                </div>
                                <span className="text-[10px] uppercase tracking-[0.14em] text-lime-400/80" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                                    n8n
                                </span>
                            </div>

                            <div className="mt-6 pt-6 border-t border-slate-800/60">
                                <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-3">
                                    <GitBranch className="w-3 h-3 text-lime-400/60" aria-hidden="true" />
                                    Despliegue continuo
                                </p>
                                <ol className="flex flex-wrap items-center gap-x-2 gap-y-2">
                                    {PIPELINE.map((step, i) => (
                                        <li key={step} className="flex items-center gap-2">
                                            <span className="text-[10px] uppercase tracking-[0.12em] text-slate-400 border border-slate-800/80 px-2.5 py-1.5">
                                                {step}
                                            </span>
                                            {i < PIPELINE.length - 1 && <ArrowRight className="w-3 h-3 text-slate-700" aria-hidden="true" />}
                                        </li>
                                    ))}
                                </ol>
                                <p className="mt-4 text-[11px] text-slate-600 leading-relaxed">
                                    Monorepo con Turborepo · Docker · Nginx · migraciones con Prisma.
                                </p>
                            </div>
                        </div>
                        <div className="h-px bg-gradient-to-r from-transparent via-lime-400/15 to-transparent" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
