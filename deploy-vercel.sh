# Vercel Deployment Script
# This script helps deploy your fundraising app to Vercel

echo "🚀 Starting Vercel deployment process..."

# Check if Vercel CLI is available
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Clean up any existing Vercel configuration
echo "🧹 Cleaning existing configuration..."
rm -rf .vercel 2>/dev/null || true

# Set up project configuration
echo "⚙️  Setting up project configuration..."
cat > .vercel/project.json << EOF
{
  "orgId": "your-org-id",
  "projectId": "your-project-id",
  "settings": {
    "buildCommand": "npm run build",
    "outputDirectory": "dist",
    "framework": "vite",
    "nodeVersion": "18.x"
  }
}
EOF

# Deploy with specific settings
echo "🎯 Deploying to Vercel..."
vercel deploy --prod --yes \
  --name="recovery-fundraising-agent" \
  --build-command="npm run build" \
  --output-directory="dist" \
  --framework="vite"

echo "✅ Deployment initiated!"
echo ""
echo "🌐 Your app will be available at:"
echo "https://recovery-fundraising-agent.vercel.app"
echo ""
echo "📊 Admin Dashboard: https://recovery-fundraising-agent.vercel.app/admin"
echo "🔍 Health Check: https://recovery-fundraising-agent.vercel.app/api/health"
echo ""
echo "⚠️  Don't forget to add your environment variables in the Vercel dashboard!"
echo "Environment variables needed:"
echo "- VITE_SUPABASE_URL=https://tmbuvfmgjpfppqgeabho.supabase.co"
echo "- VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4Njg2MjQsImV4cCI6MjA3ODQ0NDYyNH0.SUfAH1UNVwOA916bD7FbUvzX9n7clrnEPd4fB_7lPj0"
echo "- SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtYnV2Zm1nanBmcHBxZ2VhYmhvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjg2ODYyNCwiZXhwIjoyMDc4NDQ0NjI0fQ.wVELgNFnhu1--fEs0PVQmEzVM0YJ2gseK-zsLzFsxYY"