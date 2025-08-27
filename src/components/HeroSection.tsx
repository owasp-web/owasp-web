'use client'

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ResponsiveContainer from './ResponsiveContainer';
import Button from './Button';

const pulseIcon = "/images/icons/pulse.svg";

export default function HeroSection() {
  const router = useRouter();

  const handleJoinCommunity = () => {
    router.push('/join-community');
  };

  const handleSecureMyApp = () => {
    router.push('/secure-my-app');
  };

  return (
    <div className="bg-[#101820] relative w-full">
      <div className="overflow-clip relative w-full">
        <ResponsiveContainer size="full" className="py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="flex flex-col items-center justify-center text-center space-y-8 lg:space-y-20">
            <div className="space-y-6 lg:space-y-8">
              <div className="space-y-4 lg:space-y-6">
                <h1 className="font-['Barlow'] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] text-white text-center tracking-[-0.48px] sm:tracking-[-0.64px] md:tracking-[-0.8px] xl:tracking-[-1.28px] leading-tight xl:leading-[64px]">
                  Explore the World of
                </h1>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 items-center justify-center">
                  <h1 className="font-['Barlow'] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] text-white tracking-[-0.48px] sm:tracking-[-0.64px] md:tracking-[-0.8px] xl:tracking-[-1.28px] leading-tight xl:leading-[64px]">
                    Cyber
                  </h1>
                  <div className="overflow-clip relative w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-11 lg:h-11 xl:w-12 xl:h-12 animate-pulse">
                    <Image src={pulseIcon} alt="Pulse Icon" fill className="filter brightness-110" />
                  </div>
                  <h1 className="font-['Barlow'] font-medium text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[64px] text-white tracking-[-0.48px] sm:tracking-[-0.64px] md:tracking-[-0.8px] xl:tracking-[-1.28px] leading-tight xl:leading-[64px]">
                    Security
                  </h1>
                </div>
              </div>
              <p className="font-['Poppins'] text-[#f4f4f4] text-base sm:text-lg text-center tracking-[-0.32px] leading-6 sm:leading-7 max-w-[900px] mx-auto px-4 sm:px-0">
                Empowering a global community to build secure software through open-source tools,
                expert education, and collaborative innovation — free for everyone, everywhere.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center w-full sm:w-auto max-w-sm sm:max-w-none mx-auto">
              <Button 
                text="Join the Community"
                variant="ghost-white"
                size="56"
                onClick={handleJoinCommunity}
                className="w-full sm:w-auto min-w-[140px] sm:min-w-[160px]"
              />
              <Button 
                text="Secure My App"
                variant="primary"
                size="56"
                onClick={handleSecureMyApp}
                className="w-full sm:w-auto min-w-[140px] sm:min-w-[160px]"
              />
            </div>
          </div>
        </ResponsiveContainer>
      </div>
    </div>
  );
} 