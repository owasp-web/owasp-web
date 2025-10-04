'use client'

import React, { useRef, useState } from 'react'

interface MarkdownEditorProps {
  id?: string
  name?: string
  value: string
  placeholder?: string
  rows?: number
  className?: string
  disabled?: boolean
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function MarkdownEditor(props: MarkdownEditorProps) {
  const { id, name, value, placeholder, rows = 6, className = '', disabled, onChange } = props
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [linkMode, setLinkMode] = useState(false)
  const [urlInput, setUrlInput] = useState('')

  const emitChange = (next: string) => {
    if (!onChange) return
    const synthetic = {
      target: { name: name || '', value: next, type: 'text' }
    } as unknown as React.ChangeEvent<HTMLTextAreaElement>
    onChange(synthetic)
  }

  const getSel = () => {
    const el = textareaRef.current
    if (!el) return { start: 0, end: 0, text: '' }
    const start = el.selectionStart || 0
    const end = el.selectionEnd || 0
    return { start, end, text: value.slice(start, end) }
  }

  const replaceSel = (replacer: (selected: string) => string) => {
    const el = textareaRef.current
    if (!el) return
    const { start, end, text } = getSel()
    const before = value.slice(0, start)
    const after = value.slice(end)
    const next = `${before}${replacer(text)}${after}`
    emitChange(next)
    requestAnimationFrame(() => {
      el.focus()
    })
  }

  const toggleWrap = (wrapperLeft: string, wrapperRight?: string) => {
    replaceSel((sel) => `${wrapperLeft}${sel}${wrapperRight ?? wrapperLeft}`)
  }

  const onBold = () => toggleWrap('**')
  const onItalic = () => toggleWrap('*')
  const onCode = () => toggleWrap('`')
  const onH2 = () => replaceSel((sel) => sel ? `## ${sel}` : '## ')
  const onBullet = () => replaceSel((sel) => {
    const lines = (sel || '').split('\n')
    const content = lines.length > 1 ? lines.map(l => l ? `- ${l}` : '- ').join('\n') : `- ${sel || ''}`
    return content
  })
  const onNumbered = () => replaceSel((sel) => {
    const lines = (sel || '').split('\n')
    const content = lines.map((l, i) => `${i + 1}. ${l || ''}`).join('\n')
    return content
  })
  const onQuote = () => replaceSel((sel) => {
    const lines = (sel || '').split('\n')
    return lines.map(l => `> ${l || ''}`).join('\n')
  })
  const onTable = () => replaceSel((_sel) => {
    return ['| Column A | Column B |', '| --- | --- |', '| Cell 1 | Cell 2 |'].join('\n')
  })

  const onLinkClick = () => {
    setUrlInput('https://')
    setLinkMode(true)
  }
  const onInsertLink = () => {
    const { text } = getSel()
    const label = text || 'link'
    const u = urlInput.trim()
    if (!u) { setLinkMode(false); return }
    replaceSel(() => `[${label}](${u})`)
    setLinkMode(false)
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <button type="button" onClick={onBold} className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50" disabled={disabled}><strong>B</strong></button>
        <button type="button" onClick={onItalic} className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50" disabled={disabled}><em>I</em></button>
        <button type="button" onClick={onH2} className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50" disabled={disabled}>H2</button>
        <button type="button" onClick={onBullet} className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50" disabled={disabled}>• List</button>
        <button type="button" onClick={onNumbered} className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50" disabled={disabled}>1. List</button>
        <button type="button" onClick={onQuote} className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50" disabled={disabled}>&gt; Quote</button>
        <button type="button" onClick={onCode} className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50" disabled={disabled}>Code</button>
        <button type="button" onClick={onTable} className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50" disabled={disabled}>Table</button>
        {!linkMode ? (
          <button type="button" onClick={onLinkClick} className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50" disabled={disabled}>Link</button>
        ) : (
          <div className="flex items-center gap-2">
            <input type="url" value={urlInput} onChange={(e) => setUrlInput(e.target.value)} placeholder="https://example.com" className="px-2 py-1 border border-gray-300 rounded text-sm w-56" />
            <button type="button" onClick={onInsertLink} className="px-2 py-1 text-sm bg-[#003594] text-white rounded">Insert</button>
            <button type="button" onClick={() => setLinkMode(false)} className="px-2 py-1 text-sm border border-gray-300 rounded">Cancel</button>
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


