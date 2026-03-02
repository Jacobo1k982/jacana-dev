export const dynamic = "force-dynamic";

import { Suspense } from "react";
import { motion } from "framer-motion";

// Componente de carga estilo Futurista Terminal
function ResetPasswordFallback() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0d1117] relative overflow-hidden">
            {/* Animated background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(163,113,247,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(163,113,247,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />

            {/* Glow effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#a371f7]/10 rounded-full blur-[120px] animate-pulse" />

            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md p-10 bg-[#161b22]/90 border border-[#30363d] rounded-2xl shadow-2xl relative z-10 backdrop-blur-xl"
            >
                {/* Scanline effect */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[size:100%_4px] opacity-10" />
                </div>

                {/* Header con logo animado */}
                <div className="text-center mb-8 relative">
                    <motion.div
                        className="inline-block mb-4 relative"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                        {/* Glow behind logo */}
                        <div className="absolute inset-0 bg-[#a371f7]/30 rounded-full blur-xl scale-150 animate-pulse" />

                        <div className="relative p-1 bg-gradient-to-br from-[#a371f7] via-[#8957e5] to-[#a371f7] rounded-full animate-pulse">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#a371f7]"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg>
                        Secure Reset
                    </motion.div>

                    <h1 className="text-2xl font-bold text-white tracking-tight">
                        <span className="bg-gradient-to-r from-[#a371f7] via-[#8957e5] to-[#a371f7] bg-clip-text text-transparent">
                            Inicializando
                        </span>
                        {" "}Sistema
                    </h1>
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
                            system.init
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Loading animation */}
                        <div className="flex flex-col items-center justify-center gap-4 py-4">
                            {/* Spinner */}
                            <div className="relative">
                                <div className="w-12 h-12 border-2 border-[#30363d] rounded-full" />
                                <div className="absolute inset-0 w-12 h-12 border-2 border-transparent border-t-[#a371f7] rounded-full animate-spin" />
                                <div className="absolute inset-1 w-10 h-10 border-2 border-transparent border-t-[#8957e5] rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                            </div>

                            {/* Loading text with typing effect */}
                            <div className="text-center">
                                <p className="text-[#c9d1d9] text-sm font-mono">
                                    Cargando módulo de seguridad
                                    <span className="inline-flex">
                                        <span className="animate-pulse delay-0">.</span>
                                        <span className="animate-pulse delay-150">.</span>
                                        <span className="animate-pulse delay-300">.</span>
                                    </span>
                                </p>
                            </div>

                            {/* Progress bars */}
                            <div className="w-full space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        className="flex items-center gap-3"
                                    >
                                        <div className="w-16 h-1 bg-[#30363d] rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-[#a371f7] to-[#8957e5]"
                                                animate={{ x: ['-100%', '100%'] }}
                                                transition={{
                                                    duration: 1.5,
                                                    repeat: Infinity,
                                                    delay: i * 0.3,
                                                    ease: 'linear'
                                                }}
                                            />
                                        </div>
                                        <span className="text-[#484f58] text-[10px] font-mono uppercase tracking-wider">
                                            {['Validando', 'Autenticando', 'Preparando'][i - 1]}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Terminal prompt decoration */}
                <div className="flex items-center justify-center gap-2 mt-6 text-xs text-[#484f58] font-mono">
                    <span className="text-[#a371f7]">$</span>
                    <span className="text-[#8b949e]">system --boot</span>
                    <span className="w-2 h-4 bg-[#a371f7] animate-pulse" />
                </div>
            </motion.div>

            {/* Footer decoration */}
            <motion.div
                className="absolute bottom-4 left-0 right-0 text-center text-[#484f58] text-xs font-mono"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <span className="text-[#a371f7]">●</span> Sistema seguro
                <span className="mx-2">|</span>
                <span className="text-[#8957e5]">256-bit</span> encryption
            </motion.div>
        </div>
    );
}

// Componente principal que usaría el ResetPasswordClient
// (Este es un ejemplo de cómo se vería el wrapper con Suspense)
export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<ResetPasswordFallback />}>
            {/* ResetPasswordClient iría aquí */}
            <ResetPasswordFallback />
        </Suspense>
    );
}
