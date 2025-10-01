export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation';
import ProjectDetailPageWithTabs from './page-with-tabs';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || ''
    const res = await fetch(`${base}/api/public/projects/${params.slug}`, { cache: 'no-store' })
    if (!res.ok) throw new Error('not found')
    const json = await res.json()
    if (!json?.project) throw new Error('not found')
    return <ProjectDetailPageWithTabs project={json.project as any} />
  } catch {
    notFound()
  }
}