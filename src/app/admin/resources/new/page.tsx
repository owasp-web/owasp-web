'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { createClientComponentClient } from '@/lib/supabase'

export default function NewResourcePage() {
  const router = useRouter()
  const [form, setForm] = useState<any>({ title: '', image: '', url: '', description: '', status: 'active' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const createResource = async () => {
    try {
      setSaving(true)
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/admin/resources/new', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to create')
      router.push('/admin/resources')
    } catch (e: any) {
      setError(e.message || 'Failed to create')
    } finally { setSaving(false) }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[900px] mx-auto px-4 sm:px-6 md:px-8 py-10">
        <h1 className="text-2xl font-bold mb-6">New Resource</h1>
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
            <Button text={saving ? 'Creating…' : 'Create'} size="40" variant="primary" onClick={createResource} />
            <Button text="Cancel" size="40" variant="ghost-dark" onClick={() => router.push('/admin/resources')} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


