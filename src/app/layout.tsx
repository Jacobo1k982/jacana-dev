import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar/Navbar";
import ToastProviderClient from "@/components/providers/ToastProviderClient";

import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "JACANA DEV || Soluciones Digitales Full Stack",
  description: "Developer by JACANA-Dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <ToastProviderClient>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </ToastProviderClient>
      </body>
    </html>
  );
}
