'use client';

import { useState, useEffect } from 'react';

export default function FeaturesSection() {
    const [animated, setAnimated] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setAnimated(true), 300);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 animate-fade-up">
                        Everything you need to build, scale, and deliver software
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto animate-fade-up animate-delay-200">
                        From code to cloud, GitHub is your platform for software innovation.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "Collaborative coding",
                            desc: "Work with your team in real-time with pull requests, code review, and branch management.",
                            icon: "🧑‍💻",
                        },
                        {
                            title: "CI/CD",
                            desc: "Automate your build, test, and deployment workflow with Actions.",
                            icon: "⚡",
                        },
                        {
                            title: "Security",
                            desc: "Secure your code and dependencies with automated vulnerability detection.",
                            icon: "🔒",
                        },
                        {
                            title: "Packages",
                            desc: "Host and manage your packages alongside your code.",
                            icon: "📦",
                        },
                        {
                            title: "Community",
                            desc: "Join the world’s largest developer community.",
                            icon: "🌍",
                        },
                        {
                            title: "Enterprise-ready",
                            desc: "Scale securely with SSO, audit logs, and compliance certifications.",
                            icon: "🏢",
                        },
                    ].map((feature, idx) => (
                        <div
                            key={idx}
                            className={`bg-gray-50 p-8 rounded-xl transition-all duration-500 hover:shadow-xl hover:-translate-y-2 transform ${animated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                            style={{ transitionDelay: `${idx * 150}ms` }}
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}