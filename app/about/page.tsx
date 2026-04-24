'use client';

import AboutHero from '@/components/about/AboutHero';
import AboutStory from '@/components/about/AboutStory';
import AboutMissionVision from '@/components/about/AboutMissionVision';
import AboutValues from '@/components/about/AboutValues';
import AboutStats from '@/components/about/AboutStats';
import AboutTeam from '@/components/about/AboutTeam';
import AboutCTA from '@/components/about/AboutCTA';

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutStory />
      <AboutMissionVision />
      <AboutValues />
      <AboutStats />
      <AboutTeam />
      <AboutCTA />
    </>
  );
}