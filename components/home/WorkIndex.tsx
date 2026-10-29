// components/home/WorkIndex.tsx
// Índice editorial de proyectos reales (data/projects.json). Solo CSS: sin JS en el cliente.
import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { SITE_STATS } from '@/lib/site-stats';
import SectionBackdrop from '@/components/ui/SectionBackdrop';

const DISPLAY = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;
const VISIBLE = 7;

export default function WorkIndex() {
    // Primero los destacados; el resto en el orden del archivo.
    const ordered = [...projectsData.projects].sort((a, b) => Number(b.featured) - Number(a.featured));
    const rows = ordered.slice(0, VISIBLE);

    return (
        <section aria-labelledby="work-title" className="relative overflow-hidden bg-[#0d1117] py-20 sm:py-28">
            <SectionBackdrop variant="dots" />

            <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
                <header className="mb-10 flex flex-col gap-5 sm:mb-14 md:flex-row md:items-end md:justify-between">
                    <h2 id="work-title" className="max-w-2xl text-balance text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl" style={DISPLAY}>
                        Lo que hemos construido
                    </h2>
                    <p className="max-w-sm text-sm leading-relaxed text-slate-400 sm:text-base">
                        {SITE_STATS.projects} proyectos, {SITE_STATS.ownProducts} de ellos productos propios que operamos y mantenemos nosotros mismos.
                    </p>
                </header>

                <ul className="border-t border-slate-800/80">
                    {rows.map((p) => {
                        const isOwn = p.type === 'Producto propio';
                        const href = 'link' in p && p.link ? (p.link as string) : null;
                        const name = p.title.split(' — ')[0];
                        const subtitle = p.title.split(' — ')[1];

                        const inner = (
                            <>
                                <span
                                    aria-hidden="true"
                                    className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-lime-400 transition-transform duration-300 group-hover:scale-y-100 group-focus-visible:scale-y-100"
                                />
                                <span className="min-w-0 sm:pl-0">
                                    <span className="block truncate text-3xl font-light leading-tight text-white transition-transform duration-300 group-hover:translate-x-2 group-focus-visible:translate-x-2 sm:text-4xl md:text-5xl" style={DISPLAY}>
                                        {name}
                                    </span>
                                    {subtitle && <span className="mt-1 block text-sm text-slate-400">{subtitle}</span>}
                                </span>

                                <span className="hidden min-w-0 text-sm text-slate-400 lg:block">
                                    {p.technologies.slice(0, 4).join(', ')}
                                </span>

                                <span className="flex items-center justify-end gap-4 text-sm">
                                    <span className={isOwn ? 'text-lime-300' : 'text-slate-400'}>{p.type}</span>
                                    {href ? (
                                        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-500 transition-colors group-hover:text-lime-300" aria-hidden="true" />
                                    ) : (
                                        <span className="h-4 w-4 shrink-0" aria-hidden="true" />
                                    )}
                                </span>
                            </>
                        );

                        const base =
                            'group relative grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-8 gap-y-2 border-b border-slate-800/80 px-0 py-6 transition-colors sm:py-7 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] sm:px-4 hover:bg-lime-400/[0.04]';

                        return (
                            <li key={p.id}>
                                {href ? (
                                    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} outline-none focus-visible:bg-lime-400/[0.06]`} aria-label={`${name}: abrir sitio (se abre en una pestaña nueva)`}>
                                        {inner}
                                    </a>
                                ) : (
                                    <div className={base}>{inner}</div>
                                )}
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-10 sm:mt-12">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center gap-3 border border-slate-700 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:border-lime-400/60 hover:text-lime-300"
                    >
                        Ver los {SITE_STATS.projects} proyectos
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
