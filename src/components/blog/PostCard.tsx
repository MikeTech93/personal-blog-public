import { Clock, ArrowRight } from 'lucide-react'
import { formatDate } from '@/data/blog'
import type { BlogPost } from '@/data/blog'
import { TagPill } from './TagPill'

interface PostCardProps {
  post: BlogPost
}

export function PostCard({ post }: PostCardProps) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group flex flex-col p-5 rounded-xl border border-slate-800 bg-[#0f172a]/40 hover:border-slate-700 hover:bg-[#0f172a]/70 transition-all duration-200 h-full"
      aria-label={`Read: ${post.title}`}
    >
      <div className="flex items-center justify-between mb-3">
        <TagPill label={post.category} small />
        <span className="text-xs text-slate-600 flex items-center gap-1">
          <Clock className="w-3 h-3" strokeWidth={2} />
          {post.readTime}
        </span>
      </div>

      <h3 className="text-base font-bold text-slate-200 leading-snug mb-2 group-hover:text-white transition-colors flex-1">
        {post.title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
        {post.description}
      </p>

      <div className="mt-auto pt-3 border-t border-slate-800 flex items-center justify-between">
        <span className="text-xs text-slate-600">{formatDate(post.date)}</span>
        <span className="text-xs font-semibold text-blue-500 group-hover:text-blue-400 flex items-center gap-1 transition-colors">
          Read <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" strokeWidth={2} />
        </span>
      </div>
    </a>
  )
}
