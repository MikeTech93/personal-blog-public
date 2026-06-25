import type { TerminalLine } from '@/types/hero'

interface TerminalWindowProps {
  lines: TerminalLine[]
}

function TerminalLineRow({ line }: { line: TerminalLine }) {
  if (line.type === 'blank') return <div className="h-3" />

  if (line.type === 'cursor') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-emerald-400 select-none">$</span>
        <span className="inline-block w-2 h-4 bg-emerald-400 animate-pulse" />
      </div>
    )
  }

  if (line.type === 'command') {
    return (
      <div className="flex items-center gap-1.5">
        <span className="text-emerald-400 select-none">$</span>
        <span className="text-slate-200">{line.content}</span>
      </div>
    )
  }

  if (line.type === 'add') {
    return (
      <div className="flex items-center gap-1.5 pl-2">
        <span className="text-blue-400 select-none">+</span>
        <span className="text-blue-300 text-sm">{line.content}</span>
      </div>
    )
  }

  return (
    <div className="pl-0">
      <span className="text-slate-400 text-sm">{line.content}</span>
    </div>
  )
}

export function TerminalWindow({ lines }: TerminalWindowProps) {
  return (
    <div className="rounded-xl overflow-hidden border border-slate-700/60 bg-[#0D1117] shadow-2xl shadow-black/60 min-w-[280px]">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/60 bg-[#161B22]">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
      </div>

      {/* Terminal body */}
      <div className="px-4 py-4 font-mono text-sm leading-relaxed space-y-0.5">
        {lines.map((line, i) => (
          <TerminalLineRow key={i} line={line} />
        ))}
      </div>
    </div>
  )
}
