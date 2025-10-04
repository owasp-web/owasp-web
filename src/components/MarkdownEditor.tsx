'use client'

import React, { useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'

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

export default function MarkdownEditor({ id, name, value, placeholder, className = '', disabled, onChange }: MarkdownEditorProps) {
  const editor = useEditor({
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({ openOnClick: false })
    ],
    content: value || '',
    onUpdate: ({ editor }) => {
      if (!onChange) return
      const html = editor.getHTML()
      const synthetic = {
        target: { name: name || '', value: html, type: 'text' }
      } as unknown as React.ChangeEvent<HTMLTextAreaElement>
      onChange(synthetic)
    }
  })

  useEffect(() => {
    if (!editor) return
    // Only update if incoming value differs from current doc
    const current = editor.getHTML()
    if ((value || '') !== current) {
      editor.commands.setContent(value || '')
    }
  }, [value, editor])

  if (!editor) return null

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL', previousUrl || 'https://')
    if (url === null) return
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded" onClick={() => editor.chain().focus().toggleBold().run()}><strong>B</strong></button>
        <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded" onClick={() => editor.chain().focus().toggleItalic().run()}><em>I</em></button>
        <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded" onClick={() => editor.chain().focus().toggleBulletList().run()}>• List</button>
        <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded" onClick={() => editor.chain().focus().toggleOrderedList().run()}>1. List</button>
        <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded" onClick={() => editor.chain().focus().toggleBlockquote().run()}>&gt; Quote</button>
        <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded" onClick={() => editor.chain().focus().toggleCode().run()}>Code</button>
        <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded" onClick={setLink}>Link</button>
      </div>
      <div id={id} className={`min-h-[120px] border border-gray-300 rounded ${className}`}>
        <EditorContent editor={editor} />
      </div>
      {placeholder && !value && (
        <div className="text-gray-400 text-sm mt-1">{placeholder}</div>
      )}
    </div>
  )
}


