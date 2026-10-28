'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SITE_STATS } from '@/lib/site-stats';
import { getTechEvidence } from '@/lib/tech-evidence';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plug, ArrowRightLeft, Webhook, FileJson, Shield, Zap,
    ChevronRight, X, Sparkles, Code2, Globe,
    Lock, Activity, ArrowRight, ExternalLink,
    Users, Rocket
} from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const serviceData = {
    title: 'APIs & Integraciones',
    subtitle: 'Conectando Sistemas & Ecosistemas Digitales',
    description: 'Creamos puentes entre sistemas. Diseñamos APIs robustas y realizamos integraciones seamless que conectan tu negocio con el mundo digital.',
    features: [
        { icon: Code2, title: 'REST APIs', desc: 'Diseño RESTful, versionado, documentación', detail: 'Diseñamos APIs RESTful siguiendo las mejores prácticas. Implementamos versionado, paginación, filtering y documentación automática con OpenAPI/Swagger.' },
        { icon: FileJson, title: 'GraphQL', desc: 'Queries optimizadas, subscriptions', detail: 'Desarrollamos APIs GraphQL con schemas tipados, resolvers optimizados, subscriptions en tiempo real y dataloaders para evitar el problema N+1.' },
        { icon: ArrowRightLeft, title: 'WebSockets', desc: 'Comunicación bidireccional en tiempo real', detail: 'Implementamos comunicación bidireccional para chat, notificaciones, dashboards en vivo y colaboración en tiempo real con reconexión automática.' },
        { icon: Webhook, title: 'Webhooks & Eventos', desc: 'Eventos, notificaciones, callbacks', detail: 'Configuramos sistemas de webhooks para integraciones third-party. Implementamos event-driven architecture con message queues y retry policies.' },
        { icon: Shield, title: 'Seguridad API', desc: 'OAuth 2.0, API keys, rate limiting', detail: 'Protegemos tus APIs con OAuth 2.0, JWT, API keys y rate limiting. Implementamos CORS, CSP y validación de inputs para prevenir ataques.' },
        { icon: Globe, title: 'Integraciones Third-Party', desc: 'Pagos, CRM, ERPs, APIs externas', detail: 'Integramos con Stripe, PayPal, Salesforce, HubSpot, SAP y cientos de servicios más. Creamos adaptadores que aíslan la lógica de integración.' },
    ],
    technologies: [
        { name: 'REST API', description: 'Arquitectura RESTful estándar' },
        { name: 'GraphQL', description: 'Query language flexible' },
        { name: 'WebSockets', description: 'Comunicación en tiempo real' },
        { name: 'gRPC', description: 'RPC de alto rendimiento' },
        { name: 'OpenAPI/Swagger', description: 'Documentación automática' },
        { name: 'Webhooks', description: 'Eventos y notificaciones' },
    ],
    benefits: [
        { title: 'Integración sin fricción', icon: Plug },
        { title: 'Documentación automática', icon: Code2 },
        { title: 'Seguridad empresarial', icon: Shield },
        { title: 'Fácil mantenimiento', icon: Activity },
    ],
    process: [
        { step: '01', title: 'Diseño', desc: 'Definición de endpoints y contratos de API' },
        { step: '02', title: 'Desarrollo', desc: 'Implementación con best practices y testing' },
        { step: '03', title: 'Documentación', desc: 'OpenAPI/Swagger y guías de integración' },
        { step: '04', title: 'Seguridad', desc: 'Autenticación, autorización y rate limiting' },
        { step: '05', title: 'Monitoreo', desc: 'Logs, métricas y alertas de API' },
    ],
};

// ─────────────────────────────────────────────
// FEATURE CARD
// ─────────────────────────────────────────────

function FeatureCard({ feature, index }: { feature: typeof serviceData.features[0]; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = feature.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group border-b border-slate-800/60 last:border-b-0"
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between py-4 text-left"
            >
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 flex items-center justify-center border border-teal-400/30 shrink-0">
                        <Icon className="w-3.5 h-3.5 text-teal-400/70" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">{feature.title}</p>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-slate-600">{feature.desc}</p>
                    </div>
                </div>
                <motion.span animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                </motion.span>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 pl-10 text-xs text-slate-500 leading-relaxed">{feature.detail}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────

// Tecnologías respaldadas por proyectos reales primero (evidencia calculada desde el portafolio)
const technologiesByEvidence = serviceData.technologies
    .map((tech) => ({ ...tech, evidence: getTechEvidence(tech.name) }))
    .sort((a, b) => b.evidence.count - a.evidence.count);

const tabs = [
    { id: 'features', label: 'Características', icon: Sparkles },
    { id: 'technologies', label: 'Protocolos', icon: Code2 },
    { id: 'process', label: 'Proceso', icon: Rocket },
];

function TabContent({ activeTab }: { activeTab: string }) {
    const content: Record<string, React.ReactNode> = {
        features: (
            <div className="border border-slate-800/60">
                {serviceData.features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
            </div>
        ),

        technologies: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/30">
                {technologiesByEvidence.map((tech, i) => (
                    <motion.div key={tech.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="bg-[#131923] px-5 py-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-400">{tech.name}</span>
                            {tech.evidence.count > 0 && (
                                <span className="text-[10px] text-teal-400/80">
                                    Usada en {tech.evidence.count} {tech.evidence.count === 1 ? 'proyecto' : 'proyectos'}
                                </span>
                            )}
                        </div>
                        <p className="text-[10px] text-slate-700">{tech.description}</p>
                        {tech.evidence.count > 0 && (
                            <p className="mt-1 text-[10px] text-slate-600">{tech.evidence.titles.join(', ')}</p>
                        )}
                    </motion.div>
                ))}
            </div>
        ),

        process: (
            <div className="border-l border-slate-800/60 ml-3 space-y-0">
                {serviceData.process.map((step, i) => (
                    <motion.div key={step.step} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
                        className="group relative flex gap-5 pb-6 last:pb-0 pl-6"
                    >
                        <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] flex items-center justify-center border border-slate-700/60 bg-[#131923] group-hover:border-teal-400/40 transition-colors">
                            <span className="text-[9px] font-medium text-slate-600 group-hover:text-teal-400/70 transition-colors">{step.step}</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-white mb-0.5">{step.title}</p>
                            <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        ),

    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
            >
                {content[activeTab]}
            </motion.div>
        </AnimatePresence>
    );
}

// ─────────────────────────────────────────────
// SERVICE MODAL
// ─────────────────────────────────────────────

function ServiceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState('features');

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#090d13]/85 backdrop-blur-md z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 md:inset-6 lg:inset-10 z-50 bg-[#131923] border border-slate-800/80 shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Top teal accent */}
                        <div className="h-px bg-teal-400/60 shrink-0" />

                        {/* Grain */}
                        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
                        />
                        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-teal-900/8 blur-[140px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative px-8 pt-8 pb-6 border-b border-slate-800/60 shrink-0">
                            <button onClick={onClose}
                                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-slate-700/60 hover:border-lime-400/40 text-slate-600 hover:text-slate-300 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-start gap-4 pr-12">
                                <div className="w-11 h-11 flex items-center justify-center border border-teal-400/30 shrink-0">
                                    <Plug className="w-5 h-5 text-teal-400/80" />
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-lime-400/60 mb-1">— Servicio</p>
                                    <h2 className="text-2xl md:text-3xl font-light text-white leading-tight"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {serviceData.title}
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">{serviceData.subtitle}</p>
                                </div>
                            </div>
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="px-8 py-8 space-y-10">

                                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{serviceData.description}</p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-px bg-slate-800/40">
                                    {[
                                        { label: 'Proyectos', value: `${SITE_STATS.projects}` },
                                        { label: 'Productos propios', value: `${SITE_STATS.ownProducts}` },
                                        { label: 'Años', value: `${SITE_STATS.years}` },
                                    ].map(s => (
                                        <div key={s.label} className="bg-[#131923] px-3 py-4 text-center">
                                            <p className="text-2xl font-light text-teal-400/80 leading-none mb-1"
                                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                            >{s.value}</p>
                                            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">{s.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Benefits */}
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Beneficios</p>
                                    <div className="flex flex-wrap gap-2">
                                        {serviceData.benefits.map(b => {
                                            const Icon = b.icon;
                                            return (
                                                <div key={b.title} className="flex items-center gap-2 px-3 py-2 border border-teal-400/20 text-teal-400/70 text-xs">
                                                    <Icon className="w-3 h-3" />{b.title}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Tabs */}
                                <div>
                                    <div className="flex border border-slate-800/60 mb-8">
                                        {tabs.map(tab => {
                                            const Icon = tab.icon;
                                            const isActive = activeTab === tab.id;
                                            return (
                                                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                                    className={`relative flex items-center gap-2 px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] flex-1 justify-center border-r border-slate-800/60 last:border-r-0 transition-all ${isActive ? 'text-white bg-slate-900/60' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
                                                        }`}
                                                >
                                                    {isActive && (
                                                        <motion.span layoutId="apiTabIndicator"
                                                            className="absolute top-0 left-0 right-0 h-px bg-teal-400/50"
                                                            transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                                                        />
                                                    )}
                                                    <Icon className="w-3.5 h-3.5 shrink-0" />
                                                    <span className="hidden sm:inline">{tab.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <TabContent activeTab={activeTab} />
                                </div>

                                {/* CTAs */}
                                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-800/60">
                                    <Link href="/Contact?servicio=Desarrollo%20Web"
                                        className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-white text-[#131923] text-xs font-medium uppercase tracking-[0.15em] hover:bg-lime-50 transition-colors"
                                    >
                                        <Rocket className="w-3.5 h-3.5" />
                                        Crear API
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                    <Link href="/projects"
                                        className="flex items-center justify-center gap-2.5 px-6 py-3.5 border border-slate-700/60 hover:border-lime-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        Ver proyectos
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-teal-400/20 shrink-0" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export default function APIService() {
    const router = useRouter();
    // Se abre directo el detalle del servicio; al cerrar se vuelve al listado
    const [isModalOpen, setIsModalOpen] = useState(true);

    return (
        <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-8">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-teal-900/8 blur-[140px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[140px]" />
            </div>
            <div className="relative max-w-md w-full">
                <ServiceModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); router.push('/servicios'); }} />
            </div>
        </div>
    );
}