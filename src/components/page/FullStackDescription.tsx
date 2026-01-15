'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Lottie from 'lottie-react';
import codingAnimation from '../Lottie/Developer-Front-End.json';

const frontendData = {
    title: "Frontend Moderno",
    description: "Desarrollo interfaces rápidas, accesibles y SEO-friendly con enfoque en experiencia de usuario, performance y mantenibilidad. Uso arquitecturas basadas en componentes y patrones reactivos.",
    technologies: ["React", "Next.js 15", "TypeScript", "Tailwind CSS", "ShadCN/UI", "Zod", "TanStack Query", "Framer Motion"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
    ),
    colors: {
        gradient: "from-cyan-500 to-blue-600",
        bgGlow: "from-cyan-400/20 to-blue-600/20",
        border: "border-cyan-500/30",
    },
}

const backendData = {
    title: "Backend Robusto",
    description: "Construyo APIs seguras, escalables y bien documentadas con enfoque en arquitectura limpia, manejo de errores, validación de datos y observabilidad. Integro autenticación moderna y bases de datos optimizadas.",
    technologies: ["Node.js", "Python", "PostgreSQL", "Prisma ORM", "Redis", "NextAuth.js", "tRPC", "Docker"],
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
    ),
    colors: {
        gradient: "from-violet-500 to-purple-600",
        bgGlow: "from-violet-400/20 to-purple-600/20",
        border: "border-violet-500/30",
    },
}

const TechCard = ({ data }: { data: typeof frontendData }) => {
    return (
        <Card className={`
      relative overflow-hidden
      bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50
      backdrop-blur-xl border-2 ${data.colors.border}
      hover:border-cyan-400/50 transition-all duration-500
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
            shadow-2xl shadow-${data.colors.gradient.split('-')[1]}-500/30
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

const FullStackDescription = () => {
    return (
        <section className="relative min-h-screen flex flex-col">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-black">
                {/* Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

                {/* Animated Gradient Orbs */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-2000" />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-24">
                <div className="max-w-6xl mx-auto w-full">
                    {/* Header */}
                    <div className="text-center mb-16 space-y-9">
                        
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold">
                            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                                ¿Qué hace un{" "}
                            </span>
                            <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-purple-400 bg-clip-text text-transparent">
                                Desarrollador Full Stack
                            </span>
                            <span className="bg-gradient-to-r from-gray-200 via-gray-300 to-white bg-clip-text text-transparent">
                                ?
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
                            Diseño, construyo y despliego aplicaciones completas con enfoque en{" "}
                            <span className="text-cyan-400 font-semibold">calidad</span>,{" "}
                            <span className="text-violet-400 font-semibold">seguridad</span>,{" "}
                            <span className="text-purple-400 font-semibold">escalabilidad</span> y{" "}
                            <span className="text-pink-400 font-semibold">experiencia de usuario</span>.
                        </p>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <TechCard data={frontendData} />
                        <TechCard data={backendData} />
                    </div>

                    {/* Bottom CTA */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 via-violet-500 to-purple-600 text-white font-semibold shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 cursor-default backdrop-blur-sm border border-white/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Del concepto al despliegue: código limpio, seguro y listo para producción</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FullStackDescription
