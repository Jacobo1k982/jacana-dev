import Hero from '@/components/hero/hero';
import Navbar from '@/components/Navbar/navbar';
import DaxCloudShowcase from '@/components/FeaturedProduct/DaxCloudShowcase';
import TechSection from '@/components/TechSection';
import WorkIndex from '@/components/home/WorkIndex';
import ServicesStrip from '@/components/home/ServicesStrip';
import BlogTeaser from '@/components/home/BlogTeaser';
import FinalCta from '@/components/home/FinalCta';
import type { Metadata } from 'next';

// ─────────────────────────────────────────────
// METADATA — hereda el template del layout
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  // absolute: evita el sufijo de la plantilla; la pestaña del navegador muestra solo este título
  title: { absolute: 'Jacana Developers | Desarrollo de Software a la Medida' },
  description: 'Estudio de desarrollo fullstack especializado en experiencias digitales de alto rendimiento. Web, móvil, cloud, IA y consultoría técnica.',
  alternates: { canonical: '/' },
};

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

// Datos estructurados de la organización: solo información pública y verificable del sitio.
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://jacana-dev.com';
const orgJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Jacana Developers',
      alternateName: 'Jacana Dev',
      url: BASE_URL,
      logo: `${BASE_URL}/logo-mark.png`,
      foundingDate: '2024',
      email: 'soporte@jacana-dev.com',
      telephone: '+506 8790 5876',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'San Pedro, Montes de Oca',
        addressCountry: 'CR',
      },
      sameAs: ['https://www.facebook.com/profile.php?id=61594578440714', 'https://www.tiktok.com/@jacanadev'],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Jacana Developers',
      inLanguage: 'es-CR',
      publisher: { '@id': `${BASE_URL}/#organization` },
    },
  ],
}).replace(/</g, '\\u003c');

export default function Home() {
  return (
    <div className="bg-[#090d13] min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: orgJsonLd }} />
      <Navbar />
      <main>
        <Hero />
        <DaxCloudShowcase />
        <WorkIndex />
        <ServicesStrip />
        <TechSection />
        <BlogTeaser />
        <FinalCta />
      </main>
    </div>
  );
}