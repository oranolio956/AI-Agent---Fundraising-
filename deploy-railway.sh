#!/bin/bash
# 🚂 Railway Deployment Script for 24/7 AI Fundraising Agent

echo "🚀 Deploying 24/7 AI Fundraising Agent to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Installing Railway CLI..."
    npm install -g @railway/cli
fi

# Login to Railway (if not already logged in)
echo "🔐 Checking Railway authentication..."
railway login

# Create new Railway project
echo "🏗️ Creating Railway project..."
railway init --name "recovery-scholarship-fundraising-agent"

# Set environment variables
echo "⚙️ Configuring environment variables..."
railway variables set NODE_ENV=production
railway variables set PORT=5000
railway variables set SUPABASE_URL="${SUPABASE_URL}"
railway variables set SUPABASE_SERVICE_ROLE_KEY="${SUPABASE_SERVICE_ROLE_KEY}"
railway variables set SMTP_HOST=smtp.sendgrid.net
railway variables set SMTP_PORT=587
railway variables set SMTP_USERNAME=apikey
railway variables set SMTP_PASSWORD="${SENDGRID_API_KEY}"
railway variables set FROM_EMAIL=noreply@recoveryscholarshipfund.org
railway variables set JWT_SECRET="${JWT_SECRET}"
railway variables set ENCRYPTION_KEY="${ENCRYPTION_KEY}"
railway variables set LOG_LEVEL=info

# Deploy the project
echo "🚂 Deploying to Railway..."
railway up

# Get deployment URL
DEPLOYMENT_URL=$(railway status | grep "Service URL" | awk '{print $3}')
echo "✅ Deployment successful!"
echo "🌐 Your 24/7 AI Fundraising Agent is running at: ${DEPLOYMENT_URL}"
echo "📊 Admin dashboard: ${DEPLOYMENT_URL}/admin"
echo "💝 Donation page: ${DEPLOYMENT_URL}/donate"
echo "🏠 Homepage: ${DEPLOYMENT_URL}"

echo ""
echo "🔍 Next steps:"
echo "1. Test the API health endpoint: ${DEPLOYMENT_URL}/api/health"
echo "2. Set up your Supabase database"
echo "3. Configure SendGrid for email delivery"
echo "4. Monitor the 24/7 worker logs"
echo "5. Start your first fundraising campaign!"