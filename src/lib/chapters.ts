import { createClientComponentClient } from './supabase';
import { Chapter } from './types';

// Mock data for when Supabase is not available
const mockChapters: Chapter[] = [
  {
    id: '1',
    created_at: '2024-01-01',
    name: 'OWASP Lagos',
    slug: 'lagos',
    city: 'Lagos',
    country: 'Nigeria',
    country_flag: '🇳🇬',
    region: 'Africa',
    description: 'Africa\'s economic powerhouse cybersecurity chapter',
    tagline: 'Securing Africa\'s economic powerhouse and protecting innovations that connect, finance, and empower hundreds of millions across Nigeria and the continent.',
    hero_description: 'Africa\'s economic powerhouse. OWASP Lagos secures the innovations flowing from Nigeria\'s financial capital, home to Flutterwave, Paystack, and the continent\'s most dynamic fintech ecosystem serving over 200 million people.',
    hero_highlight_title: '💰 Fintech Capital of Africa',
    hero_highlight_description: 'Protecting $100B+ in transactions across Nigeria\'s leading fintech companies',
    about_content: 'Lagos stands as Africa\'s undisputed economic powerhouse, home to over 20 million people and the continent\'s largest concentration of fintech companies, banks, and digital innovations. As Nigeria\'s commercial capital, Lagos drives technological advancement across West Africa and beyond.\n\nOWASP Lagos operates at the epicenter of African fintech innovation, working with industry leaders like Flutterwave, Paystack, and Interswitch to ensure that Nigeria\'s digital economy is built on unshakeable security foundations.',
    mission_points: [
      'Secure Nigeria\'s $100B+ fintech ecosystem',
      'Protect 200M+ users across payment platforms', 
      'Lead West African cybersecurity standards',
      'Support Africa\'s largest startup ecosystem',
      'Foster digital innovation with security-first practices'
    ],
    focus_areas: [
      {
        icon: '🏙️',
        title: 'Megacity Security',
        description: 'Protecting Africa\'s largest urban economy with 20M+ people and massive digital infrastructure'
      },
      {
        icon: '💰',
        title: 'Fintech Capital',
        description: 'Securing Nigeria\'s $100B+ fintech ecosystem and pan-African payment networks'
      },
      {
        icon: '🌍',
        title: 'West African Gateway',
        description: 'Leading cybersecurity initiatives across Nigeria, Ghana, Senegal, and the broader region'
      }
    ],
    tech_ecosystem: [
      {
        name: 'Flutterwave',
        sector: 'Fintech',
        description: 'Pan-African payment infrastructure',
        impact: '$150B+ processed'
      },
      {
        name: 'Paystack',
        sector: 'Fintech', 
        description: 'Payment processing for businesses',
        impact: 'Acquired by Stripe'
      }
    ],
    economic_impact: {
      people_protected: '20M+ people across Nigeria\'s largest urban economy',
      economy_secured: '$100B+ fintech ecosystem and payment networks',
      regional_influence: ['Nigeria', 'Ghana', 'Senegal', 'West Africa']
    },
    contact_email: 'lagos@owasp.org',
    meetup_url: 'https://www.meetup.com/owasp-lagos/',
    is_active: true
  },
  {
    id: '2',
    created_at: '2024-01-01',
    name: 'OWASP Tunisia',
    slug: 'tunisia',
    city: 'Tunis',
    country: 'Tunisia',
    country_flag: '🇹🇳',
    region: 'Africa',
    description: 'North Africa\'s cybersecurity excellence hub',
    tagline: 'Be part of North Africa\'s premier cybersecurity community. Join us in driving innovation, fostering collaboration, and shaping the future of regional cybersecurity.',
    hero_description: 'North Africa\'s cybersecurity excellence hub. OWASP Tunisia stands as a regional bridge between Africa and Europe, driving cutting-edge security research, government partnerships, and community-driven innovation across the MENA region.',
    hero_highlight_title: '🌉 Regional Bridge',
    hero_highlight_description: 'Connecting Africa and Europe through cybersecurity excellence and cross-border collaboration',
    about_content: 'The Open Worldwide Application Security Project (OWASP) is a nonprofit foundation that works to improve the security of software. All of our projects, tools, documents, forums, and chapters are free and open to anyone interested in improving application security.\n\nFollow chapter news on Facebook, LinkedIn, YouTube and Meetup. We schedule our meetings on the Meetup.',
    next_event: {
      title: 'Co-organizer: OWASP Algiers chapter!- I[OT]Security 25th October 2024 at 7pm UTC+1',
      date: '2024-10-25',
      time: '7pm UTC+1',
      description: 'Joint event with OWASP Algiers chapter focusing on IoT Security',
      event_type: 'upcoming'
    },
    events: [
      {
        title: 'GraphQL Vulnerabilities in the Wild: A Hands-On Workshop with OWASP TOP 10 Insights',
        date: '2024-09-05',
        time: '3pm UTC+1',
        speaker: 'Antoine Carossio, Co-founder & CTO of Escape',
        description: 'Workshop on GraphQL security vulnerabilities',
        event_type: 'recent'
      }
    ],
    leadership_team: [
      {
        name: 'Nihel Ben Youssef',
        role: 'Chapter Leader'
      },
      {
        name: 'Ahmed Amine Ben Souayeh',
        role: 'Chapter Leader'
      }
    ],
    contact_email: 'nihel.benyoussef@owasp.org',
    website_url: 'https://owasp.org/www-chapter-tunisia/',
    meetup_url: 'https://www.meetup.com/fr-FR/owasp-tunis-meetup-group/',
    linkedin_url: 'https://www.linkedin.com/company/owasp-tunisia/',
    facebook_url: 'https://www.facebook.com/OWASPTunisia/',
    youtube_url: 'https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA',
    is_active: true
  }
];

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
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables not configured, returning mock data');
      return getMockChapters(options);
    }

    const supabase = createClientComponentClient();
    let query = supabase
      .from('chapters')
      .select('*', { count: 'exact' })
      .eq('is_active', true);

    if (options?.region) {
      query = query.eq('region', options.region);
    }

    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,city.ilike.%${options.search}%,country.ilike.%${options.search}%`);
    }

    if (options?.limit) {
      query = query.range(options.offset || 0, (options.offset || 0) + options.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching chapters:', error);
      console.warn('Falling back to mock data due to database error');
      return getMockChapters(options);
    }

    return {
      chapters: (data as unknown as Chapter[]) || [],
      total: count || 0
    };
  } catch (error) {
    console.error('Error in getChapters:', error);
    console.warn('Falling back to mock data due to error');
    return getMockChapters(options);
  }
}

export async function getChapterBySlug(slug: string): Promise<Chapter | null> {
  try {
    const supabase = createClientComponentClient();
    
    console.log(`Fetching chapter with slug: ${slug}`);
    
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // No rows returned
        console.log(`No chapter found in database with slug: ${slug}, checking mock data`);
        return mockChapters.find(c => c.slug === slug) || null;
      }
      console.error('Database error fetching chapter by slug:', error);
      console.warn('Falling back to mock data due to database error');
      return mockChapters.find(c => c.slug === slug) || null;
    }

    console.log(`Successfully fetched chapter from database:`, data?.name);
    return data as unknown as Chapter;
  } catch (error) {
    console.error('Network/client error in getChapterBySlug:', error);
    console.warn('Falling back to mock data due to client error');
    return mockChapters.find(c => c.slug === slug) || null;
  }
}

export async function getChapterById(id: string): Promise<Chapter | null> {
  try {
    // Check if Supabase environment variables are available
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.warn('Supabase environment variables not configured, returning mock data');
      return mockChapters.find(c => c.id === id) || null;
    }

    const supabase = createClientComponentClient();
    const { data, error } = await supabase
      .from('chapters')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log(`No chapter found with id: ${id}`);
        return null;
      }
      console.error('Error fetching chapter by id:', error);
      console.warn('Falling back to mock data due to database error');
      return mockChapters.find(c => c.id === id) || null;
    }

    return data as unknown as Chapter;
  } catch (error) {
    console.error('Error in getChapterById:', error);
    console.warn('Falling back to mock data due to error');
    return mockChapters.find(c => c.id === id) || null;
  }
}

function getMockChapters(options?: {
  region?: string;
  limit?: number;
  offset?: number;
  search?: string;
}): ChaptersResponse {
  let filteredChapters = [...mockChapters];

  if (options?.region) {
    filteredChapters = filteredChapters.filter(c => c.region === options.region);
  }

  if (options?.search) {
    const searchLower = options.search.toLowerCase();
    filteredChapters = filteredChapters.filter(c =>
      c.name.toLowerCase().includes(searchLower) ||
      c.city.toLowerCase().includes(searchLower) ||
      c.country.toLowerCase().includes(searchLower)
    );
  }

  const offset = options?.offset || 0;
  const limit = options?.limit || filteredChapters.length;
  const paginatedChapters = filteredChapters.slice(offset, offset + limit);

  return {
    chapters: paginatedChapters,
    total: filteredChapters.length
  };
}
