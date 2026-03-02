import { PrismaClient } from "@prisma/client";
import { Mail, Calendar, User, Trash2 } from "lucide-react";

export const dynamic = 'force-dynamic'; // Esto soluciona el error de build
const prisma = new PrismaClient();

export default async function AdminMessagesPage() {
    // Obtenemos los mensajes ordenados por los más recientes
    const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return (
        <div className="min-h-screen bg-[#0d1117] p-8 text-[#c9d1d9]">
            <div className="max-w-5xl mx-auto">
                <header className="mb-8 border-b border-[#30363d] pb-4">
                    <h1 className="text-2xl font-bold text-[#f0f6fc]">Panel de Mensajes</h1>
                    <p className="text-[#8b949e]">Tienes {messages.length} mensajes en total.</p>
                </header>

                <div className="grid gap-4">
                    {messages.length === 0 ? (
                        <p className="text-center py-10 text-[#8b949e]">No hay mensajes todavía.</p>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className="bg-[#161b22] border border-[#30363d] rounded-lg p-5 hover:border-[#444c56] transition-colors"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-[#58a6ff]">
                                            <User className="w-4 h-4" />
                                            <span className="font-semibold">{msg.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-[#8b949e] text-sm">
                                            <Mail className="w-4 h-4" />
                                            <span>{msg.email}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#8b949e] text-xs">
                                        <Calendar className="w-4 h-4" />
                                        <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="bg-[#0d1117] p-4 rounded border border-[#30363d] text-[#b1bac4] italic">
                                    "{msg.message}"
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}