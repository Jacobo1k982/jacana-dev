'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, ChevronDown, Crown, Shield } from 'lucide-react';
import { useAuthStore, useUser } from '@/store/auth-store';

// ============================================
// TYPES
// ============================================

interface UserMenuProps {
    onLogout: () => void;
}

// ============================================
// COMPONENT
// ============================================

export function UserMenu({ onLogout }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const user = useUser();

    if (!user) return null;

    // Get user initials for avatar
    const initials = user.name
        ? user.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
        : user.email.slice(0, 2).toUpperCase();

    // Role badge
    const roleConfig = {
        ADMIN: { icon: Crown, color: 'text-yellow-400', label: 'Admin' },
        MODERATOR: { icon: Shield, color: 'text-purple-400', label: 'Mod' },
        USER: { icon: User, color: 'text-cyan-400', label: null },
    };

    const role = roleConfig[user.role] || roleConfig.USER;

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full hover:bg-cyan-500/20 transition-all"
            >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                    {user.avatar ? (
                        <img src={user.avatar} alt={user.name || 'Avatar'} className="w-full h-full object-cover" />
                    ) : (
                        initials
                    )}
                </div>
                <span className="text-cyan-400 font-medium hidden sm:block max-w-[120px] truncate">
                    {user.name || user.username || user.email.split('@')[0]}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-cyan-400/60 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15 }}
                            className="absolute right-0 top-full mt-2 w-56 bg-[#0a0a1a] border border-cyan-500/30 rounded-xl shadow-xl shadow-cyan-500/10 overflow-hidden z-50"
                        >
                            <div className="p-3 border-b border-cyan-500/20">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold overflow-hidden">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name || 'Avatar'} className="w-full h-full object-cover" />
                                        ) : (
                                            initials
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium truncate">{user.name || 'Usuario'}</p>
                                        <p className="text-cyan-400/60 text-sm truncate">{user.email}</p>
                                    </div>
                                </div>
                                {role.label && (
                                    <div className="flex items-center gap-1 mt-2">
                                        <role.icon className={`w-3 h-3 ${role.color}`} />
                                        <span className={`text-xs ${role.color}`}>{role.label}</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-2">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-cyan-400/80 hover:bg-cyan-500/10 rounded-lg transition-colors"
                                >
                                    <User className="w-4 h-4" />
                                    <span>Mi Perfil</span>
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-cyan-400/80 hover:bg-cyan-500/10 rounded-lg transition-colors"
                                >
                                    <Settings className="w-4 h-4" />
                                    <span>Configuración</span>
                                </button>
                            </div>

                            <div className="p-2 border-t border-cyan-500/20">
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        onLogout();
                                    }}
                                    className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                >
                                    <LogOut className="w-4 h-4" />
                                    <span>Cerrar Sesión</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
