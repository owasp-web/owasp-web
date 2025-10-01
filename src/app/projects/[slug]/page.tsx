export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation';
import ProjectDetailPageWithTabs from './page-with-tabs';
import { createServerComponentClient } from '@/lib/supabase'

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || ''
    const res = await fetch(`${base}/api/public/projects/${params.slug}`, { cache: 'no-store' })
    if (res.ok) {
      const json = await res.json()
      if (json?.project) {
        return <ProjectDetailPageWithTabs project={json.project as any} />
      }
    }
  } catch {
    // fall through to DB fallback
  }

  // Fallback: query Supabase directly to avoid 404s if API/envs are misconfigured
  try {
    const svc = createServerComponentClient()
    const { data } = await svc
      .from('projects')
      .select('*')
      .eq('slug', params.slug)
      .single()
    if (data) {
      return <ProjectDetailPageWithTabs project={data as any} />
    }
  } catch {}

  notFound()
}