---
title: "Building Production-Ready AKS Clusters with Terraform"
description: "A deep-dive into standing up enterprise-grade Azure Kubernetes Service clusters using Terraform, covering node pools, networking, RBAC, and GitOps integration with ArgoCD."
date: "2026-06-15"
readTime: "12 min read"
tags: ["AKS", "Terraform", "Kubernetes", "Azure"]
category: "Azure"
featured: true
---

## Overview

Running Kubernetes in production on Azure means more than clicking "Create" in the portal. A production-grade AKS cluster needs carefully scoped node pools, locked-down networking, proper RBAC, and a reliable delivery mechanism. This article walks through every decision in detail using Terraform as the single source of truth.

## Prerequisites

- Terraform 1.7+ installed locally
- Azure CLI authenticated with sufficient permissions (Contributor + User Access Administrator on target subscription)
- An existing Azure Virtual Network or permission to create one

## Cluster Foundation

Start with the `azurerm_kubernetes_cluster` resource. The most important settings to get right from day one are:

- **`kubernetes_version`** — pin to a specific minor version and upgrade deliberately
- **`node_resource_group`** — set this explicitly so Terraform can manage it cleanly
- **`oidc_issuer_enabled`** and **`workload_identity_enabled`** — enable these immediately; retrofitting later requires a full node pool rotation

```hcl
resource "azurerm_kubernetes_cluster" "main" {
  name                = "aks-${var.environment}-${var.region_short}"
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  kubernetes_version  = var.kubernetes_version
  node_resource_group = "rg-${var.environment}-aks-nodes"

  oidc_issuer_enabled       = true
  workload_identity_enabled = true

  default_node_pool {
    name                = "system"
    vm_size             = "Standard_D4ds_v5"
    node_count          = 2
    os_disk_type        = "Ephemeral"
    only_critical_addons_enabled = true
  }

  identity {
    type = "SystemAssigned"
  }
}
```

The `only_critical_addons_enabled = true` flag on the system pool keeps workloads off it — system components only. User workloads go on dedicated node pools.

## Node Pool Strategy

Separate your workloads into distinct node pools by purpose and resource profile. A common pattern for a mid-size platform:

| Pool | VM SKU | Purpose |
|------|--------|---------|
| `system` | D4ds_v5 | kube-system, CoreDNS, metrics-server |
| `general` | D4ds_v5 | Most application workloads |
| `memory` | E8ds_v5 | Data processing, caching |
| `spot` | D4ds_v5 (Spot) | Non-critical batch jobs |

Configure taints and labels on specialised pools so pods are scheduled correctly:

```hcl
resource "azurerm_kubernetes_cluster_node_pool" "memory" {
  name                  = "memory"
  kubernetes_cluster_id = azurerm_kubernetes_cluster.main.id
  vm_size               = "Standard_E8ds_v5"
  node_count            = 1
  enable_auto_scaling   = true
  min_count             = 1
  max_count             = 10

  node_taints  = ["workload=memory-intensive:NoSchedule"]
  node_labels  = { workload = "memory-intensive" }
}
```

## Networking

Use Azure CNI with `network_plugin_mode = "overlay"` (Azure CNI Overlay) to avoid IP exhaustion. This decouples pod IP allocation from your VNet CIDR, giving you 250 pods per node without burning subnet space.

```hcl
network_profile {
  network_plugin      = "azure"
  network_plugin_mode = "overlay"
  network_policy      = "calico"
  pod_cidr            = "192.168.0.0/16"
  service_cidr        = "10.96.0.0/16"
  dns_service_ip      = "10.96.0.10"
  load_balancer_sku   = "standard"
}
```

## RBAC and Managed Identity

Avoid local accounts entirely. Enable Azure AD integration and Entra ID-backed RBAC:

```hcl
azure_active_directory_role_based_access_control {
  managed            = true
  azure_rbac_enabled = true
}
```

Assign `Azure Kubernetes Service RBAC Cluster Admin` to your platform team's Entra group, and `Azure Kubernetes Service RBAC Reader` to developers at the namespace level using `azurerm_role_assignment`.

## GitOps with ArgoCD

Once the cluster is up, bootstrap ArgoCD via Helm in Terraform using the `helm_release` resource. Create an `argocd-bootstrap` application that points at your platform config repo. From that point, ArgoCD manages everything else — no more `kubectl apply` in pipelines.

## Key Takeaways

- Pin Kubernetes version and upgrade deliberately with `max_surge` configured on node pools
- Use Ephemeral OS disks for faster node provisioning and lower cost
- Enable Workload Identity from day one to avoid client-secret sprawl
- Keep the system node pool tainted so your workloads land on the right pools
- Let ArgoCD own post-bootstrap configuration — Terraform should only manage infrastructure
