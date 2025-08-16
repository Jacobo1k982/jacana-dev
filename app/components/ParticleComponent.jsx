// ParticleComponent.jsx
'use client';

import Particles from "@tsparticles/react";

export default function ParticleBackground() {
    const options = {
        particles: {
            number: { value: 80, density: { enable: true, area: 800 } },
            color: { value: "#00ffdd" },
            size: { value: 3 },
            links: { enable: true, distance: 150, color: "#ff0088" },
            move: { enable: true, speed: 2 },
        },
        background: { color: "#000000" },
    };

    return (
        <Particles
            id="tsparticles"
            options={options}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
        />
    );
}