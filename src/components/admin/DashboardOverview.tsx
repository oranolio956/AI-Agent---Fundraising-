import React from 'react'
import { DollarSign, Users, Mail, TrendingUp, Eye, Heart } from 'lucide-react'

const DashboardOverview: React.FC = () => {
  const stats = [
    { title: 'Total Donations', value: '$247,892', change: '+12.5%', icon: DollarSign },
    { title: 'Active Donors', value: '1,247', change: '+8.2%', icon: Users },
    { title: 'Email Campaigns', value: '24', change: '+15.3%', icon: Mail },
    { title: 'Conversion Rate', value: '3.2%', change: '+0.8%', icon: TrendingUp },
  ]

  const recentDonations = [
    { name: 'Sarah Johnson', amount: '$500', date: '2024-01-15', type: 'Monthly' },
    { name: 'Robert Chen', amount: '$250', date: '2024-01-14', type: 'One-time' },
    { name: 'Maria Rodriguez', amount: '$1,000', date: '2024-01-13', type: 'Monthly' },
    { name: 'David Smith', amount: '$100', date: '2024-01-12', type: 'One-time' },
  ]

  const topPages = [
    { page: '/donate', views: '2,847', conversion: '4.2%' },
    { page: '/', views: '5,123', conversion: '2.1%' },
    { page: '/impact', views: '1,892', conversion: '3.8%' },
    { page: '/about', views: '1,456', conversion: '1.9%' },
  ]

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="bg-recovery-100 p-3 rounded-lg">
                <stat.icon className="h-6 w-6 text-recovery-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donations Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Donations</h3>
          <div className="h-64 bg-gray-100 rounded-lg flex items-end justify-around p-4">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 95, 100].map((height, index) => (
              <div
                key={index}
                className="bg-recovery-500 w-8 rounded-t"
                style={{ height: `${height}%` }}
                title={`Month ${index + 1}`}
              />
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>Jan</span>
            <span>Jun</span>
            <span>Dec</span>
          </div>
        </div>

        {/* Donor Acquisition */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Donor Acquisition</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New Donors</span>
              <span className="font-semibold">89</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Returning Donors</span>
              <span className="font-semibold">156</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Monthly Donors</span>
              <span className="font-semibold">203</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">One-time Donors</span>
              <span className="font-semibold">1,044</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Donations */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Donations</h3>
          <div className="space-y-3">
            {recentDonations.map((donation, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-800">{donation.name}</p>
                  <p className="text-sm text-gray-500">{donation.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{donation.amount}</p>
                  <p className="text-sm text-gray-500">{donation.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Top Performing Pages</h3>
          <div className="space-y-3">
            {topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-800">{page.page}</p>
                  <p className="text-sm text-gray-500">{page.views} views</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">{page.conversion}</p>
                  <p className="text-sm text-gray-500">conversion</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-recovery-50 text-recovery-700 p-4 rounded-lg hover:bg-recovery-100 transition-colors">
            <Eye className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">View Reports</span>
          </button>
          <button className="bg-recovery-50 text-recovery-700 p-4 rounded-lg hover:bg-recovery-100 transition-colors">
            <Mail className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Create Campaign</span>
          </button>
          <button className="bg-recovery-50 text-recovery-700 p-4 rounded-lg hover:bg-recovery-100 transition-colors">
            <Users className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Manage Donors</span>
          </button>
          <button className="bg-recovery-50 text-recovery-700 p-4 rounded-lg hover:bg-recovery-100 transition-colors">
            <Heart className="h-6 w-6 mx-auto mb-2" />
            <span className="text-sm font-medium">View Impact</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardOverview