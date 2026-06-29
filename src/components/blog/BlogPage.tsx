'use client'

import { useState } from 'react'
import { SiteLayout } from '@/components/layout/SiteLayout'
import { BLOG_POSTS } from '@/data/blog'
import { BlogHero } from './BlogHero'
import { FeaturedPost } from './FeaturedPost'
import { PostCard } from './PostCard'
import { TagFilter } from './TagFilter'

const ALL_TAGS = ['All', ...Array.from(new Set(BLOG_POSTS.flatMap((p) => p.tags))).sort()]

export function BlogPage() {
  const [activeTag, setActiveTag] = useState('All')

  const isFiltered = activeTag !== 'All'
  const featured = !isFiltered ? BLOG_POSTS.find((p) => p.featured) : undefined
  const postsToFilter = isFiltered ? BLOG_POSTS : BLOG_POSTS.filter((p) => !p.featured)
  const filtered = isFiltered
    ? postsToFilter.filter((p) => p.tags.includes(activeTag))
    : postsToFilter

  return (
    <SiteLayout>
      <BlogHero postCount={BLOG_POSTS.length} topicCount={ALL_TAGS.length - 1} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 space-y-12">
        {featured && (
          <div>
            <FeaturedPost post={featured} />
          </div>
        )}

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-lg font-semibold text-slate-300">
              {activeTag === 'All' ? 'All Articles' : activeTag}
              <span className="ml-2 text-sm font-normal text-slate-600">({filtered.length})</span>
            </h2>
            <TagFilter tags={ALL_TAGS} active={activeTag} onChange={setActiveTag} />
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
