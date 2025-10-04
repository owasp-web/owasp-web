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


