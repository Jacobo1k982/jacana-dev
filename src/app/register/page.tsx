"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
        general?: string;
    }>({});

    const getPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        return strength;
    };

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!formData.name) {
            newErrors.name = "Name is required";
        } else if (formData.name.length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        }

        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Invalid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            newErrors.password = "Password must be at least 8 characters";
        } else if (getPasswordStrength(formData.password) < 3) {
            newErrors.password = "Password is too weak";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
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
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.error) {
                    setErrors({ general: data.error });
                } else {
                    setErrors({ general: "An error occurred. Please try again." });
                }
                return;
            }

            toast({
                title: "Account created!",
                description: "Welcome to Z.ai! You've been automatically logged in.",
            });

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Register error:", error);
            setErrors({ general: "An error occurred. Please try again." });
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

    const passwordStrength = getPasswordStrength(formData.password);
    const strengthColors = [
        "bg-red-500",
        "bg-orange-500",
        "bg-yellow-500",
        "bg-lime-500",
        "bg-green-500",
    ];
    const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            {/* Background effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
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
                            <h1 className="text-3xl font-bold text-white mb-2">Crear una cuenta</h1>
                            <p className="text-slate-400">Únase a miles de usuarios que construyen el futuro</p>
                        </motion.div>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">
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

                            {/* Name */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="space-y-2"
                            >
                                <Label htmlFor="name" className="text-slate-300">
                                    Nombre
                                </Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        className={`pl-10 bg-slate-950/50 border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-cyan-400/20 ${errors.name ? "border-red-500/50 focus:border-red-500/50" : ""
                                            }`}
                                        disabled={isLoading}
                                    />
                                </div>
                                {errors.name && (
                                    <p className="text-sm text-red-400">{errors.name}</p>
                                )}
                            </motion.div>

                            {/* Email */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
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
                                        placeholder="you@example.com"
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
                                transition={{ delay: 0.4 }}
                                className="space-y-2"
                            >
                                <Label htmlFor="password" className="text-slate-300">
                                    Contraseña
                                </Label>
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

                                {/* Password strength indicator */}
                                {formData.password && (
                                    <div className="space-y-2">
                                        <div className="flex gap-1">
                                            {[0, 1, 2, 3, 4].map((index) => (
                                                <div
                                                    key={index}
                                                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${index < passwordStrength
                                                            ? strengthColors[passwordStrength - 1]
                                                            : "bg-slate-700"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-slate-400">
                                            {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : "Enter a password"}
                                        </p>
                                    </div>
                                )}

                                {/* Password requirements */}
                                {formData.password && (
                                    <div className="space-y-1">
                                        <p className="text-xs text-slate-500">La contraseña debe contener:</p>
                                        <div className="grid grid-cols-2 gap-1 text-xs">
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <Check
                                                    className={`h-3 w-3 ${formData.password.length >= 8
                                                            ? "text-green-400"
                                                            : "text-slate-600"
                                                        }`}
                                                />
                                                8+ caracteres
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <Check
                                                    className={`h-3 w-3 ${/[A-Z]/.test(formData.password)
                                                            ? "text-green-400"
                                                            : "text-slate-600"
                                                        }`}
                                                />
                                                Letra mayúscula
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <Check
                                                    className={`h-3 w-3 ${/[0-9]/.test(formData.password)
                                                            ? "text-green-400"
                                                            : "text-slate-600"
                                                        }`}
                                                />
                                                Número
                                            </div>
                                            <div className="flex items-center gap-1.5 text-slate-400">
                                                <Check
                                                    className={`h-3 w-3 ${/[^A-Za-z0-9]/.test(formData.password)
                                                            ? "text-green-400"
                                                            : "text-slate-600"
                                                        }`}
                                                />
                                                Carácter especial
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {errors.password && (
                                    <p className="text-sm text-red-400">{errors.password}</p>
                                )}
                            </motion.div>

                            {/* Confirm Password */}
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                                className="space-y-2"
                            >
                                <Label htmlFor="confirmPassword" className="text-slate-300">
                                    Confirmar Contraseña
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                        className={`pl-10 pr-10 bg-slate-950/50 border-white/10 text-white placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-cyan-400/20 ${errors.confirmPassword ? "border-red-500/50 focus:border-red-500/50" : ""
                                            }`}
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                                        disabled={isLoading}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <p className="text-sm text-red-400">{errors.confirmPassword}</p>
                                )}
                            </motion.div>

                            {/* Submit button */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-semibold py-6 text-base relative overflow-hidden group"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Creando cuenta...
                                        </>
                                    ) : (
                                        <>
                                            Crear una cuenta
                                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                    {!isLoading && (
                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/0 via-white/20 to-cyan-400/0 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
                                    Ya tengo una cuenta?
                                </span>
                            </div>
                        </div>

                        {/* Sign in link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-center"
                        >
                            <p className="text-slate-400">
                                <Link
                                    href="/login"
                                    className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                                >
                                    Inicie sesión en su cuenta existente
                                </Link>
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
