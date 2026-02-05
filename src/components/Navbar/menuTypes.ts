// components/Navbar/menuTypes.ts

/**
 * Representa un elemento individual dentro de un menú desplegable.
 */
export interface MenuSubItem {
    /** Identificador único (útil para claves en React) */
    id?: string;

    /** Etiqueta visible del enlace */
    label: string;

    /** URL de destino */
    href: string;

    /** Texto de apoyo corto (ej: descripción del servicio) */
    description?: string;

    /** Ruta de la imagen o icono (ej: /img/example.png) */
    image?: string;

    /** Si es true, el enlace se abrirá en una nueva pestaña */
    isExternal?: boolean;

    /** Etiqueta pequeña de estado (ej: "New", "Beta") */
    badge?: string;
}

/**
 * Representa un elemento principal de la barra de navegación.
 * 
 * Nota: Se utiliza una unión implícita donde un item tiene `href` o `subItems`,
 * pero se mantiene como interfaz única para flexibilidad si se requiere lógica mixta.
 */
export interface MenuItem {
    /** Identificador único (útil para claves en React) */
    id?: string;

    /** Etiqueta visible en el menú principal */
    label: string;

    /** URL directa (usado si NO hay subItems) */
    href?: string;

    /** Lista de elementos desplegables (usado si NO hay href directo) */
    subItems?: MenuSubItem[];

    /** Si es true, el enlace principal se abre en nueva pestaña */
    isExternal?: boolean;
}