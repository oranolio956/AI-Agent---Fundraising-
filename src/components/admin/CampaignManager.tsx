import React, { useState } from 'react'
import { Plus, Edit, Trash2, Send, Eye, Calendar, Target, Users } from 'lucide-react'

const CampaignManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'draft' | 'completed'>('active')

  const campaigns = [
    {
      id: 1,
      name: 'Year-End Giving Campaign',
      type: 'email',
      status: 'active',
      recipients: 1247,
      sent: 1180,
      opened: 423,
      clicked: 89,
      conversions: 12,
      created: '2024-11-01',
      scheduled: '2024-12-15',
      subject: 'Make a difference this holiday season'
    },
    {
      id: 2,
      name: 'Recovery Awareness Month',
      type: 'social',
      status: 'active',
      recipients: 3200,
      sent: 3200,
      opened: 1856,
      clicked: 234,
      conversions: 28,
      created: '2024-09-15',
      scheduled: '2024-09-30',
      subject: 'September is Recovery Awareness Month'
    },
    {
      id: 3,
      name: 'Monthly Newsletter',
      type: 'email',
      status: 'draft',
      recipients: 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      conversions: 0,
      created: '2024-11-10',
      scheduled: '2024-12-01',
      subject: 'November Impact Report'
    },
    {
      id: 4,
      name: 'Spring Fundraiser',
      type: 'email',
      status: 'completed',
      recipients: 892,
      sent: 892,
      opened: 567,
      clicked: 123,
      conversions: 34,
      created: '2024-03-01',
      scheduled: '2024-04-15',
      subject: 'Join us for our Spring Fundraiser'
    }
  ]

  const filteredCampaigns = campaigns.filter(campaign => {
    if (activeTab === 'active') return campaign.status === 'active'
    if (activeTab === 'draft') return campaign.status === 'draft'
    if (activeTab === 'completed') return campaign.status === 'completed'
    return true
  })

  const handleCreateCampaign = () => {
    console.log('Creating new campaign...')
    alert('Campaign creation wizard would open here')
  }

  const handleSendCampaign = (campaignId: number) => {
    console.log('Sending campaign:', campaignId)
    alert('Campaign sent successfully!')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'email': return 'bg-blue-100 text-blue-800'
      case 'social': return 'bg-purple-100 text-purple-800'
      case 'sms': return 'bg-pink-100 text-pink-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Campaign Manager</h1>
        <button
          onClick={handleCreateCampaign}
          className="bg-recovery-600 text-white px-4 py-2 rounded-lg hover:bg-recovery-700 transition-colors inline-flex items-center"
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Campaign
        </button>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Campaigns</p>
              <p className="text-2xl font-bold text-gray-800">2</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <Target className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Recipients</p>
              <p className="text-2xl font-bold text-gray-800">4,447</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-lg">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Open Rate</p>
              <p className="text-2xl font-bold text-gray-800">42%</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-lg">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Conversions</p>
              <p className="text-2xl font-bold text-gray-800">74</p>
            </div>
            <div className="bg-recovery-100 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-recovery-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['active', 'draft', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-recovery-500 text-recovery-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab} ({campaigns.filter(c => c.status === tab).length})
              </button>
            ))}
          </nav>
        </div>

        {/* Campaigns Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recipients</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{campaign.name}</div>
                      <div className="text-sm text-gray-500">{campaign.subject}</div>
                      <div className="text-xs text-gray-400">Created: {campaign.created}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(campaign.type)}`}>
                      {campaign.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{campaign.recipients.toLocaleString()}</div>
                    <div className="text-sm text-gray-500">Sent: {campaign.sent.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Open: {campaign.opened.toLocaleString()} ({Math.round((campaign.opened / Math.max(campaign.sent, 1)) * 100)}%)
                    </div>
                    <div className="text-sm text-gray-500">
                      Click: {campaign.clicked.toLocaleString()} ({Math.round((campaign.clicked / Math.max(campaign.sent, 1)) * 100)}%)
                    </div>
                    <div className="text-xs text-gray-400">
                      Conversions: {campaign.conversions}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(campaign.status)}`}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {campaign.status === 'draft' && (
                        <button
                          onClick={() => handleSendCampaign(campaign.id)}
                          className="text-green-600 hover:text-green-800"
                          title="Send Campaign"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                      )}
                      <button className="text-gray-600 hover:text-gray-800" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-800" title="Delete">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Campaign Templates */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Campaign Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Welcome Series</h4>
            <p className="text-sm text-gray-600 mb-3">3-email sequence for new subscribers</p>
            <div className="text-xs text-gray-500 mb-3">
              <div>Open Rate: 45%</div>
              <div>Conversion Rate: 8%</div>
            </div>
            <button className="text-recovery-600 hover:text-recovery-800 text-sm font-medium">Use Template</button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Monthly Newsletter</h4>
            <p className="text-sm text-gray-600 mb-3">Impact stories and updates</p>
            <div className="text-xs text-gray-500 mb-3">
              <div>Open Rate: 38%</div>
              <div>Conversion Rate: 5%</div>
            </div>
            <button className="text-recovery-600 hover:text-recovery-800 text-sm font-medium">Use Template</button>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <h4 className="font-semibold text-gray-800 mb-2">Year-End Appeal</h4>
            <p className="text-sm text-gray-600 mb-3">Holiday giving campaign</p>
            <div className="text-xs text-gray-500 mb-3">
              <div>Open Rate: 52%</div>
              <div>Conversion Rate: 12%</div>
            </div>
            <button className="text-recovery-600 hover:text-recovery-800 text-sm font-medium">Use Template</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignManager