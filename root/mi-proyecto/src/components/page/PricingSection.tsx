// components/PricingSection.tsx
"use client";

import React from 'react';
import Link from 'next/link';

interface PricingPlan {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    ctaLabel: string;
    ctaHref: string;
    popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
    {
        name: "Freelance",
        price: "Desde $1,200",
        period: "por proyecto",
        description: "Ideal para MVPs, landing pages o APIs pequeñas.",
        features: [
            "Hasta 40 horas de desarrollo",
            "Frontend con Next.js + Tailwind",
            "Backend con Node.js o Python",
            "Base de datos (PostgreSQL/MongoDB)",
            "Despliegue en Vercel/Render",
            "1 ronda de revisiones",
            "Documentación básica"
        ],
        ctaLabel: "Iniciar proyecto",
        ctaHref: "/contact"
    },
    {
        name: "Startup",
        price: "Desde $3,500",
        period: "por proyecto",
        description: "Para productos con usuarios reales y escalamiento inicial.",
        features: [
            "Hasta 120 horas de desarrollo",
            "Arquitectura limpia (Clean/Hexagonal)",
            "APIs REST/GraphQL con tRPC",
            "Autenticación (OAuth/JWT)",
            "Testing (unitario + integración)",
            "CI/CD automatizado",
            "Monitoreo básico (logs, errores)",
            "2 semanas de soporte post-lanzamiento",
            "Documentación técnica completa"
        ],
        ctaLabel: "Solicitar cotización",
        ctaHref: "/contact",
        popular: true
    },
    {
        name: "Enterprise",
        price: "Personalizado",
        period: "",
        description: "Soluciones a medida para empresas con alto tráfico o complejidad.",
        features: [
            "Equipo dedicado (dev + QA + DevOps)",
            "Microservicios o monolito modular",
            "Seguridad avanzada (OWASP, pentesting)",
            "Observabilidad (Prometheus, Grafana)",
            "Hardening de infraestructura",
            "Mentoría y code review incluidos",
            "SLA de disponibilidad",
            "Soporte 24/7 (opcional)",
            "Auditoría de deuda técnica"
        ],
        ctaLabel: "Hablemos",
        ctaHref: "/contact"
    }
];

const CheckIcon = () => (
    <svg
        className="h-5 w-5 text-emerald-500 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const PricingSection = () => {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Precios transparentes, <span className="text-indigo-600 dark:text-indigo-400">valor real</span>
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Sin sorpresas. Cada proyecto incluye código limpio, documentación y soporte post-lanzamiento.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {pricingPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border transition-all duration-300 hover:shadow-xl ${plan.popular
                                    ? "ring-2 ring-indigo-500 border-transparent scale-[1.02]"
                                    : "border-gray-200 dark:border-gray-700"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md">
                                    Más popular
                                </div>
                            )}
                            <div className="p-7 sm:p-8">
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                                <div className="mb-5">
                                    <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                                    {plan.period && (
                                        <span className="text-gray-600 dark:text-gray-400 ml-2 text-base">{plan.period}</span>
                                    )}
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-7 text-sm">{plan.description}</p>

                                <ul className="space-y-4 mb-9">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-start">
                                            <CheckIcon />
                                            <span className="ml-3 text-gray-700 dark:text-gray-300 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={plan.ctaHref}
                                    className={`w-full block text-center py-3 px-4 rounded-xl font-medium transition-all duration-200 ${plan.popular
                                            ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
                                        }`}
                                >
                                    {plan.ctaLabel}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm max-w-2xl mx-auto">
                    <p>
                        ¿No encuentras lo que necesitas? Ofrezco también mentoría, auditorías técnicas y servicios por hora.
                        <br />
                        <Link href="/contact" className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium">
                            Contáctame para una consulta gratuita.
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;