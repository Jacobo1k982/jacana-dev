-- Revierte 001_portal_clientes.sql. BORRA los datos del portal (avances, comentarios, enlaces,
-- aprobaciones y solicitudes). No toca usuarios ni proyectos existentes.
BEGIN;
DROP TABLE IF EXISTS "project_updates", "project_comments", "project_links", "project_approvals", "project_requests";
ALTER TABLE "projects" DROP COLUMN IF EXISTS "phase", DROP COLUMN IF EXISTS "isClientProject";
DROP TYPE IF EXISTS "ProjectPhase", "LinkKind", "ApprovalStatus", "RequestStatus";
COMMIT;
