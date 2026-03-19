// app/dashboard/projects/ProjectsClient.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X, ExternalLink, Trash2, Edit2, Loader2, CheckCircle, AlertCircle, FolderKanban } from 'lucide-react'

type ProjectStatus = 'ACTIVE' | 'PAUSED' | 'COMPLETED'

interface Project {
    id: string
    name: string
    description?: string | null
    status: ProjectStatus
    techs: string[]
    url?: string | null
    image?: string | null
    createdAt: Date
}

const statusConfig = {
    ACTIVE: { label: 'Activo', color: 'text-emerald-400', border: 'border-emerald-400/30', bg: 'bg-emerald-400/5' },
    PAUSED: { label: 'Pausado', color: 'text-amber-400', border: 'border-amber-400/30', bg: 'bg-amber-400/5' },
    COMPLETED: { label: 'Completado', color: 'text-slate-400', border: 'border-slate-400/30', bg: 'bg-slate-400/5' },
}

const emptyForm = { name: '', description: '', status: 'ACTIVE' as ProjectStatus, techs: '', url: '', image: '' }

export default function ProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
    const [projects, setProjects] = useState<Project[]>(initialProjects)
    const [showForm, setShowForm] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [form, setForm] = useState(emptyForm)
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const openCreate = () => { setForm(emptyForm); setEditingId(null); setShowForm(true) }

    const openEdit = (p: Project) => {
        setForm({ name: p.name, description: p.description ?? '', status: p.status, techs: p.techs.join(', '), url: p.url ?? '', image: p.image ?? '' })
        setEditingId(p.id)
        setShowForm(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setIsLoading(true)
        try {
            const body = { ...form, techs: form.techs.split(',').map(t => t.trim()).filter(Boolean) }
            const res = editingId
                ? await fetch(`/api/projects/${editingId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
                : await fetch('/api/projects', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })

            if (!res.ok) throw new Error('Error al guardar')

            const data = await res.json()

            if (editingId) {
                setProjects(prev => prev.map(p => p.id === editingId ? { ...p, ...body } : p))
            } else {
                setProjects(prev => [data.project, ...prev])
            }

            setShowForm(false)
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al guardar')
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Eliminar este proyecto?')) return
        await fetch(`/api/projects/${id}`, { method: 'DELETE' })
        setProjects(prev => prev.filter(p => p.id !== id))
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <p className="text-xs text-slate-500">{projects.length} proyecto{projects.length !== 1 ? 's' : ''}</p>
                <motion.button onClick={openCreate} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.12em] hover:bg-amber-50 transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                    Nuevo proyecto
                </motion.button>
            </div>

            {success && (
                <div className="flex items-center gap-3 p-3 border-l-2 border-emerald-500/60 bg-emerald-500/5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-emerald-400/90">Proyecto guardado correctamente.</span>
                </div>
            )}

            <AnimatePresence>
                {showForm && (
                    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="bg-[#080810] border border-slate-800/60 p-6 md:p-8">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600">{editingId ? 'Editar proyecto' : 'Nuevo proyecto'}</p>
                            <button onClick={() => setShowForm(false)} className="text-slate-600 hover:text-slate-400 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {error && (
                                <div className="flex items-center gap-3 p-3 border-l-2 border-red-500/60 bg-red-500/5">
                                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                    <span className="text-xs text-red-400/90">{error}</span>
                                </div>
                            )}

                            <div className="grid md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Nombre *</label>
                                    <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required placeholder="Mi proyecto" className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Estado</label>
                                    <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as ProjectStatus }))} className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm focus:border-amber-400/60 focus:outline-none transition-colors">
                                        <option value="ACTIVE" className="bg-[#080810]">Activo</option>
                                        <option value="PAUSED" className="bg-[#080810]">Pausado</option>
                                        <option value="COMPLETED" className="bg-[#080810]">Completado</option>
                                    </select>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Descripcion</label>
                                    <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe tu proyecto..." rows={2} className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors resize-none" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Tecnologias (separadas por coma)</label>
                                    <input type="text" value={form.techs} onChange={e => setForm(f => ({ ...f, techs: e.target.value }))} placeholder="React, Next.js, TypeScript" className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors" />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">URL</label>
                                    <input type="url" value={form.url} onChange={e => setForm(f => ({ ...f, url: e.target.value }))} placeholder="https://mi-proyecto.com" className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors" />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">URL de imagen</label>
                                    <input type="url" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} placeholder="https://imagen.com/thumbnail.png" className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors" />
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2.5 text-xs uppercase tracking-[0.12em] text-slate-500 hover:text-slate-300 transition-colors">Cancelar</button>
                                <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.12em] hover:bg-amber-50 transition-colors disabled:opacity-50">
                                    {isLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Guardando...</> : 'Guardar'}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {projects.length === 0 ? (
                <div className="bg-[#080810] border border-slate-800/60 p-12 flex flex-col items-center gap-4 text-center">
                    <FolderKanban className="w-10 h-10 text-slate-700" />
                    <p className="text-sm text-slate-500">No tienes proyectos aun.</p>
                    <button onClick={openCreate} className="text-[10px] uppercase tracking-[0.2em] text-amber-400/60 hover:text-amber-400 transition-colors">Crear tu primer proyecto</button>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projects.map((project) => {
                        const status = statusConfig[project.status]
                        return (
                            <motion.div key={project.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-[#080810] border border-slate-800/60 overflow-hidden group">
                                {project.image && (
                                    <div className="h-36 overflow-hidden border-b border-slate-800/60">
                                        <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    </div>
                                )}
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <h3 className="text-sm font-medium text-white leading-tight">{project.name}</h3>
                                        <span className={`shrink-0 text-[9px] uppercase tracking-[0.15em] px-2 py-0.5 border ${status.color} ${status.border} ${status.bg}`}>{status.label}</span>
                                    </div>

                                    {project.description && (
                                        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                                    )}

                                    {project.techs.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 mb-4">
                                            {project.techs.map(tech => (
                                                <span key={tech} className="text-[9px] uppercase tracking-[0.1em] px-2 py-0.5 border border-slate-800/60 text-slate-600">{tech}</span>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-3 border-t border-slate-800/40">
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => openEdit(project)} className="text-slate-600 hover:text-slate-300 transition-colors">
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => handleDelete(project.id)} className="text-slate-600 hover:text-red-400/80 transition-colors">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                        {project.url && (
                                            <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-slate-600 hover:text-amber-400/80 transition-colors">
                                                Ver proyecto
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}