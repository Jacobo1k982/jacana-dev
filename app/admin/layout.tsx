// app/admin/layout.tsx
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth()
    if ((session?.user as any)?.role !== 'ADMIN') redirect('/')

    return (
        <div className="min-h-screen bg-[#06051d]">
            <nav className="border-b border-slate-800/60 bg-[#080810]/95 backdrop-blur-xl sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 md:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            <a href="/" className="flex items-center gap-2 shrink-0">
                                <img src="/Logo-dev.png" alt="Jacana Dev" className="w-8 h-8 object-contain" />
                                <div className="h-4 w-px bg-slate-700/60" />
                                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-400/60">Admin</span>
                            </a>
                            <div className="hidden md:flex items-center gap-1">
                                {[
                                    { label: 'Overview', href: '/admin' },
                                    { label: 'Usuarios', href: '/admin/users' },
                                    { label: 'Proyectos', href: '/admin/projects' },
                                ].map(({ label, href }) => (
                                    <a key={label} href={href} className="px-3 py-2 text-xs font-medium uppercase tracking-[0.1em] text-slate-400 hover:text-white hover:bg-slate-800/40 transition-all">
                                        {label}
                                    </a>
                                ))}
                            </div>
                        </div>
                        <a href="/dashboard" className="text-[10px] uppercase tracking-[0.15em] text-slate-600 hover:text-slate-300 transition-colors">
                            Volver al dashboard
                        </a>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-6 md:px-8 py-10">
                {children}
            </main>
        </div>
    )
}