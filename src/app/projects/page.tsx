'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import Search from '@/components/Search';
import ProjectsHero from '@/components/ProjectsHero';
import PoweringOpenSourceSection from '@/components/PoweringOpenSourceSection';
import WhoShouldStartSection from '@/components/WhoShouldStartSection';
import SDLCMappingSection from '@/components/SDLCMappingSection';
import ProjectInventorySection from '@/components/ProjectInventorySection';
import FinalCTASection from '@/components/FinalCTASection';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProjects } from '@/lib/projects';
import { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const getProjectTypeColor = (type: string) => {
    switch (type) {
      case 'flagship':
        return 'bg-[#dc3545] text-white';
      case 'production':
        return 'bg-[#28a745] text-white';
      default:
        return 'bg-[#6c757d] text-white';
    }
  };

  const getCategoryFromType = (category: string) => {
    // Map category to type
    if (['Code', 'Tool', 'Framework', 'Testing', 'Security', 'Vulnerability Management', 'Web Application Security', 'Mobile Security', 'API Security', 'Cloud Security', 'DevSecOps', 'Authentication', 'Authorization', 'Cryptography', 'Threat Modeling', 'Asset Discovery', 'Penetration Testing', 'Static Analysis', 'Dynamic Analysis'].includes(category)) {
      return 'Code Projects';
    }
    if (['Documentation', 'Standards', 'Guide', 'Training'].includes(category)) {
      return 'Documentation Projects';
    }
    return 'Other Projects';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-wrap gap-2 mb-4">
        {project.project_type && (
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getProjectTypeColor(project.project_type)}`}>
            {project.project_type.charAt(0).toUpperCase() + project.project_type.slice(1)}
          </span>
        )}
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {getCategoryFromType(project.category)}
        </span>
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
          {project.category}
        </span>
      </div>
      
      <h3 className="font-['Barlow'] font-bold text-[#101820] text-lg mb-3">
        <Link href={`/projects/${project.slug}`} className="hover:text-[#003594] transition-colors">
          {project.title}
        </Link>
      </h3>
      
      <p className="font-['Poppins'] text-[#757575] text-sm leading-relaxed mb-4 line-clamp-3">
        {project.description}
      </p>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags?.slice(0, 3).map((tag, index) => (
          <span key={index} className="px-2 py-1 bg-gray-50 text-gray-700 rounded text-xs">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500">
          {project.language && (
            <span className="mr-4">
              <span className="font-medium">Language:</span> {project.language}
            </span>
          )}
          {project.contributors && (
            <span>
              <span className="font-medium">Contributors:</span> {project.contributors}
            </span>
          )}
        </div>
        
        <div className="flex gap-2">
          {project.github_url && (
            <a 
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#003594] hover:text-[#0056b3] text-sm underline"
            >
              GitHub
            </a>
          )}
          {project.website_url && (
            <a 
              href={project.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#003594] hover:text-[#0056b3] text-sm underline"
            >
              Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function AllProjectsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'level' | 'type'>('all');
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'flagship' | 'production'>('all');
  const [selectedType, setSelectedType] = useState<'all' | 'code' | 'documentation' | 'other'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProjects, setTotalProjects] = useState(0);
  const projectsPerPage = 24;

  useEffect(() => {
    const view = searchParams.get('view') || 'all';
    const level = searchParams.get('level') || 'all';
    const type = searchParams.get('type') || 'all';
    
    setFilterType(view as 'all' | 'level' | 'type');
    setSelectedLevel(level as 'all' | 'flagship' | 'production');
    setSelectedType(type as 'all' | 'code' | 'documentation' | 'other');
  }, [searchParams]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const offset = (currentPage - 1) * projectsPerPage;
        
        let projectTypeFilter: string | undefined;
        if (filterType === 'level' && selectedLevel !== 'all') {
          projectTypeFilter = selectedLevel;
        }

        const response = await getProjects({
          limit: projectsPerPage,
          offset: offset,
          project_type: projectTypeFilter,
          search: searchQuery || undefined,
        });
        
        setProjects(response.projects);
        setTotalProjects(response.total);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [searchQuery, currentPage, filterType, selectedLevel, selectedType]);

  const getCategoryFromType = (category: string) => {
    if (['Code', 'Tool', 'Framework', 'Testing', 'Security', 'Vulnerability Management', 'Web Application Security', 'Mobile Security', 'API Security', 'Cloud Security', 'DevSecOps', 'Authentication', 'Authorization', 'Cryptography', 'Threat Modeling', 'Asset Discovery', 'Penetration Testing', 'Static Analysis', 'Dynamic Analysis'].includes(category)) {
      return 'code';
    }
    if (['Documentation', 'Standards', 'Guide', 'Training'].includes(category)) {
      return 'documentation';
    }
    return 'other';
  };

  const filteredProjects = projects.filter(project => {
    if (filterType === 'level') {
      if (selectedLevel !== 'all' && project.project_type !== selectedLevel) {
        return false;
      }
    } else if (filterType === 'type') {
      if (selectedType !== 'all') {
        const projectTypeCategory = getCategoryFromType(project.category);
        if (projectTypeCategory !== selectedType) {
          return false;
        }
      }
    }
    return true;
  });

  const updateURL = (params: Record<string, string>) => {
    const url = new URL(window.location.href);
    Object.entries(params).forEach(([key, value]) => {
      if (value === 'all') {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    router.push(`${pathname}?${url.searchParams.toString()}`);
  };

  const flagshipProjects = filteredProjects.filter(p => p.project_type === 'flagship');
  const productionProjects = filteredProjects.filter(p => p.project_type === 'production');
  const codeProjects = filteredProjects.filter(p => getCategoryFromType(p.category) === 'code');
  const documentationProjects = filteredProjects.filter(p => getCategoryFromType(p.category) === 'documentation');
  const otherProjects = filteredProjects.filter(p => getCategoryFromType(p.category) === 'other');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1a237e] via-[#303f9f] to-[#42a5f5] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="font-['Barlow'] font-bold text-white text-[32px] sm:text-[40px] lg:text-[48px] leading-tight tracking-[-0.96px] mb-6">
              OWASP Project Inventory ({totalProjects})
            </h1>
            <p className="font-['Poppins'] text-white/90 text-lg leading-relaxed max-w-3xl mx-auto mb-8">
              All OWASP tools, document, and code library projects are organized into the following categories
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
                <Image
                  src="/images/icons/search.svg"
                  alt="Search"
                  width={20}
                  height={20}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/70"
                />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => updateURL({ view: 'all' })}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'all' 
                    ? 'bg-white text-[#003594]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => updateURL({ view: 'level' })}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'level' 
                    ? 'bg-white text-[#003594]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                By Level
              </button>
              <button
                onClick={() => updateURL({ view: 'type' })}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  filterType === 'type' 
                    ? 'bg-white text-[#003594]' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                By Type
              </button>
            </div>

            {/* Level Filters */}
            {filterType === 'level' && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => updateURL({ view: 'level', level: 'all' })}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === 'all' 
                      ? 'bg-white text-[#003594]' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  All Levels
                </button>
                <button
                  onClick={() => updateURL({ view: 'level', level: 'flagship' })}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === 'flagship' 
                      ? 'bg-white text-[#003594]' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Flagship ({flagshipProjects.length})
                </button>
                <button
                  onClick={() => updateURL({ view: 'level', level: 'production' })}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedLevel === 'production' 
                      ? 'bg-white text-[#003594]' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Production ({productionProjects.length})
                </button>
              </div>
            )}

            {/* Type Filters */}
            {filterType === 'type' && (
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => updateURL({ view: 'type', type: 'all' })}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === 'all' 
                      ? 'bg-white text-[#003594]' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  All Types
                </button>
                <button
                  onClick={() => updateURL({ view: 'type', type: 'code' })}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === 'code' 
                      ? 'bg-white text-[#003594]' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Code Projects ({codeProjects.length})
                </button>
                <button
                  onClick={() => updateURL({ view: 'type', type: 'documentation' })}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === 'documentation' 
                      ? 'bg-white text-[#003594]' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Documentation ({documentationProjects.length})
                </button>
                <button
                  onClick={() => updateURL({ view: 'type', type: 'other' })}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedType === 'other' 
                      ? 'bg-white text-[#003594]' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  Other ({otherProjects.length})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Projects Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003594] mx-auto mb-4"></div>
            <p className="text-[#757575]">Loading projects...</p>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#757575] text-lg">No projects found matching your criteria.</p>
          </div>
        ) : (
          <>
            {filterType === 'all' && (
              <div className="space-y-16">
                {/* Flagship Projects */}
                {flagshipProjects.length > 0 && (
                  <section>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-[#dc3545] rounded-full flex items-center justify-center">
                        <Image src="/images/icons/flag.svg" alt="Flagship" width={24} height={24} className="filter brightness-0 invert" />
                      </div>
                      <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px]">
                        Flagship Projects ({flagshipProjects.length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {flagshipProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Production Projects */}
                {productionProjects.length > 0 && (
                  <section>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-[#28a745] rounded-full flex items-center justify-center">
                        <Image src="/images/icons/check.svg" alt="Production" width={24} height={24} className="filter brightness-0 invert" />
                      </div>
                      <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px]">
                        Production Projects ({productionProjects.length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {productionProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Other Projects */}
                {otherProjects.length > 0 && (
                  <section>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-[#6c757d] rounded-full flex items-center justify-center">
                        <Image src="/images/icons/code.svg" alt="Other" width={24} height={24} className="filter brightness-0 invert" />
                      </div>
                      <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px]">
                        Other Projects ({otherProjects.length})
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {otherProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}

            {filterType === 'level' && (
              <div className="space-y-16">
                {selectedLevel === 'all' || selectedLevel === 'flagship' ? (
                  flagshipProjects.length > 0 && (
                    <section>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#dc3545] rounded-full flex items-center justify-center">
                          <Image src="/images/icons/flag.svg" alt="Flagship" width={24} height={24} className="filter brightness-0 invert" />
                        </div>
                        <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px]">
                          Flagship Projects ({flagshipProjects.length})
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {flagshipProjects.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    </section>
                  )
                ) : null}

                {selectedLevel === 'all' || selectedLevel === 'production' ? (
                  productionProjects.length > 0 && (
                    <section>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#28a745] rounded-full flex items-center justify-center">
                          <Image src="/images/icons/check.svg" alt="Production" width={24} height={24} className="filter brightness-0 invert" />
                        </div>
                        <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px]">
                          Production Projects ({productionProjects.length})
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {productionProjects.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    </section>
                  )
                ) : null}
              </div>
            )}

            {filterType === 'type' && (
              <div className="space-y-16">
                {selectedType === 'all' || selectedType === 'code' ? (
                  codeProjects.length > 0 && (
                    <section>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#003594] rounded-full flex items-center justify-center">
                          <Image src="/images/icons/code.svg" alt="Code" width={24} height={24} className="filter brightness-0 invert" />
                        </div>
                        <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px]">
                          Code Projects ({codeProjects.length})
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {codeProjects.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    </section>
                  )
                ) : null}

                {selectedType === 'all' || selectedType === 'documentation' ? (
                  documentationProjects.length > 0 && (
                    <section>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#ffc107] rounded-full flex items-center justify-center">
                          <Image src="/images/icons/book-open.svg" alt="Documentation" width={24} height={24} className="filter brightness-0" />
                        </div>
                        <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px]">
                          Documentation Projects ({documentationProjects.length})
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {documentationProjects.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    </section>
                  )
                ) : null}

                {selectedType === 'all' || selectedType === 'other' ? (
                  otherProjects.length > 0 && (
                    <section>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 bg-[#6c757d] rounded-full flex items-center justify-center">
                          <Image src="/images/icons/briefcase-figma.svg" alt="Other" width={24} height={24} className="filter brightness-0 invert" />
                        </div>
                        <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px]">
                          Other Projects ({otherProjects.length})
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {otherProjects.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    </section>
                  )
                ) : null}
              </div>
            )}
          </>
        )}

        {/* Pagination */}
        {!loading && filteredProjects.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: Math.min(5, Math.ceil(totalProjects / projectsPerPage)) }, (_, i) => {
                const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                const totalPages = Math.ceil(totalProjects / projectsPerPage);
                
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-10 h-10 rounded-md text-sm font-medium ${
                      currentPage === pageNum
                        ? 'bg-[#003594] text-white'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(totalProjects / projectsPerPage)))}
              disabled={currentPage >= Math.ceil(totalProjects / projectsPerPage)}
              className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            
            <div className="text-sm text-gray-600 ml-4">
              Showing {((currentPage - 1) * projectsPerPage) + 1}-{Math.min(currentPage * projectsPerPage, totalProjects)} of {totalProjects} projects
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectsContent() {
  const searchParams = useSearchParams();
  const showAllProjects = searchParams.get('view') !== null;

  if (showAllProjects) {
    return <AllProjectsContent />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <ProjectsHero />

      {/* Powering Open Source Security Section */}
      <PoweringOpenSourceSection />

      {/* Who Should Start Section */}
      <WhoShouldStartSection />

      {/* SDLC Mapping Section */}
      <SDLCMappingSection />

      {/* Project Inventory Section */}
      <ProjectInventorySection />

      {/* Final CTA Section */}
      <FinalCTASection />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003594] mx-auto mb-4"></div>
            <p className="text-[#757575]">Loading projects...</p>
          </div>
        </div>
      }>
        <ProjectsContent />
      </Suspense>
      <Footer />
    </div>
  );
} 