import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/navbar';
import AboutSection from '@/components/About/AboutSection';

export const metadata: Metadata = {
    title: 'Sobre nosotros',
    description: 'Conoce a Jacana Dev: quiénes somos, cómo trabajamos y los valores detrás de cada proyecto.',
    alternates: { canonical: '/About' },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#06051d]">
            <Navbar />
            <AboutSection />
        </main>
    );
}
