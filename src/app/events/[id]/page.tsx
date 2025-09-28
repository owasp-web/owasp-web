'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { createClientComponentClient } from '@/lib/supabase'
import type { Event } from '@/lib/types'

export default function PublicEventPage({ params }: { params: { id: string } }) {
  const [event, setEvent] = useState<Event | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const supabase = createClientComponentClient()
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('id', params.id)
          .eq('status', 'published')
          .single()
        if (error) throw error
        setEvent(data as unknown as Event)
      } catch (e: any) {
        setError(e?.message || 'Event not found')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003594]"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!event || error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Event Not Found</h1>
          <p className="text-gray-600">{error || 'This event is not available.'}</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#101820] mb-2">{event.title}</h1>
          <p className="text-gray-600">{event.month} {event.date}, {event.year} • {event.time}</p>
          <p className="text-gray-600">{event.location}</p>
        </div>

        {event.image && (
          <div className="relative w-full h-64 mb-8">
            <Image src={event.image} alt={event.title} fill className="object-cover rounded-lg" />
          </div>
        )}

        {event.description && (
          <div className="prose max-w-none mb-8">
            <p className="text-gray-800 whitespace-pre-line">{event.description}</p>
          </div>
        )}

        <div className="flex gap-3">
          {event.registration_url && (
            <a href={event.registration_url} target="_blank" rel="noopener noreferrer">
              <Button text="Register" variant="primary" size="48" />
            </a>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}


