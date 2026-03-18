'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, Eye, EyeOff, AlertCircle, ArrowRight } from 'lucide-react';

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) {
            setError('Por favor completa todos los campos');
            return;
        }
        setIsLoading(true);
        try {
            const res = await signIn('credentials', { email, password, redirect: false });
            if (res?.error) {
                setError('Email o contrasena incorrectos');
                return;
            }
            onClose();
            setEmail('');
            setPassword('');
            window.location.href = '/';
        } catch {
            setError('Error al iniciar sesion');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOAuth = async (provider: 'google' | 'github') => {
        setIsLoading(true);
        await signIn(provider, { callbackUrl: '/' });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-[#06051d]/80 backdrop-blur-md"
            />
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-sm bg-[#080810] border border-slate-800/80 shadow-2xl shadow-black/60"
            >
                <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

                <div className="relative px-8 pt-8 pb-6 border-b border-slate-800/60">
                    <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 text-slate-600 hover:text-slate-300 transition-all">
                        <X className="w-3.5 h-3.5" />
                    </button>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/60 mb-3">Bienvenido de vuelta</p>
                    <h2 className="text-3xl font-light text-white" style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
                        Iniciar sesion
                    </h2>
                </div>

                <form onSubmit={handleSubmit} className="relative px-8 py-7 space-y-6">
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
                            className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors hover:border-slate-500/80"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                            <Lock className="w-3 h-3 text-amber-400/60" />
                            Contrasena
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-0 py-3 pr-8 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors hover:border-slate-500/80"
                            />
                            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors">
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                            <div onClick={() => setRememberMe(!rememberMe)} className={`w-4 h-4 border flex items-center justify-center transition-all cursor-pointer ${rememberMe ? 'border-amber-400/60 bg-amber-400/10' : 'border-slate-700/60 group-hover:border-slate-500/80'}`}>
                                {rememberMe && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 bg-amber-400/80" />}
                            </div>
                            <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">Recordarme</span>
                        </label>
                        <a href="/forgot-password" className="text-[10px] uppercase tracking-[0.15em] text-slate-600 hover:text-amber-400/70 transition-colors">Olvidaste tu contrasena?</a>
                    </div>

                    <div className="pt-2 space-y-3">
                        <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? (
                                <><Loader2 className="w-3.5 h-3.5 animate-spin" />Iniciando sesion...</>
                            ) : (
                                <>Iniciar sesion<ArrowRight className="w-3.5 h-3.5" /></>
                            )}
                        </motion.button>

                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-slate-800/60" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600">o continua con</span>
                            <div className="flex-1 h-px bg-slate-800/60" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <button type="button" onClick={() => handleOAuth('google')} disabled={isLoading} className="flex items-center justify-center gap-2 py-2.5 border border-slate-700/60 hover:border-slate-500/80 text-slate-400 hover:text-white text-xs transition-all disabled:opacity-50">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>
                            <button type="button" onClick={() => handleOAuth('github')} disabled={isLoading} className="flex items-center justify-center gap-2 py-2.5 border border-slate-700/60 hover:border-slate-500/80 text-slate-400 hover:text-white text-xs transition-all disabled:opacity-50">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                                </svg>
                                GitHub
                            </button>
                        </div>
                    </div>

                    <p className="text-center text-xs text-slate-600 pt-1">
                        No tienes una cuenta?{' '}
                        <button type="button" onClick={onSwitchToRegister} className="text-slate-400 hover:text-amber-400/80 transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-amber-400/40">
                            Registrate
                        </button>
                    </p>
                </form>

                <div className="h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />
            </motion.div>
        </div>
    );
}