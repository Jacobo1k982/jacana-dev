# Cambios manuales a la base de datos

El deploy (GitHub Actions) **no** modifica la base de datos y no hay carpeta `prisma/migrations`.
Los cambios de esquema se aplican a mano con estos archivos SQL, siempre en este orden:

1. Respaldo.
2. Ejecutar el SQL en el VPS.
3. Verificar.
4. Recién entonces publicar el código (`git push origin main`).

Así el código nuevo nunca encuentra tablas que no existen. Los scripts solo agregan, así que el
código anterior sigue funcionando mientras tanto.

## Pasos (en el VPS, dentro de /var/www/jacana-dev)

```bash
# 1. Respaldo
set -a; . ./.env; set +a
docker compose exec -T postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > ~/respaldo-$(date +%F).sql
ls -lh ~/respaldo-*.sql

# 2. Aplicar
docker compose exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -v ON_ERROR_STOP=1 < prisma/manual/001_portal_clientes.sql

# 3. Verificar (deben aparecer las 5 tablas project_*)
docker compose exec -T postgres psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "\dt project_*"
```

Para deshacer: `001_portal_clientes_rollback.sql` (borra solo lo del portal).
