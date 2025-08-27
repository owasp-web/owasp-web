'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function MoroccoChapterPage() {
  const digitalInitiatives = [
    {
      title: 'Morocco Digital 2030',
      description: 'National digital strategy transforming government and economy',
      impact: 'Nationwide digital transformation'
    },
    {
      title: 'Casablanca Finance City',
      description: 'Leading financial hub for Africa and Middle East',
      impact: 'Regional financial gateway'
    },
    {
      title: 'Mohammed VI Polytechnic University',
      description: 'Research and innovation in cybersecurity and AI',
      impact: 'Academic excellence'
    },
    {
      title: 'OFPPT Tech Centers',
      description: 'Technical training in cybersecurity and digital skills',
      impact: 'Workforce development'
    }
  ];

  const focusAreas = [
    {
      icon: '🏛️',
      title: 'Digital Kingdom',
      description: 'Supporting Morocco\'s ambitious digital transformation and smart city initiatives'
    },
    {
      icon: '🌉',
      title: 'Africa-Europe Bridge',
      description: 'Connecting African cybersecurity practices with European standards and innovations'
    },
    {
      icon: '🏦',
      title: 'Financial Hub',
      description: 'Securing Casablanca Finance City and Morocco\'s growing fintech sector'
    },
    {
      icon: '🎓',
      title: 'Education Excellence',
      description: 'Advancing cybersecurity research and education across Morocco\'s universities'
    },
    {
      icon: '🌐',
      title: 'OWASP AppSec Morocco',
      description: 'Hosting regional application security conferences and training programs'
    },
    {
      icon: '⚡',
      title: 'Government Innovation',
      description: 'Supporting e-government initiatives and digital public services'
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
                <span className="text-6xl mr-4">🇲🇦</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Morocco</h1>
              <p className="text-xl mb-6">Morocco</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Where the Atlantic meets the Mediterranean, OWASP Morocco bridges Africa and Europe 
                in cybersecurity excellence. From Casablanca's financial district to Rabat's digital 
                government initiatives, we secure Morocco's transformation into a digital kingdom.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🌉 Digital Bridge</h3>
                <p className="text-lg">Connecting Africa and Europe through cybersecurity innovation and AppSec excellence</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Community
                </a>
                <a href="mailto:morocco@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Morocco</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Morocco stands at the crossroads of Africa and Europe, serving as a strategic 
                  bridge between continents. With ambitious digital transformation initiatives 
                  like Morocco Digital 2030 and world-class infrastructure projects, the Kingdom 
                  is positioning itself as a regional leader in technology and innovation.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  OWASP Morocco operates at the heart of this transformation, supporting 
                  government digitization, financial sector security, and regional conferences 
                  that bring together cybersecurity professionals from across Africa and beyond.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Mission</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Support Morocco's digital transformation initiatives</p>
                    <p>• Bridge African and European cybersecurity communities</p>
                    <p>• Host regional OWASP AppSec conferences</p>
                    <p>• Advance government and financial sector security</p>
                    <p>• Foster cybersecurity education and research</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Strategic Advantages</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🌍</span>
                    <div>
                      <p className="font-semibold">Geographic Gateway</p>
                      <p className="text-gray-600">Bridge between Africa, Europe, and Middle East</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🏛️</span>
                    <div>
                      <p className="font-semibold">Government Leadership</p>
                      <p className="text-gray-600">Strong commitment to digital transformation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🏦</span>
                    <div>
                      <p className="font-semibold">Financial Hub</p>
                      <p className="text-gray-600">Casablanca Finance City serving Africa/MENA</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">📡</span>
                    <div>
                      <p className="font-semibold">Infrastructure Excellence</p>
                      <p className="text-gray-600">World-class telecommunications and data centers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Digital Initiatives */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Morocco's Digital Initiatives</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {digitalInitiatives.map((initiative, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-[#003594] mb-3">{initiative.title}</h3>
                  <p className="text-gray-700 mb-4">{initiative.description}</p>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-800">Impact: {initiative.impact}</p>
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

          {/* OWASP AppSec Morocco */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">OWASP AppSec Morocco</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">🌟 Regional Conference Leadership</h3>
                <p className="text-lg mb-6">
                  OWASP Morocco hosts the premier application security conference for Africa 
                  and the MENA region, bringing together hundreds of cybersecurity professionals 
                  from across continents for knowledge sharing and networking.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>International speakers and attendees</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Cutting-edge application security research</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Hands-on training workshops</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Regional cybersecurity networking</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">📅 Conference Highlights</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-6 py-4">
                    <h4 className="font-semibold">Technical Sessions</h4>
                    <p className="text-gray-700">Latest security research and vulnerability discoveries</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6 py-4">
                    <h4 className="font-semibold">Training Workshops</h4>
                    <p className="text-gray-700">Hands-on security training for professionals</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6 py-4">
                    <h4 className="font-semibold">Networking Events</h4>
                    <p className="text-gray-700">Connecting cybersecurity professionals across regions</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-6 py-4">
                    <h4 className="font-semibold">Industry Showcase</h4>
                    <p className="text-gray-700">Latest security tools and technologies</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Impact */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Strategic Impact</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-[#003594] mb-4">Government Digital Services</h3>
                <p className="text-gray-700 mb-4">Supporting Morocco's e-government initiatives with security frameworks and best practices</p>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold text-[#003594] text-center text-sm">National Scale Impact</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-[#003594] mb-4">Financial Sector Leadership</h3>
                <p className="text-gray-700 mb-4">Securing Casablanca Finance City and Morocco's banking infrastructure</p>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold text-[#003594] text-center text-sm">Regional Financial Hub</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-8 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-[#003594] mb-4">Cross-Continental Bridge</h3>
                <p className="text-gray-700 mb-4">Facilitating cybersecurity collaboration between Africa and Europe</p>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4">
                  <p className="font-semibold text-[#003594] text-center text-sm">International Cooperation</p>
                </div>
              </div>
            </div>
          </section>

          {/* Get Involved */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Get Involved</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🏛️ Government & Public Sector</h3>
                <p className="text-gray-700 mb-4">
                  Join Morocco's digital transformation journey. Whether you work in 
                  e-government, public services, or national cybersecurity, contribute 
                  to building secure digital infrastructure for all Moroccans.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• E-government security frameworks</p>
                  <p>• Public service digitization</p>
                  <p>• National cybersecurity strategies</p>
                  <p>• Digital identity and privacy</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🌍 International Collaboration</h3>
                <p className="text-gray-700 mb-4">
                  Connect with cybersecurity professionals across Africa, Europe, and the 
                  Middle East. Participate in cross-border security initiatives and 
                  regional conferences.
                </p>
                <div className="space-y-3">
                  <a href="#" className="block w-full bg-[#003594] text-white px-4 py-2 rounded-lg text-center hover:bg-[#002d7a] transition-colors">
                    AppSec Morocco Conference
                  </a>
                  <a href="mailto:morocco@owasp.org" className="block w-full border border-[#003594] text-[#003594] px-4 py-2 rounded-lg text-center hover:bg-[#003594] hover:text-white transition-colors">
                    Regional Partnerships
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Morocco</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of Morocco's digital transformation and the bridge connecting African and 
              European cybersecurity communities. Join us in building secure digital infrastructure 
              for Morocco and the broader region.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Community
              </a>
              <a href="mailto:morocco@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Contact Leaders
              </a>
              <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                AppSec Conference
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 