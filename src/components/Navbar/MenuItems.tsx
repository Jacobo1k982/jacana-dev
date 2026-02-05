"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type MotionProps } from "framer-motion";
import { ChevronDown, ExternalLink, Package } from "lucide-react";
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

// ── CUSTOM HOOK (Sin cambios en lógica, solo ajustado visualmente) ──────────

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

// ── COMPONENTE INDIVIDUAL (Estilo GitHub) ───────────────────────────────────

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

    // Animación GitHub (rápida y precisa)
    const motionProps: MotionProps = {
        initial: { opacity: 0, y: 5 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 5 },
        transition: { duration: 0.15, ease: "easeOut" },
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
                        flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                        ${isActive ? "text-white bg-[#161b22]" : "text-[#c9d1d9] hover:text-white hover:bg-[#161b22]"}
                        focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#58a6ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0d1117]
                    `}
                >
                    <span>{item.label}</span>
                    <motion.span
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#8b949e]"
                    >
                        <ChevronDown size={14} />
                    </motion.span>
                </button>
            ) : (
                <Link
                    ref={triggerRef as React.RefObject<HTMLAnchorElement>}
                    href={item.href || "/"}
                    onFocus={() => onFocus(null)}
                    className="px-3 py-2 rounded-md text-sm font-medium text-[#c9d1d9] hover:text-white hover:bg-[#161b22] transition-colors"
                >
                    {item.label}
                </Link>
            )}

            {/* Dropdown */}
            <AnimatePresence>
                {isActive && hasSubItems && (
                    <motion.div
                        ref={dropdownRef}
                        {...motionProps}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 w-[380px]"
                    >
                        {/* Contenedor estilo GitHub */}
                        <div className="rounded-md border border-[#30363d] bg-[#161b22] shadow-2xl overflow-hidden ring-1 ring-black/5">

                            {/* Header de categoría */}
                            <div className="px-3 py-2 border-b border-[#30363d] bg-[#0d1117]/50">
                                <span className="text-xs font-bold text-[#8b949e] uppercase tracking-wider">
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
                                        transition={{ delay: i * 0.03, duration: 0.1 }}
                                    >
                                        <Link
                                            href={sub.href}
                                            className="group flex items-start gap-3 p-2.5 rounded-md hover:bg-[#21262d] transition-colors"
                                        >
                                            {/* Icono o Imagen */}
                                            <div className="flex-shrink-0 mt-0.5">
                                                {sub.image ? (
                                                    <img
                                                        src={sub.image}
                                                        alt=""
                                                        className="w-8 h-8 rounded-sm border border-[#30363d] object-cover bg-[#0d1117]"
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-sm border border-[#30363d] bg-[#21262d] flex items-center justify-center text-[#8b949e] group-hover:text-[#58a6ff]">
                                                        <Package size={16} />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Texto */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-1.5 mb-0.5">
                                                    <span className="text-sm font-semibold text-[#c9d1d9] group-hover:text-white transition-colors">
                                                        {sub.label}
                                                    </span>
                                                    <ExternalLink className="h-3 w-3 text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                                {sub.description && (
                                                    <p className="text-xs text-[#8b949e] leading-relaxed line-clamp-2 group-hover:text-[#8b949e]">
                                                        {sub.description}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer "View all" */}
                            <div className="border-t border-[#30363d] px-2 py-1.5 bg-[#0d1117]/30 mt-1">
                                <Link
                                    href={`/${item.label.toLowerCase()}`}
                                    className="flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-[#58a6ff] hover:text-[#79c0ff] hover:underline rounded-md hover:bg-[#21262d]/50 transition-colors"
                                >
                                    <span>View all {item.label.toLowerCase()}</span>
                                    <ExternalLink size={12} />
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