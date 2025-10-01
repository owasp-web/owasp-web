'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Button from '@/components/Button'
import { createClientComponentClient } from '@/lib/supabase'

interface Resource {
  id: string
  title: string
  description?: string
  category?: string
  type?: string
  image?: string
  downloads?: string
  url?: string
  download_url?: string
  is_featured?: boolean
  order_num?: number
  status?: string
}

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => { load() }, [])

  const load = async () => {
    try {
      setLoading(true)
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch('/api/admin/resources/list', { headers: { Authorization: `Bearer ${session?.access_token || ''}` } })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to load resources')
      const json = await res.json()
      setResources(json.resources || [])
    } catch (e: any) {
      setError(e.message || 'Failed to load resources')
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Resources</h1>
          <Button text="Add Resource" size="40" variant="primary" onClick={() => router.push('/admin/resources/new')} />
        </div>
        {loading ? (
          <div>Loading…</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <div className="overflow-x-auto bg-white border rounded">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Featured</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {resources.map((r) => (
                  <tr key={r.id}>
                    <td className="px-4 py-3 text-sm">{r.title}</td>
                    <td className="px-4 py-3 text-sm">{r.category}</td>
                    <td className="px-4 py-3 text-sm">{r.type}</td>
                    <td className="px-4 py-3 text-sm">{r.is_featured ? 'Yes' : 'No'}</td>
                    <td className="px-4 py-3 text-right text-sm">
                      <div className="flex justify-end gap-2">
                        <Button text="Edit" size="40" variant="primary" onClick={() => router.push(`/admin/resources/${r.id}/edit`)} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}


