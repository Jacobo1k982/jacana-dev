'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Brain, Cpu, MessageSquare, Eye, Sparkles, Zap,
    ChevronRight, X, Bot, Network, TrendingUp,
    Wand2, Mic, Users, ArrowRight,
    ExternalLink, Heart, Rocket,
    Database, Target
} from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const serviceData = {
    id: 'ai',
    title: 'Inteligencia Artificial',
    subtitle: 'Soluciones de IA que Transforman Negocios',
    description: 'Implementamos inteligencia artificial que genera valor real. Desde chatbots hasta sistemas de visión por computadora, creamos soluciones de IA que automatizan, predicen y optimizan.',
    icon: Brain,
    stats: { projects: 18, satisfaction: 100, models: 50 },
    features: [
        { icon: Bot, title: 'Chatbots & Asistentes', desc: 'LLMs, GPT, Claude, Llama', detail: 'Desarrollamos asistentes inteligentes con memoria contextual, integración con bases de conocimiento y respuestas personalizadas usando RAG y fine-tuning.' },
        { icon: Eye, title: 'Computer Vision', desc: 'Reconocimiento de imágenes y video', detail: 'Sistemas de detección de objetos, clasificación de imágenes, OCR y análisis de video en tiempo real con modelos como YOLO, ResNet y Vision Transformers.' },
        { icon: Mic, title: 'Procesamiento de Voz', desc: 'Speech-to-text, text-to-speech', detail: 'Transcripción en tiempo real, síntesis de voz natural, identificación de hablantes y traducción automática con Whisper y modelos TTS avanzados.' },
        { icon: TrendingUp, title: 'ML Predictivo', desc: 'Modelos de predicción y clasificación', detail: 'Algoritmos de machine learning para forecasting, detección de anomalías, segmentación de clientes y optimización de procesos empresariales.' },
        { icon: Sparkles, title: 'NLP Avanzado', desc: 'Análisis de sentimiento, entidades', detail: 'Extracción de entidades, análisis de sentimiento, resumen automático, clasificación de textos y generación de contenido con modelos state-of-the-art.' },
        { icon: Network, title: 'Automatización IA', desc: 'Workflows inteligentes, RAG', detail: 'Pipelines de automatización con agentes de IA, sistemas RAG con embeddings vectoriales y orquestación de múltiples modelos.' },
    ],
    technologies: [
        { name: 'OpenAI API', level: 95, description: 'GPT-4, DALL-E, Whisper' },
        { name: 'LangChain', level: 92, description: 'Framework de agentes IA' },
        { name: 'TensorFlow', level: 85, description: 'Deep learning framework' },
        { name: 'PyTorch', level: 85, description: 'Research-grade ML' },
        { name: 'Hugging Face', level: 88, description: 'Model hub y transformers' },
        { name: 'scikit-learn', level: 90, description: 'ML clásico y pipelines' },
    ],
    benefits: [
        { title: 'Automatización inteligente', icon: Zap },
        { title: 'Decisiones basadas en datos', icon: Target },
        { title: 'Experiencias personalizadas', icon: Heart },
        { title: 'Ventaja competitiva real', icon: TrendingUp },
    ],
    process: [
        { step: '01', title: 'Descubrimiento', desc: 'Identificación de casos de uso y viabilidad' },
        { step: '02', title: 'Prototipado', desc: 'POC rápido con modelos pre-entrenados' },
        { step: '03', title: 'Desarrollo', desc: 'Fine-tuning, integración y optimización' },
        { step: '04', title: 'Despliegue', desc: 'MLOps, monitoreo y escalado' },
    ],
    funFacts: [
        { number: '<100ms', label: 'Latencia de respuesta' },
        { number: '99.7%', label: 'Precisión en NLP' },
        { number: '50+', label: 'Modelos desplegados' },
        { number: '24/7', label: 'Disponibilidad' },
    ],
    testimonials: [
        { name: 'Patricia Luna', role: 'CEO @ HealthTech AI', text: 'El chatbot médico que desarrollaron redujo las consultas básicas en un 70%. La precisión del diagnóstico asistido es impresionante.' },
        { name: 'Miguel Sandoval', role: 'Director de Innovación @ Retail', text: 'El sistema de recomendaciones aumentó nuestras ventas un 35%. La IA entiende mejor a nuestros clientes que nosotros.' },
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
                    <div className="w-7 h-7 flex items-center justify-center border border-rose-400/30 shrink-0">
                        <Icon className="w-3.5 h-3.5 text-rose-400/70" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-white">{feature.title}</p>
                        <p className="text-[10px] uppercase tracking-[0.15em] text-slate-600">{feature.desc}</p>
                    </div>
                </div>
                <motion.span
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                >
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
                        <p className="pb-4 pl-10 text-xs text-slate-500 leading-relaxed">
                            {feature.detail}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// TAB CONTENT
// ─────────────────────────────────────────────

const tabs = [
    { id: 'features', label: 'Características', icon: Sparkles },
    { id: 'technologies', label: 'Tecnologías', icon: Cpu },
    { id: 'process', label: 'Proceso', icon: Wand2 },
    { id: 'testimonials', label: 'Testimonios', icon: Users },
];

function TabContent({ activeTab }: { activeTab: string }) {
    const content: Record<string, React.ReactNode> = {
        features: (
            <div className="border border-slate-800/60">
                {serviceData.features.map((f, i) => (
                    <FeatureCard key={f.title} feature={f} index={i} />
                ))}
            </div>
        ),

        technologies: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-800/30">
                {serviceData.technologies.map((tech, i) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-[#080810] px-5 py-4"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-400">{tech.name}</span>
                            <span className="text-[10px] text-rose-400/80">{tech.level}</span>
                        </div>
                        <div className="flex gap-0.5 mb-1.5">
                            {[...Array(10)].map((_, j) => (
                                <motion.div
                                    key={j}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.05 + j * 0.02 }}
                                    className={`h-0.5 flex-1 ${j < Math.round(tech.level / 10) ? 'bg-rose-400/70' : 'bg-slate-800'}`}
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
                    <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="group relative flex gap-5 pb-6 last:pb-0 pl-6"
                    >
                        <div className="absolute -left-[9px] top-0 w-[18px] h-[18px] flex items-center justify-center border border-slate-700/60 bg-[#080810] group-hover:border-rose-400/40 transition-colors">
                            <span className="text-[9px] font-medium text-slate-600 group-hover:text-rose-400/70 transition-colors">
                                {step.step}
                            </span>
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
                    <motion.div
                        key={t.name}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.07 }}
                        className="px-6 py-5 border-b border-slate-800/60 last:border-b-0"
                    >
                        <div className="border-l-2 border-amber-400/30 pl-4">
                            <p className="text-xs text-slate-400 italic leading-relaxed mb-3">"{t.text}"</p>
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 flex items-center justify-center border border-rose-400/30 text-[8px] text-rose-400/80">
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#06051d]/85 backdrop-blur-md z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-0 md:inset-6 lg:inset-10 z-50 bg-[#080810] border border-slate-800/80 shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Top accent */}
                        <div className="h-px bg-rose-400/60 shrink-0" />

                        {/* Grain */}
                        <div
                            className="absolute inset-0 opacity-[0.025] pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                                backgroundSize: '128px 128px',
                            }}
                        />
                        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-rose-900/8 blur-[140px] pointer-events-none" />

                        {/* Header */}
                        <div className="relative px-8 pt-8 pb-6 border-b border-slate-800/60 shrink-0">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 text-slate-600 hover:text-slate-300 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex items-start gap-4 pr-12">
                                <div className="w-11 h-11 flex items-center justify-center border border-rose-400/30 shrink-0">
                                    <Brain className="w-5 h-5 text-rose-400/80" />
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-1">
                                        — Servicio
                                    </p>
                                    <h2
                                        className="text-2xl md:text-3xl font-light text-white leading-tight"
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

                                {/* Description */}
                                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
                                    {serviceData.description}
                                </p>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-px bg-slate-800/40">
                                    {[
                                        { label: 'Proyectos', value: `${serviceData.stats.projects}+`, icon: Database },
                                        { label: 'Satisfacción', value: `${serviceData.stats.satisfaction}%`, icon: TrendingUp },
                                        { label: 'Modelos', value: `${serviceData.stats.models}+`, icon: Cpu },
                                    ].map(s => (
                                        <div key={s.label} className="bg-[#080810] px-4 py-5 text-center">
                                            <p
                                                className="text-2xl font-light text-rose-400/80 leading-none mb-1"
                                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                            >
                                                {s.value}
                                            </p>
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
                                                <p
                                                    className="text-xl font-light text-white leading-none mb-1"
                                                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                                >
                                                    {f.number}
                                                </p>
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
                                                <div
                                                    key={b.title}
                                                    className="flex items-center gap-2 px-3 py-2 border border-rose-400/20 text-rose-400/70 text-xs"
                                                >
                                                    <Icon className="w-3 h-3" />
                                                    {b.title}
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
                                                <button
                                                    key={tab.id}
                                                    onClick={() => setActiveTab(tab.id)}
                                                    className={`relative flex items-center gap-2 px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] border-r border-slate-800/60 last:border-r-0 flex-1 justify-center transition-all ${isActive
                                                            ? 'text-white bg-slate-900/60'
                                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
                                                        }`}
                                                >
                                                    {isActive && (
                                                        <motion.span
                                                            layoutId="aiTabIndicator"
                                                            className="absolute top-0 left-0 right-0 h-px bg-rose-400/50"
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
                                    <motion.button
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 flex items-center justify-center gap-2.5 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors"
                                    >
                                        <Rocket className="w-3.5 h-3.5" />
                                        Implementar IA
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </motion.button>
                                    <Link href="/services/AIService-demo">
                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex items-center justify-center gap-2.5 px-6 py-3.5 border border-slate-700/60 hover:border-amber-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all w-full"
                                        >
                                            <ExternalLink className="w-3.5 h-3.5" />
                                            Ver demos
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Bottom accent */}
                        <div className="h-px bg-rose-400/20 shrink-0" />
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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
            className="group relative bg-[#080810] border border-slate-800/70 hover:border-slate-700/80 transition-colors duration-300 overflow-hidden cursor-pointer"
        >
            {/* Top rose accent on hover */}
            <div className="absolute top-0 left-0 right-0 h-px bg-rose-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Grain */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />
            <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-rose-900/8 blur-[100px] pointer-events-none" />

            <div className="relative px-8 py-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 flex items-center justify-center border border-rose-400/30 group-hover:border-rose-400/50 transition-colors">
                            <Brain className="w-5 h-5 text-rose-400/80" />
                        </div>
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-0.5">
                                Servicio
                            </p>
                            <h3
                                className="text-xl font-light text-white leading-tight"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                {serviceData.title}
                            </h3>
                        </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-600 group-hover:text-rose-400/60 transition-colors">
                        <span className="text-[9px] uppercase tracking-[0.2em]">Explorar</span>
                        <ChevronRight className="w-3 h-3" />
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed mb-6">
                    {serviceData.subtitle}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {['OpenAI', 'LangChain', 'TensorFlow', 'NLP', 'RAG'].map(tech => (
                        <span
                            key={tech}
                            className="px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border border-rose-400/20 text-rose-400/60"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-slate-800/80 via-rose-400/20 to-transparent mb-6" />

                {/* Stats */}
                <div className="grid grid-cols-3 gap-px bg-slate-800/40">
                    {[
                        { value: `${serviceData.stats.models}+`, label: 'Modelos' },
                        { value: `${serviceData.stats.satisfaction}%`, label: 'Satisfacción' },
                        { value: `${serviceData.stats.projects}+`, label: 'Proyectos' },
                    ].map(s => (
                        <div key={s.label} className="bg-[#080810] px-3 py-4 text-center group-hover:bg-slate-900/40 transition-colors">
                            <p
                                className="text-2xl font-light text-rose-400/80 leading-none mb-1"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                {s.value}
                            </p>
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

export default function AIService() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#080810] flex items-center justify-center p-8">
            {/* Ambient */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-rose-900/8 blur-[140px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[140px]" />
            </div>

            <div className="relative max-w-md w-full">
                <MainCard onClick={() => setIsModalOpen(true)} />
                <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
}