'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, X, Sparkles, Bot, Eye, Mic, Brain, MessageSquare,
    Image, Video, FileText, ChevronRight, ArrowRight,
    Zap, Star, Search, Grid,
    Share2, Bookmark, Pause, VolumeX, Volume1,
    Film, Clapperboard, Maximize2, MoveDown
} from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const demosData = [
    {
        id: 'chatbot-finance', title: 'Chatbot Financiero', category: 'chatbots', icon: Bot,
        description: 'Asistente virtual para consultas bancarias con detección de intención y respuestas contextuales.',
        duration: '0:15', views: '12.5K', rating: 4.9,
        features: ['NLP Avanzado', 'Contexto Multi-turno', 'Integración API'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        preview: {
            type: 'chat', messages: [
                { role: 'user', text: '¿Cuál es mi saldo actual?' },
                { role: 'bot', text: 'Hola María 👋 Tu saldo actual es $15,420.50 MXN. ¿Te gustaría ver tus últimos movimientos?' },
                { role: 'user', text: 'Sí, muestra los últimos 5' },
                { role: 'bot', text: '💳 Starbucks - $125.00\n🛒 Superama - $890.50\n⛽ Shell - $650.00\n📱 Netflix - $139.00\n🍽️ Uber Eats - $245.00' },
            ]
        },
    },
    {
        id: 'computer-vision', title: 'Detección de Objetos', category: 'vision', icon: Eye,
        description: 'Sistema de visión por computadora para detección y clasificación de objetos en tiempo real.',
        duration: '0:15', views: '8.2K', rating: 4.8,
        features: ['YOLO v8', 'Real-time', 'Multi-clase'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        preview: {
            type: 'vision', objects: [
                { label: 'Persona', confidence: 98, color: '#22c55e' },
                { label: 'Automóvil', confidence: 95, color: '#3b82f6' },
                { label: 'Señal de tránsito', confidence: 92, color: '#f59e0b' },
            ]
        },
    },
    {
        id: 'voice-assistant', title: 'Asistente de Voz', category: 'voice', icon: Mic,
        description: 'Asistente de voz inteligente con reconocimiento natural y síntesis de respuesta.',
        duration: '0:15', views: '15.3K', rating: 5.0,
        features: ['Whisper ASR', 'TTS Natural', 'Multi-idioma'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMelodies.mp4',
        preview: {
            type: 'voice',
            transcript: 'Alexa, agenda una reunión con el equipo de marketing para mañana a las 10 AM',
            response: '✅ Reunión agendada con el equipo de marketing para mañana a las 10:00 AM.',
        },
    },
    {
        id: 'image-generation', title: 'Generación de Imágenes', category: 'generation', icon: Image,
        description: 'Sistema de generación de imágenes con IA a partir de descripciones textuales.',
        duration: '0:15', views: '20.1K', rating: 4.9,
        features: ['Stable Diffusion', 'Alta resolución', 'Estilos variados'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        preview: { type: 'image', prompt: 'Un jardín zen futurista con cerezos en flor, estilo cyberpunk' },
    },
    {
        id: 'document-analyzer', title: 'Análisis de Documentos', category: 'nlp', icon: FileText,
        description: 'Extracción inteligente de información clave de documentos legales y financieros.',
        duration: '0:15', views: '6.8K', rating: 4.7,
        features: ['OCR + NER', 'Sumarización', 'Extracción de datos'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        preview: {
            type: 'document', entities: [
                { type: 'Fecha', value: '15 de Marzo, 2024', confidence: 99 },
                { type: 'Monto', value: '$2,500,000 MXN', confidence: 98 },
                { type: 'Partes', value: 'Empresa ABC S.A. de C.V.', confidence: 97 },
                { type: 'Cláusula', value: 'Terminación con 30 días', confidence: 95 },
            ]
        },
    },
    {
        id: 'sentiment-analysis', title: 'Análisis de Sentimiento', category: 'nlp', icon: MessageSquare,
        description: 'Análisis de sentimiento en tiempo real para redes sociales y comentarios.',
        duration: '0:15', views: '9.4K', rating: 4.8,
        features: ['Multi-plataforma', 'Tiempo real', 'Alertas'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMoments.mp4',
        preview: { type: 'sentiment', stats: { positive: 68, neutral: 22, negative: 10 } },
    },
    {
        id: 'video-analysis', title: 'Análisis de Video', category: 'vision', icon: Video,
        description: 'Análisis automático de contenido de video con detección de escenas y objetos.',
        duration: '0:15', views: '7.1K', rating: 4.6,
        features: ['Scene Detection', 'Object Tracking', 'Highlights'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        preview: { type: 'video', scenes: ['00:00 - Intro', '01:23 - Producto', '02:45 - Demo', '03:30 - CTA'] },
    },
    {
        id: 'recommendation', title: 'Motor de Recomendaciones', category: 'ml', icon: Sparkles,
        description: 'Sistema de recomendaciones personalizadas basado en comportamiento del usuario.',
        duration: '0:15', views: '11.2K', rating: 4.9,
        features: ['Collaborative Filtering', 'Content-based', 'Real-time'],
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        preview: { type: 'recommendation', items: ['Producto A - 98%', 'Producto B - 95%', 'Producto C - 92%'] },
    },
];

const categories = [
    { id: 'all', label: 'Todos', icon: Grid },
    { id: 'chatbots', label: 'Chatbots', icon: Bot },
    { id: 'vision', label: 'Computer Vision', icon: Eye },
    { id: 'voice', label: 'Voz', icon: Mic },
    { id: 'nlp', label: 'NLP', icon: MessageSquare },
    { id: 'generation', label: 'Generación', icon: Image },
    { id: 'ml', label: 'Machine Learning', icon: Brain },
];

type Demo = typeof demosData[0];

// ─────────────────────────────────────────────
// VIDEO PLAYER
// ─────────────────────────────────────────────

function VideoPlayer({ videoUrl, isPlaying, onPlayPause }: {
    videoUrl: string; isPlaying: boolean; onPlayPause: () => void;
}) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        isPlaying ? v.play().catch(() => { }) : v.pause();
    }, [isPlaying]);

    const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

    const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
        const v = videoRef.current;
        if (!v) return;
        const rect = e.currentTarget.getBoundingClientRect();
        v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
    };

    return (
        <div className="relative overflow-hidden bg-black/60 border border-slate-800/60 group/player">
            <video
                ref={videoRef}
                src={videoUrl}
                muted={isMuted}
                loop
                playsInline
                onTimeUpdate={() => {
                    const v = videoRef.current;
                    if (!v) return;
                    setProgress((v.currentTime / v.duration) * 100);
                    setCurrentTime(fmt(v.currentTime));
                }}
                onLoadedMetadata={() => videoRef.current && setDuration(fmt(videoRef.current.duration))}
                className="w-full aspect-video object-cover"
            />

            {/* Controls — appear on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080810]/90 via-transparent to-transparent opacity-0 group-hover/player:opacity-100 transition-opacity">
                {/* Centre play */}
                <button
                    onClick={onPlayPause}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center border border-white/20 bg-[#080810]/60 backdrop-blur-sm hover:border-amber-400/40 transition-colors"
                >
                    {isPlaying
                        ? <Pause className="w-4 h-4 text-white" />
                        : <Play className="w-4 h-4 text-white fill-white" />
                    }
                </button>

                {/* Bottom bar */}
                <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
                    <div
                        onClick={handleSeek}
                        className="relative h-px bg-slate-700/60 cursor-pointer mb-3 hover:h-[3px] transition-all"
                    >
                        <div className="absolute h-full bg-amber-400/60" style={{ width: `${progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button onClick={onPlayPause} className="text-slate-400 hover:text-white transition-colors">
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                            </button>
                            <button onClick={() => setIsMuted(!isMuted)} className="text-slate-400 hover:text-white transition-colors">
                                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume1 className="w-4 h-4" />}
                            </button>
                            <span className="text-[10px] text-slate-500 font-mono">{currentTime} / {duration}</span>
                        </div>
                        <button className="text-slate-600 hover:text-slate-400 transition-colors">
                            <Maximize2 className="w-3.5 h-3.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// PREVIEW CONTENT
// ─────────────────────────────────────────────

function PreviewContent({ demo, isPlaying }: { demo: Demo; isPlaying: boolean }) {
    const [msgCount, setMsgCount] = useState(1);

    useEffect(() => {
        if (!isPlaying || demo.preview.type !== 'chat') return;
        const t = setInterval(() => setMsgCount(c => Math.min(c + 1, demo.preview.messages?.length ?? 1)), 2000);
        return () => clearInterval(t);
    }, [isPlaying, demo]);

    switch (demo.preview.type) {
        case 'chat': return (
            <div className="space-y-2.5 p-4 bg-[#080810] border border-slate-800/60">
                {demo.preview.messages?.slice(0, msgCount).map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                        className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] px-3 py-2 text-xs leading-relaxed ${m.role === 'user'
                                ? 'bg-rose-500/20 border border-rose-400/20 text-rose-100'
                                : 'bg-slate-800/60 border border-slate-700/60 text-slate-300'
                            }`}>
                            {m.text}
                        </div>
                    </motion.div>
                ))}
            </div>
        );

        case 'vision': return (
            <div className="space-y-3">
                <div className="relative h-32 bg-slate-900/60 border border-slate-800/60 flex items-center justify-center overflow-hidden">
                    <span className="text-4xl">🚗👤🚦</span>
                    {demo.preview.objects?.map((o, i) => (
                        <motion.div key={i}
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.5 }}
                            className="absolute border"
                            style={{ borderColor: o.color, left: `${22 + i * 22}%`, top: '20%', width: 48, height: 48 }}
                        />
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-px bg-slate-800/40">
                    {demo.preview.objects?.map((o, i) => (
                        <div key={i} className="bg-[#080810] px-3 py-3 text-center">
                            <p className="text-sm font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{o.confidence}%</p>
                            <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600">{o.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        );

        case 'voice': return (
            <div className="space-y-3 p-4 bg-[#080810] border border-slate-800/60">
                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600 mb-2">Transcripción</p>
                <p className="text-xs text-slate-400 italic leading-relaxed">"{demo.preview.transcript}"</p>
                <div className="flex items-center gap-0.5 h-8 my-3">
                    {[...Array(32)].map((_, i) => (
                        <motion.div key={i}
                            animate={{ height: isPlaying ? [4, 8 + Math.random() * 16, 4] : 4 }}
                            transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.02 }}
                            className="flex-1 bg-rose-400/50"
                        />
                    ))}
                </div>
                <div className="border-l-2 border-emerald-400/30 pl-3">
                    <p className="text-xs text-emerald-400/80 leading-relaxed">{demo.preview.response}</p>
                </div>
            </div>
        );

        case 'image': return (
            <div className="space-y-3">
                <div className="px-3 py-2 bg-[#080810] border border-slate-800/60">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600 mb-1">Prompt</p>
                    <p className="text-xs text-slate-400 italic">"{demo.preview.prompt}"</p>
                </div>
                <div className="relative h-36 bg-gradient-to-br from-rose-900/20 via-violet-900/20 to-amber-900/20 border border-slate-800/60 flex items-center justify-center">
                    <motion.span animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} className="text-4xl">🌸🏯🌃</motion.span>
                    <div className="absolute bottom-2 right-2 text-[8px] uppercase tracking-[0.2em] text-slate-700">Generado con IA</div>
                </div>
            </div>
        );

        case 'document': return (
            <div className="border-l-2 border-rose-400/30 pl-4 space-y-2">
                <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600 mb-3">Entidades extraídas</p>
                {demo.preview.entities?.map((e, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                        className="flex items-center justify-between py-1.5 border-b border-slate-800/30 last:border-b-0"
                    >
                        <div>
                            <span className="text-[9px] uppercase tracking-[0.15em] text-rose-400/70 mr-2">{e.type}</span>
                            <span className="text-xs text-slate-300">{e.value}</span>
                        </div>
                        <span className="text-[10px] text-emerald-400/70">{e.confidence}%</span>
                    </motion.div>
                ))}
            </div>
        );

        case 'sentiment': return (
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-px bg-slate-800/40">
                    {[
                        { label: 'Positivo', value: demo.preview.stats?.positive, emoji: '😊' },
                        { label: 'Neutral', value: demo.preview.stats?.neutral, emoji: '😐' },
                        { label: 'Negativo', value: demo.preview.stats?.negative, emoji: '😔' },
                    ].map(s => (
                        <div key={s.label} className="bg-[#080810] px-3 py-4 text-center">
                            <p className="text-base mb-1">{s.emoji}</p>
                            <p className="text-xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>{s.value}%</p>
                            <p className="text-[9px] uppercase tracking-[0.15em] text-slate-600">{s.label}</p>
                        </div>
                    ))}
                </div>
                <div className="space-y-2">
                    {[
                        { label: 'Positivo', value: demo.preview.stats?.positive, bar: 'bg-emerald-500/60' },
                        { label: 'Neutral', value: demo.preview.stats?.neutral, bar: 'bg-slate-500/60' },
                        { label: 'Negativo', value: demo.preview.stats?.negative, bar: 'bg-red-500/60' },
                    ].map(b => (
                        <div key={b.label} className="flex items-center gap-3">
                            <span className="text-[9px] uppercase tracking-[0.12em] text-slate-600 w-14">{b.label}</span>
                            <div className="flex-1 flex gap-0.5">
                                {[...Array(10)].map((_, j) => (
                                    <motion.div key={j}
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: j * 0.04 }}
                                        className={`h-0.5 flex-1 ${j < Math.round((b.value ?? 0) / 10) ? b.bar : 'bg-slate-800'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

        default: return (
            <div className="p-4 border border-slate-800/60 space-y-2">
                {demo.preview.items?.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 py-1.5 border-b border-slate-800/30 last:border-b-0">
                        <span className="w-1 h-1 rounded-full bg-rose-400/50" />
                        <span className="text-xs text-slate-400">{item}</span>
                    </div>
                ))}
            </div>
        );
    }
}

// ─────────────────────────────────────────────
// DEMO PREVIEW MODAL
// ─────────────────────────────────────────────

function DemoPreviewModal({ demo, isOpen, onClose }: { demo: Demo | null; isOpen: boolean; onClose: () => void }) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeTab, setActiveTab] = useState<'video' | 'interactive'>('video');

    if (!demo) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#06051d]/85 backdrop-blur-md z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed inset-4 md:inset-8 lg:inset-12 z-50 bg-[#080810] border border-slate-800/80 shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Top rose accent */}
                        <div className="h-px bg-rose-400/60 shrink-0" />

                        {/* Grain */}
                        <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
                        />

                        {/* Header */}
                        <div className="relative px-8 pt-8 pb-6 border-b border-slate-800/60 shrink-0">
                            <button onClick={onClose}
                                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 text-slate-600 hover:text-slate-300 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>

                            <div className="flex items-start gap-4 pr-12">
                                <div className="w-11 h-11 flex items-center justify-center border border-rose-400/30 shrink-0">
                                    <demo.icon className="w-5 h-5 text-rose-400/80" />
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/60 mb-1">
                                        — {demo.category} · {demo.duration}
                                    </p>
                                    <h2 className="text-2xl md:text-3xl font-light text-white"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {demo.title}
                                    </h2>
                                    <p className="text-sm text-slate-500 mt-1">{demo.description}</p>
                                </div>
                            </div>

                            {/* Meta row */}
                            <div className="flex items-center gap-6 mt-5">
                                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                                    <Eye className="w-3 h-3" /> {demo.views} vistas
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-amber-400/70">
                                    <Star className="w-3 h-3 fill-current" /> {demo.rating}
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-rose-400/60">
                                    <Film className="w-3 h-3" /> Video HD
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto">
                            <div className="px-8 py-8 space-y-8 max-w-4xl">

                                {/* Tabs */}
                                <div className="flex border border-slate-800/60">
                                    {([['video', Film, 'Video Demo'], ['interactive', Play, 'Demo Interactiva']] as const).map(([id, Icon, label]) => (
                                        <button
                                            key={id}
                                            onClick={() => setActiveTab(id)}
                                            className={`relative flex items-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-[0.1em] flex-1 justify-center border-r border-slate-800/60 last:border-r-0 transition-all ${activeTab === id
                                                    ? 'text-white bg-slate-900/60'
                                                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
                                                }`}
                                        >
                                            {activeTab === id && (
                                                <motion.span layoutId="demoTabLine"
                                                    className="absolute top-0 left-0 right-0 h-px bg-rose-400/50"
                                                    transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                                                />
                                            )}
                                            <Icon className="w-3.5 h-3.5" />
                                            <span className="hidden sm:inline">{label}</span>
                                        </button>
                                    ))}
                                </div>

                                <AnimatePresence mode="wait">
                                    {activeTab === 'video' ? (
                                        <motion.div key="video" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.2 }}>
                                            <VideoPlayer videoUrl={demo.videoUrl} isPlaying={isPlaying} onPlayPause={() => setIsPlaying(p => !p)} />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="interactive" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
                                            <div className="flex items-center justify-between mb-4">
                                                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600">Demo interactiva</p>
                                                <button onClick={() => setIsPlaying(p => !p)}
                                                    className={`flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] border transition-all ${isPlaying
                                                            ? 'border-rose-400/40 text-rose-400/80 bg-rose-400/5'
                                                            : 'border-slate-700/60 text-slate-500 hover:border-slate-600'
                                                        }`}
                                                >
                                                    {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                                                    {isPlaying ? 'Pausar' : 'Reproducir'}
                                                </button>
                                            </div>
                                            <PreviewContent demo={demo} isPlaying={isPlaying} />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Features */}
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-3">Características</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {demo.features.map(f => (
                                            <span key={f} className="px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] border border-rose-400/20 text-rose-400/70">
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* CTAs */}
                                <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800/60">
                                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                                        className="flex-1 min-w-[180px] flex items-center justify-center gap-2.5 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors"
                                    >
                                        <Zap className="w-3.5 h-3.5" />
                                        Implementar similar
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-2 px-5 py-3.5 border border-slate-700/60 hover:border-amber-400/40 text-slate-500 hover:text-slate-300 text-xs font-medium uppercase tracking-[0.1em] transition-all"
                                    >
                                        <Share2 className="w-3.5 h-3.5" /> Compartir
                                    </motion.button>
                                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
                                        className="flex items-center gap-2 px-5 py-3.5 border border-slate-700/60 hover:border-amber-400/40 text-slate-500 hover:text-slate-300 text-xs font-medium uppercase tracking-[0.1em] transition-all"
                                    >
                                        <Bookmark className="w-3.5 h-3.5" /> Guardar
                                    </motion.button>
                                </div>
                            </div>
                        </div>

                        <div className="h-px bg-rose-400/20 shrink-0" />
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

// ─────────────────────────────────────────────
// DEMO CARD
// ─────────────────────────────────────────────

function DemoCard({ demo, index, onClick }: { demo: Demo; index: number; onClick: () => void }) {
    const Icon = demo.icon;
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
            onClick={onClick}
            className="group relative bg-[#080810] border border-slate-800/70 hover:border-slate-700/80 transition-colors duration-300 cursor-pointer overflow-hidden flex flex-col"
        >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-px bg-rose-400/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Video preview */}
            <div className="relative aspect-video overflow-hidden shrink-0 bg-slate-900/60">
                <video
                    src={demo.videoUrl}
                    muted loop playsInline
                    className="w-full h-full object-cover opacity-30 group-hover:opacity-60 transition-opacity duration-500"
                    onMouseEnter={e => e.currentTarget.play()}
                    onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080810] via-transparent to-transparent" />

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 flex items-center justify-center border border-white/20 bg-[#080810]/60 backdrop-blur-sm">
                        <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-1 bg-[#080810]/80 text-[9px] uppercase tracking-[0.2em] text-slate-600">
                    <Film className="w-2.5 h-2.5" /> {demo.duration}
                </div>
            </div>

            {/* Info */}
            <div className="px-5 pt-4 pb-5 flex flex-col flex-1">
                <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 flex items-center justify-center border border-rose-400/30 shrink-0">
                        <Icon className="w-3.5 h-3.5 text-rose-400/70" />
                    </div>
                    <div className="min-w-0">
                        <h3 className="text-sm font-light text-white leading-tight truncate"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            {demo.title}
                        </h3>
                        <p className="text-[9px] uppercase tracking-[0.2em] text-rose-400/60 mt-0.5">{demo.category}</p>
                    </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3 flex-1">
                    {demo.description}
                </p>

                {/* Feature tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                    {demo.features.slice(0, 2).map(f => (
                        <span key={f} className="px-2 py-0.5 text-[9px] uppercase tracking-[0.08em] border border-slate-800/60 text-slate-700">
                            {f}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-800/40 pt-3">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[10px] text-slate-700">
                            <Eye className="w-3 h-3" /> {demo.views}
                        </span>
                        <span className="flex items-center gap-1 text-[10px] text-amber-400/60">
                            <Star className="w-3 h-3 fill-current" /> {demo.rating}
                        </span>
                    </div>
                    <span className="flex items-center gap-1 text-[9px] uppercase tracking-[0.1em] text-slate-600 group-hover:text-rose-400/60 transition-colors">
                        Ver demo <ChevronRight className="w-3 h-3" />
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

// ─────────────────────────────────────────────
// LANDING SCREEN
// ─────────────────────────────────────────────

function LandingScreen({ onEnter }: { onEnter: () => void }) {
    return (
        <div className="min-h-screen bg-[#080810] flex flex-col items-center justify-center relative overflow-hidden">
            {/* Grain */}
            <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
            />
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-rose-900/10 blur-[140px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-indigo-900/10 blur-[140px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 flex flex-col items-center text-center px-6"
            >
                {/* Icon */}
                <div className="w-16 h-16 flex items-center justify-center border border-rose-400/30 mb-8">
                    <Clapperboard className="w-7 h-7 text-rose-400/80" />
                </div>

                {/* Eyebrow */}
                <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/70 mb-5">
                    — Galería de demos de IA
                </p>

                {/* Title */}
                <h1
                    className="text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight mb-6"
                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                    Demos que<br />
                    <em className="text-slate-400 not-italic">demuestran</em>
                </h1>

                <p className="text-slate-500 text-sm max-w-md leading-relaxed mb-12">
                    Descubre el poder de la IA a través de {demosData.length} demos interactivas con videos reales.
                </p>

                {/* CTA */}
                <motion.button
                    onClick={onEnter}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="group flex items-center gap-3 px-8 py-4 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors mb-16"
                >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Ver {demosData.length} demos
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </motion.button>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-px bg-slate-800/40 w-full max-w-xs">
                    {[
                        { value: String(demosData.length), label: 'Demos' },
                        { value: '100K+', label: 'Vistas' },
                        { value: '4.9', label: 'Rating' },
                    ].map(s => (
                        <div key={s.label} className="bg-[#080810] px-4 py-4 text-center">
                            <p className="text-xl font-light text-white leading-none mb-1"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >{s.value}</p>
                            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-600">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Scroll cue */}
                <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
                    className="mt-12 flex flex-col items-center gap-2"
                >
                    <span className="text-[9px] uppercase tracking-[0.35em] text-slate-700">Explorar</span>
                    <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                        <MoveDown className="w-3.5 h-3.5 text-amber-400/40" />
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    );
}

// ─────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────

export default function DemosGallery() {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDemo, setSelectedDemo] = useState<Demo | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showLanding, setShowLanding] = useState(true);

    const filtered = demosData.filter(d => {
        const q = searchQuery.toLowerCase();
        return (selectedCategory === 'all' || d.category === selectedCategory)
            && (!q || d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    });

    if (showLanding) return <LandingScreen onEnter={() => setShowLanding(false)} />;

    return (
        <div className="min-h-screen bg-[#080810]">
            {/* Ambient */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/3 w-[600px] h-[600px] rounded-full bg-rose-900/8 blur-[140px]" />
                <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[140px]" />
            </div>

            {/* Grain */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: '128px 128px' }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 py-16">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-14"
                >
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/70 mb-5">— Galería de demos</p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2
                            className="text-4xl md:text-5xl font-light text-white leading-[1.05] tracking-tight"
                            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                            Demos de<br />
                            <em className="text-slate-400 not-italic">inteligencia artificial</em>
                        </h2>
                        <p className="text-slate-500 text-sm max-w-xs leading-relaxed md:text-right">
                            Explora demos interactivas con videos reales del potencial de la IA.
                        </p>
                    </div>
                    <div className="mt-10 h-px bg-gradient-to-r from-slate-700/60 via-amber-400/20 to-transparent" />
                </motion.div>

                {/* Controls */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-3 mb-8"
                >
                    {/* Search */}
                    <div className="relative flex-1 max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-600" />
                        <input
                            type="text"
                            placeholder="Buscar demos…"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-transparent border border-slate-800/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/40 focus:outline-none transition-colors hover:border-slate-700/80"
                        />
                    </div>

                    {/* Category tabs */}
                    <div className="flex border border-slate-800/60 overflow-x-auto">
                        {categories.map(cat => {
                            const Icon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                                    className={`relative flex items-center gap-2 px-4 py-3 text-xs font-medium uppercase tracking-[0.1em] whitespace-nowrap border-r border-slate-800/60 last:border-r-0 transition-all shrink-0 ${isActive
                                            ? 'text-white bg-slate-900/60'
                                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/30'
                                        }`}
                                >
                                    {isActive && (
                                        <motion.span layoutId="demoFilterIndicator"
                                            className="absolute top-0 left-0 right-0 h-px bg-rose-400/50"
                                            transition={{ type: 'spring', bounce: 0.15, duration: 0.4 }}
                                        />
                                    )}
                                    <Icon className="w-3.5 h-3.5 shrink-0" />
                                    <span className="hidden sm:inline">{cat.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-slate-800/30">
                    <AnimatePresence mode="popLayout">
                        {filtered.map((demo, i) => (
                            <DemoCard key={demo.id} demo={demo} index={i} onClick={() => setSelectedDemo(demo)} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex flex-col items-center py-24 border border-slate-800/60"
                    >
                        <Search className="w-8 h-8 text-slate-700 mb-3" />
                        <p className="text-sm text-slate-500 mb-1">Sin resultados</p>
                        <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                            className="mt-3 text-xs uppercase tracking-[0.15em] text-amber-400/60 hover:text-amber-400/80 transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    </motion.div>
                )}
            </div>

            {/* Modal */}
            <DemoPreviewModal
                key={selectedDemo?.id ?? 'none'}
                demo={selectedDemo}
                isOpen={!!selectedDemo}
                onClose={() => setSelectedDemo(null)}
            />
        </div>
    );
}