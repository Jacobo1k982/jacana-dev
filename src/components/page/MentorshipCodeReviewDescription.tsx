'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/Meeting.json';


const mentorshipData = {
    title: "Mentoría Técnica",
    description: "Acompaño a desarrolladores y equipos en su evolución profesional mediante sesiones prácticas, pair programming y guías personalizadas basadas en sus metas y contexto técnico.",
    technologies: ["Pair Programming", "Career Coaching", "Technical Leadership", "Onboarding", "Code Katas", "System Design Interviews", "Feedback Constructivo", "Growth Mindset"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
    ),
    colors: {
        gradient: "from-amber-500 to-orange-600",
        bgGlow: "from-amber-400/20 to-orange-600/20",
        border: "border-amber-500/30",
    },
}

const codeReviewData = {
    title: "Code Review Estratégico",
    description: "Reviso código con enfoque en legibilidad, mantenibilidad, seguridad y buenas prácticas. No solo corrijo errores, sino que explico el 'por qué' para fomentar aprendizaje continuo.",
    technologies: ["Pull Request Reviews", "Static Analysis", "SonarQube", "ESLint", "Testing Coverage", "Architectural Consistency", "Documentation", "Tech Debt Tracking"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    colors: {
        gradient: "from-green-500 to-emerald-600",
        bgGlow: "from-green-400/20 to-emerald-600/20",
        border: "border-green-500/30",
    },
}

const MentorshipCard = ({ data }: { data: typeof mentorshipData }) => {
    return (
        <Card className={`
      relative overflow-hidden
      bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50
      backdrop-blur-xl border-2 ${data.colors.border}
      hover:border-amber-400/50 transition-all duration-500
      group
    `}>
            {/* Glow Effect */}
            <div className={`
        absolute inset-0 bg-gradient-to-br ${data.colors.bgGlow}
        opacity-0 group-hover:opacity-100 transition-opacity duration-500
      `} />

            {/* Animated Border Glow */}
            <div className={`
        absolute inset-0 bg-gradient-to-br ${data.colors.gradient}
        opacity-0 group-hover:opacity-20 transition-opacity duration-500
        blur-2xl
      `} />

            {/* Content */}
            <CardHeader className="relative z-10">
                <div className="flex items-center gap-4">
                    <div className={`
            relative p-3 rounded-2xl
            bg-gradient-to-br ${data.colors.gradient}
            shadow-2xl
            group-hover:scale-110 group-hover:rotate-3
            transition-all duration-500
          `}>
                        <div className="text-white filter drop-shadow-lg">
                            {data.icon}
                        </div>
                    </div>
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        {data.title}
                    </CardTitle>
                </div>
            </CardHeader>

            <CardContent className="relative z-10 space-y-6">
                <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                    {data.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {data.technologies.map((tech) => (
                        <Badge
                            key={tech}
                            variant="outline"
                            className={`
                px-3 py-1.5 text-sm font-medium
                bg-gradient-to-br ${data.colors.bgGlow}
                border ${data.colors.border}
                text-gray-200
                hover:bg-white/10 transition-all duration-300
                hover:scale-105 hover:shadow-lg
              `}
                        >
                            {tech}
                        </Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

const MentorshipCodeReviewDescription = () => {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Mentoría & Code Review:{" "}
                        </span>
                        <span className="bg-gradient-to-r from-amber-400 via-lime-400 to-green-400 bg-clip-text text-transparent">
                            elevar el nivel técnico del equipo
                        </span>
                    </h2>
                    {/* Lottie Animation */}
                    <div className="w-full max-w-md mx-auto mb-10 animate-fade-up">
                        <div className="relative">
                            {/* Glow effect behind Lottie */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-teal-500/15 to-emerald-500/20 blur-3xl rounded-3xl"></div>
                            <Lottie
                                animationData={codingAnimation}
                                loop={true}
                                autoplay={true}
                                className="relative z-10"
                            />
                        </div>
                    </div>
                    <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Comparto conocimiento no solo para resolver problemas actuales, sino para construir equipos{" "}
                        <span className="text-amber-400 font-semibold">autónomos</span>,{" "}
                        <span className="text-lime-400 font-semibold">resilientes</span> y{" "}
                        <span className="text-green-400 font-semibold">orientados a la excelencia</span> técnica.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <MentorshipCard data={mentorshipData} />
                    <MentorshipCard data={codeReviewData} />
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-lime-500 to-green-600 text-white font-semibold shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 cursor-default backdrop-blur-sm border border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>El mejor código es el que otros pueden entender, mantener y mejorar</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MentorshipCodeReviewDescription