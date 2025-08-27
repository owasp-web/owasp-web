'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NairobiChapterPage() {
  const techEcosystem = [
    { name: 'M-Pesa', description: 'Revolutionary mobile payment system', impact: 'Global fintech leader' },
    { name: 'Safaricom', description: 'Leading telecom and tech services', impact: 'Digital infrastructure' },
    { name: 'iHub', description: 'Innovation hub and tech community', impact: 'Startup ecosystem' },
    { name: 'Konza Technopolis', description: 'Kenya\'s Silicon Savannah project', impact: 'Smart city development' }
  ];

  const focusAreas = [
    {
      icon: '📱',
      title: 'Mobile-First Security',
      description: 'Leading mobile payment and fintech security innovations across Africa'
    },
    {
      icon: '🌍',
      title: 'East African Hub',
      description: 'Serving Kenya, Uganda, Tanzania, Rwanda, and the broader East African community'
    },
    {
      icon: '🏦',
      title: 'Fintech Innovation',
      description: 'Supporting Africa\'s rapidly growing digital financial services sector'
    },
    {
      icon: '🎓',
      title: 'University Partnerships',
      description: 'Collaboration with University of Nairobi, Strathmore, and regional institutions'
    },
    {
      icon: '🚀',
      title: 'Startup Ecosystem',
      description: 'Nurturing Kenya\'s vibrant tech startup scene and Silicon Savannah'
    },
    {
      icon: '🌐',
      title: 'Digital Transformation',
      description: 'Supporting government and enterprise digital transformation initiatives'
    }
  ];

  const regionalImpact = [
    { country: 'Kenya', highlights: ['M-Pesa security', 'Government digital services', 'Startup support'] },
    { country: 'Uganda', highlights: ['Cross-border fintech', 'Tech education', 'Regional collaboration'] },
    { country: 'Tanzania', highlights: ['Mobile money security', 'Port digitization', 'Regional standards'] },
    { country: 'Rwanda', highlights: ['Digital Rwanda', 'Blockchain initiatives', 'Smart city projects'] }
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
                <span className="text-6xl mr-4">🇰🇪</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Nairobi</h1>
              <p className="text-xl mb-6">Kenya</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Securing Africa's Silicon Savannah. At the heart of East Africa's technology revolution, 
                OWASP Nairobi leads application security innovation across the region's rapidly growing 
                fintech, mobile payment, and digital transformation landscape.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🌟 Silicon Savannah Security</h3>
                <p className="text-lg">Protecting the innovations that connect and empower millions across East Africa</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Community
                </a>
                <a href="mailto:nairobi@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Silicon Savannah Context */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Silicon Savannah Security</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Nairobi stands as Africa's undisputed technology capital, earning the nickname 
                  "Silicon Savannah." Home to groundbreaking innovations like M-Pesa, the city 
                  leads the continent in fintech, mobile money, and digital transformation.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  OWASP Nairobi sits at the epicenter of this technological revolution, ensuring 
                  that East Africa's digital innovations are built on a foundation of robust 
                  security practices that protect millions of users across the region.
                </p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Mission</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Secure Kenya's fintech and mobile payment innovations</p>
                    <p>• Support East Africa's digital transformation</p>
                    <p>• Protect millions of mobile money users</p>
                    <p>• Build regional cybersecurity capacity</p>
                    <p>• Foster secure startup ecosystem growth</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Tech Ecosystem Impact</h3>
                <div className="space-y-4">
                  {techEcosystem.map((company, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                      <h4 className="font-semibold text-[#003594] mb-2">{company.name}</h4>
                      <p className="text-gray-700 text-sm mb-2">{company.description}</p>
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {company.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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
            <h2 className="text-3xl font-bold text-[#003594] mb-8">East African Impact</h2>
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">🌍 Regional Leadership</h3>
                <p className="text-lg mb-6">
                  As East Africa's tech capital, Nairobi drives cybersecurity innovation across 
                  Kenya, Uganda, Tanzania, Rwanda, and beyond. Our chapter serves as the regional 
                  hub for application security best practices.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Cross-border fintech security standards</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Regional cybersecurity capacity building</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Mobile money security frameworks</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Startup ecosystem security support</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">📱 M-Pesa Security Legacy</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Born in Kenya, M-Pesa revolutionized mobile payments globally. OWASP Nairobi 
                  continues this legacy by ensuring that the next generation of fintech innovations 
                  maintains the highest security standards.
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-6 py-4">
                    <h4 className="font-semibold">Global Impact</h4>
                    <p className="text-gray-700">40+ million users across multiple countries</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6 py-4">
                    <h4 className="font-semibold">Security Innovation</h4>
                    <p className="text-gray-700">Leading mobile payment security standards</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-6 py-4">
                    <h4 className="font-semibold">Regional Expansion</h4>
                    <p className="text-gray-700">Security frameworks for cross-border payments</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regionalImpact.map((region, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-[#003594] mb-3">{region.country}</h4>
                  <div className="space-y-2">
                    {region.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-[#003594] rounded-full"></span>
                        <p className="text-sm text-gray-700">{highlight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Innovation & Startups */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Supporting Innovation</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🚀 Startup Ecosystem</h3>
                <p className="text-gray-700 mb-4">
                  Kenya's startup scene is one of Africa's most vibrant. We provide emerging 
                  companies with the security knowledge and tools they need to build trust 
                  with users and scale successfully across Africa.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Security workshops for early-stage startups</p>
                  <p>• Fintech security best practices</p>
                  <p>• Mobile app security training</p>
                  <p>• API security for payment platforms</p>
                  <p>• Compliance guidance for financial services</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🏛️ Government & Enterprise</h3>
                <p className="text-gray-700 mb-4">
                  Supporting Kenya's digital transformation agenda by working with government 
                  agencies and large enterprises to implement robust security practices in 
                  their digital services and infrastructure.
                </p>
                <div className="space-y-3">
                  <a href="#" className="block w-full bg-[#003594] text-white px-4 py-2 rounded-lg text-center hover:bg-[#002d7a] transition-colors">
                    Partner With Us
                  </a>
                  <a href="mailto:nairobi@owasp.org" className="block w-full border border-[#003594] text-[#003594] px-4 py-2 rounded-lg text-center hover:bg-[#003594] hover:text-white transition-colors">
                    Contact for Collaboration
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Community Impact */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Community Impact</h2>
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-[#003594] mb-4">Securing Digital Inclusion</h3>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  In a region where mobile phones are often the primary gateway to digital services, 
                  our work directly impacts millions of people's daily lives, financial security, 
                  and access to essential services.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <span className="text-5xl mb-4 block">📱</span>
                  <h4 className="font-semibold text-[#003594] mb-2">40M+ Users</h4>
                  <p className="text-gray-600 text-sm">Protected by security practices we help establish</p>
                </div>
                <div className="text-center">
                  <span className="text-5xl mb-4 block">💰</span>
                  <h4 className="font-semibold text-[#003594] mb-2">$1B+ Daily</h4>
                  <p className="text-gray-600 text-sm">Mobile money transactions secured across East Africa</p>
                </div>
                <div className="text-center">
                  <span className="text-5xl mb-4 block">🌍</span>
                  <h4 className="font-semibold text-[#003594] mb-2">5 Countries</h4>
                  <p className="text-gray-600 text-sm">Regional impact across East African Community</p>
                </div>
              </div>
            </div>
          </section>

          {/* Get Involved */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Get Involved</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🎯 For Professionals</h3>
                <p className="text-gray-700 mb-4">
                  Join Kenya's leading cybersecurity professionals in advancing application 
                  security across the region. Whether you work in fintech, government, or 
                  traditional enterprise, we have a place for you.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Monthly technical meetups</p>
                  <p>• Regional conference opportunities</p>
                  <p>• Industry working groups</p>
                  <p>• Professional networking events</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🎓 For Students & Newcomers</h3>
                <p className="text-gray-700 mb-4">
                  Start your cybersecurity journey in Africa's leading tech hub. We welcome 
                  students, career changers, and anyone interested in learning about 
                  application security.
                </p>
                <div className="space-y-3">
                  <a href="#" className="block w-full bg-[#003594] text-white px-4 py-2 rounded-lg text-center hover:bg-[#002d7a] transition-colors">
                    Join Student Program
                  </a>
                  <a href="#" className="block w-full border border-[#003594] text-[#003594] px-4 py-2 rounded-lg text-center hover:bg-[#003594] hover:text-white transition-colors">
                    Attend Next Meetup
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Nairobi</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of securing Africa's digital future. Join us in building and protecting 
              the innovations that connect, empower, and transform millions of lives across East Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Community
              </a>
              <a href="mailto:nairobi@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
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