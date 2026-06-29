import { SiteLayout } from '@/components/layout/SiteLayout'
import { AboutHero } from './AboutHero'
import { AboutSkills } from './AboutSkills'
import { AboutExperience } from './AboutExperience'
import { AboutCertifications } from './AboutCertifications'


export function AboutPage() {
  return (
    <SiteLayout>
      <AboutHero />
      <AboutSkills />
      <AboutExperience />
      <AboutCertifications />
    </SiteLayout>
  )
}
