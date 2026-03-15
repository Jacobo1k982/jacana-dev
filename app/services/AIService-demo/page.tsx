'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
    Play, X, Sparkles, Bot, Eye, Mic, Brain, MessageSquare,
    Image, Video, FileText, Volume2, ChevronRight, ArrowRight,
    ExternalLink, Heart, Clock, Users, Zap, Star, Filter,
    Search, Grid, List, Download, Share2, Bookmark, ThumbsUp,
    RefreshCw, Maximize2, Settings, Info, Pause, VolumeX, Volume1,
    Loader2, Film, Tv, MonitorPlay, Clapperboard
} from 'lucide-react';

// Demo data with video URLs
const demosData = [
    {
        id: 'chatbot-finance',
        title: 'Chatbot Financiero',
        category: 'chatbots',
        description: 'Asistente virtual para consultas bancarias con detección de intención y respuestas contextuales.',
        icon: Bot,
        gradient: 'from-emerald-400 to-cyan-500',
        duration: '0:15',
        views: '12.5K',
        rating: 4.9,
        features: ['NLP Avanzado', 'Contexto Multi-turno', 'Integración API'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        preview: {
            type: 'chat',
            messages: [
                { role: 'user', text: '¿Cuál es mi saldo actual?' },
                { role: 'bot', text: 'Hola María 👋 Tu saldo actual es de $15,420.50 MXN. ¿Te gustaría ver tus últimos movimientos?' },
                { role: 'user', text: 'Sí, muestra los últimos 5' },
                { role: 'bot', text: 'Aquí están tus últimos 5 movimientos:\n\n💳 Starbucks - $125.00\n🛒 Superama - $890.50\n⛽ Shell - $650.00\n📱 Netflix - $139.00\n🍽️ Uber Eats - $245.00' }
            ]
        }
    },
    {
        id: 'computer-vision',
        title: 'Detección de Objetos',
        category: 'vision',
        description: 'Sistema de visión por computadora para detección y clasificación de objetos en tiempo real.',
        icon: Eye,
        gradient: 'from-violet-400 to-purple-500',
        duration: '0:15',
        views: '8.2K',
        rating: 4.8,
        features: ['YOLO v8', 'Real-time', 'Multi-clase'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        preview: {
            type: 'vision',
            objects: [
                { label: 'Persona', confidence: 98, color: '#22c55e' },
                { label: 'Automóvil', confidence: 95, color: '#3b82f6' },
                { label: 'Señal de tránsito', confidence: 92, color: '#f59e0b' }
            ]
        }
    },
    {
        id: 'voice-assistant',
        title: 'Asistente de Voz',
        category: 'voice',
        description: 'Asistente de voz inteligente con reconocimiento de voz natural y síntesis de respuesta.',
        icon: Mic,
        gradient: 'from-rose-400 to-pink-500',
        duration: '0:15',
        views: '15.3K',
        rating: 5.0,
        features: ['Whisper ASR', 'TTS Natural', 'Multi-idioma'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMelodies.mp4',
        preview: {
            type: 'voice',
            waveform: true,
            transcript: 'Alexa, agenda una reunión con el equipo de marketing para mañana a las 10 AM',
            response: '✅ Reunión agendada con el equipo de marketing para mañana a las 10:00 AM. He enviado invitaciones a todos los participantes.'
        }
    },
    {
        id: 'image-generation',
        title: 'Generación de Imágenes',
        category: 'generation',
        description: 'Sistema de generación de imágenes con IA a partir de descripciones textuales.',
        icon: Image,
        gradient: 'from-amber-400 to-orange-500',
        duration: '0:15',
        views: '20.1K',
        rating: 4.9,
        features: ['Stable Diffusion', 'Alta resolución', 'Estilos variados'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        preview: {
            type: 'image',
            prompt: 'Un jardín zen futurista con cerezos en flor, estilo cyberpunk, iluminación neón',
            generated: true
        }
    },
    {
        id: 'document-analyzer',
        title: 'Análisis de Documentos',
        category: 'nlp',
        description: 'Extracción inteligente de información clave de documentos legales y financieros.',
        icon: FileText,
        gradient: 'from-blue-400 to-indigo-500',
        duration: '0:15',
        views: '6.8K',
        rating: 4.7,
        features: ['OCR + NER', 'Sumarización', 'Extracción de datos'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        preview: {
            type: 'document',
            entities: [
                { type: 'Fecha', value: '15 de Marzo, 2024', confidence: 99 },
                { type: 'Monto', value: '$2,500,000 MXN', confidence: 98 },
                { type: 'Partes', value: 'Empresa ABC S.A. de C.V.', confidence: 97 },
                { type: 'Cláusula', value: 'Terminación con 30 días de aviso', confidence: 95 }
            ]
        }
    },
    {
        id: 'sentiment-analysis',
        title: 'Análisis de Sentimiento',
        category: 'nlp',
        description: 'Análisis de sentimiento en tiempo real para redes sociales y comentarios de clientes.',
        icon: MessageSquare,
        gradient: 'from-teal-400 to-green-500',
        duration: '0:15',
        views: '9.4K',
        rating: 4.8,
        features: ['Multi-plataforma', 'Tiempo real', 'Alertas'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMoments.mp4',
        preview: {
            type: 'sentiment',
            stats: { positive: 68, neutral: 22, negative: 10 }
        }
    },
    {
        id: 'video-analysis',
        title: 'Análisis de Video',
        category: 'vision',
        description: 'Análisis automático de contenido de video con detección de escenas y objetos.',
        icon: Video,
        gradient: 'from-red-400 to-rose-500',
        duration: '0:15',
        views: '7.1K',
        rating: 4.6,
        features: ['Scene Detection', 'Object Tracking', 'Highlights'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        preview: {
            type: 'video',
            scenes: ['00:00 - Intro', '01:23 - Producto', '02:45 - Demo', '03:30 - CTA']
        }
    },
    {
        id: 'recommendation-engine',
        title: 'Motor de Recomendaciones',
        category: 'ml',
        description: 'Sistema de recomendaciones personalizadas basado en comportamiento del usuario.',
        icon: Sparkles,
        gradient: 'from-fuchsia-400 to-purple-500',
        duration: '0:15',
        views: '11.2K',
        rating: 4.9,
        features: ['Collaborative Filtering', 'Content-based', 'Real-time'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        preview: {
            type: 'recommendation',
            items: ['Producto A - 98% match', 'Producto B - 95% match', 'Producto C - 92% match']
        }
    }
];

const categories = [
    { id: 'all', label: 'Todos', icon: Grid },
    { id: 'chatbots', label: 'Chatbots', icon: Bot },
    { id: 'vision', label: 'Computer Vision', icon: Eye },
    { id: 'voice', label: 'Voz', icon: Mic },
    { id: 'nlp', label: 'NLP', icon: MessageSquare },
    { id: 'generation', label: 'Generación', icon: Image },
    { id: 'ml', label: 'Machine Learning', icon: Brain }
];

// Client-only wrapper
function ClientOnly({ children }: { children: React.ReactNode }) {
    return useSyncExternalStore(
        () => () => { },
        () => children,
        () => null
    );
}

// Floating particles
function DemoParticles() {
    const [particles] = useState(() =>
        [...Array(20)].map((_, i) => ({
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 5
        }))
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-rose-400/20 to-fuchsia-400/20"
                    style={{ width: p.size, height: p.size }}
                    initial={{ x: p.x, y: p.y }}
                    animate={{
                        y: [null, '-100vh'],
                        opacity: [0, 0.6, 0],
                        scale: [0.5, 1, 0.5]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: 'linear'
                    }}
                />
            ))}
        </div>
    );
}

// Spectacular "Ver Demos" Button Component
function VerDemosButton({ onClick }: { onClick: () => void }) {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);
    const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleClick = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newRipple = { x, y, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);
        setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== newRipple.id)), 1000);
        onClick();
    };

    return (
        <motion.button
            ref={buttonRef}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false); }}
            onClick={handleClick}
            className="relative group cursor-pointer overflow-hidden"
        >
            {/* Main button container */}
            <div className="relative px-12 py-5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 transition-all duration-500">
                {/* Animated background layers */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.8
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-pink-500 to-rose-500"
                />

                {/* Shimmer effect */}
                <motion.div
                    animate={{
                        x: isHovered ? ['0%', '200%'] : '0%'
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />

                {/* Glow ring */}
                <motion.div
                    animate={{
                        opacity: isHovered ? 1 : 0.5,
                        scale: isHovered ? 1.05 : 1
                    }}
                    className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"
                />

                {/* Content */}
                <div className="relative z-10 flex items-center gap-4">
                    {/* Animated icon */}
                    <motion.div
                        animate={{
                            scale: isHovered ? [1, 1.2, 1] : 1,
                            rotate: isHovered ? [0, 10, -10, 0] : 0
                        }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <Play className="w-7 h-7 text-white fill-white" />
                        <motion.div
                            animate={{
                                scale: isHovered ? [1, 2, 1] : 1,
                                opacity: isHovered ? [0.5, 0, 0.5] : 0
                            }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-white/30"
                        />
                    </motion.div>

                    {/* Text */}
                    <div className="flex flex-col items-start">
                        <motion.span
                            animate={{ y: isHovered ? -2 : 0 }}
                            className="text-xl font-bold text-white tracking-wide"
                        >
                            Ver Demos
                        </motion.span>
                        <motion.span
                            animate={{ y: isHovered ? 0 : 5, opacity: isHovered ? 1 : 0 }}
                            className="text-xs text-white/80"
                        >
                            {demosData.length} demos disponibles
                        </motion.span>
                    </div>

                    {/* Arrow */}
                    <motion.div
                        animate={{
                            x: isHovered ? 5 : 0,
                            opacity: isHovered ? 1 : 0.7
                        }}
                        className="ml-2"
                    >
                        <ArrowRight className="w-6 h-6 text-white" />
                    </motion.div>
                </div>

                {/* Ripples */}
                {ripples.map((ripple) => (
                    <motion.div
                        key={ripple.id}
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 4, opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute w-20 h-20 rounded-full bg-white/30 pointer-events-none"
                        style={{ left: ripple.x - 40, top: ripple.y - 40 }}
                    />
                ))}
            </div>

            {/* Floating particles around button */}
            <ClientOnly>
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-rose-400 to-fuchsia-400"
                            style={{
                                left: `${12.5 * (i + 1)}%`,
                                top: '50%'
                            }}
                            animate={{
                                y: isHovered ? [0, -20, 0] : 0,
                                opacity: isHovered ? [0, 1, 0] : 0,
                                scale: isHovered ? [0.5, 1, 0.5] : 0
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                delay: i * 0.1
                            }}
                        />
                    ))}
                </div>
            </ClientOnly>
        </motion.button>
    );
}

// Demo card with 3D effect
function DemoCard({ demo, index, onClick }: { demo: typeof demosData[0]; index: number; onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

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

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false); }}
            onClick={onClick}
            className="group cursor-pointer"
        >
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] overflow-hidden transition-all duration-500 hover:border-rose-500/40 hover:shadow-2xl hover:shadow-rose-500/20">
                {/* Glow effect */}
                <motion.div
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-fuchsia-500/10"
                />

                {/* Video preview area */}
                <div className={`relative h-40 overflow-hidden`}>
                    <video
                        src={demo.videoUrl}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity"
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${demo.gradient} opacity-20`} />

                    <motion.div
                        animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm">
                            <Play className="w-8 h-8 text-white fill-white" />
                        </div>
                    </motion.div>

                    {/* Video badge */}
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-rose-500/80 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
                        <Film className="w-3 h-3" />
                        VIDEO
                    </div>

                    {/* Duration badge */}
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/50 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {demo.duration}
                    </div>
                </div>

                {/* Content */}
                <div className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                        <motion.div
                            animate={{ scale: isHovered ? 1.1 : 1 }}
                            className={`p-2.5 rounded-xl bg-gradient-to-br ${demo.gradient}`}
                        >
                            <demo.icon className="w-5 h-5 text-white" />
                        </motion.div>
                        <div className="flex-1">
                            <h3 className="font-semibold text-white group-hover:text-rose-300 transition-colors">
                                {demo.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-0.5">{demo.category}</p>
                        </div>
                    </div>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                        {demo.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                        {demo.features.slice(0, 2).map((f) => (
                            <span key={f} className="px-2 py-0.5 text-xs rounded-md bg-white/5 text-gray-400">
                                {f}
                            </span>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Eye className="w-3.5 h-3.5" />
                                {demo.views}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-amber-400">
                                <Star className="w-3.5 h-3.5 fill-amber-400" />
                                {demo.rating}
                            </div>
                        </div>
                        <motion.div
                            animate={{ x: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0.5 }}
                            className="flex items-center gap-1 text-xs text-rose-400"
                        >
                            Ver demo
                            <ChevronRight className="w-4 h-4" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Video Player Component
function VideoPlayer({ videoUrl, isPlaying, onPlayPause }: { videoUrl: string; isPlaying: boolean; onPlayPause: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.play().catch(() => { });
        } else {
            video.pause();
        }
    }, [isPlaying]);

    const handleTimeUpdate = () => {
        const video = videoRef.current;
        if (!video) return;
        const percent = (video.currentTime / video.duration) * 100;
        setProgress(percent);
        setCurrentTime(formatTime(video.currentTime));
    };

    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        if (!video) return;
        setDuration(formatTime(video.duration));
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        if (!video) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - rect.left) / rect.width;
        video.currentTime = percent * video.duration;
    };

    const formatTime = (time: number) => {
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="relative rounded-2xl overflow-hidden bg-black/50">
            <video
                ref={videoRef}
                src={videoUrl}
                muted={isMuted}
                loop
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                className="w-full aspect-video object-cover"
            />

            {/* Video controls overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
                {/* Play/Pause center button */}
                <motion.button
                    onClick={onPlayPause}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full bg-white/20 backdrop-blur-md"
                >
                    {isPlaying ? (
                        <Pause className="w-8 h-8 text-white fill-white" />
                    ) : (
                        <Play className="w-8 h-8 text-white fill-white" />
                    )}
                </motion.button>

                {/* Bottom controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Progress bar */}
                    <div
                        onClick={handleSeek}
                        className="relative h-1 bg-white/20 rounded-full cursor-pointer mb-3"
                    >
                        <motion.div
                            className="absolute h-full bg-gradient-to-r from-rose-500 to-fuchsia-500 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <motion.button
                                onClick={onPlayPause}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {isPlaying ? (
                                    <Pause className="w-5 h-5 text-white" />
                                ) : (
                                    <Play className="w-5 h-5 text-white fill-white" />
                                )}
                            </motion.button>
                            <motion.button
                                onClick={() => setIsMuted(!isMuted)}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                {isMuted ? (
                                    <VolumeX className="w-5 h-5 text-white" />
                                ) : (
                                    <Volume1 className="w-5 h-5 text-white" />
                                )}
                            </motion.button>
                            <span className="text-sm text-white/80">
                                {currentTime} / {duration}
                            </span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <Maximize2 className="w-5 h-5 text-white" />
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Preview modal with video and interactive demo
function DemoPreviewModal({ demo, isOpen, onClose }: { demo: typeof demosData[0] | null; isOpen: boolean; onClose: () => void }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentMessage, setCurrentMessage] = useState(0);
    const [activeTab, setActiveTab] = useState<'video' | 'interactive'>('video');

    useEffect(() => {
        if (isPlaying && demo?.preview.type === 'chat' && activeTab === 'interactive') {
            const interval = setInterval(() => {
                setCurrentMessage((prev) => (prev + 1) % (demo.preview.messages?.length || 1));
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [isPlaying, demo, activeTab]);

    if (!demo) return null;

    const renderPreview = () => {
        switch (demo.preview.type) {
            case 'chat':
                return (
                    <div className="space-y-3">
                        {demo.preview.messages?.slice(0, currentMessage + 1).map((msg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user'
                                        ? 'bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white'
                                        : 'bg-white/10 text-gray-200'
                                    }`}>
                                    <p className="text-sm whitespace-pre-line">{msg.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                );
            case 'vision':
                return (
                    <div className="space-y-3">
                        <div className="relative h-48 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden">
                            <motion.div
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="text-6xl"
                            >
                                🚗👤🚦
                            </motion.div>
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: [0, 1, 0], scale: [0.8, 1, 0.8] }}
                                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                                    className="absolute border-2 rounded-lg"
                                    style={{
                                        borderColor: demo.preview.objects?.[i]?.color,
                                        left: `${20 + i * 25}%`,
                                        top: `${20 + i * 15}%`,
                                        width: '60px',
                                        height: '60px'
                                    }}
                                />
                            ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {demo.preview.objects?.map((obj, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-3 rounded-xl bg-white/5 text-center"
                                >
                                    <p className="text-xs text-gray-400">{obj.label}</p>
                                    <p className="text-lg font-bold text-white">{obj.confidence}%</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                );
            case 'voice':
                return (
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5">
                            <p className="text-xs text-gray-400 mb-2">Transcripción en tiempo real:</p>
                            <p className="text-sm text-white">"{demo.preview.transcript}"</p>
                        </div>
                        <div className="flex items-center justify-center gap-1 h-16">
                            {[...Array(30)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{
                                        height: isPlaying ? [20, 40 + Math.random() * 30, 20] : 20,
                                        backgroundColor: isPlaying ? '#f43f5e' : '#6b7280'
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        repeat: Infinity,
                                        delay: i * 0.02
                                    }}
                                    className="w-1.5 rounded-full"
                                />
                            ))}
                        </div>
                        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30">
                            <p className="text-sm text-emerald-300">{demo.preview.response}</p>
                        </div>
                    </div>
                );
            case 'image':
                return (
                    <div className="space-y-4">
                        <div className="p-3 rounded-xl bg-white/5">
                            <p className="text-xs text-gray-400 mb-1">Prompt:</p>
                            <p className="text-sm text-white">"{demo.preview.prompt}"</p>
                        </div>
                        <motion.div
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 3, repeat: Infinity }}
                            className="relative h-48 rounded-xl bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-amber-500/20 flex items-center justify-center overflow-hidden"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                className="text-6xl"
                            >
                                🌸🏯🌃
                            </motion.div>
                        </motion.div>
                    </div>
                );
            case 'document':
                return (
                    <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-white/5 border-l-4 border-rose-500">
                            <p className="text-xs text-gray-400 mb-2">Entidades extraídas:</p>
                            <div className="space-y-2">
                                {demo.preview.entities?.map((ent, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="flex items-center justify-between"
                                    >
                                        <div>
                                            <span className="text-xs text-rose-400">{ent.type}:</span>
                                            <span className="text-sm text-white ml-2">{ent.value}</span>
                                        </div>
                                        <span className="text-xs text-emerald-400">{ent.confidence}%</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'sentiment':
                return (
                    <div className="space-y-4">
                        <div className="flex items-center justify-center gap-4">
                            {[
                                { label: 'Positivo', value: demo.preview.stats?.positive, color: 'from-emerald-400 to-green-500', icon: '😊' },
                                { label: 'Neutral', value: demo.preview.stats?.neutral, color: 'from-gray-400 to-slate-500', icon: '😐' },
                                { label: 'Negativo', value: demo.preview.stats?.negative, color: 'from-red-400 to-rose-500', icon: '😔' }
                            ].map((s, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-3xl mb-2">{s.icon}</div>
                                    <div className={`text-2xl font-bold bg-gradient-to-r ${s.color} bg-clip-text text-transparent`}>
                                        {s.value}%
                                    </div>
                                    <div className="text-xs text-gray-400">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>
                        <div className="space-y-2">
                            {[
                                { label: 'Positivo', value: demo.preview.stats?.positive, color: 'bg-emerald-500' },
                                { label: 'Neutral', value: demo.preview.stats?.neutral, color: 'bg-gray-500' },
                                { label: 'Negativo', value: demo.preview.stats?.negative, color: 'bg-red-500' }
                            ].map((bar, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-xs text-gray-400 w-16">{bar.label}</span>
                                    <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${bar.value}%` }}
                                            transition={{ duration: 1, delay: i * 0.2 }}
                                            className={`h-full ${bar.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

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
                        className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden rounded-3xl border border-rose-500/20 bg-gradient-to-br from-[#1a0a10] via-[#1e0d15] to-[#180a12] shadow-2xl"
                    >
                        {/* Background effects */}
                        <div className="absolute inset-0 overflow-hidden pointer-events-none">
                            <ClientOnly>
                                <DemoParticles />
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

                        <div className="relative z-10 h-full overflow-y-auto custom-scrollbar-demos p-6 md:p-10">
                            <div className="max-w-5xl mx-auto">
                                {/* Header */}
                                <div className="flex items-start gap-4 mb-8">
                                    <motion.div
                                        animate={{ rotate: [0, 5, -5, 0] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                        className={`p-4 rounded-2xl bg-gradient-to-br ${demo.gradient}`}
                                    >
                                        <demo.icon className="w-8 h-8 text-white" />
                                    </motion.div>
                                    <div className="flex-1">
                                        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-fuchsia-300">
                                            {demo.title}
                                        </h2>
                                        <p className="text-gray-400 mt-1">{demo.description}</p>
                                        <div className="flex items-center gap-4 mt-3">
                                            <span className="flex items-center gap-1 text-sm text-gray-400">
                                                <Eye className="w-4 h-4" /> {demo.views} vistas
                                            </span>
                                            <span className="flex items-center gap-1 text-sm text-amber-400">
                                                <Star className="w-4 h-4 fill-amber-400" /> {demo.rating}
                                            </span>
                                            <span className="flex items-center gap-1 text-sm text-rose-400">
                                                <Film className="w-4 h-4" /> Video HD
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Tab selector */}
                                <div className="flex gap-2 mb-6">
                                    {[
                                        { id: 'video', label: 'Video Demo', icon: Film },
                                        { id: 'interactive', label: 'Demo Interactiva', icon: Play }
                                    ].map((tab) => (
                                        <motion.button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id as 'video' | 'interactive')}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                                    ? 'bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/25'
                                                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                                                }`}
                                        >
                                            <tab.icon className="w-4 h-4" />
                                            {tab.label}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Video or Interactive demo */}
                                <AnimatePresence mode="wait">
                                    {activeTab === 'video' ? (
                                        <motion.div
                                            key="video"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="mb-8"
                                        >
                                            <VideoPlayer
                                                videoUrl={demo.videoUrl}
                                                isPlaying={isPlaying}
                                                onPlayPause={() => setIsPlaying(!isPlaying)}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="interactive"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="mb-8"
                                        >
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                                    <Play className="w-5 h-5 text-rose-400" />
                                                    Demo Interactivo
                                                </h3>
                                                <motion.button
                                                    onClick={() => setIsPlaying(!isPlaying)}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${isPlaying
                                                            ? 'bg-rose-500 text-white'
                                                            : 'bg-white/10 text-gray-300 hover:bg-white/20'
                                                        }`}
                                                >
                                                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                                    {isPlaying ? 'Pausar' : 'Reproducir'}
                                                </motion.button>
                                            </div>
                                            <div className="p-6 rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/10">
                                                {renderPreview()}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Features */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-rose-400" />
                                        Características
                                    </h3>
                                    <div className="flex flex-wrap gap-3">
                                        {demo.features.map((feature, i) => (
                                            <motion.div
                                                key={feature}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-500/10 to-fuchsia-500/10 border border-rose-500/20 text-rose-300 text-sm"
                                            >
                                                {feature}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-wrap gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(244, 63, 94, 0.3)' }}
                                        whileTap={{ scale: 0.98 }}
                                        className="flex-1 min-w-[200px] px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white font-semibold flex items-center justify-center gap-2"
                                    >
                                        <Zap className="w-5 h-5" />
                                        Implementar Similar
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                                    >
                                        <Share2 className="w-5 h-5" />
                                        Compartir
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                                    >
                                        <Bookmark className="w-5 h-5" />
                                        Guardar
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// Main Demos component
export default function DemosGallery() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDemo, setSelectedDemo] = useState<typeof demosData[0] | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showButtonOnly, setShowButtonOnly] = useState(true);

    const filteredDemos = demosData.filter((demo) => {
        const matchesCategory = selectedCategory === 'all' || demo.category === selectedCategory;
        const matchesSearch = demo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            demo.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    // Inject custom styles
    useEffect(() => {
        const styleId = 'demos-custom-styles';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .custom-scrollbar-demos::-webkit-scrollbar {
                width: 6px;
            }
            .custom-scrollbar-demos::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.02);
            }
            .custom-scrollbar-demos::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, rgba(244, 63, 94, 0.3), rgba(217, 70, 239, 0.3));
                border-radius: 3px;
            }
            .custom-scrollbar-demos::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(180deg, rgba(244, 63, 94, 0.5), rgba(217, 70, 239, 0.5));
            }
        `;
        document.head.appendChild(style);

        return () => {
            const existingStyle = document.getElementById(styleId);
            if (existingStyle) existingStyle.remove();
        };
    }, []);

    // Button-only view with stunning entrance
    if (showButtonOnly) {
        return (
            <div className="min-h-screen bg-[#0a0508] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/5 rounded-full blur-3xl" />
                </div>

                <ClientOnly>
                    {/* Floating orbs */}
                    {[...Array(12)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute rounded-full bg-gradient-to-r from-rose-400/20 to-fuchsia-400/20"
                            style={{
                                width: Math.random() * 100 + 50,
                                height: Math.random() * 100 + 50,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                            animate={{
                                x: [0, Math.random() * 100 - 50, 0],
                                y: [0, Math.random() * 100 - 50, 0],
                                scale: [1, 1.2, 1],
                                opacity: [0.2, 0.4, 0.2]
                            }}
                            transition={{
                                duration: Math.random() * 10 + 10,
                                repeat: Infinity,
                                delay: Math.random() * 5
                            }}
                        />
                    ))}
                </ClientOnly>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="relative z-10 text-center"
                >
                    {/* Icon */}
                    <motion.div
                        animate={{
                            rotate: [0, 5, -5, 0],
                            scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="inline-flex items-center justify-center p-6 rounded-3xl bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 border border-rose-500/30 mb-8"
                    >
                        <Clapperboard className="w-12 h-12 text-rose-400" />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-fuchsia-300 mb-4"
                    >
                        Galería de Demos
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12"
                    >
                        Descubre el poder de la IA a través de demos interactivas con videos reales
                    </motion.p>

                    {/* Main Button */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
                    >
                        <VerDemosButton onClick={() => setShowButtonOnly(false)} />
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex justify-center gap-12 mt-16"
                    >
                        {[
                            { value: demosData.length, label: 'Demos', icon: Film },
                            { value: '100K+', label: 'Vistas', icon: Eye },
                            { value: '4.9', label: 'Rating', icon: Star }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.1, y: -5 }}
                                className="text-center cursor-pointer"
                            >
                                <stat.icon className="w-6 h-6 text-rose-400 mx-auto mb-2" />
                                <div className="text-3xl font-bold bg-gradient-to-r from-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Scroll hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-16"
                    >
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-gray-500 text-sm flex items-center justify-center gap-2"
                        >
                            <span>Haz clic para explorar</span>
                            <ChevronRight className="w-4 h-4" />
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0508]">
            {/* Background effects */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-rose-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-fuchsia-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 p-4 md:p-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        className="inline-flex items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-rose-500/20 to-fuchsia-500/20 border border-rose-500/30 mb-6"
                    >
                        <Play className="w-10 h-10 text-rose-400" />
                    </motion.div>
                    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-200 to-fuchsia-300 mb-4">
                        Galería de Demos
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Explora nuestras demos interactivas con videos reales y descubre el potencial de la IA.
                    </p>
                </motion.div>

                {/* Search and filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 space-y-4"
                >
                    {/* Search bar */}
                    <div className="max-w-md mx-auto">
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Buscar demos..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500/50 focus:bg-white/10 transition-all"
                            />
                        </div>
                    </div>

                    {/* Category filters */}
                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((cat) => (
                            <motion.button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${selectedCategory === cat.id
                                        ? 'bg-gradient-to-r from-rose-500 to-fuchsia-500 text-white shadow-lg shadow-rose-500/25'
                                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                                    }`}
                            >
                                <cat.icon className="w-4 h-4" />
                                {cat.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center gap-8 mb-8"
                >
                    {[
                        { value: demosData.length, label: 'Demos' },
                        { value: '100K+', label: 'Vistas' },
                        { value: '4.9', label: 'Rating' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-fuchsia-400 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-xs text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Demos grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredDemos.map((demo, index) => (
                            <DemoCard
                                key={demo.id}
                                demo={demo}
                                index={index}
                                onClick={() => setSelectedDemo(demo)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                {filteredDemos.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No se encontraron demos</h3>
                        <p className="text-gray-400">Intenta con otra búsqueda o categoría</p>
                    </motion.div>
                )}
            </div>

            {/* Preview modal */}
            <DemoPreviewModal
                key={selectedDemo?.id || 'no-demo'}
                demo={selectedDemo}
                isOpen={!!selectedDemo}
                onClose={() => setSelectedDemo(null)}
            />
        </div>
    );
}
