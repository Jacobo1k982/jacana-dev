// app/admin/portal/[id]/page.tsx — gestión de un proyecto de cliente
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getPortalUser } from '@/lib/portal'
import { formatDateTime, type Phase } from '@/lib/portal-shared'
import PhaseStepper from '@/components/portal/PhaseStepper'
import CommentThread from '@/components/portal/CommentThread'
import ApprovalCard from '@/components/portal/ApprovalCard'
import AdminProjectPanel from '@/components/portal/admin/AdminProjectPanel'
import { cardCls, DISPLAY } from '@/components/portal/ui'

export const metadata = { title: 'Proyecto de cliente' }

export default async function AdminProjectPage({ params }: { params: Promise<{ id: string }> }) {
    const admin = await getPortalUser()
    if (admin?.role !== 'ADMIN') redirect('/')
    const { id } = await params

    const project = await prisma.project.findFirst({
        where: { id, isClientProject: true },
        select: {
            id: true, name: true, description: true, url: true, status: true, phase: true,
            user: { select: { name: true, email: true } },
            updates: { orderBy: { createdAt: 'desc' }, take: 50, select: { id: true, title: true, createdAt: true } },
            comments: { orderBy: { createdAt: 'asc' }, take: 300, select: { id: true, body: true, createdAt: true, author: { select: { name: true, role: true } } } },
            links: { orderBy: { createdAt: 'asc' }, select: { id: true, label: true, url: true, kind: true } },
            approvals: { orderBy: { createdAt: 'desc' }, select: { id: true, title: true, description: true, status: true, response: true, decidedAt: true } },
        },
    })
    if (!project) notFound()

    return (
        <div className="space-y-10">
            <div>
                <Link href="/admin/portal" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-lime-300">
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Portal de clientes
                </Link>
                <h1 className="mt-4 text-3xl font-light text-white sm:text-4xl" style={DISPLAY}>{project.name}</h1>
                <p className="mt-1 text-sm text-slate-400">Cliente: {project.user.name ?? 'Sin nombre'} · {project.user.email}</p>
            </div>

            <PhaseStepper phase={project.phase as Phase} />

            <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                <AdminProjectPanel
                    project={{ id: project.id, name: project.name, description: project.description, url: project.url, phase: project.phase, status: project.status }}
                    links={project.links}
                />
                <div className="space-y-10">
                    <section aria-labelledby="ad-chat" className="space-y-4">
                        <h2 id="ad-chat" className="text-xl font-light text-white" style={DISPLAY}>Mensajes</h2>
                        <CommentThread
                            projectId={project.id}
                            comments={project.comments.map((c) => ({
                                id: c.id, body: c.body, createdAt: formatDateTime(c.createdAt),
                                authorName: c.author?.name ?? 'Equipo', fromTeam: c.author?.role === 'ADMIN',
                            }))}
                        />
                    </section>

                    <section aria-labelledby="ad-appr" className="space-y-4">
                        <h2 id="ad-appr" className="text-xl font-light text-white" style={DISPLAY}>Entregas</h2>
                        {project.approvals.length === 0 ? (
                            <p className={`${cardCls} p-5 text-sm text-slate-400`}>Todavía no pediste ninguna aprobación.</p>
                        ) : project.approvals.map((a) => (
                            <ApprovalCard key={a.id} canDecide={false} approval={{
                                id: a.id, title: a.title, description: a.description, status: a.status as 'PENDING' | 'APPROVED' | 'CHANGES_REQUESTED',
                                response: a.response, decidedAt: a.decidedAt ? formatDateTime(a.decidedAt) : null,
                            }} />
                        ))}
                    </section>

                    <section aria-labelledby="ad-upd" className="space-y-3">
                        <h2 id="ad-upd" className="text-xl font-light text-white" style={DISPLAY}>Avances publicados</h2>
                        {project.updates.length === 0 ? (
                            <p className="text-sm text-slate-400">Aún no publicaste avances.</p>
                        ) : (
                            <ul className={`${cardCls} divide-y divide-slate-800/70`}>
                                {project.updates.map((u) => (
                                    <li key={u.id} className="flex flex-wrap justify-between gap-2 px-4 py-2.5 text-sm">
                                        <span className="text-slate-200">{u.title}</span><span className="text-xs text-slate-500">{formatDateTime(u.createdAt)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}
