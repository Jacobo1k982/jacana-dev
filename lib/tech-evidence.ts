// Evidencia real de uso de cada tecnología: se calcula desde data/projects.json.
import projectsData from '@/data/projects.json';

export interface TechEvidence {
    count: number;
    titles: string[];
}

// Tecnologías implícitas: un proyecto con NestJS corre sobre Node.js y se escribe en TypeScript.
const IMPLIED_BY: Record<string, string[]> = {
    'Node.js': ['NestJS'],
    TypeScript: ['NestJS'],
};

const shortTitle = (title: string) => title.split(' — ')[0];

export function getTechEvidence(name: string): TechEvidence {
    const wanted = [name, ...(IMPLIED_BY[name] ?? [])].map((n) => n.toLowerCase());
    const matches = projectsData.projects.filter((p) =>
        p.technologies.some((t) => wanted.includes(t.toLowerCase()))
    );
    return { count: matches.length, titles: matches.map((p) => shortTitle(p.title)) };
}
