'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function JohannesburgChapterPage() {
  const businessDistricts = [
    { name: 'Sandton', description: 'Africa\'s richest square mile', impact: 'Financial headquarters' },
    { name: 'Midrand', description: 'Technology and data center hub', impact: 'Digital infrastructure' },
    { name: 'Rosebank', description: 'Business and innovation district', impact: 'Corporate security' },
    { name: 'Fourways', description: 'Emerging tech corridor', impact: 'Startup ecosystem' }
  ];

  const focusAreas = [
    {
      icon: '🏢',
      title: 'Business Capital',
      description: 'Securing Africa\'s business capital with the highest concentration of corporate headquarters'
    },
    {
      icon: '💎',
      title: 'Mining Technology',
      description: 'Protecting digital innovations in mining, gold, and natural resource industries'
    },
    {
      icon: '🏦',
      title: 'Financial Services',
      description: 'Supporting Sandton\'s role as Africa\'s Wall Street with advanced security'
    },
    {
      icon: '📊',
      title: 'JSE & Trading',
      description: 'Securing the Johannesburg Stock Exchange and high-frequency trading systems'
    },
    {
      icon: '🌍',
      title: 'Regional Headquarters',
      description: 'Protecting multinational corporations using Johannesburg as their African base'
    },
    {
      icon: '⚡',
      title: 'Energy Security',
      description: 'Supporting Eskom and South Africa\'s critical energy infrastructure'
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
              <h1 className="text-5xl font-bold mb-4">OWASP Johannesburg</h1>
              <p className="text-xl mb-6">South Africa</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                The City of Gold meets cybersecurity excellence. OWASP Johannesburg secures 
                Africa's business capital, from Sandton's financial towers to the mining 
                innovations that power continental economies.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">💼 Africa's Business Capital</h3>
                <p className="text-lg">Protecting the corporate headquarters and financial centers that drive African business</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Community
                </a>
                <a href="mailto:johannesburg@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* About Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Johannesburg</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Johannesburg stands as Africa's undisputed business capital, home to the 
                  continent's largest stock exchange, major mining companies, and the highest 
                  concentration of multinational corporate headquarters on the continent.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  OWASP Johannesburg operates at the center of this business ecosystem, 
                  working with Fortune 500 companies, financial institutions, and mining 
                  giants to secure the systems that drive African economic growth.
                </p>
                <div className="bg-yellow-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Mission</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Secure Africa's largest business district</p>
                    <p>• Protect JSE and financial trading systems</p>
                    <p>• Support multinational corporate security</p>
                    <p>• Advance mining and industrial cybersecurity</p>
                    <p>• Foster enterprise security best practices</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Business District Security</h3>
                <div className="space-y-4">
                  {businessDistricts.map((district, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-[#003594] mb-2">{district.name}</h4>
                      <p className="text-gray-700 text-sm mb-2">{district.description}</p>
                      <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {district.impact}
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

          {/* Economic Impact */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Economic Impact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">💼 Corporate Concentration</h3>
                <p className="text-lg mb-6">
                  Johannesburg hosts more Fortune 500 African headquarters than any other 
                  city, making our cybersecurity work critical to continental business operations.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-2xl font-bold">70%</p>
                    <p className="text-sm">SA Corporate HQs</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-2xl font-bold">$200B+</p>
                    <p className="text-sm">Market Cap Protected</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🏭 Industry Leadership</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-yellow-500 pl-6 py-4">
                    <h4 className="font-semibold">Mining Technology</h4>
                    <p className="text-gray-700">Digital transformation of Africa's mining sector</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6 py-4">
                    <h4 className="font-semibold">Financial Services</h4>
                    <p className="text-gray-700">JSE and banking infrastructure security</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6 py-4">
                    <h4 className="font-semibold">Energy & Utilities</h4>
                    <p className="text-gray-700">Protecting critical infrastructure and smart grid</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Get Involved */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Get Involved</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🏢 Enterprise Security</h3>
                <p className="text-gray-700 mb-4">
                  Join South Africa's premier enterprise cybersecurity community. Connect 
                  with security leaders from major corporations, banks, and mining companies.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Enterprise security frameworks</p>
                  <p>• Board-level security reporting</p>
                  <p>• Supply chain security</p>
                  <p>• Business continuity planning</p>
                </div>
              </div>
              
              <div className="bg-yellow-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🏭 Industrial Security</h3>
                <p className="text-gray-700 mb-4">
                  Specialized focus on mining, energy, and industrial cybersecurity. 
                  Protecting the critical infrastructure that powers African economies.
                </p>
                <div className="space-y-3">
                  <a href="#" className="block w-full bg-[#003594] text-white px-4 py-2 rounded-lg text-center hover:bg-[#002d7a] transition-colors">
                    Enterprise Program
                  </a>
                  <a href="mailto:johannesburg@owasp.org" className="block w-full border border-[#003594] text-[#003594] px-4 py-2 rounded-lg text-center hover:bg-[#003594] hover:text-white transition-colors">
                    Corporate Partnerships
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Call to Action */}
        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Johannesburg</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Secure Africa's business capital. Join us in protecting the corporate systems, 
              financial infrastructure, and industrial innovations that drive economic growth 
              across the entire continent.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Community
              </a>
              <a href="mailto:johannesburg@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Contact Leaders
              </a>
              <a href="#" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Enterprise Solutions
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 