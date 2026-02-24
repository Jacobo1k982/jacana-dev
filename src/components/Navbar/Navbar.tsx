"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ChevronDown, ExternalLink, Sparkles, LogOut, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { menuItems } from "./menuData";
import Logo from "./Logo";
import LogoTwo from "./LogoTwo";
import type { MenuDataItem } from "./menuData";
import { useAuth } from "@/hooks/use-auth";

// ============================================
// CONFIGURACIÓN ESTILO FUTURISTA
// ============================================
const CYBER_THEME = {
    colors: {
        accent: '#00FF9D',
        accentDim: 'rgba(0, 255, 157, 0.1)',
        accentHover: '#00cc7a',
        secondary: '#a371f7',
        textMain: '#e6edf3',
        textMuted: '#8b949e',
        bgGlass: 'rgba(13, 17, 23, 0.8)',
        border: 'rgba(48, 54, 61, 0.5)',
    }
};

// Helpers
const avatarSrc = (user: any) => user?.image;

// Hook para detectar scroll
function useScrollPosition(threshold = 0) {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        const unsubscribe = scrollY.on("change", (latest) => {
            setScrolled(latest > threshold);
        });
        return () => unsubscribe();
    }, [scrollY]);

    return scrolled;
}

// Click Outside
function useClickOutside(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) callback();
        };
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, [ref, callback]);
}

// ============================================
// COMPONENTE: Icono Hamburguesa Animado
// ============================================
const AnimatedHamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <div className="relative w-6 h-6 flex flex-col justify-center items-center">
            {/* Línea Superior */}
            <motion.span
                className="absolute w-5 h-0.5 bg-current rounded-full"
                animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 0 : -5,
                    backgroundColor: isOpen ? CYBER_THEME.colors.accent : CYBER_THEME.colors.textMuted,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />
            {/* Línea Central (Desaparece) */}
            <motion.span
                className="absolute w-5 h-0.5 bg-current rounded-full"
                animate={{
                    opacity: isOpen ? 0 : 1,
                    scale: isOpen ? 0 : 1,
                    backgroundColor: CYBER_THEME.colors.textMuted,
                }}
                transition={{ duration: 0.1 }}
            />
            {/* Línea Inferior */}
            <motion.span
                className="absolute w-5 h-0.5 bg-current rounded-full"
                animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? 0 : 5,
                    backgroundColor: isOpen ? CYBER_THEME.colors.accent : CYBER_THEME.colors.textMuted,
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* Glow Effect cuando está abierto */}
            {isOpen && (
                <motion.div
                    className="absolute inset-0 rounded-full bg-[#00FF9D]/20 blur-md"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.5 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                />
            )}
        </div>
    );
};

// ============================================================================
// Desktop Menu Item – Estilo Cyber/Futurista
// ============================================================================

interface DesktopMenuItemProps {
    item: MenuDataItem;
    isActive: boolean;
    onToggle: (label: string | null) => void;
}

const DesktopMenuItem = memo(function DesktopMenuItem({
    item,
    isActive,
    onToggle,
}: DesktopMenuItemProps) {
    const hasSubItems = Boolean(item.subItems?.length);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => onToggle(item.label);
    const handleMouseLeave = (e: React.MouseEvent) => {
        const related = e.relatedTarget;
        if (!related || !(related instanceof Node)) {
            onToggle(null);
            return;
        }
        if (dropdownRef.current && dropdownRef.current.contains(related)) {
            return;
        }
        onToggle(null);
    };

    return (
        <div
            className="relative h-full flex items-center"
            onMouseEnter={hasSubItems ? handleMouseEnter : undefined}
            onMouseLeave={hasSubItems ? handleMouseLeave : undefined}
        >
            {hasSubItems ? (
                <>
                    <button
                        type="button"
                        aria-expanded={isActive}
                        className={`
                            flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative
                            ${isActive
                                ? "text-[#00FF9D] bg-[#00FF9D]/10 border-b-2 border-[#00FF9D]"
                                : "text-[#8b949e] hover:text-white hover:bg-white/5"
                            }
                        `}
                    >
                        {item.label}
                        <motion.span
                            animate={{ rotate: isActive ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className={`h-3.5 w-3.5 transition-colors ${isActive ? 'text-[#00FF9D]' : 'text-gray-500'}`} />
                        </motion.span>
                    </button>

                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                ref={dropdownRef}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 w-[720px]"
                            >
                                {/* Glow Efecto Detrás */}
                                <div className="absolute inset-0 bg-[#00FF9D]/5 blur-3xl rounded-2xl" />

                                {/* Mega Menu Container - Glassmorphism */}
                                <div className="relative rounded-xl border border-[#30363d] bg-[#0d1117]/90 backdrop-blur-xl shadow-2xl overflow-hidden">

                                    {/* Top Accent Line */}
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF9D] to-transparent" />

                                    {/* Header */}
                                    <div className="px-6 py-4 border-b border-[#30363d] bg-white/[0.02]">
                                        <span className="text-xs font-bold text-[#00FF9D] uppercase tracking-widest flex items-center gap-2">
                                            <Zap className="w-3.5 h-3.5" />
                                            {item.label}
                                        </span>
                                    </div>

                                    <div className="p-4 grid grid-cols-2 gap-2">
                                        {item.subItems?.map((sub, i) => (
                                            <Link
                                                key={sub.label}
                                                href={sub.href}
                                                onClick={() => onToggle(null)}
                                                className="group flex items-start gap-4 p-4 rounded-lg hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-[#00FF9D]/20 relative overflow-hidden"
                                            >
                                                {/* Hover Gradient */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/0 to-purple-500/0 group-hover:from-[#00FF9D]/5 group-hover:to-purple-500/5 transition-all duration-300" />

                                                {/* Icon Container */}
                                                <div className="relative z-10">
                                                    {sub.image ? (
                                                        <img
                                                            src={sub.image}
                                                            alt={sub.label}
                                                            className="w-12 h-12 rounded-lg object-cover border border-[#30363d] flex-shrink-0 group-hover:border-[#00FF9D] transition-colors shadow-[0_0_0_0_rgba(0,255,157,0)] group-hover:shadow-[0_0_10px_rgba(0,255,157,0.2)]"
                                                        />
                                                    ) : (
                                                        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center group-hover:border-[#00FF9D] group-hover:bg-[#0d1117] transition-all shadow-[0_0_0_0_rgba(0,255,157,0)] group-hover:shadow-[0_0_10px_rgba(0,255,157,0.2)]">
                                                            <Sparkles size={20} className="text-[#8b949e] group-hover:text-[#00FF9D] transition-colors" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-center">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm font-semibold text-white group-hover:text-[#00FF9D] leading-tight transition-colors">
                                                            {sub.label}
                                                        </span>
                                                        <ExternalLink className="h-3 w-3 text-gray-600 group-hover:text-[#00FF9D] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
                                                    </div>
                                                    {sub.description && (
                                                        <p className="text-xs text-[#8b949e] leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors">
                                                            {sub.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="border-t border-[#30363d] p-3 bg-white/[0.01]">
                                        <Link
                                            href={`/${item.label.toLowerCase()}`}
                                            onClick={() => onToggle(null)}
                                            className="flex items-center justify-between px-4 py-2 text-xs font-medium text-[#00FF9D] hover:text-white hover:bg-[#00FF9D]/10 rounded-lg transition-colors group"
                                        >
                                            <span>Ver todo en {item.label.toLowerCase()}</span>
                                            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <Link
                    href={item.href || "/"}
                    className="px-4 py-2 text-sm font-medium text-[#8b949e] hover:text-white rounded-lg hover:bg-white/5 transition-colors relative group"
                >
                    {item.label}
                    {/* Underline hover effect */}
                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-[#00FF9D] group-hover:w-1/2 transition-all duration-300 -translate-x-1/2 shadow-[0_0_5px_#00FF9D]" />
                </Link>
            )}
        </div>
    );
});

// ============================================================================
// Mobile Menu Item – Estilo Cyber/Futurista
// ============================================================================

interface MobileMenuItemProps {
    item: MenuDataItem;
    onItemClick: () => void;
}

const MobileMenuItem = memo(function MobileMenuItem({ item, onItemClick }: MobileMenuItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasSubItems = Boolean(item.subItems?.length);

    if (!hasSubItems) {
        return (
            <Link
                href={item.href || "/"}
                onClick={onItemClick}
                className="block px-4 py-4 text-base text-gray-200 hover:text-[#00FF9D] hover:bg-white/5 border-l-2 border-transparent hover:border-[#00FF9D] transition-colors"
            >
                {item.label}
            </Link>
        );
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full px-4 py-4 text-base text-gray-200 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-[#00FF9D]/50 transition-colors"
            >
                <span>{item.label}</span>
                <ChevronDown className={`h-4 w-4 transition-transform text-gray-500 ${isExpanded ? "rotate-180 text-[#00FF9D]" : ""}`} />
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-black/20"
                    >
                        <div className="p-2 grid grid-cols-1 gap-2">
                            {item.subItems?.map((sub) => (
                                <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={onItemClick}
                                    className="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-[#00FF9D]/20 transition-colors"
                                >
                                    {sub.image ? (
                                        <img src={sub.image} alt={sub.label} className="w-10 h-10 rounded-md object-cover border border-[#30363d] flex-shrink-0" />
                                    ) : (
                                        <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#161b22] border border-[#30363d] flex items-center justify-center">
                                            <Sparkles size={16} className="text-[#8b949e] group-hover:text-[#00FF9D] transition-colors" />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className="text-sm font-semibold text-gray-100 group-hover:text-[#00FF9D] transition-colors">{sub.label}</span>
                                        </div>
                                        {sub.description && (
                                            <span className="text-xs text-[#8b949e] leading-snug line-clamp-1 group-hover:text-gray-300 transition-colors">
                                                {sub.description}
                                            </span>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

// ============================================================================
// Navbar Principal – Estilo Cyber/Futurista
// ============================================================================

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const scrolled = useScrollPosition(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { user, loading: authLoading, logout } = useAuth();

    useClickOutside(containerRef, () => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    });

    const handleDropdownToggle = useCallback((label: string | null) => {
        setActiveDropdown(label);
    }, []);

    const handleMobileItemClick = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push("/");
        router.refresh();
    };

    return (
        <div ref={containerRef} className="relative z-50">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={`
                    fixed top-0 inset-x-0 h-16 transition-all duration-300 border-b
                    ${scrolled
                        ? "bg-[#0d1117]/80 backdrop-blur-xl border-[#30363d] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                        : "bg-transparent border-transparent"
                    }
                `}
            >
                {/* Top Glow Line when scrolled */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF9D]/50 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative z-10">

                    {/* Logo */}
                    <div
                        onClick={() => router.push("/")}
                        className="flex-shrink-0 cursor-pointer flex items-center gap-2 group select-none"
                    >
                        <div className="lg:hidden text-white transition-transform group-hover:scale-105"><LogoTwo /></div>
                        <div className="hidden lg:block text-white transition-transform group-hover:scale-105"><Logo /></div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center h-full gap-1" onMouseLeave={() => setActiveDropdown(null)}>
                        {menuItems.map((item) => (
                            <DesktopMenuItem
                                key={item.label}
                                item={item}
                                isActive={activeDropdown === item.label}
                                onToggle={handleDropdownToggle}
                            />
                        ))}
                    </div>

                    {/* Auth Desktop */}
                    <div className="hidden lg:flex items-center gap-4">
                        {authLoading ? (
                            <div className="h-8 w-24 bg-white/5 animate-pulse rounded-md" />
                        ) : user ? (
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-[#30363d] hover:border-[#00FF9D]/30 transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-gray-800 border border-[#00FF9D]/50 cursor-pointer overflow-hidden transition-all hover:shadow-[0_0_15px_rgba(0,255,157,0.4)] relative">
                                        <img
                                            src={avatarSrc(user) ?? "/favicon.png"}
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                        {/* Status Light */}
                                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00FF9D] border-2 border-[#0d1117] rounded-full shadow-[0_0_5px_#00FF9D]" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-semibold text-white leading-tight">{user.name || "Usuario"}</span>
                                        <span className="text-[9px] text-[#00FF9D] font-mono tracking-wider">ONLINE</span>
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#8b949e] hover:text-red-400 hover:bg-red-500/10 rounded-lg border border-transparent hover:border-red-500/30 transition-all duration-200"
                                >
                                    <LogOut className="h-3.5 w-3.5" />
                                    Salir
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href="/register"
                                    className="group relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-black bg-[#00FF9D] rounded-lg overflow-hidden transition-all duration-300 shadow-[0_0_10px_rgba(0,255,157,0.2)] hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] active:scale-95"
                                >
                                    <span className="relative flex items-center gap-2">
                                        Crear cuenta
                                        <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </span>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-[#8b949e] hover:text-[#00FF9D] p-2 focus:outline-none transition-colors relative z-50"
                            aria-label="Toggle menu"
                        >
                            <AnimatedHamburgerIcon isOpen={isMobileMenuOpen} />
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 z-40 pt-16 bg-[#0d1117]/95 backdrop-blur-xl overflow-y-auto"
                    >
                        {/* Top border glow for mobile menu */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF9D] to-transparent" />

                        <div className="px-2 py-4 space-y-1 border-b border-[#30363d]">
                            {menuItems.map((item) => (
                                <MobileMenuItem key={item.label} item={item} onItemClick={handleMobileItemClick} />
                            ))}
                        </div>

                        {/* Mobile Auth */}
                        <div className="px-4 py-6">
                            {authLoading ? (
                                <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                            ) : user ? (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 pb-4 border-b border-[#30363d]">
                                        <div className="w-10 h-10 rounded-full bg-gray-800 border border-[#00FF9D]/50 overflow-hidden shadow-[0_0_10px_rgba(0,255,157,0.2)]">
                                            <img
                                                src={avatarSrc(user) ?? "/favicon.png"}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{user.name || "Usuario"}</p>
                                            <p className="text-xs text-[#00FF9D] font-mono">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-2.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg border border-red-500/20 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <LogOut size={16} />
                                        Cerrar sesión
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/login"
                                        onClick={handleMobileItemClick}
                                        className="w-full py-3 text-center text-sm font-medium text-white border border-[#30363d] rounded-lg hover:bg-white/5 transition-colors"
                                    >
                                        Iniciar sesión
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={handleMobileItemClick}
                                        className="w-full py-3 text-center text-sm font-semibold text-black bg-[#00FF9D] rounded-lg shadow-[0_0_15px_rgba(0,255,157,0.3)]"
                                    >
                                        Crear cuenta
                                    </Link>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default memo(Navbar);