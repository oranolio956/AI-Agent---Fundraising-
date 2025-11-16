# Recovery Scholarships Fundraising Platform

A fundraising platform built to help nonprofits raise money for recovery scholarships - providing financial assistance for people in recovery to access sober living facilities and support services.

## What This Platform Does

This is a complete fundraising management system that helps organizations:

- **Manage Donors**: Keep track of donor information, donation history, and communication preferences
- **Run Fundraising Campaigns**: Create and manage multiple fundraising campaigns with real-time progress tracking
- **Process Donations**: Accept one-time and recurring donations with secure payment processing
- **Stay Compliant**: Built-in tools to ensure compliance with fundraising regulations and privacy laws
- **Track Performance**: See what's working with detailed analytics on campaign performance and donor engagement

## Who This Is For

Nonprofit organizations, recovery centers, and community groups that provide:
- Recovery scholarships for sober living
- Financial assistance for treatment programs
- Support services for people in recovery
- Community-based recovery initiatives

## Getting Started

### Quick Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/oranolio956/AI-Agent---Fundraising-.git
   cd AI-Agent---Fundraising-
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials and settings
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

### Database Setup

The platform uses Supabase (PostgreSQL) for data storage. You'll need to:

1. Create a free Supabase account at supabase.com
2. Create a new project
3. Copy your project URL and API keys to the `.env` file
4. The database schema will be automatically applied

### Environment Variables

Key settings you'll need to configure:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Email Configuration
SMTP_HOST=your_email_provider
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password

# Payment Processing (Optional)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

## Platform Features

### Donor Management
- Complete donor profiles with contact information and preferences
- Donation history and giving patterns
- Communication tracking and notes
- Segmentation tools for targeted outreach

### Campaign Management
- Create multiple fundraising campaigns
- Set goals and track progress in real-time
- A/B testing for campaign messaging
- Automated thank you messages and receipts

### Donation Processing
- Secure online donation forms
- One-time and recurring donation options
- Multiple payment methods (credit card, bank transfer)
- Automatic tax receipt generation

### Analytics Dashboard
- Real-time donation tracking
- Campaign performance metrics
- Donor retention and acquisition insights
- Export reports for board meetings

### Compliance Tools
- GDPR-compliant data handling
- CAN-SPAM email compliance
- Donation receipt management
- Privacy policy and terms generators

## Deployment Options

### Option 1: Railway (Recommended)
- Connect your GitHub repository
- Automatic deployments on code changes
- Built-in database and SSL
- Simple environment variable management

### Option 2: Vercel
- One-click deployment from GitHub
- Global CDN for fast loading
- Automatic HTTPS
- Serverless functions for backend

### Option 3: Docker
```bash
docker build -t fundraising-platform .
docker run -p 3000:3000 --env-file .env fundraising-platform
```

## Support and Documentation

If you need help getting started:
- Check the deployment guides in the repository
- Review the database schema in `supabase/migrations/`
- Open an issue on GitHub for technical questions

## License

This project is open source and available under the MIT License. Feel free to use, modify, and distribute as needed for your organization.

---

*Built for the recovery community, by people who care about recovery.*