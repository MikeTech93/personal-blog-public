import { createFileRoute } from '@tanstack/react-router'
import { BlogPage } from '@/components/blog/BlogPage'

export const Route = createFileRoute('/blog/')({
  component: BlogPageRoute,
  head: () => ({
    meta: [
      { title: 'Blog — MikeTech93' },
      {
        name: 'description',
        content:
          'Practical DevOps articles on cloud infrastructure, Kubernetes, Terraform, and platform engineering.',
      },
    ],
  }),
})

function BlogPageRoute() {
  return <BlogPage currentPath="/blog" />
}
