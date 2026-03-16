import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, DM_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/hooks/use-auth';

// ─────────────────────────────────────────────
// FONTS
// ─────────────────────────────────────────────

// Display / heading serif — matches the design system
const cormorant = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  preload: true,
});

// Monospace — code blocks, labels, tech stack pills
const dmMono = DM_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
  preload: false, // secondary font — lazy load is fine
});

// ─────────────────────────────────────────────
// METADATA
// ─────────────────────────────────────────────

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://jacana-dev.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: 'Jacana Developers — Fullstack Studio',
    template: '%s | Jacana Developers',
  },
  description:
    'Estudio de desarrollo fullstack especializado en experiencias digitales de alto rendimiento. Web, móvil, cloud, IA y consultoría técnica.',
  keywords: [
    'Jacana Developers', 'Fullstack Studio', 'Desarrollo Web', 'Aplicaciones Móviles',
    'Cloud DevOps', 'Inteligencia Artificial', 'Costa Rica', 'Software',
  ],
  authors: [{ name: 'Jacana Developers', url: BASE_URL }],
  creator: 'Jacana Developers',
  publisher: 'Jacana Developers',

  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon-32x32.png',
  },

  openGraph: {
    type: 'website',
    locale: 'es_CR',
    url: BASE_URL,
    siteName: 'Jacana Developers',
    title: 'Jacana Developers — Fullstack Studio',
    description: 'Estudio de desarrollo fullstack. Web, móvil, cloud e IA.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Jacana Developers',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    site: '@jacanadev',
    creator: '@jacanadev',
    title: 'Jacana Developers — Fullstack Studio',
    description: 'Estudio de desarrollo fullstack. Web, móvil, cloud e IA.',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: BASE_URL,
  },
};

// Viewport separated from metadata (Next.js 14+ requirement)
export const viewport: Viewport = {
  themeColor: '#080810',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
};

// ─────────────────────────────────────────────
// LAYOUT
// ─────────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className="dark"
    >
      <body
        className={`
                    ${cormorant.variable}
                    ${dmMono.variable}
                    antialiased bg-background text-foreground min-h-screen
                `}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}