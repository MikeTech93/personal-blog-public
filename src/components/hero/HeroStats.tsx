import type { StatItem } from '@/types/hero'

interface HeroStatsProps {
  stats: StatItem[]
}

export function HeroStats({ stats }: HeroStatsProps) {
  return (
    <div className="border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => {
            const { Icon } = stat
            return (
              <div
                key={stat.label}
                className={`flex items-center gap-3 py-5 px-4 ${
                  i < stats.length - 1
                    ? 'border-b sm:border-b-0 sm:border-r border-slate-800'
                    : ''
                } ${
                  // On mobile 2-col grid the 3rd item spans and the 4th/5th reset border
                  i === 1 ? 'border-r sm:border-r border-slate-800' : ''
                }`}
              >
                <Icon
                  className="w-5 h-5 text-blue-400 flex-shrink-0"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <div className="text-lg font-bold text-slate-100 leading-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-500 leading-tight truncate">
                    {stat.label}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
