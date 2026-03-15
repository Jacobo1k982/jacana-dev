'use client';

import { motion } from 'framer-motion';
import {
    Info,
    Settings,
    Users,
    Mail,
    ExternalLink
} from 'lucide-react';

const projects = [
    { src: '/gallery/eye.png', alt: 'Ojo', title: 'Modelos de Imagen y Video', subtitle: 'Software' },
    { src: '/gallery/pen.png', alt: 'Pluma', title: 'Por Anunciar', subtitle: 'Software' },
    { src: '/gallery/people.png', alt: 'Personas', title: 'Por Anunciar', subtitle: 'Software' },
    { src: '/gallery/face.png', alt: 'Rostro', title: 'Por Anunciar', subtitle: 'Software' },
    { src: '/gallery/img5.png', alt: 'Corazón', title: 'Por Anunciar', subtitle: 'Hardware' },
    { src: '/gallery/img3.png', alt: 'Cerebro', title: 'Por Anunciar', subtitle: 'Hardware' },
    { src: '/gallery/img1.png', alt: 'Mano', title: 'Por Anunciar', subtitle: 'Hardware' },
    { src: '/gallery/img2.png', alt: 'Labios', title: 'Por Anunciar', subtitle: 'Hardware' }
];

export default function Content() {
    return (
        <div className="h-auto w-full relative px-8 md:px-16 leading-relaxed text-blue-100">
            <div className="flex flex-col gap-16 pb-8 md:py-8 max-w-4xl mx-auto max-md:mt-16 md:px-16 md:pb-8">

                {/* About Section */}
                <section className="flex flex-col gap-8 text-slate-300">
                    <div id="about" className="absolute top-0 max-md:-top-16" />
                    <div>
                        <h1 className="relative flex items-center text-2xl md:text-3xl text-white">
                            <Info className="w-8 h-8 mr-2 text-violet-600 shrink-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-ml-10" />
                            Nosotros
                        </h1>
                        <br />
                        <p>
                            Somos un <span className="text-blue-400 underline hover:underline-offset-2 cursor-pointer">laboratorio de investigación financiado por la comunidad</span> de 60 personas conocido por construir los modelos de IA más hermosos del mundo.
                        </p>
                        <br />
                        <p>
                            Creemos que todos estamos en midjourney: que tenemos un rico pasado detrás y un futuro inimaginable por delante — y la pregunta que más queremos ayudar a responder es: ¿en qué queremos convertirnos?
                        </p>
                    </div>
                </section>

                {/* Projects Section */}
                <section className="flex flex-col gap-8 text-slate-300">
                    <div id="projects" className="absolute max-md:-top-16" />
                    <div>
                        <h1 className="relative flex items-center text-2xl md:text-3xl leading-tight text-white">
                            <Settings className="w-8 h-8 mr-2 text-blue-600 shrink-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-ml-10" />
                            Proyectos
                        </h1>
                        <br />
                        <p>
                            En los próximos meses, presentaremos una amplia gama de proyectos ambiciosos bajo los temas de imaginación, coordinación, reflexión, belleza y florecimiento humano.
                        </p>
                        <br />
                        <p>
                            Esperamos que nuestro trabajo ayude a contar historias de un futuro humano en el que todos quieran ser parte, y te convenza de que no estamos al final del tiempo, ni al principio, sino que todos estamos en midjourney en una vasta y gran aventura.
                        </p>
                        <br />
                        <div className="my-6 relative -mx-4 md:-mx-8">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="relative group aspect-square rounded-lg border border-white/10 overflow-hidden bg-slate-800/20 transform-gpu transition duration-300 hover:z-10 hover:shadow-2xl hover:shadow-black/50 cursor-pointer hover:scale-[1.03]"
                                    >
                                        <img
                                            src={project.src}
                                            alt={project.alt}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            decoding="async"
                                        />
                                        <div className="absolute inset-0 bg-black/60 transition-opacity duration-200 opacity-0 group-hover:opacity-100 group-active:opacity-100" />
                                        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                            <span className="text-white text-xl font-medium text-center px-3 leading-tight transition-opacity duration-200 opacity-0 group-hover:opacity-100 group-active:opacity-100 whitespace-pre-wrap">
                                                {project.title}{'\n'}{project.subtitle}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Careers Section */}
                <section className="flex flex-col gap-8 text-slate-300">
                    <div id="careers" className="absolute max-md:-top-16" />
                    <div>
                        <h1 className="relative flex items-center text-2xl md:text-3xl leading-tight text-white">
                            <Users className="w-8 h-8 mr-2 text-emerald-600 shrink-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-ml-10" />
                            Carreras
                        </h1>
                        <br />
                        <p>
                            Somos un equipo ágil, autofinanciado y distribuido, y siempre estamos contratando.
                        </p>
                        <br />
                        <p>
                            Ayúdanos a construir y explorar nueva infraestructura para amplificar el espíritu humano.{' '}
                            <a className="text-blue-400 underline hover:underline-offset-2 inline-flex items-center gap-1" href="/careers">
                                Más información <ExternalLink className="w-4 h-4" />
                            </a>
                        </p>
                    </div>
                </section>

                {/* Contact Section */}
                <section className="flex flex-col gap-8 text-slate-300">
                    <div id="contact" className="absolute max-md:-top-16" />
                    <div>
                        <h1 className="relative flex items-center text-2xl md:text-3xl leading-tight text-white">
                            <Mail className="w-8 h-8 mr-2 text-yellow-500 shrink-0 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-ml-10" />
                            Contacto
                        </h1>
                        <br />
                        <p>
                            Para preguntas de producto y soporte, visita nuestro{' '}
                            <a href="https://discord.gg/midjourney" className="text-blue-400 underline hover:underline-offset-2">Discord</a>{' '}
                            o{' '}
                            <a href="https://help.midjourney.com" className="text-blue-400 underline hover:underline-offset-2">página de ayuda</a>.
                        </p>
                        <br />
                        <p>
                            Para soporte de facturación, escríbenos a:{' '}
                            <a href="mailto:billing@midjourney.com" className="text-blue-400 underline hover:underline-offset-2">billing@midjourney.com</a>
                        </p>
                        <br />
                        <p>
                            Para consultas periodísticas:{' '}
                            <a href="mailto:press@midjourney.com" className="text-blue-400 underline hover:underline-offset-2">press@midjourney.com</a>
                        </p>
                    </div>
                </section>

                {/* Footer Links */}
                <section className="flex justify-center gap-8 pt-8 border-t border-white/10">
                    <a className="text-sm underline-offset-2 opacity-70 hover:underline hover:opacity-100 transition-opacity" href="https://docs.midjourney.com/hc/en-us/articles/32083055291277-Terms-of-Service">
                        Términos de Servicio
                    </a>
                    <a className="text-sm underline-offset-2 opacity-70 hover:underline hover:opacity-100 transition-opacity" href="https://docs.midjourney.com/hc/en-us/articles/32083472637453-Privacy-Policy">
                        Política de Privacidad
                    </a>
                </section>
            </div>
        </div>
    );
}
