'use client'

import { useState } from 'react'
import Image from 'next/image'

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'
import { useRouter } from 'next/navigation'
import { adminService } from '@/lib/admin'
import type { EventFormData } from '@/lib/types'
import EventForm from '@/components/EventForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NewEventPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (data: EventFormData) => {
    setLoading(true)
    setError('')

    try {
      await adminService.createEvent(data)
      router.push('/admin/events')
    } catch (error: any) {
      setError(error.message || 'Failed to create event')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Admin Navigation */}
      <div className="bg-[#003594]">
        <div className="max-w-[1440px] mx-auto px-[120px] py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/admin/events')}
                className="text-white hover:text-[#ffb81b] mr-6 font-['Poppins'] text-[14px] flex items-center gap-2"
              >
                <Image src="/images/icons/chevron.svg" alt="" width={16} height={16} className="rotate-180 filter brightness-0 invert" />
                Back to Events
              </button>
              <h1 className="font-['Barlow'] font-medium text-white text-[20px] leading-[24px] tracking-[-0.4px]">
                Add New Event
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-[#F1F6FE]">
        <div className="max-w-[1440px] mx-auto px-[120px] pt-20 pb-[164px]">
          {error && (
            <div className="mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-16 items-center justify-center w-full">
            <div className="flex flex-col gap-8 items-center justify-start w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="font-['Poppins'] font-semibold text-[#00A7E1] text-[16px] leading-[24px] tracking-[-0.32px]">
                  Admin Dashboard
                </div>
                <h1 className="font-['Barlow'] font-medium text-[#101820] text-[64px] leading-[64px] tracking-[-1.28px] max-w-[1200px]">
                  Add New Event
                </h1>
              </div>
              <div className="flex flex-row gap-20 items-start justify-start w-full">
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins'] font-normal text-[#757575] text-[16px] leading-[24px] tracking-[-0.32px]">
                    Create a new event to inform the OWASP community about upcoming conferences, 
                    training sessions, or chapter meetings. Fill out all required fields marked with an asterisk (*).
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins'] font-normal text-[#757575] text-[16px] leading-[24px] tracking-[-0.32px]">
                    Events saved as "Published" will immediately appear on the public events page. 
                    Use "Draft" status to save your work and publish later.
                  </p>
                </div>
              </div>
            </div>

            {/* Event Form */}
            <div className="w-full max-w-4xl">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-[#003594] p-3 rounded-lg">
                      <Image src="/images/icons/megaphone.svg" alt="" width={24} height={24} className="filter brightness-0 invert" />
                    </div>
                    <div>
                      <h3 className="font-['Barlow'] font-medium text-[#101820] text-[24px] leading-[28px] tracking-[-0.48px]">
                        Event Details
                      </h3>
                      <p className="font-['Poppins'] text-[#757575] text-[14px] leading-[20px]">
                        Fill out the form below to create a new event
                      </p>
                    </div>
                  </div>
                  
                  <EventForm onSubmit={handleSubmit} loading={loading} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 