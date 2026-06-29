import type { SVGProps } from 'react'

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

export function AzureIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <defs>
        <linearGradient
          id="azure-a"
          x1="0.941"
          y1="0.637"
          x2="0.427"
          y2="1.073"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#114A8B" />
          <stop offset="1" stopColor="#0669BC" />
        </linearGradient>
        <linearGradient
          id="azure-b"
          x1="0.5"
          y1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopOpacity=".3" />
          <stop offset="0.071" stopOpacity=".2" />
          <stop offset="0.321" stopOpacity=".1" />
          <stop offset="0.623" stopOpacity=".05" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="azure-c"
          x1="0.172"
          y1="0.18"
          x2="0.853"
          y2="0.981"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0" stopColor="#3CCBF4" />
          <stop offset="1" stopColor="#2892DF" />
        </linearGradient>
      </defs>
      <path
        d="M33.338 6.544H58.84L33.983 89.456a3.988 3.988 0 0 1-3.789 2.741H8.027a3.985 3.985 0 0 1-3.78-5.228l22.092-73.912A3.988 3.988 0 0 1 30.13 9.286a4 4 0 0 1 3.208-2.742z"
        fill="url(#azure-a)"
      />
      <path
        d="M71.11 60.498H29.599a1.84 1.84 0 0 0-1.255 3.185l26.556 24.83a4.018 4.018 0 0 0 2.739 1.081h23.483z"
        fill="#0078D4"
      />
      <path
        d="M33.338 6.544a3.963 3.963 0 0 0-3.225 2.795L4.28 82.978a3.983 3.983 0 0 0 3.75 5.219h20.427a4.278 4.278 0 0 0 3.288-2.816l4.919-14.501 17.6 16.44a4.08 4.08 0 0 0 2.632.977H80.1L71.022 60.5l-29.606-.007L58.892 6.544z"
        fill="url(#azure-b)"
      />
      <path
        d="M65.868 9.286a3.988 3.988 0 0 0-3.787-2.742H33.648a3.988 3.988 0 0 1 3.787 2.742l22.105 73.914a3.985 3.985 0 0 1-3.781 5.228h28.433a3.985 3.985 0 0 0 3.781-5.228z"
        fill="url(#azure-c)"
      />
    </svg>
  )
}

export function AwsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path
        d="M29.0 42.8c0 1.3.1 2.4.4 3.1.3.7.7 1.5 1.2 2.3.2.3.3.6.3.9 0 .4-.2.8-.7 1.2l-2.3 1.5c-.3.2-.6.3-.9.3-.4 0-.7-.2-1-.5-.5-.5-.9-1.1-1.2-1.7-.3-.6-.6-1.3-.9-2.1-2.2 2.6-5.1 3.9-8.4 3.9-2.4 0-4.3-.7-5.7-2-.1-.1-.2-.3-.3-.4-1.3-1.5-1.9-3.4-1.9-5.7 0-2.5.9-4.5 2.6-6.1 1.7-1.6 4-2.4 6.9-2.4.9 0 1.9.1 2.9.2 1 .1 2.1.4 3.2.6v-2c0-2.1-.4-3.5-1.3-4.4-.9-.9-2.4-1.3-4.5-1.3-1 0-2 .1-3 .4-1 .3-2 .6-2.9 1-.4.2-.8.3-1 .4-.2.1-.4.1-.5.1-.5 0-.7-.3-.7-.9v-1.5c0-.5.1-.8.3-1 .2-.2.6-.4 1.1-.6 1-.5 2.2-.9 3.6-1.2 1.4-.3 2.9-.5 4.4-.5 3.3 0 5.8.8 7.3 2.3 1.5 1.5 2.3 3.8 2.3 6.9v9.1zm-11.6 4.4c.9 0 1.8-.2 2.8-.5 1-.4 1.9-.9 2.6-1.7.4-.5.7-1 .9-1.7.2-.6.3-1.4.3-2.3v-1.1c-.8-.2-1.6-.3-2.5-.4-.9-.1-1.7-.2-2.5-.2-1.8 0-3.1.4-4 1.1-.9.7-1.3 1.7-1.3 3 0 1.2.3 2.1.9 2.7.6.7 1.5 1.1 2.8 1.1zm21.6 2.9c-.5 0-.8-.1-1.1-.3-.3-.2-.5-.5-.7-1l-7.6-25c-.2-.5-.3-.9-.3-1.1 0-.5.2-.7.7-.7h3c.5 0 .9.1 1.1.3.3.2.4.5.6 1l5.4 21.4 5-21.4c.1-.5.3-.8.6-1 .3-.2.7-.3 1.2-.3h2.4c.5 0 .9.1 1.2.3.3.2.5.5.6 1l5.1 21.6 5.6-21.6c.2-.5.4-.8.6-1 .3-.2.6-.3 1.1-.3h2.8c.5 0 .7.2.7.7 0 .1 0 .3-.1.5-.1.2-.2.4-.3.7l-7.8 25c-.2.5-.4.8-.7 1-.3.2-.6.3-1.1.3h-2.6c-.5 0-.9-.1-1.2-.3-.3-.2-.5-.5-.6-1.1l-5-20.7-4.9 20.7c-.1.5-.3.9-.6 1.1-.3.2-.7.3-1.2.3h-2.5zm41.5.9c-1.5 0-3-.2-4.4-.5-1.4-.3-2.5-.7-3.3-1.1-.5-.3-.8-.6-.9-1-.1-.3-.2-.7-.2-1v-1.6c0-.6.2-.9.7-.9.2 0 .4 0 .6.1.2.1.4.2.7.3 1 .4 2 .7 3.1 1 1.2.2 2.3.3 3.4.3 1.8 0 3.2-.3 4.2-.9 1-.6 1.5-1.5 1.5-2.7 0-.8-.2-1.5-.7-2-.5-.5-1.4-1-2.8-1.5l-4-1.2c-2-.6-3.5-1.5-4.4-2.8-.9-1.2-1.4-2.6-1.4-4.1 0-1.2.3-2.2.8-3.1.5-.9 1.2-1.7 2.1-2.3.9-.6 1.9-1.1 3.1-1.4 1.2-.3 2.4-.5 3.7-.5.7 0 1.4.1 2.1.1.7.1 1.3.2 1.9.4.6.1 1.1.3 1.6.5.5.2.8.4 1.1.5.4.2.6.4.7.6.1.2.2.5.2.8v1.5c0 .6-.2.9-.7.9-.2 0-.6-.1-1.1-.3-1.7-.8-3.6-1.2-5.6-1.2-1.6 0-2.9.3-3.8.8-.9.6-1.3 1.4-1.3 2.5 0 .8.3 1.5.8 2.1.5.5 1.5 1 3 1.5l3.9 1.2c2 .6 3.4 1.5 4.3 2.7.9 1.2 1.3 2.5 1.3 4 0 1.2-.2 2.3-.8 3.2-.5.9-1.3 1.8-2.2 2.4-.9.7-2 1.2-3.3 1.5-1.3.4-2.7.6-4.1.6z"
        fill="#252F3E"
      />
      <path
        d="M90.8 65.4C79.9 73.5 63.9 77.8 50.2 77.8c-18.9 0-35.9-7-48.8-18.6-.9-.8-.1-2 1-.9 13.9 8.1 31.1 13 48.9 13 12 0 25.2-2.5 37.3-7.6 1.8-.8 3.4 1.2 1.2 2.7z"
        fill="#FF9900"
      />
      <path
        d="M94.9 60.7c-1.3-1.6-8.4-0.8-11.6-.4-.9.1-1.1-.7-.2-1.3 5.7-4 15.1-2.8 16.2-1.5 1.1 1.3-.3 10.7-5.6 15.2-.8.7-1.6.3-1.2-.6 1.2-2.9 3.8-9.8 2.4-11.4z"
        fill="#FF9900"
      />
    </svg>
  )
}

export function TerraformIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      fill="none"
      aria-hidden="true"
      {...props}
    >
      <path d="M77.941 44.5v36.836L46.324 62.918V26.082zm0 0" fill="#4040B2" />
      <path d="M82.059 81.336l31.633-18.418V26.082L82.059 44.5zm0 0" fill="#5C4EE5" />
      <path d="M14.308 26.836L45.94 45.254V8.418L14.308 26.836zm0 0" fill="#5C4EE5" />
      <path d="M46.324 100.418L77.941 118.836V82l-31.617-18.418zm0 0" fill="#4040B2" />
    </svg>
  )
}

export function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
}

export function DockerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.186.186 0 0 0-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 0 0-.75.748 11.376 11.376 0 0 0 .692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 0 0 3.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z" fill="#2496ED" />
    </svg>
  )
}

export function KubernetesIcon(props: SVGProps<SVGSVGElement>) {
  const spokes = Array.from({ length: 7 }, (_, i) => {
    const rad = ((i * 360) / 7) * (Math.PI / 180)
    return {
      x1: (12 + 4 * Math.cos(rad)).toFixed(2),
      y1: (12 + 4 * Math.sin(rad)).toFixed(2),
      x2: (12 + 9.5 * Math.cos(rad)).toFixed(2),
      y2: (12 + 9.5 * Math.sin(rad)).toFixed(2),
    }
  })
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10.5" stroke="#326CE5" strokeWidth="1.5" />
      {spokes.map((s, i) => (
        <line key={i} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} stroke="#326CE5" strokeWidth="1.8" strokeLinecap="round" />
      ))}
      <circle cx="12" cy="12" r="2.5" fill="#326CE5" />
    </svg>
  )
}

export function PythonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.89S0 5.789 0 11.969c0 6.18 3.403 5.959 3.403 5.959h2.027v-2.867s-.109-3.402 3.35-3.402h5.769s3.24.052 3.24-3.13V3.13S18.28 0 11.914 0zm-3.2 1.812a1.04 1.04 0 1 1 0 2.08 1.04 1.04 0 0 1 0-2.08z" fill="#3776AB" />
      <path d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752H12v-.826h8.131S24 18.211 24 12.031c0-6.18-3.403-5.959-3.403-5.959h-2.027v2.867s.109 3.402-3.35 3.402H9.451s-3.24-.052-3.24 3.13v5.399S5.72 24 12.086 24zm3.2-1.812a1.04 1.04 0 1 1 0-2.08 1.04 1.04 0 0 1 0 2.08z" fill="#FFD43B" />
    </svg>
  )
}

export function JavaScriptIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <rect width="24" height="24" fill="#F7DF1E" />
      <path d="M22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" fill="#323330" />
    </svg>
  )
}

export function CSharpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M22.394 6a2.88 2.88 0 0 0-.29-.488 2.93 2.93 0 0 0-.41-.41L13.32.29A2.93 2.93 0 0 0 12 0a2.93 2.93 0 0 0-1.32.29L2.306 5.102a2.93 2.93 0 0 0-1.32 2.546v9.704a2.926 2.926 0 0 0 .29.874 2.929 2.929 0 0 0 1.03 1.083l8.374 4.812a2.93 2.93 0 0 0 2.64 0l8.374-4.812a2.929 2.929 0 0 0 1.32-2.543V7.648A2.93 2.93 0 0 0 22.394 6zm-7.418 9.748a4.784 4.784 0 0 1-2.313.601 4.836 4.836 0 0 1-2.439-.63 4.639 4.639 0 0 1-1.741-1.74 4.879 4.879 0 0 1 0-4.878 4.636 4.636 0 0 1 1.74-1.74A4.836 4.836 0 0 1 12.663 6.7c.832 0 1.641.214 2.353.62l-1.169 2.025a2.637 2.637 0 0 0-1.184-.287 2.571 2.571 0 0 0-1.312.343 2.463 2.463 0 0 0-.923.943 2.658 2.658 0 0 0 0 2.604 2.46 2.46 0 0 0 .923.942c.397.228.849.347 1.312.343a2.642 2.642 0 0 0 1.194-.286l1.169 2.025-.004-.003zm4.282-4.457h-.75v.75h-.75v-.75H17v-.75h.758V9.79h.75v.75h.75v.751zm2.45 0h-.75v.75h-.75v-.75h-.75v-.75h.75V9.79h.75v.75h.75v.751z" fill="#512BD4" />
    </svg>
  )
}

export function PowerShellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="3" fill="#012456" />
      <path d="M5 9l5 3-5 3" stroke="#5391FE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15h7" stroke="#5391FE" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function BashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="3" fill="#1D1D1D" />
      <path d="M5 7.5l4 4-4 4" stroke="#4EAA25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 15.5h7" stroke="#4EAA25" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function SnowflakeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      {[0, 60, 120].map((angle) => (
        <g key={angle} transform={`rotate(${angle} 12 12)`}>
          <line x1="12" y1="2" x2="12" y2="22" stroke="#29B5E8" strokeWidth="2" strokeLinecap="round" />
          <line x1="9" y1="5.5" x2="12" y2="3" stroke="#29B5E8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="5.5" x2="12" y2="3" stroke="#29B5E8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9" y1="18.5" x2="12" y2="21" stroke="#29B5E8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15" y1="18.5" x2="12" y2="21" stroke="#29B5E8" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      ))}
      <circle cx="12" cy="12" r="1.5" fill="#29B5E8" />
    </svg>
  )
}

export function MySQLIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      {/* Dolphin body arc */}
      <path d="M5 15C5 10.029 9.029 6 14 6c2.5 0 4.5 1 5.5 2.5" stroke="#4479A1" strokeWidth="1.8" strokeLinecap="round" />
      {/* Tail */}
      <path d="M5 15C5 17 6 19 7 19c0 0-2.5 1.5-4 2.5 2.5-.5 5-1.5 6-1.5 1 0 1.5 1.5 1.5 1.5" stroke="#4479A1" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dorsal fin */}
      <path d="M15.5 6.5C16 4 18.5 2.5 20 3.5" stroke="#4479A1" strokeWidth="1.5" strokeLinecap="round" />
      {/* Belly highlight */}
      <path d="M7 15.5C8 13 11 11 14 11" stroke="#4479A1" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      {/* Eye */}
      <circle cx="16" cy="9" r="1" fill="#4479A1" />
    </svg>
  )
}

export function LinuxIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      {/* Body */}
      <ellipse cx="12" cy="16.5" rx="6" ry="5.5" fill="#1a1a1a" />
      {/* White belly */}
      <ellipse cx="12" cy="17.5" rx="3.8" ry="4" fill="#f0f0f0" />
      {/* Head */}
      <circle cx="12" cy="8" r="4.5" fill="#1a1a1a" />
      {/* Eyes */}
      <circle cx="10.5" cy="7.2" r="1.1" fill="white" />
      <circle cx="13.5" cy="7.2" r="1.1" fill="white" />
      <circle cx="10.7" cy="7.3" r="0.55" fill="#222" />
      <circle cx="13.7" cy="7.3" r="0.55" fill="#222" />
      {/* Beak */}
      <path d="M10.5 10Q12 11.5 13.5 10" fill="#F5A623" />
      {/* Feet */}
      <path d="M8.5 21.5H7l-1 1.5" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 21.5H17l1 1.5" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function WindowsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" fill="#0078D4" />
    </svg>
  )
}

export function AzureDevOpsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      {/* Top arc */}
      <path d="M4.5 12C4.5 7.806 7.806 4.5 12 4.5s7.5 3.306 7.5 7.5" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" />
      {/* Bottom arc */}
      <path d="M19.5 12c0 4.194-3.306 7.5-7.5 7.5S4.5 16.194 4.5 12" stroke="#0078D4" strokeWidth="2" strokeLinecap="round" />
      {/* Arrowhead top-right */}
      <path d="M17 8l2.5 4-4 .5" stroke="#0078D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Arrowhead bottom-left */}
      <path d="M7 16l-2.5-4 4-.5" stroke="#0078D4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function ElasticsearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11" fill="#343741" />
      <rect x="5.5" y="7" width="13" height="2.5" rx="1.25" fill="#FED10A" />
      <rect x="5.5" y="10.75" width="10.5" height="2.5" rx="1.25" fill="#FED10A" />
      <rect x="5.5" y="14.5" width="13" height="2.5" rx="1.25" fill="#FED10A" />
    </svg>
  )
}

export function OpenSearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="10" cy="10" r="7" stroke="#003B5C" strokeWidth="2" />
      <path d="M15.5 15.5L21 21" stroke="#003B5C" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M7 10a3 3 0 0 1 3-3" stroke="#FF6B35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

export function AdobeConnectIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0l3.892 9.144zm14.116 0h-8.884l-5.772 13.68h3.116l1.352-3.205h5.844l1.352 3.205H24z" fill="#FF0000" />
    </svg>
  )
}

export function SqlIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      {/* Cylinder body */}
      <path d="M3 8v8c0 2.21 4.03 4 9 4s9-1.79 9-4V8" fill="#4479A1" opacity="0.6" />
      {/* Mid ring line */}
      <path d="M3 13c0 2.21 4.03 4 9 4s9-1.79 9-4" stroke="#6ba5d4" strokeWidth="1" />
      {/* Top ellipse */}
      <ellipse cx="12" cy="8" rx="9" ry="3.5" fill="#4479A1" />
    </svg>
  )
}

export function UnixIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect width="24" height="24" rx="3" fill="#1D1D1D" />
      <path d="M4.5 7.5l3 3-3 3" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 13.5h5" stroke="#aaa" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function UserCircleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        clipRule="evenodd"
      />
    </svg>
  )
}
