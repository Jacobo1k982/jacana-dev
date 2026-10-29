import type { Post } from '../types';

export const post: Post = {
    slug: 'guia-software-negocios-costa-rica',
    title: 'Guía para negocios en Costa Rica: qué considerar antes de contratar software',
    excerpt:
        'Facturación electrónica, web o app, qué influye en el costo y qué preguntarle a un proveedor antes de firmar. Una guía práctica sin tecnicismos.',
    category: 'Guías para negocios',
    tags: ['Costa Rica', 'Facturación electrónica', 'Pymes', 'Software a la medida'],
    date: '2026-10-28',
    author: { name: 'Jacobo Gutiérrez', role: 'Founder & Fullstack Developer' },
    contactService: 'Consultoría Técnica',
    blocks: [
        {
            type: 'p',
            text: 'Si tu negocio está pensando en digitalizarse, estas son las preguntas que conviene resolver antes de contratar a alguien. Es una guía general: no sustituye la asesoría de tu contador ni de un abogado.',
        },
        { type: 'h2', text: '1. Empieza por el problema, no por la tecnología' },
        {
            type: 'p',
            text: '"Necesito una app" casi nunca es el problema real. Suele ser: "pierdo tiempo pasando pedidos a mano", "no sé cuánto inventario tengo" o "mis clientes no me encuentran". Describe primero qué duele y cuánto tiempo o dinero te cuesta hoy.',
        },
        { type: 'h2', text: '2. Facturación electrónica' },
        {
            type: 'p',
            text: 'En Costa Rica la facturación electrónica se rige por las reglas del Ministerio de Hacienda. Qué debes emitir, cuándo y con qué formato depende de tu actividad y tu situación tributaria.',
        },
        {
            type: 'callout',
            title: 'Consulta a tu contador',
            text: 'Las obligaciones tributarias cambian y dependen de cada caso. Antes de elegir un sistema, confirma con tu contador qué necesitas emitir y qué requisitos debe cumplir el software.',
        },
        {
            type: 'p',
            text: 'Lo que sí puedes evaluar tú: que el sistema conecte con Hacienda, que guarde los comprobantes, que maneje bien los rechazos y que puedas exportar tu información si algún día cambias de proveedor.',
        },
        { type: 'h2', text: '3. ¿Sitio web, aplicación móvil o sistema de gestión?' },
        {
            type: 'ul',
            items: [
                '**Sitio web**: para que te encuentren, mostrar lo que ofreces y recibir contactos. Es el punto de partida más habitual.',
                '**Tienda en línea**: si quieres vender y cobrar por internet; añade catálogo, inventario y pasarela de pago.',
                '**Sistema de gestión (POS, inventario, facturación)**: si el dolor está en la operación interna.',
                '**App móvil**: solo si tus clientes realmente la necesitarían a diario o requieres funciones del teléfono. Muchas veces un buen sitio web basta.',
            ],
        },
        { type: 'h2', text: '4. Qué hace que un proyecto cueste más o menos' },
        {
            type: 'p',
            text: 'No damos precios genéricos porque no existen: dos proyectos que parecen iguales pueden diferir mucho. Estos factores pesan más:',
        },
        {
            type: 'ul',
            items: [
                'Cantidad de pantallas y funciones.',
                'Integraciones con otros servicios (facturación, pagos, correo, contabilidad).',
                'Si necesitas usuarios con distintos permisos.',
                'Migración de datos que ya tienes en hojas de cálculo u otros sistemas.',
                'Diseño a la medida frente a una base ya existente.',
                'Mantenimiento y soporte después de publicar.',
            ],
        },
        { type: 'h2', text: '5. Preguntas para hacerle a un proveedor' },
        {
            type: 'ol',
            items: [
                '¿Puedo ver proyectos reales que hayan hecho y hablar con alguien que los use?',
                '¿Quién es dueño del código y de los datos al terminar?',
                '¿Qué incluye el soporte y cuánto cuesta después del lanzamiento?',
                '¿Dónde se aloja el sistema y quién paga ese servicio?',
                '¿Cómo se hacen y se restauran los respaldos?',
                '¿Cómo entregan avances: por etapas o todo al final?',
                '¿Qué pasa si quiero cambiar de proveedor en el futuro?',
            ],
        },
        { type: 'h2', text: '6. Empieza pequeño' },
        {
            type: 'p',
            text: 'Una primera versión que resuelva el problema principal y se pueda usar pronto vale más que un sistema enorme que tarda un año. Mide qué se usa y amplía desde ahí.',
        },
        {
            type: 'p',
            text: 'Si quieres comentar tu caso, podemos ayudarte a definir qué necesitas realmente, aunque al final decidas con otro proveedor. [Escríbenos](/Contact).',
        },
    ],
};
