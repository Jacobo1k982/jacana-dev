"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#0D1117]">
            <Navbar />

            <main className="flex-1 flex items-center justify-center px-4 pt-24 pb-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00A0E4]/10 border border-[#00A0E4]/30 mb-4"
                        >
                            <svg className="w-8 h-8 text-[#00A0E4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </motion.div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Contáctanos
                        </h1>
                        <p className="text-[#8B949E] text-sm max-w-md mx-auto">
                            ¿Tienes un proyecto en mente? Establece un canal seguro con nuestro equipo.
                        </p>
                    </div>

                    {/* Contact Form Component */}
                    <ContactForm />

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 max-w-lg mx-auto"
                    >
                        <div className="grid grid-cols-3 gap-4 text-center py-6 border-t border-[#30363D]">
                            <div className="flex flex-col items-center gap-2">
                                <svg className="w-5 h-5 text-[#00A0E4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <span className="text-xs text-[#8B949E] font-mono">info@jacana.dev</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <svg className="w-5 h-5 text-[#00A0E4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-xs text-[#8B949E] font-mono">Latinoamérica</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <svg className="w-5 h-5 text-[#00A0E4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-xs text-[#8B949E] font-mono">Respuesta 24h</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </main>
        </div>
    );
}
