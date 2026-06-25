import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '@/components/about/AboutPage'

export const Route = createFileRoute('/about')({
  component: AboutPageRoute,
  head: () => ({
    meta: [
      { title: 'About — MikeTech93' },
      {
        name: 'description',
        content:
          'Senior DevOps & Platform Engineer with 9+ years building cloud-native infrastructure on Azure and AWS.',
      },
    ],
  }),
})

function AboutPageRoute() {
  return <AboutPage currentPath="/about" />
}
