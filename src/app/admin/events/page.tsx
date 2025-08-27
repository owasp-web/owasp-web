'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Force dynamic rendering for admin pages
export const dynamic = 'force-dynamic'
import { useRouter } from 'next/navigation'
import { adminService } from '@/lib/admin'
import type { Event } from '@/lib/types'
import Button from '@/components/Button'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    checkAuthAndLoadEvents()
  }, [])

  const checkAuthAndLoadEvents = async () => {
    try {
      const isAuth = await adminService.checkAuth()
      if (!isAuth) {
        router.push('/admin')
        return
      }
      
      const eventsData = await adminService.getEvents()
      setEvents(eventsData)
    } catch (error: any) {
      setError(error.message || 'Failed to load events')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return

    try {
      await adminService.deleteEvent(id)
      setEvents(events.filter(event => event.id !== id))
    } catch (error: any) {
      setError(error.message || 'Failed to delete event')
    }
  }

  const formatDate = (date: string, month: string, year: string) => {
    return `${month} ${date}, ${year}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'text-green-800 bg-green-100'
      case 'draft': return 'text-yellow-800 bg-yellow-100'
      case 'cancelled': return 'text-red-800 bg-red-100'
      default: return 'text-gray-800 bg-gray-100'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Conference': return 'text-red-800 bg-red-100'
      case 'Chapter Meeting': return 'text-green-800 bg-green-100'
      case 'Training': return 'text-yellow-800 bg-yellow-100'
      case 'Workshop': return 'text-purple-800 bg-purple-100'
      default: return 'text-gray-800 bg-gray-100'
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

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Admin Navigation */}
      <div className="bg-[#003594]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-4">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0">
            <div className="flex items-center">
              <button 
                onClick={() => router.push('/admin')}
                className="text-white hover:text-[#ffb81b] mr-4 sm:mr-6 font-['Poppins'] text-sm flex items-center gap-2"
              >
                <Image src="/images/icons/chevron.svg" alt="" width={16} height={16} className="rotate-180 filter brightness-0 invert" />
                Back to Dashboard
              </button>
              <h1 className="font-['Barlow'] font-medium text-white text-lg sm:text-[20px] leading-tight tracking-[-0.4px]">
                Event Management
              </h1>
            </div>
            <Button 
              text="Add New Event" 
              variant="light-blue" 
              size="40"
              onClick={() => router.push('/admin/events/new')}
            />
          </div>
        </div>
      </div>

      {/* Events Content */}
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
                  Event Management
                </h1>
              </div>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start justify-start w-full">
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins'] font-normal text-[#757575] text-sm sm:text-base leading-6 tracking-[-0.28px] sm:tracking-[-0.32px]">
                    Manage all OWASP events including global conferences, regional AppSec Days, 
                    and chapter meetings. Create, edit, and publish events to keep the community informed.
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins'] font-normal text-[#757575] text-sm sm:text-base leading-6 tracking-[-0.28px] sm:tracking-[-0.32px]">
                    Events marked as "Published" will appear on the public events page. 
                    Use the "Featured" option to highlight important events in the hero section.
                  </p>
                </div>
              </div>
            </div>

            {/* Events List */}
            {events.length === 0 ? (
              <div className="text-center py-12 sm:py-16 lg:py-20">
                <h2 className="font-['Barlow'] font-medium text-[#101820] text-xl sm:text-2xl mb-4">
                  No Events Found
                </h2>
                <p className="font-['Poppins'] text-[#757575] text-sm sm:text-base mb-6 max-w-md mx-auto">
                  You haven't created any events yet. Click the button below to create your first event.
                </p>
                <Button 
                  text="Create First Event" 
                  variant="primary" 
                  size="48"
                  onClick={() => router.push('/admin/events/new')}
                />
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-6">
                {events.map((event) => (
                  <div key={event.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="p-4 sm:p-6 lg:p-8">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3 sm:gap-0">
                            <h3 className="font-['Barlow'] font-medium text-[#101820] text-lg sm:text-xl lg:text-[24px] leading-tight lg:leading-[28px] tracking-[-0.36px] sm:tracking-[-0.4px] lg:tracking-[-0.48px]">
                              {event.title}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(event.status)}`}>
                                {event.status}
                              </span>
                              <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(event.type)}`}>
                                {event.type}
                              </span>
                              {event.is_featured && (
                                <span className="px-3 py-1 text-xs font-medium rounded-full text-blue-800 bg-blue-100">
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
                            <div className="flex items-center gap-3">
                              <Image src="/images/icons/arrow-upright.svg" alt="" width={20} height={20} className="opacity-60 shrink-0" />
                              <div>
                                <p className="font-['Poppins'] text-[#757575] text-[10px] sm:text-[12px] leading-[14px] sm:leading-[16px] font-medium uppercase tracking-wide">
                                  Date
                                </p>
                                <p className="font-['Poppins'] text-[#101820] text-sm leading-[18px] sm:leading-[20px]">
                                  {formatDate(event.date, event.month, event.year)}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Image src="/images/icons/marker.svg" alt="" width={20} height={20} className="opacity-60 shrink-0" />
                              <div>
                                <p className="font-['Poppins'] text-[#757575] text-[10px] sm:text-[12px] leading-[14px] sm:leading-[16px] font-medium uppercase tracking-wide">
                                  Location
                                </p>
                                <p className="font-['Poppins'] text-[#101820] text-sm leading-[18px] sm:leading-[20px]">
                                  {event.location}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <Image src="/images/icons/coins.svg" alt="" width={20} height={20} className="opacity-60 shrink-0" />
                              <div>
                                <p className="font-['Poppins'] text-[#757575] text-[10px] sm:text-[12px] leading-[14px] sm:leading-[16px] font-medium uppercase tracking-wide">
                                  Price
                                </p>
                                <p className="font-['Poppins'] text-[#101820] text-sm leading-[18px] sm:leading-[20px]">
                                  {event.price || 'Not specified'}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button 
                              text="Edit Event" 
                              variant="primary" 
                              size="40"
                              onClick={() => router.push(`/admin/events/${event.id}/edit`)}
                            />
                            <Button 
                              text="Delete" 
                              variant="ghost-dark" 
                              size="40"
                              onClick={() => handleDelete(event.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
} 