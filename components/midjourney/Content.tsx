'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

// NOTA: estas imágenes (/public/gallery) parecen ser assets de muestra heredados de una
// plantilla de Midjourney (eye/pen/face/heart/brain...). Recomendado reemplazarlas por
// capturas reales de proyectos de Jacana Dev antes de publicar — ver /app/projects para el
// portafolio real ya existente en el proyecto.
const projects = [
    { src: '/gallery/eye.png', alt: 'Vista previa de proyecto', title: 'Próximamente', subtitle: 'Inteligencia Artificial' },
    { src: '/gallery/pen.png', alt: 'Vista previa de proyecto', title: 'Próximamente', subtitle: 'Desarrollo Web' },
    { src: '/gallery/people.png', alt: 'Vista previa de proyecto', title: 'Próximamente', subtitle: 'Apps Móviles' },
    { src: '/gallery/face.png', alt: 'Vista previa de proyecto', title: 'Próximamente', subtitle: 'Cloud & DevOps' },
    { src: '/gallery/img5.png', alt: 'Vista previa de proyecto', title: 'Próximamente', subtitle: 'Desarrollo Web' },
    { src: '/gallery/img3.png', alt: 'Vista previa de proyecto', title: 'Próximamente', subtitle: 'Inteligencia Artificial' },
    { src: '/gallery/img1.png', alt: 'Vista previa de proyecto', title: 'Próximamente', subtitle: 'Apps Móviles' },
    { src: '/gallery/img2.png', alt: 'Vista previa de proyecto', title: 'Próximamente', subtitle: 'Cloud & DevOps' },
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
                        Un estudio<br />
                        <em className="text-slate-400 not-italic">fullstack costarricense</em>
                    </h2>
                    <div className="space-y-4">
                        <Prose>
                            Somos{' '}
                            <a
                                href="/About"
                                className="text-white border-b border-amber-400/40 hover:border-amber-400/70 transition-colors"
                            >
                                Jacana Dev
                            </a>
                            , un equipo de 5 especialistas en San Pedro, Costa Rica, que combina ingeniería, diseño y estrategia de producto para construir software que impulsa negocios reales.
                        </Prose>
                        <Prose>
                            Medimos el éxito de cada proyecto en resultados de negocio, no solo en líneas de código: más ventas, más usuarios, más eficiencia para tu operación.
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
                        Trabajo que<br />
                        <em className="text-slate-400 not-italic">habla por sí solo</em>
                    </h2>
                    <div className="space-y-4 mb-10">
                        <Prose>
                            Cada proyecto arranca con la misma pregunta: ¿qué necesita tu negocio para crecer? De ahí construimos soluciones a medida en desarrollo web, apps móviles, cloud e inteligencia artificial.
                        </Prose>
                        <Prose>
                            Estamos preparando nuestro portafolio completo. Mientras tanto, aquí tienes una muestra de las áreas en las que trabajamos — o escríbenos directamente para hablar de tu proyecto.
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

                    <a
                        href="/projects"
                        className="group inline-flex items-center gap-2.5 mt-8 px-6 py-3 border border-slate-700/60 hover:border-amber-400/40 text-slate-300 hover:text-white text-xs font-medium uppercase tracking-[0.15em] transition-all"
                    >
                        Ver portafolio completo
                        <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                </section>

                {/* ── CARRERAS ── */}
                <section className="relative">
                    <SectionLabel id="careers" label="Carreras" />
                    <h2
                        className="text-3xl md:text-4xl font-light text-white leading-snug mb-6"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                    >
                        Estamos<br />
                        <em className="text-slate-400 not-italic">creciendo</em>
                    </h2>
                    <div className="space-y-4 mb-8">
                        <Prose>
                            Somos un equipo pequeño, ágil y remoto — y siempre buscamos sumar talento que quiera construir software para clientes reales, no solo proyectos de práctica.
                        </Prose>
                        <Prose>
                            Si React, Node.js, Cloud o IA son tu terreno, cuéntanos qué sabes hacer.
                        </Prose>
                    </div>
                    <a
                        href="mailto:jgutierrez@jacana-dev.com?subject=Quiero%20unirme%20al%20equipo%20de%20Jacana%20Dev"
                        className="group inline-flex items-center gap-2.5 px-6 py-3 bg-white text-[#080810] text-xs font-medium uppercase tracking-[0.15em] hover:bg-amber-50 transition-colors"
                    >
                        Escríbenos
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
                                label: 'Nuevos proyectos',
                                links: [
                                    { text: 'jgutierrez@jacana-dev.com', href: 'mailto:jgutierrez@jacana-dev.com' },
                                    { text: 'Formulario de contacto', href: '/Contact' },
                                ],
                            },
                            {
                                label: 'Teléfono',
                                links: [{ text: '+506 6454 1700', href: 'tel:+50664541700' }],
                            },
                            {
                                label: 'Ubicación',
                                links: [{ text: 'San Pedro, Montes de Oca, Costa Rica', href: '/Contact' }],
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
                {/* TODO: apuntar a páginas legales propias de Jacana Dev en cuanto existan (/terminos, /privacidad) */}
                <div className="pt-8 border-t border-slate-800/60 flex flex-wrap gap-8">
                    {[
                        { text: 'Términos de Servicio', href: '#' },
                        { text: 'Política de Privacidad', href: '#' },
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