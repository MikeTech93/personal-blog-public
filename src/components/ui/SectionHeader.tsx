interface SectionHeaderProps {
  label: string
}

export function SectionHeader({ label }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="w-8 h-[2px] bg-blue-500 rounded-full" />
      <h2 className="text-xs font-semibold text-blue-400 tracking-widest uppercase">{label}</h2>
    </div>
  )
}
