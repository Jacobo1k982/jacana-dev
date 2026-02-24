// src/app/product/APIs/page.tsx (o la ruta correspondiente)

import ModernAPIDescription from "@/components/page/ModernAPIDescription";
import { Server, Terminal, Layers, Cpu, ArrowRight, CheckCircle } from "lucide-react";

export default function APIsPage() {
    return (
        <main className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans">

            {/* 1. Fondo Ambiental (Grid Técnico) */}
            <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8b949e 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            {/* Glow Effect (Púrpura/Cian para APIs) */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-purple-500/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                {/* ========================================== */}
                {/* HEADER: ESTILO DOCUMENTACIÓN API         */}
                {/* ========================================== */}
                <header className="mb-8">

                    {/* Ruta técnica (Namespace style) */}
                    <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-4 font-mono bg-[#161b22] px-3 py-2 rounded-md border border-[#30363d] w-fit">
                        <Server className="w-3.5 h-3.5 text-[#8b949e]" />
                        <span className="text-[#30363d]">api</span>
                        <span className="text-[#30363d]">::</span>
                        <span className="text-[#c9d1d9]">v2</span>
                        <span className="text-[#30363d]">/</span>
                        <span className="text-[#58a6ff]">gateway</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#30363d] pb-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                                APIs Modernas
                                <span className="text-xs font-mono px-2 py-1 bg-[#238636]/20 text-[#3fb950] rounded border border-[#238636]/30">
                                    STABLE
                                </span>
                            </h1>
                            <p className="text-[#8b949e] max-w-xl">
                                Infraestructura de comunicación robusta. REST, GraphQL y WebSockets listos para producción.
                            </p>
                        </div>

                        {/* Status Indicator */}
                        <div className="flex items-center gap-4 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-md">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3fb950] opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#3fb950]"></span>
                                </span>
                                <span className="text-xs font-medium text-white">All Systems Operational</span>
                            </div>
                            <span className="text-[10px] font-mono text-[#8b949e]">99.98% Uptime</span>
                        </div>
                    </div>
                </header>

                {/* ========================================== */}
                {/* LAYOUT PRINCIPAL (TERMINAL + DOCS)       */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Columna Izquierda: Sidebar (Endpoints Navigation) */}
                    <aside className="lg:col-span-1 space-y-4 order-2 lg:order-1">

                        {/* Card: Quick Start */}
                        <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
                            <div className="px-4 py-3 border-b border-[#30363d] bg-[#0d1117] flex items-center gap-2">
                                <Terminal className="w-3.5 h-3.5 text-[#00FF9D]" />
                                <span className="text-xs font-semibold text-white uppercase tracking-wider">Endpoints</span>
                            </div>
                            <div className="p-2 space-y-1">
                                {[
                                    { method: 'GET', path: '/users', color: 'text-[#3fb950]' },
                                    { method: 'POST', path: '/auth', color: 'text-[#58a6ff]' },
                                    { method: 'PUT', path: '/data', color: 'text-[#f0883e]' },
                                    { method: 'DEL', path: '/cache', color: 'text-[#f85149]' },
                                ].map((endpoint) => (
                                    <button key={endpoint.path} className="w-full flex items-center gap-2 px-2 py-1.5 text-xs rounded hover:bg-white/5 group transition-colors">
                                        <span className={`font-mono font-bold w-8 text-left ${endpoint.color}`}>{endpoint.method}</span>
                                        <span className="text-[#8b949e] group-hover:text-white font-mono transition-colors">{endpoint.path}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Card: SDK Support */}
                        <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
                            <h3 className="text-xs font-semibold text-white mb-3">SDKs Disponibles</h3>
                            <div className="flex flex-wrap gap-2">
                                {['Node.js', 'Python', 'Go', 'cURL'].map(sdk => (
                                    <span key={sdk} className="px-2 py-0.5 text-[10px] rounded-full bg-[#21262d] border border-[#30363d] text-[#8b949e]">
                                        {sdk}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card: Tech Stack */}
                        <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
                            <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                                <Layers className="w-3.5 h-3.5 text-purple-400" />
                                Arquitectura
                            </h3>
                            <div className="space-y-2 text-xs text-[#8b949e]">
                                <div className="flex justify-between"><span>Gateway</span><span className="text-white">Kong / NGINX</span></div>
                                <div className="flex justify-between"><span>Protocolo</span><span className="text-white">HTTP/2</span></div>
                                <div className="flex justify-between"><span>Formato</span><span className="text-white">JSON / MsgPack</span></div>
                            </div>
                        </div>
                    </aside>

                    {/* Columna Derecha: Contenido Principal (Response Body) */}
                    <div className="lg:col-span-3 order-1 lg:order-2">
                        <article className="relative bg-[#0d1117] border border-[#30363d] rounded-md shadow-lg overflow-hidden group">

                            {/* Header estilo respuesta HTTP */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9D]" />
                                    </div>
                                    {/* Simulación de status bar */}
                                    <div className="flex items-center gap-1.5 text-xs font-mono">
                                        <span className="text-[#3fb950]">HTTP/2</span>
                                        <span className="text-white">200</span>
                                        <span className="text-[#8b949e]">OK</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                                    <Cpu className="w-3.5 h-3.5" />
                                    <span>Response Time: 42ms</span>
                                </div>
                            </div>

                            {/* Contenido Dinámico */}
                            <div className="p-6 sm:p-8">
                                <ModernAPIDescription />
                            </div>

                            {/* Footer Actions */}
                            <div className="px-6 py-4 border-t border-[#30363d] bg-[#161b22]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                                    <CheckCircle className="w-3.5 h-3.5 text-[#3fb950]" />
                                    <span>Última sincronización: hace 5 minutos</span>
                                </div>
                                <a
                                    href="/contacto"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0d1117] bg-[#00FF9D] px-4 py-2 rounded-md hover:bg-[#00cc7a] shadow-[0_0_15px_rgba(0,255,157,0.2)] transition-all group"
                                >
                                    Solicitar API Key
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