--
-- PostgreSQL database dump
--

\restrict cA0KAIPcM9PFaRZmy6QssBd9gwOLU4CInbP8fyIJHKLxzsvQKHcdUD0KuypNfIF

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: chapters; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.chapters (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    name character varying(255) NOT NULL,
    slug character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    country character varying(100) NOT NULL,
    country_flag character varying(10),
    region character varying(50) NOT NULL,
    description text,
    tagline text,
    hero_description text,
    hero_highlight_title character varying(255),
    hero_highlight_description text,
    about_content text,
    mission_points jsonb DEFAULT '[]'::jsonb,
    focus_areas jsonb DEFAULT '[]'::jsonb,
    tech_ecosystem jsonb DEFAULT '[]'::jsonb,
    leadership_team jsonb DEFAULT '[]'::jsonb,
    events jsonb DEFAULT '[]'::jsonb,
    past_events jsonb DEFAULT '[]'::jsonb,
    next_event jsonb,
    contact_email character varying(255),
    website_url text,
    meetup_url text,
    linkedin_url text,
    twitter_url text,
    facebook_url text,
    youtube_url text,
    meeting_info text,
    meeting_schedule character varying(255),
    economic_impact jsonb,
    supporters jsonb DEFAULT '[]'::jsonb,
    partnerships jsonb DEFAULT '[]'::jsonb,
    is_active boolean DEFAULT true,
    content_status character varying(20) DEFAULT 'draft'::character varying,
    CONSTRAINT check_content_status CHECK (((content_status)::text = ANY ((ARRAY['draft'::character varying, 'published'::character varying, 'archived'::character varying])::text[]))),
    CONSTRAINT check_region CHECK (((region)::text = ANY ((ARRAY['Africa'::character varying, 'Asia'::character varying, 'Europe'::character varying, 'North America'::character varying, 'South America'::character varying, 'Central America'::character varying, 'Oceania'::character varying])::text[])))
);


--
-- Name: TABLE chapters; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON TABLE public.chapters IS 'OWASP chapters worldwide with rich content support';


--
-- Name: COLUMN chapters.mission_points; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.chapters.mission_points IS 'Array of mission statement bullet points';


--
-- Name: COLUMN chapters.focus_areas; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.chapters.focus_areas IS 'Array of focus area objects with icon, title, and description';


--
-- Name: COLUMN chapters.tech_ecosystem; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.chapters.tech_ecosystem IS 'Array of local tech companies and their details';


--
-- Name: COLUMN chapters.leadership_team; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.chapters.leadership_team IS 'Array of chapter leaders with names, roles, and contact info';


--
-- Name: COLUMN chapters.events; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.chapters.events IS 'Array of recent and upcoming events';


--
-- Name: COLUMN chapters.economic_impact; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.chapters.economic_impact IS 'Object containing economic impact metrics';


--
-- Name: events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.events (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    title text NOT NULL,
    date text NOT NULL,
    month text NOT NULL,
    year text NOT NULL,
    "time" text NOT NULL,
    location text NOT NULL,
    type text NOT NULL,
    image text NOT NULL,
    price text,
    registration_url text,
    description text,
    is_featured boolean DEFAULT false,
    status text DEFAULT 'draft'::text,
    CONSTRAINT events_month_check CHECK ((month = ANY (ARRAY['JAN'::text, 'FEB'::text, 'MAR'::text, 'APR'::text, 'MAY'::text, 'JUN'::text, 'JUL'::text, 'AUG'::text, 'SEP'::text, 'OCT'::text, 'NOV'::text, 'DEC'::text]))),
    CONSTRAINT events_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'published'::text, 'cancelled'::text]))),
    CONSTRAINT events_type_check CHECK ((type = ANY (ARRAY['Conference'::text, 'Chapter Meeting'::text, 'Training'::text, 'Workshop'::text])))
);


--
-- Name: projects; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.projects (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    title text NOT NULL,
    slug text NOT NULL,
    description text NOT NULL,
    long_description text,
    image text,
    category text NOT NULL,
    status text DEFAULT 'active'::text,
    project_url text,
    github_url text,
    is_featured boolean DEFAULT false,
    project_type text DEFAULT 'other'::text,
    website_url text,
    documentation_url text,
    language text,
    difficulty_level text DEFAULT 'intermediate'::text,
    license text,
    version text,
    downloads text,
    contributors integer,
    features text[],
    requirements text[],
    getting_started text[],
    tags text[],
    maintainers text[],
    github_stars integer,
    last_updated text,
    tab_main_content text,
    tab_translation_content text,
    tab_sponsors_content text,
    tab_data_content text,
    project_links jsonb,
    project_leaders jsonb,
    social_links jsonb,
    project_overview text,
    key_features text[],
    installation_guide text,
    usage_examples text,
    api_documentation text,
    security_considerations text,
    best_practices text,
    troubleshooting text,
    changelog text,
    roadmap text,
    community_guidelines text,
    contribution_guide text,
    tab_overview_content text,
    tab_documentation_content text,
    tab_downloads_content text,
    tab_community_content text,
    tab_contribute_content text,
    tab_support_content text,
    screenshots jsonb,
    videos jsonb,
    tutorials jsonb,
    case_studies jsonb,
    integrations jsonb,
    third_party_tools jsonb,
    download_count integer DEFAULT 0,
    active_installations integer DEFAULT 0,
    security_advisories jsonb,
    release_notes jsonb,
    meta_title text,
    meta_description text,
    meta_keywords text[],
    canonical_url text,
    related_projects text[],
    dependencies text[],
    dependents text[],
    industry_usage text[],
    compliance_standards text[],
    threat_categories text[],
    content_version text DEFAULT '1.0'::text,
    content_last_updated timestamp with time zone DEFAULT now(),
    content_reviewer text,
    content_status text DEFAULT 'draft'::text,
    tabs jsonb DEFAULT '[]'::jsonb,
    CONSTRAINT check_project_type CHECK (((project_type = ANY (ARRAY['flagship'::text, 'production'::text, 'other'::text])) OR (project_type IS NULL))),
    CONSTRAINT projects_content_status_check CHECK ((content_status = ANY (ARRAY['draft'::text, 'review'::text, 'published'::text, 'archived'::text]))),
    CONSTRAINT projects_status_check CHECK ((status = ANY (ARRAY['active'::text, 'inactive'::text, 'archived'::text])))
);


--
-- Name: COLUMN projects.tabs; Type: COMMENT; Schema: public; Owner: -
--

COMMENT ON COLUMN public.projects.tabs IS 'Custom project tabs with id, name, content, and order fields as JSONB array';


--
-- Name: chapters chapters_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_pkey PRIMARY KEY (id);


--
-- Name: chapters chapters_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.chapters
    ADD CONSTRAINT chapters_slug_key UNIQUE (slug);


--
-- Name: events events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT events_pkey PRIMARY KEY (id);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id);


--
-- Name: projects projects_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.projects
    ADD CONSTRAINT projects_slug_key UNIQUE (slug);


--
-- Name: idx_chapters_city; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chapters_city ON public.chapters USING btree (city);


--
-- Name: idx_chapters_content_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chapters_content_status ON public.chapters USING btree (content_status);


--
-- Name: idx_chapters_country; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chapters_country ON public.chapters USING btree (country);


--
-- Name: idx_chapters_is_active; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chapters_is_active ON public.chapters USING btree (is_active);


--
-- Name: idx_chapters_region; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chapters_region ON public.chapters USING btree (region);


--
-- Name: idx_chapters_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_chapters_slug ON public.chapters USING btree (slug);


--
-- Name: idx_events_created_at; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_events_created_at ON public.events USING btree (created_at);


--
-- Name: idx_events_is_featured; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_events_is_featured ON public.events USING btree (is_featured);


--
-- Name: idx_events_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_events_status ON public.events USING btree (status);


--
-- Name: idx_events_type; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_events_type ON public.events USING btree (type);


--
-- Name: idx_projects_category; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_category ON public.projects USING btree (category);


--
-- Name: idx_projects_category_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_category_status ON public.projects USING btree (category, status);


--
-- Name: idx_projects_content_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_content_status ON public.projects USING btree (content_status);


--
-- Name: idx_projects_is_featured; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_is_featured ON public.projects USING btree (is_featured);


--
-- Name: idx_projects_project_type_featured; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_project_type_featured ON public.projects USING btree (project_type, is_featured);


--
-- Name: idx_projects_related; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_related ON public.projects USING gin (related_projects);


--
-- Name: idx_projects_slug; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_slug ON public.projects USING btree (slug);


--
-- Name: idx_projects_status; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_status ON public.projects USING btree (status);


--
-- Name: idx_projects_tabs; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_tabs ON public.projects USING gin (tabs);


--
-- Name: idx_projects_tags; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_projects_tags ON public.projects USING gin (tags);


--
-- Name: chapters update_chapters_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_chapters_updated_at BEFORE UPDATE ON public.chapters FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: events update_events_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: projects update_projects_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: events Authenticated users can manage events; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can manage events" ON public.events USING ((auth.role() = 'authenticated'::text));


--
-- Name: projects Authenticated users can manage projects; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can manage projects" ON public.projects USING ((auth.role() = 'authenticated'::text));


--
-- Name: projects Public can view active projects; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view active projects" ON public.projects FOR SELECT USING ((status = 'active'::text));


--
-- Name: events Public can view published events; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view published events" ON public.events FOR SELECT USING ((status = 'published'::text));


--
-- Name: events; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

--
-- Name: projects; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--

\unrestrict cA0KAIPcM9PFaRZmy6QssBd9gwOLU4CInbP8fyIJHKLxzsvQKHcdUD0KuypNfIF

