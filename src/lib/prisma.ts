// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient({
        log: ['query', 'info', 'warn', 'error'],
        // REMOVIDO: __internal: { enableTracing: false } 
        // Esto causa el error de compilación TypeScript. 
        // Si necesitas logs en consola durante desarrollo, la propiedad 'log' es suficiente.
    });
};

const prisma = globalThis.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export { prisma };