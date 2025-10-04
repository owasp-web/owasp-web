'use client'

import React, { useRef, useState } from 'react'

interface LinkifyTextareaProps {
  id?: string
  name?: string
  value: string
  placeholder?: string
  rows?: number
  className?: string
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function LinkifyTextarea(props: LinkifyTextareaProps) {
  const { id, name, value, placeholder, rows = 4, className = '', disabled, onChange } = props
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [selection, setSelection] = useState<{ start: number; end: number; text: string }>({ start: 0, end: 0, text: '' })

  const handleOpenLink = () => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart || 0
    const end = el.selectionEnd || 0
    const text = value.slice(start, end)
    if (!text) {
      // If nothing selected, select the current word for convenience
      const before = value.slice(0, start)
      const match = before.match(/[^\s]+$/)
      const wordStart = match ? start - match[0].length : start
      const after = value.slice(end)
      const matchAfter = after.match(/^[^\s]+/)
      const wordEnd = matchAfter ? end + matchAfter[0].length : end
      setSelection({ start: wordStart, end: wordEnd, text: value.slice(wordStart, wordEnd) })
    } else {
      setSelection({ start, end, text })
    }
    setLinkUrl('')
    setShowLinkInput(true)
  }

  const handleInsertLink = () => {
    if (!onChange) {
      setShowLinkInput(false)
      return
    }
    const { start, end, text } = selection
    const label = text || 'link'
    const safeUrl = linkUrl.trim()
    if (!safeUrl) {
      setShowLinkInput(false)
      return
    }
    const before = value.slice(0, start)
    const after = value.slice(end)
    const inserted = `${before}[${label}](${safeUrl})${after}`
    const synthetic = {
      target: { name: name || '', value: inserted, type: 'text' }
    } as unknown as React.ChangeEvent<HTMLTextAreaElement>
    onChange(synthetic)
    setShowLinkInput(false)
    // restore focus
    requestAnimationFrame(() => {
      textareaRef.current?.focus()
    })
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-2">
        <button
          type="button"
          onClick={handleOpenLink}
          className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
          disabled={disabled}
        >
          Link
        </button>
        {showLinkInput && (
          <div className="flex items-center gap-2">
            <input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="px-2 py-1 border border-gray-300 rounded text-sm w-56"
            />
            <button
              type="button"
              onClick={handleInsertLink}
              className="px-2 py-1 text-sm bg-[#003594] text-white rounded"
            >
              Insert
            </button>
            <button
              type="button"
              onClick={() => setShowLinkInput(false)}
              className="px-2 py-1 text-sm border border-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
      <textarea
        ref={textareaRef}
        id={id}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={onChange}
        className={className}
      />
    </div>
  )
}


