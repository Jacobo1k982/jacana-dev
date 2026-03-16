import Hero from '@/components/hero/hero';
import Navbar from '@/components/Navbar/navbar';
import TechSection from '@/components/TechSection';
import type { Metadata } from 'next';

// ─────────────────────────────────────────────
// METADATA — hereda el template del layout
// ─────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Estudio de desarrollo fullstack especializado en experiencias digitales de alto rendimiento. Web, móvil, cloud, IA y consultoría técnica.',
  alternates: { canonical: '/' },
};

// ─────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────

export default function Home() {
  return (
    <div className="bg-[#06051d] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <TechSection />
      </main>
    </div>
  );
}