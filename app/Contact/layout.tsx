import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contacto',
    description: 'Contáctanos para conversar sobre tu proyecto: desarrollo web, apps móviles, cloud, IA y consultoría técnica.',
    alternates: { canonical: '/Contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return children;
}
