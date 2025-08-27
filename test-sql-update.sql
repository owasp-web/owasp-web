-- Simple test to verify SQL updates work
UPDATE projects SET 
    description = 'TEST: The OWASP Top 10 is a standard awareness document for developers and web application security. [UPDATED]'
WHERE slug = 'owasp-top-10';

-- Check if the update worked
SELECT title, description, LEFT(long_description, 100) as content_preview 
FROM projects 
WHERE slug = 'owasp-top-10';