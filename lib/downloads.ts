// lib/downloads.ts — apps descargables y conteo
// El archivo vive en el VPS (/var/www/finflow-downloads, montado en /downloads) o, de respaldo, en una URL externa.
// Los visitantes siempre pasan por /api/download/<slug>, que cuenta y luego redirige.

export const DOWNLOADS = {
    finflow: {
        name: 'Finflow',
        envVar: 'FINFLOW_APK_URL', // opcional: URL externa de respaldo si no hay archivo local
        file: process.env.FINFLOW_APK_PATH || '/downloads/finflow.apk', // carpeta del VPS montada en el contenedor
        versionFile: process.env.FINFLOW_VERSION_PATH || '/downloads/version.json',
        downloadName: 'finflow.apk',
    },
} as const

export type DownloadSlug = keyof typeof DOWNLOADS

export function isDownloadSlug(value: string): value is DownloadSlug {
    return Object.prototype.hasOwnProperty.call(DOWNLOADS, value)
}

/** Cuántas descargas se muestran públicamente a partir de este número (antes se oculta el contador). */
export const MIN_PUBLIC_COUNT = 10

/** Solo http(s). Devuelve null si falta o no es válida. */
export function downloadTarget(slug: DownloadSlug): string | null {
    const raw = process.env[DOWNLOADS[slug].envVar]?.trim()
    if (!raw) return null
    try {
        const u = new URL(raw)
        return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null
    } catch {
        return null
    }
}

const BOT_UA = /bot|crawl|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|discord|curl|wget|python-requests|headless|lighthouse|monitor|uptime/i
export function isBot(userAgent: string | null): boolean {
    return !userAgent || BOT_UA.test(userAgent)
}
