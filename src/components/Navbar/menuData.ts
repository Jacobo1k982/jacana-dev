// src/components/Navbar/menuData.ts

// ── DEFINICIÓN DE TIPOS ─────────────────────────────────────────────────────

export type BadgeVariant = 'default' | 'new' | 'popular' | 'pro' | 'cyber';

export interface MenuSubItem {
    id: string;
    label: string;
    href: string;
    image?: string;
    icon?: string;
    description?: string;
    shortDesc?: string;
    badge?: string;
    badgeVariant?: BadgeVariant;
    isExternal?: boolean;
    tags?: string[];
    hot?: boolean;
}

export interface MenuDataItem {
    id: string;
    label: string;
    href?: string;
    subItems?: MenuSubItem[];
    isExternal?: boolean;
    icon?: string;
    gradient?: 'blue' | 'purple' | 'cyan';
    hot?: boolean;
    badge?: string;
    badgeVariant?: BadgeVariant;
}

// ── UTILIDADES ────────────────────────────────────────────────────────────────

const img = (filename: string) => `/img/${filename}`;

// ── BADGE CONFIG - Adaptado a paleta Jacana ──────────────────────────────────

export const badgeStyles: Record<BadgeVariant, { bg: string; text: string; border: string }> = {
    default: { bg: 'bg-[#30363d]', text: 'text-[#c9d1d9]', border: 'border-[#484f58]' },
    new: { bg: 'bg-[#00A0E4]/15', text: 'text-[#00A0E4]', border: 'border-[#00A0E4]/40' },
    popular: { bg: 'bg-[#a371f7]/15', text: 'text-[#a371f7]', border: 'border-[#a371f7]/40' },
    pro: { bg: 'bg-[#f0b90b]/15', text: 'text-[#f0b90b]', border: 'border-[#f0b90b]/40' },
    cyber: { bg: 'bg-[#00A0E4]/20', text: 'text-[#00A0E4]', border: 'border-[#00A0E4]/60 shadow-[0_0_10px_rgba(0,160,228,0.3)]' },
};

// ── DATOS SUB-ITEMS: SERVICIOS ───────────────────────────────────────────────

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
        href: "/product/ArchitectureRefactorsDescription",
        image: img("web-maintenance.png"),
        description: "Patrones clean architecture, DDD, migraciones progresivas y deuda técnica cero. Código que escala contigo.",
        shortDesc: "Clean Arch • DDD • Legacy modernization",
        tags: ["DDD", "Clean Code", "Refactor"],
    },
    {
        id: "srv-ui",
        label: "UX/UI Técnico",
        href: "/product/UXUIDescription",
        image: img("landing-page.png"),
        description: "Interfaces con Framer Motion, dark mode nativo, accesibilidad WCAG 2.2 y performance Core Web Vitals ≥ 95.",
        shortDesc: "Animaciones • A11y • Perf. optimizada",
        tags: ["Framer Motion", "WCAG", "Lighthouse"],
    },
    {
        id: "srv-mentorship",
        label: "Mentoría & Code Review",
        href: "/product/MentorshipCodeReviewDescription",
        image: img("code-review.png"),
        description: "Feedback estructurado, pair programming remoto y estándares de equipo. Eleva el nivel técnico de tu squad.",
        shortDesc: "Pair programming • Standards • Growth",
        tags: ["Mentoring", "Best Practices"],
        badge: "Nuevo",
        badgeVariant: "new",
        hot: true,
    },
    {
        id: "srv-security",
        label: "Seguridad & Hardening",
        href: "/product/SecurityHardeningDescription",
        image: img("binary-code.png"),
        description: "Auditorías OWASP, CSP headers, sanitización de inputs y penetration testing. Tu app, blindada por diseño.",
        shortDesc: "OWASP • CSP • Pentesting",
        tags: ["Security", "OWASP", "CSP"],
        badgeVariant: "cyber",
    },
    {
        id: "srv-analytics",
        label: "Analítica & Tracking",
        href: "/product/AnalyticsTrackingDescription",
        image: img("data-analytics.png"),
        description: "Event tracking con PostHog/Plausible, dashboards en tiempo real y funnel analysis para decisiones data-driven.",
        shortDesc: "Real-time • Funnels • Privacy-first",
        tags: ["PostHog", "Analytics", "GDPR"],
    },
];

// ── DATOS SUB-ITEMS: SOLUCIONES ──────────────────────────────────────────────

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
        icon: "Zap",
        gradient: "blue",
    },
    {
        id: "nav-soluciones",
        label: "Soluciones",
        subItems: solutionsItems,
        icon: "Layers",
        gradient: "purple",
    },
    {
        id: "nav-precios",
        label: "Precios",
        href: "/product/PricingSection",
        icon: "Tag",
        badge: "Transparente",
        badgeVariant: "default",
    },
    {
        id: "nav-contacto",
        label: "Contacto",
        href: "/contact",
        icon: "MessageSquare",
        hot: true,
    },
];

// ── UTILIDADES ADICIONALES ───────────────────────────────────────────────────

export function getMenuItemById(id: string): MenuDataItem | undefined {
    return menuItems.find(item => item.id === id);
}

export function getSubItemById(id: string): MenuSubItem | undefined {
    for (const item of menuItems) {
        const found = item.subItems?.find(sub => sub.id === id);
        if (found) return found;
    }
    return undefined;
}

export function getHighlightedItems(): { main: MenuDataItem[]; sub: MenuSubItem[] } {
    const main = menuItems.filter(item => item.hot);
    const sub = menuItems.flatMap(item => item.subItems || []).filter(sub => sub.badgeVariant === 'new' || sub.hot);
    return { main, sub };
}