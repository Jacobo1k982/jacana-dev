'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

interface LoginDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

export function LoginDialog({ isOpen, onClose, onSwitchToRegister }: LoginDialogProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useAuthStore(s => s.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) { setError('Por favor completa todos los campos'); return; }
        setIsLoading(true);
        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, rememberMe }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Error al iniciar sesión');
            login(data.user, data.token);
            onClose();
            setEmail(''); setPassword('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#06051d]/80 backdrop-blur-md"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-sm bg-[#080810] border border-slate-800/80 shadow-2xl shadow-black/60"
                    >
                        {/* Top amber accent line */}
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

                        {/* Grain */}
                        <div
                            className="absolute inset-0 opacity-[0.025] pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                                backgroundSize: '128px 128px',
                            }}
                        />

                        {/* Header */}
                        <div className="relative px-8 pt-8 pb-6 border-b border-slate-800/60">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 text-slate-600 hover:text-slate-300 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>

                            <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/60 mb-3">
                                — Bienvenido de vuelta
                            </p>
                            <h2
                                className="text-3xl font-light text-white"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                Iniciar<br />
                                <em className="text-slate-400 not-italic">sesión</em>
                            </h2>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="relative px-8 py-7 space-y-6">

                            {/* Error */}
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -6 }}
                                        className="flex items-center gap-3 p-3 border-l-2 border-red-500/60 bg-red-500/5"
                                    >
                                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                        <span className="text-xs text-red-400/90">{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Email */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    <Mail className="w-3 h-3 text-amber-400/60" />
                                    Email
                                </label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        placeholder="tu@email.com"
                                        className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700
                                            focus:border-amber-400/60 focus:outline-none transition-colors hover:border-slate-500/80"
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    <Lock className="w-3 h-3 text-amber-400/60" />
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full px-0 py-3 pr-8 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700
                                            focus:border-amber-400/60 focus:outline-none transition-colors hover:border-slate-500/80"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                                    >
                                        {showPassword
                                            ? <EyeOff className="w-4 h-4" />
                                            : <Eye className="w-4 h-4" />
                                        }
                                    </button>
                                </div>
                            </div>

                            {/* Remember + forgot */}
                            <div className="flex items-center justify-between pt-1">
                                <label className="flex items-center gap-2.5 cursor-pointer group">
                                    <div
                                        onClick={() => setRememberMe(!rememberMe)}
                                        className={`w-4 h-4 border flex items-center justify-center transition-all cursor-pointer
                                            ${rememberMe
                                                ? 'border-amber-400/60 bg-amber-400/10'
                                                : 'border-slate-700/60 group-hover:border-slate-500/80'
                                            }`}
                                    >
                                        {rememberMe && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-2 h-2 bg-amber-400/80"
                                            />
                                        )}
                                    </div>
                                    <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">Recordarme</span>
                                </label>
                                <button
                                    type="button"
                                    className="text-[10px] uppercase tracking-[0.15em] text-slate-600 hover:text-amber-400/70 transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>

                            {/* Submit */}
                            <div className="pt-2">
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white text-[#080810]
                                        text-xs font-medium uppercase tracking-[0.15em]
                                        hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                            Iniciando sesión…
                                        </>
                                    ) : (
                                        <>
                                            Iniciar sesión
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </>
                                    )}
                                </motion.button>
                            </div>

                            {/* Switch */}
                            <p className="text-center text-xs text-slate-600 pt-1">
                                ¿No tienes una cuenta?{' '}
                                <button
                                    type="button"
                                    onClick={onSwitchToRegister}
                                    className="text-slate-400 hover:text-amber-400/80 transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-amber-400/40"
                                >
                                    Regístrate
                                </button>
                            </p>
                        </form>

                        {/* Bottom amber line */}
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}