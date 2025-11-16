import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'

const Analytics: React.FC = () => {
  const donationData = [
    { month: 'Jan', donations: 12000 },
    { month: 'Feb', donations: 15000 },
    { month: 'Mar', donations: 18000 },
    { month: 'Apr', donations: 22000 },
    { month: 'May', donations: 25000 },
    { month: 'Jun', donations: 28000 },
    { month: 'Jul', donations: 32000 },
    { month: 'Aug', donations: 29000 },
    { month: 'Sep', donations: 31000 },
    { month: 'Oct', donations: 35000 },
    { month: 'Nov', donations: 38000 },
    { month: 'Dec', donations: 42000 },
  ]

  const donorSegmentation = [
    { name: 'Monthly Donors', value: 35, color: '#22c55e' },
    { name: 'One-Time Donors', value: 45, color: '#3b82f6' },
    { name: 'Corporate Donors', value: 12, color: '#8b5cf6' },
    { name: 'Foundation Grants', value: 8, color: '#f59e0b' },
  ]

  const campaignPerformance = [
    { campaign: 'Year-End Giving', opens: 42, clicks: 12, conversions: 3.2 },
    { campaign: 'Recovery Awareness', opens: 38, clicks: 9, conversions: 2.8 },
    { campaign: 'Monthly Newsletter', opens: 35, clicks: 8, conversions: 2.1 },
    { campaign: 'Spring Fundraiser', opens: 45, clicks: 15, conversions: 4.1 },
  ]

  const trafficSources = [
    { source: 'Organic Search', visits: 3200, percentage: 35 },
    { source: 'Social Media', visits: 2400, percentage: 26 },
    { source: 'Direct', visits: 1800, percentage: 20 },
    { source: 'Email', visits: 1200, percentage: 13 },
    { source: 'Referral', visits: 600, percentage: 6 },
  ]

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
        <div className="flex space-x-3">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500">
            <option>Last 30 Days</option>
            <option>Last 90 Days</option>
            <option>Last Year</option>
            <option>All Time</option>
          </select>
          <button className="bg-recovery-600 text-white px-4 py-2 rounded-lg hover:bg-recovery-700">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Revenue</h3>
          <p className="text-3xl font-bold text-gray-800">$247,892</p>
          <p className="text-sm text-green-600">+12.5% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Donation Conversion</h3>
          <p className="text-3xl font-bold text-gray-800">3.2%</p>
          <p className="text-sm text-green-600">+0.8% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Average Donation</h3>
          <p className="text-3xl font-bold text-gray-800">$142</p>
          <p className="text-sm text-green-600">+5.2% vs last month</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Donor Retention</h3>
          <p className="text-3xl font-bold text-gray-800">78%</p>
          <p className="text-sm text-red-600">-2.1% vs last month</p>
        </div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donation Trends */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Donation Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={donationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Donations']} />
              <Line type="monotone" dataKey="donations" stroke="#22c55e" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Donor Segmentation */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Donor Segmentation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={donorSegmentation}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {donorSegmentation.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Campaign Performance */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Campaign Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={campaignPerformance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="campaign" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="opens" fill="#3b82f6" name="Open Rate (%)" />
              <Bar dataKey="clicks" fill="#22c55e" name="Click Rate (%)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Website Traffic Sources</h3>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-recovery-600 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-800">{source.visits.toLocaleString()}</div>
                  <div className="text-xs text-gray-500">{source.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold text-gray-800">Total Visits</span>
              <span className="font-bold text-gray-800">9,200</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Monthly Performance Summary</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donations</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Avg. Donation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Growth</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donationData.map((data, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{data.month}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${data.donations.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{Math.floor(data.donations / 142)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${Math.floor(data.donations / (data.donations / 142))}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(3.2 + (index * 0.1)).toFixed(1)}%</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">+{(index * 2.5).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Analytics