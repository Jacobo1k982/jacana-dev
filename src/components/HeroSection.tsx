// components/Hero.tsx
'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Code2, Zap, Shield, Terminal, Sparkles } from 'lucide-react';

// ============================================
// TYPES & INTERFACES
// ============================================
interface GraphNode {
    id: string;
    x: number;
    y: number;
    radius: number;
    color: string;
    pulsePhase: number;
}

interface GraphLink {
    id: string;
    from: GraphNode;
    to: GraphNode;
    progress: number;
    speed: number;
    color: string;
}

interface Particle {
    x: number;
    y: number;
    opacity: number;
}

// ============================================
// CONFIGURACIÓN JACANA FUTURISTA
// ============================================
const JACANA_CONFIG = {
    colors: {
        bgCanvas: '#0d1117',
        border: '#30363d',
        accentBlue: '#00A0E4',
        accentDeepBlue: '#005A9C',
        accentCyan: '#00A0E4',
        line: 'rgba(48, 54, 61, 0.2)',
    },
    particleCount: 50,
    nodeCount: 30,
    connectionProbability: 0.7,
};

// ============================================
// HOOK: Fondo Animado
// ============================================
function useJacanaCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let nodes: GraphNode[] = [];
        let links: GraphLink[] = [];
        let particles: Particle[] = [];
        let time = 0;

        const init = () => {
            const handleResize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                generateElements();
            };

            const generateElements = () => {
                nodes = [];
                links = [];
                particles = [];

                for (let i = 0; i < JACANA_CONFIG.particleCount; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        opacity: Math.random() * 0.4 + 0.1,
                    });
                }

                for (let i = 0; i < JACANA_CONFIG.nodeCount; i++) {
                    const isHub = Math.random() > 0.85;
                    nodes.push({
                        id: `node-${i}`,
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        radius: isHub ? 3.5 : 1.5,
                        color: isHub ? JACANA_CONFIG.colors.accentCyan : JACANA_CONFIG.colors.accentBlue,
                        pulsePhase: Math.random() * Math.PI * 2,
                    });
                }

                nodes.forEach((node, i) => {
                    if (Math.random() > JACANA_CONFIG.connectionProbability) {
                        const target = nodes[Math.floor(Math.random() * nodes.length)];
                        if (target.id !== node.id) {
                            links.push({
                                id: `link-${i}`,
                                from: node,
                                to: target,
                                progress: 0,
                                speed: 0.002 + Math.random() * 0.002,
                                color: JACANA_CONFIG.colors.line,
                            });
                        }
                    }
                });
            };

            window.addEventListener('resize', handleResize);
            handleResize();

            return () => window.removeEventListener('resize', handleResize);
        };

        const animate = () => {
            time += 0.008;
            ctx.fillStyle = JACANA_CONFIG.colors.bgCanvas;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Grid
            ctx.strokeStyle = 'rgba(48, 54, 61, 0.04)';
            ctx.lineWidth = 1;
            const gridSize = 60;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }

            // Centro de resplandor
            const centerGradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width * 0.7
            );
            centerGradient.addColorStop(0, 'rgba(0, 160, 228, 0.03)');
            centerGradient.addColorStop(0.5, 'rgba(0, 90, 156, 0.02)');
            centerGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = centerGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Partículas
            particles.forEach(p => {
                p.y -= 0.2;
                if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 160, 228, ${p.opacity})`;
                ctx.fill();
            });

            // Conexiones
            links.forEach(link => {
                ctx.beginPath();
                ctx.moveTo(link.from.x, link.from.y);
                ctx.lineTo(link.to.x, link.to.y);
                ctx.strokeStyle = link.color;
                ctx.lineWidth = 0.5;
                ctx.globalAlpha = 0.3;
                ctx.stroke();
                ctx.globalAlpha = 1;

                link.progress += link.speed;
                if (link.progress > 1) link.progress = 0;

                const px = link.from.x + (link.to.x - link.from.x) * link.progress;
                const py = link.from.y + (link.to.y - link.from.y) * link.progress;

                ctx.save();
                ctx.shadowBlur = 8;
                ctx.shadowColor = JACANA_CONFIG.colors.accentCyan;
                ctx.beginPath();
                ctx.arc(px, py, 2, 0, Math.PI * 2);
                ctx.fillStyle = JACANA_CONFIG.colors.accentCyan;
                ctx.fill();
                ctx.restore();
            });

            // Nodos
            nodes.forEach(node => {
                const pulse = Math.sin(time + node.pulsePhase) * 0.5 + 0.5;
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius + 8 + pulse * 4, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 160, 228, ${pulse * 0.15})`;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius + (pulse * 0.5), 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();
            });

            // Viñeta
            const vignette = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, canvas.height * 0.3,
                canvas.width / 2, canvas.height / 2, canvas.width
            );
            vignette.addColorStop(0, 'transparent');
            vignette.addColorStop(0.7, 'rgba(13, 17, 23, 0.3)');
            vignette.addColorStop(1, 'rgba(13, 17, 23, 0.9)');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            animationFrameId = requestAnimationFrame(animate);
        };

        const cleanup = init();
        animate();

        return () => {
            cleanup?.();
            cancelAnimationFrame(animationFrameId);
        };
    }, [canvasRef]);
}

// ============================================
// COMPONENTE: Terminal Code Block
// ============================================
const TerminalBlock = ({ showContent }: { showContent: boolean }) => {
    const [displayedLines, setDisplayedLines] = useState<number>(0);
    const codeLines = [
        { text: '# Estructura del proyecto v2.0', color: 'text-[#8b949e]' },
        { text: 'const', color: 'text-[#ff7b72]' },
        { text: 'stack', color: 'text-[#79c0ff]' },
        { text: '=', color: 'text-[#c9d1d9]' },
        { text: '{', color: 'text-[#c9d1d9]' },
        { text: '  frontend:', color: 'text-[#7ee787]' },
        { text: '"React + Next.js"', color: 'text-[#a5d6ff]' },
        { text: ',', color: 'text-[#c9d1d9]' },
        { text: '  backend:', color: 'text-[#7ee787]' },
        { text: '"Node.js + Python"', color: 'text-[#a5d6ff]' },
        { text: ',', color: 'text-[#c9d1d9]' },
        { text: '  database:', color: 'text-[#7ee787]' },
        { text: '"PostgreSQL"', color: 'text-[#a5d6ff]' },
        { text: ',', color: 'text-[#c9d1d9]' },
        { text: '}', color: 'text-[#c9d1d9]' },
    ];

    useEffect(() => {
        if (!showContent) return;
        let currentIndex = 0;
        const timer = setInterval(() => {
            if (currentIndex < codeLines.length) {
                setDisplayedLines(prev => prev + 1);
                currentIndex++;
            } else {
                clearInterval(timer);
            }
        }, 100);
        return () => clearInterval(timer);
    }, [showContent, codeLines.length]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={showContent ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="hidden lg:block"
            style={{ opacity: 0, transform: 'translateY(20px) scale(0.95)' }}
        >
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00A0E4]/20 via-[#005A9C]/10 to-[#00A0E4]/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-[#0d1117]/95 backdrop-blur-xl rounded-lg border border-[#30363d] shadow-2xl overflow-hidden">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-[#30363d]">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-[#f85149] border border-[#0d1117]" />
                            <div className="w-3 h-3 rounded-full bg-[#f0883e] border border-[#0d1117]" />
                            <div className="w-3 h-3 rounded-full bg-[#00A0E4] border border-[#0d1117] shadow-[0_0_8px_#00A0E4]" />
                        </div>
                        <div className="flex-1 text-center">
                            <span className="text-[10px] text-[#8b949e] font-mono tracking-widest flex items-center justify-center gap-1">
                                <Terminal className="w-3 h-3" />~/JACANA/INIT
                            </span>
                        </div>
                        <div className="w-16" />
                    </div>
                    <div className="p-5 font-mono text-xs leading-relaxed">
                        {codeLines.map((line, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={index < displayedLines ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.2 }}
                                className={`${line.color} whitespace-pre`}
                            >
                                {line.text}
                            </motion.div>
                        ))}
                        {displayedLines >= codeLines.length && (
                            <motion.span
                                className="inline-block w-2 h-4 bg-[#00A0E4] ml-1 align-middle"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        )}
                        <div className="mt-6 pt-4 border-t border-[#30363d] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#00A0E4] rounded-full shadow-[0_0_8px_#00A0E4]" />
                                <span className="text-[10px] text-[#00A0E4] font-medium tracking-wide">System Ready</span>
                            </div>
                            <span className="text-[9px] text-[#6e7681] font-mono">v2.0.0 • Jacana Edition</span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// ============================================
// COMPONENTE: Tech Badge
// ============================================
const TechBadge = ({ tech, index }: { tech: string; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 + index * 0.05 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative px-3 py-1.5 text-xs font-medium text-[#8b949e] bg-[#161b22] border border-[#30363d] rounded-full cursor-default overflow-hidden group"
        >
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[#00A0E4]/10 via-[#005A9C]/10 to-[#00A0E4]/10"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '100%' : '-100%' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />
            <span className={`relative z-10 transition-colors duration-200 ${isHovered ? 'text-[#00A0E4]' : ''}`}>
                {tech}
            </span>
        </motion.span>
    );
};

// ============================================
// COMPONENTE HERO PRINCIPAL
// ============================================
export default function Hero() {
    const [showContent, setShowContent] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollY } = useScroll();
    const canvasY = useTransform(scrollY, [0, 500], [0, 100]);

    useJacanaCanvas(canvasRef);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    const handleScrollDown = useCallback(() => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, []);

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center font-sans text-[#c9d1d9]">
            <motion.canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: 'none', transform: `translateY(${canvasY}px)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/50 via-transparent to-[#0d1117] pointer-events-none z-5" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 w-full z-10">
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={showContent ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-[#00A0E4] bg-[#00A0E4]/10 border border-[#00A0E4]/30 rounded-full mx-auto lg:mx-0"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Nueva versión 2.0 disponible</span>
                        </motion.div>

                        <motion.h1
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                            transition={{ duration: 0.7, delay: 0.5 }}
                        >
                            Soluciones{' '}
                            <span className="relative inline-block">
                                <span className="relative text-[#00A0E4] drop-shadow-[0_0_15px_rgba(0,160,228,0.4)]">Fullstack</span>
                                <motion.span
                                    className="absolute bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#00A0E4] via-[#005A9C] to-[#00A0E4]"
                                    initial={{ scaleX: 0 }}
                                    animate={showContent ? { scaleX: 1 } : {}}
                                    transition={{ duration: 0.8, delay: 1 }}
                                />
                            </span>{' '}
                            <br className="hidden sm:block" />que impulsan tu negocio.
                        </motion.h1>

                        <motion.p
                            className={`mt-6 text-base sm:text-lg text-[#8b949e] max-w-xl mx-auto lg:mx-0 leading-relaxed ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                            transition={{ duration: 0.7, delay: 0.7 }}
                        >
                            Desarrollo end-to-end con tecnologías modernas. Desde la idea hasta el deploy,
                            creamos aplicaciones <span className="text-[#00A0E4] font-medium">escalables</span>,
                            <span className="text-[#005A9C] font-medium">seguras</span> y centradas en la
                            <span className="text-[#f0883e] font-medium"> experiencia</span>.
                        </motion.p>

                        <motion.div
                            className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                            transition={{ duration: 0.7, delay: 0.9 }}
                        >
                            <Link
                                href="/contact"
                                className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-black bg-[#00A0E4] rounded-lg overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(0,160,228,0.3)] hover:shadow-[0_0_30px_rgba(0,160,228,0.5)] active:scale-[0.98]"
                            >
                                <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                <span className="relative flex items-center gap-2">
                                    Iniciar proyecto
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                            <Link
                                href="/servicios"
                                className="group inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-[#00A0E4] bg-transparent border border-[#30363d] rounded-lg hover:bg-[#00A0E4]/10 hover:border-[#00A0E4]/40 transition-all duration-300"
                            >
                                Ver servicios
                                <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </Link>
                        </motion.div>

                        <motion.div
                            className={`mt-12 grid grid-cols-3 gap-4 text-center lg:text-left ${showContent ? 'opacity-100' : 'opacity-0'}`}
                            transition={{ duration: 0.7, delay: 1.1 }}
                        >
                            {[
                                { icon: Zap, label: "Rápido", color: "#00A0E4" },
                                { icon: Shield, label: "Seguro", color: "#005A9C" },
                                { icon: Code2, label: "Limpio", color: "#a371f7" },
                            ].map((feature, i) => (
                                <div key={i} className="flex flex-col items-center lg:items-start gap-2">
                                    <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                                    <span className="text-xs text-[#8b949e]">{feature.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                    <TerminalBlock showContent={showContent} />
                </div>

                <motion.div
                    className={`mt-24 pt-8 border-t border-[#30363d]/50 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                    transition={{ duration: 0.8, delay: 1.3 }}
                >
                    <p className="text-center text-xs font-medium text-[#8b949e] mb-5 tracking-[0.15em] uppercase">Stack tecnológico</p>
                    <div className="flex flex-wrap justify-center items-center gap-2.5">
                        {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'GraphQL'].map((tech, index) => (
                            <TechBadge key={tech} tech={tech} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                transition={{ duration: 0.7, delay: 1.5 }}
            >
                <button
                    onClick={handleScrollDown}
                    className="group flex flex-col items-center gap-2 p-2 text-[#8b949e] hover:text-[#00A0E4] transition-colors"
                    aria-label="Scroll down"
                >
                    <span className="text-[9px] font-mono tracking-wider uppercase">Scroll</span>
                    <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                        <svg className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(0,160,228,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </button>
            </motion.div>

            <style jsx global>{`
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </section>
    );
}