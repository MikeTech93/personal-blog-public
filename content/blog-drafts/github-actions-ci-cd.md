---
title: "GitHub Actions for DevOps: CI/CD Pipelines That Actually Work in Production"
description: "Real-world GitHub Actions patterns covering matrix builds, reusable workflows, environment gates, OIDC authentication to Azure, and monorepo strategies."
date: "2026-04-02"
readTime: "10 min read"
tags: ["GitHub Actions", "CI/CD", "DevOps"]
category: "CI/CD"
featured: false
---

## Beyond the Basics

Most GitHub Actions tutorials show you how to run tests on push. Production CI/CD is a different problem. You need reusable workflows, environment protection gates, secure credential management, efficient caching, and sensible monorepo handling. This article covers the patterns that hold up under real-world pressure.

## Reusable Workflows

Stop copy-pasting workflows across repositories. Reusable workflows let you define a workflow once and call it from any repo in your organisation.

```yaml
# .github/workflows/build-and-push.yml (in your platform repo)
on:
  workflow_call:
    inputs:
      image-name:
        required: true
        type: string
      dockerfile-path:
        required: false
        type: string
        default: './Dockerfile'
    secrets:
      ACR_LOGIN_SERVER:
        required: true
```

Call it from any repo:

```yaml
jobs:
  build:
    uses: org/platform/.github/workflows/build-and-push.yml@main
    with:
      image-name: my-service
    secrets:
      ACR_LOGIN_SERVER: ${{ secrets.ACR_LOGIN_SERVER }}
```

Version reusable workflows with tags (`@v1`, `@v2`) so consumers can pin to a stable version.

## OIDC Authentication to Azure

Never store Azure service principal client secrets in GitHub Secrets. Use OpenID Connect instead. OIDC lets GitHub Actions get a short-lived token from Entra ID without any long-lived credentials.

Set up the trust relationship in Terraform:

```hcl
resource "azurerm_federated_identity_credential" "github" {
  name                = "github-actions-prod"
  resource_group_name = azurerm_resource_group.identity.name
  parent_id           = azurerm_user_assigned_identity.cicd.id
  audience            = ["api://AzureADTokenExchange"]
  issuer              = "https://token.actions.githubusercontent.com"
  subject             = "repo:org/repo:environment:production"
}
```

Then in your workflow:

```yaml
permissions:
  id-token: write
  contents: read

steps:
  - uses: azure/login@v2
    with:
      client-id: ${{ secrets.AZURE_CLIENT_ID }}
      tenant-id: ${{ secrets.AZURE_TENANT_ID }}
      subscription-id: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```

No secrets to rotate. No risk of a leaked client secret.

## Environment Gates

Use GitHub Environments for deployment approvals. Create `staging` and `production` environments, add required reviewers, and add a deployment wait timer for production.

```yaml
jobs:
  deploy-staging:
    environment: staging
    steps:
      - run: echo "Deploying to staging"

  deploy-production:
    needs: deploy-staging
    environment: production  # will pause and wait for approval
    steps:
      - run: echo "Deploying to production"
```

Combine with environment secrets to scope credentials to the target environment — the production service principal only appears in the `production` environment.

## Matrix Builds

Test across multiple versions or configurations in parallel using the `matrix` strategy:

```yaml
jobs:
  test:
    strategy:
      matrix:
        node-version: [18, 20, 22]
        os: [ubuntu-latest, windows-latest]
      fail-fast: false  # don't cancel other jobs if one fails
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/setup-node@v4
        with:
          node-version: ${{ matrix.node-version }}
      - run: npm test
```

Use `fail-fast: false` in most cases — you want to see all failures, not just the first one.

## Caching Dependencies

Cache `node_modules`, pip packages, or Maven dependencies to cut minutes off build times:

```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-npm-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-npm-
```

The `hashFiles` key means the cache busts automatically when `package-lock.json` changes.

## Monorepo Path Filtering

In a monorepo, only run CI for services that have actually changed. The `paths` filter handles simple cases:

```yaml
on:
  push:
    paths:
      - 'services/api/**'
      - '.github/workflows/api.yml'
```

For more complex dependency graphs (service A tests need to run when shared library B changes), use `dorny/paths-filter` action to compute which services need rebuilding.

## Concurrency Control

Prevent redundant workflow runs when commits land quickly:

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

This cancels any in-progress run for the same branch when a new push arrives. Don't use it for production deployments — you generally want those to queue, not cancel.

For production, invert the logic:

```yaml
concurrency:
  group: production-deploy
  cancel-in-progress: false
```

## Security Hardening

- Pin third-party actions to commit SHA, not tag (`uses: actions/checkout@v4` should be `@<sha>`)
- Use `permissions: {}` at the top level and grant only what each job needs
- Never `echo` secrets or use them in step names
- Use `continue-on-error: false` (the default) — don't swallow failures
- Review GitHub's Dependabot alerts for action vulnerabilities
