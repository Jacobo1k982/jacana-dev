'use client';

import { useState, useEffect } from 'react';

export default function CodeFlowSection() {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 4);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const steps = [
        { title: "Plan", desc: "Create projects, issues, and milestones." },
        { title: "Code", desc: "Write, review, and collaborate on code." },
        { title: "Build", desc: "Automate CI/CD with GitHub Actions." },
        { title: "Deploy", desc: "Ship to any cloud or server." },
    ];

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 animate-fade-up">
                    Your complete DevOps workflow
                </h2>
                <p className="text-lg text-gray-600 mb-12 animate-fade-up animate-delay-200">
                    From idea to production — all in one place.
                </p>

                <div className="relative">
                    <div className="flex justify-between items-center mb-12 relative z-10">
                        {steps.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center relative">
                                <div
                                    className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold transition-all duration-500 ${activeStep === idx
                                            ? 'bg-green-500 text-white scale-110 shadow-lg'
                                            : 'bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    {idx + 1}
                                </div>
                                <p className="mt-4 font-semibold text-gray-900">{step.title}</p>
                                <p className="text-sm text-gray-600 max-w-32 text-center">{step.desc}</p>
                                {idx < steps.length - 1 && (
                                    <div
                                        className={`absolute top-8 left-full w-24 h-0.5 bg-gray-300 transition-all duration-500 ${activeStep > idx ? 'bg-green-500' : ''
                                            }`}
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}