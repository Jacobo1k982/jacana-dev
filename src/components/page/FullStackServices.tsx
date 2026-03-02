// src/components/page/FullStackServices.tsx
'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Monitor, Server, Database, Shield, Cpu, Layers,
    CheckCircle, ArrowRight, Terminal
} from 'lucide-react';

// ============================================
// DATOS DE SERVICIOS
// ============================================
const servicesData = [
    {
        id: 'frontend',
        title: "Frontend Reactivo",
        description: "Interfaces SPA y SSR con Next.js, optimización de rendimiento y patrones de diseño atómico para experiencias de usuario excepcionales.",
        icon: Monitor,
        color: '#58a6ff', // Azul
        bgGlow: 'rgba(88, 166, 255, 0.15)',
        features: ['Server Components', 'Optimistic UI', 'Motion Design', 'SEO Optimizado'],
        techs: ['React', 'Next.js', 'Tailwind', 'TypeScript'],
        size: 'large',
    },
    {
        id: 'backend',
        title: "Backend Robusto",
        description: "APIs REST & GraphQL, arquitectura hexagonal y lógica de negocio escalable.",
        icon: Server,
        color: '#a371f7', // Púrpura
        bgGlow: 'rgba(163, 113, 247, 0.15)',
        features: ['Node.js / Python', 'GraphQL', 'Microservices', 'Auth'],
        techs: ['NestJS', 'FastAPI', 'tRPC', 'Prisma'],
        size: 'medium',
    },
    {
        id: 'database',
        title: "Datos & Persistencia",
        description: "Modelado relacional y NoSQL, migraciones y estrategias de caché.",
        icon: Database,
        color: '#00FF9D', // Verde Neón
        bgGlow: 'rgba(0, 255, 157, 0.15)',
        features: ['SQL Expert', 'Redis Cache', 'ORM Mastery', 'Seeding'],
        techs: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'],
        size: 'medium',
    },
    {
        id: 'devops',
        title: "DevOps & Cloud",
        description: "CI/CD pipelines, contenedores y despliegue serverless.",
        icon: Cpu,
        color: '#f0883e', // Naranja
        bgGlow: 'rgba(240, 136, 62, 0.15)',
        features: ['Docker', 'CI/CD', 'AWS/GCP', 'Monitoring'],
        techs: ['Docker', 'GitHub Actions', 'Vercel', 'AWS'],
        size: 'small',
    },
    {
        id: 'quality',
        title: "Calidad & Testing",
        description: "Cobertura de tests, integración continua y código limpio.",
        icon: Shield,
        color: '#3fb950', // Verde GitHub
        bgGlow: 'rgba(63, 185, 80, 0.15)',
        features: ['Unit Tests', 'E2E', 'TDD', 'Clean Code'],
        techs: ['Jest', 'Vitest', 'Cypress', 'SonarQube'],
        size: 'small',
    },
];

// ============================================
// COMPONENTE INTERNO: SERVICE NODE
// ============================================
interface ServiceNodeProps {
    service: typeof servicesData[0];
    index: number;
}

const ServiceNode = ({ service, index }: ServiceNodeProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const Icon = service.icon;

    // Definir tamaño del grid
    const gridClass =
        service.size === 'large'
            ? 'md:col-span-2 md:row-span-2'
            : service.size === 'medium'
                ? 'md:col-span-1 md:row-span-2'
                : 'md:col-span-1 md:row-span-1';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative group ${gridClass}`}
        >
            <div className={`
        relative h-full w-full rounded-xl border border-[#30363d] 
        bg-[#0d1117]/80 backdrop-blur-sm
        transition-all duration-500 ease-out
        hover:border-transparent
        overflow-hidden
        flex flex-col
      `}
                style={{
                    boxShadow: isHovered
                        ? `0 0 40px -10px ${service.bgGlow}, 0 0 0 1px ${service.color}40`
                        : '0 0 0 1px rgba(48, 54, 61, 0.5)',
                    borderColor: isHovered ? service.color : '#30363d'
                }}
            >
                {/* Glow Effect Top */}
                <div
                    className="absolute top-0 left-0 right-0 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: `radial-gradient(circle at 50% 0%, ${service.bgGlow}, transparent 70%)` }}
                />

                {/* Scanline Effect */}
                <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

                {/* Content Container */}
                <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">

                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div
                                className="p-3 rounded-lg border border-current transition-colors duration-300"
                                style={{
                                    color: isHovered ? service.color : '#8b949e',
                                    backgroundColor: isHovered ? service.bgGlow : 'transparent',
                                    borderColor: isHovered ? service.color : '#30363d'
                                }}
                            >
                                <Icon size={24} strokeWidth={1.5} />
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">{service.title}</h3>
                                {/* Status Dot */}
                                <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#8b949e] mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: service.color }} />
                                    ACTIVE_MODULE
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#8b949e] leading-relaxed mb-auto">
                        {service.description}
                    </p>

                    {/* Features List */}
                    <div className="mt-6 space-y-3">
                        <h4 className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest flex items-center gap-2">
                            <Layers size={10} />
                            Capacidades
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                            {service.features.map((feature) => (
                                <div
                                    key={feature}
                                    className="flex items-center gap-2 text-xs text-[#c9d1d9] font-mono"
                                >
                                    <CheckCircle size={12} style={{ color: service.color }} />
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack Tags */}
                    <div className="mt-6 pt-4 border-t border-[#30363d]/50 flex flex-wrap gap-2">
                        {service.techs.map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-0.5 text-[10px] rounded bg-[#161b22] border border-[#30363d] text-[#8b949e] transition-colors font-mono"
                                style={{ borderColor: isHovered ? `${service.color}30` : '#30363d' }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ============================================
// COMPONENTE PRINCIPAL (SIN ID NI PY)
// ============================================
export default function FullStackServices() {
    return (
        <section className="relative overflow-hidden">

            {/* Background Ambient */}
            <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#8b949e 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#a371f7]/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">

                {/* Grid de Servicios Asimétrico */}
                <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-fr gap-4 md:gap-6">
                    {servicesData.map((service, index) => (
                        <ServiceNode key={service.id} service={service} index={index} />
                    ))}
                </div>

                {/* CTA Footer */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                >
                    <a
                        href="/contacto"
                        className="inline-flex items-center gap-2 px-8 py-4 text-sm font-semibold text-black bg-[#00FF9D] rounded-md hover:bg-[#00cc7a] shadow-[0_0_20px_rgba(0,255,157,0.2)] transition-all group"
                    >
                        Construir mi sistema
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>

            </div>
        </section>
    );
}