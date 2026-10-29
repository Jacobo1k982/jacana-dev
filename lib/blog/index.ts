// lib/blog/index.ts
import type { Block, Post } from './types';
import { post as daxcloud } from './posts/daxcloud-saas-multi-negocio';
import { post as lecciones } from './posts/lecciones-construyendo-jacana-dev';
import { post as guia } from './posts/guia-software-negocios-costa-rica';

export type { Block, Post, PostCategory } from './types';

// Para publicar un artículo nuevo: crea su archivo en ./posts y agrégalo aquí.
const ALL_POSTS: Post[] = [daxcloud, lecciones, guia];

/** Más recientes primero. */
export function getAllPosts(): Post[] {
    return [...ALL_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | undefined {
    return ALL_POSTS.find((p) => p.slug === slug);
}

/** Otros artículos, priorizando la misma categoría. */
export function getRelatedPosts(slug: string, limit = 2): Post[] {
    const current = getPostBySlug(slug);
    const others = getAllPosts().filter((p) => p.slug !== slug);
    if (!current) return others.slice(0, limit);
    others.sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category));
    return others.slice(0, limit);
}

/** Texto plano del artículo (para tiempo de lectura). */
function plainText(blocks: Block[]): string {
    return blocks
        .map((b) => {
            switch (b.type) {
                case 'ul':
                case 'ol':
                    return b.items.join(' ');
                case 'code':
                    return '';
                case 'callout':
                    return `${b.title} ${b.text}`;
                default:
                    return b.text;
            }
        })
        .join(' ');
}

/** ~200 palabras por minuto, mínimo 1. */
export function getReadingTime(post: Post): number {
    const words = plainText(post.blocks).split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
}

export function formatPostDate(iso: string): string {
    return new Date(`${iso}T12:00:00`).toLocaleDateString('es-CR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

/** Encabezados h2 para el índice lateral. */
export function getHeadings(post: Post): { id: string; text: string }[] {
    return post.blocks
        .filter((b): b is Extract<Block, { type: 'h2' }> => b.type === 'h2')
        .map((b) => ({ id: slugify(b.text), text: b.text }));
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
