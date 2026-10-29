'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { sendJson } from '../api'
import { inputCls } from '../ui'
import { REQUEST_STATUSES, REQUEST_STATUS_LABELS } from '@/lib/portal-shared'

export default function RequestStatusSelect({ id, status }: { id: string; status: string }) {
    const router = useRouter()
    const [value, setValue] = useState(status)
    const [error, setError] = useState<string | null>(null)

    async function change(next: string) {
        const prev = value
        setValue(next)
        setError(null)
        const r = await sendJson('/api/admin/portal/requests', 'PATCH', { id, status: next })
        if (!r.ok) { setValue(prev); setError(r.error); return }
        router.refresh()
    }

    return (
        <div>
            <label htmlFor={`rs-${id}`} className="sr-only">Estado de la solicitud</label>
            <select id={`rs-${id}`} value={value} onChange={(e) => change(e.target.value)} className={`${inputCls} py-1.5`}>
                {REQUEST_STATUSES.map((s) => <option key={s} value={s}>{REQUEST_STATUS_LABELS[s]}</option>)}
            </select>
            {error && <p role="alert" className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    )
}
