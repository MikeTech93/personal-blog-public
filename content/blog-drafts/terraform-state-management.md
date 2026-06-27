---
title: "Terraform State Management: Remote Backends, Locking, and Workspaces"
description: "Everything you need to know about Terraform state at scale: Azure Blob Storage backends, state locking with leases, workspace strategies, and import workflows."
date: "2026-05-05"
readTime: "8 min read"
tags: ["Terraform", "Azure", "IaC"]
category: "Terraform"
featured: false
---

## Why State Management Matters

Terraform's state file is the map between your configuration and real-world resources. Get state management wrong and you get one of three failure modes:

1. **Concurrent apply conflicts** — two engineers run `terraform apply` simultaneously and corrupt state
2. **Lost state** — local state file gets deleted or `.gitignored` by accident
3. **State drift** — the state file no longer matches reality after a manual change in the portal

Remote state with locking solves all three.

## Azure Blob Storage Backend

Azure Blob Storage is the natural backend for Azure-heavy teams. The combination of Blob Storage + lease-based locking is reliable and cheap.

```hcl
terraform {
  backend "azurerm" {
    resource_group_name  = "rg-terraform-state"
    storage_account_name = "stterraformstate${var.env}"
    container_name       = "tfstate"
    key                  = "platform/networking/terraform.tfstate"
    use_azuread_auth     = true
  }
}
```

**Key decisions:**

- `use_azuread_auth = true` — use Entra ID authentication instead of a storage account key. This lets you rotate credentials via RBAC rather than manually.
- `key` path convention — use a consistent path like `<team>/<component>/terraform.tfstate` to keep state organised as infrastructure grows.

## State Locking with Blob Leases

The Azure backend acquires a blob lease before any write operation (`plan` + `apply`). The lease blocks concurrent writes automatically. You don't need to configure anything extra — it's on by default.

When a lock gets stuck (pipeline crashed mid-apply), use:

```bash
terraform force-unlock <lock-id>
```

The lock ID is shown in the error message when Terraform reports that the state is locked.

## Workspace Strategies

Workspaces let you share a single configuration across multiple environments by isolating state. There are two approaches, both valid:

### Option A: Single workspace per environment (recommended)

Separate configurations in separate directories (`environments/dev/`, `environments/prod/`) with separate state keys. More verbose but explicit.

### Option B: Terraform workspaces

```bash
terraform workspace new staging
terraform workspace select staging
terraform apply -var-file=staging.tfvars
```

State is stored at `<key>.staging.tfstate` automatically. Works well for simple cases but becomes awkward when environment differences go beyond variable values.

**Our recommendation:** use separate directories for environments that diverge significantly (different regions, different resource counts). Use workspaces only for near-identical environments like `blue` and `green` in a blue/green deployment.

## Importing Existing Resources

If you're bringing existing infrastructure under Terraform management, `terraform import` maps real resources to configuration:

```bash
terraform import azurerm_resource_group.main /subscriptions/.../resourceGroups/rg-existing
```

For large imports, Terraform 1.5+ supports `import` blocks in configuration:

```hcl
import {
  to = azurerm_resource_group.main
  id = "/subscriptions/.../resourceGroups/rg-existing"
}
```

Run `terraform plan` to preview the import, then `apply` to write it to state. Always check the plan carefully — Terraform may want to make changes to align the resource with your configuration.

## State File Security

The state file contains sensitive values in plaintext — connection strings, secrets passed through `sensitive = true` variables, and resource IDs that could inform an attacker. Protect it accordingly:

- Enable versioning on the Blob Storage container (allows rollback to previous state)
- Enable soft delete on the container (14-day recovery window)
- Restrict access to the storage account via Private Endpoint or VNet service endpoints
- Assign `Storage Blob Data Contributor` to your pipeline's managed identity, not `Contributor` on the subscription

## Practical CI/CD Integration

In Azure DevOps pipelines, use a service connection backed by a Managed Identity rather than a service principal with a client secret. Configure the backend credentials via environment variables:

```yaml
- task: TerraformTaskV4@4
  inputs:
    command: 'apply'
    environmentServiceNameAzureRM: 'arm-connection-prod'
  env:
    ARM_USE_AZUREAD: 'true'
```

This removes all long-lived credentials from the pipeline configuration.
