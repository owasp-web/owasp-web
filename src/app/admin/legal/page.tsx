'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { createClientComponentClient } from '@/lib/supabase'

type LegalPage = { id: string, title: string, slug: string, content?: string, display_order?: number, is_active: boolean }

export default function AdminLegalPage() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [pages, setPages] = useState<LegalPage[]>([])
  const [error, setError] = useState<string | null>(null)
  const supabase = useMemo(() => createClientComponentClient(), [])

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
      if (!session?.access_token) { setLoading(false); return }
      const res = await fetch('/api/auth/roles', { headers: { Authorization: `Bearer ${session.access_token}` } })
      const json = await res.json().catch(() => ({}))
      setIsSuperAdmin(!!json?.isSuperAdmin)
      setLoading(false)
      await loadData()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadData = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('/api/admin/legal', { headers: { Authorization: `Bearer ${session?.access_token || ''}` } })
    const json = await res.json()
    setPages(json?.pages || [])
  }

  const addPage = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch('/api/admin/legal', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` }, body: JSON.stringify({ title: 'New Policy', slug: `policy-${Date.now()}`, content: '', display_order: (pages?.length || 0) + 1, is_active: true }) })
    await loadData()
  }

  const updatePage = async (p: LegalPage) => {
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('/api/admin/legal', { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` }, body: JSON.stringify(p) })
    if (!res.ok) return
    await loadData()
  }

  const deletePage = async (id: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch(`/api/admin/legal?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${session?.access_token || ''}` } })
    await loadData()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F6FE]">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003594]"></div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!isAuthenticated || !isSuperAdmin) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-3xl mx-auto px-4 py-20">
          <h1 className="text-2xl font-semibold mb-2">Unauthorized</h1>
          <p className="text-[#757575]">You must be a super admin to manage legal policies.</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div>
            <h1 className="font-['Barlow'] font-medium text-3xl mb-2">Manage Legal Policies</h1>
            <p className="text-[#757575]">Edit policy pages like Code of Conduct, Conflict of Interest, Privacy, and more.</p>
            {error && <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm">{error}</div>}
          </div>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Policies</h2>
              <Button text="Add Policy" variant="primary" size="40" onClick={addPage} />
            </div>
            <div className="grid gap-4">
              {pages.map((p) => (
                <div key={p.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 mb-3">
                    <input value={p.title} onChange={(e) => setPages(pages.map(x => x.id === p.id ? { ...x, title: e.target.value } : x))} className="border px-3 py-2 rounded w-full lg:col-span-2" placeholder="Title" />
                    <input value={p.slug} onChange={(e) => setPages(pages.map(x => x.id === p.id ? { ...x, slug: e.target.value } : x))} className="border px-3 py-2 rounded w-full lg:col-span-2" placeholder="Slug" />
                    <input type="number" value={p.display_order || 0} onChange={(e) => setPages(pages.map(x => x.id === p.id ? { ...x, display_order: Number(e.target.value) } : x))} className="border px-3 py-2 rounded w-full" placeholder="Order" />
                    <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                      <input type="checkbox" checked={p.is_active} onChange={(e) => setPages(pages.map(x => x.id === p.id ? { ...x, is_active: e.target.checked } : x))} /> Active
                    </label>
                  </div>
                  <textarea value={p.content || ''} onChange={(e) => setPages(pages.map(x => x.id === p.id ? { ...x, content: e.target.value } : x))} className="border px-3 py-2 rounded w-full h-52 font-mono text-sm" placeholder='Policy content (HTML supported)' />
                  <div className="flex gap-2 mt-3">
                    <Button text="Save" variant="ghost-dark" size="40" onClick={() => updatePage(p)} />
                    <Button text="Delete" variant="ghost-dark" size="40" onClick={() => deletePage(p.id)} />
                  </div>
                </div>
              ))}
              {pages.length === 0 && <div className="text-[#757575]">No policies created.</div>}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}


