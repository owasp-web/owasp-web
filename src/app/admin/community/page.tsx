'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { createClientComponentClient } from '@/lib/supabase'

type CommunityTab = { id: string, name: string, content?: string, display_order?: number }

export default function AdminCommunityPage() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [tabs, setTabs] = useState<CommunityTab[]>([])
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
    const res = await fetch('/api/admin/community')
    const json = await res.json()
    setTabs(json?.tabs || [])
  }

  const addTab = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch('/api/admin/community', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` }, body: JSON.stringify({ name: 'New Tab', content: '[]', display_order: (tabs?.length || 0) + 1 }) })
    await loadData()
  }

  const updateTab = async (tab: CommunityTab) => {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch('/api/admin/community', { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` }, body: JSON.stringify({ id: tab.id, name: tab.name, content: tab.content, display_order: tab.display_order }) })
  }

  const deleteTab = async (id: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch(`/api/admin/community?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${session?.access_token || ''}` } })
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
          <p className="text-[#757575]">You must be a super admin to manage the community page.</p>
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
            <h1 className="font-['Barlow'] font-medium text-3xl mb-2">Manage Community</h1>
            <p className="text-[#757575]">Edit community page tabs and content sections.</p>
            {error && <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm">{error}</div>}
          </div>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Tabs</h2>
              <Button text="Add Tab" variant="primary" size="40" onClick={addTab} />
            </div>
            <div className="grid gap-4">
              {tabs.map((tab) => (
                <div key={tab.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <input value={tab.name} onChange={(e) => setTabs(tabs.map(t => t.id === tab.id ? { ...t, name: e.target.value } : t))} className="border px-3 py-2 rounded w-full" />
                    <input type="number" value={tab.display_order || 0} onChange={(e) => setTabs(tabs.map(t => t.id === tab.id ? { ...t, display_order: Number(e.target.value) } : t))} className="border px-3 py-2 rounded w-28" />
                    <Button text="Save" variant="ghost-dark" size="40" onClick={() => updateTab(tab)} />
                    <Button text="Delete" variant="ghost-dark" size="40" onClick={() => deleteTab(tab.id)} />
                  </div>
                  <textarea value={tab.content || ''} onChange={(e) => setTabs(tabs.map(t => t.id === tab.id ? { ...t, content: e.target.value } : t))} className="border px-3 py-2 rounded w-full h-40 font-mono text-sm" placeholder='JSON array of sections' />
                </div>
              ))}
              {tabs.length === 0 && (
                <div className="text-[#757575]">No tabs created.</div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}


