'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function YaoundeChapterPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🇨🇲</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Yaoundé</h1>
              <p className="text-xl mb-6">Cameroon</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Cameroon's political capital and heart of Central Africa. OWASP Yaoundé drives 
                cybersecurity governance and regional collaboration across Central African nations, 
                bridging Francophone and Anglophone security communities.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🏛️ Central African Capital</h3>
                <p className="text-lg">Securing government infrastructure and fostering regional cybersecurity cooperation</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Community
                </a>
                <a href="mailto:yaounde@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Yaoundé</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  As Cameroon's capital and the political heart of Central Africa, Yaoundé 
                  serves as a crucial hub for regional governance and international cooperation. 
                  OWASP Yaoundé focuses on securing government digital infrastructure and 
                  fostering cybersecurity collaboration across Central African nations.
                </p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Focus</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Government cybersecurity frameworks</p>
                    <p>• Regional security cooperation</p>
                    <p>• Digital governance initiatives</p>
                    <p>• Cross-border cybersecurity standards</p>
                    <p>• Francophone-Anglophone security bridge</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Regional Leadership</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🏛️</span>
                    <div>
                      <p className="font-semibold">Political Capital</p>
                      <p className="text-gray-600">Government and diplomatic cybersecurity</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🌍</span>
                    <div>
                      <p className="font-semibold">Central African Hub</p>
                      <p className="text-gray-600">Regional cooperation and standards</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🗣️</span>
                    <div>
                      <p className="font-semibold">Linguistic Bridge</p>
                      <p className="text-gray-600">French-English cybersecurity communities</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Central African Impact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">🏛️ Government Leadership</h3>
                <p className="text-lg mb-6">
                  Working with Cameroon's government institutions and international organizations 
                  to develop cybersecurity policies that serve as models for Central African nations.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>National cybersecurity strategies</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Regional cooperation frameworks</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Diplomatic cybersecurity protocols</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🌍 Regional Cooperation</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-6 py-4">
                    <h4 className="font-semibold">CEMAC Integration</h4>
                    <p className="text-gray-700">Central African Economic and Monetary Union security</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6 py-4">
                    <h4 className="font-semibold">Cross-Border Standards</h4>
                    <p className="text-gray-700">Harmonizing cybersecurity across Central Africa</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-6 py-4">
                    <h4 className="font-semibold">Capacity Building</h4>
                    <p className="text-gray-700">Training and education across the region</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Yaoundé</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of Central Africa's cybersecurity transformation. Join us in building 
              secure digital governance and fostering regional cooperation across Central African nations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Community
              </a>
              <a href="mailto:yaounde@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
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