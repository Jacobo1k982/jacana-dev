// components/ModernAPIDescription.tsx
"use client";

import React from 'react';

// ✅ Definimos una interfaz reutilizable
interface TechCardData {
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

const restApiData: TechCardData = {
    title: "RESTful APIs",
    description:
        "Diseño APIs REST bien estructuradas, con recursos coherentes, códigos de estado HTTP semánticos, paginación, filtros y documentación interactiva mediante OpenAPI/Swagger.",
    technologies: ["OpenAPI 3.1", "Swagger UI", "Zod", "Express", "NestJS", "FastAPI", "HATEOAS", "Rate Limiting"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-blue-100 dark:bg-blue-900/30",
        bgBadge: "bg-blue-50 dark:bg-blue-900/20",
        textBadge: "text-blue-700 dark:text-blue-300",
    },
};

const graphqlData: TechCardData = {
    title: "GraphQL & tRPC",
    description:
        "Construyo APIs flexibles con GraphQL (Apollo, Yoga) y type-safe con tRPC, permitiendo a los clientes solicitar exactamente los datos que necesitan, reduciendo over-fetching y simplificando el frontend.",
    technologies: ["GraphQL", "tRPC", "Apollo Server", "Yoga", "TypeScript", "Zod", "Persisted Queries", "Schema Stitching"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c.375.375.586.89.586 1.414v3.586a2 2 0 01-2 2H5a2 2 0 01-2-2V13.172a2 2 0 01.586-1.414l5-5A2 2 0 019 6.172V5L8 4z" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-amber-100 dark:bg-amber-900/30",
        bgBadge: "bg-amber-50 dark:bg-amber-900/20",
        textBadge: "text-amber-700 dark:text-amber-300",
    },
};

// ✅ Ahora usamos la interfaz correctamente
const TechCard = ({ data }: { data: TechCardData }) => {
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

const ModernAPIDescription = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        <span className="text-blue-600 dark:text-blue-400">APIs Modernas</span>: el puente entre sistemas
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Construyo interfaces de programación robustas, seguras, versionadas y bien documentadas que permiten a productos escalar, integrarse y evolucionar sin romper compatibilidad.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <TechCard data={restApiData} />
                    <TechCard data={graphqlData} />
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-block bg-gradient-to-r from-blue-500 to-amber-500 text-white px-6 py-3 rounded-full font-medium shadow-lg">
                        <span className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            APIs bien diseñadas son la base de ecosistemas digitales escalables
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ModernAPIDescription;