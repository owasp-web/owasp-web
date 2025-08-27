'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'
import { useRouter, useParams } from 'next/navigation'
import { adminService } from '@/lib/admin'
import type { Event, EventFormData } from '@/lib/types'
import EventForm from '@/components/EventForm'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function EditEventPage() {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const params = useParams()
  const eventId = params.id as string

  useEffect(() => {
    loadEvent()
  }, [eventId])

  const loadEvent = async () => {
    try {
      const isAuth = await adminService.checkAuth()
      if (!isAuth) {
        router.push('/admin')
        return
      }

      const eventData = await adminService.getEvent(eventId)
      if (!eventData) {
        setError('Event not found')
        return
      }
      
      setEvent(eventData)
    } catch (error: any) {
      setError(error.message || 'Failed to load event')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: EventFormData) => {
    setSaving(true)
    setError('')

    try {
      await adminService.updateEvent(eventId, data)
      router.push('/admin/events')
    } catch (error: any) {
      setError(error.message || 'Failed to update event')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003594]"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error && !event) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        
        {/* Admin Navigation */}
        <div className="bg-[#003594]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
              <div className="flex items-center">
                <button 
                  onClick={() => router.push('/admin/events')}
                  className="text-white hover:text-[#ffb81b] mr-4 sm:mr-6 font-['Poppins'] text-sm flex items-center gap-2"
                >
                  <Image src="/images/icons/chevron.svg" alt="" width={16} height={16} className="rotate-180 filter brightness-0 invert" />
                  Back to Events
                </button>
                <h1 className="font-['Barlow'] font-medium text-white text-lg sm:text-[20px] leading-tight tracking-[-0.4px]">
                  Edit Event
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="bg-[#F1F6FE]">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-32 lg:pb-[164px]">
            <div className="flex flex-col items-center justify-center text-center py-12 sm:py-16">
              <div className="mb-6 sm:mb-8">
                <Image src="/images/icons/alert-circle.svg" alt="" width={64} height={64} className="mx-auto opacity-40" />
              </div>
              <h3 className="font-['Barlow'] font-medium text-[#101820] text-lg sm:text-xl lg:text-[24px] leading-tight lg:leading-[28px] tracking-[-0.36px] sm:tracking-[-0.4px] lg:tracking-[-0.48px] mb-2">
                Error Loading Event
              </h3>
              <p className="font-['Poppins'] text-[#757575] text-sm sm:text-base leading-6 tracking-[-0.28px] sm:tracking-[-0.32px] mb-6 sm:mb-8 max-w-md">
                {error}
              </p>
              <button 
                onClick={() => router.push('/admin/events')}
                className="font-['Poppins'] text-[#003594] hover:text-[#002266] text-sm flex items-center gap-2"
              >
                <Image src="/images/icons/chevron.svg" alt="" width={16} height={16} className="rotate-180" />
                Return to Events
              </button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Admin Navigation */}
      <div className="bg-[#003594]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/admin/events')}
                className="text-white hover:text-[#ffb81b] mr-4 sm:mr-6 font-['Poppins'] text-sm flex items-center gap-2"
              >
                <Image src="/images/icons/chevron.svg" alt="" width={16} height={16} className="rotate-180 filter brightness-0 invert" />
                Back to Events
              </button>
              <h1 className="font-['Barlow'] font-medium text-white text-lg sm:text-[20px] leading-tight tracking-[-0.4px]">
                Edit Event: {event?.title}
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-[#F1F6FE]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-32 lg:pb-[164px]">
          {error && (
            <div className="mb-6 sm:mb-8 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-12 lg:gap-16 items-center justify-center w-full">
            <div className="flex flex-col gap-6 lg:gap-8 items-center justify-start w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="font-['Poppins'] font-semibold text-[#00A7E1] text-sm sm:text-base leading-6 tracking-[-0.32px]">
                  Admin Dashboard
                </div>
                <h1 className="font-['Barlow'] font-medium text-[#101820] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-tight xl:leading-[64px] tracking-[-0.64px] sm:tracking-[-0.8px] lg:tracking-[-1.12px] xl:tracking-[-1.28px] max-w-[1200px]">
                  Edit Event
                </h1>
              </div>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start justify-start w-full">
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins'] font-normal text-[#757575] text-sm sm:text-base leading-6 tracking-[-0.28px] sm:tracking-[-0.32px]">
                    Make changes to the event details below. All fields marked with an asterisk (*) are required. 
                    Your changes will take effect immediately after saving.
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins'] font-normal text-[#757575] text-sm sm:text-base leading-6 tracking-[-0.28px] sm:tracking-[-0.32px]">
                    Updating the status to "Published" will make the event visible on the public events page. 
                    Use "Draft" to save changes without publishing.
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
                        Update the form below to modify this event
                      </p>
                    </div>
                  </div>
                  
                  {event && (
                    <EventForm 
                      initialData={event}
                      onSubmit={handleSubmit} 
                      loading={saving} 
                    />
                  )}
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