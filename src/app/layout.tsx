// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

import Script from "next/script";

import Navbar from "@/components/Navbar/Navbar";
import ToastProviderClient from "@/components/providers/ToastProviderClient";
import { Providers } from "@/components/Providers";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

// ============================================
// CONFIGURACIÓN SEO Y METADATOS (INTACTA)
// ============================================
export const meta: Metadata = {
  title: {
    default: "JACANA DEV | Desarrollo Web Full Stack & Diseño UI",
    template: "%s | JACANA DEV",
  },
  description: "Desarrollador Full Stack especializado en Next.js, React, Node.js y PostgreSQL. Diseño interfaces modernas y construyo arquitecturas escalables. ¡Impulsa tu negocio hoy!",
  keywords: [
    "Desarrollo Web Full Stack",
    "Programador Costa Rica",
    "Desarrollador React",
    "Next.js Expert",
    "Diseño UI/UX",
    "Arquitectura de Software",
    "Aplicaciones Web Modernas",
    "Freelance Developer"
  ],
  authors: [{ name: "Jacobo", url: "https://jacana-dev.com" }],
  creator: "Jacobo",
  publisher: "JACANA DEV",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://jacana-dev.com",
  },

  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://jacana-dev.com",
    siteName: "JACANA DEV",
    title: "JACANA DEV | Soluciones Digitales Full Stack",
    description: "Desarrollo web moderno, aplicaciones escalables y experiencias digitales premium. Especialista en React, Next.js y Node.js.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "JACANA DEV - Desarrollo Web Profesional",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "JACANA DEV | Desarrollo Web Full Stack",
    description: "Soluciones digitales escalables y diseño centrado en el usuario.",
    images: ["/og-image.jpg"],
    creator: "@jacobo_dev",
  },

  manifest: "/manifest.json",
};

// ============================================
// COMPONENTES DE EFECTOS CYBER (CSS-only para SSR)
// ============================================

/**
 * Grid Pattern Background - Estilo terminal futurista
 * Renderizado con CSS puro para evitar hidratación
 */
const CyberGrid = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <div
      className="w-full h-full opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 255, 157, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 255, 157, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}
    />
    {/* Gradiente radial para profundidad */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,157,0.03)_0%,_transparent_70%)]" />
  </div>
);

/**
 * Partículas flotantes - Animadas con CSS keyframes
 * Sin dependencias de cliente para compatibilidad SSR
 */
const FloatingParticles = () => {
  // Generamos partículas con valores determinísticos para hidratación consistente
  const particles = Array.from({ length: 12 }, (_, i) => {
    // Valores pre-calculados para evitar hidratación mismatch
    const positions = [
      { x: 10, y: 20, size: 2, delay: 0 },
      { x: 85, y: 15, size: 3, delay: 2 },
      { x: 30, y: 70, size: 1, delay: 4 },
      { x: 70, y: 45, size: 2, delay: 1 },
      { x: 15, y: 85, size: 3, delay: 3 },
      { x: 90, y: 60, size: 2, delay: 5 },
      { x: 45, y: 10, size: 1, delay: 0 },
      { x: 60, y: 90, size: 2, delay: 2 },
      { x: 20, y: 40, size: 3, delay: 4 },
      { x: 80, y: 75, size: 1, delay: 1 },
      { x: 5, y: 55, size: 2, delay: 3 },
      { x: 50, y: 30, size: 2, delay: 5 },
    ];
    return { id: i, ...positions[i] };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#00FF9D]/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animation: `float ${15 + p.id * 2}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

/**
 * Scanline Overlay - Efecto CRT sutil
 */
const ScanlineOverlay = () => (
  <div
    className="fixed inset-0 pointer-events-none z-[1] opacity-[0.015]"
    style={{
      background: `linear-gradient(
        to bottom,
        transparent 50%,
        rgba(0, 255, 157, 0.08) 51%
      )`,
      backgroundSize: '100% 4px',
    }}
  />
);

/**
 * Corner Glow - Brillos en esquinas para profundidad
 */
const CornerGlows = () => (
  <>
    <div className="fixed top-0 left-0 w-96 h-96 bg-[#00FF9D]/5 rounded-full blur-3xl pointer-events-none z-0" />
    <div className="fixed bottom-0 right-0 w-96 h-96 bg-[#a371f7]/5 rounded-full blur-3xl pointer-events-none z-0" />
  </>
);

// ============================================
// ROOT LAYOUT
// ============================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <head>
        <meta name="google-site-verification" content="xTq9rdyunYlQrR6vXI3sVW8aFYVpF3-Sa_xgtwDBFnQ" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* CSS Global para animaciones y estilos cyber */}
        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) translateX(0);
              opacity: 0.2;
            }
            50% {
              transform: translateY(-80px) translateX(30px);
              opacity: 0.5;
            }
          }
          
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
          
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 10px rgba(0, 255, 157, 0.2);
            }
            50% {
              box-shadow: 0 0 25px rgba(0, 255, 157, 0.4);
            }
          }
          
          @keyframes border-flow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          /* Scrollbar personalizada estilo GitHub Dark + Cyber */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #0d1117;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #30363d;
            border-radius: 4px;
            border: 1px solid #0d1117;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #484f58;
            border-color: #00FF9D/30;
          }
          
          /* Selección de texto mejorada */
          ::selection {
            background: rgba(0, 255, 157, 0.25);
            color: #e6edf3;
            text-shadow: 0 0 10px rgba(0, 255, 157, 0.3);
          }
          
          /* Smooth scroll */
          html {
            scroll-behavior: smooth;
          }
          
          /* Focus visible para accesibilidad */
          :focus-visible {
            outline: 2px solid #00FF9D;
            outline-offset: 2px;
          }
        `}</style>
      </head>

      <body
        className={`
          ${GeistSans.variable} ${GeistMono.variable} 
          font-sans antialiased 
          bg-[#0d1117] text-[#c9d1d9] 
          selection:bg-[#00FF9D]/20 selection:text-[#00FF9D]
          min-h-screen flex flex-col
          overflow-x-hidden
        `}
      >
        {/* ===== EFECTOS DE FONDO CYBER (Z-0) ===== */}
        <CyberGrid />
        <FloatingParticles />
        <ScanlineOverlay />
        <CornerGlows />

        {/* ===== CONTENIDO PRINCIPAL (Z-10+) ===== */}
        <Providers>
          <ToastProviderClient>
            {/* Navbar con z-50 para estar sobre fondos */}
            <Navbar />

            {/* Main content con padding-top para navbar fijo */}
            <main className="flex-1 w-full relative z-10 pt-16">
              {children}
            </main>
          </ToastProviderClient>
        </Providers>

        {/* ===== ANALYTICS SCRIPT (INTACTO) ===== */}
        <Script
          src="https://stats.jacana-dev.com/script.js"
          data-website-id="1591d9b5-4f07-49b6-bab4-11a140d4e1ab"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}