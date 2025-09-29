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

  // Normalize hero from legacy aliases to ensure hero displays
  const proj: any = { ...data }
  if (!proj.image && (proj.hero_image || proj.image_url)) {
    proj.image = proj.hero_image || proj.image_url
  }
  return <ProjectDetailPageWithTabs project={proj as any} />;
}