import type { Post } from '../types';

export const post: Post = {
    slug: 'daxcloud-saas-multi-negocio',
    title: 'DaxCloud: cómo diseñamos un SaaS multi-negocio con facturación electrónica',
    excerpt:
        'Un vistazo honesto a las decisiones técnicas detrás de DaxCloud, nuestro producto propio: POS, inventario, facturación electrónica y pagos en línea en una sola plataforma.',
    category: 'Casos reales',
    tags: ['DaxCloud', 'SaaS', 'Multi-tenant', 'NestJS', 'Next.js', 'Facturación electrónica'],
    date: '2026-10-28',
    author: { name: 'Jacobo Gutiérrez', role: 'Founder & Fullstack Developer' },
    contactService: 'Desarrollo Web',
    blocks: [
        {
            type: 'p',
            text: 'DaxCloud es un producto propio de Jacana Dev: una plataforma en la nube para administrar un negocio completo. En este artículo contamos qué resuelve y, sobre todo, qué decisiones técnicas tomamos y por qué. No hay cifras infladas: solo lo que realmente construimos.',
        },
        { type: 'h2', text: 'El problema que queríamos resolver' },
        {
            type: 'p',
            text: 'Muchos negocios pequeños y medianos usan una herramienta para vender, otra para el inventario, otra para facturar y una hoja de cálculo para la contabilidad. Los datos quedan separados y nadie tiene la foto completa. DaxCloud junta esas piezas en un solo sistema.',
        },
        { type: 'h2', text: 'Qué incluye' },
        {
            type: 'ul',
            items: [
                '**Punto de venta (POS)** con venta en efectivo, tarjeta, mixta y a crédito (con límite de crédito, saldo y fecha de vencimiento).',
                '**Facturación electrónica** integrada con Hacienda.',
                '**Inventario y contabilidad** conectados a las ventas.',
                '**Catálogo en línea** con pagos mediante Pagadito, certificado en producción.',
                '**Automatizaciones con n8n**: por ejemplo, un pedido en línea dispara notificaciones por correo.',
            ],
        },
        { type: 'h2', text: 'Decisión 1: multi-tenant desde el día uno' },
        {
            type: 'p',
            text: 'DaxCloud atiende a varios negocios dentro de la misma plataforma, cada uno con sus datos aislados. Diseñarlo así desde el inicio es mucho más barato que intentar añadirlo después: el aislamiento por negocio queda en el modelo de datos y no en parches posteriores.',
        },
        {
            type: 'callout',
            title: 'Lección',
            text: 'La multi-tenencia es una decisión de arquitectura, no una función. Si se deja para después, casi siempre implica reescribir.',
        },
        { type: 'h2', text: 'Decisión 2: un monorepo con API y frontend separados' },
        {
            type: 'p',
            text: 'Usamos un monorepo con Turborepo: una API en NestJS y un frontend en Next.js, con PostgreSQL y Prisma como capa de datos. Compartir tipos y herramientas entre ambas partes reduce errores de integración, y separar la API deja la puerta abierta a otros clientes (por ejemplo, una app móvil) sin rehacer la lógica de negocio.',
        },
        { type: 'h2', text: 'Decisión 3: despliegue reproducible' },
        {
            type: 'p',
            text: 'Todo corre en contenedores Docker detrás de Nginx. Las imágenes se construyen en CI con GitHub Actions y el servidor solo las descarga desde el registro, de modo que lo que se probó es exactamente lo que se despliega. Un servidor no debería compilar nada.',
        },
        { type: 'h2', text: 'Decisión 4: automatizar lo repetitivo sin código a la medida' },
        {
            type: 'p',
            text: 'Para flujos como avisar por correo cuando entra un pedido, usamos n8n. Así los cambios de reglas (a quién se notifica, con qué texto) no requieren una nueva versión del sistema.',
        },
        { type: 'h2', text: 'Lo que aprendimos' },
        {
            type: 'ul',
            items: [
                'El crédito y los pagos mixtos complican el POS más de lo que parece; conviene modelarlos desde el inicio.',
                'La facturación electrónica es un requisito legal: la parte difícil no es generar el documento, sino manejar bien los estados y los rechazos.',
                'Un producto propio es el mejor laboratorio: probamos aquí lo que luego ofrecemos a clientes.',
            ],
        },
        {
            type: 'p',
            text: 'Puedes ver el producto en [daxcloud.shop](https://daxcloud.shop). Si tu negocio necesita algo similar, o una pieza de esto, conversemos.',
        },
    ],
};
