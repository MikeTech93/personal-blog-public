import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/hero'
import { heroData } from '@/data/hero'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return <HeroSection data={heroData} currentPath="/" />
}
