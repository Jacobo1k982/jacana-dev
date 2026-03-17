'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu, X, Home, Layers, Monitor, Server, Smartphone, Cloud,
    Database, Brain, Plug, Users, FolderKanban, Code2, Palette,
    Terminal, CloudCog, GitBranch, FileText, Mail, ChevronRight,
    ChevronDown, Sparkles, Zap, ArrowRight, ExternalLink, Star,
    TrendingUp, Shield, Cpu, Globe, Rocket, Settings, PenTool, Code,
    Hexagon, Plus
} from 'lucide-react';
import navLinksData from '@/data/navLinks.json';
import { LoginDialog, RegisterDialog, UserMenu } from '@/components/auth';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Home, Layers, Monitor, Server, Smartphone, Cloud,
    Database, Brain, Plug, Users, FolderKanban, Code2, Palette,
    Terminal, CloudCog, GitBranch, FileText, Mail, ChevronRight,
    Sparkles, Zap, Cpu, Rocket, ArrowRight, ExternalLink, Star,
    TrendingUp, Shield, Globe, Settings, PenTool, Code, Hexagon,
};

const navLinks = navLinksData.map(link => ({
    ...link,
    icon: iconMap[link.icon] || ChevronRight,
    submenu: link.submenu?.map(item => ({
        ...item,
        icon: iconMap[item.icon] || ChevronRight,
    })),
}));

const categoryAccent: Record<string, string> = {
    'Desarrollo Frontend': 'text-sky-400 border-sky-400/40',
    'Desarrollo Backend': 'text-indigo-400 border-indigo-400/40',
    'Aplicaciones Móviles': 'text-violet-400 border-violet-400/40',
    'Cloud & DevOps': 'text-orange-400 border-orange-400/40',
    'Bases de Datos': 'text-emerald-400 border-emerald-400/40',
    'Inteligencia Artificial': 'text-rose-400 border-rose-400/40',
    'APIs & Integraciones': 'text-amber-400 border-amber-400/40',
    'Consultoría Técnica': 'text-teal-400 border-teal-400/40',
    'default': 'text-amber-400 border-amber-400/40',
};

const getAccent = (label: string) => categoryAccent[label] ?? categoryAccent['default'];

function ScrollProgress() {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const update = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
        };
        window.addEventListener('scroll', update, { passive: true });
        return () => window.removeEventListener('scroll', update);
    }, []);
    return (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-800/40">
            <motion.div className="h-full bg-amber-400/60" style={{ scaleX: progress / 100, transformOrigin: 'left' }} />
        </div>
    );
}

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredMenu, setHoveredMenu] = useState<string | null>(null);
    const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const { data: session, status } = useSession();
    const isAuthenticated = status === 'authenticated';
    const user = session?.user;

    const handleLogout = () => signOut({ callbackUrl: '/' });

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -64, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-[#080810]/95 backdrop-blur-2xl border-b border-slate-800/60 shadow-lg shadow-black/30' : 'bg-transparent'}`}
            >
                <ScrollProgress />
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex items-center justify-between h-16 md:h-[72px]">

                        <motion.a href="/" className="flex items-center gap-3 group shrink-0" whileHover={{ scale: 1.02 }}>
                            <img src="/Logo-dev.png" alt="Jacana Dev" className="w-12 h-12 md:w-11 md:h-11 object-contain" />
                        </motion.a>

                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link, i) => {
                                const hasSubmenu = link.submenu && link.submenu.length > 0;
                                const isOpen = hoveredMenu === link.label;
                                return (
                                    <div
                                        key={link.label}
                                        className="relative"
                                        onMouseEnter={() => hasSubmenu && setHoveredMenu(link.label)}
                                        onMouseLeave={() => setHoveredMenu(null)}
                                    >
                                        <a href={link.href} className="group relative flex items-center gap-1 px-3 py-2 text-xs font-medium uppercase tracking-[0.12em] text-slate-400 hover:text-white transition-colors">
                                            {link.label}
                                            {hasSubmenu && (
                                                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                                    <ChevronDown className="w-3 h-3 text-slate-600" />
                                                </motion.span>
                                            )}
                                            <motion.span
                                                className="absolute bottom-0 left-3 right-3 h-px bg-amber-400/60"
                                                animate={{ scaleX: isOpen ? 1 : 0 }}
                                                style={{ transformOrigin: 'left' }}
                                                transition={{ duration: 0.2 }}
                                            />
                                        </a>
                                    </div>
                                );
                            })}
                        </nav>

                        <div className="hidden lg:flex items-center gap-3">
                            <div className="w-px h-5 bg-slate-800" />
                            {isAuthenticated && user ? (
                                <UserMenu onLogout={handleLogout} />
                            ) : (
                                <>
                                    <motion.button onClick={() => setShowLogin(true)} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400 hover:text-white transition-colors px-3 py-2">
                                        Iniciar sesión
                                    </motion.button>
                                    <motion.button onClick={() => setShowRegister(true)} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-5 py-2 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.12em] hover:bg-amber-50 transition-colors">
                                        Registrarse
                                        <ArrowRight className="w-3 h-3" />
                                    </motion.button>
                                </>
                            )}
                        </div>

                        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-10 h-10 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 transition-colors">
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <X className="w-4 h-4 text-amber-400" />
                                    </motion.div>
                                ) : (
                                    <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                                        <Menu className="w-4 h-4 text-slate-400" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {hoveredMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-[72px] left-0 right-0 z-40"
                        onMouseEnter={() => setHoveredMenu(hoveredMenu)}
                        onMouseLeave={() => setHoveredMenu(null)}
                    >
                        {navLinks.filter(l => l.label === hoveredMenu && l.submenu).map(link => (
                            <div key={link.label} className="max-w-7xl mx-auto px-6 md:px-8 pt-2">
                                <div className="bg-[#080810]/98 backdrop-blur-2xl border border-slate-800/70 shadow-2xl shadow-black/40">
                                    <div className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
                                    <div className="grid grid-cols-4 divide-x divide-slate-800/60">
                                        <div className="p-8 flex flex-col justify-between">
                                            <div>
                                                <p className="text-[9px] uppercase tracking-[0.3em] text-amber-400/70 mb-4">— {link.label}</p>
                                                <h3 className="text-2xl font-light text-white leading-snug mb-3" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                                                    {link.description ?? 'Nuestros servicios'}
                                                </h3>
                                                <p className="text-xs text-slate-500 leading-relaxed">Soluciones de alto rendimiento adaptadas a tu negocio.</p>
                                            </div>
                                            <motion.a href={link.href} whileHover={{ scale: 1.01 }} className="mt-8 flex items-center justify-center gap-2 py-3 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.12em] hover:bg-amber-50 transition-colors">
                                                Ver todos
                                                <ArrowRight className="w-3 h-3" />
                                            </motion.a>
                                        </div>
                                        <div className="col-span-3 p-8">
                                            <div className="grid grid-cols-3 gap-px bg-slate-800/30">
                                                {link.submenu?.map((item, idx) => {
                                                    const SubIcon = item.icon;
                                                    const accent = getAccent(item.label).split(' ');
                                                    const iconColor = accent[0];
                                                    const borderColor = accent[1];
                                                    return (
                                                        <motion.a key={item.label} href={item.href} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.03 }} className="group bg-[#080810] p-5 hover:bg-slate-900/60 transition-colors flex items-start gap-4">
                                                            <span className={`mt-0.5 w-8 h-8 shrink-0 flex items-center justify-center border ${borderColor} group-hover:bg-slate-800/60 transition-colors`}>
                                                                <SubIcon className={`w-3.5 h-3.5 ${iconColor}`} />
                                                            </span>
                                                            <div>
                                                                <p className="text-xs font-medium uppercase tracking-[0.1em] text-slate-300 group-hover:text-white transition-colors mb-1">{item.label}</p>
                                                                <p className="text-[11px] text-slate-600 group-hover:text-slate-500 transition-colors leading-relaxed line-clamp-2">{item.description}</p>
                                                            </div>
                                                        </motion.a>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-[#080810]/95 backdrop-blur-xl z-[60] lg:hidden" />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-sm z-[70] lg:hidden flex flex-col bg-[#080810] border-l border-slate-800/60"
                        >
                            <div className="flex items-center justify-between px-6 pt-16 pb-6 border-b border-slate-800/60">
                                <img src="/Logo-dev.png" alt="Jacana Dev" className="w-14 h-14 object-contain" />
                                <button onClick={() => setIsMenuOpen(false)} className="w-9 h-9 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 transition-colors">
                                    <X className="w-4 h-4 text-slate-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto py-4 px-6">
                                {navLinks.map((link) => {
                                    const Icon = link.icon;
                                    const hasSubmenu = Array.isArray(link.submenu) && link.submenu.length > 0;
                                    const isOpen = openMobileSubmenu === link.label;
                                    return (
                                        <div key={link.label} className="border-b border-slate-800/40 last:border-b-0">
                                            {hasSubmenu ? (
                                                <button onClick={() => setOpenMobileSubmenu(isOpen ? null : link.label)} className="w-full flex items-center justify-between py-4 text-left">
                                                    <div className="flex items-center gap-3">
                                                        <Icon className="w-4 h-4 text-slate-600" />
                                                        <span className="text-sm font-medium uppercase tracking-[0.1em] text-slate-300">{link.label}</span>
                                                    </div>
                                                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.2 }}>
                                                        <Plus className="w-4 h-4 text-slate-600" />
                                                    </motion.span>
                                                </button>
                                            ) : (
                                                <a href={link.href} onClick={() => setIsMenuOpen(false)} className="flex items-center justify-between py-4 group">
                                                    <div className="flex items-center gap-3">
                                                        <Icon className="w-4 h-4 text-slate-600 group-hover:text-amber-400/80 transition-colors" />
                                                        <span className="text-sm font-medium uppercase tracking-[0.1em] text-slate-300 group-hover:text-white transition-colors">{link.label}</span>
                                                    </div>
                                                    <ChevronRight className="w-4 h-4 text-slate-700 group-hover:text-amber-400/60 transition-colors" />
                                                </a>
                                            )}
                                            <AnimatePresence>
                                                {hasSubmenu && isOpen && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                                                        <div className="pb-3 pl-7 border-l border-amber-400/20 ml-2">
                                                            {link.submenu!.map((item, idx) => {
                                                                const SubIcon = item.icon;
                                                                const accentColor = getAccent(item.label).split(' ')[0];
                                                                return (
                                                                    <motion.a key={item.label} href={item.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.04 }} onClick={() => setIsMenuOpen(false)} className="group flex items-center gap-3 py-2.5 border-b border-slate-800/30 last:border-b-0">
                                                                        <SubIcon className={`w-3.5 h-3.5 ${accentColor} opacity-60 group-hover:opacity-100 transition-opacity`} />
                                                                        <span className="text-xs text-slate-500 group-hover:text-slate-300 transition-colors">{item.label}</span>
                                                                    </motion.a>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="p-6 border-t border-slate-800/60">
                                {!isAuthenticated ? (
                                    <div className="flex gap-3">
                                        <button onClick={() => { setIsMenuOpen(false); setShowLogin(true); }} className="flex-1 py-3 text-xs font-medium uppercase tracking-[0.1em] text-slate-400 border border-slate-700/60 hover:border-amber-400/40 hover:text-white transition-all">
                                            Iniciar sesión
                                        </button>
                                        <button onClick={() => { setIsMenuOpen(false); setShowRegister(true); }} className="flex-1 py-3 text-xs font-medium uppercase tracking-[0.1em] text-[#080810] bg-white hover:bg-amber-50 transition-colors">
                                            Registrarse
                                        </button>
                                    </div>
                                ) : (
                                    <UserMenu onLogout={handleLogout} />
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <LoginDialog isOpen={showLogin} onClose={() => setShowLogin(false)} onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }} />
            <RegisterDialog isOpen={showRegister} onClose={() => setShowRegister(false)} onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }} />
        </>
    );
}