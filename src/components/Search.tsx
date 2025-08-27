"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import Image from 'next/image';
import { useEffect, useState, useMemo, useRef } from 'react';

const searchIcon = "/images/icons/search.svg";

interface SearchProps {
  placeholder?: string;
  className?: string;
  showIcon?: boolean;
  debounceMs?: number;
  autoFocus?: boolean;
  showLiveResults?: boolean;
  data?: any[];
}

interface Project {
  title: string;
  description: string;
  category: string;
  status: 'Active' | 'Stable' | 'Flagship';
  slug?: string;
}

// Sample projects data - in a real app, this would come from props or context
const defaultProjectsData: Project[] = [
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

export default function Search({ 
  placeholder = "Search...", 
  className = "",
  showIcon = true,
  debounceMs = 300,
  autoFocus = false,
  showLiveResults = true,
  data = defaultProjectsData
}: SearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isFocused, setIsFocused] = useState(false);
  const [selectedResult, setSelectedResult] = useState(-1);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (term) {
      params.set("query", term);
      // Reset to first page when searching
      params.delete("page");
    } else {
      params.delete("query");
      params.delete("page");
    }
    
    replace(`${pathname}?${params.toString()}`);
  }, debounceMs);

  const currentQuery = searchParams.get("query")?.toString() || "";

  // Live search results
  const searchResults = useMemo(() => {
    if (!showLiveResults || !inputValue.trim()) return [];
    
    return data.filter((item: Project) => 
      item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.description.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.category.toLowerCase().includes(inputValue.toLowerCase())
    ).slice(0, 5); // Limit to 5 results for dropdown
  }, [inputValue, data, showLiveResults]);

  const handleClear = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("query");
    params.delete("page");
    replace(`${pathname}?${params.toString()}`);
    setInputValue('');
    setSelectedResult(-1);
  };

  const handleInputChange = (value: string) => {
    setInputValue(value);
    setSelectedResult(-1);
    handleSearch(value);
  };

  const handleResultClick = (project: Project) => {
    if (project.slug) {
      window.location.href = `/projects/${project.slug}`;
    } else {
      // Fallback to search
      const params = new URLSearchParams(searchParams);
      params.set("query", project.title);
      replace(`${pathname}?${params.toString()}`);
    }
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showLiveResults || searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedResult(prev => 
        prev < searchResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedResult(prev => 
        prev > 0 ? prev - 1 : searchResults.length - 1
      );
    } else if (e.key === 'Enter' && selectedResult >= 0) {
      e.preventDefault();
      handleResultClick(searchResults[selectedResult]);
    } else if (e.key === 'Escape') {
      setIsFocused(false);
      inputRef.current?.blur();
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Flagship': return 'bg-[#dc3545] text-white';
      case 'Active': return 'bg-[#28a745] text-white';
      case 'Stable': return 'bg-[#ffc107] text-[#101820]';
      default: return 'bg-gray-500 text-white';
    }
  };

  // Update input value when URL query changes
  useEffect(() => {
    if (currentQuery !== inputValue) {
      setInputValue(currentQuery);
    }
  }, [currentQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const showDropdown = showLiveResults && isFocused && inputValue.trim() && searchResults.length > 0;

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className={`
        flex items-center bg-white border rounded-lg transition-all duration-200
        ${isFocused 
          ? 'border-[#003594] shadow-lg shadow-[#003594]/10 ring-2 ring-[#003594]/20' 
          : 'border-gray-300 hover:border-gray-400'
        }
      `}>
        {showIcon && (
          <div className="pl-4 pr-2">
            <Image 
              src={searchIcon} 
              alt="" 
              width={20} 
              height={20} 
              className="opacity-60" 
            />
          </div>
        )}
        
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          autoFocus={autoFocus}
          className={`
            w-full h-11 text-[#101820] placeholder:text-gray-500 outline-none bg-transparent
            ${showIcon ? 'pl-0 pr-4' : 'px-4'}
            font-['Poppins'] text-sm
          `}
        />
        
        {inputValue && (
          <button
            onClick={handleClear}
            className="p-2 mr-2 hover:bg-gray-100 rounded-md transition-colors group"
            aria-label="Clear search"
          >
            <div className="w-4 h-4 relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-0.5 bg-gray-400 group-hover:bg-gray-600 rotate-45 transition-colors" />
                <div className="w-3 h-0.5 bg-gray-400 group-hover:bg-gray-600 -rotate-45 transition-colors" />
              </div>
            </div>
          </button>
        )}
      </div>
      
      {/* Live Search Results Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="px-2 py-2 text-gray-500 text-sm border-b border-gray-100">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </div>
            {searchResults.map((project, index) => (
              <button
                key={`${project.title}-${index}`}
                onClick={() => handleResultClick(project)}
                className={`
                  w-full text-left p-3 rounded-lg transition-all duration-200 flex items-start gap-3
                  ${selectedResult === index 
                    ? 'bg-[#003594]/10 border border-[#003594]/20' 
                    : 'hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-['Poppins'] font-medium text-[#101820] text-sm truncate">
                      {project.title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  <div className="mt-1">
                    <span className="text-[#003594] text-xs font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>
              </button>
            ))}
            
            {searchResults.length >= 5 && (
              <div className="border-t border-gray-100 mt-2 pt-2">
                <div className="px-2 py-1 text-gray-500 text-xs text-center">
                  Press Enter or scroll to projects page for more results
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Search status when focused but no results */}
      {showLiveResults && isFocused && inputValue.trim() && searchResults.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          <div className="p-4 text-center">
            <div className="text-gray-400 text-sm">
              No projects found for "{inputValue}"
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 