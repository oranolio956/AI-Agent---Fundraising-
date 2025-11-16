import React, { useState } from 'react'
import { Mail, Phone, MapPin, Send, Clock, MessageCircle } from 'lucide-react'

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    alert('Thank you for your message! We\'ll get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-recovery-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you. Whether you have questions about our programs, 
            want to partner with us, or need support, we're here to help.
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
              >
                <option value="">Select a subject</option>
                <option value="donation">Donation Inquiry</option>
                <option value="partnership">Partnership Opportunities</option>
                <option value="scholarship">Scholarship Information</option>
                <option value="volunteer">Volunteer Opportunities</option>
                <option value="general">General Question</option>
                <option value="support">Support Request</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-recovery-500 focus:border-transparent"
                placeholder="Tell us how we can help you..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-recovery-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-recovery-700 transition-colors inline-flex items-center justify-center"
            >
              <Send className="mr-2 h-5 w-5" />
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <Mail className="h-5 w-5 text-recovery-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Email</p>
                  <p className="text-gray-600">info@recoveryscholarshipfund.org</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Phone className="h-5 w-5 text-recovery-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Phone</p>
                  <p className="text-gray-600">(555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <MapPin className="h-5 w-5 text-recovery-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Address</p>
                  <p className="text-gray-600">
                    123 Hope Street<br />
                    Recovery City, RC 12345<br />
                    United States
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <Clock className="h-5 w-5 text-recovery-600 mt-1" />
                <div>
                  <p className="font-medium text-gray-800">Office Hours</p>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-recovery-50 p-8 rounded-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-recovery-600" />
              Quick Response Promise
            </h3>
            <p className="text-gray-700 mb-4">
              We strive to respond to all inquiries within 24-48 hours during business days. 
              For urgent matters, please call us directly.
            </p>
            <div className="space-y-2 text-sm text-gray-600">
              <p>• Donation questions: donations@recoveryscholarshipfund.org</p>
              <p>• Partnership inquiries: partnerships@recoveryscholarshipfund.org</p>
              <p>• Media requests: media@recoveryscholarshipfund.org</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium text-gray-800">How can I apply for a scholarship?</p>
                <p className="text-gray-600">Please contact your treatment center or sober living facility to learn about our application process.</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Can I donate in honor of someone?</p>
                <p className="text-gray-600">Yes! We can send acknowledgment letters to honor your loved ones.</p>
              </div>
              <div>
                <p className="font-medium text-gray-800">Do you accept corporate partnerships?</p>
                <p className="text-gray-600">Absolutely! We welcome partnerships with treatment centers, employers, and community organizations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage