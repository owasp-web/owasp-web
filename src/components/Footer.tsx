import Image from 'next/image';
import Link from 'next/link';
import Button from './Button';

export default function Footer() {
  return (
    <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative shrink-0 w-full">
      {/* Corporate Supporters Section */}
      <div className="bg-[#151515] box-border content-stretch flex flex-col gap-6 lg:gap-8 xl:gap-10 items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-8 sm:py-10 lg:py-12 xl:py-16 relative shrink-0 w-full">
        <div className="font-['Barlow'] font-medium text-[24px] sm:text-[28px] lg:text-[32px] text-[rgba(255,255,255,0.5)] text-center tracking-[-0.48px] lg:tracking-[-0.64px] leading-[30px] sm:leading-[35px] lg:leading-[40px]">
          Corporate Supporters
        </div>
        <div className="box-border content-stretch flex flex-col gap-6 lg:gap-10 items-center justify-center p-0 relative shrink-0 w-full max-w-[1440px]">
          <div className="box-border content-stretch flex flex-row gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center justify-center p-0 relative shrink-0 flex-wrap">
            <div className="h-6 sm:h-7 lg:h-8 relative shrink-0 w-[98px] sm:w-[115px] lg:w-[130px]">
              <Image src="/images/sponsors/adobe-logo.svg" alt="Adobe" width={130} height={32} className="block max-w-none size-full" />
            </div>
            <div className="h-6 sm:h-7 lg:h-8 relative shrink-0 w-[127px] sm:w-[148px] lg:w-[169px]">
              <Image src="/images/sponsors/united-airlines-logo.svg" alt="United Airlines" width={169} height={32} className="block max-w-none size-full" />
            </div>
            <div className="h-9 sm:h-10 lg:h-12 overflow-clip relative shrink-0 w-[51px] sm:w-[60px] lg:w-[68px]">
              <Image src="/images/sponsors/salesforce-logo.svg" alt="Salesforce" width={68} height={48} className="block max-w-none size-full" />
            </div>
            <div className="h-6 sm:h-7 lg:h-8 overflow-clip relative shrink-0 w-[60px] sm:w-[70px] lg:w-[80px]">
              <Image src="/images/sponsors/bdo-logo.svg" alt="BDO" width={80} height={32} className="block max-w-none size-full" />
            </div>
            <div className="h-4 sm:h-5 lg:h-6 overflow-clip relative shrink-0 w-[117px] sm:w-[137px] lg:w-[156px]">
              <Image src="/images/sponsors/backslash-logo.svg" alt="Backslash" width={156} height={24} className="block max-w-none size-full" />
            </div>
            <div className="h-6 sm:h-7 lg:h-8 overflow-clip relative shrink-0 w-[81px] sm:w-[95px] lg:w-[108px]">
              <Image src="/images/sponsors/rakuten-logo.svg" alt="Rakuten" width={108} height={32} className="block max-w-none size-full" />
            </div>
            <div className="h-7 sm:h-8 lg:h-10 overflow-clip relative shrink-0 w-[142px] sm:w-[166px] lg:w-[190px]">
              <Image src="/images/sponsors/checkpoint-logo-1.svg" alt="Check Point" width={190} height={40} className="block max-w-none size-full" />
            </div>
            <div className="h-4 sm:h-5 lg:h-6 relative shrink-0 w-[145px] sm:w-[169px] lg:w-[194px]">
              <Image src="/images/sponsors/atlassian-logo.svg" alt="Atlassian" width={194} height={24} className="block max-w-none size-full" />
            </div>
          </div>
          <Link href="/corporate-support">
            <Button text="Become a Corporate Supporter" variant="ghost-white" size="48" />
          </Link>
        </div>
      </div>

      {/* Main Footer Section */}
      <div className="bg-[#101820] box-border content-stretch flex flex-col gap-8 lg:gap-12 xl:gap-16 items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-8 sm:py-10 lg:py-12 xl:py-16 relative shrink-0 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start justify-start w-full max-w-[1440px]">
          
          {/* OWASP Logo and Description */}
          <div className="bg-[#151515] flex flex-col items-start justify-between p-6 sm:p-8 w-full lg:w-[480px] min-h-[200px] lg:min-h-[300px]">
            <div className="h-12 sm:h-14 lg:h-16 w-[160px] sm:w-[186px] lg:w-[213px] mb-4 lg:mb-0">
              <Image src="/images/logos/owasp-logo-footer.svg" alt="OWASP Logo" width={213} height={64} className="block max-w-none size-full" />
            </div>
            <div className="font-['Poppins'] text-[#ffffff] text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px]">
              OWASP is a nonprofit foundation improving software security through open-source projects, global communities, and education. All resources are free and open to everyone.
            </div>
          </div>

          {/* Links Section */}
          <div className="flex flex-col gap-8 w-full lg:flex-1">
            {/* Navigation Links */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 w-full">
              
              {/* Quick Links Column */}
              <div className="flex flex-col gap-4">
                <div className="font-['Poppins'] text-[14px] sm:text-[16px] text-[rgba(244,244,244,0.5)] tracking-[-0.28px] sm:tracking-[-0.32px] leading-[20px] sm:leading-[24px]">
                  Quick Links
                </div>
                <div className="flex flex-col gap-3">
                  <Link href="/projects" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    Projects
                  </Link>
                  <Link href="/chapters" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    Chapters
                  </Link>
                  <Link href="/events" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    Events
                  </Link>
                  <Link href="/about" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    About
                  </Link>
                  <a href="#" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    Visit Store
                  </a>
                </div>
              </div>

              {/* Legal Column */}
              <div className="flex flex-col gap-4">
                <div className="font-['Poppins'] text-[14px] sm:text-[16px] text-[rgba(244,244,244,0.5)] tracking-[-0.28px] sm:tracking-[-0.32px] leading-[20px] sm:leading-[24px]">
                  Legal
                </div>
                <div className="flex flex-col gap-3">
                  <a href="#" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    Privacy
                  </a>
                  <a href="#" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    Sitemap
                  </a>
                  <a href="#" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    Contact
                  </a>
                </div>
              </div>

              {/* Socials Column */}
              <div className="flex flex-col gap-4">
                <div className="font-['Poppins'] text-[14px] sm:text-[16px] text-[rgba(244,244,244,0.5)] tracking-[-0.28px] sm:tracking-[-0.32px] leading-[20px] sm:leading-[24px]">
                  Socials
                </div>
                <div className="flex flex-col gap-3">
                  <a href="#" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    LinkedIn
                  </a>
                  <a href="#" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    X (Twitter)
                  </a>
                  <a href="#" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    Facebook
                  </a>
                  <a href="#" className="font-['Barlow'] font-medium text-[#ffffff] text-[16px] sm:text-[18px] lg:text-[20px] tracking-[-0.32px] sm:tracking-[-0.36px] lg:tracking-[-0.4px] leading-[22px] sm:leading-[24px] lg:leading-[26px] hover:text-[#ffb81b] transition-colors">
                    YouTube
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <button className="bg-[#ffb81b] h-10 sm:h-12 px-4 sm:px-6 font-['Poppins'] font-semibold text-[#101820] text-[12px] sm:text-[14px] tracking-[-0.24px] sm:tracking-[-0.28px] leading-[18px] sm:leading-[20px] hover:bg-[#ffc947] transition-colors rounded-sm w-full sm:w-auto">
                Make a Donation
              </button>
              <button className="border-2 border-[#ffffff] h-10 sm:h-12 px-4 sm:px-6 font-['Poppins'] font-semibold text-[#ffffff] text-[12px] sm:text-[14px] tracking-[-0.24px] sm:tracking-[-0.28px] leading-[18px] sm:leading-[20px] hover:bg-white/10 transition-colors rounded-sm w-full sm:w-auto">
                Join Now
              </button>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 items-start lg:items-end justify-between w-full max-w-[1440px] text-[#d7d7d7] text-[10px] sm:text-[11px] lg:text-[12px] tracking-[-0.2px] sm:tracking-[-0.22px] lg:tracking-[-0.24px]">
          <div className="font-['Poppins'] leading-[14px] sm:leading-[15px] lg:leading-[16px] order-2 lg:order-1 flex-1">
            OWASP, the OWASP logo, and Global AppSec are registered trademarks and AppSec Days, AppSec California, AppSec Cali, SnowFROC, OWASP Boston Application Security Conference, and LASCON are trademarks of the OWASP Foundation, Inc.
          </div>
          <div className="font-['Poppins'] leading-[14px] sm:leading-[15px] lg:leading-[16px] order-1 lg:order-2 whitespace-nowrap">
            © 2025, OWASP Foundation Inc. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
} 