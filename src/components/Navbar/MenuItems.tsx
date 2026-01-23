"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type MotionProps } from "framer-motion";
import { ChevronDown, ExternalLink } from "lucide-react";
import { menuItems } from "./menuData";

// ── TIPOS ────────────────────────────────────────────────────────────────

interface SubMenuItem {
    label: string;
    href: string;
    description?: string;
    image?: string; // opcional, ruta o URL de imagen
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

// ── CUSTOM HOOK ──────────────────────────────────────────────────────────

function useDropdownKeyboard(isOpen: boolean, onClose: () => void) {
    const triggerRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cerrar con Escape
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

    // Focus trap (accesibilidad)
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

// ── COMPONENTE INDIVIDUAL ────────────────────────────────────────────────

function MenuItem({ item, isActive, onEnter, onLeave, onFocus, index }: MenuItemProps) {
    const hasSubItems = Boolean(item.subItems?.length);
    const { triggerRef, dropdownRef } = useDropdownKeyboard(isActive, onLeave);

    // Cerrar al hacer click fuera
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

    const motionProps: MotionProps = {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 8 },
        transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => hasSubItems && onEnter(item.label)}
            onMouseLeave={onLeave}
        >
            {/* Trigger */}
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
                    aria-label={`${item.label} menú`}
                    className={`
            group relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg
            text-sm font-medium transition-all duration-200
            ${isActive ? "text-white bg-white/8" : "text-slate-300 hover:text-white hover:bg-white/5"}
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50
            focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
          `}
                >
                    <span>{item.label}</span>
                    <ChevronDown
                        className={`
              h-4 w-4 transition-transform duration-200
              ${isActive ? "rotate-180" : "group-hover:rotate-90"}
            `}
                        aria-hidden="true"
                    />

                    {isActive && (
                        <motion.div
                            layoutId="activeIndicator"
                            className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 rounded-lg pointer-events-none"
                            initial={false}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    )}
                </button>
            ) : (
                <Link
                    ref={triggerRef as React.RefObject<HTMLAnchorElement>}
                    href={item.href || "/"}
                    onFocus={() => onFocus(null)}
                    className={`
            group relative flex items-center gap-1.5 px-4 py-2.5 rounded-lg
            text-sm font-medium transition-all duration-200
            text-slate-300 hover:text-white hover:bg-white/5
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50
            focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
          `}
                >
                    <span>{item.label}</span>
                </Link>
            )}

            {/* Dropdown */}
            <AnimatePresence mode="wait">
                {isActive && hasSubItems && (
                    <motion.div
                        ref={dropdownRef}
                        {...motionProps}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50"
                        role="menu"
                        aria-label={`${item.label} submenú`}
                    >
                        <div className="relative">
                            <div
                                className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-pink-500/10 blur-xl opacity-75 pointer-events-none"
                                aria-hidden="true"
                            />

                            <div
                                className={`
                  relative w-[480px] rounded-2xl border border-white/10
                  bg-slate-900/95 backdrop-blur-xl shadow-2xl overflow-hidden
                `}
                            >
                                <div className="px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                                        {item.label}
                                    </p>
                                </div>

                                <div className="p-4 grid grid-cols-2 gap-2">
                                    {item.subItems?.map((sub, i) => (
                                        <motion.div
                                            key={sub.label}
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.03, duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
                                        >
                                            <Link
                                                href={sub.href}
                                                role="menuitem"
                                                className={`
                          group relative flex flex-col gap-2.5 rounded-xl
                          border border-white/5 bg-white/[0.02] p-4
                          transition-all duration-200
                          hover:border-cyan-400/30 hover:bg-white/[0.05]
                          hover:shadow-lg hover:shadow-cyan-500/5
                          focus-visible:outline-none focus-visible:ring-2
                          focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2
                          focus-visible:ring-offset-slate-950
                        `}
                                            >
                                                {sub.image && (
                                                    <div className="relative">
                                                        <div
                                                            className={`
                                absolute -inset-0.5 rounded-lg bg-gradient-to-br
                                from-cyan-400/20 to-violet-400/20 blur-sm
                                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                              `}
                                                            aria-hidden="true"
                                                        />
                                                        <div className="relative h-10 w-10 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden">
                                                            {/* Aquí puedes usar <Image src={sub.image} ... /> si usas next/image */}
                                                            <span className="text-xl">{getImageEmoji(sub.label)}</span>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                                                            {sub.label}
                                                        </span>
                                                        <ExternalLink
                                                            className="h-3 w-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                                            aria-hidden="true"
                                                        />
                                                    </div>

                                                    {sub.description && (
                                                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                                                            {sub.description}
                                                        </p>
                                                    )}
                                                </div>

                                                <div
                                                    className={`
                            absolute inset-0 rounded-xl bg-gradient-to-br
                            from-cyan-500/0 via-transparent to-violet-500/0
                            group-hover:from-cyan-500/5 group-hover:to-violet-500/5
                            transition-colors duration-300 pointer-events-none
                          `}
                                                    aria-hidden="true"
                                                />
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="px-5 py-3 border-t border-white/5 bg-white/[0.02]">
                                    <Link
                                        href={`/${item.label.toLowerCase()}`}
                                        className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                                    >
                                        Ver todos {item.label.toLowerCase()}
                                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// ── HELPER ───────────────────────────────────────────────────────────────

function getImageEmoji(label: string): string {
    const emojiMap: Record<string, string> = {
        "Smart Home": "🏠",
        Wearables: "⌚",
        Accessories: "🎧",
        Software: "💻",
        Enterprise: "🏢",
        "Small Business": "🏪",
        Education: "📚",
        Healthcare: "🏥",
    };
    return emojiMap[label] || "📦";
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

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest("nav")) {
                setActiveMenu(null);
            }
        };

        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    if (!isMounted) return null;

    return (
        <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Navegación principal">
            <motion.div
                className="flex items-center gap-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            >
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
            </motion.div>
        </nav>
    );
}