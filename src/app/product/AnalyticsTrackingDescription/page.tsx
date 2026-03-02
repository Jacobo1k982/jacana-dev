// src/app/servicios/analytics/page.tsx (o la ruta correspondiente)

import AnalyticsTrackingDescription from '@/components/page/AnalyticsTrackingDescription';
import { BarChart3, Terminal, Cpu, Activity, TrendingUp, ArrowRight, CheckCircle, Eye, PieChart } from 'lucide-react';

export default function AnalyticsTrackingPage() {
    return (
        <main className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">

            {/* 1. Fondo Ambiental (Grid de Datos) */}
            <div
                className="fixed inset-0 pointer-events-none opacity-[0.02]"
                style={{
                    backgroundImage: 'radial-gradient(#8b949e 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}
            />

            {/* Glow Effects (Tono Verde/Cian para datos) */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#3fb950]/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#58a6ff]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

                {/* ========================================== */}
                {/* HEADER: ESTILO DATA OBSERVABILITY        */}
                {/* ========================================== */}
                <header className="mb-8 border-b border-[#30363d] pb-6">

                    {/* Ruta técnica (Namespace style) */}
                    <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-4 font-mono bg-[#161b22] px-3 py-2 rounded-md border border-[#30363d] w-fit">
                        <BarChart3 className="w-3.5 h-3.5 text-[#3fb950]" />
                        <span className="text-[#30363d]">telemetry</span>
                        <span className="text-[#30363d]">::</span>
                        <span className="text-[#c9d1d9]">metrics</span>
                        <span className="text-[#30363d]">/</span>
                        <span className="text-[#3fb950]">insights</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                                Analítica & Tracking
                                <span className="text-xs font-mono px-2 py-1 bg-[#238636]/20 text-[#3fb950] rounded border border-[#238636]/30 flex items-center gap-1">
                                    <Activity size={10} className="animate-pulse" /> LIVE
                                </span>
                            </h1>
                            <p className="text-[#8b949e] max-w-xl">
                                Visualiza el comportamiento de usuario y optimiza tu embudo. Datos accionables en tiempo real.
                            </p>
                        </div>

                        {/* Metrics Status Indicator */}
                        <div className="flex items-center gap-4 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-md">
                            <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                                <Eye className="w-3.5 h-3.5 text-[#58a6ff]" />
                                <span>Users Online</span>
                            </div>
                            <div className="h-4 w-px bg-[#30363d]" />
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
                                <span className="text-[10px] font-mono text-white">1,204</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* ========================================== */}
                {/* LAYOUT PRINCIPAL (DASHBOARD + SIDEBAR)    */}
                {/* ========================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* Columna Izquierda: Sidebar (Quick Stats) */}
                    <aside className="lg:col-span-1 space-y-4 order-2 lg:order-1">

                        {/* Card: Key Metrics */}
                        <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
                            <div className="px-4 py-3 border-b border-[#30363d] bg-[#0d1117] flex items-center gap-2">
                                <Terminal className="w-3.5 h-3.5 text-[#3fb950]" />
                                <span className="text-xs font-semibold text-white uppercase tracking-wider">KPIs</span>
                            </div>
                            <div className="p-2 space-y-1 font-mono text-xs">
                                {[
                                    { name: 'Sessions', value: '+12.5%', color: 'text-[#3fb950]' },
                                    { name: 'Bounce Rate', value: '-3.2%', color: 'text-[#f0883e]' },
                                    { name: 'Conversion', value: '+5.1%', color: 'text-[#3fb950]' },
                                    { name: 'Avg. Load Time', value: '1.2s', color: 'text-[#58a6ff]' },
                                ].map((metric) => (
                                    <div key={metric.name} className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer group transition-colors">
                                        <span className="text-[#c9d1d9] group-hover:text-white transition-colors flex items-center gap-2">
                                            <span className="w-1 h-1 rounded-full bg-[#30363d] group-hover:bg-[#3fb950]" />
                                            {metric.name}
                                        </span>
                                        <span className={`text-[9px] font-bold ${metric.color}`}>{metric.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card: Tools */}
                        <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
                            <h3 className="text-xs font-semibold text-white mb-3">Herramientas</h3>
                            <div className="flex flex-wrap gap-2">
                                {['GA4', 'GTM', 'Mixpanel', 'PostHog'].map(tool => (
                                    <span key={tool} className="px-2 py-0.5 text-[10px] rounded-full bg-[#21262d] border border-[#30363d] text-[#8b949e]">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Card: Health Status */}
                        <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
                            <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                                <TrendingUp className="w-3.5 h-3.5 text-[#3fb950]" />
                                Estado del Sistema
                            </h3>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                                    <CheckCircle className="w-3.5 h-3.5 text-[#3fb950]" /> Tracking activo
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                                    <PieChart className="w-3.5 h-3.5 text-[#58a6ff]" /> Reports OK
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Columna Derecha: Contenido Principal (Report View) */}
                    <div className="lg:col-span-3 order-1 lg:order-2">
                        <article className="relative bg-[#0d1117] border border-[#30363d] rounded-md shadow-lg overflow-hidden group">

                            {/* Header estilo report viewer */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                                        <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
                                    </div>
                                    <span className="text-xs text-[#8b949e] font-mono">analytics.dashboard</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
                                    <Cpu className="w-3.5 h-3.5" />
                                    <span>Last sync: 2 min ago</span>
                                </div>
                            </div>

                            {/* Contenido Dinámico */}
                            <div className="p-6 sm:p-8">
                                <AnalyticsTrackingDescription />
                            </div>

                            {/* Footer Actions */}
                            <div className="px-6 py-4 border-t border-[#30363d] bg-[#161b22]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
                                    <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
                                    <span>Integraciones listas para configurar</span>
                                </div>
                                <a
                                    href="/contacto"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-black bg-[#3fb950] px-4 py-2 rounded-md hover:bg-[#2ea043] shadow-[0_0_10px_rgba(46,160,67,0.2)] transition-all group"
                                >
                                    Configurar Analítica
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