'use client';

import { SITE_STATS } from '@/lib/site-stats';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { UserPlus, LogIn, Code2, Zap, Globe, Shield, ArrowRight, MoveDown } from 'lucide-react';
import { UserMenu } from '@/components/auth';
import { HeroDialogs } from './HeroDialogs';

function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        let animationId = 0;
        let inView = true;
        let width = window.innerWidth;
        let height = window.innerHeight;
        const chars = 'JACANA-DEV0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ<>{}[]|/\\@#$%^&*';
        const fontSize = 14;
        let columns: number;
        let drops: number[];
        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            columns = Math.floor(width / fontSize);
            drops = Array(columns).fill(1);
        };
        const draw = () => {
            ctx.fillStyle = 'rgba(9, 13, 19, 0.05)';
            ctx.fillRect(0, 0, width, height);
            ctx.font = `${fontSize}px monospace`;
            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const brightness = Math.random();
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                if (brightness > 0.95) {
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#b0d000';
                    ctx.shadowBlur = 20;
                } else if (brightness > 0.7) {
                    ctx.fillStyle = '#b0d000';
                    ctx.shadowColor = '#b0d000';
                    ctx.shadowBlur = 10;
                } else if (brightness > 0.4) {
                    ctx.fillStyle = '#b0d000';
                    ctx.shadowBlur = 5;
                } else {
                    ctx.fillStyle = 'rgba(176, 208, 0, 0.45)';
                    ctx.shadowBlur = 0;
                }
                ctx.fillText(char, x, y);
                ctx.shadowBlur = 0;
                if (y > height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
            if (inView && !document.hidden) animationId = requestAnimationFrame(draw);
        };
        resize();
        window.addEventListener('resize', resize);
        ctx.fillStyle = '#090d13';
        ctx.fillRect(0, 0, width, height);

        // Respeta "reducir movimiento": dibuja un solo cuadro estático
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduceMotion) {
            inView = false; // evita que draw() agende más cuadros
            for (let k = 0; k < 40; k++) draw();
            return () => window.removeEventListener('resize', resize);
        }

        // Pausa la animación cuando el hero no se ve o la pestaña está oculta
        const start = () => {
            cancelAnimationFrame(animationId);
            if (inView && !document.hidden) animationId = requestAnimationFrame(draw);
        };
        const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; start(); });
        observer.observe(canvas);
        document.addEventListener('visibilitychange', start);
        draw();
        return () => {
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', start);
            observer.disconnect();
            cancelAnimationFrame(animationId);
        };
    }, []);
    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ background: '#090d13' }}
        />
    );
}

function SplitText({ text, delay = 0, className = '' }: { text: string; delay?: number; className?: string }) {
    return (
        <span className={`inline-flex ${className}`} aria-label={text}>
            {text.split('').map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 48 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: delay + i * 0.055, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block"
                >
                    {char}
                </motion.span>
            ))}
        </span>
    );
}

// ── SORPRESA: palabra rotativa dentro del párrafo, enfocada en resultados de negocio ──
function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        const id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
        return () => clearInterval(id);
    }, [words.length, interval]);
    return (
        <span className="relative inline-block align-baseline" style={{ minWidth: '7ch' }}>
            <AnimatePresence mode="wait">
                <motion.em
                    key={words[index]}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="text-white not-italic border-b border-lime-400/40 inline-block"
                >
                    {words[index]}
                </motion.em>
            </AnimatePresence>
        </span>
    );
}

function ScrollCue() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.8, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
            <span className="text-[9px] uppercase tracking-[0.35em] text-slate-600">Descubre más</span>
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}>
                <MoveDown className="w-3.5 h-3.5 text-lime-400/50" />
            </motion.div>
        </motion.div>
    );
}

function StatPill({ value, label, delay }: { value: string; label: string; delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col border-l border-slate-700/60 pl-4"
        >
            <span className="text-2xl font-light text-white leading-none" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                {value}
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-slate-600 mt-0.5">{label}</span>
        </motion.div>
    );
}

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const user = session?.user;

    const handleLogout = () => signOut({ callbackUrl: '/' });

    const { scrollY } = useScroll();
    const matrixY = useTransform(scrollY, [0, 600], [0, 120]);
    const contentY = useTransform(scrollY, [0, 600], [0, -60]);

    useEffect(() => {
        const t = setTimeout(() => setIsVisible(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <section ref={sectionRef} className="relative flex items-center overflow-hidden min-h-[100svh] md:h-screen md:min-h-[700px] pb-24 md:pb-0">

            <motion.div className="absolute inset-0 z-0" style={{ y: matrixY }}>
                <MatrixRain />
            </motion.div>

            <div className="absolute inset-0 z-[1] pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #090d13 100%)' }} />
            <div className="absolute inset-0 z-[2] pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(9, 13, 19,0.92) 0%, rgba(9, 13, 19,0.60) 40%, transparent 70%)' }} />
            <div className="absolute bottom-0 left-0 right-0 h-40 z-[2] pointer-events-none" style={{ background: 'linear-gradient(to top, #090d13 0%, transparent 100%)' }} />
            <div
                className="absolute inset-0 z-[3] opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundSize: '128px 128px',
                }}
            />

            <motion.div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8 pt-36 sm:pt-32 md:pt-28" style={{ y: contentY }}>
                <div className="flex flex-col items-start max-w-4xl">

                    {/* ── WORDMARK: misma tipografía del logo (Zen Dots) ── */}
                    {isVisible && (
                        <h1
                            className="pt-6 pb-2 flex flex-col w-fit max-w-full"
                            style={{ fontFamily: 'var(--font-logo), system-ui, sans-serif' }}
                            aria-label="Jacana Developers"
                        >
                            <span
                                aria-hidden="true"
                                className="text-white leading-none tracking-[0.02em]"
                                style={{ fontSize: 'clamp(3rem, 9.5vw, 8.5rem)' }}
                            >
                                <SplitText text="JACANA" delay={0.3} />
                            </span>

                            <motion.span
                                aria-hidden="true"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.95, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                className="mt-3 md:mt-4 flex items-center gap-3 md:gap-5"
                            >
                                <span className="flex-1 h-px bg-gradient-to-r from-transparent to-lime-400/70" />
                                <span
                                    className="text-lime-400 uppercase"
                                    style={{
                                        fontFamily: 'var(--font-logo-sub), var(--font-logo), system-ui, sans-serif',
                                        fontWeight: 700,
                                        fontSize: 'clamp(0.65rem, 1.7vw, 1.5rem)',
                                        letterSpacing: '0.4em',
                                        marginRight: '-0.4em',
                                    }}
                                >
                                    Developers
                                </span>
                                <span className="flex-1 h-px bg-gradient-to-l from-transparent to-lime-400/70" />
                            </motion.span>
                        </h1>
                    )}

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 16 }}
                        transition={{ delay: 1.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-8 text-sm md:text-base text-slate-400 max-w-md leading-relaxed"
                    >
                        Convertimos tu idea en un producto que genera{' '}
                        <RotatingWord words={['ingresos', 'clientes', 'resultados', 'ventas']} />{' '}
                        desde el primer día.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: isVisible ? 1 : 0 }}
                        transition={{ delay: 1.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-10 w-full max-w-sm h-px bg-gradient-to-r from-slate-700/80 via-lime-400/20 to-transparent"
                        style={{ transformOrigin: 'left' }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 16 }}
                        transition={{ delay: 1.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-10 flex flex-wrap items-center gap-4"
                    >
                        <AnimatePresence mode="wait">
                            {isAuthenticated && user ? (
                                <motion.div key="auth" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-4">
                                    <div className="flex items-center gap-3 px-4 py-2.5 border border-slate-700/60 bg-slate-900/40">
                                        <div className="w-7 h-7 flex items-center justify-center bg-lime-400/10 border border-lime-400/30 text-lime-400 text-xs font-medium">
                                            {(user.name || user.email || '?')[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500">Bienvenido de vuelta</p>
                                            <p className="text-sm text-white font-medium leading-none">
                                                {user.name || user.email?.split('@')[0]}
                                            </p>
                                        </div>
                                    </div>
                                    <UserMenu onLogout={handleLogout} />
                                    {/* 1. Acción principal de negocio */}
                                    <Link
                                        href="/Contact"
                                        className="group flex items-center gap-2.5 px-6 py-3 bg-white text-[#090d13] text-xs font-medium uppercase tracking-[0.15em] hover:bg-lime-50 transition-colors"
                                    >
                                        Cotiza tu proyecto
                                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </motion.div>
                            ) : (
                                <motion.div key="guest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-wrap items-center gap-3">
                                    {/* 1. Acción principal: la que mueve la aguja del negocio */}
                                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                                        <Link
                                            href="/Contact"
                                            className="group flex items-center gap-2.5 px-7 py-3.5 bg-white text-[#090d13] text-xs font-medium uppercase tracking-[0.15em] hover:bg-lime-50 transition-colors"
                                        >
                                            Cotiza tu proyecto
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </Link>
                                    </motion.div>
                                    {/* 2. Acción secundaria: usuarios que ya confían en nosotros */}
                                    <motion.button onClick={() => setShowLogin(true)} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-6 py-3.5 border border-slate-700/60 hover:border-lime-400/40 text-slate-400 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all">
                                        <LogIn className="w-3.5 h-3.5" />
                                        Iniciar sesión
                                    </motion.button>
                                    {/* 3. Acción terciaria: crear cuenta nueva */}
                                    <motion.button onClick={() => setShowRegister(true)} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-6 py-3.5 text-slate-500 hover:text-lime-400/80 text-xs font-medium uppercase tracking-[0.15em] transition-colors">
                                        <UserPlus className="w-3.5 h-3.5" />
                                        Crear cuenta gratis
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 12 }}
                        transition={{ delay: 2, duration: 0.6 }}
                        className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-5"
                    >
                        <StatPill value={String(SITE_STATS.projects)} label="Proyectos desarrollados" delay={2.1} />
                        <StatPill value={String(SITE_STATS.ownProducts)} label="Productos propios" delay={2.2} />
                        <StatPill value={`${SITE_STATS.years} años`} label="Construyendo software" delay={2.3} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVisible ? 1 : 0 }}
                        transition={{ delay: 2.5, duration: 0.6 }}
                        className="mt-10 flex items-center gap-3 flex-wrap"
                    >
                        <span className="text-[9px] uppercase tracking-[0.3em] text-slate-700 mr-1">Stack</span>
                        {[
                            { icon: Code2, label: 'React' },
                            { icon: Zap, label: 'Next.js' },
                            { icon: Globe, label: 'Node.js' },
                            { icon: Shield, label: 'TypeScript' },
                        ].map(({ icon: Icon, label }, i) => (
                            <motion.div key={label} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.5 + i * 0.07 }} className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-800/60 hover:border-lime-400/30 text-slate-500 hover:text-slate-300 transition-all cursor-default">
                                <Icon className="w-3 h-3" />
                                <span className="text-[10px] uppercase tracking-[0.12em]">{label}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </motion.div>

            <ScrollCue />

            <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 40 }}
                transition={{ delay: 2.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-8 top-1/2 -translate-y-1/2 z-10 hidden xl:block"
            >
                <div className="border border-slate-800/60 bg-[#090d13]/80 backdrop-blur-sm p-6 max-w-[220px]">
                    <div className="h-px w-full bg-gradient-to-r from-lime-400/30 to-transparent mb-4" />
                    <p className="text-[9px] uppercase tracking-[0.3em] text-lime-400/60 mb-3">— Lo que construimos para ti</p>
                    {['Desarrollo Web a medida', 'Apps Móviles nativas', 'Cloud & DevOps', 'IA aplicada al negocio', 'Consultoría Técnica'].map((s, i) => (
                        <motion.div key={s} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.1 + i * 0.1 }} className="flex items-center gap-2 py-2 border-b border-slate-800/40 last:border-b-0 group cursor-default">
                            <span className="w-1 h-1 rounded-full bg-lime-400/40 group-hover:bg-lime-400/80 transition-colors" />
                            <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{s}</span>
                        </motion.div>
                    ))}
                    <div className="h-px w-full bg-gradient-to-r from-transparent to-lime-400/20 mt-4" />
                </div>
            </motion.div>

            <HeroDialogs
                showLogin={showLogin}
                showRegister={showRegister}
                setShowLogin={setShowLogin}
                setShowRegister={setShowRegister}
            />

        </section>
    );
}