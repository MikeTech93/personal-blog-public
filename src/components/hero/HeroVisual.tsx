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

      {/* Avatar card — centered in the column */}
      <div className="relative z-10 w-52 h-[300px] lg:w-60 lg:h-[330px] xl:w-64 xl:h-[350px] rounded-2xl overflow-hidden border border-slate-700/40 shadow-2xl shadow-blue-950/60">
        {showPhoto ? (
          <img
            src={avatarSrc}
            alt={`${name} — profile photo`}
            className="w-full h-full object-cover object-top"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-full h-full bg-black flex items-center justify-center p-6">
            <img
              src="/favicon.png"
              alt="MikeTech93 logo"
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        )}
      </div>

      {/* Terminal window — overlapping top-right */}
      <div
        className="absolute top-2 right-0 z-20 lg:-right-2 xl:-right-6"
        aria-label="Terraform plan terminal output"
      >
        <TerminalWindow lines={terminalLines} />
      </div>

      {/* Pipeline diagram — overlapping bottom-right */}
      <div
        className="absolute bottom-2 right-0 z-20 lg:-right-2 xl:-right-6"
        aria-label="Deploy pipeline: GitHub / Azure DevOps, Terraform, Azure AKS, AWS EKS"
      >
        <ArchitectureDiagram />
      </div>
    </div>
  )
}
