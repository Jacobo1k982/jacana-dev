import ContactForm from "@/components/ContactForm";
import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-[#0d1117]">

            {/* Patrón de fondo sutil estilo GitHub */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="relative z-10 w-full max-w-4xl mx-auto">

                {/* --- Header --- */}
                <div className="text-center mb-12 max-w-2xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#30363d] bg-[#161b22] text-xs font-medium text-[#8b949e] mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#58a6ff] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#58a6ff]"></span>
                        </span>
                        Disponible para nuevos proyectos
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-[#f0f6fc] mb-4 tracking-tight">
                        ¿Hablemos de código?
                    </h1>
                    <p className="text-lg text-[#8b949e] leading-relaxed">
                        Desarrollo soluciones fullstack de alto rendimiento. Ya sea un MVP complejo o una consultoría técnica, estoy listo para escuchar tu idea.
                    </p>
                </div>

                {/* --- Main Card (Formulario) --- */}
                <div className="relative group">
                    {/* Efecto de brillo en el borde (hover) */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#58a6ff] to-[#a371f7] rounded-xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>

                    <div className="relative bg-[#161b22] border border-[#30363d] rounded-xl shadow-2xl overflow-hidden">
                        {/* Barra de acento superior */}
                        <div className="h-1 w-full bg-gradient-to-r from-[#58a6ff] to-[#a371f7]"></div>

                        <div className="p-8 sm:p-10">
                            <div className="mb-8 pb-6 border-b border-[#30363d]">
                                <h2 className="text-xl font-semibold text-[#f0f6fc]">Envíame un mensaje</h2>
                                <p className="text-sm text-[#8b949e] mt-1">Rellena el formulario y te responderé en menos de 24 horas.</p>
                            </div>

                            <ContactForm />
                        </div>
                    </div>
                </div>

                {/* --- Footer / Alternativa Directa --- */}
                <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-[#161b22] border border-[#30363d] p-6 rounded-lg">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-md bg-[#0d1117] text-[#58a6ff] border border-[#30363d]">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-[#f0f6fc]">Correo directo</p>
                            <a
                                href="mailto:ventas@jacana-dev.com"
                                className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors"
                            >
                                ventas@jacana-dev.com
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Enlaces sociales opcionales */}
                        <a href="#" className="p-2 rounded-md text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-all">
                            <Github className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 rounded-md text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-all">
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>

            </div>
        </main>
    );
}