"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
                    />

                    {/* Panel */}
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 260, damping: 28 }}
                        className="fixed top-0 right-0 h-full w-[90vw] max-w-sm z-50"
                    >
                        <div className="relative h-full bg-slate-950/80 backdrop-blur-2xl border-l border-white/10 shadow-[0_0_60px_-15px_rgba(0,255,255,0.25)]">
                            {/* Halo */}
                            <div className="absolute -left-10 top-1/4 h-1/2 w-24 bg-gradient-to-b from-cyan-500/20 to-indigo-500/20 blur-3xl pointer-events-none" />

                            <div className="px-6 py-8 flex flex-col gap-6">
                                {/* Menu items */}
                                {menuItems.map((item) => {
                                    const isActive = activeMenu === item.label;

                                    return (
                                        <div key={item.label} className="border-b border-white/10 pb-4">
                                            <button
                                                onClick={() =>
                                                    item.subItems
                                                        ? setActiveMenu(isActive ? null : item.label)
                                                        : setIsOpen(false)
                                                }
                                                className="w-full flex items-center justify-between text-left px-1 py-2 text-sm font-semibold text-white"
                                            >
                                                <span className="tracking-wide">{item.label}</span>

                                                {item.subItems && (
                                                    <motion.span
                                                        animate={{ rotate: isActive ? 180 : 0 }}
                                                        transition={{ duration: 0.25 }}
                                                        className="text-cyan-400"
                                                    >
                                                        <ChevronDown size={18} />
                                                    </motion.span>
                                                )}
                                            </button>

                                            <AnimatePresence>
                                                {item.subItems && isActive && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.25, ease: "easeOut" }}
                                                        className="overflow-hidden mt-2 pl-2"
                                                    >
                                                        <div className="flex flex-col gap-1">
                                                            {item.subItems.map((sub) => (
                                                                <Link
                                                                    key={sub.label}
                                                                    href={sub.href}
                                                                    onClick={() => setIsOpen(false)}
                                                                    className="rounded-lg px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] transition"
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

                                {/* Actions */}
                                <div className="mt-auto pt-6 border-t border-white/10 flex flex-col gap-3">
                                    <Link
                                        href="#"
                                        onClick={() => setIsOpen(false)}
                                        className="text-sm text-slate-300 hover:text-white transition"
                                    >
                                        Sign in
                                    </Link>

                                    <Link
                                        href="#"
                                        onClick={() => setIsOpen(false)}
                                        className="relative overflow-hidden rounded-xl px-4 py-3 text-center text-sm font-semibold text-white"
                                    >
                                        <span className="relative z-10">Sign up</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600" />
                                        <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 to-purple-600/50 blur opacity-70" />
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
