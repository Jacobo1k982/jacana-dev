// components/home/ServicesStrip.tsx
// Servicios en lenguaje de cliente. Lista con divisores finos, sin tarjetas.
import Link from 'next/link';
import { ArrowRight, Monitor, Server, Smartphone, Cloud, Database, Brain, Plug, Compass } from 'lucide-react';
import SectionBackdrop from '@/components/ui/SectionBackdrop';

const DISPLAY = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;

const SERVICES = [
    { icon: Monitor, name: 'Desarrollo frontend', body: 'Interfaces rápidas y claras para tus usuarios.', href: '/services/FrontendService' },
    { icon: Server, name: 'Desarrollo backend', body: 'La lógica y los datos de tu negocio, bien resueltos.', href: '/services/BackendService' },
    { icon: Smartphone, name: 'Aplicaciones móviles', body: 'Apps para iOS y Android desde una sola base de código.', href: '/services/MobileService' },
    { icon: Cloud, name: 'Cloud y DevOps', body: 'Despliegues automáticos y servidores estables.', href: '/services/CloudService' },
    { icon: Database, name: 'Bases de datos', body: 'Modelos de datos pensados para crecer contigo.', href: '/services/DatabaseService' },
    { icon: Brain, name: 'Inteligencia artificial', body: 'Automatiza tareas repetitivas con IA.', href: '/services/AIService' },
    { icon: Plug, name: 'APIs e integraciones', body: 'Conecta tus sistemas con pagos, facturación y otros servicios.', href: '/services/APIService' },
    { icon: Compass, name: 'Consultoría técnica', body: 'Revisamos tu arquitectura y te decimos qué mejorar.', href: '/services/ConsultingService' },
] as const;

export default function ServicesStrip() {
    return (
        <section aria-labelledby="services-title" className="relative overflow-hidden bg-[#090d13] py-20 sm:py-28">
            <SectionBackdrop variant="grid" />

            <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 md:px-8">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
                    <header className="lg:sticky lg:top-28 lg:self-start">
                        <h2 id="services-title" className="text-balance text-4xl font-light leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl" style={DISPLAY}>
                            Qué podemos hacer por tu negocio
                        </h2>
                        <p className="mt-6 max-w-md text-sm leading-relaxed text-slate-400 sm:text-base">
                            Desde una web que te encuentre hasta un sistema que lleve tu operación diaria. Cuéntanos el problema y proponemos la solución más simple que funcione.
                        </p>
                        <Link
                            href="/servicios"
                            className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-lime-300 transition-colors hover:text-lime-200"
                        >
                            Ver todos los servicios
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                        </Link>
                    </header>

                    <ul className="grid border-t border-slate-800/80 sm:grid-cols-2">
                        {SERVICES.map(({ icon: Icon, name, body, href }, i) => (
                            <li
                                key={name}
                                className={`border-b border-slate-800/80 ${i % 2 === 0 ? 'sm:border-r' : ''}`}
                            >
                                <Link
                                    href={href}
                                    className="group flex h-full flex-col gap-3 p-6 outline-none transition-colors hover:bg-lime-400/[0.04] focus-visible:bg-lime-400/[0.06] sm:p-7"
                                >
                                    <Icon className="h-5 w-5 text-lime-400/80 transition-colors group-hover:text-lime-300" aria-hidden="true" />
                                    <span className="text-lg font-medium text-white">{name}</span>
                                    <span className="text-sm leading-relaxed text-slate-400">{body}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
