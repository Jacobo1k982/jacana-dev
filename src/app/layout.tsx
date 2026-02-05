import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar/Navbar";
import ToastProviderClient from "@/components/providers/ToastProviderClient";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "JACANA DEV | Soluciones Digitales Full Stack",
  description: "Desarrollo web moderno, aplicaciones escalables y experiencias digitales premium — por JACANA-Dev",
  keywords: ["desarrollo web", "full stack", "next.js", "react", "jacana dev", "Costa Rica"],
  authors: [{ name: "Jacobo", url: "https://jacana-dev.com" }],
  themeColor: "#0d1117",
  openGraph: {
    title: "JACANA DEV | Soluciones Digitales Full Stack",
    description: "Desarrollo web moderno, aplicaciones escalables y experiencias digitales premium.",
    images: "/og-image.jpg",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JACANA DEV",
    description: "Soluciones digitales full stack premium.",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>

      <body
        className={`
          ${GeistSans.variable} ${GeistMono.variable} 
          font-sans antialiased 
          bg-[#0d1117] text-[#c9d1d9] 
          selection:bg-[#388bfd33] selection:text-[#c9d1d9] 
          min-h-screen flex flex-col
        `}
      >
        <ToastProviderClient>
          <Navbar />
          <main className="flex-1 w-full pt-16">
            {children}
          </main>

          {/* Footer descomentado si lo necesitas */}
        </ToastProviderClient>
      </body>
    </html>
  );
}