-- Deshace 002_descargas.sql (borra el historial y el contador de descargas)
BEGIN;
DROP TABLE IF EXISTS "download_events";
DROP TABLE IF EXISTS "app_downloads";
COMMIT;
