---
title: "AWS IAM Authentication in Azure Pipelines - Replacing Long Lived Credentials with OIDC Federation"
description: "Hardcoded AWS access keys in your pipeline variables are a liability. Learn how to replace them with OIDC federation so Azure Pipelines can authenticate to AWS without storing a single secret."
date: "2026-06-27"
readTime: "8 min read"
tags: ["AWS", "Azure DevOps", "OIDC", "Security", "CI/CD"]
category: "CI/CD"
featured: true
---

## The Problem with Hardcoded AWS Credentials

If your Azure Pipeline authenticates to AWS using `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` stored as pipeline variables, you have long-lived credentials sitting in your CI system. 

Those credentials never expire unless you rotate them manually and tend to be scoped too broadly because they belong to an IAM user rather than a specific task. That creates a liability across more attack surfaces than most people consider:

- **Compromised Azure DevOps organisation:** anyone who gains access to your org can read pipeline variables and walk away with working AWS credentials.
- **Supply chain attacks:** a malicious third-party pipeline task or a poisoned dependency running inside your pipeline can exfiltrate environment variables just as easily as a human attacker.
- **Leaked logs and artifacts:** credentials accidentally printed to build output or stored in debug artifacts are valid long after the job finishes.

In every case, the problem is the same: static keys exfiltrated from any of these surfaces remain valid until you notice and rotate them.

Rotating them is also the kind of low-value work that either gets forgotten or lands on the same person every time.

OIDC federation solves all of this. Instead of a static key pair, the pipeline requests short-lived credentials from AWS STS at runtime, scoped to the current job. The credentials are valid for minutes. There is nothing to store and nothing to rotate.

## Requirements

- **AWS Account:** with permissions to create IAM roles and identity providers.
- **Azure DevOps Project:** with access to configure service connections.
- **AWS Toolkit for Azure DevOps:** version 1.15.0 or higher installed in your Azure DevOps organisation.

## How OIDC Federation Works

The trust relationship is built on signed JWT tokens. The flow during a pipeline run looks like this:

1. Azure DevOps generates a signed JWT for the current job, identifying the organisation, project, and service connection.
2. The pipeline presents that token to AWS STS via the `AssumeRoleWithWebIdentity` API.
3. AWS verifies the token signature against Azure DevOps's public OIDC endpoint.
4. If the claims on the IAM role trust policy match, AWS returns temporary credentials: an access key, secret, and session token valid for up to one hour.
5. The pipeline uses those credentials for the rest of the job.

Nothing is stored. When the job ends, the credentials expire.

## Step 1: Add Azure DevOps as an OIDC Provider in AWS

You need to register Azure DevOps as a trusted identity provider in your AWS account before it can issue tokens that AWS will accept.

1. **Find your Organisation Name first**
    - When you are logged into Azure DevOps, your org name is visible in the URL: `https://dev.azure.com/<your-org-name>` - make a note of this.

2. **Find your Organisation ID**
    - Browse to: `https://dev.azure.com/<your-org-name>/_apis/projectCollections?api-version=6.0` - Take a note of the ID returned in the JSON response. This is your org ID.

3. **Add a new OIDC provider in AWS**
    - Go to **IAM > Identity Providers > Add Provider** and select **OpenID Connect**.
      - **Provider URL**: `https://vstoken.dev.azure.com/<your-org-id>`
      - **Audience**: `api://AzureADTokenExchange`
    - **Add Provider**

## Step 2: Create an IAM Role for the Pipeline and Assign a Trust Policy

1. **Create an IAM role with a custom trust policy to allow your pipeline to assume it**
    - _Custom trust policy example:_
        ```json
        {
          "Version": "2012-10-17",
          "Statement": [
            {
              "Effect": "Allow",
              "Principal": {
                "Federated": "arn:aws:iam::<aws-account-id>:oidc-provider/vstoken.dev.azure.com/<your-org-id>"
              },
              "Action": "sts:AssumeRoleWithWebIdentity",
              "Condition": {
                "StringEquals": {
                  "vstoken.dev.azure.com/<your-org-id>:aud": "api://AzureADTokenExchange"
                },
                "StringLike": {
                  "vstoken.dev.azure.com/<your-org-id>:sub": "sc://<your-org-name>/<your-project-name>/*"
                }
              }
            }
          ]
        }
        ``` 
        - The `sub` claim is the key condition. 
        - Azure DevOps formats it as: `sc://<org>/<project>/<service-connection-name>`
        - A wildcard on the service connection name allows any connection in that project to assume the role. 
        - You can narrow this down to a specific connection name if you want tighter control, which is worth doing for production accounts.
        - If your Azure DevOps project name contains spaces then leave them in the `sub` claim. Azure DevOps does not URL-encode them.

2. **Attach the necessary permissions to the role**
    - Attach a policy that grants the AWS IAM permissions your pipeline needs, for example:
      ```json
      {
        "Version": "2012-10-17",
        "Statement": [
          {
            "Effect": "Allow",
            "Action": [
              "s3:ListBucket",
              "s3:GetObject",
              "s3:PutObject"
            ],
            "Resource": [
              "arn:aws:s3:::my-bucket",
              "arn:aws:s3:::my-bucket/*"
            ]
          }
        ]
      }
      ```

3. **Copy the `Role ARN`, you will need it in Step 3.**

## Step 3: Create an AWS Service Connection in Azure DevOps

1. In Azure DevOps, go to **Project Settings > Service Connections > New Service Connection** and select the **AWS** connection type.

2. Choose **OpenID Connect (OIDC)** as the authentication method.

3. Most fields are not applicable for OIDC so you just need to enter the following details:
    - **Role to Assume:** the ARN of the role from Step 2
    - **Use OIDC (optional):** check this box to enable OIDC authentication
    - **Service Connection Name:** this name becomes part of the `sub` claim, so if you pinned the trust policy to a specific connection name, the two need to match

4. Save the connection.

## Step 4: Use the Connection in Your Pipeline

1. **Method 1:** Use the `AWSShellScript` task to run AWS CLI commands directly:
```yaml
trigger:
  - main

pool:
  vmImage: ubuntu-latest

steps:
  - task: AWSShellScript@1
    inputs:
      awsCredentials: 'my-aws-service-connection'
      regionName: 'eu-west-1'
      scriptType: 'inline'
      inlineScript: |
        aws sts get-caller-identity
        aws s3 ls
```

2. **Method 2:** Generate temporary credentials and use them in subsequent PowerShell steps:
```yaml
trigger:
  - main

pool:
  vmImage: ubuntu-latest

steps:

# Export AWS credentials for later pipeline steps
  - task: AWSShellScript@1
    displayName: "Assume AWS Role via OIDC"
    inputs:
      awsCredentials: 'my-aws-service-connection'
      regionName: 'eu-west-1'
      scriptType: inline
      inlineScript: |
        aws sts get-caller-identity

        echo "##vso[task.setvariable variable=AWS_ACCESS_KEY_ID;issecret=true]$AWS_ACCESS_KEY_ID"
        echo "##vso[task.setvariable variable=AWS_SECRET_ACCESS_KEY;issecret=true]$AWS_SECRET_ACCESS_KEY"
        echo "##vso[task.setvariable variable=AWS_SESSION_TOKEN;issecret=true]$AWS_SESSION_TOKEN"
        echo "##vso[task.setvariable variable=AWS_DEFAULT_REGION]$AWS_DEFAULT_REGION"

# The AWS environment variables injected above are now available in subsequent steps, including 3rd party tools like Terraform
  - pwsh: |
      aws sts get-caller-identity
      aws s3 ls

      # terraform init
      # terraform plan
    env:
      AWS_ACCESS_KEY_ID: $(AWS_ACCESS_KEY_ID)
      AWS_SECRET_ACCESS_KEY: $(AWS_SECRET_ACCESS_KEY)
      AWS_SESSION_TOKEN: $(AWS_SESSION_TOKEN)
      AWS_DEFAULT_REGION: $(AWS_DEFAULT_REGION)
```

## Locking Down the Trust Policy

The `sub` claim condition is your primary lever for controlling which pipelines can assume a given role. A few patterns worth having in your toolkit:

**Specific service connection only:**
```json
"vstoken.dev.azure.com/<org_id>:sub": "sc://<org_name>/<project>/production-deploy"
```

**Any Service Connection within a project:**
```json
"vstoken.dev.azure.com/<org_id>:sub": "sc://<org_name>/my-project/*"
```

**Any pipeline in the organisation (use sparingly):**
```json
"vstoken.dev.azure.com/<org_id>:sub": "sc://<org_name>/*/*"
```

For production accounts, pinning to a specific project is a reasonable baseline. For your most privileged roles, go further and pin to a named service connection.

## What You End Up With

Once this is in place, there are no `AWS_ACCESS_KEY_ID` or `AWS_SECRET_ACCESS_KEY` values in your pipeline variables. The credentials the pipeline receives expire automatically when the job finishes. 

Every `AssumeRoleWithWebIdentity` call is recorded in CloudTrail with the token claims attached, so you get a clear audit trail linking AWS API activity back to a specific pipeline run.

The initial setup is around 15 minutes. After that, there is nothing to maintain. No rotation schedule, no expiry reminders, no risk of a forgotten key sitting in a variable group for two years. It is one of the better security improvements you can make to a CI pipeline for the amount of effort involved.