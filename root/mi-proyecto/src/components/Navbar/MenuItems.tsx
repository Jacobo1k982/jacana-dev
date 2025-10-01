// components/MenuItemsUltra.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from "./menuData";

export default function MenuItemsUltra() {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);

    return (
        <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
                <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => item.subItems && setActiveMenu(item.label)}
                    onMouseLeave={() => setActiveMenu(null)}
                >
                    {item.subItems ? (
                        <button
                            onClick={() =>
                                setActiveMenu(activeMenu === item.label ? null : item.label)
                            }
                            className="relative px-4 py-2.5 text-sm font-medium text-gray-300 rounded-xl transition-all duration-300 bg-transparent hover:text-white group"
                        >
                            <span className="relative z-10">{item.label}</span>
                            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"></span>
                        </button>
                    ) : (
                        <Link
                            href={item.href}
                            className="relative px-4 py-2.5 text-sm font-medium text-gray-300 rounded-xl transition-all duration-300 bg-transparent hover:text-white group"
                        >
                            <span className="relative z-10">{item.label}</span>
                            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                            <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur opacity-0 group-hover:opacity-70 transition-opacity duration-300 -z-10"></span>
                        </Link>
                    )}

                    {/* Submenú mejorado */}
                    {item.subItems && (
                        <AnimatePresence>
                            {activeMenu === item.label && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4"
                                >
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-pink-500/40 rounded-2xl blur-xl opacity-60"></div>

                                        <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl w-[480px] overflow-hidden p-6 z-10">
                                            <div className="grid grid-cols-2 gap-4">
                                                {item.subItems.map((sub) => (
                                                    <Link
                                                        key={sub.label}
                                                        href={sub.href}
                                                        className="flex flex-col items-center text-center p-4 rounded-xl bg-gray-800/40 hover:bg-gray-800/70 transition-all duration-300 group border border-gray-700/50 hover:border-indigo-500/50"
                                                    >
                                                        {sub.image && (
                                                            <motion.div
                                                                className="relative mb-3"
                                                                whileHover={{ y: -4 }}
                                                                transition={{ type: "spring", stiffness: 300 }}
                                                            >
                                                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity"></div>
                                                                {/* ✅ Imagen envuelta en motion.div en lugar de motion.img */}
                                                                <motion.div
                                                                    whileHover={{ scale: 1.1 }}
                                                                    transition={{ duration: 0.3 }}
                                                                    className="relative z-10 h-16 w-16 rounded-lg shadow-md overflow-hidden"
                                                                >
                                                                    <img
                                                                        src={sub.image}
                                                                        alt={sub.label}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                </motion.div>
                                                            </motion.div>
                                                        )}
                                                        <span className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors">
                                                            {sub.label}
                                                        </span>
                                                        {sub.description && (
                                                            <span className="text-xs text-gray-400 mt-1 leading-tight">
                                                                {sub.description}
                                                            </span>
                                                        )}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    )}
                </div>
            ))}
        </div>
    );
}