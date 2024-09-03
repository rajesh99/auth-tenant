import Hero from './_PageSections/Hero';
import FeatureList from './_PageSections/FeatureList';
import Feature from './_PageSections/Feature';
import LogoCloud from './_PageSections/LogoCloud';
import CTA from './_PageSections/CTA';
import config from '@/lib/config/site';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: config.seo_title,
  description: config.seo_description
};

export default function Landing() {
  return (
    <div>
      <Hero />
      <LogoCloud />
      <FeatureList />
      <Feature />
      <Feature isFlipped={true} />
      <Feature />
      <CTA />
    </div>
  );
}
