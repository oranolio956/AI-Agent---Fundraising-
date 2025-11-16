import React, { useState } from 'react'
import { CreditCard, Banknote, Heart, Shield, Check } from 'lucide-react'

const DonatePage: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState(50)
  const [customAmount, setCustomAmount] = useState('')
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time')
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank'>('card')

  const presetAmounts = [25, 50, 100, 250, 500, 1000]

  const handleDonation = async (e: React.FormEvent) => {
    e.preventDefault()
    const amount = customAmount ? parseFloat(customAmount) : selectedAmount
    
    // Here you would integrate with Stripe or your payment processor
    console.log('Processing donation:', { amount, donationType, paymentMethod })
    
    // Simulate successful donation
    alert(`Thank you for your ${donationType} donation of $${amount}!`)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Make a Donation</h1>
        <p className="text-lg text-gray-600">
          Your donation provides scholarships for people in recovery to access sober living and education.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Donation Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <form onSubmit={handleDonation} className="space-y-6">
            {/* Donation Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Donation Type</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setDonationType('one-time')}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                    donationType === 'one-time'
                      ? 'border-recovery-600 bg-recovery-50 text-recovery-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  One-Time
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('monthly')}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors ${
                    donationType === 'monthly'
                      ? 'border-recovery-600 bg-recovery-50 text-recovery-700'
                      : 'border-gray-300 text-gray-700 hover:border-gray-400'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            {/* Amount Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Donation Amount</label>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {presetAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amount)
                      setCustomAmount('')
                    }}
                    className={`py-3 px-4 rounded-lg border-2 transition-colors ${
                      selectedAmount === amount && !customAmount
                        ? 'border-recovery-600 bg-recovery-50 text-recovery-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value)
                  setSelectedAmount(0)
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
                min="1"
              />
            </div>

            {/* Payment Method */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
              <div className="space-y-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                    className="mr-3"
                  />
                  <CreditCard className="h-5 w-5 mr-2" />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="bank"
                    checked={paymentMethod === 'bank'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'bank')}
                    className="mr-3"
                  />
                  <Banknote className="h-5 w-5 mr-2" />
                  <span>Bank Transfer</span>
                </label>
              </div>
            </div>

            {/* Donate Button */}
            <button
              type="submit"
              className="w-full bg-recovery-600 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-recovery-700 transition-colors flex items-center justify-center"
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate ${customAmount || selectedAmount}
            </button>
          </form>
        </div>

        {/* Impact Information */}
        <div className="space-y-6">
          <div className="bg-recovery-50 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Heart className="mr-2 h-5 w-5 text-recovery-600" />
              Your Impact
            </h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-recovery-600 mt-0.5" />
                <span>$25 provides a week of sober living support</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-recovery-600 mt-0.5" />
                <span>$100 covers educational materials for one student</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-recovery-600 mt-0.5" />
                <span>$500 funds a full month of sober living</span>
              </div>
              <div className="flex items-start space-x-3">
                <Check className="h-5 w-5 text-recovery-600 mt-0.5" />
                <span>$1,000 provides a complete scholarship program</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Shield className="mr-2 h-5 w-5 text-recovery-600" />
              Secure & Transparent
            </h3>
            <div className="space-y-2 text-gray-700">
              <p>• 100% secure payment processing</p>
              <p>• Tax-deductible donations</p>
              <p>• Monthly impact reports</p>
              <p>• Financial transparency</p>
            </div>
          </div>

          <div className="text-center">
            <img
              src="https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Group%20of%20diverse%20graduates%20in%20recovery%2C%20caps%20and%20gowns%2C%20celebrating%2C%20hope%20and%20achievement%2C%20warm%20lighting%2C%20professional%20photography&image_size=landscape_4_3"
              alt="Recovery scholarship graduates"
              className="w-full rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonatePage