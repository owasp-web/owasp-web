'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function YolaChapterPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🇳🇬</span>
                <Image
                  src="/images/logos/owasp-logo-small-white.svg"
                  alt="OWASP Logo"
                  width={80}
                  height={80}
                  className="mr-4"
                />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Yola</h1>
              <p className="text-xl mb-6">Nigeria</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Adamawa State's capital and gateway to Northeastern Nigeria. OWASP Yola drives 
                cybersecurity resilience and digital infrastructure development across Nigeria's 
                northeastern regions, building secure foundations for regional growth.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🌍 Northeastern Gateway</h3>
                <p className="text-lg">Securing digital infrastructure and fostering cybersecurity resilience in Northeastern Nigeria</p>
              </div>
              <div className="flex justify-center space-x-4">
                <a href="#" className="bg-white text-[#003594] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Join Our Community
                </a>
                <a href="mailto:yola@owasp.org" className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
                  Contact Chapter
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Yola</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  As the capital of Adamawa State and a key city in Northeastern Nigeria, 
                  Yola serves as an important regional hub for education, agriculture, and 
                  emerging technology initiatives. OWASP Yola focuses on building cybersecurity 
                  capacity and digital resilience across the region.
                </p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Focus</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Regional cybersecurity capacity building</p>
                    <p>• Educational institution security</p>
                    <p>• Agricultural technology protection</p>
                    <p>• Cross-border security initiatives</p>
                    <p>• Digital literacy and awareness</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Regional Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🎓</span>
                    <div>
                      <p className="font-semibold">Educational Hub</p>
                      <p className="text-gray-600">American University of Nigeria and regional institutions</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🌾</span>
                    <div>
                      <p className="font-semibold">Agricultural Innovation</p>
                      <p className="text-gray-600">Securing agtech and farming digital systems</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🌍</span>
                    <div>
                      <p className="font-semibold">Regional Gateway</p>
                      <p className="text-gray-600">Connecting Nigeria with Chad and Cameroon</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">Building Digital Resilience</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white rounded-lg p-8">
                <h3 className="text-2xl font-bold mb-4">🛡️ Cybersecurity Resilience</h3>
                <p className="text-lg mb-6">
                  Developing robust cybersecurity frameworks that can withstand challenges 
                  and support sustainable digital growth across Northeastern Nigeria's 
                  diverse communities and institutions.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Critical infrastructure protection</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Educational institution security</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-green-300">✓</span>
                    <p>Regional capacity building programs</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">🌱 Key Initiatives</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-green-500 pl-6 py-4">
                    <h4 className="font-semibold">Digital Literacy Programs</h4>
                    <p className="text-gray-700">Cybersecurity awareness and education initiatives</p>
                  </div>
                  <div className="border-l-4 border-blue-500 pl-6 py-4">
                    <h4 className="font-semibold">Agricultural Technology Security</h4>
                    <p className="text-gray-700">Protecting farm management and agtech systems</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-6 py-4">
                    <h4 className="font-semibold">Cross-Border Cooperation</h4>
                    <p className="text-gray-700">Regional security collaboration and standards</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <section className="bg-[#003594] text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Join OWASP Yola</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Be part of building cybersecurity resilience in Northeastern Nigeria. Join us in 
              developing secure digital infrastructure that supports regional growth and innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="bg-white text-[#003594] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Our Community
              </a>
              <a href="mailto:yola@owasp.org" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#003594] transition-colors">
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