# Deployment Guide

## Stack

| Layer | Service | Free Tier |
|---|---|---|
| Frontend (React/Vite) | Vercel | Unlimited static deploys |
| Backend (Express) | Vercel Serverless | 100k function calls/month |
| Database (MySQL) | TiDB Cloud Serverless | 5 GB storage |

---

## Architecture

```
Browser → vercel.com
  /api/* → Serverless Function  (Express app via api/index.ts)
  /*     → Static CDN           (packages/client/dist)
         ↓
    TiDB Cloud (MySQL) — add when needed
```

---

## Deploy Now (Chat Feature, No Database)

### Step 1 — Push to GitHub
```sh
git add .
git commit -m "chore: add vercel deployment config"
git push
```

### Step 2 — Import on Vercel
1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Vercel auto-detects `vercel.json` — no manual framework config needed

### Step 3 — Set Environment Variables
In Vercel → **Settings** → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `OPENAI_API_KEY` | Your OpenAI key |

### Step 4 — Deploy
Click **Deploy**. Done.

---

## Add Database (When Ready)

### Step 1 — Create a Free MySQL Database on TiDB Cloud
1. Sign up at [tidbcloud.com](https://tidbcloud.com)
2. Create a **Serverless** cluster (free tier)
3. Go to **Connect** → copy the connection string

Connection string format:
```
mysql://username:password@host:4000/dbname?ssl-mode=VERIFY_IDENTITY
```

### Step 2 — Add DATABASE_URL to Vercel
In Vercel → **Settings** → **Environment Variables**, add:

| Variable | Value |
|---|---|
| `DATABASE_URL` | Connection string from TiDB Cloud |

### Step 3 — Update Prisma Schema
In `packages/server/prisma/schema.prisma`, add the `url` field:

```prisma
datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}
```

### Step 4 — Push Schema to Database
Run once from your local machine:

```sh
cd packages/server
bunx prisma db push
```

### Step 5 — Redeploy on Vercel
Vercel will pick up the new `DATABASE_URL` on the next deploy automatically.

---

## Environment Variables Reference

| Variable | Required Now | Required with DB | Where to Get It |
|---|---|---|---|
| `OPENAI_API_KEY` | ✅ Yes | ✅ Yes | platform.openai.com |
| `DATABASE_URL` | ❌ No | ✅ Yes | TiDB Cloud → Connect |

---

## Local Development

```sh
# Install dependencies
bun install

# Run both client and server
bun run index.ts

# Client runs on: http://localhost:5173
# Server runs on: http://localhost:3000
```

---

## If App Grows Beyond Free Limits

| Need | Upgrade Path | Cost |
|---|---|---|
| More API calls | Vercel Pro | $20/month |
| Persistent server (WebSockets) | Railway | $5/month |
| More DB storage | TiDB Cloud paid | Pay as you go |
