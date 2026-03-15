'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
    X, CheckCircle2, Star, Clock, Users, DollarSign,
    ArrowRight, Zap, Code, Server, Smartphone, Cloud, Database, Brain,
    ChevronRight
} from 'lucide-react';
import serviceDetailsData from '@/data/serviceDetails.json';

// Icon map
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Monitor: Code, Server, Smartphone, Cloud, Database, Brain
};

// Color themes
const colorThemes: Record<string, { gradient: string; border: string; text: string; bg: string; glow: string }> = {
    cyan: {
        gradient: 'from-cyan-500 to-blue-500',
        border: 'border-cyan-500/30',
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        glow: 'shadow-cyan-500/20'
    },
    blue: {
        gradient: 'from-blue-500 to-indigo-500',
        border: 'border-blue-500/30',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        glow: 'shadow-blue-500/20'
    },
    purple: {
        gradient: 'from-purple-500 to-pink-500',
        border: 'border-purple-500/30',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        glow: 'shadow-purple-500/20'
    },
    orange: {
        gradient: 'from-orange-500 to-red-500',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        glow: 'shadow-orange-500/20'
    },
    green: {
        gradient: 'from-green-500 to-emerald-500',
        border: 'border-green-500/30',
        text: 'text-green-400',
        bg: 'bg-green-500/10',
        glow: 'shadow-green-500/20'
    },
    pink: {
        gradient: 'from-pink-500 to-rose-500',
        border: 'border-pink-500/30',
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        glow: 'shadow-pink-500/20'
    }
};

interface ServiceDetailDialogProps {
    serviceId: string | null;
    onClose: () => void;
}

export function ServiceDetailDialog({ serviceId, onClose }: ServiceDetailDialogProps) {
    if (!serviceId) return null;

    const service = serviceDetailsData[serviceId as keyof typeof serviceDetailsData];
    if (!service) return null;

    const Icon = iconMap[service.icon] || Code;
    const theme = colorThemes[service.color] || colorThemes.cyan;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: 'spring', duration: 0.5 }}
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-[#0a0a1f] border border-white/10 rounded-3xl shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-400" />
                    </button>

                    {/* Scrollable content */}
                    <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                        {/* Header */}
                        <div className={`relative h-48 bg-gradient-to-br ${theme.gradient} p-8`}>
                            <div className="absolute inset-0 bg-black/20" />
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4" />
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

                            <div className="relative flex items-end gap-4 h-full">
                                <div className={`w-16 h-16 rounded-2xl ${theme.bg} border ${theme.border} flex items-center justify-center`}>
                                    <Icon className={`w-8 h-8 ${theme.text}`} />
                                </div>
                                <div>
                                    <span className="text-sm text-white/70">{service.category}</span>
                                    <h2 className="text-3xl font-bold text-white">{service.title}</h2>
                                    <p className="text-white/80">{service.subtitle}</p>
                                </div>
                                {service.popular && (
                                    <div className="ml-auto mb-2 flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full">
                                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                        <span className="text-sm font-medium text-white">Popular</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-8 space-y-8">
                            {/* Description */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-2">Descripción</h3>
                                <p className="text-gray-400 leading-relaxed">{service.longDescription}</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                                <div className={`p-4 rounded-xl ${theme.bg} border ${theme.border} text-center`}>
                                    <div className={`text-2xl font-bold ${theme.text}`}>{service.stats.projects}</div>
                                    <div className="text-xs text-gray-500">Proyectos</div>
                                </div>
                                <div className={`p-4 rounded-xl ${theme.bg} border ${theme.border} text-center`}>
                                    <div className={`text-2xl font-bold ${theme.text}`}>{service.stats.clients}</div>
                                    <div className="text-xs text-gray-500">Clientes</div>
                                </div>
                                <div className={`p-4 rounded-xl ${theme.bg} border ${theme.border} text-center`}>
                                    <div className={`text-2xl font-bold ${theme.text}`}>{service.stats.satisfaction}%</div>
                                    <div className="text-xs text-gray-500">Satisfacción</div>
                                </div>
                                <div className={`p-4 rounded-xl ${theme.bg} border ${theme.border} text-center`}>
                                    <div className={`text-2xl font-bold ${theme.text}`}>{service.stats.avgDelivery}</div>
                                    <div className="text-xs text-gray-500">Entrega</div>
                                </div>
                                <div className={`p-4 rounded-xl ${theme.bg} border ${theme.border} text-center`}>
                                    <div className={`text-2xl font-bold ${theme.text}`}>{service.stats.teamSize}</div>
                                    <div className="text-xs text-gray-500">Equipo</div>
                                </div>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Tecnologías</h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {service.technologies.map((tech) => (
                                        <div key={tech.name} className="relative">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-sm text-gray-300">{tech.name}</span>
                                                <span className="text-xs text-gray-500">{tech.level}%</span>
                                            </div>
                                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    animate={{ width: `${tech.level}%` }}
                                                    transition={{ delay: 0.2, duration: 0.8 }}
                                                    className={`h-full bg-gradient-to-r ${theme.gradient} rounded-full`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Features */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Características</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {service.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className={`p-4 rounded-xl ${theme.bg} border ${theme.border}`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <CheckCircle2 className={`w-5 h-5 ${theme.text} shrink-0 mt-0.5`} />
                                                <div>
                                                    <h4 className="font-medium text-white">{feature.name}</h4>
                                                    <p className="text-sm text-gray-500">{feature.description}</p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Process */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Proceso de Trabajo</h3>
                                <div className="relative">
                                    <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 to-transparent" />
                                    <div className="space-y-4">
                                        {service.process.map((step, idx) => (
                                            <div key={idx} className="relative flex gap-4 pl-10">
                                                <div className={`absolute left-2 w-5 h-5 rounded-full ${theme.bg} border-2 ${theme.border} flex items-center justify-center`}>
                                                    <span className="text-[10px] font-bold text-white">{step.step}</span>
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-white">{step.title}</h4>
                                                    <p className="text-sm text-gray-500">{step.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Planes y Precios</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {service.pricing.ranges.map((plan, idx) => (
                                        <div
                                            key={idx}
                                            className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors"
                                        >
                                            <h4 className="font-medium text-white mb-2">{plan.type}</h4>
                                            <div className={`text-2xl font-bold ${theme.text} mb-1`}>{plan.price}</div>
                                            <div className="text-sm text-gray-500">Tiempo estimado: {plan.time}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Testimonial */}
                            {service.testimonials && service.testimonials.length > 0 && (
                                <div className={`p-6 rounded-xl ${theme.bg} border ${theme.border}`}>
                                    <p className="text-gray-300 italic mb-4">&ldquo;{service.testimonials[0].quote}&rdquo;</p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                            {service.testimonials[0].author.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-white">{service.testimonials[0].author}</div>
                                            <div className="text-sm text-gray-500">{service.testimonials[0].role}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r ${theme.gradient} text-white font-bold rounded-xl`}
                                >
                                    <span>Solicitar Servicio</span>
                                    <ArrowRight className="w-5 h-5" />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-colors"
                                >
                                    <span>Ver Ejemplos</span>
                                    <ChevronRight className="w-5 h-5" />
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
