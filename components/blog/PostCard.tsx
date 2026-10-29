// components/blog/PostCard.tsx
import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { formatPostDate, getReadingTime, type Post } from '@/lib/blog';

const DISPLAY = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;

export default function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
    return (
        <article className={`group relative flex flex-col border border-slate-800/70 bg-[#131923] transition-colors hover:border-lime-400/40 focus-within:border-lime-400/60 ${featured ? 'md:p-10 p-6' : 'p-6'}`}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-lime-400/0 to-transparent group-hover:via-lime-400/60 transition-all duration-500" />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.2em] text-slate-400">
                <span className="text-lime-300">{post.category}</span>
                <span>{formatPostDate(post.date)}</span>
                <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {getReadingTime(post)} min de lectura
                </span>
            </div>

            <h3 className={`mt-4 font-light text-white leading-tight text-balance break-words ${featured ? 'text-2xl sm:text-3xl md:text-5xl' : 'text-xl sm:text-2xl'}`} style={DISPLAY}>
                <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
                    {post.title}
                </Link>
            </h3>

            <p className={`mt-4 text-slate-400 leading-relaxed ${featured ? 'text-base md:text-lg max-w-2xl' : 'text-sm'}`}>{post.excerpt}</p>

            <div className="mt-6 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                    <span key={t} className="px-2.5 py-1 text-[10px] uppercase tracking-[0.1em] border border-slate-700/70 text-slate-400">{t}</span>
                ))}
            </div>

            <div className="mt-auto pt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-lime-300">
                Leer artículo
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
        </article>
    );
}
