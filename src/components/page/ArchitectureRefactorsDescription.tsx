'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/Webdeveloper.json';


const architectureData = {
    title: "Arquitectura Escalable",
    description: "Diseño sistemas modulares, mantenibles y evolutivos usando patrones modernos: Clean Architecture, Hexagonal, CQRS, Event-Driven y Microservicios cuando aportan valor real.",
    technologies: ["Domain-Driven Design", "Clean Architecture", "CQRS", "Event Sourcing", "Microservicios", "Monolito Modular", "Bounded Contexts", "API Gateways"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    colors: {
        gradient: "from-rose-500 to-pink-600",
        bgGlow: "from-rose-400/20 to-pink-600/20",
        border: "border-rose-500/30",
    },
}

const refactoringData = {
    title: "Refactores Estratégicos",
    description: "Transformo código heredado en sistemas modernos mediante refactores seguros, tests automatizados y migraciones incrementales — sin parar la producción ni introducir regresiones.",
    technologies: ["TDD", "Strangler Fig Pattern", "Golden Master", "Code Smells", "SOLID", "Modular Monolith", "Feature Toggles", "Observability-Driven Refactoring"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
    ),
    colors: {
        gradient: "from-teal-500 to-emerald-600",
        bgGlow: "from-teal-400/20 to-emerald-600/20",
        border: "border-teal-500/30",
    },
}

const ArchitectureCard = ({ data }: { data: typeof architectureData }) => {
    return (
        <Card className={`
      relative overflow-hidden
      bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50
      backdrop-blur-xl border-2 ${data.colors.border}
      hover:border-rose-400/50 transition-all duration-500
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

const ArchitectureRefactorsDescription = () => {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            Arquitectura & Refactores:{" "}
                        </span>
                        <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">
                            código que evoluciona con el negocio
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
                        Diseño sistemas sólidos desde el inicio y rescato aplicaciones heredadas mediante estrategias técnicas que{" "}
                        <span className="text-rose-400 font-semibold">reducen riesgo</span> y{" "}
                        <span className="text-teal-400 font-semibold">maximizan el valor</span> a largo plazo.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <ArchitectureCard data={architectureData} />
                    <ArchitectureCard data={refactoringData} />
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-teal-600 text-white font-semibold shadow-2xl hover:shadow-rose-500/50 transition-all duration-300 hover:scale-105 cursor-default backdrop-blur-sm border border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Arquitectura no es dibujar diagramas: es tomar decisiones técnicas que perduran</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ArchitectureRefactorsDescription