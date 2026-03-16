'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Smartphone, Download, Bell, Wifi, Camera,
    ChevronRight, X, Sparkles, Cpu, QrCode,
    Layers, ArrowRight, ExternalLink,
    Rocket, Users, Award, Zap, Code2
} from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const serviceData = {
    title: 'Aplicaciones Móviles',
    subtitle: 'Apps Nativas & Multiplataforma de Alto Rendimiento',
    description: 'Creamos aplicaciones móviles que los usuarios aman. Desde conceptos innovadores hasta productos pulidos, desarrollamos experiencias móviles que destacan en las tiendas de aplicaciones.',
    stats: { projects: 32, satisfaction: 96, downloads: '2M+' },
    features: [
        { icon: Smartphone, title: 'Apps Nativas', desc: 'Swift para iOS, Kotlin para Android', detail: 'Desarrollamos aplicaciones nativas que aprovechan al máximo las capacidades de cada plataforma, garantizando rendimiento óptimo y experiencia de usuario excepcional.' },
        { icon: Cpu, title: 'Cross-platform', desc: 'React Native y Flutter', detail: 'Una sola base de código para iOS y Android. Reducción de costos y tiempo de desarrollo manteniendo la calidad nativa.' },
        { icon: Bell, title: 'Push Notifications', desc: 'Engagement en tiempo real', detail: 'Sistema de notificaciones inteligente con segmentación de usuarios, A/B testing y analytics para maximizar el engagement.' },
        { icon: Camera, title: 'Hardware Access', desc: 'Cámara, GPS, sensores, biometría', detail: 'Integración completa con hardware del dispositivo: cámara, GPS, acelerómetro, huella dactilar, Face ID y más.' },
        { icon: Wifi, title: 'Offline First', desc: 'Funcionalidad sin conexión', detail: 'Arquitectura offline-first con sincronización inteligente. Los usuarios pueden trabajar sin conexión y los datos se sincronizan automáticamente.' },
        { icon: QrCode, title: 'Deep Linking', desc: 'Navegación y sharing inteligente', detail: 'Universal links y deep links para navegación directa a contenido específico, mejorando la retención y el sharing viral.' },
    ],
    technologies: [
        { name: 'React Native', level: 95, description: 'Framework líder para apps híbridas' },
        { name: 'Flutter', level: 90, description: 'UI toolkit de Google multiplataforma' },
        { name: 'Swift', level: 88, description: 'Lenguaje nativo para iOS/macOS' },
        { name: 'Kotlin', level: 87, description: 'Lenguaje moderno para Android' },
        { name: 'Expo', level: 92, description: 'Plataforma para React Native' },
        { name: 'Firebase', level: 90, description: 'Backend serverless de Google' },
    ],
    benefits: [
        { title: 'Una base de código, dos plataformas', icon: Layers },
        { title: 'Actualizaciones instantáneas', icon: Zap },
        { title: 'Experiencia nativa fluida', icon: Smartphone },
        { title: 'Time-to-market reducido', icon: Rocket },
    ],
    process: [
        { step: '01', title: 'Discovery', desc: 'Análisis de requerimientos y diseño de UX' },
        { step: '02', title: 'Prototipo', desc: 'Wireframes interactivos y flujos de usuario' },
        { step: '03', title: 'Desarrollo', desc: 'Sprints ágiles con entregas continuas' },
        { step: '04', title: 'Launch', desc: 'Publicación en App Store y Google Play' },
    ],
    testimonials: [
        { name: 'Ana Martínez', role: 'CEO @ HealthTech', text: 'Nuestra app de salud alcanzó 100K descargas en el primer mes. La calidad del código es impecable.' },
        { name: 'Roberto Sánchez', role: 'Founder @ FinApp', text: 'El equipo entendió perfectamente nuestra visión. La app tiene un rating de 4.9 en ambas stores.' },
    ],
    funFacts: [
        { number: '60fps', label: 'Animaciones fluidas' },
        { number: '<3s', label: 'Tiempo de inicio' },
        { number: '4.8★', label: 'Rating promedio' },
        { number: '2M+', label: 'Descargas totales' },
    ],
};

const tabs = [
    { id: 'features', label: 'Características', icon: Sparkles },
    { id: 'technologies', label: 'Tecnologías', icon: Code2 },
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
                    <div className="w-7 h-7 flex items-center justify-center border border-fuchsia-400/30 shrink-0">
                        <Icon className="w-3.5 h-3.5 text-fuchsia-400/70" />
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
                            <span className="text-[10px] text-fuchsia-400/80">{tech.level}</span>
                        </div>
                        <div className="flex gap-0.5 mb-1.5">
                            {[...Array(10)].map((_, j) => (
                                <motion.div key={j} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 + j * 0.02 }}
                                    className={`h-0.5 flex-1 ${j < Math.round(tech.level / 10) ? 'bg-fuchsia-400/70' : 'bg-slate-800'}`}
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
                        <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] flex items-center justify-center border border-slate-700/60 bg-[#080810] group-hover:border-fuchsia-400/40 transition-colors">
                            <span className="text-[9px] font-medium text-slate-600 group-hover:text-fuchsia-400/70 transition-colors">{step.step}</span>
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
                                <div className="w-6 h-6 flex items-center justify-center border border-fuchsia-400/30 text-[8px] text-fuchsia-400/80">
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
                        <div className="h-px bg-fuchsia-400/60 shrink-0" />
                        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
                        />
                        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-fuchsia-900/8 blur-[140px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative px-8 pt-8 pb-6 border-b border-slate-800/60 shrink-0">
                            <button onClick={onClose}
                                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 text-slate-600 hover:text-slate-300 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                            <div className="flex items-start gap-4 pr-12">
                                <div className="w-11 h-11 flex items-center justify-center border border-fuchsia-400/30 shrink-0">
                                    <Smartphone className="w-5 h-5 text-fuchsia-400/80" />
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
                                        { label: 'Apps', value: `${serviceData.stats.projects}+` },
                                        { label: 'Satisfacción', value: `${serviceData.stats.satisfaction}%` },
                                        { label: 'Downloads', value: serviceData.stats.downloads },
                                    ].map(s => (
                                        <div key={s.label} className="bg-[#080810] px-3 py-4 text-center">
                                            <p className="text-2xl font-light text-fuchsia-400/80 leading-none mb-1"
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
                                                <div key={b.title} className="flex items-center gap-2 px-3 py-2 border border-fuchsia-400/20 text-fuchsia-400/70 text-xs">
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
                                                        <motion.span layoutId="mobileTabIndicator"
                                                            className="absolute top-0 left-0 right-0 h-px bg-fuchsia-400/50"
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
                                        <Rocket className="w-3.5 h-3.5" /> Desarrollar app <ArrowRight className="w-3.5 h-3.5" />
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                                        className="flex items-center justify-center gap-2.5 px-6 py-3.5 border border-slate-700/60 hover:border-amber-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" /> Ver portfolio
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-fuchsia-400/20 shrink-0" />
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
            <div className="absolute top-0 left-0 right-0 h-px bg-fuchsia-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
            />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-fuchsia-900/8 blur-[100px] pointer-events-none" />

            <div className="relative px-8 py-8">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 flex items-center justify-center border border-fuchsia-400/30 group-hover:border-fuchsia-400/50 transition-colors">
                            <Smartphone className="w-5 h-5 text-fuchsia-400/80" />
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-0.5">Servicio</p>
                            <h3 className="text-xl font-light text-white leading-tight"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >{serviceData.title}</h3>
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 group-hover:text-fuchsia-400/60 transition-colors">
                        <span className="text-[9px] uppercase tracking-[0.2em]">Explorar</span>
                        <ChevronRight className="w-3 h-3" />
                    </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-6">{serviceData.subtitle}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                    {['React Native', 'Flutter', 'Swift', 'Kotlin', 'Expo'].map(tech => (
                        <span key={tech} className="px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border border-fuchsia-400/20 text-fuchsia-400/60">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="h-px bg-gradient-to-r from-slate-800/80 via-fuchsia-400/20 to-transparent mb-6" />

                <div className="grid grid-cols-3 gap-px bg-slate-800/40">
                    {[
                        { value: `${serviceData.stats.projects}+`, label: 'Apps' },
                        { value: `${serviceData.stats.satisfaction}%`, label: 'Satisfacción' },
                        { value: serviceData.stats.downloads, label: 'Downloads' },
                    ].map(s => (
                        <div key={s.label} className="bg-[#080810] px-3 py-4 text-center group-hover:bg-slate-900/40 transition-colors">
                            <p className="text-2xl font-light text-fuchsia-400/80 leading-none mb-1"
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

export default function MobileService() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <div className="min-h-screen bg-[#080810] flex items-center justify-center p-8">
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-fuchsia-900/8 blur-[140px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[140px]" />
            </div>
            <div className="relative max-w-md w-full">
                <MainCard onClick={() => setIsModalOpen(true)} />
                <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
}