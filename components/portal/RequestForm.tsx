'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendJson } from './api'
import { inputCls, labelCls, btnPrimary, cardCls, DISPLAY } from './ui'
import { REQUEST_KINDS } from '@/lib/portal-shared'

export default function RequestForm() {
    const router = useRouter()
    const [kind, setKind] = useState<string>('')
    const [description, setDescription] = useState('')
    const [timeline, setTimeline] = useState('')
    const [links, setLinks] = useState('')
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [sent, setSent] = useState(false)

    async function submit(e: React.FormEvent) {
        e.preventDefault()
        setBusy(true)
        setError(null)
        const r = await sendJson('/api/portal/requests', 'POST', {
            kind, description, timeline: timeline || undefined, links: links || undefined,
        })
        setBusy(false)
        if (!r.ok) return setError(r.error)
        setSent(true)
        setKind(''); setDescription(''); setTimeline(''); setLinks('')
        router.refresh()
    }

    if (sent) {
        return (
            <div className={`${cardCls} border-lime-400/30 p-6`} role="status">
                <p className="text-xl font-light text-white" style={DISPLAY}>Recibimos tu solicitud</p>
                <p className="mt-2 text-sm text-slate-400">Te escribiremos al correo de tu cuenta con una propuesta. Cuando empecemos, tu proyecto aparecerá aquí.</p>
                <button type="button" onClick={() => setSent(false)} className="mt-4 text-sm text-lime-300 underline underline-offset-4 hover:text-lime-200">Enviar otra solicitud</button>
            </div>
        )
    }

    return (
        <form onSubmit={submit} className={`${cardCls} space-y-5 p-6`}>
            <div>
                <label htmlFor="req-kind" className={labelCls}>¿Qué necesitas?</label>
                <select id="req-kind" required value={kind} onChange={(e) => setKind(e.target.value)} className={inputCls}>
                    <option value="" disabled>Elige una opción</option>
                    {REQUEST_KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="req-desc" className={labelCls}>Cuéntanos tu idea o el problema que quieres resolver</label>
                <textarea id="req-desc" required minLength={20} maxLength={3000} rows={5} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} placeholder="Por ejemplo: tengo una panadería y quiero que mis clientes hagan pedidos en línea." />
                <p className="mt-1.5 text-xs text-slate-500">Mínimo 20 caracteres.</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
                <div>
                    <label htmlFor="req-time" className={labelCls}>¿Para cuándo lo necesitas? (opcional)</label>
                    <input id="req-time" maxLength={120} value={timeline} onChange={(e) => setTimeline(e.target.value)} className={inputCls} placeholder="Ej.: en 2 meses" />
                </div>
                <div>
                    <label htmlFor="req-links" className={labelCls}>Enlaces de referencia (opcional)</label>
                    <input id="req-links" maxLength={600} value={links} onChange={(e) => setLinks(e.target.value)} className={inputCls} placeholder="Tu sitio actual, ejemplos que te gusten…" />
                </div>
            </div>
            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={busy || !kind || description.trim().length < 20} className={btnPrimary}>
                {busy ? 'Enviando…' : 'Enviar solicitud'}
            </button>
        </form>
    )
}
