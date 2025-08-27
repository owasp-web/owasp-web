'use client';

import { useEffect, useState } from 'react';
import { getChapterBySlug } from '@/lib/chapters';
import { Chapter } from '@/lib/types';
import ChapterPageLayout from '@/components/ChapterPageLayout';

export default function LagosChapterPage() {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const chapterData = await getChapterBySlug('lagos');
        setChapter(chapterData);
      } catch (error) {
        console.error('Error fetching chapter:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChapter();
  }, []);

  if (loading) {
  return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#003594]"></div>
          <p className="mt-4 text-gray-600">Loading chapter information...</p>
              </div>
            </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Chapter Not Found</h1>
          <p className="text-gray-600">The requested chapter could not be found.</p>
            </div>
          </div>
  );
  }

  return <ChapterPageLayout chapter={chapter} />;
} 