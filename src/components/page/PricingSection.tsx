'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Zap, ArrowRight, Briefcase, ShieldCheck, Sparkles } from 'lucide-react';

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

const PricingCard = ({ plan }: { plan: PricingPlan }) => {
    return (
        <div
            className={`
                relative flex flex-col h-full rounded-xl border p-7 transition-all duration-300 ease-out
                ${plan.popular
                    ? 'border-[#238636] bg-[#0d1117] shadow-[0_0_30px_-10px_rgba(35,134,54,0.3)] z-10 scale-[1.02]'
                    : 'border-[#30363d] bg-[#161b22]/50 hover:border-[#8b949e] hover:bg-[#161b22] hover:-translate-y-1 hover:shadow-xl backdrop-blur-sm'
                }
            `}
        >
            {/* Popular Badge */}
            {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#238636] to-[#2ea043] text-white text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg border border-[#1f6feb]/20">
                        <Sparkles className="w-3 h-3 fill-white text-white" />
                        Recomendado
                    </div>
                </div>
            )}

            {/* Plan Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`
                        p-2.5 rounded-lg flex items-center justify-center transition-colors
                        ${plan.popular
                            ? 'bg-[#238636]/15 text-[#3fb950]'
                            : 'bg-[#21262d] text-[#8b949e]'
                        }
                    `}>
                        {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#f0f6fc]">{plan.name}</h3>
                </div>

                <p className="text-[#8b949e] text-sm leading-relaxed mb-6 min-h-[40px]">
                    {plan.description}
                </p>

                <div className="flex items-baseline gap-1.5">
                    {plan.price !== "Custom" ? (
                        <>
                            <span className="text-sm font-medium text-[#8b949e]">$</span>
                            <span className="text-5xl font-extrabold text-[#f0f6fc] tracking-tight">{plan.price.replace('$', '').replace(',', '')}</span>
                            <span className="text-[#8b949e] text-sm ml-1">{plan.period}</span>
                        </>
                    ) : (
                        <span className="text-4xl font-bold text-[#f0f6fc] tracking-tight">{plan.price}</span>
                    )}
                </div>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm group">
                        <div className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-[#21262d] flex items-center justify-center border border-[#30363d] group-hover:border-[#238636]/50 transition-colors">
                            <Check className={`w-3 h-3 ${plan.popular ? 'text-[#3fb950]' : 'text-[#8b949e] group-hover:text-[#3fb950]'}`} />
                        </div>
                        <span className="text-[#c9d1d9] leading-snug group-hover:text-[#f0f6fc] transition-colors">{feature}</span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-auto pt-6 border-t border-[#30363d]/50">
                <Link
                    href={plan.ctaHref}
                    className={`
                        group relative w-full inline-flex items-center justify-center py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 overflow-hidden
                        ${plan.popular
                            ? 'bg-[#238636] text-white hover:bg-[#2ea043] shadow-[0_0_15px_rgba(46,160,67,0.4)] border border-transparent'
                            : 'bg-[#21262d] text-[#c9d1d9] border border-[#30363d] hover:bg-[#30363d] hover:text-white hover:border-[#8b949e]'
                        }
                    `}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {plan.ctaLabel}
                        <ArrowRight className="w-4 h-4 transition-all duration-300 -translate-x-1 opacity-60 group-hover:opacity-100 group-hover:translate-x-0" />
                    </span>
                </Link>
            </div>
        </div>
    );
};

const PricingSection = () => {
    return (
        <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#010409] overflow-hidden selection:bg-[#1f6feb] selection:text-white">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Subtle radial gradient for "spotlight" effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#1f6feb]/5 rounded-full blur-[120px] pointer-events-none" />

                {/* Dot Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)',
                        backgroundSize: '32px 32px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#21262d] border border-[#30363d] mb-6">
                        <span className="flex h-2 w-2 rounded-full bg-[#3fb950] animate-pulse"></span>
                        <span className="text-xs font-medium text-[#8b949e] uppercase tracking-wider">Precios Transparentes</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-[#f0f6fc] mb-6 tracking-tight">
                        Planes de desarrollo
                        <span className="block text-[#8b949e] font-medium mt-2 text-2xl md:text-3xl">
                            Escala a tu propio ritmo
                        </span>
                    </h2>

                    <p className="text-lg text-[#8b949e] leading-relaxed max-w-2xl mx-auto">
                        Soluciones escalables y arquitectura sólida. Selecciona el nivel de servicio que mejor se adapte a la fase actual de tu proyecto.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} />
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-24 text-center border-t border-[#21262d] pt-10">
                    <p className="text-[#8b949e] font-medium mb-4">
                        ¿Necesitas algo diferente? Ofrezco servicios por hora, auditorías técnicas y mentoría.
                    </p>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center text-[#58a6ff] hover:text-[#79c0ff] font-semibold transition-colors"
                    >
                        Contáctame para una consulta gratuita
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default PricingSection;