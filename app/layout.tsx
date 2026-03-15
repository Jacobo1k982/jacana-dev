import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jacana Developers - Software Innovation",
  description: "Plataforma de desarrollo tecnológico con soluciones innovadoras. Analytics, automatización y servicios en la nube para tu negocio.",
  keywords: ["Jacana", "Developers", "Software", "Technology", "Analytics", "Cloud", "Automation"],
  authors: [{ name: "Jacana Developers Team" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Jacana Developers",
    description: "Innovación tecnológica para tu negocio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jacana Developers",
    description: "Innovación tecnológica para tu negocio",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
