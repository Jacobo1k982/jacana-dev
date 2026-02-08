'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Zap, ArrowRight, Briefcase, ShieldCheck } from 'lucide-react';

interface PricingPlan {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    ctaLabel: string;
    ctaHref: string;
    popular?: boolean;
    icon: React.ReactNode;
}

const pricingPlans: PricingPlan[] = [
    {
        name: "Freelance",
        price: "$1,200",
        period: "/proyecto",
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
        ctaHref: "/contact",
        icon: <Briefcase className="w-5 h-5" />
    },
    {
        name: "Startup",
        price: "$3,500",
        period: "/proyecto",
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
        popular: true,
        icon: <Zap className="w-5 h-5" />
    },
    {
        name: "Enterprise",
        price: "Custom",
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
        ctaHref: "/contact",
        icon: <ShieldCheck className="w-5 h-5" />
    }
];

const PricingCard = ({ plan, index }: { plan: PricingPlan; index: number }) => {
    return (
        <div
            className={`
                relative flex flex-col h-full rounded-md border bg-[#161b22] p-6 transition-all duration-200
                ${plan.popular
                    ? 'border-[#238636] shadow-[0_0_0_1px_rgba(35,134,54,0.2)] z-10'
                    : 'border-[#30363d] hover:border-[#8b949e]'
                }
            `}
        >
            {/* Popular Badge */}
            {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#238636] text-[#f0f6fc] text-xs font-bold px-3 py-1 rounded-full shadow-lg border border-[#1f6feb]/30 flex items-center gap-1">
                        <Zap className="w-3 h-3 fill-white" /> POPULAR
                    </span>
                </div>
            )}

            {/* Plan Header */}
            <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <div className={`p-2 rounded-md ${plan.popular ? 'bg-[#238636]/20 text-[#3fb950]' : 'bg-[#21262d] text-[#8b949e]'}`}>
                        {plan.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-[#f0f6fc]">{plan.name}</h3>
                </div>

                <p className="text-sm text-[#8b949e] mb-4 h-10 flex items-center">{plan.description}</p>

                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#f0f6fc] tracking-tight">{plan.price}</span>
                    {plan.period && <span className="text-[#8b949e] text-sm">{plan.period}</span>}
                </div>
            </div>

            {/* Features List */}
            <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm group">
                        <div className="mt-0.5">
                            <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? 'text-[#3fb950]' : 'text-[#8b949e] group-hover:text-[#c9d1d9] transition-colors'}`} />
                        </div>
                        <span className="text-[#c9d1d9] leading-relaxed group-hover:text-[#f0f6fc] transition-colors">{feature}</span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-auto pt-4 border-t border-[#30363d]">
                <Link
                    href={plan.ctaHref}
                    className={`
                        w-full block text-center py-2.5 px-4 rounded-md text-sm font-semibold transition-all duration-200 border flex items-center justify-center gap-2
                        ${plan.popular
                            ? 'bg-[#238636] border-transparent text-white hover:bg-[#2ea043] shadow-sm'
                            : 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white hover:border-[#8b949e]'
                        }
                    `}
                >
                    {plan.ctaLabel}
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-1 group-hover:translate-x-0" />
                </Link>
            </div>
        </div>
    );
};

const PricingSection = () => {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0d1117] border-t border-[#30363d] overflow-hidden">
            {/* GitHub Dot Pattern Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#f0f6fc] mb-4">
                        Planes de desarrollo
                    </h2>
                    <p className="text-lg text-[#8b949e] leading-relaxed">
                        Soluciones escalables y código de calidad para empresas y startups.
                        Elige el plan que mejor se adapte a tu proyecto.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} index={index} />
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-20 text-center border-t border-[#30363d] pt-8">
                    <p className="text-sm text-[#8b949e]">
                        ¿Necesitas algo diferente? Ofrezco servicios por hora, auditorías técnicas y mentoría.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-block mt-3 text-[#58a6ff] hover:underline hover:text-[#79c0ff] font-medium"
                    >
                        Contáctame para una consulta gratuita &rarr;
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;