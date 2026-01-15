'use client';

import { useRef, useEffect, useState } from 'react';

export default function CollaborationSection() {
    const ref = useRef<HTMLDivElement>(null);
    const [offsetY, setOffsetY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setOffsetY(window.pageYOffset);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 pointer-events-none"
                style={{
                    transform: `translateY(${offsetY * 0.5}px)`,
                    opacity: 0.6,
                }}
            ></div>

            <div className="max-w-6xl mx-auto relative z-10 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 animate-slide-in-left">
                        Built for collaboration
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 animate-slide-in-left animate-delay-200">
                        Pull requests, code reviews, project boards, and discussions — everything your team needs to build better software, together.
                    </p>
                    <ul className="space-y-3 animate-slide-in-left animate-delay-400">
                        {[
                            "Real-time code review",
                            "Issue and project tracking",
                            "Team discussions",
                            "Integrated CI/CD pipelines",
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <span className="text-gray-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="animate-float">
                    <img
                        src="https://github.githubassets.com/images/modules/site/home-campaign/illo-collaboration.svg"
                        alt="Collaboration illustration"
                        className="w-full max-w-md mx-auto"
                    />
                </div>
            </div>
        </section>
    );
}