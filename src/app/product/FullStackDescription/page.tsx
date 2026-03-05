// src/app/product/FullStackDescription/page.tsx

import FullStackDescription from "@/components/page/FullStackDescription";
import { GitBranch, Layers, Cpu, Server, Braces, Terminal, CheckCircle } from "lucide-react";

export default function FullStackPage() {
  return (
    <main className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] font-sans overflow-hidden">
      {/* Fondo Ambiental */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'linear-gradient(#8b949e 1px, transparent 1px), linear-gradient(90deg, #8b949e 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      {/* Glow Effects - Jacana Blue */}
      <div className="fixed top-0 left-1/2 w-[800px] h-[600px] bg-[#00A0E4]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-[#005A9C]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* HEADER */}
        <header className="mb-8 border-b border-[#30363d] pb-6">
          {/* Breadcrumb */}
          <div className="flex items-center mt-10 gap-2 text-sm text-[#8b949e] mb-4 font-mono">
            <span className="hover:text-[#00A0E4] cursor-pointer transition-colors">~</span>
            <span className="text-[#30363d]">/</span>
            <span className="hover:text-[#00A0E4] cursor-pointer transition-colors">dev</span>
            <span className="text-[#30363d]">/</span>
            <span className="text-white font-medium flex items-center gap-1.5">
              <GitBranch className="w-4 h-4 text-[#8b949e]" />
              fullstack-core
            </span>
            <span className="ml-2 px-2 py-0.5 text-[10px] font-semibold rounded-full border border-[#238636] text-[#3fb950] bg-[#238636]/10 uppercase">
              Public
            </span>
          </div>

          {/* Título */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight flex items-center gap-3">
              <span className="relative">
                Desarrollo Full-Stack
                <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#00A0E4] to-transparent" />
              </span>
            </h1>

            {/* Botones */}
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#c9d1d9] bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] hover:border-[#8b949e] transition-all">
                <Server className="w-3.5 h-3.5" />
                <span>Deploy</span>
                <span className="pl-2 border-l border-[#30363d] text-[#8b949e]">Live</span>
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-[#c9d1d9] bg-[#21262d] border border-[#30363d] rounded-md hover:bg-[#30363d] hover:border-[#8b949e] transition-all">
                <Cpu className="w-3.5 h-3.5" />
                <span>Build</span>
                <span className="pl-2 border-l border-[#30363d] text-[#3fb950]">Passing</span>
              </button>
            </div>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-[#161b22] border border-[#30363d] text-[#58a6ff]">
              <span className="w-2 h-2 rounded-full bg-[#3178c6]" /> TypeScript
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-[#161b22] border border-[#30363d] text-[#c9d1d9]">
              <span className="w-2 h-2 rounded-full bg-[#61dafb]" /> React
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-[#161b22] border border-[#30363d] text-[#3fb950]">
              <span className="w-2 h-2 rounded-full bg-[#339933]" /> Node.js
            </span>
          </div>
        </header>

        {/* LAYOUT PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Columna Contenido */}
          <div className="lg:col-span-3">
            <article className="relative bg-[#0d1117] border border-[#30363d] rounded-md shadow-[0_0_0_1px_rgba(48,54,61,0.5)] overflow-hidden group">
              {/* Header archivo */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d] sticky top-0 z-20">
                <div className="flex gap-1.5 absolute left-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00A0E4]" />
                </div>
                <div className="flex items-center gap-2 mx-auto text-xs text-[#8b949e]">
                  <span className="font-mono text-[#00A0E4] flex items-center gap-1.5">
                    <Braces size={14} />
                    README.md
                  </span>
                </div>
                <button className="absolute right-4 text-[10px] font-medium text-[#00A0E4] opacity-0 group-hover:opacity-100 transition-opacity border border-[#00A0E4]/30 px-2 py-0.5 rounded hover:bg-[#00A0E4]/10">
                  EDIT
                </button>
              </div>

              {/* Contenido */}
              <div className="p-6 sm:p-8 prose prose-invert prose-headings:text-white prose-p:text-[#c9d1d9] max-w-none">
                <FullStackDescription />
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t border-[#30363d] bg-[#161b22]/50 flex items-center justify-between text-xs text-[#8b949e] font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3fb950]" />
                  <span>Último commit: hace 2 minutos</span>
                </span>
                <span>10,432 lines (12 sloc)</span>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            {/* About */}
            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
              <h3 className="text-xs font-semibold text-white mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#00A0E4] rounded-full" />
                Sobre este servicio
              </h3>
              <p className="text-xs text-[#8b949e] leading-relaxed mb-3">
                Soluciones integrales de desarrollo web. Diseñamos arquitecturas preparadas para el futuro.
              </p>
              <a href="/contact" className="block w-full text-center text-xs font-semibold text-white bg-[#00A0E4] py-1.5 rounded-md hover:bg-[#005A9C] shadow-[0_0_10px_rgba(0,160,228,0.2)] transition-all">
                Contratar ahora
              </a>
            </div>

            {/* Tech Stack */}
            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
              <h3 className="text-xs font-semibold text-white mb-3">Tecnologías</h3>
              <div className="space-y-2">
                {[
                  { tech: "Next.js", version: "14.x" },
                  { tech: "PostgreSQL", version: "16.x" },
                  { tech: "Docker", version: "latest" },
                ].map(item => (
                  <div key={item.tech} className="flex items-center justify-between text-xs group cursor-pointer">
                    <span className="text-[#c9d1d9] group-hover:text-[#00A0E4] transition-colors flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#30363d] group-hover:bg-[#00A0E4]" />
                      {item.tech}
                    </span>
                    <span className="font-mono text-[#484f58]">{item.version}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="p-4 bg-[#161b22] border border-[#30363d] rounded-md">
              <h3 className="text-xs font-semibold text-white mb-3">Estado del Sistema</h3>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#3fb950]" /> Seguridad Activa
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <Layers className="w-3.5 h-3.5 text-[#f0883e]" /> Arquitectura Modular
                </div>
                <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <Terminal className="w-3.5 h-3.5 text-[#a371f7]" /> CI/CD Habilitado
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}