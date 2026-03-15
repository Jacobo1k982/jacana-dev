import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';

const SALT_ROUNDS = 12;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const JWT_EXPIRES_IN = '7d';

// ============================================
// PASSWORD UTILITIES
// ============================================

/**
 * Hashea una contraseña usando bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Verifica una contraseña contra su hash
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

/**
 * Valida la fortaleza de una contraseña
 */
export function validatePassword(password: string): { valid: boolean; errors: string[]; strength: number } {
    const errors: string[] = [];
    let strength = 0;

    if (password.length < 8) {
        errors.push('La contraseña debe tener al menos 8 caracteres');
    } else {
        strength += 1;
    }

    if (password.length >= 12) {
        strength += 1;
    }

    if (/[A-Z]/.test(password)) {
        strength += 1;
    } else {
        errors.push('La contraseña debe contener al menos una mayúscula');
    }

    if (/[a-z]/.test(password)) {
        strength += 1;
    } else {
        errors.push('La contraseña debe contener al menos una minúscula');
    }

    if (/[0-9]/.test(password)) {
        strength += 1;
    } else {
        errors.push('La contraseña debe contener al menos un número');
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        strength += 1;
    }

    return {
        valid: errors.length === 0,
        errors,
        strength: Math.min(strength, 5)
    };
}

// ============================================
// EMAIL VALIDATION
// ============================================

/**
 * Valida un email
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// USERNAME VALIDATION
// ============================================

/**
 * Valida un username
 */
export function validateUsername(username: string): { valid: boolean; error?: string } {
    if (username.length < 3) {
        return { valid: false, error: 'El username debe tener al menos 3 caracteres' };
    }
    if (username.length > 20) {
        return { valid: false, error: 'El username no puede tener más de 20 caracteres' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return { valid: false, error: 'El username solo puede contener letras, números y guiones bajos' };
    }
    if (/^[0-9]+$/.test(username)) {
        return { valid: false, error: 'El username no puede ser solo números' };
    }
    return { valid: true };
}

// ============================================
// JWT UTILITIES
// ============================================

export interface JwtPayload {
    userId: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}

/**
 * Genera un token JWT
 */
export function generateToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

/**
 * Verifica y decodifica un token JWT
 */
export function verifyToken(token: string): JwtPayload | null {
    try {
        return jwt.verify(token, JWT_SECRET) as JwtPayload;
    } catch {
        return null;
    }
}

/**
 * Genera un token aleatorio para sesiones
 */
export function generateRandomToken(): string {
    return randomBytes(32).toString('hex');
}

/**
 * Genera fecha de expiración de sesión
 */
export function generateSessionExpiry(days: number = 7): Date {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + days);
    return expiry;
}

// ============================================
// NAME VALIDATION
// ============================================

/**
 * Valida un nombre
 */
export function validateName(name: string): { valid: boolean; error?: string } {
    if (name.length < 2) {
        return { valid: false, error: 'El nombre debe tener al menos 2 caracteres' };
    }
    if (name.length > 50) {
        return { valid: false, error: 'El nombre no puede tener más de 50 caracteres' };
    }
    if (!/^[a-zA-ZÀ-ÿ\s'-]+$/.test(name)) {
        return { valid: false, error: 'El nombre contiene caracteres inválidos' };
    }
    return { valid: true };
}
