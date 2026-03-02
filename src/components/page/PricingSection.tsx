'use client';

import React from 'react';
import Link from 'next/link';
import { Check, Zap, ArrowRight, Briefcase, ShieldCheck, Sparkles, Terminal, Cpu } from 'lucide-react';

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
        price: "1,200",
        period: "USD / project",
        description: "Ideal para MVPs, landing pages o APIs pequeñas.",
        features: [
            "Hasta 40 horas de desarrollo",
            "Frontend Next.js + Tailwind",
            "Backend Node.js / Python",
            "Database PostgreSQL/MongoDB",
            "Deploy Vercel/Render",
            "1 ronda de revisiones",
            "Documentación básica"
        ],
        ctaLabel: "Iniciar proyecto",
        ctaHref: "/contact",
        icon: <Briefcase className="w-5 h-5" />
    },
    {
        name: "Startup",
        price: "3,500",
        period: "USD / project",
        description: "Para productos con usuarios reales y escalamiento inicial.",
        features: [
            "Hasta 120 horas de desarrollo",
            "Arquitectura limpia (Clean/Hex)",
            "APIs REST/GraphQL con tRPC",
            "Autenticación OAuth/JWT",
            "Testing (unit + integration)",
            "CI/CD automatizado",
            "Monitoreo básico",
            "2 semanas soporte post-launch",
            "Documentación técnica"
        ],
        ctaLabel: "Solicitar cotización",
        ctaHref: "/contact",
        popular: true,
        icon: <Zap className="w-5 h-5" />
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "Contact",
        description: "Soluciones a medida para empresas con alto tráfico.",
        features: [
            "Equipo dedicado (Dev + QA + DevOps)",
            "Microservicios / Monolito modular",
            "Seguridad avanzada (OWASP)",
            "Observabilidad (Prometheus/Grafana)",
            "Hardening de infraestructura",
            "Mentoría y code review",
            "SLA de disponibilidad",
            "Soporte 24/7 (opcional)",
            "Auditoría deuda técnica"
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
                relative flex flex-col h-full rounded-xl border p-6 transition-all duration-500 ease-out overflow-hidden
                ${plan.popular
                    ? 'border-[#00FF9D]/50 bg-[#0d1117]/90 shadow-[0_0_40px_-12px_rgba(0,255,157,0.2)] z-10 scale-[1.02]'
                    : 'border-[#30363d] bg-[#161b22]/50 hover:border-[#8b949e] hover:bg-[#161b22]/80 backdrop-blur-sm hover:shadow-lg'
                }
                group
            `}
        >
            {/* Scanline effect */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

            {/* Top Accent Line */}
            <div className={`absolute top-0 left-0 right-0 h-px ${plan.popular ? 'bg-[#00FF9D]' : 'bg-[#30363d]'}`} />

            {/* Glow Effect on Hover */}
            {plan.popular && (
                <div className="absolute inset-0 bg-[#00FF9D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            )}

            {/* Popular Badge */}
            {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
                    <div className="flex items-center gap-1.5 bg-[#00FF9D] text-black text-[10px] font-bold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-[0_0_15px_rgba(0,255,157,0.4)]">
                        <Sparkles className="w-3 h-3 fill-black" />
                        Recomendado
                    </div>
                </div>
            )}

            {/* Plan Header */}
            <div className="mb-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`
                            p-2 rounded-md border flex items-center justify-center transition-all duration-300
                            ${plan.popular
                                ? 'bg-[#00FF9D]/10 border-[#00FF9D]/30 text-[#00FF9D] shadow-[0_0_10px_rgba(0,255,157,0.2)]'
                                : 'bg-[#21262d] border-[#30363d] text-[#8b949e] group-hover:border-[#8b949e]'
                            }
                        `}>
                            {plan.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white tracking-tight">{plan.name}</h3>
                    </div>

                    {/* Status indicator */}
                    <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${plan.popular ? 'text-[#00FF9D] border-[#00FF9D]/30 bg-[#00FF9D]/10' : 'text-[#8b949e] border-[#30363d] bg-[#21262d]'}`}>
                        Active
                    </span>
                </div>

                <p className="text-[#8b949e] text-xs leading-relaxed mb-4 min-h-[32px]">
                    {plan.description}
                </p>

                <div className="flex items-baseline gap-1 border-b border-[#30363d] pb-4">
                    {plan.price !== "Custom" ? (
                        <>
                            <span className="text-sm font-medium text-[#00FF9D]">$</span>
                            <span className="text-4xl font-extrabold text-white tracking-tighter">{plan.price}</span>
                            <span className="text-[#8b949e] text-xs ml-2 font-mono uppercase">{plan.period}</span>
                        </>
                    ) : (
                        <div className="flex flex-col">
                            <span className="text-3xl font-bold text-white tracking-tight">{plan.price}</span>
                            <span className="text-xs text-[#8b949e] font-mono mt-1">Based on requirements</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Features List */}
            <ul className="space-y-2.5 mb-6 flex-1 relative z-10">
                <li className="text-[10px] font-semibold text-[#8b949e] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Terminal size={10} /> Spec Includes
                </li>
                {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs group/item">
                        <div className="flex-shrink-0 mt-0.5 w-3.5 h-3.5 rounded-full bg-[#21262d] flex items-center justify-center border border-[#30363d] group-hover/item:border-[#00FF9D]/50 transition-colors">
                            <Check className={`w-2 h-2 ${plan.popular ? 'text-[#00FF9D]' : 'text-[#8b949e] group-hover/item:text-[#00FF9D]'}`} />
                        </div>
                        <span className="text-[#c9d1d9] leading-snug group-hover/item:text-white transition-colors font-mono">{feature}</span>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-auto relative z-10">
                <Link
                    href={plan.ctaHref}
                    className={`
                        group/btn relative w-full inline-flex items-center justify-center py-2.5 px-4 rounded-md text-xs font-semibold transition-all duration-300 overflow-hidden
                        ${plan.popular
                            ? 'bg-[#00FF9D] text-black hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] active:scale-95'
                            : 'bg-[#21262d] text-[#c9d1d9] border border-[#30363d] hover:bg-[#30363d] hover:text-white hover:border-[#8b949e] active:scale-95'
                        }
                    `}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        {plan.ctaLabel}
                        <ArrowRight className="w-3.5 h-3.5 transition-all duration-300 -translate-x-1 opacity-60 group-hover/btn:opacity-100 group-hover/btn:translate-x-0" />
                    </span>
                </Link>
            </div>
        </div>
    );
};

const PricingSection = () => {
    return (
        <section className="relative py-20 px-2 sm:px-6 lg:px-8 bg-[#010409] overflow-hidden selection:bg-[#1f6feb] selection:text-white">

            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                {/* Ambient Glow */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#00FF9D]/5 rounded-full blur-[150px] pointer-events-none" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(#8b949e 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d] mb-6 font-mono text-[10px] uppercase tracking-widest">
                        <Cpu className="w-3 h-3 text-[#00FF9D]" />
                        <span className="text-[#8b949e]">Resource Allocation</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
                        Planes de desarrollo
                    </h2>

                    <p className="text-lg text-[#8b949e] leading-relaxed max-w-2xl mx-auto">
                        Selecciona la capacidad de procesamiento y soporte necesaria para tu misión.
                    </p>
                </div>

                {/* Pricing Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} />
                    ))}
                </div>

                {/* Footer Note */}
                <div className="mt-20 text-center border-t border-[#21262d] pt-10">
                    <p className="text-[#8b949e] text-sm font-medium mb-4 font-mono">
                        // También disponible para auditorías técnicas y mentoría por hora.
                    </p>
                    <Link
                        href="/contact"
                        className="group inline-flex items-center text-[#58a6ff] hover:text-[#00FF9D] font-semibold transition-colors text-sm"
                    >
                        Consulta gratuita
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default PricingSection;