"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type MotionProps } from "framer-motion";
import { ChevronDown, ExternalLink, Package, Zap } from "lucide-react";
import { menuItems } from "./menuData";

// ── TIPOS ────────────────────────────────────────────────────────────────

interface SubMenuItem {
    label: string;
    href: string;
    description?: string;
    image?: string;
}

interface MenuItemData {
    label: string;
    href?: string;
    subItems?: SubMenuItem[];
}

interface MenuItemProps {
    item: MenuItemData;
    isActive: boolean;
    onEnter: (label: string) => void;
    onLeave: () => void;
    onFocus: (label: string | null) => void;
    index: number;
}

// ── CUSTOM HOOK (Lógica de teclado) ──────────

function useDropdownKeyboard(isOpen: boolean, onClose: () => void) {
    const triggerRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
                triggerRef.current?.focus();
            }
        };

        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

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
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        firstElement.focus();
        dropdownRef.current.addEventListener("keydown", handleTabKey);

        return () => {
            dropdownRef.current?.removeEventListener("keydown", handleTabKey);
        };
    }, [isOpen]);

    return { triggerRef, dropdownRef };
}

// ── COMPONENTE INDIVIDUAL (Estilo Futurista) ───────────────────────────────────

function MenuItem({ item, isActive, onEnter, onLeave, onFocus }: MenuItemProps) {
    const hasSubItems = Boolean(item.subItems?.length);
    const { triggerRef, dropdownRef } = useDropdownKeyboard(isActive, onLeave);

    const handleClickOutside = useCallback(
        (e: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(e.target as Node) &&
                triggerRef.current &&
                !triggerRef.current.contains(e.target as Node)
            ) {
                onLeave();
            }
        },
        [dropdownRef, triggerRef, onLeave]
    );

    useEffect(() => {
        if (isActive) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isActive, handleClickOutside]);

    // Animación Fluida
    const motionProps: MotionProps = {
        initial: { opacity: 0, y: 10, scale: 0.95 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: 10, scale: 0.95 },
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    };

    return (
        <div
            className="relative h-full flex items-center"
            onMouseEnter={() => hasSubItems && onEnter(item.label)}
            onMouseLeave={onLeave}
        >
            {/* Trigger Button / Link */}
            {hasSubItems ? (
                <button
                    ref={triggerRef as React.RefObject<HTMLButtonElement>}
                    onClick={() => (isActive ? onLeave() : onEnter(item.label))}
                    onFocus={() => onFocus(item.label)}
                    onBlur={(e) => {
                        if (!dropdownRef.current?.contains(e.relatedTarget as Node)) {
                            onLeave();
                        }
                    }}
                    aria-expanded={isActive}
                    aria-haspopup="true"
                    className={`
                        flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative
                        ${isActive
                            ? "text-[#00FF9D] bg-[#00FF9D]/10 border border-[#00FF9D]/30"
                            : "text-[#8b949e] hover:text-white hover:bg-white/5 border border-transparent"
                        }
                        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FF9D] focus-visible:ring-offset-1 focus-visible:ring-offset-[#0d1117]
                    `}
                >
                    <span>{item.label}</span>
                    <motion.span
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className={`transition-colors duration-200 ${isActive ? 'text-[#00FF9D]' : 'text-[#8b949e]'}`}
                    >
                        <ChevronDown size={14} />
                    </motion.span>
                </button>
            ) : (
                <Link
                    ref={triggerRef as React.RefObject<HTMLAnchorElement>}
                    href={item.href || "/"}
                    onFocus={() => onFocus(null)}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-[#8b949e] hover:text-white hover:bg-white/5 transition-colors relative group border border-transparent"
                >
                    {item.label}
                    {/* Underline neon effect */}
                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-[#00FF9D] group-hover:w-4/5 transition-all duration-300 -translate-x-1/2 shadow-[0_0_5px_#00FF9D]" />
                </Link>
            )}

            {/* Dropdown */}
            <AnimatePresence>
                {isActive && hasSubItems && (
                    <motion.div
                        ref={dropdownRef}
                        {...motionProps}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 w-[420px]"
                    >
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-[#00FF9D]/10 blur-3xl rounded-2xl opacity-50" />

                        {/* Contenedor Principal */}
                        <div className="relative rounded-xl border border-[#30363d] bg-[#0d1117]/90 backdrop-blur-xl shadow-2xl overflow-hidden ring-1 ring-black/5">

                            {/* Scanline effect (sutil) */}
                            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 157, 0.1) 3px)' }} />

                            {/* Header de categoría */}
                            <div className="px-4 py-2.5 border-b border-[#30363d] bg-white/[0.02]">
                                <span className="text-xs font-bold text-[#00FF9D] uppercase tracking-widest flex items-center gap-2">
                                    <Zap size={12} />
                                    {item.label}
                                </span>
                            </div>

                            {/* Grid de Items */}
                            <div className="p-2 grid grid-cols-1 gap-1">
                                {item.subItems?.map((sub, i) => (
                                    <motion.div
                                        key={sub.label}
                                        initial={{ opacity: 0, x: -5 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.03, duration: 0.15 }}
                                    >
                                        <Link
                                            href={sub.href}
                                            className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-[#00FF9D]/20 relative overflow-hidden"
                                        >
                                            {/* Hover Glow dentro del item */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#00FF9D]/0 to-purple-500/0 group-hover:from-[#00FF9D]/5 group-hover:to-purple-500/5 transition-all duration-300" />

                                            {/* Icono o Imagen */}
                                            <div className="flex-shrink-0 mt-0.5 relative z-10">
                                                {sub.image ? (
                                                    <img
                                                        src={sub.image}
                                                        alt=""
                                                        className="w-10 h-10 rounded-md border border-[#30363d] object-cover bg-[#161b22] group-hover:border-[#00FF9D]/50 transition-colors shadow-[0_0_0_0_rgba(0,255,157,0)] group-hover:shadow-[0_0_8px_rgba(0,255,157,0.3)]"
                                                    />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-md border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#8b949e] group-hover:text-[#00FF9D] group-hover:border-[#00FF9D]/50 transition-all duration-200 shadow-[0_0_0_0_rgba(0,255,157,0)] group-hover:shadow-[0_0_8px_rgba(0,255,157,0.3)]">
                                                        <Package size={18} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Texto */}
                                            <div className="flex-1 min-w-0 relative z-10">
                                                <div className="flex items-center gap-1.5 mb-0.5">
                                                    <span className="text-sm font-semibold text-gray-200 group-hover:text-[#00FF9D] transition-colors">
                                                        {sub.label}
                                                    </span>
                                                    <ExternalLink className="h-3 w-3 text-[#00FF9D]/50 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
                                                </div>
                                                {sub.description && (
                                                    <p className="text-xs text-[#8b949e] leading-relaxed line-clamp-2 group-hover:text-gray-400 transition-colors">
                                                        {sub.description}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer "View all" */}
                            <div className="border-t border-[#30363d] px-2 py-1.5 bg-white/[0.01] mt-1">
                                <Link
                                    href={`/${item.label.toLowerCase()}`}
                                    className="flex items-center justify-between px-3 py-2 text-xs font-semibold text-[#00FF9D] hover:text-white hover:bg-[#00FF9D]/10 rounded-md transition-colors group"
                                >
                                    <span>Ver todo en {item.label.toLowerCase()}</span>
                                    <ExternalLink size={12} className="transform group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────

export default function MenuItemsUltra() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleMenuEnter = (label: string) => {
        setActiveMenu(label);
    };

    const handleMenuLeave = () => {
        setActiveMenu(null);
    };

    const handleFocus = (label: string | null) => {
        if (label !== activeMenu) {
            setActiveMenu(label);
        }
    };

    // Cerrar al hacer click fuera de la navegación
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest("nav")) {
                setActiveMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!isMounted) return null;

    return (
        <nav className="hidden lg:flex items-center h-full" role="navigation" aria-label="Navegación principal">
            <div className="flex items-center h-full gap-1">
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={item.label}
                        item={item}
                        isActive={activeMenu === item.label}
                        onEnter={handleMenuEnter}
                        onLeave={handleMenuLeave}
                        onFocus={handleFocus}
                        index={index}
                    />
                ))}
            </div>
        </nav>
    );
}