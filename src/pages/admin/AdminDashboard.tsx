import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { BarChart3, Users, Mail, Settings, TrendingUp, Eye } from 'lucide-react'
import DashboardOverview from '../../components/admin/DashboardOverview'
import DonorManagement from '../../components/admin/DonorManagement'
import CampaignManager from '../../components/admin/CampaignManager'
import Analytics from '../../components/admin/Analytics'
import SettingsPage from '../../components/admin/SettingsPage'

const AdminDashboard: React.FC = () => {
  const sidebarItems = [
    { name: 'Overview', href: '/admin', icon: BarChart3 },
    { name: 'Donors', href: '/admin/donors', icon: Users },
    { name: 'Campaigns', href: '/admin/campaigns', icon: Mail },
    { name: 'Analytics', href: '/admin/analytics', icon: TrendingUp },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="bg-recovery-600 p-2 rounded-lg">
              <Eye className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/donors" element={<DonorManagement />} />
          <Route path="/campaigns" element={<CampaignManager />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default AdminDashboard