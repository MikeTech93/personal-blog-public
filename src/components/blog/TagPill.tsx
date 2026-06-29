import { CATEGORY_COLORS } from '@/config/categoryColors'

interface TagPillProps {
  label: string
  small?: boolean
}

export function TagPill({ label, small }: TagPillProps) {
  const base = CATEGORY_COLORS[label] ?? 'bg-slate-800/80 text-slate-400 border-slate-600/30'
  return (
    <span
      className={`inline-flex items-center border rounded-md font-medium ${
        small ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs'
      } ${base}`}
    >
      {label}
    </span>
  )
}
