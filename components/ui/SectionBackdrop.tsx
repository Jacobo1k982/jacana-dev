// components/ui/SectionBackdrop.tsx
// Fondo decorativo reutilizable para secciones. Solo CSS (sin JS), sin interacción,
// y la animación respeta prefers-reduced-motion. Se coloca como primer hijo de una
// <section className="relative overflow-hidden"> para que el contenido quede encima.

type Variant = 'grid' | 'dots' | 'beam' | 'spotlight';

interface Props {
    variant?: Variant;
    /** Color de acento (hex). Por defecto lime de la marca. */
    accent?: string;
    /** Color del segundo foco de luz (hex). Por defecto índigo. */
    secondary?: string;
}

const mix = (color: string, pct: number) =>
    `color-mix(in srgb, ${color} ${pct}%, transparent)`;

export default function SectionBackdrop({
    variant = 'grid',
    accent = '#a3e635',
    secondary = '#4f46e5',
}: Props) {
    const fadeMask =
        'radial-gradient(ellipse 75% 65% at 50% 28%, #000 25%, transparent 75%)';

    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {/* Degradado base: aclara apenas la parte alta para separar secciones */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(180deg, ${mix(secondary, 9)} 0%, transparent 38%, transparent 70%, ${mix('#000000', 35)} 100%)`,
                }}
            />

            {variant === 'grid' && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)',
                        backgroundSize: '56px 56px',
                        maskImage: fadeMask,
                        WebkitMaskImage: fadeMask,
                    }}
                />
            )}

            {variant === 'dots' && (
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            'radial-gradient(rgba(226,232,240,0.14) 1px, transparent 1.2px)',
                        backgroundSize: '26px 26px',
                        maskImage: fadeMask,
                        WebkitMaskImage: fadeMask,
                    }}
                />
            )}

            {variant === 'beam' && (
                <div
                    className="absolute -inset-x-1/4 top-0 h-full opacity-90"
                    style={{
                        background: `linear-gradient(115deg, transparent 32%, ${mix(accent, 10)} 46%, ${mix(secondary, 12)} 54%, transparent 68%)`,
                        filter: 'blur(40px)',
                    }}
                />
            )}

            {variant === 'spotlight' && (
                <div
                    className="absolute inset-0"
                    style={{
                        background: `radial-gradient(ellipse 60% 45% at 50% 0%, ${mix(accent, 14)} 0%, transparent 70%)`,
                    }}
                />
            )}

            {/* Focos de luz suaves con respiración lenta */}
            <div
                className="absolute -top-24 left-[8%] h-[420px] w-[420px] rounded-full blur-[130px] motion-safe:animate-pulse [animation-duration:9s]"
                style={{ background: mix(secondary, 22) }}
            />
            <div
                className="absolute -bottom-24 right-[6%] h-[360px] w-[360px] rounded-full blur-[130px] motion-safe:animate-pulse [animation-duration:11s]"
                style={{ background: mix(accent, 12) }}
            />

            {/* Borde superior luminoso: marca el cambio de sección */}
            <div
                className="absolute inset-x-0 top-0 h-px"
                style={{
                    background: `linear-gradient(90deg, transparent, ${mix(accent, 55)}, transparent)`,
                }}
            />
            <div
                className="absolute left-1/2 top-0 h-px w-1/3 -translate-x-1/2 blur-[2px]"
                style={{ background: mix(accent, 70) }}
            />
        </div>
    );
}
