---
title: "GitOps at Scale: ArgoCD on AWS EKS for 50+ Microservices"
description: "How we adopted GitOps to manage 50+ microservices on EKS using ArgoCD, ApplicationSets, and sync waves, with lessons learned the hard way."
date: "2026-05-20"
readTime: "11 min read"
tags: ["GitOps", "ArgoCD", "EKS", "AWS"]
category: "CI/CD"
featured: false
---

## Why GitOps?

Before GitOps, our deployment process was a collection of Jenkins jobs, shell scripts, and institutional knowledge. Deploying a new microservice meant knowing which job to trigger, which environment variables to set, and which person to ask when something went wrong at midnight.

GitOps flips the model. The cluster state is declared in Git. ArgoCD continuously reconciles the actual state with the desired state. Deployments become pull requests. Rollbacks become reverts. Audit trails come free.

## ArgoCD Architecture on EKS

We run a single ArgoCD control plane on a dedicated management cluster (an EKS cluster with no workloads). It manages applications across three target clusters: dev, staging, and production.

This "hub and spoke" model means:
- Credentials for target clusters are stored once in the management cluster
- ArgoCD itself has no footprint on workload clusters (less blast radius)
- The management cluster can be tightly locked down with network policies

## ApplicationSets: The Key to Scale

With 50+ microservices, creating an `Application` resource per service per environment would mean hundreds of YAML files to maintain. `ApplicationSet` solves this with generators.

We use the **Git Directory generator** — it reads a config repo and creates one ArgoCD Application per directory:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: ApplicationSet
metadata:
  name: microservices
  namespace: argocd
spec:
  generators:
    - git:
        repoURL: https://github.com/org/platform-config
        revision: HEAD
        directories:
          - path: "apps/*/overlays/production"
  template:
    metadata:
      name: "{{path.basenameNormalized}}"
    spec:
      project: production
      source:
        repoURL: https://github.com/org/platform-config
        targetRevision: HEAD
        path: "{{path}}"
      destination:
        server: https://production.eks.internal
        namespace: "{{path[1]}}"
      syncPolicy:
        automated:
          prune: true
          selfHeal: true
```

Adding a new service is now as simple as creating a directory in the config repo. ArgoCD picks it up automatically.

## Sync Waves for Ordered Rollouts

Some deployments have ordering requirements: databases before applications, CRDs before operators. ArgoCD sync waves handle this with an annotation:

```yaml
metadata:
  annotations:
    argocd.argoproj.io/sync-wave: "1"
```

Lower numbers sync first. We use waves 0-2 for infrastructure (namespaces, RBAC, secrets), 3-5 for databases and shared services, 6-9 for application workloads.

## Lessons Learned

**1. Drift detection is only useful if you act on it.** We initially set `selfHeal: false` and used ArgoCD as a visualisation tool. Drift accumulated silently. Turn on self-healing in non-prod immediately, and have a plan for prod.

**2. Image tag management is a solved problem.** We wasted time on custom scripts to update image tags in Git. Argo CD Image Updater handles this with a write-back commit strategy — it updates the image tag in the config repo and ArgoCD reconciles the change.

**3. Secrets don't belong in Git, even encrypted.** We briefly tried `git-crypt`. It works but creates key management problems. External Secrets Operator pulling from AWS Secrets Manager is the right answer — the secret definition is in Git, the value is not.

**4. AppProjects are not optional.** ArgoCD `AppProject` resources restrict which clusters and namespaces each application can deploy to. Without them, a misconfigured application could deploy anywhere. Set these up before you have more than a few applications.

## The Result

Deployment frequency went from weekly batch releases to 15-20 deploys per day. Lead time from merge to production dropped from 4 hours to 12 minutes. The on-call burden dropped significantly because rollbacks are now a one-line git revert instead of a co-ordinated manual procedure.

GitOps is the right model for operating Kubernetes at scale. ArgoCD is the best implementation of it we've found.
