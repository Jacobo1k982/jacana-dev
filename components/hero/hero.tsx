'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, LogIn, Compass, Code2, Zap, Globe, Shield } from 'lucide-react';
import { useAuthStore, useIsAuthenticated, useUser, useToken } from '@/store/auth-store';
import { LoginDialog, RegisterDialog, UserMenu } from '@/components/auth';

// ============================================
// MATRIX RAIN ANIMATION
// ============================================

function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
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
            ctx.fillStyle = 'rgba(6, 5, 29, 0.05)';
            ctx.fillRect(0, 0, width, height);
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = chars[Math.floor(Math.random() * chars.length)];
                const brightness = Math.random();
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                if (brightness > 0.95) {
                    ctx.fillStyle = '#ffffff';
                    ctx.shadowColor = '#00ffff';
                    ctx.shadowBlur = 20;
                } else if (brightness > 0.7) {
                    ctx.fillStyle = '#00ffff';
                    ctx.shadowColor = '#00ffff';
                    ctx.shadowBlur = 10;
                } else if (brightness > 0.4) {
                    ctx.fillStyle = '#00ccff';
                    ctx.shadowBlur = 5;
                } else {
                    ctx.fillStyle = 'rgba(0, 150, 255, 0.5)';
                    ctx.shadowBlur = 0;
                }

                ctx.fillText(char, x, y);
                ctx.shadowBlur = 0;

                if (y > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            animationId = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        ctx.fillStyle = '#06051d';
        ctx.fillRect(0, 0, width, height);
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ background: '#06051d' }}
        />
    );
}

// ============================================
// FLOATING PARTICLES
// ============================================

interface Particle {
    id: number;
    x: number;
    y: number;
    scale: number;
    duration: number;
    delay: number;
}

function FloatingParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const generatedParticles: Particle[] = [...Array(20)].map((_, i) => ({
            id: i,
            x: Math.random() * width,
            y: Math.random() * height,
            scale: Math.random() * 0.5 + 0.5,
            duration: Math.random() * 10 + 10,
            delay: Math.random() * 5
        }));

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setParticles(generatedParticles);
    }, []);

    if (particles.length === 0) return null;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
                    initial={{
                        x: particle.x,
                        y: particle.y,
                        scale: particle.scale,
                        opacity: 0
                    }}
                    animate={{
                        y: [null, -100],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: 'linear',
                        delay: particle.delay
                    }}
                />
            ))}
        </div>
    );
}

// ============================================
// ELEGANT BUTTON COMPONENT
// ============================================

interface ElegantButtonProps {
    children: React.ReactNode;
    icon?: React.ReactNode;
    variant?: 'primary' | 'secondary' | 'outline';
    onClick?: () => void;
    href?: string;
    className?: string;
}

function ElegantButton({ children, icon, variant = 'outline', onClick, href, className = '' }: ElegantButtonProps) {
    const variants = {
        primary: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white border-0',
        secondary: 'bg-white/[0.03] border-white/[0.1] text-white hover:bg-white/[0.05]',
        outline: 'bg-transparent border-white/[0.15] text-gray-300 hover:text-white hover:border-cyan-500/40 hover:bg-cyan-500/5'
    };

    const baseClassName = `relative group flex items-center justify-center gap-2.5 px-6 py-3 min-w-[160px] text-sm font-semibold rounded-xl border transition-all duration-300 overflow-hidden ${variants[variant]} ${className}`;

    const content = (
        <>
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

            {/* Glow on hover */}
            <span className="absolute -inset-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-blue-500/0 rounded-xl opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300 pointer-events-none" />

            <span className="relative flex items-center gap-2.5 pointer-events-none">
                {icon && <span className="relative">{icon}</span>}
                <span className="relative">{children}</span>
            </span>
        </>
    );

    // Handle anchor links (like #explore) with smooth scroll
    const handleAnchorClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (href?.startsWith('#')) {
            const targetId = href.substring(1);
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
        onClick?.();
    }, [href, onClick]);

    // For anchor links, use a button with smooth scroll
    if (href?.startsWith('#')) {
        return (
            <motion.button
                onClick={handleAnchorClick}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`${baseClassName} cursor-pointer`}
                type="button"
            >
                {content}
            </motion.button>
        );
    }

    // For regular links, use Next.js Link
    if (href) {
        return (
            <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
            >
                <Link href={href} className={baseClassName}>
                    {content}
                </Link>
            </motion.div>
        );
    }

    // Default button
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`${baseClassName} cursor-pointer`}
            type="button"
        >
            {content}
        </motion.button>
    );
}

// ============================================
// HERO COMPONENT
// ============================================

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const isAuthenticated = useIsAuthenticated();
    const user = useUser();
    const token = useToken();
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
        logout();
    };

    return (
        <section className="relative flex items-center justify-center overflow-hidden h-screen min-h-[700px]">
            {/* Matrix Rain Background */}
            <div className="absolute inset-0 w-full h-full z-0">
                <MatrixRain />
            </div>

            {/* Floating Particles */}
            <FloatingParticles />

            {/* Ambient Orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.15, scale: 1 }}
                    transition={{ duration: 2, delay: 0.5 }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500 rounded-full blur-[150px]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.1, scale: 1 }}
                    transition={{ duration: 2, delay: 0.8 }}
                    className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500 rounded-full blur-[150px]"
                />
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 0.08, scale: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500 rounded-full blur-[120px]"
                />
            </div>

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Fade out gradient at bottom */}
            <div
                className="absolute bottom-0 left-0 right-0 h-48 z-[2] pointer-events-none"
                style={{
                    background: 'linear-gradient(to top, #06051d 0%, transparent 100%)',
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-30 text-center">

                {/* JACANA Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col items-center"
                >
                    <div className="relative">
                        {/* Multi-layered glow effect */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: isVisible ? 0.4 : 0, scale: isVisible ? 1.2 : 0.8 }}
                            transition={{ duration: 1.5, delay: 0.4 }}
                            className="absolute inset-0 blur-[100px] bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-full"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: isVisible ? 0.6 : 0, scale: isVisible ? 1 : 0.8 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="absolute inset-0 blur-3xl bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full"
                        />

                        {/* Main Text */}
                        <h1 className="relative text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold tracking-[0.12em]">
                            <span className="relative inline-block">
                                {/* Text gradient */}
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-cyan-400 to-blue-500 bg-clip-text text-transparent blur-sm opacity-50" />
                                <span className="relative bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
                                    JACANA
                                </span>
                            </span>
                        </h1>

                        {/* Decorative underline */}
                        <motion.div
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: isVisible ? 1 : 0, opacity: isVisible ? 1 : 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full"
                        >
                            <div className="h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full" />
                            <div className="absolute inset-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full blur-sm" />
                        </motion.div>
                    </div>

                    {/* Subtitle */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                        transition={{ duration: 0.6, delay: 0.7 }}
                        className="mt-8 flex items-center gap-4"
                    >
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
                        <p className="text-sm md:text-base tracking-[0.5em] uppercase text-cyan-400/60 font-light">
                            Developers
                        </p>
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-cyan-500/50" />
                    </motion.div>
                </motion.div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-6 text-base md:text-lg text-gray-400 text-center max-w-xl"
                >
                    Transformamos ideas en{' '}
                    <span className="text-cyan-400">experiencias digitales</span>{' '}
                    excepcionales
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="relative z-20 mt-12 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
                >
                    <AnimatePresence mode="wait">
                        {isAuthenticated && user ? (
                            // Authenticated user view
                            <motion.div
                                key="authenticated"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
                            >
                                {/* Welcome message */}
                                <div className="flex items-center gap-4 px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                        {(user.name || user.username || user.email)[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Bienvenido</p>
                                        <p className="text-white font-medium">
                                            {user.name || user.username || user.email.split('@')[0]}
                                        </p>
                                    </div>
                                </div>

                                <UserMenu onLogout={handleLogout} />

                                <ElegantButton
                                    icon={<Compass className="w-4 h-4" />}
                                    href="#explore"
                                    variant="primary"
                                >
                                    Explorar
                                </ElegantButton>
                            </motion.div>
                        ) : (
                            // Guest view
                            <motion.div
                                key="guest"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
                            >
                                <ElegantButton
                                    icon={<Compass className="w-4 h-4" />}
                                    href="#explore"
                                    variant="outline"
                                >
                                    Explorar
                                </ElegantButton>

                                <ElegantButton
                                    icon={<LogIn className="w-4 h-4" />}
                                    onClick={() => setShowLogin(true)}
                                    variant="secondary"
                                >
                                    Iniciar Sesión
                                </ElegantButton>

                                <ElegantButton
                                    icon={<UserPlus className="w-4 h-4" />}
                                    onClick={() => setShowRegister(true)}
                                    variant="primary"
                                >
                                    Registrarse
                                </ElegantButton>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Tech Stack Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="mt-16 flex flex-wrap items-center justify-center gap-3"
                >
                    {[
                        { icon: Code2, label: 'React', color: 'cyan' },
                        { icon: Zap, label: 'Next.js', color: 'blue' },
                        { icon: Globe, label: 'Node.js', color: 'green' },
                        { icon: Shield, label: 'TypeScript', color: 'purple' },
                    ].map(({ icon: Icon, label, color }, idx) => (
                        <motion.div
                            key={label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.3 + idx * 0.1 }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 transition-colors"
                        >
                            <Icon className={`w-3.5 h-3.5 text-${color}-400`} />
                            <span className="text-xs text-gray-400">{label}</span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Auth Dialogs */}
            <LoginDialog
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
                onSwitchToRegister={() => {
                    setShowLogin(false);
                    setShowRegister(true);
                }}
            />
            <RegisterDialog
                isOpen={showRegister}
                onClose={() => setShowRegister(false)}
                onSwitchToLogin={() => {
                    setShowRegister(false);
                    setShowLogin(true);
                }}
            />
        </section>
    );
}
