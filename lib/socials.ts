// Redes sociales oficiales. Única fuente: Contacto y Footer leen de aquí.
export type SocialKey = 'facebook' | 'instagram' | 'tiktok';

export interface Social {
    key: SocialKey;
    label: string;
    handle: string;
    href: string;
}

export const SOCIALS: Social[] = [
    {
        key: 'facebook',
        label: 'Facebook',
        handle: 'Jacana Developers',
        // TODO: reemplazar por la URL directa de la página (facebook.com/<usuario>) cuando se tenga.
        href: 'https://www.facebook.com/search/pages?q=Jacana%20Developers',
    },
    {
        key: 'instagram',
        label: 'Instagram',
        handle: '@daxcloud.shop',
        href: 'https://www.instagram.com/daxcloud.shop/',
    },
    {
        key: 'tiktok',
        label: 'TikTok',
        handle: '@jacanadev',
        href: 'https://www.tiktok.com/@jacanadev',
    },
];
