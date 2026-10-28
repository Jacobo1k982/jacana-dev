import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Bases de Datos',
    description: 'Diseño y administración de bases de datos con PostgreSQL y Prisma.',
    alternates: { canonical: '/services/DatabaseService' },
};

export default function DatabaseServiceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
