import React, { useState } from 'react'
import { Settings, Bell, Shield, CreditCard, Mail, Save, Eye, EyeOff } from 'lucide-react'

const SettingsPage: React.FC = () => {
  const [showApiKey, setShowApiKey] = useState(false)
  const [settings, setSettings] = useState({
    organizationName: 'Recovery Scholarship Fund',
    email: 'admin@recoveryscholarshipfund.org',
    phone: '(555) 123-4567',
    address: '123 Hope Street, Recovery City, RC 12345',
    website: 'https://recoveryscholarshipfund.org',
    stripeApiKey: 'sk_test_51ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    emailService: 'sendgrid',
    smtpHost: 'smtp.sendgrid.net',
    smtpPort: '587',
    smtpUsername: 'apikey',
    smtpPassword: 'SG.abcdef1234567890',
    notifications: {
      newDonations: true,
      failedPayments: true,
      campaignReports: true,
      systemAlerts: true
    }
  })

  const handleSave = () => {
    console.log('Saving settings:', settings)
    alert('Settings saved successfully!')
  }

  const handleInputChange = (field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value
      }
    }))
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
        <button
          onClick={handleSave}
          className="bg-recovery-600 text-white px-6 py-2 rounded-lg hover:bg-recovery-700 transition-colors inline-flex items-center"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </button>
      </div>

      {/* Organization Settings */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Organization Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name</label>
            <input
              type="text"
              value={settings.organizationName}
              onChange={(e) => handleInputChange('organizationName', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
            <input
              type="url"
              value={settings.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <CreditCard className="mr-2 h-5 w-5" />
          Payment Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Stripe API Key</label>
            <div className="relative">
              <input
                type={showApiKey ? 'text' : 'password'}
                value={settings.stripeApiKey}
                onChange={(e) => handleInputChange('stripeApiKey', e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showApiKey ? <EyeOff className="h-4 w-4 text-gray-400" /> : <Eye className="h-4 w-4 text-gray-400" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Mail className="mr-2 h-5 w-5" />
          Email Service Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Service</label>
            <select
              value={settings.emailService}
              onChange={(e) => handleInputChange('emailService', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
            >
              <option value="sendgrid">SendGrid</option>
              <option value="mailgun">Mailgun</option>
              <option value="smtp">Custom SMTP</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
            <input
              type="text"
              value={settings.smtpHost}
              onChange={(e) => handleInputChange('smtpHost', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
            <input
              type="text"
              value={settings.smtpPort}
              onChange={(e) => handleInputChange('smtpPort', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
            <input
              type="text"
              value={settings.smtpUsername}
              onChange={(e) => handleInputChange('smtpUsername', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
            <input
              type="password"
              value={settings.smtpPassword}
              onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Bell className="mr-2 h-5 w-5" />
          Notification Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">New Donations</h3>
              <p className="text-sm text-gray-500">Get notified when someone makes a donation</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.newDonations}
                onChange={(e) => handleNotificationChange('newDonations', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-recovery-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-recovery-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Failed Payments</h3>
              <p className="text-sm text-gray-500">Get notified when a payment fails</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.failedPayments}
                onChange={(e) => handleNotificationChange('failedPayments', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-recovery-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-recovery-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Campaign Reports</h3>
              <p className="text-sm text-gray-500">Get weekly campaign performance reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.campaignReports}
                onChange={(e) => handleNotificationChange('campaignReports', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-recovery-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-recovery-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">System Alerts</h3>
              <p className="text-sm text-gray-500">Get notified about system issues and updates</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.notifications.systemAlerts}
                onChange={(e) => handleNotificationChange('systemAlerts', e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-recovery-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-recovery-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          Security Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
            </div>
            <button className="bg-recovery-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-recovery-700">
              Enable
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Session Timeout</h3>
              <p className="text-sm text-gray-500">Automatically log out after 30 minutes of inactivity</p>
            </div>
            <button className="bg-recovery-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-recovery-700">
              Configure
            </button>
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Login History</h3>
              <p className="text-sm text-gray-500">View recent login attempts and locations</p>
            </div>
            <button className="bg-recovery-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-recovery-700">
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage