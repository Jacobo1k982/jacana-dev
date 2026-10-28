import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Desarrollo Frontend',
    description: 'Desarrollo frontend con React y Next.js: interfaces rápidas, accesibles y a medida para tu negocio.',
    alternates: { canonical: '/services/FrontendService' },
};

export default function FrontendServiceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
