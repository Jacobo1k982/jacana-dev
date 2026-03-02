"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);

    const { user, register } = useContext(AuthContext);
    const router = useRouter();

    // Password strength calculator
    const passwordStrength = useMemo(() => {
        if (!password) return { score: 0, label: "", color: "" };

        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) return { score, label: "Débil", color: "#f85149" };
        if (score <= 4) return { score, label: "Media", color: "#d29922" };
        return { score, label: "Fuerte", color: "#00A0E4" };
    }, [password]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (!acceptTerms) {
            setError("Debes aceptar los términos y condiciones");
            return;
        }

        setLoading(true);

        try {
            await register(name, email, password);
            router.push("/");
        } catch {
            setError("Error al crear la cuenta. Intenta nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d1117] relative overflow-hidden py-8">
            {/* Animated background grid - Jacana Blue */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,160,228,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,160,228,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

            {/* Multiple glow effects - Jacana Blue */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#00A0E4]/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#005A9C]/10 rounded-full blur-[100px] animate-pulse delay-1000" />

            {/* Floating particles effect - Jacana Blue */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#00A0E4]/40 rounded-full"
                        initial={{
                            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                            opacity: 0
                        }}
                        animate={{
                            y: [null, -20, 20],
                            opacity: [0, 0.6, 0]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md p-10 bg-[#161b22]/90 border border-[#30363d] rounded-2xl shadow-2xl relative z-10 backdrop-blur-xl"
            >
                {/* Scanline effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] opacity-10" />
                </div>

                {/* Header con logo */}
                <div className="mb-8 text-center relative">
                    <motion.div
                        className="inline-block mb-4 relative"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        {/* Glow behind logo - Jacana Blue */}
                        <div className="absolute inset-0 bg-[#00A0E4]/30 rounded-full blur-xl scale-150" />

                        <div className="relative p-1 bg-gradient-to-br from-[#005A9C] via-[#00A0E4] to-[#005A9C] rounded-full">
                            <div className="p-3 bg-[#161b22] rounded-full">
                                <img
                                    src="/perfil.png"
                                    alt="Logo"
                                    className="w-16 h-16 object-contain rounded-full"
                                />
                            </div>
                        </div>
                    </motion.div>

                    <motion.h1
                        className="text-2xl font-bold text-white tracking-tight"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <span className="bg-gradient-to-r from-[#00A0E4] via-[#00A0E4] to-[#005A9C] bg-clip-text text-transparent">
                            Crear
                        </span>
                        {" "}Cuenta
                    </motion.h1>

                    <motion.p
                        className="text-[#8b949e] text-sm mt-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        Únete al repositorio
                    </motion.p>

                    {/* Terminal prompt decoration - Jacana Blue */}
                    <motion.div
                        className="flex items-center justify-center gap-2 mt-4 text-xs text-[#484f58] font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="text-[#00A0E4]">$</span>
                        <span className="text-[#8b949e]">git clone --user</span>
                        <span className="w-2 h-4 bg-[#00A0E4] animate-pulse" />
                    </motion.div>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-6 p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                        <span className="text-red-400 text-sm font-medium">{error}</span>
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Nombre */}
                    <motion.div
                        className="group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <label className="flex items-center gap-2 text-[#c9d1d9] mb-1.5 text-xs font-medium uppercase tracking-wide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A0E4]"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            Nombre de Usuario
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-3 bg-[#0d1117] text-[#c9d1d9] rounded-lg border border-[#30363d] focus:border-[#00A0E4] focus:ring-2 focus:ring-[#00A0E4]/20 outline-none transition-all duration-300 placeholder-[#484f58] font-mono text-sm"
                                placeholder="octocat"
                                required
                            />
                            {name && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A0E4]"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div
                        className="group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                    >
                        <label className="flex items-center gap-2 text-[#c9d1d9] mb-1.5 text-xs font-medium uppercase tracking-wide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A0E4]"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-[#0d1117] text-[#c9d1d9] rounded-lg border border-[#30363d] focus:border-[#00A0E4] focus:ring-2 focus:ring-[#00A0E4]/20 outline-none transition-all duration-300 placeholder-[#484f58] font-mono text-sm"
                            placeholder="usuario@ejemplo.com"
                            required
                        />
                    </motion.div>

                    {/* Contraseña */}
                    <motion.div
                        className="group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <label className="flex items-center gap-2 text-[#c9d1d9] mb-1.5 text-xs font-medium uppercase tracking-wide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A0E4]"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 pr-10 bg-[#0d1117] text-[#c9d1d9] rounded-lg border border-[#30363d] focus:border-[#00A0E4] focus:ring-2 focus:ring-[#00A0E4]/20 outline-none transition-all duration-300 placeholder-[#484f58] font-mono text-sm"
                                placeholder="••••••••"
                                required
                                minLength={6}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#484f58] hover:text-[#00A0E4] transition-colors"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                            </button>
                        </div>

                        {/* Password strength indicator */}
                        {password && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="mt-2"
                            >
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="flex-1 flex gap-1">
                                        {[...Array(6)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="h-1 flex-1 rounded-full transition-all duration-300"
                                                style={{
                                                    backgroundColor: i < passwordStrength.score
                                                        ? passwordStrength.color
                                                        : "#30363d"
                                                }}
                                            />
                                        ))}
                                    </div>
                                    <span
                                        className="text-xs font-medium"
                                        style={{ color: passwordStrength.color }}
                                    >
                                        {passwordStrength.label}
                                    </span>
                                </div>
                                <p className="text-[#484f58] text-xs">
                                    Usa 8+ caracteres, mayúsculas, números y símbolos
                                </p>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Confirmar Contraseña */}
                    <motion.div
                        className="group"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.35 }}
                    >
                        <label className="flex items-center gap-2 text-[#c9d1d9] mb-1.5 text-xs font-medium uppercase tracking-wide">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A0E4]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                            Confirmar Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-3 pr-10 bg-[#0d1117] text-[#c9d1d9] rounded-lg border border-[#30363d] focus:border-[#00A0E4] focus:ring-2 focus:ring-[#00A0E4]/20 outline-none transition-all duration-300 placeholder-[#484f58] font-mono text-sm"
                                placeholder="••••••••"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#484f58] hover:text-[#00A0E4] transition-colors"
                            >
                                {showConfirmPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                )}
                            </button>
                        </div>

                        {/* Password match indicator */}
                        {confirmPassword && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="mt-1 flex items-center gap-1"
                            >
                                {password === confirmPassword ? (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00A0E4]"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                                        <span className="text-[#00A0E4] text-xs">Las contraseñas coinciden</span>
                                    </>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f85149]"><circle cx="12" cy="12" r="10" /><line x1="15" x2="9" y1="9" y2="15" /><line x1="9" x2="15" y1="9" y2="15" /></svg>
                                        <span className="text-[#f85149] text-xs">Las contraseñas no coinciden</span>
                                    </>
                                )}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Terms checkbox */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-start gap-3 py-2"
                    >
                        <button
                            type="button"
                            onClick={() => setAcceptTerms(!acceptTerms)}
                            className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-all duration-200 ${acceptTerms
                                ? "bg-[#00A0E4] border-[#00A0E4]"
                                : "bg-transparent border-[#30363d] hover:border-[#484f58]"
                                }`}
                        >
                            {acceptTerms && (
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20 6 9 17l-5-5" /></svg>
                            )}
                        </button>
                        <label className="text-[#8b949e] text-xs leading-relaxed">
                            Acepto los{" "}
                            <a href="#" className="text-[#00A0E4] hover:text-[#79c0ff] hover:underline">
                                Términos de Servicio
                            </a>
                            {" "}y la{" "}
                            <a href="#" className="text-[#00A0E4] hover:text-[#79c0ff] hover:underline">
                                Política de Privacidad
                            </a>
                        </label>
                    </motion.div>

                    <motion.button
                        type="submit"
                        disabled={loading || !acceptTerms}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="w-full mt-2 relative overflow-hidden bg-gradient-to-r from-[#005A9C] via-[#00A0E4] to-[#005A9C] bg-[length:200%_100%] hover:bg-right text-white p-3 rounded-lg font-semibold text-sm transition-all duration-500 shadow-[0_0_20px_rgba(0,160,228,0.4)] hover:shadow-[0_0_30px_rgba(0,160,228,0.6)] disabled:opacity-50 disabled:cursor-not-allowed border border-[rgba(255,255,255,0.1)] group"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            {loading ? (
                                <>
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>Procesando...</span>
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
                                    <span>Crear Cuenta</span>
                                </>
                            )}
                        </span>

                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </motion.button>
                </form>

                {/* Divider */}
                <motion.div
                    className="flex items-center gap-4 my-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
                    <span className="text-[#484f58] text-xs uppercase tracking-wider">o continúa con</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#30363d] to-transparent" />
                </motion.div>

                {/* Social login buttons */}
                <motion.div
                    className="grid grid-cols-2 gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                >
                    <button className="flex items-center justify-center gap-2 p-2.5 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] hover:border-[#484f58] rounded-lg transition-all duration-200 group">
                        <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span className="text-[#c9d1d9] text-sm font-medium">GitHub</span>
                    </button>
                    <button className="flex items-center justify-center gap-2 p-2.5 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] hover:border-[#484f58] rounded-lg transition-all duration-200 group">
                        <svg className="w-5 h-5 text-white group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span className="text-[#c9d1d9] text-sm font-medium">Google</span>
                    </button>
                </motion.div>

                <motion.div
                    className="mt-8 pt-6 border-t border-[#30363d] text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    <p className="text-[#8b949e] text-xs">
                        ¿Ya tienes cuenta?{" "}
                        <Link href="/login" className="text-[#00A0E4] hover:text-[#79c0ff] hover:underline transition-colors font-medium">
                            Inicia sesión
                        </Link>
                    </p>
                </motion.div>
            </motion.div>

            {/* Footer decoration - Jacana Blue */}
            <motion.div
                className="absolute bottom-4 left-0 right-0 text-center text-[#484f58] text-xs font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span className="text-[#00A0E4]">●</span> Registro seguro
                <span className="mx-2">|</span>
                <span className="text-[#00A0E4]">256-bit</span> encryption
            </motion.div>
        </div>
    );
}