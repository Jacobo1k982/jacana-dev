"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
                <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed top-0 right-0 h-full w-80 bg-black/90 backdrop-blur-xl shadow-2xl z-50"
                >
                    <div className="px-6 py-8 flex flex-col gap-4">
                        {menuItems.map((item) => (
                            <div key={item.label} className="border-b border-gray-700">
                                <button
                                    onClick={() =>
                                        item.subItems
                                            ? setActiveMenu(activeMenu === item.label ? null : item.label)
                                            : null
                                    }
                                    className="w-full flex justify-between items-center px-3 py-3 text-sm font-semibold text-white rounded-lg hover:bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 shadow-sm"
                                >
                                    <span>{item.label}</span>
                                    {item.subItems && (
                                        <span className="ml-2">{activeMenu === item.label ? "−" : "+"}</span>
                                    )}
                                </button>

                                <AnimatePresence>
                                    {item.subItems && activeMenu === item.label && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25, ease: "easeOut" }}
                                            className="overflow-hidden mt-2"
                                        >
                                            {item.subItems.map((sub) => (
                                                <Link
                                                    key={sub.label}
                                                    href={sub.href}
                                                    className="block px-5 py-3 text-sm text-gray-300 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300"
                                                >
                                                    {sub.label}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}

                        <div className="mt-6 flex flex-col gap-3">
                            <Link
                                href="#"
                                className="text-white text-sm font-medium hover:text-gray-300 transition-colors duration-300"
                            >
                                Sign in
                            </Link>
                            <Link
                                href="#"
                                className="bg-white text-black text-sm font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors duration-300 text-center"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
