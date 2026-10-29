'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Trash2 } from 'lucide-react'
import { sendJson } from '../api'
import { inputCls, labelCls, btnPrimary, btnGhost, cardCls, DISPLAY } from '../ui'
import { PHASES, PHASE_LABELS, LINK_KINDS, LINK_KIND_LABELS, type Phase } from '@/lib/portal-shared'

interface Props {
    project: { id: string; name: string; description: string | null; url: string | null; phase: string; status: string }
    links: { id: string; label: string; url: string; kind: string }[]
}

function useAction() {
    const router = useRouter()
    const [busy, setBusy] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [ok, setOk] = useState<string | null>(null)
    async function run(fn: () => Promise<{ ok: boolean; error?: string }>, success: string, after?: () => void) {
        setBusy(true); setError(null); setOk(null)
        const r = await fn()
        setBusy(false)
        if (!r.ok) return setError(r.error ?? 'No se pudo completar la acción.')
        setOk(success); after?.(); router.refresh()
    }
    return { busy, error, ok, run }
}

function Feedback({ error, ok }: { error: string | null; ok: string | null }) {
    return (
        <>
            {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
            {ok && <p role="status" className="text-sm text-emerald-300">{ok}</p>}
        </>
    )
}

export default function AdminProjectPanel({ project, links }: Props) {
    // Ajustes del proyecto
    const s = useAction()
    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description ?? '')
    const [url, setUrl] = useState(project.url ?? '')
    const [phase, setPhase] = useState(project.phase)
    const [status, setStatus] = useState(project.status)

    // Nuevo avance
    const u = useAction()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [movePhase, setMovePhase] = useState('')
    const [notify, setNotify] = useState(true)

    // Enlaces
    const l = useAction()
    const [label, setLabel] = useState('')
    const [linkUrl, setLinkUrl] = useState('')
    const [kind, setKind] = useState('STAGING')

    // Aprobaciones
    const a = useAction()
    const [aTitle, setATitle] = useState('')
    const [aDesc, setADesc] = useState('')

    const base = `/api/admin/portal/projects/${project.id}`

    return (
        <div className="space-y-8">
            <section aria-labelledby="ap-settings" className={`${cardCls} space-y-4 p-5`}>
                <h2 id="ap-settings" className="text-xl font-light text-white" style={DISPLAY}>Ajustes del proyecto</h2>
                <form
                    className="space-y-4"
                    onSubmit={(e) => { e.preventDefault(); s.run(() => sendJson(base, 'PATCH', { name, description, url, phase, status }), 'Cambios guardados.') }}
                >
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div><label htmlFor="ps-name" className={labelCls}>Nombre</label><input id="ps-name" required maxLength={120} value={name} onChange={(e) => setName(e.target.value)} className={inputCls} /></div>
                        <div><label htmlFor="ps-url" className={labelCls}>Sitio del proyecto (opcional)</label><input id="ps-url" type="url" value={url} onChange={(e) => setUrl(e.target.value)} className={inputCls} placeholder="https://" /></div>
                    </div>
                    <div><label htmlFor="ps-desc" className={labelCls}>Descripción</label><textarea id="ps-desc" rows={2} maxLength={2000} value={description} onChange={(e) => setDescription(e.target.value)} className={inputCls} /></div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="ps-phase" className={labelCls}>Etapa</label>
                            <select id="ps-phase" value={phase} onChange={(e) => setPhase(e.target.value)} className={inputCls}>
                                {PHASES.map((p) => <option key={p} value={p}>{PHASE_LABELS[p]}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="ps-status" className={labelCls}>Estado</label>
                            <select id="ps-status" value={status} onChange={(e) => setStatus(e.target.value)} className={inputCls}>
                                <option value="ACTIVE">Activo</option><option value="PAUSED">En pausa</option><option value="COMPLETED">Completado</option>
                            </select>
                        </div>
                    </div>
                    <Feedback error={s.error} ok={s.ok} />
                    <button type="submit" disabled={s.busy} className={btnPrimary}>{s.busy ? 'Guardando…' : 'Guardar cambios'}</button>
                </form>
            </section>

            <section aria-labelledby="ap-update" className={`${cardCls} space-y-4 p-5`}>
                <h2 id="ap-update" className="text-xl font-light text-white" style={DISPLAY}>Publicar un avance</h2>
                <form
                    className="space-y-4"
                    onSubmit={(e) => {
                        e.preventDefault()
                        u.run(() => sendJson(`${base}/updates`, 'POST', { title, body, phase: movePhase || undefined, notify }), 'Avance publicado.', () => { setTitle(''); setBody(''); setMovePhase('') })
                    }}
                >
                    <div><label htmlFor="up-title" className={labelCls}>Título</label><input id="up-title" required maxLength={120} value={title} onChange={(e) => setTitle(e.target.value)} className={inputCls} placeholder="Ej.: Terminamos el inicio de sesión" /></div>
                    <div><label htmlFor="up-body" className={labelCls}>Detalle (lo lee el cliente)</label><textarea id="up-body" required rows={4} maxLength={5000} value={body} onChange={(e) => setBody(e.target.value)} className={inputCls} /></div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label htmlFor="up-phase" className={labelCls}>Cambiar de etapa (opcional)</label>
                            <select id="up-phase" value={movePhase} onChange={(e) => setMovePhase(e.target.value)} className={inputCls}>
                                <option value="">Mantener la etapa actual</option>
                                {PHASES.map((p) => <option key={p} value={p}>{PHASE_LABELS[p as Phase]}</option>)}
                            </select>
                        </div>
                        <label className="flex items-center gap-2.5 self-end pb-2.5 text-sm text-slate-300">
                            <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="h-4 w-4 accent-lime-400" />
                            Avisar al cliente por correo
                        </label>
                    </div>
                    <Feedback error={u.error} ok={u.ok} />
                    <button type="submit" disabled={u.busy} className={btnPrimary}>{u.busy ? 'Publicando…' : 'Publicar avance'}</button>
                </form>
            </section>

            <section aria-labelledby="ap-approval" className={`${cardCls} space-y-4 p-5`}>
                <h2 id="ap-approval" className="text-xl font-light text-white" style={DISPLAY}>Pedir aprobación de una entrega</h2>
                <form
                    className="space-y-4"
                    onSubmit={(e) => { e.preventDefault(); a.run(() => sendJson(`${base}/approvals`, 'POST', { title: aTitle, description: aDesc || undefined }), 'Entrega enviada al cliente.', () => { setATitle(''); setADesc('') }) }}
                >
                    <div><label htmlFor="ar-title" className={labelCls}>Qué debe revisar</label><input id="ar-title" required maxLength={120} value={aTitle} onChange={(e) => setATitle(e.target.value)} className={inputCls} placeholder="Ej.: Diseño de la página de inicio" /></div>
                    <div><label htmlFor="ar-desc" className={labelCls}>Indicaciones (opcional)</label><textarea id="ar-desc" rows={3} maxLength={2000} value={aDesc} onChange={(e) => setADesc(e.target.value)} className={inputCls} /></div>
                    <Feedback error={a.error} ok={a.ok} />
                    <button type="submit" disabled={a.busy} className={btnPrimary}>{a.busy ? 'Enviando…' : 'Enviar al cliente'}</button>
                </form>
            </section>

            <section aria-labelledby="ap-links" className={`${cardCls} space-y-4 p-5`}>
                <h2 id="ap-links" className="text-xl font-light text-white" style={DISPLAY}>Enlaces compartidos</h2>
                {links.length > 0 && (
                    <ul className="divide-y divide-slate-800/70 border border-slate-800/70">
                        {links.map((x) => (
                            <li key={x.id} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm">
                                <span className="min-w-0"><span className="block truncate text-slate-200">{x.label}</span><span className="text-xs text-slate-500">{LINK_KIND_LABELS[x.kind as keyof typeof LINK_KIND_LABELS]}</span></span>
                                <button type="button" aria-label={`Quitar el enlace ${x.label}`} disabled={l.busy} onClick={() => l.run(() => sendJson(`${base}/links`, 'DELETE', { linkId: x.id }), 'Enlace quitado.')} className="p-2 text-slate-400 hover:text-red-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400/60">
                                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <form
                    className="space-y-4"
                    onSubmit={(e) => { e.preventDefault(); l.run(() => sendJson(`${base}/links`, 'POST', { label, url: linkUrl, kind }), 'Enlace agregado.', () => { setLabel(''); setLinkUrl('') }) }}
                >
                    <div className="grid gap-4 sm:grid-cols-[1fr_1.4fr_180px]">
                        <div><label htmlFor="ln-label" className={labelCls}>Nombre</label><input id="ln-label" required maxLength={80} value={label} onChange={(e) => setLabel(e.target.value)} className={inputCls} /></div>
                        <div><label htmlFor="ln-url" className={labelCls}>URL</label><input id="ln-url" type="url" required value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className={inputCls} placeholder="https://" /></div>
                        <div>
                            <label htmlFor="ln-kind" className={labelCls}>Tipo</label>
                            <select id="ln-kind" value={kind} onChange={(e) => setKind(e.target.value)} className={inputCls}>
                                {LINK_KINDS.map((k) => <option key={k} value={k}>{LINK_KIND_LABELS[k]}</option>)}
                            </select>
                        </div>
                    </div>
                    <Feedback error={l.error} ok={l.ok} />
                    <button type="submit" disabled={l.busy} className={btnGhost}>Agregar enlace</button>
                </form>
            </section>
        </div>
    )
}
