// lib/portal.ts
// Utilidades compartidas del portal de clientes: identidad, permisos y validación.
// Regla de oro: TODA consulta de un cliente se filtra por su propio userId en el servidor.
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export * from './portal-shared'
import type { Phase } from './portal-shared'

export type PortalUser = {
    id: string
    email: string
    name: string | null
    role: 'USER' | 'ADMIN' | 'MODERATOR'
}

/** Usuario autenticado, leído de la base (el rol del token puede estar desactualizado). */
export async function getPortalUser(): Promise<PortalUser | null> {
    const session = await auth()
    const id = (session?.user as { id?: string } | undefined)?.id
    const email = session?.user?.email
    if (!id && !email) return null

    const user = id
        ? await prisma.user.findUnique({ where: { id }, select: { id: true, email: true, name: true, role: true, isActive: true } })
        : await prisma.user.findFirst({ where: { email: { equals: email!, mode: 'insensitive' } }, select: { id: true, email: true, name: true, role: true, isActive: true } })

    if (!user || !user.isActive) return null
    return { id: user.id, email: user.email, name: user.name, role: user.role as PortalUser['role'] }
}

export const fail = (error: string, status: number) => NextResponse.json({ error }, { status })

export async function readJson(req: Request): Promise<Record<string, unknown> | null> {
    try {
        const body = await req.json()
        return body && typeof body === 'object' && !Array.isArray(body) ? (body as Record<string, unknown>) : null
    } catch {
        return null
    }
}

/** Texto limpio y acotado. Devuelve null si falta o excede el máximo. */
export function cleanText(value: unknown, max: number, { min = 1 }: { min?: number } = {}): string | null {
    if (typeof value !== 'string') return null
    const v = value.trim()
    if (v.length < min || v.length > max) return null
    return v
}

/** Solo http(s): evita enlaces `javascript:` guardados por error o mala intención. */
export function cleanHttpUrl(value: unknown, max = 500): string | null {
    const v = cleanText(value, max)
    if (!v) return null
    try {
        const u = new URL(v)
        return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null
    } catch {
        return null
    }
}

export function isOneOf<T extends readonly string[]>(list: T, value: unknown): value is T[number] {
    return typeof value === 'string' && (list as readonly string[]).includes(value)
}

// Límite simple en memoria (por usuario o por IP). Suficiente para un solo servidor.
const buckets = new Map<string, { count: number; resetAt: number }>()
export function rateLimited(key: string, max: number, windowMs: number): boolean {
    const now = Date.now()
    const b = buckets.get(key)
    if (!b || b.resetAt < now) {
        buckets.set(key, { count: 1, resetAt: now + windowMs })
        return false
    }
    b.count += 1
    return b.count > max
}

/** Proyecto visible para este usuario: el admin ve todos; el cliente solo los suyos marcados como de cliente. */
export function projectScope(user: PortalUser, projectId: string) {
    return user.role === 'ADMIN'
        ? { id: projectId }
        : { id: projectId, userId: user.id, isClientProject: true }
}

/** Ejecuta sin bloquear la respuesta y deja el error en el log si falla. */
export function background(label: string, task: Promise<{ ok: boolean; error?: string } | void>) {
    task.then((r) => {
        if (r && !r.ok) console.error(`[portal] ${label}:`, r.error)
    }).catch((e) => console.error(`[portal] ${label}:`, e))
}
