import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function EuropeChapters() {
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());

  const toggleCountry = (country: string) => {
    const newExpanded = new Set(expandedCountries);
    if (newExpanded.has(country)) {
      newExpanded.delete(country);
    } else {
      newExpanded.add(country);
    }
    setExpandedCountries(newExpanded);
  };
  const europeanCountries = [
    {
      flag: "🇦🇹",
      country: "Austria",
      chapters: ["Klagenfurt"]
    },
    {
      flag: "🇧🇪",
      country: "Belgium",
      chapters: ["Belgium"]
    },
    {
      flag: "🇧🇦",
      country: "Bosnia & Herzegovina",
      chapters: ["Banja Luka Chapter"]
    },
    {
      flag: "🇧🇬",
      country: "Bulgaria",
      chapters: ["Sofia"]
    },
    {
      flag: "🇭🇷",
      country: "Croatia",
      chapters: ["Croatia"]
    },
    {
      flag: "🇨🇾",
      country: "Cyprus",
      chapters: ["Limassol"]
    },
    {
      flag: "🇨🇿",
      country: "Czech Republic",
      chapters: ["Czech Republic"]
    },
    {
      flag: "🇩🇰",
      country: "Denmark",
      chapters: ["Aarhus", "Copenhagen"]
    },
    {
      flag: "🇪🇪",
      country: "Estonia",
      chapters: ["Tallinn"]
    },
    {
      flag: "🇫🇴",
      country: "Faroe Islands",
      chapters: ["Torshavn"]
    },
    {
      flag: "🇫🇮",
      country: "Finland",
      chapters: ["Helsinki"]
    },
    {
      flag: "🇫🇷",
      country: "France",
      chapters: ["France"]
    },
    {
      flag: "🇩🇪",
      country: "Germany",
      chapters: ["Augsburg", "Berlin", "Cologne", "Frankfurt", "Germany", "Heilbronn", "Ruhrpott", "Stuttgart"]
    },
    {
      flag: "🇬🇷",
      country: "Greece",
      chapters: ["Athens"]
    },
    {
      flag: "🇭🇺",
      country: "Hungary",
      chapters: ["Hungary"]
    },
    {
      flag: "🇮🇪",
      country: "Ireland",
      chapters: ["Dublin"]
    },
    {
      flag: "🇮🇱",
      country: "Israel",
      chapters: ["Israel"]
    },
    {
      flag: "🇮🇹",
      country: "Italy",
      chapters: ["Italy"]
    },
    {
      flag: "🇱🇻",
      country: "Latvia",
      chapters: ["Riga"]
    },
    {
      flag: "🇱🇹",
      country: "Lithuania",
      chapters: ["Vilnius"]
    },
    {
      flag: "🇱🇺",
      country: "Luxembourg",
      chapters: ["Luxembourg City"]
    },
    {
      flag: "🇳🇱",
      country: "Netherlands",
      chapters: ["Netherlands"]
    },
    {
      flag: "🇲🇰",
      country: "North Macedonia",
      chapters: ["Skopje"]
    },
    {
      flag: "🇳🇴",
      country: "Norway",
      chapters: ["Bergen", "Oslo", "Stavanger"]
    },
    {
      flag: "🇵🇱",
      country: "Poland",
      chapters: ["Poland"]
    },
    {
      flag: "🇵🇹",
      country: "Portugal",
      chapters: ["Beja", "Coimbra", "Leiria", "Lisboa", "Porto"]
    },
    {
      flag: "🇷🇴",
      country: "Romania",
      chapters: ["Timisoara"]
    },
    {
      flag: "🇷🇺",
      country: "Russia",
      chapters: ["Moscow"]
    },
    {
      flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
      country: "Scotland",
      chapters: ["Scotland"]
    },
    {
      flag: "🇸🇮",
      country: "Slovenia",
      chapters: ["Ljubljana", "Maribor"]
    },
    {
      flag: "🇪🇸",
      country: "Spain",
      chapters: ["Barcelona", "Logroño", "Sevilla"]
    },
    {
      flag: "🇸🇪",
      country: "Sweden",
      chapters: ["Gothenburg", "JKPG", "Stockholm"]
    },
    {
      flag: "🇨🇭",
      country: "Switzerland",
      chapters: ["Switzerland"]
    },
    {
      flag: "🇹🇷",
      country: "Turkiye",
      chapters: ["Diyarbakır", "Izmir"]
    },
    {
      flag: "🇺🇦",
      country: "Ukraine",
      chapters: ["Kharkiv", "Kyiv", "Lviv", "Zhytomyr"]
    },
    {
      flag: "🇬🇧",
      country: "United Kingdom",
      chapters: ["Belfast", "Birmingham, UK", "Bristol, UK", "Cambridge", "Dorset", "Leeds, UK", "London", "Manchester", "Newcastle (UK)", "Peterborough", "Reading", "Suffolk", "Warwick"]
    }
  ];

  // Group countries into rows of 3
  const groupedCountries = [];
  for (let i = 0; i < europeanCountries.length; i += 3) {
    groupedCountries.push(europeanCountries.slice(i, i + 3));
  }

  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px pb-0 pt-0 px-0 relative shrink-0">
      <div className="box-border content-stretch flex flex-col gap-12 items-center justify-center pb-0 pt-6 px-0 relative shrink-0 w-full">
        {groupedCountries.map((row, rowIndex) => (
          <div key={rowIndex} className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full">
            {row.map((country, countryIndex) => (
              <div key={countryIndex} className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
                <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
                  <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                    <p className="block leading-[20px] whitespace-pre">{country.flag}</p>
                  </div>
                  <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                    <p className="block leading-[20px]">{country.country}</p>
                  </div>
                </div>
                <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
                                      {/* Show first 5 chapters */}
                    {country.chapters.slice(0, 5).map((chapter, chapterIndex) => (
                      <div key={chapterIndex} className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
                        <div className="w-6 shrink-0"></div>
                        <div className="w-1.5 shrink-0"></div>
                        <Link 
                          href={`/chapters/${chapter.toLowerCase().replace(/\s+/g, '-')}`}
                          className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full hover:text-[#002d7a] transition-colors cursor-pointer"
                        >
                          <p className="block leading-[24px] break-words">
                            {chapter}
                            <Image
                              alt=""
                              className="inline w-3 h-3 ml-1"
                              src="/images/icons/arrow-upright-figma.svg"
                              width={12}
                              height={12}
                            />
                          </p>
                        </Link>
                      </div>
                    ))}
                  
                                      {/* Show additional chapters if expanded */}
                    {expandedCountries.has(country.country) && country.chapters.slice(5).map((chapter, chapterIndex) => (
                      <div key={chapterIndex + 5} className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
                        <div className="w-6 shrink-0"></div>
                        <div className="w-1.5 shrink-0"></div>
                        <Link 
                          href={`/chapters/${chapter.toLowerCase().replace(/\s+/g, '-')}`}
                          className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full hover:text-[#002d7a] transition-colors cursor-pointer"
                        >
                          <p className="block leading-[24px] break-words">
                            {chapter}
                            <Image
                              alt=""
                              className="inline w-3 h-3 ml-1"
                              src="/images/icons/arrow-upright-figma.svg"
                              width={12}
                              height={12}
                            />
                          </p>
                        </Link>
                      </div>
                    ))}
                  
                  {/* Show "Show X more" button if there are more than 5 chapters */}
                  {country.chapters.length > 5 && (
                    <button
                      onClick={() => toggleCountry(country.country)}
                      className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full hover:bg-[#F4F4F4] transition-colors duration-200 rounded-sm"
                    >
                      <div className="w-6 shrink-0"></div>
                      <div className="w-1.5 shrink-0"></div>
                      <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#757575] text-[16px] text-left tracking-[-0.32px] max-w-full">
                        <p className="block leading-[24px] break-words">
                          {expandedCountries.has(country.country) 
                            ? "Show less" 
                            : `Show ${country.chapters.length - 5} more`
                          }
                          <svg 
                            className={`inline w-3 h-3 ml-1 transition-transform duration-200 ${
                              expandedCountries.has(country.country) ? 'rotate-180' : ''
                            }`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </p>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            ))}
            {/* Fill empty slots in the row if needed */}
            {row.length < 3 && Array.from({ length: 3 - row.length }, (_, i) => (
              <div key={`empty-${i}`} className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
} 