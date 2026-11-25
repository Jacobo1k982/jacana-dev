-- 002_descargas.sql
-- Contador de descargas de apps (Finflow). SOLO AGREGA tablas nuevas; seguro de correr más de una vez.
-- Ejecutar ANTES de publicar el código. Ver prisma/manual/README.md.

BEGIN;

CREATE TABLE IF NOT EXISTS "app_downloads" (
    "slug" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "app_downloads_pkey" PRIMARY KEY ("slug")
);

CREATE TABLE IF NOT EXISTS "download_events" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "ipHash" TEXT NOT NULL,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "download_events_pkey" PRIMARY KEY ("id")
);

CREATE INDEX IF NOT EXISTS "download_events_slug_createdAt_idx" ON "download_events"("slug", "createdAt");
CREATE INDEX IF NOT EXISTS "download_events_slug_ipHash_createdAt_idx" ON "download_events"("slug", "ipHash", "createdAt");

COMMIT;
