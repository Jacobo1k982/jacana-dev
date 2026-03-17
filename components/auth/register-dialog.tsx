'use client';

import { useState, useMemo } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, AtSign, Loader2, Eye, EyeOff, AlertCircle, ArrowRight, Check } from 'lucide-react';

interface RegisterDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSwitchToLogin: () => void;
}

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

    const router = useRouter();

    const passwordStrength = useMemo(() => {
        const requirements = [
            { met: password.length >= 8, text: '8+ caracteres' },
            { met: password.length >= 12, text: '12+ caracteres' },
            { met: /[A-Z]/.test(password), text: 'Una mayúscula' },
            { met: /[a-z]/.test(password), text: 'Una minúscula' },
            { met: /[0-9]/.test(password), text: 'Un número' },
            { met: /[!@#$%^&*(),.?":{}|<>]/.test(password), text: 'Carácter especial' },
        ];
        const metCount = requirements.filter(r => r.met).length;
        const percentage = (metCount / requirements.length) * 100;
        let label = 'Muy débil';
        let color = 'bg-red-500/70';
        let textColor = 'text-red-400';
        if (percentage >= 80) { label = 'Muy fuerte'; color = 'bg-emerald-500/70'; textColor = 'text-emerald-400'; }
        else if (percentage >= 60) { label = 'Fuerte'; color = 'bg-amber-400/70'; textColor = 'text-amber-400'; }
        else if (percentage >= 40) { label = 'Media'; color = 'bg-orange-500/70'; textColor = 'text-orange-400'; }
        return { requirements, metCount, percentage, color, textColor, label };
    }, [password]);

    const passwordsMatch = confirmPassword && password === confirmPassword;
    const passwordsMismatch = confirmPassword && password !== confirmPassword;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setFieldErrors({});
        if (password !== confirmPassword) { setError('Las contraseñas no coinciden'); return; }
        if (passwordStrength.metCount < 4) { setError('La contraseña es muy débil. Completa más requisitos.'); return; }
        setIsLoading(true);
        try {
            // 1 — Crear el usuario
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    name: name || undefined,
                    username: username || undefined
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                if (data.details) setFieldErrors(data.details);
                throw new Error(data.error || 'Error al crear cuenta');
            }

            // 2 — Login automático tras registro exitoso
            const signInRes = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (signInRes?.error) {
                // La cuenta se creó pero el login falló — redirige al login
                onClose();
                onSwitchToLogin();
                return;
            }

            // 3 — Redirigir al dashboard
            onClose();
            setEmail(''); setPassword(''); setConfirmPassword(''); setName(''); setUsername('');
            router.push('/dashboard');
            router.refresh();
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
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-[#06051d]/80 backdrop-blur-md"
                    />
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 16 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full max-w-sm bg-[#080810] border border-slate-800/80 shadow-2xl shadow-black/60 my-8"
                    >
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
                        <div
                            className="absolute inset-0 opacity-[0.025] pointer-events-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                                backgroundSize: '128px 128px',
                            }}
                        />
                        <div className="relative px-8 pt-8 pb-6 border-b border-slate-800/60">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center border border-slate-700/60 hover:border-amber-400/40 text-slate-600 hover:text-slate-300 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                            </button>
                            <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/60 mb-3">
                                — Únete a Jacana Dev
                            </p>
                            <h2
                                className="text-3xl font-light text-white"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                Crear<br />
                                <em className="text-slate-400 not-italic">cuenta</em>
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="relative px-8 py-7 space-y-6">
                            <AnimatePresence>
                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex items-center gap-3 p-3 border-l-2 border-red-500/60 bg-red-500/5"
                                    >
                                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                        <span className="text-xs text-red-400/90">{error}</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                        <User className="w-3 h-3 text-amber-400/60" />
                                        Nombre
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        placeholder="Tu nombre"
                                        className="w-full px-0 py-2.5 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors hover:border-slate-500/80"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                        <AtSign className="w-3 h-3 text-amber-400/60" />
                                        Username
                                    </label>
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                                        placeholder="usuario"
                                        className="w-full px-0 py-2.5 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors hover:border-slate-500/80"
                                    />
                                    {fieldErrors.username && (
                                        <p className="text-[11px] text-red-400/80">{fieldErrors.username[0]}</p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    <Mail className="w-3 h-3 text-amber-400/60" />
                                    Email <span className="text-amber-400/60">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="tu@email.com"
                                    required
                                    className="w-full px-0 py-3 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors hover:border-slate-500/80"
                                />
                                {fieldErrors.email && (
                                    <p className="text-[11px] text-red-400/80">{fieldErrors.email[0]}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    <Lock className="w-3 h-3 text-amber-400/60" />
                                    Contraseña <span className="text-amber-400/60">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full px-0 py-3 pr-8 bg-transparent border-b border-slate-700/60 text-white text-sm placeholder-slate-700 focus:border-amber-400/60 focus:outline-none transition-colors hover:border-slate-500/80"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                <AnimatePresence>
                                    {password && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="space-y-3 pt-1 overflow-hidden"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex-1 flex gap-0.5">
                                                    {[...Array(6)].map((_, i) => (
                                                        <div
                                                            key={i}
                                                            className={`h-0.5 flex-1 transition-all duration-300 ${i < passwordStrength.metCount ? passwordStrength.color : 'bg-slate-800'}`}
                                                        />
                                                    ))}
                                                </div>
                                                <span className={`text-[10px] uppercase tracking-[0.15em] shrink-0 ${passwordStrength.textColor}`}>
                                                    {passwordStrength.label}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                                                {passwordStrength.requirements.slice(0, 4).map((req, i) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <span className={`w-3 h-3 flex items-center justify-center border transition-all ${req.met ? 'border-amber-400/60 bg-amber-400/10' : 'border-slate-700/60'}`}>
                                                            {req.met && <Check className="w-2 h-2 text-amber-400/80" />}
                                                        </span>
                                                        <span className={`text-[10px] transition-colors ${req.met ? 'text-slate-400' : 'text-slate-700'}`}>
                                                            {req.text}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-slate-500">
                                    <Lock className="w-3 h-3 text-amber-400/60" />
                                    Confirmar contraseña <span className="text-amber-400/60">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className={`w-full px-0 py-3 pr-8 bg-transparent border-b text-white text-sm placeholder-slate-700 focus:outline-none transition-colors ${passwordsMismatch ? 'border-red-500/50' : passwordsMatch ? 'border-emerald-500/40' : 'border-slate-700/60 hover:border-slate-500/80 focus:border-amber-400/60'}`}
                                    />
                                    <AnimatePresence>
                                        {passwordsMatch && (
                                            <motion.span
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center border border-emerald-500/40 bg-emerald-500/10"
                                            >
                                                <Check className="w-2.5 h-2.5 text-emerald-400" />
                                            </motion.span>
                                        )}
                                        {passwordsMismatch && (
                                            <motion.span
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-red-400/80"
                                            >
                                                ✕
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                            <div className="pt-2">
                                <motion.button
                                    type="submit"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <><Loader2 className="w-3.5 h-3.5 animate-spin" />Creando cuenta…</>
                                    ) : (
                                        <>Crear cuenta<ArrowRight className="w-3.5 h-3.5" /></>
                                    )}
                                </motion.button>
                            </div>
                            <p className="text-center text-xs text-slate-600 pt-1">
                                ¿Ya tienes una cuenta?{' '}
                                <button
                                    type="button"
                                    onClick={onSwitchToLogin}
                                    className="text-slate-400 hover:text-amber-400/80 transition-colors underline underline-offset-4 decoration-slate-700 hover:decoration-amber-400/40"
                                >
                                    Inicia sesión
                                </button>
                            </p>
                        </form>
                        <div className="h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}