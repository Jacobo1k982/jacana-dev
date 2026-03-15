import Navbar from '@/components/Navbar/navbar';
import ProjectsSection from '@/components/Projects/ProjectsSection';

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-[#06051d]">
            <Navbar />
            <ProjectsSection />
        </main>
    );
}
