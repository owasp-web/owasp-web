'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getChapters } from '@/lib/chapters';
import { Chapter } from '@/lib/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AdminChaptersPage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('');

  useEffect(() => {
    fetchChapters();
  }, []);

  const fetchChapters = async () => {
    try {
      setLoading(true);
      const response = await getChapters({
        search: searchTerm,
        region: regionFilter || undefined
      });
      setChapters(response.chapters);
    } catch (err) {
      setError('Failed to fetch chapters');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchChapters();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this chapter?')) {
      return;
    }

    try {
      // TODO: Implement delete functionality
      console.log('Delete chapter:', id);
      fetchChapters();
    } catch (err) {
      console.error('Error deleting chapter:', err);
      alert('Failed to delete chapter');
    }
  };

  const regions = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Central America', 'Oceania'];

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Manage Chapters</h1>
              <Link
                href="/admin/chapters/new"
                className="bg-[#003594] text-white px-6 py-2 rounded-lg hover:bg-[#002d7a] transition-colors"
              >
                Add New Chapter
              </Link>
            </div>
            <p className="mt-2 text-gray-600">Manage OWASP chapters worldwide</p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                  Search Chapters
                </label>
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by name, city, or country..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Region
                </label>
                <select
                  id="region"
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                >
                  <option value="">All Regions</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full bg-[#003594] text-white px-4 py-2 rounded-lg hover:bg-[#002d7a] transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Chapters List */}
          <div className="bg-white rounded-lg shadow">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003594] mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading chapters...</p>
              </div>
            ) : error ? (
              <div className="p-8 text-center text-red-600">
                <p>{error}</p>
                <button
                  onClick={fetchChapters}
                  className="mt-4 bg-[#003594] text-white px-4 py-2 rounded-lg hover:bg-[#002d7a] transition-colors"
                >
                  Retry
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Chapter
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Region
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {chapters.map((chapter) => (
                      <tr key={chapter.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {chapter.country_flag && (
                              <span className="text-2xl mr-3">{chapter.country_flag}</span>
                            )}
                            <div>
                              <div className="text-sm font-medium text-gray-900">{chapter.name}</div>
                              <div className="text-sm text-gray-500">{chapter.slug}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{chapter.city}</div>
                          <div className="text-sm text-gray-500">{chapter.country}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {chapter.region}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              chapter.is_active
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {chapter.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(chapter.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            <Link
                              href={`/chapters/${chapter.slug}`}
                              className="text-[#003594] hover:text-[#002d7a] text-sm"
                              target="_blank"
                            >
                              View
                            </Link>
                            <Link
                              href={`/admin/chapters/${chapter.id}/edit`}
                              className="text-[#003594] hover:text-[#002d7a] text-sm"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(chapter.id)}
                              className="text-red-600 hover:text-red-900 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {chapters.length === 0 && (
                  <div className="p-8 text-center text-gray-500">
                    <p>No chapters found.</p>
                    <Link
                      href="/admin/chapters/new"
                      className="mt-4 inline-block bg-[#003594] text-white px-6 py-2 rounded-lg hover:bg-[#002d7a] transition-colors"
                    >
                      Add First Chapter
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
