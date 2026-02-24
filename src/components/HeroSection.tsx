// components/Hero.tsx
'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

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