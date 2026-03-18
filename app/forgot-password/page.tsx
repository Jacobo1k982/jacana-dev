// app/forgot-password/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            if (!res.ok) throw new Error('Error al enviar el correo')
            setSuccess(true)
        } catch {
            setError('Error al enviar el correo. Intenta de nuevo.')
        } finally {
            setIsLoading(false)
        }
    }

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
                        Recuperar<br />
                        <em className="text-slate-400 not-italic">contraseña</em>
                    </h2>
                </div>

                <div className="px-8 py-7">
                    {success ? (
                        <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex flex-col items-center gap-4 text-center py-4"
                        >
                            <CheckCircle className="w-10 h-10 text-emerald-400/80" />
                            <p className="text-sm text-slate-300">Revisa tu correo — si el email existe recibirás las instrucciones.</p>
                            <a href="/login" className="text-[10px] uppercase tracking-[0.2em] text-amber-400/60 hover:text-amber-400 transition-colors">
                                Volver al login
                            </a>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <p className="text-xs text-slate-500 leading-relaxed">
                                Ingresa tu email y te enviaremos un link para restablecer tu contraseña.
                            </p>

                            {error && (
                                <div className="flex items-center gap-3 p-3 border-l-2 border-red-500/60 bg-red-500/5">
                                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                    <span className="text-xs text-red-400/90">{error}</span>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    <Mail className="w-3 h-3 text-amber-400/60" />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
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
                                    <><Loader2 className="w-3.5 h-3.5 animate-spin" />Enviando…</>
                                ) : (
                                    <>Enviar link<ArrowRight className="w-3.5 h-3.5" /></>
                                )}
                            </motion.button>

                            <p className="text-center text-xs text-slate-600">
                                <a href="/login" className="text-slate-400 hover:text-amber-400/80 transition-colors underline underline-offset-4 decoration-slate-700">
                                    Volver al login
                                </a>
                            </p>
                        </form>
                    )}
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />
            </motion.div>
        </div>
    )
}