// components/Navbar.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { menuItems } from "@/components/Navbar/menuData";
import Logo from "./Logo";
import LogoTwo from "./LogoTwo";

const isInternalLink = (href: string): boolean => {
    return href.startsWith("/") && !href.startsWith("//") && !href.startsWith("http");
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative z-50">
            <nav
                className={`fixed top-0 w-full transition-all duration-500 ease-in-out ${scrolled
                        ? "bg-black/80 backdrop-blur-2xl shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)] border-b border-gray-800/50"
                        : "bg-black/20 backdrop-blur-3xl"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        {/* Logo */}
                        <div className="lg:hidden">
                            <LogoTwo />
                        </div>
                        <div className="hidden lg:block">
                            <Logo />
                        </div>

                        {/* Menú Desktop */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {menuItems.map((item) => (
                                <div key={item.label} className="relative group">
                                    {item.subItems ? (
                                        <>
                                            <button className="relative px-3 py-2 text-sm font-medium text-gray-300 rounded-xl transition-all duration-300 group-hover:text-white">
                                                <span className="relative z-10">{item.label}</span>
                                                <span className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                                <span className="absolute -inset-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur rounded-xl opacity-0 group-hover:opacity-70 transition-opacity -z-10"></span>
                                            </button>
                                            {/* Submenú: solo con group-hover, sin estado */}
                                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-96 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                                <div className="relative">
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-cyan-500/40 rounded-2xl blur-xl opacity-60"></div>
                                                    <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800/50 rounded-2xl shadow-2xl overflow-hidden z-10">
                                                        <div className="p-5 grid grid-cols-2 gap-3">
                                                            {item.subItems?.map((subItem) => (
                                                                <Link
                                                                    key={subItem.label}
                                                                    href={subItem.href}
                                                                    className="flex items-center p-3 rounded-xl bg-gray-800/30 hover:bg-gray-800/60 transition-all duration-300 group/sub border border-transparent hover:border-indigo-500/30"
                                                                    onClick={() => setIsOpen(false)}
                                                                >
                                                                    {subItem.image && (
                                                                        <div className="relative mr-3">
                                                                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-lg blur opacity-60 group-hover/sub:opacity-100 transition-opacity"></div>
                                                                            <img
                                                                                src={subItem.image}
                                                                                alt={subItem.label}
                                                                                className="relative z-10 w-9 h-9 rounded-lg object-cover ring-1 ring-gray-700/30"
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    <span className="text-white text-sm font-medium group-hover/sub:text-cyan-300 transition-colors">
                                                                        {subItem.label}
                                                                    </span>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    ) : isInternalLink(item.href) ? (
                                        <Link
                                            href={item.href}
                                            className="relative px-3 py-2 text-sm font-medium text-gray-300 rounded-xl transition-all duration-300 group-hover:text-white"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="relative z-10">{item.label}</span>
                                            <span className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            <span className="absolute -inset-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur rounded-xl opacity-0 group-hover:opacity-70 transition-opacity -z-10"></span>
                                        </Link>
                                    ) : (
                                        <a
                                            href={item.href}
                                            className="relative px-3 py-2 text-sm font-medium text-gray-300 rounded-xl transition-all duration-300 group-hover:text-white"
                                            target={item.href.startsWith("http") ? "_blank" : undefined}
                                            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        >
                                            <span className="relative z-10">{item.label}</span>
                                            <span className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                            <span className="absolute -inset-2 bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur rounded-xl opacity-0 group-hover:opacity-70 transition-opacity -z-10"></span>
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="flex-1 hidden lg:flex justify-center px-4">
                            <div className="relative w-full max-w-md">
                                <input
                                    type="text"
                                    placeholder="Buscar o ir a..."
                                    className="w-full bg-white/5 text-sm text-white placeholder-gray-500 rounded-xl py-2.5 px-4 pl-10 border border-transparent focus:border-cyan-500/40 focus:bg-white/10 focus:outline-none transition-all duration-300"
                                />
                                <svg
                                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Right Buttons */}
                        <div className="hidden lg:flex items-center space-x-3">
                            <a
                                href="#"
                                className="relative px-4 py-2 text-sm font-medium text-gray-300 rounded-xl transition-all duration-300 hover:text-white"
                            >
                                <span className="relative z-10">Iniciar sesión</span>
                                <span className="absolute -inset-1 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity"></span>
                            </a>
                            <a
                                href="#"
                                className="relative px-5 py-2.5 text-sm font-semibold rounded-xl overflow-hidden transition-all duration-300 group"
                            >
                                <span className="relative z-10 text-white">Registrarse</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 opacity-100"></span>
                                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                <span className="absolute -inset-1 bg-gradient-to-r from-cyan-500/50 to-purple-600/50 blur opacity-0 group-hover:opacity-80 transition-opacity -z-10"></span>
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200 relative"
                                aria-label="Toggle menu"
                            >
                                {isOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 bg-black/95 backdrop-blur-2xl z-40 pt-16 animate-in slide-in-from-top duration-300">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[calc(100vh-4rem)] overflow-y-auto">
                        <div className="space-y-6 py-4">
                            {menuItems.map((item) => {
                                if (item.subItems) {
                                    return (
                                        <div key={item.label} className="pb-5">
                                            <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider px-3 py-2">
                                                {item.label}
                                            </div>
                                            <div className="space-y-1 mt-2">
                                                {item.subItems.map((subItem) => (
                                                    <Link
                                                        key={subItem.label}
                                                        href={subItem.href}
                                                        className="flex items-center px-4 py-3.5 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all duration-200 group"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        {subItem.image && (
                                                            <div className="relative mr-4">
                                                                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-lg blur opacity-60 group-hover:opacity-100 transition-opacity"></div>
                                                                <img
                                                                    src={subItem.image}
                                                                    alt={subItem.label}
                                                                    className="relative z-10 w-9 h-9 rounded-lg object-cover ring-1 ring-gray-700/30"
                                                                />
                                                            </div>
                                                        )}
                                                        <span className="text-base font-medium">{subItem.label}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return isInternalLink(item.href) ? (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="block px-4 py-3.5 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl text-base font-medium transition-all duration-200"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="block px-4 py-3.5 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl text-base font-medium transition-all duration-200"
                                        target={item.href.startsWith("http") ? "_blank" : undefined}
                                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}