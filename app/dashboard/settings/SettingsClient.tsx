// app/dashboard/settings/SettingsClient.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Bell, Shield, Eye, EyeOff, Loader2, CheckCircle, AlertCircle } from 'lucide-react'

interface SettingsClientProps {
    user: {
        password?: string | null
        notifyEmail: boolean
        notifyProduct: boolean
        profilePublic: boolean
        showEmail: boolean
    }
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className={`relative w-10 h-5 transition-colors ${checked ? 'bg-amber-400/60' : 'bg-slate-700/60'}`}
        >
            <span className={`absolute top-0.5 w-4 h-4 bg-white transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </button>
    )
}

function SectionResult({ success, error }: { success: boolean; error: string | null }) {
    if (success) return (
        <div className="flex items-center gap-3 p-3 border-l-2 border-emerald-500/60 bg-emerald-500/5">
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-xs text-emerald-400/90">Guardado correctamente.</span>
        </div>
    )
    if (error) return (
        <div className="flex items-center gap-3 p-3 border-l-2 border-red-500/60 bg-red-500/5">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span className="text-xs text-red-400/90">{error}</span>
        </div>
    )
    return null
}

export default function SettingsClient({ user }: SettingsClientProps) {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showCurrent, setShowCurrent] = useState(false)
    const [showNew, setShowNew] = useState(false)
    const [passwordLoading, setPasswordLoading] = useState(false)
    const [passwordSuccess, setPasswordSuccess] = useState(false)
    const [passwordError, setPasswordError] = useState<string | null>(null)

    const [notifyEmail, setNotifyEmail] = useState(user.notifyEmail)
    const [notifyProduct, setNotifyProduct] = useState(user.notifyProduct)
    const [notifLoading, setNotifLoading] = useState(false)
    const [notifSuccess, setNotifSuccess] = useState(false)
    const [notifError, setNotifError] = useState<string | null>(null)

    const [profilePublic, setProfilePublic] = useState(user.profilePublic)
    const [showEmail, setShowEmail] = useState(user.showEmail)
    const [privacyLoading, setPrivacyLoading] = useState(false)
    const [privacySuccess, setPrivacySuccess] = useState(false)
    const [privacyError, setPrivacyError] = useState<string | null>(null)

    const save = async (type: string, data: object, setLoading: (v: boolean) => void, setSuccess: (v: boolean) => void, setError: (v: string | null) => void) => {
        setError(null)
        setLoading(true)
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, ...data }),
            })
            const json = await res.json()
            if (!res.ok) throw new Error(json.error || 'Error al guardar')
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al guardar')
        } finally {
            setLoading(false)
        }
    }

    const handlePassword = async (e: React.FormEvent) => {
        e.preventDefault()
        if (newPassword !== confirmPassword) { setPasswordError('Las contrasenas no coinciden'); return }
        if (newPassword.length < 8) { setPasswordError('Minimo 8 caracteres'); return }
        await save('password', { currentPassword, newPassword }, setPasswordLoading, setPasswordSuccess, setPasswordError)
        setCurrentPassword(''); setNewPassword(''); setConfirmPassword('')
    }

    const handleNotifications = async (e: React.FormEvent) => {
        e.preventDefault()
        await save('notifications', { notifyEmail, notifyProduct }, setNotifLoading, setNotifSuccess, setNotifError)
    }

    const handlePrivacy = async (e: React.FormEvent) => {
        e.preventDefault()
        await save('privacy', { profilePublic, showEmail }, setPrivacyLoading, setPrivacySuccess, setPrivacyError)
    }

    return (
        <div className="space-y-6">

            {user.password && (
                <div className="bg-[#080810] border border-slate-800/60 p-6 md:p-8">
                    <div className="h-px bg-gradient-to-r from-amber-400/20 to-transparent mb-6" />
                    <div className="flex items-center gap-3 mb-6">
                        <Lock className="w-4 h-4 text-amber-400/60" />
                        <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600">Cambiar contrasena</p>
                    </div>

                    <form onSubmit={handlePassword} className="space-y-5">
                        <SectionResult success={passwordSuccess} error={passwordError} />

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Contrasena actual</label>
                            <div className="relative">
                                <input type={showCurrent ? 'text' : 'password'} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="w-full px-0 py-3 pr-8 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors" />
                                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                                    {showCurrent ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Nueva contrasena</label>
                                <div className="relative">
                                    <input type={showNew ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="w-full px-0 py-3 pr-8 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors" />
                                    <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                                        {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Confirmar contrasena</label>
                                <input type={showNew ? 'text' : 'password'} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors" />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <motion.button type="submit" disabled={passwordLoading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.12em] hover:bg-amber-50 transition-colors disabled:opacity-50">
                                {passwordLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Guardando...</> : 'Actualizar contrasena'}
                            </motion.button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-[#080810] border border-slate-800/60 p-6 md:p-8">
                <div className="h-px bg-gradient-to-r from-amber-400/20 to-transparent mb-6" />
                <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-4 h-4 text-amber-400/60" />
                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600">Notificaciones</p>
                </div>

                <form onSubmit={handleNotifications} className="space-y-5">
                    <SectionResult success={notifSuccess} error={notifError} />

                    {[
                        { label: 'Notificaciones por email', desc: 'Recibe actualizaciones importantes en tu correo', value: notifyEmail, onChange: setNotifyEmail },
                        { label: 'Novedades del producto', desc: 'Enterate de nuevas funcionalidades y mejoras', value: notifyProduct, onChange: setNotifyProduct },
                    ].map(({ label, desc, value, onChange }) => (
                        <div key={label} className="flex items-center justify-between py-3 border-b border-slate-800/40 last:border-b-0">
                            <div>
                                <p className="text-xs text-slate-300">{label}</p>
                                <p className="text-[11px] text-slate-600 mt-0.5">{desc}</p>
                            </div>
                            <Toggle checked={value} onChange={onChange} />
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <motion.button type="submit" disabled={notifLoading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.12em] hover:bg-amber-50 transition-colors disabled:opacity-50">
                            {notifLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Guardando...</> : 'Guardar'}
                        </motion.button>
                    </div>
                </form>
            </div>

            <div className="bg-[#080810] border border-slate-800/60 p-6 md:p-8">
                <div className="h-px bg-gradient-to-r from-amber-400/20 to-transparent mb-6" />
                <div className="flex items-center gap-3 mb-6">
                    <Shield className="w-4 h-4 text-amber-400/60" />
                    <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600">Privacidad</p>
                </div>

                <form onSubmit={handlePrivacy} className="space-y-5">
                    <SectionResult success={privacySuccess} error={privacyError} />

                    {[
                        { label: 'Perfil publico', desc: 'Permite que otros usuarios vean tu perfil', value: profilePublic, onChange: setProfilePublic },
                        { label: 'Mostrar email', desc: 'Muestra tu email en tu perfil publico', value: showEmail, onChange: setShowEmail },
                    ].map(({ label, desc, value, onChange }) => (
                        <div key={label} className="flex items-center justify-between py-3 border-b border-slate-800/40 last:border-b-0">
                            <div>
                                <p className="text-xs text-slate-300">{label}</p>
                                <p className="text-[11px] text-slate-600 mt-0.5">{desc}</p>
                            </div>
                            <Toggle checked={value} onChange={onChange} />
                        </div>
                    ))}

                    <div className="flex justify-end">
                        <motion.button type="submit" disabled={privacyLoading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="flex items-center gap-2 px-6 py-2.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.12em] hover:bg-amber-50 transition-colors disabled:opacity-50">
                            {privacyLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Guardando...</> : 'Guardar'}
                        </motion.button>
                    </div>
                </form>
            </div>
        </div>
    )
}