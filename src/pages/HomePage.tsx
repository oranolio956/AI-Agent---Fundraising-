import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Users, GraduationCap, TrendingUp, ArrowRight } from 'lucide-react'

const HomePage: React.FC = () => {
  const stats = [
    { number: "500+", label: "Scholarships Awarded", icon: GraduationCap },
    { number: "85%", label: "Success Rate", icon: TrendingUp },
    { number: "1,200+", label: "Lives Transformed", icon: Users },
  ]

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Recovery Scholarship Recipient",
      content: "This scholarship gave me the chance to rebuild my life. Today, I'm a certified counselor helping others on their recovery journey.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20woman%20counselor%2C%20confident%20smile%2C%20office%20setting%2C%20warm%20lighting%2C%20hopeful%20expression%2C%20professional%20headshot&image_size=square"
    },
    {
      name: "Michael R.",
      role: "Recovery Scholarship Recipient",
      content: "Sober living saved my life. The scholarship made it possible when I had nothing left. Now I'm pursuing my degree in social work.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Young%20man%20student%2C%20determined%20expression%2C%20campus%20setting%2C%20backpack%2C%20hopeful%20future%2C%20professional%20headshot&image_size=square"
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-recovery-50 to-primary-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            Transform Lives Through <span className="text-recovery-600">Recovery Scholarships</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Help individuals in recovery access sober living communities and educational opportunities. 
            Your donation creates lasting change and builds stronger communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/donate"
              className="bg-recovery-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-recovery-700 transition-colors inline-flex items-center justify-center"
            >
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </Link>
            <Link
              to="/impact"
              className="bg-white text-recovery-600 border-2 border-recovery-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-recovery-50 transition-colors inline-flex items-center justify-center"
            >
              See Our Impact
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-recovery-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-recovery-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              We believe that recovery and education go hand in hand. By providing scholarships for sober living 
              and educational opportunities, we help individuals in recovery build the foundation for lasting 
              transformation and meaningful careers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Sober Living Support</h3>
                <p className="text-gray-600">
                  Safe, supportive housing that provides the stability needed for recovery and personal growth.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Educational Opportunities</h3>
                <p className="text-gray-600">
                  Scholarships for vocational training, college courses, and certification programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-recovery-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join our community of donors who are transforming lives every day. Your support creates 
            opportunities for lasting recovery and meaningful careers.
          </p>
          <Link
            to="/donate"
            className="bg-white text-recovery-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
          >
            Start Giving Today
            <Heart className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage