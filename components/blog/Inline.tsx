// components/blog/Inline.tsx
// Renderiza **negrita**, `código` y [texto](enlace) dentro de un párrafo. Solo servidor.
import Link from 'next/link';
import type { ReactNode } from 'react';

const TOKEN = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

export default function Inline({ text }: { text: string }) {
    const parts = text.split(TOKEN).filter(Boolean);
    const nodes: ReactNode[] = parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
            return (
                <code key={i} className="px-1.5 py-0.5 rounded-sm bg-slate-800/70 border border-slate-700/60 text-[0.85em] text-lime-300" style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace' }}>
                    {part.slice(1, -1)}
                </code>
            );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
            const [, label, href] = link;
            const external = /^https?:\/\//.test(href);
            return external ? (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="text-lime-300 underline underline-offset-4 decoration-lime-400/40 hover:decoration-lime-300 transition-colors">{label}</a>
            ) : (
                <Link key={i} href={href} className="text-lime-300 underline underline-offset-4 decoration-lime-400/40 hover:decoration-lime-300 transition-colors">{label}</Link>
            );
        }
        return <span key={i}>{part}</span>;
    });
    return <>{nodes}</>;
}
