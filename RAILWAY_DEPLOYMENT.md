# Railway Deployment

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template?template=https%3A%2F%2Fgithub.com%2Fyour-username%2Fyour-repo-name&plugins=postgresql&envs=VITE_SUPABASE_URL%2CVITE_SUPABASE_ANON_KEY%2CSUPABASE_SERVICE_ROLE_KEY%2CNODE_ENV%2CPORT%2CSMTP_HOST%2CSMTP_PORT%2CSMTP_USER%2CSMTP_PASS%2CFROM_EMAIL%2CFROM_NAME%2CJWT_SECRET%2CENCRYPTION_KEY%2CWORKER_ENABLED%2CWORKER_INTERVAL_MINUTES&VITE_SUPABASE_URLDesc=Your%20Supabase%20project%20URL&VITE_SUPABASE_ANON_KEYDesc=Your%20Supabase%20anon%20key&SUPABASE_SERVICE_ROLE_KEYDesc=Your%20Supabase%20service%20role%20key&NODE_ENVDefault=production&PORTDefault=3000&SMTP_HOSTDefault=smtp.gmail.com&SMTP_PORTDefault=587&WORKER_ENABLEDDefault=true&WORKER_INTERVAL_MINUTESDefault=15)

## One-Click Railway Deployment

Click the button above to deploy your 24/7 AI Fundraising Agent to Railway with one click.

### Required Environment Variables

The deployment will prompt you to configure these environment variables:

- **VITE_SUPABASE_URL**: Your Supabase project URL
- **VITE_SUPABASE_ANON_KEY**: Your Supabase anon key  
- **SUPABASE_SERVICE_ROLE_KEY**: Your Supabase service role key
- **SMTP_HOST**: Your email SMTP host (default: smtp.gmail.com)
- **SMTP_PORT**: SMTP port (default: 587)
- **SMTP_USER**: Your email address
- **SMTP_PASS**: Your email app password
- **FROM_EMAIL**: Sender email address
- **FROM_NAME**: Sender name (e.g., "Recovery Scholarships Fund")
- **JWT_SECRET**: Secret key for JWT tokens
- **ENCRYPTION_KEY**: 32-character encryption key

### Your Supabase Credentials

For your deployment, use these values:

```
VITE_SUPABASE_URL=https://tmbuvfmgjpfppqgeabho.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Njg2MjQsImV4cCI6MjA3ODQ0NDYyNH0.SUfAH1UNVwOA916bD7FbUvzX9n7clrnEPd4fB_7lPj0
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjg2ODYyNCwiZXhwIjoyMDc4NDQ0NjI0fQ.wVELgNFnhu1--fEs0PVQmEzVM0YJ2gseK-zsLzFsxYY
```

### Deployment Steps

1. Click the Railway deploy button above
2. Connect your GitHub account
3. Configure environment variables using the values above
4. Add your email configuration
5. Click "Deploy" and wait for the build to complete
6. Your app will be available at `https://your-app.railway.app`

### Post-Deployment

After deployment, you can:
- Access your admin dashboard at `/admin`
- Configure email campaigns
- Set up automated workflows
- Monitor analytics and performance

### Support

If you encounter issues during deployment:
- Check Railway logs in the dashboard
- Verify all environment variables are correctly set
- Ensure your Supabase database is accessible
- Review the deployment guide in DEPLOYMENT.md