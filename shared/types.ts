export interface Donor {
  id: string
  name: string
  email: string
  phone?: string
  type: 'one-time' | 'monthly' | 'corporate' | 'foundation'
  status: 'active' | 'inactive' | 'unsubscribed'
  totalDonated: number
  createdAt: string
}

export interface Donation {
  id: string
  donorId: string
  amount: number
  currency: string
  paymentMethod: string
  paymentStatus: string
  campaignId?: string
  createdAt: string
}

export interface Campaign {
  id: string
  name: string
  type: 'email' | 'social' | 'sms' | 'direct_mail'
  status: 'draft' | 'scheduled' | 'sent' | 'paused' | 'archived'
  subject?: string
  recipientsCount: number
  sentCount: number
  openRate: number
  clickRate: number
  conversionRate: number
  createdAt: string
}

export interface Prospect {
  id: string
  name?: string
  email?: string
  organization?: string
  causeAffinityScore?: number
  givingCapacityScore?: number
  overallScore?: number
  location?: string
  source: string
  status: 'new' | 'scored' | 'contacted' | 'interested' | 'not_interested' | 'converted' | 'archived'
  createdAt: string
}

export interface Analytics {
  totalDonations: number
  totalDonors: number
  averageDonation: number
  conversionRate: number
  monthlyGrowth: number
}