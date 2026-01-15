// components/Navbar/menuTypes.ts

export interface MenuSubItem {
    label: string;
    href: string;
    image?: string;
    description?: string;
}

export interface MenuItem {
    label: string;
    href?: string;
    subItems?: MenuSubItem[];
}
