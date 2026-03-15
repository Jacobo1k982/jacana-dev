'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
    Server, Database, Shield, Zap, GitBranch, Terminal,
    ChevronRight, X, CheckCircle, Sparkles, Cpu, Network,
    Lock, ArrowRightLeft, Globe, Award, Users, ArrowRight,
    ExternalLink, Heart, TrendingUp, Clock, Play, Rocket,
    Activity, HardDrive, Cloud, Settings
} from 'lucide-react';

// Enhanced service data with more interactive elements
const serviceData = {
    id: 'backend',
    title: 'Desarrollo Backend',
    subtitle: 'Arquitecturas Robustas & APIs Escalables',
    description: 'Construimos el corazón de tu aplicación. Diseñamos arquitecturas backend sólidas, seguras y de alto rendimiento que escalan con tu negocio.',
    icon: Server,
    gradient: 'from-emerald-400 via-green-500 to-teal-500',
    accentColor: 'emerald',
    stats: { projects: 38, satisfaction: 97, uptime: 99.9 },
    features: [
        { icon: ArrowRightLeft, title: 'APIs REST & GraphQL', desc: 'Interfaces de programación robustas y documentadas', detail: 'Diseñamos APIs siguiendo mejores prácticas de la industria, con documentación automática, versionado y rate limiting inteligente.' },
        { icon: Network, title: 'Microservicios', desc: 'Arquitectura distribuida y escalable', detail: 'Descomponemos monolitos en servicios independientes con comunicación eficiente via message brokers y service mesh.' },
        { icon: Lock, title: 'Autenticación', desc: 'OAuth, JWT, y sistemas de autorización', detail: 'Implementamos flujos OAuth2, OpenID Connect, y gestión de sesiones con refresh tokens seguros.' },
        { icon: Zap, title: 'Procesamiento Async', desc: 'Colas, workers y eventos en tiempo real', detail: 'Arquitecturas event-driven con Kafka, RabbitMQ o Redis para procesamiento escalable de tareas pesadas.' },
        { icon: GitBranch, title: 'WebSockets', desc: 'Comunicación bidireccional en tiempo real', detail: 'Sistemas de chat, notificaciones push y actualizaciones en vivo con reconexión automática y heartbeats.' },
        { icon: Shield, title: 'Seguridad', desc: 'Protección contra vulnerabilidades OWASP', detail: 'Auditorías de seguridad, encryption at-rest y in-transit, WAF y protección contra SQL injection, XSS y CSRF.' }
    ],
    technologies: [
        { name: 'Node.js', level: 95, icon: '💚', color: 'from-green-400 to-emerald-500', description: 'Runtime JavaScript escalable' },
        { name: 'Python', level: 92, icon: '🐍', color: 'from-yellow-400 to-amber-500', description: 'Lenguaje versátil y productivo' },
        { name: 'Go', level: 88, icon: '🐹', color: 'from-cyan-400 to-teal-500', description: 'Alto rendimiento y concurrencia' },
        { name: 'Java/Spring', level: 85, icon: '☕', color: 'from-red-400 to-orange-500', description: 'Framework enterprise robusto' },
        { name: 'Rust', level: 75, icon: '🦀', color: 'from-orange-400 to-red-500', description: 'Seguridad de memoria garantizada' },
        { name: 'GraphQL', level: 90, icon: '◈', color: 'from-pink-400 to-rose-500', description: 'Query language flexible' }
    ],
    benefits: [
        { title: 'Alta disponibilidad garantizada', icon: Activity },
        { title: 'Escalabilidad horizontal automática', icon: TrendingUp },
        { title: 'Seguridad a nivel empresarial', icon: Shield },
        { title: 'Documentación automática', icon: Database }
    ],
    process: [
        { step: '01', title: 'Análisis', desc: 'Requisitos, volumen de datos y patrones de tráfico' },
        { step: '02', title: 'Arquitectura', desc: 'Diseño de microservicios y base de datos' },
        { step: '03', title: 'Desarrollo', desc: 'APIs, autenticación y lógica de negocio' },
        { step: '04', title: 'DevOps', desc: 'CI/CD, monitoreo y escalado automático' }
    ],
    testimonials: [
        { name: 'Roberto Méndez', role: 'CTO @ FinTech Corp', text: 'Nuestra API pasó de soportar 1K a 100K requests/segundo sin modificar una línea de código. Impresionante.', avatar: '👨‍💼' },
        { name: 'Ana Torres', role: 'Lead Developer @ SaaS', text: 'La arquitectura de microservicios redujo nuestros costos de infraestructura en un 60%. ROI excepcional.', avatar: '👩‍💻' }
    ],
    funFacts: [
        { number: '<50ms', label: 'Latencia promedio' },
        { number: '100K+', label: 'Requests/segundo' },
        { number: '99.99%', label: 'Uptime SLA' },
        { number: '0', label: 'Vulnerabilidades' }
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

// Floating data node component
function FloatingDataNode({ delay = 0, size = 'md' }: { delay?: number; size?: 'sm' | 'md' | 'lg' }) {
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
                background: 'radial-gradient(circle, rgba(16, 185, 129, 0.8) 0%, transparent 70%)',
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

// Enhanced data flow particles
function EnhancedDataParticles() {
    const [particles] = useState(() =>
        [...Array(30)].map((_, i) => ({
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5,
            colorClass: i % 3 === 0 ? 'bg-emerald-400/20' : i % 3 === 1 ? 'bg-green-400/15' : 'bg-teal-400/10'
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

// Circuit pattern animation for backend
function CircuitPattern() {
    const lines = [
        { x1: 10, y1: 20, x2: 30, y2: 20 },
        { x1: 30, y1: 20, x2: 30, y2: 40 },
        { x1: 30, y1: 40, x2: 50, y2: 40 },
        { x1: 50, y1: 40, x2: 50, y2: 60 },
        { x1: 70, y1: 10, x2: 70, y2: 30 },
        { x1: 70, y1: 30, x2: 90, y2: 30 },
        { x1: 90, y1: 30, x2: 90, y2: 50 },
        { x1: 20, y1: 50, x2: 40, y2: 50 },
        { x1: 40, y1: 50, x2: 40, y2: 70 },
        { x1: 60, y1: 60, x2: 80, y2: 60 },
        { x1: 80, y1: 60, x2: 80, y2: 80 },
    ];

    return (
        <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {lines.map((line, i) => (
                    <motion.line
                        key={i}
                        x1={line.x1}
                        y1={line.y1}
                        x2={line.x2}
                        y2={line.y2}
                        stroke="currentColor"
                        strokeWidth="0.3"
                        className="text-emerald-400"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                    />
                ))}
                {[[30, 20], [50, 40], [70, 30], [90, 50], [40, 70], [80, 80]].map(([cx, cy], i) => (
                    <motion.circle
                        key={i}
                        cx={cx}
                        cy={cy}
                        r="1"
                        className="text-emerald-400"
                        fill="currentColor"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.5, 1], opacity: [0, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                    />
                ))}
            </svg>
        </div>
    );
}

// Terminal code animation
function TerminalCodeRain() {
    const codeSnippets = [
        { code: 'npm run build', color: 'text-green-400' },
        { code: 'docker compose up', color: 'text-cyan-400' },
        { code: 'SELECT * FROM', color: 'text-yellow-400' },
        { code: 'async/await', color: 'text-purple-400' },
        { code: 'REST API', color: 'text-emerald-400' },
        { code: 'mutation { }', color: 'text-pink-400' },
        { code: 'kubectl apply', color: 'text-blue-400' },
        { code: 'GRPC call', color: 'text-orange-400' },
        { code: 'WebSocket', color: 'text-teal-400' },
        { code: 'JWT.verify()', color: 'text-amber-400' },
        { code: 'Redis.set()', color: 'text-red-400' },
        { code: 'POST /api/v1', color: 'text-lime-400' }
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
            <div className="relative p-5 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-emerald-500/40 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-emerald-500/10">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">{tech.icon}</span>
                            <div>
                                <h4 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">{tech.name}</h4>
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
                        ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border-emerald-500/40'
                        : 'bg-white/[0.02] border-white/5 hover:border-emerald-500/30 hover:bg-emerald-500/5'
                    }`}
            >
                <motion.div
                    animate={{ opacity: isExpanded ? 1 : 0 }}
                    className="absolute inset-0 rounded-2xl"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent)',
                        backgroundSize: '200% 100%'
                    }}
                />
                <div className="relative z-10">
                    <div className="flex items-start gap-4">
                        <motion.div
                            animate={{ rotate: isExpanded ? 360 : 0 }}
                            transition={{ duration: 0.5 }}
                            className={`p-3 rounded-xl transition-colors ${isExpanded ? 'bg-emerald-500/20' : 'bg-white/5 group-hover:bg-emerald-500/10'}`}
                        >
                            <feature.icon className={`w-5 h-5 transition-colors ${isExpanded ? 'text-emerald-300' : 'text-emerald-400'}`} />
                        </motion.div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between">
                                <h4 className={`font-semibold transition-colors ${isExpanded ? 'text-emerald-300' : 'text-white group-hover:text-emerald-300'}`}>
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
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-green-500/30 to-teal-500/50" />
            <div className="space-y-6">
                {serviceData.process.map((step, index) => (
                    <motion.div
                        key={step.step}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="relative pl-12 group"
                    >
                        <div className="absolute left-0 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                            {step.step}
                        </div>
                        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-emerald-500/20 group-hover:bg-emerald-500/5 transition-all">
                            <h4 className="font-semibold text-white group-hover:text-emerald-300 transition-colors">{step.title}</h4>
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
                                ? 'bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/30'
                                : 'bg-white/[0.02] border border-white/5'
                            }`}
                        onClick={() => setCurrentIndex(index)}
                    >
                        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
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
                            backgroundColor: currentIndex === index ? 'rgb(16, 185, 129)' : 'rgba(255,255,255,0.2)'
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
            className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10 hover:border-emerald-500/30 transition-all"
        >
            <div className="flex items-start gap-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                    <p className="text-gray-300 italic">"{testimonial.text}"</p>
                    <div className="mt-4">
                        <div className="font-semibold text-white">{testimonial.name}</div>
                        <div className="text-sm text-emerald-400">{testimonial.role}</div>
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

    useEffect(() => {
        projectsCounter.startAnimation();
        satisfactionCounter.startAnimation();
    }, []);

    return (
        <div className="grid grid-cols-3 gap-4">
            {[
                { label: 'Proyectos', value: projectsCounter.count, suffix: '+', icon: Database },
                { label: 'Satisfacción', value: satisfactionCounter.count, suffix: '%', icon: Award },
                { label: 'Uptime', value: serviceData.stats.uptime, suffix: '%', icon: Activity, isFloat: true }
            ].map((stat, index) => (
                <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer hover:bg-emerald-500/5"
                >
                    <stat.icon className="w-5 h-5 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                        {stat.isFloat ? stat.value : stat.value}{stat.suffix}
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
        { id: 'features', label: 'Características', icon: Cpu },
        { id: 'technologies', label: 'Tecnologías', icon: Terminal },
        { id: 'process', label: 'Proceso', icon: Settings },
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
                        className="fixed inset-0 md:inset-4 lg:inset-8 z-50 overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#0a1510] via-[#0a1a15] to-[#0a1510] shadow-2xl"
                    >
                        {/* Animated background effects */}
                        <div className="absolute inset-0 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
                            <ClientOnly>
                                <TerminalCodeRain />
                                <CircuitPattern />
                                {[...Array(6)].map((_, i) => (
                                    <FloatingDataNode key={i} delay={i * 0.5} size={i % 2 === 0 ? 'md' : 'sm'} />
                                ))}
                            </ClientOnly>
                            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
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

                        <div className="relative z-10 h-full overflow-y-auto custom-scrollbar-backend">
                            {/* Hero Header */}
                            <div className="relative h-72 md:h-80 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/30 via-green-500/20 to-teal-500/20" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1510] via-[#0a1510]/50 to-transparent" />

                                {/* Animated shapes */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                                    className="absolute top-10 right-10 w-32 h-32 border border-emerald-500/20 rounded-3xl"
                                />
                                <motion.div
                                    animate={{ rotate: -360 }}
                                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                                    className="absolute bottom-20 left-10 w-20 h-20 border border-teal-500/20 rounded-full"
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
                                            className="p-5 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 backdrop-blur-sm shadow-xl shadow-emerald-500/20"
                                        >
                                            <Server className="w-12 h-12 text-emerald-400" />
                                        </motion.div>
                                        <div>
                                            <motion.h2
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-200 to-teal-300"
                                            >
                                                {serviceData.title}
                                            </motion.h2>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="text-emerald-400 text-lg mt-2"
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
                                            className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 text-emerald-300 text-sm cursor-pointer hover:border-emerald-500/40 transition-colors"
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
                                                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
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
                                            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(16, 185, 129, 0.3)' }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white font-semibold flex items-center justify-center gap-3 shadow-xl relative overflow-hidden group"
                                        >
                                            <motion.div
                                                animate={{ x: ['-100%', '200%'] }}
                                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                            />
                                            <Rocket className="w-5 h-5 relative z-10" />
                                            <span className="relative z-10">Construir API</span>
                                            <ArrowRight className="w-5 h-5 relative z-10" />
                                        </motion.button>
                                        <motion.button
                                            whileHover={{ scale: 1.02, borderColor: 'rgba(16, 185, 129, 0.5)' }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-emerald-400 font-semibold hover:bg-emerald-500/10 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                            Ver Arquitectura
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
            <div className="relative rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#0a1510] to-[#0d1a15] overflow-hidden transition-all duration-500 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/20">
                {/* Animated background */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{
                            background: isHovered
                                ? 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.2) 0%, rgba(20, 184, 166, 0.1) 50%, transparent 70%)'
                                : 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0) 0%, transparent 50%)'
                        }}
                        className="absolute inset-0"
                    />
                    {isHovered && (
                        <ClientOnly>
                            <EnhancedDataParticles />
                        </ClientOnly>
                    )}

                    {/* Gradient orbs */}
                    <motion.div
                        animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.3 : 0 }}
                        className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ scale: isHovered ? 1.2 : 1, opacity: isHovered ? 0.2 : 0 }}
                        className="absolute -bottom-20 -left-20 w-40 h-40 bg-teal-500 rounded-full blur-3xl"
                    />
                </div>

                {/* Shimmer border */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 rounded-3xl"
                    style={{
                        background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), transparent)',
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
                            className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 backdrop-blur-sm shadow-xl shadow-emerald-500/10"
                        >
                            <Server className="w-8 h-8 text-emerald-400" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: -10 }}
                            animate={{
                                opacity: isHovered ? 1 : 0,
                                x: isHovered ? 0 : -10
                            }}
                            className="flex items-center gap-1 text-emerald-400 text-sm font-medium bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20"
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
                            backgroundImage: 'linear-gradient(90deg, #fff, #34d399, #14b8a6, #fff)',
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
                        {['Node.js', 'Python', 'Go', 'GraphQL', 'Docker'].map((tech, i) => (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: isHovered ? -2 : 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ scale: 1.1, backgroundColor: 'rgba(16, 185, 129, 0.2)' }}
                                className="px-3 py-1.5 text-xs rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 cursor-default"
                            >
                                {tech}
                            </motion.span>
                        ))}
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3 pt-5 border-t border-white/5">
                        {[
                            { icon: Database, value: `${serviceData.stats.projects}+`, label: 'Proyectos' },
                            { icon: Award, value: `${serviceData.stats.satisfaction}%`, label: 'Satisfacción' },
                            { icon: Activity, value: `${serviceData.stats.uptime}%`, label: 'Uptime' }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="flex flex-col items-center p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-emerald-500/20 transition-all group/stat"
                            >
                                <stat.icon className="w-4 h-4 text-emerald-400 mb-1 group-hover/stat:scale-110 transition-transform" />
                                <span className="text-sm font-bold text-white">{stat.value}</span>
                                <span className="text-xs text-gray-500">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Corner accents */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/30 to-transparent blur-2xl"
                />
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-teal-500/20 to-transparent blur-2xl"
                />
            </div>
        </motion.div>
    );
}

// Main export
export default function BackendService() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Inject custom styles dynamically to avoid hydration mismatch
    useEffect(() => {
        const styleId = 'backend-service-custom-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .custom-scrollbar-backend::-webkit-scrollbar {
                width: 6px;
            }
            .custom-scrollbar-backend::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.02);
            }
            .custom-scrollbar-backend::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, rgba(16, 185, 129, 0.3), rgba(20, 184, 166, 0.3));
                border-radius: 3px;
            }
            .custom-scrollbar-backend::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(180deg, rgba(16, 185, 129, 0.5), rgba(20, 184, 166, 0.5));
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
        <div className="min-h-screen bg-[#050a08] flex items-center justify-center p-8">
            {/* Global background effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-md w-full">
                <MainCard onClick={() => setIsModalOpen(true)} />
                <ServiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>
        </div>
    );
}
