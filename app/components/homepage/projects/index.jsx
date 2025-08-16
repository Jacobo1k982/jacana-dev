'use client';
import { useEffect, useState } from 'react';
import { projectsData } from '@/utils/data/projects-data';
import ProjectCard from './project-card';
import { motion } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

const Projects = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 20 }, () => ({
      width: `${Math.random() * 6 + 2}px`,
      height: `${Math.random() * 6 + 2}px`,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.3 + 0.1,
      yMove: Math.random() * 40 - 20,
      xMove: Math.random() * 40 - 20,
      duration: Math.random() * 10 + 10,
    }));
    setParticles(generatedParticles);
  }, []);

  return (
    <section id='projects' className="relative z-50 py-20 lg:py-28 bg-gradient-to-b from-[#0a0d22] to-[#0d1224] overflow-hidden">
      {/* Efectos de fondo futuristas */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat opacity-20"></div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-violet-600/20 to-pink-500/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-cyan-400/20 to-[#16f2b3]/20 blur-3xl"></div>
      </div>

      {/* Título sección con animación */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="sticky top-10 z-10 mb-24"
      >
        <div className="flex items-center relative">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            transition={{ duration: 0.8 }}
            className="h-[2px] bg-gradient-to-r from-[#1a1443] to-transparent"
          ></motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 bg-gradient-to-r from-[#16f2b3] to-cyan-400 px-6 py-3 text-xl rounded-r-full shadow-lg"
          >
            <FaRocket className="text-white animate-pulse" />
            <span className="font-bold text-white tracking-wider">PROYECTOS DESTACADOS</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Lista de proyectos */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {projectsData.slice(0, 4).map((project, index) => (
            <motion.div
              key={index}
              id={`sticky-card-${index + 1}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="sticky-card"
            >
              <div className="relative group h-full">
                {/* Efecto de glow al hacer hover */}
                <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                {/* Contenedor de la tarjeta */}
                <div className="relative h-full rounded-xl overflow-hidden shadow-2xl transition-all duration-500 group-hover:shadow-[0_20px_50px_-15px_rgba(109,40,217,0.3)]">
                  <ProjectCard project={project} />

                  {/* Indicador de número de proyecto */}
                  <motion.div
                    className="absolute top-4 left-4 bg-[#10172d] border border-[#1b2c68a0] rounded-full w-10 h-10 flex items-center justify-center z-10"
                    whileHover={{ scale: 1.1 }}
                  >
                    <span className="text-white font-bold text-lg bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                      {index + 1}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Efecto de partículas flotantes */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
          {particles.map((particle, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-[#16f2b3]"
              style={{
                width: particle.width,
                height: particle.height,
                top: particle.top,
                left: particle.left,
                opacity: particle.opacity,
              }}
              animate={{
                y: [0, particle.yMove],
                x: [0, particle.xMove],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
