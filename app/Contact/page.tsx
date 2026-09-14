'use client';

import { useId, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Mail, Phone, MapPin, Clock, Send, Github, Linkedin,
    Twitter, MessageSquare, CheckCircle, AlertCircle,
    User, Building, FileText, ArrowRight, Plus, Minus,
    Facebook,
} from 'lucide-react';
import Navbar from '@/components/Navbar/navbar';

const contactInfo = [
    { icon: Mail, title: 'Email', value: 'jgutierrez@jacana-dev.com', link: 'mailto:jgutierrez@jacana-dev.com', external: false },
    { icon: Phone, title: 'Teléfono', value: '+506 8790 5876', link: 'tel:+50687905876', external: false },
    { icon: MapPin, title: 'Ubicación', value: 'San Pedro, Montes de Oca, Costa Rica', link: 'https://maps.google.com/?q=San+Pedro,+Montes+de+Oca,+Costa+Rica', external: true },
    { icon: Clock, title: 'Horario', value: 'Lun – Vie · 9:00 – 18:00', link: null, external: false },
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
        question: '¿Trabajas con clientes internacionales?',
        answer: 'Por ahora trabajo principalmente con clientes en Costa Rica, pero estoy listo para recibir proyectos internacionales — la comunicación remota en español e inglés no es ningún problema.',
    },
    {
        question: '¿Cómo es el proceso de desarrollo?',
        answer: 'Seguimos metodologías ágiles: descubrimiento, diseño, desarrollo iterativo, testing y lanzamiento con retroalimentación continua.',
    },
];

const stats = [
    { value: '10+', label: 'Proyectos' },
    { value: '98%', label: 'Satisfacción' },
    { value: '2+', label: 'Años' },
    { value: '24/7', label: 'Soporte' },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MAX = 600;

type FormData = {
    name: string; email: string; company: string; phone: string;
    service: string; budget: string; message: string;
    website: string; // honeypot anti-spam — debe quedar siempre vacío
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FieldErrors {
    const errors: FieldErrors = {};
    if (!data.name.trim()) errors.name = 'Tu nombre es requerido.';
    if (!data.email.trim()) errors.email = 'Tu email es requerido.';
    else if (!EMAIL_RE.test(data.email.trim())) errors.email = 'Ingresa un email válido.';
    if (!data.message.trim()) errors.message = 'Cuéntanos brevemente sobre tu proyecto.';
    else if (data.message.length > MESSAGE_MAX) errors.message = `Máximo ${MESSAGE_MAX} caracteres.`;
    return errors;
}

const InputField = ({
    label, icon: Icon, required, error, hint, ...props
}: {
    label: string; icon: React.ElementType; required?: boolean; error?: string; hint?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) => {
    const id = useId();
    const errorId = `${id}-error`;
    return (
        <div className="group space-y-2">
            <label htmlFor={id} className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                <Icon className="w-3.5 h-3.5 text-lime-400/80" />
                {label}{required && <span className="text-lime-400/60">*</span>}
            </label>
            <input
                id={id}
                {...props}
                required={required}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : undefined}
                className={`w-full px-0 py-3.5 rounded-none bg-transparent border-b text-white placeholder-slate-600 text-sm
                    focus:outline-none transition-colors duration-300
                    ${error ? 'border-red-500/70 focus:border-red-400' : 'border-slate-700/60 hover:border-slate-500/80 focus:border-lime-400/60'}`}
            />
            {error ? (
                <p id={errorId} role="alert" className="text-[11px] text-red-400/90">{error}</p>
            ) : hint ? (
                <p className="text-[11px] text-slate-600">{hint}</p>
            ) : null}
        </div>
    );
};

const SelectField = ({
    label, icon: Icon, options, placeholder, ...props
}: {
    label: string; icon: React.ElementType; options: string[]; placeholder: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>) => {
    const id = useId();
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                <Icon className="w-3.5 h-3.5 text-lime-400/80" />
                {label}
            </label>
            <select
                id={id}
                {...props}
                className="w-full px-0 py-3.5 rounded-none bg-transparent border-b border-slate-700/60 text-sm text-white
                    focus:border-lime-400/60 focus:outline-none transition-colors duration-300
                    hover:border-slate-500/80 appearance-none cursor-pointer"
            >
                <option value="" className="bg-[#0d0d1a] text-slate-500">{placeholder}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt} className="bg-[#0d0d1a] text-white">{opt}</option>
                ))}
            </select>
        </div>
    );
};

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '', email: '', company: '', phone: '', service: '', budget: '', message: '', website: '',
    });
    const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    const errors = validate(formData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setTouched((t) => ({ ...t, [e.target.name]: true }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setTouched({ name: true, email: true, message: true });
        setErrorMessage(null);

        if (Object.keys(errors).length > 0) {
            setSubmitStatus('error');
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                setErrorMessage(data?.error || 'No se pudo enviar el mensaje. Intenta de nuevo.');
                setSubmitStatus('error');
                return;
            }

            setSubmitStatus('success');
            setFormData({ name: '', email: '', company: '', phone: '', service: '', budget: '', message: '', website: '' });
            setTouched({});
        } catch {
            setErrorMessage('No pudimos conectar con el servidor. Revisa tu conexión e intenta de nuevo.');
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#06051d]">
            <Navbar />
            <section id="contact" className="relative py-24 md:py-36 overflow-hidden bg-[#080810] scroll-mt-20">
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
                <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] rounded-full bg-lime-900/8 blur-[120px] pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">

                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-16 md:mb-20"
                    >
                        <p className="text-xs font-medium uppercase tracking-[0.3em] text-lime-400/70 mb-5">
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
                        <div className="mt-10 h-px bg-gradient-to-r from-slate-700/60 via-lime-400/20 to-transparent" />
                    </motion.div>

                    {/* Main Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">

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
                                    const content = (
                                        <>
                                            <div className="flex items-center gap-4 min-w-0">
                                                <span className="shrink-0 w-8 h-8 flex items-center justify-center border border-slate-700/60 group-hover:border-lime-400/40 transition-colors">
                                                    <Icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-lime-400/80 transition-colors" />
                                                </span>
                                                <div className="min-w-0">
                                                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-600 mb-0.5">{item.title}</p>
                                                    <p className="text-sm text-slate-300 group-hover:text-white transition-colors break-words">{item.value}</p>
                                                </div>
                                            </div>
                                            {item.link && (
                                                <ArrowRight className="shrink-0 w-4 h-4 text-slate-700 group-hover:text-lime-400/60 group-hover:translate-x-1 transition-all" />
                                            )}
                                        </>
                                    );
                                    const rowClass = 'group flex items-center justify-between gap-4 py-5 border-b border-slate-800/60 transition-colors';

                                    if (!item.link) {
                                        return (
                                            <motion.div
                                                key={item.title}
                                                initial={{ opacity: 0, x: -12 }}
                                                whileInView={{ opacity: 1, x: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: i * 0.08, duration: 0.5 }}
                                                className={rowClass}
                                            >
                                                {content}
                                            </motion.div>
                                        );
                                    }
                                    return (
                                        <motion.a
                                            key={item.title}
                                            href={item.link}
                                            target={item.external ? '_blank' : undefined}
                                            rel={item.external ? 'noopener noreferrer' : undefined}
                                            initial={{ opacity: 0, x: -12 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.08, duration: 0.5 }}
                                            className={`${rowClass} hover:border-slate-600/60`}
                                        >
                                            {content}
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
                                        className="bg-[#080810] p-4 sm:p-6 text-center"
                                    >
                                        <p
                                            className="text-2xl sm:text-3xl font-light text-white mb-1"
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
                                                aria-label={s.label}
                                                whileHover={{ y: -2 }}
                                                className="w-11 h-11 sm:w-10 sm:h-10 flex items-center justify-center border border-slate-800/80 hover:border-slate-600 text-slate-600 hover:text-slate-300 transition-all"
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
                            className="md:col-span-2 lg:col-span-3"
                        >
                            <form onSubmit={handleSubmit} noValidate className="space-y-8">
                                {/* Honeypot anti-spam — oculto para personas, visible para bots */}
                                <input
                                    type="text"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    aria-hidden="true"
                                    className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden"
                                />
                                <div className="grid sm:grid-cols-2 gap-8">
                                    <InputField
                                        label="Nombre completo" icon={User} type="text" name="name" autoComplete="name"
                                        value={formData.name} onChange={handleChange} onBlur={handleBlur} required
                                        placeholder="Tu nombre" error={touched.name ? errors.name : undefined}
                                    />
                                    <InputField
                                        label="Email" icon={Mail} type="email" name="email" autoComplete="email" inputMode="email"
                                        value={formData.email} onChange={handleChange} onBlur={handleBlur} required
                                        placeholder="tu@email.com" error={touched.email ? errors.email : undefined}
                                    />
                                    <InputField
                                        label="Empresa" icon={Building} type="text" name="company" autoComplete="organization"
                                        value={formData.company} onChange={handleChange}
                                        placeholder="Nombre de tu empresa"
                                    />
                                    <InputField
                                        label="Teléfono" icon={Phone} type="tel" name="phone" autoComplete="tel" inputMode="tel"
                                        value={formData.phone} onChange={handleChange}
                                        placeholder="+506 0000 0000"
                                    />
                                    <SelectField label="Servicio de interés" icon={FileText} options={services} placeholder="Selecciona un servicio" name="service" value={formData.service} onChange={handleChange} />
                                    <SelectField label="Presupuesto estimado" icon={FileText} options={budgetRanges} placeholder="Selecciona un rango" name="budget" value={formData.budget} onChange={handleChange} />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center justify-between gap-4">
                                        <label htmlFor="contact-message" className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-slate-400">
                                            <MessageSquare className="w-3.5 h-3.5 text-lime-400/80" />
                                            Mensaje <span className="text-lime-400/60">*</span>
                                        </label>
                                        <span className={`text-[11px] tabular-nums ${formData.message.length > MESSAGE_MAX ? 'text-red-400/90' : 'text-slate-600'}`}>
                                            {formData.message.length}/{MESSAGE_MAX}
                                        </span>
                                    </div>
                                    <textarea
                                        id="contact-message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        rows={5}
                                        maxLength={MESSAGE_MAX}
                                        placeholder="Cuéntanos sobre tu proyecto, objetivos y cualquier detalle importante…"
                                        aria-invalid={!!(touched.message && errors.message)}
                                        aria-describedby={touched.message && errors.message ? 'contact-message-error' : undefined}
                                        className={`w-full px-0 py-3.5 rounded-none bg-transparent text-white placeholder-slate-600 text-sm border-b
                                            focus:outline-none transition-colors duration-300 resize-none
                                            ${touched.message && errors.message ? 'border-red-500/70 focus:border-red-400' : 'border-slate-700/60 hover:border-slate-500/80 focus:border-lime-400/60'}`}
                                    />
                                    {touched.message && errors.message && (
                                        <p id="contact-message-error" role="alert" className="text-[11px] text-red-400/90">{errors.message}</p>
                                    )}
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                                    <p className="text-[11px] text-slate-600">
                                        Los campos con <span className="text-lime-400/60">*</span> son requeridos.
                                    </p>
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="group w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#080810]
                                            text-sm font-medium uppercase tracking-[0.15em]
                                            hover:bg-lime-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

                                <div role="status" aria-live="polite" className="sr-only">
                                    {isSubmitting && 'Enviando mensaje'}
                                    {submitStatus === 'success' && 'Mensaje enviado correctamente'}
                                    {submitStatus === 'error' && (errorMessage || 'Revisa los campos marcados antes de enviar el formulario')}
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
                                            role="alert"
                                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                            className="flex items-center gap-3 p-4 border-l-2 border-red-500/60 bg-red-500/5"
                                        >
                                            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                                            <p className="text-sm text-red-400/80">{errorMessage || 'Revisa los campos marcados antes de enviar el formulario.'}</p>
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
                        className="mt-24 md:mt-28"
                    >
                        <div className="h-px bg-gradient-to-r from-transparent via-slate-700/40 to-transparent mb-16" />
                        <div className="grid md:grid-cols-3 gap-12">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.3em] text-lime-400/70 mb-4">— FAQ</p>
                                <h3
                                    className="text-3xl md:text-4xl font-light text-white leading-snug"
                                    style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                >
                                    Preguntas<br />
                                    <em className="text-slate-500 not-italic">frecuentes</em>
                                </h3>
                            </div>
                            <div className="md:col-span-2 space-y-0">
                                {faqs.map((faq, i) => {
                                    const panelId = `faq-panel-${i}`;
                                    const isOpen = openFaq === i;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 16 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.07 }}
                                            className="border-b border-slate-800/60 last:border-b-0"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => setOpenFaq(isOpen ? null : i)}
                                                aria-expanded={isOpen}
                                                aria-controls={panelId}
                                                className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                                            >
                                                <span className="text-sm text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                                                    {faq.question}
                                                </span>
                                                <span className="shrink-0 w-7 h-7 flex items-center justify-center border border-slate-700/60 group-hover:border-lime-400/40 transition-colors">
                                                    {isOpen
                                                        ? <Minus className="w-3 h-3 text-lime-400/80" />
                                                        : <Plus className="w-3 h-3 text-slate-500 group-hover:text-lime-400/80 transition-colors" />
                                                    }
                                                </span>
                                            </button>
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        id={panelId}
                                                        role="region"
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <p className="pb-5 text-sm text-slate-500 leading-relaxed pr-4 sm:pr-12">{faq.answer}</p>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
