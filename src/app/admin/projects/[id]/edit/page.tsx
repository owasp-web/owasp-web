'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProjectById } from '@/lib/projects';
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
      // Here you would implement the save functionality
      // For now, just simulate the save
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Project saved successfully!');
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overview Tab Content
                </label>
                <textarea
                  value={project.tab_overview_content || ''}
                  onChange={(e) => updateProject('tab_overview_content', e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Content for the Overview tab..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Documentation Tab Content
                </label>
                <textarea
                  value={project.tab_documentation_content || ''}
                  onChange={(e) => updateProject('tab_documentation_content', e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Content for the Documentation tab..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Downloads & Usage Tab Content
                </label>
                <textarea
                  value={project.tab_downloads_content || ''}
                  onChange={(e) => updateProject('tab_downloads_content', e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Content for the Downloads & Usage tab..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Community Tab Content
                </label>
                <textarea
                  value={project.tab_community_content || ''}
                  onChange={(e) => updateProject('tab_community_content', e.target.value)}
                  rows={6}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                  placeholder="Content for the Community tab..."
                />
              </div>
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