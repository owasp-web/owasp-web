import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/lib/projects';
import ProjectDetailPageWithTabs from './page-with-tabs';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Debug: Log the project data to see what we're getting
  console.log('Project data:', {
    title: project.title,
    slug: project.slug,
    hasCustomTabs: !!project.tabs,
    customTabsLength: project.tabs?.length || 0,
    customTabs: project.tabs,
    hasTabMain: !!project.tab_main_content,
    hasTabTranslation: !!project.tab_translation_content,
    hasTabSponsors: !!project.tab_sponsors_content,
    hasTabData: !!project.tab_data_content
  });

  return <ProjectDetailPageWithTabs project={project} />;
}