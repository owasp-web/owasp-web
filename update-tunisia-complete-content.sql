-- Update Tunisia chapter with complete content from official OWASP site

UPDATE chapters SET
  -- Update basic information
  hero_description = 'North Africa''s cybersecurity excellence hub. OWASP Tunisia stands as a regional bridge between Africa and Europe, driving cutting-edge security research, government partnerships, and community-driven innovation across the MENA region.',
  hero_highlight_title = '🌉 Regional Bridge',
  hero_highlight_description = 'Connecting Africa and Europe through cybersecurity excellence and cross-border collaboration',
  
  -- Enhanced about content
  about_content = 'The Open Worldwide Application Security Project (OWASP) is a nonprofit foundation that works to improve the security of software. All of our projects, tools, documents, forums, and chapters are free and open to anyone interested in improving application security.

OWASP Tunisia has been actively driving cybersecurity awareness and education across North Africa since its establishment. Our chapter serves as a crucial bridge between African and European cybersecurity communities, fostering innovation and collaboration across the MENA region.

Follow chapter news on Facebook, LinkedIn, YouTube and Meetup. We schedule our meetings on the Meetup.',
  
  -- Set next event
  next_event = '{
    "title": "Co-organizer: OWASP Algiers chapter!- I[OT]Security 25th October 2024 at 7pm UTC+1",
    "date": "2024-10-25", 
    "time": "7pm UTC+1",
    "description": "Joint event with OWASP Algiers chapter focusing on IoT Security on OWASP Tunisia YouTube",
    "event_type": "upcoming"
  }'::jsonb,
  
  -- Recent events
  events = '[
    {
      "title": "GraphQL Vulnerabilities in the Wild: A Hands-On Workshop with OWASP TOP 10 Insights",
      "date": "2024-09-05",
      "time": "3pm UTC+1", 
      "speaker": "Antoine Carossio, Co-founder & CTO of Escape",
      "description": "Workshop on GraphQL security vulnerabilities",
      "event_type": "recent"
    }
  ]'::jsonb,
  
  -- Comprehensive past events from official OWASP site
  past_events = '[
    {
      "title": "AI: The New Attack Surface and Strategies for Securing It",
      "date": "2024-04-26",
      "time": "8pm UTC+1",
      "speaker": "Jeff Crume",
      "speaker_bio": "IBM Distinguished Engineer and Master Inventor with more than 40 years experience in the IT industry",
      "event_type": "past"
    },
    {
      "title": "Safeguarding your software supply chain: A deep Dive into SCA With OWASP Dependency Check", 
      "date": "2024-03-23",
      "time": "11h30 GMT+1",
      "speaker": "Aymen Touzi",
      "speaker_bio": "Cybersecurity and Devops Expert. Sofrecom Tunisia",
      "registration_url": "https://www.meetup.com/fr-FR/owasp-tunis-meetup-group/events/299907061/",
      "event_type": "past"
    },
    {
      "title": "Exploring LLM Vulnerabilities with OWASP TOP 10 for LLMs",
      "date": "2023-09-01", 
      "time": "7PM GMT+1",
      "speaker": "Alyssa Berriche",
      "speaker_bio": "Lead Cyber Threat Intelligence Analyst",
      "description": "Workshop on Large Language Model vulnerabilities",
      "event_type": "past"
    },
    {
      "title": "Code Red: Deciphering the Depths of Active Directory Security",
      "date": "2023-09-01",
      "time": "7PM GMT+1", 
      "speaker": "Foued saidi",
      "speaker_bio": "Technical Director @Securinets ISI Club. Top HacktheBox Tunisia, Top60 HacktheBox WorldWide",
      "description": "Advanced Active Directory security workshop",
      "event_type": "past"
    },
    {
      "title": "Small Coding Mistakes, Big Security Risks",
      "date": "2023-04-28",
      "time": "7PM GMT+1",
      "speaker": "Mohamed Adib Boukthir", 
      "video_url": "https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA",
      "event_type": "past"
    },
    {
      "title": "Securing Mobile Apps with the OWASP MASVS Standard. Our Journey to v2.0",
      "date": "2022-06-24",
      "speaker": "Carlos Holguera",
      "speaker_bio": "Mobile security research engineer working at NowSecure. Project Leader, OWASP Mobile Security Project",
      "description": "Workshop on mobile security with OWASP MASVS standard",
      "video_url": "https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA",
      "event_type": "past"
    },
    {
      "title": "All about OWASP and OWASP top 10 2021",
      "date": "2022-02-19",
      "speaker": "Vandana Verma",
      "speaker_bio": "OWASP Board of Directors Chair, OWASP Bangalore chapter leader, Security Leader at Snyk",
      "video_url": "https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA",
      "event_type": "past"
    },
    {
      "title": "OWASP Tunisia Chapter Local Meeting at NACS (National Agency of Computer Security)",
      "date": "2022-03-02", 
      "description": "Local chapter meeting with multiple speakers from National Agency of Computer Security",
      "video_url": "https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA",
      "event_type": "past"
    },
    {
      "title": "OWASP Tunisia Chapter Local Meeting at NACS - OWASP TOP 10 2021 Mapping",
      "date": "2021-10-20", 
      "description": "Meeting featuring Abdelkader Ben Ali on Mapping OWASP TOP 10 2021 TO ATT&CK, Ahmed Belkahla on APIs Business Logic Flaws, and Alyssa Berriche on Security Operations and Automation",
      "video_url": "https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA",
      "event_type": "past"
    },
    {
      "title": "Hands-On - Static Analysis Security Testing (SAST) in CI/CD",
      "date": "2021-05-20",
      "time": "8 PM UTC+1",
      "speaker": "Raouf Mnif",
      "speaker_bio": "DevOps Architect at Baaz. 10+ years experience in velocity, reliability, and quality with security focus. AWS, Docker, Kubernetes, and ArgoCD expert",
      "video_url": "https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA",
      "event_type": "past"
    },
    {
      "title": "OWASP SAMM2 - Your Dynamic Software Security Journey",
      "date": "2021-01-29",
      "time": "12pm CET",
      "speaker": "Sebastien Deleersnyder", 
      "speaker_bio": "Co-founder, CEO of Toreon, OWASP Belgium Chapter co-Leader, OWASP SAMM project co-leader. Started Belgian OWASP chapter and was OWASP Foundation Board member",
      "description": "Overview of SAMM model redesign, measurement model, and security practice streams for maturity assessment",
      "video_url": "https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA",
      "event_type": "past"
    },
    {
      "title": "Blockchain [for] Security",
      "date": "2020-12-05",
      "description": "Multi-speaker blockchain security event with Sami Bel Hadj (ODOO BHF/Blockchain professor), Damian Rusinek (SecuRing PhD researcher), and Alex Devassy (EY Security Analyst)",
      "video_url": "https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA",
      "event_type": "past"
    },
    {
      "title": "Hands-on on Secure Programming & Secure Coding Standards",
      "date": "2020-07-13",
      "speaker": "Azzedine RAMRAMI",
      "speaker_bio": "Senior Security & Network Architect-IBM Security. OWASP Morocco Chapter Leader, OWASP Appsec Africa President",
      "video_url": "https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA",
      "event_type": "past"
    },
    {
      "title": "Presentation of OWASP Foundation and OWASP Tunisia Chapter and Hands on Pwning with OWASP Juice Shop",
      "date": "2020-05-23",
      "speaker": "Wajih HAJJI",
      "speaker_bio": "OWASP member. Cybersecurity and Multi Cloud Management Engineer at Ditriot Consulting",
      "video_url": "https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA",
      "event_type": "past"
    }
  ]'::jsonb,
  
  -- Leadership team
  leadership_team = '[
    {
      "name": "Nihel Ben Youssef",
      "role": "Chapter Leader",
      "bio": "OWASP Tunisia Chapter Leader with extensive experience in cybersecurity and community building"
    },
    {
      "name": "Ahmed Amine Ben Souayeh", 
      "role": "Chapter Leader",
      "bio": "Co-leader of OWASP Tunisia Chapter, active in regional cybersecurity initiatives"
    }
  ]'::jsonb,
  
  -- Focus areas specific to Tunisia
  focus_areas = '[
    {
      "icon": "🌉",
      "title": "Regional Bridge",
      "description": "Connecting Africa and Europe through cybersecurity excellence and cross-border collaboration"
    },
    {
      "icon": "🎓",
      "title": "Education & Training",
      "description": "Leading cybersecurity education initiatives across North Africa and MENA region"
    },
    {
      "icon": "🏛️",
      "title": "Government Partnerships",
      "description": "Strong collaboration with National Agency of Computer Security (NACS) and government entities"
    },
    {
      "icon": "🔬",
      "title": "Research Excellence",
      "description": "Driving cutting-edge security research and innovation in emerging technologies"
    },
    {
      "icon": "🤝",
      "title": "Community Building",
      "description": "Fostering vibrant cybersecurity community across Tunisia and neighboring countries"
    },
    {
      "icon": "🌍",
      "title": "MENA Leadership",
      "description": "Leading cybersecurity initiatives across Middle East and North Africa region"
    }
  ]'::jsonb,
  
  -- Tech ecosystem (can be expanded with local companies)
  tech_ecosystem = '[
    {
      "name": "National Agency of Computer Security (NACS)",
      "sector": "Government",
      "description": "Tunisia''s national cybersecurity agency providing meeting venues and support",
      "impact": "National cybersecurity leadership"
    },
    {
      "name": "SecuriNets Foundation",
      "sector": "Education",
      "description": "Cybersecurity education and training organization",
      "impact": "Regional security training"
    },
    {
      "name": "Ernst & Young Tunisia",
      "sector": "Consulting",
      "description": "Professional services with strong cybersecurity practice",
      "impact": "Enterprise security consulting"
    }
  ]'::jsonb,
  
  -- Supporters including NACS
  supporters = '[
    {
      "name": "National Agency of Computer Security (NACS)",
      "type": "venue",
      "description": "Provides meeting space and supports chapter activities through official partnerships"
    },
    {
      "name": "SecuriNets Foundation",
      "type": "partner", 
      "description": "Collaborates on cybersecurity education and training initiatives"
    },
    {
      "name": "Various Universities",
      "type": "partner",
      "description": "Academic partnerships for cybersecurity education and research"
    }
  ]'::jsonb,
  
  -- Meeting information
  meeting_info = 'Our meetings are open to the public, and you do not need to be a member to attend. Please do consider joining OWASP if you find our community, projects, and meetings valuable, or sponsoring this chapter. We regularly collaborate with the National Agency of Computer Security and other local organizations.',
  
  -- Economic impact for Tunisia
  economic_impact = '{
    "people_protected": "Cybersecurity professionals and students across North Africa",
    "economy_secured": "Tunisia''s growing digital economy and government infrastructure", 
    "regional_influence": ["Tunisia", "Algeria", "Morocco", "MENA Region"],
    "training_impact": "Hundreds of professionals trained through workshops and events"
  }'::jsonb,
  
  updated_at = NOW()

WHERE slug = 'tunisia';
