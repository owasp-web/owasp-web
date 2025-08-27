'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getProjects, type ProjectsResponse } from '@/lib/projects';
import { Project } from '@/lib/types';

interface ButtonProps {
  text?: string;
  type?: "Primary" | "Ghost White" | "Ghost Dark" | "Light Blue";
  size?: "40" | "48" | "56";
}

function Button({
  text = "Join Now",
  type = "Primary",
  size = "40",
}: ButtonProps) {
  if (type === "Primary" && size === "56") {
    return (
      <div className="bg-[#003594] box-border content-stretch flex flex-row gap-10 items-center justify-center px-8 py-0 relative h-14">
        <div className="font-['Poppins'] font-semibold text-[#ffffff] text-[16px] text-center text-nowrap tracking-[-0.32px] leading-[24px]">
          {text}
        </div>
      </div>
    );
  }
  if (type === "Ghost Dark" && size === "48") {
    return (
      <div className="box-border content-stretch flex flex-row gap-10 items-center justify-center px-6 py-0 relative h-12 border border-[#757575] border-solid">
        <div className="font-['Poppins'] font-semibold text-[#101820] text-[14px] text-center text-nowrap tracking-[-0.28px] leading-[20px]">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#003594] box-border content-stretch flex flex-row gap-10 items-center justify-center px-4 py-0 relative h-10">
      <div className="font-['Poppins'] font-semibold text-[#ffffff] text-[14px] text-center text-nowrap tracking-[-0.28px] leading-[20px]">
        {text}
      </div>
    </div>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  imageStyle?: React.CSSProperties;
  imageContainerClass?: string;
  slug: string;
}

function ProjectCard({ title, description, image, imageStyle, imageContainerClass, slug }: ProjectCardProps) {
  return (
    <Link href={`/projects/${slug}`} className="w-full">
      <div className="bg-[#ffffff] flex flex-col gap-3 p-3 w-full hover:shadow-lg transition-shadow duration-300">
        <div className={`bg-[#030303] flex items-center justify-center h-32 sm:h-36 lg:h-40 p-4 w-full ${imageContainerClass || ''}`}>
          <div 
            className="bg-center bg-contain bg-no-repeat w-full h-full"
            style={{ 
              backgroundImage: `url('${image}')`,
              ...imageStyle
            }}
          />
        </div>
        <div className="flex flex-col gap-3 lg:gap-4 items-start justify-center p-3 lg:p-4 w-full">
          <div className="flex flex-col gap-2 items-start justify-start w-full">
            <div className="flex flex-row gap-2 items-start justify-between w-full">
              <div className="font-['Barlow'] font-medium text-[#003594] text-[16px] sm:text-[18px] lg:text-[20px] text-left tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[20px] sm:leading-[22px] lg:leading-[24px] flex-1 min-w-0">
                {title}
              </div>
              <div className="relative w-5 h-5 lg:w-6 lg:h-6 shrink-0">
                <Image src="/images/icons/arrow-up-right.svg" alt="" fill className="object-contain opacity-60" />
              </div>
            </div>
            <div className="font-['Poppins'] text-[#757575] text-[13px] lg:text-[14px] text-left w-full leading-[18px] lg:leading-[20px]">
              {description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProjectInventorySection() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch total count and featured projects
        const [allProjectsResponse, featuredResponse] = await Promise.all([
          getProjects({ limit: 1 }), // Just to get total count
          getProjects({ featured: true, limit: 6 }) // Get featured projects for display
        ]);
        
        setTotalCount(allProjectsResponse.total);
        setFeaturedProjects(featuredResponse.projects);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="bg-[#f1f6fe]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003594]"></div>
            <span className="ml-3 text-[#757575]">Loading projects...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#f1f6fe]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f1f6fe]">
      {/* Centered container with proper spacing */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-16 items-center justify-start w-full">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-end justify-between w-full">
            <div className="flex-1 flex flex-col gap-6 lg:gap-8 items-start justify-start">
              <div className="font-['Barlow'] font-medium text-[#101820] text-[32px] sm:text-[40px] lg:text-[56px] text-left lg:text-center tracking-[-0.64px] lg:tracking-[-1.12px] leading-tight lg:leading-[56px]">
                OWASP Project Inventory ({totalCount})
              </div>
              <div className="font-['Poppins'] text-[#757575] text-sm sm:text-[16px] text-left tracking-[-0.32px] leading-[20px] sm:leading-[24px] w-full">
                Explore all OWASP tools, documentation, and code libraries, organized into three project tiers:
              </div>
            </div>
            <div className="flex flex-row gap-10 h-12 items-center justify-start lg:justify-center px-6 py-0 shrink-0">
              <Link href="/projects?view=all">
                <Button text="See All Projects" type="Ghost Dark" size="48" />
              </Link>
            </div>
          </div>

          {/* Three Tier Cards */}
          <div className="bg-[#ffffff] flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-start p-4 sm:p-6 lg:p-8 w-full rounded-lg">
            {/* Flagship Projects */}
            <Link href="/projects?view=level&level=flagship" className="flex-1">
              <div className="bg-[#ffffff] flex flex-col items-start justify-start p-0 relative border border-[#fdb77d] hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-[#101820] flex flex-row gap-2 items-center justify-center px-3 py-3 relative w-full">
                  <div className="relative size-5">
                    <div className="absolute h-[15px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[19px] bg-[#fdb77d] rounded-full" style={{ top: "calc(50% + 0.281px)" }} />
                  </div>
                  <div className="font-['Poppins'] font-medium text-[#ffffff] text-sm text-left text-nowrap tracking-[-0.28px] leading-[20px]">
                    Flagship Projects
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-start justify-center p-6 relative w-full">
                  <div className="font-['Poppins'] text-[#757575] text-xs text-center leading-[20px] w-full">
                    Projects that have demonstrated strategic value to OWASP and application security as a whole
                  </div>
                </div>
              </div>
            </Link>

            {/* Production Projects */}
            <Link href="/projects?view=level&level=production" className="flex-1">
              <div className="bg-[#ffffff] flex flex-col items-start justify-start p-0 relative border border-[#ccd8e0] hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-[#101820] flex flex-row gap-2 items-center justify-center px-3 py-3 relative w-full">
                  <div className="relative size-5">
                    <div className="absolute h-[15px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[19px] bg-[#ccd8e0] rounded-full" style={{ top: "calc(50% + 0.281px)" }} />
                  </div>
                  <div className="font-['Poppins'] font-medium text-[#ffffff] text-sm text-left text-nowrap tracking-[-0.28px] leading-[20px]">
                    Production Projects
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-start justify-center p-6 relative w-full">
                  <div className="font-['Poppins'] text-[#757575] text-xs text-center leading-[20px] w-full">
                    OWASP Production projects are production-ready projects
                  </div>
                </div>
              </div>
            </Link>

            {/* Other Projects */}
            <Link href="/projects?view=type" className="flex-1">
              <div className="bg-[#ffffff] flex flex-col items-start justify-start p-0 relative border border-[#b686fc] hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-[#101820] flex flex-row gap-2 items-center justify-center px-3 py-3 relative w-full">
                  <div className="relative size-5">
                    <div className="absolute h-[15px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[19px] bg-[#b686fc] rounded-full" style={{ top: "calc(50% + 0.281px)" }} />
                  </div>
                  <div className="font-['Poppins'] font-medium text-[#ffffff] text-sm text-left text-nowrap tracking-[-0.28px] leading-[20px]">
                    Other Projects
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-start justify-center p-6 relative w-full">
                  <div className="font-['Poppins'] text-[#757575] text-xs text-center leading-[20px] w-full">
                    The Lab and Incubator projects can be found here
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Project Grid Section */}
          <div className="flex flex-col gap-8 lg:gap-12 items-start justify-start w-full">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-end justify-between w-full">
              <div className="font-['Barlow'] font-medium text-[#101820] text-[20px] sm:text-[24px] lg:text-[32px] text-left tracking-[-0.4px] sm:tracking-[-0.48px] lg:tracking-[-0.64px] leading-tight lg:leading-[40px]">
                Featured Projects
              </div>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  title={project.title}
                  description={project.description}
                  image={project.image || '/images/icons/default-project.png'}
                  slug={project.slug}
                  imageStyle={{ 
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                  }}
                />
              ))}
            </div>

            {/* Load More Button */}
            <div className="flex flex-row gap-10 h-12 items-center justify-center px-6 py-0 w-full">
              <Link href="/projects?view=all">
                <Button text="Load More" type="Ghost Dark" size="48" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}