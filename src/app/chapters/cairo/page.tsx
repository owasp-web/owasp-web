'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CairoChapterPage() {
  const stats = [
    { label: 'Meetings Last Year', value: '12', icon: '📅' },
    { label: 'Active Since', value: '2010s', icon: '🏛️' },
    { label: 'Focus Areas', value: 'Web & Mobile', icon: '🎯' },
    { label: 'Community', value: 'Growing', icon: '📈' }
  ];

  const focusAreas = [
    {
      icon: '🏛️',
      title: 'Ancient Meets Modern',
      description: 'Bridging traditional IT infrastructure with modern security practices in Egypt\'s capital'
    },
    {
      icon: '🌐',
      title: 'Regional Hub',
      description: 'Serving as a cybersecurity center for the Middle East and North Africa region'
    },
    {
      icon: '🎓',
      title: 'Educational Partnerships',
      description: 'Collaboration with Cairo\'s renowned universities and technical institutions'
    },
    {
      icon: '🏢',
      title: 'Enterprise Security',
      description: 'Supporting Egypt\'s growing fintech and e-commerce sectors with security best practices'
    },
    {
      icon: '🤝',
      title: 'Cross-Border Collaboration',
      description: 'Working with other MENA region chapters for knowledge sharing and joint initiatives'
    },
    {
      icon: '🚀',
      title: 'Innovation Focus',
      description: 'Promoting cutting-edge security research and startup ecosystem support'
    }
  ];

  const achievements = [
    {
      title: 'High Activity Level',
      description: '12 meetings in the last 365 days - one of the most active chapters in Africa',
      metric: '12 meetings/year'
    },
    {
      title: 'Regional Leadership',
      description: 'Leading cybersecurity education and awareness across Egypt and MENA region',
      metric: 'Regional Impact'
    },
    {
      title: 'Community Growth',
      description: 'Consistent growth in membership and participation across all events',
      metric: 'Growing Community'
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🇪🇬</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Cairo</h1>
              <p className="text-xl mb-6">Egypt</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Egypt's leading application security community, serving as a regional hub for 
                cybersecurity education and innovation in the heart of the Middle East and North Africa. 
                Where ancient wisdom meets modern security practices.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🏆 Most Active in Africa</h3>
                <p className="text-lg">12 meetings in the last 365 days - Leading cybersecurity education across Egypt and the MENA region</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Community
                </a>
                <a href="mailto:cairo@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Stats Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8 text-center">Chapter at a Glance</h2>
            <div className="grid md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                  <span className="text-4xl mb-4 block">{stat.icon}</span>
                  <h3 className="text-3xl font-bold text-[#003594] mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Cairo</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  OWASP Cairo stands as Egypt's premier application security community and a 
                  leading force in the Middle East and North Africa cybersecurity landscape. 
                  Located in one of the world's most historic cities, we blend time-tested 
                  wisdom with cutting-edge security practices.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  As one of Africa's most active OWASP chapters, we organize regular meetups, 
                  workshops, and training sessions that serve not only Egypt's thriving tech 
                  ecosystem but also the broader MENA region's cybersecurity community.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Mission</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Advance application security practices across Egypt</p>
                    <p>• Support the region's growing fintech and e-commerce sectors</p>
                    <p>• Foster collaboration between academia and industry</p>
                    <p>• Build cybersecurity capacity across the MENA region</p>
                    <p>• Promote OWASP projects and methodologies</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Why Cairo Matters</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🌍</span>
                    <div>
                      <p className="font-semibold">Regional Gateway</p>
                      <p className="text-gray-600">Bridge between Africa, Middle East, and Europe</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🏛️</span>
                    <div>
                      <p className="font-semibold">Educational Hub</p>
                      <p className="text-gray-600">Home to Al-Azhar, Cairo University, and AUC</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🏢</span>
                    <div>
                      <p className="font-semibold">Economic Center</p>
                      <p className="text-gray-600">Egypt's business and technology capital</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">📈</span>
                    <div>
                      <p className="font-semibold">Growing Tech Scene</p>
                      <p className="text-gray-600">Rapidly expanding startup and fintech ecosystem</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Achievements */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Chapter Achievements</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-bold text-[#003594] mb-4">{achievement.title}</h3>
                  <p className="text-gray-700 mb-4">{achievement.description}</p>
                  <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                    <p className="font-semibold text-[#003594] text-center">{achievement.metric}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Focus Areas */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Our Focus Areas</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {focusAreas.map((area, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl">{area.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-[#003594] mb-3">{area.title}</h3>
                      <p className="text-gray-700">{area.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Regional Impact */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Regional Impact & Collaboration</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">🌍 MENA Leadership</h3>
                <p className="text-lg mb-6">
                  OWASP Cairo serves as a cybersecurity beacon for the entire Middle East and 
                  North Africa region, facilitating knowledge sharing and best practices across borders.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Cross-border collaboration with regional chapters</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Joint conferences and training programs</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Cultural and linguistic bridge for Arabic-speaking community</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Academic partnerships across the region</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🏛️ Educational Partnerships</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Cairo University</h4>
                    <p className="text-gray-700">Collaboration on cybersecurity research and student programs</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">American University in Cairo</h4>
                    <p className="text-gray-700">Joint workshops and international cybersecurity initiatives</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Al-Azhar University</h4>
                    <p className="text-gray-700">Bridging traditional scholarship with modern security practices</p>
                  </div>
                  <div className="border-l-4 border-[#003594] pl-6 py-4">
                    <h4 className="font-semibold">Technical Institutes</h4>
                    <p className="text-gray-700">Practical training programs for emerging cybersecurity professionals</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Community & Industry */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Community & Industry Engagement</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🏦 Fintech & Banking</h3>
                <p className="text-gray-700 mb-4">
                  Supporting Egypt's rapidly growing fintech sector with specialized security 
                  training and best practices. We work closely with banks and financial institutions 
                  to address the unique security challenges of digital financial services.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Mobile banking security workshops</p>
                  <p>• API security for fintech applications</p>
                  <p>• Compliance and regulatory guidance</p>
                  <p>• Payment security best practices</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🚀 Startup Ecosystem</h3>
                <p className="text-gray-700 mb-4">
                  Nurturing Egypt's vibrant startup ecosystem by providing early-stage companies 
                  with essential cybersecurity knowledge and resources to build secure products 
                  from the ground up.
                </p>
                <div className="space-y-3">
                  <a href="#" className="block w-full bg-[#003594] text-white px-4 py-2 rounded-lg text-center hover:bg-[#002d7a] transition-colors">
                    Join Our Community
                  </a>
                  <a href="mailto:cairo@owasp.org" className="block w-full border border-[#003594] text-[#003594] px-4 py-2 rounded-lg text-center hover:bg-[#003594] hover:text-white transition-colors">
                    Partner With Us
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Get Involved */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Get Involved</h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-[#003594] mb-4">Join Egypt's Premier Cybersecurity Community</h3>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Whether you're a security professional, developer, student, or industry leader, 
                  OWASP Cairo offers opportunities to learn, contribute, and grow within one of 
                  Africa's most active cybersecurity communities.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <span className="text-5xl mb-4 block">🎓</span>
                  <h4 className="font-semibold text-[#003594] mb-2">Learn</h4>
                  <p className="text-gray-600 text-sm">Monthly meetups, workshops, and training sessions</p>
                </div>
                <div className="text-center">
                  <span className="text-5xl mb-4 block">🤝</span>
                  <h4 className="font-semibold text-[#003594] mb-2">Network</h4>
                  <p className="text-gray-600 text-sm">Connect with regional cybersecurity professionals</p>
                </div>
                <div className="text-center">
                  <span className="text-5xl mb-4 block">🌟</span>
                  <h4 className="font-semibold text-[#003594] mb-2">Contribute</h4>
                  <p className="text-gray-600 text-sm">Share knowledge and help build the community</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Cairo</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of Africa's most active cybersecurity community. Join us in building a more 
              secure digital future for Egypt, the MENA region, and beyond.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Meetups
              </a>
              <a href="mailto:cairo@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Contact Leaders
              </a>
              <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Become a Speaker
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 