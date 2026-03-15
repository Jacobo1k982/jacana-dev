'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, AtSign, Loader2, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';

// ============================================
// TYPES
// ============================================

interface RegisterDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

// ============================================
// COMPONENT
// ============================================

export function RegisterDialog({ isOpen, onClose, onSwitchToLogin }: RegisterDialogProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    const login = useAuthStore((state) => state.login);

    // Password strength calculation
    const passwordStrength = useMemo(() => {
        const requirements = [
            { met: password.length >= 8, text: 'Al menos 8 caracteres' },
            { met: password.length >= 12, text: '12+ caracteres (recomendado)' },
            { met: /[A-Z]/.test(password), text: 'Una mayúscula' },
            { met: /[a-z]/.test(password), text: 'Una minúscula' },
            { met: /[0-9]/.test(password), text: 'Un número' },
            { met: /[!@#$%^&*(),.?":{}|<>]/.test(password), text: 'Un carácter especial' },
        ];

        const metCount = requirements.filter((r) => r.met).length;
        const percentage = (metCount / requirements.length) * 100;

        let color = 'bg-red-500';
        let label = 'Muy débil';

        if (percentage >= 80) {
            color = 'bg-emerald-500';
            label = 'Muy fuerte';
        } else if (percentage >= 60) {
            color = 'bg-yellow-500';
            label = 'Fuerte';
        } else if (percentage >= 40) {
            color = 'bg-orange-500';
            label = 'Media';
        }

        return { requirements, metCount, percentage, color, label };
    }, [password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden');
            return;
        }

        // Validate minimum password requirements
        if (passwordStrength.metCount < 4) {
            setError('La contraseña es muy débil. Completa más requisitos.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    name: name || undefined,
                    username: username || undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.details) {
                    setFieldErrors(data.details);
                }
                throw new Error(data.error || 'Error al crear cuenta');
            }

            login(data.user, data.token);
            onClose();
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setName('');
            setUsername('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error al crear cuenta');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md bg-[#0a0a1a] border border-emerald-500/30 rounded-2xl shadow-2xl shadow-emerald-500/10 overflow-hidden my-8"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5 pointer-events-none" />

                        {/* Header */}
                        <div className="relative p-6 pb-4 border-b border-emerald-500/20">
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 text-emerald-400/60 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-full transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">
                                Crear Cuenta
                            </h2>
                            <p className="text-emerald-400/60 text-sm mt-1">
                                Únete a la comunidad de JACANA
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="relative p-6 space-y-4">
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

                            {/* Name and Username row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm text-emerald-400/80 font-medium">Nombre</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/40" />
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Tu nombre"
                                            className="w-full pl-9 pr-3 py-2.5 text-sm bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-400/30 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/10 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm text-emerald-400/80 font-medium">Username</label>
                                    <div className="relative">
                                        <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400/40" />
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) =>
                                                setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))
                                            }
                                            placeholder="username"
                                            className="w-full pl-9 pr-3 py-2.5 text-sm bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-400/30 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/10 transition-all"
                                        />
                                    </div>
                                    {fieldErrors.username && (
                                        <p className="text-xs text-red-400">{fieldErrors.username[0]}</p>
                                    )}
                                </div>
                            </div>

                            {/* Email field */}
                            <div className="space-y-2">
                                <label className="text-sm text-emerald-400/80 font-medium">
                                    Email <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/40" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="tu@email.com"
                                        required
                                        className="w-full pl-10 pr-4 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-400/30 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/10 transition-all"
                                    />
                                </div>
                                {fieldErrors.email && (
                                    <p className="text-xs text-red-400">{fieldErrors.email[0]}</p>
                                )}
                            </div>

                            {/* Password field */}
                            <div className="space-y-2">
                                <label className="text-sm text-emerald-400/80 font-medium">
                                    Contraseña <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/40" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full pl-10 pr-12 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg text-white placeholder-emerald-400/30 focus:outline-none focus:border-emerald-500/50 focus:bg-emerald-500/10 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400/40 hover:text-emerald-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                {/* Password strength indicator */}
                                {password && (
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-emerald-400/60">Fortaleza:</span>
                                            <span className={passwordStrength.color.replace('bg-', 'text-')}>
                                                {passwordStrength.label}
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-emerald-500/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${passwordStrength.percentage}%` }}
                                                className={`h-full ${passwordStrength.color} transition-colors`}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-1">
                                            {passwordStrength.requirements.slice(0, 4).map((req, i) => (
                                                <div
                                                    key={i}
                                                    className={`flex items-center gap-1.5 text-xs transition-colors ${req.met ? 'text-emerald-400' : 'text-emerald-400/40'
                                                        }`}
                                                >
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    <span>{req.text}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password field */}
                            <div className="space-y-2">
                                <label className="text-sm text-emerald-400/80 font-medium">
                                    Confirmar Contraseña <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400/40" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className={`w-full pl-10 pr-4 py-3 bg-emerald-500/5 border rounded-lg text-white placeholder-emerald-400/30 focus:outline-none focus:bg-emerald-500/10 transition-all ${confirmPassword && password !== confirmPassword
                                                ? 'border-red-500/50'
                                                : confirmPassword && password === confirmPassword
                                                    ? 'border-emerald-500/50'
                                                    : 'border-emerald-500/20'
                                            }`}
                                    />
                                </div>
                            </div>

                            {/* Submit button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-lg hover:from-emerald-400 hover:to-cyan-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Creando cuenta...</span>
                                    </>
                                ) : (
                                    <span>Crear Cuenta</span>
                                )}
                            </button>

                            {/* Switch to login */}
                            <p className="text-center text-sm text-emerald-400/60">
                                ¿Ya tienes una cuenta?{' '}
                                <button
                                    type="button"
                                    onClick={onSwitchToLogin}
                                    className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
                                >
                                    Inicia sesión
                                </button>
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
