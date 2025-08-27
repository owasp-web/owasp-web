-- Update Tunisia chapter with detailed events data to match existing content

UPDATE chapters SET
  next_event = '{
    "title": "Co-organizer: OWASP Algiers chapter!- I[OT]Security 25th October 2024 at 7pm UTC+1",
    "date": "2024-10-25", 
    "time": "7pm UTC+1",
    "description": "Joint event with OWASP Algiers chapter focusing on IoT Security",
    "event_type": "upcoming"
  }'::jsonb,
  
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
      "video_url": "#",
      "event_type": "past"
    },
    {
      "title": "Securing Mobile Apps with the OWASP MASVS Standard. Our Journey to v2.0",
      "date": "2022-06-15",
      "speaker": "Ahmed Abdallah",
      "speaker_bio": "Senior Solutions Architect and Cyber Security Consultant. OWASP Dubai Chapter Leader",
      "description": "Mobile security workshop with Carlos Holguera from NowSecure, Project Leader @OWASP Mobile Security Project",
      "registration_url": "https://www.meetup.com/fr-FR/owasp-tunis-meetup-group/events/286694349/",
      "event_type": "past"
    },
    {
      "title": "OWASP Tunisia Chapter Local Meeting at NACS (National Agency of Computer Security)",
      "date": "2021-10-20", 
      "description": "Local chapter meeting at National Agency of Computer Security",
      "video_url": "https://www.youtube.com/channel/UCkU5H4bHHsEZeFYdFJJjHBA",
      "event_type": "past"
    },
    {
      "title": "Hands-On - Static Analysis Security Testing (SAST) in CI/CD",
      "date": "2021-05-20",
      "time": "8 PM UTC+1",
      "speaker": "Raouf Mnif",
      "speaker_bio": "Devops Architect at Baaz. Spent 10 years developing the skills to increase velocity, reliability, and quality with a high focus on security. Good experience with AWS, Docker, Kubernetes, and ArgoCD",
      "event_type": "past"
    },
    {
      "title": "OWASP SAMM2 - Your Dynamic Software Security Journey",
      "date": "2021-01-29",
      "time": "12pm CET",
      "speaker": "Sebastien Deleersnyder", 
      "speaker_bio": "Co-founder, CEO of Toreon and a proponent of application security as a holistic endeavor. Started the Belgian OWASP chapter, was a member of the OWASP Foundation Board. Led OWASP projects such as OWASP SAMM.",
      "description": "Overview of the new release of the SAMM model. Covers the core structure of the model, measurement model, and security practice streams where SAMM activities are grouped in maturity levels.",
      "event_type": "past"
    },
    {
      "title": "Blockchain [for] Security",
      "date": "2020-12-05",
      "description": "Blockchain security workshop with multiple speakers covering blockchain as security infrastructure, penetration testing of blockchain solutions, and smart contract security",
      "event_type": "past"
    },
    {
      "title": "Hands-on on Secure Programming & Secure Coding Standards",
      "date": "2020-07-13",
      "description": "Workshop on secure programming practices and coding standards",
      "event_type": "past"
    }
  ]'::jsonb,
  
  leadership_team = '[
    {
      "name": "Nihel Ben Youssef",
      "role": "Chapter Leader"
    },
    {
      "name": "Ahmed Amine Ben Souayeh", 
      "role": "Chapter Leader"
    }
  ]'::jsonb,
  
  supporters = '[
    {
      "name": "National Agency of Computer Security (NACS)",
      "type": "venue",
      "description": "Provides meeting space and supports chapter activities"
    }
  ]'::jsonb,
  
  meeting_info = 'Our meetings are open to the public, and you do not need to be a member to attend. Please do consider joining OWASP if you find our community, projects, and meetings valuable, or sponsoring this chapter.',
  
  updated_at = NOW()

WHERE slug = 'tunisia';
