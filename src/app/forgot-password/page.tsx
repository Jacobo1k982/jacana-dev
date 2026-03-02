"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setError("");

    // Simulación de envío
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    setSuccess(true);
    setMessage("Si el email existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña.");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0d1117] relative overflow-hidden py-8">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(240,136,62,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(240,136,62,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

      {/* Multiple glow effects - Naranja/Amber para recuperación */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#f0883e]/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#d29922]/10 rounded-full blur-[100px] animate-pulse delay-1000" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#f0883e]/40 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!success ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md p-10 bg-[#161b22]/90 border border-[#30363d] rounded-2xl shadow-2xl relative z-10 backdrop-blur-xl"
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] opacity-10" />
            </div>

            {/* Header con logo */}
            <div className="mb-8 text-center relative">
              <motion.div
                className="inline-block mb-4 relative"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Glow behind logo */}
                <div className="absolute inset-0 bg-[#f0883e]/30 rounded-full blur-xl scale-150" />

                <div className="relative p-1 bg-gradient-to-br from-[#f0883e] via-[#d29922] to-[#f0883e] rounded-full">
                  <div className="p-3 bg-[#161b22] rounded-full">
                    <img
                      src="/perfil.png"
                      alt="Logo"
                      className="w-16 h-16 object-contain rounded-full"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#30363d] bg-[#21262d] text-xs text-[#8b949e] font-mono uppercase tracking-wider mb-4"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f0883e]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                Secure Protocol
              </motion.div>

              <motion.h1
                className="text-2xl font-bold text-white tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="bg-gradient-to-r from-[#f0883e] via-[#d29922] to-[#f0883e] bg-clip-text text-transparent">
                  Recuperar
                </span>
                {" "}Acceso
              </motion.h1>

              <motion.p
                className="text-[#8b949e] text-sm mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Ingresa tu email para iniciar la recuperación
              </motion.p>

              {/* Terminal prompt decoration */}
              <motion.div
                className="flex items-center justify-center gap-2 mt-4 text-xs text-[#484f58] font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-[#f0883e]">$</span>
                <span className="text-[#8b949e]">password_reset --init</span>
                <span className="w-2 h-4 bg-[#f0883e] animate-pulse" />
              </motion.div>
            </div>

            {/* System Module Container */}
            <div className="rounded-xl border border-[#30363d] bg-[#0d1117]/50 overflow-hidden">
              {/* Header Bar Simulada */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-[#30363d]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f85149]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#f0883e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3fb950]" />
                </div>
                <div className="flex items-center gap-2 text-[10px] text-[#8b949e] font-mono">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5" /><line x1="12" x2="20" y1="19" y2="19" /></svg>
                  password_reset.sh
                </div>
              </div>

              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Error message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg flex items-start gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400 shrink-0 mt-0.5"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                        <div className="flex-1">
                          <span className="block text-red-400/50 text-[10px] font-mono mb-1">{"// system error:"}</span>
                          <span className="text-red-400 text-sm">{error}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email Input */}
                  <motion.div
                    className="space-y-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="flex items-center gap-2 text-[#c9d1d9] text-xs font-medium uppercase tracking-wide">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#f0883e]"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                      Identificador de Usuario
                    </label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#484f58] group-focus-within:text-[#f0883e] transition-colors"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="usuario@ejemplo.com"
                        disabled={isLoading}
                        className="w-full pl-10 pr-3 py-3 bg-[#0d1117] border border-[#30363d] rounded-lg text-[#c9d1d9] placeholder-[#484f58] text-sm font-mono hover:border-[#484f58] focus:outline-none focus:border-[#f0883e] focus:ring-2 focus:ring-[#f0883e]/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </div>
                    <p className="text-[#484f58] text-xs">
                      Te enviaremos un enlace seguro para restablecer tu contraseña.
                    </p>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full relative overflow-hidden bg-gradient-to-r from-[#f0883e] via-[#d29922] to-[#f0883e] bg-[length:200%_100%] hover:bg-right text-black p-3 rounded-lg font-semibold text-sm transition-all duration-500 shadow-[0_0_20px_rgba(240,136,62,0.4)] hover:shadow-[0_0_30px_rgba(210,153,34,0.6)] disabled:opacity-50 disabled:cursor-not-allowed border border-[rgba(255,255,255,0.1)] group"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Transmitiendo...</span>
                        </>
                      ) : (
                        <>
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></svg>
                          <span>Enviar Enlace de Recuperación</span>
                        </>
                      )}
                    </span>

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Footer / Link de regreso */}
            <motion.div
              className="mt-8 pt-6 border-t border-[#30363d] text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="/login"
                className="inline-flex items-center gap-2 text-xs text-[#8b949e] hover:text-[#f0883e] transition-colors font-mono group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m12 19-7-7 7-7" /><path d="M19 12H5" /></svg>
                <span className="group-hover:underline">Volver al inicio de sesión</span>
              </a>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-md p-10 bg-[#161b22]/90 border border-[#30363d] rounded-2xl shadow-2xl relative z-10 backdrop-blur-xl"
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] opacity-10" />
            </div>

            {/* Success Content */}
            <div className="text-center relative">
              <motion.div
                className="inline-block mb-6 relative"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                {/* Glow behind icon */}
                <div className="absolute inset-0 bg-[#3fb950]/30 rounded-full blur-xl scale-150" />

                <div className="relative p-4 bg-gradient-to-br from-[#238636] via-[#3fb950] to-[#2ea043] rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7z" /></svg>
                </div>
              </motion.div>

              <motion.h1
                className="text-2xl font-bold text-white tracking-tight mb-4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="bg-gradient-to-r from-[#3fb950] via-[#2ea043] to-[#238636] bg-clip-text text-transparent">
                  ¡Email Enviado!
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border border-[#30363d] bg-[#0d1117]/50 p-6 mb-6"
              >
                <div className="flex items-start gap-3 text-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#3fb950] shrink-0 mt-0.5"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  <div>
                    <p className="text-[#c9d1d9] text-sm mb-2">
                      Revisa tu bandeja de entrada en:
                    </p>
                    <p className="text-[#58a6ff] font-mono text-sm bg-[#161b22] px-3 py-2 rounded-md border border-[#30363d]">
                      {email}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.p
                className="text-[#8b949e] text-sm mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Si el email existe en nuestro sistema, recibirás instrucciones para restablecer tu contraseña en unos minutos.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={() => {
                    setSuccess(false);
                    setEmail("");
                  }}
                  className="w-full p-3 bg-[#21262d] hover:bg-[#30363d] border border-[#30363d] hover:border-[#484f58] text-[#c9d1d9] rounded-lg text-sm font-medium transition-all duration-200"
                >
                  Enviar a otro email
                </button>

                <a
                  href="/login"
                  className="w-full p-3 bg-gradient-to-r from-[#f0883e] via-[#d29922] to-[#f0883e] text-black rounded-lg text-sm font-semibold text-center transition-all duration-200"
                >
                  Volver al inicio de sesión
                </a>
              </motion.div>

              {/* Tips */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 p-4 rounded-lg bg-[#161b22] border border-[#30363d] text-left"
              >
                <p className="text-[#8b949e] text-xs font-medium mb-2">💡 Consejos:</p>
                <ul className="text-[#484f58] text-xs space-y-1">
                  <li>• Revisa tu carpeta de spam si no ves el email</li>
                  <li>• El enlace expira en 24 horas</li>
                  <li>• Puedes solicitar un nuevo enlace si es necesario</li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer decoration */}
      <motion.div
        className="absolute bottom-4 left-0 right-0 text-center text-[#484f58] text-xs font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <span className="text-[#f0883e]">●</span> Recuperación segura
        <span className="mx-2">|</span>
        <span className="text-[#d29922]">256-bit</span> encryption
      </motion.div>
    </div>
  );
}
