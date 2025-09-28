'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProjectById } from '@/lib/projects';
import { createClientComponentClient } from '@/lib/supabase';
import { Project } from '@/lib/types';

interface ProjectEditPageProps {
  params: {
    id: string;
  };
}

export default function ProjectEditPage({ params }: ProjectEditPageProps) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Try server API first (service role, super admin)
        const supabase = createClientComponentClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.access_token) {
          const res = await fetch(`/api/admin/projects/${params.id}`, { headers: { Authorization: `Bearer ${session.access_token}` } })
          if (res.ok) {
            const json = await res.json()
            setProject(json.project)
            return
          }
        }
        // Fallback to client fetch
        const projectData = await getProjectById(params.id);
        setProject(projectData);
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  const handleSave = async () => {
    if (!project) return;
    setSaving(true);
    try {
      const supabase = createClientComponentClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      // Ensure only valid columns are sent
      const { data: currentRow, error: selectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', project.id)
        .single();
      if (selectError) throw selectError;

      const allowedKeys = new Set(Object.keys(currentRow || {}));
      const sanitized: Record<string, any> = {};
      Object.entries(project).forEach(([k, v]) => {
        if (allowedKeys.has(k) && v !== undefined) sanitized[k] = v;
      });

      const { error } = await supabase
        .from('projects')
        .update(sanitized)
        .eq('id', project.id);
      if (error) throw error;
      alert('Project saved successfully.');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const updateProject = (field: keyof Project, value: any) => {
    if (!project) return;
    setProject({ ...project, [field]: value });
  };

  // Custom Tabs Editor helpers
  const ensureTabsArray = () => {
    if (!project) return;
    if (!Array.isArray((project as any).tabs)) {
      updateProject('tabs', [] as any);
    }
  };

  const addCustomTab = () => {
    if (!project) return;
    const nextOrder = ((project.tabs as any[])?.length || 0) + 1;
    const newTab: any = {
      id: `tab_${Date.now()}`,
      name: 'New Tab',
      order: nextOrder,
      content: JSON.stringify([{ title: 'Section', content: 'Add content here...', buttons: [] }])
    };
    updateProject('tabs', ([...(project.tabs as any[]) || [], newTab]) as any);
  };

  const removeCustomTab = (tabId: string) => {
    if (!project || !project.tabs) return;
    updateProject('tabs', (project.tabs as any[]).filter((t: any) => t.id === undefined || t.id !== tabId) as any);
  };

  const renameCustomTab = (tabId: string, name: string) => {
    if (!project || !project.tabs) return;
    updateProject('tabs', (project.tabs as any[]).map((t: any) => t.id === tabId ? { ...t, name } : t) as any);
  };

  const moveCustomTab = (tabId: string, delta: number) => {
    if (!project || !project.tabs) return;
    const tabs = [...(project.tabs as any[])];
    const idx = tabs.findIndex((t: any) => t.id === tabId);
    if (idx < 0) return;
    const swapIdx = idx + delta;
    if (swapIdx < 0 || swapIdx >= tabs.length) return;
    const tmp = tabs[idx];
    tabs[idx] = tabs[swapIdx];
    tabs[swapIdx] = tmp;
    tabs.forEach((t: any, i: number) => t.order = i + 1);
    updateProject('tabs', tabs as any);
  };

  const parseSections = (tab: any): any[] => {
    try {
      const parsed = JSON.parse(tab.content || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const writeSections = (tabId: string, sections: any[]) => {
    if (!project || !project.tabs) return;
    const content = JSON.stringify(sections);
    updateProject('tabs', (project.tabs as any[]).map((t: any) => t.id === tabId ? { ...t, content } : t) as any);
  };

  const addSection = (tabId: string) => {
    const tab = (project?.tabs as any[])?.find((t: any) => t.id === tabId);
    if (!tab) return;
    const sections = parseSections(tab);
    sections.push({ title: 'New Section', content: 'Describe this section...', imageUrl: '', imageAlt: '', imageCaption: '', videoUrl: '', links: [], buttons: [] });
    writeSections(tabId, sections);
  };

  const removeSection = (tabId: string, index: number) => {
    const tab = (project?.tabs as any[])?.find((t: any) => t.id === tabId);
    if (!tab) return;
    const sections = parseSections(tab);
    sections.splice(index, 1);
    writeSections(tabId, sections);
  };

  const updateSection = (tabId: string, index: number, key: 'title' | 'content' | 'imageUrl' | 'imageAlt' | 'imageCaption' | 'videoUrl', value: string) => {
    const tab = (project?.tabs as any[])?.find((t: any) => t.id === tabId);
    if (!tab) return;
    const sections = parseSections(tab);
    sections[index] = { ...(sections[index] || {}), [key]: value };
    writeSections(tabId, sections);
  };

  const addButton = (tabId: string, sectionIndex: number) => {
    const tab = (project?.tabs as any[])?.find((t: any) => t.id === tabId);
    if (!tab) return;
    const sections = parseSections(tab);
    const buttons = Array.isArray(sections[sectionIndex]?.buttons) ? sections[sectionIndex].buttons : [];
    buttons.push({ label: 'Learn More', url: 'https://example.com', style: 'primary' });
    sections[sectionIndex] = { ...(sections[sectionIndex] || {}), buttons };
    writeSections(tabId, sections);
  };

  // Project admins state for this page
  const [projAdmins, setProjAdmins] = useState<Array<{ id: string; email: string; user_id: string | null; created_at: string }>>([])
  const [projAdminsLoading, setProjAdminsLoading] = useState<boolean>(false)
  const [projAdminsError, setProjAdminsError] = useState<string | null>(null)
  const [newProjAdminEmail, setNewProjAdminEmail] = useState<string>('')

  const fetchProjectAdmins = async () => {
    try {
      setProjAdminsLoading(true)
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(`/api/admin/projects/${project!.id}/admins`, { headers: { Authorization: `Bearer ${session?.access_token || ''}` } })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to load project admins')
      const json = await res.json()
      setProjAdmins((json.admins as any[]) || [])
    } catch (e: any) {
      setProjAdminsError(e?.message || 'Failed to load project admins')
    } finally {
      setProjAdminsLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'admins' && project?.id) fetchProjectAdmins()
  }, [activeTab, project?.id])

  const handleAddProjectAdmin = async () => {
    if (!newProjAdminEmail.trim()) return
    try {
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(`/api/admin/projects/${project!.id}/admins`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
        body: JSON.stringify({ email: newProjAdminEmail.trim() })
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      setNewProjAdminEmail('')
      fetchProjectAdmins()
    } catch (e: any) {
      setProjAdminsError(e?.message || 'Failed to add admin')
    }
  }

  const handleRemoveProjectAdmin = async (admin: { id?: string; email?: string }) => {
    if (!confirm('Remove this project admin?')) return
    try {
      const supabase = createClientComponentClient()
      const { data: { session } } = await supabase.auth.getSession()
      const res = await fetch(`/api/admin/projects/${project!.id}/admins`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${session?.access_token || ''}` },
        body: JSON.stringify({ id: admin.id, email: admin.email })
      })
      if (!res.ok) throw new Error((await res.json()).error || 'Failed')
      fetchProjectAdmins()
    } catch (e: any) {
      setProjAdminsError(e?.message || 'Failed to remove admin')
    }
  }

  // Links management per section
  const addLink = (tabId: string, sectionIndex: number) => {
    const tab = (project?.tabs as any[])?.find((t: any) => t.id === tabId);
    if (!tab) return;
    const sections = parseSections(tab);
    const links = Array.isArray(sections[sectionIndex]?.links) ? sections[sectionIndex].links : [];
    links.push({ title: 'Official Site', url: 'https://example.com' });
    sections[sectionIndex] = { ...(sections[sectionIndex] || {}), links };
    writeSections(tabId, sections);
  };

  const updateLink = (tabId: string, sectionIndex: number, linkIndex: number, key: 'title' | 'url', value: string) => {
    const tab = (project?.tabs as any[])?.find((t: any) => t.id === tabId);
    if (!tab) return;
    const sections = parseSections(tab);
    const links = Array.isArray(sections[sectionIndex]?.links) ? sections[sectionIndex].links : [];
    if (!links[linkIndex]) return;
    (links[linkIndex] as any)[key] = value;
    sections[sectionIndex] = { ...(sections[sectionIndex] || {}), links };
    writeSections(tabId, sections);
  };

  const removeLink = (tabId: string, sectionIndex: number, linkIndex: number) => {
    const tab = (project?.tabs as any[])?.find((t: any) => t.id === tabId);
    if (!tab) return;
    const sections = parseSections(tab);
    const links = Array.isArray(sections[sectionIndex]?.links) ? sections[sectionIndex].links : [];
    links.splice(linkIndex, 1);
    sections[sectionIndex] = { ...(sections[sectionIndex] || {}), links };
    writeSections(tabId, sections);
  };

  const updateButton = (tabId: string, sectionIndex: number, buttonIndex: number, key: 'label' | 'url' | 'style', value: string) => {
    const tab = (project?.tabs as any[])?.find((t: any) => t.id === tabId);
    if (!tab) return;
    const sections = parseSections(tab);
    const buttons = Array.isArray(sections[sectionIndex]?.buttons) ? sections[sectionIndex].buttons : [];
    if (!buttons[buttonIndex]) return;
    (buttons[buttonIndex] as any)[key] = value;
    sections[sectionIndex] = { ...(sections[sectionIndex] || {}), buttons };
    writeSections(tabId, sections);
  };

  const removeButton = (tabId: string, sectionIndex: number, buttonIndex: number) => {
    const tab = (project?.tabs as any[])?.find((t: any) => t.id === tabId);
    if (!tab) return;
    const sections = parseSections(tab);
    const buttons = Array.isArray(sections[sectionIndex]?.buttons) ? sections[sectionIndex].buttons : [];
    buttons.splice(buttonIndex, 1);
    sections[sectionIndex] = { ...(sections[sectionIndex] || {}), buttons };
    writeSections(tabId, sections);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003594] mx-auto mb-4"></div>
            <p>Loading project...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
            <button 
              onClick={() => router.push('/admin/projects')}
              className="bg-[#003594] text-white px-4 py-2 rounded hover:bg-[#0056b3]"
            >
              Back to Projects
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'content', label: 'Tab Content' },
    { id: 'admins', label: 'Admins' },
    { id: 'resources', label: 'Resources' },
    { id: 'metadata', label: 'Metadata' },
    { id: 'relationships', label: 'Relationships' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
              <p className="text-gray-600 mt-1">{project.title}</p>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => router.push('/admin/projects')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-[#003594] text-white rounded-md hover:bg-[#0056b3] disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-[#003594] text-[#003594]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={project.title}
                  onChange={(e) => updateProject('title', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={project.description}
                  onChange={(e) => updateProject('description', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Overview
                </label>
                <textarea
                  value={project.project_overview || ''}
                  onChange={(e) => updateProject('project_overview', e.target.value)}
                  rows={10}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Comprehensive project overview with markdown support..."
                />
              </div>

              {/* Hero / Preview Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Image URL (used in hero and previews)
                </label>
                <input
                  type="url"
                  value={project.image || ''}
                  onChange={(e) => updateProject('image', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="https://.../logo-or-hero-image.png"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Optional. When provided, it appears in the project hero next to details and as a thumbnail in listings.
                  If left blank, the page uses the default dark blue gradient background.
                </p>
                {project.image && (
                  <div className="mt-3">
                    <div className="relative h-40 w-40 border rounded bg-gray-50 overflow-hidden">
                      {/* Use img for external URLs */}
                      <img src={project.image} alt="Preview" className="object-contain w-full h-full" />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={project.category}
                    onChange={(e) => updateProject('category', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="Tool">Tool</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Standards">Standards</option>
                    <option value="Framework">Framework</option>
                    <option value="Guide">Guide</option>
                    <option value="Training">Training</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Type
                  </label>
                  <select
                    value={project.project_type}
                    onChange={(e) => updateProject('project_type', e.target.value as 'flagship' | 'production' | 'other')}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                  >
                    <option value="flagship">Flagship</option>
                    <option value="production">Production</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Custom Tabs</h3>
                <button onClick={() => { ensureTabsArray(); addCustomTab(); }} className="px-3 py-2 bg-[#003594] text-white rounded-md hover:bg-[#0056b3]">Add Tab</button>
              </div>

              <p className="text-sm text-gray-600">Each tab’s content is a list of sections with optional buttons. Buttons appear as styled links on the project page.</p>

              {(project.tabs as any[])?.length ? (
                <div className="space-y-6">
                  {(project.tabs as any[]).sort((a, b) => a.order - b.order).map((tab: any) => {
                    const sections = parseSections(tab);
                    return (
                      <div key={tab.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <input value={tab.name} onChange={(e) => renameCustomTab(tab.id, e.target.value)} className="border rounded px-2 py-1" />
                            <span className="text-xs text-gray-500">order {tab.order}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button onClick={() => moveCustomTab(tab.id, -1)} className="px-2 py-1 border rounded">↑</button>
                            <button onClick={() => moveCustomTab(tab.id, 1)} className="px-2 py-1 border rounded">↓</button>
                            <button onClick={() => removeCustomTab(tab.id)} className="px-2 py-1 border rounded text-red-600">Delete</button>
                          </div>
                        </div>

                        <div className="space-y-4">
                          {sections.map((section, idx) => (
                            <div key={idx} className="bg-gray-50 border rounded p-3">
                              <div className="flex items-center justify-between mb-2">
                                <input
                                  value={section.title || ''}
                                  onChange={(e) => updateSection(tab.id, idx, 'title', e.target.value)}
                                  placeholder="Section title"
                                  className="border rounded px-2 py-1 w-1/2"
                                />
                                <button onClick={() => removeSection(tab.id, idx)} className="px-2 py-1 border rounded text-red-600">Remove</button>
                              </div>
                              <textarea
                                value={section.content || ''}
                                onChange={(e) => updateSection(tab.id, idx, 'content', e.target.value)}
                                rows={4}
                                className="w-full border rounded px-2 py-1"
                                placeholder="Section content (supports URLs, OWASP A01..A10, [YOUTUBE]...[/YOUTUBE])"
                              />

                              {/* Media inputs */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-3">
                                <input value={section.imageUrl || ''} onChange={(e) => updateSection(tab.id, idx, 'imageUrl', e.target.value)} placeholder="Image URL (optional)" className="border rounded px-2 py-1" />
                                <input value={section.imageAlt || ''} onChange={(e) => updateSection(tab.id, idx, 'imageAlt', e.target.value)} placeholder="Image alt text" className="border rounded px-2 py-1" />
                              </div>
                              <input value={section.imageCaption || ''} onChange={(e) => updateSection(tab.id, idx, 'imageCaption', e.target.value)} placeholder="Image caption (optional)" className="border rounded px-2 py-1 w-full mt-2" />
                              <input value={section.videoUrl || ''} onChange={(e) => updateSection(tab.id, idx, 'videoUrl', e.target.value)} placeholder="Video URL (YouTube or MP4)" className="border rounded px-2 py-1 w-full mt-2" />

                              <div className="mt-3">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">Buttons</h4>
                                  <button onClick={() => addButton(tab.id, idx)} className="px-2 py-1 border rounded">Add Button</button>
                                </div>
                                <div className="space-y-2">
                                  {(section.buttons || []).map((btn: any, bIdx: number) => (
                                    <div key={bIdx} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                      <input value={btn.label || ''} onChange={(e) => updateButton(tab.id, idx, bIdx, 'label', e.target.value)} placeholder="Label" className="border rounded px-2 py-1" />
                                      <input value={btn.url || ''} onChange={(e) => updateButton(tab.id, idx, bIdx, 'url', e.target.value)} placeholder="https://..." className="border rounded px-2 py-1" />
                                      <div className="flex items-center gap-2">
                                        <select value={btn.style || 'primary'} onChange={(e) => updateButton(tab.id, idx, bIdx, 'style', e.target.value)} className="border rounded px-2 py-1">
                                          <option value="primary">primary</option>
                                          <option value="secondary">secondary</option>
                                          <option value="link">link</option>
                                        </select>
                                        <button onClick={() => removeButton(tab.id, idx, bIdx)} className="px-2 py-1 border rounded text-red-600">Remove</button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Links */}
                              <div className="mt-3">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium">Links</h4>
                                  <button onClick={() => addLink(tab.id, idx)} className="px-2 py-1 border rounded">Add Link</button>
                                </div>
                                <div className="space-y-2">
                                  {(section.links || []).map((lnk: any, lIdx: number) => (
                                    <div key={lIdx} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                      <input value={lnk.title || ''} onChange={(e) => updateLink(tab.id, idx, lIdx, 'title', e.target.value)} placeholder="Title" className="border rounded px-2 py-1" />
                                      <input value={lnk.url || ''} onChange={(e) => updateLink(tab.id, idx, lIdx, 'url', e.target.value)} placeholder="https://..." className="border rounded px-2 py-1" />
                                      <div className="flex items-center">
                                        <button onClick={() => removeLink(tab.id, idx, lIdx)} className="px-2 py-1 border rounded text-red-600">Remove</button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}

                          <button onClick={() => addSection(tab.id)} className="px-3 py-2 border rounded">Add Section</button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-sm text-gray-600">No custom tabs yet. Click “Add Tab”.</div>
              )}
            </div>
          )}

          {activeTab === 'admins' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Project Admins</h3>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="admin@example.com"
                    value={newProjAdminEmail}
                    onChange={(e) => setNewProjAdminEmail(e.target.value)}
                    className="border rounded px-3 py-2"
                  />
                  <button onClick={handleAddProjectAdmin} className="px-3 py-2 bg-[#003594] text-white rounded-md hover:bg-[#0056b3]">
                    Add Admin
                  </button>
                </div>
              </div>
              {projAdminsError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded">{projAdminsError}</div>
              )}
              <div className="border rounded-lg">
                <div className="grid grid-cols-3 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
                  <div>Email</div>
                  <div>User ID</div>
                  <div className="text-right">Actions</div>
                </div>
                {projAdminsLoading ? (
                  <div className="px-4 py-3 text-sm text-gray-600">Loading…</div>
                ) : (
                  <div>
                    {projAdmins.length === 0 && (
                      <div className="px-4 py-3 text-sm text-gray-600">No admins yet.</div>
                    )}
                    {projAdmins.map((a) => (
                      <div key={a.id} className="grid grid-cols-3 px-4 py-2 border-t text-sm items-center">
                        <div className="truncate">{a.email}</div>
                        <div className="truncate text-gray-600">{a.user_id || '—'}</div>
                        <div className="text-right">
                          <button onClick={() => handleRemoveProjectAdmin({ id: a.id, email: a.email })} className="text-red-600 hover:text-red-800">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">Admins can edit this project via RLS. Super admins can always edit.</p>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Installation Guide
                </label>
                <textarea
                  value={project.installation_guide || ''}
                  onChange={(e) => updateProject('installation_guide', e.target.value)}
                  rows={8}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Step-by-step installation instructions..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Usage Examples
                </label>
                <textarea
                  value={project.usage_examples || ''}
                  onChange={(e) => updateProject('usage_examples', e.target.value)}
                  rows={8}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Code examples and usage scenarios..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Troubleshooting
                </label>
                <textarea
                  value={project.troubleshooting || ''}
                  onChange={(e) => updateProject('troubleshooting', e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Common issues and solutions..."
                />
              </div>
            </div>
          )}

          {activeTab === 'metadata' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  value={project.meta_title || ''}
                  onChange={(e) => updateProject('meta_title', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="SEO title for search engines..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  value={project.meta_description || ''}
                  onChange={(e) => updateProject('meta_description', e.target.value)}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="SEO description for search engines..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content Status
                </label>
                <select
                  value={project.content_status || 'draft'}
                  onChange={(e) => updateProject('content_status', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="draft">Draft</option>
                  <option value="review">Under Review</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'relationships' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Related Projects (comma-separated slugs)
                </label>
                <input
                  type="text"
                  value={project.related_projects?.join(', ') || ''}
                  onChange={(e) => updateProject('related_projects', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="project-slug-1, project-slug-2, project-slug-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry Usage (comma-separated)
                </label>
                <input
                  type="text"
                  value={project.industry_usage?.join(', ') || ''}
                  onChange={(e) => updateProject('industry_usage', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Finance, Healthcare, Government"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Compliance Standards (comma-separated)
                </label>
                <input
                  type="text"
                  value={project.compliance_standards?.join(', ') || ''}
                  onChange={(e) => updateProject('compliance_standards', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="OWASP Top 10, NIST, ISO 27001"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}