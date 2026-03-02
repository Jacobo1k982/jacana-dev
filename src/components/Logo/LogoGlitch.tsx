"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

interface LogoGlitchProps {
    src?: string;
    alt?: string;
    width?: number;
    height?: number;
    autoTrigger?: boolean;
    triggerOnHover?: boolean;
    intensity?: "low" | "medium" | "high" | "extreme";
    duration?: number;
    onGlitchComplete?: () => void;
    showText?: boolean;
    text?: string;
    subText?: string;
}

export default function LogoGlitch({
    src = "/jacana.png",
    alt = "Logo Glitch",
    width = 128,
    height = 88,
    autoTrigger = true,
    triggerOnHover = false,
    intensity = "high",
    duration = 3000,
    onGlitchComplete,
    showText = true,
    text = "SYSTEM ERROR",
    subText = "Reiniciando protocolos...",
}: LogoGlitchProps) {
    const [isGlitching, setIsGlitching] = useState(autoTrigger);
    const [glitchCount, setGlitchCount] = useState(0);

    // Configuración de intensidad
    const intensityConfig = {
        low: { shakes: 2, duration: 200, offset: 2 },
        medium: { shakes: 4, duration: 300, offset: 4 },
        high: { shakes: 6, duration: 500, offset: 6 },
        extreme: { shakes: 10, duration: 800, offset: 10 },
    };

    const config = intensityConfig[intensity];

    // Trigger manual del glitch
    const triggerGlitch = useCallback(() => {
        if (isGlitching) return;
        setIsGlitching(true);
        setGlitchCount(prev => prev + 1);

        setTimeout(() => {
            setIsGlitching(false);
            onGlitchComplete?.();
        }, duration);
    }, [isGlitching, duration, onGlitchComplete]);

    // Auto-trigger al montar
    useEffect(() => {
        if (autoTrigger) {
            const timer = setTimeout(() => triggerGlitch(), 500);
            return () => clearTimeout(timer);
        }
    }, [autoTrigger, triggerGlitch]);

    // Variants para el efecto glitch principal - con tipos correctos
    const glitchVariants: Variants = {
        normal: {
            x: 0,
            y: 0,
            skewX: 0,
            opacity: 1,
            filter: "none",
        },
        glitching: {
            x: Array.from({ length: config.shakes }, () =>
                (Math.random() - 0.5) * config.offset * 2
            ),
            y: Array.from({ length: config.shakes }, () =>
                (Math.random() - 0.5) * config.offset
            ),
            skewX: Array.from({ length: config.shakes }, () =>
                (Math.random() - 0.5) * 20
            ),
            opacity: Array.from({ length: config.shakes }, (_, i) =>
                i % 2 === 0 ? 1 : 0.8
            ),
            filter: Array.from({ length: config.shakes }, (_, i) =>
                `hue-rotate(${i * 30}deg) blur(${i % 2}px)`
            ),
            transition: {
                times: Array.from({ length: config.shakes }, (_, i) =>
                    i / (config.shakes - 1)
                ),
                duration: config.duration / 1000,
                ease: "linear" as const,
                repeat: 0,
            },
        },
    };

    return (
        <div className="relative flex flex-col items-center justify-center group">
            {/* CSS Global para efectos avanzados */}
            <style jsx global>{`
                @keyframes glitch-skew {
                    0% { transform: skew(0deg); }
                    10% { transform: skew(-5deg); }
                    20% { transform: skew(5deg); }
                    30% { transform: skew(-3deg); }
                    40% { transform: skew(3deg); }
                    50% { transform: skew(-8deg); }
                    60% { transform: skew(8deg); }
                    70% { transform: skew(-2deg); }
                    80% { transform: skew(2deg); }
                    90% { transform: skew(-4deg); }
                    100% { transform: skew(0deg); }
                }
                
                @keyframes glitch-noise {
                    0%, 100% { clip-path: inset(0 0 95% 0); }
                    10% { clip-path: inset(10% 0 80% 0); }
                    20% { clip-path: inset(80% 0 5% 0); }
                    30% { clip-path: inset(30% 0 60% 0); }
                    40% { clip-path: inset(70% 0 20% 0); }
                    50% { clip-path: inset(20% 0 75% 0); }
                    60% { clip-path: inset(60% 0 30% 0); }
                    70% { clip-path: inset(10% 0 85% 0); }
                    80% { clip-path: inset(90% 0 5% 0); }
                    90% { clip-path: inset(40% 0 50% 0); }
                }
                
                @keyframes scanline {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(100%); }
                }
                
                @keyframes rgb-split {
                    0%, 100% { 
                        text-shadow: -2px 0 #ff0000, 2px 0 #00ff00; 
                    }
                    50% { 
                        text-shadow: -4px 0 #0000ff, 4px 0 #ffff00; 
                    }
                }

                .glitch-container {
                    position: relative;
                    display: inline-block;
                }

                .glitch-layer {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    mix-blend-mode: screen;
                }

                .glitch-layer-red {
                    filter: url(#glitch-red);
                    animation: glitch-noise 0.3s infinite;
                }

                .glitch-layer-blue {
                    filter: url(#glitch-blue);
                    animation: glitch-noise 0.3s infinite reverse;
                }

                .scanline-overlay {
                    background: linear-gradient(
                        to bottom,
                        transparent 50%,
                        rgba(0, 255, 157, 0.05) 51%
                    );
                    background-size: 100% 4px;
                    animation: scanline 2s linear infinite;
                }

                .glitch-text {
                    animation: rgb-split 0.5s ease-in-out infinite;
                    font-family: 'JetBrains Mono', monospace;
                }

                ${isGlitching ? '.glitch-active { animation: glitch-skew 0.3s cubic-bezier(.25,.46,.45,.94) both infinite; }' : ''}
            `}</style>

            {/* SVG Filters para distorsión de color */}
            <svg style={{ position: "absolute", width: 0, height: 0 }}>
                <defs>
                    <filter id="glitch-red">
                        <feColorMatrix
                            type="matrix"
                            values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                        />
                    </filter>
                    <filter id="glitch-blue">
                        <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                        />
                    </filter>
                </defs>
            </svg>

            {/* Contenedor principal con efecto glitch */}
            <motion.div
                className={`glitch-container ${isGlitching ? "glitch-active" : ""}`}
                animate={isGlitching ? "glitching" : "normal"}
                variants={glitchVariants}
                onMouseEnter={() => triggerOnHover && triggerGlitch()}
            >
                {/* Capa Base (Imagen Original) */}
                <div className="relative z-10">
                    <img
                        src={src}
                        alt={alt}
                        width={width}
                        height={height}
                        className="object-contain drop-shadow-[0_0_15px_rgba(0,255,157,0.3)]"
                    />
                </div>

                {/* Capa Roja (RGB Split) */}
                <AnimatePresence>
                    {isGlitching && (
                        <>
                            <motion.div
                                className="glitch-layer glitch-layer-red opacity-60"
                                initial={{ opacity: 0, x: -2 }}
                                animate={{ opacity: 0.6, x: [-2, 2, -2] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, repeat: Infinity }}
                            >
                                <img
                                    src={src}
                                    alt=""
                                    width={width}
                                    height={height}
                                    className="object-contain"
                                />
                            </motion.div>

                            {/* Capa Azul (RGB Split) */}
                            <motion.div
                                className="glitch-layer glitch-layer-blue opacity-60"
                                initial={{ opacity: 0, x: 2 }}
                                animate={{ opacity: 0.6, x: [2, -2, 2] }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, repeat: Infinity, delay: 0.1 }}
                            >
                                <img
                                    src={src}
                                    alt=""
                                    width={width}
                                    height={height}
                                    className="object-contain"
                                />
                            </motion.div>

                            {/* Scanline Overlay */}
                            <div className="glitch-layer scanline-overlay pointer-events-none" />

                            {/* Noise Overlay */}
                            <motion.div
                                className="glitch-layer opacity-20"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                                }}
                                animate={{ opacity: [0.1, 0.3, 0.1] }}
                                transition={{ duration: 0.2, repeat: Infinity }}
                            />
                        </>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Texto de Error (Opcional) */}
            <AnimatePresence>
                {showText && (
                    <motion.div
                        className="mt-6 text-center"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <motion.h1
                            className="text-2xl font-bold text-white glitch-text tracking-wider"
                            animate={isGlitching ? { opacity: [1, 0.8, 1, 0.9, 1] } : {}}
                            transition={{ duration: 0.5, repeat: isGlitching ? Infinity : 0 }}
                        >
                            {text}
                        </motion.h1>

                        <motion.p
                            className="text-sm text-[#00FF9D] font-mono mt-2"
                            animate={isGlitching ? { x: [-1, 1, -1] } : {}}
                            transition={{ duration: 0.2, repeat: isGlitching ? Infinity : 0 }}
                        >
                            {subText}
                        </motion.p>

                        {/* Progress Bar de "Reinicio" */}
                        {isGlitching && (
                            <motion.div
                                className="mt-4 w-48 h-1 bg-[#30363d] rounded-full overflow-hidden mx-auto"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                            >
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[#00FF9D] via-[#a371f7] to-[#00FF9D]"
                                    initial={{ width: "0%" }}
                                    animate={{ width: "100%" }}
                                    transition={{ duration: duration / 1000, ease: "linear" as const }}
                                />
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Botón de Re-trigger (para demo o interacción) */}
            {!autoTrigger && (
                <button
                    onClick={triggerGlitch}
                    disabled={isGlitching}
                    className="mt-6 px-4 py-2 text-xs font-mono text-[#00FF9D] border border-[#00FF9D]/40 rounded hover:bg-[#00FF9D]/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isGlitching ? "GLITCHING..." : "TRIGGER GLITCH"}
                </button>
            )}
        </div>
    );
}
