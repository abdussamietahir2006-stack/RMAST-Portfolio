'use client';

import { useState } from 'react';

import ProjectsHero from '@/components/projects/ProjectsHero';
import ProjectsViewToggle from '@/components/projects/ProjectsViewToggle';
import ProjectsFilter from '@/components/projects/ProjectsFilter';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import Projects3DView from '@/components/projects/Projects3DView';
import ProjectCTA from '@/components/projects/ProjectCTA';

type ViewMode = 'grid' | '3d';

export default function ProjectsPage() {
  const [view, setView] = useState<ViewMode>('grid');
  const [filter, setFilter] = useState<string>('All');

  return (
    <>
      <ProjectsHero />

      <ProjectsViewToggle view={view} setView={setView} />

      <ProjectsFilter filter={filter} setFilter={setFilter} />

      {view === 'grid' ? (
        <ProjectsGrid filter={filter} />
      ) : (
        <Projects3DView />
      )}

      <ProjectCTA />
    </>
  );
}