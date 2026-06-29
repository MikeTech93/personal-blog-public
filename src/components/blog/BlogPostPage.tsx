import { SiteLayout } from '@/components/layout/SiteLayout'
import { ArrowLeft } from 'lucide-react'
import { BLOG_POSTS } from '@/data/blog'
import { PostContent } from './PostContent'

interface BlogPostPageProps {
  slug: string
}

export function BlogPostPage({ slug }: BlogPostPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === slug)

  return (
    <SiteLayout currentPath="/blog">
      {post ? (
        <PostContent post={post} />
      ) : (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-2xl font-bold text-slate-300 mb-3">Article not found</p>
          <p className="text-slate-500 mb-6">This article may have moved or been removed.</p>
          <a href="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Back to Blog
          </a>
        </div>
      )}
    </SiteLayout>
  )
}
