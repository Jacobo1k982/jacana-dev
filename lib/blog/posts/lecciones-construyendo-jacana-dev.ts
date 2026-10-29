import type { Post } from '../types';

export const post: Post = {
    slug: 'lecciones-construyendo-jacana-dev',
    title: 'Lecciones de construir jacana-dev.com: lo que nos costó tiempo',
    excerpt:
        'Una sola fuente de datos, un build de Docker que falló por una fuente, correos que no llegaban y una pantalla negra en el login. Lo que aprendimos construyendo nuestro propio sitio.',
    category: 'Ingeniería',
    tags: ['Next.js', 'Docker', 'Resend', 'Buenas prácticas', 'Lecciones'],
    date: '2026-10-28',
    author: { name: 'Jacobo Gutiérrez', role: 'Founder & Fullstack Developer' },
    contactService: 'Consultoría Técnica',
    blocks: [
        {
            type: 'p',
            text: 'Un sitio de una empresa de software debería ser, él mismo, una buena muestra de ingeniería. Estas son las lecciones concretas que nos dejó construir y mejorar jacana-dev.com, incluidos los tropiezos.',
        },
        { type: 'h2', text: '1. Una sola fuente de verdad para las cifras' },
        {
            type: 'p',
            text: 'Las cifras del sitio (cantidad de proyectos, productos propios, tecnologías usadas) no están escritas a mano en cada página: se calculan desde un único archivo de datos de proyectos. Así una página nunca contradice a otra y no podemos presumir de algo que el portafolio no respalda.',
        },
        {
            type: 'code',
            lang: 'ts',
            code: "export const SITE_STATS = {\n    projects: projects.length,\n    ownProducts: projects.filter((p) => p.type === 'Producto propio').length,\n} as const;",
        },
        {
            type: 'callout',
            title: 'Credibilidad',
            text: 'No inventamos testimonios ni métricas. Si un dato no se puede verificar, no se publica.',
        },
        { type: 'h2', text: '2. El build que funcionaba en local y fallaba en Docker' },
        {
            type: 'p',
            text: 'El despliegue falló con un error sobre `next/font/google`. El compilador por defecto (Turbopack) tenía problemas con esa fuente dentro del contenedor. La solución fue construir con el modo webpack:',
        },
        { type: 'code', lang: 'json', code: '"build": "next build --webpack"' },
        {
            type: 'p',
            text: 'Moraleja: probar el build de producción en el mismo entorno donde se va a ejecutar, no solo con `npm run dev`.',
        },
        { type: 'h2', text: '3. Correos que "se enviaban" pero no llegaban' },
        {
            type: 'p',
            text: 'La recuperación de contraseña decía enviar el correo, pero nunca llegaba. Encontramos tres causas encadenadas:',
        },
        {
            type: 'ul',
            items: [
                'El remitente de pruebas de Resend solo entrega a la cuenta dueña; para escribir a cualquiera hay que usar un dominio verificado.',
                'El SDK de Resend **no lanza excepción** ante un error: devuelve `{ error }`. Si no lo revisas, el fallo es silencioso.',
                'La variable de entorno vivía en un archivo que solo existe en el servidor, y no estaba configurada.',
            ],
        },
        {
            type: 'code',
            lang: 'ts',
            code: "const { error } = await resend.emails.send({ from, to, subject, html });\nif (error) {\n    console.error('Resend:', error);\n    throw new Error('No se pudo enviar el correo');\n}",
        },
        { type: 'h2', text: '4. La pantalla negra en /login' },
        {
            type: 'p',
            text: 'Una página renderizaba un diálogo sin pasarle la propiedad que lo abre, así que quedaba oculto y el usuario veía una pantalla vacía. Lo reescribimos pasando explícitamente el estado y los manejadores. Un bug pequeño, pero que arruina la primera impresión.',
        },
        { type: 'h2', text: '5. No revelar de más en la recuperación de contraseña' },
        {
            type: 'p',
            text: 'Decidir si avisar que un correo no existe es un equilibrio entre usabilidad y privacidad: avisar ayuda a quien se equivocó al escribir, pero permite averiguar qué correos están registrados. Por eso añadimos límite de intentos y tokens que expiran en una hora y se invalidan al pedir uno nuevo.',
        },
        { type: 'h2', text: 'Qué nos llevamos' },
        {
            type: 'ul',
            items: [
                'Datos derivados de una sola fuente.',
                'Probar el build de producción donde se desplegará.',
                'Revisar siempre los errores que un SDK devuelve en lugar de lanzar.',
                'Probar el flujo completo de punta a punta, no solo la pantalla.',
            ],
        },
        {
            type: 'p',
            text: 'Si tu equipo tiene un sistema que "funciona en local" pero da problemas en producción, [escríbenos](/Contact): son justo el tipo de problemas que resolvemos.',
        },
    ],
};
