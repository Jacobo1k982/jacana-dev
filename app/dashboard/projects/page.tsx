// app/dashboard/projects/page.tsx — "Mis proyectos": los proyectos que el equipo lleva para este cliente
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRight, BellRing } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getPortalUser } from '@/lib/portal'
import { PHASES, PHASE_LABELS, STATUS_LABELS, formatDate, type Phase } from '@/lib/portal-shared'
import RequestForm from '@/components/portal/RequestForm'
import { cardCls, DISPLAY } from '@/components/portal/ui'

export const metadata = { title: 'Mis proyectos' }

export default async function ProjectsPage() {
    const user = await getPortalUser()
    if (!user) redirect('/login')

    const projects = await prisma.project.findMany({
        where: { userId: user.id, isClientProject: true },
        orderBy: { updatedAt: 'desc' },
        select: {
            id: true, name: true, description: true, status: true, phase: true, updatedAt: true,
            approvals: { where: { status: 'PENDING' }, select: { id: true } },
        },
    })

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-light text-white sm:text-4xl" style={DISPLAY}>Mis proyectos</h1>
                <p className="mt-2 text-sm text-slate-400">Aquí ves en qué etapa va cada proyecto, los avances y puedes escribirnos.</p>
            </header>

            {projects.length === 0 ? (
                <section aria-labelledby="empty-title" className="space-y-5">
                    <div className={`${cardCls} p-6`}>
                        <h2 id="empty-title" className="text-xl font-light text-white" style={DISPLAY}>Aún no tienes un proyecto con nosotros</h2>
                        <p className="mt-2 max-w-xl text-sm text-slate-400">Cuéntanos qué necesitas. Con eso te enviamos una propuesta, y cuando empecemos tu proyecto aparecerá aquí con su avance.</p>
                    </div>
                    <RequestForm />
                </section>
            ) : (
                <ul className="grid gap-4 md:grid-cols-2">
                    {projects.map((p) => {
                        const idx = PHASES.indexOf(p.phase as Phase)
                        const pct = Math.round(((idx + 1) / PHASES.length) * 100)
                        return (
                            <li key={p.id}>
                                <Link href={`/dashboard/projects/${p.id}`} className={`${cardCls} group block h-full p-6 transition-colors hover:border-lime-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60`}>
                                    <div className="flex items-start justify-between gap-3">
                                        <h2 className="text-2xl font-light text-white" style={DISPLAY}>{p.name}</h2>
                                        <span className="shrink-0 border border-slate-700 px-2.5 py-1 text-xs text-slate-300">{STATUS_LABELS[p.status as keyof typeof STATUS_LABELS]}</span>
                                    </div>
                                    {p.description && <p className="mt-2 line-clamp-2 text-sm text-slate-400">{p.description}</p>}

                                    <div className="mt-5">
                                        <div className="flex items-center justify-between text-xs text-slate-400">
                                            <span>Etapa: <span className="text-lime-300">{PHASE_LABELS[p.phase as Phase]}</span></span>
                                            <span>{idx + 1} de {PHASES.length}</span>
                                        </div>
                                        <div className="mt-2 h-1.5 bg-slate-800" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label="Avance por etapas">
                                            <div className="h-full bg-lime-400" style={{ width: `${pct}%` }} />
                                        </div>
                                    </div>

                                    <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                                        <span>Actualizado el {formatDate(p.updatedAt)}</span>
                                        {p.approvals.length > 0 && (
                                            <span className="inline-flex items-center gap-1.5 text-lime-300"><BellRing className="h-3.5 w-3.5" aria-hidden="true" />{p.approvals.length} por aprobar</span>
                                        )}
                                    </div>
                                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-lime-300">
                                        Ver proyecto <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}
