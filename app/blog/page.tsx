import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';
import SectionBackdrop from '@/components/ui/SectionBackdrop';
import PostCard from '@/components/blog/PostCard';
import { getAllPosts } from '@/lib/blog';

export const metadata: Metadata = {
    title: 'Blog',
    description:
        'Casos reales, lecciones de ingeniería y guías para negocios en Costa Rica, escritos por quien construye el software.',
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Blog | Jacana Developers',
        description: 'Casos reales, lecciones de ingeniería y guías para negocios en Costa Rica.',
        url: '/blog',
        type: 'website',
    },
};

const DISPLAY = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;

export default function BlogPage() {
    const [latest, ...rest] = getAllPosts();

    return (
        <main className="min-h-screen bg-[#0d1117]">
            <Navbar />

            <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 md:pt-44 md:pb-32">
                <SectionBackdrop variant="spotlight" />

                <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
                    <header className="mb-10 sm:mb-14 md:mb-20 max-w-3xl">
                        <p className="mb-5 text-xs font-medium uppercase tracking-[0.3em] text-lime-400/80">— Blog</p>
                        <h1 className="text-[2.6rem] sm:text-6xl md:text-7xl font-light leading-[1.05] tracking-tight text-white" style={DISPLAY}>
                            Notas desde<br />
                            <span className="bg-gradient-to-r from-lime-300 via-lime-400 to-emerald-400 bg-clip-text text-transparent">el taller</span>
                        </h1>
                        <p className="mt-6 text-base md:text-lg leading-relaxed text-slate-400">
                            Lo que construimos, lo que se rompió y lo que aprendimos. Casos reales de nuestros productos,
                            lecciones de ingeniería y guías claras para negocios en Costa Rica.
                        </p>
                    </header>

                    {latest && (
                        <div className="mb-8">
                            <PostCard post={latest} featured />
                        </div>
                    )}

                    {rest.length > 0 && (
                        <div className="grid gap-8 md:grid-cols-2">
                            {rest.map((p) => (
                                <PostCard key={p.slug} post={p} />
                            ))}
                        </div>
                    )}

                    <div className="mt-14 sm:mt-20 flex flex-col items-stretch justify-between gap-6 border border-slate-800/70 bg-[#131923] p-6 sm:p-8 md:flex-row md:items-center md:p-10">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-lime-400/80">— ¿Hablamos?</p>
                            <p className="mt-3 text-2xl md:text-3xl font-light text-white" style={DISPLAY}>
                                ¿Tienes una idea o un sistema que mejorar?
                            </p>
                        </div>
                        <Link
                            href="/Contact"
                            className="flex shrink-0 items-center justify-center gap-3 bg-lime-400 px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-[#0d1117] transition-colors hover:bg-lime-300"
                        >
                            Cotiza tu proyecto
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
