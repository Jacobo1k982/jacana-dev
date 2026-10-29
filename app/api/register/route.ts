// app/api/register/route.ts
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { validateEmail, validatePassword, validateUsername, validateName } from '@/lib/auth/password'
import { sendNewSignupNotification } from '@/lib/email'

// Límite por conexión: frena el registro masivo de cuentas falsas.
const WINDOW_MS = 60 * 60 * 1000
const MAX_ATTEMPTS = 8
const attempts = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(key: string): boolean {
    const now = Date.now()
    const entry = attempts.get(key)
    if (!entry || entry.resetAt < now) {
        attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
        return false
    }
    entry.count += 1
    return entry.count > MAX_ATTEMPTS
}

export async function POST(req: Request) {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    if (isRateLimited(ip)) {
        return NextResponse.json({ error: 'Demasiados intentos. Espera un rato e inténtalo de nuevo.' }, { status: 429 })
    }

    let body: Record<string, unknown>
    try {
        body = await req.json()
    } catch {
        return NextResponse.json({ error: 'Solicitud inválida.' }, { status: 400 })
    }

    const email = String(body.email ?? '').trim().toLowerCase()
    const password = String(body.password ?? '')
    const name = body.name ? String(body.name).trim() : undefined
    const username = body.username ? String(body.username).trim() : undefined

    // Se juntan todos los errores para que el formulario los muestre de una vez
    const details: Record<string, string[]> = {}
    if (!email || email.length > 254 || !validateEmail(email)) details.email = ['Formato de email inválido']
    if (password.length > 128) details.password = ['La contraseña es demasiado larga']
    else {
        const pw = validatePassword(password)
        if (!pw.valid) details.password = pw.errors
    }
    if (name) {
        const v = validateName(name)
        if (!v.valid) details.name = [v.error ?? 'Nombre inválido']
    }
    if (username) {
        const v = validateUsername(username)
        if (!v.valid) details.username = [v.error ?? 'Username inválido']
    }
    if (Object.keys(details).length > 0) {
        return NextResponse.json({ error: 'Datos inválidos', details }, { status: 400 })
    }

    const [emailTaken, usernameTaken] = await Promise.all([
        prisma.user.findFirst({ where: { email: { equals: email, mode: 'insensitive' } }, select: { id: true } }),
        username
            ? prisma.user.findFirst({ where: { username: { equals: username, mode: 'insensitive' } }, select: { id: true } })
            : Promise.resolve(null),
    ])
    if (emailTaken) {
        return NextResponse.json({ error: 'Ya existe una cuenta con ese email', details: { email: ['Este email ya está registrado'] } }, { status: 409 })
    }
    if (usernameTaken) {
        return NextResponse.json({ error: 'Username no disponible', details: { username: ['Este username ya está en uso'] } }, { status: 409 })
    }

    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({
        data: { email, name, username, password: hashed },
        select: { id: true, email: true, name: true, username: true },
    })

    // Aviso interno: no bloquea ni rompe el registro si el correo falla
    sendNewSignupNotification(user).then((r) => {
        if (!r.ok) console.error('[register] aviso de nueva cuenta no enviado:', r.error)
    })

    return NextResponse.json({ user }, { status: 201 })
}
