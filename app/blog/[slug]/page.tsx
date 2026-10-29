import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';
import SectionBackdrop from '@/components/ui/SectionBackdrop';
import PostBody from '@/components/blog/PostBody';
import PostCard from '@/components/blog/PostCard';
import {
    formatPostDate,
    getAllPosts,
    getHeadings,
    getPostBySlug,
    getReadingTime,
    getRelatedPosts,
} from '@/lib/blog';

const BASE_URL = 'https://jacana-dev.com';
const DISPLAY = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) return {};
    return {
        title: post.title,
        description: post.excerpt,
        alternates: { canonical: `/blog/${post.slug}` },
        keywords: post.tags,
        authors: [{ name: post.author.name }],
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: `/blog/${post.slug}`,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author.name],
            tags: post.tags,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug);
    if (!post) notFound();

    const headings = getHeadings(post);
    const related = getRelatedPosts(post.slug, 2);
    const contactHref = post.contactService
        ? `/Contact?servicio=${encodeURIComponent(post.contactService)}`
        : '/Contact';

    // Datos estructurados para buscadores (se escapa "<" para que no cierre el <script>)
    const jsonLd = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        inLanguage: 'es-CR',
        keywords: post.tags.join(', '),
        mainEntityOfPage: `${BASE_URL}/blog/${post.slug}`,
        author: { '@type': 'Person', name: post.author.name },
        publisher: { '@type': 'Organization', name: 'Jacana Developers', url: BASE_URL },
    }).replace(/</g, '\\u003c');

    return (
        <main className="min-h-screen bg-[#0d1117]">
            <Navbar />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />

            <article className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-44">
                <SectionBackdrop variant="beam" />

                <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
                    <Link href="/blog" className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-lime-300">
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Todos los artículos
                    </Link>

                    <header className="mt-8 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                            <span className="text-lime-300">{post.category}</span>
                            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                            <span className="inline-flex items-center gap-1.5">
                                <Clock className="h-3 w-3" />
                                {getReadingTime(post)} min de lectura
                            </span>
                        </div>
                        <h1 className="mt-5 text-[2rem] sm:text-5xl md:text-6xl font-light leading-[1.1] tracking-tight text-white text-balance break-words" style={DISPLAY}>
                            {post.title}
                        </h1>
                        <p className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl leading-relaxed text-slate-400">{post.excerpt}</p>

                        <div className="mt-7 sm:mt-8 flex items-center gap-4 border-t border-slate-800/70 pt-6">
                            <span className="flex h-11 w-11 items-center justify-center border border-lime-400/40 bg-lime-400/10 text-sm font-semibold text-lime-300">
                                {post.author.name.charAt(0)}
                            </span>
                            <div>
                                <p className="text-sm font-medium text-white">{post.author.name}</p>
                                <p className="text-xs text-slate-400">{post.author.role}</p>
                            </div>
                        </div>
                    </header>

                    <div className="mt-10 sm:mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-16">
                        <div className="max-w-3xl">
                            <PostBody blocks={post.blocks} />

                            <div className="mt-12 sm:mt-16 border border-lime-400/25 bg-lime-400/[0.05] p-6 sm:p-8 md:p-10">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-lime-300">— ¿Quieres algo así?</p>
                                <p className="mt-3 text-xl sm:text-2xl md:text-3xl font-light text-white text-balance" style={DISPLAY}>
                                    Cuéntanos tu idea y la convertimos en un producto que funcione.
                                </p>
                                <Link
                                    href={contactHref}
                                    className="mt-6 flex w-full sm:w-auto sm:inline-flex items-center justify-center gap-3 bg-lime-400 px-6 sm:px-8 py-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] text-[#0d1117] transition-colors hover:bg-lime-300"
                                >
                                    Hablemos de tu proyecto
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        {headings.length > 1 && (
                            <aside className="hidden lg:block">
                                <nav aria-label="Contenido del artículo" className="sticky top-28 border-l border-slate-800/80 pl-5">
                                    <p className="mb-4 text-[10px] uppercase tracking-[0.25em] text-slate-500">En este artículo</p>
                                    <ul className="space-y-3">
                                        {headings.map((h) => (
                                            <li key={h.id}>
                                                <a href={`#${h.id}`} className="text-sm leading-snug text-slate-400 transition-colors hover:text-lime-300">
                                                    {h.text}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            </aside>
                        )}
                    </div>

                    {related.length > 0 && (
                        <section className="mt-16 sm:mt-24 border-t border-slate-800/70 pt-14">
                            <p className="mb-8 text-[10px] uppercase tracking-[0.3em] text-lime-400/80">— Sigue leyendo</p>
                            <div className="grid gap-8 md:grid-cols-2">
                                {related.map((p) => (
                                    <PostCard key={p.slug} post={p} />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </article>
        </main>
    );
}
