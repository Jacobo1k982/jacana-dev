"use client";

<<<<<<< Updated upstream
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { ChevronDown, ExternalLink, Sparkles, LogOut, ArrowRight, Zap } from "lucide-react";
=======
import { useState, useEffect, useRef, useCallback, memo, KeyboardEvent } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
>>>>>>> Stashed changes
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { menuItems, badgeStyles } from "./menuData";
import Logo from "./Logo";
import LogoTwo from "./LogoTwo";
import type { MenuDataItem, MenuSubItem, BadgeVariant } from "./menuData";
import { useAuth } from "@/hooks/use-auth";
import MobileMenuUltra from "./MobileMenu";

// ============================================
<<<<<<< Updated upstream
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
=======
// ICONOS SVG INLINE (evitar dependencias)
// ============================================
const ChevronDown = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m6 9 6 6 6-6" /></svg>
);

const ExternalLink = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
);

const Sparkles = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /><path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" /></svg>
);

const LogOut = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
);

const ArrowRight = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

const Zap = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
);

const Bell = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
);

const Search = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
);

const Command = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" /></svg>
);

// ============================================
// CONFIGURACIÓN TEMA JACANA FUTURISTA
// Paleta basada en el logo Jacana Developers
// ============================================
const THEME = {
    colors: {
        // Colores principales del logo Jacana
        primary: '#005A9C',       // Azul profundo
        primaryLight: '#00A0E4',  // Azul brillante
        primaryDark: '#003D6B',   // Azul oscuro

        // Colores de interfaz
        textMain: '#ffffff',
        textMuted: '#C5C5C5',
        textDim: '#8B949E',

        // Fondos
        bgGlass: 'rgba(30, 33, 36, 0.85)',
        bgSolid: '#1E2124',
        bgCard: '#2D3136',
        bgHover: '#363B41',

        // Bordes
        border: '#3D4248',
        borderHover: '#00A0E4',
        borderActive: '#005A9C',

        // Estados
        success: '#00A0E4',
        danger: '#F85149',
        warning: '#D29922',
    },
    shadows: {
        glow: '0 0 20px rgba(0, 160, 228, 0.25)',
        glowHover: '0 0 30px rgba(0, 160, 228, 0.4)',
        glowIntense: '0 0 40px rgba(0, 160, 228, 0.5)',
        card: '0 8px 32px rgba(0, 0, 0, 0.4)',
        dropdown: '0 16px 48px rgba(0, 0, 0, 0.5)',
    }
};

// ============================================
// HOOKS PERSONALIZADOS
// ============================================

// Hook para detectar scroll con threshold
>>>>>>> Stashed changes
function useScrollPosition(threshold = 0) {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > threshold);
    });

    return scrolled;
}

// Click Outside hook
function useClickOutside(ref: React.RefObject<HTMLElement | null>, callback: () => void, enabled = true) {
    useEffect(() => {
        if (!enabled) return;
        const handle = (e: MouseEvent | TouchEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) callback();
        };
        document.addEventListener("mousedown", handle, { passive: true });
        document.addEventListener("touchstart", handle, { passive: true });
        return () => {
            document.removeEventListener("mousedown", handle);
            document.removeEventListener("touchstart", handle);
        };
    }, [ref, callback, enabled]);
}

<<<<<<< Updated upstream
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
=======
// Keyboard navigation hook
function useKeyboardNavigation(items: string[], active: string | null, onSelect: (item: string) => void, onClose: () => void) {
    return useCallback((e: KeyboardEvent) => {
        if (!active) return;
        const currentIndex = items.indexOf(active);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const next = items[(currentIndex + 1) % items.length];
            onSelect(next);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prev = items[(currentIndex - 1 + items.length) % items.length];
            onSelect(prev);
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
    }, [active, items, onSelect, onClose]);
}

// ============================================
// COMPONENTES AUXILIARES
// ============================================

// Avatar helper
const avatarSrc = (user: any) => user?.image;

// Animated Grid Pattern Background
const CyberGridPattern = memo(() => (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div
            className="w-full h-full"
            style={{
                backgroundImage: `
          linear-gradient(rgba(0, 160, 228, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 160, 228, 0.3) 1px, transparent 1px)
        `,
                backgroundSize: '60px 60px'
            }}
        />
        {/* Animated gradient overlay */}
        <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#00A0E4]/5 via-transparent to-[#005A9C]/5"
            animate={{
                opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />
    </div>
));

// Scanning Line Effect - más sutil y elegante
const ScanningLine = memo(() => (
    <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
            background: `linear-gradient(90deg, transparent, ${THEME.colors.primaryLight}, transparent)`,
        }}
        animate={{
            opacity: [0, 0.8, 0],
            scaleX: [0.3, 1, 0.3],
        }}
        transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
));

// Animated Hamburger Icon - más elegante
const AnimatedHamburgerIcon = memo(({ isOpen }: { isOpen: boolean }) => (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center">
        {[0, 1, 2].map((i) => (
            <motion.span
                key={i}
                className="absolute w-5 h-0.5 rounded-full origin-center"
                style={{ backgroundColor: THEME.colors.primaryLight }}
                animate={{
                    rotate: isOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                    y: isOpen ? (i === 1 ? 0 : i === 0 ? 6 : -6) : (i - 1) * 6,
                    opacity: isOpen ? (i === 1 ? 0 : 1) : 1,
                    scale: isOpen && i === 1 ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            />
        ))}
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="absolute inset-0 rounded-full blur-xl"
                    style={{ backgroundColor: `${THEME.colors.primaryLight}30` }}
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 2 }}
                    exit={{ opacity: 0, scale: 0.3 }}
                    transition={{ duration: 0.25 }}
                />
            )}
        </AnimatePresence>
    </div>
));

// Notification Badge - estilo Jacana
const NotificationBadge = memo(({ count }: { count?: number }) => (
    <span
        className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1.5 flex items-center justify-center text-[10px] font-bold rounded-full border-2"
        style={{
            backgroundColor: THEME.colors.primaryLight,
            color: '#000',
            borderColor: THEME.colors.bgSolid,
            boxShadow: `0 0 10px ${THEME.colors.primaryLight}50`
        }}
    >
        {count ?? '•'}
    </span>
));

// Elegant Tooltip - estilo Jacana
const ElegantTooltip = memo(({ children, text }: { children: React.ReactNode; text: string }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 text-xs font-medium text-white rounded-lg whitespace-nowrap z-50"
                        style={{
                            backgroundColor: THEME.colors.bgCard,
                            border: `1px solid ${THEME.colors.border}`,
                            boxShadow: THEME.shadows.card
                        }}
                    >
                        {text}
                        <div
                            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                            style={{
                                backgroundColor: THEME.colors.bgCard,
                                borderLeft: `1px solid ${THEME.colors.border}`,
                                borderTop: `1px solid ${THEME.colors.border}`
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
});

// Badge Component - Para mostrar badges en items
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

// Hot Indicator - Efecto de pulso para items destacados
const HotIndicator = memo(() => (
    <motion.span
        className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
        style={{ backgroundColor: THEME.colors.primaryLight }}
        animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.7, 1],
            boxShadow: [`0 0 5px ${THEME.colors.primaryLight}`, `0 0 10px ${THEME.colors.primaryLight}`, `0 0 5px ${THEME.colors.primaryLight}`],
        }}
        transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
));

// Tag Component - Para mostrar tags en subitems
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

// ============================================
// DESKTOP MENU ITEM
// ============================================
>>>>>>> Stashed changes

interface DesktopMenuItemProps {
    item: MenuDataItem;
    isActive: boolean;
    onToggle: (label: string | null) => void;
    path: string;
}

const DesktopMenuItem = memo(function DesktopMenuItem({
    item,
    isActive,
    onToggle,
    path,
}: DesktopMenuItemProps) {
    const hasSubItems = Boolean(item.subItems?.length);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isCurrentPath = item.href && path === item.href;

<<<<<<< Updated upstream
    const handleMouseEnter = () => onToggle(item.label);
=======
    const handleMouseEnter = () => hasSubItems && onToggle(item.label);
>>>>>>> Stashed changes
    const handleMouseLeave = (e: React.MouseEvent) => {
        const related = e.relatedTarget;
        if (!related || !(related instanceof Node)) {
            onToggle(null);
            return;
        }
        if (dropdownRef.current?.contains(related)) return;
        onToggle(null);
    };

    return (
        <div
            className="relative h-full flex items-center"
<<<<<<< Updated upstream
            onMouseEnter={hasSubItems ? handleMouseEnter : undefined}
=======
            onMouseEnter={handleMouseEnter}
>>>>>>> Stashed changes
            onMouseLeave={hasSubItems ? handleMouseLeave : undefined}
        >
            {hasSubItems ? (
                <>
                    <button
                        type="button"
                        aria-expanded={isActive}
<<<<<<< Updated upstream
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
=======
                        aria-haspopup="true"
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group"
                        style={{
                            color: isActive ? THEME.colors.primaryLight : isCurrentPath ? THEME.colors.textMain : THEME.colors.textDim,
                            backgroundColor: isActive ? `${THEME.colors.primary}15` : 'transparent',
                        }}
                    >
                        {item.label}

                        {/* Badge */}
                        {item.badge && (
                            <MenuBadge badge={item.badge} variant={item.badgeVariant} />
                        )}

                        {/* Hot Indicator */}
                        {item.hot && <HotIndicator />}

                        <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.25 }}>
                            <ChevronDown
                                className={`h-3.5 w-3.5 transition-colors duration-300`}
                                style={{ color: isActive ? THEME.colors.primaryLight : THEME.colors.textDim }}
                            />
>>>>>>> Stashed changes
                        </motion.span>

                        {/* Animated underline */}
                        <motion.span
                            className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                            style={{
                                backgroundColor: THEME.colors.primaryLight,
                                boxShadow: `0 0 8px ${THEME.colors.primaryLight}`
                            }}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{
                                width: isActive ? '60%' : 0,
                                opacity: isActive ? 1 : 0
                            }}
                            transition={{ duration: 0.25 }}
                        />
                    </button>

                    <AnimatePresence>
                        {isActive && (
                            <motion.div
                                ref={dropdownRef}
<<<<<<< Updated upstream
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
=======
                                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 w-[700px]"
                                role="menu"
                            >
                                {/* Outer Glow - más elegante */}
                                <div
                                    className="absolute -inset-1 rounded-2xl blur-xl"
                                    style={{ backgroundColor: `${THEME.colors.primaryLight}10` }}
                                />

                                {/* Main Container */}
                                <div
                                    className="relative rounded-xl overflow-hidden"
                                    style={{
                                        backgroundColor: `${THEME.colors.bgSolid}f2`,
                                        backdropFilter: 'blur(20px)',
                                        border: `1px solid ${THEME.colors.border}`,
                                        boxShadow: THEME.shadows.dropdown
                                    }}
                                >
                                    {/* Animated Top Border */}
                                    <motion.div
                                        className="absolute top-0 left-0 right-0 h-px"
                                        style={{
                                            background: `linear-gradient(90deg, transparent, ${THEME.colors.primaryLight}, transparent)`
                                        }}
                                        initial={{ scaleX: 0, opacity: 0 }}
                                        animate={{ scaleX: 1, opacity: 1 }}
                                        transition={{ duration: 0.4 }}
                                    />

                                    {/* Header */}
                                    <div
                                        className="px-6 py-4 border-b"
                                        style={{
                                            borderColor: THEME.colors.border,
                                            background: `linear-gradient(90deg, ${THEME.colors.bgSolid}, ${THEME.colors.bgCard}, ${THEME.colors.bgSolid})`
                                        }}
                                    >
                                        <span
                                            className="text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2"
                                            style={{ color: THEME.colors.primaryLight }}
                                        >
                                            <Zap className="w-3.5 h-3.5 animate-pulse" />
>>>>>>> Stashed changes
                                            {item.label}
                                        </span>
                                    </div>

<<<<<<< Updated upstream
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
=======
                                    {/* Grid de Items */}
                                    <div className="p-3 grid grid-cols-2 gap-1.5">
                                        {item.subItems?.map((sub, index) => (
                                            <motion.div
                                                key={sub.id || sub.label}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05, duration: 0.2 }}
                                            >
                                                <Link
                                                    href={sub.href}
                                                    onClick={() => onToggle(null)}
                                                    className="group relative flex items-start gap-4 p-3 rounded-xl transition-all duration-300 overflow-hidden"
                                                    style={{
                                                        border: '1px solid transparent',
                                                    }}
                                                    role="menuitem"
                                                >
                                                    {/* Hover Background */}
                                                    <motion.div
                                                        className="absolute inset-0 rounded-xl"
                                                        style={{ backgroundColor: `${THEME.colors.primary}10` }}
                                                        initial={{ opacity: 0 }}
                                                        whileHover={{ opacity: 1 }}
                                                        transition={{ duration: 0.2 }}
                                                    />

                                                    {/* Hover Border */}
                                                    <div
                                                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                        style={{ border: `1px solid ${THEME.colors.primary}30` }}
                                                    />

                                                    {/* Icon */}
                                                    <div className="relative z-10 flex-shrink-0">
                                                        {sub.image ? (
                                                            <motion.img
                                                                src={sub.image}
                                                                alt={sub.label}
                                                                className="w-12 h-12 rounded-xl object-cover"
                                                                style={{
                                                                    border: `1px solid ${THEME.colors.border}`,
                                                                }}
                                                                whileHover={{ scale: 1.05, rotate: 2 }}
                                                                transition={{ type: "spring", stiffness: 300 }}
                                                            />
                                                        ) : (
                                                            <motion.div
                                                                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 relative"
                                                                style={{
                                                                    backgroundColor: THEME.colors.bgCard,
                                                                    border: `1px solid ${THEME.colors.border}`
                                                                }}
                                                                whileHover={{ scale: 1.05 }}
                                                            >
                                                                <Sparkles
                                                                    className="w-5 h-5 transition-colors duration-300"
                                                                    style={{ color: THEME.colors.textDim }}
                                                                />
                                                                {/* Hot indicator on icon */}
                                                                {sub.hot && <HotIndicator />}
                                                            </motion.div>
                                                        )}
                                                        {/* Hot indicator on image */}
                                                        {sub.hot && sub.image && <HotIndicator />}
                                                    </div>

                                                    {/* Content */}
                                                    <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-center">
                                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                            <span
                                                                className="text-sm font-semibold transition-colors duration-300"
                                                                style={{ color: THEME.colors.textMain }}
                                                            >
                                                                {sub.label}
                                                            </span>
                                                            {/* Badge */}
                                                            {sub.badge && (
                                                                <MenuBadge badge={sub.badge} variant={sub.badgeVariant} />
                                                            )}
                                                            <ExternalLink
                                                                className="h-3 w-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-1 group-hover:translate-x-0"
                                                                style={{ color: THEME.colors.primaryLight }}
                                                            />
                                                        </div>

                                                        {/* Short Description or Description */}
                                                        {(sub.shortDesc || sub.description) && (
                                                            <p
                                                                className="text-xs leading-relaxed line-clamp-2 transition-colors duration-300 mb-2"
                                                                style={{ color: THEME.colors.textDim }}
                                                            >
                                                                {sub.shortDesc || sub.description}
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
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Footer CTA */}
                                    <div
                                        className="border-t p-3"
                                        style={{
                                            borderColor: THEME.colors.border,
                                            backgroundColor: `${THEME.colors.bgSolid}80`
                                        }}
                                    >
                                        <Link
                                            href={`/${item.label.toLowerCase()}`}
                                            onClick={() => onToggle(null)}
                                            className="flex items-center justify-between px-4 py-2.5 text-xs font-medium rounded-lg transition-all duration-300 group"
                                            style={{ color: THEME.colors.primaryLight }}
>>>>>>> Stashed changes
                                        >
                                            <span>Ver todo en {item.label.toLowerCase()}</span>
                                            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform duration-300" />
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
<<<<<<< Updated upstream
                    className="px-4 py-2 text-sm font-medium text-[#8b949e] hover:text-white rounded-lg hover:bg-white/5 transition-colors relative group"
                >
                    {item.label}
                    {/* Underline hover effect */}
                    <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-[#00FF9D] group-hover:w-1/2 transition-all duration-300 -translate-x-1/2 shadow-[0_0_5px_#00FF9D]" />
=======
                    className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group"
                    style={{ color: isCurrentPath ? THEME.colors.primaryLight : THEME.colors.textDim }}
                >
                    {item.label}

                    {/* Badge */}
                    {item.badge && (
                        <MenuBadge badge={item.badge} variant={item.badgeVariant} />
                    )}

                    {/* Hot Indicator */}
                    {item.hot && <HotIndicator />}

                    {/* Animated underline */}
                    <motion.span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                        style={{
                            backgroundColor: THEME.colors.primaryLight,
                            boxShadow: `0 0 8px ${THEME.colors.primaryLight}`
                        }}
                        initial={{ width: 0, opacity: 0 }}
                        whileHover={{ width: '50%', opacity: 1 }}
                        animate={{
                            width: isCurrentPath ? '50%' : 0,
                            opacity: isCurrentPath ? 1 : 0
                        }}
                        transition={{ duration: 0.25 }}
                    />

                    {/* Hover glow */}
                    <motion.div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        style={{ backgroundColor: `${THEME.colors.primary}08` }}
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    />
>>>>>>> Stashed changes
                </Link>
            )}
        </div>
    );
});

<<<<<<< Updated upstream
// ============================================================================
// Mobile Menu Item – Estilo Cyber/Futurista
// ============================================================================
=======
// ============================================
// MOBILE MENU ITEM
// ============================================
>>>>>>> Stashed changes

interface MobileMenuItemProps {
    item: MenuDataItem;
    onItemClick: () => void;
    path: string;
}

const MobileMenuItem = memo(function MobileMenuItem({ item, onItemClick, path }: MobileMenuItemProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasSubItems = Boolean(item.subItems?.length);
    const isCurrentPath = item.href && path === item.href;

    if (!hasSubItems) {
        return (
            <Link
                href={item.href || "/"}
                onClick={onItemClick}
<<<<<<< Updated upstream
                className="block px-4 py-4 text-base text-gray-200 hover:text-[#00FF9D] hover:bg-white/5 border-l-2 border-transparent hover:border-[#00FF9D] transition-colors"
=======
                className="block px-4 py-4 text-base border-l-2 transition-all duration-300"
                style={{
                    color: isCurrentPath ? THEME.colors.primaryLight : THEME.colors.textMuted,
                    borderColor: isCurrentPath ? THEME.colors.primaryLight : 'transparent',
                    backgroundColor: isCurrentPath ? `${THEME.colors.primary}10` : 'transparent'
                }}
>>>>>>> Stashed changes
            >
                <span className="flex items-center gap-2">
                    {item.label}
                    {isCurrentPath && (
                        <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{
                                backgroundColor: THEME.colors.primaryLight,
                                boxShadow: `0 0 5px ${THEME.colors.primaryLight}`
                            }}
                        />
                    )}
                </span>
            </Link>
        );
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
<<<<<<< Updated upstream
                className="flex items-center justify-between w-full px-4 py-4 text-base text-gray-200 hover:text-white hover:bg-white/5 border-l-2 border-transparent hover:border-[#00FF9D]/50 transition-colors"
            >
                <span>{item.label}</span>
                <ChevronDown className={`h-4 w-4 transition-transform text-gray-500 ${isExpanded ? "rotate-180 text-[#00FF9D]" : ""}`} />
=======
                className="flex items-center justify-between w-full px-4 py-4 text-base transition-all duration-300"
                style={{ color: THEME.colors.textMuted }}
            >
                <span>{item.label}</span>
                <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
                    <ChevronDown className="h-4 w-4" style={{ color: THEME.colors.textDim }} />
                </motion.span>
>>>>>>> Stashed changes
            </button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
<<<<<<< Updated upstream
                        className="overflow-hidden bg-black/20"
                    >
                        <div className="p-2 grid grid-cols-1 gap-2">
=======
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                        style={{ backgroundColor: `${THEME.colors.bgSolid}40` }}
                    >
                        <div className="p-2 space-y-1.5">
>>>>>>> Stashed changes
                            {item.subItems?.map((sub) => (
                                <Link
                                    key={sub.label}
                                    href={sub.href}
                                    onClick={onItemClick}
<<<<<<< Updated upstream
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
=======
                                    className="group flex items-center gap-4 p-3 rounded-xl transition-all duration-300"
                                    style={{
                                        border: `1px solid transparent`,
                                        backgroundColor: THEME.colors.bgCard
                                    }}
                                >
                                    {sub.image ? (
                                        <img
                                            src={sub.image}
                                            alt={sub.label}
                                            className="w-10 h-10 rounded-lg object-cover"
                                            style={{ border: `1px solid ${THEME.colors.border}` }}
                                        />
                                    ) : (
                                        <div
                                            className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                                            style={{
                                                backgroundColor: THEME.colors.bgHover,
                                                border: `1px solid ${THEME.colors.border}`
                                            }}
                                        >
                                            <Sparkles className="w-4 h-4" style={{ color: THEME.colors.textDim }} />
                                        </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <span
                                            className="text-sm font-medium block transition-colors duration-300"
                                            style={{ color: THEME.colors.textMuted }}
                                        >
                                            {sub.label}
                                        </span>
                                        {sub.description && (
                                            <span
                                                className="text-xs line-clamp-1"
                                                style={{ color: THEME.colors.textDim }}
                                            >
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
// ============================================================================
// Navbar Principal – Estilo Cyber/Futurista
// ============================================================================
=======
// ============================================
// NAVBAR PRINCIPAL
// ============================================
>>>>>>> Stashed changes

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const scrolled = useScrollPosition(10);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading: authLoading, logout } = useAuth();

    // Cerrar dropdowns al cambiar de ruta
    useEffect(() => {
        const timeout = setTimeout(() => {
            setActiveDropdown(null);
            setIsMobileMenuOpen(false);
        }, 0);
        return () => clearTimeout(timeout);
    }, [pathname]);

    useClickOutside(containerRef, () => {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
    }, !isMobileMenuOpen && !activeDropdown);

    const handleDropdownToggle = useCallback((label: string | null) => {
        setActiveDropdown(prev => prev === label ? null : label);
    }, []);

    const handleMobileItemClick = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const handleLogout = async () => {
        await logout();
        router.push("/");
        router.refresh();
    };

    // Keyboard navigation
    const dropdownLabels = menuItems.filter(i => i.subItems).map(i => i.label);
    const handleDropdownKey = useKeyboardNavigation(
        dropdownLabels,
        activeDropdown,
        (label) => setActiveDropdown(label),
        () => setActiveDropdown(null)
    );

    return (
        <div ref={containerRef} className="relative z-50">
            <motion.nav
                initial={{ y: -20, opacity: 0 }}
<<<<<<< Updated upstream
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
=======
                animate={{
                    y: 0,
                    opacity: 1,
                    boxShadow: scrolled ? THEME.shadows.card : 'none'
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 inset-x-0 h-16 transition-all duration-500"
                style={{
                    backgroundColor: scrolled ? `${THEME.colors.bgSolid}e6` : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? `1px solid ${THEME.colors.border}` : '1px solid transparent',
                }}
                onKeyDown={handleDropdownKey}
            >
                {/* Grid Pattern Overlay */}
                <CyberGridPattern />

                {/* Scanning Line */}
                {scrolled && <ScanningLine />}

                {/* Top Accent Gradient */}
                <motion.div
                    className="absolute top-0 left-0 right-0 h-px"
                    style={{
                        background: `linear-gradient(90deg, transparent, ${THEME.colors.primaryLight}, transparent)`
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: scrolled ? 0.6 : 0 }}
                    transition={{ duration: 0.3 }}
                />
>>>>>>> Stashed changes

                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative z-10">

                    {/* Logo */}
                    <motion.div
                        onClick={() => router.push("/")}
                        className="flex-shrink-0 cursor-pointer group select-none"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
<<<<<<< Updated upstream
                        <div className="lg:hidden text-white transition-transform group-hover:scale-105"><LogoTwo /></div>
                        <div className="hidden lg:block text-white transition-transform group-hover:scale-105"><Logo /></div>
                    </div>
=======
                        <div className="lg:hidden"><LogoTwo /></div>
                        <div className="hidden lg:block"><Logo /></div>
                    </motion.div>
>>>>>>> Stashed changes

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center h-full gap-0.5" onMouseLeave={() => setActiveDropdown(null)}>
                        {menuItems.map((item) => (
                            <DesktopMenuItem
                                key={item.label}
                                item={item}
                                isActive={activeDropdown === item.label}
                                onToggle={handleDropdownToggle}
                                path={pathname}
                            />
                        ))}
                    </div>

<<<<<<< Updated upstream
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
=======
                    {/* Auth & Actions Desktop */}
                    <div className="hidden lg:flex items-center gap-3">
                        {/* Search Button */}
                        <ElegantTooltip text="Buscar (Ctrl+K)">
                            <button
                                className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-all duration-300"
                                style={{
                                    color: THEME.colors.textDim,
                                    backgroundColor: THEME.colors.bgCard,
                                    border: `1px solid ${THEME.colors.border}`
                                }}
                            >
                                <Search className="w-3.5 h-3.5" />
                                <span>Buscar</span>
                                <kbd
                                    className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono rounded"
                                    style={{
                                        color: THEME.colors.textMuted,
                                        backgroundColor: THEME.colors.bgSolid,
                                        border: `1px solid ${THEME.colors.border}`
                                    }}
>>>>>>> Stashed changes
                                >
                                    <Command className="w-2.5 h-2.5" />K
                                </kbd>
                            </button>
                        </ElegantTooltip>

                        {/* Notifications */}
                        <ElegantTooltip text="Notificaciones">
                            <button
                                className="relative p-2 rounded-lg transition-all duration-300"
                                style={{ color: THEME.colors.textDim }}
                            >
                                <Bell className="w-4 h-4" />
                                <NotificationBadge count={3} />
                            </button>
                        </ElegantTooltip>

                        {/* Auth States */}
                        {authLoading ? (
                            <div
                                className="h-9 w-24 rounded-lg animate-pulse"
                                style={{ backgroundColor: THEME.colors.bgCard }}
                            />
                        ) : user ? (
                            <motion.div
                                className="flex items-center gap-3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                {/* User Pill */}
                                <button
                                    className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-full transition-all duration-300"
                                    style={{
                                        backgroundColor: THEME.colors.bgCard,
                                        border: `1px solid ${THEME.colors.border}`
                                    }}
                                >
                                    <div className="relative">
                                        <div
                                            className="w-8 h-8 rounded-full overflow-hidden"
                                            style={{
                                                backgroundColor: THEME.colors.bgHover,
                                                border: `1px solid ${THEME.colors.border}`
                                            }}
                                        >
                                            <img
                                                src={avatarSrc(user) ?? "/perfil.png"}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* Online Indicator */}
                                        <span
                                            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
                                            style={{
                                                backgroundColor: THEME.colors.primaryLight,
                                                border: `2px solid ${THEME.colors.bgSolid}`,
                                                boxShadow: `0 0 6px ${THEME.colors.primaryLight}`
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col items-start min-w-0">
                                        <span
                                            className="text-xs font-semibold truncate max-w-[100px]"
                                            style={{ color: THEME.colors.textMain }}
                                        >
                                            {user.name || "Usuario"}
                                        </span>
                                        <span
                                            className="text-[9px] font-mono tracking-wider"
                                            style={{ color: THEME.colors.primaryLight }}
                                        >
                                            ● ONLINE
                                        </span>
                                    </div>
                                    <ChevronDown
                                        className="w-3.5 h-3.5 transition-colors duration-300"
                                        style={{ color: THEME.colors.textDim }}
                                    />
                                </button>

                                <ElegantTooltip text="Cerrar sesión">
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 rounded-lg transition-all duration-300"
                                        style={{ color: THEME.colors.textDim }}
                                    >
                                        <LogOut className="w-4 h-4" />
                                    </button>
                                </ElegantTooltip>
                            </motion.div>
                        ) : (
                            <>
                                <Link
                                    href="/login"
<<<<<<< Updated upstream
                                    className="text-sm font-medium text-[#8b949e] hover:text-white transition-colors"
=======
                                    className="text-sm font-medium transition-colors duration-300 px-3 py-2 rounded-lg"
                                    style={{ color: THEME.colors.textDim }}
>>>>>>> Stashed changes
                                >
                                    Iniciar sesión
                                </Link>
                                <Link
                                    href="/register"
<<<<<<< Updated upstream
                                    className="group relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-black bg-[#00FF9D] rounded-lg overflow-hidden transition-all duration-300 shadow-[0_0_10px_rgba(0,255,157,0.2)] hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] active:scale-95"
                                >
                                    <span className="relative flex items-center gap-2">
                                        Crear cuenta
                                        <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
=======
                                    className="group relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-lg overflow-hidden transition-all duration-300"
                                    style={{
                                        background: `linear-gradient(135deg, ${THEME.colors.primary}, ${THEME.colors.primaryLight})`,
                                        boxShadow: THEME.shadows.glow,
                                        border: '1px solid rgba(255,255,255,0.1)'
                                    }}
                                >
                                    {/* Shimmer Effect */}
                                    <motion.span
                                        className="absolute inset-0"
                                        style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)'
                                        }}
                                        animate={{
                                            x: ['-100%', '100%']
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                            repeatDelay: 1
                                        }}
                                    />

                                    <span className="relative flex items-center gap-2">
                                        Crear cuenta
                                        <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" />
>>>>>>> Stashed changes
                                    </span>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <div className="lg:hidden flex items-center">
<<<<<<< Updated upstream
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-[#8b949e] hover:text-[#00FF9D] p-2 focus:outline-none transition-colors relative z-50"
                            aria-label="Toggle menu"
                        >
                            <AnimatedHamburgerIcon isOpen={isMobileMenuOpen} />
                        </button>
=======
                        <ElegantTooltip text={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}>
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 focus:outline-none transition-colors relative z-50"
                                style={{ color: THEME.colors.primaryLight }}
                                aria-label="Toggle menu"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <AnimatedHamburgerIcon isOpen={isMobileMenuOpen} />
                            </button>
                        </ElegantTooltip>
>>>>>>> Stashed changes
                    </div>
                </div>
            </motion.nav>

<<<<<<< Updated upstream
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
=======
            {/* Mobile Menu Ultra */}
            <MobileMenuUltra isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
>>>>>>> Stashed changes
        </div>
    );
}

export default memo(Navbar);
