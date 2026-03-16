'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Settings, LogOut, ChevronDown, Crown, Shield } from 'lucide-react';
import { useUser } from '@/store/auth-store';

interface UserMenuProps {
    onLogout: () => void;
}

export function UserMenu({ onLogout }: UserMenuProps) {
    const [isOpen, setIsOpen] = useState(false);
    const user = useUser();

    if (!user) return null;

    const initials = user.name
        ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : user.email.slice(0, 2).toUpperCase();

    const roleConfig = {
        ADMIN: { icon: Crown, color: 'text-amber-400', borderColor: 'border-amber-400/30', label: 'Admin' },
        MODERATOR: { icon: Shield, color: 'text-indigo-400', borderColor: 'border-indigo-400/30', label: 'Moderador' },
        USER: { icon: User, color: 'text-slate-500', borderColor: 'border-slate-700/60', label: null },
    };

    const role = roleConfig[user.role as keyof typeof roleConfig] ?? roleConfig.USER;
    const RoleIcon = role.icon;
    const displayName = user.name || user.username || user.email.split('@')[0];

    return (
        <div className="relative">

            {/* Trigger */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center gap-2.5 px-3 py-2 border transition-colors ${isOpen
                        ? 'border-amber-400/40 bg-slate-900/60'
                        : 'border-slate-700/60 hover:border-slate-600/80'
                    }`}
            >
                {/* Avatar */}
                <div className="w-6 h-6 flex items-center justify-center border border-slate-700/60 bg-slate-900/60 text-[10px] font-medium text-slate-300 overflow-hidden shrink-0">
                    {user.avatar
                        ? <img src={user.avatar} alt={displayName} className="w-full h-full object-cover" />
                        : initials
                    }
                </div>

                <span className="hidden sm:block text-xs font-medium uppercase tracking-[0.1em] text-slate-400 max-w-[100px] truncate">
                    {displayName}
                </span>

                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-3 h-3 text-slate-600" />
                </motion.span>
            </motion.button>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

                        <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute right-0 top-full mt-1 w-52 bg-[#080810] border border-slate-800/80 shadow-2xl shadow-black/50 z-50"
                        >
                            {/* Top accent */}
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />

                            {/* User info */}
                            <div className="px-5 py-4 border-b border-slate-800/60">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-9 h-9 flex items-center justify-center border border-slate-700/60 bg-slate-900/60 text-sm font-medium text-slate-300 overflow-hidden shrink-0">
                                        {user.avatar
                                            ? <img src={user.avatar} alt={displayName} className="w-full h-full object-cover" />
                                            : initials
                                        }
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-white truncate leading-none mb-1">
                                            {user.name || 'Usuario'}
                                        </p>
                                        <p className="text-[11px] text-slate-600 truncate">{user.email}</p>
                                    </div>
                                </div>

                                {/* Role badge */}
                                {role.label && (
                                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 border ${role.borderColor}`}>
                                        <RoleIcon className={`w-2.5 h-2.5 ${role.color}`} />
                                        <span className={`text-[9px] uppercase tracking-[0.2em] ${role.color}`}>
                                            {role.label}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="py-1">
                                {[
                                    { icon: User, label: 'Mi perfil' },
                                    { icon: Settings, label: 'Configuración' },
                                ].map(({ icon: Icon, label }) => (
                                    <button
                                        key={label}
                                        onClick={() => setIsOpen(false)}
                                        className="group w-full flex items-center gap-3 px-5 py-2.5 border-b border-slate-800/40 last:border-b-0 hover:bg-slate-900/40 transition-colors"
                                    >
                                        <Icon className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors" />
                                        <span className="text-xs uppercase tracking-[0.1em] text-slate-500 group-hover:text-slate-300 transition-colors">
                                            {label}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* Logout */}
                            <div className="border-t border-slate-800/60">
                                <button
                                    onClick={() => { setIsOpen(false); onLogout(); }}
                                    className="group w-full flex items-center gap-3 px-5 py-3 hover:bg-red-500/5 transition-colors"
                                >
                                    <LogOut className="w-3.5 h-3.5 text-slate-700 group-hover:text-red-400/80 transition-colors" />
                                    <span className="text-xs uppercase tracking-[0.1em] text-slate-600 group-hover:text-red-400/80 transition-colors">
                                        Cerrar sesión
                                    </span>
                                </button>
                            </div>

                            {/* Bottom accent */}
                            <div className="h-px bg-gradient-to-r from-transparent via-amber-400/15 to-transparent" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}