'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function GizaChapterPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
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
              <h1 className="text-5xl font-bold mb-4">OWASP Giza</h1>
              <p className="text-xl mb-6">Egypt</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Where ancient pyramids meet modern cybersecurity. OWASP Giza protects Egypt's 
                technological heritage while building the digital security infrastructure for 
                tomorrow's innovations in the shadow of the Great Pyramids.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🏛️ Ancient Wisdom, Modern Security</h3>
                <p className="text-lg">Bridging 5,000 years of Egyptian innovation with cutting-edge cybersecurity</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Community
                </a>
                <a href="mailto:giza@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Giza</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  In the shadow of the Great Pyramids, OWASP Giza represents the perfect fusion 
                  of ancient wisdom and modern innovation. As part of Greater Cairo's tech 
                  ecosystem, we focus on securing Egypt's growing technology sector while 
                  preserving its invaluable digital heritage.
                </p>
                <div className="bg-amber-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Focus</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Digital heritage preservation</p>
                    <p>• Tourism technology security</p>
                    <p>• Archaeological data protection</p>
                    <p>• Smart city initiatives</p>
                    <p>• Cultural institution cybersecurity</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Heritage & Innovation</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🏛️</span>
                    <div>
                      <p className="font-semibold">Ancient Heritage</p>
                      <p className="text-gray-600">Protecting 5,000 years of digital archives</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🌐</span>
                    <div>
                      <p className="font-semibold">Modern Innovation</p>
                      <p className="text-gray-600">Leading Egypt's digital transformation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🗿</span>
                    <div>
                      <p className="font-semibold">Pyramids Legacy</p>
                      <p className="text-gray-600">World heritage meets cybersecurity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Digital Heritage Protection</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">🏛️ Cultural Preservation</h3>
                <p className="text-lg mb-6">
                  Protecting Egypt's invaluable digital archives, archaeological databases, 
                  and cultural heritage systems that preserve thousands of years of human history.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Archaeological database security</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Museum digital collection protection</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Cultural site monitoring systems</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🌟 Innovation Centers</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-amber-500 pl-6 py-4">
                    <h4 className="font-semibold">Grand Egyptian Museum</h4>
                    <p className="text-gray-700">World's largest archaeological museum security</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6 py-4">
                    <h4 className="font-semibold">Tourism Technology</h4>
                    <p className="text-gray-700">Digital platforms serving millions of visitors</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-6 py-4">
                    <h4 className="font-semibold">Smart Giza Initiative</h4>
                    <p className="text-gray-700">Modern infrastructure around ancient sites</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Giza</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Bridge ancient wisdom with modern cybersecurity. Join us in protecting Egypt's 
              incredible heritage while building secure digital foundations for the future.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Community
              </a>
              <a href="mailto:giza@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                Contact Leaders
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 