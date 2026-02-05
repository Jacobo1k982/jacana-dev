"use client";

import { useState } from "react";
import { requestPasswordReset } from "../actions/auth";

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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950">
      {/* Mantengo tus radiales de fondo exactamente iguales */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(99,102,241,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_30%,rgba(168,85,247,0.12),transparent_40%)]" />
      </div>

      <div className="relative w-full max-w-lg mx-6">
        <div
          className={`
            backdrop-blur-2xl bg-black/25 border border-white/8 rounded-2xl 
            shadow-xl shadow-indigo-950/40 p-9 md:p-11
            relative overflow-hidden
            before:content-[''] before:absolute before:inset-0 before:-z-10
            before:bg-gradient-to-br before:from-indigo-500/8 before:via-purple-500/5 before:to-transparent
            before:opacity-0 before:transition-opacity before:duration-1000
            hover:before:opacity-100
          `}
        >
          {/* Título con efecto holográfico sutil */}
          <h1
            className={`
              text-3xl md:text-4xl font-extrabold mb-2 
              bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200/90 
              bg-clip-text text-transparent tracking-tight
              animate-pulse-slow
            `}
          >
            Recuperar acceso
          </h1>

          <p className="text-slate-400/90 mb-8 text-sm font-light">
            Ingresa tu correo para recibir el enlace de recuperación
          </p>

          <form onSubmit={handleSubmit} className="space-y-7">
            {/* Input con efecto floating label + glow */}
            <div className="relative group">
              <input
                name="email"
                type="email"
                placeholder=" "
                required
                autoComplete="email"
                disabled={isLoading}
                className={`
                  w-full px-6 py-4 bg-transparent border border-white/12 rounded-xl
                  text-white text-base placeholder:text-transparent
                  focus:outline-none focus:border-indigo-400/60 focus:shadow-[0_0_20px_-4px] focus:shadow-indigo-500/40
                  transition-all duration-400 peer
                  hover:border-white/30
                `}
              />
              <label
                className={`
                  absolute left-6 top-4 text-slate-400 text-base pointer-events-none transition-all duration-300
                  peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-indigo-300 peer-focus:bg-black/60 peer-focus:px-2 peer-focus:rounded-md
                  peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-base
                  group-hover:text-slate-300
                `}
              >
                Correo electrónico
              </label>
            </div>

            {/* Botón con gradiente animado y ripple sutil */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                relative w-full py-4.5 px-8 font-medium text-white overflow-hidden
                bg-gradient-to-r from-indigo-600 to-purple-600
                rounded-xl shadow-lg shadow-indigo-900/40
                transition-all duration-400
                hover:from-indigo-500 hover:to-purple-500 hover:shadow-indigo-700/50 hover:scale-[1.015]
                active:scale-[0.985]
                disabled:opacity-60 disabled:hover:scale-100 disabled:cursor-not-allowed
                group
              `}
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white/90" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="30 60" />
                    </svg>
                    Procesando...
                  </>
                ) : (
                  "Enviar enlace"
                )}
              </span>

              {/* Efecto overlay neón */}
              <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </form>

          {/* Mensajes con fade y borde glow */}
          {message && (
            <div className="mt-8 p-5 bg-green-950/40 border border-green-700/30 rounded-xl text-green-300/95 text-center animate-fade-in">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-8 p-5 bg-red-950/40 border border-red-700/30 rounded-xl text-red-300/95 text-center animate-fade-in">
              {error}
            </div>
          )}
        </div>

        {/* Toque final sutil */}
        <p className="text-center mt-10 text-slate-700 text-xs tracking-wider">
          SECURE • ENCRYPTED • POST-QUANTUM
        </p>
      </div>
    </div>
  );
}