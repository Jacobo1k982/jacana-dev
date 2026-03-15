'use client';

import { motion } from 'framer-motion';
import { Code2, ArrowRight } from 'lucide-react';

// Import individual service components
import FrontendService from '@/app/services/FrontendService/page';
import BackendService from '@/app/services/BackendService/page';
import MobileService from '@/app/services/MobileService/page';
import CloudService from '@/app/services/CloudService/page';
import DatabaseService from '@/app/services/DatabaseService/page';
import AIService from '@/app/services/AIService/page';
import APIService from '@/app/services/APIService/page';
import ConsultingService from '@/app/services/ConsultingService/page';

export default function ServicesSection() {
    return (
        <section id="services" className="relative px-4 md:px-8 lg:px-16 py-20 md:py-28 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl" />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-6"
                    >
                        <Code2 className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-cyan-400 font-medium">Nuestros Servicios</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Soluciones{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Fullstack
                        </span>{' '}
                        Completas
                    </h2>

                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Ofrecemos un ecosistema completo de servicios de desarrollo para transformar tu visión en realidad.
                        Cada servicio es independiente y puede contratarse por separado.
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FrontendService />
                    <BackendService />
                    <MobileService />
                    <CloudService />
                    <DatabaseService />
                    <AIService />
                    <APIService />
                    <ConsultingService />
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-12"
                >
                    <p className="text-gray-500 text-sm mb-4">
                        ¿No encuentras lo que buscas? Podemos crear soluciones personalizadas para tu negocio.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-shadow"
                    >
                        Contactar ahora
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
