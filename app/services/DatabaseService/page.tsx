'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
    Database, Search, HardDrive, Shield, Zap, BarChart3,
    ChevronRight, X, CheckCircle, Layers, RefreshCw,
    Timer, Copy, Server, GitBranch, Lock, Activity,
    Cpu, ArrowRight, Star, Code2, Rocket, Target, Users,
    Award, TrendingUp, Play, ExternalLink
} from 'lucide-react';

// Enhanced service data with more interactive elements
const serviceData = {
    id: 'database',
    title: 'Bases de Datos',
    subtitle: 'Arquitecturas de Datos Optimizadas & Escalables',
    description: 'Diseñamos el cerebro de datos de tu aplicación. Desde esquemas relacionales hasta soluciones NoSQL distribuidas, creamos arquitecturas de datos que rinden al máximo.',
    icon: Database,
    gradient: 'from-amber-400 via-orange-500 to-yellow-500',
    accentColor: 'amber',
    stats: { projects: 42, satisfaction: 98, queries: '10M+' },
    features: [
        { icon: Layers, title: 'Diseño de Esquemas', desc: 'Modelado relacional y NoSQL optimizado', detail: 'Creamos arquitecturas de datos normalizadas y desnormalizadas según las necesidades. Implementamos patrones de diseño como Table Inheritance, Adjacency List, y Materialized Paths para estructuras jerárquicas.' },
        { icon: Zap, title: 'Optimización de Queries', desc: 'Análisis profundo con EXPLAIN y optimización de índices', detail: 'Perfilamos cada consulta crítica, identificamos cuellos de botella y creamos índices estratégicos. Implementamos partitioning, covering indexes y query rewriting para máxima eficiencia.' },
        { icon: Copy, title: 'Replicación Avanzada', desc: 'Master-slave, multi-master y sharding para alta disponibilidad', detail: 'Diseñamos topologías de replicación que garantizan uptime del 99.99%. Implementamos failover automático, load balancing de lecturas y consistencia eventual configurada a medida.' },
        { icon: HardDrive, title: 'Migraciones Zero-Downtime', desc: 'Transición de datos sin interrupciones del servicio', detail: 'Ejecutamos migraciones complejas mientras tu aplicación sigue funcionando. Usamos técnicas como dual-write, change data capture y backfill progresivo.' },
        { icon: Shield, title: 'Backup & Recovery', desc: 'Estrategias de respaldo automatizado y recuperación rápida', detail: 'Implementamos backups incrementales, Point-in-Time Recovery y disaster recovery. Simulamos escenarios de fallo para validar tiempos de recuperación.' },
        { icon: BarChart3, title: 'Data Warehouse', desc: 'ETL, analytics y Business Intelligence integration', detail: 'Construimos pipelines de datos que transforman información cruda en insights. Diseñamos modelos dimensional (star/snowflake schema) para analytics eficientes.' }
    ],
    technologies: [
        { name: 'PostgreSQL', level: 95, icon: '🐘', color: 'from-blue-400 to-cyan-500', description: 'Base de datos relacional más avanzada' },
        { name: 'MongoDB', level: 92, icon: '🍃', color: 'from-green-400 to-emerald-500', description: 'NoSQL para documentos flexibles' },
        { name: 'Redis', level: 90, icon: '🔴', color: 'from-red-400 to-rose-500', description: 'Cache y mensajes en memoria' },
        { name: 'MySQL', level: 88, icon: '🐬', color: 'from-orange-400 to-amber-500', description: 'Relacional para aplicaciones web' },
        { name: 'Elasticsearch', level: 85, icon: '🔍', color: 'from-yellow-400 to-orange-500', description: 'Búsqueda y analytics en tiempo real' },
        { name: 'Prisma ORM', level: 92, icon: '⚡', color: 'from-slate-400 to-zinc-500', description: 'ORM moderno para TypeScript' }
    ],
    benefits: [
        { title: 'Consultas ultra-rápidas', icon: Zap },
        { title: 'Integridad garantizada', icon: Shield },
        { title: 'Escalabilidad horizontal', icon: Layers },
        { title: 'Análisis en tiempo real', icon: BarChart3 }
    ],
    process: [
        { step: '01', title: 'Análisis', desc: 'Entendemos tus datos, volumetría y patrones de acceso' },
        { step: '02', title: 'Diseño', desc: 'Seleccionamos motores y diseñamos esquemas óptimos' },
        { step: '03', title: 'Implementación', desc: 'Configuramos clusters, índices y estrategias de backup' },
        { step: '04', title: 'Optimización', desc: 'Profileamos queries y ajustamos configuraciones' },
        { step: '05', title: 'Monitoreo', desc: 'Dashboards, alertas y mantenimiento continuo' }
    ],
    testimonials: [
        { name: 'Carlos Mendoza', role: 'CTO @ DataFlow Inc.', text: 'Reducieron los tiempos de query de 3 segundos a 50ms. Increíble transformación en nuestra infraestructura.', avatar: '👨‍💼' },
        { name: 'Ana García', role: 'Lead Engineer @ FintechApp', text: 'Migraron 5TB de datos sin un solo minuto de downtime. Profesionales excepcionales y metodología impecable.', avatar: '👩‍💻' },
        { name: 'Roberto Silva', role: 'Data Architect @ BigData Co.', text: 'La arquitectura de sharding que diseñaron escala perfectamente con nuestro crecimiento exponencial.', avatar: '👨‍🔬' }
    ],
    funFacts: [
        { number: '50M+', label: 'Queries/día' },
        { number: '99.99%', label: 'Uptime' },
        { number: '<10ms', label: 'Latencia' },
        { number: '100x', label: 'Más rápido' }
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

// Floating orb component - Client only to avoid hydration mismatch
function FloatingOrb({ delay = 0, size = 'md', color = 'amber' }: { delay?: number; size?: 'sm' | 'md' | 'lg'; color?: string }) {
    const sizeClasses = {
        sm: 'w-2 h-2',
        md: 'w-3 h-3',
        lg: 'w-4 h-4'
    };

    // Use lazy initial state to compute random values only once on mount
    const [position] = useState(() => ({
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
        duration: 8 + Math.random() * 4
    }));

    return (
        <motion.div
            className={`absolute ${sizeClasses[size]} rounded-full`}
            style={{
                background: `radial-gradient(circle, ${color === 'amber' ? 'rgba(245, 158, 11, 0.8)' : 'rgba(249, 115, 22, 0.8)'} 0%, transparent 70%)`,
                filter: 'blur(1px)'
            }}
            initial={{
                x: position.x,
                y: position.y,
                scale: 0
            }}
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

// Enhanced floating particles with varied shapes - Client only to avoid hydration mismatch
function EnhancedParticles() {
    // Use lazy initial state to compute random values only once on mount
    const [particles] = useState(() =>
        [...Array(30)].map((_, i) => ({
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
            colorClass: i % 3 === 0 ? 'bg-amber-400/20' : i % 3 === 1 ? 'bg-orange-400/15' : 'bg-yellow-400/10'
        }))
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle, i) => (
                <motion.div
                    key={i}
                    className={`absolute rounded-full ${particle.colorClass}`}
                    style={{
                        width: particle.width,
                        height: particle.height,
                    }}
                    initial={{
                        x: particle.x,
                        y: particle.y,
                    }}
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

// Code rain effect with syntax highlighting - Client only to avoid hydration mismatch
function EnhancedCodeRain() {
    const codeSnippets = [
        { code: 'SELECT * FROM', color: 'text-amber-400' },
        { code: 'CREATE INDEX idx_', color: 'text-orange-400' },
        { code: 'JOIN users ON', color: 'text-yellow-400' },
        { code: 'WHERE created_at >', color: 'text-amber-300' },
        { code: 'GROUP BY category', color: 'text-orange-300' },
        { code: 'ORDER BY score DESC', color: 'text-yellow-300' },
        { code: 'EXPLAIN ANALYZE', color: 'text-amber-400' },
        { code: 'VACUUM ANALYZE', color: 'text-orange-400' },
        { code: 'INSERT INTO logs', color: 'text-yellow-400' },
        { code: 'UPDATE stats SET', color: 'text-amber-300' },
        { code: 'WITH RECURSIVE', color: 'text-orange-300' },
        { code: 'PARTITION BY RANGE', color: 'text-yellow-300' }
    ];

    // Use lazy initial state to compute random values only once on mount
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
            <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-amber-500/40 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-amber-500/10">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{tech.icon}</span>
                            <div>
                                <h4 className="font-semibold text-white group-hover:text-amber-300 transition-colors">{tech.name}</h4>
                                <p className="text-xs text-gray-500">{tech.description}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className={`text-lg font-bold bg-gradient-to-r ${tech.color} bg-clip-text text-transparent`}>
                                {tech.level}%
                            </span>
                        </div>
                    </div>

                    {/* Enhanced progress bar */}
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
                        ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 border-amber-500/40'
                        : 'bg-white/[0.02] border-white/5 hover:border-amber-500/30 hover:bg-amber-500/5'
                    }`}
            >
                {/* Animated border gradient */}
                <motion.div
                    animate={{
                        opacity: isExpanded ? 1 : 0
                    }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.3), transparent)',
                        backgroundSize: '200% 100%'
                    }}
                />

                <div className="relative z-10">
                    <div className="flex items-start gap-4">
                        <motion.div
                            animate={{ rotate: isExpanded ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                            className={`p-3 rounded-xl transition-colors ${isExpanded ? 'bg-amber-500/20' : 'bg-white/5 group-hover:bg-amber-500/10'}`}
                        >
                            <feature.icon className={`w-5 h-5 transition-colors ${isExpanded ? 'text-amber-300' : 'text-amber-400'}`} />
                        </motion.div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h4 className={`font-semibold transition-colors ${isExpanded ? 'text-amber-300' : 'text-white group-hover:text-amber-300'}`}>
                                    {feature.title}
                                </h4>
                                <motion.div
                                    animate={{ rotate: isExpanded ? 90 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
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
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-amber-500/50 via-orange-500/30 to-yellow-500/50" />

            <div className="space-y-6">
                {serviceData.process.map((step, index) => (
                    <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="relative pl-12 group"
                    >
                        {/* Step indicator */}
                        <div className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-amber-500/30 group-hover:scale-110 transition-transform">
                            {step.step}
                        </div>

                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-amber-500/20 group-hover:bg-amber-500/5 transition-all">
                            <h4 className="font-semibold text-white group-hover:text-amber-300 transition-colors">{step.title}</h4>
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
                            ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30'
                            : 'bg-white/[0.02] border border-white/5'
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    >
                        <div className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                            {fact.number}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">{fact.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-4">
                {serviceData.funFacts.map((_, index) => (
                    <motion.div
                        key={index}
                        animate={{
                            width: currentIndex === index ? 24 : 8,
                            backgroundColor: currentIndex === index ? 'rgb(245, 158, 11)' : 'rgba(255,255,255,0.2)'
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
            className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-amber-500/30 transition-all"
        >
            <div className="flex items-start gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                    <p className="text-gray-300 italic">"{testimonial.text}"</p>
                    <div className="mt-4">
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-amber-400">{testimonial.role}</div>
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
    const queriesCounter = useAnimatedCounter(10);

    useEffect(() => {
        projectsCounter.startAnimation();
        satisfactionCounter.startAnimation();
        queriesCounter.startAnimation();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4">
            {[
                { label: 'Proyectos', value: projectsCounter.count, suffix: '+', icon: Server },
                { label: 'Satisfacción', value: satisfactionCounter.count, suffix: '%', icon: Award },
                { label: 'M Queries/día', value: queriesCounter.count, suffix: '+', icon: Activity }
            ].map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer hover:bg-amber-500/5"
                >
                    <stat.icon className="w-5 h-5 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
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
                    <TechCard
                        key={tech.name}
                        tech={tech}
                        index={index}
                        onClick={() => { }}
                    />
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
        { id: 'features', label: 'Características', icon: Layers },
        { id: 'technologies', label: 'Tecnologías', icon: Code2 },
        { id: 'process', label: 'Proceso', icon: GitBranch },
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
                        className="fixed inset-0 md:inset-4 lg:inset-8 z-50 overflow-hidden rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#0a0505] via-[#0d0805] to-[#0a0505] shadow-2xl"
                    >
                        {/* Animated background effects */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />
                            <ClientOnly>
                                <EnhancedCodeRain />
                                {[...Array(6)].map((_, i) => (
                                    <FloatingOrb key={i} delay={i * 0.5} size={i % 2 === 0 ? 'md' : 'sm'} color={i % 2 === 0 ? 'amber' : 'orange'} />
                                ))}
                            </ClientOnly>
                            <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
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

                        <div className="relative z-10 h-full overflow-y-auto custom-scrollbar">
                            {/* Hero Header */}
                            <div className="relative h-72 md:h-80 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-yellow-500/20" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0505] via-[#0a0505]/50 to-transparent" />

                                {/* Animated shapes */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                    className="absolute top-10 right-10 w-32 h-32 border border-amber-500/20 rounded-3xl"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                                    className="absolute bottom-20 left-10 w-20 h-20 border border-orange-500/20 rounded-full"
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
                                            className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 backdrop-blur-sm shadow-xl shadow-amber-500/20"
                                        >
                                            <Database className="w-12 h-12 text-amber-400" />
                                        </motion.div>
                                        <div>
                                            <motion.h2
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-orange-300"
                                            >
                                                {serviceData.title}
                                            </motion.h2>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-amber-400 text-lg mt-2"
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
                                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-300 text-sm cursor-pointer hover:border-amber-500/40 transition-colors"
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
                                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
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
                                            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(245, 158, 11, 0.3)' }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 text-white font-semibold flex items-center justify-center gap-3 shadow-xl relative overflow-hidden group"
                                        >
                                            <motion.div
                                                animate={{ x: ['-100%', '200%'] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            />
                                            <Rocket className="w-5 h-5 relative z-10" />
                                            <span className="relative z-10">Diseñar Base de Datos</span>
                                            <ArrowRight className="w-5 h-5 relative z-10" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02, borderColor: 'rgba(245, 158, 11, 0.5)' }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-amber-400 font-semibold hover:bg-amber-500/10 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                            Ver Casos
                                        </motion.button>
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
            <div className="relative rounded-3xl border border-amber-500/20 bg-gradient-to-br from-[#0a0505] to-[#0d0805] overflow-hidden transition-all duration-500 hover:border-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/20">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            background: isHovered
                                ? 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.2) 0%, rgba(249, 115, 22, 0.1) 50%, transparent 70%)'
                                : 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0) 0%, transparent 50%)'
                        }}
                        className="absolute inset-0"
                    />
                    {isHovered && (
                        <ClientOnly>
                            <EnhancedParticles />
                        </ClientOnly>
                    )}

                    {/* Gradient orbs */}
                    <motion.div
                        animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.3 : 0 }}
                        className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.2 : 0 }}
                        className="absolute -bottom-20 -left-20 w-40 h-40 bg-orange-500 rounded-full blur-3xl"
                    />
                </div>

                {/* Shimmer border */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.4), transparent)',
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
                            className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 backdrop-blur-sm shadow-xl shadow-amber-500/10"
                        >
                            <Database className="w-8 h-8 text-amber-400" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                x: isHovered ? 0 : -10
                            }}
                            className="flex items-center gap-1 text-amber-400 text-sm font-medium bg-amber-500/10 px-3 py-1.5 rounded-full border border-amber-500/20"
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
                            backgroundImage: 'linear-gradient(90deg, #fff, #f59e0b, #f97316, #fff)',
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

                    {/* Tech badges with staggered animation */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Prisma'].map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    y: 0,
                                    y: isHovered ? -2 : 0
                                }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(245, 158, 11, 0.2)' }}
                                className="px-3 py-1.5 text-xs rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/5">
                        {[
                            { icon: Server, value: `${serviceData.stats.projects}+`, label: 'Proyectos' },
                            { icon: Award, value: `${serviceData.stats.satisfaction}%`, label: 'Satisfacción' },
                            { icon: Activity, value: serviceData.stats.queries, label: 'Queries/día' }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-all group/stat"
                            >
                                <stat.icon className="w-4 h-4 text-amber-400 mb-1 group-hover/stat:scale-110 transition-transform" />
                                <span className="text-sm font-bold text-white">{stat.value}</span>
                                <span className="text-xs text-gray-500">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Corner accents */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-amber-500/30 to-transparent blur-2xl"
                />
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-500/20 to-transparent blur-2xl"
                />
            </div>
        </motion.div>
    );
}

// Main export
export default function DatabaseService() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inject custom styles dynamically to avoid hydration mismatch
    useEffect(() => {
        const styleId = 'database-service-custom-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .custom-scrollbar::-webkit-scrollbar {
                width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.02);
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, rgba(245, 158, 11, 0.3), rgba(249, 115, 22, 0.3));
                border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(180deg, rgba(245, 158, 11, 0.5), rgba(249, 115, 22, 0.5));
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
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-8">
            {/* Global background effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-md w-full">
                <MainCard onClick={() => setIsModalOpen(true)} />
                <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
}
