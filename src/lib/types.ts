export interface Event {
  id: string
  created_at: string
  title: string
  date: string
  month: string
  year: string
  time: string
  location: string
  type: 'Conference' | 'Chapter Meeting' | 'Training' | 'Workshop'
  image: string
  price?: string
  registration_url?: string
  description?: string
  is_featured: boolean
  status: 'draft' | 'published' | 'cancelled'
}

export interface Project {
  id: string
  created_at: string
  updated_at?: string
  title: string
  slug: string
  description: string
  long_description?: string
  image?: string
  category: string
  status: 'active' | 'inactive' | 'archived'
  project_url?: string
  github_url?: string
  website_url?: string
  documentation_url?: string
  is_featured: boolean
  project_type?: 'flagship' | 'production' | 'other'
  version?: string
  license?: string
  language?: string
  maintainers?: string[]
  difficulty_level?: 'beginner' | 'intermediate' | 'advanced'
  
  // Project overview and features
  project_overview?: string
  key_features?: string[]
  installation_guide?: string
  
  // Custom tabs - these will be the actual tab names from OWASP
  tabs?: ProjectTab[]
  
  // Media content
  screenshots?: ProjectScreenshot[]
  videos?: ProjectVideo[]
  tutorials?: ProjectTutorial[]
  case_studies?: ProjectCaseStudy[]
  
  // Metadata and SEO
  meta_title?: string
  meta_description?: string
  keywords?: string[]
  
  // Project relationships
  related_projects?: string[]
  project_links?: ProjectLink[]
  project_leaders?: ProjectLeader[]
  social_links?: SocialLink[]
  
  // Technical details
  requirements?: string[]
  integrations?: Integration[]
  security_advisories?: SecurityAdvisory[]
  compliance_standards?: string[]
  industry_usage?: string[]
  
  // Additional metadata
  contributors?: string | number
  github_stars?: number
  tags?: string[]
  content_status?: 'draft' | 'published' | 'archived'
  content_last_updated?: string
  
  // Legacy fields for backward compatibility
  last_updated?: string
  downloads?: string
  features?: string[]
  getting_started?: string[]
  
  // Legacy tab content fields for admin compatibility
  tab_overview_content?: string
  tab_main_content?: string
  tab_documentation_content?: string
  tab_downloads_content?: string
  tab_community_content?: string
  tab_contribute_content?: string
  tab_support_content?: string
  tab_translation_content?: string
  tab_sponsors_content?: string
  tab_data_content?: string
  
  // Additional legacy fields
  usage_examples?: string
  api_documentation?: string
  community_guidelines?: string
  contribution_guide?: string
  troubleshooting?: string
}

export interface ProjectTab {
  id: string
  name: string
  content: string
  order: number
}

export interface ProjectScreenshot {
  url: string
  caption?: string
  alt_text: string
}

export interface ProjectVideo {
  url: string
  title: string
  description?: string
  duration?: string
  thumbnail?: string
}

export interface ProjectTutorial {
  title: string
  url: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration?: string
}

export interface ProjectCaseStudy {
  title: string
  company: string
  summary: string
  url: string
}

export interface ProjectLink {
  title: string
  url: string
  category?: string
}

export interface ProjectLeader {
  name: string
  role?: string
  contact?: string
}

export interface SocialLink {
  platform: string
  url: string
}

export interface Integration {
  name: string
  url: string
  category: string
}

export interface SecurityAdvisory {
  title: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  date: string
  fixed_in_version?: string
}

export interface Chapter {
  id: string
  created_at: string
  updated_at?: string
  name: string
  slug: string
  city: string
  country: string
  country_flag?: string
  region: 'Africa' | 'Asia' | 'Europe' | 'North America' | 'South America' | 'Central America' | 'Oceania'
  description?: string
  tagline?: string
  hero_description?: string
  hero_highlight_title?: string
  hero_highlight_description?: string
  
  // Rich content sections
  about_content?: string
  mission_points?: string[]
  focus_areas?: ChapterFocusArea[]
  tech_ecosystem?: ChapterTechCompany[]
  leadership_team?: ChapterLeader[]
  events?: ChapterEvent[]
  past_events?: ChapterEvent[]
  
  // Contact and social
  contact_email?: string
  website_url?: string
  meetup_url?: string
  linkedin_url?: string
  twitter_url?: string
  facebook_url?: string
  youtube_url?: string
  
  // Meeting information
  meeting_info?: string
  meeting_schedule?: string
  next_event?: ChapterEvent
  
  // Administrative
  is_active: boolean
  content_status?: 'draft' | 'published' | 'archived'
  
  // Economic/Impact data
  economic_impact?: ChapterEconomicImpact
  
  // Supporters and partnerships
  supporters?: ChapterSupporter[]
  partnerships?: ChapterPartnership[]
}

export interface ChapterFocusArea {
  icon: string
  title: string
  description: string
}

export interface ChapterTechCompany {
  name: string
  sector: string
  description: string
  impact: string
}

export interface ChapterLeader {
  name: string
  role?: string
  bio?: string
  contact?: string
  image?: string
}

export interface ChapterEvent {
  title: string
  date: string
  time?: string
  description?: string
  speaker?: string
  speaker_bio?: string
  event_type: 'upcoming' | 'recent' | 'past'
  registration_url?: string
  video_url?: string
}

export interface ChapterEconomicImpact {
  people_protected?: string
  economy_secured?: string
  companies_served?: string
  regional_influence?: string[]
}

export interface ChapterSupporter {
  name: string
  type: 'venue' | 'sponsor' | 'partner'
  description?: string
  logo?: string
}

export interface ChapterPartnership {
  organization: string
  type: string
  description: string
}

export type EventFormData = Omit<Event, 'id' | 'created_at'>
export type ProjectFormData = Omit<Project, 'id' | 'created_at'>  
export type ChapterFormData = Omit<Chapter, 'id' | 'created_at'> 