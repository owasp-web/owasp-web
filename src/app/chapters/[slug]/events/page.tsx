'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ResponsiveContainer from '@/components/ResponsiveContainer'
import { createClientComponentClient } from '@/lib/supabase'
import { getChapterBySlug } from '@/lib/chapters'
import type { Chapter, Event } from '@/lib/types'

function parseEventDate(ev: Event): Date | null {
  try {
    const monthMap: Record<string, number> = { JAN:0,FEB:1,MAR:2,APR:3,MAY:4,JUN:5,JUL:6,AUG:7,SEP:8,OCT:9,NOV:10,DEC:11 }
    const m = monthMap[(ev.month || '').toUpperCase()]
    const d = parseInt((ev.date || '').match(/\d+/)?.[0] || '', 10)
    const y = parseInt(ev.year || '', 10)
    if (Number.isFinite(m) && Number.isFinite(d) && Number.isFinite(y)) {
      return new Date(y, m, d)
    }
  } catch {}
  return null
}

export default function ChapterEventsPage({ params }: { params: { slug: string } }) {
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [view, setView] = useState<'upcoming' | 'past' | 'all'>('upcoming')

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const chap = await getChapterBySlug(params.slug)
        if (!chap) {
          setError('Chapter not found')
          return
        }
        setChapter(chap)

        const supabase = createClientComponentClient()
        const { data, error } = await supabase
          .from('events')
          .select('*')
          .eq('status', 'published')
          .eq('chapter_id', (chap as any).id)
          .order('created_at', { ascending: false })
        if (error) throw error
        setEvents((data as unknown as Event[]) || [])
      } catch (e: any) {
        setError(e?.message || 'Failed to load events')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [params.slug])

  const { upcoming, past } = useMemo(() => {
    const now = new Date()
    const upcoming: Event[] = []
    const past: Event[] = []
    for (const ev of events) {
      const dt = parseEventDate(ev)
      if (dt && dt < now) past.push(ev)
      else upcoming.push(ev)
    }
    return { upcoming, past }
  }, [events])

  const list = view === 'upcoming' ? upcoming : view === 'past' ? past : events

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ResponsiveContainer size="full" className="py-10">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#101820]">{chapter?.name || 'Chapter'} Events</h1>
          <p className="text-gray-600">Explore upcoming and past events for this chapter.</p>
          <div className="mt-4 flex gap-2">
            <button onClick={() => setView('upcoming')} className={`px-4 py-2 rounded ${view==='upcoming'?'bg-[#003594] text-white':'bg-gray-100 text-gray-800'}`}>Upcoming</button>
            <button onClick={() => setView('past')} className={`px-4 py-2 rounded ${view==='past'?'bg-[#003594] text-white':'bg-gray-100 text-gray-800'}`}>Past</button>
            <button onClick={() => setView('all')} className={`px-4 py-2 rounded ${view==='all'?'bg-[#003594] text-white':'bg-gray-100 text-gray-800'}`}>All</button>
            <Link href={`/chapters/${params.slug}`} className="ml-auto underline text-[#003594]">Back to Chapter</Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16">Loading events…</div>
        ) : error ? (
          <div className="text-center text-red-600 py-16">{error}</div>
        ) : list.length === 0 ? (
          <div className="text-center text-gray-600 py-16">No events found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {list.map((ev) => (
              <div key={ev.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-48 bg-gray-50">
                  {ev.image && (
                    <Image src={ev.image} alt={ev.title} fill className="object-cover" />
                  )}
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-600 mb-2">{ev.month} {ev.date}, {ev.year} • {ev.time}</div>
                  <h3 className="text-lg font-semibold text-[#101820] mb-2">{ev.title}</h3>
                  <div className="text-sm text-gray-600 mb-4">{ev.location}</div>
                  <div className="flex gap-2">
                    <Link href={`/events/${ev.id}`} className="px-4 py-2 border rounded text-[#003594]">Details</Link>
                    {ev.registration_url && (
                      <a href={ev.registration_url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-[#003594] text-white rounded">Register</a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ResponsiveContainer>
      <Footer />
    </div>
  )
}


