'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import DonationForm from '@/components/DonationForm'

export const dynamic = 'force-dynamic'

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#101820] mb-4">Donate to the OWASP Foundation</h1>
        <p className="text-gray-600 mb-6">Your donation supports community-led projects and chapters around the world.</p>
        <DonationForm />
      </div>
      <Footer />
    </div>
  )
}


