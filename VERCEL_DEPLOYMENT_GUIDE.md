# Vercel Deployment Guide

Since the Vercel API is currently rate-limited, here are alternative methods to deploy your fundraising application:

## Method 1: Vercel CLI (Recommended)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Deploy with CLI
```bash
vercel --prod
```

### Step 4: Configure Environment Variables
When prompted, set these environment variables:
```
VITE_SUPABASE_URL=https://tmbuvfmgjpfppqgeabho.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Njg2MjQsImV4cCI6MjA3ODQ0NDYyNH0.SUfAH1UNVwOA916bD7FbUvzX9n7clrnEPd4fB_7lPj0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjg2ODYyNCwiZXhwIjoyMDc4NDQ0NjI0fQ.wVELgNFnhu1--fEs0PVQmEzVM0YJ2gseK-zsLzFsxYY
NODE_ENV=production
PORT=3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=your-email@gmail.com
FROM_NAME="Recovery Scholarships Fund"
JWT_SECRET=your-super-secret-jwt-key
ENCRYPTION_KEY=your-32-character-encryption-key
WORKER_ENABLED=true
WORKER_INTERVAL_MINUTES=15
```

## Method 2: Manual Vercel Dashboard

### Step 1: Go to Vercel Dashboard
Visit [vercel.com](https://vercel.com)

### Step 2: Import Project
1. Click "New Project"
2. Import your GitHub repository
3. Configure build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Set Environment Variables
Add all the environment variables listed above in the Vercel dashboard.

### Step 4: Deploy
Click "Deploy" and wait for the build to complete.

## Method 3: Wait for Rate Limit Reset

The current rate limit will reset in approximately 6 minutes. You can try the automated deployment again after that time.

## Alternative: Railway Deployment

Since Vercel has rate limits, I strongly recommend using **Railway** for this full-stack application:

### Quick Railway Deploy
```bash
npm i -g @railway/cli
railway login
railway init
railway up
```

### Railway Environment Setup
```bash
railway variables set VITE_SUPABASE_URL=https://tmbuvfmgjpfppqgeabho.supabase.co
railway variables set VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Njg2MjQsImV4cCI6MjA3ODQ0NDYyNH0.SUfAH1UNVwOA916bD7FbUvzX9n7clrnEPd4fB_7lPj0
railway variables set SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjg2ODYyNCwiZXhwIjoyMDc4NDQ0NjI0fQ.wVELgNFnhu1--fEs0PVQmEzVM0YJ2gseK-zsLzFsxYY
```

## Why Railway is Better for This App

1. **Full-Stack Support**: Better support for Express.js backend
2. **Database Integration**: Easier PostgreSQL integration
3. **No Rate Limits**: No deployment frequency restrictions
4. **Better Pricing**: More generous free tier for full-stack apps
5. **Built-in CI/CD**: Automatic deployments from GitHub

## Current Status

- ✅ Application code is ready
- ✅ Database is configured
- ✅ Environment variables are set
- ✅ Build configuration is optimized
- ⚠️ Vercel API rate-limited (resets in ~6 minutes)

## Next Steps

1. **Try Vercel CLI** (Method 1 above) - Most likely to work immediately
2. **Use Railway** - Recommended for full-stack applications
3. **Wait 6 minutes** and try automated deployment again
4. **Use Docker** - Deploy anywhere with containerization

Your 24/7 AI fundraising agent is ready to deploy! Choose the method that works best for you.