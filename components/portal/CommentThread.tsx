'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'
import { sendJson } from './api'
import { inputCls, btnPrimary, cardCls } from './ui'

export interface CommentItem {
    id: string
    body: string
    createdAt: string // ya formateada
    authorName: string
    fromTeam: boolean
}

export default function CommentThread({ projectId, comments }: { projectId: string; comments: CommentItem[] }) {
    const router = useRouter()
    const [text, setText] = useState('')
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function submit(e: React.FormEvent) {
        e.preventDefault()
        if (!text.trim()) return
        setBusy(true)
        setError(null)
        const r = await sendJson(`/api/portal/projects/${projectId}/comments`, 'POST', { body: text })
        setBusy(false)
        if (!r.ok) return setError(r.error)
        setText('')
        router.refresh()
    }

    return (
        <div className={`${cardCls} p-5 sm:p-6`}>
            {comments.length === 0 ? (
                <p className="text-sm text-slate-400">Todavía no hay mensajes. Escríbenos si tienes una duda o algo que añadir.</p>
            ) : (
                <ul className="space-y-4">
                    {comments.map((c) => (
                        <li key={c.id} className={`max-w-[90%] border px-4 py-3 ${c.fromTeam ? 'border-lime-400/30 bg-lime-400/[0.05]' : 'ml-auto border-slate-700/70 bg-[#0d1117]'}`}>
                            <p className="text-xs text-slate-400">
                                {c.fromTeam ? `${c.authorName} · Jacana Dev` : c.authorName} · {c.createdAt}
                            </p>
                            <p className="mt-1.5 whitespace-pre-wrap break-words text-sm text-slate-100">{c.body}</p>
                        </li>
                    ))}
                </ul>
            )}

            <form onSubmit={submit} className="mt-5 space-y-3">
                <label htmlFor={`comment-${projectId}`} className="sr-only">Tu mensaje</label>
                <textarea
                    id={`comment-${projectId}`}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={3}
                    maxLength={2000}
                    placeholder="Escribe tu mensaje…"
                    className={inputCls}
                />
                {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
                <button type="submit" disabled={busy || !text.trim()} className={btnPrimary}>
                    <Send className="h-4 w-4" aria-hidden="true" />
                    {busy ? 'Enviando…' : 'Enviar mensaje'}
                </button>
            </form>
        </div>
    )
}
