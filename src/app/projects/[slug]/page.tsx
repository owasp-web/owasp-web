export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation';
import ProjectDetailPageWithTabs from './page-with-tabs';
import { createServerComponentClient } from '@/lib/supabase';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  // Server-side fetch to guarantee consistency on prod
  const svc = createServerComponentClient();
  const { data, error } = await svc
    .from('projects')
    .select('*')
    .eq('slug', params.slug)
    .eq('status', 'active')
    .single();

  if (error || !data) {
    notFound();
  }

  return <ProjectDetailPageWithTabs project={data as any} />;
}