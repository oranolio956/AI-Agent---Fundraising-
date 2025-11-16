# 🚀 Multi-Platform Deployment Guide
# 24/7 AI Fundraising Agent for Recovery Scholarships

## 📋 Quick Deployment Options

### Option 1: Railway (Recommended - Fastest)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init --name "recovery-fundraising-agent"
railway up
```

### Option 2: Docker (Most Flexible)
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Option 3: Manual VPS Setup
```bash
# Clone and setup on any VPS
git clone <your-repo>
cd recovery-scholarship-fundraising-agent
npm install
npm run build
npm run server
```

## 🚂 Railway Deployment (Recommended)

### Step 1: Install Railway CLI
```bash
npm install -g @railway/cli
```

### Step 2: Login to Railway
```bash
railway login
```

### Step 3: Create and Deploy Project
```bash
# Navigate to project directory
cd recovery-scholarship-fundraising-agent

# Initialize Railway project
railway init --name "recovery-fundraising-agent"

# Set environment variables (replace with your values)
railway variables set SUPABASE_URL="your-supabase-url"
railway variables set SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
railway variables set SMTP_PASSWORD="your-sendgrid-api-key"
railway variables set JWT_SECRET="your-jwt-secret"
railway variables set ENCRYPTION_KEY="your-encryption-key"

# Deploy
railway up
```

### Step 4: Verify Deployment
```bash
# Check deployment status
railway status

# View logs
railway logs

# Get deployment URL
railway status | grep "Service URL"
```

## 🐳 Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed

### Step 1: Configure Environment
```bash
# Copy and edit environment file
cp .env.production.template .env
# Edit .env with your actual values
```

### Step 2: Build and Deploy
```bash
# Build and start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

### Step 3: Access Application
- Frontend: http://localhost
- Backend API: http://localhost/api
- Admin Dashboard: http://localhost/admin

## ☁️ Cloud Platform Deployment

### DigitalOcean App Platform
```yaml
# .do/app.yaml
name: recovery-fundraising-agent
services:
- name: web
  source_dir: /
  http_port: 5000
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  env:
  - key: NODE_ENV
    value: production
  - key: SUPABASE_URL
    value: ${SUPABASE_URL}
  - key: SUPABASE_SERVICE_ROLE_KEY
    value: ${SUPABASE_SERVICE_ROLE_KEY}
  - key: SMTP_PASSWORD
    value: ${SENDGRID_API_KEY}
```

### Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create recovery-fundraising-agent

# Set environment variables
heroku config:set SUPABASE_URL=your-supabase-url
heroku config:set SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
heroku config:set SMTP_PASSWORD=your-sendgrid-api-key

# Deploy
git push heroku main
```

### AWS Deployment
```bash
# Using AWS Copilot
copilot init --app recovery-fundraising --name web --type "Load Balanced Web Service"
copilot deploy
```

## 🔧 Environment Configuration

### Required Environment Variables
```bash
# Database
SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email Service
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USERNAME=apikey
SMTP_PASSWORD=your-sendgrid-api-key
FROM_EMAIL=noreply@recoveryscholarshipfund.org

# Security
JWT_SECRET=your-super-secure-jwt-secret
ENCRYPTION_KEY=your-encryption-key-32-chars

# Server
NODE_ENV=production
PORT=5000
LOG_LEVEL=info
```

### Optional Environment Variables
```bash
# Payment Processing
STRIPE_SECRET_KEY=sk_live_your_stripe_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# AI Services
OPENAI_API_KEY=sk-your-openai-key
SERPAPI_KEY=your-serpapi-key

# Monitoring
SENTRY_DSN=your-sentry-dsn
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## ✅ Post-Deployment Verification

### Health Check
```bash
# Test API health
curl https://your-domain.com/api/health

# Should return: {"status":"healthy","timestamp":"..."}
```

### 24/7 Worker Verification
```bash
# Check worker logs (varies by platform)
# Look for these messages:
# - "Running donor research..."
# - "Running donor scoring..."
# - "Running outreach campaigns..."
# - "Running analytics aggregation..."
```

### Database Connection
```bash
# Test database connectivity
curl https://your-domain.com/api/donors
# Should return donor data or empty array
```

### Email Service
```bash
# Test email sending (if endpoint available)
curl -X POST https://your-domain.com/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to":"test@example.com","subject":"Test"}'
```

## 📊 Monitoring Setup

### Application Monitoring
- **Sentry**: Error tracking and performance monitoring
- **Datadog**: Full-stack monitoring
- **New Relic**: Application performance monitoring

### Database Monitoring
- **Supabase Dashboard**: Built-in monitoring
- **pgAdmin**: PostgreSQL monitoring
- **Metabase**: Business intelligence and analytics

### Uptime Monitoring
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Premium uptime monitoring
- **Statuspage**: Public status page

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Check Node.js version
node --version  # Should be 18+

# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Database Connection Issues
```bash
# Verify Supabase credentials
echo $SUPABASE_URL
echo $SUPABASE_SERVICE_ROLE_KEY

# Test connection
curl -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
  "$SUPABASE_URL/rest/v1/"
```

#### Email Delivery Issues
```bash
# Verify SendGrid API key
curl -H "Authorization: Bearer $SMTP_PASSWORD" \
  "https://api.sendgrid.com/v3/scopes"
```

#### 24/7 Worker Issues
```bash
# Check worker logs
tail -f logs/combined.log | grep -E "(donor|campaign|analytics)"

# Verify cron jobs are running
# Look for entries every 15 minutes, 4 hours, 6 hours, and daily
```

## 🔐 Security Checklist

### Production Security
- [ ] Use HTTPS only
- [ ] Set strong JWT secrets
- [ ] Enable rate limiting
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable database SSL
- [ ] Set up monitoring alerts
- [ ] Regular security updates

### Data Protection
- [ ] GDPR compliance implemented
- [ ] Data encryption at rest
- [ ] Secure data transmission
- [ ] Regular backups
- [ ] Access control policies

## 📞 Support Resources

### Platform-Specific Support
- **Railway**: https://railway.app/support
- **Docker**: https://docs.docker.com
- **DigitalOcean**: https://docs.digitalocean.com
- **Heroku**: https://help.heroku.com
- **AWS**: https://aws.amazon.com/support

### Application Support
- **Logs**: Check `logs/combined.log`
- **Health**: `/api/health` endpoint
- **GitHub**: Create issues for bugs
- **Documentation**: See DEPLOYMENT_GUIDE.md

---

## 🎉 **You're Ready to Deploy!**

Choose your preferred deployment method and start helping people in recovery access sober living through AI-powered fundraising!

**The 24/7 AI agent will begin autonomous operation immediately upon deployment.**