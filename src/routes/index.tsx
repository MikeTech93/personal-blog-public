import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/hero'
import { heroData } from '@/data/hero'
import { SITE_URL } from '@/config/site'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () => ({
    meta: [
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: SITE_URL },
    ],
    links: [{ rel: 'canonical', href: SITE_URL }],
  }),
})

function HomePage() {
  return <HeroSection data={heroData} />
}
