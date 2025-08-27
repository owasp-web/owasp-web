'use client';

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function KanoChapterPage() {
  return (
    <>
      <Header />
      <main className="bg-white min-h-screen">
        <section className="bg-gradient-to-r from-[#003594] to-[#0056b3] text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="text-6xl mb-4 block">🇳🇬</span>
            <Image src="/images/logos/owasp-logo-small-white.svg" alt="OWASP Logo" width={80} height={80} className="mx-auto mb-4" />
            <h1 className="text-5xl font-bold mb-4">OWASP Kano</h1>
            <p className="text-xl mb-6">Nigeria</p>
            <p className="text-lg max-w-3xl mx-auto">Northern Nigeria's commercial capital. Securing digital trade and e-commerce innovations across the Sahel region.</p>
          </div>
        </section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold text-[#003594] mb-8">About OWASP Kano</h2>
          <p className="text-lg text-gray-700 mb-8">Protecting Northern Nigeria's digital economy and cross-border trade security.</p>
        </div>
      </main>
      <Footer />
    </>
  );
} 