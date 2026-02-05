// src/components/Navbar/menuData.ts

// ── DEFINICIÓN DE TIPOS ─────────────────────────────────────────────────────
// Definimos los tipos aquí para que coincidan exactamente con la estructura de tus datos
// y resolver el error de importación "Module './menuData' does not have an exported member 'MenuDataItem'".

export interface MenuSubItem {
    id?: string;
    label: string;
    href: string;
    image?: string;
    description?: string;
    badge?: string;
    isExternal?: boolean;
}

export interface MenuDataItem {
    id?: string;
    label: string;
    href?: string;
    subItems?: MenuSubItem[];
    isExternal?: boolean;
}

// ── UTILIDADES ────────────────────────────────────────────────────────────────

const img = (filename: string) => `/img/${filename}`;

// ── DATOS SUB-ITEMS ────────────────────────────────────────────────────────────

const productItems: MenuSubItem[] = [
    {
        id: "dev-fullstack",
        label: "Full-Stack Development",
        href: "/product/FullStackDescription",
        image: img("coding.png"),
        description: "Aplicaciones web modernas de punta a punta",
    },
    {
        id: "dev-api",
        label: "Modern APIs",
        href: "/product/ModernAPIDescription",
        image: img("cloud.png"),
        description: "REST, GraphQL y arquitecturas escalables",
    },
    {
        id: "dev-devops",
        label: "DevOps & CI/CD",
        href: "/product/DevOpsCICDDescription",
        image: img("devops.png"),
        description: "Automatización, despliegue y confiabilidad",
    },
    {
        id: "dev-arch",
        label: "Architecture & Refactors",
        href: "/product/ArchitectureRefactorsDescription",
        image: img("web-maintenance.png"),
        description: "Código limpio, escalable y mantenible",
    },
    {
        id: "dev-ui",
        label: "Technical UX / UI",
        href: "/product/UXUIDescription",
        image: img("landing-page.png"),
        description: "Interfaces pensadas para producto real",
    },
    {
        id: "dev-mentorship",
        label: "Mentorship & Code Review",
        href: "/product/MentorshipCodeReviewDescription",
        image: img("code-review.png"),
        description: "Mejora continua y estándares profesionales",
        badge: "New",
    },
    {
        id: "dev-security",
        label: "Security & Hardening",
        href: "/product/SecurityHardeningDescription",
        image: img("binary-code.png"),
        description: "Protección, auditorías y buenas prácticas",
    },
    {
        id: "dev-analytics",
        label: "Analytics & Tracking",
        href: "/product/AnalyticsTrackingDescription",
        image: img("data-analytics.png"),
        description: "Métricas, eventos y toma de decisiones",
    },
] as const;

const solutionItems: MenuSubItem[] = [
    {
        id: "sol-developers",
        label: "For Developers",
        href: "/solutions/developers",
        image: img("programmer.png"),
        description: "Herramientas y soporte para devs",
    },
    {
        id: "sol-teams",
        label: "For Teams",
        href: "/solutions/teams",
        image: img("development.png"),
        description: "Escalabilidad y colaboración",
    },
    {
        id: "sol-oss",
        label: "Open Source",
        href: "/solutions/open-source",
        image: img("open-source.png"),
        description: "Proyectos y contribuciones públicas",
    },
] as const;

// ── EXPORT PRINCIPAL ───────────────────────────────────────────────────────────

// Importante: Aquí tipamos el array como MenuDataItem[] para que coincida con Navbar.tsx
export const menuItems: MenuDataItem[] = [
    {
        id: "nav-product",
        label: "Product",
        subItems: productItems,
    },
    {
        id: "nav-solutions",
        label: "Solutions",
        subItems: solutionItems,
    },
    {
        id: "nav-pricing",
        label: "Pricing",
        href: "/product/PricingSection",
    },
    {
        id: "nav-contact",
        label: "Contact",
        href: "/contact",
    },
] as const;