'use client'

import { useState } from 'react'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { Clock, Tag, ArrowRight, BookOpen } from 'lucide-react'
import { BLOG_POSTS, CATEGORIES, formatDate } from '@/data/blog'
import type { BlogPost, Category } from '@/data/blog'

// ─── Category colour map ───────────────────────────────────────────────────────

const CATEGORY_COLORS: Record<string, string> = {
  Azure: 'bg-blue-950/60 text-blue-400 border-blue-500/30',
  AWS: 'bg-orange-950/40 text-orange-400 border-orange-500/30',
  Kubernetes: 'bg-blue-950/60 text-blue-300 border-blue-400/30',
  Terraform: 'bg-purple-950/60 text-purple-400 border-purple-500/30',
  'Platform Engineering': 'bg-emerald-950/40 text-emerald-400 border-emerald-500/30',
  'CI/CD': 'bg-slate-800/80 text-slate-300 border-slate-500/30',
  Observability: 'bg-yellow-950/30 text-yellow-400 border-yellow-500/30',
}

function TagPill({ label, small }: { label: string; small?: boolean }) {
  const base = CATEGORY_COLORS[label] ?? 'bg-slate-800/80 text-slate-400 border-slate-600/30'
  return (
    <span className={`inline-flex items-center border rounded-md font-medium ${small ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'} ${base}`}>
      {label}
    </span>
  )
}

// ─── Featured post ─────────────────────────────────────────────────────────────

function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <a
      href={`/blog/${post.slug}`}
      className="group block p-6 lg:p-8 rounded-2xl border border-slate-700/60 bg-[#0f172a]/70 hover:border-blue-500/40 hover:bg-[#0f172a] transition-all duration-200 relative overflow-hidden"
      aria-label={`Read featured article: ${post.title}`}
    >
      {/* Background glow */}
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

// ─── Post card ─────────────────────────────────────────────────────────────────

function PostCard({ post }: { post: BlogPost }) {
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

// ─── Filters ───────────────────────────────────────────────────────────────────

function CategoryFilter({
  active,
  onChange,
}: {
  active: Category
  onChange: (c: Category) => void
}) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          type="button"
          onClick={() => onChange(cat)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            active === cat
              ? 'bg-blue-600 border-blue-500 text-white'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-600'
          }`}
          aria-pressed={active === cat}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

interface BlogPageProps {
  currentPath?: string
}

export function BlogPage({ currentPath = '/blog' }: BlogPageProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  const featured = BLOG_POSTS.find((p) => p.featured)
  const rest = BLOG_POSTS.filter((p) => !p.featured)
  const filtered = activeCategory === 'All' ? rest : rest.filter((p) => p.category === activeCategory)

  return (
    <SiteLayout currentPath={currentPath}>
      {/* Page header */}
      <section className="relative py-14 lg:py-18 border-b border-slate-800 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(rgba(30,41,59,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.2) 1px, transparent 1px)', backgroundSize: '64px 64px' }}
          aria-hidden="true"
        />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-700/6 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-blue-600/4 blur-3xl pointer-events-none" aria-hidden="true" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: title */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/50 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5">
                <Tag className="w-3 h-3" strokeWidth={2} />
                Articles
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-100 mb-4">
                Practical DevOps
                <span className="text-blue-400"> lessons.</span>
              </h1>
              <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                Real-world guides on cloud infrastructure, Kubernetes, Terraform, and platform engineering. Written from the trenches.
              </p>
            </div>
            {/* Right: quick stats */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: `${BLOG_POSTS.length}`, label: 'Articles Published', icon: BookOpen },
                { value: CATEGORIES.length - 1 + '', label: 'Topics Covered', icon: Tag },
                { value: '1K+', label: 'LinkedIn Followers', icon: BookOpen },
                { value: '15+', label: 'Years Experience', icon: Tag },
              ].map(({ value, label, icon: Icon }) => (
                <div key={label} className="p-4 rounded-xl border border-slate-800 bg-[#0f172a]/50">
                  <div className="text-2xl font-bold text-slate-100">{value}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {/* Featured post */}
        {featured && (
          <div>
            <FeaturedPost post={featured} />
          </div>
        )}

        {/* Filters + grid */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-lg font-semibold text-slate-300">
              {activeCategory === 'All' ? 'All Articles' : activeCategory}
              <span className="ml-2 text-sm font-normal text-slate-600">({filtered.length})</span>
            </h2>
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-slate-600">
              No articles in this category yet.
            </div>
          )}
        </div>
      </div>
    </SiteLayout>
  )
}
