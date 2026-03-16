'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Phone, MapPin, Clock, Send, Github, Linkedin,
    Twitter, MessageSquare, CheckCircle, AlertCircle,
    User, Building, FileText, ArrowRight, Plus, Minus,
    Facebook
} from 'lucide-react';

const contactInfo = [
    { icon: Mail, title: 'Email', value: 'jgutierrez@jacana-dev.com', link: 'mailto:jgutierrez@jacana-dev.com' },
    { icon: Phone, title: 'Teléfono', value: '+506 6454 1700', link: 'tel:+50664541700' },
    { icon: MapPin, title: 'Ubicación', value: 'San Pedro, Montes de Oca, Costa Rica', link: '#' },
    { icon: Clock, title: 'Horario', value: 'Lun – Vie · 9:00 – 18:00', link: '#' },
];

const socialLinks = [
    { icon: Github, href: 'https://github.com/', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com/', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/', label: 'Facebook' },
];

const services = [
    'Desarrollo Web', 'Aplicaciones Móviles', 'Cloud & DevOps',
    'Inteligencia Artificial', 'Consultoría Técnica', 'Diseño UI/UX', 'Otro',
];

const budgetRanges = [
    'Menos de $5,000', '$5,000 – $15,000', '$15,000 – $50,000',
    'Más de $50,000', 'Por definir',
];

const faqs = [
    {
        question: '¿Cuánto tiempo toma desarrollar un proyecto?',
        answer: 'El tiempo varía según la complejidad del proyecto. Una landing page puede tomar 1–2 semanas, mientras que una aplicación completa puede requerir 2–6 meses.',
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

const stats = [
    { value: '10+', label: 'Proyectos' },
    { value: '98%', label: 'Satisfacción' },
    { value: '4+', label: 'Años' },
    { value: '24/7', label: 'Soporte' },
];

const InputField = ({
    label, icon: Icon, required, ...props
}: {
    label: string; icon: React.ElementType; required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="group space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
            <Icon className="w-3.5 h-3.5 text-amber-400/80" />
            {label}{required && <span className="text-amber-400/60">*</span>}
        </label>
        <input
            {...props}
            required={required}
            className="w-full px-0 py-3.5 rounded-none bg-transparent border-b border-slate-700/60 text-white placeholder-slate-600 text-sm
                focus:border-amber-400/60 focus:outline-none transition-colors duration-300 hover:border-slate-500/80"
        />
    </div>
);

const SelectField = ({
    label, icon: Icon, options, placeholder, ...props
}: {
    label: string; icon: React.ElementType; options: string[]; placeholder: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div className="space-y-2">
        <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
            <Icon className="w-3.5 h-3.5 text-amber-400/80" />
            {label}
        </label>
        <select
            {...props}
            className="w-full px-0 py-3.5 rounded-none bg-transparent border-b border-slate-700/60 text-sm text-white
                focus:border-amber-400/60 focus:outline-none transition-colors duration-300
                hover:border-slate-500/80 appearance-none cursor-pointer"
        >
            <option value="" className="bg-[#0d0d1a] text-slate-500">{placeholder}</option>
            {options.map((opt) => (
                <option key={opt} value={opt} className="bg-[#0d0d1a] text-white">{opt}</option>
            ))}
        </select>
    </div>
);

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '', email: '', company: '', phone: '', service: '', budget: '', message: '',
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
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setSubmitStatus('success');
        setTimeout(() => {
            setFormData({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '' });
            setSubmitStatus('idle');
        }, 3000);
    };

    return (
        <section id="contact" className="relative py-24 md:py-36 overflow-hidden bg-[#080810]">
            {/* Grain overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px',
                }}
            />
            <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-indigo-900/10 blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-amber-900/8 blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20"
                >
                    <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-400/70 mb-5">
                        — Contacto
                    </p>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <h2
                            className="text-4xl md:text-6xl font-light text-white leading-[1.1] tracking-tight"
                            style={{ fontFamily: "'Cormorant Garamond', 'Garamond', Georgia, serif" }}
                        >
                            ¿Tienes un proyecto<br />
                            <em className="text-slate-400 not-italic">en mente?</em>
                        </h2>
                        <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                            Cuéntanos sobre tu idea y construyamos algo memorable juntos.
                        </p>
                    </div>
                    <div className="mt-10 h-px bg-gradient-to-r from-slate-700/60 via-amber-400/20 to-transparent" />
                </motion.div>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-2 space-y-10"
                    >
                        <div className="space-y-0">
                            {contactInfo.map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.a
                                        key={item.title}
                                        href={item.link}
                                        initial={{ opacity: 0, x: -12 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08, duration: 0.5 }}
                                        className="group flex items-center justify-between py-5 border-b border-slate-800/60 hover:border-slate-600/60 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="w-8 h-8 flex items-center justify-center border border-slate-700/60 group-hover:border-amber-400/40 transition-colors">
                                                <Icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400/80 transition-colors" />
                                            </span>
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-0.5">{item.title}</p>
                                                <p className="text-sm text-slate-300 group-hover:text-white transition-colors">{item.value}</p>
                                            </div>
                                        </div>
                                        <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-amber-400/60 group-hover:translate-x-1 transition-all" />
                                    </motion.a>
                                );
                            })}
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-px bg-slate-800/30">
                            {stats.map((s, i) => (
                                <motion.div
                                    key={s.label}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.06 + 0.2 }}
                                    className="bg-[#080810] p-6 text-center"
                                >
                                    <p
                                        className="text-3xl font-light text-white mb-1"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >{s.value}</p>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600">{s.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social */}
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-600 mb-4">Síguenos</p>
                            <div className="flex gap-3">
                                {socialLinks.map((s) => {
                                    const Icon = s.icon;
                                    return (
                                        <motion.a
                                            key={s.label}
                                            href={s.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ y: -2 }}
                                            className="w-10 h-10 flex items-center justify-center border border-slate-800/80 hover:border-slate-600 text-slate-600 hover:text-slate-300 transition-all"
                                        >
                                            <Icon className="w-4 h-4" />
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:col-span-3"
                    >
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-8">
                                <InputField label="Nombre completo" icon={User} type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Tu nombre" />
                                <InputField label="Email" icon={Mail} type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="tu@email.com" />
                                <InputField label="Empresa" icon={Building} type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Nombre de tu empresa" />
                                <InputField label="Teléfono" icon={Phone} type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+506 0000 0000" />
                                <SelectField label="Servicio de interés" icon={FileText} options={services} placeholder="Selecciona un servicio" name="service" value={formData.service} onChange={handleChange} />
                                <SelectField label="Presupuesto estimado" icon={FileText} options={budgetRanges} placeholder="Selecciona un rango" name="budget" value={formData.budget} onChange={handleChange} />
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                                    <MessageSquare className="w-3.5 h-3.5 text-amber-400/80" />
                                    Mensaje <span className="text-amber-400/60">*</span>
                                </label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    placeholder="Cuéntanos sobre tu proyecto, objetivos y cualquier detalle importante…"
                                    className="w-full px-0 py-3.5 rounded-none bg-transparent border-b border-slate-700/60 text-white placeholder-slate-600 text-sm
                                        focus:border-amber-400/60 focus:outline-none transition-colors duration-300 hover:border-slate-500/80 resize-none"
                                />
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <p className="text-[11px] text-slate-600">
                                    Los campos con <span className="text-amber-400/60">*</span> son requeridos.
                                </p>
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group flex items-center gap-3 px-8 py-4 bg-white text-[#080810]
                                        text-sm font-medium uppercase tracking-[0.15em]
                                        hover:bg-amber-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <><div className="w-4 h-4 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />Enviando…</>
                                    ) : submitStatus === 'success' ? (
                                        <><CheckCircle className="w-4 h-4 text-emerald-600" />Enviado</>
                                    ) : (
                                        <><Send className="w-4 h-4" />Enviar mensaje</>
                                    )}
                                </motion.button>
                            </div>

                            <AnimatePresence>
                                {submitStatus === 'success' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                        className="flex items-center gap-3 p-4 border-l-2 border-emerald-500/60 bg-emerald-500/5"
                                    >
                                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                                        <p className="text-sm text-emerald-400/80">¡Gracias! Hemos recibido tu mensaje. Te contactaremos pronto.</p>
                                    </motion.div>
                                )}
                                {submitStatus === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                        className="flex items-center gap-3 p-4 border-l-2 border-red-500/60 bg-red-500/5"
                                    >
                                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                        <p className="text-sm text-red-400/80">Hubo un error al enviar. Por favor, intenta de nuevo.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </form>
                    </motion.div>
                </div>

                {/* FAQ */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-28"
                >
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent mb-16" />
                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/70 mb-4">— FAQ</p>
                            <h3
                                className="text-3xl md:text-4xl font-light text-white leading-snug"
                                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                            >
                                Preguntas<br />
                                <em className="text-slate-500 not-italic">frecuentes</em>
                            </h3>
                        </div>
                        <div className="md:col-span-2 space-y-0">
                            {faqs.map((faq, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07 }}
                                    className="border-b border-slate-800/60 last:border-b-0"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                        className="w-full flex items-center justify-between py-5 text-left group"
                                    >
                                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors pr-6 leading-relaxed">
                                            {faq.question}
                                        </span>
                                        <span className="shrink-0 w-7 h-7 flex items-center justify-center border border-slate-700/60 group-hover:border-amber-400/40 transition-colors">
                                            {openFaq === i
                                                ? <Minus className="w-3 h-3 text-amber-400/80" />
                                                : <Plus className="w-3 h-3 text-slate-500 group-hover:text-amber-400/80 transition-colors" />
                                            }
                                        </span>
                                    </button>
                                    <AnimatePresence>
                                        {openFaq === i && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <p className="pb-5 text-sm text-slate-500 leading-relaxed pr-12">{faq.answer}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}