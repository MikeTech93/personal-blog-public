import { SiteLayout } from '@/components/layout/SiteLayout'
import { HeroContent } from './HeroContent'
import { HeroVisual } from './HeroVisual'
import { HeroStats } from './HeroStats'
import type { HeroData } from '@/types/hero'

interface HeroSectionProps {
  data: HeroData
  currentPath?: string
}

export function HeroSection({ data, currentPath = '/' }: HeroSectionProps) {
  return (
    <SiteLayout currentPath={currentPath}>
      {/* Hero — viewport-filling, stats pinned at bottom */}
      <section
        className="relative overflow-hidden flex flex-col"
        style={{ minHeight: 'calc(100svh - 65px)' }}
        aria-label="Hero section"
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(30,41,59,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.25) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-blue-700/5 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        {/* Main content — grows to fill available space */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 relative flex-1 flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center w-full">
            <HeroContent
              badge={data.badge}
              headline={data.headline}
              description={data.description}
              cta={data.cta}
            />
            <div className="flex justify-center lg:justify-end">
              <HeroVisual
                terminalLines={data.terminal}
                avatarSrc={data.avatarSrc}
                name={data.name}
              />
            </div>
          </div>
        </div>

        {/* Stats bar — anchored to bottom of hero */}
        <HeroStats stats={data.stats} />
      </section>
    </SiteLayout>
  )
}
