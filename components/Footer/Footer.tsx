'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import SocialIcon from '@/components/SocialIcon';
import { SOCIALS } from '@/lib/socials';

// Rutas privadas / de acceso: sin pie de página público
const HIDDEN_PREFIXES = ['/dashboard', '/admin', '/login', '/forgot-password', '/reset-password'];

const NAV = [
    { label: 'Inicio', href: '/' },
    { label: 'Servicios', href: '/servicios' },
    { label: 'Portafolio', href: '/projects' },
    { label: 'Sobre nosotros', href: '/About' },
    { label: 'Contacto', href: '/Contact' },
] as const;

const SERVICES = [
    { label: 'Desarrollo Frontend', href: '/services/FrontendService' },
    { label: 'Desarrollo Backend', href: '/services/BackendService' },
    { label: 'Aplicaciones Móviles', href: '/services/MobileService' },
    { label: 'Cloud & DevOps', href: '/services/CloudService' },
    { label: 'Bases de Datos', href: '/services/DatabaseService' },
    { label: 'Inteligencia Artificial', href: '/services/AIService' },
    { label: 'APIs & Integraciones', href: '/services/APIService' },
    { label: 'Consultoría Técnica', href: '/services/ConsultingService' },
] as const;

const linkClass = 'text-sm text-slate-500 hover:text-lime-400 transition-colors';
const headingClass = 'text-[10px] uppercase tracking-[0.3em] text-lime-400/70 mb-5';

export default function Footer() {
    const pathname = usePathname();
    if (HIDDEN_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + '/'))) return null;

    return (
        <footer className="relative bg-[#04030f] border-t border-slate-800/60">
            <div className="h-px bg-gradient-to-r from-transparent via-lime-400/30 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 pb-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-12 lg:gap-10">

                    {/* Marca */}
                    <div>
                        <Link href="/" aria-label="Jacana Developers — inicio" className="inline-block">
                            <Image
                                src="/Logo-dev.png"
                                alt="Jacana Developers"
                                width={120}
                                height={120}
                                className="w-28 h-28 object-contain"
                            />
                        </Link>
                        <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-xs">
                            Construimos software que impulsa negocios, desde Costa Rica.
                        </p>

                        <ul className="mt-6 flex gap-3" aria-label="Redes sociales">
                            {SOCIALS.map((s) => (
                                <li key={s.key}>
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${s.label}: ${s.handle} (se abre en una pestaña nueva)`}
                                        title={`${s.label} · ${s.handle}`}
                                        className="w-10 h-10 flex items-center justify-center border border-slate-800 hover:border-lime-400/40 text-slate-500 hover:text-lime-400 transition-all"
                                    >
                                        <SocialIcon name={s.key} className="w-4 h-4" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Navegación */}
                    <nav aria-label="Navegación del pie de página">
                        <h2 className={headingClass}>— Navegación</h2>
                        <ul className="space-y-3">
                            {NAV.map(({ label, href }) => (
                                <li key={href}><Link href={href} className={linkClass}>{label}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    {/* Servicios */}
                    <nav aria-label="Servicios">
                        <h2 className={headingClass}>— Servicios</h2>
                        <ul className="space-y-3">
                            {SERVICES.map(({ label, href }) => (
                                <li key={href}><Link href={href} className={linkClass}>{label}</Link></li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contacto */}
                    <div>
                        <h2 className={headingClass}>— Contacto</h2>
                        <ul className="space-y-3">
                            <li>
                                <a href="mailto:jgutierrez@jacana-dev.com" className={`${linkClass} inline-flex items-center gap-2.5 break-all`}>
                                    <Mail className="w-3.5 h-3.5 shrink-0 text-lime-400/60" aria-hidden="true" />
                                    jgutierrez@jacana-dev.com
                                </a>
                            </li>
                            <li>
                                <a href="tel:+50687905876" className={`${linkClass} inline-flex items-center gap-2.5`}>
                                    <Phone className="w-3.5 h-3.5 shrink-0 text-lime-400/60" aria-hidden="true" />
                                    +506 8790 5876
                                </a>
                            </li>
                            <li className="text-sm text-slate-500 inline-flex items-center gap-2.5">
                                <MapPin className="w-3.5 h-3.5 shrink-0 text-lime-400/60" aria-hidden="true" />
                                Costa Rica
                            </li>
                        </ul>

                        <a
                            href="https://daxcloud.shop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 group inline-flex items-center gap-2 px-4 py-2.5 border border-slate-800 hover:border-lime-400/40 text-[10px] uppercase tracking-[0.18em] text-slate-400 hover:text-white transition-all"
                        >
                            Nuestro producto: DaxCloud
                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
                            <span className="sr-only">(se abre en una pestaña nueva)</span>
                        </a>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <p className="text-xs text-slate-600">
                        © {new Date().getFullYear()} Jacana Developers. Todos los derechos reservados.
                    </p>
                    <p
                        className="text-[10px] uppercase tracking-[0.2em] text-slate-700"
                        style={{ fontFamily: 'var(--font-mono), monospace' }}
                    >
                        Next.js · Docker · CI/CD
                    </p>
                </div>
            </div>
        </footer>
    );
}
