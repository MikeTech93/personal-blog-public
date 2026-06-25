import { BookOpen, ExternalLink } from 'lucide-react'
import { LinkedInIcon } from '@/components/icons/BrandIcons'

interface HeroContentProps {
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
}

export function HeroContent({ badge, headline, description, cta }: HeroContentProps) {
  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      {/* Badge */}
      <div>
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/50 text-blue-400 text-xs font-semibold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" aria-hidden="true" />
          {badge}
        </span>
      </div>

      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[3.25rem] font-extrabold leading-[1.12] tracking-tight text-slate-100">
        {headline.before}
        <span className="text-blue-400">{headline.highlight}</span>
        {headline.after}
      </h1>

      {/* Description */}
      <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-xl">
        {description}
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
        <a
          href={cta.primary.href}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-600/70 bg-slate-800/60 text-slate-200 text-sm font-semibold hover:bg-slate-700/70 hover:border-slate-500 hover:text-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
        >
          <BookOpen className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
          {cta.primary.label}
        </a>

        <a
          href={cta.secondary.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-slate-600/70 bg-slate-800/60 text-slate-200 text-sm font-semibold hover:bg-slate-700/70 hover:border-slate-500 hover:text-white transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
        >
          <LinkedInIcon className="w-4 h-4 text-[#0A66C2]" aria-hidden="true" />
          {cta.secondary.label}
          <ExternalLink className="w-3 h-3 text-slate-500" strokeWidth={2} aria-hidden="true" />
        </a>
      </div>
    </div>
  )
}
