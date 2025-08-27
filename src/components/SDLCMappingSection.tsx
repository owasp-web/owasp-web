import Image from 'next/image';

export default function SDLCMappingSection() {
  return (
    <div className="bg-[#101820]">
      {/* Centered container with proper spacing */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-[120px] py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col gap-12 lg:gap-16 items-center justify-start">
          {/* Header Section */}
          <div className="flex flex-col gap-6 lg:gap-8 items-center text-center w-full">
            <h2 className="font-['Barlow'] font-medium text-[#ffffff] text-[28px] sm:text-[36px] lg:text-[40px] xl:text-[48px] leading-tight xl:leading-[48px] tracking-[-0.56px] sm:tracking-[-0.72px] lg:tracking-[-0.8px] xl:tracking-[-0.96px]">
              OWASP Projects Mapped to the SDLC
            </h2>
            <p className="font-['Poppins'] text-[#d7d7d7] text-sm sm:text-base leading-6 tracking-[-0.28px] sm:tracking-[-0.32px] max-w-4xl">
              Explore how OWASP Projects align with each stage of the Software
              Development Life Cycle, thanks to the OWASP Integration Standards
              Project. This visual guide helps you find the right tools at the
              right time in your secure development process.
            </p>
          </div>

          {/* Application Security Wayfinder */}
          <div className="flex flex-col gap-6 lg:gap-8 w-full">
            <h3 className="font-['Barlow'] font-medium text-[#ffffff] text-[24px] sm:text-[28px] lg:text-[32px] leading-tight lg:leading-[40px] tracking-[-0.48px] sm:tracking-[-0.56px] lg:tracking-[-0.64px] text-center">
              Application Security Wayfinder
            </h3>
            
            {/* Mobile-Friendly Alternative */}
            <div className="block lg:hidden">
              <div className="bg-[#182430] border border-white/40 rounded-lg p-4 sm:p-6 text-center">
                <p className="font-['Poppins'] text-[#d7d7d7] text-sm mb-4">
                  This interactive diagram shows OWASP tools mapped to SDLC stages.
                </p>
                <div className="space-y-4">
                  <div className="bg-[#101820] border border-white/20 rounded p-3">
                    <h4 className="font-['Barlow'] font-medium text-white text-sm mb-2">Development & Training</h4>
                    <p className="font-['Poppins'] text-[#d7d7d7] text-xs">Juice Shop, WebGoat, OWASP Top 10, API Security</p>
                  </div>
                  <div className="bg-[#101820] border border-white/20 rounded p-3">
                    <h4 className="font-['Barlow'] font-medium text-white text-sm mb-2">Security Testing</h4>
                    <p className="font-['Poppins'] text-[#d7d7d7] text-xs">ASVS, SAMM, Security Champions Playbook</p>
                  </div>
                  <div className="bg-[#101820] border border-white/20 rounded p-3">
                    <h4 className="font-['Barlow'] font-medium text-white text-sm mb-2">Operations & Monitoring</h4>
                    <p className="font-['Poppins'] text-[#d7d7d7] text-xs">Coraza, ModSecurity CRS, Threat Modeling</p>
                  </div>
                </div>
                <p className="font-['Poppins'] text-[#d7d7d7] text-xs mt-4 italic">
                  View on desktop for the full interactive diagram
                </p>
              </div>
            </div>
            
            {/* Desktop Complex Diagram */}
            <div className="hidden lg:block">
              {/* Complex SDLC Diagram - Exact Replica */}
              <div className="h-[520px] relative w-full">
                {/* Left Column - Cross-cutting concerns */}
                <div className="absolute flex flex-row gap-6 items-start justify-end left-0 top-0">
                  <div className="flex flex-col gap-8 items-start justify-center w-[170px]">
                    {/* Operation Box */}
                    <div className="bg-[#101820] relative w-full border border-[rgba(255,255,255,0.4)]">
                      <div className="flex flex-col gap-4 items-start justify-start overflow-hidden p-3">
                        <div className="flex flex-row items-center justify-center w-full">
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Coraza</p>
                          </div>
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Mod Security CRS</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Culture Building & Process Maturing Box */}
                    <div className="bg-[#101820] relative w-full border border-[rgba(255,255,255,0.4)]">
                      <div className="flex flex-col gap-4 items-start justify-start overflow-hidden p-3">
                        <div className="flex flex-row items-center justify-center w-full">
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Security Champions Playbook</p>
                          </div>
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">MASVS</p>
                          </div>
                        </div>
                        <div className="flex flex-row items-start justify-start w-full">
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">SAMM</p>
                          </div>
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">ASVS</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Training/Education Box */}
                    <div className="bg-[#101820] relative w-full border border-[rgba(255,255,255,0.4)]">
                      <div className="flex flex-col gap-4 items-start justify-start overflow-hidden p-3">
                        <div className="flex flex-row items-start justify-start w-full">
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Juice Shop</p>
                          </div>
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">API Top 10</p>
                          </div>
                        </div>
                        <div className="flex flex-row items-start justify-start w-full">
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Top 10</p>
                          </div>
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">WebGoat</p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-end w-full">
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Snakes & Ladders</p>
                          </div>
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">PyGoat</p>
                          </div>
                        </div>
                        <div className="flex flex-row items-center justify-end w-full">
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Mobile Top 10</p>
                          </div>
                          <div className="flex-1">
                            <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Wrong Secrets</p>
                          </div>
                        </div>
                        <div className="w-full">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Security Shepherd</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SDLC Phase Labels Column */}
                  <div className="flex flex-col items-center justify-center w-[120px]">
                    <div className="bg-[#13336d] flex flex-col gap-2.5 h-14 items-center justify-center overflow-hidden px-2 py-3 w-full">
                      <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Operation</p>
                    </div>
                    <div className="h-8 relative w-0">
                      <div className="absolute bottom-0 left-[-0.5px] right-[-0.5px] top-0">
                        <Image src="/images/icons/vector-4.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                    <div className="bg-[#13336d] flex flex-col gap-2.5 h-[104px] items-center justify-center overflow-hidden p-3 w-full">
                      <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Culture Building & Process Maturing</p>
                    </div>
                    <div className="h-8 relative w-0">
                      <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-1.563%]">
                        <Image src="/images/icons/vector-3.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                    <div className="bg-[#13336d] flex flex-col gap-2.5 items-center justify-center overflow-hidden px-2 py-3 w-full">
                      <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Training/Education</p>
                    </div>
                    <div className="h-8 relative w-0">
                      <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-1.563%]">
                        <Image src="/images/icons/vector-3.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                    <div className="bg-[#13336d] flex flex-col gap-2.5 items-center justify-center overflow-hidden px-2 py-3 w-full">
                      <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Metrics</p>
                    </div>
                  </div>

                  {/* Connecting arrows from left boxes to labels */}
                  <div className="absolute flex h-[0px] items-center justify-center left-[170px] top-7 w-[24px]">
                    <div className="flex-none rotate-[270deg]">
                      <div className="h-6 relative w-0">
                        <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-2.083%]">
                          <Image src="/images/icons/vector-2.svg" alt="" fill className="block max-w-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex h-[0px] items-center justify-center left-[170px] top-[140px] w-[24px]">
                    <div className="flex-none rotate-[270deg]">
                      <div className="h-6 relative w-0">
                        <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-2.083%]">
                          <Image src="/images/icons/vector-2.svg" alt="" fill className="block max-w-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute flex h-[0px] items-center justify-center left-[170px] top-64 w-[24px]">
                    <div className="flex-none rotate-[270deg]">
                      <div className="h-6 relative w-0">
                        <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-2.083%]">
                          <Image src="/images/icons/vector-2.svg" alt="" fill className="block max-w-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* OpenCRE.org Central Hub */}
                <div className="absolute flex flex-col gap-2.5 h-[520px] items-center justify-center left-[357.467px] top-0 w-[100px]">
                  <div className="aspect-[100/100] bg-[#13336d] flex flex-col gap-2.5 items-center justify-center overflow-hidden p-3 w-full">
                    <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center whitespace-nowrap">OpenCRE.org</p>
                  </div>

                  {/* Complex connector elements around OpenCRE */}
                  <div className="absolute h-[178.5px] top-[31.5px] translate-x-[-50%] w-[93px]" style={{ left: "calc(50% + 46.033px)" }}>
                    <div className="absolute bottom-0 left-[-0.538%] right-[-0.538%] top-[-2.063%]">
                      <Image src="/images/icons/vector-5.svg" alt="" fill className="block max-w-none" />
                    </div>
                  </div>

                  <div className="absolute h-[22px] top-[188px] translate-x-[-50%] w-[92px]" style={{ left: "calc(50% + 45.533px)" }}>
                    <div className="absolute bottom-0 left-[-0.543%] right-[-0.543%] top-[-16.736%]">
                      <Image src="/images/icons/vector-6.svg" alt="" fill className="block max-w-none" />
                    </div>
                  </div>

                  <div className="absolute flex h-[47px] items-center justify-center top-[163px] translate-x-[-50%] w-[54px]" style={{ left: "calc(50% - 65.467px)" }}>
                    <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                      <div className="h-[47px] relative w-[54px]">
                        <div className="absolute bottom-0 left-[-0.926%] right-[-0.926%] top-[-7.834%]">
                          <Image src="/images/icons/vector-8.svg" alt="" fill className="block max-w-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute h-0 top-[268px] translate-x-[-50%] w-[41.5px]" style={{ left: "calc(50% + 70.283px)" }}>
                    <div className="absolute bottom-[-3.682px] left-0 right-[-1.205%] top-[-3.682px]">
                      <Image src="/images/icons/vector-7.svg" alt="" fill className="block max-w-none" />
                    </div>
                  </div>

                  <div className="absolute flex h-0 items-center justify-center top-[252px] translate-x-[-50%] w-[41.5px]" style={{ left: "calc(50% - 71.717px)" }}>
                    <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                      <div className="h-0 relative w-[41.5px]">
                        <div className="absolute bottom-[-3.682px] left-0 right-[-1.205%] top-[-3.682px]">
                          <Image src="/images/icons/vector-9.svg" alt="" fill className="block max-w-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute h-3.5 top-[333px] translate-x-[-50%] w-[130px]" style={{ left: "calc(50% + 68.533px)" }}>
                    <div className="absolute bottom-[-3.571%] left-[-0.385%] right-0 top-0">
                      <Image src="/images/icons/vector-10.svg" alt="" fill className="block max-w-none" />
                    </div>
                  </div>

                  <div className="absolute h-[23px] top-[310px] translate-x-[-50%] w-[95.5px]" style={{ left: "calc(50% - 44.217px)" }}>
                    <div className="absolute bottom-[-16.009%] left-[-0.524%] right-[-0.524%] top-0">
                      <Image src="/images/icons/vector-11.svg" alt="" fill className="block max-w-none" />
                    </div>
                  </div>

                  <div className="absolute flex h-[31px] items-center justify-center top-[352px] translate-x-[-50%] w-[246px]" style={{ left: "calc(50% - 30.467px)" }}>
                    <div className="flex-none rotate-[180deg] scale-y-[-100%]">
                      <div className="h-[31px] relative w-[246px]">
                        <div className="absolute bottom-[-11.877%] left-[-0.203%] right-[-0.203%] top-0">
                          <Image src="/images/icons/vector-12.svg" alt="" fill className="block max-w-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Iterate label */}
                  <div className="absolute h-5 left-[-42.467px] top-1.5 w-[185px]">
                    <div className="absolute flex h-[0px] items-center justify-center left-[-1px] top-1/2 translate-y-[-50%] w-[185px]">
                      <div className="flex-none rotate-[90deg]">
                        <div className="h-[185px] relative w-0">
                          <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-0.27%]">
                            <Image src="/images/icons/vector-13.svg" alt="" fill className="block max-w-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bg-[#ffffff] flex flex-row gap-2.5 items-center justify-center p-1 top-1/2 translate-x-[-50%] translate-y-[-50%]" style={{ left: "calc(50% - 40.033px)" }}>
                      <p className="font-['Poppins'] text-[#041a41] text-[10px] leading-3 text-center whitespace-nowrap">
                        Iterate
                      </p>
                    </div>
                  </div>
                </div>

                {/* Main SDLC Column */}
                <div className="absolute flex flex-col items-center justify-center left-[501px] top-0 w-[120px]">
                  <div className="bg-[#13336d] flex flex-col gap-2.5 items-center justify-center overflow-hidden px-2 py-3 w-full">
                    <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Requirements</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex-none scale-y-[-100%]">
                      <div className="h-8 relative w-0">
                        <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-1.563%]">
                          <Image src="/images/icons/vector-3.svg" alt="" fill className="block max-w-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#13336d] flex flex-col gap-2.5 items-center justify-center overflow-hidden px-2 py-3 w-full">
                    <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Design</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex-none scale-y-[-100%]">
                      <div className="h-16 relative w-0">
                        <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-0.781%]">
                          <Image src="/images/icons/vector-14.svg" alt="" fill className="block max-w-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#13336d] flex flex-col gap-2.5 items-center justify-center overflow-hidden px-2 py-3 w-full">
                    <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Implementation</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="flex-none scale-y-[-100%]">
                      <div className="h-8 relative w-0">
                        <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-1.563%]">
                          <Image src="/images/icons/vector-3.svg" alt="" fill className="block max-w-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#13336d] flex flex-col gap-2.5 items-center justify-center overflow-hidden px-2 py-3 w-full">
                    <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Verification</p>
                  </div>
                  <div className="h-[72px] relative w-[120px]">
                    <div className="absolute flex h-[72px] items-center justify-center left-10 top-1/2 translate-y-[-50%] w-0">
                      <div className="flex-none rotate-[180deg]">
                        <div className="h-[72px] relative w-0">
                          <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-0.694%]">
                            <Image src="/images/icons/vector-15.svg" alt="" fill className="block max-w-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bg-[#ffffff] flex flex-row gap-2.5 items-center justify-center p-1 translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% - 10px)", left: "calc(50% - 20px)" }}>
                      <p className="font-['Poppins'] text-[#041a41] text-[10px] leading-3 text-center whitespace-nowrap">
                        After<br />N Iterations
                      </p>
                    </div>
                  </div>
                  <div className="bg-[#13336d] flex flex-col gap-2.5 items-center justify-center overflow-hidden px-2 py-3 w-full">
                    <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Policy Gap Evaluation</p>
                  </div>
                </div>

                {/* Right side project boxes */}
                <div className="absolute flex flex-col gap-8 items-start justify-center left-[663.067px] top-0 w-[170px]">
                  {/* Requirements projects */}
                  <div className="bg-[#101820] w-full border border-[rgba(255,255,255,0.4)]">
                    <div className="flex flex-col gap-4 items-start justify-start overflow-hidden p-3">
                      <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Security RAT</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">SKF</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-start justify-start w-full">
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">MSVS</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">ASVS</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Design projects */}
                  <div className="bg-[#101820] w-full border border-[rgba(255,255,255,0.4)]">
                    <div className="flex flex-col gap-4 items-start justify-start overflow-hidden p-3">
                      <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Threat Dragon</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">PyTM</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Threat Modeling Talks</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Cornucopia</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Implementation projects */}
                  <div className="bg-[#101820] w-full border border-[rgba(255,255,255,0.4)]">
                    <div className="flex flex-col gap-4 items-start justify-start overflow-hidden p-3">
                      <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Proactive Controls</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Go SCP</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">CheatSheet Series</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Verification projects */}
                  <div className="bg-[#101820] w-full border border-[rgba(255,255,255,0.4)]">
                    <div className="flex flex-col gap-4 items-start justify-start overflow-hidden p-3">
                      <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">WSTG</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">MSTG</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Policy Gap Evaluation projects */}
                  <div className="bg-[#101820] w-full border border-[rgba(255,255,255,0.4)]">
                    <div className="flex flex-col gap-4 items-start justify-start overflow-hidden p-3">
                      <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">SAMM</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">ASVS</p>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">MASVS</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Far right columns - Dependencies & Security Tools */}
                <div className="absolute flex flex-col gap-8 items-start justify-center left-[876.533px] pb-0 pt-40 px-0 top-0 w-40">
                  {/* Dependencies */}
                  <div className="bg-[#101820] w-full border border-[rgba(255,255,255,0.4)]">
                    <div className="flex flex-col gap-4 items-center justify-center overflow-hidden p-3">
                      <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 w-full text-center">Dependency Check</p>
                      <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 w-full text-center">Dependency Track</p>
                      <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 w-full text-center">CycloneDX</p>
                    </div>
                  </div>

                  {/* Testing Tools */}
                  <div className="bg-[#101820] w-full border border-[rgba(255,255,255,0.4)]">
                    <div className="flex flex-col gap-4 items-start justify-start overflow-hidden p-3">
                      <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Code Pulse</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">OWTF</p>
                        </div>
                      </div>
                      <div className="flex flex-row items-center justify-center w-full">
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Amass Nettacker</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 text-center">Secure Headers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Final right column - Libraries & Vulnerability Management */}
                <div className="absolute flex flex-col gap-[72px] items-center justify-center left-[1080px] pb-0 pt-40 px-0 top-0 w-[120px]">
                  {/* Secure Libraries */}
                  <div className="bg-[#101820] w-full border border-[rgba(255,255,255,0.4)]">
                    <div className="flex flex-col gap-4 items-center justify-center overflow-hidden p-3">
                      <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 w-full text-center">Secure Headers</p>
                      <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 w-full text-center">ESAPI</p>
                      <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 w-full text-center">CSRFGuard</p>
                    </div>
                  </div>

                  {/* Vulnerability Management Section */}
                  <div className="flex flex-col items-start justify-start w-full">
                    <div className="bg-[#101820] w-full border border-[rgba(255,255,255,0.4)]">
                      <div className="flex flex-col gap-4 items-start justify-start overflow-hidden p-3">
                        <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 w-full text-center">Glue</p>
                        <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 w-full text-center">Dracon</p>
                      </div>
                    </div>
                    
                    <div className="h-[72px] relative w-[120px]">
                      <div className="absolute flex h-[72px] items-center justify-center left-[60px] top-1/2 translate-y-[-50%] w-0">
                        <div className="flex-none rotate-[180deg]">
                          <div className="h-[72px] relative w-0">
                            <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-0.694%]">
                              <Image src="/images/icons/vector-15.svg" alt="" fill className="block max-w-none" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute bg-[#ffffff] flex flex-row gap-2.5 items-center justify-center left-1/2 p-1 top-1/2 translate-x-[-50%] translate-y-[-50%]">
                        <p className="font-['Poppins'] text-[#041a41] text-[10px] leading-3 text-center whitespace-nowrap">
                          Vulnerability<br />Management
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-[#101820] w-full border border-[rgba(255,255,255,0.4)]">
                      <div className="flex flex-col gap-4 items-start justify-start overflow-hidden p-3">
                        <p className="font-['Poppins'] text-[#f1f6fe] text-[12px] leading-4 w-full text-center">Defect Dojo</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional connecting arrows between main sections */}
                <div className="absolute flex h-[0px] items-center justify-center left-[621px] top-5 w-[42px]">
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-[42px] relative w-0">
                      <div className="absolute bottom-0 left-[-3.682px] right-[-3.682px] top-[-1.19%]">
                        <Image src="/images/icons/vector-16.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute flex h-[32.5px] items-center justify-center left-[600px] top-[113px] w-[61.5px]">
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-[61.5px] relative w-[32.5px]">
                      <div className="absolute bottom-[-0.813%] left-0 right-[-11.329%] top-[-0.813%]">
                        <Image src="/images/icons/vector-17.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute flex h-[12.5px] items-center justify-center left-[833.5px] top-[266.5px] w-[126px]">
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-[126px] relative w-[12.5px]">
                      <div className="absolute bottom-0 left-[-4%] right-[-4%] top-[-2.922%]">
                        <Image src="/images/icons/vector-18.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute flex h-[13px] items-center justify-center left-[954px] top-[146px] w-[190px]">
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-[190px] relative w-[13px]">
                      <div className="absolute bottom-[-0.263%] left-[-3.846%] right-[-3.846%] top-[-1.938%]">
                        <Image src="/images/icons/vector-19.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute flex h-[22.5px] items-center justify-center left-[1036.5px] top-[311.5px] w-[107.5px]">
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-[107.5px] relative w-[22.5px]">
                      <div className="absolute bottom-0 left-[-2.222%] right-[-2.222%] top-[-3.425%]">
                        <Image src="/images/icons/vector-20.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute flex h-[12.5px] items-center justify-center left-[833.5px] top-[386.5px] w-[126px]">
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-[126px] relative w-[12.5px]">
                      <div className="absolute bottom-0 left-[-4%] right-[-4%] top-[-2.922%]">
                        <Image src="/images/icons/vector-18.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute flex h-[66.5px] items-center justify-center left-[600px] top-[216px] w-[62.5px]">
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-[62.5px] relative w-[66.5px]">
                      <div className="absolute bottom-[-0.8%] left-0 right-[-5.537%] top-[-0.8%]">
                        <Image src="/images/icons/vector-21.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute flex h-[107.5px] items-center justify-center left-[607px] top-[289px] w-[56px]">
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-14 relative w-[107.5px]">
                      <div className="absolute bottom-[-0.893%] left-0 right-[-3.425%] top-[-0.893%]">
                        <Image src="/images/icons/vector-22.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute flex h-[61.5px] items-center justify-center left-[608.5px] top-[417.5px] w-[54px]">
                  <div className="flex-none rotate-[90deg]">
                    <div className="h-[54px] relative w-[61.5px]">
                      <div className="absolute bottom-[-0.926%] left-0 right-[-5.987%] top-[-0.926%]">
                        <Image src="/images/icons/vector-23.svg" alt="" fill className="block max-w-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Labels */}
                <div className="absolute bg-[#ffffff] flex flex-row gap-2.5 items-center justify-center p-1 translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% - 120px)", left: "calc(50% + 15.5px)" }}>
                  <p className="font-['Poppins'] text-[#041a41] text-[10px] leading-3 text-center whitespace-nowrap">Threat<br />Modeling</p>
                </div>

                <div className="absolute bg-[#ffffff] flex flex-row gap-2.5 items-center justify-center p-1 translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% + 19px)", left: "calc(50% + 285.5px)" }}>
                  <p className="font-['Poppins'] text-[#041a41] text-[10px] leading-3 text-center whitespace-nowrap">Dependencies</p>
                </div>

                <div className="absolute bg-[#ffffff] flex flex-row gap-2.5 items-center justify-center p-1 translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% - 114px)", left: "calc(50% + 453px)" }}>
                  <p className="font-['Poppins'] text-[#041a41] text-[10px] leading-3 text-center whitespace-nowrap">Secure Libraries</p>
                </div>

                <div className="absolute bg-[#ffffff] flex flex-row gap-2.5 items-center justify-center p-1 translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% + 52px)", left: "calc(50% + 480px)" }}>
                  <p className="font-['Poppins'] text-[#041a41] text-[10px] leading-3 text-center whitespace-nowrap">Frameworks</p>
                </div>

                <div className="absolute bg-[#ffffff] flex flex-row gap-2.5 items-center justify-center p-1 translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% + 139px)", left: "calc(50% + 285.5px)" }}>
                  <p className="font-['Poppins'] text-[#041a41] text-[10px] leading-3 text-center whitespace-nowrap">Tools</p>
                </div>

                <div className="absolute bg-[#ffffff] flex flex-row gap-2.5 items-center justify-center p-1 translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% - 27px)", left: "calc(50% + 25.5px)" }}>
                  <p className="font-['Poppins'] text-[#041a41] text-[10px] leading-3 text-center whitespace-nowrap">Docs</p>
                </div>

                <div className="absolute bg-[#ffffff] flex flex-row gap-2.5 items-center justify-center p-1 translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% + 52px)", left: "calc(50% + 13px)" }}>
                  <p className="font-['Poppins'] text-[#041a41] text-[10px] leading-3 text-center whitespace-nowrap">Guides</p>
                </div>

                <div className="absolute bg-[#ffffff] flex flex-row gap-2.5 items-center justify-center p-1 translate-x-[-50%] translate-y-[-50%]" style={{ top: "calc(50% + 184px)", left: "calc(50% + 14px)" }}>
                  <p className="font-['Poppins'] text-[#041a41] text-[10px] leading-3 text-center whitespace-nowrap">Guides</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 