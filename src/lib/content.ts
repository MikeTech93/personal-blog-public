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

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!match) return { data: {}, content: raw }
  const frontmatter = match[1]
  const content = raw.slice(match[0].length)
  const data: Record<string, unknown> = {}
  for (const line of frontmatter.split('\n')) {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) continue
    const key = line.slice(0, colonIdx).trim()
    const val = line.slice(colonIdx + 1).trim()
    if (val.startsWith('[')) {
      data[key] = val
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
        .filter(Boolean)
    } else if (val === 'true') {
      data[key] = true
    } else if (val === 'false') {
      data[key] = false
    } else {
      data[key] = val.replace(/^["']|["']$/g, '')
    }
  }
  return { data, content }
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
      const { data, content } = parseFrontmatter(raw)
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
