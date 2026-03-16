'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const projects = [
    { src: '/gallery/eye.png', alt: 'Ojo', title: 'Modelos de Imagen y Video', subtitle: 'Software' },
    { src: '/gallery/pen.png', alt: 'Pluma', title: 'Por Anunciar', subtitle: 'Software' },
    { src: '/gallery/people.png', alt: 'Personas', title: 'Por Anunciar', subtitle: 'Software' },
    { src: '/gallery/face.png', alt: 'Rostro', title: 'Por Anunciar', subtitle: 'Software' },
    { src: '/gallery/img5.png', alt: 'Corazón', title: 'Por Anunciar', subtitle: 'Hardware' },
    { src: '/gallery/img3.png', alt: 'Cerebro', title: 'Por Anunciar', subtitle: 'Hardware' },
    { src: '/gallery/img1.png', alt: 'Mano', title: 'Por Anunciar', subtitle: 'Hardware' },
    { src: '/gallery/img2.png', alt: 'Labios', title: 'Por Anunciar', subtitle: 'Hardware' },
];

// ─────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────

function SectionLabel({ id, label }: { id: string; label: string }) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <div id={id} className="absolute -mt-24" />
            <div className="w-6 h-px bg-amber-400/60" />
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-400/70">
                {label}
            </span>
        </div>
    );
}

function Prose({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-sm text-slate-400 leading-relaxed">
            {children}
        </p>
    );
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────

export default function Content() {
    return (
        <div className="h-auto w-full relative px-6 md:px-16 text-slate-300">
            <div className="flex flex-col gap-20 pb-12 py-8 max-w-3xl mx-auto">

                {/* ── NOSOTROS ── */}
                <section className="relative">
                    <SectionLabel id="about" label="Nosotros" />
                    <h2
                        className="text-3xl md:text-4xl font-light text-white leading-snug mb-6"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                        Un laboratorio<br />
                        <em className="text-slate-400 not-italic">financiado por la comunidad</em>
                    </h2>
                    <div className="space-y-4">
                        <Prose>
                            Somos un{' '}
                            <a
                                href="#"
                                className="text-white border-b border-amber-400/40 hover:border-amber-400/70 transition-colors"
                            >
                                laboratorio de investigación financiado por la comunidad
                            </a>{' '}
                            de 60 personas conocido por construir los modelos de IA más hermosos del mundo.
                        </Prose>
                        <Prose>
                            Creemos que todos estamos en midjourney: que tenemos un rico pasado detrás y un futuro inimaginable por delante — y la pregunta que más queremos ayudar a responder es: ¿en qué queremos convertirnos?
                        </Prose>
                    </div>
                </section>

                {/* ── PROYECTOS ── */}
                <section className="relative">
                    <SectionLabel id="projects" label="Proyectos" />
                    <h2
                        className="text-3xl md:text-4xl font-light text-white leading-snug mb-6"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                        Trabajo por<br />
                        <em className="text-slate-400 not-italic">revelar</em>
                    </h2>
                    <div className="space-y-4 mb-10">
                        <Prose>
                            En los próximos meses, presentaremos una amplia gama de proyectos ambiciosos bajo los temas de imaginación, coordinación, reflexión, belleza y florecimiento humano.
                        </Prose>
                        <Prose>
                            Esperamos que nuestro trabajo ayude a contar historias de un futuro humano en el que todos quieran ser parte, y te convenza de que no estamos al final del tiempo, ni al principio, sino que todos estamos en midjourney en una vasta y gran aventura.
                        </Prose>
                    </div>

                    {/* Gallery grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-800/40">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
                                className="group relative aspect-square bg-[#080810] overflow-hidden cursor-pointer"
                            >
                                <img
                                    src={project.src}
                                    alt={project.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-[#080810]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-1 p-3">
                                    <span
                                        className="text-white text-center text-base font-light leading-snug"
                                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                                    >
                                        {project.title}
                                    </span>
                                    <span className="text-[9px] uppercase tracking-[0.25em] text-amber-400/70">
                                        {project.subtitle}
                                    </span>
                                </div>
                                {/* Bottom amber line on hover */}
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-amber-400/40 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* ── CARRERAS ── */}
                <section className="relative">
                    <SectionLabel id="careers" label="Carreras" />
                    <h2
                        className="text-3xl md:text-4xl font-light text-white leading-snug mb-6"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                        Siempre<br />
                        <em className="text-slate-400 not-italic">contratando</em>
                    </h2>
                    <div className="space-y-4 mb-8">
                        <Prose>
                            Somos un equipo ágil, autofinanciado y distribuido, y siempre estamos contratando.
                        </Prose>
                        <Prose>
                            Ayúdanos a construir y explorar nueva infraestructura para amplificar el espíritu humano.
                        </Prose>
                    </div>
                    <a
                        href="/careers"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors"
                    >
                        Más información
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                </section>

                {/* ── CONTACTO ── */}
                <section className="relative">
                    <SectionLabel id="contact" label="Contacto" />
                    <h2
                        className="text-3xl md:text-4xl font-light text-white leading-snug mb-6"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                        Hablemos
                    </h2>

                    <div className="space-y-0 border-l border-slate-800/60 pl-6">
                        {[
                            {
                                label: 'Producto & soporte',
                                links: [
                                    { text: 'Discord', href: 'https://discord.gg/midjourney' },
                                    { text: 'Página de ayuda', href: 'https://help.midjourney.com' },
                                ],
                            },
                            {
                                label: 'Facturación',
                                links: [{ text: 'billing@midjourney.com', href: 'mailto:billing@midjourney.com' }],
                            },
                            {
                                label: 'Prensa',
                                links: [{ text: 'press@midjourney.com', href: 'mailto:press@midjourney.com' }],
                            },
                        ].map((row) => (
                            <div
                                key={row.label}
                                className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-4 border-b border-slate-800/40 last:border-b-0"
                            >
                                <span className="text-[10px] uppercase tracking-[0.2em] text-slate-600 w-32 shrink-0">
                                    {row.label}
                                </span>
                                <div className="flex flex-wrap gap-4">
                                    {row.links.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            className="text-sm text-slate-400 border-b border-amber-400/0 hover:border-amber-400/40 hover:text-white transition-all"
                                        >
                                            {link.text}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <div className="pt-8 border-t border-slate-800/60 flex flex-wrap gap-8">
                    {[
                        { text: 'Términos de Servicio', href: 'https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service' },
                        { text: 'Política de Privacidad', href: 'https://docs.midjourney.com/hc/en-us/articles/32083472637453-Privacy-Policy' },
                    ].map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-[10px] uppercase tracking-[0.2em] text-slate-600 hover:text-slate-400 transition-colors"
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}