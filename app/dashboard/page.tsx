// app/dashboard/page.tsx — resumen de la cuenta del cliente
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowRight, FolderKanban, BellRing, ClipboardList } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { getPortalUser } from '@/lib/portal'
import { REQUEST_STATUS_LABELS, formatDate } from '@/lib/portal-shared'
import RequestForm from '@/components/portal/RequestForm'
import { cardCls, DISPLAY } from '@/components/portal/ui'

export const metadata = { title: 'Mi cuenta' }

export default async function DashboardPage() {
    const user = await getPortalUser()
    if (!user) redirect('/login')

    const [projects, pending, requests] = await Promise.all([
        prisma.project.count({ where: { userId: user.id, isClientProject: true } }),
        prisma.projectApproval.count({ where: { status: 'PENDING', project: { userId: user.id, isClientProject: true } } }),
        prisma.projectRequest.findMany({
            where: { userId: user.id }, orderBy: { createdAt: 'desc' }, take: 5,
            select: { id: true, kind: true, status: true, createdAt: true },
        }),
    ])

    const firstName = user.name?.split(' ')[0]
    const stats = [
        { label: 'Proyectos con nosotros', value: projects, icon: FolderKanban, href: '/dashboard/projects' },
        { label: 'Entregas por aprobar', value: pending, icon: BellRing, href: '/dashboard/projects' },
        { label: 'Solicitudes enviadas', value: requests.length, icon: ClipboardList, href: '#solicitudes' },
    ]

    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-3xl font-light text-white sm:text-4xl" style={DISPLAY}>{firstName ? `Hola, ${firstName}` : 'Bienvenido'}</h1>
                <p className="mt-2 text-sm text-slate-400">Desde aquí sigues tus proyectos con Jacana Dev.</p>
            </header>

            <ul className="grid gap-4 sm:grid-cols-3">
                {stats.map(({ label, value, icon: Icon, href }) => (
                    <li key={label}>
                        <Link href={href} className={`${cardCls} flex items-center justify-between p-5 transition-colors hover:border-lime-400/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400/60`}>
                            <div>
                                <p className="text-3xl font-light text-white" style={DISPLAY}>{value}</p>
                                <p className="mt-1 text-xs text-slate-400">{label}</p>
                            </div>
                            <Icon className="h-5 w-5 text-lime-400/70" aria-hidden="true" />
                        </Link>
                    </li>
                ))}
            </ul>

            {projects > 0 && (
                <Link href="/dashboard/projects" className="inline-flex items-center gap-2 text-sm text-lime-300 hover:text-lime-200">
                    Ir a mis proyectos <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
            )}

            <section id="solicitudes" aria-labelledby="new-title" className="space-y-4">
                <h2 id="new-title" className="text-xl font-light text-white" style={DISPLAY}>
                    {projects > 0 ? '¿Otro proyecto en mente?' : 'Cuéntanos qué necesitas'}
                </h2>
                <RequestForm />
            </section>

            {requests.length > 0 && (
                <section aria-labelledby="prev-title" className="space-y-3">
                    <h2 id="prev-title" className="text-xl font-light text-white" style={DISPLAY}>Tus solicitudes</h2>
                    <ul className={`${cardCls} divide-y divide-slate-800/70`}>
                        {requests.map((r) => (
                            <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5 text-sm">
                                <span className="text-slate-200">{r.kind}</span>
                                <span className="text-xs text-slate-400">{formatDate(r.createdAt)} · {REQUEST_STATUS_LABELS[r.status as keyof typeof REQUEST_STATUS_LABELS]}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    )
}
