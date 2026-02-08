'use client'

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, Loader2, Send } from "lucide-react"

interface FormData {
    name: string
    email: string
    message: string
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mblzlolw"

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

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsSubmitting(true)
        setSubmitStatus("idle")

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setSubmitStatus("success")
                reset()
            } else {
                setSubmitStatus("error")
            }
        } catch {
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full">

            {/* --- Estado de Éxito --- */}
            {submitStatus === "success" ? (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="py-10 flex flex-col items-center justify-center text-center"
                >
                    <div className="mb-4 p-3 rounded-full bg-[#238636]/10 border border-[#238636]">
                        <CheckCircle className="w-8 h-8 text-[#3fb950]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#f0f6fc] mb-2">
                        ¡Mensaje enviado!
                    </h3>
                    <p className="text-[#8b949e] max-w-sm mb-6">
                        Gracias por contactar a Jacana-dev. Revisaré tu mensaje y te responderé lo antes posible.
                    </p>
                    <button
                        onClick={() => setSubmitStatus("idle")}
                        className="text-sm text-[#58a6ff] hover:text-[#79c0ff] transition-colors font-medium"
                    >
                        Enviar otro mensaje
                    </button>
                </motion.div>
            ) : (
                /* --- Formulario --- */
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    {/* Nombre */}
                    <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-[#c9d1d9]">
                            Nombre Completo
                        </label>
                        <input
                            id="name"
                            autoComplete="name"
                            {...register("name", { required: "El nombre es requerido" })}
                            placeholder="Usuario"
                            disabled={isSubmitting}
                            className={`
                                w-full px-3 py-2.5 bg-[#0d1117] border text-[#c9d1d9] rounded-md 
                                focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff]
                                placeholder:text-[#484f58] shadow-sm
                                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                                ${errors.name ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
                            `}
                        />
                        {errors.name && (
                            <span className="text-xs text-[#f85149] flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-[#c9d1d9]">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            {...register("email", {
                                required: "El correo es requerido",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Correo inválido"
                                },
                            })}
                            placeholder="tú@ejemplo.com"
                            disabled={isSubmitting}
                            className={`
                                w-full px-3 py-2.5 bg-[#0d1117] border text-[#c9d1d9] rounded-md 
                                focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff]
                                placeholder:text-[#484f58] shadow-sm
                                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                                ${errors.email ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
                            `}
                        />
                        {errors.email && (
                            <span className="text-xs text-[#f85149] flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    {/* Mensaje */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="block text-sm font-medium text-[#c9d1d9]">
                            Mensaje
                        </label>
                        <textarea
                            id="message"
                            rows={5}
                            {...register("message", {
                                required: "El mensaje es requerido",
                                minLength: { value: 10, message: "Muy corto (mínimo 10 caracteres)" },
                            })}
                            placeholder="Cuéntame sobre tu proyecto..."
                            disabled={isSubmitting}
                            className={`
                                w-full px-3 py-2.5 bg-[#0d1117] border text-[#c9d1d9] rounded-md resize-none
                                focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff]
                                placeholder:text-[#484f58] shadow-sm
                                disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                                ${errors.message ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
                            `}
                        />
                        {errors.message && (
                            <span className="text-xs text-[#f85149] flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.message.message}
                            </span>
                        )}
                    </div>

                    {/* Banner de Error Global */}
                    {submitStatus === "error" && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-2 p-3 rounded-md bg-[#f85149]/10 border border-[#f85149]"
                        >
                            <AlertCircle className="w-4 h-4 text-[#f85149] flex-shrink-0" />
                            <p className="text-sm text-[#f85149]">
                                Hubo un error al enviar. Intenta de nuevo.
                            </p>
                        </motion.div>
                    )}

                    {/* Botón */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`
                                group relative w-full flex items-center justify-center gap-2 px-4 py-2.5 
                                text-sm font-semibold text-white rounded-md border border-transparent 
                                transition-all duration-200
                                ${isSubmitting
                                    ? "bg-[#2ea043]/70 cursor-not-allowed"
                                    : "bg-[#238636] hover:bg-[#2ea043] shadow-md hover:shadow-lg hover:shadow-green-500/20"
                                }
                            `}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Enviando...
                                </>
                            ) : (
                                <>
                                    Enviar Mensaje
                                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}