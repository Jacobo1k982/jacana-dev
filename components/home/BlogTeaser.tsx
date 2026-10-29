// components/home/BlogTeaser.tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
import PostCard from '@/components/blog/PostCard';
import SectionBackdrop from '@/components/ui/SectionBackdrop';

const DISPLAY = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;

export default function BlogTeaser() {
    const posts = getAllPosts().slice(0, 3);
    if (posts.length === 0) return null;

    return (
        <section aria-labelledby="blog-title" className="relative overflow-hidden bg-[#0d1117] py-20 sm:py-28">
            <SectionBackdrop variant="spotlight" />
            <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
                <header className="mb-10 flex flex-col gap-5 sm:mb-14 md:flex-row md:items-end md:justify-between">
                    <h2 id="blog-title" className="max-w-2xl text-balance text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl" style={DISPLAY}>
                        Notas desde el taller
                    </h2>
                    <Link href="/blog" className="group inline-flex items-center gap-3 text-sm font-medium text-lime-300 transition-colors hover:text-lime-200">
                        Ver todos los artículos
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                </header>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {posts.map((p) => (
                        <PostCard key={p.slug} post={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
