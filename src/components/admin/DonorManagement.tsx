import React, { useState } from 'react'
import { Search, Download, Mail, User, Edit, Trash2, Plus, Eye } from 'lucide-react'

const DonorManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  const donors = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '(555) 123-4567',
      type: 'monthly',
      totalDonated: '$2,400',
      lastDonation: '2024-01-15',
      status: 'active',
      joinDate: '2023-03-15'
    },
    {
      id: 2,
      name: 'Robert Chen',
      email: 'robert.chen@email.com',
      phone: '(555) 234-5678',
      type: 'one-time',
      totalDonated: '$850',
      lastDonation: '2024-01-14',
      status: 'active',
      joinDate: '2023-08-22'
    },
    {
      id: 3,
      name: 'Maria Rodriguez',
      email: 'maria.r@email.com',
      phone: '(555) 345-6789',
      type: 'monthly',
      totalDonated: '$3,600',
      lastDonation: '2024-01-13',
      status: 'active',
      joinDate: '2022-11-10'
    },
    {
      id: 4,
      name: 'David Smith',
      email: 'david.smith@email.com',
      phone: '(555) 456-7890',
      type: 'one-time',
      totalDonated: '$425',
      lastDonation: '2024-01-12',
      status: 'inactive',
      joinDate: '2023-12-05'
    },
  ]

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === 'all' || donor.type === filterType
    return matchesSearch && matchesFilter
  })

  const handleExport = () => {
    console.log('Exporting donor data...')
    alert('Donor data exported successfully!')
  }

  const handleSendEmail = (donorId: number) => {
    console.log('Sending email to donor:', donorId)
    alert('Email sent successfully!')
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Donor Management</h1>
        <div className="flex space-x-3">
          <button
            onClick={handleExport}
            className="bg-recovery-600 text-white px-4 py-2 rounded-lg hover:bg-recovery-700 transition-colors inline-flex items-center"
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </button>
          <button className="bg-recovery-600 text-white px-4 py-2 rounded-lg hover:bg-recovery-700 transition-colors inline-flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Donor
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search donors by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
              />
            </div>
          </div>
          <div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
            >
              <option value="all">All Donors</option>
              <option value="monthly">Monthly Donors</option>
              <option value="one-time">One-Time Donors</option>
            </select>
          </div>
        </div>
      </div>

      {/* Donors Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Donated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Donation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-recovery-100 p-2 rounded-full mr-3">
                        <User className="h-4 w-4 text-recovery-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{donor.name}</div>
                        <div className="text-sm text-gray-500">{donor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{donor.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      donor.type === 'monthly'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {donor.type === 'monthly' ? 'Monthly' : 'One-Time'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {donor.totalDonated}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donor.lastDonation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      donor.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {donor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSendEmail(donor.id)}
                        className="text-recovery-600 hover:text-recovery-800"
                        title="Send Email"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
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

      {/* Pagination */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {filteredDonors.length} of {donors.length} donors
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-recovery-600 text-white rounded text-sm">1</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">2</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">3</button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonorManagement