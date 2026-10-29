// Llamada JSON mínima para las pantallas del portal. Nunca lanza: devuelve { ok, error }.
export async function sendJson(url: string, method: 'POST' | 'PATCH' | 'DELETE', body?: unknown): Promise<{ ok: true; error?: undefined } | { ok: false; error: string }> {
    try {
        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: body === undefined ? undefined : JSON.stringify(body),
        })
        if (res.ok) return { ok: true }
        const data = await res.json().catch(() => ({}))
        return { ok: false, error: typeof data?.error === 'string' ? data.error : 'No se pudo completar la acción. Inténtalo de nuevo.' }
    } catch {
        return { ok: false, error: 'No hay conexión con el servidor. Revisa tu internet e inténtalo de nuevo.' }
    }
}
