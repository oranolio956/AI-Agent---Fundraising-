-- Fundraising Database Schema for 24/7 AI Fundraising Agent
-- This schema supports donor management, campaigns, donations, prospects, and compliance

-- Donors table for managing donor information
CREATE TABLE IF NOT EXISTS donors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    address JSONB,
    donor_type TEXT CHECK (donor_type IN ('individual', 'corporate', 'foundation', 'government')),
    status TEXT CHECK (status IN ('active', 'lapsed', 'inactive', 'prospect')) DEFAULT 'prospect',
    total_donated DECIMAL(10,2) DEFAULT 0,
    first_donation_date DATE,
    last_donation_date DATE,
    donation_count INTEGER DEFAULT 0,
    preferred_contact_method TEXT CHECK (preferred_contact_method IN ('email', 'phone', 'mail', 'text')),
    communication_preferences JSONB DEFAULT '{}',
    notes TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Donations table for tracking all donations
CREATE TABLE IF NOT EXISTS donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_id UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    donation_date DATE NOT NULL,
    payment_method TEXT CHECK (payment_method IN ('credit_card', 'bank_transfer', 'check', 'cash', 'crypto', 'stock')),
    payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded', 'cancelled')) DEFAULT 'pending',
    campaign_id UUID,
    recurring_donation_id UUID,
    is_recurring BOOLEAN DEFAULT FALSE,
    is_anonymous BOOLEAN DEFAULT FALSE,
    dedication TEXT,
    notes TEXT,
    transaction_id TEXT,
    processor_response JSONB,
    tax_deductible BOOLEAN DEFAULT TRUE,
    receipt_sent BOOLEAN DEFAULT FALSE,
    thank_you_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Campaigns table for managing fundraising campaigns
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    campaign_type TEXT CHECK (campaign_type IN ('annual_fund', 'capital_campaign', 'emergency', 'event', 'online', 'direct_mail', 'major_gift', 'planned_giving')),
    goal_amount DECIMAL(10,2) NOT NULL,
    raised_amount DECIMAL(10,2) DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE,
    status TEXT CHECK (status IN ('draft', 'active', 'paused', 'completed', 'cancelled')) DEFAULT 'draft',
    visibility TEXT CHECK (visibility IN ('public', 'private', 'invite_only')) DEFAULT 'public',
    appeal_message TEXT,
    thank_you_message TEXT,
    media_urls TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prospects table for potential donors and leads
CREATE TABLE IF NOT EXISTS prospects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT,
    last_name TEXT,
    phone TEXT,
    organization TEXT,
    prospect_type TEXT CHECK (prospect_type IN ('individual', 'corporate', 'foundation', 'government')),
    source TEXT CHECK (source IN ('website', 'event', 'referral', 'research', 'social_media', 'cold_outreach', 'partnership')),
    status TEXT CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'converted', 'lost', 'not_interested')) DEFAULT 'new',
    priority TEXT CHECK (priority IN ('high', 'medium', 'low')) DEFAULT 'medium',
    estimated_capacity DECIMAL(10,2),
    estimated_timing TEXT CHECK (estimated_timing IN ('immediate', '3_months', '6_months', '1_year', '2_years', 'unknown')),
    interests TEXT[] DEFAULT '{}',
    last_contact_date DATE,
    next_follow_up_date DATE,
    assigned_to UUID REFERENCES auth.users(id),
    notes TEXT,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Outreach campaigns for managing communications
CREATE TABLE IF NOT EXISTS outreach_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    campaign_type TEXT CHECK (campaign_type IN ('email', 'sms', 'direct_mail', 'phone', 'social_media')),
    status TEXT CHECK (status IN ('draft', 'scheduled', 'active', 'paused', 'completed', 'cancelled')) DEFAULT 'draft',
    target_audience TEXT CHECK (target_audience IN ('donors', 'prospects', 'lapsed_donors', 'major_donors', 'recurring_donors', 'all')),
    subject_line TEXT,
    message_content TEXT NOT NULL,
    scheduled_at TIMESTAMPTZ,
    sent_at TIMESTAMPTZ,
    recipient_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    failure_count INTEGER DEFAULT 0,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Communications log for tracking all interactions
CREATE TABLE IF NOT EXISTS communications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_id UUID REFERENCES donors(id) ON DELETE CASCADE,
    prospect_id UUID REFERENCES prospects(id) ON DELETE CASCADE,
    communication_type TEXT CHECK (communication_type IN ('email', 'phone', 'sms', 'direct_mail', 'in_person', 'social_media')),
    direction TEXT CHECK (direction IN ('outbound', 'inbound')) DEFAULT 'outbound',
    subject TEXT,
    message TEXT,
    status TEXT CHECK (status IN ('draft', 'sent', 'delivered', 'opened', 'clicked', 'replied', 'bounced', 'failed')) DEFAULT 'draft',
    sent_at TIMESTAMPTZ,
    opened_at TIMESTAMPTZ,
    clicked_at TIMESTAMPTZ,
    replied_at TIMESTAMPTZ,
    campaign_id UUID REFERENCES outreach_campaigns(id),
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Recurring donations table
CREATE TABLE IF NOT EXISTS recurring_donations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    donor_id UUID NOT NULL REFERENCES donors(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'USD',
    frequency TEXT CHECK (frequency IN ('weekly', 'monthly', 'quarterly', 'annually')) DEFAULT 'monthly',
    start_date DATE NOT NULL,
    end_date DATE,
    status TEXT CHECK (status IN ('active', 'paused', 'cancelled', 'completed')) DEFAULT 'active',
    next_billing_date DATE,
    total_collected DECIMAL(10,2) DEFAULT 0,
    payment_method_id TEXT,
    failure_count INTEGER DEFAULT 0,
    last_successful_billing DATE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Compliance and audit logs
CREATE TABLE IF NOT EXISTS compliance_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    entity_type TEXT CHECK (entity_type IN ('donor', 'prospect', 'donation', 'communication')),
    entity_id UUID NOT NULL,
    compliance_type TEXT CHECK (compliance_type IN ('gdpr', 'ccpa', 'can_spam', 'tcpa', 'privacy', 'consent')),
    action TEXT CHECK (action IN ('consent_given', 'consent_withdrawn', 'data_access', 'data_deletion', 'opt_out', 'opt_in', 'privacy_request')),
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics and metrics
CREATE TABLE IF NOT EXISTS analytics_metrics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    metric_type TEXT CHECK (metric_type IN ('donation', 'donor', 'campaign', 'communication', 'conversion', 'retention')),
    metric_name TEXT NOT NULL,
    metric_value DECIMAL(12,2) NOT NULL,
    date DATE NOT NULL,
    period TEXT CHECK (period IN ('daily', 'weekly', 'monthly', 'quarterly', 'annually')) DEFAULT 'daily',
    dimensions JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add foreign key constraint for donations.campaign_id
ALTER TABLE donations 
ADD CONSTRAINT donations_campaign_id_fkey 
FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE SET NULL;

-- Add foreign key constraint for donations.recurring_donation_id
ALTER TABLE donations 
ADD CONSTRAINT donations_recurring_donation_id_fkey 
FOREIGN KEY (recurring_donation_id) REFERENCES recurring_donations(id) ON DELETE SET NULL;

-- Enable Row Level Security (RLS) on all tables
ALTER TABLE donors ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE outreach_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE recurring_donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_metrics ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for donors table
CREATE POLICY "Donors are viewable by authenticated users" ON donors
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Donors can be created by authenticated users" ON donors
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Donors can be updated by authenticated users" ON donors
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create RLS policies for donations table
CREATE POLICY "Donations are viewable by authenticated users" ON donations
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Donations can be created by authenticated users" ON donations
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Donations can be updated by authenticated users" ON donations
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create RLS policies for campaigns table
CREATE POLICY "Campaigns are viewable by authenticated users" ON campaigns
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Campaigns can be created by authenticated users" ON campaigns
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Campaigns can be updated by authenticated users" ON campaigns
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create RLS policies for prospects table
CREATE POLICY "Prospects are viewable by authenticated users" ON prospects
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Prospects can be created by authenticated users" ON prospects
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Prospects can be updated by authenticated users" ON prospects
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON donors TO anon;
GRANT SELECT ON donors TO authenticated;
GRANT INSERT ON donors TO authenticated;
GRANT UPDATE ON donors TO authenticated;

GRANT SELECT ON donations TO anon;
GRANT SELECT ON donations TO authenticated;
GRANT INSERT ON donations TO authenticated;
GRANT UPDATE ON donations TO authenticated;

GRANT SELECT ON campaigns TO anon;
GRANT SELECT ON campaigns TO authenticated;
GRANT INSERT ON campaigns TO authenticated;
GRANT UPDATE ON campaigns TO authenticated;

GRANT SELECT ON prospects TO anon;
GRANT SELECT ON prospects TO authenticated;
GRANT INSERT ON prospects TO authenticated;
GRANT UPDATE ON prospects TO authenticated;

GRANT SELECT ON outreach_campaigns TO anon;
GRANT SELECT ON outreach_campaigns TO authenticated;
GRANT INSERT ON outreach_campaigns TO authenticated;
GRANT UPDATE ON outreach_campaigns TO authenticated;

GRANT SELECT ON communications TO anon;
GRANT SELECT ON communications TO authenticated;
GRANT INSERT ON communications TO authenticated;

GRANT SELECT ON recurring_donations TO anon;
GRANT SELECT ON recurring_donations TO authenticated;
GRANT INSERT ON recurring_donations TO authenticated;
GRANT UPDATE ON recurring_donations TO authenticated;

GRANT SELECT ON compliance_logs TO anon;
GRANT SELECT ON compliance_logs TO authenticated;
GRANT INSERT ON compliance_logs TO authenticated;

GRANT SELECT ON analytics_metrics TO anon;
GRANT SELECT ON analytics_metrics TO authenticated;
GRANT INSERT ON analytics_metrics TO authenticated;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_donors_email ON donors(email);
CREATE INDEX IF NOT EXISTS idx_donors_status ON donors(status);
CREATE INDEX IF NOT EXISTS idx_donors_created_at ON donors(created_at);
CREATE INDEX IF NOT EXISTS idx_donations_donor_id ON donations(donor_id);
CREATE INDEX IF NOT EXISTS idx_donations_campaign_id ON donations(campaign_id);
CREATE INDEX IF NOT EXISTS idx_donations_donation_date ON donations(donation_date);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_start_date ON campaigns(start_date);
CREATE INDEX IF NOT EXISTS idx_prospects_email ON prospects(email);
CREATE INDEX IF NOT EXISTS idx_prospects_status ON prospects(status);
CREATE INDEX IF NOT EXISTS idx_prospects_assigned_to ON prospects(assigned_to);
CREATE INDEX IF NOT EXISTS idx_communications_donor_id ON communications(donor_id);
CREATE INDEX IF NOT EXISTS idx_communications_campaign_id ON communications(campaign_id);
CREATE INDEX IF NOT EXISTS idx_recurring_donations_donor_id ON recurring_donations(donor_id);
CREATE INDEX IF NOT EXISTS idx_recurring_donations_status ON recurring_donations(status);

-- Insert sample data for testing
INSERT INTO donors (email, first_name, last_name, phone, donor_type, status, total_donated, donation_count) VALUES
('sarah.johnson@email.com', 'Sarah', 'Johnson', '555-0123', 'individual', 'active', 500.00, 3),
('robert.smith@company.com', 'Robert', 'Smith', '555-0124', 'individual', 'active', 1250.00, 5),
('microsoft@foundation.org', 'Microsoft', 'Foundation', '555-0125', 'foundation', 'active', 5000.00, 2),
('lisa.brown@email.com', 'Lisa', 'Brown', '555-0126', 'individual', 'lapsed', 200.00, 1),
('john.davis@email.com', 'John', 'Davis', '555-0127', 'individual', 'prospect', 0.00, 0);

INSERT INTO campaigns (name, description, campaign_type, goal_amount, start_date, end_date, status, appeal_message) VALUES
('Recovery Scholarship Fund 2024', 'Help individuals in recovery access sober living facilities', 'annual_fund', 100000.00, '2024-01-01', '2024-12-31', 'active', 'Your support helps individuals in recovery build a foundation for lasting sobriety.'),
('Emergency Housing Fund', 'Emergency support for immediate housing needs', 'emergency', 25000.00, '2024-01-01', '2024-12-31', 'active', 'Help us provide immediate housing support for those in crisis.'),
('Capital Campaign - New Facility', 'Building a new recovery center', 'capital_campaign', 500000.00, '2024-06-01', '2025-05-31', 'draft', 'Help us build a state-of-the-art recovery facility.');

INSERT INTO prospects (email, first_name, last_name, organization, prospect_type, source, status, priority, estimated_capacity, estimated_timing, interests) VALUES
('jane.wilson@company.com', 'Jane', 'Wilson', 'Wilson Enterprises', 'corporate', 'research', 'new', 'high', 10000.00, '6_months', ARRAY['housing', 'recovery']),
('tech.philanthropy@techcorp.com', NULL, NULL, 'TechCorp Philanthropy', 'corporate', 'referral', 'contacted', 'high', 25000.00, '3_months', ARRAY['technology', 'education']),
('community.found@local.org', 'Community', 'Foundation', 'Local Community Foundation', 'foundation', 'event', 'qualified', 'medium', 15000.00, '1_year', ARRAY['community', 'health']),
('angel.donor@email.com', 'Angelica', 'Donor', NULL, 'individual', 'website', 'proposal_sent', 'high', 5000.00, 'immediate', ARRAY['recovery', 'scholarships']),
('grant.seeker@grant.gov', NULL, NULL, 'Federal Grant Program', 'government', 'research', 'new', 'medium', 50000.00, '2_years', ARRAY['federal', 'housing']);