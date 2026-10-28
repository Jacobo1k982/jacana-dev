import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Aplicaciones Móviles',
    description: 'Aplicaciones móviles con React Native y Expo para iOS y Android.',
    alternates: { canonical: '/services/MobileService' },
};

export default function MobileServiceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
