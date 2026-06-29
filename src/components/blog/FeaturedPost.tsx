import { Clock, ArrowRight, BookOpen } from 'lucide-react'
import { formatDate } from '@/data/blog'
import type { BlogPost } from '@/data/blog'
import { TagPill } from './TagPill'

interface FeaturedPostProps {
  post: BlogPost
}

export function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block p-6 lg:p-8 rounded-2xl border border-slate-700/60 bg-[#0f172a]/70 hover:border-blue-500/40 hover:bg-[#0f172a] transition-all duration-200 relative overflow-hidden"
      aria-label={`Read featured article: ${post.title}`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none group-hover:bg-blue-600/8 transition-colors" aria-hidden="true" />

      <div className="relative">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-600/20 border border-blue-500/40 text-blue-400 text-xs font-semibold">
            <BookOpen className="w-3 h-3" strokeWidth={2} />
            Featured Article
          </span>
          <TagPill label={post.category} small />
        </div>

        <h2 className="text-2xl lg:text-3xl font-bold text-slate-100 leading-snug mb-3 group-hover:text-white transition-colors">
          {post.title}
        </h2>
        <p className="text-slate-400 leading-relaxed mb-5 max-w-2xl text-base">
          {post.description}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>{formatDate(post.date)}</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" strokeWidth={2} />
              {post.readTime}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-blue-400 group-hover:text-blue-300 transition-colors">
            Read Article
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-slate-800">
          {post.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded bg-slate-800/60 border border-slate-700/40 text-xs text-slate-500 font-mono">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </a>
  )
}
