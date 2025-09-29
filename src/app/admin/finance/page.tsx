'use client'

import { useEffect, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { createClientComponentClient } from '@/lib/supabase'
import type { FinanceDocument, FinanceCategory } from '@/lib/types'

export default function AdminFinancePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [docs, setDocs] = useState<FinanceDocument[]>([])

  const [name, setName] = useState('')
  const [category, setCategory] = useState<FinanceCategory>('Tax Return')
  const [year, setYear] = useState<string>('')
  const [file, setFile] = useState<File | null>(null)

  useEffect(() => {
    (async () => {
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
      if (!session?.access_token) { setLoading(false); return }
      const res = await fetch('/api/auth/roles', { headers: { Authorization: `Bearer ${session.access_token}` } })
      const json = await res.json().catch(() => ({}))
      setIsSuperAdmin(!!json?.isSuperAdmin)
      setLoading(false)
      await loadDocs()
    })()
  }, [])

  const loadDocs = async () => {
    const res = await fetch('/api/admin/finance-docs')
    const json = await res.json()
    setDocs(json?.documents || [])
  }

  const handleUploadAndCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!file) { setError('Please select a file'); return }
    setSubmitting(true)
    try {
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) throw new Error('Not authenticated')

      // Create signed upload
      const signRes = await fetch('/api/admin/upload/signed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ folder: 'finance/docs', filename: file.name })
      })
      if (!signRes.ok) throw new Error((await signRes.json()).error || 'Failed to sign upload')
      const { path, signedUrl } = await signRes.json()

      // PUT file to signed URL
      const putRes = await fetch(signedUrl, { method: 'PUT', headers: { 'Content-Type': file.type || 'application/pdf' }, body: file })
      if (!putRes.ok) throw new Error('Upload failed')

      // Sign a long-lived read URL
      const readRes = await fetch('/api/admin/upload/signed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ action: 'sign-read', path })
      })
      const readJson = await readRes.json()
      const fileUrl = readJson?.url || ''

      // Create record
      const createRes = await fetch('/api/admin/finance-docs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify({ name, category, year: year ? Number(year) : null, file_url: fileUrl, storage_path: path })
      })
      if (!createRes.ok) throw new Error((await createRes.json()).error || 'Failed to create record')

      setName('')
      setCategory('Tax Return')
      setYear('')
      setFile(null)
      await loadDocs()
    } catch (err: any) {
      setError(err?.message || 'Failed to submit')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F1F6FE]"><Header /><div className="flex items-center justify-center min-h-[60vh]"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003594]"></div></div><Footer /></div>
    )
  }

  if (!isAuthenticated || !isSuperAdmin) {
    return (
      <div className="min-h-screen bg-white"><Header /><div className="max-w-3xl mx-auto px-6 py-20"><h1 className="text-2xl font-semibold">Admin access required</h1><p className="text-[#757575] mt-2">You must be a super admin to manage finance documents.</p></div><Footer /></div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="bg-[#F1F6FE]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] pt-10 pb-20">
          <h1 className="font-['Barlow'] text-3xl font-medium mb-6">Finance Documents</h1>
          <form onSubmit={handleUploadAndCreate} className="bg-white border border-gray-200 rounded-lg p-6 mb-10 space-y-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input className="w-full border rounded-sm px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <label className="block text-sm mb-1">Category</label>
              <select className="w-full border rounded-sm px-3 py-2" value={category} onChange={e => setCategory(e.target.value as FinanceCategory)}>
                <option>Tax Return</option>
                <option>Annual Budget</option>
                <option>Audited Financial Statement</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm mb-1">Year (optional)</label>
              <input className="w-full border rounded-sm px-3 py-2" type="number" value={year} onChange={e => setYear(e.target.value)} />
            </div>
            <div>
              <label className="block text-sm mb-1">File</label>
              <input type="file" accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" onChange={e => setFile(e.target.files?.[0] || null)} />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <div>
              <Button text={submitting ? 'Saving…' : 'Save Document'} variant="primary" size="40" onClick={() => {}} />
            </div>
          </form>

          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="font-['Barlow'] text-xl font-medium mb-4">Existing Documents</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Category</th>
                    <th className="py-2 pr-4">Year</th>
                    <th className="py-2 pr-4">Link</th>
                  </tr>
                </thead>
                <tbody>
                  {docs.map(d => (
                    <tr key={d.id} className="border-b last:border-b-0">
                      <td className="py-2 pr-4">{d.name}</td>
                      <td className="py-2 pr-4">{d.category}</td>
                      <td className="py-2 pr-4">{d.year ?? ''}</td>
                      <td className="py-2 pr-4"><a href={d.file_url} target="_blank" className="text-[#003594] underline">Download</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}


