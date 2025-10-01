// components/SecurityHardeningDescription.tsx
"use client";

import React from 'react';

interface SecurityCardData {
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

const appSecurityData: SecurityCardData = {
    title: "Seguridad en la Aplicación",
    description:
        "Protejo aplicaciones contra vulnerabilidades comunes (OWASP Top 10) mediante validación estricta, sanitización, autenticación robusta, autorización basada en roles y manejo seguro de secretos.",
    technologies: ["OWASP Top 10", "JWT/OAuth 2.0", "Helmet.js", "CSP", "Rate Limiting", "Input Validation", "Password Hashing (Argon2)", "Secure Cookies"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-red-100 dark:bg-red-900/30",
        bgBadge: "bg-red-50 dark:bg-red-900/20",
        textBadge: "text-red-700 dark:text-red-300",
    },
};

const infraSecurityData: SecurityCardData = {
    title: "Hardening de Infraestructura",
    description:
        "Aseguro entornos de ejecución mediante principios de mínimo privilegio, escaneo de vulnerabilidades, cifrado en tránsito y reposo, y monitoreo continuo de amenazas.",
    technologies: ["Docker Bench", "Kubernetes RBAC", "Terraform Sentinel", "AWS IAM", "Secrets Management (Vault)", "TLS 1.3", "WAF", "Intrusion Detection"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-orange-100 dark:bg-orange-900/30",
        bgBadge: "bg-orange-50 dark:bg-orange-900/20",
        textBadge: "text-orange-700 dark:text-orange-300",
    },
};

// ✅ Corregido: definimos correctamente las props
interface SecurityCardProps {
    data: SecurityCardData;
}

const SecurityCard = ({ data }: SecurityCardProps) => {
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

const SecurityHardeningDescription = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        <span className="text-red-600 dark:text-red-400">Security & Hardening</span>: seguridad desde el primer commit
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Integro prácticas de seguridad en cada etapa del desarrollo: desde el código y las dependencias hasta la infraestructura y el despliegue.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <SecurityCard data={appSecurityData} />
                    <SecurityCard data={infraSecurityData} />
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-block bg-gradient-to-r from-red-500 to-orange-600 text-white px-6 py-3 rounded-full font-medium shadow-lg">
                        <span className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            La seguridad no es una fase: es una responsabilidad continua
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SecurityHardeningDescription;