'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

interface PricingPlan {
    name: string
    price: string
    period: string
    description: string
    features: string[]
    ctaLabel: string
    ctaHref: string
    popular?: boolean
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
]

const CheckIcon = () => (
    <svg
        className="h-5 w-5 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
)

const PricingCard = ({ plan, index }: { plan: PricingPlan; index: number }) => {
    const gradients = [
        "from-cyan-500 to-blue-600",
        "from-violet-500 to-purple-600",
        "from-rose-500 to-pink-600"
    ]

    const gradient = gradients[index]
    const borderClass = plan.popular ? "border-violet-400/50" : "border-cyan-500/30"

    return (
        <Card className={`
      relative overflow-hidden
      bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50
      backdrop-blur-xl border-2 ${borderClass}
      hover:border-violet-400/50 transition-all duration-500
      group ${plan.popular ? 'scale-[1.02]' : ''}
    `}>
            {/* Glow Effect */}
            <div className={`
        absolute inset-0 bg-gradient-to-br from-${gradient.split('-')[0]}-400/20 to-${gradient.split('-')[2]}-600/20
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
      `} />

            {/* Animated Border Glow */}
            <div className={`
        absolute inset-0 bg-gradient-to-br ${gradient}
        opacity-0 group-hover:opacity-20 transition-opacity duration-500
        blur-2xl
      `} />

            {/* Popular Badge */}
            {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-violet-500 to-purple-600 text-white border-none shadow-lg">
                        Más popular
                    </Badge>
                </div>
            )}

            {/* Content */}
            <CardHeader className="relative z-10 text-center">
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                    {plan.name}
                </CardTitle>
                <div className="mb-4">
                    <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                    {plan.period && (
                        <span className="text-gray-400 ml-2">{plan.period}</span>
                    )}
                </div>
                <p className="text-gray-400 text-sm">{plan.description}</p>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6">
                <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                            <div className={`mt-0.5 p-1 rounded-lg bg-gradient-to-br ${gradient}`}>
                                <CheckIcon />
                            </div>
                            <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                        </li>
                    ))}
                </ul>

                <Link
                    href={plan.ctaHref}
                    className={`
            w-full block text-center py-4 px-6 rounded-xl font-semibold
            transition-all duration-300 hover:scale-105 shadow-lg
            ${plan.popular
                            ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white hover:shadow-violet-500/50"
                            : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white hover:shadow-cyan-500/50"
                        }
          `}
                >
                    {plan.ctaLabel}
                </Link>
            </CardContent>
        </Card>
    )
}

const PricingSection = () => {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm text-cyan-400 font-medium">Pricing Plans</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Precios transparentes,{" "}
                        </span>
                        <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                            valor real
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Sin sorpresas. Cada proyecto incluye{" "}
                        <span className="text-cyan-400 font-semibold">código limpio</span>,{" "}
                        <span className="text-violet-400 font-semibold">documentación</span> y{" "}
                        <span className="text-purple-400 font-semibold">soporte</span> post-lanzamiento.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {pricingPlans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} index={index} />
                    ))}
                </div>

                {/* Bottom Note */}
                <div className="text-center max-w-2xl mx-auto">
                    <p className="text-gray-400 text-sm leading-relaxed">
                        ¿No encuentras lo que necesitas? Ofrezco también{" "}
                        <span className="text-cyan-400 font-semibold">mentoría</span>,{" "}
                        <span className="text-violet-400 font-semibold">auditorías técnicas</span> y{" "}
                        <span className="text-purple-400 font-semibold">servicios por hora</span>.
                        <br />
                        <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 hover:underline font-medium mt-2 inline-block">
                            Contáctame para una consulta gratuita.
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}

export default PricingSection