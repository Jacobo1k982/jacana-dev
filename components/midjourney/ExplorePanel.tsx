'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Globe, Code2, Smartphone, Cloud, Cpu, Database } from 'lucide-react';

const categories = [
    { id: 'all', label: 'Todos' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'cloud', label: 'Cloud' },
];

const projects = [
    {
        id: 1,
        title: 'E-Commerce Platform',
        description: 'Plataforma de comercio electrónico con pagos integrados.',
        category: 'web',
        image: '/gallery/eye.png',
        tech: ['Next.js', 'TypeScript', 'Prisma', 'Stripe'],
        github: '#',
        demo: '#',
    },
    {
        id: 2,
        title: 'AI Image Generator',
        description: 'Aplicación de generación de imágenes con IA.',
        category: 'ai',
        image: '/gallery/pen.png',
        tech: ['Python', 'TensorFlow', 'FastAPI', 'React'],
        github: '#',
        demo: '#',
    },
    {
        id: 3,
        title: 'Social Media App',
        description: 'Red social con chat en tiempo real.',
        category: 'mobile',
        image: '/gallery/people.png',
        tech: ['React Native', 'Node.js', 'Socket.io'],
        github: '#',
        demo: '#',
    },
    {
        id: 4,
        title: 'Cloud Dashboard',
        description: 'Panel de administración para infraestructura cloud.',
        category: 'cloud',
        image: '/gallery/face.png',
        tech: ['Vue.js', 'AWS', 'Docker', 'Kubernetes'],
        github: '#',
        demo: '#',
    },
    {
        id: 5,
        title: 'Analytics Platform',
        description: 'Plataforma de analíticas con datos en tiempo real.',
        category: 'web',
        image: '/gallery/img5.png',
        tech: ['React', 'D3.js', 'PostgreSQL', 'Redis'],
        github: '#',
        demo: '#',
    },
    {
        id: 6,
        title: 'ML Model Trainer',
        description: 'Interfaz para entrenamiento de modelos ML.',
        category: 'ai',
        image: '/gallery/img3.png',
        tech: ['Python', 'PyTorch', 'MLflow', 'Streamlit'],
        github: '#',
        demo: '#',
    },
    {
        id: 7,
        title: 'Fitness Tracker',
        description: 'App de seguimiento de ejercicios personalizados.',
        category: 'mobile',
        image: '/gallery/img1.png',
        tech: ['Flutter', 'Firebase', 'HealthKit'],
        github: '#',
        demo: '#',
    },
    {
        id: 8,
        title: 'DevOps Pipeline',
        description: 'Sistema de CI/CD automatizado con monitoreo.',
        category: 'cloud',
        image: '/gallery/img2.png',
        tech: ['GitHub Actions', 'Terraform', 'Prometheus'],
        github: '#',
        demo: '#',
    },
];

const getCategoryIcon = (categoryId: string) => {
    switch (categoryId) {
        case 'web':
            return <Globe className="w-3.5 h-3.5 md:w-4 md:h-4" />;
        case 'mobile':
            return <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4" />;
        case 'ai':
            return <Cpu className="w-3.5 h-3.5 md:w-4 md:h-4" />;
        case 'cloud':
            return <Cloud className="w-3.5 h-3.5 md:w-4 md:h-4" />;
        default:
            return <Code2 className="w-3.5 h-3.5 md:w-4 md:h-4" />;
    }
};

interface ExplorePanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ExplorePanel({ isOpen, onClose }: ExplorePanelProps) {
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
                    />

                    {/* Panel - Full screen on mobile */}
                    <motion.div
                        initial={{ opacity: 0, y: '100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed inset-0 md:inset-8 lg:inset-12 bg-[#0a0a1a] md:rounded-2xl border-0 md:border border-cyan-500/20 z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header - Compact on mobile */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-cyan-500/10 shrink-0">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
                                    <Code2 className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <h2 className="text-base md:text-xl font-bold text-white">Explorar Proyectos</h2>
                                    <p className="hidden md:block text-sm text-gray-400">Descubre nuestro trabajo</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-cyan-500/50 transition-colors"
                            >
                                <X className="w-4 h-4 md:w-5 md:h-5" />
                            </button>
                        </div>

                        {/* Categories - Scrollable on mobile */}
                        <div className="flex items-center gap-2 p-3 md:p-4 border-b border-cyan-500/10 overflow-x-auto shrink-0 scrollbar-hide">
                            {categories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all whitespace-nowrap shrink-0 ${activeCategory === category.id
                                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                            : 'text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600'
                                        }`}
                                >
                                    {getCategoryIcon(category.id)}
                                    {category.label}
                                </button>
                            ))}
                        </div>

                        {/* Projects Grid - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-3 md:p-6 overscroll-contain">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                                {filteredProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group relative bg-[#0d0d20] rounded-xl border border-cyan-500/10 overflow-hidden hover:border-cyan-500/30 transition-all"
                                    >
                                        {/* Project Image */}
                                        <div className="aspect-video relative overflow-hidden">
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d20] via-transparent to-transparent" />

                                            {/* Category Badge */}
                                            <div className="absolute top-2 left-2 md:top-3 md:left-3 flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 text-[10px] md:text-xs text-gray-300">
                                                {getCategoryIcon(project.category)}
                                                <span className="hidden sm:inline">{categories.find(c => c.id === project.category)?.label}</span>
                                            </div>
                                        </div>

                                        {/* Project Info */}
                                        <div className="p-3 md:p-4">
                                            <h3 className="text-sm md:text-base font-semibold text-white mb-1 md:mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
                                                {project.title}
                                            </h3>
                                            <p className="text-xs md:text-sm text-gray-400 mb-2 md:mb-3 line-clamp-2">
                                                {project.description}
                                            </p>

                                            {/* Tech Stack */}
                                            <div className="flex flex-wrap gap-1 mb-3 md:mb-4">
                                                {project.tech.slice(0, 2).map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                                {project.tech.length > 2 && (
                                                    <span className="px-1.5 md:px-2 py-0.5 text-[10px] md:text-xs rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20">
                                                        +{project.tech.length - 2}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-2">
                                                <a
                                                    href={project.github}
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs md:text-sm font-medium transition-colors"
                                                >
                                                    <Github className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                    <span>Código</span>
                                                </a>
                                                <a
                                                    href={project.demo}
                                                    className="flex-1 flex items-center justify-center gap-1.5 px-2 md:px-3 py-1.5 md:py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 text-xs md:text-sm font-medium border border-cyan-500/20 hover:border-cyan-500/40 transition-colors"
                                                >
                                                    <ExternalLink className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                    <span>Demo</span>
                                                </a>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Footer - Compact on mobile */}
                        <div className="p-3 md:p-4 border-t border-cyan-500/10 flex items-center justify-between shrink-0">
                            <p className="text-[10px] md:text-sm text-gray-500">
                                {filteredProjects.length} proyectos
                            </p>
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="flex items-center gap-1.5 md:gap-2">
                                    <Cpu className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
                                    <Database className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                                    <Cloud className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                                    <Globe className="w-3 h-3 md:w-4 md:h-4 text-emerald-400 hidden sm:block" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}