import { createFileRoute } from '@tanstack/react-router'
import { AboutPage } from '@/components/about/AboutPage'
import { SITE_URL } from '@/config/site'

const PAGE_URL = `${SITE_URL}/about`
const PAGE_TITLE = 'About — MikeTech93'
const PAGE_DESCRIPTION =
  'Senior DevOps & Platform Engineer with 15+ years building cloud-native infrastructure on Azure and AWS.'

export const Route = createFileRoute('/about')({
  component: AboutPageRoute,
  head: () => ({
    meta: [
      { title: PAGE_TITLE },
      { name: 'description', content: PAGE_DESCRIPTION },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: PAGE_TITLE },
      { property: 'og:description', content: PAGE_DESCRIPTION },
      { property: 'og:url', content: PAGE_URL },
      { name: 'twitter:title', content: PAGE_TITLE },
      { name: 'twitter:description', content: PAGE_DESCRIPTION },
    ],
    links: [{ rel: 'canonical', href: PAGE_URL }],
  }),
})

function AboutPageRoute() {
  return <AboutPage />
}
