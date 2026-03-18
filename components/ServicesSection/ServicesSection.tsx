'use client';

import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
    Globe, Smartphone, Cloud, Brain, Terminal, ArrowUpRight,
    Clock, Layers, CheckCircle2, ChevronDown, Zap, Shield, Database, Code2
} from 'lucide-react';

// ─── Data ────────────────────────────────────────────────────────────────────

const SERVICES = [
    {
        id: 'web',
        index: '01',
        icon: Globe,
        title: 'Desarrollo Web',
        subtitle: 'Full-Stack Experiences',
        description:
            'Construimos aplicaciones web de alto rendimiento que combinan diseño excepcional con arquitectura sólida. Desde landing pages hasta plataformas SaaS complejas.',
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
            'Desarrollamos aplicaciones móviles nativas y cross-platform que ofrecen experiencias fluidas e intuitivas en cualquier dispositivo.',
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
            'Diseñamos y gestionamos infraestructuras en la nube escalables, seguras y de alta disponibilidad. CI/CD, contenedores y monitoreo incluidos.',
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
            'Integramos soluciones de IA que automatizan procesos, extraen insights y añaden capacidades cognitivas reales a tu producto.',
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
            'Creamos backends robustos y APIs bien documentadas que sirven de columna vertebral a cualquier producto digital moderno.',
        stack: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'Redis', 'Swagger'],
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
            'Aportamos criterio experto para que tomes las decisiones tecnológicas correctas: desde elegir el stack hasta auditar código legado.',
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

// ─── Sub-components ───────────────────────────────────────────────────────────

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
    const [expanded, setExpanded] = useState(false);
    const Icon = service.icon;

    return (
        <motion.article
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative border border-slate-800/60 bg-[#06051d]/60 backdrop-blur-sm overflow-hidden"
            style={{ '--accent': service.accent } as React.CSSProperties}
        >
            {/* Top accent line */}
            <motion.div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${service.accent}50, transparent)` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 + 0.3, duration: 0.8 }}
            />

            {/* Glow on hover */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                style={{ background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${service.accent}08, transparent)` }}
            />

            <div className="p-6 md:p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                        <div
                            className="flex-shrink-0 w-10 h-10 flex items-center justify-center border"
                            style={{ borderColor: `${service.accent}30`, background: `${service.accent}10` }}
                        >
                            <Icon className="w-4 h-4" style={{ color: service.accent }} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-0.5">
                                <span className="text-[9px] uppercase tracking-[0.3em]" style={{ color: `${service.accent}80` }}>
                                    {service.index}
                                </span>
                                {service.tag && (
                                    <span
                                        className="text-[8px] uppercase tracking-[0.2em] px-2 py-0.5 border"
                                        style={{ color: service.accent, borderColor: `${service.accent}40`, background: `${service.accent}10` }}
                                    >
                                        {service.tag}
                                    </span>
                                )}
                            </div>
                            <h3
                                className="text-white font-light text-xl leading-tight"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                {service.title}
                            </h3>
                            <p className="text-[10px] uppercase tracking-[0.18em] text-slate-600 mt-0.5">{service.subtitle}</p>
                        </div>
                    </div>

                    <ArrowUpRight
                        className="w-4 h-4 text-slate-700 group-hover:text-slate-400 transition-colors mt-1 flex-shrink-0"
                    />
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {service.description}
                </p>

                {/* Stack pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.stack.map((tech) => (
                        <span
                            key={tech}
                            className="text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 border border-slate-800 text-slate-600"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Separator */}
                <div
                    className="h-px mb-6"
                    style={{ background: `linear-gradient(90deg, ${service.accent}30, transparent)` }}
                />

                {/* Time & Price */}
                <div className="grid grid-cols-2 gap-4 mb-6">
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
                            <p className="text-[8px] uppercase tracking-[0.2em] text-slate-700 mb-0.5">Rango de inversión</p>
                            <p className="text-xs" style={{ color: service.accent }}>{service.priceRange}</p>
                        </div>
                    </div>
                </div>

                {/* Expandable features */}
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-600 hover:text-slate-400 transition-colors w-full text-left"
                >
                    <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown className="w-3.5 h-3.5" />
                    </motion.div>
                    {expanded ? 'Ocultar' : 'Ver'} incluye
                </button>

                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 space-y-2">
                                {service.features.map((feature, i) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, x: -8 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.045 }}
                                        className="flex items-start gap-2.5"
                                    >
                                        <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: `${service.accent}70` }} />
                                        <span className="text-xs text-slate-500">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.article>
    );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ServicesSection() {
    const headingRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(headingRef, { once: true, margin: '-80px' });

    return (
        <section
            id="explore"
            className="relative bg-[#06051d] py-28 md:py-36"
            style={{ fontFamily: "'Inter', 'Helvetica Neue', sans-serif" }}
        >
            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Ambient glow */}
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
                style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)' }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

                {/* ── Section header ── */}
                <div ref={headingRef} className="mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-4 mb-6"
                    >
                        <div className="w-8 h-px bg-amber-400/60" />
                        <span className="text-[9px] uppercase tracking-[0.35em] text-amber-400/60">
                            Servicios
                        </span>
                    </motion.div>

                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 24 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-light text-white tracking-[-0.02em]"
                            style={{
                                fontFamily: "'Cormorant Garamond', Georgia, serif",
                                fontSize: 'clamp(3rem, 7vw, 6rem)',
                                lineHeight: 1.05,
                            }}
                        >
                            Qué podemos
                            <br />
                            <em className="text-amber-400/90 not-italic">construir juntos</em>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.25 }}
                            className="text-sm text-slate-500 max-w-xs leading-relaxed md:text-right"
                        >
                            Cada servicio está respaldado por años de experiencia real en proyectos de producción.
                        </motion.p>
                    </div>

                    {/* Stats bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-10 flex flex-wrap gap-0 border border-slate-800/60"
                    >
                        {[
                            { icon: Code2, label: 'Stack moderno', value: '10+ tecnologías' },
                            { icon: Zap, label: 'Entrega ágil', value: 'Sprints semanales' },
                            { icon: Shield, label: 'Código limpio', value: 'Calidad garantizada' },
                            { icon: Database, label: 'Soporte post-entrega', value: '30 días incluidos' },
                        ].map(({ icon: Icon, label, value }, i) => (
                            <div
                                key={label}
                                className="flex items-center gap-3 px-5 py-3.5 border-r border-slate-800/60 last:border-r-0 flex-1 min-w-[160px]"
                            >
                                <Icon className="w-3.5 h-3.5 text-amber-400/50 flex-shrink-0" />
                                <div>
                                    <p className="text-[8px] uppercase tracking-[0.2em] text-slate-700">{label}</p>
                                    <p className="text-xs text-slate-400 mt-0.5">{value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* ── Cards grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px bg-slate-800/30">
                    {SERVICES.map((service, i) => (
                        <div key={service.id} className="bg-[#06051d]">
                            <ServiceCard service={service} index={i} />
                        </div>
                    ))}
                </div>

                {/* ── CTA footer ── */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800/60 bg-[#06051d]/80 p-8"
                >
                    <div>
                        <p
                            className="text-white font-light text-2xl mb-1"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            ¿Tienes un proyecto en mente?
                        </p>
                        <p className="text-sm text-slate-500">
                            Cuéntanos tu idea — la primera consulta es gratuita.
                        </p>
                    </div>
                    <a
                        href="#contact"
                        className="group flex items-center gap-2.5 px-8 py-4 bg-white text-[#06051d] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors flex-shrink-0"
                    >
                        Hablemos
                        <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}