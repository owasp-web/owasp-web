'use client';

import { useEffect, useState } from 'react';
import { getChapterBySlug } from '@/lib/chapters';
import type { Chapter } from '@/lib/types';
import ChapterPageLayout from '@/components/ChapterPageLayout';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ChapterDynamicPage({ params }: { params: { slug: string } }) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getChapterBySlug(params.slug);
        if (!data) {
          setError('Chapter not found');
        }
        setChapter(data);
      } catch (err) {
        console.error('Error loading chapter:', err);
        setError('Failed to load chapter');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003594]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!chapter || error) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 mb-4">Chapter Not Found</h1>
          <p className="text-gray-600 mb-8">
            The chapter you're looking for doesn't exist or is not available.
          </p>
          <Link
            href="/chapters"
            className="inline-block px-6 py-3 bg-[#003594] text-white rounded-lg hover:bg-[#002d7a] transition-colors"
          >
            View All Chapters
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return <ChapterPageLayout chapter={chapter} />;
}


