"use client";
import { useCallback, useState, useEffect } from "react";
import { loadSlim } from "tsparticles-slim";
import dynamic from 'next/dynamic';

// Cargamos Particles dinámicamente sin SSR
const Particles = dynamic(
    () => import("react-tsparticles").then((mod) => mod.Particles),
    {
        ssr: false,
        loading: () => <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0d1224]" />
    }
);

export default function ParticulasFuturistas() {
    const [mounted, setMounted] = useState(false);
    const [particlesOptions, setParticlesOptions] = useState(null);

    const initParticles = useCallback(async (engine) => {
        await loadSlim(engine);
    }, []);

    useEffect(() => {
        setMounted(true);

        // Configuración de partículas que solo se carga en el cliente
        setParticlesOptions({
            fullScreen: { enable: false },
            background: {
                color: "#0d1224",
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: { enable: false },
                    onHover: { enable: true, mode: "repulse" },
                    resize: true,
                },
                modes: {
                    repulse: {
                        distance: 80,
                        duration: 0.5,
                    },
                },
            },
            particles: {
                color: { value: "#ffffff" },
                links: {
                    color: "#ffffff",
                    distance: 120,
                    enable: true,
                    opacity: 0.3,
                    width: 1,
                },
                collisions: { enable: false },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    outModes: { default: "bounce" },
                },
                number: {
                    value: 80,
                    density: { enable: true, area: 800 },
                },
                opacity: { value: 0.3 },
                shape: { type: "circle" },
                size: { value: { min: 1, max: 3 } },
            },
            detectRetina: true,
        });
    }, []);

    if (!mounted || !particlesOptions) {
        return (
            <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0d1224]" />
        );
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10">
            <Particles
                id="tsparticles"
                init={initParticles}
                options={particlesOptions}
            />
        </div>
    );
}