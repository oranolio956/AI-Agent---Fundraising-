# 24/7 AI Fundraising Agent - Recovery Scholarships

A comprehensive fundraising platform for nonprofits providing scholarships for people in recovery to enter sober living facilities.

## 🚀 Features

- **24/7 AI Fundraising Agent**: Automated prospect research and outreach
- **Donor Management**: Complete CRM with donor profiles and donation history
- **Campaign Management**: Multi-channel fundraising campaigns with analytics
- **Compliance**: GDPR, CAN-SPAM, and privacy law compliance
- **Real-time Analytics**: Performance metrics and donor insights
- **SEO Optimized**: Search engine optimized for maximum visibility
- **Accessibility**: WCAG 2.2 AA compliant for inclusive access

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + Node.js
- **Database**: Supabase (PostgreSQL)
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Email**: Nodemailer + SendGrid
- **Authentication**: Supabase Auth

## 📦 Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.production .env
   # Edit .env with your actual values
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Supabase Setup

1. Create a Supabase project
2. Copy your project URL and anon key
3. Update the `.env` file with your Supabase credentials

### Email Configuration

Configure email settings in `.env`:
- SMTP settings for transactional emails
- SendGrid API key for bulk campaigns

### Payment Processing

Set up Stripe integration:
- Add your Stripe secret and publishable keys
- Configure webhook endpoints for payment processing

## 🚀 Deployment

### Railway Deployment (Recommended)

1. Connect your GitHub repository to Railway
2. Set environment variables from `.env.production`
3. Deploy with one click

### Docker Deployment

```bash
docker build -t fundraising-agent .
docker run -p 3000:3000 --env-file .env fundraising-agent
```

### Vercel Deployment

1. Connect your repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

## 📊 Database Schema

The application uses the following main tables:

- **donors**: Donor information and profiles
- **donations**: Individual donation records
- **campaigns**: Fundraising campaigns
- **prospects**: Potential donor leads
- **communications**: Interaction history
- **recurring_donations**: Subscription donations
- **compliance_logs**: Privacy and compliance tracking

## 🔒 Security & Compliance

- **GDPR Compliant**: Data protection and privacy rights
- **CAN-SPAM Compliant**: Email marketing regulations
- **Data Encryption**: Sensitive data protection
- **Access Control**: Role-based permissions
- **Audit Logging**: Complete activity tracking

## 📈 Analytics & Reporting

- **Real-time Metrics**: Live donation tracking
- **Donor Insights**: Behavior and preference analysis
- **Campaign Performance**: ROI and conversion metrics
- **Predictive Analytics**: Donation forecasting

## 🤖 24/7 Worker System

The platform includes an automated worker system that:
- Researches potential donors continuously
- Sends personalized outreach campaigns
- Tracks engagement and responses
- Updates prospect scores and priorities
- Maintains compliance with outreach regulations

## 🎯 Key Performance Indicators

- **Donation Conversion Rate**: Target 15-25%
- **Donor Retention Rate**: Target 60-80%
- **Average Gift Size**: Target $150-500
- **Cost per Dollar Raised**: Target $0.15-0.25
- **Email Open Rate**: Target 25-35%
- **Response Rate**: Target 5-15%

## 📞 Support

For support and questions:
- Email: support@recoveryscholarships.org
- Documentation: [docs.recoveryscholarships.org](https://docs.recoveryscholarships.org)
- Issues: [GitHub Issues](https://github.com/your-org/fundraising-agent/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for nonprofits supporting recovery and sober living
- Designed with accessibility and inclusivity in mind
- Powered by modern web technologies and AI
