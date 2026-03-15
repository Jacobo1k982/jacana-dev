'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Linkedin, Github, Twitter, Dribbble, MapPin, Briefcase, Facebook } from 'lucide-react';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    specialty: string;
    bio: string;
    avatar: string;
    socials: {
        linkedin?: string;
        github?: string;
        twitter?: string;
        dribbble?: string;
        facebook?: string;
    };
    skills: string[];
    color: string;
}

interface TeamCardProps {
    member: TeamMember;
    index: number;
}

const colorVariants = {
    cyan: {
        border: 'border-cyan-500/30',
        borderHover: 'hover:border-cyan-400/60',
        glow: 'shadow-cyan-500/30',
        text: 'text-cyan-400',
        bg: 'bg-cyan-500/10',
        bgSubtle: 'bg-cyan-500/5',
        gradient: 'from-cyan-500/30 to-cyan-600/10',
    },
    blue: {
        border: 'border-blue-500/30',
        borderHover: 'hover:border-blue-400/60',
        glow: 'shadow-blue-500/30',
        text: 'text-blue-400',
        bg: 'bg-blue-500/10',
        bgSubtle: 'bg-blue-500/5',
        gradient: 'from-blue-500/30 to-blue-600/10',
    },
    purple: {
        border: 'border-purple-500/30',
        borderHover: 'hover:border-purple-400/60',
        glow: 'shadow-purple-500/30',
        text: 'text-purple-400',
        bg: 'bg-purple-500/10',
        bgSubtle: 'bg-purple-500/5',
        gradient: 'from-purple-500/30 to-purple-600/10',
    },
    green: {
        border: 'border-emerald-500/30',
        borderHover: 'hover:border-emerald-400/60',
        glow: 'shadow-emerald-500/30',
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        bgSubtle: 'bg-emerald-500/5',
        gradient: 'from-emerald-500/30 to-emerald-600/10',
    },
    pink: {
        border: 'border-pink-500/30',
        borderHover: 'hover:border-pink-400/60',
        glow: 'shadow-pink-500/30',
        text: 'text-pink-400',
        bg: 'bg-pink-500/10',
        bgSubtle: 'bg-pink-500/5',
        gradient: 'from-pink-500/30 to-pink-600/10',
    },
    orange: {
        border: 'border-orange-500/30',
        borderHover: 'hover:border-orange-400/60',
        glow: 'shadow-orange-500/30',
        text: 'text-orange-400',
        bg: 'bg-orange-500/10',
        bgSubtle: 'bg-orange-500/5',
        gradient: 'from-orange-500/30 to-orange-600/10',
    },
};

const socialIcons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    dribbble: Dribbble,
    facebook: Facebook,
};

export default function TeamCard({ member, index }: TeamCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const colors = colorVariants[member.color as keyof typeof colorVariants] || colorVariants.cyan;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className={`relative group rounded-2xl border ${colors.border} ${colors.borderHover} bg-[#0a0a1a]/80 backdrop-blur-sm transition-all duration-300 overflow-hidden ${isHovered ? `shadow-xl ${colors.glow}` : ''}`}
        >
            {/* Gradient overlay */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            <div className="relative p-6">
                {/* Avatar & Header */}
                <div className="flex items-start gap-4 mb-4">
                    {/* Avatar */}
                    <div className="relative">
                        <div className={`w-16 h-16 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                            <span className={`text-2xl font-bold ${colors.text}`}>
                                {member.name.split(' ').map(n => n[0]).join('')}
                            </span>
                        </div>
                        {/* Online indicator */}
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${colors.bg} border-2 border-[#0a0a1a] flex items-center justify-center`}>
                            <div className={`w-2 h-2 rounded-full ${colors.text.replace('text-', 'bg-')} animate-pulse`} />
                        </div>
                    </div>

                    {/* Name & Role */}
                    <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white truncate group-hover:text-white transition-colors">
                            {member.name}
                        </h3>
                        <div className="flex items-center gap-1.5">
                            <Briefcase className={`w-3 h-3 ${colors.text}`} />
                            <span className={`text-sm ${colors.text} font-medium truncate`}>
                                {member.role}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5 truncate">
                            {member.specialty}
                        </p>
                    </div>
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {member.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {member.skills.map((skill, i) => (
                        <span
                            key={i}
                            className={`px-2 py-0.5 text-[10px] ${colors.bgSubtle} ${colors.text} rounded-full border ${colors.border}`}
                        >
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Social Links */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                    <div className="flex items-center gap-2">
                        {Object.entries(member.socials).map(([platform, url]) => {
                            const Icon = socialIcons[platform as keyof typeof socialIcons];
                            if (!Icon) return null;
                            return (
                                <motion.a
                                    key={platform}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-8 h-8 rounded-lg ${colors.bgSubtle} border ${colors.border} flex items-center justify-center hover:${colors.bg} transition-all`}
                                >
                                    <Icon className={`w-4 h-4 ${colors.text}`} />
                                </motion.a>
                            );
                        })}
                    </div>

                    {/* View Profile */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-3 py-1.5 rounded-lg ${colors.bg} border ${colors.border} text-xs font-medium ${colors.text} hover:shadow-lg transition-all`}
                    >
                        Ver Perfil
                    </motion.button>
                </div>
            </div>

            {/* Decorative corner accent */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${colors.gradient} blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-300`} />
        </motion.div>
    );
}
