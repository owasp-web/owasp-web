import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

// Local resource images
const amassImage = "/images/tools/amass.png";
const owtfImage = "/images/tools/owtf.png";
const dependencyTrackImage = "/images/tools/dependency-track.png";

interface ResourceCardProps {
  title: string;
  description: string;
  image: string;
}

const ResourceCard = ({ title, description, image }: ResourceCardProps) => (
  <div className="basis-0 grow min-h-px min-w-px relative shrink-0 group">
    <div className="absolute border-2 border-[#ffb81b] border-solid inset-0 pointer-events-none group-hover:border-[#ffc947] transition-colors" />
    <div className="relative size-full bg-[#101820]">
      <div className="box-border flex flex-col items-start justify-start p-3 relative w-full h-full">
        <div className="bg-[#030303] box-border flex flex-col gap-6 h-32 sm:h-36 lg:h-40 items-center justify-center p-4 sm:p-6 relative shrink-0 w-full overflow-hidden">
          <div className="h-16 sm:h-18 lg:h-20 w-full flex items-center justify-center relative">
            <Image 
              src={image} 
              alt={title} 
              width={200} 
              height={80} 
              className="object-contain filter brightness-110 max-w-full max-h-full" 
            />
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-between w-full">
          <div className="box-border flex flex-col gap-3 lg:gap-4 items-start justify-start p-3 sm:p-4 relative text-left w-full">
            <div className="box-border flex flex-col gap-2 lg:gap-3 items-start justify-start p-0 relative w-full">
              <h3 className="font-['Barlow'] font-medium text-white text-lg sm:text-xl lg:text-2xl tracking-[-0.36px] sm:tracking-[-0.4px] lg:tracking-[-0.48px] leading-6 sm:leading-7 lg:leading-8">
                {title}
              </h3>
              <p className="font-['Poppins'] text-[#d7d7d7] text-xs sm:text-sm leading-4 sm:leading-5">
                {description}
              </p>
            </div>
            <button className="font-['Poppins'] text-[#ffb81b] text-xs sm:text-sm underline decoration-skip-ink-none hover:text-[#ffc947] transition-colors mt-1 sm:mt-2">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function HighlightedResourcesSection() {
  const resources = [
    {
      title: "Amass",
      description: "In-depth attack surface mapping and asset discovery platform for security professionals and penetration testers.",
      image: amassImage
    },
    {
      title: "OWTF",
      description: "Offensive Web Testing Framework that combines different testing strategies for efficient penetration testing workflows.",
      image: owtfImage
    },
    {
      title: "Dependency-Track",
      description: "Intelligent component analysis platform for identifying and reducing risk from third-party components.",
      image: dependencyTrackImage
    }
  ];

  return (
    <div className="bg-[#101820] relative shrink-0 w-full">
      <div className="flex flex-col items-center relative size-full">
        <div className="box-border flex flex-col gap-12 lg:gap-16 items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 relative w-full max-w-[1440px]">
          <div className="box-border flex flex-col lg:flex-row gap-6 lg:gap-8 items-start lg:items-end justify-between p-0 relative w-full">
            <div className="w-full lg:flex-1 box-border flex flex-col gap-6 lg:gap-8 items-start justify-start p-0 relative">
              <h2 className="font-['Barlow'] font-medium text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight lg:leading-[56px] tracking-[-0.6px] sm:tracking-[-0.8px] lg:tracking-[-1.12px]">
                <span className="text-white">Our </span>
                <span className="text-[#ffb81b]">Highlighted</span>
                <span className="text-white"> Resources</span>
              </h2>
              <p className="font-['Poppins'] text-[#d7d7d7] text-sm sm:text-base leading-5 sm:leading-6 tracking-[-0.28px] sm:tracking-[-0.32px] max-w-2xl">
                Explore powerful security tools developed by the OWASP community. Each resource provides unique capabilities to strengthen your application security posture.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <Link href="/resources">
                <Button text="See All Resources" variant="ghost-white" size="48" />
              </Link>
            </div>
          </div>
          <div className="box-border flex flex-col md:flex-row gap-6 lg:gap-8 items-stretch justify-start p-0 relative w-full">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 