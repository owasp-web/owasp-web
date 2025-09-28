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
  const [query, setQuery] = useState('')
  const [openSection, setOpenSection] = useState<string | null>('')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Project[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Lock scroll when menu is open
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = original }
    }
  }, [isOpen])

  const fetchResults = useDebouncedCallback(async (term: string) => {
    const t = term.trim()
    if (!t) {
      setResults([])
      setError('')
      return
    }
    try {
      setLoading(true)
      setError('')
      const params = new URLSearchParams()
      params.set('search', t)
      params.set('limit', '6')
      const res = await fetch(`/api/public/projects/list?${params.toString()}`, { next: { revalidate: 30 } })
      if (!res.ok) throw new Error('Failed to search')
      const json = await res.json()
      setResults((json.projects as Project[]) || [])
    } catch (e: any) {
      console.warn('Falling back to sample projects for search:', e?.message || e)
      const q = t.toLowerCase()
      const fallback = sampleProjects.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      ).slice(0, 6)
      setResults(fallback)
      setError('')
    } finally {
      setLoading(false)
    }
  }, 250)

  useEffect(() => {
    fetchResults(query)
  }, [query, fetchResults])

  const quickFilters = [
    { label: 'Top 10', href: '/projects?query=Top%2010' },
    { label: 'ASVS', href: '/projects?query=ASVS' },
    { label: 'ZAP', href: '/projects?query=ZAP' },
    { label: 'Chapters', href: '/chapters' },
    { label: 'Events', href: '/events' }
  ]

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div className={`
        fixed inset-y-0 right-0 w-full max-w-sm bg-[#101820] border-l border-white/20 shadow-xl
        transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
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

        <div className="p-4 bg-[#101820]">
          {/* Search */}
          <div className="mb-4">
            <div className="flex items-center bg-white/20 rounded-lg p-2 gap-2">
              <Image src={searchIcon} alt="" width={18} height={18} className="opacity-60" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search OWASP projects..."
                className="w-full bg-transparent text-white placeholder:text-white/50 text-sm outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && query.trim()) {
                    window.location.href = `/projects?query=${encodeURIComponent(query.trim())}`
                    onClose()
                  }
                }}
              />
            </div>
            {query.trim() && (
              <div className="mt-2 max-h-56 overflow-y-auto bg-[#0b1218] border border-white/10 rounded-lg">
                {loading && (
                  <div className="p-3 text-white/70 text-sm">Searching…</div>
                )}
                {!loading && results.length === 0 && (
                  <div className="p-3 text-white/70 text-sm">No results</div>
                )}
                {!loading && results.map((p, idx) => (
                  <button
                    key={`${p.slug}-${idx}`}
                    onClick={() => { window.location.href = `/projects/${p.slug}`; onClose() }}
                    className="w-full text-left p-3 hover:bg-white/5 transition-colors flex items-start gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="text-white text-sm font-medium font-['Poppins'] truncate">{p.title}</div>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(p.status)}`}>{p.status}</span>
                      </div>
                      <div className="text-white/70 text-xs leading-relaxed line-clamp-2">{p.description}</div>
                    </div>
                  </button>
                ))}
                <div className="border-t border-white/10 p-2">
                  <button
                    onClick={() => { window.location.href = `/projects?query=${encodeURIComponent(query.trim())}`; onClose() }}
                    className="w-full text-center p-2 rounded-md text-[#00A7E1] hover:text-white text-xs font-medium"
                  >
                    View all results for "{query}"
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {quickFilters.map((f) => (
              <Link key={f.label} href={f.href} onClick={onClose} className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium">
                {f.label}
              </Link>
            ))}
          </div>

          {/* Accordions for primary nav */}
          <div className="divide-y divide-white/10 rounded-lg overflow-hidden border border-white/10">
            {navigationItems.map((item) => {
              const isOpenSection = openSection === item.label
              return (
                <div key={item.href} className="bg-[#0b1218]">
                  <button
                    onClick={() => setOpenSection(isOpenSection ? null : item.label)}
                    className="w-full flex items-center justify-between px-4 py-3 text-white/90 hover:bg-white/5"
                  >
                    <span className="font-['Poppins'] text-sm">{item.label}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`transition-transform ${isOpenSection ? 'rotate-180' : ''}`}>
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {isOpenSection && (
                    <div className="px-4 pb-3 pt-0 text-sm">
                      <Link href={item.href} onClick={onClose} className="block px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/5">
                        Go to {item.label}
                      </Link>
                      {/* Contextual quick links */}
                      {item.label === 'Projects' && (
                        <div className="mt-1">
                          <Link href="/projects?query=Security%20Testing" onClick={onClose} className="block px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/5">Security Testing</Link>
                          <Link href="/projects?query=Supply%20Chain" onClick={onClose} className="block px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/5">Supply Chain</Link>
                        </div>
                      )}
                      {item.label === 'Chapters' && (
                        <div className="mt-1">
                          <Link href="/chapters" onClick={onClose} className="block px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/5">All Chapters</Link>
                          <Link href="/chapter-starter-kit" onClick={onClose} className="block px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/5">Start a Chapter</Link>
                        </div>
                      )}
                      {item.label === 'Events' && (
                        <div className="mt-1">
                          <Link href="/events?type=conference" onClick={onClose} className="block px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/5">Conferences</Link>
                          <Link href="/events?type=meetup" onClick={onClose} className="block px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/5">Meetups</Link>
                        </div>
                      )}
                      {item.label === 'About' && (
                        <div className="mt-1">
                          <Link href="/about" onClick={onClose} className="block px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/5">About OWASP</Link>
                          <Link href="/join-community" onClick={onClose} className="block px-3 py-2 rounded-md text-white/70 hover:text-white hover:bg-white/5">Join Community</Link>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Action buttons */}
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


