import { SiteLayout } from '@/components/layout/SiteLayout'
import { ExternalLink, MapPin, Briefcase, Award } from 'lucide-react'
import {
  AzureIcon,
  AwsIcon,
  TerraformIcon,
  GitHubIcon,
  DockerIcon,
  KubernetesIcon,
  PythonIcon,
  JavaScriptIcon,
  CSharpIcon,
  PowerShellIcon,
  BashIcon,
  SnowflakeIcon,
  MySQLIcon,
  LinuxIcon,
  WindowsIcon,
  AzureDevOpsIcon,
  ElasticsearchIcon,
  OpenSearchIcon,
  AdobeConnectIcon,
  SqlIcon,
  UnixIcon,
} from '@/components/icons/BrandIcons'

// ---- Types ------------------------------------------------------------------

interface Experience {
  role: string
  company: string
  period: string
  current?: boolean
  bullets: string[]
  tags: string[]
}

interface Certification {
  name: string
  issuer: string
  year: string
  color: string
}

interface Skill {
  label: string
  Icon?: React.ComponentType<{ className?: string }>
  color: string
}

// ---- Data -------------------------------------------------------------------

const EXPERIENCE: Experience[] = [
  {
    role: 'Lead DevOps Engineer',
    company: 'The Virtual Forge',
    period: 'Jun 2024 - Present',
    current: true,
    bullets: [
      'Lead and mentor the DevOps engineering team, shaping how we build, deploy, and operate software across cloud environments.',
      'Design, build, and maintain cloud infrastructure in AWS and Azure.',
      'Drive Infrastructure as Code adoption using Terraform, AWS CDK, CloudFormation, and Bicep.',
      'Develop and improve CI/CD pipelines using Azure DevOps and GitHub Actions.',
      'Build and operate container platforms using Docker and Kubernetes.',
      'Implement monitoring, logging, and observability solutions with Prometheus, Grafana, CloudWatch, and Azure Monitor.',
      'Contribute to technical strategy, architecture decisions, and platform roadmaps.',
    ],
    tags: ['AWS', 'Azure', 'Terraform', 'Kubernetes', 'Docker', 'Azure DevOps', 'GitHub Actions', 'AWS CDK', 'Bicep', 'Python'],
  },
  {
    role: 'DevOps Engineer',
    company: 'The Virtual Forge',
    period: 'Mar 2022 - Jun 2024',
    bullets: [
      'Built and maintained cloud infrastructure across AWS and Azure for a range of client projects.',
      'Developed and improved CI/CD pipelines to support faster and more reliable software delivery.',
      'Implemented Infrastructure as Code using Terraform, CloudFormation, AWS CDK, and ARM/Bicep.',
      'Supported containerised workloads using Docker and Kubernetes.',
      'Implemented monitoring, logging, and alerting solutions to improve operational visibility.',
      'Contributed to cloud migration and modernisation projects.',
      'Automated manual processes and improved deployment workflows in collaboration with development teams.',
    ],
    tags: ['AWS', 'Azure', 'Terraform', 'Docker', 'Kubernetes', 'Azure DevOps', 'GitHub Actions', 'Python', 'PowerShell'],
  },
  {
    role: 'Junior DevOps Engineer',
    company: 'The Virtual Forge',
    period: 'Mar 2021 - Mar 2022',
    bullets: [
      'Provided day-to-day operational support for cloud-hosted applications and infrastructure in AWS and Azure.',
      'Assisted with software deployments across development, test, and production environments.',
      'Supported the maintenance and improvement of CI/CD pipelines.',
      'Monitored platform health and investigated application and infrastructure issues.',
      'Assisted with infrastructure provisioning, configuration, and automation initiatives.',
      'Created and maintained technical documentation and operational runbooks.',
    ],
    tags: ['AWS', 'Azure', 'Azure DevOps', 'Docker', 'Terraform', 'PowerShell', 'Bash', 'Linux'],
  },
  {
    role: 'Technical Consultant',
    company: 'Evaporate',
    period: 'Jun 2018 - Jan 2020',
    bullets: [
      'Progressed from Technical Support Specialist to take on 3rd-line support and complex technical challenges.',
      'Worked closely with customers to understand business requirements and develop tailored project plans.',
      'Led implementations including desktop hardware refreshes, server upgrades, cloud migrations, and hosting solutions.',
      'Managed and optimised cloud environments and customer-hosted websites for high availability and performance.',
      'Used RMM tools to identify potential issues and implement automation strategies to improve system reliability.',
      'Contributed to R&D efforts, evaluating and integrating emerging technologies into service offerings.',
    ],
    tags: ['Cloud Infrastructure', 'RMM', 'Project Management', 'Application Support', 'Automation'],
  },
  {
    role: 'Technical Support Specialist',
    company: 'Thirdline',
    period: 'May 2016 - Jun 2017',
    bullets: [
      'Handled 1st, 2nd, and 3rd line support requests across IT and application-level needs for an MSP.',
      'Supported diverse IT domains including desktop/server maintenance, broadband, telecoms, and application support.',
      'Used RMM tools extensively to analyse system alerts and implement automation to prevent issues proactively.',
      'Managed and maintained cloud environments and customer-hosted websites for availability and performance.',
      'Provided application-level support for business-critical software across the client base.',
    ],
    tags: ['MSP', 'RMM', '3rd Line Support', 'Windows Server', 'Linux', 'Web Hosting'],
  },
  {
    role: 'IT Network Engineer',
    company: 'Latchways Group',
    period: 'Mar 2012 - May 2016',
    bullets: [
      'Provided infrastructure support and development for 250+ users across six offices.',
      'Managed a Microsoft-based environment including SCCM, IIS, SQL Server, Dynamics CRM, Skype for Business, and Office 365.',
      'Managed and developed non-Microsoft applications including Sage 1000 ERP, SAP, Crystal Reports, and Windchill PDM.',
      'Troubleshot and resolved application issues, minimising downtime and disruption.',
      'Delivered user training and technical guidance to maximise the effectiveness of IT resources.',
    ],
    tags: ['Windows Server', 'SCCM', 'SQL Server', 'Dynamics CRM', 'Office 365', 'SAP'],
  },
  {
    role: 'Unix Systems Engineer',
    company: 'Tinglobal',
    period: 'Mar 2011 - Mar 2012',
    bullets: [
      'Worked extensively with Unix-based hardware and software, focusing on Sun, Oracle, and HP equipment.',
      'Tested, stripped, and catalogued Unix-based equipment ranging from workstations to fully loaded server racks.',
      'Performed complete rack builds ensuring proper assembly, cabling, and integration.',
      'Conducted Solaris configurations to prepare systems for deployment in customer environments.',
    ],
    tags: ['Unix', 'Solaris', 'Sun', 'Oracle', 'HP', 'Server Hardware'],
  },
]

const CERTS: Certification[] = [
  {
    name: 'AZ-104',
    issuer: 'Azure Administrator Associate',
    year: '2023',
    color: 'border-blue-500/40 bg-blue-950/30',
  },
  {
    name: 'AWS SAA',
    issuer: 'Solutions Architect Associate',
    year: '2023',
    color: 'border-orange-500/40 bg-orange-950/20',
  },
]

const SKILLS: Skill[] = [
  { label: 'AWS', Icon: AwsIcon, color: 'border-orange-500/30 hover:border-orange-400/60' },
  { label: 'Azure', Icon: AzureIcon, color: 'border-blue-500/30 hover:border-blue-400/60' },
  { label: 'Azure DevOps', Icon: AzureDevOpsIcon, color: 'border-blue-400/30 hover:border-blue-300/60' },
  { label: 'Python', Icon: PythonIcon, color: 'border-yellow-500/30 hover:border-yellow-400/60' },
  { label: 'Docker', Icon: DockerIcon, color: 'border-blue-500/30 hover:border-blue-400/60' },
  { label: 'Kubernetes', Icon: KubernetesIcon, color: 'border-blue-400/30 hover:border-blue-300/60' },
  { label: 'JavaScript', Icon: JavaScriptIcon, color: 'border-yellow-400/30 hover:border-yellow-300/60' },
  { label: 'C#', Icon: CSharpIcon, color: 'border-purple-400/30 hover:border-purple-300/60' },
  { label: 'PowerShell', Icon: PowerShellIcon, color: 'border-blue-400/30 hover:border-blue-300/60' },
  { label: 'Terraform', Icon: TerraformIcon, color: 'border-purple-500/30 hover:border-purple-400/60' },
  { label: 'Bash', Icon: BashIcon, color: 'border-slate-400/30 hover:border-slate-300/60' },
  { label: 'Snowflake', Icon: SnowflakeIcon, color: 'border-cyan-400/30 hover:border-cyan-300/60' },
  { label: 'SQL', Icon: SqlIcon, color: 'border-orange-400/30 hover:border-orange-300/60' },
  { label: 'MySQL', Icon: MySQLIcon, color: 'border-orange-300/30 hover:border-orange-200/60' },
  { label: 'Adobe Connect', Icon: AdobeConnectIcon, color: 'border-red-400/30 hover:border-red-300/60' },
  { label: 'Elasticsearch', Icon: ElasticsearchIcon, color: 'border-yellow-500/30 hover:border-yellow-400/60' },
  { label: 'OpenSearch', Icon: OpenSearchIcon, color: 'border-blue-300/30 hover:border-blue-200/60' },
  { label: 'Linux', Icon: LinuxIcon, color: 'border-yellow-400/30 hover:border-yellow-300/60' },
  { label: 'Windows', Icon: WindowsIcon, color: 'border-blue-300/30 hover:border-blue-200/60' },
  { label: 'Unix', Icon: UnixIcon, color: 'border-slate-400/30 hover:border-slate-300/60' },
  { label: 'GitHub', Icon: GitHubIcon, color: 'border-slate-500/30 hover:border-slate-400/60' },
]

// ---- Sub-components ---------------------------------------------------------

function AboutHero() {
  return (
    <section className="relative py-14 lg:py-20 border-b border-slate-800 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(30,41,59,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(30,41,59,0.2) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-700/5 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/60 border border-blue-800/50 text-blue-400 text-xs font-semibold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              About Me
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-slate-100">
              Building platforms that{' '}
              <span className="text-blue-400">engineers love</span> to use.
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              I am a DevOps and Platform Engineer with 15+ years of experience designing and operating infrastructure across Azure and AWS. I specialise in Terraform, Kubernetes, CI/CD automation, and data platforms. I share what I learn through posts on LinkedIn.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-400" strokeWidth={2} />
                South West, England
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-blue-400" strokeWidth={2} />
                Full Time Employed
              </span>
              <a
                href="https://www.linkedin.com/in/mike-etherington/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
              >
                LinkedIn
                <ExternalLink className="w-3 h-3" strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="w-64 h-72 lg:w-72 lg:h-80 rounded-2xl overflow-hidden border border-slate-700/40 shadow-2xl shadow-blue-950/40"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 60% at 50% 20%, #1d4ed840 0%, #0f172a 65%), linear-gradient(175deg, #1e3a5f 0%, #0f172a 50%, #030712 100%)',
                }}
              >
                {/* Placeholder silhouette */}
                <svg
                  viewBox="0 0 240 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMax meet"
                  aria-hidden="true"
                >
                  <ellipse cx="120" cy="110" rx="48" ry="52" fill="#1e293b" />
                  <ellipse cx="120" cy="70" rx="46" ry="22" fill="#0f172a" />
                  <ellipse cx="108" cy="95" rx="14" ry="18" fill="#263a52" opacity="0.6" />
                  <path d="M20 300 C20 210 220 210 220 300" fill="#1e293b" />
                  <path d="M38 295 C38 250 100 240 120 240 C140 240 202 250 202 295" fill="#263a52" opacity="0.4" />
                </svg>
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#0f172a] border border-slate-700/60 rounded-xl px-4 py-2.5 shadow-xl">
                <div className="text-xs text-slate-500 leading-none mb-0.5">LinkedIn Followers</div>
                <div className="text-lg font-bold text-slate-100">1K+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function AboutSkills() {
  return (
    <section className="py-16 border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-[2px] bg-blue-500 rounded-full" />
          <h2 className="text-xs font-semibold text-blue-400 tracking-widest uppercase">Tech Stack</h2>
        </div>
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

function AboutExperience() {
  return (
    <section className="py-16 border-b border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-[2px] bg-blue-500 rounded-full" />
          <h2 className="text-xs font-semibold text-blue-400 tracking-widest uppercase">Experience</h2>
        </div>
        <div className="space-y-6">
          {EXPERIENCE.map((job) => (
            <div
              key={job.company + job.role}
              className="relative p-6 rounded-xl border border-slate-800 bg-[#0f172a]/60 hover:border-slate-700 transition-colors"
            >
              {job.current && (
                <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Current
                </span>
              )}
              <div className="mb-4">
                <h3 className="text-lg font-bold text-slate-100">{job.role}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-slate-400">{job.company}</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-sm text-slate-500">{job.period}</span>
                </div>
              </div>
              <ul className="space-y-1.5 mb-4">
                {job.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm text-slate-400">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">-&gt;</span>
                    {b}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 rounded-md bg-slate-800/80 border border-slate-700/60 text-xs text-slate-400 font-mono"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutCertifications() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-8 h-[2px] bg-blue-500 rounded-full" />
          <h2 className="text-xs font-semibold text-blue-400 tracking-widest uppercase">Certifications</h2>
        </div>
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

// ---- Page -------------------------------------------------------------------

interface AboutPageProps {
  currentPath?: string
}

export function AboutPage({ currentPath = '/about' }: AboutPageProps) {
  return (
    <SiteLayout currentPath={currentPath}>
      <AboutHero />
      <AboutSkills />
      <AboutExperience />
      <AboutCertifications />
    </SiteLayout>
  )
}
