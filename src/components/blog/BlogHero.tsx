import { Tag, BookOpen } from 'lucide-react'

interface BlogHeroProps {
  postCount: number
  topicCount: number
}

export function BlogHero({ postCount, topicCount }: BlogHeroProps) {
  return (
    <section className="relative py-14 lg:py-18 border-b border-slate-800 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,41,59,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.2) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-700/6 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-blue-600/4 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
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

          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { value: `${postCount}`, label: 'Articles Published', icon: BookOpen },
              { value: `${topicCount}`, label: 'Topics Covered', icon: Tag },
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
  )
}
