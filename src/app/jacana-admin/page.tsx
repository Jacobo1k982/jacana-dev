// src/app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import { Terminal, Mail, User, Clock, AlertCircle, Database, ShieldCheck } from "lucide-react";

// Fuerza la actualización de datos en cada solicitud
export const revalidate = 0;

export default async function AdminPage() {
    const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <main className="relative min-h-screen bg-[#010409] text-[#c9d1d9] font-sans overflow-hidden selection:bg-[#00FF9D]/20 selection:text-[#00FF9D]">

            {/* Fondo Ambiental */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(#8b949e 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="fixed top-0 right-0 w-1/2 h-1/2 bg-purple-500/5 blur-[150px] rounded-full" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Encabezado Estilo Sistema */}
                <header className="mb-10 border-b border-[#30363d] pb-6">
                    <div className="flex items-center gap-2 text-xs text-[#8b949e] mb-4 font-mono">
                        <span className="text-[#30363d]">~</span>
                        <span className="text-[#30363d]">/</span>
                        <span className="text-white font-medium flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-[#a371f7]" />
                            secure-zone
                        </span>
                        <span className="ml-2 px-2 py-0.5 text-[10px] rounded-full border border-[#a371f7]/30 text-[#a371f7] bg-[#a371f7]/10 uppercase tracking-wider">
                            Admin
                        </span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                        Bandeja de Entrada
                    </h1>
                    <p className="text-[#8b949e] text-sm font-mono">
                        // Registros de transmisión recibidos
                    </p>
                </header>

                {/* Contenedor Principal */}
                <div className="space-y-4">
                    {messages.length === 0 ? (
                        <div className="rounded-xl border border-dashed border-[#30363d] p-12 text-center bg-[#0d1117]/50">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#161b22] border border-[#30363d] mb-4">
                                <Database className="w-8 h-8 text-[#30363d]" />
                            </div>
                            <h3 className="text-lg font-semibold text-white mb-1">Sistema Vacío</h3>
                            <p className="text-[#8b949e] text-sm font-mono">
                                No se encontraron registros en la base de datos.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4">
                            {messages.map((msg) => (
                                <article
                                    key={msg.id}
                                    className="relative rounded-xl border border-[#30363d] bg-[#0d1117]/80 backdrop-blur-sm overflow-hidden shadow-lg group hover:border-[#8b949e]/30 transition-colors duration-200"
                                >
                                    {/* Barra Superior Simulada */}
                                    <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#00FF9D]" />
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] text-[#8b949e] font-mono">
                                            <span className="text-[#30363d]">ID:</span> {String(msg.id).substring(0, 8)}...
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        {/* Cabecera del Mensaje */}
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-md bg-[#21262d] border border-[#30363d]">
                                                    <User className="w-4 h-4 text-[#58a6ff]" />
                                                </div>
                                                <div>
                                                    <h3 className="text-base font-semibold text-white">{msg.name}</h3>
                                                    <div className="flex items-center gap-1.5 text-xs text-[#8b949e] font-mono">
                                                        <Mail size={10} />
                                                        <span>{msg.email}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Timestamp */}
                                            <div className="flex items-center gap-1.5 text-[10px] text-[#8b949e] font-mono px-2 py-1 rounded bg-[#010409] border border-[#21262d]">
                                                <Clock size={10} className="text-[#d29922]" />
                                                {new Date(msg.createdAt).toLocaleString('es-ES', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>

                                        {/* Cuerpo del Mensaje */}
                                        <div className="relative">
                                            <div className="absolute top-0 left-0 bottom-0 w-px bg-[#30363d]" />
                                            <p className="text-sm text-[#c9d1d9] whitespace-pre-wrap pl-4 font-mono leading-relaxed">
                                                <span className="text-[#30363d] select-none">&gt; </span>
                                                {msg.message}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}