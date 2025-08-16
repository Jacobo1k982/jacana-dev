// app/components/helper/ParticulasFuturistas.jsx
'use client';

import { useCallback } from 'react';
import Particles from "@tsparticles/react";

export default function ParticulasFuturistas() {
    const particlesInit = useCallback((engine) => {
        console.log("tsParticles initialized", engine);
    }, []);

    const particlesLoaded = useCallback((container) => {
        console.log("tsParticles loaded", container);
    }, []);

    const options = {
        background: { color: "#000" },
        particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: "#00ffdd" },
            size: { value: 2 },
            links: {
                enable: true,
                distance: 150,
                color: "#ff0088",
                opacity: 0.4,
            },
            move: {
                enable: true,
                speed: 2,
            },
        },
        detectRetina: true,
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            loaded={particlesLoaded}
            options={options}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -10,
            }}
        />
    );
}