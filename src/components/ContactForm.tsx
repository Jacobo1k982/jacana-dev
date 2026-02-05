'use client'

import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { motion } from "framer-motion"
import { CheckCircle, AlertCircle, Loader2, Send } from "lucide-react"
// ELIMINADO: import Textarea from '@/components/ui/textarea'

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
        <div className="relative min-h-[80vh] flex items-center justify-center py-12 bg-[#0d1117]">
            
            <div className="relative w-full max-w-2xl px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="rounded-md border border-[#30363d] bg-[#161b22] shadow-lg p-6 sm:p-8"
                >
                    
                    {/* Header */}
                    <div className="mb-6 border-b border-[#30363d] pb-4">
                        <h1 className="text-2xl font-semibold text-[#f0f6fc]">
                            Contact
                        </h1>
                        <p className="mt-2 text-sm text-[#8b949e]">
                            Have a question or want to work together? Fill out the form below.
                        </p>
                    </div>

                    {/* Success State */}
                    {submitStatus === "success" ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className="py-12 text-center"
                        >
                            <div className="flex justify-center mb-4">
                                <div className="p-3 rounded-full bg-[#238636]/20 border border-[#238636]">
                                    <CheckCircle className="w-8 h-8 text-[#3fb950]" />
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-[#f0f6fc] mb-2">
                                Message sent successfully
                            </h2>
                            <p className="text-[#8b949e] max-w-md mx-auto mb-6">
                                Thank you for reaching out. I'll get back to you as soon as possible.
                            </p>
                            <button
                                onClick={() => setSubmitStatus("idle")}
                                className="text-sm text-[#58a6ff] hover:underline"
                            >
                                Send another message
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            
                            {/* Name Field */}
                            <div className="space-y-1">
                                <label htmlFor="name" className="block text-sm font-medium text-[#c9d1d9]">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    autoComplete="name"
                                    {...register("name", { required: "Name is required" })}
                                    placeholder="John Doe"
                                    disabled={isSubmitting}
                                    className={`
                                        w-full px-3 py-2 bg-[#0d1117] border text-[#c9d1d9] rounded-md 
                                        focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff]
                                        placeholder:text-[#484f58]
                                        disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                                        ${errors.name ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
                                    `}
                                />
                                {errors.name && (
                                    <p className="text-xs text-[#f85149] mt-1">{errors.name.message}</p>
                                )}
                            </div>

                            {/* Email Field */}
                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-medium text-[#c9d1d9]">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: "Invalid email address" },
                                    })}
                                    placeholder="you@example.com"
                                    disabled={isSubmitting}
                                    className={`
                                        w-full px-3 py-2 bg-[#0d1117] border text-[#c9d1d9] rounded-md 
                                        focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff]
                                        placeholder:text-[#484f58]
                                        disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                                        ${errors.email ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
                                    `}
                                />
                                {errors.email && (
                                    <p className="text-xs text-[#f85149] mt-1">{errors.email.message}</p>
                                )}
                            </div>

                            {/* Message Field - CAMBIO A TEXTAREA NATIVO */}
                            <div className="space-y-1">
                                <label htmlFor="message" className="block text-sm font-medium text-[#c9d1d9]">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    {...register("message", {
                                        required: "Message is required",
                                        minLength: { value: 10, message: "Message is too short (min 10 chars)" },
                                    })}
                                    placeholder="Tell me about your project..."
                                    disabled={isSubmitting}
                                    className={`
                                        w-full px-3 py-2 bg-[#0d1117] border text-[#c9d1d9] rounded-md resize-none
                                        focus:outline-none focus:ring-1 focus:ring-[#58a6ff] focus:border-[#58a6ff]
                                        placeholder:text-[#484f58]
                                        disabled:opacity-50 disabled:cursor-not-allowed transition-colors
                                        ${errors.message ? "border-[#f85149] focus:border-[#f85149] focus:ring-[#f85149]" : "border-[#30363d]"}
                                    `}
                                />
                                {errors.message && (
                                    <p className="text-xs text-[#f85149] mt-1">{errors.message.message}</p>
                                )}
                            </div>

                            {/* Error Banner */}
                            {submitStatus === "error" && (
                                <div className="flex items-center gap-2 p-3 rounded-md bg-[#f85149]/10 border border-[#f85149]">
                                    <AlertCircle className="w-4 h-4 text-[#f85149] flex-shrink-0" />
                                    <p className="text-sm text-[#f85149]">
                                        Something went wrong. Please try again later.
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
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
                                            : "bg-[#238636] hover:bg-[#2ea043] focus:outline-none focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#161b22]"
                                        }
                                    `}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            Send message
                                            <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </motion.div>
            </div>
        </div>
    )
}