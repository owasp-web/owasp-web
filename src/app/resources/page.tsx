'use client'

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function ResourcesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Resources');

  const categories = [
    'All Resources',
    'Security Tools',
    'Documentation',
    'Training Materials',
    'Guidelines',
    'Code Libraries'
  ];

  const resources = [
    {
      title: "OWASP Top 10",
      description: "The most critical web application security risks",
      category: "Documentation",
      type: "Guide",
      image: "/images/tools/owtf.png",
      downloads: "2.5M+"
    },
    {
      title: "OWASP ZAP",
      description: "Free penetration testing tool for web applications",
      category: "Security Tools",
      type: "Tool",
      image: "/images/tools/dependency-track.png",
      downloads: "1.8M+"
    },
    {
      title: "OWASP ASVS",
      description: "Application Security Verification Standard",
      category: "Guidelines",
      type: "Standard",
      image: "/images/tools/amass.png",
      downloads: "850K+"
    },
    {
      title: "WebGoat",
      description: "Deliberately insecure web application for learning",
      category: "Training Materials",
      type: "Platform",
      image: "/images/events/event-1.png",
      downloads: "1.2M+"
    },
    {
      title: "OWASP Cheat Sheets",
      description: "Concise guides for specific security topics",
      category: "Documentation",
      type: "Reference",
      image: "/images/tools/owtf.png",
      downloads: "3.1M+"
    },
    {
      title: "Dependency-Check",
      description: "Identifies project dependencies with known vulnerabilities",
      category: "Security Tools",
      type: "Tool",
      image: "/images/tools/dependency-track.png",
      downloads: "950K+"
    }
  ];

  const filteredResources = resources.filter(resource => 
    selectedCategory === 'All Resources' || resource.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-[#101820] relative">
        <div className="max-w-[1440px] mx-auto px-[120px] py-24">
          <div className="max-w-4xl">
            <h1 className="font-['Barlow'] font-medium text-[56px] text-white leading-[56px] tracking-[-1.12px] mb-6">
              OWASP Resources
            </h1>
            <p className="font-['Poppins'] text-[#f4f4f4] text-lg leading-7 mb-8">
              Access our comprehensive collection of security tools, documentation, training materials, 
              and guidelines. Everything you need to build secure applications and advance your security knowledge.
            </p>
            <div className="flex gap-4">
              <Button text="Download All Resources" variant="light-blue" size="56" />
              <Button text="Getting Started Guide" variant="ghost-white" size="56" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto px-[120px] py-8">
          <div className="flex gap-4 justify-center max-w-lg mx-auto mb-6">
            <input 
              type="text" 
              placeholder="Search resources..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#003594] focus:border-transparent"
            />
            <div className="flex items-center justify-center w-12 h-12 bg-[#003594] rounded-sm">
              <Image src="/images/icons/search.svg" alt="Search" width={20} height={20} className="filter brightness-0 invert" />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category 
                    ? 'bg-[#003594] text-white' 
                    : 'bg-gray-100 text-[#757575] hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
        <div className="mb-8 sm:mb-10 lg:mb-12">
          <h2 className="font-['Barlow'] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-[40px] text-[#101820] leading-tight lg:leading-[40px] tracking-[-0.48px] sm:tracking-[-0.6px] lg:tracking-[-0.8px] mb-3 sm:mb-4">
            Featured Resources
          </h2>
          <p className="font-['Poppins'] text-[#757575] text-sm sm:text-base leading-5 sm:leading-6">
            Our most popular and widely-used security resources and tools.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-14 lg:mb-16">
          {filteredResources.map((resource, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <Image src={resource.image} alt={resource.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#003594] text-white rounded-full text-sm font-semibold">
                    {resource.type}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-black/70 text-white rounded-full text-sm">
                    {resource.downloads}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-['Barlow'] font-medium text-xl text-[#101820] mb-3 group-hover:text-[#003594] transition-colors">
                  {resource.title}
                </h3>
                <p className="font-['Poppins'] text-[#757575] text-sm leading-6 mb-4">
                  {resource.description}
                </p>
                <div className="flex gap-3">
                  <Button text="View Resource" variant="primary" size="40" />
                  <Button text="Download" variant="ghost-dark" size="40" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Downloads */}
        <div className="bg-white rounded-lg p-12">
          <h3 className="font-['Barlow'] font-medium text-[32px] text-[#101820] mb-8 text-center">
            Most Downloaded This Month
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="font-['Barlow'] font-medium text-[24px] text-[#003594] mb-2">OWASP Top 10</div>
              <div className="font-['Poppins'] text-[#757575] text-sm">2.5M downloads</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="font-['Barlow'] font-medium text-[24px] text-[#003594] mb-2">Cheat Sheets</div>
              <div className="font-['Poppins'] text-[#757575] text-sm">3.1M downloads</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="font-['Barlow'] font-medium text-[24px] text-[#003594] mb-2">OWASP ZAP</div>
              <div className="font-['Poppins'] text-[#757575] text-sm">1.8M downloads</div>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="font-['Barlow'] font-medium text-[24px] text-[#003594] mb-2">WebGoat</div>
              <div className="font-['Poppins'] text-[#757575] text-sm">1.2M downloads</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 