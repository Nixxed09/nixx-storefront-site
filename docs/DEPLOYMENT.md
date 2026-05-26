# Deployment Runbook

## Current Repository
- GitHub: `https://github.com/Nixxed09/nixx-storefront-site`
- Default branch: `main`
- Framework: Next.js
- Intended Vercel project name: `nixx-storefront-site`
- Intended production domain: `nixx.it.com`

## Stack Choice
Use Next.js on Vercel.

Why:
- Static storefront pages are fast and simple now.
- Vercel auto-detects and deploys Next.js from GitHub.
- API routes can be added later for forms, checkout, webhooks, chat, or analytics.
- Product and brand content already live in `src/data/` and `src/content/`.

## Vercel Connect
The local Vercel CLI needs a valid login or token before this can be completed from the terminal.

Preferred dashboard path:
1. Open Vercel dashboard: `https://vercel.com/phoenixs-projects-b770c793`
2. Add New Project.
3. Import `Nixxed09/nixx-storefront-site`.
4. Keep framework preset as Next.js.
5. Build command: `npm run build`.
6. Install command: `npm install`.
7. Output directory: leave blank for Next.js.
8. Deploy.

CLI path after login:
```powershell
Set-Location D:\Phoenix\nix-code\nixx-storefront-site
vercel login
vercel link --project nixx-storefront-site
vercel --prod
vercel domains add nixx.it.com nixx-storefront-site
vercel domains inspect nixx.it.com
```

## Namecheap DNS
After the domain is added in Vercel, configure DNS in Namecheap for `nixx.it.com`.

Use the exact records shown by Vercel's domain inspector. Typical Vercel records are:

| Host | Type | Value |
|------|------|-------|
| `@` | `A` | `76.76.21.21` |
| `www` | `CNAME` | `cname.vercel-dns-0.com` |

If Vercel provides a different CNAME target, use the one Vercel shows.

## Verification
```powershell
npm run lint
npm run build
vercel domains inspect nixx.it.com
```

Check:
- `https://nixx.it.com` loads the site.
- SSL certificate is valid.
- Pushes to `main` create production deployments.
- Pull requests create preview deployments.

