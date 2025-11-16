# Deployment Guide

## Railway Deployment (Recommended)

Railway is the recommended platform for deploying this full-stack application as it provides:
- Automatic database provisioning
- Built-in SSL certificates
- Easy environment variable management
- Automatic scaling
- Zero-downtime deployments

### Quick Deploy

1. **Connect to Railway**
   - Visit [railway.app](https://railway.app)
   - Connect your GitHub repository
   - Railway will automatically detect and deploy your application

2. **Configure Environment Variables**
   Add these environment variables in Railway dashboard:

   ```
   VITE_SUPABASE_URL=https://tmbuvfmgjpfppqgeabho.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Njg2MjQsImV4cCI6MjA3ODQ0NDYyNH0.SUfAH1UNVwOA916bD7FbUvzX9n7clrnEPd4fB_7lPj0
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjg2ODYyNCwiZXhwIjoyMDc4NDQ0NjI0fQ.wVELgNFnhu1--fEs0PVQmEzVM0YJ2gseK-zsLzFsxYY
   NODE_ENV=production
   PORT=3000
   ```

3. **Add Email Configuration**
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   FROM_EMAIL=your-email@gmail.com
   FROM_NAME="Recovery Scholarships Fund"
   ```

4. **Deploy**
   - Railway will automatically build and deploy your application
   - Your app will be available at `https://your-app.railway.app`

## Docker Deployment

### Build and Run Locally

```bash
# Build the Docker image
docker build -t fundraising-agent .

# Run the container
docker run -p 3000:3000 --env-file .env fundraising-agent
```

### Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - VITE_SUPABASE_URL=${VITE_SUPABASE_URL}
      - VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY}
      - SUPABASE_SERVICE_ROLE_KEY=${SUPABASE_SERVICE_ROLE_KEY}
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_PORT=${SMTP_PORT}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASS=${SMTP_PASS}
      - FROM_EMAIL=${FROM_EMAIL}
      - FROM_NAME=${FROM_NAME}
    restart: unless-stopped
```

## Manual Server Deployment

### Prerequisites
- Node.js 18+ installed
- PM2 for process management
- Nginx for reverse proxy

### Steps

1. **Clone and Setup**
   ```bash
   git clone <your-repo>
   cd fundraising-agent
   npm install
   npm run build
   ```

2. **Environment Setup**
   ```bash
   cp .env.production .env
   # Edit .env with your production values
   ```

3. **PM2 Process Management**
   ```bash
   npm install -g pm2
   pm2 start api/server.js --name "fundraising-agent"
   pm2 startup
   pm2 save
   ```

4. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

## Post-Deployment Checklist

### ✅ Database Verification
- [ ] Verify Supabase connection is working
- [ ] Check that all tables were created successfully
- [ ] Test sample data insertion

### ✅ Email Configuration
- [ ] Test email sending functionality
- [ ] Verify SMTP credentials are correct
- [ ] Check spam folder settings

### ✅ Security Setup
- [ ] Enable SSL/HTTPS
- [ ] Configure rate limiting
- [ ] Set up monitoring and alerts
- [ ] Enable backup strategies

### ✅ 24/7 Worker System
- [ ] Verify worker processes are running
- [ ] Check cron job schedules
- [ ] Test automated outreach campaigns
- [ ] Monitor compliance logs

### ✅ Analytics & Monitoring
- [ ] Set up Google Analytics
- [ ] Configure error tracking (Sentry)
- [ ] Set up performance monitoring
- [ ] Create dashboard alerts

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Verify Supabase credentials in environment variables
   - Check network connectivity
   - Ensure IP whitelist settings in Supabase

2. **Email Not Sending**
   - Verify SMTP credentials
   - Check email service provider settings
   - Review spam folder configuration

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Review build logs for specific errors

4. **Worker System Not Running**
   - Check cron job syntax
   - Verify worker process permissions
   - Review worker logs for errors

### Support

For deployment assistance:
- Check application logs: `pm2 logs`
- Monitor system resources: `pm2 monit`
- Review Railway deployment logs in dashboard
- Contact support with error logs and configuration details

## Next Steps

After successful deployment:

1. **Configure Custom Domain**
   - Set up your organization's domain
   - Configure SSL certificates
   - Set up email authentication

2. **Content Management**
   - Update website content and messaging
   - Configure donation forms
   - Set up thank you pages

3. **Campaign Setup**
   - Create initial fundraising campaigns
   - Configure donor segments
   - Set up automated workflows

4. **Team Training**
   - Train staff on admin dashboard
   - Set up user accounts and permissions
   - Create standard operating procedures

5. **Launch Strategy**
   - Plan launch announcement
   - Set up initial outreach campaigns
   - Monitor performance metrics