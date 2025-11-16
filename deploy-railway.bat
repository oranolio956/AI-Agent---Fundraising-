@echo off
REM 🚂 Railway Deployment Script for 24/7 AI Fundraising Agent (Windows)

echo 🚀 Deploying 24/7 AI Fundraising Agent to Railway...

REM Check if Railway CLI is installed
where railway >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installing Railway CLI...
    npm install -g @railway/cli
)

REM Login to Railway (if not already logged in)
echo 🔐 Checking Railway authentication...
railway login

REM Create new Railway project
echo 🏗️ Creating Railway project...
railway init --name "recovery-scholarship-fundraising-agent"

REM Set environment variables
echo ⚙️ Configuring environment variables...
railway variables set NODE_ENV=production
railway variables set PORT=5000
railway variables set SUPABASE_URL="%SUPABASE_URL%"
railway variables set SUPABASE_SERVICE_ROLE_KEY="%SUPABASE_SERVICE_ROLE_KEY%"
railway variables set SMTP_HOST=smtp.sendgrid.net
railway variables set SMTP_PORT=587
railway variables set SMTP_USERNAME=apikey
railway variables set SMTP_PASSWORD="%SENDGRID_API_KEY%"
railway variables set FROM_EMAIL=noreply@recoveryscholarshipfund.org
railway variables set JWT_SECRET="%JWT_SECRET%"
railway variables set ENCRYPTION_KEY="%ENCRYPTION_KEY%"
railway variables set LOG_LEVEL=info

REM Deploy the project
echo 🚂 Deploying to Railway...
railway up

echo ✅ Deployment initiated!
echo 📋 To check deployment status, run: railway status
echo 🌐 Once deployed, your 24/7 AI Fundraising Agent will be available at your Railway URL
echo 📊 Admin dashboard will be at: [your-railway-url]/admin
echo 💝 Donation page will be at: [your-railway-url]/donate

echo.
echo 🔍 Next steps:
echo 1. Run 'railway status' to check deployment progress
echo 2. Test the API health endpoint once deployed
echo 3. Set up your Supabase database
echo 4. Configure SendGrid for email delivery
echo 5. Monitor the 24/7 worker logs
echo 6. Start your first fundraising campaign!

pause