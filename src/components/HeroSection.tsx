// components/Hero.tsx
'use client';

<<<<<<< Updated upstream
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
=======
import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code2, Zap, Shield, Terminal, Sparkles } from 'lucide-react';
>>>>>>> Stashed changes

// ============================================
// TYPES & INTERFACES
// ============================================
interface GraphNode {
<<<<<<< Updated upstream
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
// CONFIGURACIÓN GITHUB FUTURISTA
// ============================================
const GITHUB_CONFIG = {
  colors: {
    bgCanvas: '#0d1117',
    border: '#30363d',
    accentGreen: '#00FF9D',
    accentBlue: '#58a6ff',
    accentCyan: '#00F0FF',
    line: 'rgba(48, 54, 61, 0.2)',
  },
  particleCount: 50, // Reducido ligeramente para mejor rendimiento
  nodeCount: 30,
};

// ============================================
// HOOK: Fondo Animado Optimizado
// ============================================
function useGitHubCanvas(canvasRef: React.RefObject<HTMLCanvasElement>) {
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

    // Inicialización encapsulada
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

        // Partículas (polvo de datos)
        for (let i = 0; i < GITHUB_CONFIG.particleCount; i++) {
          particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            opacity: Math.random() * 0.4 + 0.1,
          });
        }

        // Nodos
        for (let i = 0; i < GITHUB_CONFIG.nodeCount; i++) {
          const isHub = Math.random() > 0.85;
          nodes.push({
            id: `node-${i}`,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: isHub ? 3.5 : 1.5,
            color: isHub ? GITHUB_CONFIG.colors.accentCyan : GITHUB_CONFIG.colors.accentGreen,
            pulsePhase: Math.random() * Math.PI * 2,
          });
        }

        // Conexiones
        nodes.forEach((node, i) => {
          if (Math.random() > 0.7) {
            const target = nodes[Math.floor(Math.random() * nodes.length)];
            if (target.id !== node.id) {
              links.push({
                id: `link-${i}`,
                from: node,
                to: target,
                progress: 0,
                speed: 0.002 + Math.random() * 0.002,
                color: GITHUB_CONFIG.colors.line,
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
      time += 0.008; // Velocidad ligeramente reducida para elegancia
      ctx.fillStyle = GITHUB_CONFIG.colors.bgCanvas;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. Grid Sutil
      ctx.strokeStyle = 'rgba(48, 54, 61, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      // Dibujar grid optimizado
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }

      // 2. Centro de Resplandor (Ambient Light) - Más difuso
      const centerGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      centerGradient.addColorStop(0, 'rgba(0, 255, 157, 0.02)');
      centerGradient.addColorStop(1, 'transparent');
      ctx.fillStyle = centerGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 3. Partículas
      particles.forEach(p => {
        p.y -= 0.2;
        if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 157, ${p.opacity})`;
        ctx.fill();
      });

      // 4. Conexiones
      links.forEach(link => {
        ctx.beginPath();
        ctx.moveTo(link.from.x, link.from.y);
        ctx.lineTo(link.to.x, link.to.y);
        ctx.strokeStyle = link.color;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Paquete de datos viajando
        link.progress += link.speed;
        if (link.progress > 1) link.progress = 0;

        const px = link.from.x + (link.to.x - link.from.x) * link.progress;
        const py = link.from.y + (link.to.y - link.from.y) * link.progress;

        ctx.save();
        ctx.shadowBlur = 8;
        ctx.shadowColor = GITHUB_CONFIG.colors.accentCyan;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = GITHUB_CONFIG.colors.accentCyan;
        ctx.fill();
        ctx.restore();
      });

      // 5. Nodos
      nodes.forEach(node => {
        const pulse = Math.sin(time + node.pulsePhase) * 0.5 + 0.5;

        // Glow exterior
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + 3 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 157, ${pulse * 0.15})`;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius + (pulse * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();
      });

      // Viñeta
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.height * 0.3,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, 'transparent');
      gradient.addColorStop(1, 'rgba(13, 17, 23, 0.9)');
      ctx.fillStyle = gradient;
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
// COMPONENTE HERO PRINCIPAL
// ============================================
export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGitHubCanvas(canvasRef);

  useEffect(() => {
    setIsLoaded(true);
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center font-sans text-[#c9d1d9]">

      {/* Canvas de fondo */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 w-full z-10">

        {/* Main Content */}
        <div className={`grid lg:grid-cols-2 gap-16 items-center transition-all duration-1000 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

          {/* Columna de contenido */}
          <div className="text-center lg:text-left">

            <h1 className={`text-5xl sm:text-6xl font-bold text-white leading-tight tracking-tight transition-all duration-700 delay-500 ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}>
              Soluciones{' '}
              <span className="relative inline-block">
                <span className="relative text-[#58a6ff] drop-shadow-[0_0_10px_rgba(88,166,255,0.3)]">
                  Fullstack
                </span>
                <span className="absolute bottom-1 left-0 w-full h-[2px] bg-[#00FF9D] shadow-[0_0_5px_#00FF9D]" />
              </span>{' '}
              <br className="hidden sm:block" />
              que impulsan tu negocio.
            </h1>

            <p className={`mt-6 text-lg text-[#8b949e] max-w-xl mx-auto lg:mx-0 leading-relaxed transition-all duration-700 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              Desarrollo end-to-end con tecnologías modernas. Desde la idea hasta el deploy,
              creamos aplicaciones <span className="text-[#00FF9D] font-medium drop-shadow-[0_0_5px_rgba(0,255,157,0.3)]">escalables</span>,
              <span className="text-[#58a6ff] font-medium">seguras</span> y centradas en la
              <span className="text-[#f0883e] font-medium"> experiencia</span>.
            </p>

            <div className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-700 delay-900 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
              {/* Primary Button */}
              <Link
                href="/contacto"
                className="group inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-black bg-[#00FF9D] rounded-md transition-all duration-200 shadow-[0_0_10px_rgba(0,255,157,0.2)] hover:shadow-[0_0_20px_rgba(0,255,157,0.4)] active:scale-95"
              >
                Iniciar proyecto
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              {/* Secondary Button */}
              <Link
                href="/servicios"
                className="group inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-[#c9d1d9] bg-transparent border border-[#30363d] rounded-md hover:bg-white/5 hover:border-[#8b949e] hover:text-white transition-all duration-200"
              >
                Ver servicios
                <svg className="ml-2 w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Columna de código (Estilo Terminal) */}
          <div className={`hidden lg:block transition-all duration-1000 delay-500 ${showContent ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative bg-[#0d1117]/90 backdrop-blur-md rounded-md border border-[#30363d] shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden group">

              {/* Scanline effect overlay */}
              <div className="pointer-events-none absolute inset-0 opacity-10 bg-scanline" />

              {/* Header Terminal */}
              <div className="flex items-center gap-2 px-4 py-2 bg-[#161b22] border-b border-[#30363d] relative z-10">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#f85149]" />
                  <div className="w-3 h-3 rounded-full bg-[#f0883e]" />
                  <div className="w-3 h-3 rounded-full bg-[#00FF9D]" />
                </div>
                <div className="flex-1 text-center text-xs text-[#8b949e] font-mono tracking-wider">~/SYSTEM/INIT</div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-sm leading-loose relative z-10">
                <div className="text-[#8b949e]"># Estructura del proyecto v2.0</div>
                <div className="mt-3">
                  <span className="text-[#ff7b72]">const</span> <span className="text-[#79c0ff]">stack</span> <span className="text-[#c9d1d9]">=</span> <span className="text-[#c9d1d9]">{"{"}</span>
                </div>

                <div className="pl-6 space-y-1">
                  <div><span className="text-[#7ee787]">frontend</span><span className="text-[#c9d1d9]">:</span> <span className="text-[#a5d6ff]">"React + Next.js"</span><span className="text-[#c9d1d9]">,</span></div>
                  <div><span className="text-[#7ee787]">backend</span><span className="text-[#c9d1d9]">:</span> <span className="text-[#a5d6ff]">"Node.js + Python"</span><span className="text-[#c9d1d9]">,</span></div>
                  <div><span className="text-[#7ee787]">database</span><span className="text-[#c9d1d9]">:</span> <span className="text-[#a5d6ff]">"PostgreSQL"</span><span className="text-[#c9d1d9]">,</span></div>
                </div>

                <div className="text-[#c9d1d9] mt-1">{"}"}</div>

                <div className="mt-6 pt-4 border-t border-[#30363d] flex items-center gap-3">
                  <div className="w-2 h-2 bg-[#00FF9D] rounded-full shadow-[0_0_8px_#00FF9D] animate-pulse" />
                  <span className="text-xs text-[#00FF9D] font-medium tracking-wide">System Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className={`mt-28 pt-8 border-t border-[#30363d]/50 transition-all duration-1000 delay-1100 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-center text-sm font-medium text-[#8b949e] mb-5 tracking-widest uppercase">
            Stack tecnológico
          </p>
          <div className="flex flex-wrap justify-center items-center gap-3">
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'AWS', 'Docker', 'GraphQL'].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-medium text-[#8b949e] bg-[#161b22] border border-[#30363d] rounded-full hover:border-[#00FF9D]/50 hover:text-[#00FF9D] hover:shadow-[0_0_8px_rgba(0,255,157,0.1)] transition-all duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-700 delay-1200 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="p-2 text-[#8b949e] hover:text-[#00FF9D] transition-colors group"
          aria-label="Scroll down"
        >
          <svg className="w-6 h-6 animate-bounce group-hover:drop-shadow-[0_0_5px_rgba(0,255,157,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </button>
      </div>

      {/* CSS for Scanline effect (add to global css or keep inline style) */}
      <style jsx global>{`
        .bg-scanline {
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 157, 0.03) 3px,
            rgba(0, 255, 157, 0.03) 4px
          );
        }
      `}</style>
    </section>
  );
}
=======
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
        accentBlue: '#00A0E4',      // Jacana bright blue
        accentDeepBlue: '#005A9C',  // Jacana deep blue
        accentCyan: '#00A0E4',      // Jacana bright blue
        accentPurple: '#a371f7',
        line: 'rgba(48, 54, 61, 0.2)',
        text: '#c9d1d9',
        textMuted: '#8b949e',
    },
    particleCount: 50,
    nodeCount: 30,
    connectionProbability: 0.7,
};

// ============================================
// HOOK: Fondo Animado Optimizado
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
        let mouse = { x: 0, y: 0, radius: 150 };

        const init = () => {
            const handleResize = () => {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                generateElements();
            };

            const handleMouseMove = (e: MouseEvent) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            };

            const generateElements = () => {
                nodes = [];
                links = [];
                particles = [];

                // Partículas de fondo
                for (let i = 0; i < JACANA_CONFIG.particleCount; i++) {
                    particles.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        opacity: Math.random() * 0.4 + 0.1,
                    });
                }

                // Nodos de la red
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

                // Conexiones entre nodos
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
            window.addEventListener('mousemove', handleMouseMove);
            handleResize();

            return () => {
                window.removeEventListener('resize', handleResize);
                window.removeEventListener('mousemove', handleMouseMove);
            };
        };

        const animate = () => {
            time += 0.008;
            ctx.fillStyle = JACANA_CONFIG.colors.bgCanvas;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 1. Grid sutil de fondo
            ctx.strokeStyle = 'rgba(48, 54, 61, 0.04)';
            ctx.lineWidth = 1;
            const gridSize = 60;
            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
            }

            // 2. Resplandor central radial (Jacana blue)
            const centerGradient = ctx.createRadialGradient(
                canvas.width / 2, canvas.height / 2, 0,
                canvas.width / 2, canvas.height / 2, canvas.width * 0.7
            );
            centerGradient.addColorStop(0, 'rgba(0, 160, 228, 0.03)');
            centerGradient.addColorStop(0.5, 'rgba(0, 90, 156, 0.02)');
            centerGradient.addColorStop(1, 'transparent');
            ctx.fillStyle = centerGradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // 3. Partículas flotantes (Jacana blue)
            particles.forEach(p => {
                p.y -= 0.2;
                if (p.y < 0) { p.y = canvas.height; p.x = Math.random() * canvas.width; }
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 160, 228, ${p.opacity})`;
                ctx.fill();
            });

            // 4. Conexiones animadas con partículas viajeras
            links.forEach(link => {
                ctx.beginPath();
                ctx.moveTo(link.from.x, link.from.y);
                ctx.lineTo(link.to.x, link.to.y);
                ctx.strokeStyle = link.color;
                ctx.lineWidth = 0.5;
                ctx.globalAlpha = 0.3;
                ctx.stroke();
                ctx.globalAlpha = 1;

                // Animación de partícula viajera
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

            // 5. Nodos con efecto de pulso
            nodes.forEach(node => {
                const pulse = Math.sin(time + node.pulsePhase) * 0.5 + 0.5;
                const distanceToMouse = mouse.x && mouse.y
                    ? Math.hypot(node.x - mouse.x, node.y - mouse.y)
                    : Infinity;

                // Glow externo
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius + 8 + pulse * 4, 0, Math.PI * 2);
                const glowOpacity = distanceToMouse < mouse.radius
                    ? 0.25 + (1 - distanceToMouse / mouse.radius) * 0.15
                    : pulse * 0.15;
                ctx.fillStyle = `rgba(0, 160, 228, ${glowOpacity})`;
                ctx.fill();

                // Nodo principal
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius + (pulse * 0.5), 0, Math.PI * 2);
                ctx.fillStyle = node.color;
                ctx.fill();

                // Interacción con mouse: conexión temporal
                if (distanceToMouse < mouse.radius) {
                    ctx.beginPath();
                    ctx.moveTo(node.x, node.y);
                    ctx.lineTo(mouse.x!, mouse.y!);
                    ctx.strokeStyle = `rgba(0, 160, 228, ${0.2 * (1 - distanceToMouse / mouse.radius)})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });

            // 6. Viñeta para enfoque central
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
// COMPONENTE: Terminal Code Block (Cyber Style)
// ============================================

const TerminalBlock = ({ showContent }: { showContent: boolean }) => {
    const [displayedLines, setDisplayedLines] = useState<number>(0);
    const codeLines = [
        { text: '# Estructura del proyecto v2.0', color: 'text-[#8b949e]', delay: 0 },
        { text: 'const', color: 'text-[#ff7b72]', delay: 300 },
        { text: 'stack', color: 'text-[#79c0ff]', delay: 400 },
        { text: '=', color: 'text-[#c9d1d9]', delay: 450 },
        { text: '{', color: 'text-[#c9d1d9]', delay: 500 },
        { text: '  frontend:', color: 'text-[#7ee787]', delay: 700 },
        { text: '"React + Next.js"', color: 'text-[#a5d6ff]', delay: 800 },
        { text: ',', color: 'text-[#c9d1d9]', delay: 850 },
        { text: '  backend:', color: 'text-[#7ee787]', delay: 1000 },
        { text: '"Node.js + Python"', color: 'text-[#a5d6ff]', delay: 1100 },
        { text: ',', color: 'text-[#c9d1d9]', delay: 1150 },
        { text: '  database:', color: 'text-[#7ee787]', delay: 1300 },
        { text: '"PostgreSQL"', color: 'text-[#a5d6ff]', delay: 1400 },
        { text: ',', color: 'text-[#c9d1d9]', delay: 1450 },
        { text: '}', color: 'text-[#c9d1d9]', delay: 1600 },
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
        >
            <div className="relative group">
                {/* Glow externo animado (Jacana blue) */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#00A0E4]/20 via-[#005A9C]/10 to-[#00A0E4]/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Contenedor terminal */}
                <div className="relative bg-[#0d1117]/95 backdrop-blur-xl rounded-lg border border-[#30363d] shadow-2xl overflow-hidden">

                    {/* Header de terminal */}
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#161b22] border-b border-[#30363d]">
                        <div className="flex gap-1.5">
                            <motion.div
                                className="w-3 h-3 rounded-full bg-[#f85149] border border-[#0d1117]"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <motion.div
                                className="w-3 h-3 rounded-full bg-[#f0883e] border border-[#0d1117]"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                            />
                            <motion.div
                                className="w-3 h-3 rounded-full bg-[#00A0E4] border border-[#0d1117] shadow-[0_0_8px_#00A0E4]"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                            />
                        </div>
                        <div className="flex-1 text-center">
                            <span className="text-[10px] text-[#8b949e] font-mono tracking-widest flex items-center justify-center gap-1">
                                <Terminal className="w-3 h-3" />
                                ~/JACANA/INIT
                            </span>
                        </div>
                        <div className="w-16" /> {/* Spacer para centrar */}
                    </div>

                    {/* Contenido de código */}
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

                        {/* Cursor parpadeante (Jacana blue) */}
                        {displayedLines >= codeLines.length && (
                            <motion.span
                                className="inline-block w-2 h-4 bg-[#00A0E4] ml-1 align-middle"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                            />
                        )}

                        {/* Status bar */}
                        <div className="mt-6 pt-4 border-t border-[#30363d] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <motion.div
                                    className="w-2 h-2 bg-[#00A0E4] rounded-full shadow-[0_0_8px_#00A0E4]"
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                                <span className="text-[10px] text-[#00A0E4] font-medium tracking-wide">
                                    System Ready
                                </span>
                            </div>
                            <span className="text-[9px] text-[#6e7681] font-mono">
                                v2.0.0 • Jacana Edition
                            </span>
                        </div>
                    </div>

                    {/* Scanline overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: `repeating-linear-gradient(
                                0deg,
                                transparent,
                                transparent 2px,
                                rgba(0, 160, 228, 0.1) 3px,
                                rgba(0, 160, 228, 0.1) 4px
                            )`,
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
};

// ============================================
// COMPONENTE: Tech Badge con Hover Effect
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
            {/* Hover gradient background (Jacana blue) */}
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[#00A0E4]/10 via-[#005A9C]/10 to-[#00A0E4]/10"
                initial={{ x: '-100%' }}
                animate={{ x: isHovered ? '100%' : '-100%' }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Texto */}
            <span className={`relative z-10 transition-colors duration-200 ${isHovered ? 'text-[#00A0E4]' : ''}`}>
                {tech}
            </span>

            {/* Glow sutil en hover (Jacana blue) */}
            {isHovered && (
                <span className="absolute inset-0 rounded-full shadow-[0_0_15px_rgba(0,160,228,0.2)] pointer-events-none" />
            )}
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

    // Parallax effect para el canvas
    const canvasY = useTransform(scrollY, [0, 500], [0, 100]);

    useJacanaCanvas(canvasRef);

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 300);
        return () => clearTimeout(timer);
    }, []);

    // Scroll suave al hacer click en el indicador
    const handleScrollDown = useCallback(() => {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }, []);

    return (
        <section className="relative overflow-hidden min-h-screen flex items-center font-sans text-[#c9d1d9]">

            {/* Canvas de fondo con parallax */}
            <motion.canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
                style={{
                    pointerEvents: 'none',
                    y: canvasY
                }}
            />

            {/* Overlay de gradiente para legibilidad */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0d1117]/50 via-transparent to-[#0d1117] pointer-events-none z-5" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 w-full z-10">

                {/* Main Content Grid */}
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>

                    {/* Columna de contenido */}
                    <div className="text-center lg:text-left">

                        {/* Badge superior (Jacana blue) */}
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={showContent ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 text-xs font-medium text-[#00A0E4] bg-[#00A0E4]/10 border border-[#00A0E4]/30 rounded-full mx-auto lg:mx-0"
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Nueva versión 2.0 disponible</span>
                        </motion.div>

                        {/* Título principal */}
                        <motion.h1
                            className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight ${showContent ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}`}
                            transition={{ duration: 0.7, delay: 0.5 }}
                        >
                            Soluciones{' '}
                            <span className="relative inline-block">
                                <motion.span
                                    className="relative text-[#00A0E4] drop-shadow-[0_0_15px_rgba(0,160,228,0.4)]"
                                    animate={showContent ? {
                                        textShadow: [
                                            "0 0 10px rgba(0,160,228,0.3)",
                                            "0 0 20px rgba(0,160,228,0.5)",
                                            "0 0 10px rgba(0,160,228,0.3)"
                                        ]
                                    } : {}}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    Fullstack
                                </motion.span>
                                <motion.span
                                    className="absolute bottom-1 left-0 w-full h-[2px] bg-gradient-to-r from-[#00A0E4] via-[#005A9C] to-[#00A0E4]"
                                    initial={{ scaleX: 0 }}
                                    animate={showContent ? { scaleX: 1 } : {}}
                                    transition={{ duration: 0.8, delay: 1 }}
                                />
                            </span>{' '}
                            <br className="hidden sm:block" />
                            que impulsan tu negocio.
                        </motion.h1>

                        {/* Descripción */}
                        <motion.p
                            className={`mt-6 text-base sm:text-lg text-[#8b949e] max-w-xl mx-auto lg:mx-0 leading-relaxed ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                            transition={{ duration: 0.7, delay: 0.7 }}
                        >
                            Desarrollo end-to-end con tecnologías modernas. Desde la idea hasta el deploy,
                            creamos aplicaciones{' '}
                            <span className="text-[#00A0E4] font-medium relative inline-block">
                                escalables
                                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[#00A0E4]/50" />
                            </span>,
                            <span className="text-[#005A9C] font-medium relative inline-block ml-0.5">
                                seguras
                                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[#005A9C]/50" />
                            </span> y centradas en la{' '}
                            <span className="text-[#f0883e] font-medium relative inline-block ml-0.5">
                                experiencia
                                <span className="absolute -bottom-0.5 left-0 w-full h-px bg-[#f0883e]/50" />
                            </span>.
                        </motion.p>

                        {/* Botones de acción */}
                        <motion.div
                            className={`mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                            transition={{ duration: 0.7, delay: 0.9 }}
                        >
                            {/* Primary Button con efecto shine (Jacana blue) */}
                            <Link
                                href="/contact"
                                className="group relative inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-black bg-[#00A0E4] rounded-lg overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(0,160,228,0.3)] hover:shadow-[0_0_30px_rgba(0,160,228,0.5)] active:scale-[0.98]"
                            >
                                {/* Shine effect */}
                                <span className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />

                                <span className="relative flex items-center gap-2">
                                    Iniciar proyecto
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>

                            {/* Secondary Button (Jacana blue) */}
                            <Link
                                href="/servicios"
                                className="group inline-flex items-center justify-center px-6 py-3 text-base font-semibold text-[#00A0E4] bg-transparent border border-[#30363d] rounded-lg hover:bg-[#00A0E4]/10 hover:border-[#00A0E4]/40 transition-all duration-300"
                            >
                                Ver servicios
                                <ArrowRight className="ml-2 w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                            </Link>
                        </motion.div>

                        {/* Feature highlights */}
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

                    {/* Columna de código (Terminal) */}
                    <TerminalBlock showContent={showContent} />
                </div>

                {/* Tech Stack Section */}
                <motion.div
                    className={`mt-24 pt-8 border-t border-[#30363d]/50 ${showContent ? 'opacity-100' : 'opacity-0'}`}
                    transition={{ duration: 0.8, delay: 1.3 }}
                >
                    <p className="text-center text-xs font-medium text-[#8b949e] mb-5 tracking-[0.15em] uppercase">
                        Stack tecnológico
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-2.5">
                        {[
                            'React', 'Next.js', 'TypeScript', 'Node.js',
                            'Python', 'PostgreSQL', 'MongoDB', 'AWS',
                            'Docker', 'GraphQL'
                        ].map((tech, index) => (
                            <TechBadge key={tech} tech={tech} index={index} />
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator Mejorado (Jacana blue) */}
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
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <svg className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(0,160,228,0.5)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </button>
            </motion.div>

            {/* CSS Global para animaciones */}
            <style jsx global>{`
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </section>
    );
}
>>>>>>> Stashed changes
