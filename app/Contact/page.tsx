'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Phone, MapPin, Clock, Send, Github, Linkedin,
    Twitter, MessageSquare, CheckCircle, AlertCircle,
    User, Building, FileText, ArrowRight,
    Facebook
} from 'lucide-react';

const contactInfo = [
    {
        icon: Mail,
        title: 'Email',
        value: 'jgutierrez@jacana-dev.com',
        link: 'mailto:jgutierrez@jacana-dev.com',
        color: 'cyan',
    },
    {
        icon: Phone,
        title: 'Teléfono',
        value: '+506 6454 1700',
        link: 'tel:+50664541700',
        color: 'blue',
    },
    {
        icon: MapPin,
        title: 'Ubicación',
        value: 'San Pedro, Montes de Oca, Costa Rica',
        link: '#',
        color: 'purple',
    },
    {
        icon: Clock,
        title: 'Horario',
        value: 'Lun - Vie: 9:00 AM - 6:00 PM',
        link: '#',
        color: 'emerald',
    },
];

const socialLinks = [
    { icon: Github, href: 'https://github.com/', label: 'GitHub', color: 'hover:text-white' },
    { icon: Linkedin, href: 'https://linkedin.com/', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter', color: 'hover:text-cyan-400' },
    { icon: Facebook, href: 'https://facebook.com/', label: 'Facebook', color: 'hover:text-cyan-400' },
];

const services = [
    'Desarrollo Web',
    'Aplicaciones Móviles',
    'Cloud & DevOps',
    'Inteligencia Artificial',
    'Consultoría Técnica',
    'Diseño UI/UX',
    'Otro',
];

const budgetRanges = [
    'Menos de $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    'Más de $50,000',
    'Por definir',
];

const faqs = [
    {
        question: '¿Cuánto tiempo toma desarrollar un proyecto?',
        answer: 'El tiempo varía según la complejidad del proyecto. Una landing page puede tomar 1-2 semanas, mientras que una aplicación completa puede requerir 2-6 meses.',
    },
    {
        question: '¿Ofrecen mantenimiento post-lanzamiento?',
        answer: 'Sí, ofrecemos planes de mantenimiento que incluyen actualizaciones, mejoras y soporte técnico continuo.',
    },
    {
        question: '¿Trabajan con clientes internacionales?',
        answer: 'Absolutamente. Trabajamos con clientes de todo el mundo, con comunicación en español e inglés.',
    },
    {
        question: '¿Cómo es el proceso de desarrollo?',
        answer: 'Seguimos metodologías ágiles: descubrimiento, diseño, desarrollo iterativo, testing y lanzamiento con retroalimentación continua.',
    },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        phone: '',
        service: '',
        budget: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setSubmitStatus('success');

        // Reset form after success
        setTimeout(() => {
            setFormData({
                name: '',
                email: '',
                company: '',
                phone: '',
                service: '',
                budget: '',
                message: '',
            });
            setSubmitStatus('idle');
        }, 3000);
    };

    return (
        <section id="contact" className="relative py-20 md:py-32 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-[#06051d]" />

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                        <MessageSquare className="w-4 h-4" />
                        Contacto
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        ¿Tienes un proyecto en mente?
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Cuéntanos sobre tu idea y trabajemos juntos para hacerla realidad.
                        Estamos listos para ayudarte.
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Contact Info - Left Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-2 space-y-8"
                    >
                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {contactInfo.map((item, index) => {
                                const Icon = item.icon;
                                const colorClasses: Record<string, string> = {
                                    cyan: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400',
                                    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400',
                                    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400',
                                    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 text-emerald-400',
                                };

                                return (
                                    <motion.a
                                        key={item.title}
                                        href={item.link}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group flex items-start gap-4 p-4 rounded-xl bg-gradient-to-br border border-white/5 hover:border-white/10 transition-all"
                                    >
                                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colorClasses[item.color]} flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm text-gray-400 mb-0.5">{item.title}</h4>
                                            <p className="text-white font-medium group-hover:text-cyan-400 transition-colors">{item.value}</p>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className="text-sm text-gray-400 mb-4 uppercase tracking-wider">Síguenos</h4>
                            <div className="flex gap-3">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={social.label}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 ${social.color} transition-all`}
                                        >
                                            <Icon className="w-5 h-5" />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="p-6 rounded-xl bg-gradient-to-br from-cyan-500/5 to-blue-500/5 border border-cyan-500/10">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="text-center p-3">
                                    <div className="text-3xl font-bold text-white mb-1">150+</div>
                                    <div className="text-sm text-gray-400">Proyectos</div>
                                </div>
                                <div className="text-center p-3">
                                    <div className="text-3xl font-bold text-white mb-1">98%</div>
                                    <div className="text-sm text-gray-400">Satisfacción</div>
                                </div>
                                <div className="text-center p-3">
                                    <div className="text-3xl font-bold text-white mb-1">5+</div>
                                    <div className="text-sm text-gray-400">Años</div>
                                </div>
                                <div className="text-center p-3">
                                    <div className="text-3xl font-bold text-white mb-1">24/7</div>
                                    <div className="text-sm text-gray-400">Soporte</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form - Right Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300 flex items-center gap-2">
                                        <User className="w-4 h-4 text-cyan-400" />
                                        Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Tu nombre"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300 flex items-center gap-2">
                                        <Mail className="w-4 h-4 text-cyan-400" />
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="tu@email.com"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                    />
                                </div>

                                {/* Company */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300 flex items-center gap-2">
                                        <Building className="w-4 h-4 text-cyan-400" />
                                        Empresa
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={formData.company}
                                        onChange={handleChange}
                                        placeholder="Nombre de tu empresa"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                    />
                                </div>

                                {/* Phone */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300 flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-cyan-400" />
                                        Teléfono
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+1 809 555 0123"
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                                    />
                                </div>

                                {/* Service */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-cyan-400" />
                                        Servicio de interés
                                    </label>
                                    <select
                                        name="service"
                                        value={formData.service}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-[#0a0a1a]">Selecciona un servicio</option>
                                        {services.map((service) => (
                                            <option key={service} value={service} className="bg-[#0a0a1a]">
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Budget */}
                                <div className="space-y-2">
                                    <label className="text-sm text-gray-300 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-cyan-400" />
                                        Presupuesto estimado
                                    </label>
                                    <select
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="" className="bg-[#0a0a1a]">Selecciona un rango</option>
                                        {budgetRanges.map((range) => (
                                            <option key={range} value={range} className="bg-[#0a0a1a]">
                                                {range}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="mt-6 space-y-2">
                                <label className="text-sm text-gray-300 flex items-center gap-2">
                                    <MessageSquare className="w-4 h-4 text-cyan-400" />
                                    Mensaje *
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Cuéntanos sobre tu proyecto, objetivos y cualquier detalle importante..."
                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                                />
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="mt-6 w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-base hover:from-cyan-400 hover:to-blue-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-cyan-500/20"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Enviando...
                                    </>
                                ) : submitStatus === 'success' ? (
                                    <>
                                        <CheckCircle className="w-5 h-5" />
                                        ¡Mensaje enviado!
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        Enviar mensaje
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </motion.button>

                            {/* Status Messages */}
                            <AnimatePresence>
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3"
                                    >
                                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                                        <p className="text-emerald-400 text-sm">
                                            ¡Gracias! Hemos recibido tu mensaje. Te contactaremos pronto.
                                        </p>
                                    </motion.div>
                                )}
                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3"
                                    >
                                        <AlertCircle className="w-5 h-5 text-red-400" />
                                        <p className="text-red-400 text-sm">
                                            Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>

                {/* FAQ Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-20"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-10">
                        Preguntas Frecuentes
                    </h3>

                    <div className="max-w-3xl mx-auto space-y-3">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="rounded-xl bg-white/[0.02] border border-white/5 overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-5 text-left group"
                                >
                                    <span className="text-white font-medium group-hover:text-cyan-400 transition-colors pr-4">
                                        {faq.question}
                                    </span>
                                    <motion.div
                                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="shrink-0"
                                    >
                                        <ArrowRight className="w-5 h-5 text-cyan-400 rotate-90" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openFaq === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-5 text-gray-400 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
