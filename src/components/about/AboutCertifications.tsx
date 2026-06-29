import { Award } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { CERTS } from '@/data/about'

export function AboutCertifications() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Certifications" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CERTS.map((cert) => (
            <div
              key={cert.name}
              className={`flex flex-col items-center gap-2 p-6 rounded-xl border text-center transition-colors hover:bg-slate-800/40 ${cert.color}`}
            >
              <Award className="w-8 h-8 text-slate-400" strokeWidth={1.5} />
              <div>
                <div className="text-base font-bold text-slate-200">{cert.name}</div>
                <div className="text-xs text-slate-400 leading-tight mt-0.5">{cert.issuer}</div>
                <div className="text-xs text-slate-600 mt-1">{cert.year}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
