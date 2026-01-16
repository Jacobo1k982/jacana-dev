"use client";

import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ExternalLink, Sparkles, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { menuItems } from "./menuData";
import Logo from "./Logo";
import LogoTwo from "./LogoTwo";
import type { MenuDataItem } from "./menuData.types";
import { useAuth } from "@/hooks/use-auth";

// Helper function to check if link is internal
const isInternalLink = (href: string) =>
    href.startsWith("/") && !href.startsWith("//") && !href.startsWith("http");

// ============================================================================
// Custom Hooks
// ============================================================================

/**
 * Hook to manage scroll state with throttling for performance
 */
function useScrollPosition(threshold: number = 12) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrolled(window.scrollY > threshold);
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    return scrolled;
}

/**
 * Hook to manage click outside behavior
 */
function useClickOutside(
    ref: React.RefObject<HTMLElement>,
    callback: () => void
) {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref, callback]);
}

/**
 * Hook to manage keyboard navigation for dropdowns
 */
function useDropdownKeyboard(
    isOpen: boolean,
    onClose: () => void,
    triggerRef: React.RefObject<HTMLButtonElement>,
    dropdownRef: React.RefObject<HTMLDivElement>
) {
    // Close on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
                triggerRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose, triggerRef]);

    // Focus trap for accessibility
    useEffect(() => {
        if (!isOpen || !dropdownRef.current) return;

        const focusableElements = dropdownRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        const handleTabKey = (e: KeyboardEvent) => {
            if (e.key !== "Tab") return;

            if (e.shiftKey) {
                // Shift + Tab
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                // Tab
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        // Auto focus first element
        firstElement.focus();

        dropdownRef.current.addEventListener("keydown", handleTabKey);
        return () => {
            dropdownRef.current?.removeEventListener("keydown", handleTabKey);
        };
    }, [isOpen, dropdownRef]);

    // Close on focus outside
    useEffect(() => {
        if (!isOpen) return;

        const handleFocusOutside = (e: FocusEvent) => {
            if (
                triggerRef.current &&
                dropdownRef.current &&
                !triggerRef.current.contains(e.target as Node) &&
                !dropdownRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };

        document.addEventListener("focusin", handleFocusOutside);
        return () => document.removeEventListener("focusin", handleFocusOutside);
    }, [isOpen, triggerRef, dropdownRef, onClose]);
}

/**
 * Hook to prevent body scroll when mobile menu is open
 */
function useBodyLock(isLocked: boolean) {
    useEffect(() => {
        if (isLocked) {
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.width = "100%";
        } else {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.position = "";
            document.body.style.width = "";
        };
    }, [isLocked]);
}

// ============================================================================
// Subcomponents
// ============================================================================

interface DesktopMenuItemProps {
    item: MenuDataItem;
    isActive: boolean;
    onToggle: (label: string) => void;
    onClose: () => void;
}

/**
 * Desktop menu item with dropdown support
 */
function DesktopMenuItem({ item, isActive, onToggle, onClose }: DesktopMenuItemProps) {
    const hasSubItems = Boolean(item.subItems?.length);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useDropdownKeyboard(isActive, onClose, triggerRef, dropdownRef);

    return (
        <div className="relative">
            {hasSubItems ? (
                <>
                    {/* Dropdown Trigger Button */}
                    <button
                        ref={triggerRef}
                        onClick={() => onToggle(item.label)}
                        onMouseEnter={() => onToggle(item.label)}
                        onFocus={() => onToggle(item.label)}
                        aria-expanded={isActive}
                        aria-haspopup="true"
                        aria-label={`${item.label} menu`}
                        className={`
              relative flex items-center gap-1.5 px-4 py-2 rounded-lg
              text-sm font-medium transition-all duration-200
              ${isActive
                                ? "text-white bg-white/8"
                                : "text-slate-300 hover:text-white hover:bg-white/5"
                            }
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50
              focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
            `}
                    >
                        <span>{item.label}</span>
                        <ChevronDown
                            className={`
                h-4 w-4 transition-transform duration-200
                ${isActive ? "rotate-180" : ""}
              `}
                            aria-hidden="true"
                        />

                        {/* Active indicator */}
                        {isActive && (
                            <motion.div
                                layoutId="activeDropdownIndicator"
                                className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-lg"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </button>

                    {/* Dropdown Menu */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                ref={dropdownRef}
                                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 8, scale: 0.98 }}
                                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                                className="absolute left-1/2 -translate-x-1/2 mt-3 z-50"
                                role="menu"
                                aria-label={`${item.label} submenu`}
                            >
                                <div className="relative">
                                    {/* Subtle glow effect */}
                                    <div
                                        className="absolute -inset-1 rounded-xl bg-gradient-to-br from-cyan-500/10 via-teal-500/10 to-emerald-500/10 blur-xl opacity-75"
                                        aria-hidden="true"
                                    />

                                    {/* Panel */}
                                    <div className="relative w-[480px] rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl overflow-hidden">
                                        {/* Header */}
                                        <div className="px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                                {item.label}
                                            </p>
                                        </div>

                                        {/* Grid Items */}
                                        <div className="p-4 grid grid-cols-2 gap-2">
                                            {item.subItems?.map((sub, i) => (
                                                <motion.div
                                                    key={sub.label}
                                                    initial={{ opacity: 0, y: 4 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{
                                                        delay: i * 0.03,
                                                        duration: 0.15,
                                                        ease: [0.4, 0, 0.2, 1],
                                                    }}
                                                >
                                                    <Link
                                                        href={sub.href}
                                                        role="menuitem"
                                                        className={`
                              group relative flex items-center gap-3 p-3 rounded-xl
                              border border-white/5 bg-white/[0.02]
                              transition-all duration-200
                              hover:border-cyan-400/30 hover:bg-white/[0.05]
                              hover:shadow-lg hover:shadow-cyan-500/5
                              focus-visible:outline-none focus-visible:ring-2
                              focus-visible:ring-cyan-400/50
                            `}
                                                    >
                                                        {/* Icon/Image */}
                                                        {sub.image ? (
                                                            <div className="relative flex-shrink-0">
                                                                <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                                                <img
                                                                    src={sub.image}
                                                                    alt={sub.label}
                                                                    className="relative w-9 h-9 rounded-lg object-cover ring-1 ring-white/10"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div className="relative flex-shrink-0 w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center ring-1 ring-white/10">
                                                                <Sparkles size={16} className="text-cyan-400/70" />
                                                            </div>
                                                        )}

                                                        {/* Content */}
                                                        <div className="flex flex-col min-w-0 flex-1">
                                                            <div className="flex items-center gap-1.5">
                                                                <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors truncate">
                                                                    {sub.label}
                                                                </span>
                                                                <ExternalLink
                                                                    className="h-3 w-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0"
                                                                    aria-hidden="true"
                                                                />
                                                            </div>
                                                            {sub.description && (
                                                                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                                                    {sub.description}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Hover gradient */}
                                                        <div
                                                            className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/0 via-transparent to-emerald-500/0 group-hover:from-cyan-500/5 group-hover:to-emerald-500/5 transition-colors duration-300"
                                                            aria-hidden="true"
                                                        />
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="px-5 py-3 border-t border-white/5 bg-white/[0.02]">
                                            <Link
                                                href={`/${item.label.toLowerCase()}`}
                                                className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                                            >
                                                View all {item.label.toLowerCase()}
                                                <ExternalLink className="h-3 w-3" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : isInternalLink(item.href || "") ? (
                /* Internal Link */
                <Link
                    href={item.href || "/"}
                    className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                >
                    {item.label}
                </Link>
            ) : (
                /* External Link */
                <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 inline-flex items-center gap-1"
                >
                    {item.label}
                    <ExternalLink className="h-3 w-3 opacity-50" aria-hidden="true" />
                </a>
            )}
        </div>
    );
}

interface MobileMenuItemProps {
    item: MenuDataItem;
    onItemClick: () => void;
}

/**
 * Mobile menu item with accordion support
 */
function MobileMenuItem({ item, onItemClick }: MobileMenuItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasSubItems = Boolean(item.subItems?.length);

    if (hasSubItems) {
        return (
            <div className="space-y-2">
                {/* Category Header */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold w-full"
                    aria-expanded={isExpanded}
                >
                    <Sparkles size={12} />
                    <span>{item.label}</span>
                    <ChevronDown
                        className={`
              h-4 w-4 ml-auto transition-transform duration-200
              ${isExpanded ? "rotate-180" : ""}
            `}
                        aria-hidden="true"
                    />
                </button>

                {/* Submenu Items */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                            className="space-y-1 ml-4 overflow-hidden"
                        >
                            {item.subItems?.map((sub) => (
                                <motion.div
                                    key={sub.label}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                >
                                    <Link
                                        href={sub.href}
                                        onClick={onItemClick}
                                        className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl
                      text-slate-300 hover:text-white
                      border border-transparent hover:border-cyan-400/10
                      hover:bg-gradient-to-r hover:from-cyan-500/5 hover:to-emerald-500/5
                      transition-all duration-200
                    `}
                                    >
                                        {sub.image ? (
                                            <img
                                                src={sub.image}
                                                alt={sub.label}
                                                className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/10"
                                            />
                                        ) : (
                                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                                        )}
                                        <div className="flex flex-col min-w-0 flex-1">
                                            <span className="text-sm font-medium truncate">{sub.label}</span>
                                            {sub.description && (
                                                <span className="text-xs text-slate-500 truncate">
                                                    {sub.description}
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        );
    }

    /* Simple Link Item */
    return (
        <Link
            href={item.href || "/"}
            onClick={onItemClick}
            className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-cyan-400/10 transition-all duration-200"
        >
            {item.label}
        </Link>
    );
}

// ============================================================================
// Main Component
// ============================================================================

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const scrolled = useScrollPosition(12);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const { user, loading: authLoading, logout } = useAuth();


    // Use body scroll lock when mobile menu is open
    useBodyLock(isMobileMenuOpen);

    // Handle click outside to close mobile menu
    useClickOutside(containerRef, () => setIsMobileMenuOpen(false));

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest('[role="menu"]') && !target.closest('[aria-haspopup="true"]')) {
                setActiveDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle mobile menu item click
    const handleMobileMenuItemClick = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    // Handle dropdown toggle
    const handleDropdownToggle = useCallback((label: string) => {
        setActiveDropdown((prev) => (prev === label ? null : label));
    }, []);

    // Handle logout
    const handleLogout = async () => {
        await logout();
        router.push("/");
        router.refresh();
        setIsMobileMenuOpen(false);
    };

    return (
        <div ref={containerRef} className="relative z-50">
            {/* Main Navigation */}
            <nav
                className={`
          fixed top-0 inset-x-0 transition-all duration-300
          ${scrolled
                        ? "bg-slate-950/90 backdrop-blur-xl border-b border-white/5"
                        : "bg-transparent"
                    }
        `}
                role="navigation"
                aria-label="Main navigation"
            >
                {/* Top accent line */}
                {scrolled && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/80 to-emerald-500/80"
                        aria-hidden="true"
                    />
                )}

                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="h-16 flex items-center justify-between">
                        {/* Logo */}
                        <div className="lg:hidden">
                            <LogoTwo />
                        </div>
                        <div className="hidden lg:block">
                            <Logo />
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden lg:flex items-center gap-1">
                            {menuItems.map((item) => (
                                <DesktopMenuItem
                                    key={item.label}
                                    item={item}
                                    isActive={activeDropdown === item.label}
                                    onToggle={handleDropdownToggle}
                                    onClose={() => setActiveDropdown(null)}
                                />
                            ))}
                        </div>

                        {/* Right Actions - Desktop */}
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Login Link */}
                            <Link
                                href="/login"
                                className="relative text-sm text-slate-400 hover:text-white transition-colors duration-200 group"
                            >
                                <span className="relative z-10">Iniciar sesión</span>
                                <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-200" />
                            </Link>

                            {/* Register Button */}
                            <Link
                                href="/register"
                                className="relative px-5 py-2.5 rounded-xl font-semibold text-sm text-white overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Registrarse
                                    <Sparkles size={14} className="opacity-70" />
                                </span>
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 transition-transform duration-300 group-hover:scale-105" />
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/20 to-emerald-400/0 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </Link>
                            {authLoading ? (
                                // Loading state
                                <div className="w-24 h-9 bg-white/5 rounded-lg animate-pulse" />
                            ) : user ? (
                                // Logged in state
                                <>
                                    <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center">
                                                <User size={16} className="text-white" />
                                            </div>
                                            <div className="hidden sm:block">
                                                <p className="text-sm font-medium text-white">{user.name || 'User'}</p>
                                                <p className="text-xs text-slate-400 truncate max-w-[120px]">{user.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="relative px-4 py-2.5 rounded-xl font-medium text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-200 flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50"
                                    >
                                        <LogOut size={16} />
                                        <span className="hidden sm:inline">Logout</span>
                                    </button>
                                </>
                            ) : (
                                // Logged out state
                                <>
                                    <Link
                                        href="/login"
                                        className="relative text-sm text-slate-400 hover:text-white transition-colors duration-200 group"
                                    >
                                        <span className="relative z-10">Iniciar sesión</span>
                                        <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-gradient-to-r from-cyan-400 to-emerald-400 group-hover:w-full transition-all duration-200" />
                                    </Link>

                                    <Link
                                        href="/register"
                                        className="relative px-5 py-2.5 rounded-xl font-semibold text-sm text-white overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Registrarse
                                            <Sparkles size={14} className="opacity-70" />
                                        </span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 transition-transform duration-300 group-hover:scale-105" />
                                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/20 to-emerald-400/0 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`
                  relative p-2 rounded-lg transition-all duration-200
                  ${isMobileMenuOpen
                                        ? "text-white bg-white/10"
                                        : "text-slate-400 hover:text-white hover:bg-white/5"
                                    }
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50
                `}
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200" />
                                <span className="relative">
                                    {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom subtle glow */}
                {scrolled && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-[1px] w-full bg-gradient-to-r from-slate-800 via-slate-700/50 to-slate-800"
                        aria-hidden="true"
                    />
                )}
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="lg:hidden fixed inset-0 z-40 bg-slate-950/98 backdrop-blur-xl pt-16 overflow-y-auto"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Mobile menu"
                    >
                        {/* Mobile menu accent */}
                        <div className="h-[1px] w-full bg-gradient-to-r from-cyan-500/50 via-emerald-500/50 to-transparent" aria-hidden="true" />

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            className="px-4 py-6 space-y-4"
                        >
                            {menuItems.map((item) => (
                                <MobileMenuItem
                                    key={item.label}
                                    item={item}
                                    onItemClick={handleMobileMenuItemClick}
                                />
                            ))}

                            {/* Mobile Actions */}
                            <div className="pt-4 space-y-3 border-t border-white/10 mt-6">
                                <Link
                                    href="/login"
                                    onClick={handleMobileMenuItemClick}
                                    className="block w-full px-4 py-3 rounded-xl text-center text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-cyan-400/10 transition-all duration-200"
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={handleMobileMenuItemClick}
                                    className="relative block w-full px-5 py-3.5 rounded-xl font-semibold text-sm text-center text-white overflow-hidden group"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        Registrarse
                                        <Sparkles size={14} className="opacity-70" />
                                    </span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500" />
                                </Link>
                                {authLoading ? (
                                    // Loading state
                                    <div className="w-full h-12 bg-white/5 rounded-lg animate-pulse" />
                                ) : user ? (
                                    // Logged in state
                                    <>
                                        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                                <User size={18} className="text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-medium text-white truncate">{user.name || 'User'}</p>
                                                <p className="text-xs text-slate-400 truncate">{user.email}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-red-400/10 transition-all duration-200 flex items-center justify-center gap-2"
                                        >
                                            <LogOut size={16} />
                                            Cerrar sesión
                                        </button>
                                    </>
                                ) : (
                                    // Logged out state
                                    <>
                                        <Link
                                            href="/login"
                                            onClick={handleMobileMenuItemClick}
                                            className="block w-full px-4 py-3 rounded-xl text-center text-slate-300 hover:text-white hover:bg-white/5 border border-transparent hover:border-cyan-400/10 transition-all duration-200"
                                        >
                                            Iniciar sesión
                                        </Link>
                                        <Link
                                            href="/register"
                                            onClick={handleMobileMenuItemClick}
                                            className="relative block w-full px-5 py-3.5 rounded-xl font-semibold text-sm text-center text-white overflow-hidden group"
                                        >
                                            <span className="relative z-10 flex items-center justify-center gap-2">
                                                Registrarse
                                                <Sparkles size={14} className="opacity-70" />
                                            </span>
                                            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500" />
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Export memoized component for performance
export default memo(Navbar);