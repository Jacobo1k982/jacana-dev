// app/dashboard/page.tsx
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { LayoutDashboard, Users, FolderKanban, Activity } from 'lucide-react'

export default async function DashboardPage() {
    const session = await auth()
    const user = await prisma.user.findUnique({
        where: { email: session!.user!.email! },
        select: { name: true, email: true, role: true, createdAt: true }
    })

    const stats = [
        { label: 'Rol', value: user?.role ?? 'USER', icon: Users },
        { label: 'Proyectos', value: '0', icon: FolderKanban },
        { label: 'Actividad', value: 'Activo', icon: Activity },
        { label: 'Miembro desde', value: user?.createdAt.getFullYear().toString() ?? '2024', icon: LayoutDashboard },
    ]

    return (
        <div className="space-y-8">
            <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60 mb-2">Panel de control</p>
                <h1 className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Bienvenido, {user?.name?.split(' ')[0] ?? 'Usuario'}
                </h1>
                <p className="text-sm text-slate-500 mt-1">Aqui tienes un resumen de tu cuenta.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-[#080810] border border-slate-800/60 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[9px] uppercase tracking-[0.25em] text-slate-600">{label}</span>
                            <Icon className="w-4 h-4 text-amber-400/40" />
                        </div>
                        <p className="text-2xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                            {value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-[#080810] border border-slate-800/60 p-6">
                    <div className="h-px bg-gradient-to-r from-amber-400/20 to-transparent mb-6" />
                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Accesos rapidos</p>
                    <div className="space-y-2">
                        {[
                            { label: 'Ver mi perfil', href: '/dashboard/profile' },
                            { label: 'Mis proyectos', href: '/dashboard/projects' },
                            { label: 'Configuracion', href: '/dashboard/settings' },
                        ].map(({ label, href }) => (
                            <a key={label} href={href} className="flex items-center justify-between py-2.5 border-b border-slate-800/40 last:border-b-0 text-xs uppercase tracking-[0.1em] text-slate-400 hover:text-white transition-colors group">
                                {label}
                                <span className="text-slate-700 group-hover:text-amber-400/60 transition-colors">+</span>
                            </a>
                        ))}
                    </div>
                </div>

                <div className="bg-[#080810] border border-slate-800/60 p-6">
                    <div className="h-px bg-gradient-to-r from-amber-400/20 to-transparent mb-6" />
                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-4">Informacion de cuenta</p>
                    <div className="space-y-3">
                        {[
                            { label: 'Email', value: user?.email ?? '' },
                            { label: 'Rol', value: user?.role ?? 'USER' },
                            { label: 'Estado', value: 'Activo' },
                        ].map(({ label, value }) => (
                            <div key={label} className="flex items-center justify-between py-2.5 border-b border-slate-800/40 last:border-b-0">
                                <span className="text-[10px] uppercase tracking-[0.15em] text-slate-600">{label}</span>
                                <span className="text-xs text-slate-300">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}