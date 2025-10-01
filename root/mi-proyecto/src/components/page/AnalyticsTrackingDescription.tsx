// components/AnalyticsTrackingDescription.tsx
"use client";

import React from 'react';

interface AnalyticsCardData {
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

const productAnalyticsData: AnalyticsCardData = {
    title: "Analytics de Producto",
    description:
        "Implemento métricas significativas que miden engagement, conversión y retención. Diseño eventos estructurados (event tracking) alineados con objetivos de negocio, no solo clicks.",
    technologies: ["Google Analytics 4", "Segment", "Mixpanel", "Amplitude", "Custom Event Schema", "Funnel Analysis", "Cohort Tracking", "A/B Testing"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-indigo-100 dark:bg-indigo-900/30",
        bgBadge: "bg-indigo-50 dark:bg-indigo-900/20",
        textBadge: "text-indigo-700 dark:text-indigo-300",
    },
};

const privacyTrackingData: AnalyticsCardData = {
    title: "Tracking Ético & Privacidad",
    description:
        "Respeto la privacidad del usuario mediante consentimiento explícito, anonimización de datos, cumplimiento de GDPR/CCPA y arquitecturas de tracking first-party. Nada se rastrea sin permiso.",
    technologies: ["Cookie Consent (Osano, Cookiebot)", "GDPR/CCPA Compliance", "First-Party Data", "Data Minimization", "Server-Side Tracking", "Proxy Endpoints", "DNT Respect", "Privacy by Design"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-teal-100 dark:bg-teal-900/30",
        bgBadge: "bg-teal-50 dark:bg-teal-900/20",
        textBadge: "text-teal-700 dark:text-teal-300",
    },
};

const AnalyticsCard = ({ data }: { AnalyticsCardData }) => {
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

const AnalyticsTrackingDescription = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        <span className="text-indigo-600 dark:text-indigo-400">Analytics & Tracking</span>: datos con propósito
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Implemento sistemas de medición que respetan la privacidad del usuario y generan insights accionables para mejorar productos y experiencias digitales.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <AnalyticsCard data={productAnalyticsData} />
                    <AnalyticsCard data={privacyTrackingData} />
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-block bg-gradient-to-r from-indigo-500 to-teal-600 text-white px-6 py-3 rounded-full font-medium shadow-lg">
                        <span className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Medir no es espiar: es entender para servir mejor
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsTrackingDescription;