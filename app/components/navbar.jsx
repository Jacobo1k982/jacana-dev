"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Actualizar link activo según scroll
      const sections = document.querySelectorAll("section");
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = `#${section.id}`;
        }
      });
      setActiveLink(current);
    };

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    document.body.style.overflow = menuOpen ? "auto" : "hidden";
  };

  const navItems = [
    { label: "Inicio", href: "/" },
    { label: "Servicios", href: "#servicios" },
    { label: "Tecnologías", href: "#skills" },
    { label: "Portafolio", href: "#portafolio" },
    { label: "Contacto", href: "#contact" },
  ];

  // Efecto de cursor glow
  const cursorGlow = {
    transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-700 ${scrolled
          ? "bg-gradient-to-r from-[#0f1123ee] to-[#11182cee] border-b border-cyan-400/20 backdrop-blur-xl shadow-2xl shadow-cyan-500/20"
          : "bg-transparent"
        }`}
    >
      {/* Efecto de cursor glow */}
      <div
        className="fixed -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none transition-transform duration-100 ease-out z-0"
        style={{
          ...cursorGlow,
          background: "radial-gradient(circle, rgba(0,255,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Partículas de fondo futuristas mejoradas */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Fondo de conexiones */}
        <div className="absolute inset-0 opacity-10">
          <svg
            width="100%"
            height="100%"
            className="animate-[pulse_20s_linear_infinite]"
          >
            <defs>
              <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 60 0 L 0 0 0 60"
                  fill="none"
                  stroke="rgba(0,255,255,0.2)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Partículas animadas */}
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full ${i % 2 === 0 ? "bg-cyan-400" : "bg-violet-500"
              }`}
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.7,
              boxShadow: `0 0 ${Math.random() * 10 + 5
                }px 2px ${i % 2 === 0 ? "rgba(0,255,255,0.7)" : "rgba(138,43,226,0.7)"}`,
              animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite ${Math.random() * 5
                }s`,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo con efectos futuristas mejorados */}
        <Link
          href="/"
          className="group relative flex items-center space-x-2"
          onClick={() => setActiveLink("#home")}
        >
          <div className="relative">
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-cyan-400 to-violet-500 opacity-0 group-hover:opacity-30 blur-lg transition-opacity duration-500" />
            <Image
              src="./jacana.png"
              alt="Logo Jacana"
              width={300}
              height={60}
              className="transition-all duration-500 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)] hover:drop-shadow-[0_0_20px_rgba(138,43,226,0.6)]"
              priority
            />
            <div className="absolute inset-0 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700 bg-gradient-to-r from-cyan-400 to-violet-500 animate-[pulse_7s_ease-in-out_infinite]" />
          </div>
          <span className="text-cyan-300 font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/*INNOVACIÓN DIGITAL*/}
          </span>
        </Link>

        {/* Menú principal desktop mejorado */}
        <nav className="hidden md:flex space-x-6 text-sm font-medium uppercase tracking-wider">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`relative py-2 px-1 transition-all duration-500 group ${activeLink === item.href
                  ? "text-white"
                  : "text-cyan-300 hover:text-white"
                }`}
              onClick={() => setActiveLink(item.href)}
            >
              <span className="relative z-10 flex items-center">
                <span className="mr-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  ▹
                </span>
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 w-full h-[1px] transition-all duration-500 ${activeLink === item.href
                      ? "bg-gradient-to-r from-cyan-400 to-violet-500 scale-100"
                      : "bg-cyan-400 scale-0 group-hover:scale-100"
                    }`}
                />
              </span>
              <span
                className={`absolute -bottom-1 left-1/2 w-2 h-2 rounded-full bg-cyan-400 transform -translate-x-1/2 transition-all duration-300 ${activeLink === item.href
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-50 group-hover:scale-75"
                  }`}
              />
            </Link>
          ))}
        </nav>

        {/* Botón hamburguesa móvil futurista mejorado */}
        <button
          className="md:hidden relative w-12 h-12 flex flex-col justify-center items-center group z-50"
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span
            className={`absolute w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-0 w-7" : "-translate-y-2"
              } group-hover:bg-white`}
          />
          <span
            className={`absolute w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"
              } group-hover:bg-white`}
          />
          <span
            className={`absolute w-6 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 translate-y-0 w-7" : "translate-y-2"
              } group-hover:bg-white`}
          />
        </button>

        {/* Menú móvil futurista mejorado */}
        <div
          className={`fixed inset-0 z-40 transition-all duration-700 ease-in-out md:hidden ${menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none delay-300"
            }`}
        >
          {/* Fondo del menú con efecto de escaneo */}
          <div
            className={`absolute inset-0 bg-[#0a0d22] transition-opacity duration-700 ${menuOpen ? "opacity-95" : "opacity-0"
              }`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,255,0.1)_0%,transparent_70%)] animate-[pulse_10s_ease-in-out_infinite]" />
            </div>
          </div>

          <div
            className={`absolute inset-0 flex flex-col items-center pt-24 transition-all duration-500 ${menuOpen ? "translate-y-0" : "-translate-y-10"
              }`}
          >
            {/* Logo en el menú móvil */}
            <div className="mb-12 transform transition-all duration-700">
              <Link
                href="/"
                className="group relative flex items-center justify-center"
                onClick={() => {
                  setActiveLink("#home");
                  toggleMenu();
                }}
              >
                <div className="relative">
                  <Image
                    src="./jacana.png"
                    alt="Logo Jacana"
                    width={250}
                    height={50}
                    className="transition-all duration-500 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                  />
                  <div className="absolute inset-0 rounded-xl blur-xl opacity-20 group-hover:opacity-40 transition duration-700 bg-gradient-to-r from-cyan-400 to-violet-500 animate-[pulse_7s_ease-in-out_infinite]" />
                </div>
              </Link>
            </div>

            {/* Items del menú con animación escalonada */}
            <div className="w-full max-w-xs flex flex-col space-y-6 p-8 border border-cyan-400/20 rounded-xl bg-gradient-to-b from-[#0f1123ee] to-[#11182cee] shadow-2xl shadow-cyan-500/30 backdrop-blur-lg">
              {navItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative py-3 text-lg transition-all duration-500 text-center ${activeLink === item.href
                      ? "text-white font-bold"
                      : "text-cyan-300 hover:text-white"
                    }`}
                  style={{
                    transitionDelay: menuOpen ? `${index * 100}ms` : "0ms",
                    transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                    opacity: menuOpen ? 1 : 0,
                  }}
                  onClick={() => {
                    setActiveLink(item.href);
                    toggleMenu();
                  }}
                >
                  <span className="flex items-center justify-center">
                    <span
                      className={`mr-3 transition-all duration-300 ${activeLink === item.href
                          ? "text-cyan-400 scale-125"
                          : "text-cyan-400/70"
                        }`}
                    >
                      ▹
                    </span>
                    {item.label}
                  </span>
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 bottom-0 w-3/4 h-[1px] transition-all duration-500 ${activeLink === item.href
                        ? "bg-gradient-to-r from-cyan-400 to-violet-500 scale-100"
                        : "bg-cyan-400/30 scale-0 group-hover:scale-100"
                      }`}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;