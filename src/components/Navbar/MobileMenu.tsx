"use client";

import { useState, memo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, badgeStyles } from "./menuData";
import type { BadgeVariant, MenuSubItem } from "./menuData";

// ============================================
// ICONOS SVG INLINE
// ============================================
const ChevronDown = ({ className, style, size = 16 }: { className?: string; style?: React.CSSProperties; size?: number }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m6 9 6 6 6-6" /></svg>
);

const Sparkles = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
);

const Zap = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);

// ============================================
// TEMA JACANA - Paleta de colores del logo
// ============================================
const THEME = {
    colors: {
        primary: '#005A9C',
        primaryLight: '#00A0E4',
        primaryDark: '#003D6B',
        textMain: '#ffffff',
        textMuted: '#C5C5C5',
        textDim: '#8B949E',
        bgSolid: '#0D1117',
        bgCard: '#161B22',
        border: '#30363D',
    }
};

// ============================================
// COMPONENTES AUXILIARES
// ============================================

// Badge Component
const MenuBadge = memo(({ badge, variant = 'default' }: { badge: string; variant?: BadgeVariant }) => {
    const styles = badgeStyles[variant];
    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full border ${styles.bg} ${styles.text} ${styles.border}`}
        >
            {badge}
        </span>
    );
});

// Hot Indicator - Efecto de pulso
const HotIndicator = memo(() => (
    <motion.span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: THEME.colors.primaryLight }}
        animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.6, 1],
            boxShadow: [`0 0 4px ${THEME.colors.primaryLight}`, `0 0 8px ${THEME.colors.primaryLight}`, `0 0 4px ${THEME.colors.primaryLight}`],
        }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
));

// Tag Component
const MenuTag = memo(({ tag }: { tag: string }) => (
    <span
        className="inline-flex items-center px-1.5 py-0.5 text-[9px] font-medium rounded"
        style={{
            backgroundColor: `${THEME.colors.primary}15`,
            color: THEME.colors.primaryLight,
            border: `1px solid ${THEME.colors.primary}30`
        }}
    >
        {tag}
    </span>
));

// SubItem con badge, tags y hot
const SubItemLink = memo(({ sub, onClose }: { sub: MenuSubItem; onClose: () => void }) => (
    <Link
        href={sub.href}
        onClick={onClose}
        className="flex items-start gap-3 px-4 py-2.5 text-sm rounded-lg transition-all group relative"
        style={{ color: THEME.colors.textDim }}
    >
        {/* Punto indicador */}
        <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full transition-all"
            style={{ backgroundColor: '#484f58' }}
        />

        <span
            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
            style={{
                backgroundColor: THEME.colors.primaryLight,
                boxShadow: `0 0 5px ${THEME.colors.primaryLight}`
            }}
        />

        <div className="ml-2 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="group-hover:text-[#00A0E4] transition-colors font-medium">
                    {sub.label}
                </span>
                {/* Hot indicator */}
                {sub.hot && <HotIndicator />}
                {/* Badge */}
                {sub.badge && (
                    <MenuBadge badge={sub.badge} variant={sub.badgeVariant} />
                )}
            </div>

            {/* Short description */}
            {sub.shortDesc && (
                <p className="text-xs text-[#6e7681] line-clamp-1 mt-0.5">
                    {sub.shortDesc}
                </p>
            )}

            {/* Tags */}
            {sub.tags && sub.tags.length > 0 && (
                <div className="flex items-center gap-1 flex-wrap mt-1">
                    {sub.tags.slice(0, 3).map((tag, i) => (
                        <MenuTag key={i} tag={tag} />
                    ))}
                </div>
            )}
        </div>

        <ChevronDown size={12} className="-rotate-90 opacity-50 group-hover:opacity-100 group-hover:text-[#00A0E4] transition-all mt-1" />
    </Link>
));

// ============================================
// COMPONENTE: Icono Hamburguesa Animado
// ============================================
const AnimatedHamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center">
        <motion.span
            className="absolute w-5 h-0.5 rounded-full"
            animate={{
                rotate: isOpen ? 45 : 0,
                y: isOpen ? 0 : -5,
                backgroundColor: isOpen ? THEME.colors.primaryLight : THEME.colors.textDim,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
        />
        <motion.span
            className="absolute w-5 h-0.5 rounded-full"
            animate={{
                opacity: isOpen ? 0 : 1,
                scale: isOpen ? 0 : 1,
                backgroundColor: THEME.colors.textDim,
            }}
            transition={{ duration: 0.15 }}
        />
        <motion.span
            className="absolute w-5 h-0.5 rounded-full"
            animate={{
                rotate: isOpen ? -45 : 0,
                y: isOpen ? 0 : 5,
                backgroundColor: isOpen ? THEME.colors.primaryLight : THEME.colors.textDim,
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
        />
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="absolute inset-0 rounded-full blur-md"
                    style={{ backgroundColor: `${THEME.colors.primaryLight}20` }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.5 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                />
            )}
        </AnimatePresence>
    </div>
);

// ============================================
// COMPONENTE PRINCIPAL
// ============================================
export default function MobileMenuUltra({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    const sidebarVariants = {
        closed: {
            x: "100%",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        open: {
            x: "0%",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
    } as const;

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* Overlay Oscuro */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-40"
                        style={{
                            backgroundColor: 'rgba(13, 17, 23, 0.8)',
                            backdropFilter: 'blur(8px)'
                        }}
                    >
                        <div
                            className="absolute inset-0 opacity-5"
                            style={{
                                backgroundImage: `linear-gradient(${THEME.colors.primaryLight} 1px, transparent 1px), linear-gradient(90deg, ${THEME.colors.primaryLight} 1px, transparent 1px)`,
                                backgroundSize: '40px 40px'
                            }}
                        />
                    </motion.div>

                    {/* Panel Lateral */}
                    <motion.aside
                        variants={sidebarVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed top-0 right-0 h-full w-full sm:w-[380px] z-50 max-h-screen flex flex-col"
                    >
                        <div
                            className="relative h-full flex flex-col overflow-hidden"
                            style={{
                                backgroundColor: 'rgba(13, 17, 23, 0.95)',
                                borderLeft: `1px solid ${THEME.colors.border}`,
                                backdropFilter: 'blur(24px)',
                                boxShadow: `0 0 40px ${THEME.colors.primary}20`
                            }}
                        >
                            {/* Línea superior brillante */}
                            <div
                                className="absolute top-0 left-0 right-0 h-px opacity-80"
                                style={{
                                    background: `linear-gradient(90deg, transparent, ${THEME.colors.primaryLight}, transparent)`
                                }}
                            />

                            {/* HEADER */}
                            <div
                                className="flex items-center justify-between px-5 py-4 border-b"
                                style={{
                                    borderColor: `${THEME.colors.border}80`,
                                    backgroundColor: 'rgba(0, 0, 0, 0.2)'
                                }}
                            >
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4" style={{ color: THEME.colors.primaryLight }} />
                                    <span
                                        className="text-xs font-bold tracking-[0.2em] uppercase"
                                        style={{ color: THEME.colors.textDim }}
                                    >
                                        Menú
                                    </span>
                                </div>

                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg transition-colors focus:outline-none relative group"
                                    style={{ color: THEME.colors.textDim }}
                                    aria-label="Cerrar menú"
                                >
                                    <AnimatedHamburgerIcon isOpen={true} />
                                </button>
                            </div>

                            {/* CONTENIDO SCROLLABLE */}
                            <div className="flex-1 overflow-y-auto relative z-10">
                                <div className="px-3 py-4 space-y-1.5">
                                    {menuItems.map((item, index) => {
                                        const isActive = activeMenu === item.label;

                                        return (
                                            <motion.div
                                                key={item.id || item.label}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                            >
                                                <button
                                                    onClick={() =>
                                                        item.subItems
                                                            ? setActiveMenu(isActive ? null : item.label)
                                                            : setIsOpen(false)
                                                    }
                                                    className="w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 relative group"
                                                    style={{
                                                        color: isActive ? THEME.colors.primaryLight : THEME.colors.textMuted,
                                                        backgroundColor: isActive ? `${THEME.colors.primaryLight}08` : 'transparent',
                                                        border: isActive ? `1px solid ${THEME.colors.primaryLight}20` : '1px solid transparent',
                                                        boxShadow: isActive ? `0 0 15px ${THEME.colors.primaryLight}05` : 'none'
                                                    }}
                                                >
                                                    <span className="flex items-center gap-2 relative z-10">
                                                        {item.label}
                                                        {item.badge && (
                                                            <MenuBadge badge={item.badge} variant={item.badgeVariant} />
                                                        )}
                                                        {item.hot && <HotIndicator />}
                                                        {isActive && (
                                                            <motion.span
                                                                initial={{ scale: 0, opacity: 0 }}
                                                                animate={{ scale: 1, opacity: 1 }}
                                                                style={{ color: THEME.colors.primaryLight }}
                                                            >
                                                                <Sparkles className="w-3 h-3" />
                                                            </motion.span>
                                                        )}
                                                    </span>

                                                    {item.subItems && (
                                                        <motion.span
                                                            animate={{ rotate: isActive ? 180 : 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            style={{ color: isActive ? THEME.colors.primaryLight : '#484f58' }}
                                                        >
                                                            <ChevronDown size={16} />
                                                        </motion.span>
                                                    )}

                                                    <div
                                                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                                                        style={{
                                                            background: `linear-gradient(90deg, ${THEME.colors.primaryLight}05, transparent)`
                                                        }}
                                                    />
                                                </button>

                                                {/* SubItems */}
                                                <AnimatePresence>
                                                    {item.subItems && isActive && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div
                                                                className="flex flex-col gap-0.5 py-2 pl-4 mt-1 ml-5"
                                                                style={{ borderLeft: `1px solid ${THEME.colors.border}50` }}
                                                            >
                                                                {item.subItems.map((sub) => (
                                                                    <SubItemLink
                                                                        key={sub.id || sub.label}
                                                                        sub={sub}
                                                                        onClose={() => setIsOpen(false)}
                                                                    />
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div
                                className="p-4 border-t relative z-10"
                                style={{
                                    borderColor: THEME.colors.border,
                                    backgroundColor: THEME.colors.bgSolid
                                }}
                            >
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                                    style={{
                                        background: `linear-gradient(to top, ${THEME.colors.bgSolid}, transparent)`
                                    }}
                                />

                                <div className="flex flex-col gap-2.5 relative">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full px-5 py-2.5 text-sm font-medium text-center rounded-lg transition-all"
                                        style={{
                                            color: THEME.colors.textMuted,
                                            border: `1px solid ${THEME.colors.border}`,
                                        }}
                                    >
                                        Iniciar sesión
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="group relative w-full px-5 py-2.5 text-sm font-semibold text-center rounded-lg overflow-hidden transition-all duration-200"
                                        style={{
                                            color: '#000',
                                            background: `linear-gradient(135deg, ${THEME.colors.primary}, ${THEME.colors.primaryLight})`,
                                            boxShadow: `0 0 15px ${THEME.colors.primaryLight}30`
                                        }}
                                    >
                                        <span className="relative flex items-center justify-center gap-2">
                                            Crear cuenta
                                            <Sparkles className="w-3.5 h-3.5" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
