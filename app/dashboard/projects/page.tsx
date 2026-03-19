// app/dashboard/projects/page.tsx
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import ProjectsClient from "./ProjectsClient"

export default async function ProjectsPage() {
    const session = await auth()
    const user = await prisma.user.findUnique({ where: { email: session!.user!.email! } })
    const projects = await prisma.project.findMany({
        where: { userId: user!.id },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60 mb-2">Mi portafolio</p>
                <h1 className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Proyectos
                </h1>
                <p className="text-sm text-slate-500 mt-1">Administra tu portafolio de proyectos.</p>
            </div>
            <ProjectsClient initialProjects={projects} />
        </div>
    )
}