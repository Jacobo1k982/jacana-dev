// src/components/ui/ViewCodeButton.tsx
'use client';

import React from 'react';
import { Terminal, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// ============================================
// PROPS INTERFACE
// ============================================
interface ViewCodeButtonProps {
    /** Texto a mostrar dentro del botón. Por defecto: "Ver Código" */
    label?: string;
    /** URL opcional si el botón es un enlace */
    href?: string;
    /** Callback opcional si es un botón de acción */
    onClick?: () => void;
    /** Variante visual: 'primary' (verde neón) o 'secondary' (estilo outline) */
    variant?: 'primary' | 'secondary';
    /** Tamaño del botón */
    size?: 'sm' | 'md' | 'lg';
    /** Clases adicionales de Tailwind para sobrescribir estilos */
    className?: string;
}

// ============================================
// COMPONENTE VIEW CODE BUTTON
// ============================================
export default function ViewCodeButton({
    label = "Ver Código",
    href,
    onClick,
    variant = 'secondary',
    size = 'md',
    className = '',
}: ViewCodeButtonProps) {

    // Configuración de estilos base
    const baseStyles = `
    group 
    relative 
    inline-flex 
    items-center 
    justify-center 
    gap-2 
    font-semibold 
    rounded-md 
    transition-all 
    duration-300 
    ease-out 
    overflow-hidden
    focus:outline-none 
    focus:ring-2 
    focus:ring-offset-2 
    focus:ring-offset-[#0d1117]
    ${className}
  `;

    // Configuración de tamaños
    const sizeStyles = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
    };

    // Configuración de variantes (Futurista)
    const variantStyles = {
        primary: `
      bg-[#00FF9D] text-black 
      border border-transparent 
      shadow-[0_0_10px_rgba(0,255,157,0.1)] 
      hover:shadow-[0_0_20px_rgba(0,255,157,0.3)] 
      hover:bg-[#00cc7a] 
      active:scale-95
      focus:ring-[#00FF9D]
    `,
        secondary: `
      bg-[#161b22] text-[#c9d1d9] 
      border border-[#30363d] 
      hover:bg-[#21262d] 
      hover:border-[#00FF9D]/50 
      hover:text-[#00FF9D]
      active:scale-95
      focus:ring-[#00FF9D]/50
    `,
    };

    // Estilos finales combinados
    const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;

    // Contenido interno del botón
    const content = (
        <>
            {/* Icono Terminal con efecto de brillo en hover */}
            <Terminal
                size={size === 'sm' ? 14 : 16}
                className={`
          transition-all duration-300 
          ${variant === 'secondary' ? 'text-[#58a6ff] group-hover:text-[#00FF9D] group-hover:drop-shadow-[0_0_4px_rgba(0,255,157,0.6)]' : ''}
        `}
            />

            <span className="relative z-10 flex items-center gap-2">
                {label}
                {/* Flecha que se desplaza */}
                <ArrowRight
                    size={size === 'sm' ? 12 : 16}
                    className="opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-transform"
                />
            </span>
        </>
    );

    // Renderizado condicional: Link o Button
    if (href) {
        return (
            <Link href={href} className={combinedStyles}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={combinedStyles}>
            {content}
        </button>
    );
}