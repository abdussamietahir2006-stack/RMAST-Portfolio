'use client';

import Hero from '@/components/home/Hero';
import  ServicesPreview  from '@/components/home/ServicesPreview';
import  WhoIHelp  from '@/components/home/WhoIHelp';
import  Process  from '@/components/home/Process';
import  Testimonials  from '@/components/home/Testimonials';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesPreview />
      <WhoIHelp />
      <Process />
      <Testimonials />
      <Newsletter />
    </>
  );
}