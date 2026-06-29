import { ArrowLeft, Clock, Calendar, Tag } from 'lucide-react'
import { BLOG_POSTS, formatDate } from '@/data/blog'
import type { BlogPost } from '@/data/blog'
import { marked } from 'marked'
import hljs from 'highlight.js'
import { TagPill } from './TagPill'

marked.use({
  renderer: {
    code({ text, lang }: { text: string; lang?: string }) {
      const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext'
      const highlighted = hljs.highlight(text, { language }).value
      return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`
    },
  },
})

interface PostContentProps {
  post: BlogPost
}

export function PostContent({ post }: PostContentProps) {
  const htmlContent = post.content ? (marked.parse(post.content) as string) : null

  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <a
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" strokeWidth={2} />
        Back to Blog
      </a>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <TagPill label={post.category} />
        <span className="flex items-center gap-1.5 text-sm text-slate-500">
          <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
          {formatDate(post.date)}
        </span>
        <span className="flex items-center gap-1.5 text-sm text-slate-500">
          <Clock className="w-3.5 h-3.5" strokeWidth={2} />
          {post.readTime}
        </span>
      </div>

      <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-100 leading-snug mb-4">
        {post.title}
      </h1>

      <p className="text-lg text-slate-400 leading-relaxed mb-8 border-b border-slate-800 pb-8">
        {post.description}
      </p>

      {htmlContent ? (
        <div className="prose-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
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

