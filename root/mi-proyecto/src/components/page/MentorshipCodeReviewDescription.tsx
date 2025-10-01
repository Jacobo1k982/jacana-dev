// components/MentorshipCodeReviewDescription.tsx
"use client";

import React from 'react';

interface MentorshipCardData {
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

const mentorshipData: MentorshipCardData = {
    title: "Mentoría Técnica",
    description:
        "Acompaño a desarrolladores y equipos en su evolución profesional mediante sesiones prácticas, pair programming y guías personalizadas basadas en sus metas y contexto técnico.",
    technologies: ["Pair Programming", "Career Coaching", "Technical Leadership", "Onboarding", "Code Katas", "System Design Interviews", "Feedback Constructivo", "Growth Mindset"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-amber-100 dark:bg-amber-900/30",
        bgBadge: "bg-amber-50 dark:bg-amber-900/20",
        textBadge: "text-amber-700 dark:text-amber-300",
    },
};

const codeReviewData: MentorshipCardData = {
    title: "Code Review Estratégico",
    description:
        "Reviso código con enfoque en legibilidad, mantenibilidad, seguridad y buenas prácticas. No solo corrijo errores, sino que explico el 'por qué' para fomentar aprendizaje continuo.",
    technologies: ["Pull Request Reviews", "Static Analysis", "SonarQube", "ESLint", "Testing Coverage", "Architectural Consistency", "Documentation", "Tech Debt Tracking"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    colors: {
        bgIcon: "bg-green-100 dark:bg-green-900/30",
        bgBadge: "bg-green-50 dark:bg-green-900/20",
        textBadge: "text-green-700 dark:text-green-300",
    },
};

const MentorshipCard = ({ data }: { data: MentorshipCardData }) => {
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

const MentorshipCodeReviewDescription = () => {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        <span className="text-amber-600 dark:text-amber-400">Mentoría & Code Review</span>: elevar el nivel técnico del equipo
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Comparto conocimiento no solo para resolver problemas actuales, sino para construir equipos autónomos, resilientes y orientados a la excelencia técnica.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    <MentorshipCard data={mentorshipData} />
                    <MentorshipCard data={codeReviewData} />
                </div>

                <div className="mt-12 text-center">
                    <div className="inline-block bg-gradient-to-r from-amber-500 to-green-600 text-white px-6 py-3 rounded-full font-medium shadow-lg">
                        <span className="flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            El mejor código es el que otros pueden entender, mantener y mejorar
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MentorshipCodeReviewDescription;