import { SectionHeader } from '@/components/ui/SectionHeader'
import { SKILLS } from '@/data/about'

export function AboutSkills() {
  return (
    <section className="py-10 border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader label="Tech Stack" />
        <div className="flex flex-wrap gap-3">
          {SKILLS.map((skill) => (
            <div
              key={skill.label}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border bg-slate-900/40 transition-colors cursor-default ${skill.color}`}
            >
              {skill.Icon && <skill.Icon className="w-4 h-4" />}
              <span className="text-sm font-medium text-slate-300">{skill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
