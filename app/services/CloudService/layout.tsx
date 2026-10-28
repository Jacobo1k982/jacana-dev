import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cloud y DevOps',
    description: 'Cloud y DevOps: despliegue con Docker, CI/CD y automatización de infraestructura.',
    alternates: { canonical: '/services/CloudService' },
};

export default function CloudServiceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
