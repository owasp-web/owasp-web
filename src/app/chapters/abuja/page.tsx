'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AbujaChapterPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex items-center justify-center mb-6">
                <span className="text-6xl mr-4">🇳🇬</span>
                <Image src="/images/logos/owasp-logo-small-white.svg" alt="OWASP Logo" width={80} height={80} className="mr-4" />
              </div>
              <h1 className="text-5xl font-bold mb-4">OWASP Abuja</h1>
              <p className="text-xl mb-6">Nigeria</p>
              <p className="text-lg max-w-4xl mx-auto mb-8">
                Nigeria's capital and center of government. OWASP Abuja secures the digital transformation 
                of Africa's most populous nation, working with federal ministries, agencies, and the 
                institutions that govern 200+ million Nigerians.
              </p>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 max-w-3xl mx-auto mb-8">
                <h3 className="text-2xl font-bold mb-4">🏛️ Government Capital</h3>
                <p className="text-lg">Securing Nigeria's digital government and public sector transformation</p>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Abuja</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  As Nigeria's Federal Capital Territory, Abuja serves as the seat of government 
                  for Africa's most populous nation. OWASP Abuja focuses on securing the digital 
                  infrastructure that serves over 200 million citizens.
                </p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-[#003594] mb-4">🎯 Our Focus</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>• Government digital transformation</p>
                    <p>• Public sector cybersecurity</p>
                    <p>• Federal agency security frameworks</p>
                    <p>• E-governance initiatives</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#003594] mb-4">Government Impact</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🏛️</span>
                    <div>
                      <p className="font-semibold">Federal Government</p>
                      <p className="text-gray-600">Ministries, Departments & Agencies (MDAs)</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl mt-1">🌍</span>
                    <div>
                      <p className="font-semibold">200M+ Citizens</p>
                      <p className="text-gray-600">Digital services for Africa's largest population</p>
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