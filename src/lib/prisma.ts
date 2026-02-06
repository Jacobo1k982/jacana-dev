// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'

declare global {
  // Allow a global Prisma client in dev to avoid creating multiple instances.
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

const prisma = globalThis.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

export default prisma