import { createFileRoute } from '@tanstack/react-router'
import { BlogPostPage } from '@/components/blog/BlogPostPage'
import { BLOG_POSTS } from '@/data/blog'
import { SITE_URL, SITE_AUTHOR } from '@/config/site'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostRoute,
  head: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug)
    const title = post ? `${post.title} — MikeTech93` : 'Article — MikeTech93'
    const description = post?.description ?? 'DevOps and platform engineering article by Mike Etherington.'
    const url = `${SITE_URL}/blog/${params.slug}`
    return {
      meta: [
        { title },
        { name: 'description', content: description },
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        ...(post ? [
          { property: 'article:published_time', content: post.date },
          { property: 'article:author', content: SITE_AUTHOR },
          ...post.tags.map((tag) => ({ property: 'article:tag', content: tag })),
        ] : []),
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
      ],
      links: [{ rel: 'canonical', href: url }],
    }
  },
})

function BlogPostRoute() {
  const { slug } = Route.useParams()
  return <BlogPostPage slug={slug} />
}
