import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '@/components/about/AboutPage'
import { buildPageMeta } from '@/config/site'

export const Route = createFileRoute('/about')({
  component: AboutPageRoute,
  head: () =>
    buildPageMeta({
      title: 'About — MikeTech93',
      description:
        'Senior DevOps & Platform Engineer with 15+ years building cloud-native infrastructure on Azure and AWS.',
      path: '/about',
    }),
})

function AboutPageRoute() {
  return <AboutPage />
}
