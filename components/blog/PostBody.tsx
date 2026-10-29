// components/blog/PostBody.tsx
import { Lightbulb } from 'lucide-react';
import type { Block } from '@/lib/blog';
import { slugify } from '@/lib/blog';
import Inline from './Inline';

const DISPLAY = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;

export default function PostBody({ blocks }: { blocks: Block[] }) {
    return (
        <div className="space-y-6 text-[17px] leading-[1.8] text-slate-300">
            {blocks.map((b, i) => {
                switch (b.type) {
                    case 'h2':
                        return (
                            <h2 key={i} id={slugify(b.text)} className="scroll-mt-28 pt-8 text-3xl md:text-4xl font-light text-white leading-tight" style={DISPLAY}>
                                {b.text}
                            </h2>
                        );
                    case 'h3':
                        return <h3 key={i} className="pt-4 text-xl font-medium text-white">{b.text}</h3>;
                    case 'p':
                        return <p key={i}><Inline text={b.text} /></p>;
                    case 'ul':
                        return (
                            <ul key={i} className="space-y-2.5 pl-1">
                                {b.items.map((it, j) => (
                                    <li key={j} className="flex gap-3">
                                        <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full bg-lime-400/80" />
                                        <span><Inline text={it} /></span>
                                    </li>
                                ))}
                            </ul>
                        );
                    case 'ol':
                        return (
                            <ol key={i} className="space-y-3">
                                {b.items.map((it, j) => (
                                    <li key={j} className="flex gap-4">
                                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-lime-400/30 text-xs text-lime-300" style={{ fontFamily: 'var(--font-mono), monospace' }}>
                                            {j + 1}
                                        </span>
                                        <span><Inline text={it} /></span>
                                    </li>
                                ))}
                            </ol>
                        );
                    case 'code':
                        return (
                            <figure key={i} className="border border-slate-800/80 bg-[#0d1117]">
                                {b.lang && (
                                    <figcaption className="px-4 py-2 border-b border-slate-800/80 text-[10px] uppercase tracking-[0.2em] text-slate-500">{b.lang}</figcaption>
                                )}
                                <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed text-slate-200" style={{ fontFamily: 'var(--font-mono), ui-monospace, monospace' }}>
                                    <code>{b.code}</code>
                                </pre>
                            </figure>
                        );
                    case 'callout':
                        return (
                            <aside key={i} className="relative border border-lime-400/25 bg-lime-400/[0.05] p-5 md:p-6">
                                <div className="flex items-center gap-2 mb-2 text-[11px] uppercase tracking-[0.2em] text-lime-300">
                                    <Lightbulb className="h-3.5 w-3.5" />
                                    {b.title}
                                </div>
                                <p className="text-[15px] leading-relaxed text-slate-200"><Inline text={b.text} /></p>
                            </aside>
                        );
                    case 'quote':
                        return (
                            <blockquote key={i} className="border-l-2 border-lime-400/60 pl-5 text-2xl font-light italic text-slate-100 leading-snug" style={DISPLAY}>
                                <Inline text={b.text} />
                            </blockquote>
                        );
                }
            })}
        </div>
    );
}
