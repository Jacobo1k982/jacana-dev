"use client";
import { useEffect, useState, useRef } from "react";
import { personalData } from "@/utils/data/personal-data";
import Link from "next/link";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { MdDownload } from "react-icons/md";
import { RiContactsFill } from "react-icons/ri";
import { SiLeetcode } from "react-icons/si";
import ParticulasFuturistas from "../../helper/ParticulasFuturistas";
import { motion, useAnimation, AnimatePresence } from "framer-motion";

function HeroSectionContent() {
  const [hoveredButton, setHoveredButton] = useState(null);
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Efecto de cursor solo en cliente
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Efecto de escaneo holográfico
  useEffect(() => {
    const interval = setInterval(() => {
      controls.start({
        backgroundPosition: ['0% 0%', '0% 100%'],
        transition: { duration: 8, ease: 'linear' }
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [controls]);

  const socialLinks = [
    { icon: <BsGithub size={24} />, href: personalData.github, color: 'from-purple-500 to-pink-500' },
    { icon: <BsLinkedin size={24} />, href: personalData.linkedIn, color: 'from-blue-500 to-cyan-400' },
    { icon: <FaFacebook size={24} />, href: personalData.facebook, color: 'from-blue-600 to-blue-400' },
    { icon: <SiLeetcode size={24} />, href: personalData.leetcode, color: 'from-yellow-500 to-orange-500' },
    { icon: <FaTwitterSquare size={24} />, href: personalData.twitter, color: 'from-sky-400 to-blue-500' }
  ];

  return (
    <section className="relative flex flex-col items-center justify-between py-2 lg:py-24 bg-[#0d1224] overflow-hidden mt-16">

      {/* Líneas de conexión holográficas (estáticas) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <svg width="100%" height="100%" className="animate-[pulse_20s_linear_infinite]">
          <defs>
            <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(0,255,255,0.3)" strokeWidth="0.8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Partículas detrás del Hero */}
      <div className="absolute inset-0 -z-10">
        <ParticulasFuturistas />
      </div>
      <div className="relative z-10 grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-16 gap-y-12 max-w-6xl mx-auto px-4">

        {/* Sección de texto */}
        <div className="order-2 lg:order-1 flex flex-col items-start justify-center space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[3.5rem] lg:leading-[1.2]"
          >
            Hola, <br />
            Somos{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500">
              {personalData.name}
            </span>
            ,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16f2b3] to-cyan-400">
              {personalData.designation}
            </span>
          </motion.h1>

          <p className="text-lg text-gray-300 max-w-lg">
            Especialistas en desarrollo web moderno con soluciones escalables y de alto rendimiento.
          </p>

          {/* Redes sociales */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target='_blank'
                className="relative p-3 rounded-full transition-all duration-300 hover:scale-110"
                onMouseEnter={() => setHoveredButton(index)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${item.color} opacity-0 transition-opacity duration-300 ${hoveredButton === index ? 'opacity-100' : ''}`} />
                <div className="relative z-10 text-white">
                  {item.icon}
                </div>
                <AnimatePresence>
                  {hoveredButton === index && (
                    <motion.div
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="absolute inset-0 rounded-full border-2 border-white/20"
                      style={{
                        boxShadow: `0 0 20px 5px ${item.color.split(' ')[1].replace('to-', '')}`
                      }}
                    />
                  )}
                </AnimatePresence>
              </Link>
            ))}
          </motion.div>

          {/* Botones con efecto de energía */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 mt-4"
          >
            <div className="flex flex-wrap items-center gap-4 mt-4">
              <Link href="#contact" className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-[pulse_3s_ease-in-out_infinite]" />
                <button className="relative px-6 py-3 md:px-8 md:py-4 bg-[#0d1224] rounded-full text-sm md:text-base font-medium uppercase tracking-wider text-white flex items-center gap-2 group-hover:gap-3 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Contáctanos</span>
                  <RiContactsFill size={18} className="relative z-10 transition-all duration-300" />
                  <div className="absolute inset-0 bg-[#0d1224] rounded-full z-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </Link>

              <Link href={personalData.resume} target="_blank" className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-500 animate-[pulse_3s_ease-in-out_infinite]" />
                <button className="relative px-6 py-3 md:px-8 md:py-4 bg-[#0d1224] rounded-full text-sm md:text-base font-medium uppercase tracking-wider text-white flex items-center gap-2 group-hover:gap-3 transition-all duration-300 overflow-hidden">
                  <span className="relative z-10">Formación</span>
                  <MdDownload size={18} className="relative z-10 transition-all duration-300" />
                  <div className="absolute inset-0 bg-[#0d1224] rounded-full z-0" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-emerald-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Tarjeta de código */}
        <div className="order-1 lg:order-2 relative group animate-futuristicSlide">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-violet-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-[#0d1224] to-[#0a0d37] border border-[#1b2c68a0] rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/20">

            {/* Efecto de proyección holográfica */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-4/5 h-8 bg-gradient-to-t from-cyan-400/30 to-transparent rounded-[100%] blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />

            {/* Barra de título */}
            <div className="relative px-4 py-3 border-b border-[#1b2c68a0] bg-[#0a0d22] flex justify-between items-center z-10">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400 shadow-[0_0_5px_1px_rgba(239,68,68,0.7)]"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_5px_1px_rgba(234,179,8,0.7)]"></div>
                <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_5px_1px_rgba(34,197,94,0.7)]"></div>
              </div>
              <div className="text-xs text-gray-400 font-mono">coder.js</div>
            </div>
            {/* Contenido del código con efecto de terminal */}
            <div className="relative p-4 lg:p-6 bg-gradient-to-br from-[#0d1224]/50 to-[#0a0d37]/50">

              {/* Efecto de escaneo */}
              <pre className="relative p-4 lg:p-6 bg-gradient-to-br from-[#0d1224]/50 to-[#0a0d37]/50">
                <code className="text-gray-300">
                  <div className="flex">
                    <span className="text-pink-400 mr-2">const</span>
                    <span className="text-white mr-2">coder</span>
                    <span className="text-pink-400 mr-2">=</span>
                    <span className="text-gray-500">{'{'}</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-cyan-300 mr-2">name:</span>
                    <span className="text-amber-300">&quot;jacana Developers&quot;</span>
                    <span className="text-gray-500">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-cyan-300 mr-2">skills:</span>
                    <span className="text-gray-500">[</span>
                    <span className="text-amber-300">&quot;React&quot;</span>
                    <span className="text-gray-500">, </span>
                    <span className="text-amber-300">&quot;NextJS&quot;</span>
                    <span className="text-gray-500">, </span><br />
                    <span className="text-amber-300">&quot;Redux&quot;</span>
                    <span className="text-gray-500">, </span>
                    <span className="text-amber-300">&quot;Express&quot;</span>
                    <span className="text-gray-500">, </span>
                    <span className="text-amber-300">&quot;NestJS&quot;</span>
                    <span className="text-gray-500">, </span><br />
                    <span className="text-amber-300">&quot;MySql&quot;</span>
                    <span className="text-gray-500">, </span>
                    <span className="text-amber-300">&quot;MongoDB&quot;</span>
                    <span className="text-gray-500">, </span>
                    <span className="text-amber-300">&quot;Docker&quot;</span>
                    <span className="text-gray-500">, </span><br />
                    <span className="text-amber-300">&quot;AWS&quot;</span>
                    <span className="text-gray-500">],</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-cyan-300 mr-2">hardWorker:</span>
                    <span className="text-emerald-400">true</span>
                    <span className="text-gray-500">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-cyan-300 mr-2">quickLearner:</span>
                    <span className="text-emerald-400">true</span>
                    <span className="text-gray-500">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-cyan-300 mr-2">problemSolver:</span>
                    <span className="text-emerald-400">true</span>
                    <span className="text-gray-500">,</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-green-400 mr-2">hireable:</span>
                    <span className="text-pink-400 mr-2">function</span>
                    <span className="text-gray-500">{'() {'}</span>
                  </div>
                  <div className="ml-8">
                    <span className="text-pink-400 mr-2">return</span>
                  </div>
                  <div className="ml-12">
                    <span className="text-blue-300 mr-2">this.</span>
                    <span className="text-white mr-2">hardWorker</span>
                    <span className="text-pink-400 mr-2">&amp;&amp;</span>
                  </div>
                  <div className="ml-12">
                    <span className="text-blue-300 mr-2">this.</span>
                    <span className="text-white mr-2">problemSolver</span>
                    <span className="text-pink-400 mr-2">&amp;&amp;</span>
                  </div>
                  <div className="ml-12">
                    <span className="text-blue-300 mr-2">this.</span>
                    <span className="text-white mr-2">skills.length</span>
                    <span className="text-pink-400 mr-2">&gt;=</span>
                    <span className="text-emerald-400">5</span>
                  </div>
                  <div className="ml-8">
                    <span className="text-gray-500">{'};'}</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-gray-500">{'};'}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">{'};'}</span>
                  </div>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSectionContent;