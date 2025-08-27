'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { createClientComponentClient } from '@/lib/supabase'
import type { Event } from '@/lib/types'

interface MegaMenuProps {
  isOpen: boolean
  onClose: () => void
  menuType: 'projects' | 'chapters' | 'events' | 'about'
}

export default function MegaMenu({ isOpen, onClose, menuType }: MegaMenuProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Fetch events data when events menu is opened
  useEffect(() => {
    if (isOpen && menuType === 'events') {
      fetchEvents()
    }
  }, [isOpen, menuType])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const fetchEvents = async () => {
    setLoading(true)
    try {
      const supabase = createClientComponentClient()
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('status', 'published')
        .order('date', { ascending: true })
        .limit(8)
      
      if (error) throw error
      setEvents((data as unknown as Event[]) || [])
    } catch (err) {
      console.error('Failed to fetch events:', err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const renderEventsMenu = () => (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-7 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        {/* Left Column - Event Categories */}
        <div className="md:col-span-4">
          <h3 className="font-['Barlow'] font-medium text-lg text-white mb-6">Browse Events</h3>
          <div className="space-y-4">
            <Link 
              href="/events" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#003594] rounded-lg flex items-center justify-center group-hover:bg-[#004bbb] transition-colors">
                <Image src="/images/icons/globe.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">All Events</div>
                <div className="text-white/70 text-xs">View complete calendar</div>
              </div>
            </Link>
            
            <Link 
              href="/events?type=conference" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#dc3545] rounded-lg flex items-center justify-center group-hover:bg-[#e74c3c] transition-colors">
                <Image src="/images/icons/briefcase-figma.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Conferences</div>
                <div className="text-white/70 text-xs">Global AppSec events</div>
              </div>
            </Link>

            <Link 
              href="/events?type=training" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#ffc107] rounded-lg flex items-center justify-center">
                <Image src="/images/icons/chart-projector-figma.svg" alt="" width={16} height={16} className="filter brightness-0" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Training</div>
                <div className="text-white/70 text-xs">Professional development</div>
              </div>
            </Link>

            <Link 
              href="/events?type=chapter" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#28a745] rounded-lg flex items-center justify-center group-hover:bg-[#34ce57] transition-colors">
                <Image src="/images/icons/users-figma.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Chapter Events</div>
                <div className="text-white/70 text-xs">Local community meetings</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column - Upcoming Events */}
        <div className="md:col-span-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-2">
            <h3 className="font-['Barlow'] font-medium text-lg text-white">Upcoming Events</h3>
            <Link 
              href="/events" 
              onClick={onClose}
              className="text-[#00A7E1] hover:text-white text-sm font-medium transition-colors"
            >
              Browse All Events →
            </Link>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00A7E1]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {events.slice(0, 6).map((event) => (
                <Link 
                  key={event.id} 
                  href="/events" 
                  onClick={onClose}
                  className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="text-center flex-shrink-0">
                      <div className="text-[#00A7E1] font-bold text-lg leading-none">{event.date}</div>
                      <div className="text-white/70 text-xs uppercase">{event.month}</div>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-medium text-sm line-clamp-2 group-hover:text-[#00A7E1] transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-white/70 text-xs mt-1 flex items-center">
                        <Image src="/images/icons/marker.svg" alt="" width={12} height={12} className="mr-1 opacity-60 filter brightness-0 invert" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderProjectsMenu = () => (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-7 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        {/* Featured Projects */}
        <div className="md:col-span-8">
          <h3 className="font-['Barlow'] font-medium text-lg text-white mb-6">Featured Projects</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/projects/owasp-top-10" 
              onClick={onClose}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#dc3545] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">10</span>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm group-hover:text-[#00A7E1] transition-colors">OWASP Top 10</h4>
                  <span className="px-2 py-0.5 bg-[#dc3545] text-white text-xs rounded-full">Flagship</span>
                </div>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">Standard awareness document for developers and web application security</p>
            </Link>

            <Link 
              href="/projects/dependency-track" 
              onClick={onClose}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#28a745] rounded-lg flex items-center justify-center">
                  <Image src="/images/icons/search.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm group-hover:text-[#00A7E1] transition-colors">Dependency-Track</h4>
                  <span className="px-2 py-0.5 bg-[#dc3545] text-white text-xs rounded-full">Flagship</span>
                </div>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">Intelligent software supply chain security platform</p>
            </Link>

            <Link 
              href="/projects/amass" 
              onClick={onClose}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#6f42c1] rounded-lg flex items-center justify-center">
                  <Image src="/images/icons/globe-alt.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm group-hover:text-[#00A7E1] transition-colors">Amass</h4>
                  <span className="px-2 py-0.5 bg-[#28a745] text-white text-xs rounded-full">Active</span>
                </div>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">In-depth attack surface mapping and asset discovery</p>
            </Link>

            <Link 
              href="/projects/juice-shop" 
              onClick={onClose}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#ffc107] rounded-lg flex items-center justify-center">
                  <span className="text-[#101820] font-bold text-lg">🧃</span>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm group-hover:text-[#00A7E1] transition-colors">Juice Shop</h4>
                  <span className="px-2 py-0.5 bg-[#dc3545] text-white text-xs rounded-full">Flagship</span>
                </div>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">Intentionally insecure web application for security training</p>
            </Link>
          </div>
        </div>

        {/* Project Categories */}
        <div className="md:col-span-4">
          <h3 className="font-['Barlow'] font-medium text-lg text-white mb-6">Browse by Category</h3>
          <div className="space-y-3">
            <Link 
              href="/projects?category=documentation" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#003594] rounded-lg flex items-center justify-center">
                <Image src="/images/icons/book-open.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Documentation</div>
                <div className="text-white/70 text-xs">Standards & guides</div>
              </div>
            </Link>

            <Link 
              href="/projects?category=security-testing" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#28a745] rounded-lg flex items-center justify-center">
                <Image src="/images/icons/code.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Security Testing</div>
                <div className="text-white/70 text-xs">Testing tools</div>
              </div>
            </Link>

            <Link 
              href="/projects?category=training" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#ffc107] rounded-lg flex items-center justify-center">
                <Image src="/images/icons/chart-projector.svg" alt="" width={16} height={16} className="filter brightness-0" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Training</div>
                <div className="text-white/70 text-xs">Learning resources</div>
              </div>
            </Link>

            <Link 
              href="/projects" 
              onClick={onClose}
              className="flex items-center justify-center gap-2 p-3 mt-6 border border-[#00A7E1] rounded-lg text-[#00A7E1] hover:bg-[#00A7E1] hover:text-white transition-all duration-200"
            >
              <span className="text-sm font-medium">View All Projects</span>
              <Image src="/images/icons/arrow-upright.svg" alt="" width={14} height={14} className="filter brightness-0 invert" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  const renderChaptersMenu = () => (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-7 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        {/* Regional Chapters */}
        <div className="md:col-span-8">
          <h3 className="font-['Barlow'] font-medium text-lg text-white mb-6">Chapters by Region</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <h4 className="text-[#00A7E1] font-medium text-sm mb-3">Africa</h4>
              <div className="space-y-2">
                <Link href="/chapters/lagos" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Lagos</Link>
                <Link href="/chapters/nairobi" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Nairobi</Link>
                <Link href="/chapters/cairo" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Cairo</Link>
                <Link href="/chapters/cape-town" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Cape Town</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-[#00A7E1] font-medium text-sm mb-3">Europe</h4>
              <div className="space-y-2">
                <Link href="/chapters/london" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">London</Link>
                <Link href="/chapters/berlin" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Berlin</Link>
                <Link href="/chapters/paris" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Paris</Link>
                <Link href="/chapters/amsterdam" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Amsterdam</Link>
              </div>
            </div>

            <div>
              <h4 className="text-[#00A7E1] font-medium text-sm mb-3">North America</h4>
              <div className="space-y-2">
                <Link href="/chapters/new-york" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">New York</Link>
                <Link href="/chapters/san-francisco" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">San Francisco</Link>
                <Link href="/chapters/toronto" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Toronto</Link>
                <Link href="/chapters/chicago" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Chicago</Link>
              </div>
            </div>

            <div>
              <h4 className="text-[#00A7E1] font-medium text-sm mb-3">Asia Pacific</h4>
              <div className="space-y-2">
                <Link href="/chapters/singapore" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Singapore</Link>
                <Link href="/chapters/sydney" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Sydney</Link>
                <Link href="/chapters/tokyo" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Tokyo</Link>
                <Link href="/chapters/mumbai" onClick={onClose} className="block text-white/80 hover:text-white text-sm transition-colors">Mumbai</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Chapter Resources */}
        <div className="md:col-span-4">
          <h3 className="font-['Barlow'] font-medium text-lg text-white mb-6">Chapter Resources</h3>
          <div className="space-y-4">
            <Link 
              href="/chapters" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#003594] rounded-lg flex items-center justify-center">
                <Image src="/images/icons/globe.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">All Chapters</div>
                <div className="text-white/70 text-xs">Global directory</div>
              </div>
            </Link>

            <Link 
              href="/chapter-starter-kit" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#28a745] rounded-lg flex items-center justify-center">
                <Image src="/images/icons/flag.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Start a Chapter</div>
                <div className="text-white/70 text-xs">Chapter starter kit</div>
              </div>
            </Link>

            <Link 
              href="/events?type=chapter" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#ffc107] rounded-lg flex items-center justify-center">
                <Image src="/images/icons/users.svg" alt="" width={16} height={16} className="filter brightness-0" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Chapter Events</div>
                <div className="text-white/70 text-xs">Local meetups</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAboutMenu = () => (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-7 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:gap-8">
        {/* Organization Info */}
        <div className="md:col-span-8">
          <h3 className="font-['Barlow'] font-medium text-lg text-white mb-6">About OWASP</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link 
              href="/about" 
              onClick={onClose}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#003594] rounded-lg flex items-center justify-center">
                  <Image src="/images/icons/flag.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
                </div>
                <h4 className="text-white font-medium text-sm group-hover:text-[#00A7E1] transition-colors">Our Mission</h4>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">Learn about OWASP's mission to improve software security</p>
            </Link>

            <Link 
              href="/annual-report" 
              onClick={onClose}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#28a745] rounded-lg flex items-center justify-center">
                  <Image src="/images/icons/chart-projector.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
                </div>
                <h4 className="text-white font-medium text-sm group-hover:text-[#00A7E1] transition-colors">Annual Report</h4>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">View our latest achievements and impact</p>
            </Link>

            <Link 
              href="/corporate-support" 
              onClick={onClose}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#6f42c1] rounded-lg flex items-center justify-center">
                  <Image src="/images/icons/handshake.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
                </div>
                <h4 className="text-white font-medium text-sm group-hover:text-[#00A7E1] transition-colors">Corporate Support</h4>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">Learn about partnership opportunities</p>
            </Link>

            <Link 
              href="/join-community" 
              onClick={onClose}
              className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-[#ffc107] rounded-lg flex items-center justify-center">
                  <Image src="/images/icons/users.svg" alt="" width={16} height={16} className="filter brightness-0" />
                </div>
                <h4 className="text-white font-medium text-sm group-hover:text-[#00A7E1] transition-colors">Join Community</h4>
              </div>
              <p className="text-white/70 text-xs leading-relaxed">Become part of the global security community</p>
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-4">
          <h3 className="font-['Barlow'] font-medium text-lg text-white mb-6">Quick Links</h3>
          <div className="space-y-3">
            <Link 
              href="/resources" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#003594] rounded-lg flex items-center justify-center">
                <Image src="/images/icons/book-open.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Resources</div>
                <div className="text-white/70 text-xs">Documentation & guides</div>
              </div>
            </Link>

            <Link 
              href="/project-handbook" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#28a745] rounded-lg flex items-center justify-center">
                <Image src="/images/icons/code.svg" alt="" width={16} height={16} className="filter brightness-0 invert" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Project Handbook</div>
                <div className="text-white/70 text-xs">Project guidelines</div>
              </div>
            </Link>

            <Link 
              href="/submit-project" 
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/10 transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-[#ffc107] rounded-lg flex items-center justify-center">
                <Image src="/images/icons/briefcase-figma.svg" alt="" width={16} height={16} className="filter brightness-0" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Submit Project</div>
                <div className="text-white/70 text-xs">Contribute to OWASP</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="w-full z-40">
      {/* Small bridge to connect nav to menu */}
      <div className="h-1 bg-transparent" />
      <div 
        ref={menuRef}
        className="bg-[#101820] border-b border-white/10 shadow-2xl"
      >
        {menuType === 'events' && renderEventsMenu()}
        {menuType === 'projects' && renderProjectsMenu()}
        {menuType === 'chapters' && renderChaptersMenu()}
        {menuType === 'about' && renderAboutMenu()}
      </div>
    </div>
  )
} 