import type { Metadata } from 'next';
import Navbar from '@/components/Navbar/navbar';
import ProjectsSection from '@/components/Projects/ProjectsSection';

export const metadata: Metadata = {
    title: 'Portafolio',
    description: 'Portafolio de Jacana Dev: productos propios como DaxCloud y proyectos web y móviles reales.',
    alternates: { canonical: '/projects' },
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-[#090d13]">
            <Navbar />
            <ProjectsSection />
        </main>
    );
}
