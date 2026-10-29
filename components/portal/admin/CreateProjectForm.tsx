'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendJson } from '../api'
import { inputCls, labelCls, btnPrimary, cardCls } from '../ui'
import { PHASES, PHASE_LABELS } from '@/lib/portal-shared'

export default function CreateProjectForm({ defaultEmail = '' }: { defaultEmail?: string }) {
    const router = useRouter()
    const [clientEmail, setClientEmail] = useState(defaultEmail)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [phase, setPhase] = useState('DISCOVERY')
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [ok, setOk] = useState(false)

    async function submit(e: React.FormEvent) {
        e.preventDefault()
        setBusy(true); setError(null); setOk(false)
        const r = await sendJson('/api/admin/portal/projects', 'POST', { clientEmail, name, description: description || undefined, phase })
        setBusy(false)
        if (!r.ok) return setError(r.error)
        setOk(true); setName(''); setDescription('')
        router.refresh()
    }

    return (
        <form onSubmit={submit} className={`${cardCls} space-y-4 p-5`}>
            <div className="grid gap-4 sm:grid-cols-2">
                <div>
                    <label htmlFor="cp-email" className={labelCls}>Correo del cliente (debe tener cuenta)</label>
                    <input id="cp-email" type="email" required value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label htmlFor="cp-name" className={labelCls}>Nombre del proyecto</label>
                    <input id="cp-name" required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} className={inputCls} />
                </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-[1fr_220px]">
                <div>
                    <label htmlFor="cp-desc" className={labelCls}>Descripción (la ve el cliente)</label>
                    <input id="cp-desc" maxLength={2000} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} />
                </div>
                <div>
                    <label htmlFor="cp-phase" className={labelCls}>Etapa inicial</label>
                    <select id="cp-phase" value={phase} onChange={(e) => setPhase(e.target.value)} className={inputCls}>
                        {PHASES.map((p) => <option key={p} value={p}>{PHASE_LABELS[p]}</option>)}
                    </select>
                </div>
            </div>
            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
            {ok && <p role="status" className="text-sm text-emerald-300">Proyecto creado y cliente avisado.</p>}
            <button type="submit" disabled={busy} className={btnPrimary}>{busy ? 'Creando…' : 'Crear proyecto'}</button>
        </form>
    )
}
