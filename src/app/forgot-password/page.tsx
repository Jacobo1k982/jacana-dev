"use client";

import { useState } from "react";
import { ArrowRight, Mail, Loader2 } from "lucide-react";
import { requestPasswordReset } from "../actions/auth";
import Link from "next/link";

export default function ForgotPassword() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    const formData = new FormData(e.currentTarget);
    const res = await requestPasswordReset(formData);
    setIsLoading(false);

    if (res.success) setMessage(res.message ?? "Enlace de recuperación enviado");
    if (res.error) setError(res.error);
  }

  return (
    <div className="relative min-h-screen flex flex flex-col items-center justify-center px-4 bg-[#0d1117]">

      {/* Patrón de fondo sutil (Estilo Técnico) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#c9d1d9 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative w-full max-w-md z-10">
        {/* Contenedor estilo Card */}
        <div className="rounded-md border border-[#30363d] bg-[#161b22] shadow-2xl p-8">

          {/* Header */}
          <div className="mb-6 space-y-1 text-center">
            <h1 className="text-2xl font-bold text-[#f0f6fc]">Forgot password?</h1>
            <p className="text-sm text-[#8b949e]">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Alerta de Error o Éxito */}
            {(message || error) && (
              <div className={`
                                p-3 rounded-md border text-sm text-center mb-6 flex items-center justify-center gap-2
                                ${error
                  ? "bg-[#f85149]/10 border-[#f85149] text-[#f85149]"
                  : "bg-[#238636]/10 border-[#238636] text-[#3fb950]"
                }
                            `}>
                {message || error}
              </div>
            )}

            {/* Input de Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-[#c9d1d9]">
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-[#8b949e]" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="name@company.com"
                  disabled={isLoading}
                  className="w-full pl-10 pr-3 py-2 bg-[#0d1117] border border-[#30363d] rounded-md text-[#c9d1d9] placeholder-[#484f58] focus:outline-none focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] focus:ring-inset transition-colors"
                />
              </div>
            </div>

            {/* Botón de Envío (Estilo GitHub Green) */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                                w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white
                                rounded-md border border-transparent
                                bg-[#238636] hover:bg-[#2ea043] focus:outline-none focus:ring-2 focus:ring-[#238636] focus:ring-offset-2 focus:ring-offset-[#161b22]
                                transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                            `}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send reset link
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Pie de página (Link de regreso) */}
          <div className="mt-6 pt-6 border-t border-[#30363d] text-center">
            <p className="text-sm text-[#8b949e]">
              <Link href="/login" className="text-[#58a6ff] hover:underline font-medium">
                Back to sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}