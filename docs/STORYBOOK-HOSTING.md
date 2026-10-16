# Orbit UI - Storybook Hosting (permanent, S3 + CloudFront)

Permanent hosted Storybook for `@365assistance/orbit-ui`, set up 2026-10-16.

## Live URL
- **https://d32eg4kly9znml.cloudfront.net/**
- (Optional nicer alias e.g. `storybook.dev.orbit365.com.au` can be added later: ACM cert in us-east-1 + CloudFront alias + Route53 CNAME.)

## Infrastructure (orbit-dev account 295435084378, ap-southeast-2)
- **S3 bucket:** `orbit-ui-storybook-orbit-dev-295435084378` (private, all public access blocked, AES256, read only via CloudFront OAC)
- **CloudFront distribution:** `E2OFGBMHCJV3RJ` -> `d32eg4kly9znml.cloudfront.net`
- **Origin Access Control:** `E2H7L553U5COXT` (sigv4, always)
- **Access:** public URL (viewer protocol redirect-to-https). Anyone with the link can view. No login.
- SPA fallback: 403 -> /index.html (200) so deep story links resolve.

## Auto-deploy (GitHub Action)
- Workflow: `.github/workflows/deploy-storybook.yml`
- Trigger: push to `main` (src/.storybook/package changes) or manual `workflow_dispatch`.
- Flow: `npm ci` -> `build-storybook` -> `aws s3 sync --delete` -> CloudFront invalidation.
- **Auth: GitHub OIDC -> IAM role** (no long-lived keys). Requires repo variable `AWS_DEPLOY_ROLE_ARN` to be set once the role exists.

### BLOCKED pending Alan (IAM): create the deploy role
Archer's orbit-dev user has PowerUserAccess which **excludes IAM**, so the OIDC provider + role must be created by someone with IAM on orbit-dev (Alan). See `docs/STORYBOOK-IAM-BRIEF.md` for the exact minimal policy + trust JSON.

Once created: set repo variable `AWS_DEPLOY_ROLE_ARN` = the role ARN. Auto-deploy then works on every push.

## Manual deploy (interim, until OIDC role exists)
From `projects/orbit-ui/` on Archer:
```
npm run build-storybook
aws s3 sync storybook-static/ s3://orbit-ui-storybook-orbit-dev-295435084378/ --delete --profile orbit-dev
aws cloudfront create-invalidation --distribution-id E2OFGBMHCJV3RJ --paths "/*" --profile orbit-dev
```

## Verify live
```
curl -s https://d32eg4kly9znml.cloudfront.net/ | grep -i '<title>'
# -> <title>storybook - Storybook</title>
```
