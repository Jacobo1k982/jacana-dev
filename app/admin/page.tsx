// app/admin/page.tsx
import { prisma } from "@/lib/prisma"
import { Users, FolderKanban, Activity, TrendingUp } from "lucide-react"

export default async function AdminPage() {
    const [totalUsers, totalProjects, activeProjects, newUsersThisMonth] = await Promise.all([
        prisma.user.count(),
        prisma.project.count(),
        prisma.project.count({ where: { status: 'ACTIVE' } }),
        prisma.user.count({
            where: {
                createdAt: { gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
            }
        }),
    ])

    const stats = [
        { label: 'Total usuarios', value: totalUsers, icon: Users },
        { label: 'Total proyectos', value: totalProjects, icon: FolderKanban },
        { label: 'Proyectos activos', value: activeProjects, icon: Activity },
        { label: 'Nuevos este mes', value: newUsersThisMonth, icon: TrendingUp },
    ]

    return (
        <div className="space-y-8">
            <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60 mb-2">Panel de control</p>
                <h1 className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Administracion
                </h1>
                <p className="text-sm text-slate-500 mt-1">Vista general del sistema.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="bg-[#080810] border border-slate-800/60 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[9px] uppercase tracking-[0.25em] text-slate-600">{label}</span>
                            <Icon className="w-4 h-4 text-amber-400/40" />
                        </div>
                        <p className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                            {value}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <a href="/admin/users" className="group bg-[#080810] border border-slate-800/60 p-6 hover:border-amber-400/20 transition-colors">
                    <div className="h-px bg-gradient-to-r from-amber-400/20 to-transparent mb-6" />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-2">Usuarios</p>
                            <p className="text-sm text-slate-300 group-hover:text-white transition-colors">Gestionar todos los usuarios del sistema</p>
                        </div>
                        <Users className="w-8 h-8 text-slate-700 group-hover:text-amber-400/40 transition-colors" />
                    </div>
                </a>
                <a href="/admin/projects" className="group bg-[#080810] border border-slate-800/60 p-6 hover:border-amber-400/20 transition-colors">
                    <div className="h-px bg-gradient-to-r from-amber-400/20 to-transparent mb-6" />
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-2">Proyectos</p>
                            <p className="text-sm text-slate-300 group-hover:text-white transition-colors">Ver y gestionar todos los proyectos</p>
                        </div>
                        <FolderKanban className="w-8 h-8 text-slate-700 group-hover:text-amber-400/40 transition-colors" />
                    </div>
                </a>
            </div>
        </div>
    )
}