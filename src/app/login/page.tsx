"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
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
                {/* Header Logo / Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#f0f6fc] mb-2">Sign in</h1>
                    <p className="text-[#8b949e]">to continue to JACANA DEV</p>
                </div>

                {/* Login Card */}
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
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-[#c9d1d9]">
                                    Password
                                </label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs text-[#58a6ff] hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#8b949e]" />
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => handleChange("password", e.target.value)}
                                    className={`
                                        w-full pl-10 pr-10 py-2 bg-[#0d1117] border rounded-md text-[#c9d1d9] placeholder-[#484f58]
                                        focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset
                                        transition-colors duration-200
                                        ${errors.password ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
                                    `}
                                    disabled={isLoading}
                                    autoComplete="current-password"
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
                        </div>

                        {/* Submit Button (GitHub Green Style) */}
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
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
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
                                New to JACANA DEV?
                            </span>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Link
                            href="/register"
                            className="w-full block text-center px-4 py-2 text-sm font-semibold text-[#c9d1d9] border border-[#30363d] rounded-md hover:bg-[#21262d] hover:text-white transition-colors"
                        >
                            Create an account
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}