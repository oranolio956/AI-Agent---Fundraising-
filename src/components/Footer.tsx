import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-6 w-6 text-recovery-400" />
              <span className="text-lg font-bold">Recovery Scholarship Fund</span>
            </div>
            <p className="text-gray-300 text-sm">
              Transforming lives through education and recovery support. Every donation creates hope and opportunity.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-300 hover:text-recovery-400">Home</Link></li>
              <li><Link to="/impact" className="text-gray-300 hover:text-recovery-400">Our Impact</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-recovery-400">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-recovery-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-gray-300">info@recoveryfund.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-gray-300">(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-gray-300">123 Hope Street, Recovery City, RC 12345</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-recovery-400">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-recovery-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-recovery-400">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-6">
              <Link
                to="/donate"
                className="inline-block bg-recovery-600 text-white px-6 py-2 rounded-lg hover:bg-recovery-700 transition-colors"
              >
                Donate Now
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2024 Recovery Scholarship Fund. All rights reserved.</p>
          <p className="mt-2">
            <Link to="/privacy" className="hover:text-recovery-400">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-recovery-400 ml-2">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer