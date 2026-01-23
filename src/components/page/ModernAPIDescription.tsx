'use client'

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/API-Integration.json';


const restApiData = {
    title: "RESTful APIs",
    description: "Diseño APIs REST bien estructuradas, con recursos coherentes, códigos de estado HTTP semánticos, paginación, filtros y documentación interactiva mediante OpenAPI/Swagger.",
    technologies: ["OpenAPI 3.1", "Swagger UI", "Zod", "Express", "NestJS", "FastAPI", "HATEOAS", "Rate Limiting"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
    ),
    colors: {
        gradient: "from-blue-500 to-indigo-600",
        bgGlow: "from-blue-400/20 to-indigo-600/20",
        border: "border-blue-500/30",
    },
}

const graphqlData = {
    title: "GraphQL & tRPC",
    description: "Construyo APIs flexibles con GraphQL (Apollo, Yoga) y type-safe con tRPC, permitiendo a los clientes solicitar exactamente los datos que necesitan, reduciendo over-fetching y simplificando el frontend.",
    technologies: ["GraphQL", "tRPC", "Apollo Server", "Yoga", "TypeScript", "Zod", "Persisted Queries", "Schema Stitching"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c.375.375.586.89.586 1.414v3.586a2 2 0 01-2 2H5a2 2 0 01-2-2V13.172a2 2 0 01.586-1.414l5-5A2 2 0 019 6.172V5L8 4z" />
        </svg>
    ),
    colors: {
        gradient: "from-amber-500 to-orange-600",
        bgGlow: "from-amber-400/20 to-orange-600/20",
        border: "border-amber-500/30",
    },
}

const TechCard = ({ data }: { data: typeof restApiData }) => {
    return (
        <Card className={`
      relative overflow-hidden
      bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50
      backdrop-blur-xl border-2 ${data.colors.border}
      hover:border-blue-400/50 transition-all duration-500
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

const ModernAPIDescription = () => {
    return (
        <section className="relative py-24 px-4 sm:px-6 lg:px-8">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50" />

            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16 space-y-6">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                            APIs Modernas:{" "}
                        </span>
                        <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-amber-400 bg-clip-text text-transparent">
                            el puente entre sistemas
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
                        Construyo interfaces de programación robustas, seguras, versionadas y bien documentadas que permiten a productos{" "}
                        <span className="text-blue-400 font-semibold">escalar</span>,{" "}
                        <span className="text-indigo-400 font-semibold">integrarse</span> y{" "}
                        <span className="text-amber-400 font-semibold">evolucionar</span> sin romper compatibilidad.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <TechCard data={restApiData} />
                    <TechCard data={graphqlData} />
                </div>

                {/* Bottom CTA */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-500 text-white font-semibold shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105 cursor-default backdrop-blur-sm border border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>APIs bien diseñadas son la base de ecosistemas digitales escalables</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ModernAPIDescription