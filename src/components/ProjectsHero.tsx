import Image from 'next/image';
import Link from 'next/link';

export default function ProjectsHero() {
  return (
    <div className="bg-[#101820] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#101820] via-[#1a2332] to-[#003594] opacity-60" />
      
      {/* Centered container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 relative">
        {/* Ray Background Element - Hidden on mobile for better performance */}
        <div
          className="absolute h-[300px] sm:h-[402px] top-0 w-[360px] sm:w-[480px] pointer-events-none opacity-20 sm:opacity-40 hidden sm:block"
          data-name="Ray"
          style={{ left: "calc(25% + 60px)" }}
        >
          <div className="absolute bottom-[-49.751%] left-[-124.166%] right-[-123.939%] top-[-218.905%]">
            <Image src="/images/ray.svg" alt="" fill className="block max-w-none" />
          </div>
        </div>

        <div
          className="flex flex-col gap-12 lg:gap-20 items-center justify-center relative z-10"
          data-name="Container"
        >
          <div className="flex flex-col gap-8 lg:gap-12 items-center justify-start w-full">
            <div className="flex flex-col gap-4 lg:gap-6 items-center justify-start w-full">
              <div
                className="relative shrink-0 w-10 h-10 sm:w-12 sm:h-12"
                data-name="Logo"
              >
                <Image src="/images/logos/owasp-logo-small-white.svg" alt="OWASP Logo" fill />
              </div>
              <h1 className="font-['Barlow'] font-medium text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] xl:text-[64px] text-white text-center leading-tight xl:leading-[64px] tracking-[-0.64px] sm:tracking-[-0.8px] lg:tracking-[-1.12px] xl:tracking-[-1.28px]">
                Projects for Good
              </h1>
              <p className="font-['Poppins'] text-[#f4f4f4] text-sm sm:text-base text-center leading-6 tracking-[-0.28px] sm:tracking-[-0.32px] max-w-3xl">
                We are a community of developers, technologists and evangelists
                improving the security of software. The OWASP Foundation gives
                aspiring open source projects a platform to improve the security
                of software with:
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full sm:w-auto">
              <Link href="/projects#contribute" className="box-border flex flex-row gap-6 lg:gap-10 h-12 sm:h-14 items-center justify-center px-6 lg:px-8 py-0 border border-[#757575] hover:border-white transition-colors w-full sm:w-auto">
                <span className="font-['Poppins'] font-semibold text-sm sm:text-base text-white text-center leading-tight lg:leading-[24px] tracking-[-0.28px] sm:tracking-[-0.32px]">
                  Contribute to Projects
                </span>
              </Link>
              <Link href="/submit-project" className="bg-[#003594] hover:bg-[#004bbb] transition-colors flex flex-row gap-10 h-14 items-center justify-center px-8 py-0 w-[225px]">
                <span className="font-['Poppins'] font-semibold text-[16px] text-white text-center leading-[24px] tracking-[-0.32px]">
                  Start New Project
                </span>
              </Link>
            </div>
          </div>
          
          {/* Images section matching Figma layout */}
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start justify-center w-full">
            {/* Large left image - Juice Shop presentation */}
            <div className="w-full lg:flex-1 h-64 sm:h-72 lg:h-80 relative">
              <div className="h-full overflow-hidden relative w-full rounded-lg">
                <div
                  className="absolute bg-center bg-cover bg-no-repeat h-full w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    backgroundImage: `url('/images/events/hero-main.png')`,
                  }}
                />
              </div>
              <div className="absolute border-[#101820] border-[6px] border-solid inset-[-6px] pointer-events-none rounded-lg" />
            </div>
            
            {/* Right side grid - 4 smaller images */}
            <div className="w-full lg:flex-1 flex flex-col gap-3 lg:gap-4 h-64 sm:h-72 lg:h-80">
              <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 flex-1">
                {/* Top left - Group meeting/conference */}
                <div
                  className="flex-1 bg-center bg-cover bg-no-repeat h-full rounded-lg"
                  style={{ backgroundImage: `url('/images/events/hero-top-left.png')` }}
                />
                {/* Top right - Person working on laptop */}
                <div
                  className="flex-1 bg-center bg-cover bg-no-repeat h-full rounded-lg"
                  style={{ backgroundImage: `url('/images/events/hero-top-right.png')` }}
                />
              </div>
              <div className="flex flex-row gap-2 sm:gap-3 lg:gap-4 flex-1">
                {/* Bottom left - Documents/wireframes on table */}
                <div
                  className="flex-1 bg-center bg-cover bg-no-repeat h-full rounded-lg"
                  style={{ backgroundImage: `url('/images/events/hero-bottom-left.png')` }}
                />
                {/* Bottom right - Silhouettes at event */}
                <div
                  className="flex-1 bg-center bg-cover bg-no-repeat h-full rounded-lg"
                  style={{ backgroundImage: `url('/images/events/hero-bottom-right.png')` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 