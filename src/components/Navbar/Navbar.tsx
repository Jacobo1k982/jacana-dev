"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Menu, X, ChevronDown, ExternalLink, Sparkles, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { menuItems } from "./menuData";
import Logo from "./Logo";
import LogoTwo from "./LogoTwo";
import type { MenuDataItem } from "./menuData";
import { useAuth } from "@/hooks/use-auth";

// Helpers
const isInternalLink = (href: string) =>
    href.startsWith("/") && !href.startsWith("//") && !href.startsWith("http");

// Hook para detectar scroll y aplicar borde estilo GitHub
function useScrollPosition(threshold = 10) {
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

// Hook actualizado con la firma corregida para aceptar null
function useClickOutside(ref: React.RefObject<HTMLElement | null>, callback: () => void) {
    useEffect(() => {
        const handle = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) callback();
        };
        document.addEventListener("mousedown", handle);
        return () => document.removeEventListener("mousedown", handle);
    }, [ref, callback]);
}

// ============================================================================
// Desktop Menu Item – GitHub Layout + Original Icons (WIDE & ELEGANT)
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

    // CORRECCIÓN ROBUSTA PARA EL ERROR "parameter 1 is not of type 'Node'"
    const handleMouseLeave = (e: React.MouseEvent) => {
        const related = e.relatedTarget;

        // 1. Verificamos que relatedTarget exista y sea un nodo DOM real
        if (!related || !(related instanceof Node)) {
            onToggle(null);
            return;
        }

        // 2. Verificamos si el ratón se movió hacia el dropdown actual
        if (dropdownRef.current && dropdownRef.current.contains(related)) {
            return;
        }

        // 3. Si salimos del contenedor hacia algo que no es el dropdown, cerramos
        onToggle(null);
    };

    return (
        <div
            className="relative h-full flex items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {hasSubItems ? (
                <>
                    <button
                        type="button"
                        aria-expanded={isActive}
                        className={`
                            flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150
                            ${isActive ? "text-white bg-[#161b22]" : "text-[#c9d1d9] hover:text-white"}
                        `}
                    >
                        {item.label}
                        <motion.span
                            animate={{ rotate: isActive ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="h-3 w-3 text-[#8b949e]" />
                        </motion.span>
                    </button>

                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                ref={dropdownRef}
                                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 w-[700px]"
                            >
                                <div className="rounded-md border border-[#30363d] bg-[#161b22] shadow-2xl shadow-black/60 overflow-hidden">

                                    <div className="px-5 py-4 border-b border-[#30363d] bg-[#0d1117]/50">
                                        <span className="text-xs font-bold text-[#8b949e] uppercase tracking-wider">
                                            {item.label}
                                        </span>
                                    </div>

                                    <div className="p-4 grid grid-cols-2 gap-3">
                                        {item.subItems?.map((sub) => (
                                            <Link
                                                key={sub.label}
                                                href={sub.href}
                                                onClick={() => onToggle(null)}
                                                className="group flex items-start gap-4 p-3 rounded-md hover:bg-[#21262d] transition-colors"
                                            >
                                                {/* Icono Original: Imagen o Sparkles */}
                                                {sub.image ? (
                                                    <img
                                                        src={sub.image}
                                                        alt={sub.label}
                                                        className="w-10 h-10 rounded-md object-cover ring-1 ring-[#30363d] flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="flex-shrink-0 w-10 h-10 rounded-md bg-[#21262d] border border-[#30363d] flex items-center justify-center ring-1 ring-[#30363d]">
                                                        <Sparkles size={18} className="text-[#8b949e] group-hover:text-[#58a6ff] transition-colors" />
                                                    </div>
                                                )}

                                                <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className="text-sm font-semibold text-[#c9d1d9] group-hover:text-white leading-tight">
                                                            {sub.label}
                                                        </span>
                                                        {/* Icono Original: ExternalLink */}
                                                        <ExternalLink className="h-3.5 w-3.5 text-[#8b949e] group-hover:text-[#58a6ff] flex-shrink-0" />
                                                    </div>
                                                    {sub.description && (
                                                        <p className="text-xs text-[#8b949e] leading-relaxed line-clamp-3">
                                                            {sub.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="border-t border-[#30363d] p-3 mt-1 bg-[#0d1117]/30">
                                        <Link
                                            href={`/${item.label.toLowerCase()}`}
                                            onClick={() => onToggle(null)}
                                            className="flex items-center justify-between px-3 py-2.5 text-xs font-semibold text-[#58a6ff] hover:text-[#79c0ff] hover:underline rounded-md hover:bg-[#21262d]/50 transition-colors"
                                        >
                                            <span>View all {item.label.toLowerCase()}</span>
                                            <ExternalLink className="h-3.5 w-3.5" />
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
                    className="px-3 py-2 text-sm font-medium text-[#c9d1d9] hover:text-white rounded-md transition-colors"
                >
                    {item.label}
                </Link>
            )}
        </div>
    );
});

// Mobile Menu Item
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
                className="block px-4 py-3 text-base text-[#c9d1d9] hover:text-white hover:bg-[#161b22] border-b border-[#30363d] last:border-0"
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
                className="flex items-center justify-between w-full px-4 py-3 text-base text-[#c9d1d9] hover:text-white hover:bg-[#161b22] border-b border-[#30363d]"
            >
                <span>{item.label}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-[#0d1117]"
                    >
                        <div className="p-2 grid grid-cols-1 gap-1">
                            {item.subItems?.map((sub) => (
                                <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={onItemClick}
                                    className="group flex items-start gap-3 p-3 rounded-md hover:bg-[#161b22] border border-[#21262d] hover:border-[#30363d] transition-colors"
                                >
                                    {/* Icono Original en Móvil */}
                                    {sub.image ? (
                                        <img
                                            src={sub.image}
                                            alt={sub.label}
                                            className="w-8 h-8 rounded object-cover border border-[#30363d] flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="flex-shrink-0 w-8 h-8 rounded bg-[#21262d] border border-[#30363d] flex items-center justify-center">
                                            <Sparkles size={14} className="text-[#8b949e] group-hover:text-[#58a6ff]" />
                                        </div>
                                    )}

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-sm font-semibold text-[#c9d1d9] mb-0.5">{sub.label}</span>
                                            <ExternalLink className="h-3 w-3 text-[#8b949e] flex-shrink-0" />
                                        </div>
                                        {sub.description && (
                                            <span className="text-xs text-[#8b949e] leading-snug line-clamp-2">
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
// Navbar Principal
// ============================================================================

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const scrolled = useScrollPosition(10);
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
                transition={{ duration: 0.5 }}
                className={`
                    fixed top-0 inset-x-0 h-16 transition-colors duration-200
                    bg-[#0d1117] 
                    ${scrolled ? "border-b border-[#30363d]" : "border-b border-transparent"}
                `}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
                    {/* Logo */}
                    <div
                        onClick={() => router.push("/")}
                        className="flex-shrink-0 cursor-pointer flex items-center gap-2 group"
                    >
                        <div className="lg:hidden text-white"><LogoTwo /></div>
                        <div className="hidden lg:block text-white"><Logo /></div>
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
                            <div className="h-8 w-24 bg-[#21262d] animate-pulse rounded-md" />
                        ) : user ? (
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 border border-[#30363d] cursor-pointer overflow-hidden">
                                    <img
                                        src={user.image ?? "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"}
                                        alt="Avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-white leading-tight">{user.name || "Usuario"}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="ml-2 text-xs font-medium text-[#8b949e] hover:text-white border border-[#30363d] bg-[#21262d] px-3 py-1.5 rounded-md hover:border-[#8b949e] transition-colors"
                                >
                                    Sign out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-medium text-[#c9d1d9] hover:text-white transition-colors">
                                    Sign in
                                </Link>
                                <Link
                                    href="/register"
                                    className="group relative inline-flex items-center justify-center px-4 py-1.5 text-sm font-semibold text-white transition-all duration-200 bg-[#238636] border border-transparent rounded-md hover:bg-[#2ea043] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#238636] focus:ring-offset-[#0d1117]"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-[#c9d1d9] hover:text-white p-2 focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                        className="lg:hidden fixed inset-0 z-40 pt-16 bg-[#0d1117] overflow-y-auto"
                    >
                        <div className="px-2 py-4 space-y-1">
                            {menuItems.map((item) => (
                                <MobileMenuItem key={item.label} item={item} onItemClick={handleMobileItemClick} />
                            ))}
                        </div>

                        {/* Mobile Auth */}
                        <div className="px-4 py-6 border-t border-[#30363d]">
                            {authLoading ? (
                                <div className="h-10 bg-[#21262d] rounded-md animate-pulse" />
                            ) : user ? (
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-3 pb-4 border-b border-[#30363d]">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-blue-500 overflow-hidden">
                                            <img
                                                src={user.avatar || ""}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{user.name || "Usuario"}</p>
                                            <p className="text-xs text-[#8b949e]">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full py-2.5 text-sm font-medium text-[#c9d1d9] hover:text-white hover:bg-[#21262d] rounded-md border border-[#30363d] transition-colors"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/login"
                                        onClick={handleMobileItemClick}
                                        className="w-full py-2.5 text-center text-sm font-medium text-[#c9d1d9] hover:text-white border border-[#30363d] rounded-md hover:bg-[#21262d] transition-colors"
                                    >
                                        Sign in
                                    </Link>
                                    <Link
                                        href="/register"
                                        onClick={handleMobileItemClick}
                                        className="w-full py-2.5 text-center text-sm font-semibold text-white bg-[#238636] rounded-md hover:bg-[#2ea043] transition-colors"
                                    >
                                        Sign up
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