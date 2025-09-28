'use client';

import { useEffect, useState } from 'react';
import { getChapterBySlug } from '@/lib/chapters';
import type { Chapter } from '@/lib/types';
import ChapterPageLayout from '@/components/ChapterPageLayout';

export default function ChapterDynamicPage({ params }: { params: { slug: string } }) {
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getChapterBySlug(params.slug);
        setChapter(data);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.slug]);

  if (loading) {
    return <div className="min-h-screen bg-white" />;
  }
  if (!chapter) {
    return <div className="min-h-screen bg-white" />;
  }

  return <ChapterPageLayout chapter={chapter} />;
}


