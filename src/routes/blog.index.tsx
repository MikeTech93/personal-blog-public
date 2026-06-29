import { createFileRoute } from '@tanstack/react-router'
import { BlogPage } from '@/components/blog/BlogPage'
import { SITE_URL } from '@/config/site'

const PAGE_URL = `${SITE_URL}/blog`
const PAGE_TITLE = 'Blog — MikeTech93'
const PAGE_DESCRIPTION =
  'Practical DevOps articles on cloud infrastructure, Kubernetes, Terraform, and platform engineering.'

export const Route = createFileRoute('/blog/')({
  component: BlogPageRoute,
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

function BlogPageRoute() {
  return <BlogPage />
}
