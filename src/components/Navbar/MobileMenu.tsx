"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, Zap } from "lucide-react";
import { menuItems } from "./menuData";

// ============================================
// COMPONENTE: Icono Hamburguesa Animado
// ============================================
// Un icono elegante que transforma 3 líneas en una X
const AnimatedHamburgerIcon = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <div className="relative w-6 h-6 flex flex-col justify-center items-center">
            {/* Línea Superior */}
            <motion.span
                className="absolute w-5 h-0.5 bg-current rounded-full"
                animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? 0 : -5,
                    width: isOpen ? "1.25rem" : "1.25rem", // 20px
                    backgroundColor: isOpen ? "#00FF9D" : "#8b949e",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />
            {/* Línea Central (Desaparece) */}
            <motion.span
                className="absolute w-5 h-0.5 bg-current rounded-full"
                animate={{
                    opacity: isOpen ? 0 : 1,
                    scale: isOpen ? 0 : 1,
                    backgroundColor: "#8b949e",
                }}
                transition={{ duration: 0.1 }}
            />
            {/* Línea Inferior */}
            <motion.span
                className="absolute w-5 h-0.5 bg-current rounded-full"
                animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? 0 : 5,
                    backgroundColor: isOpen ? "#00FF9D" : "#8b949e",
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            />

            {/* Glow Effect cuando está abierto */}
            {isOpen && (
                <motion.div
                    className="absolute inset-0 rounded-full bg-[#00FF9D]/20 blur-md"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1.5 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                />
            )}
        </div>
    );
};

// ============================================
// COMPONENTE PRINCIPAL: Mobile Menu Ultra
// ============================================
export default function MobileMenuUltra({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    // Variantes de animación para el panel principal
    const sidebarVariants = {
        closed: {
            x: "100%",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
        open: {
            x: "0%",
            transition: { type: "spring", stiffness: 300, damping: 30 }
        },
    };

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <>
                    {/* 1. Overlay Oscuro con partículas sutiles */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-[#0d1117]/80 backdrop-blur-md z-40"
                    >
                        {/* Patrón de grid sutil en el fondo */}
                        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#00FF9D 1px, transparent 1px), linear-gradient(90deg, #00FF9D 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    </motion.div>

                    {/* 2. Panel Lateral estilo Cyber/Glass */}
                    <motion.aside
                        variants={sidebarVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed top-0 right-0 h-full w-full sm:w-[380px] z-50 max-h-screen flex flex-col"
                    >
                        {/* Contenedor con Glassmorphism */}
                        <div className="relative h-full bg-[#0d1117]/95 border-l border-[#30363d] backdrop-blur-xl shadow-[0_0_40px_rgba(0,255,157,0.1)] flex flex-col overflow-hidden">

                            {/* Decoración: Línea superior brillante */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FF9D] to-transparent opacity-80" />

                            {/* Decoración: Círculo de luz difusa */}
                            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF9D]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                            {/* --- HEADER DEL PANEL --- */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-[#30363d]/80 bg-black/20">
                                <div className="flex items-center gap-2">
                                    <Zap className="w-4 h-4 text-[#00FF9D]" />
                                    <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#8b949e]">
                                        Menú
                                    </span>
                                </div>

                                {/* Botón de Cierre Animado */}
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg text-[#8b949e] hover:text-[#00FF9D] hover:bg-white/5 transition-colors focus:outline-none relative group"
                                    aria-label="Cerrar menú"
                                >
                                    <AnimatedHamburgerIcon isOpen={true} />
                                </button>
                            </div>

                            {/* --- CONTENIDO SCROLLABLE --- */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10">
                                <div className="px-3 py-4 space-y-1.5">

                                    {menuItems.map((item, index) => {
                                        const isActive = activeMenu === item.label;

                                        return (
                                            <motion.div
                                                key={item.label}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                            >
                                                {/* Botón Principal del Item */}
                                                <button
                                                    onClick={() =>
                                                        item.subItems
                                                            ? setActiveMenu(isActive ? null : item.label)
                                                            : setIsOpen(false)
                                                    }
                                                    className={`
                                                        w-full flex items-center justify-between text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 relative group
                                                        ${isActive
                                                            ? "bg-[#00FF9D]/5 text-[#00FF9D] border border-[#00FF9D]/20 shadow-[0_0_15px_rgba(0,255,157,0.05)]"
                                                            : "text-gray-300 hover:bg-white/5 border border-transparent hover:border-[#30363d]"
                                                        }
                                                    `}
                                                >
                                                    <span className="flex items-center gap-2 relative z-10">
                                                        {item.label}
                                                        {isActive && (
                                                            <motion.span
                                                                initial={{ scale: 0, opacity: 0 }}
                                                                animate={{ scale: 1, opacity: 1 }}
                                                                className="text-[#00FF9D]"
                                                            >
                                                                <Sparkles className="w-3 h-3" />
                                                            </motion.span>
                                                        )}
                                                    </span>

                                                    {item.subItems && (
                                                        <motion.span
                                                            animate={{ rotate: isActive ? 180 : 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className={`transition-colors z-10 ${isActive ? 'text-[#00FF9D]' : 'text-[#484f58]'}`}
                                                        >
                                                            <ChevronDown size={16} />
                                                        </motion.span>
                                                    )}

                                                    {/* Fondo gradiente hover */}
                                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#00FF9D]/0 to-purple-500/0 group-hover:from-[#00FF9D]/5 group-hover:to-purple-500/5 transition-all duration-300 pointer-events-none" />
                                                </button>

                                                {/* SubItems Desplegables */}
                                                <AnimatePresence>
                                                    {item.subItems && isActive && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="flex flex-col gap-1 py-2 pl-4 mt-1 border-l border-[#30363d]/50 ml-5">
                                                                {item.subItems.map((sub, i) => (
                                                                    <Link
                                                                        key={sub.label}
                                                                        href={sub.href}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#8b949e] hover:text-[#00FF9D] hover:bg-white/5 rounded-lg transition-all group relative"
                                                                    >
                                                                        {/* Punto indicador */}
                                                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-[#484f58] rounded-full group-hover:bg-[#00FF9D] group-hover:shadow-[0_0_5px_#00FF9D] transition-all" />

                                                                        <span className="ml-2 flex-1 flex items-center justify-between">
                                                                            {sub.label}
                                                                            <ChevronDown size={12} className="text-[#30363d] -rotate-90 group-hover:text-[#00FF9D] transition-colors" />
                                                                        </span>
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* --- FOOTER ACTIONS --- */}
                            <div className="p-4 border-t border-[#30363d] bg-[#0d1117] relative z-10">
                                {/* Efecto de luz desde abajo */}
                                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0d1117] to-transparent pointer-events-none" />

                                <div className="flex flex-col gap-2.5 relative">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full px-5 py-2.5 text-sm font-medium text-center text-gray-300 border border-[#30363d] rounded-lg hover:bg-white/5 hover:text-white hover:border-[#8b949e] transition-all"
                                    >
                                        Iniciar sesión
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="group relative w-full px-5 py-2.5 text-sm font-semibold text-center text-black bg-[#00FF9D] rounded-lg overflow-hidden transition-all duration-200 shadow-[0_0_10px_rgba(0,255,157,0.2)] hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] active:scale-95"
                                    >
                                        <span className="relative flex items-center justify-center gap-2">
                                            Crear cuenta
                                            <Sparkles className="w-3.5 h-3.5" />
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}