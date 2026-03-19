// app/dashboard/profile/ProfileForm.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, AtSign, Mail, Globe, Twitter, Github, Linkedin, Save, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface ProfileFormProps {
    user: {
        name?: string | null
        username?: string | null
        email?: string | null
        bio?: string | null
        image?: string | null
        avatar?: string | null
        website?: string | null
        twitter?: string | null
        github?: string | null
        linkedin?: string | null
        role?: string | null
        createdAt?: Date
    }
}

export default function ProfileForm({ user }: ProfileFormProps) {
    const [name, setName] = useState(user.name ?? '')
    const [username, setUsername] = useState(user.username ?? '')
    const [bio, setBio] = useState(user.bio ?? '')
    const [website, setWebsite] = useState(user.website ?? '')
    const [twitter, setTwitter] = useState(user.twitter ?? '')
    const [github, setGithub] = useState(user.github ?? '')
    const [linkedin, setLinkedin] = useState(user.linkedin ?? '')
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const displayName = user.name ?? user.email?.split('@')[0] ?? 'Usuario'
    const initials = user.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : (user.email ?? '??').slice(0, 2).toUpperCase()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        setSuccess(false)
        setIsLoading(true)
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, username, bio, website, twitter, github, linkedin }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Error al guardar')
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al guardar')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            <div className="bg-[#080810] border border-slate-800/60 p-6 md:p-8">
                <div className="h-px bg-gradient-to-r from-amber-400/20 to-transparent mb-6" />
                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-6">Informacion basica</p>

                <div className="flex items-center gap-6 mb-8">
                    <div className="w-20 h-20 flex items-center justify-center border border-slate-700/60 bg-slate-900/60 text-2xl font-light text-slate-300 overflow-hidden shrink-0">
                        {user.image || user.avatar
                            ? <img src={user.image ?? user.avatar ?? ''} alt={displayName} className="w-full h-full object-cover" />
                            : initials
                        }
                    </div>
                    <div>
                        <p className="text-white font-medium">{displayName}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{user.email}</p>
                        <span className="inline-block mt-2 text-[9px] uppercase tracking-[0.2em] text-amber-400/60 border border-amber-400/20 px-2 py-0.5">
                            {user.role ?? 'USER'}
                        </span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            <User className="w-3 h-3 text-amber-400/60" />
                            Nombre
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder="Tu nombre completo"
                            className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            <AtSign className="w-3 h-3 text-amber-400/60" />
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                            placeholder="tu_username"
                            className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            <Mail className="w-3 h-3 text-amber-400/60" />
                            Email
                        </label>
                        <input
                            type="email"
                            value={user.email ?? ''}
                            disabled
                            className="w-full px-0 py-3 bg-transparent border-b border-slate-800/40 text-slate-600 text-sm cursor-not-allowed"
                        />
                        <p className="text-[10px] text-slate-700">El email no se puede cambiar desde aqui.</p>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            Bio
                        </label>
                        <textarea
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                            placeholder="Cuentanos algo sobre ti..."
                            rows={3}
                            className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors resize-none"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-[#080810] border border-slate-800/60 p-6 md:p-8">
                <div className="h-px bg-gradient-to-r from-amber-400/20 to-transparent mb-6" />
                <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600 mb-6">Redes sociales</p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            <Globe className="w-3 h-3 text-amber-400/60" />
                            Sitio web
                        </label>
                        <input
                            type="url"
                            value={website}
                            onChange={e => setWebsite(e.target.value)}
                            placeholder="https://tu-sitio.com"
                            className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            <Twitter className="w-3 h-3 text-amber-400/60" />
                            Twitter / X
                        </label>
                        <input
                            type="text"
                            value={twitter}
                            onChange={e => setTwitter(e.target.value)}
                            placeholder="@tu_usuario"
                            className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            <Github className="w-3 h-3 text-amber-400/60" />
                            GitHub
                        </label>
                        <input
                            type="text"
                            value={github}
                            onChange={e => setGithub(e.target.value)}
                            placeholder="tu_usuario"
                            className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            <Linkedin className="w-3 h-3 text-amber-400/60" />
                            LinkedIn
                        </label>
                        <input
                            type="text"
                            value={linkedin}
                            onChange={e => setLinkedin(e.target.value)}
                            placeholder="tu_usuario"
                            className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors"
                        />
                    </div>
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-3 p-3 border-l-2 border-red-500/60 bg-red-500/5">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="text-xs text-red-400/90">{error}</span>
                </div>
            )}

            {success && (
                <div className="flex items-center gap-3 p-3 border-l-2 border-emerald-500/60 bg-emerald-500/5">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-emerald-400/90">Perfil actualizado correctamente.</span>
                </div>
            )}

            <div className="flex justify-end">
                <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2.5 px-8 py-3 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <><Loader2 className="w-3.5 h-3.5 animate-spin" />Guardando...</>
                    ) : (
                        <><Save className="w-3.5 h-3.5" />Guardar cambios</>
                    )}
                </motion.button>
            </div>
        </form>
    )
}