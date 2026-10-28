import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Inteligencia Artificial',
    description: 'Inteligencia artificial aplicada al negocio: modelos, visión por computadora y automatización.',
    alternates: { canonical: '/services/AIService' },
};

export default function AIServiceLayout({ children }: { children: React.ReactNode }) {
    return children;
}
