import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/hero'
import { heroData } from '@/data/hero'
import { buildPageMeta, SITE_TITLE, SITE_DESCRIPTION } from '@/config/site'

export const Route = createFileRoute('/')({
  component: HomePage,
  head: () =>
    buildPageMeta({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      path: '/',
    }),
})

function HomePage() {
  return <HeroSection data={heroData} />
}
