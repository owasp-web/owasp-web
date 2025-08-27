import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function AsiaChapters() {
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

  return (
    <div className="box-border content-stretch flex flex-col gap-2.5 grow items-start justify-start min-h-px min-w-px pb-0 pt-0 px-0 relative shrink-0">
      <div className="box-border content-stretch flex flex-col gap-12 items-center justify-center pb-0 pt-6 px-0 relative shrink-0 w-full">
        
        {/* Row 1: Armenia, Azerbaijan, Bangladesh */}
        <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full">
          {/* Armenia */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇦🇲</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Armenia</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Yerevan
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Azerbaijan */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇦🇿</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Azerbaijan</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <Link 
                  href={`/chapters/${`Baku`.toLowerCase()}`}
                  className="block leading-[24px] break-words hover:underline"
                >
                  Baku
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </Link>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Nakhchivan
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Bangladesh */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇧🇩</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Bangladesh</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Dhaka
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: China, India, Indonesia */}
        <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full">
          {/* China */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇨🇳</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">China</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  China-Mainland
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Hong Kong
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* India */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇮🇳</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">India</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Ahmedabad
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Bangalore
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Bharati Vidyapeeth (Deemed to be University) College of Engineering
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Bhopal
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Bhubaneswar
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            
            {/* Show more for India */}
            {expandedCountries.has('India') && (
              <>
                {['Chandigarh', 'Chennai', 'Chennai Institute of Technology', 'Coimbatore', 'Cuddalore', 'Dehradun', 'GLA University Mathura', 'Gujarat Technological University - Student Chapter', 'Gurugram', 'Hyderabad', 'IIIT Sri City - Student Chapter', 'IIITDM Kancheepuram Student Chapter', 'Indian Institute of Information Technology Kottayam', 'Indian Institute of Technology Bhilai', 'IIT Patna - Student Chapter', 'Indore', 'Indraprastha Institute of Information Technology - Student Chapter', 'Jaihind College of Engineering Kuran', 'Jalpaiguri Government Engineering College', 'JIS University', 'Kalasalingam Academy of Research and Education', 'Kallakurichi', 'Kalyan', 'Kannur', 'Kanpur', 'Kerala', 'Kolkata', 'Kuala Lumpur', 'Kumaraguru College of Technology - Student Chapter', 'Mahendra Engineering College Student Chapter', 'Manipal Institute of Technology', 'Mumbai', 'Nagpur', 'National Institute of Engineering Mysuru', 'Noida', 'Patna', 'PSNA College of Engineering and Technology', 'Pune', 'Rajasthan Technical University', 'Rajiv Gandhi Institute of Petroleum Technology', 'Rewa', 'RMK College of Engineering and Technology', 'RV University Student Chapter', 'Salem', 'Sastra University - Student Chapter', 'Sathyabama Institute of Science and Technology - Student Chapter', 'Sivagangai', 'Sri Ramakrishna Engineering College', 'Sri Sairam Engineering College', 'SRM Easwari Engineering College', 'St. John College of Engineering and Management', "St. Joseph's Group of Institutions", 'TCET (Thakur College of Engineering and Technology)', 'Thapar Institute of Engineering and Technology', 'Tiruchirappalli', 'Tirunelveli', 'Tiruvallur', 'Varanasi', 'Visakhapatnam', 'VIT Bhopal University - Student Chapter', 'Yenepoya Institute'].map((chapter) => (
                  <div key={chapter} className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
                    <div className="w-6 shrink-0"></div>
                    <div className="w-1.5 shrink-0"></div>
                    <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
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
                    </div>
                  </div>
                ))}
              </>
            )}
            
            <button
              onClick={() => toggleCountry('India')}
              className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full hover:bg-[#F4F4F4] transition-colors duration-200 rounded-sm"
            >
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#757575] text-[16px] text-left tracking-[-0.32px] max-w-full">
                <p className="block leading-[24px] break-words">
                  {expandedCountries.has('India') ? 'Show less' : 'Show 64 more'}
                  <svg 
                    className={`inline w-3 h-3 ml-1 transition-transform duration-200 ${
                      expandedCountries.has('India') ? 'rotate-180' : ''
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
          </div>

          {/* Indonesia */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇮🇩</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Indonesia</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Jakarta
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Surabaya
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3: Japan, Jordan, Kingdom of Saudi Arabia */}
        <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full">
          {/* Japan */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇯🇵</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Japan</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Fukuoka
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Fukushima
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Japan
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Kansai
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Nagoya
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            
            {/* Show more for Japan */}
            {expandedCountries.has('Japan') && (
              <>
                {['Okinawa', 'Saitama', 'Sendai'].map((chapter) => (
                  <div key={chapter} className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
                    <div className="w-6 shrink-0"></div>
                    <div className="w-1.5 shrink-0"></div>
                    <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
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
                    </div>
                  </div>
                ))}
              </>
            )}
            
            <button
              onClick={() => toggleCountry('Japan')}
              className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full hover:bg-[#F4F4F4] transition-colors duration-200 rounded-sm"
            >
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#757575] text-[16px] text-left tracking-[-0.32px] max-w-full">
                <p className="block leading-[24px] break-words">
                  {expandedCountries.has('Japan') ? 'Show less' : 'Show 3 more'}
                  <svg 
                    className={`inline w-3 h-3 ml-1 transition-transform duration-200 ${
                      expandedCountries.has('Japan') ? 'rotate-180' : ''
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
          </div>

          {/* Jordan */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇯🇴</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Jordan</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Amman
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Kingdom of Saudi Arabia */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇸🇦</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Kingdom of Saudi Arabia</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Riyadh
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 4: Korea (South), Kuwait, Malaysia */}
        <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full">
          {/* Korea (South) */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇰🇷</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Korea (South)</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Seoul
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Kuwait */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇰🇼</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Kuwait</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Kuwait City
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Malaysia */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇲🇾</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Malaysia</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Penang
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 5: Nepal, Pakistan, Philippines */}
        <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full">
          {/* Nepal */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇳🇵</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Nepal</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Kathmandu
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Pakistan */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇵🇰</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Pakistan</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Bahria University Lahore
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Karachi
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Lahore
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Rawalpindi
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Swabi
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Philippines */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇵🇭</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Philippines</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Manila
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 6: Singapore, Taiwan, Thailand */}
        <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full">
          {/* Singapore */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇸🇬</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Singapore</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Singapore
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Taiwan */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇹🇼</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Taiwan</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Taiwan
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Thailand */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇹🇭</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Thailand</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Bangkok
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 7: Turkey, United Arab Emirates, Uzbekistan */}
        <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 w-full">
          {/* Turkey */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇹🇷</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Turkey</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Adana
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Ankara
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Bursa Technical University
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Firat University
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Istanbul
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
            
            {/* Show more for Turkey */}
            {expandedCountries.has('Turkey') && (
              <>
                {['MEF University - Student Chapter', 'Mugla University - Student Chapter'].map((chapter) => (
                  <div key={chapter} className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
                    <div className="w-6 shrink-0"></div>
                    <div className="w-1.5 shrink-0"></div>
                    <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
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
                    </div>
                  </div>
                ))}
              </>
            )}
            
            <button
              onClick={() => toggleCountry('Turkey')}
              className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full hover:bg-[#F4F4F4] transition-colors duration-200 rounded-sm"
            >
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#757575] text-[16px] text-left tracking-[-0.32px] max-w-full">
                <p className="block leading-[24px] break-words">
                  {expandedCountries.has('Turkey') ? 'Show less' : 'Show 2 more'}
                  <svg 
                    className={`inline w-3 h-3 ml-1 transition-transform duration-200 ${
                      expandedCountries.has('Turkey') ? 'rotate-180' : ''
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
          </div>

          {/* United Arab Emirates */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇦🇪</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">United Arab Emirates</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Dubai
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>

          {/* Uzbekistan */}
          <div className="basis-0 box-border content-stretch flex flex-col gap-4 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
            <div className="box-border content-stretch flex flex-row gap-1.5 items-center justify-start leading-[0] not-italic p-0 relative shrink-0 text-left w-60">
              <div className="font-['Barlow'] font-medium relative shrink-0 text-[#101820] text-[20px] text-nowrap tracking-[-0.4px] w-6">
                <p className="block leading-[20px] whitespace-pre">🇺🇿</p>
              </div>
              <div className="basis-0 font-['Poppins'] grow min-h-px min-w-px relative shrink-0 text-[#757575] text-[14px]">
                <p className="block leading-[20px]">Uzbekistan</p>
              </div>
            </div>
            <div className="box-border content-stretch flex flex-row gap-0.5 items-start justify-start pl-0 pr-0 py-0 relative shrink-0 w-full">
              <div className="w-6 shrink-0"></div>
              <div className="w-1.5 shrink-0"></div>
              <div className="font-['Barlow'] font-medium leading-[0] not-italic relative text-[#003594] text-[20px] text-left tracking-[-0.4px] max-w-full">
                <p className="block leading-[24px] break-words">
                  Tashkent
                  <Image
                    alt=""
                    className="inline w-3 h-3 ml-1"
                    src="/images/icons/arrow-upright-figma.svg"
                    width={12}
                    height={12}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 