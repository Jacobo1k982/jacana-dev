'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';

// Simple icons
const MenuIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="4" y1="12" x2="20" y2="12" />
        <line x1="4" y1="17" x2="20" y2="17" />
    </svg>
);

const CloseIcon = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

// Navigation items
const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setScrolled(latest > 50);
    });

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsMobileMenuOpen(false);
        }, 0);
        return () => clearTimeout(timer);
    }, [pathname]);

    return (
        <>
            <motion.nav
                initial={{ y: -30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                className="fixed top-0 left-0 right-0 z-50 h-16"
                style={{
                    backgroundColor: scrolled ? 'rgba(2, 3, 5, 0.85)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(0, 180, 220, 0.1)' : '1px solid transparent',
                    transition: 'all 0.4s ease',
                }}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="relative"
                        >
                            <img
                                src="/perfil.png"
                                alt="Jacana Developers"
                                className="h-9 w-9 object-contain"
                                style={{
                                    filter: scrolled
                                        ? 'drop-shadow(0 0 8px rgba(0, 180, 220, 0.4))'
                                        : 'drop-shadow(0 0 4px rgba(0, 180, 220, 0.2))'
                                }}
                            />
                        </motion.div>
                        <div className="hidden sm:flex flex-col">
                            <span
                                className="text-sm font-light tracking-[0.15em] transition-colors duration-300"
                                style={{ color: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.85)' }}
                            >
                                JACANA
                            </span>
                            <span
                                className="text-[8px] tracking-[0.3em] uppercase transition-colors duration-300"
                                style={{ color: 'rgba(0, 200, 220, 0.8)' }}
                            >
                                Developers
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                            >
                                <Link
                                    href={item.href}
                                    className="relative px-5 py-2 text-xs font-light tracking-[0.15em] uppercase transition-all duration-300 group"
                                    style={{ color: 'rgba(255, 255, 255, 0.5)' }}
                                >
                                    <span className="relative z-10 group-hover:text-white/90 transition-colors">
                                        {item.label}
                                    </span>
                                    <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors" />
                                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-cyan-400/60 group-hover:w-8 transition-all duration-300" />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Auth Buttons - Desktop */}
                    <div className="hidden lg:flex items-center gap-3">
                        {user ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="flex items-center gap-3"
                            >
                                <div
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(0, 180, 220, 0.1), rgba(0, 180, 220, 0.05))',
                                        border: '1px solid rgba(0, 180, 220, 0.2)'
                                    }}
                                >
                                    <img
                                        src={user.image || '/perfil.png'}
                                        alt={user.name || 'User'}
                                        className="w-6 h-6 rounded-full object-cover"
                                    />
                                    <span className="text-xs font-light text-white/80 tracking-wide">
                                        {user.name || 'Usuario'}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 rounded-full hover:bg-white/5 transition-colors text-white/40 hover:text-white/70"
                                    title="Cerrar sesión"
                                >
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>
                                </button>
                            </motion.div>
                        ) : (
                            <>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <Link
                                        href="/login"
                                        className="px-5 py-2 text-xs font-light tracking-wider rounded-full transition-all duration-300 border border-white/10 hover:border-white/30 text-white/60 hover:text-white"
                                    >
                                        Log In
                                    </Link>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5, duration: 0.5 }}
                                >
                                    <Link
                                        href="/register"
                                        className="relative px-5 py-2 text-xs font-light tracking-wider rounded-full overflow-hidden transition-all duration-300 group"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-cyan-400/10 border border-cyan-400/20 group-hover:border-cyan-400/40 rounded-full transition-colors" />
                                        <span className="relative text-cyan-400/80 group-hover:text-cyan-400">Sign Up</span>
                                    </Link>
                                </motion.div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-lg transition-colors text-white/60 hover:text-white"
                    >
                        {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    </motion.button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="lg:hidden fixed top-16 left-0 right-0 z-40"
                        style={{
                            backgroundColor: 'rgba(2, 3, 5, 0.98)',
                            backdropFilter: 'blur(20px)',
                            borderBottom: '1px solid rgba(0, 180, 220, 0.1)',
                        }}
                    >
                        <div className="px-6 py-6 space-y-1">
                            {navItems.map((item, index) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="block px-4 py-3 text-sm font-light tracking-[0.15em] uppercase text-white/70 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <div className="pt-5 mt-5 border-t border-white/10 flex flex-col gap-3">
                                {user ? (
                                    <>
                                        <div className="flex items-center gap-3 px-4 py-3">
                                            <img
                                                src={user.image || '/perfil.png'}
                                                alt={user.name || 'User'}
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                            <span className="text-sm font-light text-white/80">
                                                {user.name || 'Usuario'}
                                            </span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center gap-2 px-4 py-3 text-sm font-light tracking-wide text-red-400/70 hover:text-red-400 transition-colors"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                                <polyline points="16 17 21 12 16 7" />
                                                <line x1="21" y1="12" x2="9" y2="12" />
                                            </svg>
                                            Cerrar sesión
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <Link
                                                href="/login"
                                                className="block px-4 py-3 text-center text-sm font-light tracking-wider rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/30 transition-colors"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Log In
                                            </Link>
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <Link
                                                href="/register"
                                                className="block px-4 py-3 text-center text-sm font-light tracking-wider rounded-full text-cyan-400/80 hover:text-cyan-400 transition-colors"
                                                style={{
                                                    background: 'linear-gradient(135deg, rgba(0, 180, 220, 0.15), rgba(0, 180, 220, 0.05))',
                                                    border: '1px solid rgba(0, 180, 220, 0.25)'
                                                }}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Sign Up
                                            </Link>
                                        </motion.div>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Navbar;
