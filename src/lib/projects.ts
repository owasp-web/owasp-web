import { createClientComponentClient } from './supabase';
import { Project } from './types';

export interface ProjectsResponse {
  projects: Project[];
  total: number;
}

export async function getProjects(options?: {
  category?: string;
  project_type?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<ProjectsResponse> {
  try {
    const supabase = createClientComponentClient();
    let query = supabase
      .from('projects')
      .select('*', { count: 'exact' })
      .eq('status', 'active');

    if (options?.category) query = query.eq('category', options.category);
    if (options?.project_type) query = query.eq('project_type', options.project_type);
    if (options?.featured !== undefined) query = query.eq('is_featured', options.featured);
    if (options?.search) query = query.ilike('title', `%${options.search}%`);
    if (options?.limit) query = query.range(options.offset || 0, (options.offset || 0) + options.limit - 1);

    const { data, error, count } = await query;
    if (error) throw error;
    return { projects: (data as unknown as Project[]) || [], total: count || 0 };
  } catch (e) {
    console.warn('Failed to load projects from DB; returning empty list');
    return { projects: [], total: 0 };
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as unknown as Project;
  } catch {
    return null;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables not configured, returning mock data');
      return null; // No mock data, always hit Supabase
    }

    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        console.log(`No project found with slug: ${slug}`);
        return null;
      }
      console.error('Error fetching project by slug:', error);
      console.error('Slug searched:', slug);
      console.error('Error details:', JSON.stringify(error, null, 2));
      // Return mock data as fallback instead of throwing
      console.warn('Falling back to mock data due to database error');
      return null; // No mock data, always hit Supabase
    }

    return data as unknown as Project;
  } catch (error) {
    console.error('Error in getProjectBySlug:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    // Return mock data as fallback instead of throwing
    console.warn('Falling back to mock data due to database error');
    return null; // No mock data, always hit Supabase
  }
}

export async function getFlagshipProjects(): Promise<Project[]> {
  const response = await getProjects({ project_type: 'flagship', featured: true });
  return response.projects;
}

export async function getProductionProjects(): Promise<Project[]> {
  const response = await getProjects({ project_type: 'production' });
  return response.projects;
}

export async function getProjectsByCategory(category: string): Promise<Project[]> {
  const response = await getProjects({ category });
  return response.projects;
}

export async function searchProjects(query: string, limit: number = 20): Promise<Project[]> {
  const response = await getProjects({ search: query, limit });
  return response.projects;
}

// Helper function to get unique categories
export async function getProjectCategories(): Promise<string[]> {
  try {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('projects')
      .select('category')
      .eq('status', 'active');
    if (error) throw error;
    const categories = [...new Set(((data as any[]) || []).map((p: any) => p.category).filter(Boolean))];
    return categories.sort();
  } catch {
    return [];
  }
}

// Helper function to get project statistics
export async function getProjectStats(): Promise<{
  total: number;
  flagship: number;
  production: number;
  categories: number;
}> {
  try {
    const [totalResponse, flagshipResponse, productionResponse, categoriesResponse] = await Promise.all([
      getProjects(),
      getProjects({ project_type: 'flagship' }),
      getProjects({ project_type: 'production' }),
      getProjectCategories()
    ]);

    return {
      total: totalResponse.total,
      flagship: flagshipResponse.total,
      production: productionResponse.total,
      categories: categoriesResponse.length
    };
  } catch {
    return { total: 0, flagship: 0, production: 0, categories: 0 };
  }
}