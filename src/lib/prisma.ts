// src/lib/prisma.ts (actualiza a esto)
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],          // explícito
        // Agrega esto para forzar compatibilidad en algunos casos
        __internal: { enableTracing: false },             // ← workaround temporal
    });
};

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export { prisma };