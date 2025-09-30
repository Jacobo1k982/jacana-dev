'use client';

import { useState, useEffect } from 'react';

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
        const speed = 30;

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
        <section className={`relative overflow-hidden bg-gradient-to-b from-[#0d0c22] to-[#1e1a4f] text-white py-24 px-4 sm:px-6 lg:px-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>

            {/* Fondo púrpura suave en la parte inferior */}
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#6b46c1] to-transparent opacity-30"></div>

            {/* Estrellas pequeñas decorativas */}
            <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse"></div>
            <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse delay-1000"></div>
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white rounded-full opacity-50 animate-pulse delay-2000"></div>

            <div className="max-w-6xl mx-auto text-center relative z-10">
                {/* Título principal */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight animate-fade-up">
                    Soluciones digitales <span className='text-[#03878e]'>Full Stack</span> <br />
                    <span className="text-white">para hacer crecer su negocio</span>
                </h1>

                {/* Subtítulo */}
                <p className="text-lg sm:text-xl opacity-90 mb-10 max-w-3xl mx-auto animate-fade-up animate-delay-200">
                    En JACANA DEV desarrollamos aplicaciones web, tiendas en línea y sistemas a medida con tecnología de vanguardia.
                </p>

                {/* Formulario */}
                <form className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-3xl mx-auto animate-fade-up animate-delay-400">
                    {/* Contenedor del input con botón interno */}
                    <div className="relative flex-1 min-w-0">
                        <button
                            type="submit"
                            className="absolute right-0 top-0 h-full px-4 bg-[#28a745] hover:bg-[#218838] font-semibold rounded-r-md text-white text-base whitespace-nowrap z-10 transition-all duration-300 transform hover:scale-[1.02]"
                        >
                            Regístrate en JACANA
                        </button>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo electrónico"
                            className="w-full pl-6 pr-48 py-4 rounded-md text-gray-900 text-base border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 bg-white bg-opacity-90 backdrop-blur-sm placeholder-gray-500"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        className="px-8 py-4 bg-transparent border border-white hover:bg-white hover:bg-opacity-10 font-semibold rounded-md transition-all duration-300 text-base whitespace-nowrap"
                    >
                        Prueba JACANA
                    </button>
                </form>
            </div>

            {/* Terminal con resplandor de luz (glow) */}
            <div className="max-w-4xl mx-auto relative z-10 pt-16">
                {/* Capa de resplandor detrás del terminal */}
                <div className="absolute inset-0 rounded-xl blur-lg bg-gradient-to-r from-cyan-500/20 via-purple-500/30 to-pink-500/20 opacity-70 scale-105 -z-10"></div>

                <div className="relative bg-black/30 backdrop-blur-md border border-purple-500/20 rounded-xl overflow-hidden shadow-xl">
                    {/* Barra de título de la terminal */}
                    <div className="flex items-center px-4 py-2 bg-black/40 border-b border-gray-700/50">
                        <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <span className="ml-4 text-sm text-gray-300 font-mono">jacana-dev@terminal:~</span>
                    </div>

                    {/* Contenido de la terminal */}
                    <div className="p-6 font-mono text-green-400 text-sm sm:text-base leading-relaxed whitespace-pre-wrap break-words">
                        {text}
                        <span className="ml-1 animate-pulse">█</span>
                    </div>
                </div>
            </div>
        </section>
    );
}