// app/admin/portal/page.tsx — el equipo: solicitudes nuevas y proyectos de clientes
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { getPortalUser } from '@/lib/portal'
import { PHASE_LABELS, STATUS_LABELS, formatDateTime, type Phase } from '@/lib/portal-shared'
import RequestStatusSelect from '@/components/portal/admin/RequestStatusSelect'
import CreateProjectForm from '@/components/portal/admin/CreateProjectForm'
import { cardCls, DISPLAY } from '@/components/portal/ui'

export const metadata = { title: 'Portal de clientes' }

export default async function AdminPortalPage() {
    const admin = await getPortalUser()
    if (admin?.role !== 'ADMIN') redirect('/')

    const [requests, projects] = await Promise.all([
        prisma.projectRequest.findMany({
            orderBy: { createdAt: 'desc' }, take: 50,
            select: { id: true, kind: true, description: true, timeline: true, links: true, status: true, createdAt: true, user: { select: { name: true, email: true } } },
        }),
        prisma.project.findMany({
            where: { isClientProject: true }, orderBy: { updatedAt: 'desc' },
            select: {
                id: true, name: true, status: true, phase: true, updatedAt: true,
                user: { select: { name: true, email: true } },
                approvals: { where: { status: 'PENDING' }, select: { id: true } },
            },
        }),
    ])

    return (
        <div className="space-y-12">
            <header>
                <h1 className="text-3xl font-light text-white sm:text-4xl" style={DISPLAY}>Portal de clientes</h1>
                <p className="mt-2 text-sm text-slate-400">Solicitudes nuevas y proyectos que los clientes ven en su cuenta.</p>
            </header>

            <section aria-labelledby="req-title" className="space-y-4">
                <h2 id="req-title" className="text-xl font-light text-white" style={DISPLAY}>Solicitudes</h2>
                {requests.length === 0 ? (
                    <p className={`${cardCls} p-5 text-sm text-slate-400`}>Aún no hay solicitudes.</p>
                ) : (
                    <ul className="space-y-3">
                        {requests.map((r) => (
                            <li key={r.id} className={`${cardCls} p-5`}>
                                <div className="flex flex-wrap items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="text-base font-medium text-white">{r.kind}</p>
                                        <p className="text-xs text-slate-400">{r.user.name ?? 'Sin nombre'} · {r.user.email} · {formatDateTime(r.createdAt)}</p>
                                    </div>
                                    <div className="w-52"><RequestStatusSelect id={r.id} status={r.status} /></div>
                                </div>
                                <p className="mt-3 whitespace-pre-wrap break-words text-sm text-slate-300">{r.description}</p>
                                {(r.timeline || r.links) && (
                                    <p className="mt-2 break-words text-xs text-slate-400">
                                        {r.timeline && <>Plazo: {r.timeline}. </>}{r.links && <>Referencias: {r.links}</>}
                                    </p>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            <section aria-labelledby="proj-title" className="space-y-4">
                <h2 id="proj-title" className="text-xl font-light text-white" style={DISPLAY}>Proyectos de clientes</h2>
                {projects.length > 0 && (
                    <ul className="grid gap-3 md:grid-cols-2">
                        {projects.map((p) => (
                            <li key={p.id}>
                                <Link href={`/admin/portal/${p.id}`} className={`${cardCls} block p-5 transition-colors hover:border-lime-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60`}>
                                    <p className="text-lg font-light text-white" style={DISPLAY}>{p.name}</p>
                                    <p className="text-xs text-slate-400">{p.user.name ?? p.user.email} · {PHASE_LABELS[p.phase as Phase]} · {STATUS_LABELS[p.status as keyof typeof STATUS_LABELS]}</p>
                                    {p.approvals.length > 0 && <p className="mt-2 text-xs text-lime-300">{p.approvals.length} entrega(s) esperando respuesta</p>}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
                <h3 className="pt-4 text-base font-medium text-white">Crear un proyecto para un cliente</h3>
                <CreateProjectForm />
            </section>
        </div>
    )
}
