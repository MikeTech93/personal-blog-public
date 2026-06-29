'use client'

import { useState } from 'react'
import { TerminalWindow } from './TerminalWindow'
import { ArchitectureDiagram } from './ArchitectureDiagram'
import type { TerminalLine } from '@/types/hero'

interface HeroVisualProps {
  terminalLines: TerminalLine[]
  avatarSrc?: string
  name: string
}

function AvatarPlaceholder() {
  return (
    <div
      className="w-full h-full relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 90% 70% at 50% 20%, #1d4ed840 0%, #0f172a 65%), linear-gradient(175deg, #1e3a5f 0%, #0f172a 50%, #030712 100%)',
      }}
    >
      {/* Subtle scan-line texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)',
        }}
      />
      {/* Glow orb */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl" />
      {/* Silhouette */}
      <svg
        viewBox="0 0 240 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        {/* Body */}
        <path d="M20 320 C20 222 220 222 220 320" fill="#1e293b" />
        {/* Neck */}
        <rect x="107" y="148" width="26" height="24" rx="4" fill="#1e293b" />
        {/* Head */}
        <ellipse cx="120" cy="110" rx="48" ry="52" fill="#1e293b" />
        {/* Hair */}
        <ellipse cx="120" cy="70" rx="46" ry="22" fill="#0f172a" />
        {/* Face highlight */}
        <ellipse cx="108" cy="95" rx="14" ry="18" fill="#263a52" opacity="0.6" />
        {/* Shoulders highlight */}
        <path d="M38 310 C38 260 100 248 120 248 C140 248 202 260 202 310" fill="#263a52" opacity="0.4" />
      </svg>
      {/* Bottom fade to blend */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#030712] to-transparent" />
    </div>
  )
}

export function HeroVisual({ terminalLines, avatarSrc, name }: HeroVisualProps) {
  const [imgFailed, setImgFailed] = useState(false)
  const showPhoto = !!avatarSrc && !imgFailed

  return (
    <div className="relative w-full h-full flex items-center justify-center min-h-[420px] lg:min-h-[460px]">
      {/* Ambient blue glow behind avatar */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-96 h-96 rounded-full bg-blue-700/8 blur-3xl" />
      </div>

      {/* Inner group — fixed width keeps card + terminal together on the right,
           card is left-anchored so it always peeks out from behind the terminal */}
      <div className="relative w-[340px] h-[400px] lg:w-[390px] lg:h-[440px] xl:w-[430px] xl:h-[460px]">

        {/* Python code card — left-anchored, always visible to the left of the terminal */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-44 h-[270px] lg:w-48 lg:h-[300px] xl:w-52 xl:h-[320px] rounded-2xl overflow-hidden border border-slate-700/40 shadow-2xl shadow-blue-950/60">
          {showPhoto ? (
            <img
              src={avatarSrc}
              alt={`${name} — profile photo`}
              className="w-full h-full object-cover object-top"
              onError={() => setImgFailed(true)}
            />
          ) : (
            <div className="w-full h-full bg-[#0d1117] flex flex-col justify-start p-3 font-mono text-[10px] leading-relaxed overflow-hidden">
              <div className="text-slate-500 mb-2 text-[9px]">deploy.py</div>
              <div><span className="text-purple-400">import</span> <span className="text-blue-300">boto3</span></div>
              <div><span className="text-purple-400">import</span> <span className="text-blue-300">json</span></div>
              <div className="mt-2"><span className="text-slate-500"># Deploy to EKS</span></div>
              <div><span className="text-yellow-300">def</span> <span className="text-blue-400">deploy</span><span className="text-slate-300">(env):</span></div>
              <div className="pl-3"><span className="text-blue-300">eks</span> <span className="text-slate-300">= boto3.</span></div>
              <div className="pl-3"><span className="text-slate-400">  client(</span></div>
              <div className="pl-5"><span className="text-green-400">'eks'</span><span className="text-slate-400">,</span></div>
              <div className="pl-5"><span className="text-slate-300">region</span><span className="text-slate-400">=</span></div>
              <div className="pl-5"><span className="text-green-400">'eu-west-2'</span></div>
              <div className="pl-3"><span className="text-slate-400">)</span></div>
              <div className="mt-1 pl-3"><span className="text-slate-300">return</span> <span className="text-blue-300">eks</span><span className="text-slate-300">.</span></div>
              <div className="pl-3"><span className="text-yellow-300">update_kubeconfig</span><span className="text-slate-400">(</span></div>
              <div className="pl-5"><span className="text-slate-300">name</span><span className="text-slate-400">=</span><span className="text-blue-300">env</span></div>
              <div className="pl-3"><span className="text-slate-400">)</span></div>
              <div className="mt-2"><span className="text-slate-500 animate-pulse">█</span></div>
            </div>
          )}
        </div>

        {/* Terminal window — right-anchored, overlaps the card */}
        <div className="absolute top-2 right-0 z-20" aria-label="Terraform plan terminal output">
          <TerminalWindow lines={terminalLines} />
        </div>

        {/* Pipeline diagram — bottom-right, overlaps the card */}
        <div className="absolute bottom-2 right-0 z-20" aria-label="Deploy pipeline: GitHub / Azure DevOps, Terraform, Azure AKS, AWS EKS">
          <ArchitectureDiagram />
        </div>

      </div>
    </div>
  )
}
