import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Menu, X } from 'lucide-react'

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Impact', href: '/impact' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-recovery-600" />
            <span className="text-xl font-bold text-gray-800">Recovery Scholarship Fund</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-600 hover:text-recovery-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/donate"
              className="bg-recovery-600 text-white px-6 py-2 rounded-lg hover:bg-recovery-700 transition-colors"
            >
              Donate Now
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-recovery-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block py-2 text-gray-600 hover:text-recovery-600"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/donate"
              className="block mt-4 bg-recovery-600 text-white px-6 py-2 rounded-lg hover:bg-recovery-700 transition-colors text-center"
              onClick={() => setIsOpen(false)}
            >
              Donate Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar