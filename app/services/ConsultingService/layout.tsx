import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Consultoría Técnica',
    description: 'Consultoría técnica: arquitectura, auditoría y optimización de tu software.',
    alternates: { canonical: '/services/ConsultingService' },
};

export default function ConsultingServiceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
