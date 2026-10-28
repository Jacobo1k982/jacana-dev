// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginDialog, RegisterDialog } from '@/components/auth';

export default function LoginPage() {
    const router = useRouter();
    const [showLogin, setShowLogin] = useState(true);
    const [showRegister, setShowRegister] = useState(false);

    // Esta ruta no tiene más contenido: cerrar cualquier diálogo lleva al inicio
    const goHome = () => router.push('/');

    return (
        <main className="min-h-screen bg-[#0d1117]">
            <LoginDialog
                isOpen={showLogin}
                onClose={goHome}
                onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
            />
            <RegisterDialog
                isOpen={showRegister}
                onClose={goHome}
                onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
            />
        </main>
    );
}
