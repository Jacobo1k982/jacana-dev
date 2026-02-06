// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // prevent multiple instances in dev
  var __prisma: PrismaClient | undefined;
}

const client = global.__prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== "production") global.__prisma = client;

export const prisma = client; // exported as named
export default client;        // optional: keep default too