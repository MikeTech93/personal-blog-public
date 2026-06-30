import { SectionHeader } from '@/components/ui/SectionHeader'
import { EXPERIENCE } from '@/data/about'

export function AboutExperience() {
  return (
    <section className="py-10 border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Experience" />
        <div className="space-y-6">
          {EXPERIENCE.map((job) => (
            <div
              key={job.company + job.role}
              className="relative p-6 rounded-xl border border-slate-800 bg-[#0f172a]/60 hover:border-slate-700 transition-colors"
            >
              {job.current && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Current
                </span>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-100">{job.role}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-slate-400">{job.company}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-sm text-slate-500">{job.period}</span>
                </div>
              </div>
              <ul className="space-y-1.5 mb-4">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-slate-400">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">-&gt;</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-400 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
