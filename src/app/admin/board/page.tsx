'use client'

import { useEffect, useMemo, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { createClientComponentClient } from '@/lib/supabase'

type BoardTab = { id: string, name: string, content?: string, display_order?: number }
type BoardMember = { id: string, name: string, title?: string, description?: string, image_url?: string, storage_path?: string, links: { title: string, url: string }[], country?: string, display_order?: number, is_active: boolean }

export default function AdminBoardPage() {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [tabs, setTabs] = useState<BoardTab[]>([])
  const [members, setMembers] = useState<BoardMember[]>([])
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
    setError(null)
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('/api/admin/board', { headers: { Authorization: `Bearer ${session?.access_token || ''}` } })
    const json = await res.json()
    setTabs(json?.tabs || [])
    setMembers(json?.members || [])
  }

  const addTab = async () => {
    setError(null)
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('/api/admin/board', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
      body: JSON.stringify({ entity: 'tab', name: 'New Tab', content: '[]', display_order: (tabs?.length || 0) + 1 })
    })
    if (!res.ok) { setError('Failed to create tab'); return }
    await loadData()
  }

  const updateTab = async (tab: BoardTab) => {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch('/api/admin/board', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
      body: JSON.stringify({ entity: 'tab', id: tab.id, name: tab.name, content: tab.content, display_order: tab.display_order })
    })
  }

  const deleteTab = async (id: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch(`/api/admin/board?entity=tab&id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${session?.access_token || ''}` } })
    await loadData()
  }

  const addMember = async () => {
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('/api/admin/board', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
      body: JSON.stringify({ entity: 'member', name: 'New Member', is_active: true, links: [], display_order: (members?.length || 0) + 1 })
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) { setError(json?.error || 'Failed to create member'); return }
    if (json?.member) setMembers((prev) => [...prev, json.member])
    await loadData()
  }

  const updateMember = async (member: BoardMember) => {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch('/api/admin/board', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
      body: JSON.stringify({ entity: 'member', ...member })
    })
  }

  const deleteMember = async (id: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    await fetch(`/api/admin/board?entity=member&id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${session?.access_token || ''}` } })
    await loadData()
  }

  const handleImageUpload = async (file: File, onUrl: (url: string, storagePath: string) => void) => {
    const { data: { session } } = await supabase.auth.getSession()
    const signRes = await fetch('/api/admin/upload/signed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
      body: JSON.stringify({ folder: 'board/members', filename: file.name })
    })
    if (!signRes.ok) return
    const { path, signedUrl } = await signRes.json()
    const putRes = await fetch(signedUrl, { method: 'PUT', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file })
    if (!putRes.ok) return
    const readRes = await fetch('/api/admin/upload/signed', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
      body: JSON.stringify({ action: 'sign-read', path })
    })
    const readJson = await readRes.json()
    onUrl(readJson.url || '', path)
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
          <p className="text-[#757575]">You must be a super admin to manage the board.</p>
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
            <h1 className="font-['Barlow'] font-medium text-3xl mb-2">Manage Board</h1>
            <p className="text-[#757575]">Edit board tabs and members. The Board Members tab is always shown first on the public page.</p>
            {error && <div className="mt-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-sm">{error}</div>}
          </div>

          {/* Tabs Management */}
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

          {/* Members Management */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Board Members</h2>
              <Button text="Add Member" variant="primary" size="40" onClick={addMember} />
            </div>
            <div className="grid gap-4">
              {members.length > 0 && members.map((m) => (
                <div key={m.id} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-3 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input value={m.name} onChange={(e) => setMembers(members.map(x => x.id === m.id ? { ...x, name: e.target.value } : x))} className="border px-3 py-2 rounded w-full" placeholder="Name" />
                        <input value={m.title || ''} onChange={(e) => setMembers(members.map(x => x.id === m.id ? { ...x, title: e.target.value } : x))} className="border px-3 py-2 rounded w-full" placeholder="Title" />
                      </div>
                      <textarea value={m.description || ''} onChange={(e) => setMembers(members.map(x => x.id === m.id ? { ...x, description: e.target.value } : x))} className="border px-3 py-2 rounded w-full h-24" placeholder="Short description" />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input value={m.country || ''} onChange={(e) => setMembers(members.map(x => x.id === m.id ? { ...x, country: e.target.value } : x))} className="border px-3 py-2 rounded w-full" placeholder="Country" />
                        <input type="number" value={m.display_order || 0} onChange={(e) => setMembers(members.map(x => x.id === m.id ? { ...x, display_order: Number(e.target.value) } : x))} className="border px-3 py-2 rounded w-full" placeholder="Order" />
                        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" checked={m.is_active} onChange={(e) => setMembers(members.map(x => x.id === m.id ? { ...x, is_active: e.target.checked } : x))} /> Active
                        </label>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Links</div>
                        {(m.links || []).map((l, i) => (
                          <div key={i} className="grid grid-cols-5 gap-2">
                            <input value={l.title} onChange={(e) => setMembers(members.map(x => x.id === m.id ? { ...x, links: x.links.map((li, idx) => idx === i ? { ...li, title: e.target.value } : li) } : x))} className="border px-2 py-1 rounded col-span-2" placeholder="Title" />
                            <input value={l.url} onChange={(e) => setMembers(members.map(x => x.id === m.id ? { ...x, links: x.links.map((li, idx) => idx === i ? { ...li, url: e.target.value } : li) } : x))} className="border px-2 py-1 rounded col-span-3" placeholder="URL" />
                          </div>
                        ))}
                        <div className="flex gap-2">
                          <Button text="Add Link" variant="ghost-dark" size="40" onClick={() => setMembers(members.map(x => x.id === m.id ? { ...x, links: [...(x.links || []), { title: 'Link', url: '' }] } : x))} />
                          <Button text="Save Member" variant="ghost-dark" size="40" onClick={() => updateMember(m)} />
                          <Button text="Delete" variant="ghost-dark" size="40" onClick={() => deleteMember(m.id)} />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="relative w-full aspect-[4/3] rounded border overflow-hidden bg-gray-50 flex items-center justify-center">
                        {m.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={m.image_url} alt={m.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="text-[#757575] text-sm">No image</div>
                        )}
                      </div>
                      <input type="file" accept="image/*" onChange={async (e) => {
                        const f = e.target.files?.[0]
                        if (!f) return
                        await handleImageUpload(f, (url, path) => {
                          setMembers(members.map(x => x.id === m.id ? { ...x, image_url: url, storage_path: path } : x))
                        })
                      }} />
                    </div>
                  </div>
                </div>
              ))}
              {members.length === 0 && (
                <div className="text-[#757575]">No members added.</div>
              )}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}


