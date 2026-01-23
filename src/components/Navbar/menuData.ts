// components/Navbar/menuData.ts
import type { MenuItem } from "./menuTypes";

export const menuItems: MenuItem[] = [
    {
        label: "Product",
        subItems: [
            {
                label: "Full-Stack Development",
                href: "/product/FullStackDescription",
                image: "/img/coding.png",
                description: "Aplicaciones web modernas de punta a punta",
            },
            {
                label: "Modern APIs",
                href: "/product/ModernAPIDescription",
                image: "/img/cloud.png",
                description: "REST, GraphQL y arquitecturas escalables",
            },
            {
                label: "DevOps & CI/CD",
                href: "/product/DevOpsCICDDescription",
                image: "/img/devops.png",
                description: "Automatización, despliegue y confiabilidad",
            },
            {
                label: "Architecture & Refactors",
                href: "/product/ArchitectureRefactorsDescription",
                image: "/img/web-maintenance.png",
                description: "Código limpio, escalable y mantenible",
            },
            {
                label: "Technical UX / UI",
                href: "/product/UXUIDescription",
                image: "/img/landing-page.png",
                description: "Interfaces pensadas para producto real",
            },
            {
                label: "Mentorship & Code Review",
                href: "/product/MentorshipCodeReviewDescription",
                image: "/img/code-review.png",
                description: "Mejora continua y estándares profesionales",
            },
            {
                label: "Security & Hardening",
                href: "/product/SecurityHardeningDescription",
                image: "/img/binary-code.png",
                description: "Protección, auditorías y buenas prácticas",
            },
            {
                label: "Analytics & Tracking",
                href: "/product/AnalyticsTrackingDescription",
                image: "/img/data-analytics.png",
                description: "Métricas, eventos y toma de decisiones",
            },
        ],
    },
    {
        label: "Solutions",
        subItems: [
            {
                label: "For Developers",
                href: "/solutions/developers",
                image: "/img/programmer.png",
                description: "Herramientas y soporte para devs",
            },
            {
                label: "For Teams",
                href: "/solutions/teams",
                image: "/img/development.png",
                description: "Escalabilidad y colaboración",
            },
            {
                label: "Open Source",
                href: "/solutions/open-source",
                image: "/img/open-source.png",
                description: "Proyectos y contribuciones públicas",
            },
        ],
    },
    {
        label: "Pricing",
        href: "/product/PricingSection",
    },
    {
        label: "Contact",
        href: "/contact",
    },
];
