import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Button from '@/components/Button';

export default function AboutPage() {
    const values = [
    {
      icon: "/images/icons/book-open.svg",
      title: "Open",
      description: "Everything at OWASP is radically transparent from our finances to our code."
    },
    {
      icon: "/images/icons/code.svg",
      title: "Innovation",
      description: "We encourage and support innovation and experiments for solutions to software security challenges."
    },
    {
      icon: "/images/icons/globe.svg",
      title: "Global",
      description: "Anyone around the world is encouraged to participate in the OWASP community."
    },
    {
      icon: "/images/icons/check-shield.svg",
      title: "Integrity",
      description: "Our community is respectful, supportive, truthful, and vendor neutral"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-[#F1F6FE]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] pt-12 sm:pt-16 lg:pt-20 pb-20 sm:pb-32 lg:pb-[164px]">
          <div className="flex flex-col gap-12 lg:gap-20 items-center justify-center w-full">
            <div className="flex flex-col gap-8 lg:gap-12 items-center justify-start w-full">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="font-['Poppins'] font-semibold text-[#00A7E1] text-sm sm:text-base leading-6 tracking-[-0.32px]">
                  About OWASP
                </div>
                <h1 className="font-['Barlow'] font-medium text-[#101820] text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] leading-tight xl:leading-[64px] tracking-[-0.64px] sm:tracking-[-0.8px] lg:tracking-[-1.12px] xl:tracking-[-1.28px] max-w-[1200px]">
                  Securing Software Through Community
                </h1>
              </div>
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start justify-start w-full">
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins'] font-normal text-[#757575] text-sm sm:text-base leading-6 tracking-[-0.28px] sm:tracking-[-0.32px]">
                    We are an open community helping organizations build and maintain secure, trusted applications. All OWASP projects, tools, and resources are free and open to everyone.
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins'] font-normal text-[#757575] text-[16px] leading-[24px] tracking-[-0.32px]">
                    Founded in 2001 and incorporated as a nonprofit in 2004, OWASP has been supported for over two decades by a global community of companies, developers, and volunteers.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full aspect-[1626/532] relative">
              <Image 
                src="/images/about-hero.png" 
                alt="OWASP Community collaboration" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Inside OWASP Section */}
      <div className="bg-[#101820] relative pt-8 sm:pt-0">
        {/* Stats Cards - Responsive positioning */}
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] relative mt-0 sm:-mt-16 lg:-mt-20 xl:-mt-[84px] mb-8 lg:mb-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-[#182430] border border-white p-4 sm:p-6 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)]">
              <div className="bg-[#101820] p-2 sm:p-3 mb-4 sm:mb-6 w-fit">
                <Image src="/images/icons/book-open.svg" alt="" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="font-['Barlow'] font-medium text-white text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                Community-led open source projects
              </p>
            </div>
            <div className="bg-[#182430] border border-white p-4 sm:p-6 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)]">
              <div className="bg-[#101820] p-2 sm:p-3 mb-4 sm:mb-6 w-fit">
                <Image src="/images/icons/globe.svg" alt="" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="font-['Barlow'] font-medium text-white text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                Over 250+ local chapters worldwide
              </p>
            </div>
            <div className="bg-[#182430] border border-white p-4 sm:p-6 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)]">
              <div className="bg-[#101820] p-2 sm:p-3 mb-4 sm:mb-6 w-fit">
                <Image src="/images/icons/users.svg" alt="" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="font-['Barlow'] font-medium text-white text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                Tens of thousands of members
              </p>
            </div>
            <div className="bg-[#182430] border border-white p-4 sm:p-6 shadow-[0px_8px_16px_0px_rgba(0,0,0,0.16)]">
              <div className="bg-[#101820] p-2 sm:p-3 mb-4 sm:mb-6 w-fit">
                <Image src="/images/icons/chart-projector.svg" alt="" width={24} height={24} className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="font-['Barlow'] font-medium text-white text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                Industry-leading educational and training conferences
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] pt-12 sm:pt-16 lg:pt-20 xl:pt-[164px] pb-12 sm:pb-16 lg:pb-20">
          {/* Vision/Mission Section */}
          <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 xl:gap-[120px] items-start justify-start mb-12 sm:mb-16 lg:mb-20">
            <div className="flex-1 flex flex-col gap-6 lg:gap-8 xl:gap-12">
              {/* Vision */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start pt-8 sm:pt-12 border-t border-white/60">
                <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start w-full">
                  <div className="font-['Barlow'] font-medium text-[#F1F6FE] text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px] shrink-0">
                    01
                  </div>
                  <div className="font-['Barlow'] font-medium text-[#FFD476] text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px] shrink-0 min-w-[80px] sm:min-w-[100px]">
                    Our Vision
                  </div>
                  <div className="flex-1 font-['Barlow'] font-medium text-white text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                    No more insecure software.
                  </div>
                </div>
              </div>
              {/* Mission */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start pt-8 sm:pt-12 border-t border-white/60">
                <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start w-full">
                  <div className="font-['Barlow'] font-medium text-[#F1F6FE] text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px] shrink-0">
                    02
                  </div>
                  <div className="font-['Barlow'] font-medium text-[#FFD476] text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px] shrink-0 min-w-[80px] sm:min-w-[100px]">
                    Our Mission
                  </div>
                  <div className="flex-1 font-['Barlow'] font-medium text-white text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                    To be the global open community that powers secure software through education, tools, and collaboration.
                  </div>
                </div>
              </div>
            </div>
            <div className="font-['Barlow'] font-medium text-white text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[48px] leading-tight xl:leading-[48px] tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.8px] xl:tracking-[-0.96px] text-center xl:text-left">
              Inside OWASP
            </div>
          </div>

          {/* What OWASP Does Section */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-[120px] items-start justify-start">
            <div className="flex-1 font-['Barlow'] font-medium text-white text-[20px] sm:text-[24px] lg:text-[28px] xl:text-[32px] leading-tight xl:leading-[40px] tracking-[-0.4px] sm:tracking-[-0.48px] lg:tracking-[-0.56px] xl:tracking-[-0.64px]">
              As the world's largest non-profit organization concerned with software security, OWASP:
            </div>
            <div className="flex-1 flex flex-col gap-6 lg:gap-8 xl:gap-12">
              {/* Item 1 */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start pt-8 sm:pt-12 border-t border-white/60">
                <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start w-full">
                  <div className="font-['Barlow'] font-medium text-[#F1F6FE] text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px] shrink-0">
                    01
                  </div>
                  <div className="flex-1 font-['Barlow'] font-medium text-white text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                    Supports the building of impactful{' '}
                    <Link href="/projects" className="underline">
                      projects
                    </Link>
                  </div>
                </div>
              </div>
              {/* Item 2 */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start pt-8 sm:pt-12 border-t border-white/60">
                <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start w-full">
                  <div className="font-['Barlow'] font-medium text-[#F1F6FE] text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px] shrink-0">
                    02
                  </div>
                  <div className="flex-1 font-['Barlow'] font-medium text-white text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                    Develops & nurtures communities through{' '}
                    <Link href="/events" className="underline">
                      events
                    </Link>
                    {' '}and{' '}
                    <Link href="/chapters" className="underline">
                      chapter meetings
                    </Link>
                    {' '}worldwide
                  </div>
                </div>
              </div>
              {/* Item 3 */}
              <div className="flex flex-row gap-2.5 items-center pt-12 border-t border-white/60">
                <div className="flex flex-row gap-20 items-center w-full">
                  <div className="font-['Barlow'] font-medium text-[#F1F6FE] text-[20px] leading-[24px] tracking-[-0.4px] w-8">
                    03
                  </div>
                  <div className="flex-1 font-['Barlow'] font-medium text-white text-[20px] leading-[24px] tracking-[-0.4px]">
                    Provides{' '}
                    <Link href="/resources" className="underline">
                      educational publications & resources
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="font-['Barlow'] font-medium text-[32px] sm:text-[40px] lg:text-[48px] text-[#101820] leading-tight lg:leading-[48px] tracking-[-0.64px] sm:tracking-[-0.8px] lg:tracking-[-0.96px] mb-4 lg:mb-6">
              Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-6 lg:p-8 border border-[#f4f4f4] shadow-[0px_12px_32px_-8px_rgba(0,0,0,0.1)]">
                <div className="bg-[#D9E5FA] p-2.5 lg:p-3 mb-4 lg:mb-6 w-fit">
                  <Image src={value.icon} alt="" width={24} height={24} className="w-5 h-5 lg:w-6 lg:h-6" />
                </div>
                <h3 className="font-['Barlow'] font-medium text-[20px] lg:text-[24px] text-[#101820] leading-[28px] lg:leading-[32px] tracking-[-0.4px] lg:tracking-[-0.48px] mb-2">
                  {value.title}
                </h3>
                <p className="font-['Poppins'] text-[#757575] text-[14px] leading-[20px]">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Us Section */}
      <div className="bg-[#F1F6FE]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start justify-start mb-12 lg:mb-20">
            {/* Left Column - Contact Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex flex-col gap-12 mb-16">
                <div>
                  <h2 className="font-['Barlow'] font-medium text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[56px] text-[#101820] leading-tight xl:leading-[56px] tracking-[-0.64px] sm:tracking-[-0.8px] lg:tracking-[-0.96px] xl:tracking-[-1.12px] mb-4 lg:mb-6">
                    Contact Us
                  </h2>
                  <p className="font-['Poppins'] text-[#757575] text-sm sm:text-[16px] leading-6 sm:leading-[24px] tracking-[-0.28px] sm:tracking-[-0.32px] mb-6">
                    Questions, feedback, or collaboration ideas?<br />
                    We'd love to hear from you!
                  </p>
                  <Button text="Contact Us" variant="primary" size="56" />
                </div>
              </div>

              {/* Address Information */}
              <div className="flex flex-col sm:flex-row gap-8 lg:gap-12">
                {/* Global Address */}
                <div className="flex-1 flex flex-col gap-3">
                  <h3 className="font-['Barlow'] font-medium text-[#101820] text-[20px] leading-[24px] tracking-[-0.4px]">
                    Global Address
                  </h3>
                  <div className="font-['Poppins'] text-[#101820] text-[14px] leading-[20px]">
                    <p>The OWASP Foundation Inc.</p>
                    <p>300 Delaware Ave</p>
                    <p>Ste 210 #384</p>
                    <p>Wilmington, DE 19801</p>
                  </div>
                  <p className="font-['Poppins'] text-[#101820] text-[14px] leading-[20px]">
                    +1 951-692-7703
                  </p>
                </div>

                {/* European Address */}
                <div className="flex-1 flex flex-col gap-3">
                  <h3 className="font-['Barlow'] font-medium text-[#101820] text-[20px] leading-[24px] tracking-[-0.4px]">
                    European Address
                  </h3>
                  <div className="font-['Poppins'] text-[#101820] text-[14px] leading-[20px]">
                    <p>OWASP Europe VZW</p>
                    <p>c/o Sr Fiduciarire Cv</p>
                    <p>Steenvoordestraat 184</p>
                    <p>9070 Destelbergen, Belgium</p>
                  </div>
                  <p className="font-['Poppins'] text-[#101820] text-[14px] leading-[20px]">
                    VAT: BE 0836743279
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Cards */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Membership Support */}
              <div className="bg-white border border-[#D9E5FA] p-6 flex flex-col gap-6">
                <div className="bg-[#F1F6FE] p-3 w-fit">
                  <Image src="/images/icons/users.svg" alt="" width={24} height={24} className="w-6 h-6" />
                </div>
                <div className="flex flex-row gap-0.5 items-start">
                  <h3 className="font-['Barlow'] font-medium text-[#003594] text-[20px] leading-[24px] tracking-[-0.4px] flex-1">
                    Membership Support
                  </h3>
                  <Image src="/images/icons/arrow-upright.svg" alt="" width={24} height={24} className="w-6 h-6" />
                </div>
              </div>

              {/* Chapter Support */}
              <div className="bg-white border border-[#D9E5FA] p-6 flex flex-col gap-6">
                <div className="bg-[#F1F6FE] p-3 w-fit">
                  <Image src="/images/icons/book-open.svg" alt="" width={24} height={24} className="w-6 h-6" />
                </div>
                <div className="flex flex-row gap-0.5 items-start">
                  <h3 className="font-['Barlow'] font-medium text-[#003594] text-[20px] leading-[24px] tracking-[-0.4px] flex-1">
                    Chapter Support
                  </h3>
                  <Image src="/images/icons/arrow-upright.svg" alt="" width={24} height={24} className="w-6 h-6" />
                </div>
              </div>

              {/* Corporate Sponsorships */}
              <div className="bg-white border border-[#D9E5FA] p-6 flex flex-col gap-6">
                <div className="bg-[#F1F6FE] p-3 w-fit">
                  <Image src="/images/icons/handshake.svg" alt="" width={24} height={24} className="w-6 h-6" />
                </div>
                <div className="flex flex-row gap-0.5 items-start">
                  <h3 className="font-['Barlow'] font-medium text-[#003594] text-[20px] leading-[24px] tracking-[-0.4px] flex-1">
                    Corporate Sponsorships
                  </h3>
                  <Image src="/images/icons/arrow-upright.svg" alt="" width={24} height={24} className="w-6 h-6" />
                </div>
              </div>

              {/* Partnership marketing */}
              <div className="bg-white border border-[#D9E5FA] p-6 flex flex-col gap-6">
                <div className="bg-[#F1F6FE] p-3 w-fit">
                  <Image src="/images/icons/megaphone-contact.svg" alt="" width={24} height={24} className="w-6 h-6" />
                </div>
                <div className="flex flex-row gap-0.5 items-start">
                  <h3 className="font-['Barlow'] font-medium text-[#003594] text-[20px] leading-[24px] tracking-[-0.4px] flex-1">
                    Partnership marketing
                  </h3>
                  <Image src="/images/icons/arrow-upright.svg" alt="" width={24} height={24} className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Ethical Behavior and Licensing */}
          <div className="flex flex-row gap-20 items-start">
            {/* Ethical Behavior */}
            <div className="flex-1 flex flex-col gap-1.5">
              <h3 className="font-['Poppins'] font-medium text-[#101820] text-[14px] leading-[20px]">
                Ethical Behavior
              </h3>
              <p className="font-['Poppins'] text-[#757575] text-[12px] leading-[16px] tracking-[-0.24px]">
                The activities, programs, and events of the Foundation conform to a number of policies set forth in our{' '}
                <Link href="/policies" className="text-[#757575] hover:underline">
                  Policies & Procedures
                </Link>
                {' '}and the{' '}
                <Link href="/code-of-conduct" className="text-[#757575] hover:underline">
                  Code of Conduct
                </Link>
                . Additionally we expect our Board Members, Leaders, Staff, and volunteers to model the upmost in integrity, honesty, and patience with supporting our extended communities.
              </p>
            </div>

            {/* Licensing */}
            <div className="flex-1 flex flex-col gap-1.5">
              <h3 className="font-['Poppins'] font-medium text-[#101820] text-[14px] leading-[20px]">
                Licensing
              </h3>
              <p className="font-['Poppins'] text-[#757575] text-[12px] leading-[16px] tracking-[-0.24px]">
                All OWASP materials are available under an OSI-approved{' '}
                <Link href="https://opensource.org/licenses/category" className="text-[#757575] underline hover:no-underline">
                  Open Source License
                </Link>
                {' '}or{' '}
                <Link href="https://creativecommons.org/licenses/by-sa/4.0/" className="text-[#757575] underline hover:no-underline">
                  one of the latest Creative Commons licenses
                </Link>
                {' '}for most documentation projects. This website is (C) OWASP and licensed under the{' '}
                <Link href="https://creativecommons.org/licenses/by-sa/4.0/" className="text-[#757575] underline hover:no-underline">
                  Creative Commons Attribution-ShareAlike 4.0 International license (CC-BY-SA 4.0)
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Have an Idea for a Project Section */}
      <div className="bg-[#F1F6FE]">
        <div className="max-w-[1440px] mx-auto px-[120px] py-16">
          <div className="bg-gradient-to-b from-black via-[#000000] to-[#13346d] relative overflow-hidden p-16 w-full">
            {/* Large Background Logo */}
            <div className="absolute top-[-150px] left-1/2 transform -translate-x-1/2 w-[480px] h-[480px] opacity-20">
              <Image 
                src="/images/logos/owasp-logo-large-bg.svg" 
                alt="" 
                fill 
                className="object-contain"
              />
            </div>
            
            {/* Content */}
            <div className="relative z-10 flex flex-col gap-16 items-center justify-center w-full">
              <div className="flex flex-col gap-6 items-center justify-center w-full">
                {/* Small OWASP Logo */}
                <div className="w-[41px] h-10">
                  <Image 
                    src="/images/logos/owasp-logo-small-white.svg" 
                    alt="OWASP" 
                    width={41} 
                    height={40}
                    className="w-full h-full"
                  />
                </div>
                
                {/* Heading */}
                <h2 className="font-['Barlow'] font-medium text-white text-[48px] leading-[48px] tracking-[-0.96px] text-center">
                  Have an <span className="text-[#00A7E1]">Idea</span> for a Project?
                </h2>
                
                {/* Description */}
                <p className="font-['Poppins'] text-white text-[16px] leading-[24px] tracking-[-0.32px] text-center">
                  Take advantage of our resources and let it grow with OWASP.
                </p>
              </div>
              
              {/* Button */}
              <div className="bg-[#003594] h-14 flex items-center justify-center px-8">
                <Link href="/submit-project">
                  <span className="font-['Poppins'] font-semibold text-white text-[16px] leading-[24px] tracking-[-0.32px] whitespace-nowrap">
                    Start a Project
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
} 