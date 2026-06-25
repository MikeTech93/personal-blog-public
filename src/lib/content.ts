import matter from 'gray-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  category: string
  featured: boolean
  content: string
}

const blogFiles = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function parseBlogFiles(files: Record<string, string>): BlogPost[] {
  return Object.entries(files)
    .map(([path, raw]) => {
      const slug = path.split('/').pop()!.replace('.md', '')
      const { data, content } = matter(raw)
      return {
        slug,
        title: String(data.title ?? ''),
        description: String(data.description ?? ''),
        date: String(data.date ?? ''),
        readTime: String(data.readTime ?? ''),
        tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
        category: String(data.category ?? ''),
        featured: Boolean(data.featured),
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const BLOG_POSTS: BlogPost[] = parseBlogFiles(blogFiles)

export const CATEGORIES = [
  'All',
  'Azure',
  'AWS',
  'Kubernetes',
  'Terraform',
  'Platform Engineering',
  'CI/CD',
  'Observability',
] as const

export type Category = (typeof CATEGORIES)[number]

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
