import { createFileRoute } from '@tanstack/react-router'
import { BlogPage } from '@/components/blog/BlogPage'
import { buildPageMeta } from '@/config/site'

export const Route = createFileRoute('/blog/')({
  component: BlogPageRoute,
  head: () =>
    buildPageMeta({
      title: 'Blog — MikeTech93',
      description:
        'Practical DevOps articles on cloud infrastructure, Kubernetes, Terraform, and platform engineering.',
      path: '/blog',
    }),
})

function BlogPageRoute() {
  return <BlogPage />
}
