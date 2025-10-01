// components/DevOpsCICDDescription.tsx
"use client";

import React from 'react';

interface DevOpsCardData {
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

const ciCdData: DevOpsCardData = {
    title: "CI/CD Moderno",
    description:
        "Automatizo pipelines de integración y entrega continua con enfoque en calidad, seguridad y velocidad. Cada commit se prueba, construye, escanea y despliega de forma confiable y reproducible.",
    technologies: ["GitHub Actions", "GitLab CI", "CircleCI", "Argo CD", "Trunk-Based Dev", "SemVer", "Canary Deployments", "Feature Flags"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600 dark:text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-cyan-100 dark:bg-cyan-900/30",
        bgBadge: "bg-cyan-50 dark:bg-cyan-900/20",
        textBadge: "text-cyan-700 dark:text-cyan-300",
    },
};

const infraData: DevOpsCardData = {
    title: "Infraestructura como Código",
    description:
        "Gestiono entornos escalables y seguros usando IaC, contenedores y orquestación. Todo está versionado, auditable y reproducible desde cero en minutos.",
    technologies: ["Docker", "Kubernetes", "Terraform", "AWS", "Azure", "Helm", "Prometheus", "Grafana"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c.375.375.586.89.586 1.414v3.586a2 2 0 01-2 2H5a2 2 0 01-2-2V13.172a2 2 0 01.586-1.414l5-5A2 2 0 019 6.172V5L8 4z" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-violet-100 dark:bg-violet-900/30",
        bgBadge: "bg-violet-50 dark:bg-violet-900/20",
        textBadge: "text-violet-700 dark:text-violet-300",
    },
};

const DevOpsCard = ({ data }: { data: DevOpsCardData }) => {
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

const DevOpsCICDDescription = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        <span className="text-cyan-600 dark:text-cyan-400">DevOps & CI/CD</span>: velocidad con confianza
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Automatizo el ciclo de vida del software para entregar valor de forma rápida, segura y repetible — desde el primer commit hasta producción.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <DevOpsCard data={ciCdData} />
                    <DevOpsCard data={infraData} />
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-block bg-gradient-to-r from-cyan-500 to-violet-600 text-white px-6 py-3 rounded-full font-medium shadow-lg">
                        <span className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Automatización inteligente, no solo scripts
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DevOpsCICDDescription;