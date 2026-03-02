"use client";

import { memo, useState } from "react";
import { motion } from "framer-motion";

/**
 * Logo compacto para móvil
 * Logo limpio sin fondo, sin bordes
 * Adaptado a la paleta Jacana (azul)
 */
function LogoTwo() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            className="flex items-center justify-center cursor-pointer select-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.img
                src="/perfil.png"
                alt="Jacana Developers"
                className="h-10 w-12 object-contain"
                animate={{
                    filter: isHovered
                        ? "drop-shadow(0 0 6px rgba(0, 160, 228, 0.4))"
                        : "drop-shadow(0 0 0px transparent)"
                }}
                transition={{ duration: 0.3 }}
            />
        </motion.div>
    );
}

export default memo(LogoTwo);
