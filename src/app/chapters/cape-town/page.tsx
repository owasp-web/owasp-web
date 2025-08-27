'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CapeTownChapterPage() {
  const techEcosystem = [
    {
      sector: 'Fintech',
      companies: 'Yoco, Ozow, PayFast',
      description: 'Leading African fintech innovation',
      growth: 'Rapidly expanding across Africa'
    },
    {
      sector: 'E-commerce',
      companies: 'Takealot, Loot, Konga',
      description: 'Driving online retail transformation',
      growth: 'Regional marketplace leaders'
    },
    {
      sector: 'Startups',
      companies: 'GetSmarter, Aerobotics, DataProphet',
      description: 'AI, education, and agtech innovations',
      growth: 'Global expansion and acquisitions'
    },
    {
      sector: 'Enterprise',
      companies: 'Naspers, MTN, Standard Bank',
      description: 'Large-scale digital transformation',
      growth: 'Continental technology leadership'
    }
  ];

  const focusAreas = [
    {
      icon: '🏔️',
      title: 'Mother City Innovation',
      description: 'Leveraging Cape Town\'s unique position as Africa\'s tech capital and innovation gateway'
    },
    {
      icon: '🌍',
      title: 'African Gateway',
      description: 'Connecting South African security practices with the broader African continent'
    },
    {
      icon: '🏦',
      title: 'Financial Services',
      description: 'Securing Africa\'s largest and most sophisticated financial services sector'
    },
    {
      icon: '🎓',
      title: 'World-Class Universities',
      description: 'Partnership with UCT, Stellenbosch, and leading technical institutions'
    },
    {
      icon: '🌐',
      title: 'Global Connections',
      description: 'Bridging African innovations with global security standards and practices'
    },
    {
      icon: '⚖️',
      title: 'Regulatory Leadership',
      description: 'Advancing cybersecurity frameworks aligned with POPIA and international standards'
    }
  ];

  const achievements = [
    {
      title: 'Continental Leadership',
      description: 'Driving cybersecurity standards across the African continent',
      metric: 'Regional influence across 10+ countries'
    },
    {
      title: 'Innovation Hub',
      description: 'Supporting Africa\'s most mature startup ecosystem',
      metric: '300+ active tech startups'
    },
    {
      title: 'Financial Security',
      description: 'Protecting Africa\'s largest financial services market',
      metric: '$100B+ in transactions'
    }
  ];

  const initiatives = [
    {
      title: 'African Fintech Security Initiative',
      description: 'Developing security frameworks for mobile money and digital banking across Africa',
      partners: 'Standard Bank, FNB, Nedbank'
    },
    {
      title: 'Startup Security Program',
      description: 'Providing cybersecurity guidance to Cape Town\'s rapidly growing startup ecosystem',
      partners: 'LaunchLab, AngelHub, Knife Capital'
    },
    {
      title: 'POPIA Compliance Framework',
      description: 'Leading South Africa\'s implementation of data protection and privacy regulations',
      partners: 'Government, Enterprise, SMEs'
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
                <span className="text-6xl mr-4">🇿🇦</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Cape Town</h1>
              <p className="text-xl mb-6">South Africa</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Where Table Mountain meets innovation. OWASP Cape Town leads African cybersecurity 
                from the continent's tech capital, securing the innovations that connect, finance, 
                and empower over a billion people across Africa.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🏔️ Africa's Tech Capital</h3>
                <p className="text-lg">Securing the Mother City's innovations that shape the entire African continent</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Community
                </a>
                <a href="mailto:capetown@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Cape Town</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Cape Town stands as Africa's undisputed technology capital, earning recognition 
                  as the "Mother City" of African innovation. Home to the continent's most mature 
                  startup ecosystem, leading fintech companies, and world-class universities, 
                  Cape Town drives technological advancement across Africa.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  OWASP Cape Town sits at the heart of this ecosystem, ensuring that African 
                  innovations are built on a foundation of robust security practices that protect 
                  businesses, governments, and individuals across the continent.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Mission</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Secure Africa's leading technology innovations</p>
                    <p>• Support continental fintech and e-commerce growth</p>
                    <p>• Advance cybersecurity education and research</p>
                    <p>• Promote POPIA and data protection compliance</p>
                    <p>• Bridge African and global security communities</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Why Cape Town Leads</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🌍</span>
                    <div>
                      <p className="font-semibold">Continental Gateway</p>
                      <p className="text-gray-600">Africa's most connected city with global reach</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🎓</span>
                    <div>
                      <p className="font-semibold">World-Class Education</p>
                      <p className="text-gray-600">UCT, Stellenbosch, and top technical institutions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🏢</span>
                    <div>
                      <p className="font-semibold">Corporate Headquarters</p>
                      <p className="text-gray-600">Naspers, MTN, major African enterprises</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🚀</span>
                    <div>
                      <p className="font-semibold">Startup Ecosystem</p>
                      <p className="text-gray-600">Africa's most mature venture capital environment</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Tech Ecosystem */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Cape Town's Tech Ecosystem</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {techEcosystem.map((sector, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-[#003594] mb-3">{sector.sector}</h3>
                  <p className="text-gray-700 mb-3">{sector.description}</p>
                  <p className="text-sm text-gray-600 mb-3"><strong>Key Players:</strong> {sector.companies}</p>
                  <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    {sector.growth}
                  </span>
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

          {/* Key Initiatives */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Key Initiatives</h2>
            <div className="space-y-6">
              {initiatives.map((initiative, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-[#003594] mb-3">{initiative.title}</h3>
                  <p className="text-gray-700 mb-3">{initiative.description}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium text-gray-600">Partners:</span>
                    <span className="text-sm text-gray-600">{initiative.partners}</span>
                  </div>
                </div>
              ))}
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
                    <p className="font-semibold text-[#003594] text-center text-sm">{achievement.metric}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Continental Impact */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Continental Impact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">🌍 African Leadership</h3>
                <p className="text-lg mb-6">
                  As Africa's most developed tech ecosystem, Cape Town's security innovations 
                  and standards ripple across the continent, influencing cybersecurity practices 
                  from Cairo to Lagos to Nairobi.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Continental fintech security standards</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Cross-border payment security frameworks</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>African startup security best practices</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Regional cybersecurity capacity building</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🏛️ Regulatory Innovation</h3>
                <p className="text-lg text-gray-700 mb-6">
                  Cape Town leads Africa's regulatory innovation in cybersecurity and data 
                  protection, with POPIA (Protection of Personal Information Act) serving 
                  as a model for other African countries.
                </p>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-6 py-4">
                    <h4 className="font-semibold">POPIA Implementation</h4>
                    <p className="text-gray-700">Leading data protection compliance across Africa</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6 py-4">
                    <h4 className="font-semibold">Financial Regulations</h4>
                    <p className="text-gray-700">Setting standards for fintech and banking security</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-6 py-4">
                    <h4 className="font-semibold">Cross-Border Standards</h4>
                    <p className="text-gray-700">Harmonizing cybersecurity across African markets</p>
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
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🏦 Financial Services</h3>
                <p className="text-gray-700 mb-4">
                  Working closely with Africa's largest banks and financial institutions to 
                  develop and implement cutting-edge security practices that protect millions 
                  of customers across the continent.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Mobile banking security protocols</p>
                  <p>• Cross-border payment security</p>
                  <p>• Digital identity and KYC systems</p>
                  <p>• Cryptocurrency and blockchain security</p>
                </div>
              </div>
              
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🚀 Startup Acceleration</h3>
                <p className="text-gray-700 mb-4">
                  Supporting Cape Town's vibrant startup ecosystem with security-first 
                  development practices, enabling African innovations to scale globally 
                  with confidence and trust.
                </p>
                <div className="space-y-3">
                  <a href="#" className="block w-full bg-[#003594] text-white px-4 py-2 rounded-lg text-center hover:bg-[#002d7a] transition-colors">
                    Startup Security Program
                  </a>
                  <a href="mailto:capetown@owasp.org" className="block w-full border border-[#003594] text-[#003594] px-4 py-2 rounded-lg text-center hover:bg-[#003594] hover:text-white transition-colors">
                    Enterprise Partnerships
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
                <h3 className="text-2xl font-semibold text-[#003594] mb-4">Join Africa's Premier Cybersecurity Hub</h3>
                <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                  Whether you're securing African fintech, protecting enterprise systems, 
                  researching at world-class universities, or building the next great African 
                  startup, OWASP Cape Town is your gateway to continental cybersecurity leadership.
                </p>
              </div>
              
              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center">
                  <span className="text-5xl mb-4 block">🏦</span>
                  <h4 className="font-semibold text-[#003594] mb-2">Enterprise</h4>
                  <p className="text-gray-600 text-sm">Banking, fintech, and large-scale security</p>
                </div>
                <div className="text-center">
                  <span className="text-5xl mb-4 block">🚀</span>
                  <h4 className="font-semibold text-[#003594] mb-2">Startups</h4>
                  <p className="text-gray-600 text-sm">Security-first development and scaling</p>
                </div>
                <div className="text-center">
                  <span className="text-5xl mb-4 block">🎓</span>
                  <h4 className="font-semibold text-[#003594] mb-2">Academia</h4>
                  <p className="text-gray-600 text-sm">Research collaboration and education</p>
                </div>
                <div className="text-center">
                  <span className="text-5xl mb-4 block">🏛️</span>
                  <h4 className="font-semibold text-[#003594] mb-2">Government</h4>
                  <p className="text-gray-600 text-sm">Policy development and compliance</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Cape Town</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of securing Africa's digital future from the continent's technology capital. 
              Join us in building and protecting the innovations that will transform a billion lives 
              across Africa.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Community
              </a>
              <a href="mailto:capetown@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Contact Leaders
              </a>
              <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Partner With Us
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 