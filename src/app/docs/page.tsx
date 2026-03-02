"use client";

import {
    BookOpen, Server, Database, Shield, GitBranch, Cpu, Rocket, Zap, Layers, Code2, CheckCircle, Terminal, FileText
} from "lucide-react";
import React from "react";

// Constantes de colores limpias (sin template strings en className)
const COLORS = {
    bgMain: "#0d1117",
    bgSub: "#161b22",
    border: "#30363d",
    textMain: "#c9d1d9",
    textMuted: "#8b949e",
    textAccent: "#00FF9D", // Acento Neón
    textLink: "#58a6ff",
    textWarning: "#d29922",
    textDanger: "#f85149",
    textWhite: "#ffffff",
};

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
        <div
            className="min-h-screen font-sans antialiased selection:bg-[#00FF9D]/20 selection:text-[#00FF9D]"
            style={{ backgroundColor: COLORS.bgMain, color: COLORS.textMain }}
        >
            {/* Fondo Ambiental */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#8b949e 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* --- Sidebar de Navegación --- */}
                    <aside className="hidden lg:block w-64 shrink-0">
                        <div className="sticky top-8 space-y-8">

                            {/* Logo / Brand */}
                            <div className="flex items-center gap-3 mb-8">
                                <div className="h-9 w-9 rounded bg-[#00FF9D]/10 border border-[#00FF9D]/30 flex items-center justify-center shadow-[0_0_10px_rgba(0,255,157,0.2)]">
                                    <Terminal size={18} style={{ color: COLORS.textAccent }} />
                                </div>
                                <h2 className="text-lg font-bold text-white tracking-tight font-mono">
                                    JACANA_DEV
                                </h2>
                            </div>

                            {/* Navigation */}
                            <nav className="space-y-4">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#8b949e] mb-3 flex items-center gap-2">
                                    <FileText size={10} />
                                    Manual Sections
                                </p>
                                <ul className="space-y-1 border-l border-[#30363d] pl-4">
                                    {tableOfContents.map((item) => (
                                        <li key={item.id}>
                                            <a
                                                href={`#${item.id}`}
                                                className="text-sm text-[#8b949e] hover:text-[#00FF9D] transition-colors block py-1.5 hover:pl-1 duration-200 font-mono"
                                            >
                                                <span className="opacity-50 mr-1">/</span>{item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            {/* Status Card */}
                            <div className="p-4 rounded-lg border border-[#30363d] bg-[#161b22]/80 backdrop-blur-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <BookOpen className="w-4 h-4 text-[#a371f7]" />
                                    <span className="text-xs font-bold text-white uppercase tracking-wider">System Status</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#00FF9D] font-mono mt-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D] animate-pulse shadow-[0_0_5px_#00FF9D]"></span>
                                    DOCUMENTO_ACTIVO
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* --- Contenido Principal --- */}
                    <main className="flex-1 min-w-0">
                        <div className="max-w-4xl">

                            {/* Header */}
                            <header className="mb-12 pb-8 border-b border-[#30363d]">
                                <div className="inline-flex items-center gap-2 px-2 py-1 rounded border border-[#30363d] bg-[#161b22] text-[10px] font-mono text-[#8b949e] uppercase tracking-wider mb-4">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#00FF9D]" />
                                    Versión 1.0.0
                                </div>
                                <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                                    Documentación <span className="text-[#00FF9D]">Fullstack</span>
                                </h1>
                                <p className="text-lg text-[#8b949e] mb-6 leading-relaxed">
                                    Guía de arquitectura, estándares y filosofía de desarrollo de <strong className="text-white">Jacana-dev</strong>.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {['Next.js', 'TypeScript', 'Prisma', 'Tailwind'].map(tag => (
                                        <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium border border-[#30363d] text-[#8b949e]">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </header>

                            {/* --- Sections --- */}

                            {/* 1. Introducción */}
                            <section id="introduccion" className="mb-16 scroll-mt-8">
                                <SectionHeader number="1" title="Introducción" />
                                <div className="p-6 rounded-lg border-l-4 border-[#00FF9D] bg-[#161b22]/50 mb-6 shadow-[inset_0_1px_0_0_rgba(0,255,157,0.1)]">
                                    <p className="leading-7 text-[#c9d1d9]">
                                        En <strong className="text-white">Jacana-dev</strong> diseñamos, desarrollamos y desplegamos soluciones digitales <strong className="text-[#00FF9D]">fullstack</strong> enfocadas en rendimiento, escalabilidad y experiencia de usuario.
                                    </p>
                                </div>
                                <p className="text-[#8b949e] leading-7">
                                    Nuestro enfoque integra frontend moderno, backend robusto, bases de datos optimizadas y prácticas DevOps alineadas con estándares profesionales. Esta documentación sirve como material corporativo y referencia técnica para el equipo.
                                </p>
                            </section>

                            {/* 2. Fullstack */}
                            <section id="fullstack" className="mb-16 scroll-mt-8">
                                <SectionHeader number="2" title="¿Qué es el desarrollo Fullstack?" />
                                <p className="text-[#c9d1d9] leading-7 mb-4">
                                    El desarrollo fullstack abarca todas las capas de una aplicación web. En Jacana-dev, el fullstack no significa “hacer de todo”, sino <strong className="text-white">integrar cada capa de forma coherente y mantenible</strong>.
                                </p>
                                <ul className="space-y-2 list-none pl-0 text-[#8b949e]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#00FF9D] font-mono text-xs mt-1">&gt;</span>
                                        <div><strong className="text-[#58a6ff]">Frontend:</strong> Interfaz, experiencia de usuario y accesibilidad.</div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#00FF9D] font-mono text-xs mt-1">&gt;</span>
                                        <div><strong className="text-[#a371f7]">Backend:</strong> Lógica de negocio, APIs, autenticación y seguridad.</div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#00FF9D] font-mono text-xs mt-1">&gt;</span>
                                        <div><strong className="text-[#f0883e]">Base de datos:</strong> Persistencia, modelado y optimización de datos.</div>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#00FF9D] font-mono text-xs mt-1">&gt;</span>
                                        <div><strong className="text-[#d29922]">Infraestructura:</strong> Deploy, CI/CD, monitoreo y escalabilidad.</div>
                                    </li>
                                </ul>
                            </section>

                            {/* 3. Stack Tecnológico */}
                            <section id="stack" className="mb-16 scroll-mt-8">
                                <SectionHeader number="3" title="Stack Tecnológico Principal" />
                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* Card Component reused logic */}
                                    <TechCard
                                        icon={<Layers className="w-5 h-5" />}
                                        title="Frontend"
                                        color="#58a6ff"
                                        items={['Next.js (App Router)', 'React & TypeScript', 'Tailwind CSS', 'Framer Motion', 'Shadcn/UI']}
                                    />
                                    <TechCard
                                        icon={<Server className="w-5 h-5" />}
                                        title="Backend"
                                        color="#a371f7"
                                        items={['Node.js', 'Next.js API Routes', 'Server Actions', 'Prisma ORM', 'REST / RPC']}
                                    />
                                    <TechCard
                                        icon={<Database className="w-5 h-5" />}
                                        title="Base de Datos"
                                        color="#f0883e"
                                        items={['PostgreSQL (Principal)', 'MySQL (Según proyecto)', 'SQLite (Desarrollo)']}
                                    />
                                    <TechCard
                                        icon={<Shield className="w-5 h-5" />}
                                        title="Seguridad"
                                        color="#f85149"
                                        items={['JWT / Session-based', 'Hashing (bcrypt)', 'CSRF / XSS Protection', 'Rate Limiting']}
                                    />
                                </div>
                            </section>

                            {/* 4. Arquitectura */}
                            <section id="arquitectura" className="mb-16 scroll-mt-8">
                                <SectionHeader number="4" title="Arquitectura de Aplicaciones" />
                                <p className="text-[#8b949e] mb-6">
                                    Arquitectura orientada a <strong className="text-white">escalabilidad y legibilidad</strong>.
                                </p>

                                {/* File Tree Visual */}
                                <div className="p-4 rounded-lg border border-[#30363d] bg-[#0d1117] font-mono text-sm overflow-x-auto shadow-inner">
                                    <div className="flex items-center gap-2 text-[#8b949e] mb-2 border-b border-[#21262d] pb-2">
                                        <Terminal className="w-4 h-4 text-[#00FF9D]" />
                                        <span>tree -L 1 -a</span>
                                    </div>
                                    <div className="space-y-1 text-[#c9d1d9]">
                                        <div className="flex items-center gap-2"><span className="text-[#54aeff]">/</span></div>
                                        <div className="flex items-center gap-2 pl-4"><span className="text-[#54aeff]">/app</span> <span className="text-[#6e7681]">/* Rutas y vistas */</span></div>
                                        <div className="flex items-center gap-2 pl-4"><span className="text-[#54aeff]">/components</span> <span className="text-[#6e7681]">/* Componentes UI */</span></div>
                                        <div className="flex items-center gap-2 pl-4"><span className="text-[#54aeff]">/actions</span> <span className="text-[#6e7681]">/* Lógica de servidor */</span></div>
                                        <div className="flex items-center gap-2 pl-4"><span className="text-[#54aeff]">/lib</span> <span className="text-[#6e7681]">/* Utilidades */</span></div>
                                        <div className="flex items-center gap-2 pl-4"><span className="text-[#54aeff]">/prisma</span> <span className="text-[#6e7681]">/* Esquema DB */</span></div>
                                    </div>
                                </div>
                            </section>

                            {/* 5. Flujo de Desarrollo */}
                            <section id="flujo" className="mb-16 scroll-mt-8">
                                <SectionHeader number="5" title="Flujo de Desarrollo" />
                                <div className="relative border-l-2 border-[#21262d] ml-3 space-y-10 py-2">
                                    {[
                                        { title: "Análisis", desc: "Comprensión profunda del negocio." },
                                        { title: "Diseño UX/UI", desc: "Prototipos y wireframes validados." },
                                        { title: "Arquitectura", desc: "Selección de stack y modelo de datos." },
                                        { title: "Desarrollo", desc: "Iteraciones cortas (Sprints)." },
                                        { title: "Testing", desc: "Aseguramiento de calidad." },
                                        { title: "Deploy", desc: "Puesta en producción y monitoreo." },
                                    ].map((step, idx) => (
                                        <div key={idx} className="relative pl-8">
                                            <div className="absolute -left-[11px] top-1.5 h-4 w-4 rounded-full border-2 border-[#0d1117] bg-[#0d1117] flex items-center justify-center">
                                                <div className="h-2 w-2 rounded-full bg-[#00FF9D] shadow-[0_0_5px_#00FF9D]" />
                                            </div>
                                            <h4 className="text-white font-semibold mb-1">{step.title}</h4>
                                            <p className="text-sm text-[#8b949e]">{step.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Compact Grid for Sections 6-9 */}
                            <div className="grid md:grid-cols-2 gap-6 mb-16">
                                <section id="git" className="scroll-mt-8 p-6 rounded-lg border border-[#30363d] bg-[#161b22]/50 hover:border-[#8b949e]/30 transition-colors">
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <GitBranch className="w-5 h-5 text-[#00FF9D]" /> 6. Control de Versiones
                                    </h3>
                                    <ul className="space-y-1 text-sm text-[#8b949e] font-mono">
                                        <li>&gt; Git & GitHub</li>
                                        <li>&gt; Conventional Commits</li>
                                        <li>&gt; Branching Strategy</li>
                                    </ul>
                                </section>

                                <section id="testing" className="scroll-mt-8 p-6 rounded-lg border border-[#30363d] bg-[#161b22]/50 hover:border-[#8b949e]/30 transition-colors">
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <CheckCircle className="w-5 h-5 text-[#00FF9D]" /> 7. Testing
                                    </h3>
                                    <ul className="space-y-1 text-sm text-[#8b949e] font-mono">
                                        <li>&gt; Testing & Linting</li>
                                        <li>&gt; Validation (Zod)</li>
                                        <li>&gt; Code Review</li>
                                    </ul>
                                </section>

                                <section id="devops" className="scroll-mt-8 p-6 rounded-lg border border-[#30363d] bg-[#161b22]/50 hover:border-[#8b949e]/30 transition-colors">
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <Rocket className="w-5 h-5 text-[#f0883e]" /> 8. DevOps & Deploy
                                    </h3>
                                    <ul className="space-y-1 text-sm text-[#8b949e] font-mono">
                                        <li>&gt; Vercel / Docker</li>
                                        <li>&gt; CI/CD Pipelines</li>
                                        <li>&gt; Secure Env Vars</li>
                                    </ul>
                                </section>

                                <section id="rendimiento" className="scroll-mt-8 p-6 rounded-lg border border-[#30363d] bg-[#161b22]/50 hover:border-[#8b949e]/30 transition-colors">
                                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-yellow-400" /> 9. Rendimiento
                                    </h3>
                                    <ul className="space-y-1 text-sm text-[#8b949e] font-mono">
                                        <li>&gt; Lazy Loading</li>
                                        <li>&gt; Next/Image Optimization</li>
                                        <li>&gt; ISR / SSR Strategies</li>
                                    </ul>
                                </section>
                            </div>

                            {/* 10. Filosofía */}
                            <section id="filosofia" className="mb-16 scroll-mt-8">
                                <SectionHeader number="10" title="Filosofía Jacana-dev" />
                                <div className="p-6 rounded-lg border-l-4 border-[#00FF9D] bg-gradient-to-r from-[#00FF9D]/5 to-transparent">
                                    <ul className="space-y-4 text-[#c9d1d9]">
                                        <li className="flex gap-3 items-start">
                                            <Code2 className="w-5 h-5 text-[#00FF9D] shrink-0 mt-0.5" />
                                            <div>
                                                <strong className="text-white block">Código limpio y documentado</strong>
                                                <span className="text-sm text-[#8b949e]">Si no puedes explicarlo, no lo entiendes.</span>
                                            </div>
                                        </li>
                                        <li className="flex gap-3 items-start">
                                            <Cpu className="w-5 h-5 text-[#a371f7] shrink-0 mt-0.5" />
                                            <div>
                                                <strong className="text-white block">Decisiones técnicas justificadas</strong>
                                                <span className="text-sm text-[#8b949e]">No usamos tecnología por moda, sino por necesidad.</span>
                                            </div>
                                        </li>
                                        <li className="flex gap-3 items-start">
                                            <Layers className="w-5 h-5 text-[#58a6ff] shrink-0 mt-0.5" />
                                            <div>
                                                <strong className="text-white block">Escalabilidad desde el inicio</strong>
                                                <span className="text-sm text-[#8b949e]">Construimos para que crezca, no para que se rompa.</span>
                                            </div>
                                        </li>
                                    </ul>
                                    <blockquote className="mt-6 border-t border-[#30363d] pt-4 text-sm italic text-[#8b949e]">
                                        "La tecnología es una herramienta, el valor está en cómo se usa."
                                    </blockquote>
                                </div>
                            </section>

                            {/* 11. Casos de Uso */}
                            <section id="casos" className="mb-16 scroll-mt-8">
                                <SectionHeader number="11" title="Casos de Uso" />
                                <div className="flex flex-wrap gap-3">
                                    {["Landing Pages", "Dashboards Admin", "Sistemas de Auth", "SaaS Platforms", "Apps Empresariales"].map((tag, i) => (
                                        <span
                                            key={i}
                                            className="px-4 py-1.5 rounded-full text-xs font-semibold border border-[#30363d] bg-[#161b22] text-[#00FF9D] hover:border-[#00FF9D]/50 hover:shadow-[0_0_10px_rgba(0,255,157,0.1)] transition-all"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            {/* Footer */}
                            <footer className="pt-8 border-t border-[#30363d] text-center">
                                <h3 className="text-lg font-bold text-white mb-1 font-mono">JACANA-DEV</h3>
                                <p className="text-[#8b949e] text-sm">Desarrollo Fullstack Profesional</p>
                                <p className="text-[10px] mt-4 text-[#484f58] font-mono uppercase tracking-widest">
                                    System Manual // Version 1.0.0
                                </p>
                            </footer>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

// --- Componentes Auxiliares ---

function SectionHeader({ number, title }: { number: string; title: string }) {
    return (
        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 group cursor-pointer">
            <span className="text-[#30363d] group-hover:text-[#00FF9D] transition-colors select-none">#</span>
            <span>{number}. {title}</span>
        </h2>
    );
}

function TechCard({ icon, title, color, items }: { icon: React.ReactNode; title: string; color: string; items: string[] }) {
    return (
        <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22]/50 backdrop-blur-sm overflow-hidden group hover:border-[#8b949e]/30 transition-all duration-300">
            {/* Top Glow Line */}
            <div className="h-px w-full mb-4 opacity-50" style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />

            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded border border-transparent" style={{ borderColor: `${color}30`, backgroundColor: `${color}10` }}>
                    <span style={{ color: color }}>{icon}</span>
                </div>
                <h3 className="font-bold text-lg text-white">{title}</h3>
            </div>
            <ul className="space-y-2 text-sm text-[#8b949e] font-mono">
                {items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3" style={{ color: color }} />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}