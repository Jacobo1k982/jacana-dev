import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://jacana-dev.com'

// Rutas públicas con su prioridad. Al agregar una página nueva, súmala aquí.
const ROUTES: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/servicios', priority: 0.9 },
  { path: '/projects', priority: 0.9 },
  { path: '/blog', priority: 0.8 },
  { path: '/About', priority: 0.7 },
  { path: '/Contact', priority: 0.8 },
  { path: '/services/FrontendService', priority: 0.6 },
  { path: '/services/BackendService', priority: 0.6 },
  { path: '/services/MobileService', priority: 0.6 },
  { path: '/services/CloudService', priority: 0.6 },
  { path: '/services/DatabaseService', priority: 0.6 },
  { path: '/services/AIService', priority: 0.6 },
  { path: '/services/APIService', priority: 0.6 },
  { path: '/services/ConsultingService', priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ROUTES.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }))

  // Cada artículo del blog se agrega solo a partir de lib/blog
  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(`${p.date}T12:00:00`),
    changeFrequency: 'yearly',
    priority: 0.7,
  }))

  return [...pages, ...posts]
}
