'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { createClientComponentClient } from '@/lib/supabase'

export default function AdminHomePage() {
  const [settings, setSettings] = useState<any>({ hero_title: '', hero_subtitle: '', hero_buttons: [] })
  const [slides, setSlides] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => { (async () => {
    try {
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/admin/home', { headers: { Authorization: `Bearer ${session?.access_token || ''}` } })
      if (res.ok) {
        const json = await res.json()
        setSettings(json.settings || { hero_title: '', hero_subtitle: '', hero_buttons: [] })
        setSlides(json.slides || [])
      }
    } finally { setLoading(false) }
  })() }, [])

  const save = async () => {
    try {
      setSaving(true)
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      await fetch('/api/admin/home', { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` }, body: JSON.stringify({ settings, slides }) })
    } finally { setSaving(false) }
  }

  const addButton = () => setSettings((s: any) => ({ ...s, hero_buttons: [...(s.hero_buttons || []), { label: 'Button', url: '/', variant: 'primary' }] }))
  const removeButton = (idx: number) => setSettings((s: any) => ({ ...s, hero_buttons: (s.hero_buttons || []).filter((_: any, i: number) => i !== idx) }))

  const addSlide = (layout = 'one') => setSlides((arr) => ([...arr, { layout_type: layout, items: [] }]))
  const removeSlide = (idx: number) => setSlides(arr => arr.filter((_, i) => i !== idx))

  if (loading) return <div className="min-h-screen bg-white"><Header /><div className="p-8">Loading…</div><Footer /></div>

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 md:px-8 py-10">
        <h1 className="text-2xl font-bold mb-6">Home Page</h1>

        <div className="space-y-6">
          <div className="bg-white border rounded p-4">
            <h2 className="font-semibold mb-3">Hero</h2>
            <input className="border rounded px-3 py-2 w-full mb-2" placeholder="Hero Title" value={settings.hero_title || ''} onChange={(e) => setSettings({ ...settings, hero_title: e.target.value })} />
            <textarea className="border rounded px-3 py-2 w-full mb-2" placeholder="Hero Subtitle" rows={3} value={settings.hero_subtitle || ''} onChange={(e) => setSettings({ ...settings, hero_subtitle: e.target.value })} />
            <div className="mb-2 flex items-center justify-between">
              <div className="font-medium">Buttons</div>
              <button onClick={addButton} className="px-2 py-1 border rounded">Add Button</button>
            </div>
            <div className="space-y-2">
              {(settings.hero_buttons || []).map((btn: any, idx: number) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <input className="border rounded px-2 py-1" placeholder="Label" value={btn.label || ''} onChange={(e) => { const arr = [...(settings.hero_buttons || [])]; arr[idx] = { ...(arr[idx] || {}), label: e.target.value }; setSettings({ ...settings, hero_buttons: arr }) }} />
                  <input className="border rounded px-2 py-1" placeholder="https:// or /path" value={btn.url || ''} onChange={(e) => { const arr = [...(settings.hero_buttons || [])]; arr[idx] = { ...(arr[idx] || {}), url: e.target.value }; setSettings({ ...settings, hero_buttons: arr }) }} />
                  <div className="flex items-center gap-2">
                    <select className="border rounded px-2 py-1" value={btn.variant || 'primary'} onChange={(e) => { const arr = [...(settings.hero_buttons || [])]; arr[idx] = { ...(arr[idx] || {}), variant: e.target.value }; setSettings({ ...settings, hero_buttons: arr }) }}>
                      <option value="primary">primary</option>
                      <option value="ghost-white">ghost-white</option>
                    </select>
                    <button onClick={() => removeButton(idx)} className="px-2 py-1 border rounded text-red-600">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border rounded p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Slides</h2>
              <button onClick={() => addSlide('one')} className="px-2 py-1 border rounded">Add Slide</button>
            </div>
            <p className="text-sm text-gray-600 mb-2">Layouts: one (full), two, three (half+two), four (grid 4).</p>
            <div className="space-y-3">
              {slides.map((s, idx) => (
                <div key={idx} className="border rounded p-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
                    <select className="border rounded px-2 py-1" value={s.layout_type || 'one'} onChange={(e) => { const arr = [...slides]; arr[idx] = { ...(arr[idx] || {}), layout_type: e.target.value }; setSlides(arr) }}>
                      <option value="one">one</option>
                      <option value="two">two</option>
                      <option value="three">three</option>
                      <option value="four">four</option>
                    </select>
                    <div className="flex items-center justify-end">
                      <button onClick={() => removeSlide(idx)} className="px-2 py-1 border rounded text-red-600">Remove</button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {(s.items || []).map((it: any, i: number) => (
                      <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <input className="border rounded px-2 py-1" placeholder="Image URL" value={it.image || ''} onChange={(e) => { const arr = [...slides]; const items = [...(arr[idx].items || [])]; items[i] = { ...(items[i] || {}), image: e.target.value }; arr[idx] = { ...(arr[idx] || {}), items }; setSlides(arr) }} />
                        <input className="border rounded px-2 py-1" placeholder="Title" value={it.title || ''} onChange={(e) => { const arr = [...slides]; const items = [...(arr[idx].items || [])]; items[i] = { ...(items[i] || {}), title: e.target.value }; arr[idx] = { ...(arr[idx] || {}), items }; setSlides(arr) }} />
                        <div className="flex items-center gap-2">
                          <input className="border rounded px-2 py-1" placeholder="Link URL" value={it.url || ''} onChange={(e) => { const arr = [...slides]; const items = [...(arr[idx].items || [])]; items[i] = { ...(items[i] || {}), url: e.target.value }; arr[idx] = { ...(arr[idx] || {}), items }; setSlides(arr) }} />
                          <button onClick={() => { const arr = [...slides]; const items = [...(arr[idx].items || [])]; items.splice(i,1); arr[idx] = { ...(arr[idx] || {}), items }; setSlides(arr) }} className="px-2 py-1 border rounded text-red-600">Remove</button>
                        </div>
                      </div>
                    ))}
                    <button onClick={() => { const arr = [...slides]; const items = [...(arr[idx].items || [])]; items.push({}); arr[idx] = { ...(arr[idx] || {}), items }; setSlides(arr) }} className="px-2 py-1 border rounded">Add Item</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Button text={saving ? 'Saving…' : 'Save Changes'} variant="primary" size="48" onClick={save} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


