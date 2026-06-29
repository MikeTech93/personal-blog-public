import { ExternalLink, MapPin, Briefcase } from 'lucide-react'

export function AboutHero() {
  return (
    <section className="relative py-14 lg:py-20 border-b border-slate-800 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,41,59,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.2) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-700/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/50 text-blue-400 text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              About Me
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-slate-100">
              Building platforms that{' '}
              <span className="text-blue-400">engineers love</span> to use.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              I am a DevOps and Platform Engineer with 15+ years of experience designing and operating infrastructure across Azure and AWS. I specialise in Terraform, Kubernetes, CI/CD automation, and data platforms. I share what I learn through posts on LinkedIn.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-400" strokeWidth={2} />
                South West, England
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-400" strokeWidth={2} />
                Full Time Employed
              </span>
              <a
                href="https://www.linkedin.com/in/mike-etherington/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
              >
                LinkedIn
                <ExternalLink className="w-3 h-3" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="w-64 h-72 lg:w-72 lg:h-80 rounded-2xl overflow-hidden border border-slate-700/40 shadow-2xl shadow-blue-950/40"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at 50% 20%, #1d4ed840 0%, #0f172a 65%), linear-gradient(175deg, #1e3a5f 0%, #0f172a 50%, #030712 100%)',
                }}
              >
                <svg
                  viewBox="0 0 240 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMax meet"
                  aria-hidden="true"
                >
                  <ellipse cx="120" cy="110" rx="48" ry="52" fill="#1e293b" />
                  <ellipse cx="120" cy="70" rx="46" ry="22" fill="#0f172a" />
                  <ellipse cx="108" cy="95" rx="14" ry="18" fill="#263a52" opacity="0.6" />
                  <path d="M20 300 C20 210 220 210 220 300" fill="#1e293b" />
                  <path d="M38 295 C38 250 100 240 120 240 C140 240 202 250 202 295" fill="#263a52" opacity="0.4" />
                </svg>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#0f172a] border border-slate-700/60 rounded-xl px-4 py-2.5 shadow-xl">
                <div className="text-xs text-slate-500 leading-none mb-0.5">LinkedIn Followers</div>
                <div className="text-lg font-bold text-slate-100">1K+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
