"use client";
import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { FaAtom } from "react-icons/fa";

function Skills() {
  return (
    <section id="skills" className="relative z-50 py-20 lg:py-28 bg-gradient-to-b from-[#0d1224] to-[#0a0d37] overflow-hidden">
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
            className="h-[1px] bg-gradient-to-r from-transparent to-[#16f2b3]"
          ></motion.span>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 mx-4 bg-gradient-to-r from-violet-600 to-pink-500 p-2 px-6 text-xl rounded-full shadow-lg"
          >
            <FaAtom className="text-white animate-spin-slow" />
            <span className="font-bold text-white tracking-wider">HABILIDADES</span>
          </motion.div>
          <motion.span
            initial={{ width: 0 }}
            whileInView={{ width: '6rem' }}
            transition={{ duration: 0.5 }}
            className="h-[1px] bg-gradient-to-l from-transparent to-[#16f2b3]"
          ></motion.span>
        </div>
      </motion.div>

      {/* Carrusel de habilidades */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full"
        >
          <Marquee
            gradient={false}
            speed={50}
            pauseOnHover={true}
            pauseOnClick={true}
            delay={0}
            play={true}
            direction="left"
            className="py-4"
          >
            {skillsData.map((skill, id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-40 min-w-fit h-fit flex flex-col items-center justify-center m-4 cursor-pointer group"
              >
                <div className="relative w-full h-full">
                  {/* Efecto de glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                  {/* Tarjeta de habilidad */}
                  <div className="relative bg-[#10172d] border border-[#1b2c68a0] rounded-xl p-6 shadow-lg group-hover:shadow-violet-500/20 transition-all duration-300 h-full">
                    {/* Borde superior animado */}
                    <div className="flex -translate-y-[1px] justify-center mb-4">
                      <div className="w-3/4">
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent group-hover:via-[#16f2b3] transition-all duration-500" />
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-16 w-16 flex items-center justify-center">
                        <Image
                          src={skillsImage(skill)?.src}
                          alt={skill}
                          width={48}
                          height={48}
                          className="h-full w-auto rounded-lg group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <p className="text-white text-sm sm:text-base font-medium text-center">
                        {skill}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Marquee>
        </motion.div>

        {/* Segundo carrusel en dirección opuesta */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full mt-8"
        >
          <Marquee
            gradient={false}
            speed={40}
            pauseOnHover={true}
            pauseOnClick={true}
            delay={0}
            play={true}
            direction="right"
            className="py-4"
          >
            {skillsData.reverse().map((skill, id) => (
              <motion.div
                key={id}
                whileHover={{ scale: 1.1, y: -10 }}
                transition={{ duration: 0.3 }}
                className="w-40 min-w-fit h-fit flex flex-col items-center justify-center m-4 cursor-pointer group"
              >
                <div className="relative w-full h-full">
                  {/* Efecto de glow */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-[#16f2b3] rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>

                  {/* Tarjeta de habilidad */}
                  <div className="relative bg-[#10172d] border border-[#1b2c68a0] rounded-xl p-6 shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-300 h-full">
                    {/* Borde superior animado */}
                    <div className="flex -translate-y-[1px] justify-center mb-4">
                      <div className="w-3/4">
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent group-hover:via-pink-500 transition-all duration-500" />
                      </div>
                    </div>

                    {/* Contenido */}
                    <div className="flex flex-col items-center justify-center gap-4">
                      <div className="h-16 w-16 flex items-center justify-center">
                        <Image
                          src={skillsImage(skill)?.src}
                          alt={skill}
                          width={48}
                          height={48}
                          className="h-full w-auto rounded-lg group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0"
                        />
                      </div>
                      <p className="text-white text-sm sm:text-base font-medium text-center">
                        {skill}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;