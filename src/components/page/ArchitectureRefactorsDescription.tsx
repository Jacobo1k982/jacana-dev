// components/ArchitectureRefactorsDescription.tsx
"use client";

import React from 'react';

interface ArchitectureCardData {
    title: string;
    description: string;
    technologies: string[];
    icon: React.ReactNode;
    colors: {
        bgIcon: string;
        bgBadge: string;
        textBadge: string;
    };
}

const architectureData: ArchitectureCardData = {
    title: "Arquitectura Escalable",
    description:
        "Diseño sistemas modulares, mantenibles y evolutivos usando patrones modernos: Clean Architecture, Hexagonal, CQRS, Event-Driven y Microservicios cuando aportan valor real.",
    technologies: ["Domain-Driven Design", "Clean Architecture", "CQRS", "Event Sourcing", "Microservicios", "Monolito Modular", "Bounded Contexts", "API Gateways"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-rose-100 dark:bg-rose-900/30",
        bgBadge: "bg-rose-50 dark:bg-rose-900/20",
        textBadge: "text-rose-700 dark:text-rose-300",
    },
};

const refactoringData: ArchitectureCardData = {
    title: "Refactores Estratégicos",
    description:
        "Transformo código heredado en sistemas modernos mediante refactores seguros, tests automatizados y migraciones incrementales — sin parar la producción ni introducir regresiones.",
    technologies: ["TDD", "Strangler Fig Pattern", "Golden Master", "Code Smells", "SOLID", "Modular Monolith", "Feature Toggles", "Observability-Driven Refactoring"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-teal-100 dark:bg-teal-900/30",
        bgBadge: "bg-teal-50 dark:bg-teal-900/20",
        textBadge: "text-teal-700 dark:text-teal-300",
    },
};

const ArchitectureCard = ({ data }: { data: ArchitectureCardData }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-lg ${data.colors.bgIcon} flex items-center justify-center`}>
                    {data.icon}
                </div>
                <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">{data.title}</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{data.description}</p>
            <ul className="flex flex-wrap gap-2">
                {data.technologies.map((tech) => (
                    <li
                        key={tech}
                        className={`px-3 py-1 ${data.colors.bgBadge} ${data.colors.textBadge} text-sm rounded-full`}
                    >
                        {tech}
                    </li>
                ))}
            </ul>
        </div>
    );
};

const ArchitectureRefactorsDescription = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        <span className="text-rose-600 dark:text-rose-400">Arquitectura & Refactores</span>: código que evoluciona con el negocio
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Diseño sistemas sólidos desde el inicio y rescato aplicaciones heredadas mediante estrategias técnicas que reducen riesgo y maximizan el valor a largo plazo.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <ArchitectureCard data={architectureData} />
                    <ArchitectureCard data={refactoringData} />
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-block bg-gradient-to-r from-rose-500 to-teal-600 text-white px-6 py-3 rounded-full font-medium shadow-lg">
                        <span className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Arquitectura no es dibujar diagramas: es tomar decisiones técnicas que perduran
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ArchitectureRefactorsDescription;