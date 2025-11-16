-- Database initialization script for Recovery Scholarship Fund
-- This script creates all necessary tables for the AI fundraising agent

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Donors table - stores donor information
CREATE TABLE IF NOT EXISTS donors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  type VARCHAR(50) DEFAULT 'one-time' CHECK (type IN ('one-time', 'monthly', 'corporate', 'foundation')),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'unsubscribed')),
  total_donated DECIMAL(10,2) DEFAULT 0,
  first_donation_date TIMESTAMP WITH TIME ZONE,
  last_donation_date TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Donations table - stores all donation records
CREATE TABLE IF NOT EXISTS donations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
  currency VARCHAR(3) DEFAULT 'USD',
  campaign_id UUID REFERENCES campaigns(id),
  payment_method VARCHAR(50) CHECK (payment_method IN ('credit_card', 'bank_transfer', 'paypal', 'check', 'cash')),
  payment_status VARCHAR(50) DEFAULT 'completed' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaigns table - stores marketing campaigns
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('email', 'social', 'sms', 'direct_mail')),
  subject VARCHAR(255),
  content TEXT,
  html_content TEXT,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sent', 'paused', 'archived')),
  recipients_count INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  delivered_count INTEGER DEFAULT 0,
  opened_count INTEGER DEFAULT 0,
  clicked_count INTEGER DEFAULT 0,
  bounced_count INTEGER DEFAULT 0,
  unsubscribed_count INTEGER DEFAULT 0,
  conversion_count INTEGER DEFAULT 0,
  open_rate DECIMAL(5,2) DEFAULT 0,
  click_rate DECIMAL(5,2) DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_by UUID,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Prospects table - stores potential donors discovered by AI
CREATE TABLE IF NOT EXISTS prospects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(20),
  organization VARCHAR(255),
  title VARCHAR(255),
  location VARCHAR(255),
  cause_affinity_score DECIMAL(3,2) CHECK (cause_affinity_score >= 0 AND cause_affinity_score <= 10),
  giving_capacity_score DECIMAL(3,2) CHECK (giving_capacity_score >= 0 AND giving_capacity_score <= 10),
  overall_score DECIMAL(3,2) CHECK (overall_score >= 0 AND overall_score <= 10),
  source VARCHAR(100) CHECK (source IN ('foundation_directory', 'corporate_giving', 'public_records', 'social_media', 'partnership', 'manual')),
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'scored', 'contacted', 'interested', 'not_interested', 'converted', 'archived')),
  notes TEXT,
  contact_history JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Campaign recipients table - junction table for many-to-many relationship
CREATE TABLE IF NOT EXISTS campaign_recipients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  donor_id UUID REFERENCES donors(id) ON DELETE CASCADE,
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'opened', 'clicked', 'bounced', 'failed')),
  sent_at TIMESTAMP WITH TIME ZONE,
  opened_at TIMESTAMP WITH TIME ZONE,
  clicked_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(campaign_id, donor_id, prospect_id)
);

-- Daily metrics table - stores aggregated analytics
CREATE TABLE IF NOT EXISTS daily_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date DATE NOT NULL UNIQUE,
  total_donations DECIMAL(12,2) DEFAULT 0,
  donation_count INTEGER DEFAULT 0,
  new_donors INTEGER DEFAULT 0,
  recurring_donors INTEGER DEFAULT 0,
  website_visits INTEGER DEFAULT 0,
  email_opens INTEGER DEFAULT 0,
  email_clicks INTEGER DEFAULT 0,
  social_engagement INTEGER DEFAULT 0,
  conversion_rate DECIMAL(5,2) DEFAULT 0,
  average_donation DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Consent and preferences table - stores privacy compliance data
CREATE TABLE IF NOT EXISTS consent_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  donor_id UUID REFERENCES donors(id) ON DELETE CASCADE,
  prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('email', 'sms', 'phone', 'mail', 'marketing')),
  action VARCHAR(50) NOT NULL CHECK (action IN ('granted', 'withdrawn', 'updated')),
  method VARCHAR(100),
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Partnerships table - stores organizational partnerships
CREATE TABLE IF NOT EXISTS partnerships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('treatment_center', 'employer', 'foundation', 'corporate', 'community_org', 'faith_org')),
  contact_name VARCHAR(255),
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  address TEXT,
  website VARCHAR(255),
  status VARCHAR(50) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending', 'archived')),
  agreement_terms TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Impact stories table - stores success stories for marketing
CREATE TABLE IF NOT EXISTS impact_stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_name VARCHAR(255),
  author_title VARCHAR(255),
  program VARCHAR(255),
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donors_email ON donors(email);
CREATE INDEX IF NOT EXISTS idx_donors_status ON donors(status);
CREATE INDEX IF NOT EXISTS idx_donors_type ON donors(type);
CREATE INDEX IF NOT EXISTS idx_donations_donor_id ON donations(donor_id);
CREATE INDEX IF NOT EXISTS idx_donations_created_at ON donations(created_at);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_type ON campaigns(type);
CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_overall_score ON prospects(overall_score DESC);
CREATE INDEX IF NOT EXISTS idx_campaign_recipients_campaign_id ON campaign_recipients(campaign_id);
CREATE INDEX IF NOT EXISTS idx_daily_metrics_date ON daily_metrics(date);
CREATE INDEX IF NOT EXISTS idx_consent_logs_donor_id ON consent_logs(donor_id);
CREATE INDEX IF NOT EXISTS idx_consent_logs_created_at ON consent_logs(created_at);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_donors_updated_at BEFORE UPDATE ON donors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_donations_updated_at BEFORE UPDATE ON donations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at BEFORE UPDATE ON campaigns
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_prospects_updated_at BEFORE UPDATE ON prospects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_partnerships_updated_at BEFORE UPDATE ON partnerships
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_impact_stories_updated_at BEFORE UPDATE ON impact_stories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) policies
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE consent_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE partnerships ENABLE ROW LEVEL SECURITY;
ALTER TABLE impact_stories ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Public read access for active donors" ON donors
    FOR SELECT USING (status = 'active');

CREATE POLICY "Authenticated users can manage donors" ON donors
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read access for completed donations" ON donations
    FOR SELECT USING (payment_status = 'completed');

CREATE POLICY "Authenticated users can manage donations" ON donations
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Public read access for sent campaigns" ON campaigns
    FOR SELECT USING (status = 'sent');

CREATE POLICY "Authenticated users can manage campaigns" ON campaigns
    FOR ALL USING (auth.role() = 'authenticated');

-- Grant permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- Insert sample data
INSERT INTO donors (name, email, phone, type, status, total_donated) VALUES
    ('Sarah Johnson', 'sarah.j@email.com', '(555) 123-4567', 'monthly', 'active', 2400),
    ('Robert Chen', 'robert.chen@email.com', '(555) 234-5678', 'one-time', 'active', 850),
    ('Maria Rodriguez', 'maria.r@email.com', '(555) 345-6789', 'monthly', 'active', 3600),
    ('David Smith', 'david.smith@email.com', '(555) 456-7890', 'one-time', 'inactive', 425);

INSERT INTO campaigns (name, type, subject, content, status, recipients_count, sent_count, open_rate, click_rate, conversion_rate) VALUES
    ('Year-End Giving Campaign', 'email', 'Make a difference this holiday season', 'Help us provide more recovery scholarships this year-end...', 'sent', 1247, 1180, 42.5, 8.9, 3.2),
    ('Recovery Awareness Month', 'social', 'September is Recovery Awareness Month', 'Join us in celebrating recovery and supporting those on their journey...', 'sent', 3200, 3200, 58.0, 7.3, 2.8);

INSERT INTO impact_stories (title, content, author_name, author_title, program, featured, published) VALUES
    ('From Addiction to Nursing: Maria''s Journey', 'Maria came to us broken and hopeless after years of addiction...', 'Maria Rodriguez', 'Recovery Scholarship Graduate', 'Nursing Certification', true, true),
    ('Building a New Life Through Technology', 'James found purpose and passion in technology after completing our program...', 'James Thompson', 'IT Specialist', 'IT Training Program', true, true);

-- Create a function to initialize the database (for API use)
CREATE OR REPLACE FUNCTION initialize_database()
RETURNS BOOLEAN AS $$
BEGIN
    -- This function exists to satisfy the API initialization call
    -- All tables are created above, so we just return true
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;