'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';
import AfricaChapters from '@/components/AfricaChapters';
import AsiaChapters from '@/components/AsiaChapters';
import CentralAmericaChapters from '@/components/CentralAmericaChapters';
import EuropeChapters from '@/components/EuropeChapters';
import NorthAmericaChapters from '@/components/NorthAmericaChapters';
import OceaniaChapters from '@/components/OceaniaChapters';
import SouthAmericaChapters from '@/components/SouthAmericaChapters';

interface Chapter {
  name: string;
  url?: string;
}

interface CountryChapters {
  country: string;
  chapters: Chapter[];
}

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

  const toggleRegion = (region: string) => {
    const newExpandedRegions = new Set(expandedRegions);
    if (newExpandedRegions.has(region)) {
      newExpandedRegions.delete(region);
    } else {
      newExpandedRegions.add(region);
    }
    setExpandedRegions(newExpandedRegions);
  };

  const regions = [
    "Africa",
    "Asia", 
    "Central America",
    "Europe",
    "North America",
    "Oceania",
    "South America"
  ];

  const chapterData: CountryChapters[] = [
    {
      country: "United States",
      chapters: [
        { name: "OWASP Atlanta", url: "/chapters/atlanta" },
        { name: "OWASP Austin", url: "/chapters/austin" },
        { name: "OWASP Boston", url: "/chapters/boston" },
        { name: "OWASP Chicago", url: "/chapters/chicago" },
        { name: "OWASP Denver", url: "/chapters/denver" },
        { name: "OWASP Detroit", url: "/chapters/detroit" },
        { name: "OWASP Houston", url: "/chapters/houston" },
        { name: "OWASP Las Vegas", url: "/chapters/las-vegas" },
        { name: "OWASP Los Angeles", url: "/chapters/los-angeles" },
        { name: "OWASP New York", url: "/chapters/new-york" },
        { name: "OWASP Portland", url: "/chapters/portland" },
        { name: "OWASP San Francisco", url: "/chapters/san-francisco" },
        { name: "OWASP Seattle", url: "/chapters/seattle" },
        { name: "OWASP Washington DC", url: "/chapters/washington-dc" },
      ]
    },
    {
      country: "Canada",
      chapters: [
        { name: "OWASP Calgary", url: "/chapters/calgary" },
        { name: "OWASP Montreal", url: "/chapters/montreal" },
        { name: "OWASP Ottawa", url: "/chapters/ottawa" },
        { name: "OWASP Toronto", url: "/chapters/toronto" },
        { name: "OWASP Vancouver", url: "/chapters/vancouver" },
      ]
    },
    {
      country: "United Kingdom",
      chapters: [
        { name: "OWASP Birmingham", url: "/chapters/birmingham" },
        { name: "OWASP Cambridge", url: "/chapters/cambridge" },
        { name: "OWASP Edinburgh", url: "/chapters/edinburgh" },
        { name: "OWASP London", url: "/chapters/london" },
        { name: "OWASP Manchester", url: "/chapters/manchester" },
      ]
    },
    {
      country: "Germany",
      chapters: [
        { name: "OWASP Berlin", url: "/chapters/berlin" },
        { name: "OWASP Frankfurt", url: "/chapters/frankfurt" },
        { name: "OWASP Hamburg", url: "/chapters/hamburg" },
        { name: "OWASP Munich", url: "/chapters/munich" },
        { name: "OWASP Stuttgart", url: "/chapters/stuttgart" },
      ]
    },
    {
      country: "France",
      chapters: [
        { name: "OWASP France", url: "/chapters/france" },
        { name: "OWASP Lyon", url: "/chapters/lyon" },
        { name: "OWASP Paris", url: "/chapters/paris" },
      ]
    },
    {
      country: "Netherlands",
      chapters: [
        { name: "OWASP Amsterdam", url: "/chapters/amsterdam" },
        { name: "OWASP Netherlands", url: "/chapters/netherlands" },
      ]
    },
    {
      country: "Australia",
      chapters: [
        { name: "OWASP Australia", url: "/chapters/australia" },
        { name: "OWASP Melbourne", url: "/chapters/melbourne" },
        { name: "OWASP Perth", url: "/chapters/perth" },
        { name: "OWASP Sydney", url: "/chapters/sydney" },
      ]
    },
    {
      country: "India",
      chapters: [
        { name: "OWASP Bangalore", url: "/chapters/bangalore" },
        { name: "OWASP Chennai", url: "/chapters/chennai" },
        { name: "OWASP Delhi", url: "/chapters/delhi" },
        { name: "OWASP Hyderabad", url: "/chapters/hyderabad" },
        { name: "OWASP Mumbai", url: "/chapters/mumbai" },
        { name: "OWASP Pune", url: "/chapters/pune" },
      ]
    },
    {
      country: "Japan",
      chapters: [
        { name: "OWASP Japan", url: "/chapters/japan" },
        { name: "OWASP Kansai", url: "/chapters/kansai" },
        { name: "OWASP Tokyo", url: "/chapters/tokyo" },
      ]
    },
    {
      country: "Brazil",
      chapters: [
        { name: "OWASP Brasília", url: "/chapters/brasilia" },
        { name: "OWASP Campinas", url: "/chapters/campinas" },
        { name: "OWASP Curitiba", url: "/chapters/curitiba" },
        { name: "OWASP Goiânia", url: "/chapters/goiania" },
        { name: "OWASP Porto Alegre", url: "/chapters/porto-alegre" },
        { name: "OWASP Rio de Janeiro", url: "/chapters/rio-de-janeiro" },
        { name: "OWASP Salvador", url: "/chapters/salvador" },
        { name: "OWASP São Paulo", url: "/chapters/sao-paulo" },
      ]
    },
    {
      country: "Argentina",
      chapters: [
        { name: "OWASP Argentina", url: "/chapters/argentina" },
        { name: "OWASP Buenos Aires", url: "/chapters/buenos-aires" },
        { name: "OWASP Córdoba", url: "/chapters/cordoba" },
      ]
    },
    {
      country: "Mexico",
      chapters: [
        { name: "OWASP Guadalajara", url: "/chapters/guadalajara" },
        { name: "OWASP Mexico", url: "/chapters/mexico" },
        { name: "OWASP Monterrey", url: "/chapters/monterrey" },
      ]
    },
    {
      country: "South Africa",
      chapters: [
        { name: "OWASP Cape Town", url: "/chapters/cape-town" },
        { name: "OWASP Johannesburg", url: "/chapters/johannesburg" },
      ]
    },
    {
      country: "Spain",
      chapters: [
        { name: "OWASP Barcelona", url: "/chapters/barcelona" },
        { name: "OWASP Madrid", url: "/chapters/madrid" },
        { name: "OWASP Spain", url: "/chapters/spain" },
      ]
    },
    {
      country: "Italy",
      chapters: [
        { name: "OWASP Italy", url: "/chapters/italy" },
        { name: "OWASP Milan", url: "/chapters/milan" },
        { name: "OWASP Rome", url: "/chapters/rome" },
      ]
    },
    {
      country: "Poland",
      chapters: [
        { name: "OWASP Krakow", url: "/chapters/krakow" },
        { name: "OWASP Poland", url: "/chapters/poland" },
        { name: "OWASP Warsaw", url: "/chapters/warsaw" },
      ]
    },
    {
      country: "Israel",
      chapters: [
        { name: "OWASP Israel", url: "/chapters/israel" },
        { name: "OWASP Tel Aviv", url: "/chapters/tel-aviv" },
      ]
    },
    {
      country: "Singapore",
      chapters: [
        { name: "OWASP Singapore", url: "/chapters/singapore" },
      ]
    },
    {
      country: "Turkey",
      chapters: [
        { name: "OWASP Istanbul", url: "/chapters/istanbul" },
        { name: "OWASP Turkey", url: "/chapters/turkey" },
      ]
    },
    {
      country: "Russia",
      chapters: [
        { name: "OWASP Moscow", url: "/chapters/moscow" },
        { name: "OWASP Russia", url: "/chapters/russia" },
        { name: "OWASP Saint Petersburg", url: "/chapters/saint-petersburg" },
      ]
    }
  ];

  // In the new design, we always show all data since collapsed view uses regions
  const displayedData = chapterData;

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
                  "url('data:image/svg+xml;utf8,<svg viewBox=\\\'0 0 720 720\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\' preserveAspectRatio=\\\'none\\\'><rect x=\\\'0\\\' y=\\\'0\\\' height=\\\'100%\\\' width=\\\'100%\\\' fill=\\\'url(%23grad)\\\' opacity=\\\'1\\\'/><defs><radialGradient id=\\\'grad\\\' gradientUnits=\\\'userSpaceOnUse\\\' cx=\\\'0\\\' cy=\\\'0\\\' r=\\\'10\\\' gradientTransform=\\\'matrix(-32.9 -37.25 -133.41 117.83 453 451.5)\\\'><stop stop-color=\\\'rgba(0,0,0,1)\\\' offset=\\\'0\\\'/><stop stop-color=\\\'rgba(4,6,8,1)\\\' offset=\\\'0.125\\\'/><stop stop-color=\\\'rgba(8,12,16,1)\\\' offset=\\\'0.25\\\'/><stop stop-color=\\\'rgba(16,24,33,1)\\\' offset=\\\'0.5\\\'/><stop stop-color=\\\'rgba(32,48,65,1)\\\' offset=\\\'1\\\'/></radialGradient></defs></svg>')",
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

            {/* Egypt Pin */}
            <div className="absolute contents left-[408px] top-[373px]" data-name="Egypt">
              <div className="absolute h-[55px] left-[408px] top-[373px] w-[42px]" data-name="Pin">
                <Image alt="" className="block max-w-none size-full" src="/images/icons/pin.svg" width={42} height={55} />
              </div>
              <div className="absolute bg-[#336639] left-[412px] overflow-clip rounded-[200px] size-[34px] top-[377px]" data-name="Flag">
                <div className="absolute bg-[#ffffff] h-[34px] left-[-5.667px] overflow-clip top-0 w-[45.333px]" data-name="EG - Egypt">
                  <div className="absolute contents top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="flag" style={{ left: "calc(50% + 0.001px)" }}>
                    <div className="absolute h-[34px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[45.333px]" data-name="contents" style={{ left: "calc(50% + 0.001px)" }}>
                      <Image alt="" className="block max-w-none size-full" src="/images/flags/egypt.svg" width={45} height={34} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Malaysia Pin */}
            <div className="absolute contents left-[614px] top-[402px]" data-name="Malaysia">
              <div className="absolute h-[55px] left-[614px] top-[402px] w-[42px]" data-name="Pin">
                <Image alt="" className="block max-w-none size-full" src="/images/icons/pin.svg" width={42} height={55} />
              </div>
              <div className="absolute bg-[#336639] left-[618px] overflow-clip rounded-[200px] size-[34px] top-[406px]" data-name="Flag">
                <div className="absolute bg-[#ffffff] h-[34px] left-[-5.667px] overflow-clip top-0 w-[45.333px]" data-name="MY - Malaysia">
                  <div className="absolute contents top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="flag" style={{ left: "calc(50% + 0.412px)" }}>
                    <div className="absolute h-[34px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[45.492px]" data-name="contents" style={{ left: "calc(50% + 0.412px)" }}>
                      <Image alt="" className="block max-w-none size-full" src="/images/flags/malaysia.svg" width={45} height={34} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* India Pin */}
            <div className="absolute contents left-[554px] top-[387px]" data-name="India">
              <div className="absolute h-[55px] left-[554px] top-[387px] w-[42px]" data-name="Pin">
                <Image alt="" className="block max-w-none size-full" src="/images/icons/pin.svg" width={42} height={55} />
              </div>
              <div className="absolute bg-[#336639] left-[558px] overflow-clip rounded-[200px] size-[34px] top-[391px]" data-name="Flag">
                <div className="absolute bg-[#ffffff] h-[34px] left-[-5.667px] overflow-clip top-0 w-[45.333px]" data-name="IN - India">
                  <div className="absolute contents top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="flag" style={{ left: "calc(50% + 0.333px)" }}>
                    <div className="absolute h-[34px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[45.333px]" data-name="contents" style={{ left: "calc(50% + 0.333px)" }}>
                      <Image alt="" className="block max-w-none size-full" src="/images/flags/india.svg" width={45} height={34} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Finland Pin */}
            <div className="absolute contents left-[368px] top-[230px]" data-name="Finland">
              <div className="absolute h-[55px] left-[368px] top-[230px] w-[42px]" data-name="Pin">
                <Image alt="" className="block max-w-none size-full" src="/images/icons/pin.svg" width={42} height={55} />
              </div>
              <div className="absolute bg-[#336639] left-[372px] overflow-clip rounded-[200px] size-[34px] top-[234px]" data-name="Flag">
                <div className="absolute bg-[#ffffff] h-[34px] left-[-5.667px] overflow-clip top-0 w-[45.333px]" data-name="FI - Finland">
                  <div className="absolute contents top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="flag" style={{ left: "calc(50% + 0.333px)" }}>
                    <div className="absolute h-[34px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[45.333px]" data-name="contents" style={{ left: "calc(50% + 0.333px)" }}>
                      <Image alt="" className="block max-w-none size-full" src="/images/flags/finland.svg" width={45} height={34} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Germany Pin */}
            <div className="absolute contents left-[392px] top-[275px]" data-name="Germany">
              <div className="absolute h-[55px] left-[392px] top-[275px] w-[42px]" data-name="Pin">
                <Image alt="" className="block max-w-none size-full" src="/images/icons/pin.svg" width={42} height={55} />
              </div>
              <div className="absolute bg-[#336639] left-[396px] overflow-clip rounded-[200px] size-[34px] top-[279px]" data-name="Flag">
                <div className="absolute bg-[#ffffff] h-[34px] overflow-clip top-1/2 translate-x-[-50%] translate-y-[-50%] w-[45.333px]" data-name="DE - Germany" style={{ left: "calc(50% - 0.333px)" }}>
                  <div className="absolute contents top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="flag" style={{ left: "calc(50% + 0.333px)" }}>
                    <div className="absolute h-[34px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[45.333px]" data-name="contents" style={{ left: "calc(50% + 0.333px)" }}>
                      <Image alt="" className="block max-w-none size-full" src="/images/flags/germany.svg" width={45} height={34} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* France Pin */}
            <div className="absolute contents left-[349px] top-[294px]" data-name="France">
              <div className="absolute h-[55px] left-[349px] top-[294px] w-[42px]" data-name="Pin">
                <Image alt="" className="block max-w-none size-full" src="/images/icons/pin.svg" width={42} height={55} />
              </div>
              <div className="absolute bg-[#336639] left-[353px] overflow-clip rounded-[200px] size-[34px] top-[298px]" data-name="Flag">
                <div className="absolute bg-[#ffffff] h-[34px] left-[-5.667px] overflow-clip top-0 w-[45.333px]" data-name="FR - France">
                  <div className="absolute contents top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="flag" style={{ left: "calc(50% + 0.334px)" }}>
                    <div className="absolute h-[34px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[45.334px]" data-name="contents" style={{ left: "calc(50% + 0.334px)" }}>
                      <Image alt="" className="block max-w-none size-full" src="/images/flags/france.svg" width={45} height={34} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* USA Pin */}
            <div className="absolute contents left-[67px] top-[296px]" data-name="USA">
              <div className="absolute h-[55px] left-[67px] top-[296px] w-[42px]" data-name="Pin">
                <Image alt="" className="block max-w-none size-full" src="/images/icons/pin.svg" width={42} height={55} />
              </div>
              <div className="absolute bg-[#336639] left-[71px] overflow-clip rounded-[200px] size-[34px] top-[300px]" data-name="Flag">
                <div className="absolute bg-[#ffffff] h-[34px] overflow-clip top-0 translate-x-[-50%] w-[45.333px]" data-name="US - United States" style={{ left: "calc(50% - 4.333px)" }}>
                  <div className="absolute contents top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="flag" style={{ left: "calc(50% + 0.333px)" }}>
                    <div className="absolute h-[34px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[45.333px]" data-name="contents" style={{ left: "calc(50% + 0.333px)" }}>
                      <Image alt="" className="block max-w-none size-full" src="/images/flags/usa.svg" width={45} height={34} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Canada Pin */}
            <div className="absolute contents left-[41px] top-[219px]" data-name="Canada">
              <div className="absolute h-[55px] left-[41px] top-[219px] w-[42px]" data-name="Pin">
                <Image alt="" className="block max-w-none size-full" src="/images/icons/pin.svg" width={42} height={55} />
              </div>
              <div className="absolute bg-[#336639] left-[45px] overflow-clip rounded-[200px] size-[34px] top-[223px]" data-name="Flag">
                <div className="absolute bg-[#ffffff] h-[34px] left-[-5.667px] overflow-clip top-0 w-[45.333px]" data-name="CA - Canada">
                  <Image alt="" className="block max-w-none size-full" src="/images/flags/canada.svg" width={45} height={34} />
                </div>
              </div>
            </div>

            {/* Mexico Pin */}
            <div className="absolute contents left-[45px] top-[370px]" data-name="Mexico">
              <div className="absolute h-[55px] left-[45px] top-[370px] w-[42px]" data-name="Pin">
                <Image alt="" className="block max-w-none size-full" src="/images/icons/pin.svg" width={42} height={55} />
              </div>
              <div className="absolute bg-[#336639] left-[49px] overflow-clip rounded-[200px] size-[34px] top-[374px]" data-name="Flag">
                <div className="absolute bg-[#ffffff] h-[34px] overflow-clip top-0 translate-x-[-50%] w-[45.333px]" data-name="MX - Mexico" style={{ left: "calc(50% - 0.333px)" }}>
                  <div className="absolute contents top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="flag" style={{ left: "calc(50% + 0.334px)" }}>
                    <div className="absolute h-[34px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[45.334px]" data-name="contents" style={{ left: "calc(50% + 0.334px)" }}>
                      <Image alt="" className="block max-w-none size-full" src="/images/flags/mexico.svg" width={45} height={34} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Brazil Pin */}
            <div className="absolute contents left-52 top-[482px]" data-name="Brazil">
              <div className="absolute h-[55px] left-52 top-[482px] w-[42px]" data-name="Pin">
                <Image alt="" className="block max-w-none size-full" src="/images/icons/pin.svg" width={42} height={55} />
              </div>
              <div className="absolute bg-[#336639] left-[212px] overflow-clip rounded-[200px] size-[34px] top-[486px]" data-name="Flag">
                <div className="absolute bg-[#ffffff] h-[34px] left-[-5.667px] overflow-clip top-0 w-[45.333px]" data-name="BR - Brazil">
                  <div className="absolute contents top-1/2 translate-x-[-50%] translate-y-[-50%]" data-name="flag" style={{ left: "calc(50% + 0.333px)" }}>
                    <div className="absolute h-[34px] top-1/2 translate-x-[-50%] translate-y-[-50%] w-[45.333px]" data-name="contents" style={{ left: "calc(50% + 0.333px)" }}>
                      <Image alt="" className="block max-w-none size-full" src="/images/flags/brazil.svg" width={45} height={34} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter Listing Section */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 relative z-10 bg-white">
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
                {/* Horizontal line between text and icon */}
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
                  {region === "Africa" ? (
                    <AfricaChapters />
                  ) : region === "Asia" ? (
                    <AsiaChapters />
                  ) : region === "Central America" ? (
                    <CentralAmericaChapters />
                  ) : region === "Europe" ? (
                    <EuropeChapters />
                  ) : region === "North America" ? (
                    <NorthAmericaChapters />
                  ) : region === "Oceania" ? (
                    <OceaniaChapters />
                  ) : region === "South America" ? (
                    <SouthAmericaChapters />
                  ) : (
                    <div className="space-y-6">
                      {displayedData
                        .filter(countryData => {
                          // Simple region mapping - you might want to make this more sophisticated
                          const countryToRegion: { [key: string]: string } = {
                            "United States": "North America",
                            "Canada": "North America",
                            "Mexico": "Central America",
                            "United Kingdom": "Europe",
                            "Germany": "Europe",
                            "France": "Europe",
                            "Netherlands": "Europe",
                            "Spain": "Europe",
                            "Italy": "Europe",
                            "Poland": "Europe",
                            "Australia": "Oceania",
                            "India": "Asia",
                            "Japan": "Asia",
                            "Singapore": "Asia",
                            "Turkey": "Asia",
                            "Russia": "Asia",
                            "Israel": "Asia",
                            "Brazil": "South America",
                            "Argentina": "South America",
                            "South Africa": "Africa"
                          };
                          return countryToRegion[countryData.country] === region;
                        })
                        .map((countryData, countryIndex) => (
                          <div key={countryIndex} className="border-b border-[#F4F4F4] pb-4">
                            <h4 className="font-['Barlow'] font-medium text-[16px] text-[#101820] leading-[20px] mb-3">
                              {countryData.country}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
                              {countryData.chapters.map((chapter, chapterIndex) => (
                                <Link
                                  key={chapterIndex}
                                  href={chapter.url || '#'}
                                  className="font-['Poppins'] text-[14px] text-[#003594] hover:text-[#00A7E1] transition-colors duration-200 hover:underline"
                                >
                                  {chapter.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

                 {/* Important Links & OWASP Videos */}
        <div className="bg-[#F1F6FE] rounded-lg p-6 sm:p-8 lg:p-12 xl:p-16 mt-12 sm:mt-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-20 items-start justify-start w-full">
            {/* Important Links Column */}
            <div className="flex-1 flex flex-col gap-3 sm:gap-4 items-start justify-start">
              <h3 className="font-['Barlow'] font-medium text-lg sm:text-[20px] text-[#101820] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px] w-full">
                Important Links
              </h3>
              <div className="flex flex-col gap-4 sm:gap-6 items-start justify-start w-full">
                <a 
                  href="mailto:chapters@owasp.org" 
                  className="flex flex-row gap-2 items-center justify-start group hover:opacity-80 transition-opacity"
                >
                  <span className="font-['Poppins'] font-medium text-sm text-[#003594] leading-[18px] sm:leading-[20px]">
                    Contact Us - Chapter Support
                  </span>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H3.5M8.5 3.5V8.5" stroke="#003594" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
                <a 
                  href="https://owasp.org/leaders/" 
                  className="flex flex-row gap-2 items-center justify-start group hover:opacity-80 transition-opacity"
                >
                  <span className="font-['Poppins'] font-medium text-sm text-[#003594] leading-[18px] sm:leading-[20px]">
                    All Chapter Leaders
                  </span>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H3.5M8.5 3.5V8.5" stroke="#003594" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
                <a 
                  href="https://owasp.org/chapters/status/" 
                  className="flex flex-row gap-2 items-center justify-start group hover:opacity-80 transition-opacity"
                >
                  <span className="font-['Poppins'] font-medium text-sm text-[#003594] leading-[18px] sm:leading-[20px]">
                    Chapter Status
                  </span>
                  <div className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H3.5M8.5 3.5V8.5" stroke="#003594" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>

            {/* OWASP Videos Column */}
            <div className="flex-1 flex flex-col gap-4 items-start justify-start">
              <h3 className="font-['Barlow'] font-medium text-[20px] text-[#101820] leading-[24px] tracking-[-0.4px] w-full">
                OWASP Videos
              </h3>
              <div className="flex flex-col gap-6 items-start justify-start w-full">
                <a 
                  href="https://www.youtube.com/user/OWASPGLOBAL" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-2 items-center justify-start group hover:opacity-80 transition-opacity"
                >
                  <span className="font-['Poppins'] font-medium text-[14px] text-[#003594] leading-[20px] whitespace-nowrap">
                    OWASP GLOBAL YouTube Channel
                  </span>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H3.5M8.5 3.5V8.5" stroke="#003594" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
                <a 
                  href="https://www.youtube.com/watch?v=example" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-row gap-2 items-center justify-start group hover:opacity-80 transition-opacity"
                >
                  <span className="font-['Poppins'] font-medium text-[14px] text-[#003594] leading-[20px] whitespace-nowrap">
                    How to create the OWASP chapter page
                  </span>
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.5 8.5L8.5 3.5M8.5 3.5H3.5M8.5 3.5V8.5" stroke="#003594" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 