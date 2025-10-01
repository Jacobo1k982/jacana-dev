// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata: Metadata = {
  title: "JACANA DEV",
  description: "Developer by JACANA-Dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
        style={
          {
            '--font-geist-sans': 'var(--font-geist-sans)',
            '--font-geist-mono': 'var(--font-geist-mono)',
          } as React.CSSProperties
        }
      >
        <Navbar />
        <main className="min-h-screen">
          {children} {/* 👈 Solo se renderiza AQUÍ */}
        </main>
      </body>
    </html>
  );
}