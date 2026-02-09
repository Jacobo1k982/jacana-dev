"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Check, Loader2, AlertCircle } from "lucide-react";
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
            newErrors.name = "El nombre es obligatorio";
        } else if (formData.name.length < 2) {
            newErrors.name = "El nombre debe tener al menos 2 caracteres";
        }

        if (!formData.email) {
            newErrors.email = "El correo es obligatorio";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Dirección de correo inválida";
        }

        if (!formData.password) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (formData.password.length < 8) {
            newErrors.password = "La contraseña debe tener al menos 8 caracteres";
        } else if (getPasswordStrength(formData.password) < 3) {
            newErrors.password = "La contraseña es demasiado débil";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Por favor confirma tu contraseña";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
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
                    setErrors({ general: "Ocurrió un error. Inténtalo de nuevo." });
                }
                return;
            }

            toast({
                title: "Cuenta creada",
                description: "¡Bienvenido a JACANA DEV! Has iniciado sesión automáticamente.",
            });

            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Register error:", error);
            setErrors({ general: "Ocurrió un error. Inténtalo de nuevo." });
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

    // Colores para la barra de fuerza (Tema GitHub Dark: Rojo -> Amarillo -> Verde)
    const getStrengthColor = (index: number) => {
        if (index < passwordStrength) {
            if (passwordStrength <= 2) return "bg-[#f85149]"; // Débil
            if (passwordStrength === 3) return "bg-[#d29922]"; // Regular
            return "bg-[#238636]"; // Fuerte
        }
        return "bg-[#30363d]"; // Inactivo
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-[#010409] overflow-hidden selection:bg-[#1f6feb] selection:text-white">

            {/* Fondo decorativo (Patrón + Glow) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#1f6feb]/10 rounded-full blur-[100px] pointer-events-none" />
                <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                    }}
                />
            </div>

            {/* Contenedor Principal */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-extrabold text-[#f0f6fc] mb-2 tracking-tight">Crear cuenta</h1>
                    <p className="text-[#8b949e] text-sm">
                        para continuar en <span className="text-[#c9d1d9] font-medium">JACANA DEV</span>
                    </p>
                </div>

                {/* Register Card */}
                <div className="rounded-xl border border-[#30363d] bg-[#161b22]/80 backdrop-blur-sm shadow-2xl overflow-hidden">
                    <div className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Alerta de Error General */}
                            {errors.general && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="flex items-center gap-3 p-3 rounded-md bg-[#f85149]/10 border border-[#f85149]/20 text-[#f85149] text-sm"
                                >
                                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                                    <span>{errors.general}</span>
                                </motion.div>
                            )}

                            {/* Input Nombre */}
                            <div className="space-y-2">
                                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
                                    Nombre de usuario
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User className={`h-4 w-4 transition-colors ${errors.name ? 'text-[#f85149]' : 'text-[#484f58] group-focus-within:text-[#58a6ff]'}`} />
                                    </div>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="ej. juanperez"
                                        value={formData.name}
                                        onChange={(e) => handleChange("name", e.target.value)}
                                        className={`
                                            w-full pl-10 pr-3 py-2.5 bg-[#0d1117] border rounded-lg text-[#c9d1d9] placeholder-[#484f58] text-sm
                                            focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset
                                            transition-all duration-200
                                            ${errors.name
                                                ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]"
                                                : "border-[#30363d] hover:border-[#8b949e]/50"
                                            }
                                        `}
                                        disabled={isLoading}
                                        autoComplete="username"
                                    />
                                </div>
                                {errors.name && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs text-[#f85149] pl-1 mt-1"
                                    >
                                        {errors.name}
                                    </motion.p>
                                )}
                            </div>

                            {/* Input Email */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
                                    Correo Electrónico
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className={`h-4 w-4 transition-colors ${errors.email ? 'text-[#f85149]' : 'text-[#484f58] group-focus-within:text-[#58a6ff]'}`} />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="nombre@ejemplo.com"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        className={`
                                            w-full pl-10 pr-3 py-2.5 bg-[#0d1117] border rounded-lg text-[#c9d1d9] placeholder-[#484f58] text-sm
                                            focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset
                                            transition-all duration-200
                                            ${errors.email
                                                ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]"
                                                : "border-[#30363d] hover:border-[#8b949e]/50"
                                            }
                                        `}
                                        disabled={isLoading}
                                        autoComplete="email"
                                    />
                                </div>
                                {errors.email && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs text-[#f85149] pl-1 mt-1"
                                    >
                                        {errors.email}
                                    </motion.p>
                                )}
                            </div>

                            {/* Input Contraseña */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
                                    Contraseña
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className={`h-4 w-4 transition-colors ${errors.password ? 'text-[#f85149]' : 'text-[#484f58] group-focus-within:text-[#58a6ff]'}`} />
                                    </div>
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Crea una contraseña"
                                        value={formData.password}
                                        onChange={(e) => handleChange("password", e.target.value)}
                                        className={`
                                            w-full pl-10 pr-10 py-2.5 bg-[#0d1117] border rounded-lg text-[#c9d1d9] placeholder-[#484f58] text-sm
                                            focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset
                                            transition-all duration-200
                                            ${errors.password
                                                ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]"
                                                : "border-[#30363d] hover:border-[#8b949e]/50"
                                            }
                                        `}
                                        disabled={isLoading}
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors p-1 rounded-md hover:bg-[#21262d]"
                                        disabled={isLoading}
                                        tabIndex={-1}
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>

                                {errors.password && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs text-[#f85149] pl-1 mt-1"
                                    >
                                        {errors.password}
                                    </motion.p>
                                )}

                                {/* Password Strength & Requirements */}
                                {formData.password && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="mt-4 space-y-3"
                                    >
                                        {/* Strength Bar */}
                                        <div className="flex gap-1 h-1.5">
                                            {[0, 1, 2, 3, 4].map((index) => (
                                                <div
                                                    key={index}
                                                    className={`flex-1 rounded-full transition-all duration-300 ${getStrengthColor(index)}`}
                                                />
                                            ))}
                                        </div>

                                        {/* Check Requirements */}
                                        <div className="bg-[#0d1117] rounded-md p-3 border border-[#30363d]/50">
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-[#8b949e]">
                                                <div className="flex items-center gap-2">
                                                    <Check className={`h-3 w-3 ${formData.password.length >= 8 ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                                    <span className={formData.password.length >= 8 ? "text-[#c9d1d9]" : ""}>8+ caracteres</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Check className={`h-3 w-3 ${/[A-Z]/.test(formData.password) ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                                    <span className={/[A-Z]/.test(formData.password) ? "text-[#c9d1d9]" : ""}>Mayúscula</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Check className={`h-3 w-3 ${/[0-9]/.test(formData.password) ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                                    <span className={/[0-9]/.test(formData.password) ? "text-[#c9d1d9]" : ""}>Número</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Check className={`h-3 w-3 ${/[^A-Za-z0-9]/.test(formData.password) ? "text-[#3fb950]" : "text-[#30363d]"}`} />
                                                    <span className={/[^A-Za-z0-9]/.test(formData.password) ? "text-[#c9d1d9]" : ""}>Carácter especial</span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Input Confirmar Contraseña */}
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
                                    Confirmar Contraseña
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className={`h-4 w-4 transition-colors ${errors.confirmPassword ? 'text-[#f85149]' : 'text-[#484f58] group-focus-within:text-[#58a6ff]'}`} />
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirma tu contraseña"
                                        value={formData.confirmPassword}
                                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                                        className={`
                                            w-full pl-10 pr-10 py-2.5 bg-[#0d1117] border rounded-lg text-[#c9d1d9] placeholder-[#484f58] text-sm
                                            focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset
                                            transition-all duration-200
                                            ${errors.confirmPassword
                                                ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]"
                                                : "border-[#30363d] hover:border-[#8b949e]/50"
                                            }
                                        `}
                                        disabled={isLoading}
                                        autoComplete="new-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-[#c9d1d9] transition-colors p-1 rounded-md hover:bg-[#21262d]"
                                        disabled={isLoading}
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {errors.confirmPassword && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-xs text-[#f85149] pl-1 mt-1"
                                    >
                                        {errors.confirmPassword}
                                    </motion.p>
                                )}
                            </div>

                            {/* Botón Submit */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`
                                    group relative w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white
                                    rounded-lg border border-transparent transition-all duration-200 shadow-md mt-4
                                    ${isLoading
                                        ? "bg-[#2ea043]/70 cursor-not-allowed"
                                        : "bg-[#238636] hover:bg-[#2ea043] hover:shadow-[0_0_15px_rgba(46,160,67,0.4)] focus:outline-none focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#161b22]"
                                    }
                                `}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Creando cuenta...
                                    </>
                                ) : (
                                    <>
                                        Crear cuenta
                                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-[#30363d]"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="px-3 bg-[#161b22] text-[#8b949e] font-medium">
                                    ¿Ya tienes una cuenta?
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
                                className="w-full block text-center px-4 py-2.5 text-sm font-semibold text-[#c9d1d9] border border-[#30363d] rounded-lg hover:bg-[#21262d] hover:text-white hover:border-[#8b949e] transition-all duration-200"
                            >
                                Iniciar Sesión
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}