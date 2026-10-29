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
        href: 'https://www.facebook.com/profile.php?id=61594578440714',
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
