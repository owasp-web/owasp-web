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

  const [form, setForm] = useState<any>({ title: '', image: '', url: '', description: '', status: 'active' })
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
            <input className="border rounded px-3 py-2" placeholder="Image URL" value={form.image || ''} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            <input className="border rounded px-3 py-2" placeholder="Resource URL" value={form.url || ''} onChange={(e) => setForm({ ...form, url: e.target.value })} />
            <select className="border rounded px-3 py-2" value={form.status || 'active'} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>
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


