// components/ContactForm.tsx
"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
    name: string;
    email: string;
    message: string;
}

// 👇 Reemplaza con tu Form ID de Formspree (ej: "xknyvzgr")
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mblzlolw";

export default function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset,
    } = useForm<FormData>({
        mode: "onTouched",
    });

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setSubmitStatus("success");
                reset();
            } else {
                setSubmitStatus("error");
            }
        } catch (err) {
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {submitStatus === "success" ? (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 p-6 rounded-2xl text-center">
                    <svg
                        className="w-12 h-12 mx-auto mb-4 text-green-600 dark:text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h3 className="text-xl font-bold mb-2">¡Mensaje enviado!</h3>
                    <p>Gracias por contactarme. Te responderé lo antes posible.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Nombre
                        </label>
                        <input
                            id="name"
                            {...register("name", { required: "El nombre es obligatorio" })}
                            aria-invalid={errors.name ? "true" : "false"}
                            className={`w-full px-4 py-3 rounded-xl border ${errors.name
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 transition-colors`}
                            placeholder="Tu nombre"
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Correo electrónico
                        </label>
                        <input
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
                            className={`w-full px-4 py-3 rounded-xl border ${errors.email
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 transition-colors`}
                            placeholder="tu@ejemplo.com"
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="message"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                        >
                            Mensaje
                        </label>
                        <textarea
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
                            className={`w-full px-4 py-3 rounded-xl border ${errors.message
                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                    : "border-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                                } bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 transition-colors`}
                            placeholder="Cuéntame sobre tu proyecto..."
                        />
                        {errors.message && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
                                {errors.message.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !isDirty || !isValid}
                        className={`w-full py-3 px-4 rounded-xl font-medium text-white shadow-md transition-all duration-200 ${isSubmitting || !isDirty || !isValid
                                ? "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                            }`}
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
                        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 rounded-lg text-sm text-center">
                            Ocurrió un error. Por favor, inténtalo de nuevo.
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}