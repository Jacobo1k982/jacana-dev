'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Gallery images configuration
const galleryImages = [
    { src: '/gallery/eye.png', alt: 'Eye', title: 'Web Applications', subtitle: 'Software' },
    { src: '/gallery/pen.png', alt: 'Pen', title: 'UI/UX Design', subtitle: 'Software' },
    { src: '/gallery/people.png', alt: 'People', title: 'Team Tools', subtitle: 'Software' },
    { src: '/gallery/face.png', alt: 'Face', title: 'AI Integration', subtitle: 'Software' },
    { src: '/gallery/img5.png', alt: 'Heart', title: 'Cloud Solutions', subtitle: 'Infrastructure' },
    { src: '/gallery/img3.png', alt: 'Brain', title: 'APIs & Backend', subtitle: 'Infrastructure' },
    { src: '/gallery/img1.png', alt: 'Hand', title: 'Mobile Apps', subtitle: 'Software' },
    { src: '/gallery/img2.png', alt: 'Lips', title: 'DevOps', subtitle: 'Infrastructure' },
];

// CPU Processor-style animated background - more subtle and elegant
function ProcessorBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;
        let time = 0;

        interface CPUUnit {
            x: number;
            y: number;
            width: number;
            height: number;
            type: string;
            activity: number;
            pulsePhase: number;
        }

        interface DataFlow {
            path: { x: number; y: number }[];
            position: number;
            speed: number;
            size: number;
            hue: number;
        }

        const units: CPUUnit[] = [];
        const paths: { points: { x: number; y: number }[] }[] = [];
        const dataFlows: DataFlow[] = [];

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initProcessor();
        };

        const initProcessor = () => {
            units.length = 0;
            paths.length = 0;
            dataFlows.length = 0;

            const scale = Math.min(width, height) / 1200;
            const offsetX = width * 0.1;
            const offsetY = height * 0.15;

            // Create CPU layout - positioned to not overlap with center content
            const layouts = [
                // Left side cluster
                { x: offsetX, y: height * 0.2, w: 120 * scale, h: 80 * scale, type: 'cache' },
                { x: offsetX, y: height * 0.4, w: 100 * scale, h: 100 * scale, type: 'core' },
                { x: offsetX + 130 * scale, y: height * 0.35, w: 60 * scale, h: 60 * scale, type: 'alu' },
                { x: offsetX, y: height * 0.6, w: 80 * scale, h: 120 * scale, type: 'controller' },

                // Right side cluster
                { x: width - offsetX - 120 * scale, y: height * 0.15, w: 120 * scale, h: 80 * scale, type: 'cache' },
                { x: width - offsetX - 100 * scale, y: height * 0.38, w: 100 * scale, h: 100 * scale, type: 'core' },
                { x: width - offsetX - 180 * scale, y: height * 0.45, w: 60 * scale, h: 60 * scale, type: 'alu' },
                { x: width - offsetX - 80 * scale, y: height * 0.58, w: 80 * scale, h: 120 * scale, type: 'controller' },

                // Bottom left
                { x: offsetX + 50 * scale, y: height * 0.78, w: 80 * scale, h: 80 * scale, type: 'core' },
                { x: offsetX + 150 * scale, y: height * 0.82, w: 60 * scale, h: 50 * scale, type: 'alu' },

                // Bottom right
                { x: width - offsetX - 130 * scale, y: height * 0.75, w: 80 * scale, h: 80 * scale, type: 'core' },
                { x: width - offsetX - 200 * scale, y: height * 0.8, w: 60 * scale, h: 50 * scale, type: 'alu' },
            ];

            layouts.forEach((l, i) => {
                units.push({
                    x: l.x,
                    y: l.y,
                    width: l.w,
                    height: l.h,
                    type: l.type,
                    activity: Math.random() * 0.5 + 0.3,
                    pulsePhase: Math.random() * Math.PI * 2
                });
            });

            // Create horizontal and vertical bus paths
            const busPaths = [
                // Horizontal buses
                [{ x: 0, y: height * 0.25 }, { x: width, y: height * 0.25 }],
                [{ x: 0, y: height * 0.5 }, { x: width, y: height * 0.5 }],
                [{ x: 0, y: height * 0.75 }, { x: width, y: height * 0.75 }],
                // Vertical buses
                [{ x: width * 0.2, y: 0 }, { x: width * 0.2, y: height }],
                [{ x: width * 0.8, y: 0 }, { x: width * 0.8, y: height }],
            ];

            busPaths.forEach(bp => {
                paths.push({ points: bp });
            });

            // Initialize data flows
            for (let i = 0; i < 15; i++) {
                createDataFlow();
            }
        };

        const createDataFlow = () => {
            if (paths.length === 0) return;

            const pathIndex = Math.floor(Math.random() * paths.length);
            const path = paths[pathIndex];

            dataFlows.push({
                path: path.points,
                position: Math.random(),
                speed: 0.001 + Math.random() * 0.002,
                size: 1.5 + Math.random() * 2,
                hue: 180 + Math.random() * 40
            });
        };

        const draw = () => {
            // Clear with dark background
            ctx.fillStyle = '#020305';
            ctx.fillRect(0, 0, width, height);

            time += 0.01;

            // Draw subtle grid
            ctx.strokeStyle = 'rgba(0, 160, 200, 0.03)';
            ctx.lineWidth = 1;
            const gridSize = 40;

            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, height);
                ctx.stroke();
            }
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(width, y);
                ctx.stroke();
            }

            // Draw bus paths
            paths.forEach((path) => {
                ctx.beginPath();
                ctx.moveTo(path.points[0].x, path.points[0].y);
                ctx.lineTo(path.points[1].x, path.points[1].y);
                ctx.strokeStyle = 'rgba(0, 160, 200, 0.06)';
                ctx.lineWidth = 2;
                ctx.stroke();
            });

            // Draw CPU units
            units.forEach((unit) => {
                const pulse = Math.sin(time * 1.5 + unit.pulsePhase) * 0.15 + 0.85;
                const alpha = unit.activity * pulse * 0.4;

                // Unit glow
                ctx.shadowColor = 'rgba(0, 180, 220, 0.2)';
                ctx.shadowBlur = 15;

                // Main unit
                ctx.beginPath();
                ctx.roundRect(unit.x, unit.y, unit.width, unit.height, 4);

                let fillColor: string;
                let strokeColor: string;

                if (unit.type === 'core') {
                    fillColor = `rgba(0, 180, 220, ${alpha * 0.15})`;
                    strokeColor = `rgba(0, 200, 255, ${alpha * 0.4})`;
                } else if (unit.type === 'cache') {
                    fillColor = `rgba(80, 180, 140, ${alpha * 0.12})`;
                    strokeColor = `rgba(80, 200, 150, ${alpha * 0.35})`;
                } else if (unit.type === 'alu') {
                    fillColor = `rgba(140, 100, 180, ${alpha * 0.15})`;
                    strokeColor = `rgba(160, 120, 200, ${alpha * 0.4})`;
                } else {
                    fillColor = `rgba(180, 140, 80, ${alpha * 0.1})`;
                    strokeColor = `rgba(200, 160, 100, ${alpha * 0.3})`;
                }

                ctx.fillStyle = fillColor;
                ctx.fill();
                ctx.strokeStyle = strokeColor;
                ctx.lineWidth = 1;
                ctx.stroke();

                ctx.shadowBlur = 0;

                // Inner subdivisions for cores
                if (unit.type === 'core' && unit.width > 50) {
                    const subDiv = 2;
                    const subW = unit.width / subDiv;
                    const subH = unit.height / subDiv;

                    for (let i = 0; i < subDiv; i++) {
                        for (let j = 0; j < subDiv; j++) {
                            ctx.beginPath();
                            ctx.rect(
                                unit.x + i * subW + 2,
                                unit.y + j * subH + 2,
                                subW - 4,
                                subH - 4
                            );
                            ctx.fillStyle = `rgba(0, 200, 255, ${alpha * 0.1})`;
                            ctx.fill();
                        }
                    }
                }

                // Activity LED
                const ledPulse = Math.sin(time * 3 + unit.pulsePhase * 2) * 0.5 + 0.5;
                ctx.beginPath();
                ctx.arc(unit.x + unit.width - 6, unit.y + 6, 2, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 255, 180, ${0.2 + ledPulse * 0.4})`;
                ctx.fill();
            });

            // Draw data flows
            dataFlows.forEach((flow) => {
                const start = flow.path[0];
                const end = flow.path[1];

                flow.position += flow.speed;
                if (flow.position > 1) {
                    flow.position = 0;
                    flow.hue = 180 + Math.random() * 40;
                }

                const x = start.x + (end.x - start.x) * flow.position;
                const y = start.y + (end.y - start.y) * flow.position;

                // Trail
                const trailPos = Math.max(0, flow.position - 0.03);
                const trailX = start.x + (end.x - start.x) * trailPos;
                const trailY = start.y + (end.y - start.y) * trailPos;

                const gradient = ctx.createLinearGradient(trailX, trailY, x, y);
                gradient.addColorStop(0, `hsla(${flow.hue}, 80%, 60%, 0)`);
                gradient.addColorStop(1, `hsla(${flow.hue}, 80%, 60%, 0.6)`);

                ctx.beginPath();
                ctx.moveTo(trailX, trailY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = gradient;
                ctx.lineWidth = flow.size;
                ctx.lineCap = 'round';
                ctx.stroke();

                // Glow
                const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, flow.size * 8);
                glowGradient.addColorStop(0, `hsla(${flow.hue}, 80%, 60%, 0.3)`);
                glowGradient.addColorStop(1, `hsla(${flow.hue}, 80%, 60%, 0)`);

                ctx.beginPath();
                ctx.arc(x, y, flow.size * 8, 0, Math.PI * 2);
                ctx.fillStyle = glowGradient;
                ctx.fill();

                // Core
                ctx.beginPath();
                ctx.arc(x, y, flow.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${flow.hue}, 80%, 70%, 1)`;
                ctx.fill();
            });

            // Center fade for better text readability
            const centerFade = ctx.createRadialGradient(
                width / 2, height / 2, 0,
                width / 2, height / 2, Math.min(width, height) * 0.5
            );
            centerFade.addColorStop(0, 'rgba(2, 3, 5, 0.7)');
            centerFade.addColorStop(0.5, 'rgba(2, 3, 5, 0.3)');
            centerFade.addColorStop(1, 'transparent');
            ctx.fillStyle = centerFade;
            ctx.fillRect(0, 0, width, height);

            // Vignette
            const vignette = ctx.createRadialGradient(
                width / 2, height / 2, Math.min(width, height) * 0.4,
                width / 2, height / 2, Math.max(width, height) * 0.8
            );
            vignette.addColorStop(0, 'transparent');
            vignette.addColorStop(1, 'rgba(0, 0, 0, 0.6)');
            ctx.fillStyle = vignette;
            ctx.fillRect(0, 0, width, height);

            // Spawn new flows
            if (Math.random() > 0.98 && dataFlows.length < 20) {
                createDataFlow();
            }

            animationId = requestAnimationFrame(draw);
        };

        resize();
        window.addEventListener('resize', resize);
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
            style={{ zIndex: 0, pointerEvents: 'none' }}
        />
    );
}

// Elegant title with better styling
function HeroTitle() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative text-center"
        >
            {/* Subtle glow background */}
            <div className="absolute inset-0 blur-3xl opacity-30">
                <div className="w-full h-full bg-gradient-to-b from-cyan-500/20 to-transparent" />
            </div>

            <h1
                className="relative text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extralight tracking-[0.15em] text-white"
                style={{
                    fontFamily: 'system-ui, -apple-system, sans-serif',
                    textShadow: '0 0 100px rgba(0, 180, 220, 0.4), 0 0 40px rgba(0, 180, 220, 0.2)',
                }}
            >
                JACANA
            </h1>

            <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="relative mt-6 mx-auto w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
            />

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="relative text-center text-xs sm:text-sm tracking-[0.4em] mt-6 text-white font-light"
            >
                DEVELOPERS
            </motion.p>
        </motion.div>
    );
}

// Elegant buttons
function HeroButtons() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 items-center"
        >
            <Link
                href="/register"
                className="group relative px-8 py-3.5 text-sm font-medium rounded-full overflow-hidden transition-all duration-500"
            >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-cyan-400/5 border border-cyan-400/30 group-hover:border-cyan-400/60 rounded-full transition-colors" />
                <div className="absolute inset-0 bg-cyan-400/0 group-hover:bg-cyan-400/10 rounded-full transition-colors" />
                <span className="relative flex items-center gap-2 text-white/90 group-hover:text-white">
                    <span>Sign Up</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </span>
            </Link>

            <Link
                href="/login"
                className="group px-6 py-3.5 text-sm font-medium rounded-full border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-all duration-300"
            >
                Log In
            </Link>

            <Link
                href="/explore"
                className="group px-6 py-3.5 text-sm font-medium rounded-full border border-white/5 hover:border-white/20 text-white/50 hover:text-white/80 transition-all duration-300"
            >
                <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Explore
                </span>
            </Link>
        </motion.div>
    );
}

// Gallery section
function GallerySection() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="relative bg-[#030407] py-24 sm:py-32">
            {/* Background accent */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-extralight text-white/90 tracking-wider">
                        Projects
                    </h2>
                    <p className="text-white/40 mt-3 text-sm tracking-wide">
                        Explorando nuevas fronteras digitales
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                    {galleryImages.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08, duration: 0.5 }}
                            className="relative group aspect-square rounded-xl overflow-hidden cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <img
                                src={item.src}
                                alt={item.alt}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />

                            <div className="absolute inset-0 border border-white/10 rounded-xl transition-all duration-300 group-hover:border-cyan-400/40 group-hover:shadow-lg group-hover:shadow-cyan-400/10" />

                            <div
                                className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />

                            <div
                                className={`absolute inset-0 flex flex-col items-center justify-end p-4 transition-all duration-300 ${hoveredIndex === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                                    }`}
                            >
                                <h3 className="text-white text-sm sm:text-base font-medium text-center">
                                    {item.title}
                                </h3>
                                <p className="text-cyan-400/60 text-xs mt-1">
                                    {item.subtitle}
                                </p>
                            </div>

                            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-cyan-400/40 group-hover:bg-cyan-400/80 transition-colors" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Main Hero component
export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 50);
        return () => clearTimeout(timer);
    }, []);

    if (!mounted) {
        return (
            <section className="relative min-h-screen bg-[#020305] flex items-center justify-center">
                <div className="w-8 h-8 border border-cyan-400/20 rounded-full animate-pulse" />
            </section>
        );
    }

    return (
        <main className="relative bg-[#020305] min-h-screen overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-screen">
                {/* Processor Background */}
                <ProcessorBackground />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 gap-10 sm:gap-14 py-20">
                    <HeroTitle />
                    <HeroButtons />
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Scroll</span>
                        <svg className="w-5 h-5 text-cyan-400/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </section>

            {/* Gallery Section */}
            <GallerySection />

            {/* Content Sections */}
            <div className="relative z-10 bg-[#020305] px-6 sm:px-8 md:px-16 lg:px-24">
                <div className="max-w-3xl mx-auto py-20 sm:py-28 space-y-20 sm:space-y-28">

                    {/* About Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-5"
                    >
                        <h2 className="text-2xl sm:text-3xl font-extralight text-white/90 tracking-wide">
                            About
                        </h2>
                        <p className="text-base sm:text-lg leading-relaxed text-white/50 font-light">
                            Somos un equipo de desarrollo apasionado por crear soluciones digitales que transforman ideas en realidad.
                        </p>
                        <p className="text-base sm:text-lg leading-relaxed text-white/50 font-light">
                            Creemos que estamos todos en journey: que tenemos un rico pasado detrás y un futuro inimaginable por delante.
                        </p>
                    </motion.section>

                    {/* Contact Section */}
                    <motion.section
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-5"
                    >
                        <h2 className="text-2xl sm:text-3xl font-extralight text-white/90 tracking-wide">
                            Contact
                        </h2>
                        <p className="text-base sm:text-lg leading-relaxed text-white/50 font-light">
                            Para consultas:{' '}
                            <a href="mailto:hello@jacana.dev" className="text-cyan-400/60 hover:text-cyan-400 underline underline-offset-4 transition-colors">
                                hello@jacana.dev
                            </a>
                        </p>
                    </motion.section>

                    {/* Footer */}
                    <footer className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-center gap-8 text-sm text-white/25">
                        <Link href="/terms" className="hover:text-cyan-400/50 transition-colors tracking-wide">
                            Terms
                        </Link>
                        <Link href="/privacy" className="hover:text-cyan-400/50 transition-colors tracking-wide">
                            Privacy
                        </Link>
                    </footer>
                </div>
            </div>
        </main>
    );
}
