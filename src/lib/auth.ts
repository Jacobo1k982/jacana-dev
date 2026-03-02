import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth-config";
import { db } from "./db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// Obtener sesión actual
export async function getSession() {
    return getServerSession(authOptions);
}

// Obtener usuario actual
export async function getCurrentUser() {
    const session = await getSession();
    return session?.user;
}

// Hashear contraseña
export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
}

// Verificar contraseña
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

// Generar token aleatorio
export function generateToken(): string {
    return crypto.randomBytes(32).toString("hex");
}

// Registrar usuario
export async function registerUser(name: string, email: string, password: string) {
    const existingUser = await db.user.findUnique({
        where: { email: email.toLowerCase() },
    });

    if (existingUser) {
        return { success: false, error: "Ya existe una cuenta con este email" };
    }

    const hashedPassword = await hashPassword(password);

    const user = await db.user.create({
        data: {
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        },
    });

    return { success: true, user };
}

// Generar token de verificación
export async function generateVerificationToken(userId: number) {
    const token = generateToken();

    await db.user.update({
        where: { id: userId },
        data: { verificationToken: token },
    });

    return token;
}

// Verificar email
export async function verifyEmail(token: string) {
    const user = await db.user.findFirst({
        where: { verificationToken: token },
    });

    if (!user) {
        return { success: false, error: "Token inválido" };
    }

    await db.user.update({
        where: { id: user.id },
        data: {
            emailVerified: new Date(),
            verificationToken: null,
        },
    });

    return { success: true };
}

// Generar token de reset
export async function generateResetToken(email: string) {
    const user = await db.user.findUnique({
        where: { email: email.toLowerCase() },
    });

    if (!user) {
        return { success: true, token: null }; // No revelar si existe
    }

    const token = generateToken();
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await db.user.update({
        where: { id: user.id },
        data: {
            resetToken: token,
            resetTokenExpires: expires,
        },
    });

    return { success: true, token };
}

// Resetear contraseña
export async function resetPassword(token: string, newPassword: string) {
    const user = await db.user.findFirst({
        where: {
            resetToken: token,
            resetTokenExpires: { gte: new Date() },
        },
    });

    if (!user) {
        return { success: false, error: "Token inválido o expirado" };
    }

    const hashedPassword = await hashPassword(newPassword);

    await db.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpires: null,
        },
    });

    return { success: true };
}