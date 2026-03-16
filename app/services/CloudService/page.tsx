'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cloud, Server, RefreshCw, Shield, Globe,
    ChevronRight, X, Sparkles, Cpu, GitBranch,
    Zap, Activity, ArrowRight, ExternalLink,
    Users, Rocket
} from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const serviceData = {
    title: 'Cloud & DevOps',
    subtitle: 'Infraestructura Escalable & Despliegues Automatizados',
    description: 'Transformamos tu infraestructura en una máquina bien aceitada. Diseñamos arquitecturas cloud que escalan automáticamente y pipelines CI/CD que llevan tu código a producción en minutos.',
    stats: { projects: 28, satisfaction: 99, uptime: 99.99 },
    features: [
        { icon: Server, title: 'Infrastructure as Code', desc: 'Terraform, CloudFormation, Pulumi', detail: 'Automatizamos toda la infraestructura como código. Versionamos, revisamos y desplegamos cambios con los mismos procesos que el código de aplicación.' },
        { icon: GitBranch, title: 'CI/CD Pipelines', desc: 'GitHub Actions, GitLab CI, Jenkins', detail: 'Implementamos pipelines que reducen el tiempo de release de días a minutos, con tests automáticos y despliegues zero-downtime.' },
        { icon: Cpu, title: 'Contenedores & Orquestación', desc: 'Docker, Kubernetes, ECS, GKE', detail: 'Containerizamos aplicaciones y las orquestamos con Kubernetes. Implementamos auto-scaling, service mesh y estrategias de deployment avanzadas.' },
        { icon: Activity, title: 'Monitoreo & Observabilidad', desc: 'Prometheus, Grafana, CloudWatch, ELK', detail: 'Stack completo de observabilidad: métricas, logs y traces. Alertas inteligentes y dashboards que dan visibilidad total del sistema.' },
        { icon: RefreshCw, title: 'Auto-scaling', desc: 'Escalado horizontal y vertical automático', detail: 'Configuramos auto-scaling que responde a métricas en tiempo real, optimizando costos y performance según demanda.' },
        { icon: Shield, title: 'Disaster Recovery', desc: 'Backups, failover, multi-región', detail: 'Arquitecturas resilient con failover automático, backups cross-region y planes de recuperación que garantizan continuidad del negocio.' },
    ],
    technologies: [
        { name: 'AWS', level: 95, description: 'Cloud leader con 200+ servicios' },
        { name: 'Azure', level: 88, description: 'Cloud de Microsoft enterprise' },
        { name: 'GCP', level: 85, description: 'Google Cloud Platform' },
        { name: 'Docker', level: 95, description: 'Containerización estándar' },
        { name: 'Kubernetes', level: 90, description: 'Orquestación de contenedores' },
        { name: 'Terraform', level: 88, description: 'Infrastructure as Code' },
    ],
    benefits: [
        { title: 'Despliegues en minutos', icon: Zap },
        { title: 'Costos optimizados', icon: Globe },
        { title: '99.99% disponibilidad', icon: Activity },
        { title: 'Disaster recovery', icon: Shield },
    ],
    process: [
        { step: '01', title: 'Assessment', desc: 'Evaluación de infraestructura actual y objetivos' },
        { step: '02', title: 'Arquitectura', desc: 'Diseño de arquitectura cloud target' },
        { step: '03', title: 'IaC Setup', desc: 'Implementación de Infrastructure as Code' },
        { step: '04', title: 'CI/CD', desc: 'Pipelines de despliegue automatizado' },
        { step: '05', title: 'Monitoreo', desc: 'Observabilidad y alertas configuradas' },
    ],
    testimonials: [
        { name: 'Roberto Chen', role: 'CTO @ ScaleUp', text: 'Reducieron nuestros costos cloud en 40% mientras mejorábamos la disponibilidad a 99.99%. Increíble trabajo.' },
        { name: 'Sofia Martinez', role: 'DevOps Lead @ FinTech', text: 'El pipeline CI/CD que implementaron reduce nuestro tiempo de release de 2 días a 15 minutos.' },
        { name: 'Diego Lopez', role: 'SRE @ E-commerce', text: 'La arquitectura multi-región sobrevivió un outage completo de una región sin que los usuarios notaran.' },
    ],
    funFacts: [
        { number: '99.99%', label: 'Uptime SLA' },
        { number: '15min', label: 'Deploy time' },
        { number: '40%', label: 'Cost reduction' },
        { number: '100+', label: 'Clusters K8s' },
    ],
};

const tabs = [
    { id: 'features', label: 'Características', icon: Sparkles },
    { id: 'technologies', label: 'Plataformas', icon: Server },
    { id: 'process', label: 'Proceso', icon: Rocket },
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
                    <div className="w-7 h-7 flex items-center justify-center border border-sky-400/30 shrink-0">
                        <Icon className="w-3.5 h-3.5 text-sky-400/70" />
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
                            <span className="text-[10px] text-sky-400/80">{tech.level}</span>
                        </div>
                        <div className="flex gap-0.5 mb-1.5">
                            {[...Array(10)].map((_, j) => (
                                <motion.div key={j} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 + j * 0.02 }}
                                    className={`h-0.5 flex-1 ${j < Math.round(tech.level / 10) ? 'bg-sky-400/70' : 'bg-slate-800'}`}
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
                        <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] flex items-center justify-center border border-slate-700/60 bg-[#080810] group-hover:border-sky-400/40 transition-colors">
                            <span className="text-[9px] font-medium text-slate-600 group-hover:text-sky-400/70 transition-colors">{step.step}</span>
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
                                <div className="w-6 h-6 flex items-center justify-center border border-sky-400/30 text-[8px] text-sky-400/80">
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
                        <div className="h-px bg-sky-400/60 shrink-0" />
                        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
                        />
                        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-sky-900/8 blur-[140px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative px-8 pt-8 pb-6 border-b border-slate-800/60 shrink-0">
                            <button onClick={onClose}
                                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 text-slate-600 hover:text-slate-300 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-start gap-4 pr-12">
                                <div className="w-11 h-11 flex items-center justify-center border border-sky-400/30 shrink-0">
                                    <Cloud className="w-5 h-5 text-sky-400/80" />
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
                                        { label: 'Uptime', value: `${serviceData.stats.uptime}%` },
                                    ].map(s => (
                                        <div key={s.label} className="bg-[#080810] px-3 py-4 text-center">
                                            <p className="text-2xl font-light text-sky-400/80 leading-none mb-1"
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
                                                <div key={b.title} className="flex items-center gap-2 px-3 py-2 border border-sky-400/20 text-sky-400/70 text-xs">
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
                                                        <motion.span layoutId="cloudTabIndicator"
                                                            className="absolute top-0 left-0 right-0 h-px bg-sky-400/50"
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
                                        <Rocket className="w-3.5 h-3.5" /> Migrar a Cloud <ArrowRight className="w-3.5 h-3.5" />
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-2.5 px-6 py-3.5 border border-slate-700/60 hover:border-amber-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" /> Ver arquitecturas
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-sky-400/20 shrink-0" />
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
            <div className="absolute top-0 left-0 right-0 h-px bg-sky-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
            />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-sky-900/8 blur-[100px] pointer-events-none" />

            <div className="relative px-8 py-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 flex items-center justify-center border border-sky-400/30 group-hover:border-sky-400/50 transition-colors">
                            <Cloud className="w-5 h-5 text-sky-400/80" />
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-0.5">Servicio</p>
                            <h3 className="text-xl font-light text-white leading-tight"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >{serviceData.title}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 group-hover:text-sky-400/60 transition-colors">
                        <span className="text-[9px] uppercase tracking-[0.2em]">Explorar</span>
                        <ChevronRight className="w-3 h-3" />
                    </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-6">{serviceData.subtitle}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                    {['AWS', 'Azure', 'GCP', 'Kubernetes', 'Docker'].map(tech => (
                        <span key={tech} className="px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border border-sky-400/20 text-sky-400/60">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="h-px bg-gradient-to-r from-slate-800/80 via-sky-400/20 to-transparent mb-6" />

                <div className="grid grid-cols-3 gap-px bg-slate-800/40">
                    {[
                        { value: `${serviceData.stats.projects}+`, label: 'Proyectos' },
                        { value: `${serviceData.stats.satisfaction}%`, label: 'Satisfacción' },
                        { value: `${serviceData.stats.uptime}%`, label: 'Uptime' },
                    ].map(s => (
                        <div key={s.label} className="bg-[#080810] px-3 py-4 text-center group-hover:bg-slate-900/40 transition-colors">
                            <p className="text-2xl font-light text-sky-400/80 leading-none mb-1"
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

export default function CloudService() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="min-h-screen bg-[#080810] flex items-center justify-center p-8">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-sky-900/8 blur-[140px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[140px]" />
            </div>
            <div className="relative max-w-md w-full">
                <MainCard onClick={() => setIsModalOpen(true)} />
                <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
}