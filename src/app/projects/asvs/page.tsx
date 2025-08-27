'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ButtonProps {
  text?: string;
  type?: "Primary" | "Ghost White" | "Ghost Dark" | "Light Blue";
  size?: "40" | "48" | "56";
}

function Button({
  text = "Join Now",
  type = "Primary",
  size = "40",
}: ButtonProps) {
  if (type === "Primary" && size === "56") {
    return (
      <div className="bg-[#003594] box-border content-stretch flex flex-row gap-10 items-center justify-center px-8 py-0 relative h-14">
        <div className="font-['Poppins'] font-semibold text-[#ffffff] text-[16px] text-center text-nowrap tracking-[-0.32px] leading-[24px]">
          {text}
        </div>
      </div>
    );
  }
  if (type === "Ghost White" && size === "48") {
    return (
      <div className="box-border content-stretch flex flex-row gap-10 items-center justify-center px-6 py-0 relative h-12 border border-[#757575] border-solid">
        <div className="font-['Poppins'] font-semibold text-[#ffffff] text-[14px] text-center text-nowrap tracking-[-0.28px] leading-[20px]">
          {text}
        </div>
      </div>
    );
  }
  if (type === "Ghost Dark" && size === "48") {
    return (
      <div className="box-border content-stretch flex flex-row gap-10 items-center justify-center px-6 py-0 relative h-12 border border-[#757575] border-solid">
        <div className="font-['Poppins'] font-semibold text-[#101820] text-[14px] text-center text-nowrap tracking-[-0.28px] leading-[20px]">
          {text}
        </div>
      </div>
    );
  }
  if (type === "Ghost Dark" && size === "56") {
    return (
      <div className="box-border content-stretch flex flex-row gap-10 items-center justify-center px-8 py-0 relative h-14 border border-[#757575] border-solid">
        <div className="font-['Poppins'] font-semibold text-[#101820] text-[16px] text-center text-nowrap tracking-[-0.32px] leading-[24px]">
          {text}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-[#003594] box-border content-stretch flex flex-row gap-10 items-center justify-center px-4 py-0 relative h-10">
      <div className="font-['Poppins'] font-semibold text-[#ffffff] text-[14px] text-center text-nowrap tracking-[-0.28px] leading-[20px]">
        {text}
      </div>
    </div>
  );
}

export default function ASVSProjectPage() {
  return (
    <div>
      <Header />
      <div className="bg-[#ffffff] box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full">
        
        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row min-h-[500px] sm:min-h-[600px] lg:h-[560px] items-center justify-center relative w-full">
          {/* Left side with ASVS logo */}
          <div className="flex-1 h-80 sm:h-96 lg:h-full overflow-hidden relative w-full lg:w-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-[#1a237e] via-[#303f9f] to-[#42a5f5]">
              {/* OWASP Logo */}
              <div className="absolute top-4 lg:top-8 left-4 lg:left-8 flex items-center gap-2">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-white rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 lg:w-6 lg:h-6 bg-[#003594] rounded-full"></div>
                </div>
                <span className="text-white font-medium text-xs lg:text-sm">OWASP</span>
              </div>
              
              {/* Large ASVS Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                <div className="text-center">
                  <div className="font-bold text-white text-[48px] sm:text-[64px] md:text-[80px] lg:text-[100px] xl:text-[120px] leading-[0.85] lg:leading-[100px] tracking-[-1px] lg:tracking-[-2px] mb-2 lg:mb-4">
                    ASVS
                  </div>
                  <div className="font-medium text-white text-[10px] sm:text-xs lg:text-[14px] tracking-[0.5px] sm:tracking-[1px] lg:tracking-[2px] uppercase px-2">
                    APPLICATION SECURITY<br/>VERIFICATION STANDARD
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side with content */}
          <div className="flex-1 flex flex-col gap-8 lg:gap-16 h-full items-start justify-center px-4 sm:px-6 lg:px-12 xl:px-16 py-8 lg:py-0 bg-[#f8f9fa]">
            <div className="flex flex-col gap-4 lg:gap-6 items-start justify-start w-full">
              <div className="flex flex-col gap-3 lg:gap-4 items-start justify-start w-full">
                <div className="bg-[#d9e5fa] flex flex-row gap-2 items-center justify-start pl-3 pr-6 py-3 rounded">
                  <div className="relative size-4 lg:size-5">
                    <Image src="/images/icons/flag-icon.svg" alt="Flag" fill className="object-contain" />
                  </div>
                  <div className="font-medium text-[#003594] text-xs lg:text-[14px] text-left text-nowrap leading-tight lg:leading-[20px]">
                    Flagship Project
                  </div>
                </div>
                <div className="font-medium text-[#101820] text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[48px] text-left tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.8px] xl:tracking-[-0.96px] leading-tight xl:leading-[56px] w-full">
                  OWASP Application Security Verification Standard (ASVS)
                </div>
              </div>
              <div className="text-[#757575] text-sm lg:text-[16px] text-left tracking-[-0.28px] lg:tracking-[-0.32px] leading-6 lg:leading-[24px] w-full">
                The OWASP Application Security Verification Standard (ASVS) Project provides a basis for testing web application technical security controls and also provides developers with a list of requirements for secure development.
              </div>
            </div>
            <div className="flex flex-row gap-1.5 items-center justify-start">
              <div className="font-medium text-[#003594] text-sm lg:text-[16px] text-left text-nowrap tracking-[-0.28px] lg:tracking-[-0.32px] leading-tight lg:leading-[24px]">
                Read More Details
              </div>
              <div className="flex h-[18px] lg:h-[20px] items-center justify-center w-[18px] lg:w-[20px]">
                <Image src="/images/icons/chevron.svg" alt="Arrow" width={16} height={16} className="rotate-[-90deg]" />
              </div>
            </div>
          </div>
        </div>

        {/* About ASVS Section */}
        <div className="bg-[#f1f6fe] flex flex-col gap-12 lg:gap-16 items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 relative w-full">
          <div className="flex flex-col gap-6 lg:gap-8 items-start justify-start relative w-full">
            <div className="font-['Barlow'] font-medium text-[#101820] text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[48px] text-center tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.8px] xl:tracking-[-0.96px] leading-tight xl:leading-[48px] w-full">
              About ASVS
            </div>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-start relative w-full">
              <div className="flex-1 min-h-px min-w-px relative text-sm lg:text-[16px] leading-6 lg:leading-[24px]">
                <p className="font-['Poppins'] text-[#757575] tracking-[-0.28px] lg:tracking-[-0.32px]">
                  <span>The primary aim of the OWASP Application Security Verification Standard (ASVS) Project is to </span>
                  <span className="font-['Poppins'] font-medium text-[#003594] tracking-[-0.28px] lg:tracking-[-0.32px]">
                    normalize the range in the coverage and level of rigor available in the market
                  </span>
                  <span> when it comes to performing Web application security verification using a commercially-workable open standard.</span>
                </p>
              </div>
              <div className="flex-1 min-h-px min-w-px relative">
                <p className="font-['Poppins'] text-[#757575] text-sm lg:text-[16px] tracking-[-0.28px] lg:tracking-[-0.32px] leading-6 lg:leading-[24px]">
                  The standard provides a basis for testing application technical security controls, as well as any technical security controls in the environment, that are relied on to protect against vulnerabilities such as Cross-Site Scripting (XSS) and SQL injection. This standard can be used to establish a level of confidence in the security of Web applications.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-8 items-start justify-start relative w-full">
            <div className="flex-1 flex flex-col items-start justify-between min-h-px min-w-px relative self-stretch">
              <div className="font-['Barlow'] font-medium text-[#101820] text-[24px] sm:text-[28px] lg:text-[32px] text-left tracking-[-0.48px] sm:tracking-[-0.56px] lg:tracking-[-0.64px] leading-tight lg:leading-[40px] w-full">
                Developed to achieve these objectives:
              </div>
              <div className="flex flex-col gap-2 items-start justify-start relative w-full mt-6 lg:mt-0">
                <div className="font-['Poppins'] text-[#757575] text-sm leading-tight lg:leading-[20px] w-full">
                  Latest version
                </div>
                <div className="flex flex-col gap-1 items-start justify-start relative">
                  <div className="font-['Poppins'] font-medium text-[#101820] text-sm lg:text-[16px] text-left text-nowrap tracking-[-0.28px] lg:tracking-[-0.32px] leading-tight lg:leading-[24px]">
                    ASVS 5.0.0
                  </div>
                  <div className="flex flex-row gap-1.5 items-center justify-start relative">
                    <div className="font-['Poppins'] font-medium text-[#003594] text-sm lg:text-[16px] text-left text-nowrap tracking-[-0.28px] lg:tracking-[-0.32px] leading-tight lg:leading-[24px]">
                      Download
                    </div>
                    <div className="overflow-clip relative size-4 lg:size-5">
                      <Image src="/images/icons/arrow-up-right.svg" alt="Download" fill className="object-contain" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col gap-8 lg:gap-12 items-start justify-center min-h-px min-w-px relative">
              {/* Objective 1 */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start justify-center pb-0 pt-6 lg:pt-8 px-0 relative w-full border-t border-[#d9e5fa]">
                <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start justify-start min-h-px min-w-px relative w-full">
                  <div className="font-['Barlow'] font-medium text-[#6496ed] text-[20px] lg:text-[24px] text-left tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] shrink-0">
                    01
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start min-h-px min-w-px relative text-left flex-1">
                    <div className="font-['Barlow'] font-medium text-[#041a41] text-[20px] lg:text-[24px] tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] w-full">
                      Use as a metric
                    </div>
                    <div className="font-['Poppins'] text-[#757575] text-sm leading-tight lg:leading-[20px] w-full">
                      Provide application developers and application owners with a yardstick with which to assess the degree of trust that can be placed in their Web applications
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Objective 2 */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start justify-center pb-0 pt-6 lg:pt-8 px-0 relative w-full border-t border-[#d9e5fa]">
                <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start justify-start min-h-px min-w-px relative w-full">
                  <div className="font-['Barlow'] font-medium text-[#6496ed] text-[20px] lg:text-[24px] text-left tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] shrink-0">
                    02
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start min-h-px min-w-px relative text-left flex-1">
                    <div className="font-['Barlow'] font-medium text-[#041a41] text-[20px] lg:text-[24px] tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] w-full">
                      Use as guidance
                    </div>
                    <div className="font-['Poppins'] text-[#757575] text-sm leading-tight lg:leading-[20px] w-full">
                      Provide guidance to security control developers as to what to build into security controls in order to satisfy application security requirements
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Objective 3 */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start justify-center pb-0 pt-6 lg:pt-8 px-0 relative w-full border-t border-[#d9e5fa]">
                <div className="flex flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-20 items-start justify-start min-h-px min-w-px relative w-full">
                  <div className="font-['Barlow'] font-medium text-[#6496ed] text-[20px] lg:text-[24px] text-left tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] shrink-0">
                    03
                  </div>
                  <div className="flex flex-col gap-2 items-start justify-start min-h-px min-w-px relative text-left flex-1">
                    <div className="font-['Barlow'] font-medium text-[#041a41] text-[20px] lg:text-[24px] tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] w-full">
                      Use during procurement
                    </div>
                    <div className="font-['Poppins'] text-[#757575] text-sm leading-tight lg:leading-[20px] w-full">
                      Provide a basis for specifying application security verification requirements in contracts.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Reference ASVS Requirements */}
        <div className="bg-[#ffffff] flex flex-col lg:flex-row gap-8 lg:gap-16 items-start justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 relative w-full">
          <div className="flex-1 font-['Barlow'] font-medium min-h-px min-w-px text-[#101820] text-[28px] sm:text-[36px] lg:text-[48px] xl:text-[56px] text-left tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.96px] xl:tracking-[-1.12px] leading-tight xl:leading-[56px]">
            How to Reference ASVS Requirements
          </div>
          <div className="bg-[#ffffff] flex flex-col gap-6 lg:gap-8 items-center justify-center p-6 lg:p-[40px] relative w-full lg:w-[640px] border border-[#d7d7d7]">
            <div className="font-['Poppins'] text-[#757575] text-sm lg:text-[16px] text-left tracking-[-0.28px] lg:tracking-[-0.32px] leading-6 lg:leading-[24px] w-full">
              <p className="mb-4">
                Each requirement has an identifier in the format <span className="font-['Consolas'] font-bold text-[#101820]">&lt;chapter&gt;.&lt;section&gt;.&lt;requirement&gt;</span>, where each element is a number. For example, <span className="font-['Consolas'] font-bold text-[#101820]">1.11.3</span>.
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>The <span className="font-['Consolas'] font-bold text-[#101820]">&lt;chapter&gt;</span> value corresponds to the chapter from which the requirement comes; for example, all 1.#.# requirements are from the 'Encoding and Sanitization' chapter.</li>
                <li>The <span className="font-['Consolas'] font-bold text-[#101820]">&lt;section&gt;</span> value corresponds to the section within that chapter where the requirement appears, for example: all <span className="font-['Consolas'] font-bold text-[#101820]">1.2.#</span> requirements are in the 'Injection Prevention' section of the 'Encoding and Sanitization' chapter.</li>
                <li>The <span className="font-['Consolas'] font-bold text-[#101820]">&lt;requirement&gt;</span> value identifies the specific requirement within the chapter and section, for example, <span className="font-['Consolas'] font-bold text-[#101820]">1.2.5</span> which as of version 5.0.0 of this standard is:</li>
              </ul>
              <p className="mb-4">
                Verify that the application protects against OS command injection and that operating system calls use parameterized OS queries or use contextual command line output encoding.
              </p>
            </div>
            <div className="font-['Poppins'] text-[#757575] text-sm lg:text-[16px] text-left tracking-[-0.28px] lg:tracking-[-0.32px] leading-6 lg:leading-[24px] w-full">
              <p className="mb-4">
                Since the identifiers may change between versions of the standard, it is preferable for other documents, reports, or tools to use the following format: <span className="font-['Consolas'] font-bold text-[#101820]">v&lt;version&gt;-&lt;chapter&gt;.&lt;section&gt;.&lt;requirement&gt;</span>, where: 'version' is the ASVS version tag. For example: <span className="font-['Consolas'] font-bold text-[#101820]">v5.0.0-1.2.5</span> would be understood to mean specifically the 5th requirement in the 'Injection Prevention' section of the 'Encoding and Sanitization' chapter from version 5.0.0.
              </p>
              <p className="mb-4">
                Note: The <span className="font-['Consolas'] font-bold text-[#101820]">v</span> preceding the version number in the format should always be lowercase.
              </p>
              <p className="mb-4">
                If identifiers are used without including the <span className="font-['Consolas'] font-bold text-[#101820]">v&lt;version&gt;</span> element then they should be assumed to refer to the latest Application Security Verification Standard content. As the standard grows and changes this becomes problematic, which is why writers or developers should include the version element.
              </p>
              <p>
                ASVS requirement lists are made available in <a href="https://github.com/OWASP/ASVS" className="text-[#003594] underline">CSV, JSON, and other formats</a> which may be useful for reference or programmatic use.
              </p>
            </div>
          </div>
        </div>

        {/* Meet the ASVS Section */}
        <div className="bg-[#f1f6fe] flex flex-col gap-12 lg:gap-16 items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 relative w-full">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-0 relative w-full">
            <div className="font-['Barlow'] font-medium text-[#101820] text-[28px] sm:text-[36px] lg:text-[48px] xl:text-[56px] text-center lg:text-left text-nowrap tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.96px] xl:tracking-[-1.12px] leading-tight xl:leading-[56px]">
              Meet the ASVS
            </div>
            <div className="flex flex-row gap-6 lg:gap-10 h-12 lg:h-14 items-center justify-center px-6 lg:px-8 py-0 relative w-full lg:w-auto">
              <Button text="View Full Agenda" type="Ghost Dark" size="56" />
            </div>
          </div>
          <div className="bg-[#ffffff] flex flex-col items-start justify-start overflow-clip relative shadow-[0px_12px_32px_-6px_rgba(0,0,0,0.1)] w-full">
            <div className="aspect-[1200/335] bg-center bg-cover bg-no-repeat w-full bg-gradient-to-r from-[#003594] to-[#6496ed]" />
            <div className="flex flex-col gap-6 lg:gap-8 items-start justify-start p-6 lg:p-[48px] relative w-full border-[#d7d7d7] border-[0px_1px_1px]">
              
              {/* Project Update */}
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center justify-start relative w-full">
                <div className="flex flex-col sm:flex-row gap-4 items-start justify-start relative">
                  <div className="flex flex-col gap-3 items-center justify-start w-32 lg:w-40">
                    <div className="overflow-clip relative rounded-[120px] size-20 lg:size-24">
                      <div className="absolute bg-center bg-cover bg-no-repeat left-1/2 size-[96px] lg:size-[104px] top-[-0.245px] translate-x-[-50%] bg-gray-300" />
                    </div>
                    <div className="font-['Barlow'] font-medium text-[#101820] text-lg lg:text-[20px] text-center tracking-[-0.36px] lg:tracking-[-0.4px] leading-tight lg:leading-[24px] w-full">
                      Matthew Aderhold
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-start justify-start min-h-px min-w-px relative text-left flex-1">
                  <div className="font-['Barlow'] font-medium text-[#041a41] text-[20px] lg:text-[24px] tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] w-full">
                    Engage with the Community
                  </div>
                  <div className="font-['Poppins'] text-[#757575] text-sm leading-tight lg:leading-[20px] w-full">
                    Meet our new Community Manager, Matthew Aderhold, throughout the conference. Chat about ASVS, get stickers, and learn how to get involved — special stickers available for contributors!
                  </div>
                </div>
              </div>

              <div className="bg-[#d7d7d7] h-px w-full" />

              {/* Applying ASVS in Practice */}
              <div className="box-border content-stretch flex flex-row gap-16 items-center justify-start p-0 relative w-full">
                <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative text-left">
                  <div className="font-['Barlow'] font-medium text-[#041a41] text-[24px] tracking-[-0.48px] leading-[32px] w-full">
                    Applying ASVS in Practice
                  </div>
                  <div className="font-['Poppins'] text-[#757575] text-[14px] leading-[20px] w-full">
                    Aram Hovsepyan will explore how ASVS can guide security test case design across the software lifecycle.
                  </div>
                </div>
                <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative">
                  <div className="box-border content-stretch flex flex-col gap-3 items-center justify-start p-0 relative w-40">
                    <div className="overflow-clip relative rounded-[120px] size-24">
                      <div className="absolute bg-center bg-cover bg-no-repeat left-1/2 size-[104px] top-[-0.245px] translate-x-[-50%] bg-gray-300" />
                    </div>
                    <div className="font-['Barlow'] font-medium text-[#101820] text-[20px] text-center tracking-[-0.4px] leading-[24px] w-full">
                      Aram Hovsepyan
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#d7d7d7] h-px w-full" />

              {/* Engage with the Community */}
              <div className="box-border content-stretch flex flex-row gap-16 items-center justify-start p-0 relative w-full">
                <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative">
                  <div className="box-border content-stretch flex flex-col gap-3 items-center justify-start p-0 relative w-40">
                    <div className="overflow-clip relative rounded-[120px] size-24">
                      <div className="absolute bg-center bg-cover bg-no-repeat left-1/2 size-[104px] top-[-0.245px] translate-x-[-50%] bg-gray-300" />
                    </div>
                    <div className="font-['Barlow'] font-medium text-[#101820] text-[20px] text-center tracking-[-0.4px] leading-[24px] w-full">
                      Matthew Aderhold
                    </div>
                  </div>
                </div>
                <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px p-0 relative text-left">
                  <div className="font-['Barlow'] font-medium text-[#041a41] text-[24px] tracking-[-0.48px] leading-[32px] w-full">
                    Engage with the Community
                  </div>
                  <div className="font-['Poppins'] text-[#757575] text-[14px] leading-[20px] w-full">
                    Meet our new Community Manager, Matthew Aderhold, throughout the conference. Chat about ASVS, get stickers, and learn how to get involved — special stickers available for contributors!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ASVS Supporters Section */}
        <div className="bg-[#ffffff] flex flex-col gap-12 lg:gap-16 items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 relative w-full">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-start relative w-full text-left">
            <div className="flex-1 font-['Barlow'] font-medium min-h-px min-w-px text-[#101820] text-[28px] sm:text-[36px] lg:text-[48px] xl:text-[56px] tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.96px] xl:tracking-[-1.12px] leading-tight xl:leading-[56px]">
              ASVS Supporters
            </div>
            <div className="flex-1 font-['Poppins'] leading-6 lg:leading-[24px] min-h-px min-w-px text-[#757575] text-sm lg:text-[16px] tracking-[-0.28px] lg:tracking-[-0.32px]">
              <p className="mb-4">
                We gratefully acknowledge the organizations supporting the OWASP ASVS Project — either through financial contributions or by allowing their staff to dedicate significant time to the standard.
              </p>
              <p>
                Supporters are recognized based on their level of contribution and commitment.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-start relative w-full">
            <div className="flex-1 flex flex-col font-['Barlow'] font-medium gap-2 items-start justify-start min-h-px min-w-px relative text-left">
              <div className="text-[#101820] text-[24px] sm:text-[28px] lg:text-[32px] tracking-[-0.48px] sm:tracking-[-0.56px] lg:tracking-[-0.64px] leading-tight lg:leading-[40px] w-full">
                Maintaining Supporters
              </div>
              <div className="text-[#757575] text-[20px] lg:text-[24px] tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] w-full">
                through time provisions
              </div>
            </div>
            <div className="flex-1 flex flex-col gap-6 lg:gap-8 items-start justify-start min-h-px min-w-px relative">
              <div className="font-['Poppins'] text-[#757575] text-sm lg:text-[16px] text-left tracking-[-0.28px] lg:tracking-[-0.32px] leading-6 lg:leading-[24px] w-full">
                Organizations who have allowed contributors to spend significant time working on the standard as part of their working day with the organization.
                <br /><br />
                This will be evaluated at the sole discretion of the project leaders. Supporter will be listed 2 years from the end of the time provision.
              </div>
              <div className="flex flex-row gap-1.5 items-center justify-start relative">
                <div className="font-['Poppins'] font-medium text-[#003594] text-sm lg:text-[16px] text-left text-nowrap tracking-[-0.28px] lg:tracking-[-0.32px] leading-tight lg:leading-[24px]">
                  Become a Supporter
                </div>
                <div className="overflow-clip relative size-4 lg:size-5">
                  <Image src="/images/icons/arrow-up-right.svg" alt="Arrow" fill className="object-contain" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-start relative w-full">
            {/* Primary Supporters */}
            <div className="flex-1 flex flex-col items-start justify-start min-h-px min-w-px p-0 relative border border-[#fdcb7d]">
              <div className="bg-[#101820] flex flex-row gap-2 items-center justify-center pl-0 pr-2 py-3 relative w-full">
                <div className="relative size-5 lg:size-6">
                  <div className="absolute h-[15px] lg:h-[17.561px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[19px] lg:w-[22px] bg-[#fdcb7d] rounded-full" style={{ top: "calc(50% + 0.281px)" }} />
                </div>
                <div className="font-['Poppins'] font-medium text-[#ffffff] text-sm lg:text-[16px] text-left text-nowrap tracking-[-0.28px] lg:tracking-[-0.32px] leading-tight lg:leading-[24px]">
                  Primary Supporter(s)
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:gap-6 items-start justify-center p-4 lg:p-[24px] relative w-full">
                <div className="flex flex-wrap gap-4 lg:gap-6 items-center justify-center relative w-full">
                  <div className="h-6 lg:h-8 w-[90px] lg:w-[103px] bg-gray-200 rounded" />
                  <div className="h-6 lg:h-8 w-[170px] lg:w-[200px] bg-gray-200 rounded" />
                  <div className="h-5 lg:h-6 w-[150px] lg:w-[172px] bg-gray-200 rounded" />
                </div>
                <div className="font-['Poppins'] text-[#757575] text-xs lg:text-[14px] text-center leading-tight lg:leading-[20px] w-full">
                  Organizations who have donated <span className="font-['Poppins'] font-semibold text-[#101820] tracking-[-0.24px] lg:tracking-[-0.28px]">$7,000</span> or more to the project via OWASP. Supporter will be listed for 3 years from the date of the donation.
                </div>
              </div>
            </div>

            {/* Silver Supporters */}
            <div className="flex-1 flex flex-col items-start justify-start min-h-px min-w-px p-0 relative border border-[#ccd8e0]">
              <div className="bg-[#101820] flex flex-row gap-2 items-center justify-center pl-0 pr-2 py-3 relative w-full">
                <div className="relative size-5 lg:size-6">
                  <div className="absolute h-[15px] lg:h-[17.561px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[19px] lg:w-[22px] bg-[#ccd8e0] rounded-full" style={{ top: "calc(50% + 0.281px)" }} />
                </div>
                <div className="font-['Poppins'] font-medium text-[#ffffff] text-sm lg:text-[16px] text-left text-nowrap tracking-[-0.28px] lg:tracking-[-0.32px] leading-tight lg:leading-[24px]">
                  Silver Supporters
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:gap-6 items-start justify-center p-4 lg:p-[24px] relative w-full">
                <div className="flex flex-wrap gap-4 lg:gap-6 items-center justify-center relative w-full">
                  <div className="h-6 lg:h-8 w-[95px] lg:w-[103px] bg-gray-200 rounded" />
                </div>
                <div className="font-['Poppins'] text-[#757575] text-xs lg:text-[14px] text-center leading-tight lg:leading-[20px] w-full">
                  Organizations who have donated <span className="font-['Poppins'] font-semibold text-[#101820] tracking-[-0.24px] lg:tracking-[-0.28px]">$3,000</span> or more to the project via OWASP. Supporter will be listed for 2 years from the date of the donation.
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-start relative w-full">
            {/* Tertiary Supporters */}
            <div className="flex-1 flex flex-col items-start justify-start min-h-px min-w-px relative border border-[#fdb77d]">
              <div className="bg-[#101820] flex flex-row gap-2 items-center justify-center pl-0 pr-2 py-3 relative w-full">
                <div className="relative size-5 lg:size-6">
                  <div className="absolute h-[15px] lg:h-[17.561px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[19px] lg:w-[22px] bg-[#fdb77d] rounded-full" style={{ top: "calc(50% + 0.281px)" }} />
                </div>
                <div className="font-['Poppins'] font-medium text-[#ffffff] text-sm lg:text-[16px] text-left text-nowrap tracking-[-0.28px] lg:tracking-[-0.32px] leading-tight lg:leading-[24px]">
                  Tertiary Supporter(s)
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:gap-6 items-start justify-center p-4 lg:p-[24px] relative w-full">
                <div className="flex flex-wrap gap-4 lg:gap-6 items-center justify-center relative w-full">
                  <div className="h-6 lg:h-8 w-[30px] bg-gray-200 rounded" />
                </div>
                <div className="font-['Poppins'] text-[#757575] text-xs lg:text-[14px] text-center leading-tight lg:leading-[20px] w-full">
                  Organizations who have donated <span className="font-['Poppins'] font-semibold text-[#101820] tracking-[-0.24px] lg:tracking-[-0.28px]">$500</span> or more to the project via OWASP. Supporter will be listed for 1 year from the date of the donation.
                </div>
              </div>
            </div>

            {/* Associate Supporters */}
            <div className="flex-1 flex flex-col items-start justify-start min-h-px min-w-px relative border border-[#b686fc]">
              <div className="bg-[#101820] flex flex-row gap-2 items-center justify-center pl-0 pr-2 py-3 relative w-full">
                <div className="relative size-5 lg:size-6">
                  <div className="absolute h-[15px] lg:h-[17.561px] left-1/2 translate-x-[-50%] translate-y-[-50%] w-[19px] lg:w-[22px] bg-[#b686fc] rounded-full" style={{ top: "calc(50% + 0.281px)" }} />
                </div>
                <div className="font-['Poppins'] font-medium text-[#ffffff] text-sm lg:text-[16px] text-left text-nowrap tracking-[-0.28px] lg:tracking-[-0.32px] leading-tight lg:leading-[24px]">
                  Associate Supporter(s)
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:gap-6 items-start justify-center p-4 lg:p-[24px] relative w-full">
                <div className="flex flex-wrap gap-4 lg:gap-6 items-center justify-center relative w-full">
                  <div className="h-6 lg:h-8 w-6 bg-gray-200 rounded" />
                  <div className="h-6 lg:h-8 w-[39px] bg-gray-200 rounded" />
                  <div className="h-6 lg:h-8 w-[81px] bg-gray-200 rounded" />
                </div>
                <div className="font-['Poppins'] text-[#757575] text-xs lg:text-[14px] text-center leading-tight lg:leading-[20px] w-full">
                  Organizations who have donated another amount to the project via OWASP. Supporter will be listed for 1 year from the date of the donation.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent News and Upcoming Events */}
        <div className="bg-[#f1f6fe] flex flex-col gap-16 lg:gap-20 items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 relative w-full">
          {/* Recent News */}
          <div className="flex flex-col gap-8 lg:gap-12 items-start justify-start relative w-full">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-end justify-between relative w-full">
              <div className="flex-1 font-['Barlow'] font-medium min-h-px min-w-px text-[#101820] text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[48px] text-left tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.8px] xl:tracking-[-0.96px] leading-tight xl:leading-[48px]">
                Recent News
              </div>
              <div className="flex flex-row gap-6 lg:gap-10 h-10 lg:h-12 items-center justify-center px-4 lg:px-6 py-0 relative w-full lg:w-auto">
                <Button text="See More" type="Ghost Dark" size="48" />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-start relative w-full">
              <div className="flex-1 flex flex-col gap-3 lg:gap-4 items-start justify-start min-h-px min-w-px relative">
                <div className="bg-center bg-cover bg-no-repeat h-48 lg:h-60 w-full bg-gradient-to-r from-[#003594] to-[#6496ed]" />
                <div className="flex flex-col gap-2 lg:gap-3 items-start justify-center relative w-full">
                  <div className="flex flex-row gap-2.5 items-center justify-center pl-2 pr-0 py-0 relative w-full border-l-2 border-[#003594]">
                    <div className="flex-1 font-['Poppins'] font-semibold min-h-px min-w-px text-[#003594] text-xs lg:text-[14px] text-left tracking-[-0.24px] lg:tracking-[-0.28px] leading-tight lg:leading-[20px]">
                      Starr Brown, May 6
                    </div>
                  </div>
                  <div className="font-['Inter'] font-medium text-[#101820] text-lg lg:text-[20px] text-left tracking-[-0.18px] lg:tracking-[-0.2px] leading-tight lg:leading-[28px] w-full">
                    ASVS Version 5.0.0 is released LIVE at Global AppSec EU Barcelona 2025!
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3 lg:gap-4 items-start justify-start min-h-px min-w-px relative">
                <div className="bg-center bg-cover bg-no-repeat h-48 lg:h-60 w-full bg-gradient-to-r from-[#003594] to-[#6496ed]" />
                <div className="flex flex-col gap-2 lg:gap-3 items-start justify-center relative w-full">
                  <div className="flex flex-row gap-2.5 items-center justify-center pl-2 pr-0 py-0 relative w-full border-l-2 border-[#003594]">
                    <div className="flex-1 font-['Poppins'] font-semibold min-h-px min-w-px text-[#003594] text-xs lg:text-[14px] text-left tracking-[-0.24px] lg:tracking-[-0.28px] leading-tight lg:leading-[20px]">
                      Starr Brown, May 6
                    </div>
                  </div>
                  <div className="font-['Inter'] font-medium text-[#101820] text-lg lg:text-[20px] text-left tracking-[-0.18px] lg:tracking-[-0.2px] leading-tight lg:leading-[28px] w-full">
                    Release Candidate 1 of the ASVS version 5.0 is announced!
                  </div>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-3 lg:gap-4 items-start justify-start min-h-px min-w-px relative">
                <div className="bg-center bg-cover bg-no-repeat h-48 lg:h-60 w-full bg-gradient-to-r from-[#003594] to-[#6496ed]" />
                <div className="flex flex-col gap-2 lg:gap-3 items-start justify-center relative w-full">
                  <div className="flex flex-row gap-2.5 items-center justify-center pl-2 pr-0 py-0 relative w-full border-l-2 border-[#003594]">
                    <div className="flex-1 font-['Poppins'] font-semibold min-h-px min-w-px text-[#003594] text-xs lg:text-[14px] text-left tracking-[-0.24px] lg:tracking-[-0.28px] leading-tight lg:leading-[20px]">
                      Starr Brown, May 6
                    </div>
                  </div>
                  <div className="font-['Inter'] font-medium text-[#101820] text-lg lg:text-[20px] text-left tracking-[-0.18px] lg:tracking-[-0.2px] leading-tight lg:leading-[28px] w-full">
                    Some of the ASVS team got together at the <a href="https://owaspprojectsummit.org/" className="text-[#003594] underline">OWASP Project Summit</a> to make major progress on getting towards version 5.0!
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="flex flex-col gap-8 lg:gap-12 items-start justify-start relative w-full">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-start lg:items-end justify-between relative w-full">
              <div className="flex-1 font-['Barlow'] font-medium min-h-px min-w-px text-[#101820] text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[48px] text-left tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.8px] xl:tracking-[-0.96px] leading-tight xl:leading-[48px]">
                Upcoming Events
              </div>
              <div className="flex flex-row gap-6 lg:gap-10 h-10 lg:h-12 items-center justify-center px-4 lg:px-6 py-0 relative w-full lg:w-auto">
                <Button text="See More" type="Ghost Dark" size="48" />
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-start relative w-full">
              <div className="flex-1 bg-[#ffffff] flex flex-col items-start justify-start min-h-px min-w-px relative self-stretch">
                <div className="bg-center bg-cover bg-no-repeat h-48 lg:h-60 w-full bg-gradient-to-r from-[#003594] to-[#6496ed]" />
                <div className="flex flex-col gap-4 lg:gap-6 items-start justify-center p-4 lg:p-[24px] relative w-full">
                  <div className="flex flex-col gap-3 lg:gap-4 items-start justify-start relative w-full">
                    <div className="flex flex-row gap-3 items-center justify-start relative">
                      <div className="font-['Barlow'] font-medium text-[#101820] text-[32px] lg:text-[40px] text-left text-nowrap tracking-[-0.64px] lg:tracking-[-0.8px] leading-tight lg:leading-[40px]">
                        3-7
                      </div>
                      <div className="flex flex-col font-['Poppins'] items-start justify-start relative text-[#101820] text-xs lg:text-[14px] text-left text-nowrap leading-tight lg:leading-[20px]">
                        <div>NOV</div>
                        <div>2025</div>
                      </div>
                    </div>
                    <div className="font-['Barlow'] font-medium text-[#101820] text-[20px] lg:text-[24px] text-left tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] w-full">
                      OWASP Global AppSec USA<br />2025
                    </div>
                  </div>
                  <div className="flex flex-row gap-6 lg:gap-10 h-10 lg:h-12 items-center justify-center px-4 lg:px-6 py-0 relative w-full">
                    <Button text="More Info" type="Ghost Dark" size="48" />
                  </div>
                </div>
              </div>
              <div className="flex-1 bg-[#ffffff] flex flex-col items-start justify-start min-h-px min-w-px relative self-stretch">
                <div className="bg-center bg-cover bg-no-repeat h-48 lg:h-60 w-full bg-gradient-to-r from-[#003594] to-[#6496ed]" />
                <div className="flex flex-col gap-4 lg:gap-6 items-start justify-center p-4 lg:p-[24px] relative w-full">
                  <div className="flex flex-col gap-3 lg:gap-4 items-start justify-start relative w-full">
                    <div className="flex flex-row gap-3 items-center justify-start relative">
                      <div className="font-['Barlow'] font-medium text-[#101820] text-[32px] lg:text-[40px] text-left text-nowrap tracking-[-0.64px] lg:tracking-[-0.8px] leading-tight lg:leading-[40px]">
                        2-6
                      </div>
                      <div className="flex flex-col font-['Poppins'] items-start justify-start relative text-[#101820] text-xs lg:text-[14px] text-left text-nowrap leading-tight lg:leading-[20px]">
                        <div>NOV</div>
                        <div>2026</div>
                      </div>
                    </div>
                    <div className="font-['Barlow'] font-medium text-[#101820] text-[20px] lg:text-[24px] text-left tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] w-full">
                      OWASP Global AppSec USA<br />2026
                    </div>
                  </div>
                  <div className="flex flex-row gap-6 lg:gap-10 h-10 lg:h-12 items-center justify-center px-4 lg:px-6 py-0 relative w-full">
                    <Button text="More Info" type="Ghost Dark" size="48" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="bg-[#101820] flex flex-col gap-12 lg:gap-16 items-center justify-start px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20 relative w-full">
          <div className="flex flex-col gap-12 lg:gap-16 items-start justify-start relative w-full">
            <div className="font-['Barlow'] font-medium text-[#ffffff] text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[48px] text-left tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.8px] xl:tracking-[-0.96px] leading-tight xl:leading-[48px] w-full">
              Volunteer for the ASVS
            </div>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start justify-start relative w-full">
              
              {/* Build the Standard */}
              <div className="flex-1 bg-[#182430] flex flex-col min-h-[320px] lg:min-h-[400px] items-start justify-between min-w-px p-4 lg:p-[24px] relative">
                <div className="bg-[#101820] flex flex-row gap-2.5 items-center justify-center p-3 relative size-[50px] lg:size-[60px]">
                  <div className="overflow-clip relative size-6 lg:size-8">
                    <Image src="/images/icons/factory-icon.svg" alt="Build" fill className="object-contain" />
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:gap-8 items-start justify-start relative w-full">
                  <div className="flex flex-col gap-2 items-start justify-start relative w-full text-left">
                    <div className="font-['Barlow'] font-medium text-[#ffffff] text-[20px] lg:text-[24px] tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] w-full">
                      Build the Standard
                    </div>
                    <div className="font-['Poppins'] text-[#d7d7d7] text-sm leading-tight lg:leading-[20px] w-full">
                      Help shape the OWASP Application Security Verification Standard. We're always looking for volunteers to contribute to its ongoing development and help define its future.
                    </div>
                  </div>
                  <div className="flex flex-row gap-6 lg:gap-10 h-12 lg:h-14 items-center justify-center px-6 lg:px-8 py-0 relative w-full">
                    <Button text="Public ASVS Job Board" type="Ghost White" size="56" />
                  </div>
                </div>
              </div>

              {/* Get Involved */}
              <div className="flex-1 bg-[#182430] flex flex-col min-h-[320px] lg:min-h-[400px] items-start justify-between min-w-px p-4 lg:p-[24px] relative">
                <div className="bg-[#101820] flex flex-row gap-2.5 items-center justify-center p-3 relative size-[50px] lg:size-[60px]">
                  <div className="overflow-clip relative size-6 lg:size-8">
                    <Image src="/images/icons/code.svg" alt="Code" fill className="object-contain" />
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:gap-8 items-start justify-start relative w-full">
                  <div className="flex flex-col gap-2 items-start justify-start relative w-full text-left">
                    <div className="font-['Barlow'] font-medium text-[#ffffff] text-[20px] lg:text-[24px] tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] w-full">
                      Get Involved
                    </div>
                    <div className="font-['Poppins'] text-[#d7d7d7] text-sm leading-tight lg:leading-[20px] w-full">
                      We have many ways you can help, from writing and editing to coding, building scripts, and creating GitHub Actions. Most roles require a few hours a week, and more intensive tasks arise periodically.
                    </div>
                  </div>
                  <div className="flex flex-row gap-6 lg:gap-10 h-12 lg:h-14 items-center justify-center px-6 lg:px-8 py-0 relative w-full">
                    <Button text="Find Contribution Guide" type="Ghost White" size="56" />
                  </div>
                </div>
              </div>

              {/* All Are Welcome */}
              <div className="flex-1 bg-[#182430] flex flex-col min-h-[320px] lg:min-h-[400px] items-start justify-between min-w-px p-4 lg:p-[24px] relative">
                <div className="bg-[#101820] flex flex-row gap-2.5 items-center justify-center p-3 relative size-[50px] lg:size-[60px]">
                  <div className="overflow-clip relative size-6 lg:size-8">
                    <Image src="/images/icons/handshake.svg" alt="Handshake" fill className="object-contain" />
                  </div>
                </div>
                <div className="flex flex-col gap-6 lg:gap-8 items-start justify-start relative w-full">
                  <div className="flex flex-col gap-2 items-start justify-start relative w-full text-left">
                    <div className="font-['Barlow'] font-medium text-[#ffffff] text-[20px] lg:text-[24px] tracking-[-0.4px] lg:tracking-[-0.48px] leading-tight lg:leading-[32px] w-full">
                      All Are Welcome
                    </div>
                    <div className="font-['Poppins'] text-[#d7d7d7] text-sm leading-tight lg:leading-[20px] w-full">
                      You don't have to be an expert. Students and newcomers are encouraged to apply! Getting involved is a great way to gain experience and make connections in the security community.
                    </div>
                  </div>
                  <div className="bg-[#003594] flex flex-row gap-6 lg:gap-10 h-12 lg:h-14 items-center justify-center px-6 lg:px-8 py-0 relative w-full">
                    <Button text="Volunteer for ASVS" size="56" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
} 