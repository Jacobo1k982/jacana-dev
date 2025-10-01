// components/UXUIDescription.tsx
"use client";

import React from 'react';

interface UXUICardData {
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

const designData: UXUICardData = {
    title: "Diseño Centrado en el Usuario",
    description:
        "Creo flujos intuitivos basados en investigación, accesibilidad y principios de diseño humano. Cada interacción se valida con usuarios reales y métricas de comportamiento.",
    technologies: ["Figma", "User Testing", "Wireframing", "Design Systems", "WCAG 2.2", "A11y", "Prototyping", "Heuristics Evaluation"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-purple-100 dark:bg-purple-900/30",
        bgBadge: "bg-purple-50 dark:bg-purple-900/20",
        textBadge: "text-purple-700 dark:text-purple-300",
    },
};

const implementationData: UXUICardData = {
    title: "Implementación Técnica de UI",
    description:
        "Traduzco diseños en interfaces funcionales, performantes y accesibles usando componentes reutilizables, animaciones significativas y patrones de interacción probados.",
    technologies: ["React", "Next.js", "Tailwind CSS", "ShadCN/UI", "Framer Motion", "Radix UI", "CSS Container Queries", "View Transitions API"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-pink-100 dark:bg-pink-900/30",
        bgBadge: "bg-pink-50 dark:bg-pink-900/20",
        textBadge: "text-pink-700 dark:text-pink-300",
    },
};

const UXUICard = ({ data }: { data: UXUICardData }) => {
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

const UXUIDescription = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        <span className="text-purple-600 dark:text-purple-400">UX/UI Técnico</span>: donde el diseño se convierte en código
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Combino empatía por el usuario con rigor técnico para crear interfaces que no solo se ven bien, sino que funcionan, se sienten naturales y cumplen objetivos de negocio.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <UXUICard data={designData} />
                    <UXUICard data={implementationData} />
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-full font-medium shadow-lg">
                        <span className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            El mejor diseño es el que nadie nota… porque simplemente funciona
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UXUIDescription;