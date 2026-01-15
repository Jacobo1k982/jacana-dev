'use client';

import { useState, useEffect } from 'react';

export default function SecuritySection() {
    const [checks, setChecks] = useState<boolean[]>([false, false, false]);

    useEffect(() => {
        const timer1 = setTimeout(() => setChecks([true, false, false]), 500);
        const timer2 = setTimeout(() => setChecks([true, true, false]), 1500);
        const timer3 = setTimeout(() => setChecks([true, true, true]), 2500);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-fade-up">Security built in</h2>
                <p className="text-xl text-gray-600 mb-16 animate-fade-up animate-delay-200">
                    Code scanning, secret scanning, dependency review — secure every step of your workflow.
                </p>

                <div className="flex justify-center mb-12">
                    <div className="relative">
                        <div className="w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center text-6xl animate-bounce">🛡️</div>
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white text-xl animate-ping">
                            ✓
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {[
                        { title: "Code Scanning", desc: "Find vulnerabilities before they reach production." },
                        { title: "Secret Scanning", desc: "Detect leaked API keys and tokens automatically." },
                        { title: "Dependency Review", desc: "Know what’s changing in your dependencies." },
                    ].map((item, idx) => (
                        <div
                            key={idx}
                            className={`p-6 bg-gray-50 rounded-xl transition-all duration-500 ${checks[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                        >
                            <div className="text-4xl mb-4">✅</div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}