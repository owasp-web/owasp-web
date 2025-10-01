'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { Project } from '@/lib/types';

interface ProjectPageProps {
  project: Project;
}

interface TabContentProps {
  content: string | undefined;
}

function TabContent({ content }: TabContentProps) {
  // Helper function to convert URLs, embeds, and OWASP vulnerability references to interactive content
  const renderRichContent = (text: string) => {
    // YouTube embed regex
    const youtubeRegex = /\[YOUTUBE\](https:\/\/(?:www\.)?youtube\.com\/(?:watch\?v=|embed\/)([a-zA-Z0-9_-]+)(?:\S+)?)\[\/YOUTUBE\]/g;
    
    // Image embed regex
    const imageRegex = /\[IMAGE\](https?:\/\/[^\s\]]+)\|([^|]*)\|([^]]*)\[\/IMAGE\]/g;
    
    // First handle OWASP A01-A10 vulnerability references
    const owaspVulnRegex = /(A\d{2}:2021-[^,\n\r.]+)/g;
    
    // Map of vulnerability names to URLs
    const vulnUrls: { [key: string]: string } = {
      'A01:2021-Broken Access Control': 'https://owasp.org/Top10/A01_2021-Broken_Access_Control/',
      'A02:2021-Cryptographic Failures': 'https://owasp.org/Top10/A02_2021-Cryptographic_Failures/',
      'A03:2021-Injection': 'https://owasp.org/Top10/A03_2021-Injection/',
      'A04:2021-Insecure Design': 'https://owasp.org/Top10/A04_2021-Insecure_Design/',
      'A05:2021-Security Misconfiguration': 'https://owasp.org/Top10/A05_2021-Security_Misconfiguration/',
      'A06:2021-Vulnerable and Outdated Components': 'https://owasp.org/Top10/A06_2021-Vulnerable_and_Outdated_Components/',
      'A07:2021-Identification and Authentication Failures': 'https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/',
      'A08:2021-Software and Data Integrity Failures': 'https://owasp.org/Top10/A08_2021-Software_and_Data_Integrity_Failures/',
      'A09:2021-Security Logging and Monitoring Failures': 'https://owasp.org/Top10/A09_2021-Security_Logging_and_Monitoring_Failures/',
      'A10:2021-Server-Side Request Forgery': 'https://owasp.org/Top10/A10_2021-Server-Side_Request_Forgery_%28SSRF%29/'
    };

    // Replace YouTube embeds first
    let processedText = text.replace(youtubeRegex, (match, url, videoId) => {
      return `<YOUTUBEEMBED>${videoId}</YOUTUBEEMBED>`;
    });

    // Replace images
    processedText = processedText.replace(imageRegex, (match, url, alt, caption) => {
      return `<IMAGEEMBED>${url}|${alt}|${caption}</IMAGEEMBED>`;
    });

    // Replace OWASP vulnerabilities with links
    processedText = processedText.replace(owaspVulnRegex, (match) => {
      const url = vulnUrls[match];
      if (url) {
        return `<OWASPLINK>${match}|${url}</OWASPLINK>`;
      }
      return match;
    });

    // Then handle regular URLs
    const urlRegex = /(https?:\/\/[^\s<>"']+)/g;
    processedText = processedText.replace(urlRegex, (match) => {
      return `<HTTPLINK>${match}</HTTPLINK>`;
    });

    // Split and render
    const parts = processedText.split(/(<YOUTUBEEMBED>.*?<\/YOUTUBEEMBED>|<IMAGEEMBED>.*?<\/IMAGEEMBED>|<OWASPLINK>.*?<\/OWASPLINK>|<HTTPLINK>.*?<\/HTTPLINK>)/);
    
    return parts.map((part, partIndex) => {
      if (part.startsWith('<YOUTUBEEMBED>')) {
        const videoId = part.replace(/<\/?YOUTUBEEMBED>/g, '');
        return (
          <div key={partIndex} className="my-6">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video"
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
        );
      } else if (part.startsWith('<IMAGEEMBED>')) {
        const content = part.replace(/<\/?IMAGEEMBED>/g, '');
        const [url, alt, caption] = content.split('|');
        return (
          <div key={partIndex} className="my-6">
            <div className="relative rounded-lg overflow-hidden border border-gray-200">
              <img
                src={url}
                alt={alt}
                className="w-full h-auto"
              />
            </div>
            {caption && (
              <p className="text-sm text-gray-600 text-center mt-2 italic">{caption}</p>
            )}
          </div>
        );
      } else if (part.startsWith('<OWASPLINK>')) {
        const content = part.replace(/<\/?OWASPLINK>/g, '');
        const [text, url] = content.split('|');
        return (
          <a 
            key={partIndex}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#003594] hover:text-[#0056b3] underline font-medium"
          >
            {text}
          </a>
        );
      } else if (part.startsWith('<HTTPLINK>')) {
        const url = part.replace(/<\/?HTTPLINK>/g, '');
        return (
          <a 
            key={partIndex}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#003594] hover:text-[#0056b3] underline font-medium break-all"
          >
            {url}
          </a>
        );
      }
      return <span key={partIndex}>{part}</span>;
    });
  };

  if (!content) return null;

  // Allow JSON sections with optional buttons; else treat as markdown-ish text
  let asSections: any[] | null = null
  try {
    const parsed = JSON.parse(content)
    if (Array.isArray(parsed)) asSections = parsed
  } catch {}

  if (asSections) {
    // Styled sections with slight layout variation
    return (
      <div className="space-y-6">
        {asSections.map((section: any, index: number) => {
          const flip = index % 3 === 1
          return (
            <div key={index} className={`bg-white rounded-lg border border-gray-200 p-6 ${flip ? 'shadow-sm' : ''}`}>
              {section.title && (
                <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-3">{section.title}</h3>
              )}
              {/* Optional image (single) */}
              {section.imageUrl && (
                <div className="my-4">
                  <div className="relative rounded-lg overflow-hidden border border-gray-200">
                    {/* Use img because source may be external */}
                    <img src={section.imageUrl} alt={section.imageAlt || ''} className="w-full h-auto" />
                  </div>
                  {section.imageCaption && (
                    <p className="text-sm text-gray-600 text-center mt-2 italic">{section.imageCaption}</p>
                  )}
                </div>
              )}
              {/* Optional video (YouTube iframe or direct video) */}
              {section.videoUrl && (
                <div className="my-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                    {/(youtube\.com|youtu\.be)/i.test(section.videoUrl) ? (
                      <iframe
                        src={section.videoUrl.includes('embed') ? section.videoUrl : section.videoUrl.replace('watch?v=', 'embed/')}
                        title={section.title || 'Video'}
                        className="w-full h-full"
                        allowFullScreen
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <video src={section.videoUrl} controls className="w-full h-full" />
                    )}
                  </div>
                </div>
              )}
              {section.content && (
                <div className="font-['Poppins'] text-[#757575] leading-relaxed">
                  {renderRichContent(section.content)}
                </div>
              )}
              {/* Optional links list */}
              {section.links && Array.isArray(section.links) && section.links.length > 0 && (
                <div className="mt-4 space-y-2">
                  {section.links.map((lnk: any, li: number) => (
                    <div key={li}>
                      <a href={lnk.url} target="_blank" rel="noopener noreferrer" className="text-[#003594] hover:text-[#0056b3] underline font-medium text-sm">
                        • {lnk.title || lnk.url}
                      </a>
                    </div>
                  ))}
                </div>
              )}
              {section.buttons && Array.isArray(section.buttons) && section.buttons.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {section.buttons.map((btn: any, i: number) => (
                    <a key={i} href={btn.url} target="_blank" rel="noopener noreferrer"
                       className={`${btn.style === 'secondary' ? 'border border-[#003594] text-[#003594] hover:bg-blue-50' : 'bg-[#003594] text-white hover:bg-[#002d7a]'} px-4 py-2 rounded-lg transition-colors text-sm`}>
                      {btn.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="prose prose-lg max-w-none space-y-6">
      {content.split('\n\n').map((paragraph, index) => {
        // Handle different content types
        if (paragraph.startsWith('##')) {
          // Heading
          const headingText = paragraph.replace(/^##\s+/, '');
          return (
            <h3 key={index} className="font-['Barlow'] font-bold text-[#101820] text-xl mt-8 mb-4">
              {renderRichContent(headingText)}
            </h3>
          );
        } else if (paragraph.match(/^\d+\.\s+\*\*/)) {
          // Numbered list with bold items (like the Top 10 list)
          const items = paragraph.split(/(?=\d+\.\s+\*\*)/);
          return (
            <ol key={index} className="space-y-4 list-none">
              {items.filter(item => item.trim()).map((item, itemIndex) => {
                const cleanItem = item.trim();
                // Extract the number, title, and description
                const match = cleanItem.match(/^(\d+)\.\s+\*\*(.+?)\*\*\s*-?\s*(.*)$/);
                if (match) {
                  const [, number, title, description] = match;
                  return (
                    <li key={itemIndex} className="flex gap-4">
                      <div className="w-8 h-8 bg-[#003594] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {number}
                      </div>
                      <div>
                        <div className="font-['Poppins'] font-semibold text-[#101820] mb-1">
                          {renderRichContent(title)}
                        </div>
                        {description && (
                          <div className="font-['Poppins'] text-[#757575] text-sm">
                            {renderRichContent(description)}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                }
                return null;
              })}
            </ol>
          );
        } else if (paragraph.startsWith('-') || paragraph.match(/^\s*\*/)) {
          // Handle bullet points or markdown-style lists
          const lines = paragraph.split('\n').filter(line => line.trim());
          return (
            <ul key={index} className="space-y-2">
              {lines.map((line, lineIndex) => {
                const cleanLine = line.replace(/^[-*]\s*/, '').trim();
                if (cleanLine.startsWith('**') && cleanLine.includes('**:')) {
                  // Bold labels with descriptions
                  const match = cleanLine.match(/^\*\*(.+?)\*\*:\s*(.*)$/);
                  if (match) {
                    const [, label, description] = match;
                    return (
                      <li key={lineIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#003594] rounded-full flex-shrink-0 mt-2"></div>
                        <div>
                          <span className="font-['Poppins'] font-semibold text-[#101820]">
                            {renderRichContent(label)}:
                          </span>
                          <span className="font-['Poppins'] text-[#757575] ml-1">
                            {renderRichContent(description)}
                          </span>
                        </div>
                      </li>
                    );
                  }
                }
                return (
                  <li key={lineIndex} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#003594] rounded-full flex-shrink-0 mt-2"></div>
                    <span className="font-['Poppins'] text-[#757575]">
                      {renderRichContent(cleanLine)}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        } else {
          // Regular paragraph
          return (
            <p key={index} className="font-['Poppins'] text-[#757575] leading-relaxed">
              {renderRichContent(paragraph)}
            </p>
          );
        }
      })}
    </div>
  );
}

export default function ProjectDetailPageWithTabs({ project }: ProjectPageProps) {
  // Parse custom tabs early to choose initial tab
  let customTabsInit: any[] = []
  const tabsRawInit: any = (project as any).tabs ?? (project as any).custom_tabs
  if (Array.isArray(tabsRawInit)) {
    customTabsInit = tabsRawInit
  } else if (typeof tabsRawInit === 'string') {
    try { const parsed = JSON.parse(tabsRawInit); if (Array.isArray(parsed)) customTabsInit = parsed } catch {}
  }

  const [activeTab, setActiveTab] = useState(customTabsInit.length ? (customTabsInit[0]?.id || 'overview') : 'overview');
  // Force client-side hydration
  useEffect(() => {}, []);
  // Hero media
  // Prefer modern fields, but fall back to legacy columns if present
  // Also append a cache-busting version so changes reflect immediately
  const version = ((project as any).updated_at || (project as any).id || '').toString()
  const rawImage = (project as any).image || (project as any).hero_image || (project as any).image_url || ''
  const rawGif = (project as any).hero_gif_url || ''
  const rawVideo = (project as any).hero_video_url || ''
  const isSigned = (url: string) => url.includes('/storage/v1/object/sign/')
  const heroImage = rawImage
    ? (isSigned(rawImage) ? rawImage : `${rawImage}${rawImage.includes('?') ? '&' : '?'}v=${encodeURIComponent(version)}`)
    : ''
  const heroGifUrl = rawGif
    ? (isSigned(rawGif) ? rawGif : `${rawGif}${rawGif.includes('?') ? '&' : '?'}v=${encodeURIComponent(version)}`)
    : ''
  const heroVideoUrl = rawVideo
    ? (isSigned(rawVideo) ? rawVideo : `${rawVideo}${rawVideo.includes('?') ? '&' : '?'}v=${encodeURIComponent(version)}`)
    : ''

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

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-[#28a745] text-white';
      case 'intermediate':
        return 'bg-[#ffc107] text-[#101820]';
      case 'advanced':
        return 'bg-[#dc3545] text-white';
      default:
        return 'bg-[#6c757d] text-white';
    }
  };

  // Define available tabs - use custom tabs if available, otherwise fall back to default structure
  let customTabs: any[] = customTabsInit

  const tabs = customTabs && customTabs.length > 0 
    ? customTabs
        .sort((a, b) => a.order - b.order)
        .map(tab => ({
          id: tab.id,
          label: tab.name,
          content: tab.content,
          icon: getTabIcon(tab.name)
        }))
    : [
        ...(project.project_overview ? [{ 
          id: 'overview', 
          label: 'Overview', 
          content: project.project_overview,
          icon: 'book-open'
        }] : []),
        ...(project.tab_documentation_content || project.installation_guide ? [{ 
          id: 'documentation', 
          label: 'Documentation', 
          content: project.tab_documentation_content,
          icon: 'code'
        }] : []),
        ...(project.tab_downloads_content ? [{ 
          id: 'downloads', 
          label: 'Downloads & Usage', 
          content: project.tab_downloads_content,
          icon: 'arrow-upright'
        }] : []),
        ...(project.tab_community_content ? [{ 
          id: 'community', 
          label: 'Community', 
          content: project.tab_community_content,
          icon: 'users'
        }] : []),
        ...(project.tab_contribute_content ? [{ 
          id: 'contribute', 
          label: 'Contribute', 
          content: project.tab_contribute_content,
          icon: 'briefcase-figma'
        }] : []),
        ...(project.tab_support_content ? [{ 
          id: 'support', 
          label: 'Support', 
          content: project.tab_support_content,
          icon: 'megaphone'
        }] : []),
        // Removed legacy Translation/Sponsors/Data tabs – use custom JSON tabs instead
      ];

  // Helper function to get appropriate icon for tab names
  function getTabIcon(tabName: string): string {
    const name = tabName.toLowerCase();
    if (name.includes('main') || name.includes('overview')) return 'book-open';
    if (name.includes('feature')) return 'check-shield';
    if (name.includes('integration')) return 'users';
    if (name.includes('installation') || name.includes('download')) return 'arrow-upright';
    if (name.includes('news') || name.includes('update')) return 'megaphone';
    if (name.includes('support')) return 'handshake';
    if (name.includes('executive') || name.includes('data')) return 'chart-projector';
    return 'book-open';
  }

  // Ensure active tab is valid; if not, pick the first available tab
  useEffect(() => {
    if (!tabs.find(t => t.id === activeTab) && tabs.length > 0) {
      setActiveTab(tabs[0].id)
    }
  }, [activeTab, tabs])

  const currentTabContent = tabs.find(tab => tab.id === activeTab)?.content || '';

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#1a237e] via-[#303f9f] to-[#42a5f5] relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-between">
            {/* Project Info */}
            <div className="flex-1 flex flex-col gap-6 lg:gap-8">
              {/* Project badges (project_type, difficulty, category) temporarily hidden */}
              
              <h1 className="font-['Barlow'] font-bold text-white text-[32px] sm:text-[40px] lg:text-[48px] leading-tight tracking-[-0.96px]">
                {project.title}
              </h1>
              
              <p className="font-['Poppins'] text-white/90 text-lg leading-relaxed max-w-3xl">
                {project.description}
              </p>
              
              {Array.isArray((project as any).hero_buttons) && (project as any).hero_buttons.length > 0 && (
                <div className="flex flex-wrap gap-4">
                  {((project as any).hero_buttons as any[]).map((btn: any, idx: number) => (
                    <Link key={idx} href={btn.url} target="_blank" rel="noopener noreferrer">
                      <Button text={btn.label || 'Learn More'} variant={btn.style === 'primary' ? 'primary' : 'ghost-white'} size="56" />
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Hero Media: prefer video, then GIF, then image */}
            {(heroVideoUrl || heroGifUrl || heroImage) && (
              <div className="w-full lg:w-[28rem] h-48 lg:h-80 relative bg-white/10 backdrop-blur-sm rounded-lg p-4 lg:p-6 flex items-center justify-center overflow-hidden">
                {heroVideoUrl ? (
                  <video
                    src={heroVideoUrl}
                    className="w-full h-full object-contain rounded"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : heroGifUrl ? (
                  <img src={heroGifUrl} alt="Project hero" className="w-full h-full object-contain" />
                ) : (
                  <div
                    className="w-full h-full bg-no-repeat bg-center bg-contain rounded"
                    style={{ backgroundImage: `url('${heroImage}')` }}
                  />
                )}
              </div>
            )}
          </div>

          {/* Hero Highlights */}
          {Array.isArray((project as any).hero_highlights) && (project as any).hero_highlights.length > 0 && (
            <div className="mt-6 lg:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {((project as any).hero_highlights as any[]).map((h: any, idx: number) => (
                <div key={idx} className="bg-white/10 text-white rounded-lg px-4 py-3 flex items-center justify-between">
                  <div className="font-['Poppins'] text-sm">{h.title}</div>
                  {h.url ? (
                    <a href={h.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                      {h.value ?? 'View'}
                    </a>
                  ) : (
                    <div className="font-semibold">{h.value}</div>
                  )}
                </div>
              ))}
            </div>
          )}
          </div>
        </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs Navigation */}
            {tabs.length > 1 && (
              <div className="border-b border-gray-200">
                <nav className="flex flex-wrap gap-2 lg:gap-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-3 px-4 lg:px-1 border-b-2 font-medium text-sm rounded-t-lg lg:rounded-none transition-colors ${
                        activeTab === tab.id
                          ? 'border-[#003594] text-[#003594] bg-blue-50 lg:bg-transparent'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 lg:hover:bg-transparent'
                      }`}
                    >
                      {tab.icon && (
                        <Image 
                          src={`/images/icons/${tab.icon}.svg`} 
                          alt="" 
                          width={16} 
                          height={16} 
                          className={`${activeTab === tab.id ? 'opacity-100' : 'opacity-60'}`}
                        />
                      )}
                      <span className="whitespace-nowrap">{tab.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Tab Content */}
            <section>
              <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px] mb-6">
                About {project.title}
              </h2>
              <TabContent content={currentTabContent} />
            </section>

            {/* Optional Overview Sections */}
            {Array.isArray((project as any).overview_sections) && (project as any).overview_sections.length > 0 && (
              <section>
                <div className="space-y-6">
                  {((project as any).overview_sections as any[]).map((section: any, index: number) => (
                    <div key={index} className="bg-white rounded-lg border border-gray-200 p-6">
                      {section.title && (
                        <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-3">{section.title}</h3>
                      )}
                      {section.imageUrl && (
                        <div className="my-4">
                          <div className="relative rounded-lg overflow-hidden border border-gray-200">
                            <img src={section.imageUrl} alt={section.imageAlt || ''} className="w-full h-auto" />
                          </div>
                          {section.imageCaption && (
                            <p className="text-sm text-gray-600 text-center mt-2 italic">{section.imageCaption}</p>
                          )}
                        </div>
                      )}
                      {section.videoUrl && (
                        <div className="my-4">
                          <div className="relative rounded-lg overflow-hidden border border-gray-200">
                            <iframe className="w-full aspect-video" src={section.videoUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                          </div>
                        </div>
                      )}
                      {section.content && (
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: section.content }} />
                      )}
                      {Array.isArray(section.buttons) && section.buttons.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {section.buttons.map((btn: any, i: number) => (
                            <a key={i} href={btn.url} target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded border ${btn.style === 'secondary' ? 'bg-white text-[#003594] border-[#003594]' : btn.style === 'link' ? 'underline text-[#003594] border-transparent' : 'bg-[#003594] text-white border-[#003594]'}`}>
                              {btn.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Screenshots removed per product decision: screenshots must be managed via tabs/sections */}

            {/* Videos Section */}
            {project.videos && project.videos.length > 0 && (
              <section>
                <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px] mb-6">
                  Videos
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {project.videos.map((video, index) => (
                    <div key={index} className="space-y-3">
                      <div className="relative aspect-video rounded-lg overflow-hidden border border-gray-200">
                        <iframe
                          src={video.url}
                          title={video.title}
                          className="w-full h-full"
                          allowFullScreen
                        />
                      </div>
                      <div>
                        <h3 className="font-['Poppins'] font-semibold text-[#101820] text-lg">{video.title}</h3>
                        {video.description && (
                          <p className="text-sm text-gray-600 mt-1">{video.description}</p>
                        )}
                        {video.duration && (
                          <span className="text-xs text-gray-500">Duration: {video.duration}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Tutorials Section */}
            {project.tutorials && project.tutorials.length > 0 && (
              <section>
                <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px] mb-6">
                  Tutorials
                </h2>
                <div className="space-y-4">
                  {project.tutorials.map((tutorial, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-['Poppins'] font-semibold text-[#101820] text-lg mb-2">
                            <a 
                              href={tutorial.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#003594] hover:text-[#0056b3] underline"
                            >
                              {tutorial.title}
                            </a>
                          </h3>
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <span className={`w-2 h-2 rounded-full ${
                                tutorial.difficulty === 'beginner' ? 'bg-green-500' :
                                tutorial.difficulty === 'intermediate' ? 'bg-yellow-500' : 'bg-red-500'
                              }`}></span>
                              {tutorial.difficulty}
                            </span>
                            {tutorial.duration && (
                              <span>Duration: {tutorial.duration}</span>
                            )}
                          </div>
                        </div>
                        <Image 
                          src="/images/icons/arrow-up-right.svg" 
                          alt="External link" 
                          width={16} 
                          height={16} 
                          className="opacity-60 mt-1" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Case Studies Section */}
            {project.case_studies && project.case_studies.length > 0 && (
              <section>
                <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px] mb-6">
                  Case Studies
                </h2>
                <div className="space-y-6">
                  {project.case_studies.map((caseStudy, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-['Poppins'] font-semibold text-[#101820] text-lg">
                            <a 
                              href={caseStudy.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#003594] hover:text-[#0056b3] underline"
                            >
                              {caseStudy.title}
                            </a>
                          </h3>
                          <p className="text-[#003594] font-medium">{caseStudy.company}</p>
                        </div>
                        <Image 
                          src="/images/icons/arrow-up-right.svg" 
                          alt="External link" 
                          width={16} 
                          height={16} 
                          className="opacity-60" 
                        />
                      </div>
                      <p className="text-gray-600">{caseStudy.summary}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Features - Show on Overview tab */}
            {activeTab === 'overview' && project.features && project.features.length > 0 && (
              <section>
                <h2 className="font-['Barlow'] font-bold text-[#101820] text-[24px] lg:text-[32px] mb-6">
                  Key Features
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[#003594] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Image src="/images/icons/check.svg" alt="Check" width={12} height={12} className="filter brightness-0 invert" />
                      </div>
                      <span className="font-['Poppins'] text-[#757575]">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Overview Cards Row */}
            {Array.isArray((project as any).overview_cards) && (project as any).overview_cards.length > 0 && (
              <div className="space-y-6">
                {((project as any).overview_cards as any[]).map((card: any, index: number) => (
                  <div key={card.id || index} className="bg-white rounded-lg p-6 shadow-sm">
                    {card.title && (
                      <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-4">{card.title}</h3>
                    )}
                    {/* Render by type */}
                    {card.type === 'links' && Array.isArray(card.items) && (
                      <div className="space-y-3">
                        {card.items.map((it: any, i: number) => (
                          <div key={i}>
                            <a href={it.url} target="_blank" rel="noopener noreferrer" className="text-[#003594] hover:text-[#0056b3] font-medium text-sm underline">• {it.title || it.url}</a>
                          </div>
                        ))}
                      </div>
                    )}
                    {card.type === 'bullets' && Array.isArray(card.items) && (
                      <ul className="space-y-2">
                        {card.items.map((it: any, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-[#003594] rounded-full flex-shrink-0 mt-2"></div>
                            <span className="font-['Poppins'] text-[#757575] text-sm">{it.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {card.type === 'text' && Array.isArray(card.items) && (
                      <div className="space-y-3">
                        {card.items.map((it: any, i: number) => (
                          <p key={i} className="font-['Poppins'] text-[#757575] text-sm leading-6">{it.text}</p>
                        ))}
                      </div>
                    )}
                    {card.type === 'title_subtitle' && Array.isArray(card.items) && (
                      <div className="space-y-3">
                        {card.items.map((it: any, i: number) => (
                          <div key={i}>
                            <div className="font-['Poppins'] font-medium text-[#101820] text-sm">{it.title}</div>
                            <div className="font-['Poppins'] text-[#757575] text-sm">{it.subtitle}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Project Links */}
            {Array.isArray(project.project_links) && project.project_links.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-4">
                  Project Resources
                </h3>
                <div className="space-y-3">
                  {project.project_links.map((link, index) => (
                    <div key={index}>
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#003594] hover:text-[#0056b3] font-medium text-sm underline"
                      >
                        • {link.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Leaders */}
            {Array.isArray(project.project_leaders) && project.project_leaders.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-4">
                  Leaders
                </h3>
                <div className="space-y-3">
                  {project.project_leaders.map((leader, index) => (
                    <div key={index}>
                      <div className="text-[#003594] hover:text-[#0056b3] font-medium text-sm">
                        {leader.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Social Links */}
            {Array.isArray(project.social_links) && project.social_links.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-4">
                  Downloads or Social Links
                </h3>
                <div className="space-y-3">
                  {project.social_links.map((link, index) => (
                    <div key={index}>
                      <a 
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#003594] hover:text-[#0056b3] font-medium text-sm underline"
                      >
                        • {link.platform}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Information */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-4">
                Project Information
              </h3>
              <div className="space-y-4">
                {project.language ? (
                  <div>
                    <div className="font-['Poppins'] font-medium text-[#101820] text-sm mb-1">Language</div>
                    <div className="font-['Poppins'] text-[#757575] text-sm">{project.language}</div>
                  </div>
                ) : null}
                
                {project.license ? (
                  <div>
                    <div className="font-['Poppins'] font-medium text-[#101820] text-sm mb-1">License</div>
                    <div className="font-['Poppins'] text-[#757575] text-sm">{project.license}</div>
                  </div>
                ) : null}
                
                {project.version ? (
                  <div>
                    <div className="font-['Poppins'] font-medium text-[#101820] text-sm mb-1">Latest Version</div>
                    <div className="font-['Poppins'] text-[#757575] text-sm">{project.version}</div>
                  </div>
                ) : null}
                
                {project.contributors !== undefined && project.contributors !== null ? (
                  <div>
                    <div className="font-['Poppins'] font-medium text-[#101820] text-sm mb-1">Contributors</div>
                    <div className="font-['Poppins'] text-[#757575] text-sm">{project.contributors}</div>
                  </div>
                ) : null}
                
                {project.github_stars !== undefined && project.github_stars !== null ? (
                  <div>
                    <div className="font-['Poppins'] font-medium text-[#101820] text-sm mb-1">GitHub Stars</div>
                    <div className="font-['Poppins'] text-[#757575] text-sm">{project.github_stars}</div>
                  </div>
                ) : null}
              </div>
            </div>

            {/* Requirements */}
            {Array.isArray(project.requirements) && project.requirements.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-4">
                  Requirements
                </h3>
                <ul className="space-y-2">
                  {project.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#003594] rounded-full flex-shrink-0 mt-2"></div>
                      <span className="font-['Poppins'] text-[#757575] text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Related Projects (temporarily hidden) */}

            {/* Security Advisories */}
            {project.security_advisories && project.security_advisories.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm border-l-4 border-red-500">
                <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-4 flex items-center gap-2">
                  <Image src="/images/icons/check-shield.svg" alt="Security" width={20} height={20} />
                  Security Advisories
                </h3>
                <div className="space-y-3">
                  {project.security_advisories.slice(0, 3).map((advisory, index) => (
                    <div key={index} className="border-l-2 border-red-200 pl-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          advisory.severity === 'critical' ? 'bg-red-100 text-red-800' :
                          advisory.severity === 'high' ? 'bg-orange-100 text-orange-800' :
                          advisory.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {advisory.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500">{advisory.date}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-900">{advisory.title}</p>
                      {advisory.fixed_in_version && (
                        <p className="text-xs text-green-600 mt-1">Fixed in v{advisory.fixed_in_version}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Integrations */}
            {project.integrations && project.integrations.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-4">
                  Integrations
                </h3>
                <div className="space-y-3">
                  {project.integrations.slice(0, 5).map((integration, index) => (
                    <div key={index}>
                      <a 
                        href={integration.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#003594] hover:text-[#0056b3] font-medium text-sm underline"
                      >
                        • {integration.name}
                      </a>
                      <p className="text-xs text-gray-600 ml-3">{integration.category}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Industry Usage */}
            {project.industry_usage && project.industry_usage.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-4">
                  Industry Usage
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.industry_usage.map((industry, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Compliance Standards */}
            {project.compliance_standards && project.compliance_standards.length > 0 && (
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-['Barlow'] font-bold text-[#101820] text-xl mb-4">
                  Compliance Standards
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.compliance_standards.map((standard, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {standard}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tags (temporarily hidden) */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}