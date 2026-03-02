// src/components/Navbar/menuData.ts

// ── DEFINICIÓN DE TIPOS ─────────────────────────────────────────────────────
<<<<<<< Updated upstream

export interface MenuSubItem {
    id: string; // Hacer obligatorio el ID para mejor rendimiento en listas React
    label: string;
    href: string;
    image?: string;
    icon?: string; // Añadido: Soporte para iconos (ej. nombre de icono de Lucide)
=======

export type BadgeVariant = 'default' | 'new' | 'popular' | 'pro' | 'cyber';

export interface MenuSubItem {
    id: string;
    label: string;
    href: string;
    image?: string;
    icon?: string;
>>>>>>> Stashed changes
    description?: string;
    shortDesc?: string; // Para tooltips o vistas compactas
    badge?: string;
<<<<<<< Updated upstream
    badgeVariant?: 'default' | 'new' | 'popular'; // Añadido: Para estilizar badges
=======
    badgeVariant?: BadgeVariant;
>>>>>>> Stashed changes
    isExternal?: boolean;
    tags?: string[]; // Para filtros o categorías visuales
    hot?: boolean; // Para efecto de pulso en items destacados
}

export interface MenuDataItem {
<<<<<<< Updated upstream
    id: string; // Hacer obligatorio el ID
=======
    id: string;
>>>>>>> Stashed changes
    label: string;
    href?: string;
    subItems?: MenuSubItem[];
    isExternal?: boolean;
    icon?: string; // Icono para versión mobile o desktop
    gradient?: 'blue' | 'purple' | 'cyan'; // Para efectos visuales en hover (adaptado a Jacana)
    hot?: boolean; // Para efecto de pulso en items destacados
    badge?: string;
    badgeVariant?: BadgeVariant;
}

// ── UTILIDADES ────────────────────────────────────────────────────────────────

// Helper para rutas de imágenes optimizado
const img = (filename: string) => `/img/${filename}`;

// ── BADGE CONFIG - Adaptado a paleta Jacana ──────────────────────────────────

<<<<<<< Updated upstream
=======
export const badgeStyles: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
    default: { bg: 'bg-[#30363d]', text: 'text-[#c9d1d9]', border: 'border-[#484f58]' },
    new: { bg: 'bg-[#00A0E4]/15', text: 'text-[#00A0E4]', border: 'border-[#00A0E4]/40' },
    popular: { bg: 'bg-[#a371f7]/15', text: 'text-[#a371f7]', border: 'border-[#a371f7]/40' },
    pro: { bg: 'bg-[#f0b90b]/15', text: 'text-[#f0b90b]', border: 'border-[#f0b90b]/40' },
    cyber: { bg: 'bg-[#00A0E4]/20', text: 'text-[#00A0E4]', border: 'border-[#00A0E4]/60 shadow-[0_0_10px_rgba(0,160,228,0.3)]' },
};

// ── DATOS SUB-ITEMS: SERVICIOS ───────────────────────────────────────────────

>>>>>>> Stashed changes
const servicesItems: MenuSubItem[] = [
    {
        id: "srv-fullstack",
        label: "Desarrollo Full-Stack",
        href: "/product/FullStackDescription",
        image: img("coding.png"),
        description: "Arquitectura end-to-end con Next.js, React y Node. Código tipo-strict, SSR optimizado y despliegue en edge.",
        shortDesc: "Stack moderno • Type-safe • Edge-ready",
        tags: ["Next.js", "TypeScript", "Edge"],
        hot: true,
    },
    {
        id: "srv-api",
        label: "APIs Modernas",
        href: "/product/ModernAPIDescription",
        image: img("cloud.png"),
        description: "REST & GraphQL con autenticación JWT, rate limiting, caching estratégico y documentación OpenAPI auto-generada.",
        shortDesc: "REST/GraphQL • Auth • OpenAPI",
        tags: ["tRPC", "GraphQL", "Swagger"],
    },
    {
        id: "srv-devops",
        label: "DevOps & CI/CD",
        href: "/servicios/devops",
        image: img("devops.png"),
        description: "Pipelines automatizados con GitHub Actions, Docker multi-stage, Kubernetes y monitoreo con Prometheus/Grafana.",
        shortDesc: "CI/CD • Docker • K8s • Observability",
        tags: ["GitHub Actions", "Docker", "Kubernetes"],
        badge: "Popular",
        badgeVariant: "popular",
    },
    {
        id: "srv-arch",
        label: "Arquitectura & Refactors",
<<<<<<< Updated upstream
        href: "/servicios/arquitectura",
=======
        href: "/product/ArchitectureRefactorsDescription",
>>>>>>> Stashed changes
        image: img("web-maintenance.png"),
        description: "Patrones clean architecture, DDD, migraciones progresivas y deuda técnica cero. Código que escala contigo.",
        shortDesc: "Clean Arch • DDD • Legacy modernization",
        tags: ["DDD", "Clean Code", "Refactor"],
    },
    {
        id: "srv-ui",
        label: "UX/UI Técnico",
<<<<<<< Updated upstream
        href: "/servicios/ux-ui",
=======
        href: "/product/UXUIDescription",
>>>>>>> Stashed changes
        image: img("landing-page.png"),
        description: "Interfaces con Framer Motion, dark mode nativo, accesibilidad WCAG 2.2 y performance Core Web Vitals ≥ 95.",
        shortDesc: "Animaciones • A11y • Perf. optimizada",
        tags: ["Framer Motion", "WCAG", "Lighthouse"],
    },
    {
        id: "srv-mentorship",
        label: "Mentoría & Code Review",
<<<<<<< Updated upstream
        href: "/servicios/mentoria",
        image: img("code-review.png"),
        description: "Mejora continua y estándares profesionales",
        badge: "Nuevo",
        badgeVariant: "new", // Utilizado para el estilo visual (ej. color neón)
=======
        href: "/product/MentorshipCodeReviewDescription",
        image: img("code-review.png"),
        description: "Feedback estructurado, pair programming remoto y estándares de equipo. Eleva el nivel técnico de tu squad.",
        shortDesc: "Pair programming • Standards • Growth",
        tags: ["Mentoring", "Best Practices"],
        badge: "Nuevo",
        badgeVariant: "new",
        hot: true,
>>>>>>> Stashed changes
    },
    {
        id: "srv-security",
        label: "Seguridad & Hardening",
<<<<<<< Updated upstream
        href: "/servicios/seguridad",
=======
        href: "/product/SecurityHardeningDescription",
>>>>>>> Stashed changes
        image: img("binary-code.png"),
        description: "Auditorías OWASP, CSP headers, sanitización de inputs y penetration testing. Tu app, blindada por diseño.",
        shortDesc: "OWASP • CSP • Pentesting",
        tags: ["Security", "OWASP", "CSP"],
        badgeVariant: "cyber",
    },
    {
        id: "srv-analytics",
        label: "Analítica & Tracking",
<<<<<<< Updated upstream
        href: "/servicios/analytics",
=======
        href: "/product/AnalyticsTrackingDescription",
>>>>>>> Stashed changes
        image: img("data-analytics.png"),
        description: "Event tracking con PostHog/Plausible, dashboards en tiempo real y funnel analysis para decisiones data-driven.",
        shortDesc: "Real-time • Funnels • Privacy-first",
        tags: ["PostHog", "Analytics", "GDPR"],
    },
];

<<<<<<< Updated upstream
=======
// ── DATOS SUB-ITEMS: SOLUCIONES ──────────────────────────────────────────────

>>>>>>> Stashed changes
const solutionsItems: MenuSubItem[] = [
    {
        id: "sol-developers",
        label: "Para Desarrolladores",
        href: "/soluciones/desarrolladores",
        image: img("programmer.png"),
        description: "CLI tools, templates pre-configurados, hot-reload optimizado y DX pensado para flow state.",
        shortDesc: "DX first • Templates • CLI tools",
        tags: ["DX", "Tooling", "Productivity"],
        hot: true,
    },
    {
        id: "sol-teams",
        label: "Para Equipos",
        href: "/soluciones/equipos",
        image: img("development.png"),
        description: "Monorepos con Turborepo, feature flags, entornos ephemeral y colaboración en tiempo real.",
        shortDesc: "Monorepo • Feature flags • Ephemeral envs",
        tags: ["Turborepo", "Collaboration", "Scale"],
    },
    {
        id: "sol-oss",
        label: "Open Source",
        href: "/soluciones/open-source",
        image: img("open-source.png"),
        description: "Estrategia de contribución, mantenimiento de paquetes y visibilidad en la comunidad dev global.",
        shortDesc: "Contributions • Packages • Community",
        tags: ["OSS", "NPM", "GitHub"],
        badge: "Community",
        badgeVariant: "popular",
    },
];

// ── EXPORT PRINCIPAL ─────────────────────────────────────────────────────────

export const menuItems: MenuDataItem[] = [
    {
        id: "nav-servicios",
        label: "Servicios",
        subItems: servicesItems,
<<<<<<< Updated upstream
=======
        icon: "Zap",
        gradient: "blue",
>>>>>>> Stashed changes
    },
    {
        id: "nav-soluciones",
        label: "Soluciones",
        subItems: solutionsItems,
<<<<<<< Updated upstream
=======
        icon: "Layers",
        gradient: "purple",
>>>>>>> Stashed changes
    },
    {
        id: "nav-precios",
        label: "Precios",
<<<<<<< Updated upstream
        href: "/precios",
=======
        href: "/product/PricingSection",
        icon: "Tag",
        badge: "Transparente",
        badgeVariant: "default",
>>>>>>> Stashed changes
    },
    {
        id: "nav-contacto",
        label: "Contacto",
<<<<<<< Updated upstream
        href: "/contacto",
    },
];
=======
        href: "/contact",
        icon: "MessageSquare",
        hot: true,
    },
];

// ── UTILIDADES ADICIONALES ───────────────────────────────────────────────────

/**
 * Obtiene un item por ID (útil para highlights o breadcrumbs)
 */
export function getMenuItemById(id: string): MenuDataItem | undefined {
    return menuItems.find(item => item.id === id);
}

/**
 * Obtiene un sub-item por ID (útil para tracking o analytics)
 */
export function getSubItemById(id: string): MenuSubItem | undefined {
    for (const item of menuItems) {
        const found = item.subItems?.find(sub => sub.id === id);
        if (found) return found;
    }
    return undefined;
}

/**
 * Filtra items con badge "new" o "hot" para destacar en UI
 */
export function getHighlightedItems(): { main: MenuDataItem[]; sub: MenuSubItem[] } {
    const main = menuItems.filter(item => item.hot);
    const sub = menuItems.flatMap(item => item.subItems || []).filter(sub => sub.badgeVariant === 'new' || sub.hot);
    return { main, sub };
}
>>>>>>> Stashed changes
