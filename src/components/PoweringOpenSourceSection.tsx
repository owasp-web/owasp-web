import Image from 'next/image';
import Link from 'next/link';

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="bg-[#182430] flex flex-row gap-4 sm:gap-6 items-start justify-start p-4 sm:p-6 w-full">
      <div className="bg-[#101820] flex flex-row gap-2.5 items-center justify-center p-2 sm:p-3 w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] flex-shrink-0">
        <div className="relative w-6 h-6 sm:w-8 sm:h-8">
          <Image src={icon} alt="" fill className="object-contain" />
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-grow">
        <h3 className="font-['Barlow'] font-medium text-[#ffffff] text-lg sm:text-xl lg:text-[24px] leading-tight lg:leading-[32px] tracking-[-0.36px] sm:tracking-[-0.4px] lg:tracking-[-0.48px]">
          {title}
        </h3>
        <p className="font-['Poppins'] text-[#d7d7d7] text-sm leading-[18px] sm:leading-[20px]">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function PoweringOpenSourceSection() {
  const features = [
    {
      icon: "/images/icons/globe.svg",
      title: "Visibility",
      description: "6M+ annual site visitors"
    },
    {
      icon: "/images/icons/check-shield.svg",
      title: "Credibility", 
      description: "Trusted by the global AppSec community"
    },
    {
      icon: "/images/icons/coins.svg",
      title: "Resources",
      description: "Access to funding and Project Summits"
    },
    {
      icon: "/images/icons/handshake.svg",
      title: "Community",
      description: "Connect through conferences and local chapters"
    }
  ];

  return (
    <div className="bg-[#101820]">
      {/* Centered container with proper spacing */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-center">
          {/* Left Column - Text Content */}
          <div className="flex-1 flex flex-col items-start justify-between">
            <div className="flex flex-col gap-6 lg:gap-8 items-start justify-start w-full mb-6 lg:mb-8">
              <h2 className="font-['Barlow'] font-medium text-[32px] sm:text-[40px] lg:text-[48px] xl:text-[56px] leading-tight xl:leading-[56px] tracking-[-0.64px] sm:tracking-[-0.8px] lg:tracking-[-0.96px] xl:tracking-[-1.12px] text-white w-full">
                Powering <span className="text-[#ffb81b]">Open Source</span> Security
              </h2>
              <p className="font-['Poppins'] text-[#d7d7d7] text-sm sm:text-base leading-6 tracking-[-0.28px] sm:tracking-[-0.32px] w-full">
                OWASP is a global community of developers, technologists, and
                advocates dedicated to improving software security. We provide
                open source projects with the visibility, credibility, and
                resources they need to grow and make an impact.
              </p>
            </div>
            
            <div className="flex flex-col gap-6 lg:gap-8 items-start justify-start w-full">
              {/* Highlighted Quote Box */}
              <div className="flex flex-row gap-2.5 items-center justify-center pl-3 sm:pl-4 pr-0 py-2 w-full border-l-2 border-[#ffd476]">
                <div className="flex flex-col gap-2 sm:gap-3 flex-grow">
                  <p className="font-['Barlow'] font-medium text-[#ffd476] text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
                    Code, software, reference material, documentation, and community all working to secure the world's software.
                  </p>
                  <p className="font-['Poppins'] text-[#d7d7d7] text-xs leading-[14px] sm:leading-[16px] tracking-[-0.2px] sm:tracking-[-0.24px]">
                    Projects gives members an opportunity to freely test theories
                    and ideas with the professional advice and support of the
                    OWASP community.
                  </p>
                </div>
              </div>
              
              {/* Start New Project Button */}
              <Link href="/submit-project" className="bg-[#003594] hover:bg-[#004bbb] transition-colors flex flex-row gap-10 h-12 sm:h-14 items-center justify-center px-6 sm:px-8 py-0 w-full sm:w-[225px]">
                <span className="font-['Poppins'] font-semibold text-sm sm:text-base text-white text-center leading-tight sm:leading-[24px] tracking-[-0.28px] sm:tracking-[-0.32px]">
                  Start New Project
                </span>
              </Link>
            </div>
          </div>
          
          {/* Right Column - Feature Cards */}
          <div className="flex-1 flex flex-col gap-6 lg:gap-8">
            <h3 className="font-['Barlow'] font-medium text-[#ffffff] text-lg sm:text-[20px] leading-tight sm:leading-[24px] tracking-[-0.36px] sm:tracking-[-0.4px]">
              Why launch your project with OWASP?
            </h3>
            <div className="flex flex-col gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 