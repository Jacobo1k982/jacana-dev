'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Loader2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

// ============================================
// TYPES
// ============================================

interface LoginDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToRegister: () => void;
}

// ============================================
// COMPONENT
// ============================================

export function LoginDialog({ isOpen, onClose, onSwitchToRegister }: LoginDialogProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useAuthStore((state) => state.login);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError('Por favor completa todos los campos');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, rememberMe }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error al iniciar sesión');
            }

            login(data.user, data.token);
            onClose();
            setEmail('');
            setPassword('');
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
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-[#0a0a1a] border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

                        {/* Header */}
                        <div className="relative p-6 pb-4 border-b border-cyan-500/20">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-cyan-400/60 hover:text-cyan-400 hover:bg-cyan-500/10 rounded-full transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                Iniciar Sesión
                            </h2>
                            <p className="text-cyan-400/60 text-sm mt-1">
                                Bienvenido de vuelta a JACANA
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="relative p-6 space-y-5">
                            {/* Error message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm"
                                >
                                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                    <span>{error}</span>
                                </motion.div>
                            )}

                            {/* Email field */}
                            <div className="space-y-2">
                                <label className="text-sm text-cyan-400/80 font-medium">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/40" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="tu@email.com"
                                        className="w-full pl-10 pr-4 py-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg text-white placeholder-cyan-400/30 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/10 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Password field */}
                            <div className="space-y-2">
                                <label className="text-sm text-cyan-400/80 font-medium">Contraseña</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-cyan-400/40" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full pl-10 pr-12 py-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg text-white placeholder-cyan-400/30 focus:outline-none focus:border-cyan-500/50 focus:bg-cyan-500/10 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/40 hover:text-cyan-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Remember me */}
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-cyan-500/30 bg-cyan-500/5 text-cyan-500 focus:ring-cyan-500/50"
                                    />
                                    <span className="text-sm text-cyan-400/60">Recordarme</span>
                                </label>
                                <button
                                    type="button"
                                    className="text-sm text-cyan-400/60 hover:text-cyan-400 transition-colors"
                                >
                                    ¿Olvidaste tu contraseña?
                                </button>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-lg hover:from-cyan-400 hover:to-blue-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Iniciando sesión...</span>
                                    </>
                                ) : (
                                    <span>Iniciar Sesión</span>
                                )}
                            </button>

                            {/* Switch to register */}
                            <p className="text-center text-sm text-cyan-400/60">
                                ¿No tienes una cuenta?{' '}
                                <button
                                    type="button"
                                    onClick={onSwitchToRegister}
                                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                                >
                                    Regístrate
                                </button>
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
