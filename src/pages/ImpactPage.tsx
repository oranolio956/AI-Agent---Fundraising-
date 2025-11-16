import React from 'react'
import { Users, TrendingUp, Award, Heart, Calendar, Target } from 'lucide-react'

const ImpactPage: React.FC = () => {
  const impactMetrics = [
    {
      icon: Users,
      number: "1,247",
      label: "Lives Transformed",
      description: "Individuals who completed our scholarship program"
    },
    {
      icon: TrendingUp,
      number: "87%",
      label: "Success Rate",
      description: "Participants who maintained sobriety after 12 months"
    },
    {
      icon: Award,
      number: "892",
      label: "Degrees & Certifications",
      description: "Educational achievements by our scholars"
    },
    {
      icon: Heart,
      number: "156",
      label: "Community Service Hours",
      description: "Average hours given back per graduate"
    }
  ]

  const yearlyImpact = [
    { year: "2024", scholarships: 145, graduates: 128, successRate: 87 },
    { year: "2023", scholarships: 132, graduates: 115, successRate: 84 },
    { year: "2022", scholarships: 118, graduates: 98, successRate: 82 },
    { year: "2021", scholarships: 95, graduates: 78, successRate: 79 },
    { year: "2020", scholarships: 78, graduates: 62, successRate: 76 }
  ]

  const successStories = [
    {
      name: "Maria Rodriguez",
      program: "Nursing Certification",
      story: "After completing our recovery scholarship program, Maria earned her nursing certification and now works as an addiction counselor, helping others on their recovery journey.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20nurse%2C%20caring%20expression%2C%20medical%20setting%2C%20confidence%20and%20compassion%2C%20professional%20portrait&image_size=square"
    },
    {
      name: "James Thompson",
      program: "IT Specialist Training",
      story: "James used his scholarship to complete IT training. He's now a systems administrator and mentors others in recovery who are interested in technology careers.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20IT%20specialist%2C%20confident%20smile%2C%20office%20setting%2C%20computer%20setup%2C%20professional%20portrait&image_size=square"
    },
    {
      name: "Sarah Chen",
      program: "Social Work Degree",
      story: "Sarah's recovery journey inspired her to pursue social work. She now advocates for policy changes that support recovery-friendly workplaces and education opportunities.",
      image: "https://trae-api-us.mchost.guru/api/ide/v1/text_to_image?prompt=Professional%20social%20worker%2C%20determined%20expression%2C%20office%20setting%2C%20advocacy%20and%20leadership%2C%20professional%20portrait&image_size=square"
    }
  ]

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-50 to-recovery-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Our Impact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how your donations are transforming lives and building stronger communities through recovery and education.
          </p>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">By the Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-lg shadow-lg">
                <div className="bg-recovery-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="h-8 w-8 text-recovery-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">{metric.number}</h3>
                <p className="text-lg font-semibold text-gray-700 mb-2">{metric.label}</p>
                <p className="text-gray-600 text-sm">{metric.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Yearly Impact Chart */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Growth Over Time</h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                {yearlyImpact.map((year) => (
                  <div key={year.year} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Calendar className="h-5 w-5 text-recovery-600" />
                      <span className="font-semibold text-gray-800">{year.year}</span>
                    </div>
                    <div className="flex items-center space-x-8 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-gray-800">{year.scholarships}</div>
                        <div className="text-gray-600">Scholarships</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-gray-800">{year.graduates}</div>
                        <div className="text-gray-600">Graduates</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-gray-800">{year.successRate}%</div>
                        <div className="text-gray-600">Success Rate</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{story.name}</h3>
                  <p className="text-recovery-600 font-medium mb-4">{story.program}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{story.story}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-recovery-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <Target className="h-12 w-12 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">Help Us Do More</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Your support helps us expand our programs and reach more individuals in recovery. 
            Together, we can transform even more lives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-recovery-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Heart className="mr-2 h-5 w-5" />
              Donate Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-white hover:text-recovery-600 transition-colors">
              Share Our Story
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ImpactPage