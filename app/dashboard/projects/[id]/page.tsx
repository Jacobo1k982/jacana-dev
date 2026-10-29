// app/dashboard/projects/[id]/page.tsx — detalle de un proyecto para el cliente
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getPortalUser, projectScope } from '@/lib/portal'
import { PHASE_LABELS, STATUS_LABELS, LINK_KIND_LABELS, formatDate, formatDateTime, type Phase, type LinkKindValue } from '@/lib/portal-shared'
import PhaseStepper from '@/components/portal/PhaseStepper'
import CommentThread from '@/components/portal/CommentThread'
import ApprovalCard from '@/components/portal/ApprovalCard'
import { cardCls, DISPLAY } from '@/components/portal/ui'

export const metadata = { title: 'Proyecto' }

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const user = await getPortalUser()
    if (!user) redirect('/login')
    const { id } = await params

    const project = await prisma.project.findFirst({
        where: projectScope(user, id),
        select: {
            id: true, name: true, description: true, status: true, phase: true, url: true, createdAt: true, updatedAt: true,
            updates: { orderBy: { createdAt: 'desc' }, take: 100, select: { id: true, title: true, body: true, phase: true, createdAt: true, author: { select: { name: true } } } },
            comments: { orderBy: { createdAt: 'asc' }, take: 300, select: { id: true, body: true, createdAt: true, author: { select: { name: true, role: true } } } },
            links: { orderBy: { createdAt: 'asc' }, select: { id: true, label: true, url: true, kind: true } },
            approvals: { orderBy: { createdAt: 'desc' }, select: { id: true, title: true, description: true, status: true, response: true, decidedAt: true } },
        },
    })
    if (!project) notFound()

    // Solo el dueño del proyecto responde las entregas; el admin que mira no decide por el cliente
    const isOwner = user.role !== 'ADMIN'
    const pending = project.approvals.filter((a) => a.status === 'PENDING')
    const past = project.approvals.filter((a) => a.status !== 'PENDING')
    const toItem = (a: (typeof project.approvals)[number]) => ({
        id: a.id, title: a.title, description: a.description, status: a.status as 'PENDING' | 'APPROVED' | 'CHANGES_REQUESTED',
        response: a.response, decidedAt: a.decidedAt ? formatDateTime(a.decidedAt) : null,
    })

    return (
        <div className="space-y-10">
            <div>
                <Link href="/dashboard/projects" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-lime-300">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Mis proyectos
                </Link>
                <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
                    <div className="min-w-0">
                        <h1 className="text-3xl font-light text-white sm:text-4xl" style={DISPLAY}>{project.name}</h1>
                        {project.description && <p className="mt-2 max-w-2xl text-sm text-slate-400">{project.description}</p>}
                    </div>
                    <span className="shrink-0 border border-slate-700 px-3 py-1.5 text-sm text-slate-200">{STATUS_LABELS[project.status as keyof typeof STATUS_LABELS]}</span>
                </div>
            </div>

            <section aria-labelledby="stage-title" className="space-y-4">
                <h2 id="stage-title" className="text-xl font-light text-white" style={DISPLAY}>Etapa actual</h2>
                <PhaseStepper phase={project.phase as Phase} />
            </section>

            {pending.length > 0 && (
                <section aria-labelledby="approvals-title" className="space-y-4">
                    <h2 id="approvals-title" className="text-xl font-light text-white" style={DISPLAY}>Necesitamos tu respuesta</h2>
                    {pending.map((a) => <ApprovalCard key={a.id} approval={toItem(a)} canDecide={isOwner} />)}
                </section>
            )}

            <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                <div className="space-y-10">
                    <section aria-labelledby="updates-title" className="space-y-4">
                        <h2 id="updates-title" className="text-xl font-light text-white" style={DISPLAY}>Avances</h2>
                        {project.updates.length === 0 ? (
                            <p className={`${cardCls} p-5 text-sm text-slate-400`}>Todavía no hay avances publicados. Te avisaremos por correo cuando publiquemos el primero.</p>
                        ) : (
                            <ol className="space-y-4 border-l border-slate-800 pl-5">
                                {project.updates.map((u) => (
                                    <li key={u.id} className="relative">
                                        <span aria-hidden="true" className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-lime-400" />
                                        <p className="text-xs text-slate-400">{formatDateTime(u.createdAt)}{u.phase && ` · ${PHASE_LABELS[u.phase as Phase]}`}</p>
                                        <p className="mt-1 text-base font-medium text-white">{u.title}</p>
                                        <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-relaxed text-slate-300">{u.body}</p>
                                    </li>
                                ))}
                            </ol>
                        )}
                    </section>

                    {past.length > 0 && (
                        <section aria-labelledby="past-title" className="space-y-4">
                            <h2 id="past-title" className="text-xl font-light text-white" style={DISPLAY}>Entregas respondidas</h2>
                            {past.map((a) => <ApprovalCard key={a.id} approval={toItem(a)} canDecide={false} />)}
                        </section>
                    )}
                </div>

                <div className="space-y-10">
                    {(project.links.length > 0 || project.url) && (
                        <section aria-labelledby="links-title" className="space-y-4">
                            <h2 id="links-title" className="text-xl font-light text-white" style={DISPLAY}>Enlaces</h2>
                            <ul className="space-y-2">
                                {project.url && (
                                    <li>
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" className={`${cardCls} flex items-center justify-between gap-3 px-4 py-3 text-sm text-slate-200 hover:border-lime-400/40`}>
                                            <span>Sitio del proyecto</span><ExternalLink className="h-4 w-4 text-slate-500" aria-hidden="true" />
                                            <span className="sr-only">(se abre en una pestaña nueva)</span>
                                        </a>
                                    </li>
                                )}
                                {project.links.map((l) => (
                                    <li key={l.id}>
                                        <a href={l.url} target="_blank" rel="noopener noreferrer" className={`${cardCls} flex items-center justify-between gap-3 px-4 py-3 text-sm text-slate-200 hover:border-lime-400/40`}>
                                            <span className="min-w-0"><span className="block truncate">{l.label}</span><span className="text-xs text-slate-500">{LINK_KIND_LABELS[l.kind as LinkKindValue]}</span></span>
                                            <ExternalLink className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
                                            <span className="sr-only">(se abre en una pestaña nueva)</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}

                    <section aria-labelledby="chat-title" className="space-y-4">
                        <h2 id="chat-title" className="text-xl font-light text-white" style={DISPLAY}>Mensajes</h2>
                        <CommentThread
                            projectId={project.id}
                            comments={project.comments.map((c) => ({
                                id: c.id, body: c.body, createdAt: formatDateTime(c.createdAt),
                                authorName: c.author?.name ?? 'Equipo', fromTeam: c.author?.role === 'ADMIN',
                            }))}
                        />
                    </section>
                </div>
            </div>
            <p className="text-xs text-slate-500">Proyecto creado el {formatDate(project.createdAt)}.</p>
        </div>
    )
}
