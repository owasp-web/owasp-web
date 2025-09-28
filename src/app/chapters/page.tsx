'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import { createClientComponentClient } from '@/lib/supabase';
import type { Chapter } from '@/lib/types';

// Button component from Figma
interface ButtonProps {
  text?: string;
  type?: "Primary" | "Ghost White" | "Ghost Dark" | "Light Blue";
  size?: "40" | "48" | "56";
}

function FigmaButton({
  text = "Join Now",
  type = "Primary",
  size = "40",
}: ButtonProps) {
  if (type === "Ghost White" && size === "56") {
    return (
      <div
        className="box-border content-stretch flex flex-row gap-10 items-center justify-center px-8 py-0 relative h-14"
        data-name="Type=Ghost White, Size=56"
      >
        <div className="absolute border border-[#757575] border-solid inset-0 pointer-events-none" />
        <div
          className="font-['Poppins'] font-semibold leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-center text-nowrap tracking-[-0.32px]"
        >
          <p className="block leading-[24px] whitespace-pre">
            {text}
          </p>
        </div>
      </div>
    );
  }
  return null;
}

export default function ChaptersPage() {
  const [expandedRegions, setExpandedRegions] = useState<Set<string>>(new Set());
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const searchParams = useSearchParams();

  const toggleRegion = (region: string) => {
    const newExpandedRegions = new Set(expandedRegions);
    if (newExpandedRegions.has(region)) {
      newExpandedRegions.delete(region);
    } else {
      newExpandedRegions.add(region);
    }
    setExpandedRegions(newExpandedRegions);
  };

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const supabase = createClientComponentClient();
        const { data, error } = await supabase
          .from('chapters')
          .select('*')
          .eq('is_active', true)
          .order('region', { ascending: true })
          .order('name', { ascending: true });
        if (error) throw error;
        setChapters((data as unknown as Chapter[]) || []);
      } catch (e) {
        console.error('Failed to load chapters:', e);
        setChapters([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // Initialize query from URL (e.g., /chapters?query=cairo)
  useEffect(() => {
    const q = (searchParams?.get('query') || '').trim();
    if (q) setQuery(q);
  }, [searchParams]);

  const regions = [
    "Africa",
    "Asia",
    "Central America",
    "Europe",
    "North America",
    "Oceania",
    "South America"
  ];

  const filteredChapters = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chapters;
    return chapters.filter(c => c.name.toLowerCase().includes(q) || c.city.toLowerCase().includes(q) || c.country.toLowerCase().includes(q));
  }, [chapters, query]);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      {/* Hero Section */}
      <div
        className="bg-[#101820] flex flex-col gap-6 lg:gap-8 items-start justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 relative w-full min-h-[400px] sm:min-h-[500px] overflow-hidden"
        data-name="Hero"
      >
        <div
          className="absolute h-[300px] sm:h-[402px] top-0 w-[360px] sm:w-[480px] opacity-20 sm:opacity-100"
          data-name="Ray"
          style={{ left: "calc(25% + 60px)", display: 'none' }}
        >
          <div className="absolute bottom-[-49.751%] left-[-124.166%] right-[-123.939%] top-[-218.905%]">
            <Image
              alt=""
              className="block max-w-none size-full"
              src="/images/ray.svg"
              width={480}
              height={402}
            />
          </div>
        </div>
        <div
          className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start justify-start relative shrink-0 w-full"
          data-name="Container"
        >
          <div
            className="flex-1 flex flex-col items-start justify-between min-h-px min-w-px relative self-stretch"
          >
            <div
              className="flex flex-col gap-6 lg:gap-8 items-start justify-center relative shrink-0 w-full"
            >
              <div
                className="font-['Barlow'] font-medium text-[#ffffff] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-tight xl:leading-[64px] tracking-[-0.64px] sm:tracking-[-0.8px] lg:tracking-[-1.12px] xl:tracking-[-1.28px] w-full"
              >
                <p>OWASP Local Chapters</p>
              </div>
              <div
                className="font-['Poppins'] text-[#f4f4f4] text-sm sm:text-base leading-6 tracking-[-0.28px] sm:tracking-[-0.32px] w-full max-w-2xl"
              >
                <p>
                  OWASP Local Chapters bring application security professionals
                  together around the world. Meetings are free and open to
                  everyone, members and non‑members alike.
                  <br />
                  <br />
                  Local meetings include training to build your skills, talks on
                  relevant topics, and opportunities to connect with others in the
                  field.
                </p>
              </div>
            </div>
            <div
              className="flex flex-row gap-6 lg:gap-10 h-12 sm:h-14 items-center justify-start relative shrink-0 mt-6 lg:mt-0"
              data-name="Button"
            >
              <FigmaButton
                text="RSVP for Local Meetings"
                type="Ghost White"
                size="56"
              />
            </div>
          </div>
          <div
            className="h-[500px] relative shrink-0 w-[560px]"
            data-name="Map"
          >
            <div
              className="absolute bg-[#9fbef4] blur-[150px] filter left-[70px] opacity-60 rounded-[2571.43px] size-[640px] top-10"
              data-name="Blur"
            />
            <div
              className="absolute left-[30px] overflow-clip rounded-[2571.43px] size-[720px] top-0"
              data-name="Circle Globe"
              style={{
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg viewBox=\\'0 0 720 720\\' xmlns=\\'http://www.w3.org/2000/svg\\' preserveAspectRatio=\\'none\\'><rect x=\\'0\\' y=\\'0\\' height=\\'100%\\' width=\\'100%\\' fill=\\'url(%23grad)\\' opacity=\\'1\\'/><defs><radialGradient id=\\'grad\\' gradientUnits=\\'userSpaceOnUse\\' cx=\\'0\\' cy=\\'0\\' r=\\'10\\' gradientTransform=\\'matrix(-32.9 -37.25 -133.41 117.83 453 451.5)\\'><stop stop-color=\\'rgba(0,0,0,1)\\' offset=\\'0\\'/><stop stop-color=\\'rgba(4,6,8,1)\\' offset=\\'0.125\\'/><stop stop-color=\\'rgba(8,12,16,1)\\' offset=\\'0.25\\'/><stop stop-color=\\'rgba(16,24,33,1)\\' offset=\\'0.5\\'/><stop stop-color=\\'rgba(32,48,65,1)\\' offset=\\'1\\'/></radialGradient></defs></svg>')",
              }}
            >
              <div
                className="absolute h-[637.714px] left-[-136.494px] top-[41.143px] w-[992.989px]"
                data-name="World Map"
              >
                <Image
                  alt=""
                  className="block max-w-none size-full"
                  src="/images/world-map.svg"
                  width={993}
                  height={638}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Listing Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 relative z-10 bg:white">
        {/* Section Header with Search */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 sm:mb-12 gap-6 lg:gap-0">
          <div>
            <h2 className="font-['Barlow'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] text-[#101820] leading-tight lg:leading-[40px] tracking-[-0.48px] sm:tracking-[-0.56px] lg:tracking-[-0.64px] mb-2">
              Chapter Listing
            </h2>
            <p className="font-['Poppins'] text-[#757575] text-sm leading-[18px] sm:leading-[20px]">
              Browse all OWASP chapters worldwide
            </p>
          </div>

          <div className="flex w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search chapter"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="px-3 sm:px-4 py-2 border border-[#D7D7D7] rounded-l-sm focus:outline-none focus:ring-1 focus:ring-[#003594] focus:border-[#003594] text-sm font-['Poppins'] flex-1 lg:flex-none lg:w-64"
            />
            <button className="bg-[#003594] text-white px-3 sm:px-4 py-2 rounded-r-sm text-sm font-['Poppins'] font-semibold hover:bg-[#002a7a] transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Chapters List - Collapsed View */}
        <div className="space-y-0">
          {regions.map((region, regionIndex) => (
            <div key={regionIndex} className="">
              <button
                onClick={() => toggleRegion(region)}
                className="w-full flex items-center py-6 text-left hover:bg-[#F4F4F4] transition-colors duration-200"
              >
                <h3 className="font-['Barlow'] font-medium text-[20px] text-[#101820] leading-[24px]">
                  {region}
                </h3>
                <div className="flex-1 border-b border-[#D7D7D7] mx-4"></div>
                <svg
                  className={`w-5 h-5 text-[#757575] transition-transform duration-200 ${
                    expandedRegions.has(region) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {expandedRegions.has(region) && (
                <div className="pb-6 pl-0">
                  {loading ? (
                    <div className="text-sm text-[#757575]">Loading…</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                      {filteredChapters
                        .filter(c => c.region === (region as Chapter['region']))
                        .map((c) => (
                          <Link
                            key={c.id}
                            href={`/chapters/${c.slug}`}
                            className="font-['Poppins'] text-[14px] text-[#003594] hover:text-[#00A7E1] transition-colors duration-200 hover:underline"
                          >
                            {c.name}
                          </Link>
                        ))}
                      {filteredChapters.filter(c => c.region === (region as Chapter['region'])).length === 0 && (
                        <div className="text-sm text-[#757575]">No chapters</div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
} 