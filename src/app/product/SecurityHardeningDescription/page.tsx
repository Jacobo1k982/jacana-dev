// src/app/servicios/seguridad/page.tsx (o la ruta correspondiente)

import SecurityHardeningDescription from "@/components/page/SecurityHardeningDescription";
import { Shield, Terminal, Lock, Server, ShieldCheck, ShieldAlert, ArrowRight } from "lucide-react";

export default function SecurityHardeningDescriptionPage() {
    return (
        <main className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">

            {/* 1. Fondo Ambiental (Grid Técnico) */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: 'linear-gradient(#8b949e 1px, transparent 1px), linear-gradient(90deg, #8b949e 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Glow Effects (Rojo/Verde para seguridad) */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#f85149]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#3fb950]/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                {/* ========================================== */}
                {/* HEADER: ESTILO SECURITY CONSOLE          */}
                {/* ========================================== */}
                <header className="mb-8 border-b border-[#30363d] pb-6">

                    {/* Ruta técnica (Namespace style) */}
                    <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-4 font-mono bg-[#161b22] px-3 py-2 rounded-md border border-[#30363d] w-fit">
                        <Shield className="w-3.5 h-3.5 text-[#f85149]" />
                        <span className="text-[#30363d]">security</span>
                        <span className="text-[#30363d]">::</span>
                        <span className="text-[#c9d1d9]">hardening</span>
                        <span className="text-[#30363d]">/</span>
                        <span className="text-[#3fb950]">v2.0</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                                Seguridad & Hardening
                                <span className="text-xs font-mono px-2 py-1 bg-[#238636]/20 text-[#3fb950] rounded border border-[#238636]/30 flex items-center gap-1">
                                    <Lock size={10} /> SECURE
                                </span>
                            </h1>
                            <p className="text-[#8b949e] max-w-xl">
                                Protección proactiva, auditorías de código y endurecimiento de infraestructura.
                            </p>
                        </div>

                        {/* System Status Indicator */}
                        <div className="flex items-center gap-4 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-md">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3fb950]"></span>
                                </span>
                                <span className="text-xs font-medium text-white">System Integrity: High</span>
                            </div>
                            <div className="h-4 w-px bg-[#30363d]" />
                            <div className="flex items-center gap-1 text-xs text-[#f85149]">
                                <ShieldAlert size={12} />
                                <span>0 Vulnerabilities</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ========================================== */}
                {/* LAYOUT PRINCIPAL (TERMINAL + SIDEBAR)     */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Columna Izquierda: Sidebar (Protocolos) */}
                    <aside className="lg:col-span-1 space-y-4 order-2 lg:order-1">

                        {/* Card: Protocols */}
                        <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
                            <div className="px-4 py-3 border-b border-[#30363d] bg-[#0d1117] flex items-center gap-2">
                                <Terminal className="w-3.5 h-3.5 text-[#3fb950]" />
                                <span className="text-xs font-semibold text-white uppercase tracking-wider">Protocolos</span>
                            </div>
                            <div className="p-2 space-y-1 font-mono text-xs">
                                {[
                                    { name: 'SSL/TLS Enforcement', status: 'ACTIVE' },
                                    { name: 'Input Sanitization', status: 'ACTIVE' },
                                    { name: 'Rate Limiting', status: 'ACTIVE' },
                                    { name: 'CORS Policy', status: 'STRICT' },
                                ].map((proto) => (
                                    <div key={proto.name} className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer group transition-colors">
                                        <span className="text-[#c9d1d9] group-hover:text-white transition-colors flex items-center gap-2">
                                            <span className="w-1 h-1 bg-[#3fb950] rounded-full shadow-[0_0_4px_#3fb950]" />
                                            {proto.name}
                                        </span>
                                        <span className="text-[9px] text-[#3fb950] bg-[#3fb950]/10 px-1.5 py-0.5 rounded">{proto.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card: Security Layers */}
                        <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
                            <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                                <Server className="w-3.5 h-3.5 text-[#8b949e]" />
                                Capas de Seguridad
                            </h3>
                            <div className="space-y-2 text-xs text-[#8b949e]">
                                <div className="flex justify-between"><span>Application</span><span className="text-[#3fb950]">Protected</span></div>
                                <div className="flex justify-between"><span>Transport</span><span className="text-[#3fb950]">Encrypted</span></div>
                                <div className="flex justify-between"><span>Database</span><span className="text-[#3fb950]">Hardened</span></div>
                            </div>
                        </div>

                        {/* Card: Tools */}
                        <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
                            <h3 className="text-xs font-semibold text-white mb-3">Herramientas</h3>
                            <div className="flex flex-wrap gap-2">
                                {['SonarQube', 'OWASP', 'Snyk', 'Auth0'].map(tool => (
                                    <span key={tool} className="px-2 py-0.5 text-[10px] rounded-full bg-[#21262d] border border-[#30363d] text-[#8b949e]">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Columna Derecha: Contenido Principal (Report Output) */}
                    <div className="lg:col-span-3 order-1 lg:order-2">
                        <article className="relative bg-[#0d1117] border border-[#30363d] rounded-md shadow-lg overflow-hidden group">

                            {/* Header estilo terminal / log output */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
                                    </div>
                                    <span className="text-xs text-[#8b949e] font-mono">security-audit.log</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
                                    <ShieldCheck className="w-3.5 h-3.5 text-[#3fb950]" />
                                    <span>Status: 200 OK</span>
                                </div>
                            </div>

                            {/* Contenido Dinámico */}
                            <div className="p-6 sm:p-8">
                                <SecurityHardeningDescription />
                            </div>

                            {/* Footer Actions */}
                            <div className="px-6 py-4 border-t border-[#30363d] bg-[#161b22]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
                                    <span className="text-[#f0883e]">⚠</span>
                                    <span>Último scan completado: hace 10 minutos</span>
                                </div>
                                <a
                                    href="/contacto"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-[#f85149] px-4 py-2 rounded-md hover:bg-[#da3633] shadow-[0_0_10px_rgba(248,81,73,0.2)] transition-all group"
                                >
                                    Solicitar Auditoría
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </main>
    );
}