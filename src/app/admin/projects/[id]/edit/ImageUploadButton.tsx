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
      // Prefer signed upload (service role) to avoid server body size limits
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      const signRes = await fetch('/api/admin/upload/signed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
        body: JSON.stringify({ folder: folderHint, filename: file.name })
      })
      if (signRes.ok) {
        const signed = await signRes.json()
        const { path, signedUrl } = signed
        // Always use PUT to the signed URL for maximum compatibility
        const putRes = await fetch(signedUrl, {
          method: 'PUT',
          headers: { 'Content-Type': file.type || 'application/octet-stream' },
          body: file
        })
        if (!putRes.ok) throw new Error('Failed to PUT to signed URL')
        const { data: s } = await supabase.storage.from('project-media').createSignedUrl(path, 60 * 60 * 24 * 365)
        onUploaded(s?.signedUrl || '')
        setBusy(false)
        return
      }

      // Fallback to direct client upload if signed flow unavailable
      const ext = (file.name.split('.').pop() || 'bin').toLowerCase()
      const objectPath = `${folderHint.replace(/^\/+|\/+$/g, '')}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: upErr } = await supabase.storage.from('project-media').upload(objectPath, file, {
        cacheControl: '3600',
        contentType: file.type || 'application/octet-stream',
        upsert: false
      })
      if (upErr) throw new Error(upErr.message)
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


