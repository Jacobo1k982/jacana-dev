'use client'

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '../components/ui/input'
import { Textarea } from '../components/ui/textarea'

interface FormData {
    name: string
    email: string
    message: string
}

// 👇 Reemplaza con tu Form ID de Formspree (ej: "xknyvzgr")
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mblzlolw"

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                setSubmitStatus("success")
                reset()
            } else {
                setSubmitStatus("error")
            }
        } catch (err) {
            setSubmitStatus("error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            {submitStatus === "success" ? (
                <Card className={`
          relative overflow-hidden
          bg-gradient-to-br from-emerald-500/10 to-green-600/10
          backdrop-blur-xl border-2 border-emerald-500/30
          text-center
        `}>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-600/20 blur-2xl" />
                    <CardContent className="relative z-10 p-12">
                        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl">
                            <svg
                                className="w-8 h-8 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">¡Mensaje enviado!</h3>
                        <p className="text-gray-300">Gracias por contactarme. Te responderé lo antes posible.</p>
                    </CardContent>
                </Card>
            ) : (
                <Card className={`
          relative overflow-hidden
          bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50
          backdrop-blur-xl border-2 border-cyan-500/30
        `}>
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 to-violet-600/10 blur-2xl" />

                    {/* Content */}
                    <CardHeader className="relative z-10 text-center">
                        <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                            Contacto
                        </CardTitle>
                        <p className="text-gray-400 mt-2">¿Tienes un proyecto en mente? Hablemos.</p>
                    </CardHeader>

                    <CardContent className="relative z-10">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Nombre
                                </label>
                                <Input
                                    id="name"
                                    {...register("name", { required: "El nombre es obligatorio" })}
                                    aria-invalid={errors.name ? "true" : "false"}
                                    placeholder="Tu nombre"
                                    className={`
                    bg-slate-900/50 border-2 text-white placeholder-gray-500
                    ${errors.name
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                            : "border-cyan-500/30 focus:border-cyan-400 focus:ring-cyan-500/20"
                                        }
                    backdrop-blur-sm transition-all duration-300
                  `}
                                />
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-400" role="alert">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Correo electrónico
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    {...register("email", {
                                        required: "El correo es obligatorio",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Correo inválido",
                                        },
                                    })}
                                    aria-invalid={errors.email ? "true" : "false"}
                                    placeholder="tu@ejemplo.com"
                                    className={`
                    bg-slate-900/50 border-2 text-white placeholder-gray-500
                    ${errors.email
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                            : "border-cyan-500/30 focus:border-cyan-400 focus:ring-cyan-500/20"
                                        }
                    backdrop-blur-sm transition-all duration-300
                  `}
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-400" role="alert">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-300 mb-2"
                                >
                                    Mensaje
                                </label>
                                <Textarea
                                    id="message"
                                    rows={5}
                                    {...register("message", {
                                        required: "El mensaje no puede estar vacío",
                                        minLength: {
                                            value: 10,
                                            message: "El mensaje debe tener al menos 10 caracteres",
                                        },
                                    })}
                                    aria-invalid={errors.message ? "true" : "false"}
                                    placeholder="Cuéntame sobre tu proyecto..."
                                    className={`
                    bg-slate-900/50 border-2 text-white placeholder-gray-500
                    ${errors.message
                                            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
                                            : "border-cyan-500/30 focus:border-cyan-400 focus:ring-cyan-500/20"
                                        }
                    backdrop-blur-sm transition-all duration-300 resize-none
                  `}
                                />
                                {errors.message && (
                                    <p className="mt-1 text-sm text-red-400" role="alert">
                                        {errors.message.message}
                                    </p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || !isDirty || !isValid}
                                className={`
                  w-full py-4 px-6 rounded-xl font-semibold text-white shadow-xl
                  transition-all duration-300 hover:scale-105
                  ${isSubmitting || !isDirty || !isValid
                                        ? "bg-gray-600 cursor-not-allowed opacity-60"
                                        : "bg-gradient-to-r from-cyan-600 via-violet-600 to-purple-600 hover:shadow-cyan-500/50 hover:shadow-violet-500/50"
                                    }
                `}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Enviando...
                                    </span>
                                ) : (
                                    "Enviar mensaje"
                                )}
                            </button>

                            {submitStatus === "error" && (
                                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-sm text-red-400 text-center backdrop-blur-sm">
                                    Ocurrió un error. Por favor, inténtalo de nuevo.
                                </div>
                            )}
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
