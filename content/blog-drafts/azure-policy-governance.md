---
title: "Azure Policy and Governance at Enterprise Scale"
description: "Implementing Azure Policy, Management Groups, and RBAC at enterprise scale, ensuring compliance, enforcing tagging, and auditing resources across 50+ subscriptions."
date: "2026-03-01"
readTime: "7 min read"
tags: ["Azure", "Governance", "Policy"]
category: "Azure"
featured: false
---

## The Governance Problem at Scale

A single Azure subscription with a small team is easy to govern by convention. At enterprise scale — 50+ subscriptions, dozens of teams, thousands of resources — you cannot rely on people doing the right thing. You need policy enforcement, and it needs to be automated.

Azure Policy, Management Groups, and RBAC are the three pillars of Azure governance. Used together, they let you enforce compliance across your entire estate without blocking teams from working.

## Management Group Hierarchy

Management Groups sit above subscriptions and allow you to apply policies and RBAC assignments that cascade down. A sensible hierarchy for most enterprises:

```
Tenant Root Group
├── Platform
│   ├── Connectivity (hub networking)
│   └── Management (monitoring, security tools)
├── Landing Zones
│   ├── Corp (internal applications)
│   │   ├── Sub-Production
│   │   └── Sub-NonProduction
│   └── Online (internet-facing)
└── Sandbox
    └── Individual developer subscriptions
```

This structure mirrors the Azure Landing Zone architecture (formerly Enterprise Scale). The key insight: policies applied at `Landing Zones` propagate to all subscriptions below it. You don't need to manage policies per-subscription.

## Azure Policy: Deny, Audit, and DeployIfNotExists

Azure Policy has three main effects:

| Effect | Behaviour |
|--------|-----------|
| `Audit` | Logs non-compliant resources; doesn't block |
| `Deny` | Blocks resource creation/update that violates policy |
| `DeployIfNotExists` | Automatically remediates non-compliant resources |

Start with `Audit` for new policies. Review compliance over 2-4 weeks, remediate existing resources, then switch to `Deny`. Jumping straight to `Deny` on a policy you don't fully understand will block teams.

## Enforcing Tagging at Scale

A common governance requirement: all resources must have `environment`, `owner`, and `cost-centre` tags. The built-in `Require a tag on resources` policy handles individual tags.

For a complete tagging solution, assign the initiative (policy set) `Require tag and its value` for each required tag, or write a custom policy:

```json
{
  "policyRule": {
    "if": {
      "allOf": [
        {
          "field": "tags['environment']",
          "exists": "false"
        },
        {
          "field": "type",
          "notEquals": "Microsoft.Resources/resourceGroups"
        }
      ]
    },
    "then": {
      "effect": "Deny"
    }
  }
}
```

Pair this with `Inherit a tag from the resource group` to allow resource groups to be the source of truth for tags, reducing the burden on individual resources.

## RBAC Design Principles

Azure RBAC has hundreds of built-in roles. Resist the temptation to assign `Contributor` everywhere. A practical minimal set:

| Role | Who gets it |
|------|-------------|
| `Owner` | Break-glass accounts only, MFA enforced |
| `Contributor` | Platform team at management group level |
| `Reader` | Auditors, security team |
| Custom roles | Application teams scoped to their resource group |

Assign roles to Entra ID groups, not individual users. When someone leaves, removing them from the group is sufficient — you don't need to audit every RBAC assignment individually.

## Implementing with Terraform

Managing policy at scale in the portal is impractical. Use Terraform:

```hcl
resource "azurerm_policy_assignment" "require_tags" {
  name                 = "require-environment-tag"
  scope                = azurerm_management_group.landing_zones.id
  policy_definition_id = "/providers/Microsoft.Authorization/policyDefinitions/..."
  display_name         = "Require environment tag on resources"

  parameters = jsonencode({
    tagName = { value = "environment" }
  })
}
```

Store policy assignments in a dedicated `governance` Terraform root module that runs in a separate pipeline from application infrastructure. Policy changes should go through a review process.

## Compliance Reporting

Azure Policy compliance data is available via the Azure Policy Compliance API and can be shipped to a Log Analytics workspace for custom dashboards. For executive reporting, the built-in `Policy Compliance` blade in the portal is sufficient.

Set up alerts for compliance degradation:

```
AzureActivity
| where OperationNameValue == "Microsoft.Authorization/policies/deny/action"
| summarize count() by bin(TimeGenerated, 1h), ResourceId
```

Track compliance as a percentage per management group over time, and make it visible to engineering leadership.

## Common Mistakes

1. **Assigning too broadly too fast** — pilot new policies on the Sandbox management group first
2. **Not planning for exemptions** — `DeployIfNotExists` remediations sometimes conflict with existing configs; have an exemption process
3. **Ignoring policy inheritance** — a `Deny` effect at the Tenant Root Group affects everything, including your platform subscriptions
4. **Missing the Policy Insights delay** — compliance data can take up to 30 minutes to reflect after a resource change
