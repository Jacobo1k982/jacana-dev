'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Database, HardDrive, Shield, Zap, BarChart3,
    ChevronRight, X, Layers, RefreshCw,
    Copy, Server, GitBranch, Activity,
    ArrowRight, Code2, Rocket, Users,
    Award, ExternalLink
} from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const serviceData = {
    title: 'Bases de Datos',
    subtitle: 'Arquitecturas de Datos Optimizadas & Escalables',
    description: 'Diseñamos el cerebro de datos de tu aplicación. Desde esquemas relacionales hasta soluciones NoSQL distribuidas, creamos arquitecturas de datos que rinden al máximo.',
    stats: { projects: 42, satisfaction: 98, queries: '10M+' },
    features: [
        { icon: Layers, title: 'Diseño de Esquemas', desc: 'Modelado relacional y NoSQL optimizado', detail: 'Creamos arquitecturas de datos normalizadas y desnormalizadas según las necesidades. Implementamos patrones como Table Inheritance, Adjacency List, y Materialized Paths para estructuras jerárquicas.' },
        { icon: Zap, title: 'Optimización de Queries', desc: 'Análisis profundo con EXPLAIN y optimización de índices', detail: 'Perfilamos cada consulta crítica, identificamos cuellos de botella y creamos índices estratégicos. Implementamos partitioning, covering indexes y query rewriting para máxima eficiencia.' },
        { icon: Copy, title: 'Replicación Avanzada', desc: 'Master-slave, multi-master y sharding', detail: 'Diseñamos topologías de replicación que garantizan uptime del 99.99%. Implementamos failover automático, load balancing de lecturas y consistencia eventual configurada a medida.' },
        { icon: HardDrive, title: 'Migraciones Zero-Downtime', desc: 'Transición de datos sin interrupciones del servicio', detail: 'Ejecutamos migraciones complejas mientras tu aplicación sigue funcionando. Usamos técnicas como dual-write, change data capture y backfill progresivo.' },
        { icon: Shield, title: 'Backup & Recovery', desc: 'Estrategias de respaldo automatizado y recuperación rápida', detail: 'Implementamos backups incrementales, Point-in-Time Recovery y disaster recovery. Simulamos escenarios de fallo para validar tiempos de recuperación.' },
        { icon: BarChart3, title: 'Data Warehouse', desc: 'ETL, analytics y Business Intelligence integration', detail: 'Construimos pipelines de datos que transforman información cruda en insights. Diseñamos modelos dimensional (star/snowflake schema) para analytics eficientes.' },
    ],
    technologies: [
        { name: 'PostgreSQL', level: 95, description: 'Base de datos relacional más avanzada' },
        { name: 'MongoDB', level: 92, description: 'NoSQL para documentos flexibles' },
        { name: 'Redis', level: 90, description: 'Cache y mensajes en memoria' },
        { name: 'MySQL', level: 88, description: 'Relacional para aplicaciones web' },
        { name: 'Elasticsearch', level: 85, description: 'Búsqueda y analytics en tiempo real' },
        { name: 'Prisma ORM', level: 92, description: 'ORM moderno para TypeScript' },
    ],
    benefits: [
        { title: 'Consultas ultra-rápidas', icon: Zap },
        { title: 'Integridad garantizada', icon: Shield },
        { title: 'Escalabilidad horizontal', icon: Layers },
        { title: 'Análisis en tiempo real', icon: BarChart3 },
    ],
    process: [
        { step: '01', title: 'Análisis', desc: 'Entendemos tus datos, volumetría y patrones de acceso' },
        { step: '02', title: 'Diseño', desc: 'Seleccionamos motores y diseñamos esquemas óptimos' },
        { step: '03', title: 'Implementación', desc: 'Configuramos clusters, índices y estrategias de backup' },
        { step: '04', title: 'Optimización', desc: 'Profileamos queries y ajustamos configuraciones' },
        { step: '05', title: 'Monitoreo', desc: 'Dashboards, alertas y mantenimiento continuo' },
    ],
    testimonials: [
        { name: 'Carlos Mendoza', role: 'CTO @ DataFlow Inc.', text: 'Reducieron los tiempos de query de 3 segundos a 50ms. Increíble transformación en nuestra infraestructura.' },
        { name: 'Ana García', role: 'Lead Engineer @ FintechApp', text: 'Migraron 5TB de datos sin un solo minuto de downtime. Profesionales excepcionales y metodología impecable.' },
        { name: 'Roberto Silva', role: 'Data Architect @ BigData', text: 'La arquitectura de sharding que diseñaron escala perfectamente con nuestro crecimiento exponencial.' },
    ],
    funFacts: [
        { number: '50M+', label: 'Queries/día' },
        { number: '99.99%', label: 'Uptime' },
        { number: '<10ms', label: 'Latencia' },
        { number: '100x', label: 'Más rápido' },
    ],
};

const tabs = [
    { id: 'features', label: 'Características', icon: Layers },
    { id: 'technologies', label: 'Tecnologías', icon: Code2 },
    { id: 'process', label: 'Proceso', icon: GitBranch },
    { id: 'testimonials', label: 'Testimonios', icon: Users },
];

// ─────────────────────────────────────────────
// FEATURE CARD
// ─────────────────────────────────────────────

function FeatureCard({ feature, index }: { feature: typeof serviceData.features[0]; index: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const Icon = feature.icon;
    return (
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="group border-b border-slate-800/60 last:border-b-0"
        >
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between py-4 text-left">
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 flex items-center justify-center border border-amber-400/30 shrink-0">
                        <Icon className="w-3.5 h-3.5 text-amber-400/70" />
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
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden"
                    >
                        <p className="pb-4 pl-10 text-xs text-slate-500 leading-relaxed">{feature.detail}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// TAB CONTENT
// ─────────────────────────────────────────────

function TabContent({ activeTab }: { activeTab: string }) {
    const content: Record<string, React.ReactNode> = {
        features: (
            <div className="border border-slate-800/60">
                {serviceData.features.map((f, i) => <FeatureCard key={f.title} feature={f} index={i} />)}
            </div>
        ),
        technologies: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/30">
                {serviceData.technologies.map((tech, i) => (
                    <motion.div key={tech.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        className="bg-[#080810] px-5 py-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-400">{tech.name}</span>
                            <span className="text-[10px] text-amber-400/80">{tech.level}</span>
                        </div>
                        <div className="flex gap-0.5 mb-1.5">
                            {[...Array(10)].map((_, j) => (
                                <motion.div key={j} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 + j * 0.02 }}
                                    className={`h-0.5 flex-1 ${j < Math.round(tech.level / 10) ? 'bg-amber-400/70' : 'bg-slate-800'}`}
                                />
                            ))}
                        </div>
                        <p className="text-[10px] text-slate-700">{tech.description}</p>
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
                        <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] flex items-center justify-center border border-slate-700/60 bg-[#080810] group-hover:border-amber-400/40 transition-colors">
                            <span className="text-[9px] font-medium text-slate-600 group-hover:text-amber-400/70 transition-colors">{step.step}</span>
                        </div>
                        <div>
                            <p className="text-xs font-medium text-white mb-0.5">{step.title}</p>
                            <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        ),
        testimonials: (
            <div className="space-y-0 border border-slate-800/60">
                {serviceData.testimonials.map((t, i) => (
                    <motion.div key={t.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
                        className="px-6 py-5 border-b border-slate-800/60 last:border-b-0"
                    >
                        <div className="border-l-2 border-amber-400/30 pl-4">
                            <p className="text-xs text-slate-400 italic leading-relaxed mb-3">"{t.text}"</p>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 flex items-center justify-center border border-amber-400/30 text-[8px] text-amber-400/80">
                                    {t.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="text-[10px] text-white font-medium leading-none">{t.name}</p>
                                    <p className="text-[9px] text-slate-600 mt-0.5">{t.role}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        ),
    };
    return (
        <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
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
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
                        className="fixed inset-0 bg-[#06051d]/85 backdrop-blur-md z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 md:inset-6 lg:inset-10 z-50 bg-[#080810] border border-slate-800/80 shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="h-px bg-amber-400/60 shrink-0" />
                        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
                        />
                        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-amber-900/8 blur-[140px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative px-8 pt-8 pb-6 border-b border-slate-800/60 shrink-0">
                            <button onClick={onClose}
                                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 text-slate-600 hover:text-slate-300 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-start gap-4 pr-12">
                                <div className="w-11 h-11 flex items-center justify-center border border-amber-400/30 shrink-0">
                                    <Database className="w-5 h-5 text-amber-400/80" />
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-1">— Servicio</p>
                                    <h2 className="text-2xl md:text-3xl font-light text-white leading-tight"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >{serviceData.title}</h2>
                                    <p className="text-sm text-slate-500 mt-1">{serviceData.subtitle}</p>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="px-8 py-8 space-y-10">
                                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">{serviceData.description}</p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-px bg-slate-800/40">
                                    {[
                                        { label: 'Proyectos', value: `${serviceData.stats.projects}+` },
                                        { label: 'Satisfacción', value: `${serviceData.stats.satisfaction}%` },
                                        { label: 'Queries/día', value: serviceData.stats.queries },
                                    ].map(s => (
                                        <div key={s.label} className="bg-[#080810] px-3 py-4 text-center">
                                            <p className="text-2xl font-light text-amber-400/80 leading-none mb-1"
                                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                            >{s.value}</p>
                                            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">{s.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Fun facts */}
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Métricas clave</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800/30">
                                        {serviceData.funFacts.map(f => (
                                            <div key={f.label} className="bg-[#080810] px-4 py-4 text-center">
                                                <p className="text-xl font-light text-white leading-none mb-1"
                                                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                                >{f.number}</p>
                                                <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600">{f.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Benefits */}
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Beneficios</p>
                                    <div className="flex flex-wrap gap-2">
                                        {serviceData.benefits.map(b => {
                                            const Icon = b.icon;
                                            return (
                                                <div key={b.title} className="flex items-center gap-2 px-3 py-2 border border-amber-400/20 text-amber-400/70 text-xs">
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
                                                        <motion.span layoutId="dbTabIndicator"
                                                            className="absolute top-0 left-0 right-0 h-px bg-amber-400/50"
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
                                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                                        className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors"
                                    >
                                        <Rocket className="w-3.5 h-3.5" /> Diseñar base de datos <ArrowRight className="w-3.5 h-3.5" />
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-2.5 px-6 py-3.5 border border-slate-700/60 hover:border-amber-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" /> Ver casos
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-amber-400/20 shrink-0" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ─────────────────────────────────────────────
// MAIN CARD
// ─────────────────────────────────────────────

function MainCard({ onClick }: { onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
            className="group relative bg-[#080810] border border-slate-800/70 hover:border-slate-700/80 transition-colors duration-300 overflow-hidden cursor-pointer"
        >
            <div className="absolute top-0 left-0 right-0 h-px bg-amber-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
            />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-amber-900/8 blur-[100px] pointer-events-none" />

            <div className="relative px-8 py-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 flex items-center justify-center border border-amber-400/30 group-hover:border-amber-400/50 transition-colors">
                            <Database className="w-5 h-5 text-amber-400/80" />
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-0.5">Servicio</p>
                            <h3 className="text-xl font-light text-white leading-tight"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >{serviceData.title}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 group-hover:text-amber-400/60 transition-colors">
                        <span className="text-[9px] uppercase tracking-[0.2em]">Explorar</span>
                        <ChevronRight className="w-3 h-3" />
                    </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-6">{serviceData.subtitle}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                    {['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Prisma'].map(tech => (
                        <span key={tech} className="px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border border-amber-400/20 text-amber-400/60">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="h-px bg-gradient-to-r from-slate-800/80 via-amber-400/20 to-transparent mb-6" />

                <div className="grid grid-cols-3 gap-px bg-slate-800/40">
                    {[
                        { value: `${serviceData.stats.projects}+`, label: 'Proyectos' },
                        { value: `${serviceData.stats.satisfaction}%`, label: 'Satisfacción' },
                        { value: serviceData.stats.queries, label: 'Queries/día' },
                    ].map(s => (
                        <div key={s.label} className="bg-[#080810] px-3 py-4 text-center group-hover:bg-slate-900/40 transition-colors">
                            <p className="text-2xl font-light text-amber-400/80 leading-none mb-1"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >{s.value}</p>
                            <p className="text-[9px] uppercase tracking-[0.18em] text-slate-600">{s.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────

export default function DatabaseService() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="min-h-screen bg-[#080810] flex items-center justify-center p-8">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-amber-900/8 blur-[140px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[140px]" />
            </div>
            <div className="relative max-w-md w-full">
                <MainCard onClick={() => setIsModalOpen(true)} />
                <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
}