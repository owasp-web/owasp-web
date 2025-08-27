'use client'

import { useState } from 'react'
import type { Event, EventFormData } from '@/lib/types'
import Button from './Button'

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
    status: initialData?.status || 'draft'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const newErrors: Record<string, string> = {}
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.date.trim()) newErrors.date = 'Date is required'
    if (!formData.month.trim()) newErrors.month = 'Month is required'
    if (!formData.year.trim()) newErrors.year = 'Year is required'
    if (!formData.time.trim()) newErrors.time = 'Time is required'
    if (!formData.location.trim()) newErrors.location = 'Location is required'
    if (!formData.image.trim()) newErrors.image = 'Image URL is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setErrors({})
    await onSubmit(formData)
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
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date *
          </label>
          <input
            type="text"
            name="date"
            id="date"
            placeholder="e.g., 3-7 or 19"
            value={formData.date}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md px-3 py-2 ${
              errors.date ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-[#003594] focus:border-[#003594]`}
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
        </div>

        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">
            Month *
          </label>
          <select
            name="month"
            id="month"
            value={formData.month}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md px-3 py-2 ${
              errors.month ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-[#003594] focus:border-[#003594]`}
          >
            <option value="">Select Month</option>
            {months.map(month => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          {errors.month && <p className="mt-1 text-sm text-red-600">{errors.month}</p>}
        </div>

        <div>
          <label htmlFor="year" className="block text-sm font-medium text-gray-700">
            Year *
          </label>
          <select
            name="year"
            id="year"
            value={formData.year}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded-md px-3 py-2 ${
              errors.year ? 'border-red-300' : 'border-gray-300'
            } focus:outline-none focus:ring-[#003594] focus:border-[#003594]`}
          >
            <option value="">Select Year</option>
            {years.map(year => (
              <option key={year} value={year.toString()}>{year}</option>
            ))}
          </select>
          {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
        </div>

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
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
          Image URL *
        </label>
        <input
          type="url"
          name="image"
          id="image"
          placeholder="e.g., /images/events/event-1.png"
          value={formData.image}
          onChange={handleChange}
          className={`mt-1 block w-full border rounded-md px-3 py-2 ${
            errors.image ? 'border-red-300' : 'border-gray-300'
          } focus:outline-none focus:ring-[#003594] focus:border-[#003594]`}
        />
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
        <textarea
          name="description"
          id="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-[#003594] focus:border-[#003594]"
        />
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