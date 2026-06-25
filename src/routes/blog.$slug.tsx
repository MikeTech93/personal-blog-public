import { createFileRoute } from '@tanstack/react-router'
import { BlogPostPage } from '@/components/blog/BlogPostPage'
import { BLOG_POSTS } from '@/data/blog'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostRoute,
  head: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug)
    return {
      meta: [
        { title: post ? `${post.title} — MikeTech93` : 'Article — MikeTech93' },
        {
          name: 'description',
          content: post?.description ?? 'DevOps and platform engineering article by Mike Etherington.',
        },
      ],
    }
  },
})

function BlogPostRoute() {
  const { slug } = Route.useParams()
  return <BlogPostPage slug={slug} />
}
