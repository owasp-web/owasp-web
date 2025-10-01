import { createClientComponentClient } from './supabase';
import { Chapter } from './types';

export interface ChaptersResponse {
  chapters: Chapter[];
  total: number;
}

export async function getChapters(options?: {
  region?: string;
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<ChaptersResponse> {
  try {
    const supabase = createClientComponentClient();
    let query = supabase
      .from('chapters')
      .select('*', { count: 'exact' })
      .eq('is_active', true);

    if (options?.region) query = query.eq('region', options.region);
    if (options?.search) query = query.or(`name.ilike.%${options.search}%,city.ilike.%${options.search}%,country.ilike.%${options.search}%`);
    if (options?.limit) query = query.range(options.offset || 0, (options.offset || 0) + options.limit - 1);

    const { data, error, count } = await query;
    if (error) throw error;
    return { chapters: (data as unknown as Chapter[]) || [], total: count || 0 };
  } catch (e) {
    console.warn('Failed to load chapters; returning empty list');
    return { chapters: [], total: 0 };
  }
}

export async function getChapterBySlug(slug: string): Promise<Chapter | null> {
  try {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();
    if (error) throw error;
    return data as unknown as Chapter;
  } catch {
    return null;
  }
}

export async function getChapterById(id: string): Promise<Chapter | null> {
  try {
    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw error;
    return data as unknown as Chapter;
  } catch {
    return null;
  }
}
