import { SiteLayout } from '@/components/layout/SiteLayout'
import { AboutHero } from './AboutHero'
import { AboutSkills } from './AboutSkills'
import { AboutExperience } from './AboutExperience'
import { AboutCertifications } from './AboutCertifications'


interface AboutPageProps {
  currentPath?: string
}

export function AboutPage({ currentPath = '/about' }: AboutPageProps) {
  return (
    <SiteLayout currentPath={currentPath}>
      <AboutHero />
      <AboutSkills />
      <AboutExperience />
      <AboutCertifications />
    </SiteLayout>
  )
}
