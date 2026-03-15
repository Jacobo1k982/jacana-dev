'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
    Brain, Cpu, MessageSquare, Eye, Sparkles, Zap,
    ChevronRight, X, CheckCircle, Bot, Network, TrendingUp,
    Wand2, Mic, Globe, Award, Users, ArrowRight,
    ExternalLink, Heart, Clock, Play, Rocket,
    Activity, Database, Layers, Target, Lightbulb
} from 'lucide-react';

// Enhanced service data with more interactive elements
const serviceData = {
    id: 'ai',
    title: 'Inteligencia Artificial',
    subtitle: 'Soluciones de IA que Transforman Negocios',
    description: 'Implementamos inteligencia artificial que genera valor real. Desde chatbots hasta sistemas de visión por computadora, creamos soluciones de IA que automatizan, predicen y optimizan.',
    icon: Brain,
    gradient: 'from-rose-400 via-pink-500 to-fuchsia-500',
    accentColor: 'rose',
    stats: { projects: 18, satisfaction: 100, models: 50 },
    features: [
        { icon: Bot, title: 'Chatbots & Asistentes', desc: 'LLMs, GPT, Claude, Llama', detail: 'Desarrollamos asistentes inteligentes con memoria contextual, integración con bases de conocimiento y respuestas personalizadas usando RAG y fine-tuning.' },
        { icon: Eye, title: 'Computer Vision', desc: 'Reconocimiento de imágenes y video', detail: 'Sistemas de detección de objetos, clasificación de imágenes, OCR y análisis de video en tiempo real con modelos como YOLO, ResNet y Vision Transformers.' },
        { icon: Mic, title: 'Procesamiento de Voz', desc: 'Speech-to-text, text-to-speech', detail: 'Transcripción en tiempo real, síntesis de voz natural, identificación de hablantes y traducción automática con Whisper y modelos TTS avanzados.' },
        { icon: TrendingUp, title: 'ML Predictivo', desc: 'Modelos de predicción y clasificación', detail: 'Algoritmos de machine learning para forecasting, detección de anomalías, segmentación de clientes y optimización de procesos empresariales.' },
        { icon: Sparkles, title: 'NLP Avanzado', desc: 'Análisis de sentimiento, entidades', detail: 'Extracción de entidades, análisis de sentimiento, resumen automático, clasificación de textos y generation de contenido con modelos state-of-the-art.' },
        { icon: Network, title: 'Automatización IA', desc: 'Workflows inteligentes, RAG', detail: 'Pipelines de automatización con agentes de IA, sistemas RAG con embeddings vectoriales y orquestación de múltiples modelos.' }
    ],
    technologies: [
        { name: 'OpenAI API', level: 95, icon: '🤖', color: 'from-emerald-400 to-green-500', description: 'GPT-4, DALL-E, Whisper' },
        { name: 'LangChain', level: 92, icon: '🔗', color: 'from-cyan-400 to-teal-500', description: 'Framework de agentes IA' },
        { name: 'TensorFlow', level: 85, icon: '🧠', color: 'from-orange-400 to-amber-500', description: 'Deep learning framework' },
        { name: 'PyTorch', level: 85, icon: '🔥', color: 'from-red-400 to-orange-500', description: 'Research-grade ML' },
        { name: 'Hugging Face', level: 88, icon: '🤗', color: 'from-yellow-400 to-amber-500', description: 'Model hub y transformers' },
        { name: 'scikit-learn', level: 90, icon: '📊', color: 'from-blue-400 to-indigo-500', description: 'ML clásico y pipelines' }
    ],
    benefits: [
        { title: 'Automatización inteligente', icon: Zap },
        { title: 'Decisiones basadas en datos', icon: Target },
        { title: 'Experiencias personalizadas', icon: Heart },
        { title: 'Ventaja competitiva real', icon: TrendingUp }
    ],
    process: [
        { step: '01', title: 'Descubrimiento', desc: 'Identificación de casos de uso y viabilidad' },
        { step: '02', title: 'Prototipado', desc: 'POC rápido con modelos pre-entrenados' },
        { step: '03', title: 'Desarrollo', desc: 'Fine-tuning, integración y optimización' },
        { step: '04', title: 'Despliegue', desc: 'MLOps, monitoreo y escalado' }
    ],
    testimonials: [
        { name: 'Patricia Luna', role: 'CEO @ HealthTech AI', text: 'El chatbot médico que desarrollaron redujo las consultas básicas en un 70%. La precisión del diagnóstico asistido es impresionante.', avatar: '👩‍⚕️' },
        { name: 'Miguel Sandoval', role: 'Director de Innovación @ Retail', text: 'El sistema de recomendaciones aumentó nuestras ventas un 35%. La IA entiende mejor a nuestros clientes que nosotros.', avatar: '👨‍💼' }
    ],
    funFacts: [
        { number: '<100ms', label: 'Latencia de respuesta' },
        { number: '99.7%', label: 'Precisión en NLP' },
        { number: '50+', label: 'Modelos desplegados' },
        { number: '24/7', label: 'Disponibilidad' }
    ]
};

// Animated counter hook
function useAnimatedCounter(end: number, duration: number = 2000) {
    const [count, setCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const startAnimation = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setIsAnimating(false);
            }
        };
        requestAnimationFrame(animate);
    };

    return { count, startAnimation };
}

// Client-only wrapper to prevent hydration mismatch with random values
function ClientOnly({ children }: { children: React.ReactNode }) {
    return useSyncExternalStore(
        () => () => { },
        () => children,
        () => null
    );
}

// Floating neuron component
function FloatingNeuron({ delay = 0, size = 'md' }: { delay?: number; size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    };

    const [position] = useState(() => ({
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
        duration: 8 + Math.random() * 4
    }));

    return (
        <motion.div
            className={`absolute ${sizeClasses[size]} rounded-full`}
            style={{
                background: 'radial-gradient(circle, rgba(244, 63, 94, 0.8) 0%, rgba(217, 70, 239, 0.5) 50%, transparent 70%)',
                filter: 'blur(1px)'
            }}
            initial={{ x: position.x, y: position.y, scale: 0 }}
            animate={{
                y: [null, -100, 100, -100],
                x: [null, 50, -50, 50],
                scale: [0.5, 1, 0.5, 1],
                opacity: [0.3, 0.8, 0.3, 0.8]
            }}
            transition={{
                duration: position.duration,
                repeat: Infinity,
                delay,
                ease: 'easeInOut'
            }}
        />
    );
}

// Enhanced AI particles
function EnhancedAIParticles() {
    const [particles] = useState(() =>
        [...Array(30)].map((_, i) => ({
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
            colorClass: i % 3 === 0 ? 'bg-rose-400/20' : i % 3 === 1 ? 'bg-pink-400/15' : 'bg-fuchsia-400/10'
        }))
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${particle.colorClass}`}
                    style={{ width: particle.width, height: particle.height }}
                    initial={{ x: particle.x, y: particle.y }}
                    animate={{
                        y: [null, '-100vh'],
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                        ease: 'linear'
                    }}
                />
            ))}
        </div>
    );
}

// Neural network animation
function NeuralNetwork() {
    const layers = [
        [20, 15], [20, 35], [20, 55], [20, 75],
        [45, 25], [45, 45], [45, 65],
        [70, 20], [70, 40], [70, 60], [70, 80],
        [90, 30], [90, 50], [90, 70]
    ];

    const connections = [
        [0, 4], [0, 5], [1, 4], [1, 5], [1, 6], [2, 5], [2, 6], [3, 6],
        [4, 7], [4, 8], [5, 7], [5, 8], [5, 9], [6, 8], [6, 9],
        [7, 10], [7, 11], [8, 10], [8, 11], [8, 12], [9, 11], [9, 12]
    ];

    return (
        <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Connections */}
                {connections.map(([from, to], i) => (
                    <motion.line
                        key={`conn-${i}`}
                        x1={layers[from][0]}
                        y1={layers[from][1]}
                        x2={layers[to][0]}
                        y2={layers[to][1]}
                        stroke="currentColor"
                        strokeWidth="0.15"
                        className="text-rose-400"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 0.6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.05 }}
                    />
                ))}
                {/* Nodes */}
                {layers.map(([x, y], i) => (
                    <motion.circle
                        key={`node-${i}`}
                        cx={x}
                        cy={y}
                        r="1.5"
                        className="text-rose-400"
                        fill="currentColor"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.08 }}
                    />
                ))}
            </svg>
        </div>
    );
}

// AI code rain effect
function AICodeRain() {
    const codeSnippets = [
        { code: 'model.fit()', color: 'text-rose-400' },
        { code: 'transform()', color: 'text-pink-400' },
        { code: 'predict()', color: 'text-fuchsia-400' },
        { code: 'embed()', color: 'text-purple-400' },
        { code: 'GPT-4 turbo', color: 'text-emerald-400' },
        { code: 'RAG query', color: 'text-cyan-400' },
        { code: 'fine-tune', color: 'text-amber-400' },
        { code: 'vector DB', color: 'text-lime-400' },
        { code: 'attention()', color: 'text-orange-400' },
        { code: 'tokenizer', color: 'text-teal-400' },
        { code: 'embedding', color: 'text-violet-400' },
        { code: 'agent.run()', color: 'text-sky-400' }
    ];

    const [rainDrops] = useState(() =>
        [...Array(20)].map(() => ({
            snippet: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
            x: `${Math.random() * 100}%`,
            duration: Math.random() * 10 + 8,
            delay: Math.random() * 6
        }))
    );

    return (
        <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
            {rainDrops.map((drop, i) => (
                <motion.div
                    key={i}
                    className={`absolute ${drop.snippet.color} text-xs font-mono whitespace-nowrap`}
                    initial={{ y: -50, x: drop.x, opacity: 0 }}
                    animate={{ y: '100vh', opacity: [0, 0.8, 0] }}
                    transition={{
                        duration: drop.duration,
                        repeat: Infinity,
                        delay: drop.delay,
                        ease: 'linear'
                    }}
                >
                    {drop.snippet.code}
                </motion.div>
            ))}
        </div>
    );
}

// Interactive technology card with 3D tilt effect
function TechCard({ tech, index, onClick }: { tech: typeof serviceData.technologies[0]; index: number; onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="group cursor-pointer"
        >
            <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-rose-500/40 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-rose-500/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{tech.icon}</span>
                            <div>
                                <h4 className="font-semibold text-white group-hover:text-rose-300 transition-colors">{tech.name}</h4>
                                <p className="text-xs text-gray-500">{tech.description}</p>
                            </div>
                        </div>
                        <span className={`text-lg font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                            {tech.level}%
                        </span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${tech.level}%` }}
                            transition={{ duration: 1.5, delay: index * 0.1, ease: 'easeOut' }}
                            className={`h-full rounded-full bg-gradient-to-r ${tech.color} relative overflow-hidden`}
                        >
                            <motion.div
                                animate={{ x: ['-100%', '200%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Interactive feature card with hover effects
function FeatureCard({ feature, index }: { feature: typeof serviceData.features[0]; index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group"
        >
            <motion.div
                onClick={() => setIsExpanded(!isExpanded)}
                className={`relative p-5 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden
                    ${isExpanded
                        ? 'bg-gradient-to-br from-rose-500/20 to-fuchsia-500/10 border-rose-500/40'
                        : 'bg-white/[0.02] border-white/5 hover:border-rose-500/30 hover:bg-rose-500/5'
                    }`}
            >
                <motion.div
                    animate={{ opacity: isExpanded ? 1 : 0 }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(244, 63, 94, 0.3), transparent)',
                        backgroundSize: '200% 100%'
                    }}
                />
                <div className="relative z-10">
                    <div className="flex items-start gap-4">
                        <motion.div
                            animate={{ rotate: isExpanded ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                            className={`p-3 rounded-xl transition-colors ${isExpanded ? 'bg-rose-500/20' : 'bg-white/5 group-hover:bg-rose-500/10'}`}
                        >
                            <feature.icon className={`w-5 h-5 transition-colors ${isExpanded ? 'text-rose-300' : 'text-rose-400'}`} />
                        </motion.div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h4 className={`font-semibold transition-colors ${isExpanded ? 'text-rose-300' : 'text-white group-hover:text-rose-300'}`}>
                                    {feature.title}
                                </h4>
                                <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.3 }}>
                                    <ChevronRight className="w-4 h-4 text-gray-400" />
                                </motion.div>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">{feature.desc}</p>
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="mt-4 pt-4 border-t border-white/10">
                                            <p className="text-gray-400 text-sm leading-relaxed">{feature.detail}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// Process timeline component
function ProcessTimeline() {
    return (
        <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-rose-500/50 via-pink-500/30 to-fuchsia-500/50" />
            <div className="space-y-6">
                {serviceData.process.map((step, index) => (
                    <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="relative pl-12 group"
                    >
                        <div className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-rose-500/30 group-hover:scale-110 transition-transform">
                            {step.step}
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-rose-500/20 group-hover:bg-rose-500/5 transition-all">
                            <h4 className="font-semibold text-white group-hover:text-rose-300 transition-colors">{step.title}</h4>
                            <p className="text-gray-500 text-sm mt-1">{step.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// Fun facts carousel
function FunFactsCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % serviceData.funFacts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative overflow-hidden">
            <div className="flex items-center justify-center gap-2">
                {serviceData.funFacts.map((fact, index) => (
                    <motion.div
                        key={fact.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{
                            opacity: currentIndex === index ? 1 : 0.3,
                            scale: currentIndex === index ? 1 : 0.9
                        }}
                        className={`p-4 rounded-xl text-center transition-all cursor-pointer ${currentIndex === index
                            ? 'bg-gradient-to-br from-rose-500/20 to-fuchsia-500/10 border border-rose-500/30'
                            : 'bg-white/[0.02] border border-white/5'
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    >
                        <div className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
                            {fact.number}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{fact.label}</div>
                    </motion.div>
                ))}
            </div>
            <div className="flex justify-center gap-2 mt-4">
                {serviceData.funFacts.map((_, index) => (
                    <motion.div
                        key={index}
                        animate={{
                            width: currentIndex === index ? 24 : 8,
                            backgroundColor: currentIndex === index ? 'rgb(244, 63, 94)' : 'rgba(255,255,255,0.2)'
                        }}
                        className="h-2 rounded-full cursor-pointer"
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

// Testimonial card
function TestimonialCard({ testimonial, index }: { testimonial: typeof serviceData.testimonials[0]; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-rose-500/30 transition-all"
        >
            <div className="flex items-start gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                    <p className="text-gray-300 italic">"{testimonial.text}"</p>
                    <div className="mt-4">
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-rose-400">{testimonial.role}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Stats counter with animation
function AnimatedStats() {
    const projectsCounter = useAnimatedCounter(serviceData.stats.projects);
    const satisfactionCounter = useAnimatedCounter(serviceData.stats.satisfaction);
    const modelsCounter = useAnimatedCounter(serviceData.stats.models);

    useEffect(() => {
        projectsCounter.startAnimation();
        satisfactionCounter.startAnimation();
        modelsCounter.startAnimation();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4">
            {[
                { label: 'Proyectos', value: projectsCounter.count, suffix: '+', icon: Database },
                { label: 'Satisfacción', value: satisfactionCounter.count, suffix: '%', icon: Award },
                { label: 'Modelos', value: modelsCounter.count, suffix: '+', icon: Cpu }
            ].map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-rose-500/30 transition-all cursor-pointer hover:bg-rose-500/5"
                >
                    <stat.icon className="w-5 h-5 text-rose-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
                        {stat.value}{stat.suffix}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </motion.div>
            ))}
        </div>
    );
}

// Tab content renderer
function TabContent({ activeTab }: { activeTab: string }) {
    const content: Record<string, JSX.Element> = {
        features: (
            <div className="space-y-3">
                {serviceData.features.map((feature, index) => (
                    <FeatureCard key={feature.title} feature={feature} index={index} />
                ))}
            </div>
        ),
        technologies: (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceData.technologies.map((tech, index) => (
                    <TechCard key={tech.name} tech={tech} index={index} onClick={() => { }} />
                ))}
            </div>
        ),
        process: <ProcessTimeline />,
        testimonials: (
            <div className="space-y-4">
                {serviceData.testimonials.map((testimonial, index) => (
                    <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
                ))}
            </div>
        )
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                {content[activeTab]}
            </motion.div>
        </AnimatePresence>
    );
}

// Main modal component
function ServiceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [activeTab, setActiveTab] = useState('features');

    const tabs = [
        { id: 'features', label: 'Características', icon: Sparkles },
        { id: 'technologies', label: 'Tecnologías', icon: Cpu },
        { id: 'process', label: 'Proceso', icon: Wand2 },
        { id: 'testimonials', label: 'Testimonios', icon: Users }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 md:inset-4 lg:inset-8 z-50 overflow-hidden rounded-3xl border border-rose-500/20 bg-gradient-to-br from-[#1a0a10] via-[#1e0d15] to-[#180a12] shadow-2xl"
                    >
                        {/* Animated background effects */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-fuchsia-500/5" />
                            <ClientOnly>
                                <AICodeRain />
                                <NeuralNetwork />
                                {[...Array(6)].map((_, i) => (
                                    <FloatingNeuron key={i} delay={i * 0.5} size={i % 2 === 0 ? 'md' : 'sm'} />
                                ))}
                            </ClientOnly>
                            <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl" />
                        </div>

                        {/* Close button */}
                        <motion.button
                            onClick={onClose}
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                            className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/30 transition-all group"
                        >
                            <X className="w-5 h-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                        </motion.button>

                        <div className="relative z-10 h-full overflow-y-auto custom-scrollbar-ai">
                            {/* Hero Header */}
                            <div className="relative h-72 md:h-80 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/30 via-pink-500/20 to-fuchsia-500/20" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a10] via-[#1a0a10]/50 to-transparent" />

                                {/* Animated shapes */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                    className="absolute top-10 right-10 w-32 h-32 border border-rose-500/20 rounded-3xl"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                                    className="absolute bottom-20 left-10 w-20 h-20 border border-fuchsia-500/20 rounded-full"
                                />

                                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6"
                                    >
                                        <motion.div
                                            animate={{ rotate: [0, 5, -5, 0] }}
                                            transition={{ duration: 4, repeat: Infinity }}
                                            className="p-5 rounded-2xl bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 border border-rose-500/30 backdrop-blur-sm shadow-xl shadow-rose-500/20"
                                        >
                                            <Brain className="w-12 h-12 text-rose-400" />
                                        </motion.div>
                                        <div>
                                            <motion.h2
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-fuchsia-300"
                                            >
                                                {serviceData.title}
                                            </motion.h2>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-rose-400 text-lg mt-2"
                                            >
                                                {serviceData.subtitle}
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-10 space-y-8">
                                {/* Description */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {serviceData.description}
                                    </p>
                                </motion.div>

                                {/* Stats */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <AnimatedStats />
                                </motion.div>

                                {/* Fun Facts */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <FunFactsCarousel />
                                </motion.div>

                                {/* Benefits Pills */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="flex flex-wrap gap-3"
                                >
                                    {serviceData.benefits.map((benefit, index) => (
                                        <motion.div
                                            key={benefit.title}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.8 + index * 0.1 }}
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/10 to-fuchsia-500/10 border border-rose-500/20 text-rose-300 text-sm cursor-pointer hover:border-rose-500/40 transition-colors"
                                        >
                                            <benefit.icon className="w-4 h-4" />
                                            {benefit.title}
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Tabs */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.9 }}
                                >
                                    <div className="flex flex-wrap gap-2 mb-6 p-1 bg-white/[0.02] rounded-xl">
                                        {tabs.map((tab) => (
                                            <motion.button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === tab.id
                                                    ? 'bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/25'
                                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                    }`}
                                            >
                                                <tab.icon className="w-4 h-4" />
                                                <span className="hidden sm:inline">{tab.label}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                    <TabContent activeTab={activeTab} />
                                </motion.div>

                                {/* CTA Section */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1 }}
                                    className="pt-6 border-t border-white/5"
                                >
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <motion.button
                                            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(244, 63, 94, 0.3)' }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white font-semibold flex items-center justify-center gap-3 shadow-xl relative overflow-hidden group"
                                        >
                                            <motion.div
                                                animate={{ x: ['-100%', '200%'] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            />
                                            <Rocket className="w-5 h-5 relative z-10" />
                                            <span className="relative z-10">Implementar IA</span>
                                            <ArrowRight className="w-5 h-5 relative z-10" />
                                        </motion.button>
                                        <Link href="/services/AIService-demo">
                                            <motion.button
                                                whileHover={{ scale: 1.02, borderColor: 'rgba(244, 63, 94, 0.5)' }}
                                                whileTap={{ scale: 0.98 }}
                                                className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-rose-400 font-semibold hover:bg-rose-500/10 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                                Ver Demos
                                            </motion.button>
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Main card component with 3D tilt
function MainCard({ onClick }: { onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 400, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 400, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ rotateX, rotateY, transformPerspective: 1200 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="relative cursor-pointer group"
        >
            {/* Card container */}
            <div className="relative rounded-3xl border border-rose-500/20 bg-gradient-to-br from-[#1a0a10] to-[#1e0d15] overflow-hidden transition-all duration-500 hover:border-rose-500/40 hover:shadow-2xl hover:shadow-rose-500/20">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            background: isHovered
                                ? 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0.2) 0%, rgba(217, 70, 239, 0.1) 50%, transparent 70%)'
                                : 'radial-gradient(circle at 50% 50%, rgba(244, 63, 94, 0) 0%, transparent 50%)'
                        }}
                        className="absolute inset-0"
                    />
                    {isHovered && (
                        <ClientOnly>
                            <EnhancedAIParticles />
                        </ClientOnly>
                    )}

                    {/* Gradient orbs */}
                    <motion.div
                        animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.3 : 0 }}
                        className="absolute -top-20 -right-20 w-40 h-40 bg-rose-500 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.2 : 0 }}
                        className="absolute -bottom-20 -left-20 w-40 h-40 bg-fuchsia-500 rounded-full blur-3xl"
                    />
                </div>

                {/* Shimmer border */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(244, 63, 94, 0.4), transparent)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s linear infinite'
                    }}
                />

                {/* Content */}
                <div className="relative z-10 p-8">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <motion.div
                            animate={{
                                scale: isHovered ? 1.15 : 1,
                                rotate: isHovered ? [0, -5, 5, 0] : 0
                            }}
                            transition={{ duration: 0.5 }}
                            className="p-4 rounded-2xl bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 border border-rose-500/30 backdrop-blur-sm shadow-xl shadow-rose-500/10"
                        >
                            <Brain className="w-8 h-8 text-rose-400" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                x: isHovered ? 0 : -10
                            }}
                            className="flex items-center gap-1 text-rose-400 text-sm font-medium bg-rose-500/10 px-3 py-1.5 rounded-full border border-rose-500/20"
                        >
                            <Play className="w-3 h-3" />
                            Explorar
                            <ChevronRight className="w-4 h-4" />
                        </motion.div>
                    </div>

                    {/* Title with gradient animation */}
                    <motion.h3
                        className="text-2xl font-bold mb-3 transition-all"
                        animate={{
                            backgroundPosition: isHovered ? ['0% 50%', '100% 50%'] : '0% 50%'
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{
                            backgroundImage: 'linear-gradient(90deg, #fff, #fb7185, #d946ef, #fff)',
                            backgroundSize: '300% 100%',
                            WebkitBackgroundClip: isHovered ? 'text' : undefined,
                            WebkitTextFillColor: isHovered ? 'transparent' : '#fff',
                            backgroundClip: isHovered ? 'text' : undefined
                        } as React.CSSProperties}
                    >
                        {serviceData.title}
                    </motion.h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                        {serviceData.subtitle}
                    </p>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['OpenAI', 'LangChain', 'TensorFlow', 'NLP', 'RAG'].map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: isHovered ? -2 : 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(244, 63, 94, 0.2)' }}
                                className="px-3 py-1.5 text-xs rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/5">
                        {[
                            { icon: Database, value: `${serviceData.stats.models}+`, label: 'Modelos' },
                            { icon: Award, value: `${serviceData.stats.satisfaction}%`, label: 'Éxito' },
                            { icon: Cpu, value: `${serviceData.stats.projects}+`, label: 'Proyectos' }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-rose-500/20 transition-all group/stat"
                            >
                                <stat.icon className="w-4 h-4 text-rose-400 mb-1 group-hover/stat:scale-110 transition-transform" />
                                <span className="text-sm font-bold text-white">{stat.value}</span>
                                <span className="text-xs text-gray-500">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Corner accents */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-500/30 to-transparent blur-2xl"
                />
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-fuchsia-500/20 to-transparent blur-2xl"
                />
            </div>
        </motion.div>
    );
}

// Main export
export default function AIService() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inject custom styles dynamically to avoid hydration mismatch
    useEffect(() => {
        const styleId = 'ai-service-custom-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .custom-scrollbar-ai::-webkit-scrollbar {
                width: 6px;
            }
            .custom-scrollbar-ai::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.02);
            }
            .custom-scrollbar-ai::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, rgba(244, 63, 94, 0.3), rgba(217, 70, 239, 0.3));
                border-radius: 3px;
            }
            .custom-scrollbar-ai::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(180deg, rgba(244, 63, 94, 0.5), rgba(217, 70, 239, 0.5));
            }

            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
        `;
        document.head.appendChild(style);

        return () => {
            const existingStyle = document.getElementById(styleId);
            if (existingStyle) existingStyle.remove();
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#0a0508] flex items-center justify-center p-8">
            {/* Global background effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fuchsia-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-md w-full">
                <MainCard onClick={() => setIsModalOpen(true)} />
                <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
}
