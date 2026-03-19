// app/admin/users/page.tsx
import { prisma } from "@/lib/prisma"
import AdminUsersClient from "./AdminUsersClient"

export default async function AdminUsersPage() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            username: true,
            role: true,
            isActive: true,
            image: true,
            createdAt: true,
            _count: { select: { projects: true } }
        },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60 mb-2">Admin</p>
                <h1 className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Usuarios
                </h1>
                <p className="text-sm text-slate-500 mt-1">{users.length} usuarios registrados.</p>
            </div>
            <AdminUsersClient initialUsers={users} />
        </div>
    )
}