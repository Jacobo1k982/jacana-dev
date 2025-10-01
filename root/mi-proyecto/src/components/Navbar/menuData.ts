// menuData.ts

// 🔹 Definimos la interfaz de los subItems
export interface SubItem {
    label: string;
    href: string;
    image?: string;
    description?: string;
}

// 🔹 Interfaz para los items principales
export interface MenuItem {
    label: string;
    href: string;
    subItems?: SubItem[];
}

// 🔹 Lista de menús con tipado fuerte
export const menuItems: MenuItem[] = [
    {
        label: "Product",
        href: "#",
        subItems: [
            {
                label: "Desarrollo Fullstack",
                href: "/product/FullStackDescription",
                image: "/img/coding.png",
                description: "Aplicaciones completas con frontend y backend."
            },
            {
                label: "APIs Modernas",
                href: "/product/ModernAPIDescription",
                image: "/img/cloud.png",
                description: "Diseño de APIs escalables y seguras."
            },
            {
                label: "DevOps & CI/CD",
                href: "/product/DevOpsCICDDescription",
                image: "/img/devops.png",
                description: "Automatización de despliegues y flujos ágiles."
            },
            {
                label: "Arquitectura & Refactores",
                href: "/product/ArchitectureRefactorsDescription",
                image: "/img/web-maintenance.png",
                description: "Optimización de código y arquitectura moderna."
            },
            {
                label: "UX/UI Técnico",
                href: "/product/UXUIDescription",
                image: "/img/landing-page.png",
                description: "Diseños centrados en la experiencia del usuario."
            },
            {
                label: "Mentoría & Code Review",
                href: "/product/MentorshipCodeReviewDescription",
                image: "/img/code-review.png",
                description: "Acompañamiento y revisión de buenas prácticas."
            },
            {
                label: "Security & Hardening",
                href: "/product/SecurityHardeningDescription",
                image: "/img/binary-code.png",
                description: "Protección de aplicaciones y servidores."
            },
            {
                label: "Analytics & Tracking",
                href: "/product/AnalyticsTrackingDescription",
                image: "/img/data-analytics.png",
                description: "Métricas avanzadas para toma de decisiones."
            },
        ],
    },
    {
        label: "Solutions",
        href: "#",
        subItems: [
            {
                label: "Developers",
                href: "#",
                image: "/img/programmer.png",
                description: "Herramientas para potenciar tu desarrollo."
            },
            {
                label: "Teams",
                href: "#",
                image: "/img/development.png",
                description: "Colaboración y productividad en equipo."
            },
            {
                label: "Open Source",
                href: "#",
                image: "/img/open-source.png",
                description: "Contribución y soporte a la comunidad."
            },
        ],
    },
    { label: "Pricing", href: "/product/PricingSection" },
    { label: "Contact Us", href: "/contact" },
];
