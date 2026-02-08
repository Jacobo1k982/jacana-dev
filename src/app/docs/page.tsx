"use client";

import {
    BookOpen,
    Server,
    Database,
    Shield,
    GitBranch,
    Cpu,
    Rocket,
    Zap,
    Layers,
    Code2,
    CheckCircle,
    Terminal
} from "lucide-react";
import React from "react";

// Estilos constantes para mantener consistencia GitHub
const colors = {
    bgMain: "bg-[#0d1117]",
    bgSub: "bg-[#161b22]",
    border: "border-[#30363d]",
    textMain: "text-[#c9d1d9]",
    textMuted: "text-[#8b949e]",
    textAccent: "text-[#58a6ff]",
    textSuccess: "text-[#3fb950]",
    textWarning: "text-[#d29922]",
    textDanger: "text-[#f85149]",
    textHeader: "text-[#f0f6fc]",
};

const sectionIdPrefix = "section-";

const tableOfContents = [
    { title: "Introducción", id: "introduccion" },
    { title: "Fullstack", id: "fullstack" },
    { title: "Stack Tecnológico", id: "stack" },
    { title: "Arquitectura", id: "arquitectura" },
    { title: "Flujo de Desarrollo", id: "flujo" },
    { title: "Control de Versiones", id: "git" },
    { title: "Testing y Calidad", id: "testing" },
    { title: "Deploy y DevOps", id: "devops" },
    { title: "Rendimiento", id: "rendimiento" },
    { title: "Filosofía", id: "filosofia" },
    { title: "Casos de Uso", id: "casos" },
];

export default function JacanaDocs() {
    return (
        <div className={`min-h-screen ${colors.bgMain} ${colors.textMain} font-sans antialiased selection:bg-[#388bfd33]`}>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* --- Sidebar de Navegación --- */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-8 space-y-8">
                            <div className="flex items-center gap-2 mb-8">
                                <div className={`h-8 w-8 rounded bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold`}>
                                    J
                                </div>
                                <h2 className="text-xl font-bold text-white tracking-tight">Jacana-Dev</h2>
                            </div>

                            <nav className="space-y-4">
                                <p className={`text-xs font-semibold uppercase tracking-wider ${colors.textMuted} mb-2`}>
                                    En esta página
                                </p>
                                <ul className="space-y-2 border-l ${colors.border} pl-4">
                                    {tableOfContents.map((item) => (
                                        <li key={item.id}>
                                            <a
                                                href={`#${item.id}`}
                                                className={`text-sm hover:${colors.textAccent} transition-colors block py-1 ${colors.textMuted}`}
                                            >
                                                {item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className={`p-4 rounded-lg border ${colors.border} ${colors.bgSub}`}>
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="w-4 h-4 ${colors.textAccent}" />
                                    <span className="text-sm font-semibold">Estado</span>
                                </div>
                                <p className="text-xs text-green-500 flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    Documento Activo
                                </p>
                            </div>
                        </div>
                    </aside>

                    {/* --- Contenido Principal --- */}
                    <main className="flex-1 min-w-0">
                        <div className="max-w-4xl">

                            {/* Header */}
                            <div className="mb-12 pb-8 border-b ${colors.border}">
                                <h1 className="text-4xl font-bold text-white mb-4">Documentación Fullstack</h1>
                                <p className="text-xl ${colors.textMuted} mb-6">
                                    Guía de arquitectura, estándares y filosofía de desarrollo de <strong className="text-white">Jacana-dev</strong>.
                                </p>
                                <div className="flex gap-2">
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${colors.border} ${colors.textMuted}`}>v1.0.0</span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${colors.border} ${colors.textMuted}`}>Next.js</span>
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${colors.border} ${colors.textMuted}`}>TypeScript</span>
                                </div>
                            </div>

                            {/* 1. Introducción */}
                            <section id="introduccion" className="mb-16 scroll-mt-8">
                                <h2 className={`text-2xl font-bold text-white mb-4 flex items-center gap-2`}>
                                    <span className="text-gray-500 select-none">#</span> 1. Introducción
                                </h2>
                                <div className={`p-4 rounded-lg border-l-4 ${colors.border} border-l-[#58a6ff] bg-[#161b22] mb-6`}>
                                    <p className={`${colors.textMain} leading-7`}>
                                        En <strong className="text-white">Jacana-dev</strong> diseñamos, desarrollamos y desplegamos soluciones digitales <strong className="text-white">fullstack</strong> enfocadas en rendimiento, escalabilidad y experiencia de usuario.
                                    </p>
                                </div>
                                <p className={`${colors.textMuted} leading-7 mb-4`}>
                                    Nuestro enfoque integra frontend moderno, backend robusto, bases de datos optimizadas y prácticas DevOps alineadas con estándares profesionales. Esta documentación sirve como material corporativo y referencia técnica para el equipo.
                                </p>
                            </section>

                            {/* 2. ¿Qué es el desarrollo Fullstack? */}
                            <section id="fullstack" className="mb-16 scroll-mt-8">
                                <h2 className={`text-2xl font-bold text-white mb-4 flex items-center gap-2`}>
                                    <span className="text-gray-500 select-none">#</span> 2. ¿Qué es el desarrollo Fullstack?
                                </h2>
                                <p className={`${colors.textMain} leading-7 mb-4`}>
                                    El desarrollo fullstack abarca todas las capas de una aplicación web. En Jacana-dev, el fullstack no significa “hacer de todo”, sino <strong className="text-white">integrar cada capa de forma coherente y mantenible</strong>.
                                </p>
                                <ul className={`space-y-2 list-disc pl-5 ${colors.textMuted}`}>
                                    <li><strong className={colors.textAccent}>Frontend:</strong> Interfaz, experiencia de usuario y accesibilidad.</li>
                                    <li><strong className={colors.textAccent}>Backend:</strong> Lógica de negocio, APIs, autenticación y seguridad.</li>
                                    <li><strong className={colors.textAccent}>Base de datos:</strong> Persistencia, modelado y optimización de datos.</li>
                                    <li><strong className={colors.textAccent}>Infraestructura:</strong> Deploy, CI/CD, monitoreo y escalabilidad.</li>
                                </ul>
                            </section>

                            {/* 3. Stack Tecnológico */}
                            <section id="stack" className="mb-16 scroll-mt-8">
                                <h2 className={`text-2xl font-bold text-white mb-6 flex items-center gap-2`}>
                                    <span className="text-gray-500 select-none">#</span> 3. Stack Tecnológico Principal
                                </h2>

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Frontend Card */}
                                    <div className={`p-6 rounded-lg border ${colors.border} ${colors.bgSub}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-2 rounded bg-[#58a6ff]/10 ${colors.textAccent}`}>
                                                <Layers className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-bold text-lg">Frontend</h3>
                                        </div>
                                        <ul className={`space-y-2 text-sm ${colors.textMuted}`}>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Next.js (App Router)</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> React & TypeScript</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Tailwind CSS</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Framer Motion</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Shadcn/UI</li>
                                        </ul>
                                    </div>

                                    {/* Backend Card */}
                                    <div className={`p-6 rounded-lg border ${colors.border} ${colors.bgSub}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-2 rounded bg-[#a371f7]/10 text-purple-400`}>
                                                <Server className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-bold text-lg">Backend</h3>
                                        </div>
                                        <ul className={`space-y-2 text-sm ${colors.textMuted}`}>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Node.js</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Next.js API Routes</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Server Actions</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Prisma ORM</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> REST / RPC</li>
                                        </ul>
                                    </div>

                                    {/* DB Card */}
                                    <div className={`p-6 rounded-lg border ${colors.border} ${colors.bgSub}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-2 rounded bg-[#f0883e]/10 text-orange-400`}>
                                                <Database className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-bold text-lg">Base de Datos</h3>
                                        </div>
                                        <ul className={`space-y-2 text-sm ${colors.textMuted}`}>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> PostgreSQL (Principal)</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> MySQL (Según proyecto)</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> SQLite (Desarrollo)</li>
                                        </ul>
                                    </div>

                                    {/* Security Card */}
                                    <div className={`p-6 rounded-lg border ${colors.border} ${colors.bgSub}`}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`p-2 rounded bg-[#f85149]/10 ${colors.textDanger}`}>
                                                <Shield className="w-5 h-5" />
                                            </div>
                                            <h3 className="font-bold text-lg">Seguridad</h3>
                                        </div>
                                        <ul className={`space-y-2 text-sm ${colors.textMuted}`}>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> JWT / Session-based</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Hashing (bcrypt)</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> CSRF / XSS Protection</li>
                                            <li className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-500" /> Rate Limiting</li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            {/* 4. Arquitectura */}
                            <section id="arquitectura" className="mb-16 scroll-mt-8">
                                <h2 className={`text-2xl font-bold text-white mb-4 flex items-center gap-2`}>
                                    <span className="text-gray-500 select-none">#</span> 4. Arquitectura de Aplicaciones
                                </h2>
                                <p className={`${colors.textMuted} mb-6`}>
                                    Arquitectura orientada a <strong className="text-white">escalabilidad y legibilidad</strong>.
                                </p>

                                {/* File Tree Visual */}
                                <div className={`p-4 rounded-lg border ${colors.border} ${colors.bgSub} font-mono text-sm overflow-x-auto`}>
                                    <div className="flex items-center gap-2 text-[#8b949e] mb-2">
                                        <Terminal className="w-4 h-4" />
                                        <span>Estructura Típica</span>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[#54aeff]">/</span>
                                        </div>
                                        <div className="flex items-center gap-2 pl-4">
                                            <span className="text-[#54aeff]">/app</span>
                                            <span className="text-[#6e7681]">/* Rutas y vistas */</span>
                                        </div>
                                        <div className="flex items-center gap-2 pl-4">
                                            <span className="text-[#54aeff]">/components</span>
                                            <span className="text-[#6e7681]">/* Componentes UI */</span>
                                        </div>
                                        <div className="flex items-center gap-2 pl-4">
                                            <span className="text-[#54aeff]">/actions</span>
                                            <span className="text-[#6e7681]">/* Lógica de servidor */</span>
                                        </div>
                                        <div className="flex items-center gap-2 pl-4">
                                            <span className="text-[#54aeff]">/lib</span>
                                            <span className="text-[#6e7681]">/* Utilidades y helpers */</span>
                                        </div>
                                        <div className="flex items-center gap-2 pl-4">
                                            <span className="text-[#54aeff]">/prisma</span>
                                            <span className="text-[#6e7681]">/* Esquema y migraciones */</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 5. Flujo de Desarrollo */}
                            <section id="flujo" className="mb-16 scroll-mt-8">
                                <h2 className={`text-2xl font-bold text-white mb-6 flex items-center gap-2`}>
                                    <span className="text-gray-500 select-none">#</span> 5. Flujo de Desarrollo
                                </h2>
                                <div className="relative border-l-2 border-[#30363d] ml-3 space-y-8 pb-4">
                                    {[
                                        { title: "Análisis de requerimientos", desc: "Comprensión profunda del negocio." },
                                        { title: "Diseño UX/UI", desc: "Prototipos y wireframes validados." },
                                        { title: "Definición de arquitectura", desc: "Selección de stack y modelo de datos." },
                                        { title: "Desarrollo incremental", desc: "Iteraciones cortas (Sprints)." },
                                        { title: "Testing", desc: "Aseguramiento de calidad." },
                                        { title: "Deploy y monitoreo", desc: "Puesta en producción y observabilidad." },
                                    ].map((step, idx) => (
                                        <div key={idx} className="relative pl-8">
                                            <div className={`absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 ${colors.bgMain} border-[#58a6ff] bg-[#0d1117]`} />
                                            <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                                            <p className={`text-sm ${colors.textMuted}`}>{step.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* 6. Git, 7. Testing, 8. DevOps, 9. Rendimiento (Compactado para fluidez visual) */}
                            <div className="grid md:grid-cols-2 gap-8 mb-16">
                                <section id="git" className="scroll-mt-8">
                                    <h3 className={`text-xl font-bold text-white mb-3 flex items-center gap-2`}>
                                        <GitBranch className="w-5 h-5 ${colors.textAccent}" /> 6. Control de Versiones
                                    </h3>
                                    <ul className={`space-y-1 text-sm ${colors.textMuted}`}>
                                        <li>• Git & GitHub</li>
                                        <li>• Convenciones de commits (Conventional Commits)</li>
                                        <li>• Branching strategy (main / develop / feature)</li>
                                    </ul>
                                </section>

                                <section id="testing" className="scroll-mt-8">
                                    <h3 className={`text-xl font-bold text-white mb-3 flex items-center gap-2`}>
                                        <CheckCircle className="w-5 h-5 ${colors.textSuccess}" /> 7. Testing
                                    </h3>
                                    <p className={`text-sm ${colors.textMuted} mb-2`}>
                                        La calidad no es una fase, es parte del proceso.
                                    </p>
                                    <ul className={`space-y-1 text-sm ${colors.textMuted}`}>
                                        <li>• Testing manual y automatizado</li>
                                        <li>• Validación de formularios (Zod)</li>
                                        <li>• Linting y Code Review</li>
                                    </ul>
                                </section>

                                <section id="devops" className="scroll-mt-8">
                                    <h3 className={`text-xl font-bold text-white mb-3 flex items-center gap-2`}>
                                        <Rocket className="w-5 h-5 ${colors.textWarning}" /> 8. DevOps & Deploy
                                    </h3>
                                    <ul className={`space-y-1 text-sm ${colors.textMuted}`}>
                                        <li>• Vercel / Docker</li>
                                        <li>• Variables de entorno seguras</li>
                                        <li>• CI/CD automatizado</li>
                                        <li>• Builds optimizados</li>
                                    </ul>
                                </section>

                                <section id="rendimiento" className="scroll-mt-8">
                                    <h3 className={`text-xl font-bold text-white mb-3 flex items-center gap-2`}>
                                        <Zap className="w-5 h-5 text-yellow-400" /> 9. Rendimiento
                                    </h3>
                                    <ul className={`space-y-1 text-sm ${colors.textMuted}`}>
                                        <li>• Lazy Loading</li>
                                        <li>• Code Splitting</li>
                                        <li>• Optimización de imágenes (Next/Image)</li>
                                        <li>• Estrategias de Caché (ISR/SSR)</li>
                                    </ul>
                                </section>
                            </div>

                            {/* 10. Filosofía */}
                            <section id="filosofia" className="mb-16 scroll-mt-8">
                                <h2 className={`text-2xl font-bold text-white mb-6 flex items-center gap-2`}>
                                    <span className="text-gray-500 select-none">#</span> 10. Filosofía Jacana-dev
                                </h2>
                                <div className={`p-6 rounded-lg border-l-4 ${colors.border} border-l-[#3fb950] bg-gradient-to-r from-[#238636]/10 to-transparent`}>
                                    <ul className={`space-y-3 ${colors.textMain}`}>
                                        <li className="flex gap-3">
                                            <Code2 className={`w-5 h-5 ${colors.textMuted} shrink-0 mt-0.5`} />
                                            <div>
                                                <strong className="text-white block">Código limpio y documentado</strong>
                                                <span className="text-sm">Si no puedes explicarlo, no lo entiendes.</span>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <Cpu className={`w-5 h-5 ${colors.textMuted} shrink-0 mt-0.5`} />
                                            <div>
                                                <strong className="text-white block">Decisiones técnicas justificadas</strong>
                                                <span className="text-sm">No usamos tecnología por moda, sino por necesidad.</span>
                                            </div>
                                        </li>
                                        <li className="flex gap-3">
                                            <Layers className={`w-5 h-5 ${colors.textMuted} shrink-0 mt-0.5`} />
                                            <div>
                                                <strong className="text-white block">Escalabilidad desde el inicio</strong>
                                                <span className="text-sm">Construimos para que crezca, no para que se rompa.</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <blockquote className={`mt-6 border-t ${colors.border} pt-4 italic ${colors.textMuted}`}>
                                        "La tecnología es una herramienta, el valor está en cómo se usa."
                                    </blockquote>
                                </div>
                            </section>

                            {/* 11. Casos de Uso */}
                            <section id="casos" className="mb-16 scroll-mt-8">
                                <h2 className={`text-2xl font-bold text-white mb-6 flex items-center gap-2`}>
                                    <span className="text-gray-500 select-none">#</span> 11. Casos de Uso
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        "Landing Pages",
                                        "Dashboards Admin",
                                        "Sistemas de Auth",
                                        "SaaS Platforms",
                                        "Apps Empresariales"
                                    ].map((tag, i) => (
                                        <span key={i} className={`px-3 py-1.5 rounded-full text-sm font-medium border ${colors.border} ${colors.bgSub} ${colors.textAccent} hover:border-[#58a6ff] transition-colors`}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Footer / Contact */}
                            <section id="contact" className={`pt-8 border-t ${colors.border} text-center`}>
                                <h3 className={`text-lg font-bold text-white mb-2`}>Jacana-dev</h3>
                                <p className={colors.textMuted}>Desarrollo Fullstack Profesional</p>
                                <p className={`text-xs mt-4 ${colors.textMuted} opacity-60`}>
                                    Documento vivo — actualizado continuamente según evolución tecnológica.
                                </p>
                            </section>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}