'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@/lib/supabase'

export default function ImageUploadButton({ onUploaded, label = 'Upload…', folderHint = 'projects/images' }: { onUploaded: (url: string) => void, label?: string, folderHint?: string }) {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handlePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (!file) return
    setBusy(true)
    setError(null)
    try {
      const supabase = createClientComponentClient()
      const ext = (file.name.split('.').pop() || 'bin').toLowerCase()
      const objectPath = `${folderHint.replace(/^\/+|\/+$/g, '')}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: upErr } = await supabase.storage.from('project-media').upload(objectPath, file, {
        cacheControl: '3600',
        contentType: file.type || 'application/octet-stream',
        upsert: false
      })
      if (upErr) {
        // Fallback to server upload (service role) to bypass RLS if needed
        const { data: { session } } = await supabase.auth.getSession()
        const form = new FormData()
        form.append('file', file)
        form.append('folder', folderHint)
        const res = await fetch('/api/admin/upload', {
          method: 'POST', headers: { Authorization: `Bearer ${session?.access_token || ''}` }, body: form
        })
        const json = await res.json().catch(() => ({ error: 'Upload failed' }))
        if (!res.ok || !json.url) throw new Error(json.error || upErr.message)
        onUploaded(json.url)
        setBusy(false)
        return
      }
      const { data: signed, error: signErr } = await supabase.storage.from('project-media').createSignedUrl(objectPath, 60 * 60 * 24 * 365)
      if (signErr) throw new Error(signErr.message)
      onUploaded(signed?.signedUrl || '')
    } catch (e: any) {
      setError(e?.message || 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="relative">
      <label className={`px-3 py-2 border rounded cursor-pointer ${busy ? 'opacity-60 pointer-events-none' : ''}`}>
        {label}
        <input type="file" accept="image/*" onChange={handlePick} className="hidden" />
      </label>
      {error && <div className="text-xs text-red-600 mt-1">{error}</div>}
    </div>
  )
}


