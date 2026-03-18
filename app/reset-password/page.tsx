// app/reset-password/page.tsx
'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError(null)
        if (password !== confirm) { setError('Las contraseñas no coinciden'); return; }
        if (password.length < 8) { setError('La contraseña debe tener al menos 8 caracteres'); return; }
        setIsLoading(true)
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, password }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error || 'Error al restablecer')
            setSuccess(true)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al restablecer')
        } finally {
            setIsLoading(false)
        }
    }

    if (!token) {
        return (
            <div className="flex flex-col items-center gap-4 text-center py-4 px-8">
                <AlertCircle className="w-10 h-10 text-red-400/80" />
                <p className="text-sm text-slate-300">Link inválido o expirado.</p>
                <a href="/forgot-password" className="text-[10px] uppercase tracking-[0.2em] text-amber-400/60 hover:text-amber-400 transition-colors">
                    Solicitar nuevo link
                </a>
            </div>
        )
    }

    return (
        <div className="px-8 py-7">
            {success ? (
                <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4 text-center py-4"
                >
                    <CheckCircle className="w-10 h-10 text-emerald-400/80" />
                    <p className="text-sm text-slate-300">¡Contraseña actualizada! Ya puedes iniciar sesión.</p>
                    <a href="/login" className="text-[10px] uppercase tracking-[0.2em] text-amber-400/60 hover:text-amber-400 transition-colors">
                        Ir al login
                    </a>
                </motion.div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="flex items-center gap-3 p-3 border-l-2 border-red-500/60 bg-red-500/5">
                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                            <span className="text-xs text-red-400/90">{error}</span>
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            <Lock className="w-3 h-3 text-amber-400/60" />
                            Nueva contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full px-0 py-3 pr-8 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            <Lock className="w-3 h-3 text-amber-400/60" />
                            Confirmar contraseña
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={confirm}
                            onChange={e => setConfirm(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors"
                        />
                    </div>

                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <><Loader2 className="w-3.5 h-3.5 animate-spin" />Actualizando…</>
                        ) : (
                            <>Actualizar contraseña<ArrowRight className="w-3.5 h-3.5" /></>
                        )}
                    </motion.button>
                </form>
            )}
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-[#06051d] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-sm bg-[#080810] border border-slate-800/80 shadow-2xl"
            >
                <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                <div className="px-8 pt-8 pb-6 border-b border-slate-800/60">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/60 mb-3">— Jacana Dev</p>
                    <h2 className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        Nueva<br />
                        <em className="text-slate-400 not-italic">contraseña</em>
                    </h2>
                </div>
                <Suspense fallback={<div className="px-8 py-7 text-slate-500 text-sm">Cargando...</div>}>
                    <ResetPasswordForm />
                </Suspense>
                <div className="h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />
            </motion.div>
        </div>
    )
}