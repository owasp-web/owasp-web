import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

export default function QuestionSection() {
  return (
    <div className="bg-[#f1f6fe] relative shrink-0 w-full">
      <div className="flex flex-col items-center justify-center relative size-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 w-full">
          <div className="bg-gradient-to-b from-[#000000] from-[31.806%] relative shrink-0 to-[#13346d] w-full rounded-lg overflow-hidden">
            <div className="flex flex-col items-center justify-center relative size-full">
              <div className="flex flex-col gap-12 lg:gap-16 items-center justify-center p-8 sm:p-12 lg:p-16 relative w-full">
                {/* Background Logo - Responsive positioning */}
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                  <div className="w-[300px] sm:w-[400px] lg:w-[480px] h-[300px] sm:h-[400px] lg:h-[480px] relative">
                    <Image 
                      src="/images/logos/owasp-logo-bg.svg" 
                      alt="" 
                      fill
                      className="object-contain" 
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex flex-col gap-4 lg:gap-6 items-center justify-center relative z-10 w-full">
                  <div className="h-8 sm:h-10 relative shrink-0 w-[32px] sm:w-[41px]">
                    <Image 
                      src="/images/logos/owasp-logo-small.svg" 
                      alt="OWASP Logo" 
                      fill
                      className="object-contain" 
                    />
                  </div>
                  <h2 className="font-['Barlow'] font-medium text-[28px] sm:text-[36px] lg:text-[48px] text-[#ffffff] text-center tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.96px] leading-tight">
                    <span>Have an </span>
                    <span className="text-[#00a7e1]">Idea</span>
                    <span> for a Project?</span>
                  </h2>
                  <p className="font-['Poppins'] text-[#ffffff] text-sm sm:text-base text-center tracking-[-0.28px] sm:tracking-[-0.32px] leading-6 sm:leading-[24px] max-w-2xl">
                    Take advantage of our resources and let it grow with OWASP. Join our community of developers building the future of application security.
                  </p>
                </div>
                
                {/* Button */}
                <Link href="/submit-project" className="z-10">
                  <Button text="Start a Project" variant="primary" size="56" className="z-10" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 