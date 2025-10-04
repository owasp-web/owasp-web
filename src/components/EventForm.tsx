'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@/lib/supabase'
import type { Event, EventFormData } from '@/lib/types'
import Button from './Button'
import LinkifyTextarea from '@/components/LinkifyTextarea'

interface EventFormProps {
  initialData?: Event
  onSubmit: (data: EventFormData) => Promise<void>
  loading: boolean
}

export default function EventForm({ initialData, onSubmit, loading }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    title: initialData?.title || '',
    date: initialData?.date || '',
    month: initialData?.month || '',
    year: initialData?.year || '',
    time: initialData?.time || '',
    location: initialData?.location || '',
    type: initialData?.type || 'Conference',
    image: initialData?.image || '',
    price: initialData?.price || '',
    registration_url: initialData?.registration_url || '',
    description: initialData?.description || '',
    is_featured: initialData?.is_featured || false,
    status: initialData?.status || 'published'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  // Single date input (replaces separate month/year for UX) but we still derive fields for DB
  const monthMap: Record<string, string> = { JAN: '01', FEB: '02', MAR: '03', APR: '04', MAY: '05', JUN: '06', JUL: '07', AUG: '08', SEP: '09', OCT: '10', NOV: '11', DEC: '12' }
  const abbrevByIndex = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
  const deriveInitialDateValue = () => {
    try {
      const y = (initialData as any)?.year as string | undefined
      const mAbbrev = (initialData as any)?.month as string | undefined
      const dRaw = (initialData as any)?.date as string | undefined
      if (y && mAbbrev && dRaw) {
        const mm = monthMap[mAbbrev as keyof typeof monthMap]
        if (!mm) return ''
        const dayNum = (dRaw.match(/\d+/)?.[0]) || dRaw
        const dd = String(parseInt(dayNum, 10)).padStart(2, '0')
        return `${y}-${mm}-${dd}`
      }
    } catch {}
    return ''
  }
  const [dateInput, setDateInput] = useState<string>(deriveInitialDateValue())

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!dateInput && (!formData.date.trim() || !formData.month.trim() || !formData.year.trim())) newErrors.date = 'Date is required'
    if (!formData.time.trim()) newErrors.time = 'Time is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    // Image is optional; if provided via upload we'll attach the public URL

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    // If dateInput provided, derive date/month/year
    let payload: EventFormData = { ...formData }
    if (dateInput) {
      const dt = new Date(dateInput)
      payload.year = String(dt.getFullYear())
      payload.month = abbrevByIndex[dt.getMonth()]
      payload.date = String(dt.getDate())
    }
    let imageUrl = formData.image
    if (file) {
      try {
        setUploading(true)
        const supabase = createClientComponentClient()
        const bucket = process.env.NEXT_PUBLIC_EVENTS_BUCKET || 'NEXT_PUBLIC_EVENTS_BUCKET'
        const ext = (file.name.split('.').pop() || 'jpg')
        const path = `events/uploads/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error: upErr } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
        if (upErr) throw upErr
        const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path)
        imageUrl = pub.publicUrl
      } catch (err: any) {
        setUploading(false)
        setErrors({ image: err?.message || 'Failed to upload image' })
        return
      } finally {
        setUploading(false)
      }
    }
    await onSubmit({ ...payload, image: imageUrl })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const months = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear + i)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md px-3 py-2 ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-[#003594] focus:border-[#003594]`}
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Event Type *
          </label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#003594] focus:border-[#003594]"
          >
            <option value="Conference">Conference</option>
            <option value="Chapter Meeting">Chapter Meeting</option>
            <option value="Training">Training</option>
            <option value="Workshop">Workshop</option>
          </select>
        </div>

        <div>
          <label htmlFor="event_date" className="block text-sm font-medium text-gray-700">
            Date *
          </label>
          <input
            id="event_date"
            type="date"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className={`mt-1 block w-full border rounded-md px-3 py-2 ${
              errors.date ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-[#003594] focus:border-[#003594]`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        {/* Month/Year inputs removed from UI; derived from dateInput on submit */}

        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700">
            Time *
          </label>
          <input
            type="text"
            name="time"
            id="time"
            placeholder="e.g., 9:00 AM - 6:00 PM"
            value={formData.time}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md px-3 py-2 ${
              errors.time ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-[#003594] focus:border-[#003594]`}
          />
          {errors.time && <p className="mt-1 text-sm text-red-600">{errors.time}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Location *
        </label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="e.g., Washington, DC"
          value={formData.location}
          onChange={handleChange}
          className={`mt-1 block w-full border rounded-md px-3 py-2 ${
            errors.location ? 'border-red-300' : 'border-gray-300'
          } focus:outline-none focus:ring-[#003594] focus:border-[#003594]`}
        />
        {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image (optional)</label>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        {uploading && <p className="text-sm text-gray-600 mt-1">Uploading...</p>}
        {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            placeholder="e.g., Free, $299, Early Bird"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#003594] focus:border-[#003594]"
          />
        </div>

        <div>
          <label htmlFor="registration_url" className="block text-sm font-medium text-gray-700">
            Registration URL
          </label>
          <input
            type="url"
            name="registration_url"
            id="registration_url"
            placeholder="https://example.com/register"
            value={formData.registration_url}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#003594] focus:border-[#003594]"
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <LinkifyTextarea
          name="description"
          id="description"
          rows={4}
          value={formData.description || ''}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#003594] focus:border-[#003594]"
        />
        <p className="mt-1 text-xs text-gray-500">Tip: Use [text](https://url) to create links. Bare URLs auto-link.</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#003594] focus:border-[#003594]"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            name="is_featured"
            id="is_featured"
            checked={formData.is_featured}
            onChange={handleChange}
            className="h-4 w-4 text-[#003594] focus:ring-[#003594] border-gray-300 rounded"
          />
          <label htmlFor="is_featured" className="ml-2 block text-sm text-gray-900">
            Featured Event
          </label>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <Button 
          text={loading ? "Saving..." : "Save Event"} 
          variant="primary" 
          size="40"
          disabled={loading}
          onClick={() => {}}
        />
      </div>
    </form>
  )
} 