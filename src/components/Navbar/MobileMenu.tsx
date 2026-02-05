"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown } from "lucide-react";
import { menuItems } from "./menuData";

export default function MobileMenuUltra({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean;
    setIsOpen: (val: boolean) => void;
}) {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay oscuro estilo GitHub (fondo sólido oscuro) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-40"
                    />

                    {/* Panel Lateral */}
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }} // Transición lineal estilo nativo
                        className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-50"
                    >
                        {/* Contenedor principal estilo GitHub Dark */}
                        <div className="relative h-full bg-[#0d1117] border-l border-[#30363d] flex flex-col shadow-2xl">

                            {/* Header del Panel (Close Button) */}
                            <div className="flex items-center justify-between px-4 py-4 border-b border-[#30363d]">
                                <span className="text-sm font-semibold text-[#c9d1d9]">Menu</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-md hover:bg-[#21262d] text-[#8b949e] hover:text-white transition-colors focus:outline-none focus:ring-1 focus:ring-[#30363d]"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="px-4 py-4">
                                    {/* Menu items */}
                                    {menuItems.map((item) => {
                                        const isActive = activeMenu === item.label;

                                        return (
                                            <div key={item.label} className="mb-1">
                                                <button
                                                    onClick={() =>
                                                        item.subItems
                                                            ? setActiveMenu(isActive ? null : item.label)
                                                            : setIsOpen(false)
                                                    }
                                                    className={`
                                                        w-full flex items-center justify-between text-left px-3 py-3 rounded-md text-sm font-medium transition-colors
                                                        ${isActive ? "bg-[#161b22] text-white" : "text-[#c9d1d9] hover:bg-[#161b22] hover:text-white"}
                                                    `}
                                                >
                                                    <span>{item.label}</span>

                                                    {item.subItems && (
                                                        <motion.span
                                                            animate={{ rotate: isActive ? 180 : 0 }}
                                                            transition={{ duration: 0.2 }}
                                                            className="text-[#8b949e]"
                                                        >
                                                            <ChevronDown size={16} />
                                                        </motion.span>
                                                    )}
                                                </button>

                                                <AnimatePresence>
                                                    {item.subItems && isActive && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                                            className="overflow-hidden pl-2 border-l-2 border-[#21262d] ml-4 mt-1"
                                                        >
                                                            <div className="flex flex-col gap-1 py-2">
                                                                {item.subItems.map((sub) => (
                                                                    <Link
                                                                        key={sub.label}
                                                                        href={sub.href}
                                                                        onClick={() => setIsOpen(false)}
                                                                        className="block px-3 py-2 text-sm text-[#8b949e] hover:text-white hover:bg-[#161b22] rounded-md transition-colors"
                                                                    >
                                                                        {sub.label}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Footer Actions (Auth) */}
                            <div className="p-4 border-t border-[#30363d] bg-[#0d1117]">
                                <div className="flex flex-col gap-3">
                                    <Link
                                        href="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full px-4 py-2 text-sm font-medium text-center text-[#c9d1d9] border border-[#30363d] rounded-md hover:bg-[#21262d] hover:text-white transition-colors"
                                    >
                                        Sign in
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full px-4 py-2.5 text-sm font-semibold text-center text-white bg-[#238636] rounded-md hover:bg-[#2ea043] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#238636] focus:ring-offset-[#0d1117] transition-all"
                                    >
                                        Sign up
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