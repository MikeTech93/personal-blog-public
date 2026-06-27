---
title: "Crossplane: Managing Cloud Infrastructure from Kubernetes"
description: "How to use Crossplane as a control plane to provision Azure and AWS resources directly from Kubernetes manifests. A practical look at infrastructure-as-code in 2026."
date: "2026-03-15"
readTime: "13 min read"
tags: ["Crossplane", "Kubernetes", "Platform Engineering"]
category: "Platform Engineering"
featured: false
---

## What is Crossplane?

Crossplane is a CNCF project that turns your Kubernetes cluster into a universal control plane. Instead of using Terraform or ARM templates to provision cloud resources, you write Kubernetes manifests and apply them with `kubectl`. Crossplane reconciles them to reality.

The key mental model shift: **infrastructure is Kubernetes resources**. This means you get GitOps, RBAC, audit logs, and reconciliation loops for your cloud resources using the same tools your teams already use for workloads.

## When to Choose Crossplane over Terraform

Crossplane and Terraform are complementary, not competitors, but each has a sweet spot:

| Scenario | Better choice |
|----------|--------------|
| Platform teams exposing self-service infrastructure | Crossplane |
| One-off infrastructure provisioning | Terraform |
| Teams already all-in on GitOps with ArgoCD | Crossplane |
| Complex multi-cloud topology with shared modules | Terraform |
| Application teams that shouldn't need to learn IaC | Crossplane |

The decisive factor is usually organisational: if you want developers to provision databases without understanding Terraform state, Crossplane's Kubernetes-native UX wins.

## Installing Crossplane

```bash
helm repo add crossplane-stable https://charts.crossplane.io/stable
helm repo update

helm upgrade --install crossplane crossplane-stable/crossplane \
  --namespace crossplane-system \
  --create-namespace
```

Then install a provider. For Azure:

```bash
kubectl apply -f - <<EOF
apiVersion: pkg.crossplane.io/v1
kind: Provider
metadata:
  name: provider-azure-network
spec:
  package: xpkg.upbound.io/upbound/provider-azure-network:v1.6.0
EOF
```

Upbound maintains official providers for Azure, AWS, and GCP. Install only the sub-providers you need — `provider-azure` is monolithic; `provider-azure-network` is smaller and faster to install.

## Authentication to Azure

Create a `ProviderConfig` that tells Crossplane how to authenticate:

```yaml
apiVersion: azure.upbound.io/v1beta1
kind: ProviderConfig
metadata:
  name: default
spec:
  credentials:
    source: UserAssignedManagedIdentity
  clientID: <managed-identity-client-id>
  subscriptionID: <subscription-id>
  tenantID: <tenant-id>
```

Using a Managed Identity (with Workload Identity on AKS) is the cleanest approach — no client secrets to manage.

## Provisioning an Azure Resource Group

```yaml
apiVersion: azure.upbound.io/v1beta1
kind: ResourceGroup
metadata:
  name: rg-my-app-dev
spec:
  forProvider:
    location: uksouth
    tags:
      environment: dev
      managed-by: crossplane
  providerConfigRef:
    name: default
```

Apply it with `kubectl apply`, and Crossplane provisions the resource group in Azure. `kubectl get resourcegroup` shows its status.

## Composite Resources: The Platform Engineering Layer

The real power of Crossplane is **Composite Resources** (XR). These let platform teams define opinionated abstractions that hide complexity from developers.

Instead of asking developers to compose a VNet, subnet, NSG, and AKS cluster themselves, define a `KubernetesEnvironment` XR:

```yaml
apiVersion: apiextensions.crossplane.io/v1
kind: CompositeResourceDefinition
metadata:
  name: xkubernetesenvironments.platform.example.com
spec:
  group: platform.example.com
  names:
    kind: XKubernetesEnvironment
    plural: xkubernetesenvironments
  claimNames:
    kind: KubernetesEnvironment
    plural: kubernetesenvironments
  versions:
    - name: v1alpha1
      served: true
      referenceable: true
      schema:
        openAPIV3Schema:
          type: object
          properties:
            spec:
              type: object
              properties:
                environment:
                  type: string
                  enum: [dev, staging, prod]
                nodeCount:
                  type: integer
                  default: 2
```

A developer then provisions an environment with:

```yaml
apiVersion: platform.example.com/v1alpha1
kind: KubernetesEnvironment
metadata:
  name: team-payments-dev
spec:
  environment: dev
  nodeCount: 3
```

They don't need to know what resources are being created. The platform team controls that via the `Composition` resource.

## State and Drift

Crossplane stores state in the Kubernetes etcd (as resource status fields) and continuously reconciles. Unlike Terraform, there's no separate state file to manage, lock, or lose. Drift detection runs automatically on a configurable poll interval.

The trade-off: all state lives in the cluster. Back up etcd. Crossplane state is recreated if resources are re-applied, but recovery from a lost cluster requires care.

## When Crossplane Isn't the Answer

Crossplane has rough edges:
- Migrations between provider versions can be painful
- Debugging Composition logic requires reading Crossplane controller logs
- The Crossplane ecosystem is narrower than Terraform's for niche resources
- Large organisations with existing Terraform expertise and modules face a high switching cost

The best teams use Crossplane for developer-facing self-service abstractions and Terraform for platform-level infrastructure that changes rarely.
