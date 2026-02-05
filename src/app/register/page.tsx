"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Check, Loader2 } from "lucide-react";
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
                description: "Welcome to JACANA DEV! You've been automatically logged in.",
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

    // Colores para la barra de fuerza (Estilo GitHub: Gris -> Verde)
    const getStrengthColor = (index: number) => {
        if (index < passwordStrength) {
            if (passwordStrength <= 2) return "bg-red-500"; // Débil
            if (passwordStrength === 3) return "bg-yellow-500"; // Regular
            return "bg-[#238636]"; // Fuerte (GitHub Green)
        }
        return "bg-[#30363d]"; // Inactivo
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-[#0d1117]">

            {/* Patrón de fondo sutil (Técnico) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />

            {/* Contenedor Principal */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#f0f6fc] mb-2">Create an account</h1>
                    <p className="text-[#8b949e]">to continue to JACANA DEV</p>
                </div>

                {/* Register Card */}
                <div className="rounded-md border border-[#30363d] bg-[#161b22] shadow-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* General Error Alert */}
                        {errors.general && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="p-3 rounded-md bg-[#f85149]/10 border border-[#f85149] text-[#f85149] text-sm"
                            >
                                {errors.general}
                            </motion.div>
                        )}

                        {/* Name Input */}
                        <div className="space-y-2">
                            <label htmlFor="name" className="block text-sm font-medium text-[#c9d1d9]">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-2.5 h-4 w-4 text-[#8b949e]" />
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="johndoe"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    className={`
                                        w-full pl-10 pr-3 py-2 bg-[#0d1117] border rounded-md text-[#c9d1d9] placeholder-[#484f58]
                                        focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset
                                        transition-colors duration-200
                                        ${errors.name ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
                                    `}
                                    disabled={isLoading}
                                    autoComplete="username"
                                />
                            </div>
                            {errors.name && (
                                <p className="text-sm text-[#f85149]">{errors.name}</p>
                            )}
                        </div>

                        {/* Email Input */}
                        <div className="space-y-2">
                            <label htmlFor="email" className="block text-sm font-medium text-[#c9d1d9]">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#8b949e]" />
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={formData.email}
                                    onChange={(e) => handleChange("email", e.target.value)}
                                    className={`
                                        w-full pl-10 pr-3 py-2 bg-[#0d1117] border rounded-md text-[#c9d1d9] placeholder-[#484f58]
                                        focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset
                                        transition-colors duration-200
                                        ${errors.email ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
                                    `}
                                    disabled={isLoading}
                                    autoComplete="email"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-sm text-[#f85149]">{errors.email}</p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-[#c9d1d9]">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#8b949e]" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    className={`
                                        w-full pl-10 pr-10 py-2 bg-[#0d1117] border rounded-md text-[#c9d1d9] placeholder-[#484f58]
                                        focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset
                                        transition-colors duration-200
                                        ${errors.password ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
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
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>

                            {errors.password && (
                                <p className="text-sm text-[#f85149]">{errors.password}</p>
                            )}

                            {/* Password Strength & Requirements (GitHub Style) */}
                            {formData.password && (
                                <div className="mt-3 space-y-3">
                                    {/* Strength Bar */}
                                    <div className="flex gap-1 h-1">
                                        {[0, 1, 2, 3, 4].map((index) => (
                                            <div
                                                key={index}
                                                className={`flex-1 rounded-full transition-colors duration-300 ${getStrengthColor(index)}`}
                                            />
                                        ))}
                                    </div>

                                    {/* Check Requirements */}
                                    <div className="space-y-1">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[#8b949e]">
                                            <div className="flex items-center gap-1.5">
                                                <Check className={`h-3 w-3 ${formData.password.length >= 8 ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                                8+ characters
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Check className={`h-3 w-3 ${/[A-Z]/.test(formData.password) ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                                Uppercase letter
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Check className={`h-3 w-3 ${/[0-9]/.test(formData.password) ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                                Number
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Check className={`h-3 w-3 ${/[^A-Za-z0-9]/.test(formData.password) ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                                Special character
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#c9d1d9]">
                                Confirm password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#8b949e]" />
                                <input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                    className={`
                                        w-full pl-10 pr-10 py-2 bg-[#0d1117] border rounded-md text-[#c9d1d9] placeholder-[#484f58]
                                        focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset
                                        transition-colors duration-200
                                        ${errors.confirmPassword ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
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
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-[#f85149]">{errors.confirmPassword}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`
                                relative w-full flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-white
                                rounded-md border border-transparent transition-all duration-200
                                ${isLoading
                                    ? "bg-[#2ea043]/70 cursor-not-allowed opacity-70"
                                    : "bg-[#238636] hover:bg-[#2ea043] focus:outline-none focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#161b22]"
                                }
                            `}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create account
                                    <ArrowRight className="h-4 w-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#30363d]"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="px-2 bg-[#161b22] text-[#8b949e]">
                                Already have an account?
                            </span>
                        </div>
                    </div>

                    {/* Sign In Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/login"
                            className="w-full block text-center px-4 py-2 text-sm font-semibold text-[#c9d1d9] border border-[#30363d] rounded-md hover:bg-[#21262d] hover:text-white transition-colors"
                        >
                            Sign in
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}