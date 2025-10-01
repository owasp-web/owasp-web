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
  <div className="group relative rounded-lg overflow-hidden border-2 border-[#ffb81b] hover:border-[#ffc947] transition-colors bg-[#101820]">
    <div className="flex flex-col h-full">
      <div className="bg-[#030303] p-4 sm:p-6 flex items-center justify-center">
        <div className="w-full max-w-[260px] aspect-[5/2] sm:aspect-[5/2] flex items-center justify-center">
            <Image 
              src={image} 
              alt={title} 
            width={260} 
            height={104} 
            className="object-contain filter brightness-110 w-full h-full" 
            />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          <div className="flex-1 flex flex-col gap-2 sm:gap-3">
            <h3 className="font-['Barlow'] font-medium text-white text-lg sm:text-xl lg:text-2xl tracking-[-0.36px] sm:tracking-[-0.4px] lg:tracking-[-0.48px] leading-6 sm:leading-7 lg:leading-8">
                {title}
            </h3>
            <p className="font-['Poppins'] text-[#d7d7d7] text-sm leading-6">
                {description}
            </p>
          </div>
          <button className="self-start mt-3 font-['Poppins'] text-[#ffb81b] text-sm underline decoration-skip-ink-none hover:text-[#ffc947] transition-colors">
            Learn More
          </button>
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
      <div className="flex flex-col items-center relative w-full">
        <div className="flex flex-col gap-12 lg:gap-16 items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 w-full max-w-[1440px]">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
            {resources.map((resource, index) => (
              <ResourceCard key={index} {...resource} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 