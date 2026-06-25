import { AzureIcon, AwsIcon, TerraformIcon, GitHubIcon } from '@/components/icons/BrandIcons'
import { CheckCircle2 } from 'lucide-react'

function ArrowDown() {
  return (
    <div className="flex justify-center py-0.5">
      <svg width="2" height="16" viewBox="0 0 2 16" fill="none">
        <line x1="1" y1="0" x2="1" y2="10" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 2" />
        <polyline points="-2,7 1,13 4,7" stroke="#475569" strokeWidth="1.5" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  )
}

interface StepProps {
  icon: React.ReactNode
  label: string
  sublabel?: string
  status?: string
  statusColor?: string
  borderColor?: string
  bgColor?: string
}

function PipelineStep({ icon, label, sublabel, status, statusColor = 'text-emerald-400', borderColor = 'border-slate-700/50', bgColor = 'bg-slate-800/50' }: StepProps) {
  return (
    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border ${borderColor} ${bgColor}`}>
      <div className="flex-shrink-0">{icon}</div>
      <div className="min-w-0 flex-1">
        <div className="text-xs font-semibold text-slate-200 leading-tight">{label}</div>
        {sublabel && <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{sublabel}</div>}
      </div>
      {status && (
        <span className={`text-[10px] font-mono flex-shrink-0 ${statusColor}`}>{status}</span>
      )}
    </div>
  )
}

export function ArchitectureDiagram() {
  return (
    <div className="rounded-xl border border-slate-700/50 bg-[#0D1117]/90 backdrop-blur-sm p-4 shadow-2xl shadow-black/60 w-[240px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Deploy Pipeline</span>
        <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
          <CheckCircle2 className="w-3 h-3" strokeWidth={2} />
          live
        </span>
      </div>

      {/* Pipeline steps */}
      <div className="space-y-0">
        <PipelineStep
          icon={<GitHubIcon className="w-4 h-4 text-slate-200" />}
          label="Source Control"
          sublabel="GitHub / Azure DevOps"
          status="✓ pushed"
          borderColor="border-slate-600/50"
          bgColor="bg-slate-800/60"
        />
        <ArrowDown />
        <PipelineStep
          icon={<TerraformIcon className="w-4 h-4" />}
          label="Terraform"
          sublabel="Plan + Apply"
          status="28 changes"
          statusColor="text-blue-400"
          borderColor="border-purple-500/30"
          bgColor="bg-purple-950/30"
        />
        <ArrowDown />
        <div className="flex gap-2">
          <div className={`flex-1 flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-blue-500/30 bg-blue-950/40`}>
            <AzureIcon className="w-4 h-4 flex-shrink-0" />
            <div>
              <div className="text-[11px] font-semibold text-slate-200">Azure</div>
              <div className="text-[10px] text-slate-500">AKS</div>
            </div>
          </div>
          <div className={`flex-1 flex items-center gap-1.5 px-2.5 py-2 rounded-lg border border-orange-500/30 bg-orange-950/30`}>
            <AwsIcon className="w-4 h-4 flex-shrink-0" />
            <div>
              <div className="text-[11px] font-semibold text-slate-200">AWS</div>
              <div className="text-[10px] text-slate-500">EKS</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
