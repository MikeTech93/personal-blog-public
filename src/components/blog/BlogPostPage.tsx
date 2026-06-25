import { SiteLayout } from '@/components/layout/SiteLayout'
import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react'
import { BLOG_POSTS, formatDate } from '@/data/blog'
import type { BlogPost } from '@/data/blog'
import { marked } from 'marked'

const CATEGORY_COLORS: Record<string, string> = {
  Azure: 'bg-blue-950/60 text-blue-400 border-blue-500/30',
  AWS: 'bg-orange-950/40 text-orange-400 border-orange-500/30',
  Kubernetes: 'bg-blue-950/60 text-blue-300 border-blue-400/30',
  Terraform: 'bg-purple-950/60 text-purple-400 border-purple-500/30',
  'Platform Engineering': 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30',
  'CI/CD': 'bg-slate-800/80 text-slate-300 border-slate-500/30',
  Observability: 'bg-yellow-950/30 text-yellow-400 border-yellow-500/30',
}

function PostContent({ post }: { post: BlogPost }) {
  const tagColor = CATEGORY_COLORS[post.category] ?? 'bg-slate-800/80 text-slate-400 border-slate-600/30'
  const htmlContent = post.content ? (marked.parse(post.content) as string) : null

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      {/* Back link */}
      <a
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2} />
        Back to Blog
      </a>

      {/* Meta */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${tagColor}`}>
          <Tag className="w-3 h-3" strokeWidth={2} />
          {post.category}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-slate-500">
          <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-slate-500">
          <Clock className="w-3.5 h-3.5" strokeWidth={2} />
          {post.readTime}
        </span>
      </div>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 leading-snug mb-4">
        {post.title}
      </h1>

      {/* Description lead */}
      <p className="text-lg text-slate-400 leading-relaxed mb-8 border-b border-slate-800 pb-8">
        {post.description}
      </p>

      {/* Article body */}
      {htmlContent ? (
        <div
          className="prose-content"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      ) : (
        <div className="rounded-xl border border-slate-800 bg-[#0f172a]/60 p-8 text-center">
          <div className="text-4xl mb-4">...</div>
          <p className="text-slate-400 text-sm">Full article content coming soon.</p>
          <p className="text-slate-500 text-xs mt-2">
            In the meantime, connect on{' '}
            <a
              href="https://www.linkedin.com/in/mike-etherington/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2"
            >
              LinkedIn
            </a>{' '}
            for updates.
          </p>
        </div>
      )}

      {/* Tags */}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-800">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/40 text-xs text-slate-500 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

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
