import { MetadataRoute } from 'next'

const BASE_URL = 'https://jacana-dev.com'

// Rutas públicas con su prioridad. Al agregar una página nueva, súmala aquí.
const ROUTES: { path: string; priority: number }[] = [
  { path: '', priority: 1 },
  { path: '/servicios', priority: 0.9 },
  { path: '/projects', priority: 0.9 },
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
  return ROUTES.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority,
  }))
}
