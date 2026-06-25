import type { LucideIcon } from 'lucide-react'

export interface NavLink {
  label: string
  href: string
  active?: boolean
}

export interface StatItem {
  value: string
  label: string
  Icon: LucideIcon
}

export interface TerminalLine {
  type: 'command' | 'add' | 'output' | 'blank' | 'cursor'
  content: string
}

export type ArchNodeVariant = 'user' | 'azure' | 'aws' | 'terraform' | 'github'

export interface ArchNode {
  id: string
  label: string
  sublabel: string
  variant: ArchNodeVariant
}

export interface HeroData {
  name: string
  title: string
  subtitle: string
  badge: string
  headline: {
    before: string
    highlight: string
    after: string
  }
  description: string
  cta: {
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
  }
  stats: StatItem[]
  terminal: TerminalLine[]
  archNodes: ArchNode[]
  avatarSrc?: string
  linkedInUrl: string
}
