'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjects, type ProjectsResponse } from '@/lib/projects';
import { Project } from '@/lib/types';
import { createClientComponentClient } from '@/lib/supabase';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'flagship' | 'production' | 'other'>('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const router = useRouter();

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

  // Fetch projects
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const options: any = { limit: 50 };
        
        if (filterType !== 'all') {
          options.project_type = filterType;
        }
        
        if (filterCategory !== 'all') {
          options.category = filterCategory;
        }
        
        if (searchTerm) {
          options.search = searchTerm;
        }

        const response = await getProjects(options);
        setProjects(response.projects);
        setTotalCount(response.total);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [isAuthenticated, searchTerm, filterType, filterCategory]);

  const handleDeleteProject = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const supabase = createClientComponentClient();
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.filter(p => p.id !== projectId));
      setTotalCount(totalCount - 1);
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project');
    }
  };

  const handleToggleFeatured = async (projectId: string, currentFeatured: boolean) => {
    try {
      const supabase = createClientComponentClient();
      const { error } = await supabase
        .from('projects')
        .update({ is_featured: !currentFeatured })
        .eq('id', projectId);

      if (error) throw error;

      setProjects(projects.map(p => 
        p.id === projectId ? { ...p, is_featured: !currentFeatured } : p
      ));
    } catch (err) {
      console.error('Error updating project:', err);
      alert('Failed to update project');
    }
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003594] mx-auto mb-4"></div>
          <p className="text-[#757575]">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projects Management</h1>
              <p className="mt-2 text-gray-600">Manage OWASP projects ({totalCount} total)</p>
            </div>
            <Link href="/admin/projects/new">
              <button className="bg-[#003594] text-white px-6 py-3 rounded-lg hover:bg-[#002a73] transition-colors font-medium">
                Add New Project
              </button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
              />
            </div>

            {/* Project Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="flagship">Flagship</option>
                <option value="production">Production</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="Tool">Tool</option>
                <option value="Documentation">Documentation</option>
                <option value="Standards">Standards</option>
                <option value="Framework">Framework</option>
                <option value="Training">Training</option>
              </select>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Projects Table */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Featured
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {project.image && (
                          <div className="flex-shrink-0 h-10 w-10 mr-4">
                            <Image
                              src={project.image}
                              alt={project.title}
                              width={40}
                              height={40}
                              className="rounded-lg object-contain bg-gray-100 p-1"
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {project.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.project_type === 'flagship' 
                          ? 'bg-red-100 text-red-800'
                          : project.project_type === 'production'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.project_type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {project.category}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        project.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleFeatured(project.id, project.is_featured)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors ${
                          project.is_featured
                            ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {project.is_featured ? 'Featured' : 'Not Featured'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/projects/${project.slug}`}
                          target="_blank"
                          className="text-[#003594] hover:text-[#002a73] transition-colors"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/projects/${project.id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {projects.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg">No projects found</div>
              <p className="text-gray-400 mt-2">Try adjusting your search or filters</p>
            </div>
          )}
        </div>

        {/* Pagination could be added here if needed */}
      </div>
    </div>
  );
}