-- 001_portal_clientes.sql
-- Portal de clientes: SOLO AGREGA (tipos, columnas con valor por defecto y tablas nuevas).
-- No borra ni modifica datos existentes. Es seguro correrlo más de una vez.
-- Ejecutar ANTES de publicar el código del portal. Ver prisma/manual/README.md.

BEGIN;

-- ── Tipos ───────────────────────────────────
DO $$ BEGIN CREATE TYPE "ProjectPhase" AS ENUM ('DISCOVERY','PLANNING','DEVELOPMENT','QA','DEPLOYMENT','SUPPORT'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "LinkKind" AS ENUM ('STAGING','PRODUCTION','DOCUMENT','DESIGN','OTHER'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "ApprovalStatus" AS ENUM ('PENDING','APPROVED','CHANGES_REQUESTED'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE TYPE "RequestStatus" AS ENUM ('NEW','CONTACTED','CONVERTED','CLOSED'); EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ── Columnas nuevas en projects (los proyectos existentes quedan con los valores por defecto) ──
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "phase" "ProjectPhase" NOT NULL DEFAULT 'DISCOVERY';
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "isClientProject" BOOLEAN NOT NULL DEFAULT false;

-- ── Tablas nuevas ───────────────────────────
CREATE TABLE IF NOT EXISTS "project_updates" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "authorId" TEXT,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "phase" "ProjectPhase",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "project_updates_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "project_comments" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "authorId" TEXT,
    "body" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "project_comments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "project_links" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "kind" "LinkKind" NOT NULL DEFAULT 'OTHER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "project_links_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "project_approvals" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "response" TEXT,
    "decidedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "project_approvals_pkey" PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "project_requests" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "timeline" TEXT,
    "links" TEXT,
    "status" "RequestStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "project_requests_pkey" PRIMARY KEY ("id")
);

-- ── Índices ─────────────────────────────────
CREATE INDEX IF NOT EXISTS "project_updates_projectId_idx" ON "project_updates"("projectId");
CREATE INDEX IF NOT EXISTS "project_comments_projectId_idx" ON "project_comments"("projectId");
CREATE INDEX IF NOT EXISTS "project_links_projectId_idx" ON "project_links"("projectId");
CREATE INDEX IF NOT EXISTS "project_approvals_projectId_idx" ON "project_approvals"("projectId");
CREATE INDEX IF NOT EXISTS "project_requests_userId_idx" ON "project_requests"("userId");

-- ── Llaves foráneas ─────────────────────────
DO $$ BEGIN ALTER TABLE "project_updates" ADD CONSTRAINT "project_updates_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "project_updates" ADD CONSTRAINT "project_updates_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "project_comments" ADD CONSTRAINT "project_comments_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "project_comments" ADD CONSTRAINT "project_comments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "project_links" ADD CONSTRAINT "project_links_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "project_approvals" ADD CONSTRAINT "project_approvals_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TABLE "project_requests" ADD CONSTRAINT "project_requests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

COMMIT;
