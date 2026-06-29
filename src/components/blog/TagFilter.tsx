interface TagFilterProps {
  tags: string[]
  active: string
  onChange: (tag: string) => void
}

export function TagFilter({ tags, active, onChange }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onChange(tag)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
            active === tag
              ? 'bg-blue-600 border-blue-500 text-white'
              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:border-slate-600'
          }`}
          aria-pressed={active === tag}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
