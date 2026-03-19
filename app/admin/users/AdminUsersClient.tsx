// app/admin/users/AdminUsersClient.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

type Role = 'USER' | 'ADMIN' | 'MODERATOR'

interface User {
    id: string
    name?: string | null
    email: string
    username?: string | null
    role: Role
    isActive: boolean
    image?: string | null
    createdAt: Date
    _count: { projects: number }
}

const roleColors: Record<Role, string> = {
    ADMIN: 'text-amber-400 border-amber-400/30',
    MODERATOR: 'text-indigo-400 border-indigo-400/30',
    USER: 'text-slate-500 border-slate-700/60',
}

export default function AdminUsersClient({ initialUsers }: { initialUsers: User[] }) {
    const [users, setUsers] = useState(initialUsers)
    const [search, setSearch] = useState('')

    const filtered = users.filter(u =>
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.username?.toLowerCase().includes(search.toLowerCase())
    )

    const toggleActive = async (id: string, isActive: boolean) => {
        await fetch('/api/admin/users', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, isActive: !isActive }),
        })
        setUsers(prev => prev.map(u => u.id === id ? { ...u, isActive: !isActive } : u))
    }

    return (
        <div className="space-y-4">
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar por nombre, email o username..."
                className="w-full px-4 py-3 bg-[#080810] border border-slate-800/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors"
            />

            <div className="bg-[#080810] border border-slate-800/60 overflow-hidden">
                <div className="h-px bg-gradient-to-r from-amber-400/20 to-transparent" />
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-800/60">
                                <th className="text-left px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-slate-600">Usuario</th>
                                <th className="text-left px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-slate-600">Rol</th>
                                <th className="text-left px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-slate-600">Proyectos</th>
                                <th className="text-left px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-slate-600">Estado</th>
                                <th className="text-left px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-slate-600">Registro</th>
                                <th className="px-6 py-4" />
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((user) => {
                                const initials = user.name
                                    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
                                    : user.email.slice(0, 2).toUpperCase()
                                return (
                                    <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-slate-800/40 last:border-b-0 hover:bg-slate-900/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 flex items-center justify-center border border-slate-700/60 bg-slate-900/60 text-[10px] font-medium text-slate-300 overflow-hidden shrink-0">
                                                    {user.image ? <img src={user.image} alt="" className="w-full h-full object-cover" /> : initials}
                                                </div>
                                                <div>
                                                    <p className="text-xs text-white">{user.name ?? 'Sin nombre'}</p>
                                                    <p className="text-[11px] text-slate-600">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 border ${roleColors[user.role]}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xs text-slate-400">{user._count.projects}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 border ${user.isActive ? 'text-emerald-400 border-emerald-400/30' : 'text-red-400 border-red-400/30'}`}>
                                                {user.isActive ? 'Activo' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[11px] text-slate-600">
                                                {new Date(user.createdAt).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => toggleActive(user.id, user.isActive)} className={`text-[9px] uppercase tracking-[0.1em] px-3 py-1.5 border transition-colors ${user.isActive ? 'border-red-400/30 text-red-400/60 hover:text-red-400 hover:border-red-400/60' : 'border-emerald-400/30 text-emerald-400/60 hover:text-emerald-400 hover:border-emerald-400/60'}`}>
                                                {user.isActive ? 'Desactivar' : 'Activar'}
                                            </button>
                                        </td>
                                    </motion.tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}