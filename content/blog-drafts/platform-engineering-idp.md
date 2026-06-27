---
title: "What is Platform Engineering? Building an Internal Developer Platform"
description: "Platform engineering is more than DevOps with a new name. Learn how to build an IDP that eliminates cognitive load for your engineering teams and accelerates delivery."
date: "2026-06-01"
readTime: "9 min read"
tags: ["Platform Engineering", "IDP", "Developer Experience"]
category: "Platform Engineering"
featured: false
---

## Platform Engineering vs DevOps

DevOps is a culture and set of practices. Platform engineering is the product discipline that operationalises those practices as a self-service capability for developers. Where DevOps asks "how do we collaborate better?", platform engineering asks "how do we build the roads so teams move faster without needing to talk to us?"

The key shift is treating the platform as an **internal product**. Your engineering teams are your customers. The platform team exists to reduce their cognitive load — not to gatekeep.

## What is an Internal Developer Platform?

An IDP is the collection of tools, workflows, and abstractions that developers use to build, test, deploy, and operate software. A mature IDP typically covers:

- **Self-service infrastructure provisioning** — developers request environments without raising tickets
- **Standardised CI/CD pipelines** — templated pipelines with sensible defaults and escape hatches
- **Observability by default** — logging, metrics, and tracing wired up automatically
- **Secrets management** — no credentials in code, no manual vault setup
- **Environment management** — preview environments, PR environments, ephemeral namespaces

The goal is that a new developer can ship to production on day one, without needing to know what a VPC is.

## Golden Paths

The most effective IDPs are built around "golden paths" — opinionated, well-lit routes through the platform that work for 80% of use cases. They are:

- **Documented** — ideally with a portal (Backstage is the most common choice)
- **Tested** — the platform team dogfoods its own tools
- **Escapable** — teams can deviate with clear documentation of what they're taking on

The mistake most teams make is building a golden path that teams *have* to use, turning it into a bottleneck instead of an enabler.

## Technology Choices

A pragmatic IDP stack for an Azure-heavy organisation:

| Concern | Tool |
|---------|------|
| Service catalogue | Backstage |
| Infrastructure provisioning | Crossplane or Terraform Cloud |
| CI/CD pipelines | Azure DevOps / GitHub Actions |
| Kubernetes delivery | ArgoCD |
| Secrets | Azure Key Vault + CSI driver |
| Observability | Prometheus, Grafana, Loki |

## Measuring Success

Platform engineering should improve measurable outcomes, not just technology choices. Track:

- **DORA metrics** — deployment frequency, lead time, change failure rate, MTTR
- **Cognitive load surveys** — direct developer feedback on friction
- **Ticket volume** — how many requests does the platform team still handle manually?

If deployments are faster but the platform team is still a bottleneck for every environment request, the IDP isn't working yet.

## Where to Start

Start small. Before building a Backstage instance, ask which manual process causes the most friction today. Is it environment creation? Debugging production? Secret rotation? Pick one, automate it well, and ship it. Then iterate.

The best IDPs are built incrementally by teams that listen to their customers. The worst are big-bang migrations no one asked for.
