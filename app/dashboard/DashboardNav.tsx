'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { motion, AnimatePresence } from 'framer-motion'
import { LayoutDashboard, User, FolderKanban, Settings, LogOut, ChevronDown, Crown, Shield } from 'lucide-react'

const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Perfil', href: '/dashboard/profile', icon: User },
    { label: 'Proyectos', href: '/dashboard/projects', icon: FolderKanban },
    { label: 'Configuracion', href: '/dashboard/settings', icon: Settings },
]

interface DashboardNavProps {
    user: { name?: string | null; email?: string | null; image?: string | null; role?: string }
}

export default function DashboardNav({ user }: DashboardNavProps) {
    const [menuOpen, setMenuOpen] = useState(false)

    const initials = user.name
        ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
        : (user.email ?? '??').slice(0, 2).toUpperCase()

    const displayName = user.name ?? user.email?.split('@')[0] ?? 'Usuario'

    const roleConfig: Record<string, { icon: typeof Crown; color: string; label: string }> = {
        ADMIN: { icon: Crown, color: 'text-amber-400', label: 'Admin' },
        MODERATOR: { icon: Shield, color: 'text-indigo-400', label: 'Moderador' },
        USER: { icon: User, color: 'text-slate-500', label: 'Usuario' },
    }

    const role = roleConfig[(user as any).role ?? 'USER'] ?? roleConfig.USER
    const RoleIcon = role.icon

    return (
        <nav className="border-b border-slate-800/60 bg-[#080810]/95 backdrop-blur-xl sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex items-center justify-between h-16">

                    <div className="flex items-center gap-8">
                        <a href="/" className="flex items-center gap-2 shrink-0">
                            <img src="/Logo-dev.png" alt="Jacana Dev" className="w-8 h-8 object-contain" />
                            <div className="h-4 w-px bg-slate-700/60" />
                            <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Dashboard</span>
                        </a>

                        <div className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <a key={item.label} href={item.href} className="flex items-center gap-2 px-3 py-2 text-xs font-medium uppercase tracking-[0.1em] text-slate-400 hover:text-white hover:bg-slate-800/40 transition-all">
                                    <item.icon className="w-3.5 h-3.5" />
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <motion.button onClick={() => setMenuOpen(!menuOpen)} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className={`flex items-center gap-2.5 px-3 py-2 border transition-colors ${menuOpen ? 'border-amber-400/40 bg-slate-900/60' : 'border-slate-700/60 hover:border-slate-600/80'}`}>
                            <div className="w-6 h-6 flex items-center justify-center border border-slate-700/60 bg-slate-900/60 text-[10px] font-medium text-slate-300 overflow-hidden">
                                {user.image ? <img src={user.image} alt={displayName} className="w-full h-full object-cover" /> : initials}
                            </div>
                            <span className="hidden sm:block text-xs font-medium uppercase tracking-[0.1em] text-slate-400 max-w-[100px] truncate">{displayName}</span>
                            <motion.span animate={{ rotate: menuOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                <ChevronDown className="w-3 h-3 text-slate-600" />
                            </motion.span>
                        </motion.button>

                        <AnimatePresence>
                            {menuOpen && (
                                <>
                                    <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
                                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="absolute right-0 top-full mt-1 w-56 bg-[#080810] border border-slate-800/80 shadow-2xl shadow-black/50 z-50">
                                        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

                                        <div className="px-5 py-4 border-b border-slate-800/60">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className="w-9 h-9 flex items-center justify-center border border-slate-700/60 bg-slate-900/60 text-sm font-medium text-slate-300 overflow-hidden">
                                                    {user.image ? <img src={user.image} alt={displayName} className="w-full h-full object-cover" /> : initials}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-medium text-white truncate leading-none mb-1">{displayName}</p>
                                                    <p className="text-[11px] text-slate-600 truncate">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="inline-flex items-center gap-1.5 px-2 py-1 border border-slate-700/60">
                                                <RoleIcon className={`w-2.5 h-2.5 ${role.color}`} />
                                                <span className={`text-[9px] uppercase tracking-[0.2em] ${role.color}`}>{role.label}</span>
                                            </div>
                                        </div>

                                        <div className="py-1">
                                            {navItems.map((item) => (
                                                <a key={item.label} href={item.href} onClick={() => setMenuOpen(false)} className="group w-full flex items-center gap-3 px-5 py-2.5 border-b border-slate-800/40 last:border-b-0 hover:bg-slate-900/40 transition-colors">
                                                    <item.icon className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                                                    <span className="text-xs uppercase tracking-[0.1em] text-slate-500 group-hover:text-slate-300 transition-colors">{item.label}</span>
                                                </a>
                                            ))}
                                        </div>

                                        <div className="border-t border-slate-800/60">
                                            <button onClick={() => signOut({ callbackUrl: '/' })} className="group w-full flex items-center gap-3 px-5 py-3 hover:bg-red-500/5 transition-colors">
                                                <LogOut className="w-3.5 h-3.5 text-slate-700 group-hover:text-red-400/80 transition-colors" />
                                                <span className="text-xs uppercase tracking-[0.1em] text-slate-600 group-hover:text-red-400/80 transition-colors">Cerrar sesion</span>
                                            </button>
                                        </div>

                                        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    )
}