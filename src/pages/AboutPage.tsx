import React from 'react'
import { Users, Award, Heart, Target, ArrowRight } from 'lucide-react'

const AboutPage: React.FC = () => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Executive Director",
      bio: "20+ years in addiction recovery and nonprofit leadership. Former clinical director at leading treatment centers.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20woman%20executive%2C%20confident%20leadership%2C%20office%20setting%2C%20warm%20and%20authoritative%2C%20professional%20portrait&image_size=square"
    },
    {
      name: "Michael Chen",
      role: "Program Director",
      bio: "In recovery himself, Michael brings personal experience and 15 years of program development expertise.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20man%2C%20compassionate%20expression%2C%20office%20setting%2C%20approachable%20and%20experienced%2C%20professional%20portrait&image_size=square"
    },
    {
      name: "Maria Rodriguez",
      role: "Community Outreach",
      bio: "Connects with treatment centers, employers, and community organizations to create partnership opportunities.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20woman%2C%20outgoing%20and%20friendly%2C%20community%20setting%2C%20engaging%20personality%2C%20professional%20portrait&image_size=square"
    }
  ]

  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description: "We approach every individual with empathy, understanding, and genuine care for their recovery journey."
    },
    {
      icon: Target,
      title: "Excellence",
      description: "We maintain the highest standards in our programs and continuously improve our services."
    },
    {
      icon: Users,
      title: "Community",
      description: "We build strong partnerships and foster supportive networks for lasting recovery."
    },
    {
      icon: Award,
      title: "Integrity",
      description: "We operate with transparency, accountability, and ethical practices in all we do."
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-recovery-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">About Recovery Scholarship Fund</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are dedicated to transforming lives by providing scholarships for people in recovery 
            to access sober living communities and educational opportunities.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To provide comprehensive scholarships that support individuals in recovery through 
                sober living arrangements and educational opportunities, empowering them to build 
                meaningful careers and contribute positively to their communities.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                A world where recovery and education go hand in hand, creating a society where 
                individuals in recovery have equal access to opportunities that foster personal 
                growth, professional development, and lasting transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-lg shadow-md">
                <div className="bg-recovery-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-recovery-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-recovery-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our History</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="bg-recovery-600 text-white px-4 py-2 rounded-lg font-semibold">2020</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Foundation</h3>
                  <p className="text-gray-600">Recovery Scholarship Fund was established by a group of recovery advocates and educators who saw the need for comprehensive support.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-recovery-600 text-white px-4 py-2 rounded-lg font-semibold">2021</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">First Scholarships</h3>
                  <p className="text-gray-600">Awarded our first 25 scholarships, partnering with local treatment centers and sober living facilities.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-recovery-600 text-white px-4 py-2 rounded-lg font-semibold">2022</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Program Expansion</h3>
                  <p className="text-gray-600">Expanded to include vocational training and college partnerships, doubling our scholarship capacity.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-recovery-600 text-white px-4 py-2 rounded-lg font-semibold">2023</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">National Recognition</h3>
                  <p className="text-gray-600">Received national awards for innovative approach to recovery support and education access.</p>
                </div>
              </div>
              <div className="flex items-start space-x-6">
                <div className="bg-recovery-600 text-white px-4 py-2 rounded-lg font-semibold">2024</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Growing Impact</h3>
                  <p className="text-gray-600">Reached milestone of 500+ scholarships awarded with 85% success rate, expanding to new states.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-recovery-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Mission</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Whether you're looking to donate, volunteer, or partner with us, there are many ways to get involved 
            in transforming lives through recovery scholarships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-recovery-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-recovery-600 transition-colors inline-flex items-center justify-center">
              Get Involved
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage