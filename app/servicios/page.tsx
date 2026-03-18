'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Globe, Smartphone, Cloud, Brain, Terminal, Shield,
    ArrowUpRight, ArrowLeft, Clock, Layers,
    CheckCircle2, ChevronDown, Code2, Zap, Database,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Service {
    id: string;
    index: string;
    icon: React.ElementType;
    title: string;
    subtitle: string;
    description: string;
    stack: string[];
    features: string[];
    timeRange: string;
    priceRange: string;
    accent: string;
    tag: string | null;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
    {
        id: 'web',
        index: '01',
        icon: Globe,
        title: 'Desarrollo Web',
        subtitle: 'Full-Stack Experiences',
        description:
            'Construimos aplicaciones web de alto rendimiento que combinan diseño excepcional con arquitectura sólida. Desde landing pages hasta plataformas SaaS complejas con miles de usuarios.',
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Prisma'],
        features: [
            'Diseño UI/UX personalizado y responsivo',
            'Autenticación y gestión de usuarios',
            'API REST & GraphQL',
            'Optimización SEO y Core Web Vitals',
            'Integración de pagos (Stripe, PayPal)',
            'Panel de administración a medida',
        ],
        timeRange: '4 – 12 semanas',
        priceRange: '$800 – $8,000',
        accent: '#f59e0b',
        tag: 'Más demandado',
    },
    {
        id: 'mobile',
        index: '02',
        icon: Smartphone,
        title: 'Apps Móviles',
        subtitle: 'iOS & Android',
        description:
            'Desarrollamos aplicaciones móviles nativas y cross-platform que ofrecen experiencias fluidas e intuitivas. Un solo código base, dos plataformas, sin comprometer calidad.',
        stack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Redux', 'Native APIs'],
        features: [
            'Desarrollo iOS y Android simultáneo',
            'Integración con hardware nativo (cámara, GPS)',
            'Notificaciones push y mensajería en tiempo real',
            'Sincronización offline-first',
            'Publicación en App Store & Google Play',
            'Analytics y monitoreo de crashes',
        ],
        timeRange: '6 – 16 semanas',
        priceRange: '$2,000 – $15,000',
        accent: '#06b6d4',
        tag: null,
    },
    {
        id: 'cloud',
        index: '03',
        icon: Cloud,
        title: 'Cloud & DevOps',
        subtitle: 'Infrastructure at Scale',
        description:
            'Diseñamos y gestionamos infraestructuras en la nube escalables, seguras y de alta disponibilidad. Tu producto en producción sin preocuparte por el servidor.',
        stack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Nginx'],
        features: [
            'Arquitectura cloud en AWS / GCP / Azure',
            'Containerización con Docker y Kubernetes',
            'Pipelines CI/CD automatizados',
            'Monitoreo y alertas con Grafana / Datadog',
            'Estrategias de backup y disaster recovery',
            'Optimización de costos cloud',
        ],
        timeRange: '2 – 6 semanas',
        priceRange: '$500 – $4,000',
        accent: '#a78bfa',
        tag: null,
    },
    {
        id: 'ai',
        index: '04',
        icon: Brain,
        title: 'Inteligencia Artificial',
        subtitle: 'LLMs · Computer Vision · ML',
        description:
            'Integramos soluciones de IA que automatizan procesos, extraen insights y añaden capacidades cognitivas reales a tu producto. No demos — IA en producción.',
        stack: ['Python', 'LangChain', 'OpenAI API', 'FastAPI', 'PyTorch', 'Vector DBs'],
        features: [
            'Chatbots y asistentes con LLMs (GPT-4, Claude)',
            'RAG — Recuperación aumentada de documentos',
            'Computer Vision y procesamiento de imágenes',
            'Pipelines de datos y ML en producción',
            'Fine-tuning de modelos especializados',
            'Automatización de flujos con agentes IA',
        ],
        timeRange: '3 – 10 semanas',
        priceRange: '$1,500 – $12,000',
        accent: '#34d399',
        tag: 'Tendencia 2025',
    },
    {
        id: 'api',
        index: '05',
        icon: Terminal,
        title: 'APIs & Backend',
        subtitle: 'Microservices · Integrations',
        description:
            'Creamos backends robustos y APIs bien documentadas que sirven de columna vertebral a cualquier producto digital. Escalables desde el día uno.',
        stack: ['Node.js', 'NestJS', 'PostgreSQL', 'Redis', 'RabbitMQ', 'Swagger'],
        features: [
            'APIs RESTful y GraphQL escalables',
            'Autenticación OAuth2 / JWT / API Keys',
            'Caché con Redis y optimización de queries',
            'Documentación automática con Swagger',
            'Rate limiting y seguridad avanzada',
            'Webhooks e integraciones con terceros',
        ],
        timeRange: '2 – 8 semanas',
        priceRange: '$600 – $5,000',
        accent: '#f97316',
        tag: null,
    },
    {
        id: 'consulting',
        index: '06',
        icon: Shield,
        title: 'Consultoría Técnica',
        subtitle: 'Architecture · Code Review · CTO-as-a-Service',
        description:
            'Aportamos criterio experto para que tomes las decisiones tecnológicas correctas. Desde elegir el stack correcto hasta auditar y rescatar código legado.',
        stack: ['System Design', 'Code Review', 'Tech Roadmap', 'Security Audit', 'Team Training'],
        features: [
            'Diseño de arquitectura de sistemas',
            'Auditoría y refactorización de código',
            'Selección de tecnologías y vendors',
            'Revisión de seguridad y OWASP',
            'Formación para equipos de desarrollo',
            'CTO Fractional / CTO-as-a-Service',
        ],
        timeRange: 'Flexible',
        priceRange: '$80 – $150 / hora',
        accent: '#fb7185',
        tag: null,
    },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useReveal(margin = '-80px') {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin });
    return { ref, inView };
}

// ─── ServiceCard ──────────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: Service; index: number }) {
    const [open, setOpen] = useState(false);
    const Icon = service.icon;

    return (
        <motion.article
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            className="group relative border border-slate-800/70 bg-[#070620]/70 backdrop-blur-sm overflow-hidden flex flex-col"
        >
            {/* Accent line top */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-px origin-left"
                style={{ background: `linear-gradient(90deg, ${service.accent}70, transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07 + 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Hover glow */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${service.accent}07, transparent)` }}
            />

            <div className="p-7 md:p-8 flex flex-col flex-1">

                {/* ── Header ── */}
                <div className="flex items-start justify-between mb-5">
                    <div className="flex items-start gap-3.5">
                        <div
                            className="flex-shrink-0 w-9 h-9 flex items-center justify-center border mt-0.5"
                            style={{ borderColor: `${service.accent}35`, background: `${service.accent}0d` }}
                        >
                            <Icon className="w-4 h-4" style={{ color: service.accent }} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span
                                    className="text-[9px] uppercase tracking-[0.32em] font-light"
                                    style={{ color: `${service.accent}70` }}
                                >
                                    {service.index}
                                </span>
                                {service.tag && (
                                    <span
                                        className="text-[8px] uppercase tracking-[0.18em] px-2 py-0.5 border"
                                        style={{
                                            color: service.accent,
                                            borderColor: `${service.accent}40`,
                                            background: `${service.accent}12`,
                                        }}
                                    >
                                        {service.tag}
                                    </span>
                                )}
                            </div>
                            <h3
                                className="text-white font-light leading-tight"
                                style={{
                                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                                    fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)',
                                }}
                            >
                                {service.title}
                            </h3>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600 mt-0.5 leading-none">
                                {service.subtitle}
                            </p>
                        </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-slate-400 transition-colors mt-1 flex-shrink-0" />
                </div>

                {/* ── Description ── */}
                <p className="text-sm text-slate-500 leading-relaxed mb-5">
                    {service.description}
                </p>

                {/* ── Stack pills ── */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                    {service.stack.map((tech) => (
                        <span
                            key={tech}
                            className="text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 border border-slate-800 text-slate-600 hover:border-slate-700 hover:text-slate-500 transition-colors"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* ── Separator ── */}
                <div
                    className="h-px mb-5"
                    style={{ background: `linear-gradient(90deg, ${service.accent}30, transparent)` }}
                />

                {/* ── Meta row ── */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                    <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-slate-700 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-[8px] uppercase tracking-[0.2em] text-slate-700 mb-0.5">Tiempo estimado</p>
                            <p className="text-xs text-slate-400">{service.timeRange}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <Layers className="w-3.5 h-3.5 text-slate-700 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-[8px] uppercase tracking-[0.2em] text-slate-700 mb-0.5">Inversión</p>
                            <p className="text-xs font-medium" style={{ color: service.accent }}>
                                {service.priceRange}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Expandable features ── */}
                <div className="mt-auto">
                    <button
                        onClick={() => setOpen(!open)}
                        className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-600 hover:text-slate-400 transition-colors"
                    >
                        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.28 }}>
                            <ChevronDown className="w-3.5 h-3.5" />
                        </motion.span>
                        {open ? 'Ocultar' : 'Ver'} qué incluye
                    </button>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden"
                            >
                                <div className="pt-4 space-y-2">
                                    {service.features.map((feat, i) => (
                                        <motion.div
                                            key={feat}
                                            initial={{ opacity: 0, x: -8 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.04 }}
                                            className="flex items-start gap-2.5"
                                        >
                                            <CheckCircle2
                                                className="w-3 h-3 mt-0.5 flex-shrink-0"
                                                style={{ color: `${service.accent}70` }}
                                            />
                                            <span className="text-xs text-slate-500 leading-snug">{feat}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </motion.article>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ServiciosPage() {
    const heading = useReveal();
    const promise = useReveal('-40px');

    return (
        <main
            className="min-h-screen bg-[#06051d] text-white"
            style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
        >
            {/* ── Noise + grid overlays ── */}
            <div
                className="fixed inset-0 opacity-[0.022] pointer-events-none z-0"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />
            <div
                className="fixed inset-0 opacity-[0.013] pointer-events-none z-0"
                style={{
                    backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '72px 72px',
                }}
            />

            {/* ── Ambient glows ── */}
            <div
                className="fixed top-0 left-1/4 w-[600px] h-[500px] pointer-events-none z-0"
                style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.05) 0%, transparent 70%)' }}
            />
            <div
                className="fixed bottom-0 right-1/4 w-[500px] h-[400px] pointer-events-none z-0"
                style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)' }}
            />

            <div className="relative z-10">

                {/* ═══════════════════════════════════════════
                    HERO DE PÁGINA
                ═══════════════════════════════════════════ */}
                <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 border-b border-slate-800/50 overflow-hidden">

                    {/* Decorative vertical lines */}
                    <div className="absolute inset-0 pointer-events-none">
                        {[15, 50, 85].map((left) => (
                            <div
                                key={left}
                                className="absolute top-0 bottom-0 w-px"
                                style={{
                                    left: `${left}%`,
                                    background: 'linear-gradient(to bottom, transparent, rgba(148,163,184,0.06) 20%, rgba(148,163,184,0.06) 80%, transparent)',
                                }}
                            />
                        ))}
                    </div>

                    <div className="max-w-7xl mx-auto px-6 md:px-8">

                        {/* Back link */}
                        <motion.div
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-12"
                        >
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-slate-600 hover:text-amber-400/70 transition-colors"
                            >
                                <ArrowLeft className="w-3 h-3" />
                                Volver al inicio
                            </Link>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                            {/* Left — heading */}
                            <div ref={heading.ref}>
                                <motion.div
                                    initial={{ opacity: 0, x: -16 }}
                                    animate={heading.inView ? { opacity: 1, x: 0 } : {}}
                                    transition={{ duration: 0.5 }}
                                    className="flex items-center gap-3 mb-6"
                                >
                                    <div className="w-6 h-px bg-amber-400/60" />
                                    <span className="text-[9px] uppercase tracking-[0.38em] text-amber-400/60">
                                        Nuestros servicios
                                    </span>
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0, y: 28 }}
                                    animate={heading.inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-light tracking-[-0.02em] leading-[1.05]"
                                    style={{
                                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                                        fontSize: 'clamp(3.5rem, 8vw, 7rem)',
                                    }}
                                >
                                    Lo que
                                    <br />
                                    <em className="text-amber-400/90 not-italic">construimos</em>
                                    <br />
                                    para ti
                                </motion.h1>

                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={heading.inView ? { scaleX: 1 } : {}}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                    className="mt-8 w-48 h-px bg-gradient-to-r from-amber-400/40 to-transparent"
                                    style={{ transformOrigin: 'left' }}
                                />
                            </div>

                            {/* Right — description + pillars */}
                            <div>
                                <motion.p
                                    initial={{ opacity: 0, y: 18 }}
                                    animate={heading.inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                    className="text-slate-400 text-base leading-relaxed mb-8 max-w-md"
                                >
                                    Somos un estudio de desarrollo full-stack especializado en crear productos digitales de alto impacto. Cada servicio está respaldado por experiencia real en producción, no experimentos.
                                </motion.p>

                                {/* Quality pillars */}
                                <motion.div
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={heading.inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.45 }}
                                    className="grid grid-cols-2 gap-3"
                                >
                                    {[
                                        { icon: Code2, label: 'Código limpio', sub: 'TypeScript · testing · docs' },
                                        { icon: Zap, label: 'Entrega ágil', sub: 'Sprints semanales' },
                                        { icon: Shield, label: 'Seguridad', sub: 'OWASP · SSL · auditorías' },
                                        { icon: Database, label: 'Soporte 30 días', sub: 'Post-entrega incluido' },
                                    ].map(({ icon: Icon, label, sub }, i) => (
                                        <motion.div
                                            key={label}
                                            initial={{ opacity: 0, y: 8 }}
                                            animate={heading.inView ? { opacity: 1, y: 0 } : {}}
                                            transition={{ delay: 0.5 + i * 0.07 }}
                                            className="flex items-start gap-2.5 p-3.5 border border-slate-800/70 bg-slate-900/20 hover:border-slate-700/60 transition-colors"
                                        >
                                            <Icon className="w-3.5 h-3.5 text-amber-400/50 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-xs text-slate-300 font-medium leading-none mb-0.5">{label}</p>
                                                <p className="text-[10px] text-slate-600">{sub}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>

                        {/* Stats strip */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={heading.inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="mt-16 flex border border-slate-800/60 divide-x divide-slate-800/60"
                        >
                            {[
                                { value: '6', label: 'Áreas de servicio' },
                                { value: '15+', label: 'Proyectos entregados' },
                                { value: '98%', label: 'Clientes satisfechos' },
                                { value: '2+', label: 'Años de experiencia' },
                            ].map(({ value, label }) => (
                                <div key={label} className="flex-1 px-6 py-4 text-center min-w-[100px]">
                                    <p
                                        className="text-2xl font-light text-white leading-none mb-1"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {value}
                                    </p>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">{label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    CARDS GRID
                ═══════════════════════════════════════════ */}
                <section className="py-24 md:py-32">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">

                        {/* Section label */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-4 mb-12"
                        >
                            <div className="w-6 h-px bg-slate-700" />
                            <span className="text-[9px] uppercase tracking-[0.35em] text-slate-700">
                                — 6 servicios disponibles
                            </span>
                        </motion.div>

                        {/* Grid — gap-px con fondo para crear efecto de líneas */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-slate-800/40">
                            {SERVICES.map((service, i) => (
                                <div key={service.id} className="bg-[#06051d]">
                                    <ServiceCard service={service} index={i} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    PROMESAS / HOW WE WORK
                ═══════════════════════════════════════════ */}
                <section className="py-20 border-t border-slate-800/50">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <div ref={promise.ref} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800/40">
                            {[
                                {
                                    num: '→',
                                    title: 'Primera consulta gratuita',
                                    body: 'Entendemos tu proyecto antes de cotizar. Sin compromisos, sin formularios de 40 campos.',
                                },
                                {
                                    num: '→',
                                    title: 'Presupuesto fijo por proyecto',
                                    body: 'Precio acordado desde el inicio. Sin sorpresas en la factura final, garantizado.',
                                },
                                {
                                    num: '→',
                                    title: '30 días de soporte incluido',
                                    body: 'Cada entrega incluye un mes de soporte post-lanzamiento sin costo adicional.',
                                },
                            ].map(({ num, title, body }, i) => (
                                <motion.div
                                    key={title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={promise.inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: i * 0.1, duration: 0.55 }}
                                    className="bg-[#06051d] p-8 md:p-10 group hover:bg-slate-900/30 transition-colors"
                                >
                                    <span
                                        className="block text-3xl font-light text-amber-400/30 mb-5 group-hover:text-amber-400/50 transition-colors"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {num}
                                    </span>
                                    <h3
                                        className="text-white font-light text-xl mb-3"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {title}
                                    </h3>
                                    <p className="text-sm text-slate-500 leading-relaxed">{body}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════
                    CTA FINAL
                ═══════════════════════════════════════════ */}
                <section className="py-24 md:py-32 border-t border-slate-800/50">
                    <div className="max-w-7xl mx-auto px-6 md:px-8">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.65 }}
                            className="relative border border-slate-800/60 bg-[#070620]/60 p-10 md:p-16 overflow-hidden"
                        >
                            {/* Decorative glow inside CTA */}
                            <div
                                className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 pointer-events-none"
                                style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.07) 0%, transparent 70%)' }}
                            />
                            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.35em] text-amber-400/60 mb-3">
                                        — Hablemos de tu proyecto
                                    </p>
                                    <h2
                                        className="font-light text-white tracking-[-0.02em] leading-tight"
                                        style={{
                                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                                        }}
                                    >
                                        ¿Tienes una idea
                                        <br />
                                        <em className="text-amber-400/90 not-italic">que quieres construir?</em>
                                    </h2>
                                    <p className="mt-4 text-sm text-slate-500 max-w-sm leading-relaxed">
                                        La primera consulta es gratuita. Cuéntanos qué necesitas y te respondemos en menos de 24 horas.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                                    <Link
                                        href="#contact"
                                        className="group inline-flex items-center gap-2.5 px-8 py-4 bg-white text-[#06051d] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors"
                                    >
                                        Iniciar proyecto
                                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </Link>
                                    <Link
                                        href="/"
                                        className="inline-flex items-center gap-2 px-6 py-4 border border-slate-700/60 hover:border-amber-400/30 text-slate-500 hover:text-slate-300 text-xs font-medium uppercase tracking-[0.15em] transition-all"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5" />
                                        Ver portafolio
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </div>
        </main>
    );
}