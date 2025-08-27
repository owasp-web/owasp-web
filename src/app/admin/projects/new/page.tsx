'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@/lib/supabase';

interface ProjectFormData {
  title: string;
  slug: string;
  description: string;
  long_description: string;
  image: string;
  category: string;
  project_type: 'flagship' | 'production' | 'other';
  github_url: string;
  website_url: string;
  documentation_url: string;
  is_featured: boolean;
  language: string;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  license: string;
  version: string;
  downloads: string;
  contributors: number;
  features: string[];
  requirements: string[];
  getting_started: string[];
  tags: string[];
}

export default function NewProjectPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    slug: '',
    description: '',
    long_description: '',
    image: '',
    category: 'Tool',
    project_type: 'other',
    github_url: '',
    website_url: '',
    documentation_url: '',
    is_featured: false,
    language: '',
    difficulty_level: 'intermediate',
    license: 'Apache-2.0',
    version: '',
    downloads: '',
    contributors: 0,
    features: [''],
    requirements: [''],
    getting_started: [''],
    tags: ['']
  });

  // Check authentication
  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClientComponentClient();
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin');
        return;
      }
      setIsAuthenticated(true);
    };

    checkAuth();
  }, [router]);

  // Generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/owasp\s+/gi, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-+|-+$/g, ''); // Remove leading and trailing hyphens
  };

  const handleInputChange = (field: keyof ProjectFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-generate slug when title changes
    if (field === 'title') {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value)
      }));
    }
  };

  const handleArrayChange = (field: 'features' | 'requirements' | 'getting_started' | 'tags', index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field: 'features' | 'requirements' | 'getting_started' | 'tags') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field: 'features' | 'requirements' | 'getting_started' | 'tags', index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = createClientComponentClient();
      
      // Filter out empty strings from arrays
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim()),
        requirements: formData.requirements.filter(r => r.trim()),
        getting_started: formData.getting_started.filter(g => g.trim()),
        tags: formData.tags.filter(t => t.trim()),
        contributors: formData.contributors || null
      };

      const { error } = await supabase
        .from('projects')
        .insert([cleanedData]);

      if (error) throw error;

      router.push('/admin/projects');
    } catch (err: any) {
      console.error('Error creating project:', err);
      setError(err.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Project</h1>
          <p className="mt-2 text-gray-600">Create a new OWASP project entry</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  placeholder="OWASP Project Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  placeholder="project-name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                >
                  <option value="Tool">Tool</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Standards">Standards</option>
                  <option value="Framework">Framework</option>
                  <option value="Training">Training</option>
                  <option value="Testing">Testing</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
                <select
                  required
                  value={formData.project_type}
                  onChange={(e) => handleInputChange('project_type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                >
                  <option value="other">Other</option>
                  <option value="production">Production</option>
                  <option value="flagship">Flagship</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                <select
                  value={formData.difficulty_level}
                  onChange={(e) => handleInputChange('difficulty_level', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                <input
                  type="text"
                  value={formData.language}
                  onChange={(e) => handleInputChange('language', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  placeholder="Python, JavaScript, Documentation, etc."
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Short Description *</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                placeholder="Brief description of the project"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
              <textarea
                rows={5}
                value={formData.long_description}
                onChange={(e) => handleInputChange('long_description', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                placeholder="Detailed description of the project, its goals, and capabilities"
              />
            </div>

            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.is_featured}
                onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                className="h-4 w-4 text-[#003594] focus:ring-[#003594] border-gray-300 rounded"
              />
              <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                Featured Project
              </label>
            </div>
          </div>

          {/* URLs */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">URLs & Links</h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.github_url}
                  onChange={(e) => handleInputChange('github_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  placeholder="https://github.com/OWASP/project-name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website URL</label>
                <input
                  type="url"
                  value={formData.website_url}
                  onChange={(e) => handleInputChange('website_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  placeholder="https://owasp.org/www-project-name/"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Documentation URL</label>
                <input
                  type="url"
                  value={formData.documentation_url}
                  onChange={(e) => handleInputChange('documentation_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  placeholder="https://docs.example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  placeholder="/images/icons/project-name.png"
                />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Version</label>
                <input
                  type="text"
                  value={formData.version}
                  onChange={(e) => handleInputChange('version', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  placeholder="v1.0.0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Downloads</label>
                <input
                  type="text"
                  value={formData.downloads}
                  onChange={(e) => handleInputChange('downloads', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  placeholder="1M+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contributors</label>
                <input
                  type="number"
                  value={formData.contributors}
                  onChange={(e) => handleInputChange('contributors', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">License</label>
              <input
                type="text"
                value={formData.license}
                onChange={(e) => handleInputChange('license', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                placeholder="Apache-2.0"
              />
            </div>
          </div>

          {/* Arrays - Features, Requirements, etc. */}
          {(['features', 'requirements', 'getting_started', 'tags'] as const).map((field) => (
            <div key={field} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 capitalize">
                {field.replace('_', ' ')}
              </h2>
              
              {formData[field].map((item, index) => (
                <div key={index} className="flex items-center gap-2 mb-3">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(field, index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                    placeholder={`Add ${field.slice(0, -1)}...`}
                  />
                  <button
                    type="button"
                    onClick={() => removeArrayItem(field, index)}
                    className="px-3 py-2 text-red-600 hover:text-red-900 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                type="button"
                onClick={() => addArrayItem(field)}
                className="text-[#003594] hover:text-[#002a73] font-medium transition-colors"
              >
                + Add {field.slice(0, -1)}
              </button>
            </div>
          ))}

          {/* Submit */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.push('/admin/projects')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#003594] text-white rounded-lg hover:bg-[#002a73] transition-colors disabled:opacity-50 font-medium"
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}