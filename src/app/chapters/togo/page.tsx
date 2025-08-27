'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TogoChapterPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🇹🇬</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Togo</h1>
              <p className="text-xl mb-6">Togo</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                West Africa's digital gateway and innovation bridge. OWASP Togo drives 
                cybersecurity excellence across the region, connecting Francophone and 
                Anglophone security communities while fostering digital transformation.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🌉 Regional Bridge</h3>
                <p className="text-lg">Connecting West African cybersecurity communities and fostering regional cooperation</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Community
                </a>
                <a href="mailto:togo@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Togo</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Strategically positioned as West Africa's gateway, Togo serves as a vital 
                  bridge connecting Francophone and Anglophone cybersecurity communities. 
                  OWASP Togo focuses on fostering regional collaboration and digital innovation 
                  across the West African sub-region.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Focus</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Regional cybersecurity collaboration</p>
                    <p>• Cross-border digital trade security</p>
                    <p>• Mobile money and fintech protection</p>
                    <p>• Francophone-Anglophone bridge building</p>
                    <p>• Government digital transformation</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Strategic Position</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🌉</span>
                    <div>
                      <p className="font-semibold">Regional Gateway</p>
                      <p className="text-gray-600">Connecting Ghana, Benin, and Burkina Faso</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🗣️</span>
                    <div>
                      <p className="font-semibold">Linguistic Bridge</p>
                      <p className="text-gray-600">French-English cybersecurity communities</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">💱</span>
                    <div>
                      <p className="font-semibold">Digital Finance Hub</p>
                      <p className="text-gray-600">Mobile money and cross-border payments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Regional Impact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">🌍 West African Leadership</h3>
                <p className="text-lg mb-6">
                  Facilitating cybersecurity cooperation across ECOWAS member states and 
                  building unified security standards for the West African economic community.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>ECOWAS cybersecurity initiatives</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Cross-border digital trade security</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Regional capacity building programs</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🚀 Innovation Focus</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-6 py-4">
                    <h4 className="font-semibold">Digital Government</h4>
                    <p className="text-gray-700">E-governance and public service digitization</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6 py-4">
                    <h4 className="font-semibold">Fintech Security</h4>
                    <p className="text-gray-700">Mobile banking and payment system protection</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-6 py-4">
                    <h4 className="font-semibold">Regional Standards</h4>
                    <p className="text-gray-700">Harmonized cybersecurity frameworks</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Togo</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of West Africa's cybersecurity transformation. Join us in building 
              regional cooperation and secure digital infrastructure across the ECOWAS community.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Community
              </a>
              <a href="mailto:togo@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
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