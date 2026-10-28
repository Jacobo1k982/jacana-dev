import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Servicios',
    description: 'Servicios de desarrollo: web, móvil, cloud, bases de datos, IA, APIs y consultoría técnica, con presupuesto fijo por proyecto.',
    alternates: { canonical: '/servicios' },
};

export default function ServiciosLayout({ children }: { children: React.ReactNode }) {
    return children;
}
