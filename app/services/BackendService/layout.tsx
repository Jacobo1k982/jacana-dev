import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Desarrollo Backend',
    description: 'Desarrollo backend con Node.js y NestJS: APIs, lógica de negocio y arquitectura escalable.',
    alternates: { canonical: '/services/BackendService' },
};

export default function BackendServiceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
