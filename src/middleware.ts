import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Solo protegemos la ruta del admin
    if (request.nextUrl.pathname.startsWith('/jacana-admin')) {
        const authHeader = request.headers.get('authorization');

        if (!authHeader) {
            return new NextResponse('Autenticación requerida', {
                status: 401,
                headers: {
                    'WWW-Authenticate': 'Basic realm="Acceso Privado Jacana"',
                },
            });
        }

        const auth = authHeader.split(' ')[1];
        const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');

        // Validamos contra la variable de entorno
        if (user === 'admin' && pwd === process.env.ADMIN_PASSWORD) {
            return NextResponse.next();
        }

        return new NextResponse('Credenciales incorrectas', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Acceso Privado Jacana"',
            },
        });
    }

    return NextResponse.next();
}

// Configuración para que el middleware solo actúe en el admin
export const config = {
    matcher: [
	'/jacana-admin', 
	'/jacana-admin/:path*',
 ],
};
