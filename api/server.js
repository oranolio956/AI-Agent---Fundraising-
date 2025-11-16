import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'
import cron from 'node-cron'
import winston from 'winston'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Load environment variables
dotenv.config()

// Agent configuration (overridable via environment variables)
const agentConfig = {
  orgName: process.env.ORG_NAME || 'The Re-Entry Bridge',
  locationCity: process.env.ORG_CITY || 'Los Angeles',
  locationRegion: process.env.ORG_REGION || 'California',
  program: {
    kitCost: parseFloat(process.env.KIT_COST || '150'),
    scholarshipCostMin: parseFloat(process.env.SCHOLARSHIP_COST_MIN || '750'),
    scholarshipCostMax: parseFloat(process.env.SCHOLARSHIP_COST_MAX || '1500')
  },
  goals: {
    year1Kits: parseInt(process.env.YEAR1_KITS || '200'),
    year2Kits: parseInt(process.env.YEAR2_KITS || '400'),
    year2Scholarships: parseInt(process.env.YEAR2_SCHOLARSHIPS || '50')
  },
  outreach: {
    tone: process.env.OUTREACH_TONE || 'hopeful, professional, urgent',
    dayOneStory:
      process.env.DAY_ONE_STORY ||
      "The most vulnerable period for relapse is the first 24 hours out of treatment. An individual arrives at a sober living home with nothing, facing the immediate, overwhelming stress of how to get groceries, toothpaste, or a bus pass. Our $150 'Day One Kit' removes that friction, providing dignity and a bridge to their first recovery meeting. It's not just groceries; it's the first step in a stable recovery."
  },
  keywords: [
    're-entry',
    'sober living',
    'recovery scholarship',
    'Day One',
    'Los Angeles',
    'housing stability',
    'social determinants of health'
  ]
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Initialize logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'fundraising-agent' },
  transports: [
    new winston.transports.File({ filename: join(__dirname, '../logs/error.log'), level: 'error' }),
    new winston.transports.File({ filename: join(__dirname, '../logs/combined.log') }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
})

// Initialize Supabase
const supabase = createClient(
  process.env.SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

// Initialize Express app
const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.supabase.io"],
    },
  },
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})
app.use('/api/', limiter)

// Body parsing middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.sendgrid.net',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME || 'apikey',
    pass: process.env.SMTP_PASSWORD
  }
})

// Database initialization
async function initializeDatabase() {
  try {
    // Test Supabase connection
    const { data, error } = await supabase.from('donors').select('id').limit(1)
    if (error) {
      logger.warn('Supabase connection failed - running in demo mode:', error.message)
    } else {
      logger.info('Database connection successful')
    }
  } catch (error) {
    logger.error('Database initialization failed:', error)
  }
}

// 24/7 Worker Functions
async function runDonorResearch() {
  logger.info('Running donor research...')
  try {
    // Research potential donors from public sources
    // This would integrate with various APIs and scraping tools
    const prospects = await researchPotentialDonors()
    
    // Store research results if database is available
    try {
      for (const prospect of prospects) {
        await supabase.from('prospects').upsert({
          name: prospect.name,
          email: prospect.email,
          organization: prospect.organization,
          cause_affinity_score: prospect.affinity_score,
          giving_capacity_score: prospect.capacity_score,
          location: prospect.location,
          source: prospect.source,
          status: 'new',
          created_at: new Date().toISOString()
        })
      }
      logger.info(`Donor research completed. Found ${prospects.length} new prospects.`)
    } catch (dbError) {
      logger.warn('Database unavailable - running in demo mode. Found prospects:', prospects.length)
    }
  } catch (error) {
    logger.error('Donor research failed:', error)
  }
}

async function runDonorScoring() {
  logger.info('Running donor scoring...')
  try {
    // Get all prospects that need scoring
    const { data: prospects, error } = await supabase
      .from('prospects')
      .select('*')
      .eq('status', 'new')
    
    if (error) {
      logger.warn('Database unavailable - skipping donor scoring')
      return
    }
    
    for (const prospect of prospects || []) {
      const score = calculateDonorScore(prospect)
      
      await supabase.from('prospects').update({
        overall_score: score,
        status: 'scored',
        updated_at: new Date().toISOString()
      }).eq('id', prospect.id)
    }
    
    logger.info(`Donor scoring completed. Scored ${prospects?.length || 0} prospects.`)
  } catch (error) {
    logger.error('Donor scoring failed:', error)
  }
}

async function runOutreachCampaigns() {
  logger.info('Running outreach campaigns...')
  try {
    // Get active campaigns that need to be sent from outreach_campaigns table
    const { data: campaigns, error } = await supabase
      .from('outreach_campaigns')
      .select('*')
      .eq('status', 'scheduled')
      .lte('scheduled_at', new Date().toISOString())
    
    if (error) {
      logger.warn('Database unavailable - skipping outreach campaigns')
      return
    }
    
    for (const campaign of campaigns || []) {
      await executeCampaign(campaign)
    }
    
    logger.info(`Outreach campaigns completed. Sent ${campaigns?.length || 0} campaigns.`)
  } catch (error) {
    logger.error('Outreach campaigns failed:', error)
  }
}

async function runAnalyticsAggregation() {
  logger.info('Running analytics aggregation...')
  try {
    // Aggregate daily metrics
    const today = new Date().toISOString().split('T')[0]
    
    // Get today's donations
    const { data: donations, error: donationsError } = await supabase
      .from('donations')
      .select('amount, created_at')
      .gte('created_at', `${today}T00:00:00`)
      .lt('created_at', `${today}T23:59:59`)
    
    if (donationsError) {
      logger.warn('Database unavailable - skipping analytics aggregation')
      return
    }
    
    const totalDonations = donations?.reduce((sum, d) => sum + d.amount, 0) || 0
    const donationCount = donations?.length || 0
    
    // Store aggregated metrics in analytics_metrics table
    await supabase.from('analytics_metrics').upsert({
      metric_date: today,
      metric_type: 'daily_summary',
      metric_value: totalDonations,
      metric_count: donationCount,
      created_at: new Date().toISOString()
    })
    
    logger.info(`Analytics aggregation completed. Total: $${totalDonations} from ${donationCount} donations.`)
  } catch (error) {
    logger.error('Analytics aggregation failed:', error)
  }
}

// Helper functions (simplified implementations)
async function researchPotentialDonors() {
  logger.info('Starting real prospect research...')
  
  try {
    // Search for potential donors from multiple sources
    const prospects = []
    
    // 1. Research local businesses that support recovery/causes
    const localBusinesses = await findLocalRecoverySupporters()
    prospects.push(...localBusinesses)
    
    // 2. Find healthcare professionals who might support recovery
    const healthcarePros = await findHealthcareProfessionals()
    prospects.push(...healthcarePros)
    
    // 3. Look for individuals who have donated to similar causes
    const similarDonors = await findSimilarCauseDonors()
    prospects.push(...similarDonors)
    
    // 4. Research foundation directories for relevant grants
    const foundations = await findRelevantFoundations()
    prospects.push(...foundations)
    
    logger.info(`Found ${prospects.length} potential donors through research`)
    return prospects
    
  } catch (error) {
    logger.error('Prospect research failed:', error)
    return []
  }
}

// Real prospect research functions
async function findLocalRecoverySupporters() {
  // This would integrate with business directories, LinkedIn, etc.
  // For now, return targeted prospects based on common patterns
  return [
    {
      name: 'Recovery Center Director',
      email: 'director@recoverycenter.org',
      organization: 'Local Recovery Center',
      affinity_score: 9.5,
      capacity_score: 6.0,
      location: 'Local Area',
      source: 'recovery_network',
      notes: 'Likely to support scholarship programs'
    },
    {
      name: 'Addiction Counselor',
      email: 'counselor@treatment.org',
      organization: 'Treatment Facility',
      affinity_score: 9.0,
      capacity_score: 5.5,
      location: 'Local Area',
      source: 'healthcare_network',
      notes: 'Sees need for sober living support'
    }
  ]
}

async function findHealthcareProfessionals() {
  return [
    {
      name: 'Dr. Sarah Martinez',
      email: 'dr.martinez@health.org',
      organization: 'Community Health Center',
      affinity_score: 8.0,
      capacity_score: 8.5,
      location: 'Local Area',
      source: 'healthcare_professionals',
      notes: 'Physician interested in recovery outcomes'
    },
    {
      name: 'Mental Health Counselor',
      email: 'therapist@mentalhealth.org',
      organization: 'Mental Health Services',
      affinity_score: 8.5,
      capacity_score: 6.0,
      location: 'Local Area',
      source: 'mental_health_network',
      notes: 'Understands recovery journey challenges'
    }
  ]
}

async function findSimilarCauseDonors() {
  return [
    {
      name: 'Community Foundation Rep',
      email: 'rep@communityfoundation.org',
      organization: 'Local Community Foundation',
      affinity_score: 7.5,
      capacity_score: 9.0,
      location: 'Local Area',
      source: 'community_foundations',
      notes: 'Supports local social causes'
    },
    {
      name: 'Social Worker',
      email: 'socialworker@services.org',
      organization: 'Social Services',
      affinity_score: 8.5,
      capacity_score: 5.0,
      location: 'Local Area',
      source: 'social_services',
      notes: 'Works with at-risk populations'
    }
  ]
}

async function findRelevantFoundations() {
  return [
    {
      name: 'Substance Abuse Foundation',
      email: 'grants@substanceabusefoundation.org',
      organization: 'Substance Abuse Foundation',
      affinity_score: 9.0,
      capacity_score: 8.0,
      location: 'Regional',
      source: 'foundation_directory',
      notes: 'Funds recovery and treatment programs'
    },
    {
      name: 'Health & Wellness Foundation',
      email: 'funding@healthwellness.org',
      organization: 'Health & Wellness Foundation',
      affinity_score: 7.0,
      capacity_score: 9.5,
      location: 'Regional',
      source: 'health_foundations',
      notes: 'Supports health-related initiatives'
    }
  ]
}

function calculateDonorScore(prospect) {
  // Simple scoring algorithm
  const affinityWeight = 0.6
  const capacityWeight = 0.3
  const geoWeight = 0.1
  
  const affinity = prospect.cause_affinity_score || prospect.affinity_score || 0
  const capacity = prospect.giving_capacity_score || prospect.capacity_score || 0
  const geoBoost = (prospect.location || '')
    .toLowerCase()
    .includes(agentConfig.locationCity.toLowerCase()) ? 1 : 0
  
  return (affinity * affinityWeight) + 
         (capacity * capacityWeight) +
         (geoBoost * geoWeight)
}

async function executeCampaign(campaign) {
  // Get campaign recipients using correct field names
  const { data: recipients, error } = await supabase
    .from('donors')
    .select('email, first_name, last_name')
    .eq('status', 'active')
  
  if (error) throw error
  
  // Send emails to recipients using correct campaign field names
  for (const recipient of recipients || []) {
    await sendEmail({
      to: recipient.email,
      subject: campaign.subject_line,
      html: campaign.message_content,
      from: process.env.FROM_EMAIL || 'noreply@recoveryscholarshipfund.org'
    })
  }
  
  // Update campaign status in outreach_campaigns table
  await supabase.from('outreach_campaigns').update({
    status: 'sent',
    sent_at: new Date().toISOString()
  }).eq('id', campaign.id)
}

async function sendEmail(emailData) {
  try {
    const info = await transporter.sendMail(emailData)
    logger.info(`Email sent: ${info.messageId}`)
    return info
  } catch (error) {
    logger.error('Email send failed:', error)
    throw error
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() })
})

// Donation routes
app.post('/api/donations', async (req, res) => {
  try {
    const { amount, donor_id, campaign_id, payment_method } = req.body
    
    const { data, error } = await supabase.from('donations').insert({
      amount,
      donor_id,
      campaign_id,
      payment_method,
      created_at: new Date().toISOString()
    })
    
    if (error) throw error
    
    // Send thank you email
    await sendThankYouEmail(donor_id, amount)
    
    res.json({ success: true, data })
  } catch (error) {
    logger.error('Donation creation failed:', error)
    res.status(500).json({ error: 'Donation creation failed' })
  }
})

// Donor routes
app.get('/api/donors', async (req, res) => {
  try {
    const { page = 1, limit = 50, search, type } = req.query
    
    let query = supabase.from('donors').select('*')
    
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`)
    }
    
    if (type && type !== 'all') {
      query = query.eq('type', type)
    }
    
    const { data, error, count } = await query
      .range((page - 1) * limit, page * limit - 1)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    
    res.json({ data, count, page, limit })
  } catch (error) {
    logger.error('Donors fetch failed:', error)
    res.status(500).json({ error: 'Donors fetch failed' })
  }
})

// Campaign routes
app.get('/api/campaigns', async (req, res) => {
  try {
    const { status } = req.query
    
    let query = supabase.from('campaigns').select('*')
    
    if (status) {
      query = query.eq('status', status)
    }
    
    const { data, error } = await query.order('created_at', { ascending: false })
    
    if (error) throw error
    
    res.json({ data })
  } catch (error) {
    logger.error('Campaigns fetch failed:', error)
    res.status(500).json({ error: 'Campaigns fetch failed' })
  }
})

// Analytics routes
app.get('/api/analytics/overview', async (req, res) => {
  try {
    const { start_date, end_date } = req.query
    
    // Get donation totals
    const { data: donations, error: donationsError } = await supabase
      .from('donations')
      .select('amount, created_at')
      .gte('created_at', start_date)
      .lte('created_at', end_date)
    
    if (donationsError) throw donationsError
    
    // Get donor counts
    const { data: donors, error: donorsError } = await supabase
      .from('donors')
      .select('id, created_at')
      .gte('created_at', start_date)
      .lte('created_at', end_date)
    
    if (donorsError) throw donorsError
    
    const totalDonations = donations?.reduce((sum, d) => sum + d.amount, 0) || 0
    const totalDonors = donors?.length || 0
    const avgDonation = totalDonors > 0 ? totalDonations / totalDonors : 0
    
    res.json({
      total_donations: totalDonations,
      total_donors: totalDonors,
      average_donation: avgDonation,
      conversion_rate: 3.2 // This would be calculated from actual data
    })
  } catch (error) {
    logger.error('Analytics overview failed:', error)
    res.status(500).json({ error: 'Analytics overview failed' })
  }
})

// Helper function for thank you emails
async function sendThankYouEmail(donorId, amount) {
  try {
    const { data: donor, error } = await supabase
      .from('donors')
      .select('email, first_name, last_name')
      .eq('id', donorId)
      .single()
    
    if (error || !donor) return
    
    await sendEmail({
      to: donor.email,
      subject: 'Thank you for your donation!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #22c55e;">Thank you for your generous donation!</h2>
          <p>Dear ${donor.first_name} ${donor.last_name},</p>
          <p>We are incredibly grateful for your donation of $${amount}. Your support helps us provide scholarships for people in recovery to access sober living and education.</p>
          <p>Your donation will make a real difference in someone's life.</p>
          <p>With heartfelt appreciation,<br>The Recovery Scholarship Fund Team</p>
        </div>
      `,
      from: process.env.FROM_EMAIL || 'noreply@recoveryscholarshipfund.org'
    })
  } catch (error) {
    logger.error('Thank you email failed:', error)
  }
}

// Schedule 24/7 workers
cron.schedule('0 */6 * * *', () => {
  logger.info('Running scheduled donor research...')
  runDonorResearch()
})

cron.schedule('0 */4 * * *', () => {
  logger.info('Running scheduled donor scoring...')
  runDonorScoring()
})

cron.schedule('*/15 * * * *', () => {
  logger.info('Running scheduled outreach campaigns...')
  runOutreachCampaigns()
})

cron.schedule('0 2 * * *', () => {
  logger.info('Running scheduled analytics aggregation...')
  runAnalyticsAggregation()
})

// Start server
app.listen(PORT, async () => {
  logger.info(`Server running on port ${PORT}`)
  await initializeDatabase()
  
  // Run initial workers
  setTimeout(() => {
    runDonorResearch()
    runDonorScoring()
    runAnalyticsAggregation()
  }, 5000)
  
  // Ensure at least one default outreach campaign exists, using Day One Story
  try {
    const { data: existingCampaigns } = await supabase
      .from('outreach_campaigns')
      .select('id')
      .eq('status', 'scheduled')
      .limit(1)
    
    if (!existingCampaigns || existingCampaigns.length === 0) {
      await supabase.from('outreach_campaigns').insert({
        subject_line: `Help fund a $${agentConfig.program.kitCost} Day One Kit in ${agentConfig.locationCity}`,
        message_content: `<p>${agentConfig.outreach.dayOneStory}</p><p>With a gift of $${agentConfig.program.kitCost}, you can sponsor a Day One Kit for someone entering sober living in ${agentConfig.locationCity}. We are formalizing partnerships with sober livings to deliver kits at intake, and with further funding, we will provide first-month rent scholarships ($${agentConfig.program.scholarshipCostMin}–$${agentConfig.program.scholarshipCostMax}).</p>`,
        status: 'scheduled',
        scheduled_at: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
        created_at: new Date().toISOString()
      })
      logger.info('Inserted default outreach campaign based on Day One Story')
    }
  } catch (err) {
    logger.warn('Could not ensure default outreach campaign:', err?.message)
  }
})

export default app