'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import Lottie from 'lottie-react';
import WebDevelopmentAnimation from './Lottie/code-dark.json';

export default function HeroSection() {
    const [text, setText] = useState('');
    const [isVisible, setIsVisible] = useState(false);

    const fullText = `> Inicializando la plataforma JACANA DEV...\n> Suite de colaboración en línea impulsada por IA.\n> Código en tiempo real, Diseño y documentación en un solo lugar.\n> Segura • Escalable • Construida para el mañana.\n> Listo. Escribe "explorar" para comenzar.`;

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let i = 0;
        const speed = 25;

        const type = () => {
            if (i < fullText.length) {
                if (fullText[i] === '\n') {
                    setText((prev) => prev + '\n');
                    i++;
                } else {
                    setText((prev) => prev + fullText[i]);
                    i++;
                }
                setTimeout(type, speed);
            }
        };

        const timer = setTimeout(type, 500);
        return () => clearTimeout(timer);
    }, [isVisible, fullText]);

    return (
        <section className={`relative overflow-hidden min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8
          transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

            {/* Background gradient layers */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-900/90"></div>

            {/* Decorative gradient orbs */}
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute top-1/3 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-emerald-500/40">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 to-emerald-400/20 animate-pulse"></div>
            </div>

            <div className="max-w-6xl mx-auto text-center relative z-10 w-full pt-14 pb-16">
                {/* Lottie Animation */}
                <div className="w-full max-w-md mx-auto mb-10 animate-fade-up">
                    <div className="relative">
                        {/* Glow effect behind Lottie */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-teal-500/15 to-emerald-500/20 blur-3xl rounded-3xl"></div>
                        <Lottie
                            animationData={WebDevelopmentAnimation}
                            loop={true}
                            autoplay={true}
                            className="relative z-10"
                        />
                    </div>
                </div>
                {/* Main title */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold leading-tight mb-8 tracking-tight animate-fade-up" style={{ animationDelay: '200ms' }}>
                    <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                        Soluciones digitales
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
                        Full Stack
                    </span>
                    <br />
                    <span className="text-white/90">para tu negocio</span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl text-slate-400 mb-12 max-w-4xl mx-auto leading-relaxed animate-fade-up" style={{ animationDelay: '300ms' }}>
                    En <span className="text-cyan-400 font-semibold">JACANA DEV</span> transformamos ideas en productos digitales excepcionales.
                    Desarrollo web, e-commerce y sistemas a medida con tecnología de vanguardia.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-2xl mx-auto mb-16 animate-fade-up" style={{ animationDelay: '400ms' }}>
                    <button className="group relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)] w-full sm:w-auto">
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 transition-transform duration-500 group-hover:scale-105" />
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/20 to-emerald-400/0 blur-lg opacity-0 group-hover:opacity-100 group-hover:animate-pulse" />
                        <span className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-emerald-500/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            Comenzar ahora
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <button className="group px-8 py-4 rounded-xl font-semibold text-slate-300 border border-slate-600/50 hover:border-cyan-400/50 hover:text-white transition-all duration-300 hover:bg-white/5 w-full sm:w-auto relative overflow-hidden">
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-emerald-500/0 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center justify-center gap-2">
                            <Zap size={18} className="text-cyan-400/70 group-hover:text-cyan-400 transition-colors" />
                            Prueba gratuita
                        </span>
                    </button>
                </div>

                {/* Terminal with glow effect */}
                <div className="max-w-4xl mx-auto relative z-10 animate-fade-up" style={{ animationDelay: '500ms' }}>
                    {/* Glow layers */}
                    <div className="absolute inset-0 rounded-2xl blur-2xl bg-gradient-to-r from-cyan-500/20 via-teal-500/15 to-emerald-500/20 opacity-60 scale-110 -z-10"></div>
                    <div className="absolute inset-0 rounded-2xl blur-3xl bg-gradient-to-r from-cyan-400/10 to-emerald-400/10 opacity-40 scale-125 -z-20"></div>

                    <div className="relative bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                        {/* Terminal header */}
                        <div className="flex items-center px-6 py-4 bg-slate-900/50 border-b border-white/5">
                            <div className="flex space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors"></div>
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors"></div>
                            </div>
                            <div className="flex-1 text-center">
                                <span className="text-sm text-slate-400 font-mono">jacana-dev@terminal:~</span>
                            </div>
                            <div className="w-16"></div>
                        </div>

                        {/* Terminal content */}
                        <div className="p-6 font-mono text-sm sm:text-base leading-relaxed min-h-[280px] max-h-[400px] overflow-y-auto custom-scrollbar">
                            <pre className="text-cyan-400 whitespace-pre-wrap break-words">
                                {text}
                            </pre>
                            <span className="inline-flex items-center ml-1 animate-pulse">
                                <span className="w-2.5 h-5 bg-cyan-400 rounded-sm"></span>
                            </span>
                        </div>

                        {/* Bottom accent line */}
                        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-emerald-500/30"></div>
                    </div>
                </div>

                {/* Trust indicators */}
                <div className="mt-20 flex flex-wrap justify-center items-center gap-8 text-slate-500 animate-fade-up"
                    style={{ animationDelay: '600ms' }}>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                        <span className="text-sm">100% uptime</span>
                    </div>
                    <div className="w-px h-4 bg-slate-700 hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                        <span className="text-sm">Seguridad empresarial</span>
                    </div>
                    <div className="w-px h-4 bg-slate-700 hidden sm:block"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></div>
                        <span className="text-sm">Soporte 24/7</span>
                    </div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none"></div>
        </section>
    );
}