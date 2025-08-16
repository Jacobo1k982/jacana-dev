"use client";
import { useEffect, useRef, useState } from 'react';

const GlowCard = ({ children, identifier, className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    setMounted(true);

    if (typeof window === 'undefined') return;
    if (!containerRef.current || !cardRef.current) return;

    const CONTAINER = containerRef.current;
    const CARD = cardRef.current;

    const CONFIG = {
      proximity: 40,
      spread: 80,
      blur: 12,
      gap: 32,
      vertical: false,
      opacity: 0,
    };

    const UPDATE = (event) => {
      const CARD_BOUNDS = CARD.getBoundingClientRect();
      const withinX = event.x > CARD_BOUNDS.left - CONFIG.proximity &&
        event.x < CARD_BOUNDS.right + CONFIG.proximity;
      const withinY = event.y > CARD_BOUNDS.top - CONFIG.proximity &&
        event.y < CARD_BOUNDS.bottom + CONFIG.proximity;

      const active = withinX && withinY ? 1 : CONFIG.opacity;
      CARD.style.setProperty('--active', active);

      const CARD_CENTER = [
        CARD_BOUNDS.left + CARD_BOUNDS.width / 2,
        CARD_BOUNDS.top + CARD_BOUNDS.height / 2
      ];

      let ANGLE = (Math.atan2(event.y - CARD_CENTER[1], event.x - CARD_CENTER[0]) * 180 / Math.PI);
      ANGLE = ANGLE < 0 ? ANGLE + 360 : ANGLE;

      CARD.style.setProperty('--start', `${ANGLE + 90}`);
    };

    const RESTYLE = () => {
      CONTAINER.style.setProperty('--gap', CONFIG.gap);
      CONTAINER.style.setProperty('--blur', CONFIG.blur);
      CONTAINER.style.setProperty('--spread', CONFIG.spread);
      CONTAINER.style.setProperty('--direction', CONFIG.vertical ? 'column' : 'row');
    };

    RESTYLE();
    window.addEventListener('pointermove', UPDATE);

    return () => {
      window.removeEventListener('pointermove', UPDATE);
    };
  }, []);

  // Evita el render hasta que esté montado en cliente
  if (!mounted) return null;

  const baseStyles = {
    '--active': 0,
    '--start': '0',
    '--gap': '32px',
    '--blur': '12px',
    '--spread': '80px',
    '--direction': 'row'
  };

  return (
    <div
      ref={containerRef}
      className={`glow-container glow-container-${identifier} ${className}`}
      style={baseStyles}
    >
      <article
        ref={cardRef}
        className={`glow-card glow-card-${identifier} h-fit cursor-pointer border border-[#2a2e5a] transition-all duration-300 relative bg-[#101123] text-gray-200 rounded-xl hover:border-transparent w-full ${className}`}
      >
        <div className="glows" />
        {children}
      </article>
    </div>
  );
};

export default GlowCard;
