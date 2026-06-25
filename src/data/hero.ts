import {
  FileText,
  Code2,
  ShieldCheck,
  CalendarDays,
  Users,
} from 'lucide-react'
import type { HeroData } from '@/types/hero'

export const heroData: HeroData = {
  name: 'MikeTech93',
  title: 'Senior DevOps Engineer',
  subtitle: 'Platform Engineer • Cloud Architect • Technical Educator',
  badge: 'DEVOPS / PLATFORM ENGINEER',
  headline: {
    before: 'Platform Engineer sharing ',
    highlight: 'practical lessons',
    after:
      ' on cloud, automation, Kubernetes, and modern infrastructure.',
  },
  description:
    'I build scalable platforms, automate everything, and share real-world lessons from the trenches to help engineers level up and build with confidence.',
  cta: {
    primary: { label: 'Read Articles', href: '/blog' },
    secondary: { label: 'Follow on LinkedIn', href: 'https://www.linkedin.com/in/mike-etherington/' },
  },
  stats: [
    { value: '1+', label: 'Articles Published', Icon: FileText },
    { value: '1+', label: 'Tutorials Written', Icon: Code2 },
    { value: '2', label: 'Certifications', Icon: ShieldCheck },
    { value: '15+', label: 'Years of Experience', Icon: CalendarDays },
    { value: '1K+', label: 'LinkedIn Followers', Icon: Users },
  ],
  terminal: [
    { type: 'command', content: 'terraform plan' },
    { type: 'add', content: 'aws_eks_cluster.platform' },
    { type: 'add', content: 'kubernetes_namespace.platform' },
    { type: 'add', content: 'azurerm_kubernetes_cluster.aks' },
    { type: 'add', content: 'aws_iam_role.platform' },
    { type: 'blank', content: '' },
    {
      type: 'output',
      content: 'Plan: 28 to add, 0 to change, 0 to destroy.',
    },
    { type: 'cursor', content: '' },
  ],
  archNodes: [
    { id: 'user', label: 'User', sublabel: '', variant: 'user' },
    { id: 'azure', label: 'Azure', sublabel: 'AKS', variant: 'azure' },
    { id: 'aws', label: 'aws', sublabel: 'EKS', variant: 'aws' },
    { id: 'terraform', label: 'Terraform', sublabel: '', variant: 'terraform' },
    { id: 'github', label: 'GitHub', sublabel: '', variant: 'github' },
  ],
  // Drop your photo at public/avatar.jpg and uncomment:
  // avatarSrc: '/avatar.jpg',
  linkedInUrl: 'https://www.linkedin.com/in/mike-etherington/',
}
