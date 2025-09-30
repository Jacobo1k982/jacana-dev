"use client";

import React from 'react';

const frontendData = {
    title: "Frontend Moderno",
    description:
        "Desarrollo interfaces rápidas, accesibles y SEO-friendly con enfoque en experiencia de usuario, performance y mantenibilidad. Uso arquitecturas basadas en componentes y patrones reactivos.",
    technologies: ["React", "Next.js 14+", "TypeScript", "Tailwind CSS", "ShadCN/UI", "Framer Motion", "Zod", "React Query"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a4 4 0 004-4V5z" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-indigo-100 dark:bg-indigo-900/30",
        bgBadge: "bg-indigo-50 dark:bg-indigo-900/20",
        textBadge: "text-indigo-700 dark:text-indigo-300",
    },
};

const backendData = {
    title: "Backend Robusto",
    description:
        "Construyo APIs seguras, escalables y bien documentadas con enfoque en arquitectura limpia, manejo de errores, validación de datos y observabilidad. Integro autenticación moderna y bases de datos optimizadas.",
    technologies: ["Node.js", "NestJS", "Python", "PostgreSQL", "Prisma ORM", "Redis", "tRPC", "Docker"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-emerald-100 dark:bg-emerald-900/30",
        bgBadge: "bg-emerald-50 dark:bg-emerald-900/20",
        textBadge: "text-emerald-700 dark:text-emerald-300",
    },
};

const TechCard = ({ data }: { data: typeof frontendData }) => {
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

const FullStackDescription = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        ¿Qué hace un <span className="text-indigo-600 dark:text-indigo-400">Desarrollador Full Stack</span>?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Diseño, construyo y despliego aplicaciones completas con enfoque en calidad, seguridad, escalabilidad y experiencia de usuario.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <TechCard data={frontendData} />
                    <TechCard data={backendData} />
                </div>
        
                <div className="mt-12 text-center">
                    <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full font-medium shadow-lg">
                        <span className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Del concepto al despliegue: código limpio, seguro y listo para producción
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FullStackDescription;