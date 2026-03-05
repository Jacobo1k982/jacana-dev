"use client";

import { useState, useEffect, useRef, useCallback, memo, KeyboardEvent } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { menuItems, badgeStyles } from "./menuData";
import Logo from "./Logo";
import LogoTwo from "./LogoTwo";
import type { MenuDataItem, BadgeVariant } from "./menuData";
import { useAuth } from "@/hooks/use-auth";
import MobileMenuUltra from "./MobileMenu";

// ============================================
// ICONOS SVG INLINE
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
// CONFIGURACIÓN TEMA JACANA
// ============================================
const THEME = {
    colors: {
        primary: '#005A9C',
        primaryLight: '#00A0E4',
        primaryDark: '#003D6B',
        textMain: '#ffffff',
        textMuted: '#C5C5C5',
        textDim: '#8B949E',
        bgSolid: '#1E2124',
        bgCard: '#2D3136',
        bgHover: '#363B41',
        border: '#3D4248',
    },
    shadows: {
        glow: '0 0 20px rgba(0, 160, 228, 0.25)',
        card: '0 8px 32px rgba(0, 0, 0, 0.4)',
        dropdown: '0 16px 48px rgba(0, 0, 0, 0.5)',
    }
};

// ============================================
// HOOKS
// ============================================
function useScrollPosition(threshold = 0) {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > threshold);
    });

    return scrolled;
}

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
const avatarSrc = (user: any) => user?.image;

const CyberGridPattern = memo(() => (
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="w-full h-full" style={{ backgroundImage: `linear-gradient(rgba(0, 160, 228, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 160, 228, 0.3) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
    </div>
));

const AnimatedHamburgerIcon = memo(({ isOpen }: { isOpen: boolean }) => (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center">
        {[0, 1, 2].map((i) => (
            <motion.span key={i} className="absolute w-5 h-0.5 rounded-full origin-center" style={{ backgroundColor: THEME.colors.primaryLight }}
                animate={{ rotate: isOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0, y: isOpen ? (i === 1 ? 0 : i === 0 ? 6 : -6) : (i - 1) * 6, opacity: isOpen ? (i === 1 ? 0 : 1) : 1, scale: isOpen && i === 1 ? 0 : 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }} />
        ))}
    </div>
));

const NotificationBadge = memo(({ count }: { count?: number }) => (
    <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1.5 flex items-center justify-center text-[10px] font-bold rounded-full border-2"
        style={{ backgroundColor: THEME.colors.primaryLight, color: '#000', borderColor: THEME.colors.bgSolid, boxShadow: `0 0 10px ${THEME.colors.primaryLight}50` }}>
        {count ?? '•'}
    </span>
));

const MenuBadge = memo(({ badge, variant = 'default' }: { badge: string; variant?: BadgeVariant }) => {
    const styles = badgeStyles[variant];
    return <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-semibold rounded-full border ${styles.bg} ${styles.text} ${styles.border}`}>{badge}</span>;
});

const HotIndicator = memo(() => (
    <motion.span className="absolute -top-1 -right-1 w-2 h-2 rounded-full" style={{ backgroundColor: THEME.colors.primaryLight }}
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} />
));

// ============================================
// DESKTOP MENU ITEM
// ============================================
interface DesktopMenuItemProps { item: MenuDataItem; isActive: boolean; onToggle: (label: string | null) => void; path: string; }

const DesktopMenuItem = memo(function DesktopMenuItem({ item, isActive, onToggle, path }: DesktopMenuItemProps) {
    const hasSubItems = Boolean(item.subItems?.length);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const isCurrentPath = item.href && path === item.href;

    const handleMouseEnter = () => hasSubItems && onToggle(item.label);
    const handleMouseLeave = (e: React.MouseEvent) => {
        const related = e.relatedTarget;
        if (!related || !(related instanceof Node)) { onToggle(null); return; }
        if (dropdownRef.current?.contains(related)) return;
        onToggle(null);
    };

    return (
        <div className="relative h-full flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={hasSubItems ? handleMouseLeave : undefined}>
            {hasSubItems ? (
                <>
                    <button type="button" aria-expanded={isActive} aria-haspopup="true"
                        className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group"
                        style={{ color: isActive ? THEME.colors.primaryLight : isCurrentPath ? THEME.colors.textMain : THEME.colors.textDim, backgroundColor: isActive ? `${THEME.colors.primary}15` : 'transparent' }}>
                        {item.label}
                        {item.badge && <MenuBadge badge={item.badge} variant={item.badgeVariant} />}
                        {item.hot && <HotIndicator />}
                        <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.25 }}>
                            <ChevronDown className="h-3.5 w-3.5 transition-colors duration-300" style={{ color: isActive ? THEME.colors.primaryLight : THEME.colors.textDim }} />
                        </motion.span>
                        <motion.span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                            style={{ backgroundColor: THEME.colors.primaryLight, boxShadow: `0 0 8px ${THEME.colors.primaryLight}` }}
                            initial={{ width: 0, opacity: 0 }} animate={{ width: isActive ? '60%' : 0, opacity: isActive ? 1 : 0 }} transition={{ duration: 0.25 }} />
                    </button>
                    <AnimatePresence>
                        {isActive && (
                            <motion.div ref={dropdownRef} initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.2, ease: "easeOut" }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 z-50 w-[700px]" role="menu">
                                <div className="absolute -inset-1 rounded-2xl blur-xl" style={{ backgroundColor: `${THEME.colors.primaryLight}10` }} />
                                <div className="relative rounded-xl overflow-hidden"
                                    style={{ backgroundColor: `${THEME.colors.bgSolid}f2`, backdropFilter: 'blur(20px)', border: `1px solid ${THEME.colors.border}`, boxShadow: THEME.shadows.dropdown }}>
                                    <div className="px-6 py-4 border-b" style={{ borderColor: THEME.colors.border }}>
                                        <span className="text-xs font-bold uppercase tracking-[0.15em] flex items-center gap-2" style={{ color: THEME.colors.primaryLight }}>
                                            <Zap className="w-3.5 h-3.5 animate-pulse" />{item.label}
                                        </span>
                                    </div>
                                    <div className="p-3 grid grid-cols-2 gap-1.5">
                                        {item.subItems?.map((sub, index) => (
                                            <motion.div key={sub.id || sub.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05, duration: 0.2 }}>
                                                <Link href={sub.href} onClick={() => onToggle(null)}
                                                    className="group relative flex items-start gap-4 p-3 rounded-xl transition-all duration-300 overflow-hidden" style={{ border: '1px solid transparent' }} role="menuitem">
                                                    <div className="relative z-10 flex-shrink-0">
                                                        {sub.image ? (
                                                            <motion.img src={sub.image} alt={sub.label} className="w-12 h-12 rounded-xl object-cover" style={{ border: `1px solid ${THEME.colors.border}` }} whileHover={{ scale: 1.05 }} />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: THEME.colors.bgCard, border: `1px solid ${THEME.colors.border}` }}>
                                                                <Sparkles className="w-5 h-5" style={{ color: THEME.colors.textDim }} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-center">
                                                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                            <span className="text-sm font-semibold" style={{ color: THEME.colors.textMain }}>{sub.label}</span>
                                                            {sub.badge && <MenuBadge badge={sub.badge} variant={sub.badgeVariant} />}
                                                        </div>
                                                        {(sub.shortDesc || sub.description) && <p className="text-xs leading-relaxed line-clamp-2" style={{ color: THEME.colors.textDim }}>{sub.shortDesc || sub.description}</p>}
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="border-t p-3" style={{ borderColor: THEME.colors.border, backgroundColor: `${THEME.colors.bgSolid}80` }}>
                                        <Link href={`/${item.label.toLowerCase()}`} onClick={() => onToggle(null)}
                                            className="flex items-center justify-between px-4 py-2.5 text-xs font-medium rounded-lg transition-all duration-300 group" style={{ color: THEME.colors.primaryLight }}>
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
                <Link href={item.href || "/"} className="relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group" style={{ color: isCurrentPath ? THEME.colors.primaryLight : THEME.colors.textDim }}>
                    {item.label}
                    {item.badge && <MenuBadge badge={item.badge} variant={item.badgeVariant} />}
                    {item.hot && <HotIndicator />}
                    <motion.span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 rounded-full"
                        style={{ backgroundColor: THEME.colors.primaryLight, boxShadow: `0 0 8px ${THEME.colors.primaryLight}` }}
                        initial={{ width: 0, opacity: 0 }} animate={{ width: isCurrentPath ? '50%' : 0, opacity: isCurrentPath ? 1 : 0 }} transition={{ duration: 0.25 }} />
                </Link>
            )}
        </div>
    );
});

// ============================================
// NAVBAR PRINCIPAL
// ============================================
function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const scrolled = useScrollPosition(10);
    const containerRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const { user, loading: authLoading, logout } = useAuth();

    useEffect(() => {
        const timeout = setTimeout(() => { setActiveDropdown(null); setIsMobileMenuOpen(false); }, 0);
        return () => clearTimeout(timeout);
    }, [pathname]);

    useClickOutside(containerRef, () => { setIsMobileMenuOpen(false); setActiveDropdown(null); }, !isMobileMenuOpen && !activeDropdown);

    const handleDropdownToggle = useCallback((label: string | null) => { setActiveDropdown(prev => prev === label ? null : label); }, []);
    const handleMobileItemClick = useCallback(() => { setIsMobileMenuOpen(false); }, []);
    const handleLogout = async () => { await logout(); router.push("/"); router.refresh(); };

    const dropdownLabels = menuItems.filter(i => i.subItems).map(i => i.label);
    const handleDropdownKey = useKeyboardNavigation(dropdownLabels, activeDropdown, (label) => setActiveDropdown(label), () => setActiveDropdown(null));

    return (
        <div ref={containerRef} className="relative z-50">
            <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1, boxShadow: scrolled ? THEME.shadows.card : 'none' }}
                transition={{ duration: 0.5, ease: "easeOut" }} className="fixed top-0 inset-x-0 h-16 transition-all duration-500"
                style={{ backgroundColor: scrolled ? `${THEME.colors.bgSolid}e6` : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? `1px solid ${THEME.colors.border}` : '1px solid transparent' }}
                onKeyDown={handleDropdownKey}>
                <CyberGridPattern />
                <motion.div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: `linear-gradient(90deg, transparent, ${THEME.colors.primaryLight}, transparent)` }}
                    initial={{ opacity: 0 }} animate={{ opacity: scrolled ? 0.6 : 0 }} transition={{ duration: 0.3 }} />
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between relative z-10">
                    <motion.div onClick={() => router.push("/")} className="flex-shrink-0 cursor-pointer group select-none" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} tabIndex={0}>
                        <div className="lg:hidden"><LogoTwo /></div>
                        <div className="hidden lg:block"><Logo /></div>
                    </motion.div>
                    <div className="hidden lg:flex items-center h-full gap-0.5" onMouseLeave={() => setActiveDropdown(null)}>
                        {menuItems.map((item) => (<DesktopMenuItem key={item.label} item={item} isActive={activeDropdown === item.label} onToggle={handleDropdownToggle} path={pathname} />))}
                    </div>
                    <div className="hidden lg:flex items-center gap-3">
                        <button className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-all duration-300" style={{ color: THEME.colors.textDim, backgroundColor: THEME.colors.bgCard, border: `1px solid ${THEME.colors.border}` }}>
                            <Search className="w-3.5 h-3.5" /><span>Buscar</span>
                        </button>
                        <button className="relative p-2 rounded-lg transition-all duration-300" style={{ color: THEME.colors.textDim }}>
                            <Bell className="w-4 h-4" /><NotificationBadge count={3} />
                        </button>
                        {authLoading ? (<div className="h-9 w-24 rounded-lg animate-pulse" style={{ backgroundColor: THEME.colors.bgCard }} />) : user ? (
                            <motion.div className="flex items-center gap-3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                <button className="group flex items-center gap-2.5 px-2.5 py-1.5 rounded-full transition-all duration-300" style={{ backgroundColor: THEME.colors.bgCard, border: `1px solid ${THEME.colors.border}` }}>
                                    <div className="relative">
                                        <div className="w-8 h-8 rounded-full overflow-hidden" style={{ backgroundColor: THEME.colors.bgHover, border: `1px solid ${THEME.colors.border}` }}>
                                            <img src={avatarSrc(user) ?? "/perfil.png"} alt="Avatar" className="w-full h-full object-cover" />
                                        </div>
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full" style={{ backgroundColor: THEME.colors.primaryLight, border: `2px solid ${THEME.colors.bgSolid}`, boxShadow: `0 0 6px ${THEME.colors.primaryLight}` }} />
                                    </div>
                                    <div className="flex flex-col items-start min-w-0">
                                        <span className="text-xs font-semibold truncate max-w-[100px]" style={{ color: THEME.colors.textMain }}>{user.name || "Usuario"}</span>
                                        <span className="text-[9px] font-mono tracking-wider" style={{ color: THEME.colors.primaryLight }}>● ONLINE</span>
                                    </div>
                                </button>
                                <button onClick={handleLogout} className="p-2 rounded-lg transition-all duration-300" style={{ color: THEME.colors.textDim }}><LogOut className="w-4 h-4" /></button>
                            </motion.div>
                        ) : (
                            <>
                                <Link href="/login" className="text-sm font-medium transition-colors duration-300 px-3 py-2 rounded-lg" style={{ color: THEME.colors.textDim }}>Iniciar sesión</Link>
                                <Link href="/register" className="group relative inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-lg overflow-hidden transition-all duration-300"
                                    style={{ background: `linear-gradient(135deg, ${THEME.colors.primary}, ${THEME.colors.primaryLight})`, boxShadow: THEME.shadows.glow, border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <span className="relative flex items-center gap-2">Crear cuenta<Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" /></span>
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="lg:hidden flex items-center">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 focus:outline-none transition-colors relative z-50" style={{ color: THEME.colors.primaryLight }} aria-label="Toggle menu" aria-expanded={isMobileMenuOpen}>
                            <AnimatedHamburgerIcon isOpen={isMobileMenuOpen} />
                        </button>
                    </div>
                </div>
            </motion.nav>
            <MobileMenuUltra isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
        </div>
    );
}

export default memo(Navbar);