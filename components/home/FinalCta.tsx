// components/home/FinalCta.tsx
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

const DISPLAY = { fontFamily: "'Cormorant Garamond', Georgia, serif" } as const;

export default function FinalCta() {
    return (
        <section aria-labelledby="cta-title" className="relative overflow-hidden bg-[#090d13] py-24 sm:py-32">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime-400/50 to-transparent" />
                <div className="absolute left-1/2 top-1/2 h-[420px] w-[min(90vw,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/[0.07] blur-[120px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6">
                <h2 id="cta-title" className="text-balance text-4xl font-light leading-[1.08] tracking-tight text-white sm:text-5xl md:text-7xl" style={DISPLAY}>
                    ¿Tienes una idea o un sistema que mejorar?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
                    Cuéntanos qué necesitas. Te respondemos con una propuesta clara y los siguientes pasos.
                </p>

                <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
                    <Link
                        href="/Contact"
                        className="group inline-flex items-center justify-center gap-3 bg-lime-400 px-8 py-4 text-sm font-semibold text-[#0d1117] transition-colors hover:bg-lime-300"
                    >
                        Cotiza tu proyecto
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </Link>
                    <a
                        href="mailto:soporte@jacana-dev.com"
                        className="inline-flex items-center justify-center gap-3 border border-slate-700 px-8 py-4 text-sm font-medium text-white transition-colors hover:border-lime-400/60 hover:text-lime-300"
                    >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        soporte@jacana-dev.com
                    </a>
                </div>
            </div>
        </section>
    );
}
