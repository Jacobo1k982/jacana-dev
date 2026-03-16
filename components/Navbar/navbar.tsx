'use client';

import { useState, useEffect, useRef, useSyncExternalStore } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import {
    Menu, X, Home, Layers, Monitor, Server, Smartphone, Cloud,
    Database, Brain, Plug, Users, FolderKanban, Code2, Palette,
    Terminal, CloudCog, GitBranch, FileText, Mail, ChevronRight,
    ChevronDown, Sparkles, Zap, ArrowRight, ExternalLink, Star,
    TrendingUp, Shield, Cpu, Globe, Rocket, Settings, PenTool, Code,
    Hexagon, Command, Wand2, Laser, Orbit, Atom, Galaxy
} from 'lucide-react';
import navLinksData from '@/data/navLinks.json';
import { useAuthStore, useIsAuthenticated, useUser } from '@/store/auth-store';
import { LoginDialog, RegisterDialog, UserMenu } from '@/components/auth';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Home, Layers, Monitor, Server, Smartphone, Cloud,
    Database, Brain, Plug, Users, FolderKanban, Code2, Palette,
    Terminal, CloudCog, GitBranch, FileText, Mail, ChevronRight,
    Sparkles, Zap, Cpu, Rocket, ArrowRight, ExternalLink, Star,
    TrendingUp, Shield, Globe, Settings, PenTool, Code, Hexagon,
};

// Transform JSON data
const navLinks = navLinksData.map(link => ({
    ...link,
    icon: iconMap[link.icon] || ChevronRight,
    submenu: link.submenu?.map(item => ({
        ...item,
        icon: iconMap[item.icon] || ChevronRight,
    })),
}));

// Color themes for different categories - Enhanced
const categoryThemes: Record<string, { gradient: string; border: string; icon: string; badge: string; glow: string; bg: string }> = {
    'Desarrollo Frontend': {
        gradient: 'from-cyan-400 via-blue-500 to-indigo-500',
        border: 'border-cyan-400/50',
        icon: 'text-cyan-400',
        badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        glow: 'shadow-cyan-500/30',
        bg: 'from-cyan-500/10 via-blue-500/5 to-transparent'
    },
    'Desarrollo Backend': {
        gradient: 'from-blue-400 via-indigo-500 to-purple-500',
        border: 'border-blue-400/50',
        icon: 'text-blue-400',
        badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        glow: 'shadow-blue-500/30',
        bg: 'from-blue-500/10 via-indigo-500/5 to-transparent'
    },
    'Aplicaciones Móviles': {
        gradient: 'from-purple-400 via-pink-500 to-rose-500',
        border: 'border-purple-400/50',
        icon: 'text-purple-400',
        badge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        glow: 'shadow-purple-500/30',
        bg: 'from-purple-500/10 via-pink-500/5 to-transparent'
    },
    'Cloud & DevOps': {
        gradient: 'from-orange-400 via-red-500 to-pink-500',
        border: 'border-orange-400/50',
        icon: 'text-orange-400',
        badge: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        glow: 'shadow-orange-500/30',
        bg: 'from-orange-500/10 via-red-500/5 to-transparent'
    },
    'Bases de Datos': {
        gradient: 'from-green-400 via-emerald-500 to-teal-500',
        border: 'border-green-400/50',
        icon: 'text-green-400',
        badge: 'bg-green-500/20 text-green-300 border-green-500/30',
        glow: 'shadow-green-500/30',
        bg: 'from-green-500/10 via-emerald-500/5 to-transparent'
    },
    'Inteligencia Artificial': {
        gradient: 'from-pink-400 via-rose-500 to-red-500',
        border: 'border-pink-400/50',
        icon: 'text-pink-400',
        badge: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
        glow: 'shadow-pink-500/30',
        bg: 'from-pink-500/10 via-rose-500/5 to-transparent'
    },
    'APIs & Integraciones': {
        gradient: 'from-yellow-400 via-amber-500 to-orange-500',
        border: 'border-yellow-400/50',
        icon: 'text-yellow-400',
        badge: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        glow: 'shadow-yellow-500/30',
        bg: 'from-yellow-500/10 via-amber-500/5 to-transparent'
    },
    'Consultoría Técnica': {
        gradient: 'from-teal-400 via-cyan-500 to-blue-500',
        border: 'border-teal-400/50',
        icon: 'text-teal-400',
        badge: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
        glow: 'shadow-teal-500/30',
        bg: 'from-teal-500/10 via-cyan-500/5 to-transparent'
    },
    'default': {
        gradient: 'from-cyan-400 via-blue-500 to-purple-500',
        border: 'border-cyan-400/50',
        icon: 'text-cyan-400',
        badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        glow: 'shadow-cyan-500/30',
        bg: 'from-cyan-500/10 via-blue-500/5 to-transparent'
    }
};

const getTheme = (label: string) => categoryThemes[label] || categoryThemes['default'];

// Client-only wrapper
function ClientOnly({ children }: { children: React.ReactNode }) {
    return useSyncExternalStore(
        () => () => { },
        () => children,
        () => null
    );
}

// Floating particles component
function FloatingParticles() {
    const [particles] = useState(() =>
        [...Array(20)].map((_, i) => ({
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            size: Math.random() * 3 + 1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5
        }))
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full bg-gradient-to-r from-cyan-400/30 to-blue-400/30"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: p.x,
                        top: p.y
                    }}
                    animate={{
                        y: [0, -100, 0],
                        opacity: [0, 0.5, 0],
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

// Animated orb
function AnimatedOrb({ color, size, position, delay }: { color: string; size: number; position: string; delay: number }) {
    return (
        <motion.div
            className={`absolute ${position} rounded-full blur-3xl`}
            style={{
                width: size,
                height: size,
                background: `radial-gradient(circle, ${color}40 0%, transparent 70%)`
            }}
            animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
                duration: 8,
                repeat: Infinity,
                delay,
                ease: 'easeInOut'
            }}
        />
    );
}

// Scroll Progress with enhanced design
function ScrollProgress() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
        };
        window.addEventListener('scroll', updateProgress);
        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
            <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 via-purple-500 to-pink-500"
                initial={{ scaleX: 0 }}
                style={{ scaleX: progress / 100, transformOrigin: 'left' }}
            />
            <motion.div
                className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent blur-sm"
                animate={{ x: ['-100%', '100vw'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                style={{ scaleX: progress / 100 }}
            />
        </div>
    );
}

// Enhanced Nav Item with 3D effect
function NavItem({ link, index, isHovered, onHover, onLeave }: {
    link: typeof navLinks[0];
    index: number;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}) {
    const Icon = link.icon;
    const hasSubmenu = link.submenu && link.submenu.length > 0;
    const itemRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 400, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 400, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!itemRef.current) return;
        const rect = itemRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    return (
        <motion.div
            ref={itemRef}
            className="relative"
            initial={{ opacity: 0, y: -20, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.1 + index * 0.05, type: 'spring', stiffness: 300 }}
            onMouseEnter={onHover}
            onMouseLeave={() => { onLeave(); mouseX.set(0); mouseY.set(0); }}
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            onMouseMove={handleMouseMove}
        >
            <a
                href={link.href}
                className="relative flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-gray-300 hover:text-white transition-all duration-300 group/nav"
            >
                {/* Animated background */}
                <motion.span
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300"
                    animate={{ scale: isHovered ? 1.05 : 1 }}
                />

                {/* Glow effect */}
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-purple-500/0 opacity-0 group-hover/nav:opacity-100 blur-xl transition-opacity duration-500" />

                {/* Border glow */}
                <span className="absolute inset-0 rounded-full border border-white/0 group-hover/nav:border-cyan-500/30 transition-all duration-300" />

                <span className="relative flex items-center gap-1.5">
                    {/* Icon pulse on hover */}
                    <motion.span
                        animate={{ scale: isHovered ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Icon className="w-3.5 h-3.5 text-cyan-400 opacity-0 group-hover/nav:opacity-100 transition-opacity" />
                    </motion.span>

                    <span className="whitespace-nowrap">{link.label}</span>

                    {hasSubmenu && (
                        <motion.span
                            animate={{ rotate: isHovered ? 180 : 0 }}
                            transition={{ duration: 0.3, type: 'spring' }}
                            className="text-gray-500"
                        >
                            <ChevronDown className="w-3 h-3" />
                        </motion.span>
                    )}
                </span>

                {/* Bottom indicator */}
                <motion.span
                    className="absolute bottom-0 left-1/2 h-[2px] bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full"
                    animate={{
                        width: isHovered ? '60%' : '0%',
                        x: isHovered ? '-50%' : '0%'
                    }}
                    style={{ left: '50%' }}
                    transition={{ duration: 0.3 }}
                />
            </a>
        </motion.div>
    );
}

// Featured items for mega menu
const featuredItems = [
    { icon: Star, label: 'Más Popular', item: 'Frontend', color: 'from-yellow-400 to-amber-500' },
    { icon: TrendingUp, label: 'En Demanda', item: 'IA & ML', color: 'from-emerald-400 to-green-500' },
    { icon: Rocket, label: 'Nuevo', item: 'Cloud Native', color: 'from-purple-400 to-pink-500' },
];

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const isAuthenticated = useIsAuthenticated();
    const user = useUser();
    const token = useAuthStore((state) => state.token);
    const logout = useAuthStore((state) => state.logout);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });
        } catch (error) {
            console.error('Logout error:', error);
        }
        logout();
    };

    return (
        <>
            {/* Desktop Navbar */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled
                    ? 'bg-[#030712]/90 backdrop-blur-3xl border-b border-white/[0.03] shadow-2xl shadow-black/20'
                    : 'bg-transparent'
                    }`}
            >
                <ScrollProgress />

                {/* Ambient effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <ClientOnly>
                        <AnimatedOrb color="#06b6d4" size={400} position="top-0 -left-20" delay={0} />
                        <AnimatedOrb color="#8b5cf6" size={400} position="top-0 -right-20" delay={2} />
                        {isScrolled && <FloatingParticles />}
                    </ClientOnly>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">

                        {/* Logo Section - Enhanced */}
                        <motion.a
                            href="/"
                            className="flex items-center gap-2 group relative shrink-0"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {/* Glow effect */}
                            <motion.div
                                className="absolute -inset-3 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />

                            <div className="relative flex items-center gap-2">
                                {/* Logo Icon */}
                                <div className="relative">
                                    {/* Animated ring */}
                                    <motion.div
                                        className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                                    />

                                    <div className="relative w-9 h-9 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-[#0a0a2a] to-[#06051d] border border-cyan-500/30 flex items-center justify-center overflow-hidden group-hover:border-cyan-400/50 transition-all duration-300">
                                        <img
                                            src="/Logo-dev.png"
                                            alt="Jacana Dev"
                                            className="w-full h-full rounded-lg object-cover"
                                        />

                                        {/* Shine effect */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                                            animate={{ x: ['-200%', '200%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                        />
                                    </div>

                                    {/* Pulse ring */}
                                    <motion.div
                                        className="absolute inset-0 rounded-lg border border-cyan-400/50"
                                        animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    />
                                </div>
                            </div>
                        </motion.a>

                        {/* Desktop Navigation - Enhanced */}
                        <div className="hidden lg:flex items-center flex-1 justify-center">
                            <div className="relative flex items-center gap-0.5 p-1 rounded-full bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/[0.05] backdrop-blur-xl">
                                {/* Inner glow */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5" />

                                {navLinks.map((link, index) => (
                                    <NavItem
                                        key={link.label}
                                        link={link}
                                        index={index}
                                        isHovered={hoveredMenu === link.label}
                                        onHover={() => link.submenu && setHoveredMenu(link.label)}
                                        onLeave={() => setHoveredMenu(null)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Right Section - Enhanced */}
                        <div className="hidden lg:flex items-center gap-2">
                            {/* Tech Stack Pills - Animated */}
                            <div className="hidden xl:flex relative items-center gap-1.5 px-2 py-1 rounded-full bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/[0.05] backdrop-blur-xl group">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5" />
                                {[
                                    { icon: Monitor, color: 'cyan', label: 'Frontend' },
                                    { icon: Server, color: 'blue', label: 'Backend' },
                                    { icon: Cloud, color: 'purple', label: 'Cloud' }
                                ].map(({ icon: Icon, color }, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.15, y: -2 }}
                                        className={`relative w-6 h-6 rounded-md bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 border border-${color}-500/30 flex items-center justify-center cursor-pointer group/icon`}
                                        title={color}
                                    >
                                        <Icon className={`w-3.5 h-3.5 text-${color}-400`} />
                                        <motion.div
                                            className="absolute inset-0 rounded-md bg-gradient-to-r from-transparent via-white/10 to-transparent"
                                            animate={{ x: ['-100%', '100%'] }}
                                            transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                                        />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Divider */}
                            <div className="hidden xl:block relative w-px h-6">
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-600/50 to-transparent" />
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
                                    animate={{ y: ['-100%', '100%'] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                            </div>

                            {/* Auth Section */}
                            {isAuthenticated && user ? (
                                <UserMenu onLogout={handleLogout} />
                            ) : (
                                <div className="flex items-center gap-1.5">
                                    <motion.button
                                        onClick={() => setShowLogin(true)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative px-3 py-1.5 text-xs font-medium text-gray-300 hover:text-white transition-colors overflow-hidden group"
                                    >
                                        <span className="relative z-10">Iniciar Sesión</span>
                                        <motion.span
                                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0"
                                            initial={{ x: '-100%' }}
                                            whileHover={{ x: '100%' }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </motion.button>

                                    <motion.button
                                        onClick={() => setShowRegister(true)}
                                        whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6, 182, 212, 0.4)' }}
                                        whileTap={{ scale: 0.98 }}
                                        className="relative px-4 py-1.5 text-xs font-semibold text-white rounded-full overflow-hidden group"
                                    >
                                        {/* Multi-layer gradient */}
                                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300 group-hover:scale-110" />
                                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* Shine effect */}
                                        <motion.span
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                                            animate={{ x: ['-200%', '200%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                        />

                                        <span className="relative flex items-center gap-1.5">
                                            Registrarse
                                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                        </span>
                                    </motion.button>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Button - Enhanced */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden relative w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] overflow-hidden group"
                        >
                            {/* Animated background */}
                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Pulse effect */}
                            <motion.span
                                className="absolute inset-0 rounded-2xl border border-cyan-500/30"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />

                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <X className="w-5 h-5 text-cyan-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                        animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                        exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Menu className="w-5 h-5 text-cyan-400" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Desktop Mega Menu - Enhanced */}
            <AnimatePresence>
                {hoveredMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -10, rotateX: 10 }}
                        transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                        className="fixed top-16 md:top-20 left-0 right-0 z-40 pt-8 perspective-1000"
                        onMouseEnter={() => setHoveredMenu(hoveredMenu)}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        {navLinks.filter(link => link.label === hoveredMenu && link.submenu).map(link => (
                            <motion.div
                                key={link.label}
                                className="max-w-6xl mx-auto px-4"
                            >
                                <div className="relative bg-[#0a0a2a]/95 backdrop-blur-3xl border border-white/[0.08] rounded-3xl p-8 shadow-2xl shadow-black/50 overflow-hidden">
                                    {/* Ambient effects */}
                                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                        <ClientOnly>
                                            <FloatingParticles />
                                        </ClientOnly>
                                        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-cyan-500/5 to-transparent" />
                                        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px]" />
                                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[150px]" />
                                    </div>

                                    {/* Top border glow */}
                                    <div className="absolute top-0 left-0 right-0 h-px">
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                                        <motion.div
                                            className="absolute w-40 h-full bg-cyan-400"
                                            animate={{ x: ['-100%', '500%'] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                            style={{ filter: 'blur(4px)' }}
                                        />
                                    </div>

                                    <div className="relative grid grid-cols-1 lg:grid-cols-4 gap-8">
                                        {/* Header Section - Enhanced */}
                                        <div className="lg:col-span-1 lg:border-r lg:border-white/[0.06] lg:pr-8">
                                            <motion.div
                                                className="flex items-center gap-4 mb-6"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <div className="relative">
                                                    <motion.div
                                                        className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl blur-lg opacity-50"
                                                        animate={{ scale: [1, 1.1, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity }}
                                                    />
                                                    <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center overflow-hidden">
                                                        <link.icon className="w-8 h-8 text-cyan-400" />
                                                        <motion.div
                                                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                                                            animate={{ x: ['-200%', '200%'] }}
                                                            transition={{ duration: 2, repeat: Infinity }}
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-bold text-white">{link.label}</h3>
                                                    <p className="text-sm text-gray-400">{link.description}</p>
                                                </div>
                                            </motion.div>

                                            {/* Featured Badges - Enhanced */}
                                            <div className="space-y-3 mb-6">
                                                {featuredItems.map((featured, idx) => {
                                                    const FeaturedIcon = featured.icon;
                                                    return (
                                                        <motion.div
                                                            key={idx}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: 0.2 + idx * 0.1 }}
                                                            className="relative flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] overflow-hidden group hover:border-cyan-500/20 transition-all"
                                                        >
                                                            <div className={`absolute inset-0 bg-gradient-to-r ${featured.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                                                            <div className={`p-1.5 rounded-lg bg-gradient-to-r ${featured.color}`}>
                                                                <FeaturedIcon className="w-3.5 h-3.5 text-white" />
                                                            </div>
                                                            <span className="text-sm text-gray-400">{featured.label}:</span>
                                                            <span className="text-sm font-medium text-white">{featured.item}</span>
                                                        </motion.div>
                                                    );
                                                })}
                                            </div>

                                            {/* CTA Button - Enhanced */}
                                            <motion.a
                                                href={link.href}
                                                whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(6, 182, 212, 0.3)' }}
                                                whileTap={{ scale: 0.98 }}
                                                className="relative w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl overflow-hidden group"
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300 group-hover:scale-110" />
                                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                                    animate={{ x: ['-200%', '200%'] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                                <span className="relative text-white font-semibold">Ver todos</span>
                                                <ArrowRight className="relative w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                                            </motion.a>
                                        </div>

                                        {/* Services Grid - Enhanced */}
                                        <div className="lg:col-span-3">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {link.submenu?.map((item, idx) => {
                                                    const SubIcon = item.icon;
                                                    const theme = getTheme(item.label);
                                                    return (
                                                        <motion.a
                                                            key={item.label}
                                                            href={item.href}
                                                            initial={{ opacity: 0, y: 20, rotateX: -10 }}
                                                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                                                            transition={{ delay: idx * 0.05, type: 'spring', stiffness: 200 }}
                                                            whileHover={{ y: -5, scale: 1.02 }}
                                                            className="group relative p-5 rounded-2xl bg-white/[0.01] border border-white/[0.05] hover:border-cyan-500/20 transition-all duration-300 overflow-hidden cursor-pointer"
                                                        >
                                                            {/* Animated background */}
                                                            <motion.div
                                                                className={`absolute inset-0 bg-gradient-to-br ${theme.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                                            />

                                                            {/* Corner accent */}
                                                            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl ${theme.gradient} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-300`} />

                                                            {/* Shine effect */}
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                                                                initial={{ x: '-100%' }}
                                                                whileHover={{ x: '100%' }}
                                                                transition={{ duration: 0.6 }}
                                                            />

                                                            <div className="relative flex items-start gap-4">
                                                                <motion.div
                                                                    className={`relative w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br ${theme.gradient} p-px overflow-hidden`}
                                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                                >
                                                                    <div className="absolute inset-px rounded-xl bg-[#0a0a2a]/80 flex items-center justify-center">
                                                                        <SubIcon className={`w-6 h-6 ${theme.icon}`} />
                                                                    </div>
                                                                    <motion.div
                                                                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                                                                        animate={{ rotate: 360 }}
                                                                        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                                                                    />
                                                                </motion.div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center gap-2 mb-1.5">
                                                                        <h4 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                                                            {item.label}
                                                                        </h4>
                                                                        <motion.div
                                                                            initial={{ opacity: 0, x: -10 }}
                                                                            whileHover={{ opacity: 1, x: 0 }}
                                                                        >
                                                                            <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                                                                        </motion.div>
                                                                    </div>
                                                                    <p className="text-xs text-gray-500 line-clamp-2 group-hover:text-gray-400 transition-colors">{item.description}</p>
                                                                </div>
                                                            </div>
                                                        </motion.a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile Menu - Enhanced */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-[#030712]/95 backdrop-blur-3xl z-[60] lg:hidden"
                        />

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[70] lg:hidden flex flex-col"
                        >
                            {/* Decorative elements */}
                            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                <ClientOnly>
                                    <AnimatedOrb color="#06b6d4" size={500} position="top-0 -left-32" delay={0} />
                                    <AnimatedOrb color="#8b5cf6" size={500} position="bottom-0 -right-32" delay={1} />
                                    <FloatingParticles />
                                </ClientOnly>
                            </div>

                            {/* Header */}
                            <div className="flex items-center justify-between p-5 pt-24 shrink-0 relative z-10">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="relative">
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur-lg opacity-40"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#0a0a2a] to-[#06051d] border border-cyan-500/30 overflow-hidden">
                                            <img src="/Logo-dev.png" alt="Jacana Dev" className="w-full h-full rounded-xl object-cover" />
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                                                animate={{ x: ['-200%', '200%'] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-xl font-bold text-white">
                                            Jacana<span className="text-cyan-400">Dev</span>
                                        </span>
                                        <p className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">Fullstack Studio</p>
                                    </div>
                                </motion.div>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center overflow-hidden group"
                                >
                                    <motion.span
                                        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                    />
                                    <X className="w-5 h-5 text-cyan-400 relative z-10" />
                                </motion.button>
                            </div>

                            {/* Navigation */}
                            <div className="flex-1 overflow-y-auto px-5 relative z-10 custom-scrollbar-nav">
                                <div className="space-y-3 py-2">
                                    {navLinks.map((link, index) => {
                                        const Icon = link.icon;
                                        const submenuItems = link.submenu;
                                        const hasSubmenu = Array.isArray(submenuItems) && submenuItems.length > 0;
                                        const isOpen = openMobileSubmenu === link.label;

                                        return (
                                            <div key={link.label + index}>
                                                <motion.div
                                                    initial={{ opacity: 0, x: -30, rotateY: -10 }}
                                                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                                    transition={{ delay: 0.1 + index * 0.05, type: 'spring' }}
                                                >
                                                    {hasSubmenu ? (
                                                        <div
                                                            role="button"
                                                            tabIndex={0}
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter' || e.key === ' ') {
                                                                    e.preventDefault();
                                                                    setOpenMobileSubmenu(isOpen ? null : link.label);
                                                                }
                                                            }}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                setOpenMobileSubmenu(isOpen ? null : link.label);
                                                            }}
                                                            className="w-full group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05] hover:border-cyan-500/20 transition-all overflow-hidden cursor-pointer touch-manipulation"
                                                        >
                                                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center overflow-hidden">
                                                                <Icon className="w-5 h-5 text-cyan-400" />
                                                            </div>
                                                            <div className="flex-1 text-left">
                                                                <span className="text-base font-semibold text-white">{link.label}</span>
                                                                <p className="text-xs text-gray-500">{link.description}</p>
                                                            </div>
                                                            <motion.div
                                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                                transition={{ type: 'spring', stiffness: 200 }}
                                                                className="shrink-0"
                                                            >
                                                                <ChevronDown className="w-5 h-5 text-cyan-400" />
                                                            </motion.div>
                                                        </div>
                                                    ) : (
                                                        <a
                                                            href={link.href}
                                                            onClick={() => setIsMenuOpen(false)}
                                                            className="group flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/[0.02] to-transparent border border-white/[0.05] hover:border-cyan-500/20 transition-all overflow-hidden cursor-pointer"
                                                        >
                                                            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center overflow-hidden">
                                                                <Icon className="w-5 h-5 text-cyan-400" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <span className="text-base font-semibold text-white">{link.label}</span>
                                                                <p className="text-xs text-gray-500">{link.description}</p>
                                                            </div>
                                                            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all relative z-10" />
                                                        </a>
                                                    )}
                                                </motion.div>

                                                {/* Mobile Submenu */}
                                                {hasSubmenu && (
                                                    <AnimatePresence>
                                                        {isOpen && (
                                                            <motion.div
                                                                initial={{ height: 0, opacity: 0 }}
                                                                animate={{ height: 'auto', opacity: 1 }}
                                                                exit={{ height: 0, opacity: 0 }}
                                                                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="pl-4 pr-2 py-3 space-y-2 border-l-2 border-cyan-500/30 ml-6 mt-2">
                                                                    <div className="text-xs text-cyan-400 font-medium mb-2 px-2">
                                                                        Selecciona una opción:
                                                                    </div>
                                                                    {submenuItems.map((item, idx) => {
                                                                        const SubIcon = item.icon;
                                                                        const theme = getTheme(item.label);
                                                                        return (
                                                                            <motion.a
                                                                                key={item.label + idx}
                                                                                href={item.href}
                                                                                initial={{ opacity: 0, x: -20 }}
                                                                                animate={{ opacity: 1, x: 0 }}
                                                                                transition={{ delay: idx * 0.05 }}
                                                                                onClick={() => setIsMenuOpen(false)}
                                                                                className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all overflow-hidden cursor-pointer"
                                                                            >
                                                                                <div className={`relative w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br ${theme.gradient} p-px overflow-hidden`}>
                                                                                    <div className="absolute inset-px rounded-xl bg-[#0a0a2a]/80 flex items-center justify-center">
                                                                                        <SubIcon className={`w-5 h-5 ${theme.icon}`} />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex-1 min-w-0">
                                                                                    <div className="flex items-center gap-2">
                                                                                        <span className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">
                                                                                            {item.label}
                                                                                        </span>
                                                                                        <ArrowRight className="w-3 h-3 text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                                                                    </div>
                                                                                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{item.description}</p>
                                                                                </div>
                                                                            </motion.a>
                                                                        );
                                                                    })}
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Bottom Section */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="p-5 shrink-0 relative z-10 border-t border-white/[0.05]"
                            >
                                {!isAuthenticated && (
                                    <div className="flex gap-3 mb-5">
                                        <motion.button
                                            onClick={() => { setIsMenuOpen(false); setShowLogin(true); }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="flex-1 py-3.5 text-sm font-semibold text-gray-300 border border-white/[0.1] rounded-xl hover:bg-white/[0.02] hover:border-cyan-500/30 transition-all"
                                        >
                                            Iniciar Sesión
                                        </motion.button>
                                        <motion.button
                                            onClick={() => { setIsMenuOpen(false); setShowRegister(true); }}
                                            whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(6, 182, 212, 0.3)' }}
                                            whileTap={{ scale: 0.98 }}
                                            className="relative flex-1 py-3.5 text-sm font-semibold text-white rounded-xl overflow-hidden"
                                        >
                                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500" />
                                            <span className="relative">Registrarse</span>
                                        </motion.button>
                                    </div>
                                )}

                                {/* Tech Icons */}
                                <div className="flex items-center justify-center gap-6">
                                    {[
                                        { Icon: Monitor, color: 'cyan', label: 'Frontend' },
                                        { Icon: Server, color: 'blue', label: 'Backend' },
                                        { Icon: Cloud, color: 'purple', label: 'Cloud' }
                                    ].map(({ Icon, color, label }) => (
                                        <motion.div
                                            key={label}
                                            className="flex flex-col items-center gap-2"
                                            whileHover={{ scale: 1.1, y: -3 }}
                                        >
                                            <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br from-${color}-500/20 to-${color}-600/20 border border-${color}-500/30 flex items-center justify-center overflow-hidden cursor-pointer`}>
                                                <Icon className={`w-5 h-5 text-${color}-400`} />
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                                                    animate={{ x: ['-200%', '200%'] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            </div>
                                            <span className="text-[10px] text-gray-500 font-medium">{label}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Auth Dialogs */}
            <LoginDialog
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
                onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
            />
            <RegisterDialog
                isOpen={showRegister}
                onClose={() => setShowRegister(false)}
                onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
            />
        </>
    );
}
