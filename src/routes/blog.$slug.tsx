import { createFileRoute } from '@tanstack/react-router'
import { BlogPostPage } from '@/components/blog/BlogPostPage'
import { BLOG_POSTS } from '@/data/blog'
import { buildPageMeta, SITE_URL, SITE_AUTHOR, SITE_NAME } from '@/config/site'

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostRoute,
  head: ({ params }) => {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug)
    const title = post ? `${post.title} — MikeTech93` : 'Article — MikeTech93'
    const description = post?.description ?? 'DevOps and platform engineering article by Mike Etherington.'

    const base = buildPageMeta({
      title,
      description,
      path: `/blog/${params.slug}`,
      type: 'article',
    })

    const jsonLd = post
      ? JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url: `${SITE_URL}/blog/${post.slug}`,
          author: { '@type': 'Person', name: SITE_AUTHOR, url: `${SITE_URL}/about` },
          publisher: { '@type': 'Person', name: SITE_AUTHOR },
          keywords: post.tags.join(', '),
          inLanguage: 'en-GB',
          isPartOf: { '@type': 'Blog', name: SITE_NAME, url: `${SITE_URL}/blog` },
        })
      : null

    return {
      ...base,
      meta: [
        ...base.meta,
        ...(post
          ? [
              { property: 'article:published_time', content: post.date },
              { property: 'article:author', content: SITE_AUTHOR },
              ...post.tags.map((tag) => ({ property: 'article:tag', content: tag })),
            ]
          : []),
      ],
      scripts: jsonLd ? [{ type: 'application/ld+json', children: jsonLd }] : [],
    }
  },
})

function BlogPostRoute() {
  const { slug } = Route.useParams()
  return <BlogPostPage slug={slug} />
}
