'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, MessageSquareWarning } from 'lucide-react'
import { sendJson } from './api'
import { inputCls, btnPrimary, btnGhost, cardCls } from './ui'
import { APPROVAL_LABELS } from '@/lib/portal-shared'

export interface ApprovalItem {
    id: string
    title: string
    description: string | null
    status: 'PENDING' | 'APPROVED' | 'CHANGES_REQUESTED'
    response: string | null
    decidedAt: string | null
}

export default function ApprovalCard({ approval, canDecide }: { approval: ApprovalItem; canDecide: boolean }) {
    const router = useRouter()
    const [asking, setAsking] = useState(false)
    const [note, setNote] = useState('')
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function decide(decision: 'APPROVED' | 'CHANGES_REQUESTED') {
        setBusy(true)
        setError(null)
        const r = await sendJson(`/api/portal/approvals/${approval.id}`, 'POST', { decision, response: note || undefined })
        setBusy(false)
        if (!r.ok) return setError(r.error)
        router.refresh()
    }

    const pending = approval.status === 'PENDING'
    return (
        <div className={`${cardCls} p-5 ${pending ? 'border-lime-400/40' : ''}`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                    <p className="text-base font-medium text-white">{approval.title}</p>
                    {approval.description && <p className="mt-1.5 whitespace-pre-wrap break-words text-sm text-slate-400">{approval.description}</p>}
                </div>
                <span className={`shrink-0 border px-2.5 py-1 text-xs ${
                    approval.status === 'APPROVED' ? 'border-emerald-400/40 text-emerald-300'
                    : approval.status === 'CHANGES_REQUESTED' ? 'border-amber-400/40 text-amber-300'
                    : 'border-lime-400/40 text-lime-300'
                }`}>
                    {APPROVAL_LABELS[approval.status]}
                </span>
            </div>

            {!pending && (
                <p className="mt-3 text-xs text-slate-400">
                    {approval.decidedAt && `Respondida el ${approval.decidedAt}.`} {approval.response && `“${approval.response}”`}
                </p>
            )}

            {pending && canDecide && (
                <div className="mt-4 space-y-3">
                    {asking && (
                        <div>
                            <label htmlFor={`note-${approval.id}`} className="mb-1.5 block text-xs text-slate-400">¿Qué hay que cambiar?</label>
                            <textarea id={`note-${approval.id}`} value={note} onChange={(e) => setNote(e.target.value)} rows={3} maxLength={2000} className={inputCls} />
                        </div>
                    )}
                    {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
                    <div className="flex flex-wrap gap-3">
                        {!asking && (
                            <button type="button" disabled={busy} onClick={() => decide('APPROVED')} className={btnPrimary}>
                                <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> Aprobar entrega
                            </button>
                        )}
                        {asking ? (
                            <>
                                <button type="button" disabled={busy || !note.trim()} onClick={() => decide('CHANGES_REQUESTED')} className={btnPrimary}>
                                    {busy ? 'Enviando…' : 'Enviar cambios'}
                                </button>
                                <button type="button" disabled={busy} onClick={() => { setAsking(false); setNote(''); setError(null) }} className={btnGhost}>Cancelar</button>
                            </>
                        ) : (
                            <button type="button" disabled={busy} onClick={() => setAsking(true)} className={btnGhost}>
                                <MessageSquareWarning className="h-4 w-4" aria-hidden="true" /> Pedir cambios
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
