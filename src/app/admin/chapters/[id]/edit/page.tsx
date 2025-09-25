'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getChapterById } from '@/lib/chapters';
import { Chapter } from '@/lib/types';
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
      const supabase = createClientComponentClient();
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('chapter_id', params.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setChapterEvents((data as unknown as Event[]) || []);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapter) return;

    setSaving(true);
    try {
      await adminService.updateChapter(params.id, chapter);
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
                  <div>
                    <div className="text-sm font-medium text-gray-900">{ev.title}</div>
                    <div className="text-xs text-gray-500">{ev.month} {ev.date}, {ev.year} • {ev.location}</div>
                  </div>
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
