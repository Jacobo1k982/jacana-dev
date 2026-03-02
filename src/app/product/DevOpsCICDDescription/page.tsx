// src/app/servicios/devops/page.tsx (o la ruta correspondiente)

import DevOpsCICDDescription from "@/components/page/DevOpsCICDDescription";
import { GitBranch, Terminal, Cpu, Server, CheckCircle, ArrowRight, Activity, Container, Zap } from "lucide-react";

export default function DevOpsCICDPage() {
  return (
    <main className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">

      {/* 1. Fondo Ambiental (Grid de Circuitos) */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#8b949e 1px, transparent 1px), linear-gradient(90deg, #8b949e 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Glow Effects (Tono ámbar/naranja para advertencia/energía) */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#f0883e]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#00FF9D]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* ========================================== */}
        {/* HEADER: ESTILO PIPELINE STATUS           */}
        {/* ========================================== */}
        <header className="mb-8 border-b border-[#30363d] pb-6">

          {/* Ruta técnica (Namespace style) */}
          <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-4 font-mono bg-[#161b22] px-3 py-2 rounded-md border border-[#30363d] w-fit">
            <GitBranch className="w-3.5 h-3.5 text-[#f0883e]" />
            <span className="text-[#30363d]">ci-cd</span>
            <span className="text-[#30363d]">/</span>
            <span className="text-[#c9d1d9]">pipelines</span>
            <span className="text-[#30363d]">/</span>
            <span className="text-[#f0883e]">production</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                DevOps & CI/CD
                <span className="text-xs font-mono px-2 py-1 bg-[#f0883e]/20 text-[#f0883e] rounded border border-[#f0883e]/30 flex items-center gap-1">
                  <Zap size={10} /> AUTOMATED
                </span>
              </h1>
              <p className="text-[#8b949e] max-w-xl">
                Automatización de despliegues, infraestructura como código y monitoreo proactivo.
              </p>
            </div>

            {/* Pipeline Status Indicator */}
            <div className="flex items-center gap-4 px-4 py-2 bg-[#161b22] border border-[#30363d] rounded-md">
              <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                <Activity className="w-3.5 h-3.5 text-[#3fb950]" />
                <span className="text-white font-mono">Pipeline Active</span>
              </div>
              <div className="h-4 w-px bg-[#30363d]" />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
                <span className="text-[10px] font-mono text-[#3fb950]">ALL CHECKS PASSED</span>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================== */}
        {/* LAYOUT PRINCIPAL (TERMINAL + STAGES)      */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Columna Izquierda: Sidebar (Pipeline Stages) */}
          <aside className="lg:col-span-1 space-y-4 order-2 lg:order-1">

            {/* Card: Stages */}
            <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
              <div className="px-4 py-3 border-b border-[#30363d] bg-[#0d1117] flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#f0883e]" />
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Workflow</span>
              </div>
              <div className="p-2 space-y-1 font-mono text-xs">
                {[
                  { name: 'Build', status: 'SUCCESS', time: '12s' },
                  { name: 'Test', status: 'SUCCESS', time: '45s' },
                  { name: 'Scan', status: 'SUCCESS', time: '30s' },
                  { name: 'Deploy', status: 'RUNNING', time: '...' },
                ].map((stage) => (
                  <div key={stage.name} className="flex items-center justify-between px-2 py-1.5 rounded hover:bg-white/5 cursor-pointer group transition-colors">
                    <span className="text-[#c9d1d9] group-hover:text-white transition-colors flex items-center gap-2">
                      {stage.status === 'RUNNING'
                        ? <span className="w-1.5 h-1.5 rounded-full bg-[#f0883e] animate-pulse" />
                        : <CheckCircle size={12} className="text-[#3fb950]" />
                      }
                      {stage.name}
                    </span>
                    <span className={`text-[9px] ${stage.status === 'RUNNING' ? 'text-[#f0883e]' : 'text-[#8b949e]'}`}>{stage.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card: Tools */}
            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
              <h3 className="text-xs font-semibold text-white mb-3 flex items-center gap-2">
                <Container className="w-3.5 h-3.5 text-[#58a6ff]" />
                Infrastructure
              </h3>
              <div className="flex flex-wrap gap-2">
                {['Docker', 'Kubernetes', 'Terraform', 'AWS'].map(tool => (
                  <span key={tool} className="px-2 py-0.5 text-[10px] rounded-full bg-[#21262d] border border-[#30363d] text-[#8b949e]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Card: Resources */}
            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
              <h3 className="text-xs font-semibold text-white mb-3">Uso de Recursos</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-[10px] mb-1 text-[#8b949e]">
                    <span>CPU</span>
                    <span className="text-[#f0883e]">85%</span>
                  </div>
                  <div className="h-1 bg-[#21262d] rounded-full overflow-hidden">
                    <div className="h-full bg-[#f0883e] w-[85%]" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] mb-1 text-[#8b949e]">
                    <span>Memory</span>
                    <span className="text-[#3fb950]">42%</span>
                  </div>
                  <div className="h-1 bg-[#21262d] rounded-full overflow-hidden">
                    <div className="h-full bg-[#3fb950] w-[42%]" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Columna Derecha: Contenido Principal (Log Output) */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <article className="relative bg-[#0d1117] border border-[#30363d] rounded-md shadow-lg overflow-hidden group">

              {/* Header estilo terminal output */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9D]" />
                  </div>
                  <span className="text-xs text-[#8b949e] font-mono">pipeline-output.log</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
                  <Server className="w-3.5 h-3.5" />
                  <span>Runner: ubuntu-latest</span>
                </div>
              </div>

              {/* Contenido Dinámico */}
              <div className="p-6 sm:p-8 bg-[#0d1117]">
                <DevOpsCICDDescription />
              </div>

              {/* Footer Actions */}
              <div className="px-6 py-4 border-t border-[#30363d] bg-[#161b22]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#8b949e] font-mono">
                  <span className="text-[#3fb950]">✔</span>
                  <span>Workflow completed in 1m 23s</span>
                </div>
                <a
                  href="/contacto"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-black bg-[#f0883e] px-4 py-2 rounded-md hover:bg-[#d29922] shadow-[0_0_10px_rgba(240,136,62,0.2)] transition-all group"
                >
                  Configurar Pipeline
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