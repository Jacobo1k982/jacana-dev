import { Facebook, Instagram } from 'lucide-react';
import type { SocialKey } from '@/lib/socials';

// lucide-react no incluye el logo de TikTok: se dibuja aquí.
function TikTokIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
            <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1-2.59-2.59 2.59 2.59 0 0 1 2.59-2.59c.27 0 .53.04.77.12V9.7a5.7 5.7 0 0 0-.77-.05A5.69 5.69 0 0 0 4.17 15.3a5.69 5.69 0 0 0 5.69 5.69 5.69 5.69 0 0 0 5.69-5.69V9.01a7.35 7.35 0 0 0 4.28 1.37V7.3a4.28 4.28 0 0 1-3.23-1.48z" />
        </svg>
    );
}

export default function SocialIcon({ name, className }: { name: SocialKey; className?: string }) {
    if (name === 'facebook') return <Facebook className={className} aria-hidden="true" />;
    if (name === 'instagram') return <Instagram className={className} aria-hidden="true" />;
    return <TikTokIcon className={className} />;
}
