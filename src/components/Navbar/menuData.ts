// src/components/Navbar/menuData.ts

// ── DEFINICIÓN DE TIPOS ─────────────────────────────────────────────────────

export interface MenuSubItem {
    id: string; // Hacer obligatorio el ID para mejor rendimiento en listas React
    label: string;
    href: string;
    image?: string;
    icon?: string; // Añadido: Soporte para iconos (ej. nombre de icono de Lucide)
    description?: string;
    badge?: string;
    badgeVariant?: 'default' | 'new' | 'popular'; // Añadido: Para estilizar badges
    isExternal?: boolean;
}

export interface MenuDataItem {
    id: string; // Hacer obligatorio el ID
    label: string;
    href?: string;
    subItems?: MenuSubItem[];
    isExternal?: boolean;
}

// ── UTILIDADES ────────────────────────────────────────────────────────────────

// Helper para rutas de imágenes optimizado
const img = (filename: string) => `/img/${filename}`;

// ── DATOS SUB-ITEMS ────────────────────────────────────────────────────────────

const servicesItems: MenuSubItem[] = [
    {
        id: "srv-fullstack",
        label: "Desarrollo Full-Stack",
        href: "/product/FullStackDescription",
        image: img("coding.png"),
        description: "Aplicaciones web modernas de punta a punta",
    },
    {
        id: "srv-api",
        label: "APIs Modernas",
        href: "/product/ModernAPIDescription",
        image: img("cloud.png"),
        description: "REST, GraphQL y arquitecturas escalables",
    },
    {
        id: "srv-devops",
        label: "DevOps & CI/CD",
        href: "/servicios/devops",
        image: img("devops.png"),
        description: "Automatización, despliegue y confiabilidad",
    },
    {
        id: "srv-arch",
        label: "Arquitectura & Refactors",
        href: "/servicios/arquitectura",
        image: img("web-maintenance.png"),
        description: "Código limpio, escalable y mantenible",
    },
    {
        id: "srv-ui",
        label: "UX/UI Técnico",
        href: "/servicios/ux-ui",
        image: img("landing-page.png"),
        description: "Interfaces pensadas para producto real",
    },
    {
        id: "srv-mentorship",
        label: "Mentoría & Code Review",
        href: "/servicios/mentoria",
        image: img("code-review.png"),
        description: "Mejora continua y estándares profesionales",
        badge: "Nuevo",
        badgeVariant: "new", // Utilizado para el estilo visual (ej. color neón)
    },
    {
        id: "srv-security",
        label: "Seguridad & Hardening",
        href: "/servicios/seguridad",
        image: img("binary-code.png"),
        description: "Protección, auditorías y buenas prácticas",
    },
    {
        id: "srv-analytics",
        label: "Analítica & Tracking",
        href: "/servicios/analytics",
        image: img("data-analytics.png"),
        description: "Métricas, eventos y toma de decisiones",
    },
];

const solutionsItems: MenuSubItem[] = [
    {
        id: "sol-developers",
        label: "Para Desarrolladores",
        href: "/soluciones/desarrolladores",
        image: img("programmer.png"),
        description: "Herramientas y soporte para devs",
    },
    {
        id: "sol-teams",
        label: "Para Equipos",
        href: "/soluciones/equipos",
        image: img("development.png"),
        description: "Escalabilidad y colaboración",
    },
    {
        id: "sol-oss",
        label: "Open Source",
        href: "/soluciones/open-source",
        image: img("open-source.png"),
        description: "Proyectos y contribuciones públicas",
    },
];

// ── EXPORT PRINCIPAL ───────────────────────────────────────────────────────────

export const menuItems: MenuDataItem[] = [
    {
        id: "nav-servicios",
        label: "Servicios",
        subItems: servicesItems,
    },
    {
        id: "nav-soluciones",
        label: "Soluciones",
        subItems: solutionsItems,
    },
    {
        id: "nav-precios",
        label: "Precios",
        href: "/precios",
    },
    {
        id: "nav-contacto",
        label: "Contacto",
        href: "/contacto",
    },
];