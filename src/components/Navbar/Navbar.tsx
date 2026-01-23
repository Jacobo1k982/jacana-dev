"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Menu, X, ChevronDown, ExternalLink, Sparkles, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { menuItems } from "./menuData"; // Asegúrate de que este archivo exista
import Logo from "./Logo";
import LogoTwo from "./LogoTwo";
import type { MenuDataItem } from "./menuData";
import { useAuth } from "@/hooks/use-auth";

// Helpers
const isInternalLink = (href: string) =>
    href.startsWith("/") && !href.startsWith("//") && !href.startsWith("http");

// Custom Hook scroll
function useScrollPosition(threshold = 20) {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();
    const progress = useTransform(scrollY, [0, threshold], [0, 1]);
    const smooth = useSpring(progress, { stiffness: 80, damping: 40 });

    useEffect(() => {
        return smooth.on("change", (v) => setScrolled(v > 0.4));
    }, [smooth]);

    return scrolled;
}

// Click outside (para cerrar mobile si es necesario)
function useClickOutside(ref: React.RefObject<HTMLElement>, callback: () => void) {
    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) callback();
        };
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, [ref, callback]);
}

// ============================================================================
// Desktop Menu Item (hover + 3D sutil)
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
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => onToggle(item.label);

    // ── SOLUCIÓN AL ERROR ────────────────────────────────────────────────
    const handleMouseLeave = (e: React.MouseEvent) => {
        const relatedTarget = e.relatedTarget;

        // Verificamos que relatedTarget sea realmente un Node antes de usar contains
        if (
            relatedTarget instanceof Node &&
            dropdownRef.current?.contains(relatedTarget)
        ) {
            return;
        }

        onToggle(null);
    };
    // ──────────────────────────────────────────────────────────────────────

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle(isActive ? null : item.label);
        }
    };

    return (
        <div
            className="relative group perspective-[900px]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {hasSubItems ? (
                <>
                    <motion.button
                        ref={triggerRef}
                        type="button"
                        onKeyDown={handleKeyDown}
                        aria-expanded={isActive}
                        whileHover={{ scale: 1.04, rotateX: 8, rotateY: 10 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 420, damping: 26 }}
                        className={`
              relative flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium tracking-tight
              ${isActive ? "text-white bg-gradient-to-b from-white/12 to-white/4 shadow-sm" : "text-slate-300 hover:text-white"}
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
              transform-gpu transition-all duration-300
            `}
                    >
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/15 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                        <span className="relative z-10">{item.label}</span>
                        <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.4 }}>
                            <ChevronDown className="h-4 w-4 text-slate-400" />
                        </motion.span>
                    </motion.button>

                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                ref={dropdownRef}
                                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 16, scale: 0.96 }}
                                className="absolute left-1/2 -translate-x-1/2 mt-5 z-50 perspective-[1100px]"
                                onMouseEnter={() => onToggle(item.label)}
                                onMouseLeave={() => onToggle(null)}
                            >
                                <motion.div
                                    whileHover={{ rotateX: -3, rotateY: 4 }}
                                    className="relative w-[560px] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-white/9 bg-slate-950/82 backdrop-blur-xl shadow-2xl shadow-black/35 overflow-hidden transform-gpu"
                                >
                                    <div className="px-7 py-5 border-b border-white/6 bg-gradient-to-r from-white/[0.02] to-transparent">
                                        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{item.label}</p>
                                    </div>
                                    <div className="p-6 grid grid-cols-2 gap-4">
                                        {item.subItems?.map((sub, i) => (
                                            <motion.div
                                                key={sub.label}
                                                initial={{ opacity: 0, y: 12 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.05 + i * 0.04 }}
                                            >
                                                <Link
                                                    href={sub.href}
                                                    onClick={() => onToggle(null)}
                                                    className="group relative flex items-start gap-4 p-4 rounded-xl border border-white/7 bg-white/[0.015] hover:border-indigo-400/25 hover:bg-white/[0.045] hover:shadow-md hover:shadow-indigo-500/10 transition-all duration-300"
                                                >
                                                    {sub.image ? (
                                                        <img src={sub.image} alt={sub.label} className="w-10 h-10 rounded-lg object-cover ring-1 ring-white/10" />
                                                    ) : (
                                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/25 to-teal-500/20 flex items-center justify-center ring-1 ring-white/10">
                                                            <Sparkles size={18} className="text-indigo-300/70" />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors">{sub.label}</span>
                                                            <ExternalLink className="h-3.5 w-3.5 text-slate-500 group-hover:text-indigo-300/80 transition-colors" />
                                                        </div>
                                                        {sub.description && (
                                                            <p className="mt-1 text-xs text-slate-500 group-hover:text-slate-400 line-clamp-2 transition-colors">
                                                                {sub.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="px-7 py-4 border-t border-white/6 bg-gradient-to-r from-white/[0.015] to-transparent">
                                        <Link href={`/${item.label.toLowerCase()}`} className="text-xs font-medium text-indigo-300 hover:text-indigo-200 flex items-center gap-2 transition-colors hover:translate-x-0.5">
                                            Ver todos {item.label.toLowerCase()}
                                            <ExternalLink className="h-3.5 w-3.5" />
                                        </Link>
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <motion.div
                    whileHover={{ scale: 1.05, rotateX: 9, rotateY: 11 }}
                    className="perspective-[900px]"
                >
                    {isInternalLink(item.href || "") ? (
                        <Link href={item.href || "/"} className="block px-5 py-2.5 rounded-full text-sm font-medium tracking-tight text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-300">
                            {item.label}
                        </Link>
                    ) : (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium tracking-tight text-slate-300 hover:text-white hover:bg-white/8 transition-all duration-300">
                            {item.label}
                            <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                        </a>
                    )}
                </motion.div>
            )}
        </div>
    );
});

// ============================================================================
// Mobile Menu Item (expande al tocar)
// ============================================================================

interface MobileMenuItemProps {
    item: MenuDataItem;
    onItemClick: () => void; // cierra el menú completo al seleccionar un link
}

const MobileMenuItem = memo(function MobileMenuItem({ item, onItemClick }: MobileMenuItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasSubItems = Boolean(item.subItems?.length);

    if (!hasSubItems) {
        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                <Link
                    href={item.href || "/"}
                    onClick={onItemClick}
                    className="block px-5 py-4 rounded-xl text-slate-200 hover:text-white hover:bg-white/8 border border-white/10 hover:border-indigo-400/30 transition-all duration-300"
                >
                    {item.label}
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="space-y-2">
            <motion.button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full px-5 py-4 rounded-xl text-slate-200 hover:text-white hover:bg-white/8 border border-white/10 hover:border-indigo-400/30 transition-all duration-300"
                aria-expanded={isExpanded}
            >
                <span className="font-medium">{item.label}</span>
                <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.4 }}>
                    <ChevronDown className="h-5 w-5" />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden pl-4 space-y-2"
                    >
                        {item.subItems?.map((sub) => (
                            <Link
                                key={sub.label}
                                href={sub.href}
                                onClick={onItemClick}
                                className="block px-5 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/6 border border-white/10 hover:border-indigo-400/20 transition-all duration-300"
                            >
                                {sub.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

// ============================================================================
// Navbar Principal
// ============================================================================

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const scrolled = useScrollPosition(20);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { user, loading: authLoading, logout } = useAuth();

    useClickOutside(containerRef, () => setIsMobileMenuOpen(false));

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
        setIsMobileMenuOpen(false);
    };

    return (
        <div ref={containerRef} className="relative z-50">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`
          fixed top-0 inset-x-0 transition-all duration-700
          ${scrolled ? "bg-slate-950/85 backdrop-blur-xl border-b border-white/8 shadow-xl shadow-black/25" : "bg-transparent"}
        `}
            >
                {scrolled && <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-teal-500/30" />}

                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
                    <div className="h-20 flex items-center justify-between">
                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.04 }}
                            onClick={() => router.push('/')}
                            className="cursor-pointer"
                        >
                            <div className="lg:hidden"><LogoTwo /></div>
                            <div className="hidden lg:block"><Logo /></div>
                        </motion.div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-2" onMouseLeave={() => setActiveDropdown(null)}>
                            {menuItems.map((item, i) => (
                                <motion.div key={item.label} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 + i * 0.04 }}>
                                    <DesktopMenuItem item={item} isActive={activeDropdown === item.label} onToggle={handleDropdownToggle} />
                                </motion.div>
                            ))}
                        </div>

                        {/* Auth Desktop */}
                        <div className="hidden lg:flex items-center gap-5">
                            {authLoading ? (
                                <div className="w-36 h-10 bg-white/6 rounded-full animate-pulse" />
                            ) : user ? (
                                <>
                                    <div className="flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.04] border border-white/9 hover:border-white/16 transition-all">
                                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center shadow-md shadow-indigo-500/25">
                                            <User size={18} className="text-white" />
                                        </div>
                                        <div className="hidden sm:block">
                                            <p className="text-sm font-medium text-white truncate max-w-[160px]">{user.name || "Usuario"}</p>
                                            <p className="text-xs text-slate-400 truncate max-w-[160px]">{user.email}</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        onClick={handleLogout}
                                        whileHover={{ scale: 1.04 }}
                                        className="px-5 py-2.5 rounded-full text-sm font-medium text-slate-300 hover:text-white hover:bg-white/7 transition-all flex items-center gap-2"
                                    >
                                        <LogOut size={16} />
                                        <span className="hidden sm:inline">Salir</span>
                                    </motion.button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                        Iniciar sesión
                                    </Link>
                                    <Link
                                        href="/register"
                                        className="relative px-7 py-2.5 rounded-full font-semibold text-sm text-white overflow-hidden shadow-lg shadow-indigo-600/20 bg-gradient-to-r from-indigo-600 via-teal-600 to-indigo-600 hover:scale-105 transition-transform duration-300"
                                    >
                                        Registrarse
                                        <Sparkles size={14} className="absolute right-4 top-1/2 -translate-y-1/2 opacity-80" />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Hamburger */}
                        <div className="lg:hidden">
                            <motion.button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                whileTap={{ scale: 0.92 }}
                                className={`p-3 rounded-full transition-all ${isMobileMenuOpen ? "bg-white/12 text-white" : "text-slate-300 hover:bg-white/7"}`}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl pt-20 overflow-y-auto"
                    >
                        <div className="px-5 py-8 space-y-3">
                            {menuItems.map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + i * 0.05 }}
                                >
                                    <MobileMenuItem item={item} onItemClick={handleMobileItemClick} />
                                </motion.div>
                            ))}

                            {/* Auth en mobile */}
                            <div className="pt-8 mt-6 border-t border-white/10 space-y-4">
                                {authLoading ? (
                                    <div className="h-12 bg-white/6 rounded-xl animate-pulse" />
                                ) : user ? (
                                    <>
                                        <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-white/[0.04] border border-white/10">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-teal-600 flex items-center justify-center">
                                                <User size={20} className="text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-white">{user.name || "Usuario"}</p>
                                                <p className="text-xs text-slate-400">{user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-5 py-4 rounded-xl text-slate-200 hover:text-white hover:bg-white/8 border border-white/10 hover:border-red-400/30 transition-all flex items-center justify-center gap-2"
                                        >
                                            <LogOut size={18} />
                                            Cerrar sesión
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login" onClick={handleMobileItemClick} className="block w-full px-5 py-4 text-center rounded-xl text-slate-200 hover:text-white hover:bg-white/8 border border-white/10 hover:border-indigo-400/30 transition-all">
                                            Iniciar sesión
                                        </Link>
                                        <Link href="/register" onClick={handleMobileItemClick} className="block w-full px-5 py-4 text-center rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-teal-600 hover:brightness-110 transition-all">
                                            Registrarse
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default memo(Navbar);