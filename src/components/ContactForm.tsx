'use client'

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { motion, AnimatePresence } from "framer-motion"
import {
    CheckCircle, AlertCircle, Loader2, Send, Mail, User,
    Terminal, ShieldCheck, ArrowRight
} from "lucide-react"

interface FormData {
    name: string
    email: string
    message: string
}

const CONTACT_API_ENDPOINT = "/api/send-message";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>({
        mode: "onTouched",
    })

    const handleReset = () => {
        setSubmitStatus("idle")
        reset()
    }

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsSubmitting(true)
        setSubmitStatus("idle")
        try {
            const response = await fetch(CONTACT_API_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (response.ok) {
                setSubmitStatus("success")
                reset()
            } else {
                setSubmitStatus("error")
            }
        } catch (error) {
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full max-w-lg mx-auto">
            {/* Contenedor estilo System Module */}
            <div className="relative bg-[#0d1117] border border-[#30363d] rounded-xl overflow-hidden shadow-2xl group">

                {/* Efecto Glow Superior - Jacana Blue */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00A0E4]/50 to-transparent" />

                {/* Header del Formulario */}
                <div className="bg-[#161b22]/80 border-b border-[#30363d] p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                            <div className="w-2.5 h-2.5 rounded-full bg-[#00A0E4]" />
                        </div>
                        <span className="text-xs font-mono text-[#8b949e] ml-2">secure-channel.js</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#8b949e] font-mono">
                        <ShieldCheck size={12} className="text-[#00A0E4]" />
                        ENCRYPTED
                    </div>
                </div>

                <div className="p-6">
                    <AnimatePresence mode="wait">
                        {submitStatus === "success" ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-10 text-center relative"
                            >
                                {/* Fondo de éxito animado - Jacana Blue */}
                                <div className="absolute inset-0 bg-[#00A0E4]/5" />

                                <div className="relative z-10">
                                    <motion.div
                                        className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00A0E4]/10 border border-[#00A0E4]/30 mb-6"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.1, type: "spring" }}
                                    >
                                        <CheckCircle className="w-10 h-10 text-[#00A0E4] drop-shadow-[0_0_8px_rgba(0,160,228,0.5)]" />
                                    </motion.div>

                                    <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                                        Transmisión Exitosa
                                    </h3>
                                    <p className="text-[#8b949e] text-sm mb-8 max-w-xs mx-auto font-mono">
                                        Tu mensaje ha sido recibido en el servidor principal.
                                    </p>
                                    <button
                                        onClick={handleReset}
                                        className="px-5 py-2 text-xs font-semibold text-[#00A0E4] border border-[#30363d] rounded-md hover:bg-[#00A0E4]/10 hover:border-[#00A0E4]/30 transition-all"
                                    >
                                        Iniciar nueva transmisión
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-5"
                            >
                                {/* Campo: Nombre */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest flex items-center gap-2">
                                        <User size={10} />
                                        Remitente
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 text-[#484f58] group-focus-within:text-[#00A0E4] transition-colors" />
                                        </div>
                                        <input
                                            {...register("name", { required: "Campo obligatorio" })}
                                            className={`
                                                w-full pl-10 pr-3 py-2.5 bg-[#010409] border 
                                                ${errors.name ? 'border-[#f85149] shadow-[0_0_0_1px_rgba(248,81,73,0.3)]' : 'border-[#30363d] hover:border-[#8b949e] focus:border-[#00A0E4]'}
                                                text-white text-sm rounded-md 
                                                focus:outline-none focus:ring-2 focus:ring-[#00A0E4]/10
                                                transition-all duration-200 font-mono
                                            `}
                                            placeholder="Tu nombre"
                                        />
                                    </div>
                                    {errors.name && (
                                        <p className="text-[11px] text-[#f85149] mt-1 flex items-center gap-1 font-mono">
                                            <AlertCircle className="w-3 h-3" />
                                            <span>{errors.name.message}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Campo: Email */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest flex items-center gap-2">
                                        <Mail size={10} />
                                        Canal de Respuesta
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 text-[#484f58] group-focus-within:text-[#00A0E4] transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            {...register("email", {
                                                required: "Email requerido",
                                                pattern: { value: /^\S+@\S+$/i, message: "Formato inválido" }
                                            })}
                                            className={`
                                                w-full pl-10 pr-3 py-2.5 bg-[#010409] border 
                                                ${errors.email ? 'border-[#f85149] shadow-[0_0_0_1px_rgba(248,81,73,0.3)]' : 'border-[#30363d] hover:border-[#8b949e] focus:border-[#00A0E4]'}
                                                text-white text-sm rounded-md 
                                                focus:outline-none focus:ring-2 focus:ring-[#00A0E4]/10
                                                transition-all duration-200 font-mono
                                            `}
                                            placeholder="correo@ejemplo.com"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="text-[11px] text-[#f85149] mt-1 flex items-center gap-1 font-mono">
                                            <AlertCircle className="w-3 h-3" />
                                            <span>{errors.email.message}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Campo: Mensaje */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-[#8b949e] uppercase tracking-widest flex items-center gap-2">
                                        <Terminal size={10} />
                                        Contenido del Mensaje
                                    </label>
                                    <textarea
                                        rows={5}
                                        {...register("message", { required: "Escribe tu mensaje", minLength: { value: 10, message: "Mínimo 10 caracteres" } })}
                                        className={`
                                            w-full p-3 bg-[#010409] border 
                                            ${errors.message ? 'border-[#f85149] shadow-[0_0_0_1px_rgba(248,81,73,0.3)]' : 'border-[#30363d] hover:border-[#8b949e] focus:border-[#00A0E4]'}
                                            text-white text-sm rounded-md 
                                            focus:outline-none focus:ring-2 focus:ring-[#00A0E4]/10
                                            transition-all duration-200 resize-none font-mono placeholder-[#484f58]
                                        `}
                                        placeholder="> Escribe aquí tu consulta..."
                                    />
                                    {errors.message && (
                                        <p className="text-[11px] text-[#f85149] mt-1 flex items-center gap-1 font-mono">
                                            <AlertCircle className="w-3 h-3" />
                                            <span>{errors.message.message}</span>
                                        </p>
                                    )}
                                </div>

                                {/* Footer con botón */}
                                <div className="pt-4 border-t border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-3">
                                    <div className="flex items-center gap-2 text-[10px] text-[#8b949e] font-mono">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#00A0E4] animate-pulse" />
                                        Sistema listo para transmitir
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`
                                            relative w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 
                                            text-sm font-semibold rounded-md transition-all duration-300 overflow-hidden
                                            ${isSubmitting
                                                ? "bg-[#21262d] text-[#8b949e] cursor-not-allowed border border-[#30363d]"
                                                : "bg-[#00A0E4] text-black hover:shadow-[0_0_20px_rgba(0,160,228,0.3)] active:scale-95"
                                            }
                                        `}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Transmitiendo...
                                            </>
                                        ) : (
                                            <>
                                                Enviar Mensaje
                                                <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Banner de Error Global */}
            <AnimatePresence>
                {submitStatus === "error" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="mt-4 p-3 rounded-md bg-[#f85149]/10 border border-[#f85149]/30 flex items-start gap-3"
                    >
                        <AlertCircle className="w-5 h-5 text-[#f85149] flex-shrink-0 mt-0.5" />
                        <div>
                            <h4 className="text-sm font-bold text-[#f85149] mb-0.5">Error de Conexión</h4>
                            <p className="text-xs text-[#f85149]/80">
                                No se pudo establecer el enlace seguro. Intenta de nuevo más tarde.
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
