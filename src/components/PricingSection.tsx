'use client';

import { useState } from 'react';
import { Check, Info } from 'lucide-react';

export default function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(true);

    // Datos de los planes adaptados a un estilo de desarrollador
    const plans = [
        {
            name: "Free",
            description: "Para desarrolladores individuales",
            price: isAnnual ? "$0" : "$0",
            period: "forever",
            features: [
                "Unlimited public repositories",
                "2,000 GitHub Actions minutes/month",
                "500MB of GitHub Packages storage",
                "Community support"
            ],
            cta: "Sign up for free",
            popular: false,
        },
        {
            name: "Team",
            description: "Para equipos en crecimiento",
            price: isAnnual ? "$4" : "$5",
            period: "/user/month",
            features: [
                "Everything in Free",
                "2,000 GitHub Actions minutes/month",
                "2GB of GitHub Packages storage",
                "Code owners",
                "Team discussions"
            ],
            cta: "Start free trial",
            popular: true,
        },
        {
            name: "Enterprise",
            description: "Para empresas de gran escala",
            price: "Custom",
            period: "",
            features: [
                "Everything in Team",
                "SAML/SSO and SCIM provisioning",
                "Advanced security and compliance",
                "Self-hosted runners",
                "24/7 dedicated support"
            ],
            cta: "Contact Sales",
            popular: false,
        },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1117] border-t border-[#30363d]">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#f0f6fc] mb-4">
                        Planes
                    </h2>
                    <p className="text-lg text-[#8b949e]">
                        La colaboración segura y escalable para cualquier equipo.
                    </p>
                </div>

                {/* Toggle Segmentado Estilo GitHub */}
                <div className="flex justify-center mb-16">
                    <div className="inline-flex bg-[#0d1117] border border-[#30363d] rounded-md p-1">
                        <button
                            onClick={() => setIsAnnual(true)}
                            className={`
                                relative px-6 py-2 text-sm font-medium rounded-md transition-all duration-200
                                ${isAnnual
                                    ? 'bg-[#21262d] text-[#f0f6fc] shadow-sm'
                                    : 'text-[#8b949e] hover:text-[#c9d1d9]'}
                            `}
                        >
                            Annual (Save 20%)
                        </button>
                        <button
                            onClick={() => setIsAnnual(false)}
                            className={`
                                relative px-6 py-2 text-sm font-medium rounded-md transition-all duration-200
                                ${!isAnnual
                                    ? 'bg-[#21262d] text-[#f0f6fc] shadow-sm'
                                    : 'text-[#8b949e] hover:text-[#c9d1d9]'}
                            `}
                        >
                            Monthly
                        </button>
                    </div>
                </div>

                {/* Pricing Grid */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`
                                relative flex flex-col h-full rounded-lg border bg-[#161b22] p-6 transition-colors duration-200
                                ${plan.popular
                                    ? 'border-[#238636] hover:border-[#2ea043] shadow-[0_0_0_1px_rgba(35,134,54,0.2)]'
                                    : 'border-[#30363d] hover:border-[#8b949e]'}
                            `}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-[#238636] text-[#f0f6fc] text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                                        MOST POPULAR
                                    </span>
                                </div>
                            )}

                            {/* Plan Info */}
                            <div className="mb-6">
                                <h3 className="text-xl font-semibold text-[#f0f6fc]">{plan.name}</h3>
                                <p className="text-sm text-[#8b949e] mt-1 mb-4 h-10">{plan.description}</p>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-bold text-[#f0f6fc]">{plan.price}</span>
                                    {plan.period && <span className="text-[#8b949e] text-sm">{plan.period}</span>}
                                </div>
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8 flex-1">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3 text-sm">
                                        <Check className="w-4 h-4 text-[#3fb950] flex-shrink-0 mt-0.5" />
                                        <span className="text-[#c9d1d9] leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <div className="mt-auto">
                                <button
                                    className={`
                                        w-full py-2 px-4 rounded-md text-sm font-semibold transition-all duration-200 border
                                        ${plan.popular
                                            ? 'bg-[#238636] border-transparent text-white hover:bg-[#2ea043] focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#161b22]'
                                            : 'bg-[#21262d] border-[#30363d] text-[#c9d1d9] hover:bg-[#30363d] hover:text-white hover:border-[#8b949e]'
                                        }
                                    `}
                                >
                                    {plan.cta}
                                </button>

                                {plan.popular && (
                                    <p className="text-xs text-[#8b949e] text-center mt-3">
                                        14-day free trial
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="mt-20 text-center border-t border-[#30363d] pt-8">
                    <p className="text-sm text-[#8b949e]">
                        ¿Buscas precios para educación u organizaciones sin ánimo de lucro?{" "}
                        <a href="#" className="text-[#58a6ff] hover:underline">Aplica para GitHub Free</a>.
                    </p>
                </div>
            </div>
        </section>
    );
}