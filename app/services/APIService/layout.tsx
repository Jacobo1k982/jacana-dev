import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'APIs e Integraciones',
    description: 'Diseño e integración de APIs: REST, webhooks y conexión entre sistemas.',
    alternates: { canonical: '/services/APIService' },
};

export default function APIServiceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
