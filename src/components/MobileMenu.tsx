'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useMemo, useState, useEffect } from 'react'
import { useDebouncedCallback } from 'use-debounce'

const searchIcon = "/images/icons/search.svg"

interface NavigationItem {
  href: string
  label: string
}

interface Project {
  title: string
  description: string
  category: string
  status: 'Active' | 'Stable' | 'Flagship'
  slug: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  navigationItems: NavigationItem[]
}

const sampleProjects: Project[] = [
  {
    title: "OWASP Top 10",
    description: "The OWASP Top 10 is a standard awareness document for developers and web application security.",
    category: "Documentation",
    status: "Flagship",
    slug: "owasp-top-10"
  },
  {
    title: "Dependency-Track",
    description: "Intelligent Component Analysis platform for identifying and reducing software supply chain risk using SBOM.",
    category: "Security Testing",
    status: "Flagship",
    slug: "dependency-track"
  },
  {
    title: "Amass",
    description: "In-depth attack surface mapping and asset discovery platform for security professionals.",
    category: "Asset Discovery",
    status: "Active",
    slug: "amass"
  },
  {
    title: "Juice Shop",
    description: "A globally-used, intentionally insecure web application for security training.",
    category: "Training",
    status: "Flagship",
    slug: "juice-shop"
  }
]

function getStatusColor(status: string) {
  switch (status) {
    case 'Flagship': return 'bg-[#dc3545] text-white'
    case 'Active': return 'bg-[#28a745] text-white'
    case 'Stable': return 'bg-[#ffc107] text-[#101820]'
    default: return 'bg-gray-500 text-white'
  }
}

export default function MobileMenu({ isOpen, onClose, navigationItems }: MobileMenuProps) {
  const [openSection, setOpenSection] = useState<string | null>('Projects')

  // Projects search state
  const [projectQuery, setProjectQuery] = useState('')
  const [projectLoading, setProjectLoading] = useState(false)
  const [projectResults, setProjectResults] = useState<Project[]>([])
  const [projectsPrefetched, setProjectsPrefetched] = useState(false)

  // Chapters search state
  const [chapterQuery, setChapterQuery] = useState('')
  const [chapterLoading, setChapterLoading] = useState(false)
  const [chapterResults, setChapterResults] = useState<Array<{ id: string; name: string; slug: string }>>([])
  const [chaptersPrefetched, setChaptersPrefetched] = useState(false)

  // Events search state (endpoint has no search param, so client-filter)
  const [eventQuery, setEventQuery] = useState('')
  const [eventLoading, setEventLoading] = useState(false)
  const [eventsAll, setEventsAll] = useState<Array<{ id: string; title: string; location?: string; date?: string; month?: string; year?: string }>>([])
  const [eventsPrefetched, setEventsPrefetched] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = original }
    }
  }, [isOpen])

  // Debounced project search (server-side)
  const fetchProjects = useDebouncedCallback(async (term: string) => {
    const t = term.trim()
    if (!t) { return }
    try {
      setProjectLoading(true)
      const params = new URLSearchParams()
      params.set('search', t)
      params.set('limit', '12')
      const res = await fetch(`/api/public/projects/list?${params.toString()}`, { next: { revalidate: 30 } })
      if (!res.ok) throw new Error('Failed to search projects')
      const json = await res.json()
      setProjectResults((json.projects as Project[]) || [])
    } catch (e: any) {
      const q = t.toLowerCase()
      const fallback = sampleProjects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 12)
      setProjectResults(fallback)
    } finally {
      setProjectLoading(false)
    }
  }, 250)

  useEffect(() => { fetchProjects(projectQuery) }, [projectQuery, fetchProjects])

  // Prefetch defaults for Projects
  const prefetchDefaultProjects = async () => {
    try {
      setProjectLoading(true)
      const params = new URLSearchParams()
      params.set('limit', '12')
      const res = await fetch(`/api/public/projects/list?${params.toString()}`, { next: { revalidate: 60 } })
      if (res.ok) {
        const json = await res.json()
        setProjectResults((json.projects as Project[]) || [])
      } else {
        setProjectResults(sampleProjects.slice(0, 12))
      }
    } catch {
      setProjectResults(sampleProjects.slice(0, 12))
    } finally {
      setProjectLoading(false)
      setProjectsPrefetched(true)
    }
  }

  // Debounced chapters search (server-side)
  const fetchChapters = useDebouncedCallback(async (term: string) => {
    const params = new URLSearchParams()
    params.set('limit', '30')
    if (term.trim()) params.set('search', term.trim())
    try {
      setChapterLoading(true)
      const res = await fetch(`/api/public/chapters/list?${params.toString()}`, { next: { revalidate: 60 } })
      if (!res.ok) throw new Error('Failed to fetch chapters')
      const json = await res.json()
      const list = (json.chapters as any[]) || []
      setChapterResults(list.map(c => ({ id: c.id, name: c.name, slug: c.slug })))
    } catch {
      setChapterResults([])
    } finally {
      setChapterLoading(false)
    }
  }, 250)

  useEffect(() => {
    if (openSection === 'Chapters') fetchChapters(chapterQuery)
  }, [chapterQuery, openSection, fetchChapters])

  const prefetchDefaultChapters = async () => {
    try {
      setChapterLoading(true)
      const res = await fetch('/api/public/chapters/list?limit=30', { next: { revalidate: 60 } })
      if (res.ok) {
        const json = await res.json()
        const list = (json.chapters as any[]) || []
        setChapterResults(list.map(c => ({ id: c.id, name: c.name, slug: c.slug })))
      }
    } catch {}
    finally {
      setChapterLoading(false)
      setChaptersPrefetched(true)
    }
  }

  // Events load once then client-filter
  useEffect(() => {
    const load = async () => {
      if (openSection !== 'Events' || eventsAll.length > 0) return
      try {
        setEventLoading(true)
        const res = await fetch('/api/public/events/list?limit=30', { next: { revalidate: 60 } })
        if (!res.ok) throw new Error('Failed to fetch events')
        const json = await res.json()
        setEventsAll((json.events as any[]) || [])
      } catch {
        setEventsAll([])
      } finally {
        setEventLoading(false)
      }
    }
    load()
  }, [openSection, eventsAll.length])

  // Prefetch defaults when the menu opens
  useEffect(() => {
    if (!isOpen) return
    if (!projectsPrefetched) prefetchDefaultProjects()
    if (!chaptersPrefetched) prefetchDefaultChapters()
    if (!eventsPrefetched) {
      // load events list once for default view
      (async () => {
        try {
          setEventLoading(true)
          const res = await fetch('/api/public/events/list?limit=30', { next: { revalidate: 60 } })
          if (res.ok) {
            const json = await res.json()
            setEventsAll((json.events as any[]) || [])
          }
        } finally {
          setEventLoading(false)
          setEventsPrefetched(true)
        }
      })()
    }
  }, [isOpen, projectsPrefetched, chaptersPrefetched, eventsPrefetched])

  const eventResults = useMemo(() => {
    const t = eventQuery.trim().toLowerCase()
    if (!t) return eventsAll
    return eventsAll.filter((e: any) =>
      (e.title || '').toLowerCase().includes(t) ||
      (e.location || '').toLowerCase().includes(t)
    )
  }, [eventQuery, eventsAll])

  const quickFilters = [
    { label: 'Top 10', href: '/projects?query=Top%2010' },
    { label: 'ASVS', href: '/projects?query=ASVS' },
    { label: 'ZAP', href: '/projects?query=ZAP' },
    { label: 'Chapters', href: '/chapters' },
    { label: 'Events', href: '/events' }
  ]

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={onClose}
        />
      )}

      <div className={`
        fixed inset-y-0 right-0 w-full max-w-sm bg-[#101820] border-l border-white/20 shadow-xl
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        flex flex-col h-screen max-h-screen overflow-hidden
      `}>
        <div className="h-20 flex items-center justify-between px-4 border-b border-white/10">
          <div className="text-white/70 font-['Poppins'] text-sm">Menu</div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close mobile menu"
          >
            <div className="w-5 h-5 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-0.5 bg-white/60 rotate-45" />
                <div className="w-4 h-0.5 bg-white/60 -rotate-45" />
              </div>
            </div>
          </button>
        </div>

        <div className="p-4 bg-[#101820] flex-1 overflow-y-auto">
          <div className="flex flex-wrap gap-2 mb-6">
            {quickFilters.map((f) => (
              <Link key={f.label} href={f.href} onClick={onClose} className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium">
                {f.label}
              </Link>
            ))}
          </div>

          <div className="rounded-lg overflow-hidden border border-white/10 divide-y divide-white/10">
            {navigationItems.map((item) => {
              const isHome = item.label === 'Home'
              const isOpenPanel = openSection === item.label
              return (
                <div key={item.href} className="bg-[#0b1218]">
                  <div className="px-4 py-3 flex items-center justify-between">
                    <Link href={item.href} onClick={isHome ? onClose : undefined} className="font-['Poppins'] text-sm text-white">
                      {item.label}
                    </Link>
                    {!isHome && (
                      <button
                        onClick={() => setOpenSection(isOpenPanel ? null : item.label)}
                        className="text-white/80 hover:text-white p-2 -mr-2"
                        aria-label={`Toggle ${item.label}`}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`transition-transform ${isOpenPanel ? 'rotate-180' : ''}`}>
                          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    )}
                  </div>

                  {!isHome && (
                    <div className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${isOpenPanel ? 'max-h-[70vh]' : 'max-h-0'}`}>
                      <div className="px-4 pb-4 pt-0 text-sm">
                        {item.label === 'Projects' && (
                          <div>
                            <div className="flex items-center bg-white/10 rounded-lg p-2 gap-2 mb-3">
                              <Image src={searchIcon} alt="" width={18} height={18} className="opacity-60" />
                              <input
                                type="text"
                                value={projectQuery}
                                onChange={(e) => setProjectQuery(e.target.value)}
                                placeholder="Search projects..."
                                className="w-full bg-transparent text-white placeholder:text-white/50 text-base sm:text-sm outline-none"
                                onKeyDown={(e) => { if (e.key === 'Enter' && projectQuery.trim()) { window.location.href = `/projects?query=${encodeURIComponent(projectQuery.trim())}`; onClose() } }}
                              />
                            </div>
                            <div className="max-h-56 overflow-y-auto">
                              {projectLoading && <div className="p-2 text-white/70">Searching…</div>}
                              {!projectLoading && projectResults.length === 0 && projectQuery.trim() && (
                                <div className="p-2 text-white/70">No projects found</div>
                              )}
                              {!projectLoading && projectResults.map((p, idx) => (
                                <button key={`${p.slug}-${idx}`} onClick={() => { window.location.href = `/projects/${p.slug}`; onClose() }} className="w-full text-left p-3 hover:bg-white/5 rounded-md transition-colors flex items-start gap-3">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                      <div className="text-white text-sm font-medium font-['Poppins'] truncate">{p.title}</div>
                                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(p.status)}`}>{p.status}</span>
                                    </div>
                                    <div className="text-white/70 text-xs leading-relaxed line-clamp-2">{p.description}</div>
                                  </div>
                                </button>
                              ))}
                            </div>
                            <div className="border-t border-white/10 mt-2 pt-2">
                              <Link href={`/projects?query=${encodeURIComponent(projectQuery.trim() || '')}`} onClick={onClose} className="block text-center p-2 rounded-md text-[#00A7E1] hover:text-white text-xs font-medium">
                                View all projects{projectQuery.trim() ? ` for "${projectQuery}"` : ''}
                              </Link>
                            </div>
                          </div>
                        )}

                        {item.label === 'Chapters' && (
                          <div>
                            <div className="flex items-center bg-white/10 rounded-lg p-2 gap-2 mb-3">
                              <Image src={searchIcon} alt="" width={18} height={18} className="opacity-60" />
                              <input
                                type="text"
                                value={chapterQuery}
                                onChange={(e) => setChapterQuery(e.target.value)}
                                placeholder="Search chapters..."
                                className="w-full bg-transparent text-white placeholder:text-white/50 text-base sm:text-sm outline-none"
                              />
                            </div>
                            <div className="max-h-56 overflow-y-auto">
                              {chapterLoading && <div className="p-2 text-white/70">Loading…</div>}
                              {!chapterLoading && chapterResults.length === 0 && chapterQuery.trim() && (
                                <div className="p-2 text-white/70">No chapters found</div>
                              )}
                              {!chapterLoading && chapterResults.map((c) => (
                                <Link key={c.id} href={`/chapters/${c.slug}`} onClick={onClose} className="block px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5">
                                  {c.name}
                                </Link>
                              ))}
                            </div>
                            <div className="border-t border-white/10 mt-2 pt-2">
                              <Link href={`/chapters${chapterQuery.trim() ? `?query=${encodeURIComponent(chapterQuery.trim())}` : ''}`} onClick={onClose} className="block text-center p-2 rounded-md text-[#00A7E1] hover:text-white text-xs font-medium">
                                View all chapters
                              </Link>
                            </div>
                          </div>
                        )}

                        {item.label === 'Events' && (
                          <div>
                            <div className="flex items-center bg-white/10 rounded-lg p-2 gap-2 mb-3">
                              <Image src={searchIcon} alt="" width={18} height={18} className="opacity-60" />
                              <input
                                type="text"
                                value={eventQuery}
                                onChange={(e) => setEventQuery(e.target.value)}
                                placeholder="Search events..."
                                className="w-full bg-transparent text-white placeholder:text-white/50 text-base sm:text-sm outline-none"
                              />
                            </div>
                            <div className="max-h-56 overflow-y-auto space-y-2">
                              {eventLoading && <div className="p-2 text-white/70">Loading…</div>}
                              {!eventLoading && eventResults.length === 0 && (
                                <div className="p-2 text-white/70">No events found</div>
                              )}
                              {!eventLoading && eventResults.map((e: any) => (
                                <Link key={e.id} href={`/events/${e.id}`} onClick={onClose} className="block p-3 rounded-md hover:bg-white/5">
                                  <div className="text-white text-sm font-medium">{e.title}</div>
                                  <div className="text-white/60 text-xs">{(e.month || '')} {(e.date || '')} {(e.year || '')} {(e.location ? `• ${e.location}` : '')}</div>
                                </Link>
                              ))}
                            </div>
                            <div className="border-t border-white/10 mt-2 pt-2">
                              <Link href="/events" onClick={onClose} className="block text-center p-2 rounded-md text-[#00A7E1] hover:text-white text-xs font-medium">
                                View all events
                              </Link>
                            </div>
                          </div>
                        )}

                        {item.label === 'About' && (
                          <div className="space-y-1">
                            <Link href="/about" onClick={onClose} className="block px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5">About OWASP</Link>
                            <Link href="/join-community" onClick={onClose} className="block px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5">Join Community</Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-6 space-y-3 md:hidden">
            <Link href="/join-community" onClick={onClose}>
              <button className="w-full border-2 border-[#757575] h-11 sm:h-12 px-4 text-white font-['Poppins'] font-semibold text-sm 
                hover:border-[#00A7E1]/60 hover:bg-[#00A7E1]/20 hover:text-[#00A7E1] 
                transition-all duration-300 rounded-lg bg-[#101820]">
                Join the Community
              </button>
            </Link>
            <Link href="/secure-my-app" onClick={onClose}>
              <button className="w-full bg-gradient-to-r from-[#003594] to-[#004bbb] h-11 sm:h-12 px-4 text-white font-['Poppins'] font-semibold text-sm 
                hover:from-[#004bbb] hover:to-[#0056cc] hover:shadow-lg
                transition-all duration-300 rounded-lg">
                Secure My App
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}


