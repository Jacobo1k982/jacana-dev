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

export default function Home() {
  return (
    <div className="bg-[#090d13] min-h-screen">
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