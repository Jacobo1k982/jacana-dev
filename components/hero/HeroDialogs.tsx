'use client';

import { LoginDialog, RegisterDialog } from '@/components/auth';

interface HeroDialogsProps {
    showLogin: boolean;
    showRegister: boolean;
    setShowLogin: (v: boolean) => void;
    setShowRegister: (v: boolean) => void;
}

export function HeroDialogs({ showLogin, showRegister, setShowLogin, setShowRegister }: HeroDialogsProps) {
    return (
        <>
            <LoginDialog
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
                onSwitchToRegister={() => { setShowLogin(false); setShowRegister(true); }}
            />
            <RegisterDialog
                isOpen={showRegister}
                onClose={() => setShowRegister(false)}
                onSwitchToLogin={() => { setShowRegister(false); setShowLogin(true); }}
            />
        </>
    );
}