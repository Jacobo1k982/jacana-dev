"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, Check, AlertCircle, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import Link from "next/link"; // Asegúrate que sea de "next/link"
import { resetPassword } from "../actions/auth";

export default function ResetPassword() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    // Redirección automática si hay éxito
    useEffect(() => {
        if (message && message.includes("contraseña")) {
            const timer = setTimeout(() => {
                window.location.href = "/login";
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);

    // Validación de Fortaleza
    const getPasswordStrength = (pwd: string) => {
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (pwd.length >= 12) strength++;
        if (/[A-Z]/.test(pwd)) strength++;
        if (/[0-9]/.test(pwd)) strength++;
        if (/[^A-Za-z0-9]/.test(pwd)) strength++;
        return strength;
    };

    const getStrengthColor = (index: number) => {
        if (index < strength) {
            if (strength <= 2) return "bg-[#f85149]"; // Red (Débil)
            if (strength === 3) return "bg-[#d29922]"; // Naranja (Regular)
            return "bg-[#238636]"; // Verde (Fuerte)
        }
        return "bg-[#30363d]"; // Inactivo
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        if (password.length < 8) {
            setError("La contraseña debe tener al menos 8 caracteres.");
            return;
        }

        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        formData.append("token", token || "");
        formData.append("email", email || "");

        const res = await resetPassword(formData);

        setIsLoading(false);

        if (res.success) setMessage(res.message!);
        if (res.error) setError(res.error);
    }

    // Estado de Enlace Inválido
    if (!token || !email) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 bg-[#0d1117]">
                {/* Patrón de fondo */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}
                />

                <div className="max-w-md w-full text-center z-10">
                    <div className="p-6 rounded-md border border-[#f85149]/20 bg-[#f85149]/10">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <AlertCircle className="w-12 h-12 text-[#f85149]" />
                            <h2 className="text-xl font-semibold text-[#f0f6fc]">Enlace Inválido</h2>
                        </div>
                        <p className="text-[#8b949e] mb-6">
                            El enlace de restablecimiento es inválido o ha expirado. Por favor, solicita uno nuevo.
                        </p>
                        <Link
                            href="/forgot-password"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[#58a6ff] hover:text-[#79c0ff] bg-[#161b22] rounded-md border border-[#30363d] hover:border-[#8b949e] transition-all"
                        >
                            Solicitar nuevo enlace
                            <RefreshCw className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex flex flex-col items-center justify-center px-4 py-12 bg-[#0d1117]">

            {/* Patrón de fondo sutil */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="relative z-10 w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-[#f0f6fc] mb-2">Set a new password</h1>
                    <p className="text-sm text-[#8b949e]">
                        for <span className="text-[#c9d1d9]">{email}</span>
                    </p>
                </div>

                {/* Card Principal */}
                <div className="rounded-md border border-[#30363d] bg-[#161b22] shadow-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Alerta de Error Global */}
                        {error && (
                            <div className="p-3 rounded-md bg-[#f85149]/10 border border-[#f85149] text-[#f85149] text-sm flex items-center gap-2">
                                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                {error}
                            </div>
                        )}

                        {/* Input Contraseña */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-[#c9d1d9]">
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#8b949e]" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setError("")}
                                    placeholder="New password"
                                    required
                                    className={`
                                        w-full pl-10 pr-10 py-2 bg-[#0d1117] border rounded-md text-[#c9d1d9] placeholder-[#484f58]
                                        focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset
                                        transition-colors duration-200
                                        ${error ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
                                    `}
                                    disabled={isLoading}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-2.5 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
                                    disabled={isLoading}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            {/* Barra de Fuerza */}
                            {password && (
                                <div className="mt-3 space-y-2">
                                    <div className="flex gap-1 h-1">
                                        {[0, 1, 2, 3, 4].map((index) => (
                                            <div
                                                key={index}
                                                className={`flex-1 rounded-full transition-colors duration-300 ${getStrengthColor(index)}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input Confirmar Contraseña */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#c9d1d9]">
                                Confirm new password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#8b949e]" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setError("")}
                                    placeholder="Confirm password"
                                    required
                                    className={`
                                        w-full pl-10 pr-10 py-2 bg-[#0d1117] border rounded-md text-[#c9d1d9] placeholder-[#484f58]
                                        focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset
                                        transition-colors duration-200
                                        border-[#30363d]
                                    `}
                                    disabled={isLoading}
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-2.5 text-[#8b949e] hover:text-[#c9d1d9] transition-colors"
                                    disabled={isLoading}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>

                            {/* Requisitos de contraseña (Elegancia Extra) */}
                            {password && (
                                <div className="grid grid-cols-2 gap-2 text-xs text-[#8b949e]">
                                    <div className="flex items-center gap-1.5">
                                        <Check className={`h-3 w-3 ${password.length >= 8 ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                        8+ chars
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Check className={`h-3 w-3 {/[A-Z]/.test(password) ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                        Uppercase
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Check className={`h-3 w-3 {/[0-9]/.test(password) ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                        Number
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Check className={`h-3 w-3 {/[^A-Za-z0-9]/.test(password) ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                        Symbol
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Alerta de Éxito (Styled) */}
                        {message && (
                            <div className="p-4 rounded-md bg-[#238636]/10 border border-[#238636] text-[#3fb950] text-center animate-pulse">
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <Check className="h-4 w-4" />
                                    <span className="text-sm font-semibold">{message}</span>
                                </div>
                            </div>
                        )}

                        {/* Botón de Envío */}
                        <button
                            type="submit"
                            disabled={isLoading || !password}
                            className={`
                                relative w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white
                                rounded-md border border-transparent transition-all duration-200
                                ${isLoading
                                    ? "bg-[#2ea043]/70 cursor-not-allowed opacity-70"
                                    : "bg-[#238636] hover:bg-[#2ea043] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#238636] focus:ring-offset-[#161b22]"
                                }
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Updating...
                                </>
                            ) : (
                                <>
                                    Update password
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}