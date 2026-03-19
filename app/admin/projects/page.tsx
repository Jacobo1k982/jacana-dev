// app/admin/projects/page.tsx
import { prisma } from "@/lib/prisma"
import AdminProjectsClient from "./AdminProjectsClient"

export default async function AdminProjectsPage() {
    const projects = await prisma.project.findMany({
        include: { user: { select: { name: true, email: true } } },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60 mb-2">Admin</p>
                <h1 className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Proyectos
                </h1>
                <p className="text-sm text-slate-500 mt-1">{projects.length} proyectos en total.</p>
            </div>
            <AdminProjectsClient initialProjects={projects} />
        </div>
    )
}