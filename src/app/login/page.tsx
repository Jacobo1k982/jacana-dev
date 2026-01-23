"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        general?: string;
    }>({});

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);
        setErrors({});

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            // ⛔ Defensa crítica: no asumas JSON
            if (!response.ok) {
                const text = await response.text();

                try {
                    const data = JSON.parse(text);
                    setErrors({ general: data.error ?? "Login failed" });
                } catch {
                    console.error("Non-JSON error response:", text);
                    setErrors({ general: "Server error. Please try again." });
                }

                return;
            }

            // ✅ Aquí SÍ es seguro parsear JSON
            const data = await response.json();

            toast({
                title: "Success",
                description: "Welcome back! You've been logged in.",
            });

            router.push("/");
            router.refresh();

        } catch (error) {
            console.error("Login error:", error);
            setErrors({ general: "Network or server error. Please try again." });
        } finally {
            setIsLoading(false);
        }

    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="relative w-full max-w-md"
            >
                <div className="relative backdrop-blur-xl bg-slate-900/80 border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="p-8 border-b border-white/5">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                        >
                            <h1 className="text-3xl font-bold text-white mb-2">Bienvenido de nuevo</h1>
                            <p className="text-slate-400">Inicie sesión en su cuenta para continuar</p>
                        </motion.div>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* General error */}
                            {errors.general && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                                >
                                    {errors.general}
                                </motion.div>
                            )}

                            {/* Email */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-2"
                            >
                                <Label htmlFor="email" className="text-slate-300">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="tú@ejemplo.com"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        className={`pl-10 bg-slate-950/50 border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-cyan-400/20 ${errors.email ? "border-red-500/50 focus:border-red-500/50" : ""
                                            }`}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-sm text-red-400">{errors.email}</p>
                                )}
                            </motion.div>

                            {/* Password */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-2"
                            >
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-slate-300">
                                        Contraseña
                                    </Label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
                                    >
                                        Has olvidado tu contraseña?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                        className={`pl-10 pr-10 bg-slate-950/50 border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-cyan-400/20 ${errors.password ? "border-red-500/50 focus:border-red-500/50" : ""
                                            }`}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                                        disabled={isLoading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-400">{errors.password}</p>
                                )}
                            </motion.div>

                            {/* Submit button */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-white font-semibold py-6 text-base relative overflow-hidden group"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Iniciar sesión...
                                        </>
                                    ) : (
                                        <>
                                            Iniciar sesión
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                    {!isLoading && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/0 via-white/20 to-emerald-400/0 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    )}
                                </Button>
                            </motion.div>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900/80 px-2 text-slate-500">
                                    O continuar con
                                </span>
                            </div>
                        </div>

                        {/* Sign up link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-center"
                        >
                            <p className="text-slate-400">
                                No tengo una cuenta?{" "}
                                <Link
                                    href="/register"
                                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                                >
                                    Regístrate gratis
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}