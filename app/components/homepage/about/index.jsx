// @flow strict
"use client";
import { personalData } from "@/utils/data/personal-data";
import Image from "next/image";
import { motion } from "framer-motion";

function AboutSection() {
  return (
    <section id="about" className="relative py-20 lg:py-28 bg-gradient-to-b from-[#0d1224] to-[#0a0d37] overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat opacity-30"></div>
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-600/20 blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/20 to-[#16f2b3]/20 blur-3xl"></div>
      </div>

      {/* Indicador lateral decorativo */}
      <div className="hidden lg:flex flex-col items-center absolute top-1/2 -translate-y-1/2 -right-8 z-10">
        <motion.span
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-pink-500 to-violet-600 w-fit text-white rotate-90 p-2 px-5 text-xl rounded-md font-bold tracking-wider shadow-lg"
        >
          ACERCA DE NOSOTROS
        </motion.span>
        <motion.span
          initial={{ height: 0 }}
          whileInView={{ height: '12rem' }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-1 bg-gradient-to-b from-pink-500 to-violet-600 mt-2 rounded-full"
        ></motion.span>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Imagen con efecto */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center order-1 lg:order-2 relative"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-violet-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-all duration-500"></div>
              <Image
                src={personalData.profile}
                width={400}
                height={400}
                alt="Equipo Jacana"
                className="relative rounded-xl z-10 transition-all duration-500 grayscale hover:grayscale-0 group-hover:scale-105 object-cover object-center"
                quality={100}
              />
            </div>
          </motion.div>

          {/* Texto descriptivo */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 space-y-6 text-justify"
          >
            <h2 className="text-3xl md:text-4xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#16f2b3] to-cyan-400">
              Innovación y Tecnología
            </h2>

            <p className="text-lg md:text-xl text-center font-medium text-[#d3d8e8]">
              Jacana Developers - Especialistas en Soluciones Digitales
            </p>

            <div className="space-y-4 text-[#b4bcd0]">
              {personalData.description.split('\n').map((paragraph, index) => (
                <p key={index} className="text-sm lg:text-base leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Estadísticas o datos destacados */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-[#10172d] border border-[#1b2c68a0] rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#16f2b3]">1+</p>
                <p className="text-xs uppercase tracking-wider text-[#8b98a5]">Años de Experiencia</p>
              </div>
              <div className="bg-[#10172d] border border-[#1b2c68a0] rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#16f2b3]">12+</p>
                <p className="text-xs uppercase tracking-wider text-[#8b98a5]">Proyectos Completados</p>
              </div>
              <div className="bg-[#10172d] border border-[#1b2c68a0] rounded-lg p-4 text-center">
                <p className="text-2xl font-bold text-[#16f2b3]">20+</p>
                <p className="text-xs uppercase tracking-wider text-[#8b98a5]">Clientes Satisfechos</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;