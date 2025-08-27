'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChapterFormData } from '@/lib/types';

export default function NewChapterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ChapterFormData>({
    name: '',
    slug: '',
    city: '',
    country: '',
    country_flag: '',
    region: 'Africa',
    description: '',
    tagline: '',
    hero_description: '',
    hero_highlight_title: '',
    hero_highlight_description: '',
    about_content: '',
    mission_points: [],
    contact_email: '',
    website_url: '',
    meetup_url: '',
    linkedin_url: '',
    twitter_url: '',
    facebook_url: '',
    youtube_url: '',
    meeting_info: '',
    meeting_schedule: '',
    is_active: true,
    content_status: 'draft'
  });

  const regions = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Central America', 'Oceania'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSlugGeneration = () => {
    const slug = formData.city.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  const handleMissionPointsChange = (value: string) => {
    const points = value.split('\n').filter(point => point.trim() !== '');
    setFormData(prev => ({ ...prev, mission_points: points }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // TODO: Implement chapter creation
      console.log('Creating chapter:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Chapter created successfully!');
      router.push('/admin/chapters');
    } catch (error) {
      console.error('Error creating chapter:', error);
      alert('Failed to create chapter');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Add New Chapter</h1>
            <p className="mt-2 text-gray-600">Create a new OWASP chapter</p>
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
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="OWASP Lagos"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="slug"
                      name="slug"
                      required
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="lagos"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-[#003594] focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={handleSlugGeneration}
                      className="px-4 py-2 bg-gray-200 border border-l-0 border-gray-300 rounded-r-lg hover:bg-gray-300 transition-colors"
                    >
                      Generate
                    </button>
                  </div>
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
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Lagos"
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
                    value={formData.country}
                    onChange={handleInputChange}
                    placeholder="Nigeria"
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
                    value={formData.country_flag}
                    onChange={handleInputChange}
                    placeholder="🇳🇬"
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
                    value={formData.region}
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
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Brief description of the chapter..."
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
                    value={formData.tagline}
                    onChange={handleInputChange}
                    placeholder="Regional cybersecurity excellence hub"
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
                    value={formData.hero_description}
                    onChange={handleInputChange}
                    placeholder="Detailed description for the hero section..."
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
                      value={formData.hero_highlight_title}
                      onChange={handleInputChange}
                      placeholder="💰 Fintech Capital of Africa"
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
                      value={formData.hero_highlight_description}
                      onChange={handleInputChange}
                      placeholder="Key impact or focus area description"
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
                    value={formData.about_content}
                    onChange={handleInputChange}
                    placeholder="Detailed information about the chapter, its location, and mission. Use double line breaks for paragraphs."
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
                    value={formData.mission_points?.join('\n') || ''}
                    onChange={(e) => handleMissionPointsChange(e.target.value)}
                    placeholder="Enter each mission point on a new line:&#10;Secure regional cybersecurity infrastructure&#10;Protect local businesses and users&#10;Lead regional cybersecurity standards"
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
                    value={formData.contact_email}
                    onChange={handleInputChange}
                    placeholder="chapter@owasp.org"
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
                    value={formData.website_url}
                    onChange={handleInputChange}
                    placeholder="https://owasp.org/www-chapter-city/"
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
                    value={formData.meetup_url}
                    onChange={handleInputChange}
                    placeholder="https://www.meetup.com/owasp-city/"
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
                    value={formData.linkedin_url}
                    onChange={handleInputChange}
                    placeholder="https://www.linkedin.com/company/owasp-city/"
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
                    value={formData.twitter_url}
                    onChange={handleInputChange}
                    placeholder="https://twitter.com/owasp_city"
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
                    value={formData.facebook_url}
                    onChange={handleInputChange}
                    placeholder="https://www.facebook.com/owasp.city"
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
                    value={formData.youtube_url}
                    onChange={handleInputChange}
                    placeholder="https://www.youtube.com/channel/UCxxxx"
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
                    value={formData.content_status}
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
                    checked={formData.is_active}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-[#003594] focus:ring-[#003594] border-gray-300 rounded"
                  />
                  <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                    Chapter is active
                  </label>
                </div>
              </div>
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
                disabled={loading}
                className="px-6 py-2 bg-[#003594] text-white rounded-lg hover:bg-[#002d7a] transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Chapter'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
