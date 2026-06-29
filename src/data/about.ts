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

export interface Experience {
  role: string
  company: string
  period: string
  current?: boolean
  bullets: string[]
  tags: string[]
}

export interface Certification {
  name: string
  issuer: string
  year: string
  color: string
}

export interface Skill {
  label: string
  Icon?: React.ComponentType<{ className?: string }>
  color: string
}

export const EXPERIENCE: Experience[] = [
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

export const CERTS: Certification[] = [
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

export const SKILLS: Skill[] = [
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
