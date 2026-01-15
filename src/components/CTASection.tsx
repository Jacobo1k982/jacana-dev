'use client';

import { useState, useEffect } from 'react';

export default function CTABanner() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsVisible((prev) => !prev);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-500 to-teal-600 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10 animate-pulse"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-lg opacity-90 mb-8">Join over 100 million developers on the world’s leading software development platform.</p>
                <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-lg hover:bg-gray-100 transition-transform transform hover:scale-105 shadow-lg">
                    Sign up for free
                </button>
            </div>
        </section>
    );
}