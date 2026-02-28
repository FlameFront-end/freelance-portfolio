# Digital Landing

Next.js landing project.

## Local run

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Deploy to Vercel

Project is prepared for Vercel:
- `vercel.json` is added (`framework: nextjs`, `npm ci`, `npm run build`)
- production build is verified locally

If this repository contains multiple projects, set in Vercel:
- **Root Directory**: `digital-landing`

### Vercel UI flow
1. Import repository in Vercel.
2. Set **Root Directory** to `digital-landing`.
3. Deploy.

### Vercel CLI flow
```bash
cd digital-landing
vercel
vercel --prod
```
