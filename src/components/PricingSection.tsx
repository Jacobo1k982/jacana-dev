'use client';

import { useState } from 'react';

export default function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(true);
    const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

    const plans = [
        {
            name: "Free",
            price: isAnnual ? "Free" : "Free",
            features: ["Unlimited public repos", "Community support", "Basic CI/CD minutes"],
            cta: "Get started",
            popular: false,
        },
        {
            name: "Team",
            price: isAnnual ? "$3/user/mo" : "$4/user/mo",
            features: ["Everything in Free", "Unlimited private repos", "Advanced CI/CD", "Team management"],
            cta: "Buy Team",
            popular: true,
        },
        {
            name: "Enterprise",
            price: isAnnual ? "Custom pricing" : "Custom pricing",
            features: ["Everything in Team", "SAML/SSO", "24/7 support", "Advanced security & compliance"],
            cta: "Contact sales",
            popular: false,
        },
    ];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
                <p className="text-lg text-gray-600 mb-12">Choose a plan that’s right for you.</p>

                {/* Toggle */}
                <div className="inline-flex bg-gray-200 p-1 rounded-full mb-16">
                    <button
                        onClick={() => setIsAnnual(true)}
                        className={`px-6 py-2 rounded-full transition-all ${isAnnual ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
                            }`}
                    >
                        Annual (save 20%)
                    </button>
                    <button
                        onClick={() => setIsAnnual(false)}
                        className={`px-6 py-2 rounded-full transition-all ${!isAnnual ? 'bg-white text-gray-900 shadow' : 'text-gray-600'
                            }`}
                    >
                        Monthly
                    </button>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative p-8 rounded-2xl transition-all duration-500 transform ${hoveredPlan === plan.name ? 'scale-105 z-10' : 'scale-100'
                                } ${plan.popular
                                    ? 'bg-white shadow-xl border-2 border-green-500'
                                    : 'bg-white shadow-lg'
                                }`}
                            onMouseEnter={() => setHoveredPlan(plan.name)}
                            onMouseLeave={() => setHoveredPlan(null)}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                        MOST POPULAR
                                    </span>
                                </div>
                            )}

                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                            <p className="text-3xl font-bold text-gray-900 mb-6">{plan.price}</p>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <span className="text-green-500 mt-1">✓</span>
                                        <span className="text-gray-700">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-3 rounded-lg font-semibold transition-colors ${plan.popular
                                        ? 'bg-green-500 hover:bg-green-600 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}