// Etapas del proyecto: la actual resaltada, las anteriores completadas.
import { Check } from 'lucide-react'
import { PHASES, PHASE_LABELS, PHASE_HINTS, type Phase } from '@/lib/portal-shared'

export default function PhaseStepper({ phase }: { phase: Phase }) {
    const current = PHASES.indexOf(phase)
    return (
        <div>
            <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6" aria-label="Etapas del proyecto">
                {PHASES.map((p, i) => {
                    const done = i < current
                    const active = i === current
                    return (
                        <li
                            key={p}
                            aria-current={active ? 'step' : undefined}
                            className={`flex items-center gap-3 border px-3 py-3 text-sm ${
                                active ? 'border-lime-400/60 bg-lime-400/[0.07] text-white'
                                : done ? 'border-slate-700/70 text-slate-300'
                                : 'border-slate-800/70 text-slate-500'
                            }`}
                        >
                            <span
                                aria-hidden="true"
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] ${
                                    active ? 'border-lime-400 bg-lime-400 text-[#0d1117]'
                                    : done ? 'border-lime-400/50 text-lime-300'
                                    : 'border-slate-700'
                                }`}
                            >
                                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                            </span>
                            <span>
                                {PHASE_LABELS[p]}
                                {active && <span className="sr-only"> (etapa actual)</span>}
                                {done && <span className="sr-only"> (completada)</span>}
                            </span>
                        </li>
                    )
                })}
            </ol>
            <p className="mt-3 text-sm text-slate-400">{PHASE_HINTS[phase]}</p>
        </div>
    )
}
