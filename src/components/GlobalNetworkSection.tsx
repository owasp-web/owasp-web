import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';
import AnimatedSection from './AnimatedSection';

const markerIcon = "/images/icons/marker.svg";
const megaphoneIcon = "/images/icons/megaphone.svg";
const eventBackgroundImage = "/images/events/event-1.png";

export default function GlobalNetworkSection() {
  return (
    <div className="bg-[#101820] relative w-full">
      <div className="flex flex-col items-center relative w-full">
        <div className="box-border flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 relative w-full max-w-[1440px]">
          {/* Background blur effects */}
          <div className="absolute bg-[#ffb81b] blur-[50px] filter h-[300px] left-10 top-16 w-[300px] opacity-25" />
          <div className="absolute bg-[#00a7e1] blur-[50px] filter h-[300px] right-10 top-16 w-[300px] opacity-25" />
          
          {/* Main content container */}
          <AnimatedSection animation="scale-in" delay={200}>
            <div className="relative w-full min-h-[400px] md:h-[500px] lg:h-[600px] bg-[#101820] overflow-hidden rounded-lg border border-white/10 shadow-2xl">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image 
                src={eventBackgroundImage} 
                alt="OWASP Global AppSec Background" 
                fill
                className="object-cover"
              />
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/65 to-black/40" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex flex-col lg:flex-row">
              {/* Left side - Main content */}
              <div className="flex-1 flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-16">
                <div className="flex flex-col gap-6 lg:gap-8">
                  <div className="flex flex-col gap-4 lg:gap-6">
                    <div className="flex items-center gap-3 lg:gap-4">
                      <div className="font-['Barlow'] font-medium text-[#ffb81b] text-[32px] sm:text-[40px] lg:text-[56px] leading-tight lg:leading-[56px] tracking-[-0.64px] lg:tracking-[-1.12px]">
                        3-7
                      </div>
                      <div className="flex flex-col font-['Poppins'] text-white text-sm lg:text-base">
                        <div className="leading-4 lg:leading-5 font-semibold">NOV</div>
                        <div className="leading-4 lg:leading-5 opacity-90">2025</div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 lg:gap-3">
                      <h2 className="font-['Barlow'] font-medium text-white text-[28px] sm:text-[36px] lg:text-[56px] leading-tight lg:leading-[56px] tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-1.12px]">
                        OWASP 2025
                      </h2>
                      <h2 className="font-['Barlow'] font-medium text-white text-[28px] sm:text-[36px] lg:text-[56px] leading-tight lg:leading-[56px] tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-1.12px]">
                        Global AppSec USA
                      </h2>
                    </div>
                    
                    <div className="flex items-center gap-2 lg:gap-3">
                      <div className="relative w-5 h-5 lg:w-6 lg:h-6">
                        <Image src={markerIcon} alt="" width={24} height={24} className="filter brightness-0 invert opacity-90" />
                      </div>
                      <div className="font-['Barlow'] font-medium text-white text-[18px] sm:text-[20px] lg:text-[24px] leading-6 lg:leading-7 tracking-[-0.36px] sm:tracking-[-0.4px] lg:tracking-[-0.48px]">
                        Washington, DC
                      </div>
                    </div>
                  </div>
                  
                  <p className="font-['Poppins'] text-[#e5e5e5] text-sm sm:text-base lg:text-lg leading-6 lg:leading-7 tracking-[-0.28px] sm:tracking-[-0.32px] lg:tracking-[-0.36px] max-w-2xl">
                    Join 800+ security professionals from November 3–7, 2025, at the Marriott Marquis for a dynamic week of learning, networking, and inspiration. Explore six expert-led tracks—from OWASP Projects to builder, breaker, defender, and more.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 lg:gap-4 items-start mt-6 lg:mt-0">
                  <Link href="/events">
                    <Button text="Register Now" variant="primary" size="56" className="w-full sm:w-auto min-w-[160px] lg:min-w-[180px] shadow-lg" />
                  </Link>
                  <Link href="/events">
                    <Button text="More Info" variant="ghost-white" size="56" className="w-full sm:w-auto min-w-[160px] lg:min-w-[180px]" />
                  </Link>
                </div>
              </div>
              
              {/* Early bird banner */}
              <div className="flex flex-col justify-start items-center lg:items-end p-6 sm:p-8 lg:p-16 lg:pt-16">
                <div className="bg-[#00a7e1] flex items-center gap-2 lg:gap-3 px-4 lg:px-5 py-2 lg:py-3 rounded-sm shadow-lg">
                  <div className="relative w-4 h-4 lg:w-5 lg:h-5">
                    <Image src={megaphoneIcon} alt="" width={20} height={20} className="filter brightness-0 invert" />
                  </div>
                  <div className="font-['Poppins'] font-medium text-white text-sm lg:text-base">
                    Early bird pricing ends soon!
                  </div>
                </div>
              </div>
            </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
} 