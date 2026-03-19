// app/admin/projects/AdminProjectsClient.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trash2, ExternalLink } from 'lucide-react'

type ProjectStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED'

interface Project {
    id: string
    name: string
    description?: string | null
    status: ProjectStatus
    techs: string[]
    url?: string | null
    createdAt: Date
    user: { name?: string | null; email: string }
}

const statusConfig = {
    ACTIVE: { label: 'Activo', color: 'text-emerald-400 border-emerald-400/30' },
    PAUSED: { label: 'Pausado', color: 'text-amber-400 border-amber-400/30' },
    COMPLETED: { label: 'Completado', color: 'text-slate-400 border-slate-400/30' },
}

export default function AdminProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
    const [projects, setProjects] = useState(initialProjects)
    const [search, setSearch] = useState('')

    const filtered = projects.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.user.email.toLowerCase().includes(search.toLowerCase())
    )

    const handleDelete = async (id: string) => {
        if (!confirm('Eliminar este proyecto?')) return
        await fetch('/api/admin/projects', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        })
        setProjects(prev => prev.filter(p => p.id !== id))
    }

    return (
        <div className="space-y-4">
            <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar por nombre o email..."
                className="w-full px-4 py-3 bg-[#080810] border border-slate-800/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors"
            />

            <div className="bg-[#080810] border border-slate-800/60 overflow-hidden">
                <div className="h-px bg-gradient-to-r from-amber-400/20 to-transparent" />
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-slate-800/60">
                                <th className="text-left px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-slate-600">Proyecto</th>
                                <th className="text-left px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-slate-600">Usuario</th>
                                <th className="text-left px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-slate-600">Estado</th>
                                <th className="text-left px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-slate-600">Tecnologias</th>
                                <th className="text-left px-6 py-4 text-[9px] uppercase tracking-[0.25em] text-slate-600">Fecha</th>
                                <th className="px-6 py-4" />
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((project) => {
                                const status = statusConfig[project.status]
                                return (
                                    <motion.tr key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border-b border-slate-800/40 last:border-b-0 hover:bg-slate-900/20 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="text-xs text-white">{project.name}</p>
                                            {project.description && <p className="text-[11px] text-slate-600 line-clamp-1">{project.description}</p>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-xs text-slate-400">{project.user.name ?? project.user.email}</p>
                                            <p className="text-[11px] text-slate-600">{project.user.email}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 border ${status.color}`}>
                                                {status.label}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {project.techs.slice(0, 3).map(tech => (
                                                    <span key={tech} className="text-[9px] uppercase tracking-[0.1em] px-1.5 py-0.5 border border-slate-800/60 text-slate-600">{tech}</span>
                                                ))}
                                                {project.techs.length > 3 && <span className="text-[9px] text-slate-700">+{project.techs.length - 3}</span>}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-[11px] text-slate-600">
                                                {new Date(project.createdAt).toLocaleDateString('es', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {project.url && (
                                                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-300 transition-colors">
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                    </a>
                                                )}
                                                <button onClick={() => handleDelete(project.id)} className="text-slate-600 hover:text-red-400/80 transition-colors">
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
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