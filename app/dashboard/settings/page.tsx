// app/dashboard/settings/page.tsx
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import SettingsClient from "./SettingsClient"

export default async function SettingsPage() {
    const session = await auth()
    const user = await prisma.user.findUnique({
        where: { email: session!.user!.email! },
        select: {
            password: true,
            notifyEmail: true,
            notifyProduct: true,
            profilePublic: true,
            showEmail: true,
        }
    })

    return (
        <div className="space-y-8">
            <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/60 mb-2">Mi cuenta</p>
                <h1 className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                    Configuracion
                </h1>
                <p className="text-sm text-slate-500 mt-1">Administra la seguridad y preferencias de tu cuenta.</p>
            </div>
            <SettingsClient user={user!} />
        </div>
    )
}