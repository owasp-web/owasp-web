'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KampalaChapterPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🇺🇬</span>
                <Image src="/images/logos/owasp-logo-small-white.svg" alt="OWASP Logo" width={80} height={80} className="mr-4" />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Kampala</h1>
              <p className="text-xl mb-6">Uganda</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                The Pearl of Africa's tech capital. OWASP Kampala drives cybersecurity innovation 
                in East Africa's emerging digital economy, supporting Uganda's transformation into 
                a regional technology hub.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🌍 East African Gateway</h3>
                <p className="text-lg">Securing Uganda's digital transformation and regional technology leadership</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Kampala</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Kampala stands as East Africa's emerging technology hub, with a vibrant startup 
                  ecosystem and growing fintech sector. OWASP Kampala supports Uganda's digital 
                  transformation and regional technology leadership.
                </p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Focus</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Mobile money security</p>
                    <p>• Startup ecosystem protection</p>
                    <p>• Digital financial inclusion</p>
                    <p>• Regional cybersecurity capacity</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Regional Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">💱</span>
                    <div>
                      <p className="font-semibold">Mobile Money Pioneer</p>
                      <p className="text-gray-600">Building on M-Pesa success in East Africa</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🚀</span>
                    <div>
                      <p className="font-semibold">Startup Ecosystem</p>
                      <p className="text-gray-600">Growing technology and innovation hub</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
} 