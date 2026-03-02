'use client';

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Logo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex-shrink-0">
      <Link
        href="/"
        className="flex items-center gap-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Logo limpio sin fondo ni bordes */}
        <motion.div
          className="relative"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <motion.img
            src="/perfil.png"
            alt="Jacana Developers"
            className="h-12 w-16 object-contain"
            animate={{
              filter: isHovered
                ? "drop-shadow(0 0 8px rgba(0, 160, 228, 0.4))"
                : "drop-shadow(0 0 0px transparent)"
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Texto del logo */}
        <div className="hidden xl:flex flex-col">
          <motion.span
            className="text-lg font-bold text-white tracking-tight"
            animate={{
              color: isHovered ? "#00A0E4" : "#ffffff"
            }}
            transition={{ duration: 0.3 }}
          >
            Jacana
          </motion.span>
          <motion.span
            className="text-[10px] font-mono text-[#00A0E4] tracking-[0.15em] uppercase"
            animate={{
              opacity: isHovered ? 1 : 0.7
            }}
            transition={{ duration: 0.3 }}
          >
            Developers
          </motion.span>
        </div>
      </Link>
    </div>
  );
}
