'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getChapterById } from '@/lib/chapters';
import { Chapter, ChapterTab, ChapterTabSection, ChapterTabButton } from '@/lib/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { adminService } from '@/lib/admin';
import { createClientComponentClient } from '@/lib/supabase';
import type { Event } from '@/lib/types';

interface EditChapterPageProps {
  params: {
    id: string;
  };
}

export default function EditChapterPage({ params }: EditChapterPageProps) {
  const router = useRouter();
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [admins, setAdmins] = useState<Array<{ id: string; email: string; user_id: string | null; created_at: string }>>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adminsLoading, setAdminsLoading] = useState(true);
  const [adminsError, setAdminsError] = useState<string | null>(null);
  const [chapterEvents, setChapterEvents] = useState<Event[]>([]);
  const [eventsLoading, setEventsLoading] = useState<boolean>(true);
  const [tempPassword, setTempPassword] = useState<string | null>(null);
  const [tempPasswordEmail, setTempPasswordEmail] = useState<string | null>(null);

  const regions = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Central America', 'Oceania'];

  useEffect(() => {
    fetchChapter();
    fetchAdmins();
    fetchEvents();
  }, [params.id]);

  const fetchChapter = async () => {
    try {
      setLoading(true);
      const chapterData = await getChapterById(params.id);
      if (chapterData) {
        setChapter(chapterData);
      } else {
        setError('Chapter not found');
      }
    } catch (err) {
      setError('Failed to fetch chapter');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      setAdminsLoading(true);
      const list = await adminService.listChapterAdmins(params.id);
      setAdmins(list);
    } catch (err: any) {
      setAdminsError(err?.message || 'Failed to load admins');
    } finally {
      setAdminsLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      setEventsLoading(true);
      const res = await fetch(`/api/public/chapters/${params.id}/events`)
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to load events')
      const json = await res.json()
      setChapterEvents((json.events as Event[]) || []);
    } catch (err) {
      console.error(err);
    } finally {
      setEventsLoading(false);
    }
  };

  const handleAddAdmin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newAdminEmail.trim()) return;
    try {
      const result = await adminService.addChapterAdmin(params.id, newAdminEmail.trim());
      setTempPassword(result?.tempPassword || null);
      setTempPasswordEmail(newAdminEmail.trim());
      setNewAdminEmail('');
      fetchAdmins();
    } catch (err: any) {
      setAdminsError(err?.message || 'Failed to add admin');
    }
  };

  const handleRemoveAdmin = async (adminId: string) => {
    if (!confirm('Remove this chapter admin?')) return;
    try {
      await adminService.removeChapterAdmin(params.id, { id: adminId });
      fetchAdmins();
    } catch (err: any) {
      alert(err?.message || 'Failed to remove admin');
    }
  };

  const handleResetPassword = async (email: string) => {
    try {
      const temp = await adminService.sendPasswordReset(params.id, email);
      setTempPassword(temp);
      setTempPasswordEmail(email);
    } catch (err: any) {
      setAdminsError(err?.message || 'Failed to reset password');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    if (!chapter) return;
    
    const { name, value, type } = e.target;
    setChapter(prev => ({
      ...prev!,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleMissionPointsChange = (value: string) => {
    if (!chapter) return;
    
    const points = value.split('\n').filter(point => point.trim() !== '');
    setChapter(prev => ({ ...prev!, mission_points: points }));
  };

  // Tabs editor helpers
  const ensureTabs = () => (chapter?.tabs && Array.isArray(chapter.tabs)) ? chapter.tabs : []

  const addTab = () => {
    if (!chapter) return
    const newTab: ChapterTab = { id: `tab-${Date.now()}`, name: 'New Tab', order: ensureTabs().length + 1, sections: [] }
    setChapter(prev => ({ ...prev!, tabs: [...ensureTabs(), newTab] }))
  }

  const updateTab = (idx: number, changes: Partial<ChapterTab>) => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    tabs[idx] = { ...tabs[idx], ...changes }
    setChapter(prev => ({ ...prev!, tabs }))
  }

  const deleteTab = (idx: number) => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    tabs.splice(idx, 1)
    // Reorder
    const reordered = tabs.map((t, i) => ({ ...t, order: i + 1 }))
    setChapter(prev => ({ ...prev!, tabs: reordered }))
  }

  const addSection = (tabIdx: number) => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    const sec: ChapterTabSection = { title: 'Section title', content: '' }
    tabs[tabIdx].sections = [...(tabs[tabIdx].sections || []), sec]
    setChapter(prev => ({ ...prev!, tabs }))
  }

  const insertSectionAt = (tabIdx: number, index: number) => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    const sec: ChapterTabSection = { title: 'Section title', content: '' }
    const arr = (tabs[tabIdx].sections || []).slice()
    const clamped = Math.max(0, Math.min(index, arr.length))
    arr.splice(clamped, 0, sec)
    tabs[tabIdx].sections = arr
    setChapter(prev => ({ ...prev!, tabs }))
  }

  const updateSection = (tabIdx: number, secIdx: number, changes: Partial<ChapterTabSection>) => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    const sections = (tabs[tabIdx].sections || []).slice()
    sections[secIdx] = { ...sections[secIdx], ...changes }
    tabs[tabIdx].sections = sections
    setChapter(prev => ({ ...prev!, tabs }))
  }

  const deleteSection = (tabIdx: number, secIdx: number) => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    const sections = (tabs[tabIdx].sections || []).slice()
    sections.splice(secIdx, 1)
    tabs[tabIdx].sections = sections
    setChapter(prev => ({ ...prev!, tabs }))
  }

  const moveSection = (tabIdx: number, secIdx: number, direction: 'up' | 'down') => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    const sections = (tabs[tabIdx].sections || []).slice()
    const target = direction === 'up' ? secIdx - 1 : secIdx + 1
    if (target < 0 || target >= sections.length) return
    const tmp = sections[secIdx]
    sections[secIdx] = sections[target]
    sections[target] = tmp
    tabs[tabIdx].sections = sections
    setChapter(prev => ({ ...prev!, tabs }))
  }

  const addButton = (tabIdx: number, secIdx: number) => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    const sections = (tabs[tabIdx].sections || []).slice()
    const btns = (sections[secIdx].buttons || []).slice()
    const btn: ChapterTabButton = { label: 'Button', url: '' }
    btns.push(btn)
    sections[secIdx].buttons = btns
    tabs[tabIdx].sections = sections
    setChapter(prev => ({ ...prev!, tabs }))
  }

  const insertButtonAt = (tabIdx: number, secIdx: number, index: number) => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    const sections = (tabs[tabIdx].sections || []).slice()
    const btns = (sections[secIdx].buttons || []).slice()
    const clamped = Math.max(0, Math.min(index, btns.length))
    btns.splice(clamped, 0, { label: 'Button', url: '' })
    sections[secIdx].buttons = btns
    tabs[tabIdx].sections = sections
    setChapter(prev => ({ ...prev!, tabs }))
  }

  const updateButton = (tabIdx: number, secIdx: number, btnIdx: number, changes: Partial<ChapterTabButton>) => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    const sections = (tabs[tabIdx].sections || []).slice()
    const btns = (sections[secIdx].buttons || []).slice()
    btns[btnIdx] = { ...btns[btnIdx], ...changes }
    sections[secIdx].buttons = btns
    tabs[tabIdx].sections = sections
    setChapter(prev => ({ ...prev!, tabs }))
  }

  const deleteButton = (tabIdx: number, secIdx: number, btnIdx: number) => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    const sections = (tabs[tabIdx].sections || []).slice()
    const btns = (sections[secIdx].buttons || []).slice()
    btns.splice(btnIdx, 1)
    sections[secIdx].buttons = btns
    tabs[tabIdx].sections = sections
    setChapter(prev => ({ ...prev!, tabs }))
  }

  const moveButton = (tabIdx: number, secIdx: number, btnIdx: number, direction: 'up' | 'down') => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    const sections = (tabs[tabIdx].sections || []).slice()
    const btns = (sections[secIdx].buttons || []).slice()
    const target = direction === 'up' ? btnIdx - 1 : btnIdx + 1
    if (target < 0 || target >= btns.length) return
    const tmp = btns[btnIdx]
    btns[btnIdx] = btns[target]
    btns[target] = tmp
    sections[secIdx].buttons = btns
    tabs[tabIdx].sections = sections
    setChapter(prev => ({ ...prev!, tabs }))
  }

  const moveTab = (idx: number, direction: 'up' | 'down') => {
    if (!chapter) return
    const tabs = ensureTabs().slice()
    const target = direction === 'up' ? idx - 1 : idx + 1
    if (target < 0 || target >= tabs.length) return
    const tmp = tabs[idx]
    tabs[idx] = tabs[target]
    tabs[target] = tmp
    const reordered = tabs.map((t, i) => ({ ...t, order: i + 1 }))
    setChapter(prev => ({ ...prev!, tabs: reordered }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapter) return;

    setSaving(true);
    try {
      const payload = { ...chapter, tabs: (chapter as any).tabs || [] } as Partial<Chapter>
      // Prefer service role admin API to avoid PostgREST 406/column errors and simplify RLS
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Not authenticated')
      const res = await fetch(`/api/admin/chapters/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to update chapter')
      alert('Chapter updated successfully!');
    } catch (error) {
      console.error('Error updating chapter:', error);
      alert('Failed to update chapter');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="bg-gray-50 min-h-screen py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003594] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading chapter...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !chapter) {
    return (
      <>
        <Header />
        <main className="bg-gray-50 min-h-screen py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Chapter Not Found</h1>
              <p className="text-gray-600 mb-4">{error || 'The requested chapter could not be found.'}</p>
              <button
                onClick={() => router.push('/admin/chapters')}
                className="bg-[#003594] text-white px-6 py-2 rounded-lg hover:bg-[#002d7a] transition-colors"
              >
                Back to Chapters
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Edit Chapter</h1>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-gray-600">Edit {chapter.name}</p>
              <button
                type="button"
                onClick={() => router.push(`/admin/events/new?chapterId=${params.id}`)}
                className="px-4 py-2 bg-[#00A7E1] text-white rounded-lg hover:bg-[#0c90c0] transition-colors"
              >
                Create Event for this Chapter
              </button>
            </div>
          </div>

          {/* Tabs Editor */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Custom Tabs</h2>
              <div className="flex gap-2">
                <button type="button" onClick={addTab} className="px-3 py-2 bg-[#003594] text-white rounded-lg hover:bg-[#002d7a]">Add Tab</button>
                <button
                  type="button"
                  onClick={async () => {
                    // Quick save for tabs without scrolling
                    if (!chapter) return
                    setSaving(true)
                    try {
                      const payload = { tabs: (chapter as any).tabs || [] } as Partial<Chapter>
                      const supabase = createClientComponentClient()
                      const { data: { session } } = await supabase.auth.getSession()
                      if (!session) throw new Error('Not authenticated')
                      const res = await fetch(`/api/admin/chapters/${params.id}`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` },
                        body: JSON.stringify(payload)
                      })
                      const json = await res.json().catch(() => ({}))
                      if (!res.ok) throw new Error(json.error || 'Failed to save tabs')
                      // Success toast
                      try {
                        const el = document.createElement('div')
                        el.textContent = 'Tabs saved'
                        el.className = 'fixed top-3 right-3 z-50 bg-green-600 text-white px-3 py-2 rounded shadow'
                        document.body.appendChild(el)
                        setTimeout(() => { try { document.body.removeChild(el) } catch {} }, 1500)
                      } catch {}
                    } catch (e) {
                      console.error(e)
                      alert('Failed to save tabs')
                    } finally {
                      setSaving(false)
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Save Tabs
                </button>
              </div>
            </div>
            {(ensureTabs()).length === 0 ? (
              <p className="text-gray-600">No tabs yet. Click "Add Tab" to create one.</p>
            ) : (
              <div className="space-y-6">
                {ensureTabs().map((tab, tIdx) => (
                  <div key={tab.id} className="border rounded-lg p-4">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mb-3">
                      <input
                        type="text"
                        value={tab.name}
                        onChange={(e) => updateTab(tIdx, { name: e.target.value })}
                        className="px-3 py-2 border border-gray-300 rounded-lg min-w-0 sm:col-span-7"
                      />
                      <input
                        type="number"
                        value={tab.order}
                        onChange={(e) => updateTab(tIdx, { order: Number(e.target.value || 0) })}
                        min={1}
                        step={1}
                        aria-label="Tab order"
                        title="Tab display order"
                        className="w-full sm:w-20 px-3 py-2 border border-gray-300 rounded-lg sm:col-span-1"
                      />
                      <div className="flex gap-1 flex-wrap justify-start sm:justify-center sm:col-span-2">
                        <button type="button" onClick={() => moveTab(tIdx, 'up')} className="px-2 py-2 border rounded">↑</button>
                        <button type="button" onClick={() => moveTab(tIdx, 'down')} className="px-2 py-2 border rounded">↓</button>
                      </div>
                      <button type="button" onClick={() => deleteTab(tIdx)} className="px-3 py-2 border border-red-300 text-red-700 rounded-lg sm:col-span-2 justify-self-end">Delete</button>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-gray-900">Sections</h3>
                      <button type="button" onClick={() => addSection(tIdx)} className="px-2 py-1 border rounded">Add Section</button>
                    </div>
                    {(tab.sections || []).length === 0 ? (
                      <p className="text-gray-600">No sections yet.</p>
                    ) : (
                      <div className="space-y-4">
                        {(tab.sections || []).map((sec, sIdx) => (
                          <div key={sIdx} className="rounded border p-3">
                            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 mb-2 items-center">
                              <input
                                type="text"
                                placeholder="Section title"
                                value={sec.title || ''}
                                onChange={(e) => updateSection(tIdx, sIdx, { title: e.target.value })}
                                className="px-3 py-2 border border-gray-300 rounded-lg min-w-0 sm:col-span-7"
                              />
                              <div className="flex gap-1 flex-wrap sm:col-span-3">
                                <button type="button" onClick={() => moveSection(tIdx, sIdx, 'up')} className="px-2 py-1 border rounded">↑</button>
                                <button type="button" onClick={() => moveSection(tIdx, sIdx, 'down')} className="px-2 py-1 border rounded">↓</button>
                                <button type="button" onClick={() => insertSectionAt(tIdx, sIdx + 1)} className="px-2 py-1 border rounded">+ Below</button>
                              </div>
                              <button type="button" onClick={() => deleteSection(tIdx, sIdx)} className="px-2 py-1 border border-red-300 text-red-700 rounded-lg sm:justify-self-end">Remove</button>
                            </div>
                            <textarea
                              rows={4}
                              placeholder="Section content (use blank line for paragraphs)"
                              value={sec.content || ''}
                              onChange={(e) => updateSection(tIdx, sIdx, { content: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3"
                            />
                            {/* Media inputs */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                              <div className="flex items-center gap-2">
                                <input
                                  type="url"
                                  placeholder="Image URL (optional)"
                                  value={sec.imageUrl || ''}
                                  onChange={(e) => updateSection(tIdx, sIdx, { imageUrl: e.target.value })}
                                  className="border rounded px-2 py-1 w-full"
                                />
                                <button
                                  type="button"
                                  onClick={async () => {
                                    try {
                                      const input = document.createElement('input')
                                      input.type = 'file'
                                      input.accept = 'image/*'
                                      input.onchange = async () => {
                                        const file = (input.files && input.files[0]) || null
                                        if (!file) return
                                        const supabase = createClientComponentClient()
                                        const { data: { session } } = await supabase.auth.getSession()
                                        const signRes = await fetch('/api/admin/upload/signed', {
                                          method: 'POST',
                                          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
                                          body: JSON.stringify({ folder: `chapters/${params.id}/images`, filename: file.name })
                                        })
                                        if (!signRes.ok) throw new Error('Failed to sign upload')
                                        const { path, signedUrl } = await signRes.json()
                                        const putRes = await fetch(signedUrl, { method: 'PUT', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file })
                                        if (!putRes.ok) throw new Error('Failed to upload image')
                                        const readRes = await fetch('/api/admin/upload/signed', {
                                          method: 'POST',
                                          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
                                          body: JSON.stringify({ action: 'sign-read', path })
                                        })
                                        const readJson = await readRes.json()
                                        const finalUrl = readJson.url || ''
                                        updateSection(tIdx, sIdx, { imageUrl: finalUrl })
                                      }
                                      input.click()
                                    } catch (e) {
                                      alert('Image upload failed')
                                    }
                                  }}
                                  className="px-3 py-2 border rounded"
                                >
                                  Upload…
                                </button>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  placeholder="Image alt text"
                                  value={sec.imageAlt || ''}
                                  onChange={(e) => updateSection(tIdx, sIdx, { imageAlt: e.target.value })}
                                  className="border rounded px-2 py-1"
                                />
                                <select
                                  value={(sec as any).imageSize || 'medium'}
                                  onChange={(e) => updateSection(tIdx, sIdx, { imageSize: e.target.value as any })}
                                  className="border rounded px-2 py-1"
                                  title="Image size"
                                >
                                  <option value="small">small</option>
                                  <option value="medium">medium</option>
                                  <option value="large">large</option>
                                </select>
                              </div>
                            </div>
                            <input
                              type="text"
                              placeholder="Image caption (optional)"
                              value={sec.imageCaption || ''}
                              onChange={(e) => updateSection(tIdx, sIdx, { imageCaption: e.target.value })}
                              className="border rounded px-2 py-1 w-full mb-3"
                            />
                            <div className="flex items-center gap-2 mb-3">
                              <input
                                type="url"
                                placeholder="Video URL (YouTube or MP4)"
                                value={sec.videoUrl || ''}
                                onChange={(e) => updateSection(tIdx, sIdx, { videoUrl: e.target.value })}
                                className="border rounded px-2 py-1 w-full"
                              />
                              <button
                                type="button"
                                onClick={async () => {
                                  try {
                                    const input = document.createElement('input')
                                    input.type = 'file'
                                    input.accept = 'video/*'
                                    input.onchange = async () => {
                                      const file = (input.files && input.files[0]) || null
                                      if (!file) return
                                      const supabase = createClientComponentClient()
                                      const { data: { session } } = await supabase.auth.getSession()
                                      const signRes = await fetch('/api/admin/upload/signed', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
                                        body: JSON.stringify({ folder: `chapters/${params.id}/videos`, filename: file.name })
                                      })
                                      if (!signRes.ok) throw new Error('Failed to sign upload')
                                      const { path, signedUrl } = await signRes.json()
                                      const putRes = await fetch(signedUrl, { method: 'PUT', headers: { 'Content-Type': file.type || 'video/mp4' }, body: file })
                                      if (!putRes.ok) throw new Error('Failed to upload video')
                                      const readRes = await fetch('/api/admin/upload/signed', {
                                        method: 'POST',
                                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
                                        body: JSON.stringify({ action: 'sign-read', path })
                                      })
                                      const readJson = await readRes.json()
                                      updateSection(tIdx, sIdx, { videoUrl: readJson.url || '' })
                                    }
                                    input.click()
                                  } catch (e) {
                                    alert('Video upload failed')
                                  }
                                }}
                                className="px-3 py-2 border rounded"
                              >
                                Upload/URL…
                              </button>
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="font-medium text-gray-900">Buttons</div>
                              <button type="button" onClick={() => addButton(tIdx, sIdx)} className="px-2 py-1 border rounded">Add Button</button>
                            </div>
                            <div className="space-y-2">
                              {(sec.buttons || []).map((btn, bIdx) => (
                                <div key={bIdx} className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
                                  <input
                                    type="text"
                                    placeholder="Label"
                                    value={btn.label}
                                    onChange={(e) => updateButton(tIdx, sIdx, bIdx, { label: e.target.value })}
                                    className="md:col-span-3 px-3 py-2 border border-gray-300 rounded-lg min-w-0"
                                  />
                                  <input
                                    type="url"
                                    placeholder="https://..."
                                    value={btn.url}
                                    onChange={(e) => updateButton(tIdx, sIdx, bIdx, { url: e.target.value })}
                                    className="md:col-span-6 px-3 py-2 border border-gray-300 rounded-lg min-w-0"
                                  />
                                  <select
                                    value={btn.style || 'primary'}
                                    onChange={(e) => updateButton(tIdx, sIdx, bIdx, { style: e.target.value as any })}
                                    className="md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg"
                                  >
                                    <option value="primary">primary</option>
                                    <option value="secondary">secondary</option>
                                    <option value="link">link</option>
                                  </select>
                                  <div className="md:col-span-1 flex gap-1 flex-wrap justify-end">
                                    <button type="button" onClick={() => moveButton(tIdx, sIdx, bIdx, 'up')} className="px-2 py-2 border rounded">↑</button>
                                    <button type="button" onClick={() => moveButton(tIdx, sIdx, bIdx, 'down')} className="px-2 py-2 border rounded">↓</button>
                                    <button type="button" onClick={() => insertButtonAt(tIdx, sIdx, bIdx + 1)} className="px-2 py-2 border rounded">+ </button>
                                    <button type="button" onClick={() => deleteButton(tIdx, sIdx, bIdx)} className="px-2 py-2 border border-red-300 text-red-700 rounded-lg">🗑</button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Chapter Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={chapter.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    required
                    value={chapter.slug}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={chapter.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    required
                    value={chapter.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="country_flag" className="block text-sm font-medium text-gray-700 mb-2">
                    Country Flag Emoji
                  </label>
                  <input
                    type="text"
                    id="country_flag"
                    name="country_flag"
                    value={chapter.country_flag || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                    Region *
                  </label>
                  <select
                    id="region"
                    name="region"
                    required
                    value={chapter.region}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  >
                    {regions.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={chapter.description || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Hero Section</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="tagline" className="block text-sm font-medium text-gray-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    id="tagline"
                    name="tagline"
                    value={chapter.tagline || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="hero_description" className="block text-sm font-medium text-gray-700 mb-2">
                    Hero Description
                  </label>
                  <textarea
                    id="hero_description"
                    name="hero_description"
                    rows={4}
                    value={chapter.hero_description || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="hero_highlight_title" className="block text-sm font-medium text-gray-700 mb-2">
                      Highlight Box Title
                    </label>
                    <input
                      type="text"
                      id="hero_highlight_title"
                      name="hero_highlight_title"
                      value={chapter.hero_highlight_title || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="hero_highlight_description" className="block text-sm font-medium text-gray-700 mb-2">
                      Highlight Box Description
                    </label>
                    <input
                      type="text"
                      id="hero_highlight_description"
                      name="hero_highlight_description"
                      value={chapter.hero_highlight_description || ''}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">About Section</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="about_content" className="block text-sm font-medium text-gray-700 mb-2">
                    About Content
                  </label>
                  <textarea
                    id="about_content"
                    name="about_content"
                    rows={6}
                    value={chapter.about_content || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="mission_points" className="block text-sm font-medium text-gray-700 mb-2">
                    Mission Points
                  </label>
                  <textarea
                    id="mission_points"
                    name="mission_points"
                    rows={4}
                    value={chapter.mission_points?.join('\n') || ''}
                    onChange={(e) => handleMissionPointsChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">Enter each mission point on a new line</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Contact & Social</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contact_email"
                    name="contact_email"
                    value={chapter.contact_email || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="website_url" className="block text-sm font-medium text-gray-700 mb-2">
                    Official Website
                  </label>
                  <input
                    type="url"
                    id="website_url"
                    name="website_url"
                    value={chapter.website_url || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="meetup_url" className="block text-sm font-medium text-gray-700 mb-2">
                    Meetup URL
                  </label>
                  <input
                    type="url"
                    id="meetup_url"
                    name="meetup_url"
                    value={chapter.meetup_url || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="linkedin_url" className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    id="linkedin_url"
                    name="linkedin_url"
                    value={chapter.linkedin_url || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="twitter_url" className="block text-sm font-medium text-gray-700 mb-2">
                    Twitter URL
                  </label>
                  <input
                    type="url"
                    id="twitter_url"
                    name="twitter_url"
                    value={chapter.twitter_url || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="facebook_url" className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    id="facebook_url"
                    name="facebook_url"
                    value={chapter.facebook_url || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="youtube_url" className="block text-sm font-medium text-gray-700 mb-2">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    id="youtube_url"
                    name="youtube_url"
                    value={chapter.youtube_url || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="content_status" className="block text-sm font-medium text-gray-700 mb-2">
                    Content Status
                  </label>
                  <select
                    id="content_status"
                    name="content_status"
                    value={chapter.content_status || 'draft'}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={chapter.is_active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#003594] focus:ring-[#003594] border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                    Chapter is active
                  </label>
                </div>
              </div>
            </div>

        {/* Chapter Events Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Chapter Events</h2>
            <button
              type="button"
              onClick={() => router.push(`/admin/events/new?chapterId=${params.id}`)}
              className="px-4 py-2 bg-[#003594] text-white rounded-lg hover:bg-[#002d7a] transition-colors"
            >
              Create Event for this Chapter
            </button>
          </div>

          {eventsLoading ? (
            <div className="text-gray-500">Loading events...</div>
          ) : chapterEvents.length === 0 ? (
            <div className="text-gray-500">No events yet.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {chapterEvents.map(ev => (
                <li key={ev.id} className="py-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => router.push(`/admin/events/${ev.id}/edit`)}
                    className="text-left"
                  >
                    <div className="text-sm font-medium text-gray-900 hover:underline">{ev.title}</div>
                    <div className="text-xs text-gray-500">{ev.month} {ev.date}, {ev.year} • {ev.location}</div>
                  </button>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={async () => {
                        const supabase = createClientComponentClient();
                        await supabase.from('events').delete().eq('id', ev.id)
                        fetchEvents()
                      }}
                      className="px-3 py-1 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Chapter Admins Management */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Chapter Admins</h2>

          <div className="flex gap-3 mb-6">
            <input
              type="email"
              placeholder="Admin email"
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => handleAddAdmin()}
              className="px-4 py-2 bg-[#003594] text-white rounded-lg hover:bg-[#002d7a] transition-colors"
            >
              Add
            </button>
          </div>

          {tempPassword && (
            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-sm text-blue-900">
                    Temporary password for <span className="font-semibold">{tempPasswordEmail}</span>
                  </div>
                  <div className="mt-1 font-mono text-base font-semibold text-blue-900 break-all">
                    {tempPassword}
                  </div>
                  <div className="mt-1 text-xs text-blue-800">
                    Share this password securely. The user should change it after first login.
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(tempPassword!);
                      } catch {}
                    }}
                    className="px-3 py-2 rounded-lg bg-white text-blue-700 border border-blue-300 hover:bg-blue-100"
                  >
                    Copy
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTempPassword(null); setTempPasswordEmail(null); }}
                    className="px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}

          {adminsLoading ? (
            <div className="text-gray-500">Loading admins...</div>
          ) : adminsError ? (
            <div className="text-red-600">{adminsError}</div>
          ) : admins.length === 0 ? (
            <div className="text-gray-500">No admins yet.</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {admins.map((a) => (
                <li key={a.id} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{a.email}</div>
                    <div className="text-xs text-gray-500">Added {new Date(a.created_at).toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleResetPassword(a.email)}
                      className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Reset Password
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveAdmin(a.id)}
                      className="px-3 py-1 border border-red-300 text-red-700 rounded-lg hover:bg-red-50"
                    >
                      Remove
                    </button>
                  </div>
                </li>) )}
            </ul>
          )}
        </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-[#003594] text-white rounded-lg hover:bg-[#002d7a] transition-colors disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
