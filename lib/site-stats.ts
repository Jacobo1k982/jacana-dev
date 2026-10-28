// Fuente única de las cifras públicas del sitio.
// Se calculan desde data/projects.json para que nunca se contradigan entre páginas.
import projectsData from '@/data/projects.json';

const projects = projectsData.projects;

export const SITE_STATS = {
    /** Proyectos listados en el portafolio */
    projects: projects.length,
    /** Productos propios (type === 'Producto propio') */
    ownProducts: projects.filter((p) => p.type === 'Producto propio').length,
    /** Años de experiencia (editar en data/projects.json → stats.yearsExperience) */
    years: projectsData.stats.yearsExperience,
} as const;
