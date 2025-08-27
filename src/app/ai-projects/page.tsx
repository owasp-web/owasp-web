'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import ResponsiveContainer from '@/components/ResponsiveContainer';
import { getProjects } from '@/lib/projects';
import { Project } from '@/lib/types';

interface AIProjectCardProps {
  project: Project;
}

const AIProjectCard = ({ project }: AIProjectCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="bg-gradient-to-r from-[#003594] to-[#0066cc] p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <div className="flex items-center space-x-2">
            {project.is_featured && (
              <span className="bg-yellow-400 text-[#003594] px-3 py-1 rounded-full text-sm font-semibold">
                Flagship
              </span>
            )}
            <Link 
              href={project.website_url || '#'}
              className="text-white hover:text-yellow-400 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </Link>
          </div>
        </div>
        <p className="text-blue-100 mb-4">{project.description}</p>
        <div className="flex items-center space-x-4 text-sm">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
            {project.contributors}+ Contributors
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {project.github_stars}+ Stars
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-[#003594] mb-3">Key Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {project.features?.slice(0, 6).map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="w-2 h-2 bg-[#003594] rounded-full mt-2 mr-2 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-[#003594] mb-3">Tags</h4>
          <div className="flex flex-wrap gap-2">
            {project.tags?.slice(0, 8).map((tag, index) => (
              <span 
                key={index}
                className="bg-blue-50 text-[#003594] px-3 py-1 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex space-x-3">
          <Link href={`/projects/${project.slug}`} className="flex-1">
            <Button text="View Details" variant="primary" size="48" />
          </Link>
          <Link 
            href={project.website_url || '#'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button text="Visit Project" variant="ghost-dark" size="48" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, description }: { title: string; value: string; description: string }) => (
  <div className="bg-white rounded-lg shadow-lg p-6 text-center">
    <h3 className="text-3xl font-bold text-[#003594] mb-2">{value}</h3>
    <h4 className="text-lg font-semibold text-gray-800 mb-2">{title}</h4>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

export default function AIProjectsPage() {
  const [aiProjects, setAiProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAIProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch AI-related projects
        const response = await getProjects({ 
          category: 'AI/ML Security',
          featured: true 
        });
        
        setAiProjects(response.projects);
      } catch (err) {
        console.error('Error fetching AI projects:', err);
        setError('Failed to load AI projects');
      } finally {
        setLoading(false);
      }
    };

    fetchAIProjects();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003594]"></div>
          <span className="ml-3 text-[#757575] text-lg">Loading AI projects...</span>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#003594] to-[#0066cc] text-white">
        <ResponsiveContainer>
          <div className="py-20 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              OWASP AI Security Projects
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto">
              Leading the future of AI security through comprehensive frameworks, practical guidance, 
              and community-driven standards for securing artificial intelligence systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#projects">
                <Button text="Explore Projects" variant="ghost-white" size="56" />
              </Link>
              <Link href="/projects">
                <Button text="All OWASP Projects" variant="ghost-white" size="56" />
              </Link>
            </div>
          </div>
        </ResponsiveContainer>
      </div>

      {/* Stats Section */}
      <ResponsiveContainer>
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatsCard
              title="AI Security Projects"
              value={aiProjects.length.toString()}
              description="Flagship projects leading AI security innovation"
            />
            <StatsCard
              title="Global Contributors"
              value="1000+"
              description="Security experts from around the world"
            />
            <StatsCard
              title="Industry Adoption"
              value="Enterprise"
              description="Trusted by Fortune 500 companies"
            />
          </div>
        </div>
      </ResponsiveContainer>

      {/* AI Security Landscape */}
      <div className="bg-white">
        <ResponsiveContainer>
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#003594] mb-4">
                The AI Security Landscape
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                As artificial intelligence transforms industries, OWASP leads the charge in developing 
                comprehensive security frameworks, practical guidance, and industry standards to protect 
                AI systems from emerging threats.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#003594] mb-6">Why AI Security Matters</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Emerging Threats</h4>
                      <p className="text-gray-600">AI systems face unique vulnerabilities from adversarial attacks, data poisoning, and model manipulation.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Regulatory Compliance</h4>
                      <p className="text-gray-600">Organizations need frameworks to comply with AI regulations like the EU AI Act and emerging standards.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Best Practices</h4>
                      <p className="text-gray-600">Industry needs practical, evidence-based guidance for implementing AI security throughout the development lifecycle.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-[#003594] mb-6">OWASP AI Security Impact</h3>
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">LLM Top 10 Framework</h4>
                    <p className="text-gray-600 text-sm">Industry-standard framework identifying the top 10 security risks for Large Language Models.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">AI Security Guide</h4>
                    <p className="text-gray-600 text-sm">200+ pages of comprehensive guidance for protecting AI and data-centric systems.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <h4 className="font-semibold text-gray-800 mb-2">Standards Contribution</h4>
                    <p className="text-gray-600 text-sm">Active contribution to ISO/IEC standards and EU AI Act implementation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResponsiveContainer>
      </div>

      {/* Projects Section */}
      <div className="bg-gray-50" id="projects">
        <ResponsiveContainer>
          <div className="py-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-[#003594] mb-4">
                Flagship AI Security Projects
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive initiatives driving the future of AI security through research, 
                standards development, and practical implementation guidance.
              </p>
            </div>

            {error ? (
              <div className="text-center text-red-600 bg-red-50 p-8 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Unable to Load Projects</h3>
                <p>{error}</p>
                <p className="mt-4 text-sm text-gray-600">
                  Please ensure the projects have been added to the database and try refreshing the page.
                </p>
              </div>
            ) : aiProjects.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {aiProjects.map((project) => (
                  <AIProjectCard key={project.id} project={project} />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 bg-white p-8 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">No AI Projects Found</h3>
                <p>AI security projects will appear here once they are added to the database.</p>
              </div>
            )}
          </div>
        </ResponsiveContainer>
      </div>

      {/* Call to Action */}
      <div className="bg-[#003594] text-white">
        <ResponsiveContainer>
          <div className="py-16 text-center">
            <h2 className="text-4xl font-bold mb-4">Join the AI Security Movement</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Help shape the future of AI security by contributing to OWASP projects, 
              participating in community discussions, and implementing best practices in your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join-community">
                <Button text="Join Community" variant="ghost-white" size="56" />
              </Link>
              <Link href="/projects">
                <Button text="Explore All Projects" variant="ghost-white" size="56" />
              </Link>
            </div>
          </div>
        </ResponsiveContainer>
      </div>

      <Footer />
    </div>
  );
}
