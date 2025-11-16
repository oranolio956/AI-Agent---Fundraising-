# Deploy to Vercel NOW

## Quick Deploy Link

**Click this link to deploy directly to Vercel:**

```
https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Fyour-repo-name&env=VITE_SUPABASE_URL%2CVITE_SUPABASE_ANON_KEY%2CSUPABASE_SERVICE_ROLE_KEY%2CNODE_ENV%2CPORT&envDescription=Supabase%20credentials%20for%20fundraising%20application&envLink=https%3A%2F%2Fgithub.com%2Fyour-username%2Fyour-repo-name%2Fblob%2Fmain%2F.env.example&project-name=recovery-fundraising-agent&repository-name=recovery-fundraising-agent
```

## Manual Vercel Deployment (5 Minutes)

### Step 1: Go to Vercel
Visit: https://vercel.com/new

### Step 2: Import Your Repository
1. Click "Import Git Repository"
2. Connect your GitHub account
3. Select your fundraising repository

### Step 3: Configure Environment Variables
Add these environment variables:

```
VITE_SUPABASE_URL=https://tmbuvfmgjpfppqgeabho.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Njg2MjQsImV4cCI6MjA3ODQ0NDYyNH0.SUfAH1UNVwOA916bD7FbUvzX9n7clrnEPd4fB_7lPj0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjg2ODYyNCwiZXhwIjoyMDc4NDQ0NjI0fQ.wVELgNFnhu1--fEs0PVQmEzVM0YJ2gseK-zsLzFsxYY
NODE_ENV=production
PORT=3000
```

### Step 4: Deploy Settings
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### Step 5: Deploy
Click "Deploy" and wait 2-3 minutes for the build to complete.

## Alternative: Deploy Right Now

Since CLI deployment is having issues, here's what you can do RIGHT NOW:

1. **Push to GitHub** (if not already done)
2. **Go to**: https://vercel.com/new
3. **Import your repository**
4. **Add the environment variables above**
5. **Click Deploy**

## Your App Will Be Live At:
`https://recovery-fundraising-agent.vercel.app`

## Post-Deployment Checklist

### ✅ Immediate (2 minutes)
- [ ] Visit your live URL
- [ ] Check the homepage loads
- [ ] Test `/api/health` endpoint
- [ ] Verify admin dashboard at `/admin`

### ✅ Configuration (5 minutes)
- [ ] Add email SMTP credentials
- [ ] Configure your organization details
- [ ] Upload your logo and branding
- [ ] Set up payment processing (Stripe)

### ✅ Launch (10 minutes)
- [ ] Create your first campaign
- [ ] Import donor contacts
- [ ] Set up automated workflows
- [ ] Test donation process

## 🚀 Your 24/7 AI Fundraising Agent is Ready!

**Don't wait for CLI issues - deploy manually in 5 minutes!**

The application is fully built, configured, and ready to start raising funds for recovery scholarships immediately.