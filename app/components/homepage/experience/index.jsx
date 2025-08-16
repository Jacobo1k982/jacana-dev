"use client";
import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import { motion } from "framer-motion";
import { FaRocket } from "react-icons/fa";
import experience from '../../../assets/lottie/code.json';
import AnimationLottie from "../../helper/animation-lottie";
import GlowCard from "../../helper/glow-card";

function Experience() {
  return (
    <section id="experience" className="relative z-50 py-20 lg:py-28 bg-gradient-to-b from-[#0a0d22] to-[#0d1224] overflow-hidden">
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
        className="flex justify-center mb-16 lg:mb-20"
      >
        <div className="flex items-center">
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            transition={{ duration: 0.5 }}
            className="h-[2px] bg-gradient-to-r from-transparent to-[#16f2b3]"
          ></motion.span>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 mx-4 bg-gradient-to-r from-[#16f2b3] to-cyan-400 p-2 px-6 text-xl rounded-full shadow-lg"
          >
            <FaRocket className="text-white" />
            <span className="font-bold text-white tracking-wider">EXPERIENCIA</span>
          </motion.div>
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            transition={{ duration: 0.5 }}
            className="h-[2px] bg-gradient-to-l from-transparent to-[#16f2b3]"
          ></motion.span>
        </div>
      </motion.div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Animación Lottie con contenedor mejorado */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/30 to-pink-500/30 rounded-3xl blur-xl opacity-70"></div>
            <div className="relative bg-[#10172d] border border-[#1b2c68a0] rounded-2xl p-6 shadow-2xl">
              <AnimationLottie animationPath={experience} />
            </div>
          </motion.div>

          {/* Lista de experiencias */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <GlowCard identifier={`experience-${experience.id}`}>
                  <div className="relative overflow-hidden p-6 rounded-xl">
                    {/* Efecto de partículas */}
                    <div className="absolute inset-0 z-0 opacity-20">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute rounded-full bg-[#16f2b3]"
                          style={{
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            opacity: Math.random() * 0.5 + 0.1,
                          }}
                        />
                      ))}
                    </div>

                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-xs sm:text-sm font-mono text-[#16f2b3] bg-[#16f2b3]/10 px-3 py-1 rounded-full">
                          {experience.duration}
                        </p>
                        <div className="text-violet-500 transition-all duration-300 hover:text-[#16f2b3] hover:scale-110">
                          <BsPersonWorkspace size={24} />
                        </div>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                        {experience.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#b4bcd0] mb-3">
                        {experience.company}
                      </p>

                      {experience.description && (
                        <p className="text-xs sm:text-sm text-[#8b98a5]">
                          {experience.description}
                        </p>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;