import { createClientComponentClient } from './supabase';
import { Project } from './types';

// Mock data for when Supabase is not available
const mockProjects: Project[] = [
  {
    id: '1',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    title: 'OWASP Top 10',
    slug: 'owasp-top-10',
    description: 'The OWASP Top 10 is a standard awareness document for developers and web application security.',
    long_description: 'The OWASP Top 10 is a standard awareness document for developers and web application security. It represents a broad consensus about the most critical security risks to web applications.',
    image: '/images/icons/default-project.png',
    category: 'Standards',
    status: 'active',
    project_url: 'https://owasp.org/www-project-top-ten/',
    github_url: 'https://github.com/OWASP/Top10',
    website_url: 'https://owasp.org/www-project-top-ten/',
    documentation_url: 'https://owasp.org/www-project-top-ten/',
    is_featured: true,
    project_type: 'flagship',
    github_stars: 9000,
    last_updated: '2024-01-01',
    version: '2021',
    downloads: '1M+',
    contributors: 50,
    features: ['Standard awareness document', 'Global security framework', 'Industry benchmark'],
    requirements: ['Web application security knowledge', 'Basic security awareness'],
    getting_started: ['Read the Top 10 document', 'Understand security risks', 'Apply to your applications'],
    tags: ['security', 'web application', 'standards'],
    license: 'CC BY-SA 4.0',
    language: 'Documentation',
    maintainers: ['OWASP Foundation'],
    difficulty_level: 'intermediate'
  },
  {
    id: '2',
    created_at: '2024-01-01',
    updated_at: '2024-01-01',
    title: 'OWASP ASVS',
    slug: 'asvs',
    description: 'The OWASP Application Security Verification Standard (ASVS) provides a basis for testing web application technical security controls.',
    long_description: 'The OWASP Application Security Verification Standard (ASVS) provides a basis for testing web application technical security controls and also provides developers with a list of requirements for secure development.',
    image: '/images/icons/project-asvs.png',
    category: 'Standards',
    status: 'active',
    project_url: 'https://owasp.org/www-project-application-security-verification-standard/',
    github_url: 'https://github.com/OWASP/ASVS',
    website_url: 'https://owasp.org/www-project-application-security-verification-standard/',
    documentation_url: 'https://owasp.org/www-project-application-security-verification-standard/',
    is_featured: true,
    project_type: 'flagship',
    github_stars: 3100,
    last_updated: '2024-01-01',
    version: '5.0.0',
    downloads: '500K+',
    contributors: 78,
    features: ['Security verification standard', 'Testing framework', 'Developer guidelines'],
    requirements: ['Security testing knowledge', 'Application security understanding'],
    getting_started: ['Download ASVS document', 'Choose verification level', 'Apply controls'],
    tags: ['security', 'verification', 'testing', 'standards'],
    license: 'CC BY-SA 4.0',
    language: 'Documentation',
    maintainers: ['OWASP Foundation'],
    difficulty_level: 'intermediate'
  }
];

function getMockProjects(options?: {
  category?: string;
  project_type?: string;
  featured?: boolean;
  limit?: number;
  offset?: number;
  search?: string;
}): ProjectsResponse {
  let filteredProjects = [...mockProjects];

  // Apply filters
  if (options?.category) {
    filteredProjects = filteredProjects.filter(p => p.category === options.category);
  }
  
  if (options?.project_type) {
    filteredProjects = filteredProjects.filter(p => p.project_type === options.project_type);
  }
  
  if (options?.featured !== undefined) {
    filteredProjects = filteredProjects.filter(p => p.is_featured === options.featured);
  }
  
  if (options?.search) {
    const searchLower = options.search.toLowerCase();
    filteredProjects = filteredProjects.filter(p => 
      p.title.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower)
    );
  }

  // Apply pagination
  const offset = options?.offset || 0;
  const limit = options?.limit || filteredProjects.length;
  const paginatedProjects = filteredProjects.slice(offset, offset + limit);

  return {
    projects: paginatedProjects,
    total: filteredProjects.length
  };
}


// Project interface is imported from ./types

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
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables not configured, returning mock data');
      return getMockProjects(options);
    }

    const supabase = createClientComponentClient();
    let query = supabase
      .from('projects')
      .select('*', { count: 'exact' })
      .eq('status', 'active');

    // Apply filters
    if (options?.category) {
      query = query.eq('category', options.category);
    }

    if (options?.project_type) {
      query = query.eq('project_type', options.project_type);
    }

    if (options?.featured !== undefined) {
      query = query.eq('is_featured', options.featured);
    }

    if (options?.search) {
      query = query.or(`title.ilike.%${options.search}%,description.ilike.%${options.search}%`);
    }

    // Apply pagination
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    if (options?.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    // Order by featured first, then by title
    query = query.order('is_featured', { ascending: false })
                 .order('title', { ascending: true });

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching projects:', error);
      console.error('Error details:', JSON.stringify(error, null, 2));
      // Return mock data as fallback instead of throwing
      console.warn('Falling back to mock data due to database error');
      return getMockProjects(options);
    }

    return {
      projects: (data as unknown as Project[]) || [],
      total: count || 0
    };
  } catch (error) {
    console.error('Error in getProjects:', error);
    throw error;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables not configured, returning mock data');
      return mockProjects.find(p => p.id === id) || null;
    }

    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        console.log(`No project found with id: ${id}`);
        return null;
      }
      console.error('Error fetching project by id:', error);
      console.error('ID searched:', id);
      console.error('Error details:', JSON.stringify(error, null, 2));
      // Return mock data as fallback instead of throwing
      console.warn('Falling back to mock data due to database error');
      return mockProjects.find(p => p.id === id) || null;
    }

    return data as unknown as Project;
  } catch (error) {
    console.error('Error in getProjectById:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    // Return mock data as fallback instead of throwing
    console.warn('Falling back to mock data due to database error');
    return mockProjects.find(p => p.id === id) || null;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables not configured, returning mock data');
      return mockProjects.find(p => p.slug === slug) || null;
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
      return mockProjects.find(p => p.slug === slug) || null;
    }

    return data as unknown as Project;
  } catch (error) {
    console.error('Error in getProjectBySlug:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    // Return mock data as fallback instead of throwing
    console.warn('Falling back to mock data due to database error');
    return mockProjects.find(p => p.slug === slug) || null;
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
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables not configured, returning mock data');
      const categories = [...new Set(mockProjects.map(p => p.category))];
      return categories.sort();
    }

    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('projects')
      .select('category')
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }

    const categories = [...new Set((data as unknown as Project[])?.map(p => p.category) || [])];
    return categories.sort();
  } catch (error) {
    console.error('Error in getProjectCategories:', error);
    throw error;
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
  } catch (error) {
    console.error('Error in getProjectStats:', error);
    throw error;
  }
}