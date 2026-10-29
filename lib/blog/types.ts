// lib/blog/types.ts
// Los artículos son datos tipados (sin dependencias ni base de datos):
// se publican con un `git push`. Texto en línea soporta **negrita**, `código` y [enlace](/ruta).

export type Block =
    | { type: 'p'; text: string }
    | { type: 'h2'; text: string }
    | { type: 'h3'; text: string }
    | { type: 'ul'; items: string[] }
    | { type: 'ol'; items: string[] }
    | { type: 'code'; lang?: string; code: string }
    | { type: 'callout'; title: string; text: string }
    | { type: 'quote'; text: string };

export type PostCategory = 'Casos reales' | 'Ingeniería' | 'Guías para negocios';

export interface Post {
    slug: string;
    title: string;
    /** Resumen para tarjetas, buscadores y redes sociales (~150 caracteres). */
    excerpt: string;
    category: PostCategory;
    tags: string[];
    /** Fecha de publicación, formato ISO (YYYY-MM-DD). */
    date: string;
    author: { name: string; role: string };
    /** Servicio que se preselecciona en /Contact desde el cierre del artículo. */
    contactService?: string;
    blocks: Block[];
}
