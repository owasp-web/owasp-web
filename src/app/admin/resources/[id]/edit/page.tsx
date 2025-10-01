'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { createClientComponentClient } from '@/lib/supabase'

export default function EditResourcePage() {
  const params = useParams()
  const id = params.id as string
  const router = useRouter()

  const [form, setForm] = useState<any>({ title: '', category: '', type: '', image: '', downloads: '', url: '', download_url: '', description: '', is_featured: false, order_num: 0, status: 'active' })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { load() }, [id])

  const load = async () => {
    try {
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(`/api/admin/resources/${id}`, { headers: { Authorization: `Bearer ${session?.access_token || ''}` } })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to load')
      const json = await res.json()
      setForm(json.resource)
    } catch (e: any) {
      setError(e.message || 'Failed to load resource')
    } finally { setLoading(false) }
  }

  const save = async () => {
    try {
      setSaving(true)
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(`/api/admin/resources/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to save')
      router.push('/admin/resources')
    } catch (e: any) {
      setError(e.message || 'Failed to save')
    } finally { setSaving(false) }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white"><Header /><div className="p-8">Loading…</div><Footer /></div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 py-10">
        <h1 className="text-2xl font-bold mb-6">Edit Resource</h1>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        <div className="grid grid-cols-1 gap-4">
          <input className="border rounded px-3 py-2" placeholder="Title" value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="border rounded px-3 py-2" placeholder="Description" value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input className="border rounded px-3 py-2" placeholder="Category" value={form.category || ''} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Type" value={form.type || ''} onChange={(e) => setForm({ ...form, type: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Image URL" value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Downloads (e.g., 2.5M+)" value={form.downloads || ''} onChange={(e) => setForm({ ...form, downloads: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Resource URL" value={form.url || ''} onChange={(e) => setForm({ ...form, url: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Download URL" value={form.download_url || ''} onChange={(e) => setForm({ ...form, download_url: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Order" type="number" value={form.order_num || 0} onChange={(e) => setForm({ ...form, order_num: Number(e.target.value) })} />
            <select className="border rounded px-3 py-2" value={form.status || 'active'} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
          <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.is_featured} onChange={(e) => setForm({ ...form, is_featured: e.target.checked })} /> Featured</label>
          <div className="flex gap-3">
            <Button text={saving ? 'Saving…' : 'Save'} size="40" variant="primary" onClick={save} />
            <Button text="Cancel" size="40" variant="ghost-dark" onClick={() => router.push('/admin/resources')} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


