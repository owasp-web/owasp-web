'use client'

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import MegaMenu from './MegaMenu';

// Local images
const logo = "/images/logos/owasp-logo.svg";
const searchIcon = "/images/icons/search.svg";

interface NavigationItem {
  href: string;
  label: string;
}

interface Project {
  title: string;
  description: string;
  category: string;
  status: 'Active' | 'Stable' | 'Flagship';
  slug: string;
}

// Sample projects data - in a real app, this would come from an API or database
const projectsData: Project[] = [
  {
    title: "OWASP Top 10",
    description: "The OWASP Top 10 is a standard awareness document for developers and web application security.",
    category: "Documentation",
    status: "Flagship",
    slug: "owasp-top-10"
  },
  {
    title: "Dependency-Track",
    description: "Intelligent Component Analysis platform for identifying and reducing software supply chain risk using SBOM.",
    category: "Security Testing",
    status: "Flagship",
    slug: "dependency-track"
  },
  {
    title: "Amass",
    description: "In-depth attack surface mapping and asset discovery platform for security professionals.",
    category: "Asset Discovery",
    status: "Active",
    slug: "amass"
  },
  {
    title: "OWTF",
    description: "Offensive Web Testing Framework that combines different testing strategies.",
    category: "Penetration Testing",
    status: "Active",
    slug: "owtf"
  },
  {
    title: "Dependency-Track",
    description: "Intelligent component analysis platform for identifying and reducing risk from third-party components.",
    category: "Supply Chain Security",
    status: "Active",
    slug: "dependency-track"
  },
  {
    title: "Juice Shop",
    description: "A globally-used, intentionally insecure web application for security training.",
    category: "Training",
    status: "Flagship",
    slug: "juice-shop"
  }
];

export default function Header() {
  const pathname = usePathname();
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState(-1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<string | null>(null);
  const [megaMenuTimeout, setMegaMenuTimeout] = useState<NodeJS.Timeout | null>(null);

  const navigationItems: NavigationItem[] = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/chapters', label: 'Chapters' },
    { href: '/events', label: 'Events' },
    { href: '/about', label: 'About' },
  ];

  // Mega menu handlers
  const handleMegaMenuEnter = (menuType: string) => {
    // Clear any existing timeout
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
    // Set the menu open
    setMegaMenuOpen(menuType);
  };

  const handleMegaMenuLeave = () => {
    // Set timeout to close menu
    const timeout = setTimeout(() => {
      setMegaMenuOpen(null);
    }, 150);
    setMegaMenuTimeout(timeout);
  };

  const handleNavItemEnter = (menuType: string | null) => {
    // Clear any existing timeout
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
    // Set the menu (null for items without mega menu)
    setMegaMenuOpen(menuType);
  };



  const closeMegaMenu = () => {
    setMegaMenuOpen(null);
    if (megaMenuTimeout) {
      clearTimeout(megaMenuTimeout);
      setMegaMenuTimeout(null);
    }
  };

  // Close mega menu when route changes
  useEffect(() => {
    closeMegaMenu();
  }, [pathname]);

  const isActiveTab = (href: string) => {
    // Special case for home page - only match exact path
    if (href === '/') {
      return pathname === '/';
    }
    // For other pages, match exact path or sub-paths
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Live search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return projectsData.filter(project => 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 6); // Limit to 6 results
  }, [searchQuery]);

  const handleSearchOpen = () => {
    setSearchOpen(true);
    setSelectedResult(-1);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setSearchFocused(false);
    setSelectedResult(-1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to projects page with search query
      window.location.href = `/projects?query=${encodeURIComponent(searchQuery.trim())}`;
      handleSearchClose();
    }
  };

  const handleResultClick = (project: Project) => {
    window.location.href = `/projects/${project.slug}`;
    handleSearchClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleSearchClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedResult(prev => 
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedResult(prev => prev > -1 ? prev - 1 : prev);
    } else if (e.key === 'Enter' && selectedResult >= 0) {
      e.preventDefault();
      handleResultClick(searchResults[selectedResult]);
    }
  };

  const handleQuickSearch = (query: string) => {
    // Navigate to projects page with predefined search query
    window.location.href = `/projects?query=${encodeURIComponent(query)}`;
    handleSearchClose();
  };

  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && searchOpen) {
        handleSearchClose();
      }
      // Add Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        handleSearchOpen();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, [searchOpen]);

  // Reset selected result when search query changes
  useEffect(() => {
    setSelectedResult(-1);
  }, [searchQuery]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Flagship': return 'bg-[#dc3545] text-white';
      case 'Active': return 'bg-[#28a745] text-white';
      case 'Stable': return 'bg-[#ffc107] text-[#101820]';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <header className="backdrop-blur-[5px] backdrop-filter bg-[#101820]/95 sticky top-0 w-full z-50 border-b border-white/10 shadow-sm">
      <div className="flex flex-row items-center h-20">
        <div className="box-border flex flex-row h-20 items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-0 relative w-full max-w-[1440px] mx-auto">
          
          {/* Logo */}
          <Link href="/" className="h-10 relative shrink-0 w-[132.894px] hover:opacity-90 transition-opacity">
            <Image src={logo} alt="OWASP Logo" fill className="object-contain" />
          </Link>
          
          {/* Main Navigation - Smart Responsive Breakpoint */}
          <div 
            className="hidden lg:flex absolute box-border flex-row items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            onMouseLeave={handleMegaMenuLeave}
          >
            <nav className="flex flex-row items-center bg-white/5 rounded-lg p-1 backdrop-blur-sm border border-white/10">
              {navigationItems.map((item) => {
                const isActive = isActiveTab(item.href);
                const hasMegaMenu = ['projects', 'chapters', 'events', 'about'].includes(item.label.toLowerCase());
                const menuType = hasMegaMenu ? (item.label.toLowerCase() as 'projects' | 'chapters' | 'events' | 'about') : null;
                const isMenuOpen = megaMenuOpen === menuType;
                
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      relative flex flex-row items-center justify-center px-3 lg:px-4 py-2 h-10
                      rounded-md transition-all duration-300 group
                      ${isActive || isMenuOpen
                        ? 'bg-[#003594] text-white shadow-lg shadow-[#003594]/20' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                      }
                    `}
                    onMouseEnter={() => handleNavItemEnter(menuType)}
                  >
                    <span className="font-['Poppins'] text-sm font-medium relative flex items-center gap-1">
                      {item.label}
                      {hasMegaMenu && (
                        <svg 
                          width="12" 
                          height="12" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          className={`transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
                        >
                          <path 
                            d="M6 9l6 6 6-6" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {(isActive || isMenuOpen) && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#00A7E1] rounded-full" />
                      )}
                    </span>
                  </Link>
                );
              })}
            </nav>
            
            {/* Search - Hidden on Mobile */}
            <div className="ml-6 relative">
              <div className={`
                flex items-center justify-center h-10 w-10 rounded-lg transition-all duration-300
                ${searchOpen || searchFocused 
                  ? 'bg-white/15 ring-2 ring-[#00A7E1]/50' 
                  : 'bg-white/5 hover:bg-white/10'
                }
              `}>
                <button 
                  onClick={handleSearchOpen}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="flex items-center justify-center w-full h-full rounded-lg transition-transform hover:scale-110"
                  aria-label="Open search"
                >
                  <Image src={searchIcon} alt="Search" width={18} height={18} className="opacity-80" />
                </button>
              </div>
            </div>

            {/* Mega Menu - Positioned within navigation container */}
            {megaMenuOpen && (
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-screen">
                <MegaMenu
                  isOpen={!!megaMenuOpen}
                  onClose={closeMegaMenu}
                  menuType={megaMenuOpen as 'projects' | 'chapters' | 'events' | 'about'}
                />
              </div>
            )}
          </div>
          
          {/* Action Buttons and Mobile Menu */}
          <div className="box-border flex flex-row gap-3 items-center justify-start p-0 relative shrink-0">
            {/* Action Buttons - Progressive Reveal */}
            <div className="hidden md:flex flex-row gap-2 lg:gap-3">
              <Link href="/join-community">
                <button className="
                  border-2 border-[#757575] h-9 md:h-10 px-3 md:px-4 text-white font-['Poppins'] font-semibold text-xs md:text-sm 
                  hover:border-[#00A7E1]/60 hover:bg-[#00A7E1]/10 hover:text-[#00A7E1] 
                  transition-all duration-300 rounded-lg backdrop-blur-sm
                  relative overflow-hidden group
                ">
                  <span className="relative z-10 whitespace-nowrap">Join Community</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00A7E1]/0 via-[#00A7E1]/10 to-[#00A7E1]/0 
                               translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </button>
              </Link>
              <Link href="/secure-my-app">
                <button className="
                  bg-gradient-to-r from-[#003594] to-[#004bbb] h-9 md:h-10 px-3 md:px-4 text-white font-['Poppins'] font-semibold text-xs md:text-sm 
                  hover:from-[#004bbb] hover:to-[#0056cc] hover:shadow-lg hover:shadow-[#003594]/30
                  transition-all duration-300 rounded-lg
                  relative overflow-hidden group
                ">
                  <span className="relative z-10 whitespace-nowrap">Secure My App</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                               translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                </button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center h-10 w-10 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <div className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <div className={`w-6 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        fixed inset-y-0 right-0 w-full max-w-sm bg-[#101820] border-l border-white/20 shadow-xl
        transform transition-transform duration-300 ease-in-out z-40
        ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="h-20 flex items-center justify-end px-4 border-b border-white/10">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close mobile menu"
          >
            <div className="w-5 h-5 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-4 h-0.5 bg-white/60 rotate-45" />
                <div className="w-4 h-0.5 bg-white/60 -rotate-45" />
              </div>
            </div>
          </button>
        </div>
        
        <div className="p-4 bg-[#101820]">
          {/* Mobile Search */}
          <div className="mb-6">
            <div className="flex items-center bg-white/20 rounded-lg p-2 gap-2">
              <Image src={searchIcon} alt="" width={18} height={18} className="opacity-60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search OWASP projects..."
                className="w-full bg-transparent text-white placeholder:text-white/50 text-sm outline-none"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="space-y-1 sm:space-y-2">
            {navigationItems.map((item) => {
              const isActive = isActiveTab(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`
                    block w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-300
                    ${isActive 
                      ? 'bg-[#003594] text-white shadow-lg' 
                      : 'text-white/80 hover:text-white hover:bg-white/20'
                    }
                  `}
                >
                  <span className="font-['Poppins'] text-sm sm:text-base font-medium">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Action Buttons */}
          <div className="mt-6 space-y-3 md:hidden">
            <Link href="/join-community" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full border-2 border-[#757575] h-11 sm:h-12 px-4 text-white font-['Poppins'] font-semibold text-sm 
                hover:border-[#00A7E1]/60 hover:bg-[#00A7E1]/20 hover:text-[#00A7E1] 
                transition-all duration-300 rounded-lg bg-[#101820]">
                Join the Community
              </button>
            </Link>
            <Link href="/secure-my-app" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-gradient-to-r from-[#003594] to-[#004bbb] h-11 sm:h-12 px-4 text-white font-['Poppins'] font-semibold text-sm 
                hover:from-[#004bbb] hover:to-[#0056cc] hover:shadow-lg
                transition-all duration-300 rounded-lg">
                Secure My App
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Search Modal - Keep existing code */}
      {searchOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-start justify-center pt-20"
          onClick={handleSearchClose}
        >
          <div 
            className="bg-[#101820]/95 backdrop-blur-lg border border-white/10 rounded-xl w-full max-w-2xl mx-4 shadow-2xl"
            onKeyDown={handleKeyDown}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Header */}
            <div className="flex items-center p-4 border-b border-white/10">
              <div className="flex items-center flex-1 gap-3">
                <Image src={searchIcon} alt="" width={20} height={20} className="opacity-60" />
                <form onSubmit={handleSearchSubmit} className="flex-1">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search OWASP projects..."
                    className="w-full bg-transparent text-white placeholder:text-white/50 text-lg outline-none"
                    autoFocus
                  />
                </form>
              </div>
              <button
                onClick={handleSearchClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close search"
              >
                <div className="w-5 h-5 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-0.5 bg-white/60 rotate-45" />
                    <div className="w-4 h-0.5 bg-white/60 -rotate-45" />
                  </div>
                </div>
              </button>
            </div>

            {/* Search Content */}
            <div className="max-h-80 overflow-y-auto">
              {searchQuery.trim() === '' ? (
                /* Search Suggestions */
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="text-white/60 text-sm font-medium mb-2">Popular Searches</h3>
                    <div className="space-y-1">
                      <button 
                        onClick={() => handleQuickSearch('Top 10')}
                        className="w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors text-white/80 hover:text-white"
                      >
                        🛡️ OWASP Top 10
                      </button>
                      <button 
                        onClick={() => handleQuickSearch('Dependency-Track')}
                        className="w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors text-white/80 hover:text-white"
                      >
                        🔍 Dependency-Track
                      </button>
                      <button 
                        onClick={() => handleQuickSearch('Security Testing')}
                        className="w-full text-left p-3 hover:bg-white/5 rounded-lg transition-colors text-white/80 hover:text-white"
                      >
                        🧪 Security Testing Tools
                      </button>
                    </div>
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                /* Live Search Results */
                <div className="p-2">
                  <div className="px-2 py-2 text-white/60 text-sm">
                    {searchResults.length} project{searchResults.length !== 1 ? 's' : ''} found
                  </div>
                  {searchResults.map((project, index) => (
                    <button
                      key={project.slug}
                      onClick={() => handleResultClick(project)}
                      className={`
                        w-full text-left p-3 rounded-lg transition-all duration-200 flex items-start gap-3
                        ${selectedResult === index 
                          ? 'bg-[#003594]/30 border border-[#003594]/50' 
                          : 'hover:bg-white/5'
                        }
                      `}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-['Poppins'] font-medium text-white text-sm truncate">
                            {project.title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                            {project.status}
                          </span>
                        </div>
                        <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                        <div className="mt-1">
                          <span className="text-[#00A7E1] text-xs font-medium">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))}
                  
                  {/* View All Results */}
                  <div className="border-t border-white/10 mt-2 pt-2">
                    <button
                      onClick={() => {
                        window.location.href = `/projects?query=${encodeURIComponent(searchQuery)}`;
                        handleSearchClose();
                      }}
                      className="w-full text-center p-3 hover:bg-white/5 rounded-lg transition-colors text-[#00A7E1] hover:text-white text-sm font-medium"
                    >
                      View all results for "{searchQuery}" →
                    </button>
                  </div>
                </div>
              ) : (
                /* No Results */
                <div className="p-4 text-center">
                  <div className="text-4xl mb-2">🔍</div>
                  <h3 className="text-white font-medium mb-1">No projects found</h3>
                  <p className="text-white/60 text-sm mb-3">
                    No projects match "{searchQuery}". Try a different search term.
                  </p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[#00A7E1] hover:text-white text-sm font-medium transition-colors"
                  >
                    Clear search
                  </button>
                </div>
              )}
            </div>

            {/* Search Footer */}
            <div className="px-4 py-3 border-t border-white/10 text-white/40 text-xs flex justify-between">
              <span>Use ↑↓ to navigate • ⌘K to open</span>
              <span>ESC to close</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 