# Vercel Quick Deploy Script
# Run this after authenticating with Vercel CLI

echo "🚀 Starting Vercel deployment..."

# Clean any existing Vercel configuration
echo "Cleaning existing configuration..."
rm -rf .vercel 2>/dev/null || true

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel deploy --prod --yes --name="recovery-fundraising-agent"

echo "✅ Deployment initiated!"
echo "Check your Vercel dashboard for deployment status"
echo "Your app will be available at: https://recovery-fundraising-agent.vercel.app"