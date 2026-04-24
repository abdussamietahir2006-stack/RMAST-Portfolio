'use client';

import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';

type Project = {
  title?: string;
  desc?: string;
  category?: string;
  image?: string;
  stack?: string[];
  link?: string;
  year?: string;
};

type Props = {
  filter: string;
};

const projects: Project[] = [
  {
    title: 'Portfolio Website',
    desc: 'Modern full-stack portfolio with 3D interactions, custom CMS, and sub-second load times.',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    stack: ['Next.js', 'TypeScript', 'MongoDB'],
    year: '2024',
    link: '#',
  },
  {
    title: '3D Product Configurator',
    desc: 'Real-time WebGL product viewer with dynamic material switching and AR export.',
    category: '3D',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    stack: ['Three.js', 'WebGL', 'GSAP'],
    year: '2024',
    link: '#',
  },
  {
    title: 'AI Content Engine',
    desc: 'Automated content pipeline powered by GPT-4 that saves 20+ hrs/week for marketing teams.',
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
    stack: ['OpenAI', 'LangChain', 'n8n'],
    year: '2023',
    link: '#',
  },
  {
    title: 'E-Commerce Platform',
    desc: 'Full-stack storefront with real-time inventory, Stripe payments, and admin dashboard.',
    category: 'Web',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
    stack: ['Next.js', 'Stripe', 'MongoDB'],
    year: '2023',
    link: '#',
  },
  {
    title: 'Immersive 3D Landing',
    desc: 'WebGL-powered marketing page with particle systems, shaders, and scroll-driven animations.',
    category: '3D',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    stack: ['Three.js', 'GLSL', 'Framer'],
    year: '2024',
    link: '#',
  },
  {
    title: 'AI Chat Support Bot',
    desc: 'Context-aware customer support automation with CRM integration and sentiment analysis.',
    category: 'AI',
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    stack: ['GPT-4', 'Zapier', 'Node.js'],
    year: '2023',
    link: '#',
  },
];

export default function ProjectsGrid({ filter }: Props) {
  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section style={{
      padding: '2rem 6vw 4rem',
      background: '#0b0f0e',
      position: 'relative',
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}