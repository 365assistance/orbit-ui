# IAM brief for Alan - orbit-ui Storybook auto-deploy role

**Account:** orbit-dev `295435084378`
**Why:** GitHub Actions needs to deploy Storybook to S3 + invalidate CloudFront on push to `main`. Archer's orbit-dev user is PowerUserAccess (no IAM), so this role must be created by someone with IAM. Using GitHub OIDC = no long-lived keys stored.

Minimal scope: write only to the one Storybook bucket + invalidate the one distribution. Nothing else.

## 1. OIDC provider (skip if `token.actions.githubusercontent.com` already exists on the account)
- Provider URL: `https://token.actions.githubusercontent.com`
- Audience: `sts.amazonaws.com`

## 2. IAM role: `orbit-ui-storybook-deploy`

**Trust policy** (locks to this repo, main branch + manual runs):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Federated": "arn:aws:iam::295435084378:oidc-provider/token.actions.githubusercontent.com" },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": { "token.actions.githubusercontent.com:aud": "sts.amazonaws.com" },
        "StringLike": { "token.actions.githubusercontent.com:sub": "repo:365assistance/orbit-ui:*" }
      }
    }
  ]
}
```

**Permissions policy** (scoped to the one bucket + one distribution):
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "StorybookBucketWrite",
      "Effect": "Allow",
      "Action": ["s3:ListBucket"],
      "Resource": "arn:aws:s3:::orbit-ui-storybook-orbit-dev-295435084378"
    },
    {
      "Sid": "StorybookObjectWrite",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:DeleteObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::orbit-ui-storybook-orbit-dev-295435084378/*"
    },
    {
      "Sid": "StorybookInvalidate",
      "Effect": "Allow",
      "Action": ["cloudfront:CreateInvalidation"],
      "Resource": "arn:aws:cloudfront::295435084378:distribution/E2OFGBMHCJV3RJ"
    }
  ]
}
```

## 3. Hand back
Give Archer/Sofia the role ARN, e.g. `arn:aws:iam::295435084378:role/orbit-ui-storybook-deploy`. We set it as repo variable `AWS_DEPLOY_ROLE_ARN` on `365assistance/orbit-ui` and auto-deploy is live.
