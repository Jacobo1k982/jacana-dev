"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    // Simulated token/email validation (in real app, these come from URL params)
    const token = "demo-token";
    const email = "usuario@ejemplo.com";

    // Password strength calculator
    const passwordStrength = useMemo(() => {
        if (!password) return { score: 0, label: "", color: "" };
        
        let score = 0;
        if (password.length >= 8) score++;
        if (password.length >= 12) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 2) return { score, label: "Débil", color: "#f85149" };
        if (score <= 4) return { score, label: "Media", color: "#d29922" };
        return { score, label: "Fuerte", color: "#3fb950" };
    }, [password]);

    // Password requirements
    const requirements = [
        { label: "8+ caracteres", met: password.length >= 8 },
        { label: "Mayúscula", met: /[A-Z]/.test(password) },
        { label: "Minúscula", met: /[a-z]/.test(password) },
        { label: "Número", met: /[0-9]/.test(password) },
        { label: "Especial", met: /[^A-Za-z0-9]/.test(password) },
    ];

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
            return;
        }

        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres");
            return;
        }

        setIsLoading(true);

        // Simulación de actualización
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setIsLoading(false);
        setSuccess(true);
    }

    // Estado de Enlace Inválido
    if (!token || !email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0d1117] relative overflow-hidden">
                {/* Animated background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(248,81,73,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(248,81,73,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
                
                {/* Glow effects */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#f85149]/10 rounded-full blur-[120px] animate-pulse" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md p-8 bg-[#161b22]/90 border border-[#f85149]/30 rounded-2xl shadow-2xl relative z-10 backdrop-blur-xl text-center"
                >
                    {/* Icon */}
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#f85149]/10 border border-[#f85149]/30 mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f85149]"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                        Enlace Inválido
                    </h2>
                    <p className="text-[#8b949e] text-sm mb-8 font-mono">
                        El token de acceso ha expirado o es inválido.
                    </p>
                    
                    <a
                        href="/forgot-password"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[#c9d1d9] bg-[#21262d] border border-[#30363d] rounded-lg hover:bg-[#30363d] hover:border-[#484f58] transition-all duration-200 group"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-180 transition-transform duration-500"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 16h5v5" /></svg>
                        Generar nuevo enlace
                    </a>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d1117] relative overflow-hidden py-8">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(163,113,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(163,113,247,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
            
            {/* Multiple glow effects - Púrpura/Violeta para reset */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#a371f7]/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#8957e5]/10 rounded-full blur-[100px] animate-pulse delay-1000" />
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-[#a371f7]/40 rounded-full"
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

            <AnimatePresence mode="wait">
                {!success ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
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
                                {/* Glow behind logo */}
                                <div className="absolute inset-0 bg-[#a371f7]/30 rounded-full blur-xl scale-150" />
                                
                                <div className="relative p-1 bg-gradient-to-br from-[#a371f7] via-[#8957e5] to-[#a371f7] rounded-full">
                                    <div className="p-3 bg-[#161b22] rounded-full">
                                        <img 
                                            src="/perfil.png" 
                                            alt="Logo" 
                                            className="w-16 h-16 object-contain rounded-full"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#30363d] bg-[#21262d] text-xs text-[#8b949e] font-mono uppercase tracking-wider mb-4"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#a371f7]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                                Secure Reset
                            </motion.div>
                            
                            <motion.h1 
                                className="text-2xl font-bold text-white tracking-tight"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <span className="bg-gradient-to-r from-[#a371f7] via-[#8957e5] to-[#a371f7] bg-clip-text text-transparent">
                                    Restablecer
                                </span>
                                {" "}Contraseña
                            </motion.h1>
                            
                            <motion.p 
                                className="text-[#8b949e] text-sm mt-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Actualizando credenciales para{" "}
                                <span className="text-[#a371f7] font-mono">{email}</span>
                            </motion.p>

                            {/* Terminal prompt decoration */}
                            <motion.div 
                                className="flex items-center justify-center gap-2 mt-4 text-xs text-[#484f58] font-mono"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className="text-[#a371f7]">$</span>
                                <span className="text-[#8b949e]">password_update --secure</span>
                                <span className="w-2 h-4 bg-[#a371f7] animate-pulse" />
                            </motion.div>
                        </div>

                        {/* System Module Container */}
                        <div className="rounded-xl border border-[#30363d] bg-[#0d1117]/50 overflow-hidden">
                            {/* Header Bar Simulada */}
                            <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-[#30363d]">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-[#8b949e] font-mono">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></svg>
                                    password_update.sh
                                </div>
                            </div>

                            <div className="p-6">
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Error message */}
                                    <AnimatePresence>
                                        {error && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10, height: 0 }}
                                                animate={{ opacity: 1, y: 0, height: "auto" }}
                                                exit={{ opacity: 0, y: -10, height: 0 }}
                                                className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-2"
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                                <span className="text-red-400 text-sm">{error}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Nueva Contraseña */}
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <label className="flex items-center gap-2 text-[#c9d1d9] text-xs font-medium uppercase tracking-wide">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#a371f7]"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                            Nueva Contraseña
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#484f58] group-focus-within:text-[#a371f7] transition-colors"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-10 pr-10 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] placeholder-[#484f58] text-sm font-mono hover:border-[#484f58] focus:outline-none focus:border-[#a371f7] focus:ring-2 focus:ring-[#a371f7]/20 transition-all duration-200"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#484f58] hover:text-[#a371f7] transition-colors"
                                            >
                                                {showPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                                )}
                                            </button>
                                        </div>
                                        
                                        {/* Strength indicator */}
                                        {password && (
                                            <motion.div 
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                className="space-y-2"
                                            >
                                                <div className="flex items-center gap-2">
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
                                                
                                                {/* Requirements grid */}
                                                <div className="grid grid-cols-2 gap-1.5">
                                                    {requirements.map((req, i) => (
                                                        <div key={i} className="flex items-center gap-1.5 text-[10px] text-[#8b949e] font-mono">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: req.met ? "#3fb950" : "#30363d" }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                                                            {req.label}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>

                                    {/* Confirmar Contraseña */}
                                    <motion.div 
                                        className="space-y-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <label className="flex items-center gap-2 text-[#c9d1d9] text-xs font-medium uppercase tracking-wide">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#a371f7]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                                            Confirmar Contraseña
                                        </label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#484f58] group-focus-within:text-[#a371f7] transition-colors"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                                            </div>
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                value={confirmPassword}
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="w-full pl-10 pr-10 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] placeholder-[#484f58] text-sm font-mono hover:border-[#484f58] focus:outline-none focus:border-[#a371f7] focus:ring-2 focus:ring-[#a371f7]/20 transition-all duration-200"
                                                placeholder="••••••••"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#484f58] hover:text-[#a371f7] transition-colors"
                                            >
                                                {showConfirmPassword ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
                                                ) : (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                                                )}
                                            </button>
                                        </div>
                                        
                                        {/* Match indicator */}
                                        {confirmPassword && (
                                            <motion.div 
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="flex items-center gap-1.5"
                                            >
                                                {password === confirmPassword ? (
                                                    <>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3fb950]"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                                                        <span className="text-[#3fb950] text-xs">Las contraseñas coinciden</span>
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

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isLoading || !password}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full relative overflow-hidden bg-gradient-to-r from-[#a371f7] via-[#8957e5] to-[#a371f7] bg-[length:200%_100%] hover:bg-right text-white p-3 rounded-lg font-semibold text-sm transition-all duration-500 shadow-[0_0_20px_rgba(163,113,247,0.4)] hover:shadow-[0_0_30px_rgba(137,87,229,0.6)] disabled:opacity-50 disabled:cursor-not-allowed border border-[rgba(255,255,255,0.1)] group"
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-2">
                                            {isLoading ? (
                                                <>
                                                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                    <span>Actualizando...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-12 transition-transform"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                                                    <span>Actualizar Contraseña</span>
                                                </>
                                            )}
                                        </span>
                                        
                                        {/* Shimmer effect */}
                                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                                    </motion.button>
                                </form>
                            </div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full max-w-md p-10 bg-[#161b22]/90 border border-[#30363d] rounded-2xl shadow-2xl relative z-10 backdrop-blur-xl"
                    >
                        {/* Scanline effect */}
                        <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] opacity-10" />
                        </div>

                        {/* Success Content */}
                        <div className="text-center relative">
                            <motion.div 
                                className="inline-block mb-6 relative"
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                            >
                                {/* Glow behind icon */}
                                <div className="absolute inset-0 bg-[#3fb950]/30 rounded-full blur-xl scale-150" />
                                
                                <div className="relative p-4 bg-gradient-to-br from-[#238636] via-[#3fb950] to-[#2ea043] rounded-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
                                </div>
                            </motion.div>
                            
                            <motion.h1 
                                className="text-2xl font-bold text-white tracking-tight mb-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                <span className="bg-gradient-to-r from-[#3fb950] via-[#2ea043] to-[#238636] bg-clip-text text-transparent">
                                    ¡Contraseña Actualizada!
                                </span>
                            </motion.h1>
                            
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="rounded-xl border border-[#30363d] bg-[#0d1117]/50 p-6 mb-6"
                            >
                                <div className="flex items-start gap-3 text-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3fb950] shrink-0 mt-0.5"><rect width="18" height="11" x="3" y="11" rx="2" ry="2" /><path d="m7 11-4 0V7a5 5 0 0 1 9.9-1" /></svg>
                                    <div>
                                        <p className="text-[#c9d1d9] text-sm mb-2">
                                            Tu contraseña ha sido restablecida exitosamente para:
                                        </p>
                                        <p className="text-[#a371f7] font-mono text-sm bg-[#161b22] px-3 py-2 rounded-md border border-[#30363d]">
                                            {email}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                            
                            <motion.p 
                                className="text-[#8b949e] text-sm mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Ya puedes usar tu nueva contraseña para iniciar sesión.
                            </motion.p>

                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <a
                                    href="/login"
                                    className="inline-flex items-center justify-center gap-2 w-full p-3 bg-gradient-to-r from-[#238636] via-[#2ea043] to-[#238636] text-white rounded-lg text-sm font-semibold transition-all duration-200 group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                                    Ir a Iniciar Sesión
                                </a>
                            </motion.div>

                            {/* Security tips */}
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="mt-6 p-4 rounded-lg bg-[#161b22] border border-[#30363d] text-left"
                            >
                                <p className="text-[#8b949e] text-xs font-medium mb-2">🔒 Consejos de seguridad:</p>
                                <ul className="text-[#484f58] text-xs space-y-1">
                                    <li>• No compartas tu contraseña con nadie</li>
                                    <li>• Usa una contraseña única para cada cuenta</li>
                                    <li>• Considera usar un gestor de contraseñas</li>
                                </ul>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer decoration */}
            <motion.div 
                className="absolute bottom-4 left-0 right-0 text-center text-[#484f58] text-xs font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span className="text-[#a371f7]">●</span> Restablecimiento seguro 
                <span className="mx-2">|</span>
                <span className="text-[#8957e5]">256-bit</span> encryption
            </motion.div>
        </div>
    );
}