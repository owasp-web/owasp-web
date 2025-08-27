import Image from 'next/image';
import AnimatedSection from './AnimatedSection';

// Local images
const gsocImage1 = "/images/events/gsoc-1.png";
const gsocImage2 = "/images/events/gsoc-2.png";
const eventBackgroundImage = "/images/events/event-1.png";
const chevronIcon = "/images/icons/chevron.svg";
const pulseIcon = "/images/icons/pulse.svg";
const megaphoneIcon = "/images/icons/megaphone.svg";

export default function FeaturedSection() {
  return (
    <div className="bg-[#ffffff] relative w-full">
      <div className="flex flex-col items-center relative w-full">
        <div className="box-border flex flex-col gap-12 lg:gap-16 items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 relative w-full max-w-[1440px]">
          <div className="box-border flex flex-col gap-20 items-center justify-start p-0 relative shrink-0 w-full">
            <div className="box-border flex flex-col gap-10 items-start justify-start p-0 relative shrink-0 w-full">
              {/* Main News Card - Figma Layout */}
              <AnimatedSection animation="fade-in-up" delay={150}>
                <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
                  {/* Left Side - Main Content Card */}
                  <div className="flex-1 relative h-[400px] lg:h-[500px] bg-[#101820] overflow-hidden rounded-lg shadow-lg">
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <Image 
                        src={eventBackgroundImage} 
                        alt="OWASP Event Background" 
                        fill
                        className="object-cover"
                      />
                      {/* Dark overlay for better text readability */}
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
                    </div>
                    
                    {/* Content */}
                    <div className="relative z-10 h-full flex flex-col justify-between p-6 sm:p-8 lg:p-12">
                      <div className="flex flex-col gap-4 lg:gap-6">
                        <div className="flex items-center gap-2">
                          <div className="font-['Poppins'] font-semibold text-white/90 text-sm lg:text-base">
                            Starr Brown, May 12
                          </div>
                        </div>
                        <h2 className="font-['Barlow'] font-medium text-white text-[28px] sm:text-[36px] lg:text-[48px] leading-[32px] sm:leading-[40px] lg:leading-[52px] tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.96px]">
                          OWASP X Google Summer of Code 2025 - Enabling 15 Opportunities for Impact
                        </h2>
                      </div>
                      
                      <div className="flex flex-col gap-4">
                        <p className="font-['Poppins'] text-white/80 text-sm sm:text-base leading-5 sm:leading-6">
                          We're proud to share that OWASP is once again an official mentoring organization for Google Summer of Code (GSoC) 2025—and this year, we've secured 15 contributor slots across some of the most impactful open-source security projects in the world.
                        </p>
                        <div className="flex justify-end">
                          <button className="h-10 lg:h-12 px-4 lg:px-6 border border-white/40 text-white font-['Poppins'] font-semibold text-xs lg:text-sm hover:bg-white/10 hover:border-white/60 transition-all duration-300 rounded-sm">
                            Continue Reading
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Image Stack */}
                  <div className="w-full lg:w-[400px] flex flex-col gap-4 lg:gap-6">
                    <div className="relative h-48 lg:h-60 rounded-lg overflow-hidden shadow-md">
                      <Image 
                        src={gsocImage1} 
                        alt="GSoC Image 1" 
                        fill
                        className="object-cover"
                      />
                      {/* Early bird banner */}
                      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-[#00a7e1] flex items-center gap-2 px-3 py-1.5 rounded-sm z-10 shadow-md">
                        <div className="relative w-4 h-4">
                          <Image 
                            src={megaphoneIcon} 
                            alt="" 
                            width={16} 
                            height={16}
                            className="filter brightness-0 invert" 
                          />
                        </div>
                        <div className="font-['Poppins'] font-medium text-white text-sm">
                          Early bird pricing ends soon!
                        </div>
                      </div>
                    </div>
                    <div className="relative h-48 lg:h-60 rounded-lg overflow-hidden shadow-md">
                      <Image 
                        src={gsocImage2} 
                        alt="GSoC Image 2" 
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div className="mt-6 lg:mt-8 w-full">
                  <p className="font-['Poppins'] text-[#757575] text-sm sm:text-base leading-6 tracking-[-0.32px] text-center lg:text-left">
                    This milestone reinforces OWASP's ongoing commitment to open-source innovation and highlights the strength of our global community of mentors and contributors, as well as our commitment to education-by-doing with the GSoC program.
                  </p>
                </div>
              </AnimatedSection>
            </div>
            
            {/* Navigation Controls */}
            <div className="box-border flex flex-row gap-8 items-center justify-center p-0 relative shrink-0 w-full">
              <button className="bg-[#f8f9fa] hover:bg-[#e9ecef] transition-colors p-3 rounded-full shadow-sm border border-gray-200">
                <div className="relative size-6">
                  <Image src={chevronIcon} alt="Previous" width={24} height={24} className="rotate-180 opacity-70" />
                </div>
              </button>
              
              <div className="flex flex-row gap-3 items-center">
                <div className="bg-[#003594] h-2 w-8 rounded-full" />
                <div className="bg-[#d7d7d7] h-2 w-2 rounded-full" />
                <div className="bg-[#d7d7d7] h-2 w-2 rounded-full" />
                <div className="bg-[#d7d7d7] h-2 w-2 rounded-full" />
                <div className="bg-[#d7d7d7] h-2 w-2 rounded-full" />
              </div>
              
              <button className="bg-[#f8f9fa] hover:bg-[#e9ecef] transition-colors p-3 rounded-full shadow-sm border border-gray-200">
                <div className="relative size-6">
                  <Image src={chevronIcon} alt="Next" width={24} height={24} className="opacity-70" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 