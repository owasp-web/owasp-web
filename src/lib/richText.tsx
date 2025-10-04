'use client'

import React from 'react'

// Renders plain text with support for markdown-style links [text](url) and auto-linking http(s) URLs
// Returns an array of nodes that can be embedded inside a <p> or any text container
export function renderTextWithLinks(input: string): Array<React.ReactNode> {
  if (!input) return []

  // First, convert markdown links to placeholder tokens to avoid double-processing
  // Matches [label](https://example.com)
  const mdLinkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
  let processed = input.replace(mdLinkRegex, (_match, label: string, url: string) => {
    return `<MDLINK>${label}|${url}</MDLINK>`
  })

  // Auto-link bare URLs
  const urlRegex = /(https?:\/\/[^\s<>'")]+)/g
  processed = processed.replace(urlRegex, (match: string) => `<HTTPLINK>${match}</HTTPLINK>`)

  // Split around our placeholders to create React nodes
  const parts = processed.split(/(<MDLINK>.*?<\/MDLINK>|<HTTPLINK>.*?<\/HTTPLINK>)/)

  return parts.filter(Boolean).map((part, idx) => {
    if (part.startsWith('<MDLINK>')) {
      const content = part.replace(/<\/?MDLINK>/g, '')
      const [label, url] = content.split('|')
      return (
        <a
          key={`md-${idx}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#003594] hover:text-[#0056b3] underline font-medium"
        >
          {label}
        </a>
      )
    }
    if (part.startsWith('<HTTPLINK>')) {
      const url = part.replace(/<\/?HTTPLINK>/g, '')
      return (
        <a
          key={`url-${idx}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#003594] hover:text-[#0056b3] underline font-medium break-all"
        >
          {url}
        </a>
      )
    }
    return <React.Fragment key={`t-${idx}`}>{part}</React.Fragment>
  })
}

// Render simple markdown features with links: headings (##), bold/italic, lists (-, * , 1.), and basic tables (markdown or TSV)
export function renderMarkdownWithLinks(input: string): React.ReactNode {
  if (!input) return null

  // Tables: markdown pipe format
  const isMarkdownTable = (txt: string) => {
    const lines = txt.trim().split(/\n/)
    if (lines.length < 2) return false
    return /\|/.test(lines[0]) && /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(lines[1])
  }

  const renderMarkdownTable = (txt: string) => {
    const lines = txt.trim().split(/\n/).filter(Boolean)
    if (lines.length < 2) return <pre className="whitespace-pre-wrap">{txt}</pre>
    const headerCells = lines[0].split('|').map(c => c.trim()).filter(c => c !== '')
    const bodyLines = lines.slice(2)
    const rows = bodyLines.map(l => l.split('|').map(c => c.trim()).filter(c => c !== ''))
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {headerCells.map((h, i) => (
                <th key={i} className="px-3 py-2 border-b border-gray-200 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, ri) => (
              <tr key={ri} className={ri % 2 ? 'bg-white' : 'bg-gray-50/30'}>
                {cells.map((c, ci) => (
                  <td key={ci} className="px-3 py-2 border-b border-gray-100">{renderTextWithLinks(c)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // TSV to table (when user pasted tab-separated text)
  const isTSV = (txt: string) => /\t/.test(txt)
  const renderTSVTable = (txt: string) => {
    const lines = txt.trim().split(/\n/).filter(Boolean)
    if (lines.length === 0) return null
    const rows = lines.map(l => l.split('\t'))
    const header = rows[0]
    const body = rows.slice(1)
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              {header.map((h, i) => (
                <th key={i} className="px-3 py-2 border-b border-gray-200 text-left font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((cells, ri) => (
              <tr key={ri} className={ri % 2 ? 'bg-white' : 'bg-gray-50/30'}>
                {cells.map((c, ci) => (
                  <td key={ci} className="px-3 py-2 border-b border-gray-100">{renderTextWithLinks(c)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // Headings
  if (/^##\s+/.test(input)) {
    const txt = input.replace(/^##\s+/, '')
    return <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mt-4 mb-2">{renderTextWithLinks(txt).map((n, i) => <React.Fragment key={i}>{n}</React.Fragment>)}</h3>
  }

  // Lists
  if (/^(\s*[-*]|\s*\d+\.)\s+/m.test(input)) {
    const lines = input.split(/\n/).filter(l => l.trim() !== '')
    if (lines.every(l => /^\s*[-*]\s+/.test(l))) {
      // Unordered
      return (
        <ul className="list-disc ml-6 space-y-1">
          {lines.map((l, i) => (
            <li key={i}>{renderTextWithLinks(l.replace(/^\s*[-*]\s+/, ''))}</li>
          ))}
        </ul>
      )
    }
    if (lines.every(l => /^\s*\d+\./.test(l))) {
      // Ordered
      return (
        <ol className="list-decimal ml-6 space-y-1">
          {lines.map((l, i) => (
            <li key={i}>{renderTextWithLinks(l.replace(/^\s*\d+\.\s+/, ''))}</li>
          ))}
        </ol>
      )
    }
  }

  // Tables
  if (isMarkdownTable(input)) return renderMarkdownTable(input)
  if (isTSV(input)) return renderTSVTable(input)

  // Inline bold/italic
  let txt = input
  // Bold
  txt = txt.replace(/\*\*([^*]+)\*\*/g, (_, g1) => `<B>${g1}</B>`)
  // Italic
  txt = txt.replace(/\*([^*]+)\*/g, (_, g1) => `<I>${g1}</I>`)

  const nodes = renderTextWithLinks(txt)
  return (
    <p className="font-['Poppins'] text-[#757575] leading-relaxed">
      {nodes.map((n, i) => {
        if (typeof n === 'string') {
          // Replace placeholders
          const parts = (n as string).split(/(<B>.*?<\/B>|<I>.*?<\/I>)/)
          return (
            <React.Fragment key={i}>
              {parts.filter(Boolean).map((p, j) => {
                if (p.startsWith('<B>')) return <strong key={j}>{p.replace(/<\/?B>/g, '')}</strong>
                if (p.startsWith('<I>')) return <em key={j}>{p.replace(/<\/?I>/g, '')}</em>
                return <React.Fragment key={j}>{p}</React.Fragment>
              })}
            </React.Fragment>
          )
        }
        return <React.Fragment key={i}>{n}</React.Fragment>
      })}
    </p>
  )
}


