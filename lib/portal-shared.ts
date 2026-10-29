// lib/portal-shared.ts
// Constantes y utilidades del portal que se pueden usar tanto en servidor como en cliente
// (no importa auth ni prisma).

export const PHASES = ['DISCOVERY', 'PLANNING', 'DEVELOPMENT', 'QA', 'DEPLOYMENT', 'SUPPORT'] as const
export type Phase = (typeof PHASES)[number]

export const PHASE_LABELS: Record<Phase, string> = {
    DISCOVERY: 'Descubrimiento',
    PLANNING: 'Planificación',
    DEVELOPMENT: 'Desarrollo',
    QA: 'Pruebas y revisión',
    DEPLOYMENT: 'Publicación',
    SUPPORT: 'Soporte',
}

export const LINK_KINDS = ['STAGING', 'PRODUCTION', 'DOCUMENT', 'DESIGN', 'OTHER'] as const
export type LinkKindValue = (typeof LINK_KINDS)[number]

export const PROJECT_STATUSES = ['ACTIVE', 'PAUSED', 'COMPLETED'] as const
export const REQUEST_STATUSES = ['NEW', 'CONTACTED', 'CONVERTED', 'CLOSED'] as const
export const REQUEST_KINDS = ['Sitio web', 'Tienda en línea', 'Sistema de gestión', 'Aplicación móvil', 'Automatización o IA', 'Otro'] as const

export const PHASE_HINTS: Record<Phase, string> = {
    DISCOVERY: 'Entendemos tu negocio y definimos qué se va a construir.',
    PLANNING: 'Diseñamos la estructura y el plan de trabajo.',
    DEVELOPMENT: 'Construimos el proyecto y compartimos avances.',
    QA: 'Probamos y revisamos todo junto contigo.',
    DEPLOYMENT: 'Publicamos el proyecto en producción.',
    SUPPORT: 'Acompañamos y damos mantenimiento.',
}

export const STATUS_LABELS = { ACTIVE: 'Activo', PAUSED: 'En pausa', COMPLETED: 'Completado' } as const
export const LINK_KIND_LABELS: Record<LinkKindValue, string> = {
    STAGING: 'Sitio de pruebas', PRODUCTION: 'Sitio publicado', DOCUMENT: 'Documento', DESIGN: 'Diseño', OTHER: 'Enlace',
}
export const REQUEST_STATUS_LABELS = { NEW: 'Nueva', CONTACTED: 'Contactado', CONVERTED: 'Convertida en proyecto', CLOSED: 'Cerrada' } as const
export const APPROVAL_LABELS = { PENDING: 'Pendiente', APPROVED: 'Aprobada', CHANGES_REQUESTED: 'Cambios solicitados' } as const

export function formatDateTime(value: Date | string): string {
    return new Intl.DateTimeFormat('es-CR', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'America/Costa_Rica' }).format(new Date(value))
}
export function formatDate(value: Date | string): string {
    return new Intl.DateTimeFormat('es-CR', { dateStyle: 'long', timeZone: 'America/Costa_Rica' }).format(new Date(value))
}
