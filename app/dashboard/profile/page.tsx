// app/dashboard/profile/page.tsx
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import ProfileForm from "./ProfileForm"

export default async function ProfilePage() {
    const session = await auth()
    const user = await prisma.user.findUnique({
        where: { email: session!.user!.email! },
        select: {
            name: true,
            username: true,
            email: true,
            bio: true,
            image: true,
            avatar: true,
            website: true,
            twitter: true,
            github: true,
            linkedin: true,
            role: true,
            createdAt: true,
        }
    })

    return (
        <div className="space-y-8">
            <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60 mb-2">Mi cuenta</p>
                <h1 className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Perfil
                </h1>
                <p className="text-sm text-slate-500 mt-1">Administra tu informacion personal.</p>
            </div>
            <ProfileForm user={user!} />
        </div>
    )
}