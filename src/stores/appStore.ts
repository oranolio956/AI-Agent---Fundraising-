import { create } from 'zustand'

interface Donor {
  id: string
  name: string
  email: string
  phone?: string
  type: 'one-time' | 'monthly' | 'corporate' | 'foundation'
  status: 'active' | 'inactive' | 'unsubscribed'
  totalDonated: number
  createdAt: string
}

interface Donation {
  id: string
  donorId: string
  amount: number
  currency: string
  paymentMethod: string
  paymentStatus: string
  campaignId?: string
  createdAt: string
}

interface Campaign {
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

interface Analytics {
  totalDonations: number
  totalDonors: number
  averageDonation: number
  conversionRate: number
  monthlyGrowth: number
}

interface AppState {
  donors: Donor[]
  donations: Donation[]
  campaigns: Campaign[]
  analytics: Analytics
  loading: boolean
  error: string | null
  
  // Actions
  setDonors: (donors: Donor[]) => void
  setDonations: (donations: Donation[]) => void
  setCampaigns: (campaigns: Campaign[]) => void
  setAnalytics: (analytics: Analytics) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  
  // API calls
  fetchDonors: () => Promise<void>
  fetchDonations: () => Promise<void>
  fetchCampaigns: () => Promise<void>
  fetchAnalytics: () => Promise<void>
  createDonation: (donation: Omit<Donation, 'id' | 'createdAt'>) => Promise<void>
  createCampaign: (campaign: Omit<Campaign, 'id' | 'createdAt'>) => Promise<void>
}

export const useStore = create<AppState>((set, get) => ({
  donors: [],
  donations: [],
  campaigns: [],
  analytics: {
    totalDonations: 0,
    totalDonors: 0,
    averageDonation: 0,
    conversionRate: 0,
    monthlyGrowth: 0
  },
  loading: false,
  error: null,

  setDonors: (donors) => set({ donors }),
  setDonations: (donations) => set({ donations }),
  setCampaigns: (campaigns) => set({ campaigns }),
  setAnalytics: (analytics) => set({ analytics }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  fetchDonors: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/donors')
      if (!response.ok) throw new Error('Failed to fetch donors')
      const data = await response.json()
      set({ donors: data.data, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  fetchDonations: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/donations')
      if (!response.ok) throw new Error('Failed to fetch donations')
      const data = await response.json()
      set({ donations: data.data, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  fetchCampaigns: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/campaigns')
      if (!response.ok) throw new Error('Failed to fetch campaigns')
      const data = await response.json()
      set({ campaigns: data.data, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  fetchAnalytics: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/analytics/overview')
      if (!response.ok) throw new Error('Failed to fetch analytics')
      const data = await response.json()
      set({ analytics: data, loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  createDonation: async (donation) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donation),
      })
      if (!response.ok) throw new Error('Failed to create donation')
      await get().fetchDonations()
      set({ loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },

  createCampaign: async (campaign) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch('/api/campaigns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(campaign),
      })
      if (!response.ok) throw new Error('Failed to create campaign')
      await get().fetchCampaigns()
      set({ loading: false })
    } catch (error) {
      set({ error: (error as Error).message, loading: false })
    }
  },
}))