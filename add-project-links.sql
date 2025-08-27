-- Add project_links field to store additional project-specific links
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS project_links JSONB;

-- Update OWASP Top 10 with the missing project links
UPDATE projects SET 
    project_links = '[
        {
            "title": "OWASP Top 10:2021",
            "url": "https://owasp.org/Top10/",
            "type": "document"
        },
        {
            "title": "Making of OWASP Top 10",
            "url": "https://owasp.org/www-project-top-ten/2021/Making_of_OWASP_Top_10_2021",
            "type": "documentation"
        },
        {
            "title": "OWASP Top 10:2021 - 20th Anniversary Presentation (PPTX)",
            "url": "https://github.com/OWASP/Top10/blob/master/2021/docs/OWASP%20Top%2010-2021%20-%2020th%20Anniversary%20Presentation.pptx",
            "type": "presentation"
        },
        {
            "title": "Previous Version (2017)",
            "url": "https://owasp.org/www-project-top-ten/2017/",
            "type": "document"
        }
    ]'::jsonb
WHERE slug = 'owasp-top-10';
