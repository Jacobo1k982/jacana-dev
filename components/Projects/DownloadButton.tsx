'use client';

import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import { MIN_PUBLIC_COUNT } from '@/lib/downloads';

interface DownloadButtonProps {
    slug: string;
    label: string;
    platform: string;
    appName: string;
}

// Botón de descarga: pasa por /api/download/<slug> (que cuenta y redirige).
// El contador público solo se muestra cuando ya es creíble (MIN_PUBLIC_COUNT).
export default function DownloadButton({ slug, label, platform, appName }: DownloadButtonProps) {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetch('/api/downloads')
            .then((r) => (r.ok ? r.json() : {}))
            .then((data: Record<string, number>) => {
                if (!cancelled && typeof data?.[slug] === 'number') setCount(data[slug]);
            })
            .catch(() => { });
        return () => { cancelled = true; };
    }, [slug]);

    const showCount = count !== null && count >= MIN_PUBLIC_COUNT;

    return (
        <div className="w-full">
            <a
                href={`/api/download/${slug}`}
                rel="nofollow"
                download
                className="flex w-full items-center justify-between gap-3 border border-lime-400/40 bg-lime-400/10 px-4 py-2.5 text-xs font-medium uppercase tracking-[0.1em] text-lime-300 transition-colors hover:border-lime-400/70 hover:bg-lime-400/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-lime-400"
                aria-label={`${label} de ${appName} para ${platform}`}
            >
                <span>{label}</span>
                <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            </a>
            <p className="mt-1.5 text-[11px] text-slate-500">
                {platform}
                {showCount && <> · {count!.toLocaleString('es-CR')} descargas</>}
            </p>
        </div>
    );
}
